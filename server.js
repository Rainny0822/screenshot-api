require('dotenv').config();
const express = require('express');
const puppeteer = require('puppeteer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Simple in-memory storage (for demo - use a real database in production)
const userQuotas = new Map();
const freeQuotaPerDay = parseInt(process.env.FREE_QUOTA_PER_DAY) || 10;
const paidQuotaPerMonth = parseInt(process.env.PAID_QUOTA_PER_MONTH) || 1000;

// Initialize or get user quota
function getUserQuota(apiKey) {
  if (!userQuotas.has(apiKey)) {
    userQuotas.set(apiKey, {
      isPaid: false,
      dailyCount: 0,
      monthlyCount: 0,
      lastReset: new Date().toDateString(),
      lastMonthlyReset: new Date().getMonth()
    });
  }
  return userQuotas.get(apiKey);
}

// Reset daily quota if needed
function checkAndResetDailyQuota(userQuota) {
  const today = new Date().toDateString();
  if (userQuota.lastReset !== today) {
    userQuota.dailyCount = 0;
    userQuota.lastReset = today;
  }
}

// Reset monthly quota if needed
function checkAndResetMonthlyQuota(userQuota) {
  const currentMonth = new Date().getMonth();
  if (userQuota.lastMonthlyReset !== currentMonth) {
    userQuota.monthlyCount = 0;
    userQuota.lastMonthlyReset = currentMonth;
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Generate API key for new users
app.post('/api-key', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  const apiKey = `sk_${Math.random().toString(36).substr(2, 32)}`;
  userQuotas.set(apiKey, {
    isPaid: false,
    dailyCount: 0,
    monthlyCount: 0,
    lastReset: new Date().toDateString(),
    lastMonthlyReset: new Date().getMonth(),
    email
  });
  
  res.json({ apiKey, message: 'API key generated successfully' });
});

// Main screenshot endpoint
app.post('/screenshot', async (req, res) => {
  const { url, apiKey, width = 1280, height = 720 } = req.body;
  
  if (!url || !apiKey) {
    return res.status(400).json({ error: 'URL and API key are required' });
  }

  try {
    const userQuota = getUserQuota(apiKey);
    checkAndResetDailyQuota(userQuota);
    checkAndResetMonthlyQuota(userQuota);

    // Check quota
    const maxRequests = userQuota.isPaid ? paidQuotaPerMonth : freeQuotaPerDay;
    const currentCount = userQuota.isPaid ? userQuota.monthlyCount : userQuota.dailyCount;
    
    if (currentCount >= maxRequests) {
      return res.status(429).json({ 
        error: 'Quota exceeded',
        isPaid: userQuota.isPaid,
        limit: maxRequests,
        resetType: userQuota.isPaid ? 'monthly' : 'daily'
      });
    }

    // Launch browser and take screenshot
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    const screenshot = await page.screenshot({ encoding: 'base64' });
    
    await browser.close();

    // Update quota
    if (userQuota.isPaid) {
      userQuota.monthlyCount++;
    } else {
      userQuota.dailyCount++;
    }

    res.json({
      success: true,
      image: `data:image/png;base64,${screenshot}`,
      remaining: maxRequests - (userQuota.isPaid ? userQuota.monthlyCount : userQuota.dailyCount)
    });

  } catch (error) {
    console.error('Screenshot error:', error);
    res.status(500).json({ error: 'Failed to capture screenshot', details: error.message });
  }
});

// Create Stripe checkout session
app.post('/checkout', async (req, res) => {
  const { apiKey } = req.body;
  
  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: { apiKey }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Stripe webhook to handle successful payments
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const apiKey = session.metadata.apiKey;
      
      if (apiKey && userQuotas.has(apiKey)) {
        const userQuota = userQuotas.get(apiKey);
        userQuota.isPaid = true;
        userQuota.monthlyCount = 0;
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook signature verification failed' });
  }
});

// Get quota info
app.get('/quota/:apiKey', (req, res) => {
  const { apiKey } = req.params;
  const userQuota = getUserQuota(apiKey);
  
  checkAndResetDailyQuota(userQuota);
  checkAndResetMonthlyQuota(userQuota);
  
  const maxRequests = userQuota.isPaid ? paidQuotaPerMonth : freeQuotaPerDay;
  const currentCount = userQuota.isPaid ? userQuota.monthlyCount : userQuota.dailyCount;
  
  res.json({
    isPaid: userQuota.isPaid,
    limit: maxRequests,
    used: currentCount,
    remaining: maxRequests - currentCount,
    resetType: userQuota.isPaid ? 'monthly' : 'daily'
  });
});

app.listen(PORT, () => {
  console.log(`Screenshot API server running on port ${PORT}`);
  console.log(`Free quota: ${freeQuotaPerDay} requests/day`);
  console.log(`Paid quota: ${paidQuotaPerMonth} requests/month`);
});

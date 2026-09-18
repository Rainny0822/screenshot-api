# 📸 Screenshot API

A powerful URL screenshot API service with free and paid tiers.

## Features

- ⚡ **Lightning Fast**: Capture screenshots in seconds
- 🎯 **High Quality**: Crisp, clear screenshots with customizable dimensions
- 🔒 **Secure**: Enterprise-grade security
- 💰 **Affordable**: Free tier with generous limits, paid plans starting at $5/month

## Pricing

### Free Tier
- 10 screenshots per day
- Standard quality (1280x720)
- Community support

### Pro Plan ($5/month)
- 1,000 screenshots per month
- High quality output
- Custom resolutions
- Priority support

## API Documentation

### Get API Key
```bash
POST /api-key
Content-Type: application/json

{
  "email": "your@email.com"
}
```

### Take Screenshot
```bash
POST /screenshot
Content-Type: application/json

{
  "url": "https://example.com",
  "apiKey": "your_api_key_here",
  "width": 1280,
  "height": 720
}
```

### Response
```json
{
  "success": true,
  "image": "data:image/png;base64,...",
  "remaining": 9
}
```

### Check Quota
```bash
GET /quota/:apiKey
```

### Response
```json
{
  "isPaid": false,
  "limit": 10,
  "used": 1,
  "remaining": 9,
  "resetType": "daily"
}
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Stripe keys
```

3. Start the server:
```bash
npm start
```

4. Visit `http://localhost:3000` to see the web interface

## Deployment

### Deploy to Render

1. Push your code to GitHub
2. Create a new account on [render.com](https://render.com)
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` configuration
5. Set your environment variables in the Render dashboard
6. Deploy!

### Environment Variables

- `PORT`: Server port (default: 3000)
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PRICE_ID`: Your Stripe price ID for the subscription
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `FREE_QUOTA_PER_DAY`: Free tier daily limit (default: 10)
- `PAID_QUOTA_PER_MONTH`: Paid tier monthly limit (default: 1000)

## Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create a product with a recurring price ($5/month)
3. Copy your API keys and webhook secret
4. Set up a webhook endpoint for `checkout.session.completed` events
5. Add the keys to your environment variables

## Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **Puppeteer** - Headless browser for screenshots
- **Stripe** - Payment processing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## Future Improvements

- [ ] Add database integration (PostgreSQL/MongoDB)
- [ ] Implement user authentication
- [ ] Add more screenshot options (full page, specific element)
- [ ] Create admin dashboard
- [ ] Add analytics and usage tracking
- [ ] Implement CDN for screenshot caching
- [ ] Add webhook notifications

## License

ISC

## Support

For support, please open an issue on GitHub or contact support@screenshot-api.com

---

**Made with ❤️ for developers**

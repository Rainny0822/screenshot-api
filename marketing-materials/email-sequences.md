# Email Marketing Sequences

## Welcome Email Sequence

### Email 1: Welcome & Getting Started (Immediate)
**Subject:** Welcome to Screenshot API! Let's get you started 🚀

Hi [Name],

Thanks for signing up for Screenshot API! I'm excited to have you on board.

Your API key: [API_KEY]

**Quick Start:**
1. Copy your API key above
2. Check out our documentation: [Link]
3. Try your first screenshot with this curl command:

```bash
curl -X POST https://api.screenshot-api.com/screenshot \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","apiKey":"YOUR_API_KEY"}'
```

**What you can do with your free tier:**
- 10 screenshots per day
- Perfect for testing and small projects
- No credit card required

Need help? Just reply to this email. I'm here to help!

Best,
[Your Name]
Screenshot API Team

---

### Email 2: Tips & Best Practices (Day 2)
**Subject:** 3 pro tips for better screenshots 📸

Hi [Name],

I wanted to share some tips to get the most out of Screenshot API:

**Tip 1: Optimize Your Resolution**
For thumbnails, use 800x600. For high-quality screenshots, try 1920x1080.

**Tip 2: Handle Errors Gracefully**
Always check the API response and handle quota errors (429) in your code.

**Tip 3: Cache Your Screenshots**
If you're capturing the same URL multiple times, consider caching the results.

**Example Error Handling:**
```javascript
try {
  const result = await takeScreenshot(url);
  if (result.remaining === 0) {
    // Handle quota exceeded
  }
} catch (error) {
  // Handle other errors
}
```

Questions? Just ask!

Best,
[Your Name]

---

### Email 3: Use Case Ideas (Day 5)
**Subject:** 5 creative ways to use Screenshot API 💡

Hi [Name],

Here are 5 creative ways developers are using Screenshot API:

1. **Website Directory** - Auto-generate thumbnails for link directories
2. **Social Media Cards** - Create preview images for social sharing
3. **Visual Testing** - Automated screenshot testing for web apps
4. **Competitor Monitoring** - Track competitor website changes
5. **Marketing Automation** - Generate screenshots for email campaigns

**Which one interests you most?** I'd love to hear what you're building!

If you need more than 10 screenshots per day, check out our Pro plan:
[Link to Pricing]

Best,
[Your Name]

---

### Email 4: Upgrade Invitation (Day 10)
**Subject:** Ready to scale up? Pro plan is just $5/month 🚀

Hi [Name],

How's your project going? I hope Screenshot API has been helpful!

If you're finding the free tier limiting, our Pro plan might be perfect for you:

**Pro Plan Benefits:**
- 1,000 screenshots per month (vs 10/day)
- High-quality output
- Custom resolutions
- Priority support
- Just $5/month

**Perfect for:**
- Growing projects
- Production applications
- Teams and agencies
- Heavy automation workflows

[Upgrade to Pro - $5/month]

Of course, the free tier will always be available if you're not ready to upgrade.

Best,
[Your Name]

---

## Re-engagement Email Sequence

### Email 1: We Miss You! (Day 30 of inactivity)
**Subject:** Haven't seen you in a while 👋

Hi [Name],

I noticed you haven't used Screenshot API in a while. Is everything okay?

If you ran into any issues or have questions, I'm here to help! Just reply to this email.

**Quick reminder of what you can do:**
- Capture website screenshots instantly
- Generate thumbnails and previews
- Automate visual testing
- Much more!

Your API key is still active: [API_KEY]

Let me know if there's anything I can help with!

Best,
[Your Name]

---

### Email 2: New Features (Day 45 of inactivity)
**Subject:** We've been busy building new features! 🎉

Hi [Name],

I wanted to let you know about some improvements we've made to Screenshot API:

**What's New:**
- Faster screenshot processing
- Better error handling
- Improved documentation
- New code examples

**Coming Soon:**
- Full-page screenshots
- Additional image formats
- Webhook notifications

Your free tier is still waiting for you: [Link to Dashboard]

Hope to see you back soon!

Best,
[Your Name]

---

## Promotional Email Sequence

### Product Launch Email
**Subject:** 🚀 Big news: Screenshot API is now live!

Hi [Name],

I'm excited to announce that Screenshot API is officially live!

After months of development, we're ready to help developers capture web pages instantly.

**Why Screenshot API?**
- ⚡ Lightning fast (2-3 seconds)
- 💰 Generous free tier (10/day)
- 🔒 Secure and reliable
- 🚀 Simple integration

**Special Launch Offer:**
First 100 users to upgrade to Pro get 50% off for life!
[Claim Your Discount]

Try it free today: [Link]

Best,
[Your Name]
Screenshot API Founder

---

## Cold Email Templates

### Template 1: Direct Value Proposition
**Subject:** Faster screenshots for [Company Name]

Hi [Name],

I noticed [Company Name] works with [relevant technology/industry]. You might find our Screenshot API useful for [specific use case].

Our API lets you capture web page screenshots in 2-3 seconds with:
- Free tier: 10 requests/day
- Pro plan: $5/month (1,000 requests)
- Simple REST API integration

This could save your team hours of development time.

Would you be interested in a quick demo?

Best,
[Your Name]

---

### Template 2: Problem-Solution
**Subject:** Tired of slow screenshot services?

Hi [Name],

Many developers we talk to struggle with slow, unreliable screenshot services.

Screenshot API solves this with:
- ⚡ 2-3 second response times
- 💰 Affordable pricing (starts at $0)
- 🔒 99.9% uptime guarantee
- 🚀 Dead-simple integration

We have a free tier that's perfect for testing.

Care to try it out? [Link]

Best,
[Your Name]

---

### Template 3: Social Proof
**Subject:** How [Similar Company] saves time with Screenshot API

Hi [Name],

[Similar Company] recently switched to Screenshot API and reduced their screenshot processing time by 70%.

They use it for:
- Automated testing
- Website monitoring
- Marketing materials

We have a free tier (10 requests/day) if you want to test it yourself.

[Link to try it out]

Best,
[Your Name]
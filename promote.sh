#!/bin/bash

# Screenshot API 自动化推广脚本
# 此脚本生成推广内容并提供推广渠道

echo "📢 Screenshot API 推广助手"
echo "================================"

# 创建推广内容目录
mkdir -p promotion_content

# 生成Reddit帖子
cat > promotion_content/reddit_post.md << 'REDDIT_EOF'
**我构建了一个免费的URL截图API，每次请求只需几秒**

大家好，我开发了一个简单的URL截图API服务：

**功能特点：**
- ⚡ 快速截图（2-3秒响应）
- 🎯 可自定义分辨率（1280x720等）
- 💰 免费层级：10次/天
- 🔒 安全可靠的REST API
- 🚀 简单易用的接口

**技术栈：** Node.js + Puppeteer + Express

**API示例：**
```bash
curl -X POST https://your-api.com/screenshot \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","apiKey":"your_key"}'
```

**定价：**
- Free: 10次/天
- Pro: $5/月（1000次）

**GitHub:** https://github.com/Rainny0822/screenshot-api

欢迎大家试用并提出建议！正在寻找早期用户反馈。
REDDIT_EOF

# 生成Product Hunt发布内容
cat > promotion_content/product_hunt.md << 'PRODUCT_HUNT_EOF'
**Screenshot API - Fast URL Screenshots with Affordable Pricing**

Capture web pages instantly with our powerful screenshot service.

**Key Features:**
- Lightning fast screenshots (2-3 seconds)
- Customizable resolutions
- Free tier: 10 requests/day
- Pro plan: $5/month (1000 requests)
- Simple REST API
- Beautiful web interface with live demo

**Use Cases:**
- Website thumbnails
- Social media previews
- Automated testing
- Data collection
- Marketing materials

**Tech Stack:** Node.js, Puppeteer, Express, Stripe

**GitHub:** https://github.com/Rainny0822/screenshot-api

Perfect for developers, startups, and anyone needing screenshot functionality!
PRODUCT_HUNT_EOF

# 生成Twitter推文
cat > promotion_content/twitter_tweets.txt << 'TWEET_EOF'
🚀 Just launched Screenshot API! Capture web pages in seconds.

Free tier: 10/day | Pro: $5/month (1000 requests)

🔗 https://github.com/Rainny0822/screenshot-api

#ScreenshotAPI #WebDev #SaaS

---

Need screenshots for your project? Check out my new Screenshot API!

⚡ Fast & Simple
💰 Free tier available
🎯 Perfect for developers

https://github.com/Rainny0822/screenshot-api

#API #DevTools

---

Built a URL screenshot API with Node.js + Puppeteer. Free tier available, Pro plan $5/month for 1000 screenshots. Perfect for web dev projects! 🎉

https://github.com/Rainny0822/screenshot-api

#SideProject #SaaS #WebDev
TWEET_EOF

# 生成Cold Email模板
cat > promotion_content/cold_email_template.txt << 'EMAIL_EOF'
Subject: Fast Screenshot API Service - Boost Your Development Efficiency

Hi [Name],

I noticed you're working on [project/company] and might need screenshot functionality.

I've developed a Screenshot API service that could save you development time:

**Features:**
- Fast screenshots (2-3 seconds)
- Free tier: 10 requests/day
- Pro plan: $5/month (1000 requests)
- Simple REST API integration
- Customizable resolutions

**API Example:**
```bash
POST /screenshot
{
  "url": "https://example.com",
  "apiKey": "your_key",
  "width": 1280,
  "height": 720
}
```

This could eliminate the need to build screenshot functionality from scratch.

**GitHub:** https://github.com/Rainny0822/screenshot-api

Feel free to try the free tier. I'd love your feedback!

Best regards,
[Your Name]
Screenshot API Developer
EMAIL_EOF

# 生成技术文章大纲
cat > promotion_content/article_outline.md << 'ARTICLE_EOF'
# 技术文章大纲

## 文章1: "如何用Node.js构建截图API服务"

### 引言
- 为什么需要截图API
- 应用场景和用例

### 技术栈选择
- Node.js + Express: Web框架
- Puppeteer: 无头浏览器
- Stripe: 支付处理

### 核心功能实现
- API端点设计
- Puppeteer配置
- 错误处理

### 用户配额系统
- 免费层级设计
- 付费用户管理
- 配额检查逻辑

### 部署和扩展
- Render部署
- 性能优化
- 安全考虑

### 总结
- 项目收获
- 未来改进方向

---

## 文章2: "5个需要截图API的创意项目"

### 1. 网站缩略图生成器
- 功能描述
- 技术实现
- 商业价值

### 2. 社交媒体预览工具
- 功能描述
- 技术实现
- 商业价值

### 3. 自动化测试助手
- 功能描述
- 技术实现
- 商业价值

### 4. 网页监控服务
- 功能描述
- 技术实现
- 商业价值

### 5. 数据收集和分析
- 功能描述
- 技术实现
- 商业价值

---

## 文章3: "截图API vs 竞品对比分析"

### 竞品分析
- 主要竞品列表
- 功能对比表
- 价格对比

### 本产品优势
- 性能优势
- 价格优势
- 易用性优势

### 使用场景匹配
- 不同用户需求
- 最佳选择建议

### 结论
- 市场定位
- 发展策略
ARTICLE_EOF

echo "✅ 推广内容已生成到 promotion_content/ 目录"
echo ""
echo "📁 生成的文件："
echo "   - reddit_post.md (Reddit帖子)"
echo "   - product_hunt.md (Product Hunt发布)"
echo "   - twitter_tweets.txt (Twitter推文)"
echo "   - cold_email_template.txt (冷邮件模板)"
echo "   - article_outline.md (技术文章大纲)"
echo ""
echo "🚀 推广渠道："
echo "   1. Reddit: r/webdev, r/SaaS, r/SideProject"
echo "   2. Product Hunt: 提交新产品"
echo "   3. Twitter: 分享推文"
echo "   4. Dev.to: 发布技术文章"
echo "   5. Hacker News: Show HN"
echo "   6. LinkedIn: 专业网络"
echo "   7. Cold emails: 潜在客户"
echo ""
echo "📊 推广策略："
echo "   - 每天发布1-2条推文"
echo "   - 每周发布1篇技术文章"
echo "   - 在Reddit每月发布2-3次"
echo "   - Product Hunt一次性发布"
echo "   - 持续发送cold emails"
echo ""
echo "💡 目标：20个付费用户 = $100/月收入"
echo "   转化率假设：100试用用户 × 20% = 20付费用户"
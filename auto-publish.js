/**
 * 自动化发布工具
 * 帮助您在多个平台自动发布推广内容
 */

const fs = require('fs');
const path = require('path');

class AutoPublisher {
  constructor() {
    this.contentDir = path.join(__dirname, 'promotion_content');
    this.publishedLog = path.join(__dirname, 'published_log.json');
    this.loadPublishedLog();
  }

  loadPublishedLog() {
    if (fs.existsSync(this.publishedLog)) {
      this.published = JSON.parse(fs.readFileSync(this.publishedLog, 'utf8'));
    } else {
      this.published = {
        reddit: [],
        product_hunt: false,
        twitter: [],
        dev_to: [],
        hacker_news: false
      };
    }
  }

  savePublishedLog() {
    fs.writeFileSync(this.publishedLog, JSON.stringify(this.published, null, 2));
  }

  readContent(filename) {
    const filePath = path.join(this.contentDir, filename);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    return null;
  }

  // Reddit发布指南
  getRedditGuide() {
    const content = this.readContent('reddit_post.md');
    return {
      platforms: ['r/webdev', 'r/SaaS', 'r/SideProject', 'r/javascript'],
      content: content,
      tips: [
        '选择合适的subreddit',
        '遵守社区规则',
        '提供真实价值',
        '回复评论和反馈',
        '避免过度推广'
      ],
      schedule: [
        'r/webdev: 周二或周四上午',
        'r/SaaS: 周末',
        'r/SideProject: 周末',
        'r/javascript: 工作日'
      ]
    };
  }

  // Product Hunt发布指南
  getProductHuntGuide() {
    const content = this.readContent('product_hunt.md');
    return {
      content: content,
      tips: [
        '准备精美的产品图片',
        '制作演示视频',
        '准备maker comment',
        '安排发布时间（美国太平洋时间凌晨12点）',
        '邀请朋友支持',
        '回复所有评论'
      ],
      checklist: [
        '☐ 产品描述完善',
        '☐ 图片和视频准备',
        '☐ Maker comment撰写',
        '☐ 发布时间确定',
        '☐ 支持者邀请',
        '☐ 评论回复准备'
      ]
    };
  }

  // Twitter发布指南
  getTwitterGuide() {
    const content = this.readContent('twitter_tweets.txt');
    const tweets = content.split('---').map(t => t.trim()).filter(t => t);
    return {
      tweets: tweets,
      tips: [
        '使用相关标签',
        '@提及相关账号',
        '添加图片或视频',
        '最佳发布时间：9am, 12pm, 3pm',
        '与评论者互动',
        '定期发布不同内容'
      ],
      hashtags: ['#ScreenshotAPI', '#WebDev', '#SaaS', '#API', '#DevTools', '#SideProject'],
      schedule: '每天1-2条，不同时间段'
    };
  }

  // Dev.to发布指南
  getDevToGuide() {
    const outline = this.readContent('article_outline.md');
    return {
      articleOutline: outline,
      tips: [
        '写原创技术文章',
        '提供代码示例',
        '添加相关图片',
        '使用合适的标签',
        '回复评论',
        '与其他作者互动'
      ],
      series: [
        '如何用Node.js构建截图API服务',
        '5个需要截图API的创意项目',
        '截图API vs 竞品对比分析'
      ],
      schedule: '每周1篇文章'
    };
  }

  // Hacker News发布指南
  getHackerNewsGuide() {
    return {
      title: 'Show HN: Screenshot API - Fast URL Screenshots with Free Tier',
      tips: [
        '标题要简洁明确',
        '提供GitHub链接',
        '描述要诚实',
        '准备好回答技术问题',
        '不要过度营销',
        '参与社区讨论'
      ],
      bestTime: '美国工作时间（太平洋时间）',
      content: `I built a simple screenshot API service that lets developers capture web pages instantly.

Features:
- Fast screenshots (2-3 seconds)
- Free tier: 10 requests/day
- Pro plan: $5/month (1000 requests)
- Simple REST API
- Built with Node.js + Puppeteer

GitHub: https://github.com/Rainny0822/screenshot-api

Looking for feedback from the community!`
    };
  }

  // Cold Email发送指南
  getColdEmailGuide() {
    const template = this.readContent('cold_email_template.txt');
    return {
      template: template,
      tips: [
        '个性化邮件内容',
        '研究目标公司',
        '提供真实价值',
        '保持简洁',
        '明确的行动呼吁',
        '跟踪发送结果'
      ],
      targets: [
        'Web开发公司',
        'SaaS初创公司',
        '营销代理公司',
        '数据分析公司',
        '自由职业开发者'
      ],
      schedule: '每天发送5-10封个性化邮件'
    };
  }

  // 生成发布计划
  generatePublishPlan() {
    const plan = {
      week1: {
        monday: [
          '发布Reddit帖子到r/webdev',
          '发送第一条Twitter推文'
        ],
        tuesday: [
          '发送cold emails（5封）',
          '发布Twitter推文'
        ],
        wednesday: [
          '开始写Dev.to第一篇文章',
          '发送cold emails（5封）'
        ],
        thursday: [
          '发布Reddit帖子到r/SaaS',
          '完成Dev.to文章'
        ],
        friday: [
          '发布Dev.to文章',
          '发送cold emails（5封）'
        ],
        saturday: [
          '发布Reddit帖子到r/SideProject',
          'Twitter互动'
        ],
        sunday: [
          '准备Product Hunt发布材料',
          '总结本周数据'
        ]
      },
      week2: {
        monday: [
          'Product Hunt发布',
          '发布多条Twitter推文'
        ],
        tuesday: [
          '回复Product Hunt评论',
          '发送cold emails（5封）'
        ],
        wednesday: [
          '发布Hacker News Show HN',
          '开始写第二篇Dev.to文章'
        ],
        thursday: [
          '发送cold emails（5封）',
          'Twitter互动'
        ],
        friday: [
          '发布第二篇Dev.to文章',
          '总结转化数据'
        ],
        saturday: [
          '分析本周数据',
          '优化推广策略'
        ],
        sunday: [
          '准备下周内容',
          '休息'
        ]
      }
    };

    return plan;
  }

  // 显示发布指南
  showGuide(platform) {
    const guides = {
      reddit: this.getRedditGuide(),
      'product-hunt': this.getProductHuntGuide(),
      twitter: this.getTwitterGuide(),
      'dev-to': this.getDevToGuide(),
      'hacker-news': this.getHackerNewsGuide(),
      email: this.getColdEmailGuide()
    };

    if (guides[platform]) {
      console.log(`\n📢 ${platform.toUpperCase()} 发布指南:`);
      console.log(JSON.stringify(guides[platform], null, 2));
    } else {
      console.log('可用平台: reddit, product-hunt, twitter, dev-to, hacker-news, email');
    }
  }

  // 显示所有指南
  showAllGuides() {
    console.log('🚀 自动化发布指南\n');
    console.log('可用平台:');
    Object.keys({
      reddit: 'Reddit技术社区',
      'product-hunt': 'Product Hunt产品发布',
      twitter: 'Twitter社交媒体',
      'dev-to': 'Dev.to技术博客',
      'hacker-news': 'Hacker News Show HN',
      email: 'Cold Email营销'
    }).forEach((key, value) => {
      console.log(`  - ${key}: ${value}`);
    });

    console.log('\n📅 两周发布计划:');
    const plan = this.generatePublishPlan();
    console.log(JSON.stringify(plan, null, 2));
  }
}

// 使用示例
if (require.main === module) {
  const publisher = new AutoPublisher();
  
  const args = process.argv.slice(2);
  if (args.length > 0) {
    publisher.showGuide(args[0]);
  } else {
    publisher.showAllGuides();
  }
}

module.exports = AutoPublisher;
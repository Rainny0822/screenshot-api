/**
 * 社交媒体自动化工具
 * 帮助自动化社交媒体发布和互动
 */

const fs = require('fs');
const path = require('path');

class SocialMediaAutomation {
  constructor() {
    this.contentDir = path.join(__dirname, 'promotion_content');
    this.scheduleFile = path.join(__dirname, 'social_schedule.json');
    this.loadSchedule();
  }

  loadSchedule() {
    if (fs.existsSync(this.scheduleFile)) {
      this.schedule = JSON.parse(fs.readFileSync(this.scheduleFile, 'utf8'));
    } else {
      this.schedule = {
        twitter: [],
        linkedin: [],
        reddit: [],
        schedule: []
      };
    }
  }

  saveSchedule() {
    fs.writeFileSync(this.scheduleFile, JSON.stringify(this.schedule, null, 2));
  }

  // 生成Twitter发布计划
  generateTwitterSchedule() {
    const tweets = this.readContent('twitter_tweets.txt');
    const tweetList = tweets.split('---').map(t => t.trim()).filter(t => t);
    
    const schedule = [];
    const now = new Date();
    
    // 生成一周的发布计划
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      
      // 每天发布2条推文
      schedule.push({
        platform: 'twitter',
        content: tweetList[i % tweetList.length],
        scheduledTime: new Date(date.setHours(9, 0, 0, 0)).toISOString(),
        status: 'scheduled'
      });
      
      schedule.push({
        platform: 'twitter',
        content: tweetList[(i + 1) % tweetList.length],
        scheduledTime: new Date(date.setHours(15, 0, 0, 0)).toISOString(),
        status: 'scheduled'
      });
    }
    
    this.schedule.twitter = schedule;
    this.saveSchedule();
    
    return schedule;
  }

  // 生成LinkedIn发布计划
  generateLinkedInSchedule() {
    const linkedinContent = this.readContent('linkedin_posts.md');
    const posts = this.parseMarkdownPosts(linkedinContent);
    
    const schedule = [];
    const now = new Date();
    
    // 每周发布2条LinkedIn帖子
    for (let i = 0; i < 4; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + (i * 3) + 1); // 每3天发布一次
      
      schedule.push({
        platform: 'linkedin',
        content: posts[i % posts.length],
        scheduledTime: new Date(date.setHours(10, 0, 0, 0)).toISOString(),
        status: 'scheduled'
      });
    }
    
    this.schedule.linkedin = schedule;
    this.saveSchedule();
    
    return schedule;
  }

  // 生成Reddit发布计划
  generateRedditSchedule() {
    const redditContent = this.readContent('reddit_post.md');
    const subreddits = ['r/webdev', 'r/SaaS', 'r/SideProject', 'r/javascript'];
    
    const schedule = [];
    const now = new Date();
    
    // 每周在不同subreddit发布
    subreddits.forEach((subreddit, index) => {
      const date = new Date(now);
      date.setDate(now.getDate() + index + 1);
      
      schedule.push({
        platform: 'reddit',
        subreddit: subreddit,
        content: redditContent,
        scheduledTime: new Date(date.setHours(12, 0, 0, 0)).toISOString(),
        status: 'scheduled'
      });
    });
    
    this.schedule.reddit = schedule;
    this.saveSchedule();
    
    return schedule;
  }

  // 生成完整发布计划
  generateCompleteSchedule() {
    const twitterSchedule = this.generateTwitterSchedule();
    const linkedinSchedule = this.generateLinkedInSchedule();
    const redditSchedule = this.generateRedditSchedule();
    
    const completeSchedule = [
      ...twitterSchedule,
      ...linkedinSchedule,
      ...redditSchedule
    ].sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));
    
    this.schedule.schedule = completeSchedule;
    this.saveSchedule();
    
    return completeSchedule;
  }

  // 读取内容文件
  readContent(filename) {
    const filePath = path.join(this.contentDir, filename);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    return null;
  }

  // 解析Markdown帖子
  parseMarkdownPosts(markdown) {
    const posts = [];
    const sections = markdown.split('##').filter(section => section.trim());
    
    sections.forEach(section => {
      const lines = section.trim().split('\n');
      const title = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();
      
      if (title && content) {
        posts.push({
          title: title,
          content: content
        });
      }
    });
    
    return posts;
  }

  // 显示发布计划
  showSchedule() {
    console.log('📅 社交媒体发布计划\n');
    
    if (this.schedule.schedule.length === 0) {
      console.log('没有计划的发布内容。运行 generateCompleteSchedule() 生成计划。');
      return;
    }
    
    this.schedule.schedule.forEach((item, index) => {
      const date = new Date(item.scheduledTime);
      console.log(`${index + 1}. ${item.platform.toUpperCase()}`);
      console.log(`   时间: ${date.toLocaleString()}`);
      console.log(`   状态: ${item.status}`);
      if (item.subreddit) {
        console.log(`   Subreddit: ${item.subreddit}`);
      }
      
      // 处理不同类型的内容
      let contentPreview = '';
      if (typeof item.content === 'string') {
        contentPreview = item.content.substring(0, 50);
      } else if (typeof item.content === 'object' && item.content.title) {
        contentPreview = item.content.title;
      } else {
        contentPreview = JSON.stringify(item.content).substring(0, 50);
      }
      
      console.log(`   内容: ${contentPreview}...`);
      console.log('');
    });
  }

  // 模拟发布（实际需要API集成）
  simulatePublish() {
    console.log('🚀 模拟社交媒体发布\n');
    
    const now = new Date();
    const readyToPublish = this.schedule.schedule.filter(item => {
      const scheduledTime = new Date(item.scheduledTime);
      return scheduledTime <= now && item.status === 'scheduled';
    });
    
    if (readyToPublish.length === 0) {
      console.log('没有需要立即发布的内容。');
      return;
    }
    
    readyToPublish.forEach(item => {
      console.log(`发布到 ${item.platform}:`);
      console.log(item.content);
      console.log('✅ 发布成功\n');
      
      // 更新状态
      item.status = 'published';
      item.publishedAt = now.toISOString();
    });
    
    this.saveSchedule();
  }

  // 生成发布统计
  generateStats() {
    const stats = {
      total: this.schedule.schedule.length,
      published: this.schedule.schedule.filter(item => item.status === 'published').length,
      scheduled: this.schedule.schedule.filter(item => item.status === 'scheduled').length,
      byPlatform: {
        twitter: this.schedule.schedule.filter(item => item.platform === 'twitter').length,
        linkedin: this.schedule.schedule.filter(item => item.platform === 'linkedin').length,
        reddit: this.schedule.schedule.filter(item => item.platform === 'reddit').length
      }
    };
    
    return stats;
  }

  // 显示统计信息
  showStats() {
    const stats = this.generateStats();
    
    console.log('📊 发布统计\n');
    console.log(`总计: ${stats.total}`);
    console.log(`已发布: ${stats.published}`);
    console.log(`已计划: ${stats.scheduled}`);
    console.log('');
    console.log('按平台:');
    console.log(`  Twitter: ${stats.byPlatform.twitter}`);
    console.log(`  LinkedIn: ${stats.byPlatform.linkedin}`);
    console.log(`  Reddit: ${stats.byPlatform.reddit}`);
  }

  // 导出为CSV格式
  exportToCSV() {
    const headers = ['Platform', 'Scheduled Time', 'Status', 'Content Preview'];
    const rows = this.schedule.schedule.map(item => [
      item.platform,
      item.scheduledTime,
      item.status,
      item.content.substring(0, 30).replace(/\n/g, ' ')
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
    
    const csvFile = path.join(__dirname, 'social_schedule.csv');
    fs.writeFileSync(csvFile, csvContent);
    
    console.log(`✅ CSV已导出到: ${csvFile}`);
    return csvFile;
  }
}

// 使用示例
if (require.main === module) {
  const automation = new SocialMediaAutomation();
  
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  switch (command) {
    case 'generate':
      console.log('📅 生成发布计划...');
      automation.generateCompleteSchedule();
      console.log('✅ 发布计划已生成');
      break;
      
    case 'show':
      automation.showSchedule();
      break;
      
    case 'stats':
      automation.showStats();
      break;
      
    case 'simulate':
      automation.simulatePublish();
      break;
      
    case 'export':
      automation.exportToCSV();
      break;
      
    case 'help':
    default:
      console.log('📱 社交媒体自动化工具\n');
      console.log('可用命令:');
      console.log('  generate   - 生成发布计划');
      console.log('  show       - 显示发布计划');
      console.log('  stats      - 显示发布统计');
      console.log('  simulate   - 模拟发布');
      console.log('  export     - 导出为CSV');
      console.log('  help       - 显示帮助');
      break;
  }
}

module.exports = SocialMediaAutomation;
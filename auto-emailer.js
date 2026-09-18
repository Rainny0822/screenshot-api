/**
 * 自动邮件发送工具
 * 帮助自动化Cold Email营销活动
 */

const fs = require('fs');
const path = require('path');

class AutoEmailer {
  constructor() {
    this.templatesDir = path.join(__dirname, 'marketing-materials');
    this.leadsFile = path.join(__dirname, 'potential_leads.json');
    this.emailHistoryFile = path.join(__dirname, 'email_history.json');
    this.loadLeads();
    this.loadEmailHistory();
  }

  loadLeads() {
    if (fs.existsSync(this.leadsFile)) {
      this.leads = JSON.parse(fs.readFileSync(this.leadsFile, 'utf8'));
    } else {
      this.leads = { companies: [], saas: [], agencies: [], startups: [], devtools: [] };
    }
  }

  loadEmailHistory() {
    if (fs.existsSync(this.emailHistoryFile)) {
      this.emailHistory = JSON.parse(fs.readFileSync(this.emailHistoryFile, 'utf8'));
    } else {
      this.emailHistory = {
        sent: [],
        scheduled: [],
        templates: []
      };
    }
  }

  saveEmailHistory() {
    fs.writeFileSync(this.emailHistoryFile, JSON.stringify(this.emailHistory, null, 2));
  }

  // 读取邮件模板
  readTemplate(templateName) {
    const templatePath = path.join(this.templatesDir, templateName);
    if (fs.existsSync(templatePath)) {
      return fs.readFileSync(templatePath, 'utf8');
    }
    return null;
  }

  // 个性化邮件内容
  personalizeEmail(template, lead) {
    let personalized = template;
    
    // 替换占位符
    personalized = personalized.replace(/{company_name}/g, lead.name);
    personalized = personalized.replace(/{Company Name}/g, lead.name);
    personalized = personalized.replace(/{website}/g, lead.website);
    personalized = personalized.replace(/{reason}/g, lead.reason);
    
    return personalized;
  }

  // 生成邮件序列
  generateEmailSequence(lead) {
    const welcomeTemplate = this.readTemplate('email-sequences.md');
    const emailTemplates = this.parseEmailTemplates(welcomeTemplate);
    
    const sequence = [];
    
    // Email 1: Welcome (Day 0)
    sequence.push({
      day: 0,
      subject: 'Faster screenshots for ' + lead.name,
      content: this.personalizeEmail(emailTemplates.welcome, lead),
      status: 'pending'
    });
    
    // Email 2: Tips (Day 2)
    sequence.push({
      day: 2,
      subject: '3 pro tips for better screenshots',
      content: this.personalizeEmail(emailTemplates.tips, lead),
      status: 'pending'
    });
    
    // Email 3: Use cases (Day 5)
    sequence.push({
      day: 5,
      subject: '5 creative ways to use Screenshot API',
      content: this.personalizeEmail(emailTemplates.useCases, lead),
      status: 'pending'
    });
    
    // Email 4: Upgrade (Day 10)
    sequence.push({
      day: 10,
      subject: 'Ready to scale up? Pro plan is just $5/month',
      content: this.personalizeEmail(emailTemplates.upgrade, lead),
      status: 'pending'
    });
    
    return sequence;
  }

  // 解析邮件模板
  parseEmailTemplates(markdown) {
    const templates = {
      welcome: '',
      tips: '',
      useCases: '',
      upgrade: ''
    };
    
    // 简化的解析逻辑 - 实际应该更复杂
    const sections = markdown.split('### Email');
    
    sections.forEach(section => {
      if (section.includes('Welcome & Getting Started')) {
        templates.welcome = section;
      } else if (section.includes('Tips & Best Practices')) {
        templates.tips = section;
      } else if (section.includes('Use Case Ideas')) {
        templates.useCases = section;
      } else if (section.includes('Upgrade Invitation')) {
        templates.upgrade = section;
      }
    });
    
    return templates;
  }

  // 为所有潜在客户生成邮件序列
  generateAllEmailSequences() {
    const allLeads = [
      ...this.leads.companies,
      ...this.leads.saas,
      ...this.leads.agencies,
      ...this.leads.startups,
      ...this.leads.devtools
    ];
    
    const sequences = [];
    
    allLeads.forEach(lead => {
      const sequence = this.generateEmailSequence(lead);
      sequences.push({
        lead: lead.name,
        email: this.generateEmail(lead),
        sequence: sequence
      });
    });
    
    return sequences;
  }

  // 生成模拟邮箱地址
  generateEmail(lead) {
    const domain = lead.website.replace('https://', '').replace('http://', '').split('/')[0];
    const name = lead.name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '');
    return `info@${domain}`; // 通用邮箱
  }

  // 生成每日发送计划
  generateDailyPlan() {
    const sequences = this.generateAllEmailSequences();
    const dailyPlan = {};
    
    sequences.forEach(item => {
      item.sequence.forEach(email => {
        const sendDate = new Date();
        sendDate.setDate(sendDate.getDate() + email.day);
        
        const dateKey = sendDate.toISOString().split('T')[0];
        
        if (!dailyPlan[dateKey]) {
          dailyPlan[dateKey] = [];
        }
        
        dailyPlan[dateKey].push({
          lead: item.lead,
          email: item.email,
          subject: email.subject,
          content: email.content,
          day: email.day
        });
      });
    });
    
    return dailyPlan;
  }

  // 显示每日计划
  showDailyPlan() {
    const dailyPlan = this.generateDailyPlan();
    
    console.log('📧 每日邮件发送计划\n');
    
    Object.keys(dailyPlan).sort().forEach(date => {
      console.log(`📅 ${date}`);
      console.log(`计划发送: ${dailyPlan[date].length} 封邮件`);
      
      dailyPlan[date].forEach((email, index) => {
        console.log(`  ${index + 1}. ${email.lead} (${email.email})`);
        console.log(`     主题: ${email.subject}`);
      });
      
      console.log('');
    });
  }

  // 模拟发送邮件
  simulateSend() {
    const dailyPlan = this.generateDailyPlan();
    const today = new Date().toISOString().split('T')[0];
    
    if (!dailyPlan[today]) {
      console.log('今天没有计划发送的邮件。');
      return;
    }
    
    console.log('🚀 模拟发送今日邮件\n');
    
    dailyPlan[today].forEach((email, index) => {
      console.log(`发送邮件 ${index + 1}/${dailyPlan[today].length}:`);
      console.log(`收件人: ${email.lead} <${email.email}>`);
      console.log(`主题: ${email.subject}`);
      console.log('✅ 发送成功\n');
      
      // 记录到历史
      this.emailHistory.sent.push({
        to: email.email,
        subject: email.subject,
        sentAt: new Date().toISOString(),
        lead: email.lead
      });
    });
    
    this.saveEmailHistory();
  }

  // 生成邮件统计
  generateStats() {
    const dailyPlan = this.generateDailyPlan();
    const totalEmails = Object.values(dailyPlan).reduce((sum, day) => sum + day.length, 0);
    
    const stats = {
      totalLeads: Object.values(this.leads).flat().length,
      totalEmails: totalEmails,
      emailsSent: this.emailHistory.sent.length,
      emailsScheduled: totalEmails - this.emailHistory.sent.length,
      categories: {
        companies: this.leads.companies.length,
        saas: this.leads.saas.length,
        agencies: this.leads.agencies.length,
        startups: this.leads.startups.length,
        devtools: this.leads.devtools.length
      }
    };
    
    return stats;
  }

  // 显示统计信息
  showStats() {
    const stats = this.generateStats();
    
    console.log('📊 邮件营销统计\n');
    console.log(`潜在客户总数: ${stats.totalLeads}`);
    console.log(`计划邮件总数: ${stats.totalEmails}`);
    console.log(`已发送邮件: ${stats.emailsSent}`);
    console.log(`待发送邮件: ${stats.emailsScheduled}`);
    console.log('');
    console.log('客户分类:');
    console.log(`  Web开发公司: ${stats.categories.companies}`);
    console.log(`  SaaS公司: ${stats.categories.saas}`);
    console.log(`  营销代理: ${stats.categories.agencies}`);
    console.log(`  初创公司: ${stats.categories.startups}`);
    console.log(`  开发工具: ${stats.categories.devtools}`);
  }

  // 导出邮件列表为CSV
  exportToCSV() {
    const dailyPlan = this.generateDailyPlan();
    const headers = ['Date', 'Lead', 'Email', 'Subject', 'Day'];
    const rows = [];
    
    Object.keys(dailyPlan).sort().forEach(date => {
      dailyPlan[date].forEach(email => {
        rows.push([
          date,
          email.lead,
          email.email,
          email.subject,
          email.day
        ]);
      });
    });
    
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
    
    const csvFile = path.join(__dirname, 'email_schedule.csv');
    fs.writeFileSync(csvFile, csvContent);
    
    console.log(`✅ 邮件计划已导出到: ${csvFile}`);
    return csvFile;
  }
}

// 使用示例
if (require.main === module) {
  const emailer = new AutoEmailer();
  
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  switch (command) {
    case 'plan':
      emailer.showDailyPlan();
      break;
      
    case 'send':
      emailer.simulateSend();
      break;
      
    case 'stats':
      emailer.showStats();
      break;
      
    case 'export':
      emailer.exportToCSV();
      break;
      
    case 'help':
    default:
      console.log('📧 自动邮件发送工具\n');
      console.log('可用命令:');
      console.log('  plan   - 显示每日发送计划');
      console.log('  send   - 模拟发送今日邮件');
      console.log('  stats  - 显示邮件统计');
      console.log('  export - 导出邮件计划为CSV');
      console.log('  help   - 显示帮助');
      break;
  }
}

module.exports = AutoEmailer;
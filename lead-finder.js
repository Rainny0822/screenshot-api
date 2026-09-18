/**
 * 潜在客户寻找工具
 * 帮助找到可能需要Screenshot API的公司和开发者
 */

const fs = require('fs');
const path = require('path');

class LeadFinder {
  constructor() {
    this.leadsFile = path.join(__dirname, 'potential_leads.json');
    this.loadLeads();
  }

  loadLeads() {
    if (fs.existsSync(this.leadsFile)) {
      this.leads = JSON.parse(fs.readFileSync(this.leadsFile, 'utf8'));
    } else {
      this.leads = {
        companies: [],
        developers: [],
        agencies: [],
        startups: []
      };
    }
  }

  saveLeads() {
    fs.writeFileSync(this.leadsFile, JSON.stringify(this.leads, null, 2));
  }

  // 生成潜在客户线索
  generateLeads() {
    // Web开发公司
    const webDevCompanies = [
      { name: 'Toptal', type: 'company', website: 'https://www.toptal.com', reason: '连接开发者与客户，需要截图功能' },
      { name: 'Upwork', type: 'company', website: 'https://www.upwork.com', reason: '自由职业平台，项目预览需求' },
      { name: 'Fiverr', type: 'company', website: 'https://www.fiverr.com', reason: '服务展示平台' },
      { name: 'Webflow', type: 'company', website: 'https://webflow.com', reason: '网站建设平台' },
      { name: 'Squarespace', type: 'company', website: 'https://www.squarespace.com', reason: '网站建设平台' },
      { name: 'Wix', type: 'company', website: 'https://www.wix.com', reason: '网站建设平台' },
      { name: 'Shopify', type: 'company', website: 'https://www.shopify.com', reason: '电商平台，店铺预览' },
      { name: 'WordPress.com', type: 'company', website: 'https://wordpress.com', reason: '内容管理平台' }
    ];

    // SaaS公司
    const saasCompanies = [
      { name: 'Notion', type: 'saas', website: 'https://www.notion.so', reason: '生产力工具，网页嵌入' },
      { name: 'Slack', type: 'saas', website: 'https://slack.com', reason: '团队协作，链接预览' },
      { name: 'Zapier', type: 'saas', website: 'https://zapier.com', reason: '自动化平台' },
      { name: 'Airtable', type: 'saas', website: 'https://airtable.com', reason: '数据库平台' },
      { name: 'Monday.com', type: 'saas', website: 'https://monday.com', reason: '项目管理平台' },
      { name: 'Asana', type: 'saas', website: 'https://asana.com', reason: '项目管理平台' },
      { name: 'Trello', type: 'saas', website: 'https://trello.com', reason: '项目管理平台' },
      { name: 'Figma', type: 'saas', website: 'https://www.figma.com', reason: '设计工具，协作平台' }
    ];

    // 营销代理公司
    const marketingAgencies = [
      { name: 'HubSpot', type: 'agency', website: 'https://www.hubspot.com', reason: '营销平台，内容管理' },
      { name: 'Mailchimp', type: 'agency', website: 'https://mailchimp.com', reason: '邮件营销，预览功能' },
      { name: 'Hootsuite', type: 'agency', website: 'https://hootsuite.com', reason: '社交媒体管理' },
      { name: 'Buffer', type: 'agency', website: 'https://buffer.com', reason: '社交媒体管理' },
      { name: 'Sprout Social', type: 'agency', website: 'https://sproutsocial.com', reason: '社交媒体分析' }
    ];

    // 初创公司（通过GitHub热门项目）
    const startups = [
      { name: 'Vercel', type: 'startup', website: 'https://vercel.com', reason: '前端部署平台' },
      { name: 'Netlify', type: 'startup', website: 'https://www.netlify.com', reason: '前端部署平台' },
      { name: 'Supabase', type: 'startup', website: 'https://supabase.com', reason: '开源Firebase替代品' },
      { name: 'PlanetScale', type: 'startup', website: 'https://planetscale.com', reason: '数据库平台' },
      { name: 'Stripe', type: 'startup', website: 'https://stripe.com', reason: '支付平台，已使用类似技术' }
    ];

    // 开发者工具公司
    const devTools = [
      { name: 'GitHub', type: 'devtools', website: 'https://github.com', reason: '代码托管，项目预览' },
      { name: 'GitLab', type: 'devtools', website: 'https://gitlab.com', reason: '代码托管，CI/CD' },
      { name: 'Bitbucket', type: 'devtools', website: 'https://bitbucket.org', reason: '代码托管' },
      { name: 'Heroku', type: 'devtools', website: 'https://heroku.com', reason: '云平台' },
      { name: 'DigitalOcean', type: 'devtools', website: 'https://www.digitalocean.com', reason: '云服务提供商' }
    ];

    // 按类别组织线索
    this.leads.companies = webDevCompanies;
    this.leads.saas = saasCompanies;
    this.leads.agencies = marketingAgencies;
    this.leads.startups = startups;
    this.leads.devtools = devTools;

    this.saveLeads();
    return this.leads;
  }

  // 搜索GitHub上可能需要截图API的项目
  generateGitHubLeads() {
    const githubSearchTerms = [
      'screenshot',
      'web scraping',
      'puppeteer',
      'selenium',
      'headless browser',
      'website thumbnail',
      'page preview',
      'visual testing',
      'screenshot service'
    ];

    const githubLeads = {
      searchTerms: githubSearchTerms,
      suggestedSearches: githubSearchTerms.map(term => ({
        term: term,
        searchUrl: `https://github.com/search?q=${encodeURIComponent(term)}&type=repositories`,
        reason: '开发者可能在寻找截图解决方案'
      })),
      outreachStrategy: [
        '在相关项目的issue中提供建议',
        '联系项目维护者',
        '在项目文档中提及API',
        '提供Pull Request集成示例'
      ]
    };

    return githubLeads;
  }

  // 生成Cold Email列表
  generateColdEmailList() {
    const emailTemplates = {
      subjectLines: [
        'Faster screenshots for [Company Name]',
        'Screenshot API for [Company Name]',
        'Time-saving tool for [Company Name]',
        'Web scraping solution for [Company Name]'
      ],
      personalizationFields: [
        '{company_name}',
        '{specific_use_case}',
        '{recent_news}',
        '{industry}',
        '{pain_point}'
      ],
      followUpSchedule: [
        'Day 1: Initial email',
        'Day 3: Follow-up with value proposition',
        'Day 7: Final follow-up with social proof',
        'Day 14: Break-up email'
      ]
    };

    return emailTemplates;
  }

  // 生成联系信息查找策略
  generateContactStrategy() {
    const strategies = {
      linkedin: {
        tips: [
          '搜索公司名称 + "developer" or "CTO"',
          '查看员工列表，找技术决策者',
          '发送个性化连接请求',
          '分享有价值的内容而非直接推销'
        ],
        searchTemplate: 'https://www.linkedin.com/search/results/people/?keywords={company_name}+developer'
      },
      twitter: {
        tips: [
          '关注公司官方账号',
          '关注技术团队成员',
          '参与相关技术讨论',
          '在适当时机提及产品'
        ],
        searchTemplate: 'https://twitter.com/search?q={company_name}+developer&src=typed_query&f=user'
      },
      github: {
        tips: [
          '查看公司开源项目',
        '在issue中提供帮助',
          '联系贡献者',
          '提供技术建议'
        ],
        searchTemplate: 'https://github.com/{company_name}'
      },
      crunchbase: {
        tips: [
          '查找公司融资信息',
          '了解公司规模和阶段',
          '找到关键决策者',
          '了解公司技术栈'
        ],
        searchTemplate: 'https://www.crunchbase.com/organization/{company_name}'
      }
    };

    return strategies;
  }

  // 生成优先级排序
  prioritizeLeads() {
    const priorityCriteria = {
      high: [
        '近期获得融资',
        '快速增长的团队',
        '技术驱动型公司',
        '公开提及截图需求'
      ],
      medium: [
        '中型公司',
        '有技术团队',
        '可能需要自动化'
      ],
      low: [
        '大型企业（决策慢）',
        '非技术公司',
        '预算限制'
      ]
    };

    const scoringSystem = {
      companySize: { '1-10': 3, '11-50': 5, '51-200': 4, '200+': 2 },
      fundingStage: { 'seed': 5, 'series-a': 4, 'series-b': 3, 'series-c+': 2, 'public': 1 },
      techFocus: { 'high': 5, 'medium': 3, 'low': 1 },
      growthRate: { 'high': 5, 'medium': 3, 'low': 1 }
    };

    return { priorityCriteria, scoringSystem };
  }

  // 生成跟踪和分析工具
  generateTrackingTools() {
    const tracking = {
      metricsToTrack: [
        'Email open rate',
        'Email click rate',
        'Response rate',
        'Conversion rate',
        'Time to response',
        'Deal size'
      ],
      tools: [
        { name: 'HubSpot', type: 'CRM', features: ['Email tracking', 'CRM', 'Analytics'] },
        { name: 'Mailchimp', type: 'Email Marketing', features: ['Email campaigns', 'Analytics', 'Automation'] },
        { name: 'Calendly', type: 'Scheduling', features: ['Meeting scheduling', 'Calendar integration'] },
        { name: 'Notion', type: 'Documentation', features: ['Lead tracking', 'Notes', 'Database'] }
      ],
      spreadsheetTemplate: {
        columns: [
          'Company Name',
          'Contact Person',
          'Email',
          'Status',
          'Last Contact',
          'Next Follow-up',
          'Priority',
          'Notes'
        ]
      }
    };

    return tracking;
  }

  // 显示所有线索信息
  showAllLeads() {
    console.log('🎯 潜在客户寻找工具\n');
    
    console.log('📊 已生成的线索类别:');
    console.log('  - Companies: Web开发公司');
    console.log('  - SaaS: 软件即服务公司');
    console.log('  - Agencies: 营销代理公司');
    console.log('  - Startups: 初创公司');
    console.log('  - DevTools: 开发者工具公司');
    
    console.log('\n🔍 GitHub搜索策略:');
    const githubLeads = this.generateGitHubLeads();
    githubLeads.suggestedSearches.forEach(search => {
      console.log(`  - ${search.term}: ${search.reason}`);
      console.log(`    ${search.searchUrl}`);
    });
    
    console.log('\n📧 Cold Email策略:');
    const emailStrategy = this.generateColdEmailList();
    console.log('  Subject Lines:');
    emailStrategy.subjectLines.forEach(subject => {
      console.log(`    - ${subject}`);
    });
    
    console.log('\n📱 联系渠道策略:');
    const contactStrategy = this.generateContactStrategy();
    Object.keys(contactStrategy).forEach(channel => {
      console.log(`  ${channel.toUpperCase()}:`);
      contactStrategy[channel].tips.forEach(tip => {
        console.log(`    - ${tip}`);
      });
    });
    
    console.log('\n📈 跟踪指标:');
    const tracking = this.generateTrackingTools();
    tracking.metricsToTrack.forEach(metric => {
      console.log(`  - ${metric}`);
    });
  }

  // 保存线索到文件
  exportLeads() {
    const exportData = {
      generated: new Date().toISOString(),
      leads: this.leads,
      githubStrategy: this.generateGitHubLeads(),
      emailStrategy: this.generateColdEmailList(),
      contactStrategy: this.generateContactStrategy(),
      prioritySystem: this.prioritizeLeads(),
      trackingTools: this.generateTrackingTools()
    };

    const exportFile = path.join(__dirname, 'leads_export.json');
    fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2));
    
    console.log(`✅ 线索已导出到: ${exportFile}`);
    return exportFile;
  }
}

// 使用示例
if (require.main === module) {
  const finder = new LeadFinder();
  
  console.log('🎯 生成潜在客户线索...\n');
  finder.generateLeads();
  console.log('✅ 已生成基础线索\n');
  
  console.log('📊 显示线索信息:\n');
  finder.showAllLeads();
  
  console.log('\n💾 导出完整线索数据...');
  finder.exportLeads();
  
  console.log('\n🚀 下一步:');
  console.log('  1. 查看 potential_leads.json 文件');
  console.log('  2. 根据优先级联系客户');
  console.log('  3. 使用邮件模板发送cold emails');
  console.log('  4. 跟踪回复和转化率');
}

module.exports = LeadFinder;
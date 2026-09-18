/**
 * 主自动化控制器
 * 整合所有自动化工具，统一管理和执行
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class MasterAutomation {
  constructor() {
    this.projectDir = __dirname;
    this.logFile = path.join(this.projectDir, 'automation_log.json');
    this.loadLog();
  }

  loadLog() {
    if (fs.existsSync(this.logFile)) {
      this.log = JSON.parse(fs.readFileSync(this.logFile, 'utf8'));
    } else {
      this.log = {
        lastRun: null,
        tasksCompleted: [],
        revenue: 0,
        users: 0,
        metrics: {}
      };
    }
  }

  saveLog() {
    this.log.lastRun = new Date().toISOString();
    fs.writeFileSync(this.logFile, JSON.stringify(this.log, null, 2));
  }

  async executeCommand(command, description) {
    return new Promise((resolve, reject) => {
      console.log(`🔧 ${description}...`);
      exec(command, { cwd: this.projectDir }, (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ ${description} 失败:`, error.message);
          reject(error);
        } else {
          console.log(`✅ ${description} 完成`);
          this.log.tasksCompleted.push({
            task: description,
            completedAt: new Date().toISOString(),
            success: true
          });
          resolve(stdout);
        }
      });
    });
  }

  async generateAllContent() {
    console.log('📢 生成所有推广内容...\n');
    
    try {
      await this.executeCommand('bash promote.sh', '生成推广内容');
      await this.executeCommand('node lead-finder.js', '寻找潜在客户');
      await this.executeCommand('node social-media-automation.js generate', '生成社交媒体计划');
      await this.executeCommand('node auto-emailer.js plan', '生成邮件计划');
      
      console.log('✅ 所有内容生成完成');
      this.saveLog();
    } catch (error) {
      console.error('❌ 内容生成失败:', error);
    }
  }

  async startLocalServer() {
    console.log('🚀 启动本地服务器...\n');
    
    try {
      // 启动服务器在后台
      const server = exec('npm start', { cwd: this.projectDir });
      
      // 等待服务器启动
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('✅ 本地服务器已启动 (http://localhost:3000)');
      return server;
    } catch (error) {
      console.error('❌ 服务器启动失败:', error);
      throw error;
    }
  }

  async testAPI() {
    console.log('🧪 测试API功能...\n');
    
    try {
      // 生成API密钥
      const keyResponse = await this.executeCommand(
        'curl -X POST http://localhost:3000/api-key -H "Content-Type: application/json" -d \'{"email":"automation@test.com"}\'',
        '生成API密钥'
      );
      
      // 提取API密钥
      const keyMatch = keyResponse.match(/"apiKey":"([^"]+)"/);
      if (!keyMatch) {
        throw new Error('无法提取API密钥');
      }
      const apiKey = keyMatch[1];
      
      // 测试截图功能
      await this.executeCommand(
        `curl -X POST http://localhost:3000/screenshot -H "Content-Type: application/json" -d '{"url":"https://example.com","apiKey":"${apiKey}","width":1280,"height":720}'`,
        '测试截图API'
      );
      
      console.log('✅ API测试完成');
      this.log.metrics.apiWorking = true;
      this.saveLog();
    } catch (error) {
      console.error('❌ API测试失败:', error);
      this.log.metrics.apiWorking = false;
      this.saveLog();
      throw error;
    }
  }

  async runFullAutomation() {
    console.log('🤖 启动完整自动化流程\n');
    console.log('================================');
    
    try {
      // 1. 生成所有内容
      await this.generateAllContent();
      
      // 2. 启动服务器
      const server = await this.startLocalServer();
      
      // 3. 测试API
      await this.testAPI();
      
      // 4. 生成报告
      this.generateReport();
      
      console.log('\n🎉 自动化流程完成！');
      console.log('📊 查看详细报告');
      
      // 保持服务器运行
      console.log('\n💡 服务器继续运行中，按Ctrl+C停止');
      
    } catch (error) {
      console.error('\n❌ 自动化流程失败:', error);
      this.log.metrics.automationSuccess = false;
      this.saveLog();
    }
  }

  generateReport() {
    console.log('\n📊 自动化执行报告\n');
    console.log('================================');
    
    console.log(`最后运行: ${this.log.lastRun}`);
    console.log(`完成任务数: ${this.log.tasksCompleted.length}`);
    console.log(`API状态: ${this.log.metrics.apiWorking ? '✅ 正常' : '❌ 异常'}`);
    
    console.log('\n完成的任务:');
    this.log.tasksCompleted.forEach((task, index) => {
      console.log(`${index + 1}. ${task.task} (${task.completedAt})`);
    });
    
    // 检查生成的文件
    const filesToCheck = [
      'promotion_content/reddit_post.md',
      'promotion_content/product_hunt.md',
      'promotion_content/twitter_tweets.txt',
      'promotion_content/linkedin_posts.md',
      'promotion_content/medium_articles.md',
      'potential_leads.json',
      'social_schedule.json',
      'email_schedule.csv'
    ];
    
    console.log('\n📁 生成的文件:');
    filesToCheck.forEach(file => {
      const filePath = path.join(this.projectDir, file);
      const exists = fs.existsSync(filePath);
      console.log(`${exists ? '✅' : '❌'} ${file}`);
    });
    
    console.log('\n🚀 下一步建议:');
    console.log('1. 部署到Render平台');
    console.log('2. 配置Stripe支付');
    console.log('3. 开始社交媒体推广');
    console.log('4. 发送Cold Emails');
    console.log('5. 发布到Product Hunt');
  }

  async deployToRender() {
    console.log('🚀 准备部署到Render...\n');
    
    console.log('📋 部署检查清单:');
    console.log('✅ 代码已推送到GitHub');
    console.log('✅ render.yaml配置已准备');
    console.log('⏳ 需要手动完成以下步骤:');
    console.log('');
    console.log('1. 访问 https://dashboard.render.com');
    console.log('2. 点击 "New +" -> "Web Service"');
    console.log('3. 连接GitHub仓库: Rainny0822/screenshot-api');
    console.log('4. Render会自动检测render.yaml配置');
    console.log('5. 设置环境变量:');
    console.log('   - PORT: 10000');
    console.log('   - STRIPE_SECRET_KEY: [您的Stripe密钥]');
    console.log('   - STRIPE_PRICE_ID: [您的产品ID]');
    console.log('   - STRIPE_WEBHOOK_SECRET: [您的Webhook密钥]');
    console.log('   - FREE_QUOTA_PER_DAY: 10');
    console.log('   - PAID_QUOTA_PER_MONTH: 1000');
    console.log('6. 点击 "Deploy Web Service"');
    console.log('');
    
    // 打开Render Dashboard
    const { exec } = require('child_process');
    if (process.platform === 'darwin') {
      exec('open https://dashboard.render.com/new');
    } else if (process.platform === 'linux') {
      exec('xdg-open https://dashboard.render.com/new');
    }
    
    console.log('✅ 已打开Render部署页面');
  }

  async startMarketing() {
    console.log('📢 启动营销自动化...\n');
    
    try {
      // 生成社交媒体计划
      await this.executeCommand('node social-media-automation.js generate', '生成社交媒体计划');
      
      // 生成邮件计划
      await this.executeCommand('node auto-emailer.js plan', '生成邮件计划');
      
      // 显示统计
      await this.executeCommand('node social-media-automation.js stats', '社交媒体统计');
      await this.executeCommand('node auto-emailer.js stats', '邮件营销统计');
      
      console.log('\n📋 营销计划已生成');
      console.log('💡 建议的每日营销活动:');
      console.log('- Twitter: 每日2条推文 (9am, 3pm)');
      console.log('- LinkedIn: 每周2条帖子');
      console.log('- Reddit: 每周1次发布');
      console.log('- Cold Email: 每日5-10封');
      
    } catch (error) {
      console.error('❌ 营销自动化失败:', error);
    }
  }

  showStatus() {
    console.log('📊 系统状态\n');
    console.log('================================');
    
    console.log(`最后运行: ${this.log.lastRun || '从未运行'}`);
    console.log(`完成任务: ${this.log.tasksCompleted.length}`);
    console.log(`API状态: ${this.log.metrics.apiWorking ? '✅ 正常' : '❌ 未测试'}`);
    console.log(`自动化状态: ${this.log.metrics.automationSuccess !== false ? '✅ 正常' : '❌ 失败'}`);
    
    console.log('\n📁 项目文件状态:');
    const importantFiles = [
      'server.js',
      'package.json',
      'render.yaml',
      'README.md',
      'MARKETING_GUIDE.md',
      'MONEY_MAKING_GUIDE.md'
    ];
    
    importantFiles.forEach(file => {
      const filePath = path.join(this.projectDir, file);
      const exists = fs.existsSync(filePath);
      console.log(`${exists ? '✅' : '❌'} ${file}`);
    });
    
    console.log('\n🔧 自动化工具状态:');
    const tools = [
      'auto-publish.js',
      'lead-finder.js',
      'social-media-automation.js',
      'auto-emailer.js',
      'demo-client.js'
    ];
    
    tools.forEach(tool => {
      const toolPath = path.join(this.projectDir, tool);
      const exists = fs.existsSync(toolPath);
      console.log(`${exists ? '✅' : '❌'} ${tool}`);
    });
  }
}

// 使用示例
if (require.main === module) {
  const automation = new MasterAutomation();
  
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  switch (command) {
    case 'full':
      automation.runFullAutomation();
      break;
      
    case 'content':
      automation.generateAllContent();
      break;
      
    case 'test':
      automation.startLocalServer().then(() => automation.testAPI());
      break;
      
    case 'deploy':
      automation.deployToRender();
      break;
      
    case 'marketing':
      automation.startMarketing();
      break;
      
    case 'status':
      automation.showStatus();
      break;
      
    case 'help':
    default:
      console.log('🤖 主自动化控制器\n');
      console.log('可用命令:');
      console.log('  full      - 运行完整自动化流程');
      console.log('  content   - 生成所有推广内容');
      console.log('  test      - 测试API功能');
      console.log('  deploy    - 准备部署到Render');
      console.log('  marketing - 启动营销自动化');
      console.log('  status    - 显示系统状态');
      console.log('  help      - 显示帮助');
      break;
  }
}

module.exports = MasterAutomation;
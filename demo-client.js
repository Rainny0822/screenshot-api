/**
 * Screenshot API Demo Client
 * 演示如何使用Screenshot API
 */

const API_BASE = 'http://localhost:3000'; // 修改为您的部署URL

class ScreenshotAPIClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async generateApiKey(email) {
    try {
      const response = await fetch(`${this.baseUrl}/api-key`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      this.apiKey = data.apiKey;
      return data;
    } catch (error) {
      console.error('Error generating API key:', error);
      throw error;
    }
  }

  async takeScreenshot(url, options = {}) {
    if (!this.apiKey) {
      throw new Error('API key not set. Call generateApiKey() first.');
    }

    const payload = {
      url,
      apiKey: this.apiKey,
      width: options.width || 1280,
      height: options.height || 720
    };

    try {
      const response = await fetch(`${this.baseUrl}/screenshot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error taking screenshot:', error);
      throw error;
    }
  }

  async checkQuota() {
    if (!this.apiKey) {
      throw new Error('API key not set');
    }

    try {
      const response = await fetch(`${this.baseUrl}/quota/${this.apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking quota:', error);
      throw error;
    }
  }

  async startCheckout() {
    if (!this.apiKey) {
      throw new Error('API key not set');
    }

    try {
      const response = await fetch(`${this.baseUrl}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: this.apiKey })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error starting checkout:', error);
      throw error;
    }
  }
}

// 使用示例
async function demo() {
  const client = new ScreenshotAPIClient(API_BASE);

  try {
    console.log('🔑 Generating API key...');
    const keyData = await client.generateApiKey('demo@example.com');
    console.log('✅ API Key:', keyData.apiKey);

    console.log('📊 Checking quota...');
    const quota = await client.checkQuota();
    console.log('✅ Quota:', quota);

    console.log('📸 Taking screenshot...');
    const screenshot = await client.takeScreenshot('https://example.com');
    console.log('✅ Screenshot taken!');
    console.log('📏 Image size:', screenshot.image.length, 'characters');
    console.log('📊 Remaining requests:', screenshot.remaining);

    // 保存截图到文件
    if (screenshot.success) {
      const base64Data = screenshot.image.replace(/^data:image\/png;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      require('fs').writeFileSync('screenshot.png', buffer);
      console.log('💾 Screenshot saved to screenshot.png');
    }

  } catch (error) {
    console.error('❌ Demo failed:', error.message);
  }
}

// 运行演示
if (require.main === module) {
  demo();
}

module.exports = ScreenshotAPIClient;
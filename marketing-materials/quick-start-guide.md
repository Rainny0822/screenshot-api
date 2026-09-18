# Screenshot API - Quick Start Guide

## 5-Minute Quick Start

### Step 1: Get Your API Key
```bash
curl -X POST https://your-api.com/api-key \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com"}'
```

Response:
```json
{
  "apiKey": "sk_your_api_key_here",
  "message": "API key generated successfully"
}
```

### Step 2: Take Your First Screenshot
```bash
curl -X POST https://your-api.com/screenshot \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "apiKey": "sk_your_api_key_here",
    "width": 1280,
    "height": 720
  }'
```

Response:
```json
{
  "success": true,
  "image": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "remaining": 9
}
```

### Step 3: Use the Screenshot
The base64 image can be used directly in HTML:
```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANS..." alt="Screenshot">
```

Or decode and save as a file.

## Code Examples

### JavaScript/Node.js
```javascript
const axios = require('axios');

async function captureScreenshot(url, apiKey) {
  const response = await axios.post('https://your-api.com/screenshot', {
    url,
    apiKey,
    width: 1280,
    height: 720
  });
  
  if (response.data.success) {
    // Save screenshot
    const base64Data = response.data.image.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    require('fs').writeFileSync('screenshot.png', buffer);
    console.log('Screenshot saved!');
  }
}

captureScreenshot('https://example.com', 'your_api_key');
```

### Python
```python
import requests
import base64

def capture_screenshot(url, api_key):
    response = requests.post('https://your-api.com/screenshot', json={
        'url': url,
        'apiKey': api_key,
        'width': 1280,
        'height': 720
    })
    
    if response.json()['success']:
        # Save screenshot
        image_data = response.json()['image'].split(',')[1]
        with open('screenshot.png', 'wb') as f:
            f.write(base64.b64decode(image_data))
        print('Screenshot saved!')

capture_screenshot('https://example.com', 'your_api_key')
```

### PHP
```php
<?php
function captureScreenshot($url, $apiKey) {
    $ch = curl_init('https://your-api.com/screenshot');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'url' => $url,
        'apiKey' => $apiKey,
        'width' => 1280,
        'height' => 720
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $data = json_decode($response, true);
    if ($data['success']) {
        // Save screenshot
        $imageData = base64_decode(str_replace('data:image/png;base64,', '', $data['image']));
        file_put_contents('screenshot.png', $imageData);
        echo 'Screenshot saved!';
    }
}

captureScreenshot('https://example.com', 'your_api_key');
?>
```

### Ruby
```ruby
require 'net/http'
require 'json'
require 'base64'

def capture_screenshot(url, api_key)
  uri = URI('https://your-api.com/screenshot')
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  
  request = Net::HTTP::Post.new(uri.path, {'Content-Type' => 'application/json'})
  request.body = {
    url: url,
    apiKey: api_key,
    width: 1280,
    height: 720
  }.to_json
  
  response = http.request(request)
  data = JSON.parse(response.body)
  
  if data['success']
    # Save screenshot
    image_data = Base64.decode64(data['image'].sub('data:image/png;base64,', ''))
    File.write('screenshot.png', image_data)
    puts 'Screenshot saved!'
  end
end

capture_screenshot('https://example.com', 'your_api_key')
```

## Common Use Cases

### 1. Website Thumbnail Generator
```javascript
// Generate thumbnails for a list of websites
const websites = [
  'https://google.com',
  'https://github.com',
  'https://stackoverflow.com'
];

websites.forEach(async (url) => {
  await captureScreenshot(url, 'your_api_key');
});
```

### 2. Social Media Preview Generator
```javascript
// Create social media card previews
async function generateSocialPreview(url) {
  const screenshot = await captureScreenshot(url, 'your_api_key', {
    width: 1200,  // Social media optimal width
    height: 630   // Social media optimal height
  });
  return screenshot;
}
```

### 3. Automated Testing
```javascript
// Visual regression testing
async function testVisualRegression(url, expectedScreenshot) {
  const current = await captureScreenshot(url, 'your_api_key');
  // Compare current with expected
  const areSame = compareImages(current, expectedScreenshot);
  return areSame;
}
```

## Error Handling

### Quota Exceeded
```javascript
try {
  const result = await captureScreenshot(url, apiKey);
  if (result.remaining === 0) {
    console.log('Quota exceeded. Upgrade to Pro for more requests.');
  }
} catch (error) {
  if (error.response && error.response.status === 429) {
    console.log('Rate limited. Please wait before trying again.');
  }
}
```

### Invalid URL
```javascript
try {
  const result = await captureScreenshot('invalid-url', apiKey);
} catch (error) {
  if (error.response && error.response.data.error) {
    console.log('Error:', error.response.data.error);
  }
}
```

## Best Practices

1. **Cache Screenshots**: If capturing the same URL multiple times, cache the results
2. **Handle Errors**: Always implement proper error handling
3. **Monitor Quota**: Check your remaining requests to avoid unexpected limits
4. **Use Appropriate Resolution**: Lower resolution for thumbnails, higher for quality
5. **Set Timeouts**: Implement timeout handling for slow-loading pages

## Support

- 📧 Email: support@screenshot-api.com
- 📖 Documentation: https://docs.screenshot-api.com
- 💬 Discord: https://discord.gg/screenshot-api
- 🐛 Issues: https://github.com/Rainny0822/screenshot-api/issues

## Next Steps

- 🚀 Deploy to production
- 📊 Monitor your usage
- 💎 Upgrade to Pro for higher limits
- 🎯 Explore advanced features

Happy screenshotting! 📸
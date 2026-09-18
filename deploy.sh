#!/bin/bash

# Screenshot API 自动部署脚本
# 此脚本帮助您快速部署到Render平台

echo "🚀 Screenshot API 部署助手"
echo "================================"

# 检查是否已登录Render
echo "📋 检查Render账户状态..."
if ! command -v render &> /dev/null; then
    echo "❌ Render CLI未安装"
    echo "请访问 https://render.com/docs/install-render-cli 安装"
    exit 1
fi

# 检查Git仓库
if [ ! -d ".git" ]; then
    echo "❌ 当前目录不是Git仓库"
    exit 1
fi

echo "✅ Git仓库检查通过"

# 检查环境变量文件
if [ ! -f ".env" ]; then
    echo "⚠️  .env文件不存在，从.env.example创建"
    cp .env.example .env
    echo "📝 请编辑.env文件，填入您的Stripe密钥"
    echo "   - STRIPE_SECRET_KEY"
    echo "   - STRIPE_PRICE_ID" 
    echo "   - STRIPE_WEBHOOK_SECRET"
    read -p "按Enter继续编辑.env文件..."
    ${EDITOR:-nano} .env
fi

echo "📦 准备部署到Render..."
echo ""
echo "🔧 部署步骤："
echo "1. 访问 https://dashboard.render.com"
echo "2. 点击 'New + ' -> 'Web Service'"
echo "3. 连接GitHub仓库: Rainny0822/screenshot-api"
echo "4. Render会自动检测render.yaml配置"
echo "5. 设置环境变量（从.env文件复制）"
echo "6. 点击 'Deploy Web Service'"
echo ""
echo "📝 需要设置的环境变量："
echo "   - PORT: 10000"
echo "   - STRIPE_SECRET_KEY: 您的Stripe密钥"
echo "   - STRIPE_PRICE_ID: 您的Stripe产品ID"
echo "   - STRIPE_WEBHOOK_SECRET: 您的Webhook密钥"
echo "   - FREE_QUOTA_PER_DAY: 10"
echo "   - PAID_QUOTA_PER_MONTH: 1000"
echo ""

read -p "是否打开Render部署页面？(y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "https://dashboard.render.com/new"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "https://dashboard.render.com/new"
    else
        echo "请手动访问: https://dashboard.render.com/new"
    fi
fi

echo ""
echo "🎯 部署后检查清单："
echo "   [ ] 服务成功启动"
echo "   [ ] 健康检查端点可访问"
echo "   [ ] Stripe Webhook配置正确"
echo "   [ ] API测试通过"
echo ""
echo "📊 部署完成后，访问您的服务URL测试API"
echo "💡 部署URL格式: https://screenshot-api.onrender.com"
echo ""
echo "祝部署成功！🚀"
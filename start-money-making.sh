#!/bin/bash

# Screenshot API 自动赚钱启动脚本
# 一键启动所有赚钱工具和自动化流程

echo "💰 Screenshot API 自动赚钱系统"
echo "================================"
echo ""

# 显示菜单
echo "请选择操作:"
echo "1. 🚀 部署服务到云端"
echo "2. 📊 查看推广Dashboard"
echo "3. 📢 生成推广内容"
echo "4. 🎯 寻找潜在客户"
echo "5. 📧 发送推广邮件"
echo "6. 📱 查看发布指南"
echo "7. 📈 查看收入计算"
echo "8. 🆘 查看帮助文档"
echo "9. 🎉 启动完整赚钱流程"
echo "0. 退出"
echo ""

read -p "请输入选项 (0-9): " choice

case $choice in
    1)
        echo "🚀 启动部署助手..."
        ./deploy.sh
        ;;
    2)
        echo "📊 启动推广Dashboard..."
        ./start-dashboard.sh
        ;;
    3)
        echo "📢 生成推广内容..."
        ./promote.sh
        echo ""
        echo "📁 推广内容已生成到 promotion_content/ 目录"
        ;;
    4)
        echo "🎯 寻找潜在客户..."
        node lead-finder.js
        ;;
    5)
        echo "📧 邮件推广功能"
        echo "📝 邮件模板位于: marketing-materials/email-sequences.md"
        echo "💡 建议使用邮件营销工具批量发送"
        echo ""
        echo "📧 手动发送步骤:"
        echo "1. 从 marketing-materials/email-sequences.md 选择模板"
        echo "2. 根据 potential_leads.json 个性化内容"
        echo "3. 使用邮件工具发送"
        ;;
    6)
        echo "📱 查看发布指南..."
        echo ""
        echo "可用平台指南:"
        echo "1. Reddit: node auto-publish.js reddit"
        echo "2. Product Hunt: node auto-publish.js product-hunt"
        echo "3. Twitter: node auto-publish.js twitter"
        echo "4. Dev.to: node auto-publish.js dev-to"
        echo "5. Hacker News: node auto-publish.js hacker-news"
        echo "6. Email: node auto-publish.js email"
        echo ""
        read -p "输入平台名称查看详细指南: " platform
        node auto-publish.js $platform
        ;;
    7)
        echo "📈 收入计算"
        echo ""
        echo "💰 收入模型:"
        echo "- 免费层级: 10次/天 (吸引用户)"
        echo "- 付费计划: $5/月 (1000次)"
        echo "- 目标: 20个付费用户 = $100/月"
        echo ""
        echo "📊 转化漏斗:"
        echo "100试用用户 → 20%转化率 → 20付费用户 → $100收入"
        echo ""
        echo "🎯 达到目标的策略:"
        echo "- Reddit推广: 预计30试用用户"
        echo "- Product Hunt: 预计40试用用户"
        echo "- Cold Email: 预计20试用用户"
        echo "- Twitter推广: 预计10试用用户"
        echo ""
        echo "💡 启动Dashboard查看详细计算: ./start-dashboard.sh"
        ;;
    8)
        echo "🆘 帮助文档"
        echo ""
        echo "📚 可用文档:"
        echo "- README.md: 项目文档和API说明"
        echo "- MARKETING_GUIDE.md: 完整营销指南"
        echo "- marketing-materials/landing-page-copy.md: 网站文案"
        echo "- marketing-materials/email-sequences.md: 邮件模板"
        echo "- marketing-materials/quick-start-guide.md: 快速开始指南"
        echo ""
        echo "🔧 可用工具:"
        echo "- deploy.sh: 部署助手"
        echo "- promote.sh: 推广内容生成"
        echo "- lead-finder.js: 客户寻找工具"
        echo "- auto-publish.js: 发布指南工具"
        echo "- demo-client.js: API测试客户端"
        echo "- start-dashboard.sh: Dashboard启动"
        echo ""
        echo "🌐 重要链接:"
        echo "- GitHub: https://github.com/Rainny0822/screenshot-api"
        echo "- Render: https://dashboard.render.com"
        echo "- Stripe: https://stripe.com"
        echo "- Product Hunt: https://www.producthunt.com"
        ;;
    9)
        echo "🎉 启动完整赚钱流程"
        echo ""
        echo "📋 完整赚钱流程:"
        echo ""
        echo "第1步: 基础建设"
        echo "  - 代码已推送到GitHub ✅"
        echo "  - 需要部署到Render (选择选项1)"
        echo "  - 需要配置Stripe支付"
        echo ""
        echo "第2步: 推广准备"
        echo "  - 生成推广内容 (选择选项3)"
        echo "  - 寻找潜在客户 (选择选项4)"
        echo "  - 查看Dashboard (选择选项2)"
        echo ""
        echo "第3步: 开始推广"
        echo "  - Reddit发布"
        echo "  - Product Hunt发布"
        echo "  - 发送Cold Emails"
        echo "  - Twitter日常推广"
        echo ""
        echo "第4步: 持续优化"
        echo "  - 跟踪转化数据"
        echo "  - 优化推广策略"
        echo "  - 扩展推广渠道"
        echo ""
        echo "💡 建议从选项1开始，按顺序执行"
        echo ""
        read -p "按Enter继续执行第1步 (部署)..."
        ./deploy.sh
        ;;
    0)
        echo "👋 再见！祝您赚钱成功！"
        exit 0
        ;;
    *)
        echo "❌ 无效选项，请重新选择"
        ;;
esac

echo ""
echo "💡 提示: 运行 ./start-money-making.sh 重新显示菜单"
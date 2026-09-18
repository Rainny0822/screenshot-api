#!/bin/bash

# 启动推广Dashboard

echo "🚀 启动Screenshot API推广Dashboard"

# 检查Python是否安装（用于简单的HTTP服务器）
if command -v python3 &> /dev/null; then
    echo "📡 启动本地HTTP服务器..."
    echo "🌐 Dashboard将在浏览器中打开"
    echo "📍 访问地址: http://localhost:8000/dashboard.html"
    echo ""
    echo "按Ctrl+C停止服务器"
    
    # 在后台启动HTTP服务器
    cd "$(dirname "$0")"
    python3 -m http.server 8000 &
    SERVER_PID=$!
    
    # 等待服务器启动
    sleep 2
    
    # 打开浏览器
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "http://localhost:8000/dashboard.html"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "http://localhost:8000/dashboard.html"
    else
        echo "请手动在浏览器中打开: http://localhost:8000/dashboard.html"
    fi
    
    # 等待用户中断
    wait $SERVER_PID
    
elif command -v python &> /dev/null; then
    echo "📡 使用Python启动HTTP服务器..."
    cd "$(dirname "$0")"
    python -m SimpleHTTPServer 8000 &
    SERVER_PID=$!
    
    sleep 2
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "http://localhost:8000/dashboard.html"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "http://localhost:8000/dashboard.html"
    fi
    
    wait $SERVER_PID
    
else
    echo "❌ 未找到Python，无法启动HTTP服务器"
    echo "💡 请安装Python3或直接在浏览器中打开 dashboard.html 文件"
    echo "📍 文件位置: $(pwd)/dashboard.html"
    
    # 尝试直接打开文件
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "$(pwd)/dashboard.html"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "$(pwd)/dashboard.html"
    fi
fi
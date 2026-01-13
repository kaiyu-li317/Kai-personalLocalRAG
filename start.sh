#!/bin/bash

# KAI 一键启动脚本
# 使用方法: ./start.sh [start|stop|restart|status]

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SERVER_DIR="$SCRIPT_DIR/kai-server"
CLIENT_DIR="$SCRIPT_DIR/kai-client"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# PID 文件
PID_FILE="$SCRIPT_DIR/.kai.pid"

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查端口是否被占用
check_port() {
    lsof -i:$1 > /dev/null 2>&1
    return $?
}

# 等待服务启动
wait_for_service() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            return 0
        fi
        sleep 1
        attempt=$((attempt + 1))
    done
    return 1
}

# 停止所有服务
stop_services() {
    log_info "停止所有 KAI 服务..."
    
    # 停止前端
    pkill -f "vite.*kai-client" 2>/dev/null
    pkill -f "npm.*dev.*kai-client" 2>/dev/null
    
    # 停止后端
    pkill -f "python.*app.py" 2>/dev/null
    pkill -f "uvicorn.*app:app" 2>/dev/null
    
    # 停止 Ollama (可选，通常保持运行)
    # pkill -f "ollama serve" 2>/dev/null
    
    # 清理 PID 文件
    rm -f "$PID_FILE"
    
    sleep 2
    log_info "所有服务已停止"
}

# 检查服务状态
check_status() {
    echo -e "\n${BLUE}========== KAI 服务状态 ==========${NC}\n"
    
    # Ollama
    if pgrep -f "ollama" > /dev/null 2>&1; then
        if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
            echo -e "Ollama (11434):  ${GREEN}✓ 运行中${NC}"
        else
            echo -e "Ollama (11434):  ${YELLOW}⚠ 进程存在但无响应${NC}"
        fi
    else
        echo -e "Ollama (11434):  ${RED}✗ 未运行${NC}"
    fi
    
    # 后端
    if curl -s http://localhost:6088/ > /dev/null 2>&1; then
        echo -e "后端   (6088):   ${GREEN}✓ 运行中${NC}"
    else
        echo -e "后端   (6088):   ${RED}✗ 未运行${NC}"
    fi
    
    # 前端
    if curl -s http://localhost:11420/ > /dev/null 2>&1; then
        echo -e "前端   (11420):  ${GREEN}✓ 运行中${NC}"
    else
        echo -e "前端   (11420):  ${RED}✗ 未运行${NC}"
    fi
    
    echo ""
}

# 启动所有服务
start_services() {
    echo -e "\n${BLUE}� 启动 KAI 服务...${NC}\n"
    
    # 1. 启动 Ollama
    if ! pgrep -f "ollama" > /dev/null 2>&1; then
        log_info "启动 Ollama..."
        ollama serve > /dev/null 2>&1 &
        echo $! >> "$PID_FILE"
        
        # 等待 Ollama 启动
        if wait_for_service "http://localhost:11434/api/tags" "Ollama"; then
            log_info "Ollama 启动成功 ✓"
        else
            log_error "Ollama 启动超时"
        fi
    else
        log_info "Ollama 已在运行 ✓"
    fi
    
    # 2. 停止可能存在的旧后端进程
    pkill -f "python.*app.py" 2>/dev/null
    sleep 1
    
    # 3. 启动后端
    log_info "启动后端服务..."
    cd "$SERVER_DIR"
    python app.py > /dev/null 2>&1 &
    echo $! >> "$PID_FILE"
    
    # 等待后端启动
    if wait_for_service "http://localhost:6088/" "Backend"; then
        log_info "后端服务启动成功 ✓"
    else
        log_error "后端服务启动失败"
        return 1
    fi
    
    # 4. 停止可能存在的旧前端进程
    pkill -f "vite.*11420" 2>/dev/null
    sleep 1
    
    # 5. 启动前端
    log_info "启动前端服务..."
    cd "$CLIENT_DIR"
    npm run dev > /dev/null 2>&1 &
    echo $! >> "$PID_FILE"
    
    # 等待前端启动
    if wait_for_service "http://localhost:11420/" "Frontend"; then
        log_info "前端服务启动成功 ✓"
    else
        log_error "前端服务启动失败"
        return 1
    fi
    
    # 显示成功信息
    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}✅ KAI 启动完成!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "\n📍 访问地址: ${BLUE}http://localhost:11420${NC}"
    echo -e "📍 后端 API: ${BLUE}http://localhost:6088${NC}"
    echo -e "📍 Ollama:   ${BLUE}http://localhost:11434${NC}\n"
}

# 主逻辑
case "${1:-start}" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        stop_services
        sleep 2
        start_services
        ;;
    status)
        check_status
        ;;
    *)
        echo "用法: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac

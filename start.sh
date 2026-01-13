#!/bin/bash#!/bin/bash



# KAI One-Click Start Script# KAI 一键启动脚本

# Usage: ./start.sh [start|stop|restart|status]# 使用方法: ./start.sh [start|stop|restart|status]



SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

SERVER_DIR="$SCRIPT_DIR/kai-server"SERVER_DIR="$SCRIPT_DIR/kai-server"

CLIENT_DIR="$SCRIPT_DIR/kai-client"CLIENT_DIR="$SCRIPT_DIR/kai-client"



# Color definitions# 颜色定义

RED='\033[0;31m'RED='\033[0;31m'

GREEN='\033[0;32m'GREEN='\033[0;32m'

YELLOW='\033[1;33m'YELLOW='\033[1;33m'

BLUE='\033[0;34m'BLUE='\033[0;34m'

NC='\033[0m' # No ColorNC='\033[0m' # No Color



# PID file# PID 文件

PID_FILE="$SCRIPT_DIR/.kai.pid"PID_FILE="$SCRIPT_DIR/.kai.pid"



log_info() {log_info() {

    echo -e "${GREEN}[INFO]${NC} $1"    echo -e "${GREEN}[INFO]${NC} $1"

}}



log_warn() {log_warn() {

    echo -e "${YELLOW}[WARN]${NC} $1"    echo -e "${YELLOW}[WARN]${NC} $1"

}}



log_error() {log_error() {

    echo -e "${RED}[ERROR]${NC} $1"    echo -e "${RED}[ERROR]${NC} $1"

}}



# Check if port is in use# 检查端口是否被占用

check_port() {check_port() {

    lsof -i:$1 > /dev/null 2>&1    lsof -i:$1 > /dev/null 2>&1

    return $?    return $?

}}



# Wait for service to start# 等待服务启动

wait_for_service() {wait_for_service() {

    local url=$1    local url=$1

    local name=$2    local name=$2

    local max_attempts=30    local max_attempts=30

    local attempt=0    local attempt=0

        

    while [ $attempt -lt $max_attempts ]; do    while [ $attempt -lt $max_attempts ]; do

        if curl -s "$url" > /dev/null 2>&1; then        if curl -s "$url" > /dev/null 2>&1; then

            return 0            return 0

        fi        fi

        sleep 1        sleep 1

        attempt=$((attempt + 1))        attempt=$((attempt + 1))

    done    done

    return 1    return 1

}}



# Stop all services# 停止所有服务

stop_services() {stop_services() {

    log_info "Stopping all KAI services..."    log_info "停止所有 KAI 服务..."

        

    # Stop frontend    # 停止前端

    pkill -f "vite.*kai-client" 2>/dev/null    pkill -f "vite.*kai-client" 2>/dev/null

    pkill -f "npm.*dev.*kai-client" 2>/dev/null    pkill -f "npm.*dev.*kai-client" 2>/dev/null

        

    # Stop backend    # 停止后端

    pkill -f "python.*app.py" 2>/dev/null    pkill -f "python.*app.py" 2>/dev/null

    pkill -f "uvicorn.*app:app" 2>/dev/null    pkill -f "uvicorn.*app:app" 2>/dev/null

        

    # Stop Ollama (optional, usually keep running)    # 停止 Ollama (可选，通常保持运行)

    # pkill -f "ollama serve" 2>/dev/null    # pkill -f "ollama serve" 2>/dev/null

        

    # Clean up PID file    # 清理 PID 文件

    rm -f "$PID_FILE"    rm -f "$PID_FILE"

        

    sleep 2    sleep 2

    log_info "All services stopped"    log_info "所有服务已停止"

}}



# Check service status# 检查服务状态

check_status() {check_status() {

    echo -e "\n${BLUE}========== KAI Service Status ==========${NC}\n"    echo -e "\n${BLUE}========== KAI 服务状态 ==========${NC}\n"

        

    # Ollama    # Ollama

    if pgrep -f "ollama" > /dev/null 2>&1; then    if pgrep -f "ollama" > /dev/null 2>&1; then

        if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then        if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then

            echo -e "Ollama   (11434):  ${GREEN}✓ Running${NC}"            echo -e "Ollama (11434):  ${GREEN}✓ 运行中${NC}"

        else        else

            echo -e "Ollama   (11434):  ${YELLOW}⚠ Process exists but not responding${NC}"            echo -e "Ollama (11434):  ${YELLOW}⚠ 进程存在但无响应${NC}"

        fi        fi

    else    else

        echo -e "Ollama   (11434):  ${RED}✗ Not running${NC}"        echo -e "Ollama (11434):  ${RED}✗ 未运行${NC}"

    fi    fi

        

    # Backend    # 后端

    if curl -s http://localhost:6088/ > /dev/null 2>&1; then    if curl -s http://localhost:6088/ > /dev/null 2>&1; then

        echo -e "Backend  (6088):   ${GREEN}✓ Running${NC}"        echo -e "后端   (6088):   ${GREEN}✓ 运行中${NC}"

    else    else

        echo -e "Backend  (6088):   ${RED}✗ Not running${NC}"        echo -e "后端   (6088):   ${RED}✗ 未运行${NC}"

    fi    fi

        

    # Frontend    # 前端

    if curl -s http://localhost:11420/ > /dev/null 2>&1; then    if curl -s http://localhost:11420/ > /dev/null 2>&1; then

        echo -e "Frontend (11420):  ${GREEN}✓ Running${NC}"        echo -e "前端   (11420):  ${GREEN}✓ 运行中${NC}"

    else    else

        echo -e "Frontend (11420):  ${RED}✗ Not running${NC}"        echo -e "前端   (11420):  ${RED}✗ 未运行${NC}"

    fi    fi

        

    echo ""    echo ""

}}



# Start all services# 启动所有服务

start_services() {start_services() {

    echo -e "\n${BLUE}🚀 Starting KAI services...${NC}\n"    echo -e "\n${BLUE}� 启动 KAI 服务...${NC}\n"

        

    # 1. Start Ollama    # 1. 启动 Ollama

    if ! pgrep -f "ollama" > /dev/null 2>&1; then    if ! pgrep -f "ollama" > /dev/null 2>&1; then

        log_info "Starting Ollama..."        log_info "启动 Ollama..."

        ollama serve > /dev/null 2>&1 &        ollama serve > /dev/null 2>&1 &

        echo $! >> "$PID_FILE"        echo $! >> "$PID_FILE"

                

        # Wait for Ollama to start        # 等待 Ollama 启动

        if wait_for_service "http://localhost:11434/api/tags" "Ollama"; then        if wait_for_service "http://localhost:11434/api/tags" "Ollama"; then

            log_info "Ollama started successfully ✓"            log_info "Ollama 启动成功 ✓"

        else        else

            log_error "Ollama startup timeout"            log_error "Ollama 启动超时"

        fi        fi

    else    else

        log_info "Ollama is already running ✓"        log_info "Ollama 已在运行 ✓"

    fi    fi

        

    # 2. Stop any existing old backend processes    # 2. 停止可能存在的旧后端进程

    pkill -f "python.*app.py" 2>/dev/null    pkill -f "python.*app.py" 2>/dev/null

    sleep 1    sleep 1

        

    # 3. Start backend    # 3. 启动后端

    log_info "Starting backend service..."    log_info "启动后端服务..."

    cd "$SERVER_DIR"    cd "$SERVER_DIR"

    python app.py > /dev/null 2>&1 &    python app.py > /dev/null 2>&1 &

    echo $! >> "$PID_FILE"    echo $! >> "$PID_FILE"

        

    # Wait for backend to start    # 等待后端启动

    if wait_for_service "http://localhost:6088/" "Backend"; then    if wait_for_service "http://localhost:6088/" "Backend"; then

        log_info "Backend service started successfully ✓"        log_info "后端服务启动成功 ✓"

    else    else

        log_error "Backend service failed to start"        log_error "后端服务启动失败"

        return 1        return 1

    fi    fi

        

    # 4. Stop any existing old frontend processes    # 4. 停止可能存在的旧前端进程

    pkill -f "vite.*11420" 2>/dev/null    pkill -f "vite.*11420" 2>/dev/null

    sleep 1    sleep 1

        

    # 5. Start frontend    # 5. 启动前端

    log_info "Starting frontend service..."    log_info "启动前端服务..."

    cd "$CLIENT_DIR"    cd "$CLIENT_DIR"

    npm run dev > /dev/null 2>&1 &    npm run dev > /dev/null 2>&1 &

    echo $! >> "$PID_FILE"    echo $! >> "$PID_FILE"

        

    # Wait for frontend to start    # 等待前端启动

    if wait_for_service "http://localhost:11420/" "Frontend"; then    if wait_for_service "http://localhost:11420/" "Frontend"; then

        log_info "Frontend service started successfully ✓"        log_info "前端服务启动成功 ✓"

    else    else

        log_error "Frontend service failed to start"        log_error "前端服务启动失败"

        return 1        return 1

    fi    fi

        

    # Display success message    # 显示成功信息

    echo -e "\n${GREEN}========================================${NC}"    echo -e "\n${GREEN}========================================${NC}"

    echo -e "${GREEN}✅ KAI Started Successfully!${NC}"    echo -e "${GREEN}✅ KAI 启动完成!${NC}"

    echo -e "${GREEN}========================================${NC}"    echo -e "${GREEN}========================================${NC}"

    echo -e "\n📍 Web UI:      ${BLUE}http://localhost:11420${NC}"    echo -e "\n📍 访问地址: ${BLUE}http://localhost:11420${NC}"

    echo -e "📍 Backend API: ${BLUE}http://localhost:6088${NC}"    echo -e "📍 后端 API: ${BLUE}http://localhost:6088${NC}"

    echo -e "📍 Ollama:      ${BLUE}http://localhost:11434${NC}\n"    echo -e "📍 Ollama:   ${BLUE}http://localhost:11434${NC}\n"

}}



# Main logic# 主逻辑

case "${1:-start}" incase "${1:-start}" in

    start)    start)

        start_services        start_services

        ;;        ;;

    stop)    stop)

        stop_services        stop_services

        ;;        ;;

    restart)    restart)

        stop_services        stop_services

        sleep 2        sleep 2

        start_services        start_services

        ;;        ;;

    status)    status)

        check_status        check_status

        ;;        ;;

    *)    *)

        echo "Usage: $0 {start|stop|restart|status}"        echo "用法: $0 {start|stop|restart|status}"

        exit 1        exit 1

        ;;        ;;

esacesac


#!/bin/bash

# KAI One-Click Start Script

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SERVER_DIR="$SCRIPT_DIR/kai-server"
CLIENT_DIR="$SCRIPT_DIR/kai-client"

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

check_port() {
    lsof -i:$1 > /dev/null 2>&1
    return $?
}

start_server() {
    log_info "Starting backend server..."
    cd "$SERVER_DIR"
    
    if [ ! -d "venv" ]; then
        log_info "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    source venv/bin/activate
    
    if ! pip show fastapi > /dev/null 2>&1; then
        log_info "Installing Python dependencies..."
        pip install -r requirements.txt -q
    fi
    
    nohup python app.py > /dev/null 2>&1 &
    SERVER_PID=$!
    echo "SERVER_PID=$SERVER_PID" > "$PID_FILE"
    log_info "Backend server started (PID: $SERVER_PID)"
}

start_client() {
    log_info "Starting frontend client..."
    cd "$CLIENT_DIR"
    
    if [ ! -d "node_modules" ]; then
        log_info "Installing Node.js dependencies..."
        npm install
    fi
    
    nohup npm run dev > /dev/null 2>&1 &
    CLIENT_PID=$!
    echo "CLIENT_PID=$CLIENT_PID" >> "$PID_FILE"
    log_info "Frontend client started (PID: $CLIENT_PID)"
}

main() {
    echo ""
    echo -e "${BLUE}=====================================${NC}"
    echo -e "${BLUE}       KAI - Personal Local RAG      ${NC}"
    echo -e "${BLUE}=====================================${NC}"
    echo ""
    
    if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        log_warn "Ollama is not running. Please start Ollama first."
    fi
    
    if check_port 6088; then
        log_warn "Port 6088 already in use"
    else
        start_server
    fi
    
    if check_port 11420; then
        log_warn "Port 11420 already in use"
    else
        start_client
    fi
    
    echo ""
    log_info "Waiting for services..."
    sleep 3
    
    echo ""
    echo -e "${GREEN}=====================================${NC}"
    echo -e "${GREEN}         Services Started!          ${NC}"
    echo -e "${GREEN}=====================================${NC}"
    echo ""
    echo -e "  Frontend:  ${BLUE}http://localhost:11420${NC}"
    echo -e "  Backend:   ${BLUE}http://localhost:6088${NC}"
    echo ""
}

main

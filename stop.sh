#!/bin/bash

# KAI Stop Script

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

kill_port() {
    local pid=$(lsof -t -i:$1 2>/dev/null)
    if [ -n "$pid" ]; then
        kill -9 $pid 2>/dev/null
        return 0
    fi
    return 1
}

echo ""
log_info "Stopping KAI services..."

if kill_port 6088; then
    log_info "Backend server stopped"
else
    log_warn "Backend was not running"
fi

if kill_port 11420; then
    log_info "Frontend client stopped"
else
    log_warn "Frontend was not running"
fi

rm -f "$SCRIPT_DIR/.kai.pid"
echo ""
log_info "All services stopped"
echo ""

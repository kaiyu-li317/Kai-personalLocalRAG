# Quick Start Guide

This guide will help you get KAI up and running in minutes.

---

## Prerequisites

Before you begin, make sure you have the following installed:

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Python | 3.11+ | `python --version` |
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | any | `git --version` |

Optional (for local LLM):
- **Ollama** - Download from https://ollama.ai

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/kaiyu-li317/Kai-personalLocalRAG.git
cd Kai-personalLocalRAG
```

---

## Step 2: Setup Backend Server

```bash
# Navigate to backend directory
cd kai-server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# macOS/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py
```

The backend server will start at `http://localhost:6088`

---

## Step 3: Setup Frontend Client

Open a new terminal window:

```bash
# Navigate to frontend directory
cd kai-client

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start at `http://localhost:11420`

---

## Step 4: Access the Application

Open your browser and go to:

```
http://localhost:11420
```

---

## Step 5: Configure LLM (Optional but Recommended)

### Option A: Use Ollama (Local, Private)

1. Install Ollama from https://ollama.ai
2. Pull a model:
   ```bash
   ollama pull qwen2.5:7b
   ```
3. In KAI, go to **Settings** > **LLM**
4. Select **Ollama** as provider
5. Base URL: `http://127.0.0.1:11434`
6. Click **Sync Models**
7. Select your model

### Option B: Use Cloud Provider

1. In KAI, go to **Settings** > **LLM**
2. Select a provider (OpenAI, DeepSeek, etc.)
3. Enter your API Key
4. Click **Sync Models**
5. Select your model

---

## Quick Commands Reference

### Start Services

```bash
# Backend (Terminal 1)
cd kai-server
source venv/bin/activate
python app.py

# Frontend (Terminal 2)
cd kai-client
npm run dev
```

### Or use helper scripts

```bash
./start.sh   # Start all services
./stop.sh    # Stop all services
```

---

## First Steps After Setup

1. **Create a Knowledge Base**
   - Click "Repository" in sidebar
   - Click "New Repository"
   - Enter a name and description

2. **Add Documents**
   - Open your knowledge base
   - Click "Import"
   - Select PDF, Word, Markdown, or text files

3. **Start a Conversation**
   - Click "Chat" in sidebar
   - Select your knowledge base
   - Ask questions about your documents

---

## Troubleshooting

### Backend won't start

```bash
# Check if port 6088 is in use
lsof -i:6088

# Kill the process if needed
kill -9 <PID>
```

### Frontend won't start

```bash
# Check if port 11420 is in use
lsof -i:11420

# Try clearing node_modules
rm -rf node_modules
npm install
```

### Ollama connection failed

```bash
# Check if Ollama is running
ollama list

# Start Ollama service
ollama serve
```

### Model not showing up

1. Make sure Ollama is running
2. Go to Settings > LLM
3. Click "Sync Models" button

---

## Ports Used

| Service | Port | URL |
|---------|------|-----|
| Backend API | 6088 | http://localhost:6088 |
| Frontend | 11420 | http://localhost:11420 |
| Ollama | 11434 | http://localhost:11434 |

---

## Next Steps

- Read the full [README](README.md) for detailed documentation
- Explore Settings to customize your experience
- Try different LLM models to find what works best for your use case

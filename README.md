# KAI – Personal Local RAG

KAI is a cross-platform desktop application for building a **personal knowledge base** and doing **grounded Q&A over your own documents**. All data is stored **locally** for privacy.

---

## What it does

KAI turns your files into a searchable knowledge base:

1. Import documents (PDF / Word / Markdown / plain text / web links)
2. Split content into chunks and build embeddings
3. Store vectors locally (for fast semantic retrieval)
4. Answer questions using retrieved context **with source citations**

---

## Features

### Knowledge Base Management
- Multi-format import: PDF, Word, Markdown, plain text, web links
- Automatic processing: chunking, metadata extraction, indexing
- Organization: folders/tags, batch operations
- Document versioning / revision history (if enabled)

### Intelligent Search & Q&A
- Semantic (vector) search (meaning-based, not only keyword-based)
- Multi-turn conversational Q&A
- Source citations in answers
- Cross-document retrieval and synthesis

### Local LLM Support
- Designed for **offline** usage with **Ollama**
- Embedding model: **M3E** (for semantic indexing)

### Desktop App
- Built with **Tauri 2.0** for Windows / macOS / Linux
- Lightweight and fast compared with Electron-based alternatives

---

## Tech Stack

**Frontend**
- Vue 3 (Composition API)
- Vite
- Naive UI
- Tauri 2.0

**Backend**
- Python 3.11+
- FastAPI
- SQLAlchemy (SQLite)
- LangChain
- ChromaDB (vector store)

---

## Project Structure

```txt
Kai-personalLocalRAG/
├── kai-client/        # Vue + Vite + NaiveUI frontend (Tauri shell)
├── kai-server/        # FastAPI backend (RAG pipeline, DB, vector store)
├── start.sh           # start all services (optional)
├── stop.sh            # stop all services (optional)
└── LICENSE


⸻

Quick Start Guide

This guide will help you get KAI up and running in minutes.

Prerequisites

Make sure you have the following installed:

Requirement	Version	Check Command
Python	3.11+	python --version
Node.js	18+	node --version
npm	9+	npm --version
Git	any	git --version

Optional (for local LLM):
	•	Ollama — download from https://ollama.ai

⸻

Step 1: Clone the Repository

git clone https://github.com/kaiyu-li317/Kai-personalLocalRAG.git
cd Kai-personalLocalRAG


⸻

Step 2: Setup Backend Server

cd kai-server

python -m venv venv

# macOS/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

pip install -r requirements.txt
python app.py

Backend server:
	•	http://localhost:6088

⸻

Step 3: Setup Frontend Client

Open a new terminal window:

cd kai-client
npm install
npm run dev

Frontend:
	•	http://localhost:11420

⸻

Step 4: Access the Application

Open:
	•	http://localhost:11420

⸻

Step 5: Configure LLM (Optional but Recommended)

Option A: Use Ollama (Local, Private)
	1.	Install Ollama from https://ollama.ai
	2.	Pull a model:

ollama pull qwen2.5:7b


	3.	In KAI: Settings → LLM
	4.	Provider: Ollama
	5.	Base URL: http://127.0.0.1:11434
	6.	Click Sync Models
	7.	Select your model

Option B: Use a Cloud Provider
	1.	In KAI: Settings → LLM
	2.	Choose a provider (OpenAI, DeepSeek, etc.)
	3.	Enter API key / base URL
	4.	Click Sync Models
	5.	Select your model

⸻

Quick Commands Reference

Start services (manual)

# Backend (Terminal 1)
cd kai-server
source venv/bin/activate
python app.py

# Frontend (Terminal 2)
cd kai-client
npm run dev

Or use helper scripts

./start.sh   # Start all services
./stop.sh    # Stop all services


⸻

First Steps After Setup
	1.	Create a Knowledge Base
	•	Click Repository in the sidebar
	•	Click New Repository
	•	Enter a name and description
	2.	Add Documents
	•	Open your knowledge base
	•	Click Import
	•	Select PDF / Word / Markdown / text files
	3.	Start a Conversation
	•	Click Chat in the sidebar
	•	Select your knowledge base
	•	Ask questions about your documents

⸻

Troubleshooting

Backend won’t start (port 6088)

lsof -i:6088
kill -9 <PID>

Frontend won’t start (port 11420)

lsof -i:11420

rm -rf node_modules
npm install

Ollama connection failed

ollama list
ollama serve

Model not showing up
	1.	Make sure Ollama is running
	2.	Go to Settings → LLM
	3.	Click Sync Models

⸻

Ports Used

Service	Port	URL
Backend API	6088	http://localhost:6088
Frontend	11420	http://localhost:11420
Ollama	11434	http://localhost:11434


⸻

Contributing
	1.	Fork the repo
	2.	Create a branch: git checkout -b feature/your-feature
	3.	Commit: git commit -m "Add your feature"
	4.	Push: git push origin feature/your-feature
	5.	Open a Pull Request

⸻

License

MIT License — see LICENSE.

⸻

Contact
	•	Email: kaiyuli317@gmail.com
	•	GitHub: kaiyu-li317

⸻

Acknowledgements
	•	Ollama — local LLM runtime
	•	M3E — embedding model
	•	LangChain — LLM orchestration
	•	ChromaDB — vector database
	•	FastAPI — backend framework
	•	Tauri — desktop framework
	•	Vue / Vite / Naive UI — frontend stack


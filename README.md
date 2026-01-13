# Overview# KAI - Personal Local RAG



KAI is a desktop application that enables users to build a personal knowledge base and perform intelligent Q&A over their documents. All data is stored locally, ensuring complete privacy without relying on cloud services.



# Features**Next-Generation Knowledge Management Tool Powered by LLM****Next-Generation Knowledge Management Tool Powered by LLM**



# Knowledge Base Management



- **Multi-format Document Support**: Import PDF, Word, Markdown, plain text, and web links[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)

- **Automatic Document Processing**: Intelligent text segmentation, metadata extraction, and indexing

- **Document Organization**: Hierarchical folder structure, tagging, and batch operations[![Vue](https://img.shields.io/badge/Vue-3.x-green.svg)](https://vuejs.org)

- **Version Control**: Track document changes and maintain revision history

[![FastAPI](https://img.shields.io/badge/FastAPI-0.112-009688.svg)](https://fastapi.tiangolo.com)[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org) KAI - Personal Local RAG

# Intelligent Search and Q&A

[![Tauri](https://img.shields.io/badge/Tauri-2.0-orange.svg)](https://tauri.app)

- **Semantic Search**: Vector-based retrieval that understands context and meaning, not just keywords

- **Conversational Q&A**: Multi-turn dialogue with context awareness and follow-up question support[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)[![Vue](https://img.shields.io/badge/Vue-3.x-green.svg)](https://vuejs.org)

- **Source Citation**: All answers include references to original document sources

- **Cross-document Retrieval**: Search and synthesize information across multiple documents



### AI Integration[Features](#-features) • [Quick Start](#-quick-start) • [Project Structure](#-project-structure) • [Configuration](#-configuration) • [Development](#-development)[![FastAPI](https://img.shields.io/badge/FastAPI-0.112-009688.svg)](https://fastapi.tiangolo.com)



- **Local LLM Support**: Integration with Ollama for fully offline operation

- **Multiple Model Providers**: Support for OpenAI, DeepSeek, Moonshot, Tongyi Qianwen, and Zhipu AI

- **Embedded Models**: Built-in M3E embedding model for semantic understanding</div>[![Tauri](https://img.shields.io/badge/Tauri-2.0-orange.svg)](https://tauri.app)

- **Flexible Configuration**: Easy switching between different models and providers



### Desktop Application

---[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)**Next-Generation Knowledge Management Tool Powered by LLM**# 📚 KAI - Personal Local RAG

- **Cross-platform**: Built with Tauri 2.0 for Windows, macOS, and Linux

- **Native Performance**: Lightweight and fast with minimal resource usage

- **Offline Capable**: Full functionality without internet connection when using local models

## ✨ Features

## Technical Architecture



### Frontend

### 📖 Smart Knowledge Base Management[Features](#-features) • [Quick Start](#-quick-start) • [Project Structure](#-project-structure) • [Configuration](#-configuration) • [Development](#-development)

- Vue 3 with Composition API

- Vite 5.x for development and building- **Multi-format Import** - Support PDF, Word, Markdown, web links, plain text and more

- Naive UI component library

- Tauri 2.0 for desktop packaging- **AI Auto-processing** - Automatic segmentation, summary generation, Q&A pair creation, knowledge extraction



### Backend- **Document Management** - Version control, knowledge linking, batch operations



- Python 3.11+ with FastAPI- **Dual-mode Editor** - Markdown + Rich text hybrid editing---[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)

- SQLAlchemy for database management

- LangChain for LLM orchestration

- ChromaDB for vector storage

### 🔍 Intelligent Search & Q&A

## Installation

- **Semantic Search** - Deep cross-document retrieval based on vector database

### Prerequisites

- **Conversational Q&A** - Follow-up questions, source citation, multi-turn reasoning## ✨ Features[![Vue](https://img.shields.io/badge/Vue-3.x-green.svg)](https://vuejs.org)

- Python 3.11 or higher

- Node.js 18.x or higher- **Local Deployment** - Fully local data storage, privacy protection

- Ollama (optional, for local LLM)



### Setup

# AI Capabilities

1. Clone the repository:

- **Local LLM** - Integrated with Ollama, supports Qwen, Llama, DeepSeek, Mistral and more### 📖 Smart Knowledge Base Management[![FastAPI](https://img.shields.io/badge/FastAPI-0.112-009688.svg)](https://fastapi.tiangolo.com)**Next-Generation Knowledge Management Tool Powered by LLM**# 📚 KAI - Intelligent Personal Knowledge Base is a next-generation knowledge management tool based on large language models (LLMS), integrating AI capabilities to redefine the way knowledge is organized. Supports multi-source knowledge integration, intelligent question answering, automated knowledge processing and visual knowledge networks, helping to build your second brain.

```bash

git clone https://github.com/kaiyu-li317/Kai-personalLocalRAG.git- **Embedding Model** - Built-in M3E embedding model for semantic understanding

cd Kai-personalLocalRAG

```- **Multiple Providers** - Support for OpenAI, DeepSeek, Moonshot, Tongyi, Zhipu AI- **Multi-format Import** - Support PDF, Word, Markdown, web links, plain text and more



2. Start the backend server:



```bash---- **AI Auto-processing** - Automatic segmentation, summary generation, Q&A pair creation, knowledge extraction[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

cd kai-server

python -m venv venv

source venv/bin/activate  # Windows: venv\Scripts\activate

pip install -r requirements.txt## Quick Start- **Document Management** - Version control, knowledge linking, batch operations

python app.py

```



3. Start the frontend:### Requirements- **Dual-mode Editor** - Markdown + Rich text hybrid editing



```bash

cd kai-client

npm install| Dependency | Version | Description |

npm run dev

```|------------|---------|-------------|



4. Access the application at `http://localhost:11420`| Python | >= 3.11 | Backend runtime |### 🔍 Intelligent Search & Q&A[Features](#-features) • [Quick Start](#-quick-start) • [Project Structure](#-project-structure) • [Configuration](#-configuration) • [Development](#-development)



### Quick Start| Node.js | >= 18.x | Frontend runtime |



Use the provided scripts for convenience:| Ollama | Latest | Local LLM service (optional) |- **Semantic Search** - Deep cross-document retrieval based on vector database



```bash

./start.sh  # Start all services

./stop.sh   # Stop all services### 1. Clone the Repository- **Conversational Q&A** - Follow-up questions, source citation, multi-turn reasoning[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)

```



## Configuration

```bash- **Local Deployment** - Fully local data storage, privacy protection

### LLM Provider Setup

git clone https://github.com/kaiyu-li317/Kai-personalLocalRAG.git

1. Navigate to Settings > LLM

2. Select a provider (Ollama, OpenAI, DeepSeek, etc.)cd Kai-personalLocalRAG</div>

3. Enter the API key or base URL

4. Click "Sync Models" to fetch available models```



### Ollama Configuration### AI Capabilities



Default endpoint: `http://127.0.0.1:11434`### 2. Install Ollama (Optional)



Recommended models:- **Local LLM** - Integrated with Ollama, supports Qwen, Llama, DeepSeek, Mistral and more[![Vue](https://img.shields.io/badge/Vue-3.x-green.svg)](https://vuejs.org)

- qwen2.5:7b - General purpose

- llama3.2:3b - Lightweight optionDownload from [ollama.ai](https://ollama.ai) and install, then pull a model:

- deepseek-r1:8b - Reasoning tasks

- **Embedding Model** - Built-in M3E embedding model for better semantic understanding

## Innovations

```bash

### Privacy-First Design

ollama pull qwen2.5:7b- **Multiple Providers** - Support for OpenAI, DeepSeek, Moonshot, Tongyi, Zhipu AI---

Unlike cloud-based solutions, KAI stores all data locally. Documents, vectors, and conversation history never leave the user's machine, making it suitable for sensitive or confidential information.

# or

### Hybrid Retrieval

ollama pull llama3.2:3b

Combines keyword-based and semantic vector search for improved accuracy. The system automatically balances between exact matching and contextual understanding based on query characteristics.

```

### Adaptive Document Processing

---[![FastAPI](https://img.shields.io/badge/FastAPI-0.112-009688.svg)](https://fastapi.tiangolo.com)**Next-generation personal local knowledge management tools based on large language models**#

The system analyzes document structure and content type to apply appropriate segmentation strategies. Technical documents, narratives, and structured data are processed differently to preserve context and meaning.

### 3. Start the Application

### Local-First with Cloud Option



Designed to work completely offline with Ollama, while also supporting cloud providers for users who prefer hosted solutions. Users can switch between local and cloud models without data migration.

**Option A: Quick Start Script**

### Lightweight Desktop Packaging

## Quick Start## Features

Built with Tauri instead of Electron, resulting in significantly smaller application size and lower memory footprint while maintaining full cross-platform compatibility.

```bash

## Project Structure

chmod +x start.sh

```

Kai-personalLocalRAG/./start.sh

├── kai-client/           # Frontend application

│   ├── src/```### Requirements[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

│   │   ├── views/        # Page components

│   │   ├── components/   # Reusable UI components

│   │   ├── store/        # State management

│   │   └── router/       # Routing configuration**Option B: Manual Start**

│   └── src-tauri/        # Tauri configuration

├── kai-server/           # Backend server

│   ├── server/

│   │   ├── api/          # REST API endpointsBackend:| Dependency | Version | Description |### 📖 Smart Knowledge Base Management

│   │   ├── core/         # Business logic

│   │   ├── db/           # Database operations```bash

│   │   └── model/        # Data models

│   ├── config/           # Configuration filescd kai-server|------------|---------|-------------|

│   └── resources/        # Static resources and data

├── start.sh              # Startup scriptpython -m venv venv

└── stop.sh               # Shutdown script

```source venv/bin/activate  # Windows: venv\Scripts\activate| Python | >= 3.11 | Backend runtime |- **Multi-format Import** - Support PDF, Word, Markdown, web links, plain text and more



## Licensepip install -r requirements.txt



MIT Licensepython app.py| Node.js | >= 18.x | Frontend runtime |



## Author```



kaiyu-li317 - https://github.com/kaiyu-li317| Ollama | Latest | Local LLM service (optional) |- **AI Auto-processing** - Automatic segmentation, summary generation, Q&A pair creation, knowledge extraction


Frontend:

```bash

cd kai-client

npm install### 1. Clone the Repository- **Document Management** - Version control, knowledge linking, batch operations[Features](#-features) • [Quick Start](#-quick-start) • [Project Structure](#-project-structure) • [Configuration](#-configuration) • [Development](#-development)

npm run dev

```



### 4. Access the Application```bash- **Dual-mode Editor** - Markdown + Rich text hybrid editing



Open browser: `http://localhost:11420`git clone https://github.com/kaiyu-li317/Kai-personalLocalRAG.git



---cd Kai-personalLocalRAG[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)### 智能知识库管理



## 📁 Project Structure```



```### 🔍 Intelligent Search & Q&A

Kai-personalLocalRAG/

├── kai-client/              # Frontend (Vue 3 + Vite + Tauri)### 2. Install Ollama (Optional, for local LLM)

│   ├── src/

│   │   ├── views/           # Page components- **Semantic Search** - Deep cross-document retrieval based on vector database</div>

│   │   ├── components/      # Reusable components

│   │   ├── store/           # State managementDownload from [ollama.ai](https://ollama.ai) and install, then pull a model:

│   │   └── router/          # Routing

│   └── src-tauri/           # Tauri desktop config- **Conversational Q&A** - Follow-up questions, source citation, multi-turn reasoning

│

├── kai-server/              # Backend (Python + FastAPI)```bash

│   ├── server/

│   │   ├── api/             # API endpointsollama pull qwen2.5:7b- **Local Deployment** - Fully local data storage, privacy protection[![Vue](https://img.shields.io/badge/Vue-3.x-green.svg)](https://vuejs.org)- **多格式导入**：支持文档（PDF/Word/Markdown）、网页链接、纯文本等多源数据接入

│   │   ├── core/            # Business logic

│   │   ├── db/              # Database management# or

│   │   └── model/           # Data models

│   ├── config/              # Configurationollama pull llama3.2:3b

│   └── resources/           # Static resources

│```

├── start.sh                 # Quick start script

└── stop.sh                  # Stop services script### 🤖 AI Capabilities---

```

### 3. Start the Application

---

- **Local LLM** - Integrated with Ollama, supports Qwen, Llama, Mistral and more

## Configuration

#### Option A: Quick Start Script

### LLM Provider Setup

- **Chinese Optimized** - Built-in M3E Chinese embedding model for better semantic understanding[![FastAPI](https://img.shields.io/badge/FastAPI-0.112-009688.svg)](https://fastapi.tiangolo.com)- **AI 自动化处理**：自动分段、生成摘要、创建 Q&A 对、提取知识图谱三元组

1. Go to **Settings** > **LLM**

2. Select a provider (Ollama, OpenAI, DeepSeek, etc.)```bash

3. Configure API key or base URL

4. Click **Sync Models** to load available modelschmod +x start.sh



### Ollama Configuration./start.sh



Default base URL: `http://127.0.0.1:11434````---## ✨ Features



Recommended models:

- `qwen2.5:7b` - General use

- `llama3.2:3b` - Lightweight#### Option B: Manual Start

- `deepseek-r1:8b` - Reasoning tasks



---

**Backend:**## Quick Start[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)- **动态维护**：支持文档版本管理、知识关联标注、批量处理操作

## Development

```bash

### Tech Stack

cd kai-server

**Frontend:**

- Vue 3 + Composition APIpython -m venv venv

- Vite 5.x

- Naive UIsource venv/bin/activate  # On Windows: venv\Scripts\activate### Requirements### 📖 Smart Knowledge Base Management

- Tauri 2.0 (Desktop)

pip install -r requirements.txt

**Backend:**

- Python 3.11+python app.py

- FastAPI

- SQLAlchemy```

- LangChain

- ChromaDB (Vector Store)| Dependency | Version | Description |- **Multi-format Import** - Support PDF, Word, Markdown, web links, plain text and more- **Dual-mode editor**：Markdown + Rich text mixed editing



### Build Desktop App**Frontend:**



```bash```bash|------------|---------|-------------|

cd kai-client

npm run tauri buildcd kai-client

```

npm install| Python | >= 3.11 | Backend runtime |- **AI Auto-processing** - Automatic segmentation, summary generation, Q&A pair creation, knowledge extraction

---

npm run dev

## 📄 License

```| Node.js | >= 18.x | Frontend runtime |

MIT License - see [LICENSE](LICENSE) for details.



---

### 4. Access the Application| Ollama | Latest | Local LLM service |- **Document Management** - Version control, knowledge linking, Batch operations [features] (# - features), [quick start] (# - quick start), [projects] structure (# - project structure), [configuration instructions] (# - configuration instructions), [] development guide (# - development guide)

## Contributing



1. Fork the repository

2. Create feature branch (`git checkout -b feature/AmazingFeature`)Open your browser and navigate to: `http://localhost:11420`

3. Commit changes (`git commit -m 'Add AmazingFeature'`)

4. Push to branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

---### 1. Clone the Repository- **Dual-mode Editor** - Markdown + Rich text hybrid editing

---



## Contact
email: kaiyuli317@gmail.com

## Project Structure

- GitHub: [@kaiyu-li317](https://github.com/kaiyu-li317)

- Repository: [Kai-personalLocalRAG](https://github.com/kaiyu-li317/Kai-personalLocalRAG)

kai-main/

├── kai-client/          # Frontend (Vue 3 + Vite + Tauri)git clone https://github.com/kaiyu-li317/Kai-personalLocalRAG.git

│   ├── src/

│   │   ├── views/       # Page componentscd Kai-personalLocalRAG### 🔍 Intelligent Search & Q&A

│   │   ├── components/  # Reusable components

│   │   ├── store/       # State management```

│   │   └── router/      # Routing

│   └── src-tauri/       # Tauri desktop app config- **Semantic Search** - Deep cross-document retrieval based on vector database</div>- ** Semantic Search ** : Cross-document deep retrieval based on vector databases

│

├── kai-server/          # Backend (Python + FastAPI)### 2. Install Ollama

│   ├── server/

│   │   ├── api/         # API endpoints- **Conversational Q&A** - Follow-up questions, source citation, multi-turn reasoning

│   │   ├── core/        # Core business logic

│   │   ├── db/          # Database management```bash

│   │   └── model/       # Data models

│   ├── config/          # Configuration files# macOS- **Local Deployment** - Fully local data storage, privacy protection- ** Conversational interaction ** : Supports follow-up questioning, source tracing and citation, and multi-round knowledge reasoning

│   └── resources/       # Static resources & database

│brew install ollama

├── start.sh             # Quick start script

└── stop.sh              # Stop services script

```

# Linux

---

curl -fsSL https://ollama.com/install.sh | sh# AI Capabilities---

# Configuration



### LLM Provider Setup

# Start service and download model- **Local LLM** - Integrated with Ollama, supports Qwen, Llama, Mistral and more

1. Go to **Settings** > **LLM**

2. Select a provider (Ollama, OpenAI, DeepSeek, etc.)ollama serve

3. Configure API key or base URL

4. Click **Sync Models** to load available modelsollama pull qwen2- **Chinese Optimized** - Built-in M3E Chinese embedding model for better semantic understanding---



### Ollama Configuration```



Default base URL: `http://127.0.0.1:11434`



Supported models:### 3. One-Click Start

- `qwen2.5:7b` - Recommended for general use

- `llama3.2:3b` - Lightweight option---

- `deepseek-r1:8b` - Good for reasoning tasks

```bash

---

# Add execute permission

## 🛠️ Development

chmod +x start.sh stop.sh

### Tech Stack

## Quick Start## 

**Frontend:**

- Vue 3 + Composition API# Start all services

- Vite 5.x

- Naive UI./start.sh

- Tauri 2.0 (Desktop)

```

**Backend:**

- Python 3.11+### Requirements### intelligent knowledge base management

- FastAPI

- SQLAlchemy### 4. Access the Application

- LangChain

- ChromaDB (Vector Store)



### Build Desktop App- **Frontend**: http://localhost:11420



```bash- **Backend API**: http://localhost:6088| Dependency | Version | Description |- ** Multi-format import ** - Supports PDF, Word, Markdown, web links, plain text and other multi-source data

cd kai-client

npm run tauri build- **API Docs**: http://localhost:6088/docs

```

|------------|---------|-------------|

---

### 5. Stop Services

## License

| Python | >= 3.11 | Backend runtime |- **AI 自动处理** - 自动分段、生成摘要、创建 Q&A 对、提取知识要点kai-main/

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```bash

---

./stop.sh| Node.js | >= 18.x | Frontend runtime |


## 📁 Project Structure

---

### 1. Clone the Repository- **双模式编辑** - Markdown + 富文本混合编辑器│   ├── src/

## Contact

```

- GitHub: [@kaiyu-li317](https://github.com/kaiyu-li317)

- Repository: [Kai-personalLocalRAG](https://github.com/kaiyu-li317/Kai-personalLocalRAG)kai-main/


├── kai-client/              # Frontend (Vue 3 + Vite + Tauri)

│   ├── src/```bash│   │   ├── views/         # 页面组件

│   │   ├── views/           # Page components

│   │   ├── components/      # Reusable componentsgit clone https://github.com/kaiyu-li317/Kai-personalLocalRAG.git

│   │   ├── store/           # State management

│   │   ├── libs/            # Utility librariescd Kai-personalLocalRAG### 🔍 智能搜索与问答│   │   ├── components/    # 通用组件

│   │   └── router/          # Route configuration

│   └── src-tauri/           # Tauri desktop app config```

│

├── kai-server/              # Backend (Python FastAPI)- **语义搜索** - 基于向量数据库的跨文档深度检索│   │   ├── store/         # 状态管理

│   ├── server/

│   │   ├── api/             # API endpoints### 2. Install Ollama

│   │   ├── core/            # Core business logic

│   │   ├── db/              # Database operations- **对话式问答** - 支持追问、溯源引用、多轮知识推理│   │   └── router/        # 路由配置

│   │   └── model/           # Data models

│   ├── config/              # Configuration files```bash

│   └── resources/           # Resource files

│# macOS- **本地部署** - 数据完全本地化，保护隐私安全│   └── src-tauri/         # Tauri 桌面应用配置

├── start.sh                 # Startup script

├── stop.sh                  # Shutdown scriptbrew install ollama

└── README.md

```│



---# Linux



## ⚙️ Configurationcurl -fsSL https://ollama.com/install.sh | sh### 🤖 AI 能力├── wenkb-server/          # 后端 (Python FastAPI)



### LLM Configuration



Edit `kai-server/config/llm.py`:# Start service and download model- **本地 LLM** - 集成 Ollama，支持 Qwen、Llama、Mistral 等模型│   ├── server/



```pythonollama serve

# Ollama service address

OLLAMA_HOST = "http://localhost:11434"ollama pull qwen2- **中文优化** - 内置 M3E 中文嵌入模型，语义理解更精准│   │   ├── api/           # API 接口



# Default LLM model```

DEFAULT_LLM_MODEL = "qwen2"

│   │   ├── core/          # 核心业务逻辑

# Embedding model path

EMBEDDING_MODEL_PATH = "./resources/model/m3e"### 3. One-Click Start

```

---│   │   ├── db/            # 数据库操作

### Database Configuration

```bash

Edit `kai-server/config/datasource.py`:

# Add execute permission│   │   └── model/         # 数据模型

```python

# SQLite database pathchmod +x start.sh stop.sh

DATABASE_PATH = "./resources/database/kai.db"

## 🚀 快速开始│   ├── config/            # 配置文件

# Vector store path

VECTOR_STORE_PATH = "./resources/vector_store"# Start all services

```

./start.sh│   └── resources/         # 资源文件

### Frontend Configuration



Edit `kai-client/vite.config.js`:

# Check service status### 环境要求│       ├── database/      # SQLite 数据库

```javascript

// API proxy configuration./start.sh status

proxy: {

  '/api': {│       └── model/         # 本地嵌入模型 (m3e)

    target: 'http://localhost:6088',

    changeOrigin: true# Stop services

  }

}./stop.sh| 依赖 | 版本 | 说明 |│

```

```

---

|------|------|------|├── start.sh               # 一键启动脚本

## 🛠️ Development

### 4. Access the Application

### Backend Development

| Python | >= 3.11 | 后端运行环境 |└── stop.sh                # 停止脚本

```bash

cd kai-serverAfter successful startup, visit: **http://localhost:11420**



# Create virtual environment| Node.js | >= 18.x | 前端运行环境 |```

python -m venv venv

source venv/bin/activate  # Windows: venv\Scripts\activate| Service | Port | Description |



# Install dependencies|---------|------|-------------|| Ollama | 最新版 | 本地 LLM 服务 |

pip install -r requirements.txt

| Frontend | 11420 | Web interface |

# Start development server

python app.py| Backend | 6088 | API service |---

```

| Ollama | 11434 | LLM service |

### Frontend Development

### 1. 克隆项目

```bash

cd kai-client---



# Install dependencies## 🚀 快速开始

npm install

## 📁 Project Structure

# Start development server

npm run dev```bash



# Build for production```

npm run build

```kai/git clone https://github.com/yourusername/kai.git### 环境要求



### Desktop App (Tauri)├── kai-client/                # Frontend project



```bash│   ├── src/cd kai

cd kai-client

│   │   ├── views/            # Page components

# Install Tauri CLI

npm install -g @tauri-apps/cli│   │   ├── components/       # Common components```- **Node.js** >= 18.x



# Development mode│   │   ├── store/            # Pinia state management

npm run tauri dev

│   │   ├── router/           # Vue Router- **Python** >= 3.11

# Build desktop app

npm run tauri build│   │   └── config/           # Frontend config

```

│   ├── src-tauri/            # Tauri desktop app config### 2. 安装 Ollama- **Ollama** (本地 LLM 服务)

---

│   ├── package.json

## 📋 Tech Stack

│   └── vite.config.js

### Backend

- **Framework**: FastAPI│

- **Database**: SQLite + SQLAlchemy

- **Vector Store**: ChromaDB├── kai-server/                # Backend project```bash### 一键启动

- **LLM**: Ollama (Qwen2, Llama, etc.)

- **Embedding**: M3E (Local model)│   ├── server/

- **Document Processing**: LangChain

│   │   ├── api/              # API layer# macOS

### Frontend

- **Framework**: Vue 3 + Composition API│   │   ├── core/             # Core business logic

- **Build Tool**: Vite 5.x

- **UI Library**: Naive UI│   │   ├── db/               # Database operationsbrew install ollama```bash

- **Desktop**: Tauri 2.0

- **State Management**: Pinia│   │   ├── model/            # Data models



---│   │   └── utils/            # Utility functionscd kai-main



## ❓ FAQ│   ├── config/               # Configuration files



### Q: How to change the LLM model?│   ├── resources/            # Resource directory# Linux

A: Modify `DEFAULT_LLM_MODEL` in `kai-server/config/llm.py`, or configure through the web interface in Settings.

│   │   ├── database/         # SQLite database

### Q: Why is semantic search slow?

A: First search requires loading the embedding model. Subsequent searches will be faster.│   │   ├── documents/        # Uploaded documentscurl -fsSL https://ollama.com/install.sh | sh# 启动所有服务 (Ollama + 后端 + 前端)



### Q: How to import large documents?│   │   ├── model/            # Embedding model

A: The system automatically chunks large documents. You can adjust chunk size in configuration.

│   │   └── vector_store/     # Vector storage./start.sh

### Q: Does it support GPU acceleration?

A: Yes, if Ollama is configured with GPU support, LLM inference will be accelerated automatically.│   ├── app.py                # Application entry



---│   └── requirements.txt# 启动服务并下载模型



## 🤝 Contributing│



Contributions are welcome! Please feel free to submit a Pull Request.├── start.sh                   # One-click start scriptollama serve# 停止所有服务



1. Fork the repository├── stop.sh                    # Stop script

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)└── README.mdollama pull qwen2./stop.sh

4. Push to the branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request```



---```



## 📄 License---



This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.# 重启服务



---## ⚙️ Configuration



<div align="center">### 3. 一键启动./start.sh restart



**Built with ❤️ by [kaiyu-li317](https://github.com/kaiyu-li317)**### Backend Configuration



</div>


Configuration files are located in `kai-server/config/`:

```bash# 查看服务状态

| File | Description |

|------|-------------|# 添加执行权限./start.sh status

| `llm.py` | LLM model config (Ollama address, model name) |

| `common.py` | Common config (port, paths, etc.) |chmod +x start.sh stop.sh```

| `datasource.py` | Data source config (database connection) |



### Embedding Model

# 启动所有服务### 服务端口

The project uses **M3E** Chinese embedding model, which will be automatically downloaded to `kai-server/resources/model/m3e/` on first startup.

./start.sh

| Model | Parameters | Vector Dim | Features |

|-------|------------|------------|----------|| 服务 | 端口 | 说明 |

| m3e-small | 24M | 512 | Lightweight, Chinese optimized |

| m3e-base | 110M | 768 | Higher accuracy, bilingual |# 查看服务状态|------|------|------|



### LLM Models./start.sh status| 前端 | 11420 | Vue 3 开发服务器 |



Recommended Ollama models:| 后端 | 6088 | FastAPI 服务 |



```bash# 停止服务| Ollama | 11434 | 本地 LLM 服务 |

ollama pull qwen2        # Recommended for Chinese

ollama pull llama3.1     # Best for English./stop.sh

ollama pull mistral      # Balanced choice

``````访问地址：http://localhost:11420



---



## 🛠️ Development### 4. 访问应用---



### Manual Start



**Backend:**启动成功后访问：**http://localhost:11420**## 🔧 手动安装



```bash

cd kai-server

| 服务 | 端口 | 说明 |### 1. 安装 Ollama

# Create virtual environment

python -m venv .venv|------|------|------|

source .venv/bin/activate  # Windows: .venv\Scripts\activate

| 前端 | 11420 | Web 界面 |```bash

# Install dependencies

pip install -r requirements.txt| 后端 | 6088 | API 服务 |# macOS



# Start service| Ollama | 11434 | LLM 服务 |brew install ollama

python app.py

```



**Frontend:**---# 启动服务并下载模型



```bashollama serve

cd kai-client

## 📁 项目结构ollama pull qwen2

# Install dependencies

npm install```



# Start dev server```

npm run dev

kai/### 2. 后端服务

# Build for production

npm run build├── kai-client/                # 前端项目

```

│   ├── src/```bash

### Tech Stack

│   │   ├── views/            # 页面组件cd wenkb-server

**Frontend:**

- Vue 3 + Composition API│   │   ├── components/       # 通用组件

- Vite 5.x

- Naive UI│   │   ├── store/            # Pinia 状态管理# 安装依赖

- Pinia

- Tauri 2.0 (optional, for desktop app)│   │   ├── router/           # Vue Router 路由pip install -r requirements.txt



**Backend:**│   │   └── config/           # 前端配置

- Python 3.11+

- FastAPI│   ├── src-tauri/            # Tauri 桌面应用配置# 启动服务

- SQLAlchemy + SQLite

- LangChain│   ├── package.jsonpython app.py

- ChromaDB

│   └── vite.config.js# 或

---

│uvicorn app:app --host 0.0.0.0 --port 6088 --reload

## 📝 FAQ

├── kai-server/                # 后端项目```

<details>

<summary><b>Q: Port already in use?</b></summary>│   ├── server/



```bash│   │   ├── api/              # API 接口层### 3. 前端服务

# Find process using the port

lsof -i :6088│   │   ├── core/             # 核心业务逻辑

lsof -i :11420

│   │   ├── db/               # 数据库操作```bash

# Kill the process

kill -9 <PID>│   │   ├── model/            # 数据模型cd wenkb-client

```

</details>│   │   └── utils/            # 工具函数



<details>│   ├── config/               # 配置文件# 安装依赖

<summary><b>Q: Ollama model download is slow?</b></summary>

│   ├── resources/            # 资源目录npm install

You can set up a proxy or use a mirror:

```bash│   │   ├── database/         # SQLite 数据库

export OLLAMA_HOST=https://your-mirror.com

ollama pull qwen2│   │   ├── documents/        # 上传文档# 启动开发服务器

```

</details>│   │   ├── model/            # 嵌入模型npm run dev



<details>│   │   └── vector_store/     # 向量存储```

<summary><b>Q: M3E model loading failed?</b></summary>

│   ├── app.py                # 应用入口

Check your network connection. The model will be automatically downloaded from HuggingFace. If there are network issues, you can manually download it to the `kai-server/resources/model/m3e/` directory.

</details>│   └── requirements.txt---



---│



## 🤝 Contributing├── start.sh                   # 一键启动脚本## 🤖 AI 模型配置



Contributions are welcome! Feel free to submit Issues and Pull Requests.├── stop.sh                    # 停止脚本



1. Fork this repository└── README.md### LLM 模型 (Ollama)

2. Create a feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)```

4. Push to the branch (`git push origin feature/AmazingFeature`)

5. Create a Pull Request本项目使用 Ollama 作为本地 LLM 服务，默认使用 `qwen2` 模型。



------



## 📄 License```bash



This project is licensed under the [MIT License](LICENSE).## ⚙️ 配置说明# 查看已安装模型



---ollama list



## 🙏 Acknowledgements### 后端配置



- [Ollama](https://ollama.ai/) - Local LLM service# 安装其他模型

- [M3E](https://huggingface.co/moka-ai/m3e-small) - Chinese embedding model

- [LangChain](https://langchain.com/) - LLM application framework配置文件位于 `kai-server/config/` 目录：ollama pull llama3.1

- [Naive UI](https://naiveui.com/) - Vue 3 component library

- [FastAPI](https://fastapi.tiangolo.com/) - Python web frameworkollama pull mistral


| 文件 | 说明 |```

|------|------|

| `llm.py` | LLM 模型配置 (Ollama 地址、模型名称) |### 嵌入模型 (M3E)

| `common.py` | 通用配置 (端口、路径等) |

| `datasource.py` | 数据源配置 (数据库连接) |项目内置 `m3e-small` 中文嵌入模型，用于文档向量化和语义搜索。



### 嵌入模型**M3E 模型特点：**

- 支持中英双语

项目使用 **M3E** 中文嵌入模型，首次启动会自动下载到 `kai-server/resources/model/m3e/`。- 千万级中文句对数据集训练

- 512 维向量输出

| 模型 | 参数量 | 向量维度 | 特点 |- 适用于文本相似度、文本分类等任务

|------|--------|----------|------|

| m3e-small | 24M | 512 | 轻量快速，中文优化 || 模型 | 参数量 | 维度 | 中文 | 英文 |

| m3e-base | 110M | 768 | 精度更高，中英双语 ||------|--------|------|------|------|

| m3e-small | 24M | 512 | ✅ | ❌ |

### LLM 模型| m3e-base | 110M | 768 | ✅ | ✅ |



推荐使用的 Ollama 模型：---



```bash## 📁 配置文件说明

ollama pull qwen2        # 推荐，中文效果最佳

ollama pull llama3.1     # 英文效果好### 后端配置

ollama pull mistral      # 平衡选择

```- `config/llm.py` - LLM 模型配置 (Ollama)

- `config/common.py` - 通用配置

---- `config/datasource.py` - 数据源配置



## 🛠️ 开发指南### 前端配置



### 手动启动- `vite.config.js` - Vite 构建配置

- `src/config/index.ts` - 前端配置

**后端：**

---

```bash

cd kai-server## 🛠️ 开发说明



# 创建虚拟环境### 前端技术栈

python -m venv .venv

source .venv/bin/activate  # Windows: .venv\Scripts\activate- Vue 3 + Composition API

- Vite 5.x

# 安装依赖- Naive UI 组件库

pip install -r requirements.txt- Tauri 2.0 (桌面应用)

- Pinia 状态管理

# 启动服务

python app.py### 后端技术栈

```

- Python 3.11+

**前端：**- FastAPI

- SQLAlchemy + SQLite

```bash- LangChain + Ollama

cd kai-client- ChromaDB (向量数据库)



# 安装依赖### 应用流程节点 (待开发)

npm install

> 参考 Dify/FastGPT 的工作流设计

# 启动开发服务器

npm run dev**Start 节点设计考虑：**

- 输入字段可自定义

# 构建生产版本- 输出字段保留标准格式

npm run build- 全局变量可在系统配置中设置

```

---

### 技术栈

## 📝 更新日志

**前端：**

- Vue 3 + Composition API- 简化 LLM 配置，仅支持 Ollama 本地模型

- Vite 5.x- 移除第三方 API 依赖 (OpenAI, DeepSeek, Moonshot 等)

- Naive UI- 添加一键启动脚本

- Pinia- 优化嵌入模型加载

- Tauri 2.0 (可选，用于桌面应用)

---

**后端：**

- Python 3.11+## 📄 License

- FastAPI

- SQLAlchemy + SQLiteMIT License

- LangChain

- ChromaDB---



---## 🙏 致谢



## 📝 常见问题- [Ollama](https://ollama.ai/) - 本地 LLM 服务

- [M3E](https://huggingface.co/moka-ai/m3e-small) - 中文嵌入模型

<details>- [LangChain](https://langchain.com/) - LLM 应用框架

<summary><b>Q: 启动时提示端口被占用？</b></summary>- [Naive UI](https://naiveui.com/) - Vue 3 组件库

- [Tauri](https://tauri.app/) - 桌面应用框架

```bash
# 查看占用端口的进程
lsof -i :6088
lsof -i :11420

# 终止进程
kill -9 <PID>
```
</details>

<details>
<summary><b>Q: Ollama 模型下载慢？</b></summary>

可以设置代理或使用镜像：
```bash
export OLLAMA_HOST=https://your-mirror.com
ollama pull qwen2
```
</details>

<details>
<summary><b>Q: M3E 模型加载失败？</b></summary>

检查网络连接，模型会从 HuggingFace 自动下载。如果网络问题，可以手动下载到 `kai-server/resources/model/m3e/` 目录。
</details>

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📄 License

本项目采用 [MIT License](LICENSE) 开源协议。

---

## 🙏 致谢

- [Ollama](https://ollama.ai/) - 本地 LLM 服务
- [M3E](https://huggingface.co/moka-ai/m3e-small) - 中文嵌入模型
- [LangChain](https://langchain.com/) - LLM 应用框架
- [Naive UI](https://naiveui.com/) - Vue 3 组件库
- [FastAPI](https://fastapi.tiangolo.com/) - Python Web 框架

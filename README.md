<div align="center"># WenKB - 智能个人知识库桌面应用



# 📚 KAI - 智能个人知识库WenKB 是一款基于大语言模型（LLM）的下一代知识管理工具，融合 AI 能力重新定义知识组织方式。支持多源知识整合、智能问答、自动化知识加工和可视化知识网络，助力构建您的第二大脑。



**基于大语言模型的下一代知识管理工具**## ✨ 核心功能



[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)### 智能知识库管理

[![Vue](https://img.shields.io/badge/Vue-3.x-green.svg)](https://vuejs.org)- **多格式导入**：支持文档（PDF/Word/Markdown）、网页链接、纯文本等多源数据接入

[![FastAPI](https://img.shields.io/badge/FastAPI-0.112-009688.svg)](https://fastapi.tiangolo.com)- **AI 自动化处理**：自动分段、生成摘要、创建 Q&A 对、提取知识图谱三元组

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)- **动态维护**：支持文档版本管理、知识关联标注、批量处理操作

- **双模式编辑器**：Markdown + 富文本混合编辑

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [项目结构](#-项目结构) • [配置说明](#-配置说明) • [开发指南](#-开发指南)

### 强大的搜索与问答

</div>- **语义搜索**：基于向量数据库的跨文档深度检索

- **对话式交互**：支持追问、溯源引用、多轮知识推理

---

---

## ✨ 功能特性

## 🏗️ 项目架构

### 📖 智能知识库管理

- **多格式导入** - 支持 PDF、Word、Markdown、网页链接、纯文本等多源数据```

- **AI 自动处理** - 自动分段、生成摘要、创建 Q&A 对、提取知识要点kai-main/

- **文档管理** - 支持版本管理、知识关联、批量操作├── wenkb-client/          # 前端 (Vue 3 + Vite + Tauri)

- **双模式编辑** - Markdown + 富文本混合编辑器│   ├── src/

│   │   ├── views/         # 页面组件

### 🔍 智能搜索与问答│   │   ├── components/    # 通用组件

- **语义搜索** - 基于向量数据库的跨文档深度检索│   │   ├── store/         # 状态管理

- **对话式问答** - 支持追问、溯源引用、多轮知识推理│   │   └── router/        # 路由配置

- **本地部署** - 数据完全本地化，保护隐私安全│   └── src-tauri/         # Tauri 桌面应用配置

│

### 🤖 AI 能力├── wenkb-server/          # 后端 (Python FastAPI)

- **本地 LLM** - 集成 Ollama，支持 Qwen、Llama、Mistral 等模型│   ├── server/

- **中文优化** - 内置 M3E 中文嵌入模型，语义理解更精准│   │   ├── api/           # API 接口

│   │   ├── core/          # 核心业务逻辑

---│   │   ├── db/            # 数据库操作

│   │   └── model/         # 数据模型

## 🚀 快速开始│   ├── config/            # 配置文件

│   └── resources/         # 资源文件

### 环境要求│       ├── database/      # SQLite 数据库

│       └── model/         # 本地嵌入模型 (m3e)

| 依赖 | 版本 | 说明 |│

|------|------|------|├── start.sh               # 一键启动脚本

| Python | >= 3.11 | 后端运行环境 |└── stop.sh                # 停止脚本

| Node.js | >= 18.x | 前端运行环境 |```

| Ollama | 最新版 | 本地 LLM 服务 |

---

### 1. 克隆项目

## 🚀 快速开始

```bash

git clone https://github.com/yourusername/kai.git### 环境要求

cd kai

```- **Node.js** >= 18.x

- **Python** >= 3.11

### 2. 安装 Ollama- **Ollama** (本地 LLM 服务)



```bash### 一键启动

# macOS

brew install ollama```bash

cd kai-main

# Linux

curl -fsSL https://ollama.com/install.sh | sh# 启动所有服务 (Ollama + 后端 + 前端)

./start.sh

# 启动服务并下载模型

ollama serve# 停止所有服务

ollama pull qwen2./stop.sh

```

# 重启服务

### 3. 一键启动./start.sh restart



```bash# 查看服务状态

# 添加执行权限./start.sh status

chmod +x start.sh stop.sh```



# 启动所有服务### 服务端口

./start.sh

| 服务 | 端口 | 说明 |

# 查看服务状态|------|------|------|

./start.sh status| 前端 | 11420 | Vue 3 开发服务器 |

| 后端 | 6088 | FastAPI 服务 |

# 停止服务| Ollama | 11434 | 本地 LLM 服务 |

./stop.sh

```访问地址：http://localhost:11420



### 4. 访问应用---



启动成功后访问：**http://localhost:11420**## 🔧 手动安装



| 服务 | 端口 | 说明 |### 1. 安装 Ollama

|------|------|------|

| 前端 | 11420 | Web 界面 |```bash

| 后端 | 6088 | API 服务 |# macOS

| Ollama | 11434 | LLM 服务 |brew install ollama



---# 启动服务并下载模型

ollama serve

## 📁 项目结构ollama pull qwen2

```

```

kai/### 2. 后端服务

├── kai-client/                # 前端项目

│   ├── src/```bash

│   │   ├── views/            # 页面组件cd wenkb-server

│   │   ├── components/       # 通用组件

│   │   ├── store/            # Pinia 状态管理# 安装依赖

│   │   ├── router/           # Vue Router 路由pip install -r requirements.txt

│   │   └── config/           # 前端配置

│   ├── src-tauri/            # Tauri 桌面应用配置# 启动服务

│   ├── package.jsonpython app.py

│   └── vite.config.js# 或

│uvicorn app:app --host 0.0.0.0 --port 6088 --reload

├── kai-server/                # 后端项目```

│   ├── server/

│   │   ├── api/              # API 接口层### 3. 前端服务

│   │   ├── core/             # 核心业务逻辑

│   │   ├── db/               # 数据库操作```bash

│   │   ├── model/            # 数据模型cd wenkb-client

│   │   └── utils/            # 工具函数

│   ├── config/               # 配置文件# 安装依赖

│   ├── resources/            # 资源目录npm install

│   │   ├── database/         # SQLite 数据库

│   │   ├── documents/        # 上传文档# 启动开发服务器

│   │   ├── model/            # 嵌入模型npm run dev

│   │   └── vector_store/     # 向量存储```

│   ├── app.py                # 应用入口

│   └── requirements.txt---

│

├── start.sh                   # 一键启动脚本## 🤖 AI 模型配置

├── stop.sh                    # 停止脚本

└── README.md### LLM 模型 (Ollama)

```

本项目使用 Ollama 作为本地 LLM 服务，默认使用 `qwen2` 模型。

---

```bash

## ⚙️ 配置说明# 查看已安装模型

ollama list

### 后端配置

# 安装其他模型

配置文件位于 `kai-server/config/` 目录：ollama pull llama3.1

ollama pull mistral

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

from langchain_ollama import OllamaLLM

# ========== Ollama 配置 (唯一的 LLM 提供者) ==========
OLLAMA_MODEL = 'qwen2'
OLLAMA_BASE_URL = 'http://127.0.0.1:11434'
OLLAMA_CLIENT = OllamaLLM(base_url=OLLAMA_BASE_URL, model=OLLAMA_MODEL, temperature=0.1)

# ========== 本地嵌入模型配置 ==========
MODEL_DIR = './resources/model'

# ========== 通用参数 ==========
TOP_K = 20           # 查询向量数据库返回结果的最大数量
MAX_CONTEXT = 20
MAX_HISTORY = 10
TEMPERATURE = 0.1
SIMILARITY_TRVAL = 1

# 默认模型提供者 (仅支持 Ollama)
LLM_PROVIDER = 'ollama'
EMBEDDING_PROVIDER = 'default'  # 使用本地 m3e 模型

# 默认 LLM 参数
DEFAULT_LLM_ARGUMENTS = {
  'provider': LLM_PROVIDER,
  'model': OLLAMA_MODEL,
  'base_url': OLLAMA_BASE_URL
}

# 默认嵌入模型参数 (本地 m3e-small)
DEFAULT_EMBEDDING_ARGUMENTS = {
  'provider': EMBEDDING_PROVIDER,
  'model': 'm3e/m3e-small',
  'base_url': None,
  'api_key': None,
  'model_dir': MODEL_DIR
}

# LLM 服务地址 (仅 Ollama)
LLM_BASE_URLS = {
  'ollama': OLLAMA_BASE_URL
}

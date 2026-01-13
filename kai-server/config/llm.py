from langchain_ollama import OllamaLLM

# ========== Ollama Configuration (Only LLM Provider) ==========
OLLAMA_MODEL = 'qwen2'
OLLAMA_BASE_URL = 'http://127.0.0.1:11434'
OLLAMA_CLIENT = OllamaLLM(base_url=OLLAMA_BASE_URL, model=OLLAMA_MODEL, temperature=0.1)

# ========== Local Embedding Model Configuration ==========
MODEL_DIR = './resources/model'

# ========== Common Parameters ==========
TOP_K = 20           # Maximum number of results returned from vector database query
MAX_CONTEXT = 20
MAX_HISTORY = 10
TEMPERATURE = 0.1
SIMILARITY_TRVAL = 1

# Default model provider (Only supports Ollama)
LLM_PROVIDER = 'ollama'
EMBEDDING_PROVIDER = 'default'  # Use local m3e model

# Default LLM arguments
DEFAULT_LLM_ARGUMENTS = {
  'provider': LLM_PROVIDER,
  'model': OLLAMA_MODEL,
  'base_url': OLLAMA_BASE_URL
}

# Default embedding model arguments (local m3e-small)
DEFAULT_EMBEDDING_ARGUMENTS = {
  'provider': EMBEDDING_PROVIDER,
  'model': 'm3e/m3e-small',
  'base_url': None,
  'api_key': None,
  'model_dir': MODEL_DIR
}

# LLM service URLs (Only Ollama)
LLM_BASE_URLS = {
  'ollama': OLLAMA_BASE_URL
}

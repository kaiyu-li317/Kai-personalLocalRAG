import os
DB_SCHEMA_VERSION = 3
RESOURCE_DIR_NAME = 'resources'
DEFAULT_UPLOAD_DIR_NAME = 'upload'
DEFAULT_STATIC_DIR_NAME = 'static'
DEFAULT_DOCUMENT_DIR_NAME = 'documents'
RESOURCE_FILE_DIR = f'./{RESOURCE_DIR_NAME}'

# Default file upload directory path
DEFAULT_UPLOAD_FILE_DIR = f'./{RESOURCE_DIR_NAME}/{DEFAULT_STATIC_DIR_NAME}/{DEFAULT_UPLOAD_DIR_NAME}'
# Dataset upload directory path
DATASET_UPLOAD_FILE_DIR = f'./{RESOURCE_DIR_NAME}/documents'
# Knowledge base index file storage directory path
VECTOR_STORE_FILE_DIR = f'./{RESOURCE_DIR_NAME}/vector_store'

# System level default user ID
DEFAULT_SYSTEM_USER_ID = '_default_user_id_'
# Model preference parameter code
SYSTEM_MODEL_PREFERENCE_PARAM_CODE = 'model_preference'

if not os.path.exists(RESOURCE_FILE_DIR):
  os.makedirs(RESOURCE_FILE_DIR)

if not os.path.exists(DEFAULT_UPLOAD_FILE_DIR):
  os.makedirs(DEFAULT_UPLOAD_FILE_DIR)

if not os.path.exists(DATASET_UPLOAD_FILE_DIR):
  os.makedirs(DATASET_UPLOAD_FILE_DIR)

if not os.path.exists(VECTOR_STORE_FILE_DIR):
  os.makedirs(VECTOR_STORE_FILE_DIR)
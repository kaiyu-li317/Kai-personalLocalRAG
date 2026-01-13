import os
# Check if directory exists
def is_dir_exist(path: str) -> bool:
  return os.path.exists(path) and os.path.isdir(path)
# Check if file exists
def is_file_exist(path: str) -> bool:
  return os.path.exists(path) and os.path.isfile(path)

# Create directory if it doesn't exist
def create_dir_if_not_exist(path: str) -> bool:
  if not is_dir_exist(path):
    os.makedirs(path)
    return True
  return False

# Create file if it doesn't exist
def create_file_if_not_exist(path: str) -> bool:
  if not is_file_exist(path):
    with open(path, 'w') as f:
      pass
    return True
  return False

DB_DIR = './resources/database'
DB_NAME = 'kai.db'
DB_PATH = os.path.join(DB_DIR, DB_NAME)

create_dir_if_not_exist(DB_DIR)
create_file_if_not_exist(DB_PATH)

DB_URI = f"sqlite:///{DB_PATH.replace('./', '')}"
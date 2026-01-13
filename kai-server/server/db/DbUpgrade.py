import os
import traceback
from config.common import DB_SCHEMA_VERSION
from sqlalchemy import Column, Integer
from sqlalchemy import text
from sqlalchemy.inspection import inspect
from sqlalchemy.exc import IntegrityError
from .DbManager import ENGINE, session_scope, Base
from logger import logger
from server.utils.stringutils import is_int_str

DDL_DIR = os.path.join(os.path.dirname(__file__), 'upgrade', 'ddl')
DML_DIR = os.path.join(os.path.dirname(__file__), 'upgrade', 'dml')

inspector = inspect(ENGINE)

class SchemaVersion(Base):
  __tablename__ = 't_sys_schema_version'
  version = Column(Integer, name='version', primary_key=True)

def get_current_version():
  if (SchemaVersion.__tablename__ not in inspector.get_table_names()):
    return 0
  with session_scope(True) as session:
    versions = session.query(SchemaVersion).all()
    return versions[0].version if len(versions) > 0 else 0

def upgrade_db():
  current_version = get_current_version()
  if (current_version == DB_SCHEMA_VERSION): # Version matches, no upgrade needed
    logger.info('Database version matches, no upgrade needed.')
    return
  logger.error('Database version mismatch, current version: %d, need to upgrade to: %d.' % (current_version, DB_SCHEMA_VERSION))
  try:
    execute_ddl(current_version, DB_SCHEMA_VERSION)
    execute_dml(current_version, DB_SCHEMA_VERSION)
  except Exception as e: # Need further rollback handling on failure, not implemented yet
    traceback.print_exc()
    logger.error(e)
    logger.error('Database upgrade failed, please check logs.')
  else:
    logger.info('Database upgrade successful')
    with session_scope() as session:
      if (current_version == 0):
        session.add(SchemaVersion(version=DB_SCHEMA_VERSION))
      else:
        session.query(SchemaVersion).filter(SchemaVersion.version == current_version).update({'version': DB_SCHEMA_VERSION})
# Iterate through SQL files in directory and get file contents
def get_sql_scripts(dir_path:str, current_version:int, target_version:int):
  paths = []
  for file in os.listdir(dir_path): # TODO: Need to sort by filename
    if (not file.endswith('.sql')):
      continue
    name = file.split('.')[0]
    if (not is_int_str(name)):
      continue
    name = int(name)
    if (current_version == 0):
      if (name == current_version): # If not installed, execute full script (0.sql)
        paths.append(os.path.join(dir_path, file))
    else:
      if (name > current_version and name <= target_version): # Version doesn't match requirements
        paths.append(os.path.join(dir_path, file))
  # Get file contents
  contents = [open(path, 'r', encoding='utf-8').read() for path in paths]
  scripts = [] # Scripts to execute
  for content in contents:
    for line in content.split(';'): # Split by semicolon, multi-line SQL not supported yet
      line = line.strip()
      if (len(line) > 0):
        scripts.append(line)
  return scripts

def execute_ddl(current_version:int, target_version:int):
  logger.info(f'Starting database DDL upgrade from {current_version} to {target_version}')
  scripts = get_sql_scripts(DDL_DIR, current_version, target_version)
  with session_scope() as session:
    for script in scripts:
      session.execute(text(script))
  logger.info('Database DDL upgrade successful')

def execute_dml(current_version:int, target_version:int):
  logger.info(f'Starting database DML upgrade from {current_version} to {target_version}')
  scripts = get_sql_scripts(DML_DIR, current_version, target_version)
  with session_scope() as session:
    for script in scripts:
      try:
        session.execute(text(script))
      except IntegrityError as e:
        if ('UNIQUE constraint failed' not in str(e)): # Ignore primary key conflicts
          raise e
  logger.info('Database DML upgrade successful')
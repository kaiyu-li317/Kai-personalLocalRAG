#!/usr/bin/env python
# coding=utf-8
"""
# @Time    : 2024/4/8
# @Author  : Summer
# @File    : logger.py
# @describe: Logger configuration
"""
import colorlog
import logging
from logging.handlers import TimedRotatingFileHandler

# Create logger object
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Create handler
stream_handler = logging.StreamHandler()
# Create TimedRotatingFileHandler object, generate a new file every day, keep 10 backup files
file_handler = TimedRotatingFileHandler(filename='resources/logs/app.log', when='D', interval=1, backupCount=10, encoding='utf-8')

# Create colored formatter
formatter = colorlog.ColoredFormatter(
  "%(log_color)s%(levelname)-8s%(reset)s %(blue)s%(message)s",
  datefmt=None,
  reset=True,
  log_colors={
    'DEBUG':    'cyan',
    'INFO':     'green',
    'WARNING':  'yellow',
    'ERROR':    'red',
    'CRITICAL': 'red,bg_white',
  },
  secondary_log_colors={},
  style='%'
)

# Set handler's formatter
stream_handler.setFormatter(formatter)
file_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))

# logging.basicConfig(handlers=[stream_handler, file_handler], level=logging.DEBUG)
# Add handler to logger
logger.addHandler(stream_handler)
logger.addHandler(file_handler)

# Example log records
# logger.debug('Debug message')
# logger.info('Info message')
# logger.warning('Warning message')
# logger.error('Error message')
# logger.critical('Critical message')
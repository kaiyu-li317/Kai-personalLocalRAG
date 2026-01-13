import asyncio
from sqlalchemy import select, or_
from logger import logger
from server.db.DbManager import session_scope
from server.model.orm_knb import Dataset
from server.core.queue.DatasetToVectorQueue import produce as vectorProduce
from server.core.queue.DatasetEnhanceVectorQueue import produce as enhanceProduce, EnhanceItem
from datetime import datetime

# Define scheduled task function
async def datasetToVectorQueueJob():
  while True:
    logger.info(f"Dataset vector index scheduled task executed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    # Query datasets with new index status and enabled
    stmt = select(Dataset).where(Dataset.idxSts == 'new', Dataset.enbSts == 'enb').order_by(Dataset.crtTm.asc())
    with session_scope() as session:
      for row in session.scalars(stmt):
        dataset = row.to_dict(convert=lambda key, value: '' if value is None else value, excludes=['crtUser', 'crtTm', 'idxSts', 'enbSts'])
        if (vectorProduce(dataset)):
          row.idxSts = 'order'
          session.merge(row)
    await asyncio.sleep(30) # Execute every 30 seconds

async def datasetEnhanceQueueJob():
  while True:
    logger.info(f"Dataset enhance index scheduled task executed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    # Query datasets with summary, Q&A, triplet status as new and enabled: three tasks share one queue
    stmt = select(Dataset).where(Dataset.enbSts == 'enb', Dataset.idxSts == 'ready', or_(Dataset.prcsSts == 'new', Dataset.qaSts == 'new', Dataset.tpltSts == 'new')).order_by(Dataset.crtTm.asc())
    with session_scope() as session:
      for row in session.scalars(stmt):
        dataset = row.to_dict(convert=lambda key, value: '' if value is None else value, excludes=['crtUser', 'crtTm', 'idxSts', 'enbSts'])
        if (row.prcsSts == 'new'):
          item = EnhanceItem(dataset['dtsetId'], 'precis')
          if (enhanceProduce(item)):
            row.prcsSts = 'order'
        if (row.qaSts == 'new'):
          item = EnhanceItem(dataset['dtsetId'], 'qanswer')
          if (enhanceProduce(item)):
            row.qaSts = 'order'
        if (row.tpltSts == 'new'):
          item = EnhanceItem(dataset['dtsetId'], 'triplet')
          if (enhanceProduce(item)):
            row.tpltSts = 'order'
          session.merge(row)
    await asyncio.sleep(30) # Execute every 30 seconds
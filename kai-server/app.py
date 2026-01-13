import asyncio
import uvicorn
from fastapi import FastAPI, Request, APIRouter, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from logger import logger
from server.api.sys.FileApi import FileApi
from server.api.sys.SettingApi import SettingApi
from server.api.knb.ReposInfoApi import ReposInfoApi
from server.api.knb.DatasetApi import DatasetApi
from server.api.knb.ChatApi import ChatApi
from server.api.knb.SearchApi import SearchApi
from server.api.doc.DocsetInfoApi import DocsetInfoApi
from contextlib import asynccontextmanager
from server.core.scheduler.Scheduler import datasetToVectorQueueJob, datasetEnhanceQueueJob
from server.utils.websocketutils import WebsocketManager
from server.exception.exception import golbal_exception_handlers, global_exceptions_middleware
from config.common import DEFAULT_STATIC_DIR_NAME, DEFAULT_DOCUMENT_DIR_NAME

from server.db.DbUpgrade import upgrade_db
upgrade_db()

@asynccontextmanager
async def lifespan(app: FastAPI):
  logger.info('----app startup----')
  asyncio.create_task(datasetToVectorQueueJob())
  asyncio.create_task(datasetEnhanceQueueJob())
  yield
  logger.info('----app shutdown----')

app = FastAPI(lifespan=lifespan, debug=True, exception_handlers=golbal_exception_handlers)
# Global unhandled error handler
app.middleware('http')(global_exceptions_middleware)
# Set 'static' directory as static files directory
app.mount(f'/{DEFAULT_STATIC_DIR_NAME}/{DEFAULT_DOCUMENT_DIR_NAME}', StaticFiles(directory=f'./resources/{DEFAULT_DOCUMENT_DIR_NAME}'), name=DEFAULT_DOCUMENT_DIR_NAME)
app.mount(f'/{DEFAULT_STATIC_DIR_NAME}', StaticFiles(directory=f'./resources/{DEFAULT_STATIC_DIR_NAME}'), name=DEFAULT_STATIC_DIR_NAME)

router = APIRouter()
manager = WebsocketManager()

FileApi(app)
SettingApi(app)
ReposInfoApi(app, manager)
DatasetApi(app, manager)
ChatApi(app, manager)
SearchApi(app, manager)
DocsetInfoApi(app)

@router.websocket('/ws/knb/{client_id}')
async def websocket_serve(client_id: str, websocket: WebSocket):
  # 1. Client and server establish ws connection
  await websocket.accept()
  manager.connect(client_id, websocket)
  # # 2. Broadcast that a client has entered the chat room
  # await manager.broadcast(f"{client_id} entered the chat room")
  try:
    while True:
      # 3. Server receives content sent by client
      data = await websocket.receive_text()
      # 4. Broadcast message sent by a client
      # await manager.broadcast(f"{client_id} sent message: {data}")
      # 5. Server replies to client
      # await manager.send_message_to_client(f"Server reply to {client_id}: your message is: {data}", websocket)
  except WebSocketDisconnect:
    # 6. If a client disconnects, broadcast that the client has left
    manager.disconnect(client_id)
    # await manager.broadcast(f"{client_id} left the chat room")

app.include_router(router)

@app.middleware('http')
async def add_request_header_middleware(request: Request, call_next):
  request.state.user = {'id': 'client_default_user', 'name': 'client_default_user'}
  # Get request headers and store in response for subsequent processing
  return await call_next(request)

@app.get('/')
def repositoryList():
  return 'hello world'

if __name__ == '__main__':
  uvicorn.run(app, host='0.0.0.0', port=6088, log_level='debug')
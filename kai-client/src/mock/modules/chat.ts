import Mock from 'mockjs'
const { Random } = Mock as any // Export random functions

const success = (data: any) => {
  return {
    code: 200,
    data,
    msg: 'Operation successful',
    success: true
  }
}

const successPage = (data: any) => {
  return {
    data,
    pageNum: 1,
    pageSize: 10,
    pages: 13,
    total: 130
  }
}

// Add chat session
const addChat = (req) => {
  return success(null)
}
// Edit chat session
const editChat = (req) => {
  return success(null)
}
// Delete chat session
const removeChat = (req) => {
  return success(null)
}

// Query chat list
const chatList = (req) => {
  return success([
    { chatId: Random.guid(), reposId: Random.guid(), chatTtl: Random.string(25) },
    { chatId: Random.guid(), reposId: Random.guid(), chatTtl: Random.string(25) }
  ])
}

// Query message list
const messageList = (req) => {
  return success([
    { mesgId: Random.guid(), chatId: Random.guid(), mesgCntnt: Random.string(50), mesgTyp: 'text', crtRole: 'sys' },
    { mesgId: Random.guid(), chatId: Random.guid(), mesgCntnt: Random.string(50), mesgTyp: 'text', crtRole: 'sys'  }
  ])
}

export default {
  addChat, editChat, removeChat,
  chatList, messageList
}
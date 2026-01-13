<style lang="less">
.kb-chat.n-card > .n-card__content {
  padding: 0;
  overflow: hidden;
}

.kb-chat {
  height: 100%;
  background: transparent;
  
  .n-layout {
    height: 100%;
    background: transparent;
  }
  
  .n-layout-sider {
    background: #18181b !important;
    border-color: #27272a !important;
  }
  
  &-info {
    padding-bottom: 20px;
    font-size: 17px;
    font-weight: 600;
    display: flex;
    align-items: center;
    color: #fafafa;
    letter-spacing: -0.01em;
    
    .n-icon {
      font-size: 20px;
      margin-right: 6px;
      color: #818cf8;
    }
    
    .n-icon:last-child {
      color: #71717a;
      font-size: 14px;
    }
  }
  
  &-option {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    
    .n-button {
      border-radius: 8px;
      font-weight: 500;
      
      &.n-button--primary-type {
        background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        border: none;
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
        
        &:hover {
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
        }
      }
      
      &.n-button--default-type {
        background: #27272a;
        border-color: #3f3f46;
        color: #a1a1aa;
        
        &:hover {
          background: #3f3f46;
          border-color: #52525b;
          color: #fafafa;
        }
      }
    }
    
    .n-button:nth-child(2) {
      width: 136px;
    }
  }
  
  &-list.n-list {
    margin-top: 20px;
    background: transparent;
    
    .n-list-item {
      position: relative;
      padding: 10px 12px;
      margin-bottom: 4px;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.15s ease;
      
      .n-list-item__main {
        width: calc(100% - 26px);
        
        .n-thing, .n-thing-main {
          width: 100%;
          
          .n-thing-main__content {
            color: #a1a1aa;
            font-size: 14px;
          }
          
          .n-icon {
            margin-right: 6px;
            position: relative;
            top: 1px;
            color: #71717a;
          }
        }
      }
      
      .n-list-item__suffix {
        visibility: hidden;
        margin-left: 0;
      }
      
      &:hover {
        background: #27272a;
        
        .n-list-item__suffix {
          visibility: visible;
        }
        
        .n-thing-main__content {
          color: #fafafa;
        }
      }
    }
    
    .selected.n-list-item {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(79, 70, 229, 0.08) 100%);
      
      .n-thing-main__content {
        color: #818cf8 !important;
      }
      
      .n-icon {
        color: #818cf8 !important;
      }
    }
  }
}
</style>

<template>
  <n-card class="kb-chat" :bordered="false">
    <n-layout has-sider>
      <n-layout-sider bordered content-style="padding: 24px;">
        <div class="kb-chat-info">
          <n-icon class="iconfont-kb icon-knowledge"></n-icon>
          <n-dropdown trigger="hover" :options="reposOptions" :on-select="onReposSelect">
            <span title="Switch knowledge base">{{ selectedRepos.reposNm }}</span>
          </n-dropdown>
          <n-icon class="iconfont icon-unfoldmore"></n-icon>
        </div>
        <div class="kb-chat-option">
          <n-button circle @click="turnToRepos" title="Knowledge base details"><n-icon class="iconfont icon-undovariant"></n-icon></n-button>
          <n-button round @click="addChat">
            <template #icon>
              <n-icon class="iconfont-kb icon-chat-add"></n-icon>
            </template>
            New Chat
          </n-button>
          <n-button circle @click="clearChat" title="Clear chats"><n-icon class="iconfont icon-broom"></n-icon></n-button>
        </div>
        <n-list class="kb-chat-list" :show-divider="false">
          <n-list-item v-for="chat in chatList" :key="chat.chatId" @click="onChatSelect(chat.chatId)" :class="selectedChatId === chat.chatId ? 'selected' : ''">
            <template #suffix>
              <n-dropdown :options="chatOptions" :on-select="(key) => {
                this.onChatOptionSelect(key, chat)
              }">
                <n-button size="tiny"><n-icon class="iconfont icon-dotshorizontal"></n-icon></n-button>
              </n-dropdown>
            </template>
            <n-thing>
              <n-ellipsis>
                <n-icon class="iconfont-kb icon-chat1"></n-icon>{{ chat.chatTtl }}
              </n-ellipsis>
            </n-thing>
          </n-list-item>
        </n-list>
        <n-empty v-if="chatList.length === 0"/>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        <keep-alive>
          <Content :reposId="selectedReposId" :chatId="selectedChatId" :key="selectedChatId" v-if="selectedChatId" @on-send-first-message="onSendFirstMessage" />
        </keep-alive>
      </n-layout-content>
    </n-layout>
  </n-card>
</template>
<script>
  import { defineComponent, ref, getCurrentInstance, computed, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { NCard, NLayout, NLayoutSider, NLayoutContent, NMenu, NButton, NIcon, NList, NListItem, NThing, NEllipsis, NDropdown, useDialog, useMessage } from 'naive-ui'
  import { renderIconfontIcon, dialogCreate, dialogConfirm } from '@/libs/utils'
  import { localRead, localSave } from '@/libs/tools'
  import { CURRENT_REPOS_ID_KEY } from '@/libs/enum'
  import Content from './chat/Content.vue'
  import ChatForm from './chat/form/ChatForm.vue'

  export default defineComponent({
    components: {
      NCard, NLayout, NLayoutSider, NLayoutContent, NMenu, NButton, NIcon, NList, NListItem, NThing, NEllipsis, NDropdown,
      Content
    },
    setup() {
      const dialog = useDialog()
      const message = useMessage()
      // Get current component instance and context for router and vuex operations
	    const { proxy, ctx } = getCurrentInstance()
      const selectedReposId = ref('')
      const selectedChatId = ref('')
      const reposList = ref([])
      const chatList = ref([])
      const selectedRepos = computed(() => {
        return reposList.value.find(repos => repos.reposId === selectedReposId.value) || {}
      })
      const reposOptions = computed(() => {
        let list = []
        reposList.value.forEach(repos => {
          list.push({
            label: repos.reposNm,
            key: repos.reposId,
            icon: () => renderIconfontIcon('iconfont-kb icon-knowledge')
          },)
        })
        return list
      })
      const initChatList = (reposId) => {
        proxy.$api.post('/knb/chat/my/list', { reposId }).then(res => {
          chatList.value = res.data || []
          if (chatList.value.length > 0) {
            selectedChatId.value = chatList.value[0].chatId
          } else {
            selectedChatId.value = ''
          }
        }).catch(err => {
          console.error(err)
        })
      }
      const initReposList = () => {
        proxy.$api.post('/knb/repository/my/list').then(res => {
          reposList.value = res.data || []
          if (reposList.value.length > 0) {
            let currentId = localRead(CURRENT_REPOS_ID_KEY) || ''
            if (currentId) {
              let fs = reposList.value.filter(repos => repos.reposId === currentId)
              if (fs.length > 0) {
                selectedReposId.value = currentId
                return
              }
            }
            selectedReposId.value = reposList.value[0].reposId
          } else {
            selectedReposId.value = ''
            dialogConfirm(dialog, {
              title: 'Create Knowledge Base',
              content: 'You have not created a knowledge base yet. Would you like to create one?',
              type: 'warning',
              onPositiveClick: (e, dialog) => {
                router.push(`/main/repository`)
              }
            })
          }
        }).catch(err => {
          console.error(err)
        })
      }
      initReposList()
      const onChatSelect = (chatId) => {
        selectedChatId.value = chatId
      }
      const addChat = () => {
        if (reposList.value.length === 0) {
          message.error('Please create a knowledge base first')
          dialogConfirm(dialog, {
            title: 'Create Knowledge Base',
            content: 'You have not created a knowledge base yet. Would you like to create one?',
            type: 'warning',
            onPositiveClick: (e, dialog) => {
              router.push(`/main/repository`)
            }
          })
          return
        }
        proxy.$api.post('/knb/chat', { reposId: selectedReposId.value, chatTtl: 'New Chat' }).then(res => {
          // initChatList(selectedReposId.value)
          chatList.value.unshift(res.data)
          selectedChatId.value = res.data.chatId
        }).catch(err => {
          console.error(err)
        })
        /*
        dialogCreate(dialog, {
          title: `New Chat`,
          style: 'width: 40%;',
          maskClosable: false,
          icon: () => renderIconfontIcon('iconfont-kb icon-chat-add', { size: '28px' }),
          onPositiveClick: (data, e, dialog) => {
            data.reposId = selectedReposId.value
            proxy.$api.post('/knb/chat', data).then(res => {
              initChatList(selectedReposId.value)
              dialog.destroy()
            }).catch(err => {
              console.error(err)
            })
          }
        }, ChatForm, {
        })
        */
      }
      const clearChat = () => {
        dialogConfirm(dialog, {
          title: 'Confirm',
          content: 'Are you sure you want to clear all chat records in this knowledge base?',
          type: 'warning',
          onPositiveClick: (e, dialog) => {
            dialog.loading = true
            proxy.$api.delete('/knb/repository/chat/clear/' + selectedReposId.value).then(res => {
              initChatList(selectedReposId.value)
              dialog.destroy()
            }).catch(err => {
              console.error(err)
              dialog.destroy()
            })
            return false
          }
        })
      }
      const chatOptions = [
        {
          label: 'Edit',
          key: 'edit',
          icon: () => renderIconfontIcon('iconfont icon-pencil')
        },
        {
          label: 'Delete',
          key: 'delete',
          icon: () => renderIconfontIcon('iconfont icon-delete')
        }
      ]
      const onChatOptionSelect = (key, chat) => {
        if (key === 'edit') {
          dialogCreate(dialog, {
            title: `Edit Chat`,
            style: 'width: 40%;',
            maskClosable: false,
            icon: () => renderIconfontIcon('iconfont-kb icon-chat1', { size: '28px' }),
            onPositiveClick: (data, e, dialog) => {
              proxy.$api.put('/knb/chat', data).then(res => {
                // initChatList(selectedReposId.value)
                chat.chatTtl = data.chatTtl
              }).catch(err => {
                console.error(err)
              })
              dialog.destroy()
            }
          }, ChatForm, {
            chat
          })
        } else if (key === 'delete') {
          dialogConfirm(dialog, {
            title: 'Delete',
            content: 'Are you sure you want to delete this chat?',
            type: 'warning',
            onPositiveClick: (e, dialog) => {
              dialog.loading = true
              proxy.$api.delete('/knb/chat/' + chat.chatId).then(res => {
                initChatList(selectedReposId.value)
                dialog.destroy()
              }).catch(err => {
                console.error(err)
                dialog.destroy()
              })
              return false
            }
          })
        }
      }
      const onReposSelect = (key) => {
        selectedReposId.value = key
        localSave(CURRENT_REPOS_ID_KEY, key)
      }
      watch(selectedReposId,(newId, oldId)=>{
        initChatList(newId)
      })
      const router = useRouter()
      const turnToRepos = () => {
        router.push(`/main/repository/detail?id=${selectedReposId.value}`)
      }
      const onSendFirstMessage = (message) => {
        let chat = chatList.value.find(chat => chat.chatId === selectedChatId.value)
        if (chat && chat.chatTtl === 'New Chat') {
          chat.chatTtl = message
          proxy.$api.put('/knb/chat', chat).then(res => {
          }).catch(err => {
            console.error(err)
          })
        }
      }
      return {
        selectedRepos,
        reposOptions,
        chatOptions,
        chatList, selectedChatId, selectedReposId,
        onChatSelect, addChat, clearChat, onChatOptionSelect, onReposSelect, turnToRepos, onSendFirstMessage
      }
    }
  })
</script>

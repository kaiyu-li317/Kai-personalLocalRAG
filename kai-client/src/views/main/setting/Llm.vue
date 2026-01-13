<style lang="less" scoped>
.llm-settings {
  padding: 48px;
  max-width: 680px;
  margin: 0 auto;
  min-height: 100%;

  .page-header {
    margin-bottom: 40px;
    
    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #fafafa;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
    }
    
    .page-desc {
      font-size: 14px;
      color: #a1a1aa;
      line-height: 1.6;
    }
  }

  .section {
    margin-bottom: 32px;

    .section-title {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #71717a;
      margin-bottom: 12px;
    }

    .section-content {
      background: #18181b;
      border-radius: 12px;
      border: 1px solid #27272a;
      overflow: hidden;
    }
  }

  .preference-card {
    padding: 20px 24px;
    
    :deep(.n-form-item) {
      margin-bottom: 0;
      
      .n-form-item-label {
        font-size: 14px;
        font-weight: 500;
        color: #d4d4d8;
      }
    }
  }

  .ollama-card {
    padding: 24px;

    .ollama-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;

      .ollama-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: #27272a;
        border: 1px solid #3f3f46;
        display: flex;
        align-items: center;
        justify-content: center;
        
        img {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }
      }

      .ollama-info {
        flex: 1;

        .ollama-name {
          font-size: 16px;
          font-weight: 600;
          color: #fafafa;
          margin-bottom: 4px;
          letter-spacing: -0.2px;
        }

        .ollama-tags {
          display: flex;
          gap: 6px;

          .tag {
            font-size: 11px;
            padding: 2px 8px;
            border-radius: 4px;
            background: rgba(99, 102, 241, 0.12);
            color: #818cf8;
            font-weight: 500;
          }
        }
      }
    }

    .ollama-desc {
      font-size: 13px;
      line-height: 1.7;
      color: #a1a1aa;
      margin-bottom: 20px;
    }

    .ollama-actions {
      display: flex;
      gap: 10px;
      padding-top: 20px;
      border-top: 1px solid #27272a;

      .action-btn {
        padding: 10px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;
        display: flex;
        align-items: center;
        gap: 6px;
        border: none;

        .n-icon {
          font-size: 14px;
        }

        &.primary {
          background: #6366f1;
          color: #fff;

          &:hover {
            background: #4f46e5;
          }
        }

        &.secondary {
          background: #27272a;
          color: #d4d4d8;

          &:hover {
            background: #3f3f46;
            color: #fafafa;
          }
        }
      }
    }
  }

  .empty-state {
    padding: 48px;
    text-align: center;
    color: #52525b;
    font-size: 14px;
  }
}
</style>

<template>
  <div class="llm-settings">
    <div class="page-header">
      <div class="page-title">模型设置</div>
      <div class="page-desc">配置 Ollama 模型服务，选择默认使用的模型</div>
    </div>

    <!-- 模型首选项 -->
    <div class="section">
      <div class="section-title">默认模型</div>
      <div class="section-content">
        <div class="preference-card">
          <model-preference ref="mpRef" />
        </div>
      </div>
    </div>

    <!-- Ollama 配置 -->
    <div class="section">
      <div class="section-title">Ollama 服务</div>
      <div class="section-content">
        <div v-if="ollamaPrvd" class="ollama-card">
          <div class="ollama-header">
            <div class="ollama-icon">
              <img :src="origin + ollamaPrvd.prvdIcon" alt="Ollama">
            </div>
            <div class="ollama-info">
              <div class="ollama-name">{{ ollamaPrvd.prvdNm }}</div>
              <div class="ollama-tags">
                <span v-for="typ in (ollamaPrvd.modlTyp || '').split(',')" :key="typ" class="tag">
                  {{ typ }}
                </span>
              </div>
            </div>
          </div>
          <div class="ollama-desc">{{ ollamaPrvd.prvdDesc }}</div>
          <prvd-model-list ref="modelListRef" :prvd="ollamaPrvd" @model-list-changed="onModelListChanged" />
          <div class="ollama-actions">
            <button class="action-btn primary" @click="onSyncModels">
              <n-icon class="iconfont icon-sync"></n-icon>
              同步模型
            </button>
            <button class="action-btn secondary" @click="onAddModel(ollamaPrvd)">
              <n-icon class="iconfont icon-plus"></n-icon>
              添加模型
            </button>
            <button class="action-btn secondary" @click="onPrvdSetting(ollamaPrvd)">
              <n-icon class="iconfont icon-settings"></n-icon>
              服务配置
            </button>
          </div>
        </div>
        <div v-else class="empty-state">未找到 Ollama 配置</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, getCurrentInstance } from 'vue'
  import { useDialog, useMessage } from 'naive-ui'
  import { dialogCreate, renderIconfontIcon } from '@/libs/utils'
  import { baseOrigin } from '@/config'
  import PrvdSettingForm from './llm/PrvdSettingForm.vue'
  import PrvdModelForm from './llm/PrvdModelForm.vue'
  import PrvdModelList from './llm/PrvdModelList.vue'
  import ModelPreference from './llm/ModelPreference.vue'

  export default defineComponent({
    components: {
      PrvdModelList, ModelPreference
    },
    setup() {
      const dialog = useDialog()
      const message = useMessage()
      const { proxy } = getCurrentInstance()
      const origin = baseOrigin
      
      const mpRef = ref()
      const modelListRef = ref()
      const ollamaPrvd = ref(null)
      
      const initOllamaPrvd = () => {
        proxy.$api.post('/sys/model/prvd/list').then(res => {
          const list = res.data || []
          ollamaPrvd.value = list.find(prvd => prvd.prvdId === 'ollama')
        }).catch(err => {
          console.error(err)
        })
      }
      initOllamaPrvd()

      const onModelListChanged = () => {
        if (mpRef.value) {
          mpRef.value.resetSelector()
        }
      }

      const onPrvdSetting = (prvd) => {
        dialogCreate(dialog, {
          title: '服务配置',
          style: 'width: 440px;',
          maskClosable: false,
          icon: () => renderIconfontIcon('iconfont icon-settings', { size: '20px' }),
          onPositiveClick: (data, e, dlg) => {
            proxy.$api.post('/sys/model/param/prvd/' + prvd.prvdId, data).then(res => {
              dlg.destroy()
            }).catch(err => {
              console.error(err)
              dlg.destroy()
            })
          }
        }, PrvdSettingForm, {
          prvd
        })
      }
      
      const onAddModel = (prvd) => {
        dialogCreate(dialog, {
          title: '添加模型',
          style: 'width: 440px;',
          maskClosable: false,
          icon: () => renderIconfontIcon('iconfont icon-plus', { size: '20px' }),
          onPositiveClick: (data, e, dlg) => {
            proxy.$api.post('/sys/model/prvd/modl/' + prvd.prvdId, data).then(res => {
              if (modelListRef.value) {
                modelListRef.value.initModelList()
              }
              if (mpRef.value) {
                mpRef.value.resetSelector()
              }
              dlg.destroy()
            }).catch(err => {
              console.error(err)
              dlg.destroy()
            })
          }
        }, PrvdModelForm, {
          prvd
        })
      }

      const onSyncModels = () => {
        proxy.$api.post('/sys/model/ollama/sync').then(res => {
          const { synced, total } = res.data || {}
          if (synced > 0) {
            message.success(`已同步 ${synced} 个新模型`)
            if (modelListRef.value) {
              modelListRef.value.initModelList()
            }
            if (mpRef.value) {
              mpRef.value.resetSelector()
            }
          } else {
            message.info(`Ollama 共有 ${total} 个模型，均已添加`)
          }
        }).catch(err => {
          console.error(err)
          message.error('同步失败: ' + (err.msg || err.message))
        })
      }

      return {
        origin,
        mpRef,
        modelListRef,
        ollamaPrvd,
        onModelListChanged,
        onPrvdSetting,
        onAddModel,
        onSyncModels
      }
    }
  })
</script>

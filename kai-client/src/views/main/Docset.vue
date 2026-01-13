<style lang="less">
.kb-docset {
  height: 100%;
  .n-card-header {
    .n-card-header__main {
      font-weight: 600;
      display: flex;
      align-items: center;
      .n-icon {
        font-size: 22px;
        margin-right: 4px;
        color: var(--primary-color);
      }
    }
    .n-card-header__extra {
      .n-button {
        margin-left: 10px;
      }
    }
  }
}
</style>

<template>
  <n-card class="kb-docset" :bordered="false">
    <template #header>
      <n-icon class="iconfont-kb icon-docset"></n-icon>My Document Library
    </template>
    <template #header-extra>
      <n-input v-model:value="inputValue" placeholder="Search document sets by name" autofocus :on-input="onInputChange">
        <template #prefix>
          <n-icon class="iconfont icon-magnify"></n-icon>
        </template>
      </n-input>
      <n-button type="primary" @click="addForm"><n-icon class="iconfont icon-plus"></n-icon>&nbsp;Create</n-button>
    </template>
    <card-list :dataList="docsetList" idKey="setId" titleKey="setNm" descKey="setDesc" defaultDesc="No description for this document set yet"
      @on-option-select="onOptionSelect" @on-item-click="turnToDetail"
    />
    <n-empty v-if="docsetList.length === 0">
      <template #extra>
        <n-button type="primary" @click="addForm"><n-icon class="iconfont icon-plus"></n-icon>&nbsp;Create</n-button>
      </template>
    </n-empty>
  </n-card>
</template>
<script>
  import { defineComponent, ref, getCurrentInstance } from 'vue'
  import { useRouter } from 'vue-router'
  import { useDialog } from 'naive-ui'
  import _ from 'lodash'
  import { renderIconfontIcon, dialogCreate, dialogConfirm } from '@/libs/utils'
  import { isEmpty } from '@/libs/tools'
  import CardList from '@/views/main/components/CardList.vue'
  import DocsetForm from './docset/form/DocsetForm.vue'

  export default defineComponent({
    components: {
      CardList
    },
    setup() {
      const dialog = useDialog()
      // Get current component instance and context for router and vuex operations
	    const { proxy, ctx } = getCurrentInstance()
      const router = useRouter()
      const sourceDocsetList = ref([])
      const docsetList = ref([])
      const inputValue = ref('')
      const initData = () => {
        proxy.$api.post('/doc/docset/my/list').then(res => {
          sourceDocsetList.value = res.data || []
          docsetList.value = sourceDocsetList.value
        }).catch(err => {
          console.error(err)
        })
      }
      initData()
      const addForm = () => {
        dialogCreate(dialog, {
          title: `Create Document Set`,
          style: 'width: 50%;',
          maskClosable: false,
          icon: () => renderIconfontIcon('iconfont-kb icon-docset', { size: '28px' }),
          onPositiveClick: (data, e, dialog) => {
            proxy.$api.post('/doc/docset', data).then(res => {
              initData()
            }).catch(err => {
              console.error(err)
            })
            dialog.destroy()
          }
        }, DocsetForm, {
        })
      }
      const onOptionSelect = (key, docset) => {
        if (key === 'edit') {
          dialogCreate(dialog, {
            title: `Edit Document Set`,
            style: 'width: 50%;',
            maskClosable: false,
            icon: () => renderIconfontIcon('iconfont-kb icon-docset', { size: '28px' }),
            onPositiveClick: (data, e, dialog) => {
              proxy.$api.put('/doc/docset', data).then(res => {
                initData()
              }).catch(err => {
                console.error(err)
              })
              dialog.destroy()
            }
          }, DocsetForm, {
            docset
          })
        } else if (key === 'delete') {
          dialogConfirm(dialog, {
            title: 'Delete',
            content: 'Are you sure you want to delete this document set?',
            type: 'warning',
            onPositiveClick: (e, dialog) => {
              dialog.loading = true
              proxy.$api.delete('/doc/docset/' + docset.setId).then(res => {
                initData()
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
      const onInputChange = _.debounce((value) => {
        if (isEmpty(value)) {
          docsetList.value = sourceDocsetList.value
          return
        }
        docsetList.value = sourceDocsetList.value.filter(item => {
          return (item.setNm.toLowerCase()).indexOf(value.toLowerCase()) > -1
        })
      }, 500)
      const turnToDetail = (setId) => {
        router.push(`/main/docset/detail?id=${setId}`)
      }
      return {
        inputValue,
        docsetList,
        addForm, onOptionSelect,
        onInputChange, turnToDetail
      }
    }
  })
</script>

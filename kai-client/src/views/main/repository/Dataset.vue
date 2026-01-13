<style lang="less">
.kb-dataset {
  height: 100%;
  position: relative;
  &-header {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 18px;
      font-weight: 600;
      .n-icon {
        font-size: 22px;
        margin-right: 4px;
        position: relative;
        top: 2px;
        color: var(--primary-color);
      }
    }
  }
  .n-split {
    height: calc(100% - 45px);
    .n-split__resize-trigger-wrapper {
      .n-icon {
        position: relative;
        left: -8px;
        top: 50%;
        margin-top: -8px;
      }
    }
  }
  .n-data-table {
    height: 100%;
    .n-data-table-wrapper, .n-data-table-base-table {
      height: 100%;
    }
    .n-data-table-empty {
      position: absolute;
      top: 48px;
      left: 50%;
      margin-left: -21px;
    }
    .title {
      cursor: pointer;
      &:hover {
        color: var(--primary-color);
      }
    }
    .kb-dataset-filetype {
      cursor: pointer;
      &:hover {
        color: var(--primary-color);
      }
    }
  }
  &-chunk-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div class="kb-dataset">
    <dataset-extend v-if="selectedId" class="kb-dataset-chunk-container" :reposId="reposId" :dtsetId="selectedId" :dtsetNm="selectedNm" :authEdit="authEdit" @on-turn-back="() => selectedId = ''" />
    <dataset-file-view ref="fileViewRef" />
    <div style="height: 100%;" v-show="!selectedId">
      <div class="kb-dataset-header">
        <div class="title">
          <n-icon class="iconfont-kb icon-dataset"></n-icon>Dataset ({{ pagination.itemCount }})
        </div>
        <n-space class="option">
          <n-input v-model:value="inputValue" placeholder="Search datasets by name" autofocus :on-input="onInputChange">
            <template #prefix>
              <n-icon class="iconfont icon-magnify"></n-icon>
            </template>
          </n-input>
          <!-- <n-button v-if="authEdit" type="primary" @click="onImportDocument"><n-icon class="iconfont icon-import"></n-icon>&nbsp;导入</n-button> -->
          <n-dropdown v-if="authEdit" trigger="hover" :options="createOptions" @select="onCreateSelect">
            <n-button type="primary"><n-icon class="iconfont icon-import"></n-icon>&nbsp;Create</n-button>
          </n-dropdown>
        </n-space>
      </div>
      <n-split direction="horizontal" default-size="250px" max="350px" min="250px">
        <template #1>
          <dataset-catalog :reposId="reposId" :authEdit="authEdit" @on-selected-change="onCatalogChange" />
        </template>
        <template #resize-trigger>
          <n-icon class="iconfont icon-dotsvertical" />
        </template>
        <template #2>
          <n-data-table
            remote
            :single-line="false"
            :loading="loading"
            :columns="columns"
            :data="datasetList"
            :pagination="pagination"
            @update:sorter="onSorterChange"
            @update:page="onInitDatasetList"
            :scroll-x="1200"
          />
        </template>
      </n-split>
    </div>
  </div>
</template>
<script>
  import { defineComponent, ref, getCurrentInstance, h } from 'vue'
  import { NTag, NBadge, NSpace, NSwitch, NButton, NIcon, NDropdown, useDialog, useMessage } from 'naive-ui'
  import _ from 'lodash'
  import { renderIconfontIcon, dialogCreate, dialogConfirm } from '@/libs/utils'
  import { deepCopy, bytesToSize } from '@/libs/tools'
  import { DATASET_INDEX_STATUS_TYPE, DATASET_ENABLE_STATUS_TYPE, FILE_TYPE_ICON_MAP } from '@/libs/enum'
  import DocumentImportForm from './form/DocumentImportForm.vue'
  import LinkImportForm from './form/LinkImportForm.vue'
  import DatasetForm from './dataset/DatasetForm.vue'
  import ReindexForm from './dataset/ReindexForm.vue'
  import DatasetExtend from './dataset/DatasetExtend.vue'
  import DatasetCatalog from './dataset/DatasetCatalog.vue'
  import DatasetIndexError from './dataset/DatasetIndexError.vue'
  import DatasetFileView from './dataset/DatasetFileView.vue'

  export default defineComponent({
    components: {
      DatasetExtend, DatasetCatalog, DatasetFileView
    },
    props: {
      reposId: {
        type: String,
        required: true
      },
      authEdit: {
        type: Boolean
      }
    },
    setup(props) {
      const { proxy, ctx } = getCurrentInstance()
      const message = useMessage()
      const reposId = props.reposId
      const authEdit = props.authEdit
      const dialog = useDialog()
      const loading = ref(false)
      const datasetList = ref([])
      const inputValue = ref('')
      const selectedId = ref('')
      const selectedNm = ref('')
      const pagination = reactive({
        page: 1,
        pageCount: 1,
        pageSize: 10,
        prefix ({ itemCount }) {
          return `Total ${itemCount}`
        },
        orderName: '',
        orderValue: ''
      })
      const catalogId = ref('')
      const onCatalogChange = (ctlgId) => {
        catalogId.value = ctlgId
        onInitDatasetList(1)
      }
      const onInitDatasetList = (pageNum) => {
        if (!loading.value) {
          loading.value = true
          proxy.$api.post('/knb/dataset/page', {
            dataset: {
              reposId, dtsetNm: inputValue.value, ctlgId: catalogId.value
            },
            pageBase: {
              pageNum, pageSize: pagination.pageSize, orderName: pagination.orderName, orderValue: pagination.orderValue
            }
          }).then(res => {
            datasetList.value = res.data || []
            pagination.page = pageNum
            pagination.pageCount = res.pages
            pagination.itemCount = res.total
            loading.value = false
          }).catch(err => {
            console.error(err)
            loading.value = false
          })
        }
      }
      onInitDatasetList()
      
      const setColumnsSortState = (columns, sorter) => {
        columns.forEach(column => {
          let children = column.children || []
          if (children.length > 0) {
            setColumnsSortState(children, sorter)
          }
          if (column.sortOrder === undefined)
            return
          if (!sorter) {
            column.sortOrder = false
            return
          }
          if (column.key === sorter.columnKey)
            column.sortOrder = sorter.order
          else column.sortOrder = false
        })
      }

      const onSorterChange = (sorter) => {
        if (!sorter) {
          return
        }
        let columnKey = sorter.columnKey
        let order = sorter.order // ascend, descend, false
        pagination.orderName = !order ? '' : columnKey
        pagination.orderValue = !order ? '' : order
        onInitDatasetList()
        setColumnsSortState(columns.value, sorter)
      }

      const onInputChange = _.debounce((value) => {
        onInitDatasetList(1)
      }, 500)
      // Open document import form
      const onImportDocument = () => {
        dialogCreate(dialog, {
          title: `Import Document`,
          style: 'width: 50%;',
          maskClosable: false,
          negativeText: '',
          positiveText: 'Import',
          icon: () => renderIconfontIcon('iconfont-kb icon-document1', { size: '28px' }),
          onPositiveClick: (data, e, $dialog) => {
            if (data) {
              onInitDatasetList()
              return
            }
            return false
          },
          onClose: () => {
            // onInitDatasetList()
          }
        }, DocumentImportForm, {
          reposId, catalogId: catalogId.value
        })
      }
      const onEditDataset = (row) => {
        dialogCreate(dialog, {
          title: `Edit Dataset`,
          style: 'width: 50%;',
          maskClosable: false,
          icon: () => renderIconfontIcon('iconfont-kb icon-knowledge', { size: '28px' }),
          onPositiveClick: (data, e, dialog) => {
            proxy.$api.put('/knb/dataset', data).then(res => {
              row.dtsetNm = data.dtsetNm
              dialog.destroy()
            }).catch(err => {
              console.error(err)
              dialog.destroy()
            })
          }
        }, DatasetForm, {
          dataset: row, reposId
        })
      }
      const onRemoveDataset = (row) => {
        dialogConfirm(dialog, {
          title: 'Delete Confirmation',
          content: 'Dataset cannot be recovered after deletion',
          type: 'warning',
          loading: false,
          onPositiveClick: (e, dialog) => {
            dialog.loading = true
            proxy.$api.delete('/knb/dataset/' + row.dtsetId).then(res => {
              onInitDatasetList(pagination.page)
              dialog.destroy()
            }).catch(err => {
              console.error(err)
              dialog.destroy()
            })
            return false
          }
        })
      }

      const onRebuildIndex = (row) => {
        dialogCreate(dialog, {
          title: `Rebuild Index`,
          style: 'width: 50%;',
          maskClosable: false,
          icon: () => renderIconfontIcon('iconfont-kb icon-document1', { size: '28px' }),
          onPositiveClick: (data, e, $dialog) => {
            $dialog.loading = true
            if (data) {
              proxy.$api.post('/knb/dataset/reindex/' + row.dtsetId, data).then(res => {
                onInitDatasetList(pagination.page)
                $dialog.destroy()
              }).catch(err => {
                console.error(err)
                $dialog.destroy()
              })
            }
            return false
          }
        }, ReindexForm, {
          dataset: row
        })
      }
      
      const rowOptions = ref([
        {
          label: 'Rebuild Index',
          key: 'reindex',
          icon: () => renderIconfontIcon('iconfont-kb icon-vector'),
          disabled: !authEdit
        },
        {
          label: 'Chunk Settings',
          key: 'chunk',
          icon: () => renderIconfontIcon('iconfont-kb icon-dataset1'),
          disabled: !authEdit
        },
        {
          label: 'Edit',
          key: 'edit',
          icon: () => renderIconfontIcon('iconfont icon-pencil'),
          disabled: !authEdit
        },
        {
          label: 'Delete',
          key: 'delete',
          icon: () => renderIconfontIcon('iconfont icon-delete'),
          disabled: !authEdit
        }
      ])

      const onImportLink = () => {
        dialogCreate(dialog, {
          title: `Static Web Page URL`,
          style: 'width: 70%;',
          maskClosable: false,
          negativeText: '',
          positiveText: 'Import',
          icon: () => renderIconfontIcon('iconfont-kb icon-link1', { size: '28px' }),
          onPositiveClick: (data, e, $dialog) => {
            if (data) {
              onInitDatasetList()
              return
            }
            return false
          },
          onClose: () => {
            // onInitDatasetList()
          }
        }, LinkImportForm, {
          reposId, catalogId: catalogId.value
        })
      }

      const createOptions = ref([
        {
          label: 'Import Document',
          key: 'document',
          icon: () => renderIconfontIcon('iconfont-kb icon-document1')
        }, {
          label: 'Web Link',
          key: 'link',
          icon: () => renderIconfontIcon('iconfont-kb icon-link1')
        }
      ])

      const onCreateSelect = (value) => {
        if (value === 'document') {
          onImportDocument()
        } else if (value === 'link') {
          onImportLink()
        }
      }

      const onUpdateBuildStatus = (row, buildKey, buildValue) => {
        let idxSts = row.idxSts
        if (idxSts !== 'ready') {
          message.warning('Index status is not ready, cannot build enhanced index')
          return
        }
        dialogConfirm(dialog, {
          title: 'Confirm',
          content: 'This will consume additional tokens. Are you sure you want to build enhanced index?',
          type: 'warning',
          loading: false,
          onPositiveClick: (e, dialog) => {
            dialog.loading = true
            proxy.$api.put('/knb/dataset/build/status', {
              dtsetId: row.dtsetId, buildKey, buildValue
            }).then(res => {
              row[buildKey] = buildValue
              dialog.destroy()
            }).catch(err => {
              dialog.destroy()
              console.error(err)
            })
            return false
          }
        })
      }

      const fileViewRef = ref()
      const onFilePreview = (dataset) => {
        fileViewRef.value.toggle(dataset)
      }

      const showIndexError = (dtsetId, type) => {
        dialogCreate(dialog, {
          title: `Error Information`,
          style: 'width: 50%;',
          maskClosable: false,
          negativeText: '',
          positiveText: '',
          icon: () => renderIconfontIcon('iconfont icon-alert', { size: '28px' }),
        }, DatasetIndexError, {
          dtsetId, type
        })
      }
      const statusKeyTypeMap = {
        idxSts: 'index', prcsSts: 'precis', qaSts: 'qanswer', tpltSts: 'triplet'
      }
      const createBuildStatusColumn = (title, key) => {
        return { title, key, width: 100, sorter: true, sortOrder: false, render(row) {
          let status = row[key]
          let title = ''
          if (authEdit) {
            if (status === 'nobd') { // Can change to build under non-build status, i.e., create new, background task runs batch
              title = `Click to build ${title} index`
            }
          }
          let color = {color: 'var(--primary-color-opacity-5)', borderColor: 'var(--primary-color-opacity-5)', textColor: 'var(--primary-color-opacity-2)'}
          let type = ''
          if (status === 'error') {
            color = {}
            type = 'error'
          }
          return h(
            NTag,
            {
              color,
              type,
              title,
              style: { cursor: 'pointer' },
              onclick: () => {
                if (!authEdit) {
                  return
                }
                if (status === 'nobd') { // Can change to build under non-build status, i.e., create new, background task runs batch
                  onUpdateBuildStatus(row, key, 'new')
                } else if (status === 'error') {
                  showIndexError(row.dtsetId, statusKeyTypeMap[key])
                }
              }
            },
            {
              default: () => {
                return [
                  h(
                    NBadge,
                    {
                      dot: true,
                      color: status === 'error' ? 'var(--error-color)' : 'var(--primary-color)',
                      style: {
                        marginRight: '4px',
                        top: '-1px'
                      }
                    }
                  ),
                  DATASET_INDEX_STATUS_TYPE[status] || 'Unknown'
                ]
              }
            })
          }
        }
      }

      const columns = ref([
        { title: 'Name', key: 'dtsetNm', minWidth: 250, render(row) {
          return h(
            NSpace,
            {},
            {
              default: () => {
                return [
                  h('span', {
                    class: 'title',
                    title: 'View dataset content',
                    onClick: () => {
                      selectedId.value = row.dtsetId
                      selectedNm.value = row.dtsetNm
                    }
                  }, row.dtsetNm + '.' + row.fileTyp)
                ]
              }
            })
          }
        },
        { title: 'Type', key: 'fileTyp', align: 'center', width: 60, render(row) {
          return h(
            NIcon,
            {
              title: `${row.fileTyp}${authEdit ? ' Click to preview' : ''}`,
              size: '22px',
              class: `kb-dataset-filetype ${FILE_TYPE_ICON_MAP[row.fileTyp] || 'iconfont icon-file'}`,
              onClick: () => {
                if (authEdit) {
                  onFilePreview(row)
                }
              }
            }
          )
        } },
        { title: 'Size', key: 'fileSize', align: 'center', width: 85, render(row) {
          let size = row.fileSize // 字节
          let res = ''
          if (size > 0) {
            res = bytesToSize(size)
          }
          return h('span', {
            style: {
              display: 'inline-block',
              fontSize: '12px',
              transform: 'scale(0.75)'
            }
          }, res)
        } },
        { title: 'Status', key: 'enbSts', align: 'center', titleAlign: 'left', width: 100, render(row) {
          let label = DATASET_ENABLE_STATUS_TYPE[row.enbSts] || 'Unknown'
          return h(
            NSwitch,
            {
              disabled: !authEdit,
              value: row.enbSts === 'enb',
              title: label,
              'on-update:value': (value) => {
                let enbSts = value ? 'enb' : 'une'
                proxy.$api.put('/knb/dataset/enable/status', {
                  dtsetId: row.dtsetId, enbSts
                }).then(res => {
                  row.enbSts = enbSts
                }).catch(err => {
                  console.error(err)
                })
              }
            }, {
              checked () { // slot
                return '' // label
              },
              unchecked () {
                return '' // label
              }
            })
          }
        },
        createBuildStatusColumn('Index', 'idxSts'),
        {
          title: 'Enhanced Index', key: 'enhance', align: 'center',
          children: [
            createBuildStatusColumn('Summary', 'prcsSts'),
            createBuildStatusColumn('Q&A', 'qaSts'),
            createBuildStatusColumn('Graph', 'tpltSts'),
          ]
        },
        { title: 'Actions', key: 'option', fixed: 'right', align: 'center', width: 100, render(row) {
          let options = deepCopy(rowOptions.value)
          if (authEdit) {
            options.forEach(option => {
              if (option.key === 'reindex') {
                option.disabled = row.idxSts === 'new' || row.enbSts === 'une'
              } else {
                option.disabled = !authEdit
              }
            })
          }
          return h(
            NDropdown,
            {
              options,
              onSelect: (key) => {
                switch (key) {
                  case 'reindex':
                    onRebuildIndex(row)
                    break
                  case 'chunk':
                    onChunkSetting(row)
                    break
                  case 'edit':
                    onEditDataset(row)
                    break
                  case 'delete':
                    onRemoveDataset(row)
                    break
                }
              }
            },
            h(
              NButton,
              {
                size: 'small', secondary: true, type: 'primary'
              },
              h(
                NIcon,
                {
                  class: 'iconfont icon-dotshorizontal'
                }
              )
            )
          )}
        }
      ])

      return {
        fileViewRef,
        loading,
        datasetList,
        authEdit,
        pagination,
        inputValue,
        selectedId, selectedNm,
        columns,
        onInitDatasetList, onSorterChange,
        onImportDocument, onInputChange, onCatalogChange,
        createOptions, onCreateSelect
      }
    }
  })
</script>

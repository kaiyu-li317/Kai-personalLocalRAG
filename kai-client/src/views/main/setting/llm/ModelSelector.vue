<style lang="less">
.kb-model-selector {
  width: 100%;
  
  &.n-select {
    .n-base-selection {
      background: #27272a;
      border: 1px solid #3f3f46;
      border-radius: 8px;
      transition: all 0.15s ease;
      
      &:hover {
        border-color: #52525b;
      }
      
      &.n-base-selection--focus {
        border-color: #6366f1;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
      }
      
      .n-base-selection-label {
        color: #fafafa;
      }
      
      .n-base-selection-placeholder {
        color: #a1a1aa;
      }
    }
  }
}
</style>

<template>
  <n-select 
    class="kb-model-selector" 
    clearable
    v-model:value="formData[valueKey]"
    placeholder="请选择模型"
    :options="llmOptions"
    :disabled="disabled"
  />
</template>
<script>
  import { defineComponent, ref } from 'vue'
  import $api from '@/libs/axios'

  export default defineComponent({
    components: {
    },
    props: {
      formData: Object,
      valueKey: {
        type: String,
        default: 'llm'
      },
      modelType: {
        type: String,
        default: 'llm'
      },
      disabled: false
    },
    setup(props, context) {
      const llmOptions = ref([])
      const initLlmOptions = () => {
        $api.get('/sys/model/my/list').then(res => {
          let data = res.data || []
          let options = []
          data.forEach(prvd => {
            prvd['children']?.forEach(model => {
              if (model['type'] === props.modelType) {
                options.push({
                  label: `${prvd.label} / ${model.label}`,
                  value: model.value
                })
              }
            })
          })
          llmOptions.value = options
        }).catch(err => {
          console.error(err)
        })
      }
      initLlmOptions()
      return {
        llmOptions,
        initLlmOptions
      }
    }
  })
</script>

<style lang="less">
</style>
<template>
  <n-form
    ref="formVm"
    label-placement="left"
    label-width="auto"
    :model="formData"
    :rules="formRules"
    require-mark-placement="right-hanging"
  >
    <n-form-item label="Title" path="docTtl">
      <n-input v-model:value="formData.docTtl" placeholder="Please enter document title" />
    </n-form-item>
    <n-form-item label="Type" path="docTyp">
      <n-select v-model:value="formData.docTyp" :options="docTypOptions" :disabled="doc" placeholder="Please select document type" />
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, getCurrentInstance, inject, ref } from 'vue'
import { map2Options } from '@/libs/utils'
import { DOCUMENT_TYPE } from '@/libs/enum'
export default defineComponent({
  components: {
  },
  props: {
    /** 待修改的数据 */
    doc: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    let doc = props['doc']
    if (!doc) {
      doc = {
        docId: '', setId: '', docTtl: '', docTyp: 'rt'
      }
    }
    const docTypOptions = ref(map2Options(DOCUMENT_TYPE))

    const formVm = ref()
    const formData = ref(JSON.parse(JSON.stringify(doc)))
    const formRules = ref({
      docTtl: [
        {
          required: true,
          message: 'Document title is required',
          trigger: [ 'blur' ]
        }
      ]
    })
    const validate = () => {
      return formVm.value.validate()
    }
    const ok = async () => {
      let valid = false
      try {
        await validate()
        valid = true
      } catch (err) {
        // 具体的错误信息项 err
        console.error(err)
      }
      if (valid) {
        return Promise.resolve(formData.value)
      }
      return Promise.reject()
    }
    
    return {
      docTypOptions,
      formVm,
      formData, formRules,
      ok
    }
  }
})
</script>
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
    <n-form-item label="Subject" path="tpltSbjct">
      <n-input v-model:value="formData.tpltSbjct" placeholder="Please enter subject" />
    </n-form-item>
    <n-form-item label="Predicate" path="tpltPrdct">
      <n-input v-model:value="formData.tpltPrdct" placeholder="Please enter predicate" />
    </n-form-item>
    <n-form-item label="Object" path="tpltObjct">
      <n-input v-model:value="formData.tpltObjct" placeholder="Please enter object" />
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, getCurrentInstance, inject, ref } from 'vue'
import { useCatalog } from './mixin/catalog'
export default defineComponent({
  components: {},
  props: {
    /** 待修改的数据 */
    triplet: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    let triplet = props['triplet']
    if (!triplet) {
      triplet = {
        tpltId: '', reposId: '', dtsetId: '', tpltSeq: null, tpltSbjct: '', tpltPrdct: '', tpltObjct: '', tpltSrc: ''
      }
    }
    const formVm = ref()
    const formData = ref(JSON.parse(JSON.stringify(triplet)))
    formData.value.tpltSrc = 'hm'
    const formRules = ref({
      tpltSbjct: [{ required: true, message: 'Subject is required', trigger: [ 'blur' ] }],
      tpltPrdct: [{ required: true, message: 'Predicate is required', trigger: [ 'blur' ] }],
      tpltObjct: [{ required: true, message: 'Object is required', trigger: [ 'blur' ] }]
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
      formVm,
      formData, formRules,
      ok
    }
  }
})
</script>
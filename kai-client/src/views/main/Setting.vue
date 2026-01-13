<style lang="less" scoped>
.kb-setting {
  height: 100%;
  background: transparent;
  overflow: auto;
}
</style>

<template>
  <div class="kb-setting">
    <llm />
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import Llm from './setting/Llm.vue'

  export default defineComponent({
    components: {
      Llm
    }
  })
</script>

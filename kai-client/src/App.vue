<style lang="less">
@import url('./window.less');
.n-config-provider, .kb-app {
  height: 100%;
}
</style>

<template>
  <n-config-provider :theme="themeType" :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
    <n-el tag="div" id="kb-app" :class="`kb-app ${themeType.name}`" :key="`kb-app-${key}`">
      <div data-tauri-drag-region class="window-titlebar">
        <div class="window-titlebar-button" @click="appWindow.minimize()" title="最小化"></div>
        <div class="window-titlebar-button" @click="appWindow.toggleMaximize()" title="最大化"></div>
        <div class="window-titlebar-button" @click="appWindow.close()" title="关闭"></div>
      </div>
      <n-dialog-provider>
        <n-message-provider>
          <router-view />
          <m-n-d />
        </n-message-provider>
      </n-dialog-provider>
    </n-el>
  </n-config-provider>
</template>
<script>
  import { defineComponent, getCurrentInstance } from 'vue'
  import { useTheme } from '@/mixin/app'
  import MND from './components/MND.vue'
  
  // 检测是否在 Tauri 环境中
  const isTauri = () => {
    return typeof window !== 'undefined' && window.__TAURI_INTERNALS__ !== undefined
  }
  
  export default defineComponent({
    components: {
      MND
    },
    setup() {
      const { proxy, ctx } = getCurrentInstance()
      const {themeOverrides, themeType, zhCN, dateZhCN} = useTheme()
      const key = ref(0)
      
      let appWindow = {
        minimize: () => {},
        toggleMaximize: () => {},
        close: () => {}
      }
      
      if (isTauri()) {
        import('@tauri-apps/api/window').then(({ Window }) => {
          appWindow = new Window('main')
        })
        import('@tauri-apps/api/webviewWindow').then(({ getCurrentWebviewWindow }) => {
          const appWebview = getCurrentWebviewWindow()
          appWebview.listen('on-server-started', (event) => {
            console.log(event.payload)
            key.value = 1
          })
        })
      } else {
        // 浏览器环境下直接显示
        key.value = 1
      }
      
      return {
        key,
        themeOverrides, themeType, zhCN, dateZhCN,
        appWindow
      }
    }
  })
</script>

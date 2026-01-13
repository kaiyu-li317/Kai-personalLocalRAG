<style lang="less">
@import url('./window.less');
.n-config-provider, .kb-app {
  height: 100%;
}
</style>

<template>
  <n-config-provider :theme="themeType" :theme-overrides="themeOverrides" :locale="enUS" :date-locale="dateEnUS">
    <n-el tag="div" id="kb-app" :class="`kb-app ${themeType.name}`" :key="`kb-app-${key}`">
      <div data-tauri-drag-region class="window-titlebar">
        <div class="window-titlebar-button" @click="appWindow.minimize()" title="Minimize"></div>
        <div class="window-titlebar-button" @click="appWindow.toggleMaximize()" title="Maximize"></div>
        <div class="window-titlebar-button" @click="appWindow.close()" title="Close"></div>
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
  
  // Check if running in Tauri environment
  const isTauri = () => {
    return typeof window !== 'undefined' && window.__TAURI_INTERNALS__ !== undefined
  }
  
  export default defineComponent({
    components: {
      MND
    },
    setup() {
      const { proxy, ctx } = getCurrentInstance()
      const {themeOverrides, themeType, enUS, dateEnUS} = useTheme()
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
        // Display directly in browser environment
        key.value = 1
      }
      
      return {
        key,
        themeOverrides, themeType, enUS, dateEnUS,
        appWindow
      }
    }
  })
</script>

import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router/router'
import axios from './libs/axios'
import pinia from './store'
// Import mock file
import './mock' // Mock mode, comment this line out for production release

const app = createApp(App).use(router).use(axios).use(pinia)
app.config.globalProperties.$api = axios
app.mount('#app')

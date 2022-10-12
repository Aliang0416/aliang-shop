import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ui from './components/library'
import store from './store'
import 'normalize.css'
import '@/assets/styles/common.less'
createApp(App).use(store).use(router).use(ui).mount('#app')
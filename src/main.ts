import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import * as WComponents from '@/assets/components'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { useCurrentComponent, useComponents } from '@/stores'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
for (const [key, component] of Object.entries(WComponents)) {
  app.component(key, component)
}
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(ElementPlus)

app.mount('#app')

window.addEventListener("storage", function (e) {
  useCurrentComponent().$hydrate()
  useComponents().$hydrate()
});

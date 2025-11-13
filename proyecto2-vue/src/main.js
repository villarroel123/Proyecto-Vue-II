import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia=createPinia();
pinia.use(piniaPluginPersistedstate)
const app= createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')


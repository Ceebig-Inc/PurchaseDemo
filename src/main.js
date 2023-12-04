import { createApp } from 'vue/dist/vue.esm-bundler.js'
import Toast from "vue-toastification";
import './style.css'
import "vue-toastification/dist/index.css";
import router from './routes/router.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Default Toast Options
const options = {
    // You can set your default options here
};

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp({})
app.use(pinia)
app.use(router)
app.use(Toast, options);
app.mount('#app')
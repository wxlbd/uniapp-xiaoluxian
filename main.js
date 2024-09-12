import App from './App'
import uView from 'vk-uview-ui';
import {createPinia} from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate';
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.$mount()
// #endif

// #ifdef VUE3
import {
    createSSRApp
} from 'vue'

export function createApp() {
    const pinia = createPinia()
    pinia.use(piniaPersist)
    const app = createSSRApp(App)
    app.use(uView)
    app.use(pinia)
    return {
        app
    }
}

// #endif
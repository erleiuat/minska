import '@babel/polyfill'
import '@/registerServiceWorker'
import 'vuetify/src/stylus/app.styl'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import Notifications from 'vue-notification'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import axios from 'axios'

Vue.use(Notifications)
Vue.use(Vuetify, {
    theme: {
        // Logo-Font: Ultra Fresh
        primary: '#381d56',
        secondary: '#e8d5fc',
        success: '#288528',
        error: '#c01f1f',
        info: '#006061',
        warning: '#AB640D'
    }
})

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://api.minska.osis.io/' : 'http://localhost/minska-api/',
    withCredentials: true,
    validateStatus: function (status) {
        if (status >= 200 && status < 300 && status !== 204) {
            return true
        } else {
            return false
        }
    }
})

new Vue({
    router,
    store,
    i18n,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')

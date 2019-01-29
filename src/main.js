import '@babel/polyfill'
import '@/registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueAxios from 'vue-axios'
import Notifications from 'vue-notification'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import axios from 'axios'

Vue.use(Notifications)
Vue.use(VueChartkick, { adapter: Chart })
Vue.use(Vuetify, {
    theme: {
        // Logo-Font: Ultra Fresh
        primary: '#381d56',
        secondary: '#e8d5fc',
        success: '#2c942c',
        error: '#c01f1f',
        info: '#006061',
        warning: '#e5860e'
    }
})

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost/minska-api/',
    headers: {
        'Content-Type': 'application/json'
    },
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

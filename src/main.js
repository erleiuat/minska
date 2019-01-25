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
import axios from 'axios'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
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

Vue.mixin({
    methods: {
        axiosPost: axios.create({
            baseURL: process.env.NODE_ENV === 'production' ? 'https://minska.api.eliareutlinger.ch/' : 'http://localhost/minska-api/',
            timeout: 8000,
            method: 'post',
            headers: {
                'Content-Type': 'text/plain'
            },
            validateStatus: function (status) {
                if (status >= 200 && status < 300 && status !== 204) {
                    return true
                } else {
                    return false
                }
            }
        })
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

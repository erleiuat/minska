import '@babel/polyfill'
import '@/registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueAxios from 'vue-axios'
import Notifications from 'vue-notification'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Notifications)
Vue.use(Vuetify, {
    theme: {
    // Font: Ultra Fresh
        primary: '#00A2A3',
        secondary: '#EBFFFF',
        error: '#B30000',
        info: '#006061',
        success: '#006600',
        warning: '#CC5E00'
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
                if (status >= 200 && status < 300 && status != 204) {
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

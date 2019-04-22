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
import GAuth from 'vue-google-oauth2'

Vue.use(GAuth, {
  clientId: '706904817037-18invrhcjfbj1h7fjja5jee9bkl488nf.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
})

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

Vue.use(Notifications)

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://api.osis.io/minska/' : 'http://localhost/minska-api/api/',
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

import Vue from 'vue'
import Vuetify from 'vuetify'
import VueAxios from 'vue-axios'
import Notifications from 'vue-notification'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import i18n from './i18n'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Notifications)
Vue.use(Vuetify, {
    theme: {
        primary: '#FF8A65',
    }
})

Vue.mixin({
    methods: {
        axiosPost: axios.create({
            baseURL: 'http://localhost/minska/minska-api/',
            //baseURL: 'https://minska.api.eliareutlinger.ch/',
            timeout: 1000,
            method: 'post',
            headers: {'Content-Type': 'text/plain'},
        })
    }
})

new Vue({
    router,
    store,
    i18n,
    render: function(h){
        return h(App)
    }
}).$mount('#app')

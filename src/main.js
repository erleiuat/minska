import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Notifications from 'vue-notification'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './ml'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(Notifications)

Vue.mixin({
    methods: {
        axiosPost: axios.create({
            baseURL: 'http://localhost/minska/minska-api/api/',
            timeout: 1000,
            method: 'post',
            headers: {'Content-Type': 'text/plain'},
        }),
        axiosGet: axios.create({
            baseURL: 'http://localhost/minska/minska-api/api/',
            timeout: 1000,
            method: 'get',
            headers: {'Content-Type': 'text/plain'},
        }),
    }
})



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')

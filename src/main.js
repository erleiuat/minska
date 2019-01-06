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

Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')

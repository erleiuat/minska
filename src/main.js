import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Notifications from 'vue-notification'

Vue.use(VueAxios, axios)
Vue.use(Notifications)
Vue.use(Vuetify, {
    theme: {
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1E88E5",
        error: "#f44336",
        warning: "#ffeb3b",
        info: "#2196f3",
        success: "#4caf50"
    }
})

Vue.config.productionTip = false

new Vue({

    router,
    store,
    axios,
    render: h => h(App)

}).$mount('#app')

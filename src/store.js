import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        app: {
            title: 'Minska',
            version: '1.5.0',
            drawer: false
        },

        auth: {
            token: null,
            expiration: null
        },

        user: {
            id: null,
            firstname: null,
            lastname: null,
            email: null,
            language: null,
            gender: null,
            aims: {
                weight: null,
                date: null
            }
        },

        content: {
            weights: false,
            calories: false,
            templates: false
        }

    },

    mutations: {

        drawer (state, val) {
            state.app.drawer = val
        },

        login (state) {
            var token = Cookies.getJSON('appToken')
            var encoded = (token.split('.')[1]).replace('-', '+').replace('_', '/')
            var decoded = JSON.parse(window.atob(encoded))

            state.auth.token = token
            state.user = decoded.data
            state.auth.expiration = decoded.exp

            if (!decoded.data.language) {
                state.user.language = navigator.language || navigator.userLanguage
            }
        },

        logout (state) {
            Cookies.remove('appToken')
            state.content = {
                weights: false,
                calories: false,
                templates: false
            }
            state.auth.token = false
            state.auth.expiration = null
            state.user = { language: navigator.language || navigator.userLanguage }
        },

        changeLanguage (state, newlang) {
            state.user.language = newlang
        }

    },

    actions: {

        checkAuth ({ commit, state }) {
            var now = Math.floor(Date.now() / 1000)
            if (Cookies.getJSON('appToken')) {
                var encoded = (Cookies.getJSON('appToken').split('.')[1]).replace('-', '+').replace('_', '/')
                var decoded = JSON.parse(window.atob(encoded))

                if (decoded.exp > now) {
                    commit('login')
                } else {
                    commit('logout')
                }
            } else {
                commit('logout')
            }
        }
    },

    modules: {
        Cookies
    }

})

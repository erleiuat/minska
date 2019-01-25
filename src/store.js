import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        auth: {
            token: null,
            expiration: {
                app: null,
                token: null,
                keep: false
            }
        },

        user: {
            id: null,
            firstname: null,
            lastname: null,
            email: null,
            language: null,
            isFemale: false,
            aims: {
                weight: null,
                date: null
            }
        },

        app: {
            title: 'Minska',
            expTimer: null,
            drawer: true,
            navigation: [
                { path: '/login', title: 'login', icon: 'lock_open' },
                { path: '/register', title: 'register', icon: 'subdirectory_arrow_right' }
            ]
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

        login (state, sources) {
            var token = sources
            var keep = false

            if (sources['token']) {
                token = sources['token']
                keep = sources['keep']
            }

            state.auth.token = token
            var encoded = (token.split('.')[1]).replace('-', '+').replace('_', '/')
            var decoded = JSON.parse(window.atob(encoded))

            state.user = decoded.data
            state.auth.expiration.token = decoded.exp
            state.auth.expiration.app = Math.floor(Date.now() / 1000) + (20 * 60)
            state.auth.expiration.keep = keep

            if (decoded.data.isFemale === 1) {
                state.user.isFemale = true
            } else {
                state.user.isFemale = false
            }

            if (!decoded.data.language) {
                state.user.language = navigator.language || navigator.userLanguage
            }

            Cookies.set('authCookie', state.auth, {
                expires: 7,
                secure: process.env.NODE_ENV === 'production',
                path: window.location.href
            })

            state.app.navigation = [
                { path: '/dashboard', title: 'dashboard', icon: 'dashboard' },
                { path: '/weight', title: 'weight', icon: 'linear_scale' },
                { path: '/calories', title: 'calories', icon: 'cake' },
                { path: '/templates', title: 'templates', icon: 'add_shopping_cart' },
                { path: '/settings', title: 'settings', icon: 'settings' }
            ]
        },

        logout (state) {
            Cookies.remove('authCookie', { path: window.location.href })
            state.user = { language: navigator.language || navigator.userLanguage }

            state.auth.token = false
            state.auth.expiration.app = null
            state.auth.expiration.token = null

            state.app.navigation = [
                { path: '/login', title: 'login', icon: 'lock_open' },
                { path: '/register', title: 'register', icon: 'subdirectory_arrow_right' }
            ]
        },

        changeLanguage (state, newlang) {
            state.user.language = newlang
        }

    },

    actions: {

        checkAuth ({ commit, state }) {
            var now = Math.floor(Date.now() / 1000)
            if (!state.auth.token && Cookies.getJSON('authCookie')) {
                var authCookie = Cookies.getJSON('authCookie')
                if (authCookie.expiration.token > now && authCookie.expiration.app > now) {
                    commit('login', { token: authCookie.token, keep: authCookie.expiration.keep })
                    return null
                }
            } else if (state.auth.token) {
                if (state.auth.expiration.app > now && state.auth.expiration.token > now || state.auth.expiration.token > now && state.auth.expiration.keep) {
                    state.auth.expiration.app = Math.floor(Date.now() / 1000) + (20 * 60)
                    return null
                }
            }

            commit('logout')
        }
    },

    modules: {
        Cookies
    }

})

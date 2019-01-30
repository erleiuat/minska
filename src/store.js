import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        app: {
            title: 'Minska',
            version: '1.5.0',
            defaultExpire: 20 * 60,
            timeout: null,
            drawer: true
        },

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
            state.auth.expiration.app = Math.floor(Date.now() / 1000) + state.app.defaultExpire
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
                secure: process.env.NODE_ENV === 'production'
            })
        },

        logout (state) {
            Cookies.remove('authCookie')
            state.user = { language: navigator.language || navigator.userLanguage }

            state.auth.token = false
            state.auth.expiration.app = null
            state.auth.expiration.token = null
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
                if (authCookie.expiration.token > now) {
                    commit('login', { token: authCookie.token, keep: authCookie.expiration.keep })
                } else {
                    commit('logout')
                }
            } else if (state.auth.token) {
                if (state.auth.expiration.app > now && state.auth.expiration.token > now) {
                    state.auth.expiration.app = Math.floor(Date.now() / 1000) + state.app.defaultExpire
                } else if (state.auth.expiration.token > now && state.auth.expiration.keep) {
                    state.auth.expiration.app = Math.floor(Date.now() / 1000) + state.app.defaultExpire
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

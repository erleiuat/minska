import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie';

Vue.use(Vuex)
Vue.use(VueCookie)

export default new Vuex.Store({

    state: {

        auth: {
            token: null,
            expiration: {
                app: null,
                token: null,
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
                {path: '/login', title: 'login', icon: 'lock_open'},
                {path: '/register', title: 'register', icon: 'subdirectory_arrow_right'},
                {path: '/help', title: 'help', icon: 'question_answer'},
            ]
        },

        content: {
            weights: false,
            calories: false,
            templates: false
        }

    },

    mutations: {

        drawer(state, val) {
            state.app.drawer = val;
        },

        login(state, token) {

            state.auth.token = token;
            var encoded = (token.split('.')[1]).replace('-', '+').replace('_', '/');
            var decoded = JSON.parse(window.atob(encoded));

            state.user = decoded.data;
            state.auth.expiration.app = Math.floor(Date.now() / 1000) + (20*60);
            state.auth.expiration.token = decoded.exp;

            if(decoded.data.isFemale == 1){
                state.user.isFemale = true;
            } else {
                state.user.isFemale = false;
            }

            if(!decoded.data.language){
                state.user.language = navigator.language || navigator.userLanguage;
            }

            VueCookie.set('authCookie', JSON.stringify(state.auth), {expires: 1, domain: window.location.hostname});

            state.app.navigation = [
                {path: '/dashboard', title: 'dashboard', icon: 'dashboard'},
                {path: '/weight', title: 'weight', icon: 'linear_scale'},
                {path: '/calories', title: 'calories', icon: 'cake'},
                {path: '/templates', title: 'templates', icon: 'add_shopping_cart'},
                {path: '/help', title: 'help', icon: 'question_answer'},
                {path: '/settings', title: 'settings', icon: 'settings'},
            ]

        },

        logout(state) {

            VueCookie.delete('authCookie', {domain: window.location.hostname});
            state.user = {language: navigator.language || navigator.userLanguage};

            state.auth.token = false;
            state.auth.expiration.app = null;
            state.auth.expiration.token = null;

            state.app.navigation = [
                {path: '/login', title: 'login', icon: 'lock_open'},
                {path: '/register', title: 'register', icon: 'subdirectory_arrow_right'},
                {path: '/help', title: 'help', icon: 'question_answer'},
            ]

        },

        changeLanguage(state, newlang){
            state.user.language = newlang;
        },

    },

    actions: {

        checkAuth({commit, state}){

            var now = Math.floor(Date.now() / 1000);
            var authCookie = JSON.parse(VueCookie.get('authCookie'));

            if(!state.auth.token){
                if(authCookie && authCookie !== null){
                    if(authCookie.expiration.token > now && authCookie.expiration.app > now){
                        commit('login', authCookie.token);
                    } else {
                        commit('logout');
                    }
                } else {
                    commit('logout');
                }
            } else if(state.auth.token){
                if(state.auth.expiration.app > now && state.auth.expiration.token > now){
                    if(!state.app.authState){
                        commit('login', state.auth.token);
                    }
                } else {
                    commit('logout');
                }
            }
        }
    },

    modules: {
        VueCookie
    }

})

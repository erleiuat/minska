import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie';

Vue.use(Vuex)
Vue.use(VueCookie)

export default new Vuex.Store({

    state: {

        user: {
            auth: {
                token: null,
                authenticated: false,
                expiration: {
                    client: null,
                    token: null,
                },
                expired: false,
            },
            info: {
                id: null,
                firstname: null,
                lastname: null,
                language: null,
                isFemale: false,
                aims: {
                    weight: null,
                    date: null
                }
            },
            data: {
                recent: {
                    weight: null,
                    calorie: 123
                }
            }
        },

        app: {
            title: 'Minska',
            authState: false,
            drawer: true,
            navigation: [
                {path: '/login', title: 'login', icon: 'lock_open'},
                {path: '/register', title: 'register', icon: 'subdirectory_arrow_right'},
                {path: '/help', title: 'help', icon: 'question_answer'},
            ]
        }

    },

    mutations: {

        drawer(state, val) {
            state.app.drawer = val;
        },

        login(state, token) {

            var encoded = (token.split('.')[1]).replace('-', '+').replace('_', '/');
            var decoded = JSON.parse(window.atob(encoded));

            state.user.info = decoded.data;

            if(new Date(state.user.info.aims.date) != 'Invalid Date'){
                state.user.info.aims.date = decoded.data.aims.date;
            } else {
                state.user.info.aims.date = null;
            }

            if(!decoded.data.language){
                state.user.info.language = navigator.language || navigator.userLanguage;
            } else {
                state.user.info.language = decoded.data.language;
            }

            if(!decoded.data.isFemale){
                state.user.info.isFemale = false;
            } else {
                state.user.info.isFemale = true;
            }

            state.user.auth.authenticated = true;
            state.user.auth.expired = false;
            state.user.auth.token = token;
            state.user.auth.expiration.client = Math.floor(Date.now() / 1000) + (20*60);
            state.user.auth.expiration.token = decoded.exp;

            var authCookie = {
                token: token,
                expiration: {
                    client: state.user.auth.expiration.client,
                    token: state.user.auth.expiration.token
                }
            }

            VueCookie.set('authCookie', JSON.stringify(authCookie), {expires: 1, domain: window.location.hostname});

            state.app.authState = true;
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
            state.user.info = {language: navigator.language || navigator.userLanguage};

            state.user.auth.authenticated = false;
            state.user.auth.expiration.client = null;
            state.user.auth.expiration.token = null;

            state.app.authState = false;
            state.app.navigation = [
                {path: '/login', title: 'login', icon: 'lock_open'},
                {path: '/register', title: 'register', icon: 'subdirectory_arrow_right'},
                {path: '/help', title: 'help', icon: 'question_answer'},
            ]

        },

        changeLanguage(state, newlang){
            state.user.info.language = newlang;
        },

        changeData(state, newData){
            state.user.data = newData;
        }

    },

    actions: {

        checkAuth({commit, state}){

            if(!state.user.auth.authenticated){

                if(VueCookie.get('authCookie')){
                    if( JSON.parse(VueCookie.get('authCookie')).expiration.token > Math.floor(Date.now() / 1000) && JSON.parse(VueCookie.get('authCookie')).expiration.client > Math.floor(Date.now() / 1000) ){
                        commit('login', JSON.parse(VueCookie.get('authCookie')).token);
                    } else {
                        state.user.auth.expired = true;
                        commit('logout');
                    }
                } else {
                    commit('logout');
                }

            } else if(state.user.auth.authenticated){

                if( state.user.auth.expiration.client > Math.floor(Date.now() / 1000) && state.user.auth.expiration.token > Math.floor(Date.now() / 1000)){
                    if(!state.app.authState){
                        commit('login', state.user.auth.token);
                    }
                } else {
                    state.user.auth.expired = true;
                    commit('logout');
                }

            }
        }
    },

    modules: {
        VueCookie
    }

})

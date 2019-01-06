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
                email: null,
            }
        },

        app: {
            title: 'Minska',
            authState: false,
            drawer: false,
            navigation: [
                {path: '/login', title: 'Login', icon: 'lock_open'},
                {path: '/register', title: 'Register', icon: 'subdirectory_arrow_right'},
            ]
        }

    },

    mutations: {

        drawer(state, val) {
            state.app.drawer = val
        },

        login(state, token) {

            var encoded = (token.split('.')[1]).replace('-', '+').replace('_', '/');
            var decoded = JSON.parse(window.atob(encoded));

            state.user.info = decoded.data;
            state.user.auth.authenticated = true;
            state.user.auth.expired = false;
            state.user.auth.token = token;
            state.user.auth.expiration.client = Math.floor(Date.now() / 1000) + (20*60);
            state.user.auth.expiration.token = decoded.exp;

            var authInfo = {
                token: token,
                expiration: {
                    client: state.user.auth.expiration.client,
                    token: state.user.auth.expiration.token
                }
            }
            VueCookie.set('authInfo', JSON.stringify(authInfo), {expires: 1, domain: window.location.hostname});

            state.app.authState = true;
            state.app.navigation = [
                {path: '/dashboard', title: 'Dashboard', icon: 'dashboard'},
                {path: '/weight', title: 'Weights', icon: 'linear_scale'},
                {path: '/calorie', title: 'Calories', icon: 'cake'},
                {path: '/food', title: 'Food', icon: 'add_shopping_cart'},
                {path: '/faq', title: 'FAQ', icon: 'question_answer'},
                {path: '/settings', title: 'Settings', icon: 'settings'},
            ]

        },

        logout(state) {

            VueCookie.delete('authInfo', {domain: window.location.hostname});

            state.user.info = null;
            state.user.auth.authenticated = false;
            state.user.auth.expiration.client = null;
            state.user.auth.expiration.token = null;

            state.app.authState = false;
            state.app.navigation = [
                {path: '/login', title: 'Login', icon: 'lock_open'},
                {path: '/register', title: 'Register', icon: 'subdirectory_arrow_right'},
            ]

        }

    },

    actions: {

        checkAuth({commit, state}){

            if(!state.user.auth.authenticated){

                if(VueCookie.get('authInfo')){

                    if( JSON.parse(VueCookie.get('authInfo')).expiration.token > Math.floor(Date.now() / 1000) && JSON.parse(VueCookie.get('authInfo')).expiration.client > Math.floor(Date.now() / 1000) ){
                        //Token Valid
                        commit('login', JSON.parse(VueCookie.get('authInfo')).token);
                    } else {
                        //Token Expired
                        state.user.auth.expired = true;
                        commit('logout');
                    }

                } else {
                    //Token Expired
                    commit('logout');
                }

            } else if(state.user.auth.authenticated){

                if( state.user.auth.expiration.client > Math.floor(Date.now() / 1000) && state.user.auth.expiration.token > Math.floor(Date.now() / 1000)){

                    //Token Valid
                    if(!state.app.authState){
                        commit('login', state.user.auth.token);
                    }

                } else {

                    //Token Expired
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

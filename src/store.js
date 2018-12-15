import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie';

Vue.use(Vuex)
Vue.use(VueCookie)

export default new Vuex.Store({

    state: {
        authenticated: false,
        user: {
            id: null,
            firstname: null,
            lastname: null,
            email: null
        }
    },

    mutations: {
        onLogin(state, token){
            var encoded = (token.split('.')[1]).replace('-', '+').replace('_', '/');
            var decoded = JSON.parse(window.atob(encoded));
            state.user = decoded.data;
            console.log(decoded);
            state.authenticated = true;
        },
        onLogout(state){
            state.authenticated = false;
            state.user = null;
        },
        editUser(state, object){
            state.user = object;
        }
    },

    actions: {

        login(context, token) {
            VueCookie.set('jwt', token, {expires: 1, domain: window.location.hostname});
            context.commit('onLogin', token);
        },

        logout(context) {
            VueCookie.delete('jwt', {domain: window.location.hostname});
            context.commit('onLogout');
        },

        checkState(context){
            if(this.state.authenticated === false && VueCookie.get('jwt')){
                context.commit('onLogin', VueCookie.get('jwt'));
            } else if(!VueCookie.get('jwt')){
                context.commit('onLogout');
            }
        }

    },

    modules: {
        VueCookie
    }

})

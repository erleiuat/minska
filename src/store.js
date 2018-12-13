import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        authenticated: false,
    },

    mutations: {
        onLogin(state){
            state.authenticated = true;
        },
        onLogout(state){
            state.authenticated = false;
        }
    },

    actions: {
        login(context) {
            context.commit('onLogin');
        },
        logout(context) {
            context.commit('onLogout');
        }
    }

})

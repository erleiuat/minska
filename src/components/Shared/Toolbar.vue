<template>
    <v-toolbar app flat>
        <v-toolbar-side-icon  @click.stop="drawer()"></v-toolbar-side-icon>
        <v-toolbar-title>{{appTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="authenticated" flat @click="logout()"><b v-text="$ml.get('general.logout')"></b> <i class="fas fa-sign-out-alt"></i></v-btn>
    </v-toolbar>
</template>

<script>
import {mapActions} from 'vuex'

export default {

    name: 'Toolbar',
    computed: {
        appTitle(){return this.$store.state.app.title},
        authenticated(){return this.$store.state.user.auth.authenticated}
    },
    methods: {
        drawer(){
            this.$store.commit('drawer', true)
        },
        logout(){
            this.$store.commit('logout');
            this.$notify({
                group: 'default',
                type: 'success',
                title: 'Logout Successful!',
                text: ""
            });
            this.$router.push('/');
        }
    }
}
</script>

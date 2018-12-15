<template>
    <v-app id="inspire" dark>

        <v-toolbar app clipped-left>
            <v-toolbar-side-icon  @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <router-link :to="'/'">
                <v-toolbar-title>Minska</v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn v-if="authenticated" @click="logout()" flat><v-icon>lock_open</v-icon> Logout</v-btn>
        </v-toolbar>

        <v-navigation-drawer clipped floating v-model="drawer" app>
            <NavigationList v-if="authenticated" :items="navigationAuth"></NavigationList>
            <NavigationList v-else :items="navigation"></NavigationList>
        </v-navigation-drawer>

        <v-content>
            <v-container fluid fill-height>
                <router-view></router-view>
            </v-container>
        </v-content>

        <notifications group="popup"/>

        <v-footer app fixed>
            <span>&copy; 2017</span>
        </v-footer>

    </v-app>
</template>

<script>
import NavigationList from '@/components/NavigationList.vue'
import {mapActions} from 'vuex'

export default {

    name: 'dashboard',
    components: {
        NavigationList
    },

    updated(){
        this.$store.dispatch('checkState');
        console.log('checked');
    },

    methods: {
        ...mapActions([
            'login',
            'checkState'
        ]),
        logout(){
            this.$store.dispatch('logout');
            this.$router.push('/');
            this.$notify({
                group: 'popup',
                type: 'success',
                title: 'Logout Successful!',
                text: "You are now Logged out"
            });
        }
    },

    computed: {
        authenticated(){return this.$store.state.authenticated}
    },

    data(){
        return {
            drawer: true,
            navigationAuth: [
            {path: '/dashboard', title: 'Dashboard', icon: 'dashboard'},
            {path: '/weight', title: 'Weights', icon: 'linear_scale'},
            {path: '/calorie', title: 'Calories', icon: 'cake'},
            {path: '/food', title: 'Food', icon: 'add_shopping_cart'},
            {path: '/faq', title: 'FAQ', icon: 'question_answer'},
            {path: '/settings', title: 'Settings', icon: 'settings'},
            ],
            navigation: [
            {path: '/login', title: 'Login', icon: 'lock_open'},
            {path: '/register', title: 'Register', icon: 'subdirectory_arrow_right'},
            ]
        }
    }

}
</script>

<style>
    .router-link-exact-active, .router-link-active {
        color: inherit !important;
        text-decoration: inherit;
    }
</style>

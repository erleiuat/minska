<template>
    <v-app>

        <notifications group="default" position="top center"/>

        <Toolbar />

        <Drawer />

        <v-content>
            <v-container fluid fill-height>
                <router-view></router-view>
            </v-container>
        </v-content>


    </v-app>
</template>

<script>
import Drawer from '@/components/Shared/Drawer'
import Toolbar from '@/components/Shared/Toolbar'
import { mapActions } from 'vuex'

export default {

    name: 'App',
    components: {
        Drawer,
        Toolbar
    },

    methods: {
        ...mapActions([
            'checkAuth',
        ]),
    },
    beforeUpdate(){
        this.$store.dispatch('checkAuth');
    },

    beforeCreate(){

        this.$store.watch((state)=>{
            return this.$store.state.user.auth.expired
        },(newValue)=>{

            if(newValue === true){

                this.$router.push('/');
                this.$notify({
                    group: 'default',
                    type: 'warn',
                    title: 'Session expired',
                    text: "Your Session expired. Please login again."
                })

            }

        });

        this.$store.dispatch('checkAuth');

        this.$router.beforeEach((to, from, next) => {
            if(this.$store.state.app.authState === false && to.meta.secure === true || this.$store.state.app.authState === true && to.meta.secure === false){
                this.$router.push('/401');
            } else {
                next();
            }
        });

        this.$router.afterEach((to, from) => {
            document.title = this.$store.state.app.title +' | '+ to.meta.title;
        });

    }

}
</script>

<template>
    <v-app>

        <notifications group="default" position="top center"/>

        <Toolbar />

        <Drawer />

        <v-content>
            <v-container fluid fill-height>
                <transition name="slide">
                    <router-view></router-view>
                </transition>
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

        this.$store.watch((state)=>{
            return this.$store.state.user.info.language
        },(newValue, oldValue)=>{
            if(newValue !== oldValue){
                if(this.$store.state.user.info.language){
                    this.$ml.change(this.$store.state.user.info.language);
                }
            }
        });

        this.$store.dispatch('checkAuth');

        this.$router.beforeResolve((to, from, next) => {
            if(this.$store.state.app.authState === false && to.meta.secure === true || this.$store.state.app.authState === true && to.meta.secure === false){
                if(!from.name && this.$store.state.app.authState === true){
                    this.$router.push('/dashboard');
                } else {
                    this.$router.push('/401');
                }
            } else {
                next();
            }
        });

        this.$router.afterEach((to, from) => {
            document.title = this.$store.state.app.title +' | '+ this.$ml.get('views.'+to.meta.title);
        });

    }

}
</script>

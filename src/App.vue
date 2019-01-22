<template>
    <v-app>

        <Drawer />
        <Toolbar />

        <v-content>
            <v-container fluid fill-height>
                <notifications app group="default" position="bottom center" max-width="40%">
                </notifications>
                <transition>
                    <router-view>

                    </router-view>
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
            return this.$store.state.user.language
        },(newValue, oldValue)=>{
            if(newValue !== oldValue){
                if(this.$store.state.user.language){
                    this.$i18n.locale = this.$store.state.user.language;
                }
            }
        });

        this.$store.dispatch('checkAuth');

        this.$router.beforeResolve((to, from, next) => {
            if(!this.$store.state.auth.token && to.meta.secure === true || this.$store.state.auth.token && to.meta.secure === false){
                if(!from.name && this.$store.state.auth.token === true){
                    this.$router.push('/dashboard');
                } else {
                    this.$router.push('/401');
                }
            } else {
                next();
            }
        });

        this.$router.afterEach((to, from) => {
            document.title = this.$store.state.app.title +' | '+ this.$t('views.'+to.meta.title);
        });

        this.$store.watch((state)=>{
            return this.$store.state.auth.token
        },(newValue, oldValue)=>{
            if(!newValue && oldValue !== null){
                this.$router.push('/');
                this.$notify({
                    group: 'default',
                    type: 'warning',
                    title: this.$t('alerts.expired.title'),
                    text: this.$t('alerts.expired.text')
                })
            }
        });

    }

}
</script>

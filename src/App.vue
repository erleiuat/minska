<template>
    <v-app>

        <Drawer />
        <Toolbar />

        <v-content>
            <v-container fluid fill-height>
                <notifications app group="default" position="bottom center" width="auto">
                    <template slot="body" slot-scope="props">
                        <v-alert app value="true" :type="props.item.type" @click="props.close">
                            <h3>{{props.item.title}}</h3>
                            {{props.item.text}}
                        </v-alert>
                    </template>
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
            return this.$store.state.user.auth.expired
        },(newValue)=>{

            if(newValue === true){

                this.$router.push('/');
                this.$notify({
                    group: 'default',
                    type: 'warning',
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
                    this.$i18n.locale = this.$store.state.user.info.language;
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
            document.title = this.$store.state.app.title +' | '+ this.$t('views.'+to.meta.title);
        });

    }

}
</script>

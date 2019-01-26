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
            'checkAuth'
        ])
    },

    beforeMount () {
        this.$store.watch((state) => {
            return this.$store.state.user.language
        }, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                if (this.$store.state.user.language) {
                    this.$i18n.locale = this.$store.state.user.language
                }
            }
        })

        this.$store.watch((state) => {
            return this.$store.state.auth.token
        }, (newValue, oldValue) => {
            if (!newValue && oldValue !== null) {
                this.$router.push('/')
                this.$notify({
                    group: 'default',
                    type: 'warning',
                    title: this.$t('alerts.expired.title'),
                    text: this.$t('alerts.expired.text')
                })
            }
        })

        this.$store.dispatch('checkAuth')

        this.$router.beforeResolve((to, from, next) => {
            if (!this.$store.state.auth.token && to.meta.secure === true) {
                this.$router.push('/')
            } else if (this.$store.state.auth.token && to.meta.secure === false) {
                this.$router.push('/dashboard')
            } else {
                next()
            }
        })

        this.$router.afterEach((to, from) => {
            document.title = this.$store.state.app.title + ' | ' + this.$t('views.' + to.meta.title)
        })
    },

    beforeUpdate () {
        var vm = this
        vm.$store.dispatch('checkAuth')
        clearInterval(vm.$store.state.app.timeout)
        var appLeft = (vm.$store.state.auth.expiration.app - Math.floor(Date.now() / 1000)) * 1000
        vm.$store.state.app.timeout = setInterval(function () {
            vm.$store.dispatch('checkAuth')
        }, (appLeft))
    }

}
</script>
<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons');
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>

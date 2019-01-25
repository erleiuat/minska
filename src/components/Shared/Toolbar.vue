<template>
    <v-toolbar app class="primary" flat dark clipped-left>
        <v-toolbar-side-icon @click.stop="drawer()"></v-toolbar-side-icon>
        <v-toolbar-title>{{appTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="authenticated" flat @click="logout()"><b v-text="$t('button')"></b> <v-icon>exit_to_app</v-icon></v-btn>
    </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {

    name: 'Toolbar',

    i18n: {
        messages: {
            en: {
                button: 'Logout',
                title: 'Successfully logged out',
                text: 'You were redirected to the Homepage'
            },
            de: {
                button: 'Abmelden',
                title: 'Erfolgreich abgemeldet',
                text: 'Du wurdest zur Startseite weitergeleitet'
            }
        }
    },

    computed: {
        appTitle () { return this.$store.state.app.title },
        authenticated () { return this.$store.state.auth.token }
    },
    methods: {
        drawer () {
            this.$store.commit('drawer', !this.$store.state.app.drawer)
        },
        logout () {
            this.$store.commit('logout')
            this.$notify({
                group: 'default',
                type: 'success',
                title: this.$t('title'),
                text: this.$t('text')
            })
            this.$router.push('/')
        }
    }
}
</script>

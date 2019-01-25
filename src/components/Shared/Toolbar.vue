<template>
    <v-toolbar app class="primary" flat dark clipped-left>
        <v-toolbar-side-icon @click.stop="drawer()"></v-toolbar-side-icon>
        <v-toolbar-title>{{appTitle}}</v-toolbar-title>
    </v-toolbar>
</template>

<script>
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
        appTitle () {
            return this.$store.state.app.title
        }
    },

    methods: {
        drawer () {
            this.$store.commit('drawer', !this.$store.state.app.drawer)
        }
    }
}
</script>

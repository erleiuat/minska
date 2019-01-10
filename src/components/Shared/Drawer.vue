<template>
    <v-navigation-drawer app v-model="drawer" class="deep-orange lighten-5" clipped floating>
        <v-list class="pt-0" dense>
            <v-list-tile v-for="item in items" :key="item.title" @click="" :to="{path: item.path}">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title v-text="$t(item.title)"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Drawer',
    i18n: {
        messages: {
            en: {
                dashboard: 'Dashboard',
                login: 'Login',
                register: 'Register',
                help: 'Help',
                weight: 'Weight',
                calorie: 'Calorie',
                templates: 'Templates',
                settings: 'Settings'
            },
            de: {
                dashboard: 'Dashboard',
                login: 'Anmelden',
                register: 'Registrieren',
                help: 'Hilfe',
                weight: 'Gewicht',
                calorie: 'Kalorien',
                templates: 'Vorlagen',
                settings: 'Einstellungen'
            }
        }
    },
    computed: {
        drawer: {
            get () {
                return this.$store.state.app.drawer
            },
            set (val) {
                this.$store.commit('drawer', val)
            }
        },
        items(){return this.$store.state.app.navigation}
    }
}
</script>

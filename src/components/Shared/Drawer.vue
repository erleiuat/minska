<template>
    <v-navigation-drawer app v-model="drawer" class="secondary" clipped floating>

        <v-layout column fill-height>

            <v-list>
                <v-list-tile v-for="item in items" :key="item.title" :to="{path: item.path}">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="$t('views.'+item.title)"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-spacer></v-spacer>

            <v-list>
                <v-list-tile v-if="authenticated" @click="logout()">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="$t('logout')"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile to="/help">
                    <v-list-tile-action>
                        <v-icon>question_answer</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="$t('views.help')"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile to="/settings">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="$t('views.settings')"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content class="caption">
                        {{info}}
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>

        </v-layout>

    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'Drawer',
    i18n: {
        messages: {
            en: {
                logout: 'Logout',
                title: 'Successfully logged out',
                text: 'You were redirected to the Homepage'
            },
            de: {
                logout: 'Abmelden',
                title: 'Erfolgreich abgemeldet',
                text: 'Du wurdest zur Startseite weitergeleitet'
            }
        }
    },
    computed: {
        info () {
            return this.$store.state.app.title + ' v' + this.$store.state.app.version
        },
        drawer: {
            get () {
                return this.$store.state.app.drawer
            },
            set (val) {
                this.$store.commit('drawer', val)
            }
        },
        items () {
            return this.$store.state.app.navigation
        },
        authenticated () {
            return this.$store.state.auth.token
        }
    },
    methods: {
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

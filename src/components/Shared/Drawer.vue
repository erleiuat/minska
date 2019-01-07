<template>
    <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list class="pt-0" dense>

            <v-list-tile v-for="item in items" :key="item.title" @click="" :to="{path: item.path}">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title v-text="$ml.get('views.'+item.title)"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Drawer',
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

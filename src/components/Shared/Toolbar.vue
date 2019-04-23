<template>
    <v-toolbar app class="primary" flat dark clipped-left>

            <v-layout row>
                <v-flex xs2>
                    <v-toolbar-side-icon aria-label="OpenMenu" @click.stop="drawer()"></v-toolbar-side-icon>
                </v-flex>
                <v-flex xs8>
                    <v-toolbar-title class="pt-1">
                        <v-img max-height="40px" :lazy-src="require('@/assets/minska_logo/toolbarLow.png')" :src="require('@/assets/minska_logo/toolbar.png')" contain>
                        </v-img>
                    </v-toolbar-title>
                </v-flex>
                <v-flex xs2>
                </v-flex>
            </v-layout>

    </v-toolbar>
</template>

<script>
export default {

    name: 'Toolbar',

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

<template>
    <v-toolbar app class="primary" flat dark clipped-left>
        <v-toolbar-side-icon @click.stop="drawer()"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title>
            <v-img min-width="150px" :src="require('@/media/toolbar.png')" :lazy-src="require('@/media/toolbar.png')">
            </v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
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

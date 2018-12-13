<template>
    <v-list dense>
        <v-list-tile v-for="item in items" @click="" :to="{path: item.path}">
            <v-list-tile-action>
                <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
export default {
    name: 'NavigationList',
    props: {
        items: Array
    },
}
</script>

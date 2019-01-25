<template>
    <v-container grid-list-md pa-0>
        <v-layout row wrap>
            <v-flex xs12 class="display-1">
                {{ $t('views.group')}}
            </v-flex>
            <v-flex xs12>
                <v-divider></v-divider>
            </v-flex>
            <v-flex xs6 class="display-2 font-weight-thin">
                {{ $t('coming') }}
            </v-flex>
            <v-flex xs12 class="text-xs-center">
                <v-img src="http://pluspng.com/img-png/emoticon-png-emo-emoticon-disengaged-face-png-512.png" aspect-ratio="5" contain></v-img>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {

    name: 'Group',
    components: {

    },
    i18n: {
        messages: {
            en: {
                coming: 'Coming Soon...'
            },
            de: {
                coming: 'Coming Soon...'
            }
        }
    }

}
</script>

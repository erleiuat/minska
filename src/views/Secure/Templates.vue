<template>
    <v-container grid-list-md pa-0>
        <v-layout row wrap>

            <v-flex xs10>
                <h1>{{ $t('views.templates')}}</h1>
            </v-flex>
            <v-flex xs2 class="text-xs-right">
                <Adder/>
            </v-flex>

        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm4>
                <Frame/>
            </v-flex>
            <v-flex xs12 sm4>
                <Frame/>
            </v-flex>
            <v-flex xs12 sm4>
                <Frame/>
            </v-flex>
            <v-flex xs12 sm4>
                <Frame/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Frame from '@/components/Secure/Template/Frame'
import Adder from '@/components/Secure/Template/Adder'

export default {

    name: 'Templates',
    components: {
        Frame,
        Adder
    },

}
</script>

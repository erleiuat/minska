<template>
    <v-container fluid grid-list-md pa-1>
        <v-layout row wrap>
            <v-flex sm4>
                <Remaining/>
            </v-flex>
            <v-flex sm4>
                <Recently/>
            </v-flex>
            <v-flex sm4>
                <Target/>
            </v-flex>
            <v-flex sm4>
                <Daily/>
            </v-flex>
            <v-flex sm4>
                <Total/>
            </v-flex>
            <v-flex sm4>
                <BMI/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Recently from './Cards/Recently'
import Total from './Cards/Total'
import Target from './Cards/Target'
import BMI from './Cards/BMI'
import Daily from './Cards/Daily'
import Remaining from './Cards/Remaining'

export default {

    name: 'Facts',
    components: {
        Recently,
        Total,
        Target,
        BMI,
        Daily,
        Remaining
    },

    i18n: {
        messages: {
            en: {
                dataNeeded: 'Needs more data'
            },
            de: {
                dataNeeded: 'Benötigt mehr Daten'
            }
        }
    },

    mounted () {
        var vm = this
        if (!vm.$store.state.content.weights) {
            vm.$http.get('weight/read/')
                .then(function (response) {
                    vm.$store.state.content.weights = response.data.content
                }).catch(function () {})
        }

        if (!vm.$store.state.content.calories) {
            vm.$http.post('calorie/read/byDay/', {
                date: (new Date().toISOString().split('T')[0])
            }).then(function (response) {
                vm.$store.state.content.calories = response.data.content
            }).catch(function () {})
        }
    }
}
</script>

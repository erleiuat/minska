<template>
    <v-container pa-0>
        <v-layout row wrap>

            <v-flex xs12>
                <h1>{{ $t('title', {name: firstname}) }}</h1>
                <i>{{ $t('subtitle') }}</i>
            </v-flex>

            <v-flex md6>
                <WeightAdder />
            </v-flex>
            <v-flex md6>
                <CalorieAdder />
            </v-flex>

            <v-flex xs12 pa-3>
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12>
                <h1>{{ $t('factsTitle') }}</h1>
            </v-flex>

            <v-flex xs12>
                <AllFacts />
            </v-flex>
            <!--
            <v-flex xs6>
                <recently />
            </v-flex>
            <v-flex xs6>
                <total />
            </v-flex>
            <v-flex xs6>
                <target />
            </v-flex>
            -->

        </v-layout>
    </v-container>
</template>

<script>
import WeightAdder from '@/components/Secure/Adder/Weight'
import CalorieAdder from '@/components/Secure/Adder/Calorie'
import AllFacts from '@/components/Secure/Facts/All'
import {recently, total, target} from '@/components/Secure/Facts/index.js'

export default {

    name: 'home',

    components: {
        WeightAdder,
        CalorieAdder,
        AllFacts
    },

    i18n: {
        messages: {
            en: {
                title: 'Hello {name}!',
                subtitle: 'Welcome to your Dashboard',
                factsTitle: 'Facts'
            },
            de: {
                title: 'Hallo {name}!',
                subtitle: 'Willkommen auf deinem Dashboard',
                factsTitle: 'Fakten'
            }
        }
    },

    data () {
        return {
            newData: false,
            firstname: this.$store.state.user.info.firstname,
        }
    },

    watch: {
        newData: {
            handler: function() {
                this.$forceUpdate();
            },
            deep: true
        }
    },

}
</script>

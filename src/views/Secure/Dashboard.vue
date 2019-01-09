<template>
    <v-container>
        <v-layout row wrap>

            <v-flex xs12>
                <h1>{{ $t('title', {name: firstname}) }}</h1>
            </v-flex>

            <v-flex md6>
                <WeightAdder v-model="newData" />
            </v-flex>
            <v-flex md6>
                <CalorieAdder />
            </v-flex>

            <v-flex xs12>
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12>
                <h1>Facts</h1>
            </v-flex>

            <v-flex xs12>
                <AllFacts :newData="newData" />
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import WeightAdder from '@/components/Secure/Adder/Weight'
import CalorieAdder from '@/components/Secure/Adder/Calorie'
import AllFacts from '@/components/Secure/Facts/All'

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
                subtitle: 'Welcome to your Dashboard.'
            },
            de: {
                title: 'Hallo {name}!',
                subtitle: 'Willkommen auf deinem Dashboard.'
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

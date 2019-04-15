<template>
    <v-container pa-0>
        <v-layout row wrap>

            <v-flex xs12 class="display-1 pa-2">
                {{ call }}
            </v-flex>

            <v-flex xs12 class="caption font-italic pa-2">
                {{ $t('subtitle') }}
            </v-flex>

            <v-flex md6>
                <CalorieAdder />
            </v-flex>

            <v-flex md6>
                <WeightAdder />
            </v-flex>

            <v-flex xs12 pa-3>
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 class="display-1">
                {{ $t('factsTitle') }}
            </v-flex>

            <v-flex xs12>
                <Facts />
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import WeightAdder from '@/components/Secure/Adder/Weight'
import CalorieAdder from '@/components/Secure/Adder/Calorie'
import Facts from '@/components/Secure/Facts/'
export default {

    name: 'home',

    components: {
        WeightAdder,
        CalorieAdder,
        Facts
    },

    i18n: {
        messages: {
            en: {
                title: {
                    morning: 'Good morning {name}!',
                    noon: 'Hello {name}!',
                    evening: 'Good evening {name}!'
                },
                subtitle: 'Welcome to your Dashboard',
                factsTitle: 'Facts'
            },
            de: {
                title: {
                    morning: 'Guten Morgen {name}!',
                    noon: 'Guten Tag {name}!',
                    evening: 'Guten Abend {name}!'
                },
                subtitle: 'Willkommen auf deinem Dashboard',
                factsTitle: 'Fakten'
            }
        }
    },

    computed: {
        call () {
            var hour = (new Date()).getHours()
            if (hour <= 11) {
                return this.$t('title.morning', { name: this.$data.firstname })
            } else if (hour <= 17) {
                return this.$t('title.noon', { name: this.$data.firstname })
            } else {
                return this.$t('title.evening', { name: this.$data.firstname })
            }
        }
    },

    data () {
        return {
            newData: false,
            firstname: this.$store.state.user.firstname
        }
    },

    watch: {
        newData: {
            handler: function () {
                this.$forceUpdate()
            },
            deep: true
        }
    }

}
</script>

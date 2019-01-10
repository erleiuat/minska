
<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>

            <v-flex v-for="card in cards" sm4>
                <FactCard :card="card"/>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import FactCard from './FactCard'

export default {

    name: 'AllFacts',

    i18n: {
        messages: {
            en: {
                titles: {
                    recently: 'Recently',
                    total: 'Total',
                    target: 'Target',
                    bmi: 'BMI',
                    daily: 'Daily',
                    remaining: 'Remaining'
                },
                descriptions: {
                    recently: 'Difference between latest 2 Entries (Most Recent: {value} Kg)',
                    total: 'Difference between first and latest Entry',
                    target: 'Difference between latest and target. (Target: {value} Kg)',
                    bmi: 'Current Body-Mass-Index (Should be between 20 and 25)',
                    daily: 'This is how much you can eat per Day to reach your aims',
                    remaining: 'This is how much is still remaining today'
                }
            },
            de: {
                titles: {
                    recently: 'Kürzlich',
                    total: 'Insgesamt',
                    target: 'Ziel',
                    bmi: 'BMI',
                    daily: 'Täglich',
                    remaining: 'Verbleibend'
                },
                descriptions: {
                    recently: 'Unterschied zwischen den letzten 2 Einträgen (Neuster: {value} Kg)',
                    total: 'Unterschied zwischen deinem ersten und letzten Eintrag',
                    target: 'Unterschied zwischen aktuellem und Ziel-Gewicht. (Ziel: {value} Kg)',
                    bmi: 'Aktueller Body-Mass-Index (Sollte zwischen 20 und 25 sein)',
                    daily: 'Mögliche Kalorien pro Tag um Ziele zu erreichen.',
                    remaining: 'Soviele sind heute noch übrig'
                }
            }
        }
    },

    components: {
        FactCard,
    },

    methods: {

        defaultError(){
            this.$notify({
                group: 'default',
                type: 'error',
                title: this.$t('alerts.error'),
                text: this.$t('alerts.errorMsg')
            });
        },

        buildCards(){

            var vm = this;

            vm.axiosPost({
                url:'weight/read/amount/',
                data: {
                    jwt: this.$store.state.user.auth.token,
                    amount: 2,
                },
            }).then(function(response) {

                vm.$store.commit('changeData', {
                    recent: {
                        weight: response.data.records[0].weight,
                        calorie: vm.$store.state.user.data.recent.calorie
                    }
                });
                vm.$data.weight.last = response.data.records[1].weight;

            }).catch(function (error) {
                vm.defaultError();
            });

            vm.axiosPost({
                url:'weight/read/amount/',
                data: {
                    jwt: this.$store.state.user.auth.token,
                    amount: 1,
                    order: 'ASC'
                },
            }).then(function(response) {
                vm.$data.weight.first = response.data.records[0].weight;
            }).catch(function (error) {
                vm.defaultError();
            });

        }

    },

    mounted(){
        this.buildCards();
    },

    data(){
        return {
            weight: {
                last: null,
                first: null,
                target: this.$store.state.user.info.aims.weight
            },
            height: this.$store.state.user.info.height,
            calorie: {
                total: null,
                used: null
            }
        }
    },

    computed: {
        cards(){

            var cards = {
                recently: {
                    title: this.$t('titles.recently'),
                    description: this.$t('descriptions.recently', {value: this.$store.state.user.data.recent.weight }),
                    value: this.$store.state.user.data.recent.weight - this.$data.weight.last,
                    unit: 'Kg',
                    type: null
                },
                total: {
                    title: this.$t('titles.total'),
                    description: this.$t('descriptions.total'),
                    value: this.$store.state.user.data.recent.weight - this.$data.weight.first,
                    unit: 'Kg',
                    type: null
                },
                target: {
                    title: this.$t('titles.target'),
                    description: this.$t('descriptions.target', {value: this.$data.weight.target }),
                    value: this.$data.weight.target - this.$store.state.user.data.recent.weight,
                    unit: 'Kg',
                    type: null
                },
                bmi: {
                    title: this.$t('titles.bmi'),
                    description: this.$t('descriptions.bmi', {value: this.$data.weight.target }),
                    value: Math.round(this.$store.state.user.data.recent.weight/((this.$data.height/1000)*(this.$data.height/1000)))/100,
                    unit: null,
                    type: null
                },
                daily: {
                    title: this.$t('titles.daily'),
                    description: this.$t('descriptions.daily', {value: this.$data.weight.target }),
                    value: 'TODO',
                    unit: 'Kcal',
                    type: null
                },
                left: {
                    title: this.$t('titles.remaining'),
                    description: this.$t('descriptions.remaining', {value: this.$data.weight.target }),
                    value: 'TODO',
                    unit: 'Kcal',
                    type: null
                }
            }

            if(cards.target.value > 0 && cards.total.value > 0 || cards.target.value < 0 && cards.total.value < 0){
                cards.total.type = 'success';
            } else {
                if(cards.target.value == 0){
                    cards.total.type = 'success';
                    cards.target.type = 'success';
                } else {
                    cards.total.type = 'error';
                    if(cards.target.value <= -5 || cards.target.value >= 5){
                        cards.target.type = 'error';
                    }
                }
            }

            if(cards.total.value > 0){
                cards.total.value = '+'+cards.total.value;
            }

            if(cards.target.value > 0){
                if(cards.recently.value > 0){
                    cards.recently.type = 'success';
                    cards.recently.value = '+' + cards.recently.value;
                } else {
                    if(cards.target.value == 0){
                        cards.recently.type = 'success';
                    } else {
                        cards.recently.type = 'error';
                    }
                }
                cards.target.value = '+'+cards.target.value;
            } else {
                if(cards.recently.value > 0){
                    cards.recently.type = 'error';
                    cards.recently.value = '+'+cards.recently.value;
                } else {
                    cards.recently.type = 'success';
                }
            }

            if(cards.bmi.value > 25){
                cards.bmi.type = 'error';
            } else if(cards.bmi.value < 20){
                cards.bmi.type = 'error';
            } else {
                cards.bmi.type = 'success';
            }

            return cards;

        }
    }


}
</script>

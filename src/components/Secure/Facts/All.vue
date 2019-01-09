
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
    props: {
        newData: Boolean
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

                vm.$data.weight.current = response.data.records[0].weight;
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

    watch: {
        newData: {
            handler: function (val, oldVal) {
                this.buildCards();
            },
            deep: true
        }
    },

    mounted(){
        this.buildCards();
    },

    data(){
        return {
            weight: {
                current: null,
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
                    title: 'Recently',
                    description: 'Difference between latest 2 Entries (Most Recent: '+this.$data.weight.current+' Kg)',
                    value: this.$data.weight.current - this.$data.weight.last,
                    unit: 'Kg',
                    type: null
                },
                total: {
                    title: 'Total',
                    description: 'Difference between first and latest Entry',
                    value: this.$data.weight.current - this.$data.weight.first,
                    unit: 'Kg',
                    type: null
                },
                target: {
                    title: 'Target',
                    description: 'Difference between latest and target. (Target: '+this.$data.weight.target+' Kg)',
                    value: this.$data.weight.target - this.$data.weight.current,
                    unit: 'Kg',
                    type: null
                },
                bmi: {
                    title: 'BMI',
                    description: 'Current Body-Mass-Index (Should be between 20 and 25)',
                    value: Math.round(this.$data.weight.current/((this.$data.height/1000)*(this.$data.height/1000)))/100,
                    unit: null,
                    type: null
                },
                daily: {
                    title: 'Daily Calories',
                    description: 'This is how much you can eat to reach your aims',
                    value: 'TODO',
                    unit: 'Kcal',
                    type: null
                },
                left: {
                    title: 'Calories Left',
                    description: 'This is how many calories are still left.',
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

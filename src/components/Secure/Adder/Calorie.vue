<template>
    <v-container grid-list-sm pa-1>
        <v-card>

            <v-card-title primary-title>
                <v-layout row wrap>
                    <v-flex xs10>
                        <div class="headline">{{ $t('title') }}</div>
                        <span class="grey--text text--darken-3">{{ $t('subtitle') }}</span>
                    </v-flex>
                    <v-flex xs2>
                        <CalorieSearch v-on:useItem="useItem"/>
                    </v-flex>
                </v-layout>
            </v-card-title>

            <v-card-text>
                <v-form v-model="rules.valid" ref="addCalorieForm">
                    <v-layout row wrap>

                        <v-flex sm6>
                            <v-text-field :label="$t('formTitle')" v-model="formdata.title" :rules="rules.text" outline></v-text-field>
                        </v-flex>

                        <v-flex sm6>
                            <v-menu :close-on-content-click="false" v-model="dateMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                <v-text-field readonly slot="activator" :label="$t('date')" v-model="computedDateFormatted" :rules="rules.date" outline></v-text-field>
                                <v-date-picker v-model="formdata.date" @input="dateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-flex>

                        <v-flex sm6>
                            <v-text-field :label="$t('formCalories')" v-model="formdata.calories" :rules="rules.number" outline></v-text-field>
                        </v-flex>

                        <v-flex sm6>
                            <v-text-field :label="$t('formAmount')" v-model="formdata.amount" :rules="rules.number" outline></v-text-field>
                        </v-flex>


                        <v-flex xs12>
                            <v-btn :disabled="disabled" large block color="primary" @click="addCalorie()">{{$t('add')}}</v-btn>
                        </v-flex>

                    </v-layout>
                </v-form>
            </v-card-text>

        </v-card>
    </v-container>
</template>

<script>
import CalorieSearch from './CalorieSearch'

    export default {
        name: 'CalorieAdder',
        components: {
            CalorieSearch
        },
        i18n: {
            messages: {
                en: {
                    title: 'Add Calories',
                    subtitle: 'Write down what you eat to keep track of your calories',
                    weight: 'Weight (Kg)',
                    add: 'Add',
                    formTitle: 'Title',
                    formCalories: 'Calories per 100 g/ml',
                    formAmount: 'Amount (g/ml)',
                    date: 'Date'
                },
                de: {
                    title: 'Kalorien hinzufügen',
                    subtitle: 'Dokumentiere was du isst um deine verbleibenden Kalorien zu berechnen',
                    weight: 'Gewicht (Kg)',
                    add: 'Hinzufügen',
                    formTitle: 'Titel',
                    formCalories: 'Kalorien per 100 g/ml',
                    formAmount: 'Menge (g/ml)',
                    date: 'Datum'
                }
            }
        },

        methods: {

            useItem(item){
                this.$data.formdata.title = item.title;
                this.$data.formdata.calories = item.calories;
                this.$data.formdata.amount = item.amount;
            },

            addCalorie(){

                this.$refs.addCalorieForm.validate();
                if(this.$data.rules.valid){

                    var vm = this;
                    var postData = vm.$data.formdata;
                    postData.token = this.$store.state.auth.token;
                    vm.$data.disabled=true;

                    vm.axiosPost({
                        url:'calorie/create/',
                        data: postData,
                    }).then(function(response) {
                        var now = new Date();
                        var today = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();

                        if(today == vm.$data.formdata.date){
                            if(!vm.$store.state.content.calories || vm.$store.state.content.calories.lenght < 1){
                                vm.$store.state.content.calories = [];
                            }
                            vm.$store.state.content.calories.unshift({
                                id: response.data.content,
                                amount: vm.$data.formdata.amount,
                                calories: vm.$data.formdata.calories,
                                title:vm.$data.formdata.title
                            });
                        }

                        vm.$refs.addCalorieForm.reset();
                        vm.$notify({
                            group: 'default',
                            type: 'success',
                            title: vm.$t('alerts.success.title'),
                            text: vm.$t('alerts.success.text')
                        });
                    }).catch(function (error) {
                        vm.$notify({
                            group: 'default',
                            type: 'error',
                            title: vm.$t('alerts.error.title'),
                            text: vm.$t('alerts.error.text')
                        });
                        vm.disabled=false;
                    });

                }
            }
        },

        computed: {
            computedDateFormatted:{
                get(){
                    if (!this.$data.formdata.date) return null
                    const [year, month, day] = this.$data.formdata.date.split('-')
                    return `${day}.${month}.${year}`
                },
                set(){
                }
            },
        },

        data(){
            var tmp = new Date();
            return {
                disabled: true,
                dateMenu: false,
                formdata: {
                    title: null,
                    date: tmp.getFullYear()+ '-' + (tmp.getMonth()+1) +'-'+ tmp.getDate(),
                    calories: null,
                    amount: null
                },
                rules: {
                    valid: true,
                    text: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && v.length <= 100 || this.$t('errors.valid')
                    ],
                    date: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && new Date(this.$data.formdata.date) != 'Invalid Date' || this.$t('errors.valid'),
                    ],
                    weight: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && v <= 500 && v >= 20 || this.$t('errors.valid'),
                    ],
                    number: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && v <= 9999 && v >= 0 || this.$t('errors.valid')
                    ],
                }
            }
        },

        watch: {
            'formdata': {
                handler: function (val, oldVal) {
                    if(val.title && val.calories && val.amount && val.date){
                        this.disabled = false;
                    }
                },
                deep: true
            }
        }

    }
</script>

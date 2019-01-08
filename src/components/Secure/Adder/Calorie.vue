<template>
    <v-container fluid grid-list-md>
        <v-card>

            <v-card-title primary-title>
                <div>
                    <div class="headline">Add Calories</div>
                    <span class="grey--text">Write down what you eat to keep track of your calories.</span>
                </div>
            </v-card-title>

            <v-card-text>
                <v-form v-model="rules.valid" ref="addWeightForm">
                    <v-layout row wrap>

                        <v-flex sm6>
                            <v-text-field label="Title" v-model="formdata.weight" :rules="rules.weight" outline></v-text-field>
                        </v-flex>

                        <v-flex sm6>
                            <v-menu :close-on-content-click="false" v-model="dateMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                <v-text-field readonly slot="activator" :label="$t('general.date')" v-model="computedDateFormatted" :rules="rules.date" outline></v-text-field>
                                <v-date-picker v-model="formdata.date" @input="dateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-flex>

                        <v-flex sm6>
                            <v-text-field label="Calories" v-model="formdata.calorie" :rules="rules.number" outline></v-text-field>
                        </v-flex>

                        <v-flex sm6>
                            <v-text-field label="Amount" v-model="formdata.amount" :rules="rules.number" outline></v-text-field>
                        </v-flex>


                        <v-flex xs12>
                            <v-btn large block color="primary">Add</v-btn>
                        </v-flex>

                    </v-layout>
                </v-form>
            </v-card-text>

        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'CalorieAdder',

    computed: {
        computedDateFormatted () {
            if (!this.$data.formdata.date) return null
            const [year, month, day] = this.$data.formdata.date.split('-')
            return `${day}.${month}.${year}`
        },
    },

    data(){
        var tmp = new Date();
        return {
            dateMenu: false,
            formdata: {
                title: null,
                date: tmp.getFullYear()+ '-' + (tmp.getMonth()+1) +'-'+ tmp.getDate(),
                calorie: null,
                amount: null
            },
            rules: {
                valid: true,
                date: [
                (v) => !!v || this.$t('errors.required'),
                (v) => v && new Date(this.$data.formdata.date) != 'Invalid Date' || this.$t('errors.valid'),
                ],
                weight: [
                (v) => !!v || this.$t('errors.required'),
                (v) => v && v <= 500 && v >= 30 || this.$t('errors.valid'),
                ],
                number: [
                (v) => !!v || this.$t('errors.required'),
                (v) => v && v <= 9999 && v >= 0 || this.$t('errors.valid')
                ],
            }
        }
    }
}
</script>

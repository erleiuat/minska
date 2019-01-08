<template>
    <v-container fluid grid-list-md>
        <v-card>

            <v-card-title primary-title>
                <div>
                    <div class="headline">Add Weight</div>
                    <span class="grey--text">Enter your weight after you have been on the scale.</span>
                </div>
            </v-card-title>

            <v-card-text>
                <v-form v-model="rules.valid" ref="addWeightForm">
                    <v-layout row wrap>

                        <v-flex sm12>
                            <v-text-field label="Weight" v-model="formdata.weight" :rules="rules.weight" outline></v-text-field>
                        </v-flex>

                        <v-flex sm12>
                            <v-menu :close-on-content-click="false" v-model="dateMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                <v-text-field readonly slot="activator" :label="$ml.get('general.date')" v-model="computedDateFormatted" :rules="rules.date" outline></v-text-field>
                                <v-date-picker v-model="formdata.date" @input="dateMenu = false"></v-date-picker>
                            </v-menu>
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
    name: 'WeightAdder',

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
                weight: null,
                date: tmp.getFullYear()+ '-' + (tmp.getMonth()+1) +'-'+ tmp.getDate(),
            },
            rules: {
                valid: true,
                date: [
                (v) => !!v || this.$ml.get('errors.required'),
                (v) => v && new Date(this.$data.formdata.date) != 'Invalid Date' || this.$ml.get('errors.valid'),
                ],
                weight: [
                (v) => !!v || this.$ml.get('errors.required'),
                (v) => v && v <= 500 && v >= 30 || this.$ml.get('errors.valid'),
                ],
            }
        }
    }
}
</script>

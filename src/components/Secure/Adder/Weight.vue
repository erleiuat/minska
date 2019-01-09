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
                                <v-text-field readonly slot="activator" :label="$t('general.date')" v-model="computedDateFormatted" :rules="rules.date" outline></v-text-field>
                                <v-date-picker v-model="formdata.date" @input="dateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-flex>

                        <v-flex xs12>
                            <v-btn :disabled="disabled" large block color="primary" @click="addWeight()">Add</v-btn>
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

    methods: {

        addWeight(){

            this.$refs.addWeightForm.validate();
            if(this.$data.rules.valid){

                var vm = this;
                var postData = vm.$data.formdata;
                postData.jwt = this.$store.state.user.auth.token;
                vm.$data.disabled=true;

                vm.axiosPost({

                    url:'weight/create/',
                    data: postData,

                }).then(function (response) {

                    vm.$notify({
                        group: 'default',
                        type: 'success',
                        title: vm.$t('alerts.saved'),
                        text: vm.$t('alerts.savedMsg')
                    });
                    vm.$refs.addWeightForm.reset();
                    vm.$emit('input');
                    vm.disabled=true;

                }).catch(function (error) {

                    vm.$notify({
                        group: 'default',
                        type: 'error',
                        title: vm.$t('alerts.error'),
                        text: vm.$t('alerts.errorMsg')
                    });
                    vm.disabled=false;

                });
            }

        }

    },

    computed: {
        computedDateFormatted: {
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
                weight: null,
                date: tmp.getFullYear()+ '-' + (tmp.getMonth()+1) +'-'+ tmp.getDate(),
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
            }
        }
    },

    watch: {
        'formdata': {
            handler: function (val, oldVal) {
                this.disabled = false;
            },
            deep: true
        }
    }

}
</script>

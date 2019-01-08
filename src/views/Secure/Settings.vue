<template>
    <v-container grid-list-md>
        <h1 v-text="$t('views.settings')"></h1>

        <v-card>
            <v-container fluid grid-list-md>
                <v-form v-model="rules.valid" ref="settingsForm">
                    <h2 v-text="$t('general.basic')"></h2>
                    <v-layout row wrap>
                        <v-flex sm6>
                            <v-select :label="$t('general.language')" v-model="formdata.language" :rules="rules.selectLanguage" :items="languageItems" item-text="text" item-value="value"></v-select>
                        </v-flex>
                        <v-flex sm6>
                            <v-select :label="$t('general.gender')" v-model="formdata.isFemale" :rules="rules.selectGender" :items="genderItems" item-text="text" item-value="value"></v-select>
                        </v-flex>
                        <v-flex sm6>
                            <v-text-field :label="$t('general.firstname')" v-model="formdata.firstname" :rules="rules.name" outline></v-text-field>
                        </v-flex>
                        <v-flex sm6>
                            <v-text-field :label="$t('general.lastname')" v-model="formdata.lastname" :rules="rules.name" outline></v-text-field>
                        </v-flex>
                        <v-flex sm6>
                            <v-text-field :label="$t('general.height')" v-model="formdata.height" :rules="rules.height" outline></v-text-field>
                        </v-flex>
                    </v-layout>
                    <h2 v-text="$t('general.aims')"></h2>
                    <v-layout row wrap>
                        <v-flex sm6>
                            <v-text-field :label="$t('general.weight')" v-model="formdata.aims.weight" :rules="rules.weight" outline></v-text-field>
                        </v-flex>

                        <v-flex sm6>
                            <v-menu :close-on-content-click="false" v-model="dateMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                <v-text-field readonly slot="activator" :label="$t('general.date')" v-model="computedDateFormatted" :rules="rules.date" outline></v-text-field>
                                <v-date-picker v-model="formdata.aims.date" @input="dateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-flex>

                        <v-flex xs12>
                            <v-btn depressed block @click="sendUpdates()" large color="primary" :disabled="disabled" v-text="$t('general.save')"></v-btn>
                        </v-flex>

                    </v-layout>
                </v-form>
            </v-container>
        </v-card>

    </v-container>
</template>

<script>
    export default {

        name: 'settings',

        methods: {

            sendUpdates(){

                this.$refs.settingsForm.validate();
                if(this.$data.rules.valid){

                    var vm = this;
                    var postData = vm.$data.formdata;
                    postData.jwt = this.$store.state.user.auth.token;
                    vm.$data.disabled=true;

                    vm.axiosPost({

                        url:'user/update/',
                        data: postData,

                    }).then(function (response) {

                        vm.$store.commit('login',  response.data.jwt);
                        vm.$notify({
                            group: 'default',
                            type: 'success',
                            title: vm.$t('alerts.saved'),
                            text: vm.$t('alerts.savedMsg')
                        });
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


        beforeUpdate() {

            var languageItems = [
                {text: this.$t('languages.english'), value: 'en'},
                {text: this.$t('languages.german'), value: 'de'}
            ]

            var genderItems = [
                {text: this.$t('general.male'), value: false},
                {text: this.$t('general.female'), value: true}
            ]

            this.$data.genderItems = genderItems;
            this.$data.languageItems = languageItems;

        },

        computed: {
            computedDateFormatted () {
                if (!this.$data.formdata.aims.date) return null
                const [year, month, day] = this.$data.formdata.aims.date.split('-')
                return `${day}.${month}.${year}`
            },
        },

        data() {
            return {

                disabled: true,
                dateMenu: false,
                languageItems: [],
                genderItems: [],

                formdata: {
                    language: this.$store.state.user.info.language,
                    isFemale: this.$store.state.user.info.isFemale,
                    firstname: this.$store.state.user.info.firstname,
                    lastname: this.$store.state.user.info.lastname,
                    height: this.$store.state.user.info.height,
                    aims: {
                        weight: this.$store.state.user.info.aims.weight,
                        date: this.$store.state.user.info.aims.date
                    }
                },

                rules: {
                    valid: false,
                    name: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && v.length <= 20 || this.$t('errors.valid'),
                    ],
                    email: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('errors.valid'),
                    ],
                    height: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && v <= 300 && v >= 50 || this.$t('errors.valid'),
                    ],
                    weight: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && v <= 500 && v >= 30 || this.$t('errors.valid'),
                    ],
                    date: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && new Date(this.$data.formdata.aims.date) != 'Invalid Date' || this.$t('errors.valid'),
                    ],
                    selectGender: [
                    (v) => (typeof v) === 'boolean' || this.$t('errors.required'),
                    ],
                    selectLanguage: [
                    (v) => !!v || this.$t('errors.required'),
                    ]
                },

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

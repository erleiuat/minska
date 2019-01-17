<template>
    <v-container grid-list-sm pa-0>
        <h1 v-text="$t('title')"></h1>
        <v-card>
            <v-container fluid grid-list-md>
                <v-form v-model="rules.valid" ref="settingsForm">
                    <h2 v-text="$t('basic')"></h2>
                    <v-layout row wrap>
                        <v-flex sm6>
                            <v-select :label="$t('language')" v-model="formdata.language" :rules="rules.selectLanguage" :items="languageItems" item-text="text" item-value="value"></v-select>
                        </v-flex>
                        <v-flex sm6>
                            <v-select :label="$t('gender')" v-model="formdata.isFemale" :rules="rules.selectGender" :items="genderItems" item-text="text" item-value="value"></v-select>
                        </v-flex>
                        <v-flex sm6>
                            <v-text-field :label="$t('firstname')" v-model="formdata.firstname" :rules="rules.name" outline></v-text-field>
                        </v-flex>
                        <v-flex sm6>
                            <v-text-field :label="$t('lastname')" v-model="formdata.lastname" :rules="rules.name" outline></v-text-field>
                        </v-flex>
                        <v-flex sm6>
                            <v-text-field :label="$t('height')" v-model="formdata.height" :rules="rules.height" outline></v-text-field>
                        </v-flex>
                    </v-layout>
                    <h2 v-text="$t('aims')"></h2>
                    <v-layout row wrap>
                        <v-flex sm6>
                            <v-text-field :label="$t('weight')" v-model="formdata.aims.weight" :rules="rules.weight" outline></v-text-field>
                        </v-flex>

                        <v-flex sm6>
                            <v-menu :close-on-content-click="false" v-model="dateMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                <v-text-field readonly slot="activator" :label="$t('date')" v-model="computedDateFormatted" :rules="rules.date" outline></v-text-field>
                                <v-date-picker v-model="formdata.aims.date" @input="dateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-flex>

                        <v-flex xs12>
                            <v-btn depressed block @click="sendUpdates()" large color="primary" :disabled="disabled" v-text="$t('save')"></v-btn>
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

        i18n: {
            messages: {
                en: {
                    title: 'Settings',
                    basic: 'General',
                    language: 'Language',
                    german: 'German',
                    english: 'English',
                    gender: 'Gender',
                    male: 'Male',
                    female: 'Female',
                    firstname: 'Firstname',
                    lastname: 'Lastname',
                    height: 'Height (cm)',
                    aims: 'Aims',
                    weight: 'Weight (Kg)',
                    date: 'Date',
                    save: 'Save Changes'
                },
                de: {
                    title: 'Einstellungen',
                    basic: 'Grundlegend',
                    language: 'Sprache',
                    german: 'Deutsch',
                    english: 'Englisch',
                    gender: 'Geschlecht',
                    male: 'Mann',
                    female: 'Frau',
                    firstname: 'Vorname',
                    lastname: 'Nachname',
                    height: 'Grösse (cm)',
                    aims: 'Ziele',
                    weight: 'Gewicht (Kg)',
                    date: 'Datum',
                    save: 'Änderungen Speichern'
                }
            }
        },

        methods: {

            sendUpdates(){

                this.$refs.settingsForm.validate();
                if(this.$data.rules.valid){

                    var vm = this;
                    var postData = vm.$data.formdata;
                    postData.token = this.$store.state.auth.token;
                    vm.$data.disabled=true;

                    vm.axiosPost({
                        url:'user/update/',
                        data: postData,
                    }).then(function (response) {
                        vm.$store.commit('login',  response.data.content);
                        vm.$notify({
                            group: 'default',
                            type: 'success',
                            title: vm.$t('alerts.success.title'),
                            text: vm.$t('alerts.success.text')
                        });
                        vm.disabled=true;
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


        beforeUpdate() {

            var languageItems = [
                {text: this.$t('english'), value: 'en'},
                {text: this.$t('german'), value: 'de'}
            ]

            var genderItems = [
                {text: this.$t('male'), value: false},
                {text: this.$t('female'), value: true}
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
                    language: this.$store.state.user.language,
                    isFemale: this.$store.state.user.isFemale,
                    firstname: this.$store.state.user.firstname,
                    lastname: this.$store.state.user.lastname,
                    height: this.$store.state.user.height,
                    aims: {
                        weight: this.$store.state.user.aims.weight,
                        date: this.$store.state.user.aims.date
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

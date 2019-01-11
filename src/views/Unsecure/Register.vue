<template>
    <v-container grid-list-md >

                <v-form v-model="rules.valid" ref="registrationForm">
                    <v-layout justify-center row wrap>

                        <v-flex xs12>
                            <h1 class="text-xs-center" v-text="$t('title')"></h1>
                        </v-flex>

                        <v-flex xs12 sm4>
                            <v-text-field :label="$t('firstname')" v-model="formdata.firstname" :rules="rules.name" outline></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4>
                            <v-text-field :label="$t('lastname')" v-model="formdata.lastname" :rules="rules.name" outline></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4>
                            <v-text-field :label="$t('mail')" v-model="formdata.email" :rules="rules.email" outline></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field :label="$t('password')" v-model="formdata.password" outline :rules="rules.pass" :type="'password'"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field :label="$t('repeat')" outline :rules="rules.pass2" :type="'password'"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn depressed block @click="sendRegistration()" large color="primary" :disabled="disabled" v-text="$t('button')"></v-btn>
                        </v-flex>

                    </v-layout>
                </v-form>

    </v-container>
</template>

<script>
export default {

    name: 'Register',

    i18n: {
        messages: {
            en: {
                title: 'Create Account',
                firstname: 'Firstname',
                lastname: 'Lastname',
                mail: 'E-Mail',
                password: 'Password',
                repeat: 'Repeat Password',
                button: 'Register now',
                match: "Passwords don't match",
                strong: "Password isn't strong enough",
                created: {
                    title: 'Account created!',
                    text: 'You can now login'
                },
                failed: {
                    title: 'Account not created',
                    text: 'Maybe this E-Mail Address is already in use'
                }
            },
            de: {
                title: 'Account erstellen',
                firstname: 'Vorname',
                lastname: 'Nachname',
                mail: 'E-Mail',
                password: 'Passwort',
                repeat: 'Passwort wiederholen',
                button: 'Registieren',
                match: 'Passwörter stimmen nicht überein',
                strong: 'Passwort ist nicht stark genug',
                created: {
                    title: 'Account erstellt!',
                    text: 'Du kannst dich nun anmelden'
                },
                failed: {
                    title: 'Fehler beim erstellen des Accounts',
                    text: 'Möglicherweise existiert bereits ein Account mit dieser E-Mail'
                }
            }
        }
    },

    methods: {
        sendRegistration(){

            var vm = this;
            vm.$refs.registrationForm.validate()

            if(vm.$data.rules.valid){
                vm.$data.disabled=true;
                vm.axiosPost({
                    url:'user/create/',
                    data: vm.$data.formdata
                }).then(function (response) {
                    vm.$notify({
                        group: 'default',
                        type: 'success',
                        title: $t('created.title'),
                        text: $t('created.text')
                    });
                    vm.$router.push('/login');
                }).catch(function (error) {
                    vm.$notify({
                        group: 'default',
                        type: 'error',
                        title: $t('failed.title'),
                        text: $t('failed.text')
                    });
                    vm.disabled=false;
                });

            }

        }
    },

    data (){
        return {
            disabled: false,
            formdata: {
                firstname: null,
                lastname: null,
                email: null,
                password: null
            },
            rules: {
                valid: false,
                name: [
                (v) => !!v || this.$t('errors.required'),
                (v) => v && v.length <= 90 || this.$t('errors.valid')
                ],
                email: [
                (v) => !!v || this.$t('errors.required'),
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('errors.valid'),
                ],
                pass: [
                (v) => !!v || this.$t('errors.required'),
                (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || this.$t('strong'),
                ],
                pass2: [
                (v) => !!v || this.$t('repeat'),
                (v) => v == this.$data.formdata.password || this.$t('match'),
                ]
            }
        }
    }

}
</script>

<style scoped>

</style>

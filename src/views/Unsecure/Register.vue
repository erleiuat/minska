<template>
    <v-container grid-list-md pa-0>

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
                    <v-text-field :label="$t('mail')" v-model="formdata.email" :rules="rules.email" type="email" outline></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field :label="$t('password')" v-model="formdata.password" outline :rules="rules.pass" type="password"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field :label="$t('repeat')" outline :rules="rules.pass2" type="password"></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-btn type="submit" :loading="loading" :disabled="loading" depressed block @click="sendRegistration()" large color="primary">
                        {{ $t('button') }}
                        <span slot="loader" class="custom-loader">
                            <v-icon light>cached</v-icon>
                        </span>
                    </v-btn>
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
                strong: 'Min. 8 Characters, upper and lowercase, numbers',
                created: {
                    title: 'Check your Mails',
                    text: 'Your Account has been created. Please confirm your E-Mail Address by clicking the link from our Mail.'
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
                strong: 'Min. 8 Zeichen, Gross & Klein, Zahlen',
                created: {
                    title: 'Überprüfe deine E-Mails',
                    text: 'Dein Account wurde erstellt. Bitte bestätige deine E-Mail bevor du dich einloggst.'
                },
                failed: {
                    title: 'Fehler beim erstellen des Accounts',
                    text: 'Möglicherweise existiert bereits ein Account mit dieser E-Mail'
                }
            }
        }
    },

    methods: {
        sendRegistration () {
            var vm = this
            vm.$refs.registrationForm.validate()

            if (vm.$data.rules.valid) {
                vm.$data.disabled = true
                vm.$data.loading = true
                vm.$http.post('user/create/', vm.$data.formdata)
                    .then(function (response) {
                        vm.$data.loading = false
                        vm.$router.push('/confirm')
                        vm.$notify({ type: 'success', title: vm.$t('created.title'), text: vm.$t('created.text') })
                    }).catch(function () {
                        vm.$notify({ type: 'error', title: vm.$t('failed.title'), text: vm.$t('failed.text') })
                        vm.$data.disabled = false
                        vm.$data.loading = false
                    })
            }
        }
    },

    data () {
        return {
            disabled: false,
            loading: false,
            formdata: {
                firstname: '',
                lastname: '',
                email: '',
                language: this.$store.state.user.language,
                password: ''
            },
            rules: {
                valid: false,
                name: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && v.length <= 200 || this.$t('errors.valid')
                ],
                email: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('errors.valid')
                ],
                pass: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v) || this.$t('strong')
                ],
                pass2: [
                    (v) => !!v || this.$t('repeat'),
                    (v) => v === this.$data.formdata.password || this.$t('match')
                ]
            }
        }
    }

}
</script>

<style scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}
@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>

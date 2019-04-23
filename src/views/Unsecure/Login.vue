<template>
    <v-container pa-0>
        <v-form v-model="rules.valid" ref="registrationForm">
            <v-layout justify-center row wrap>
                <v-flex xs12 sm8 md6>
                    <h1 v-text="$t('title')"></h1>
                    <v-text-field :label="$t('mail')" v-model="formdata.email" :rules="rules.email" type="email" outline></v-text-field>
                    <v-text-field :label="$t('password')" v-model="formdata.password" outline :rules="rules.pass" type="password"></v-text-field>
                    <v-btn type="submit" :loading="loading" :disabled="loading" depressed block @click="sendLogin()" large color="primary">
                        {{ $t('login') }}
                        <span slot="loader" class="custom-loader">
                            <v-icon light>cached</v-icon>
                        </span>
                    </v-btn>
                    <v-flex xs12 class="mt-3 text-xs-center">
                        <span>oder</span>
                    </v-flex>
                    <v-btn :loading="loading2" :disabled="loading2" depressed block @click="googleAuth()" large class="white elevation-2 mt-3">
                        <v-avatar size="32px" class="pr-5">
                            <v-img :src="require('@/assets/social/google.png')" :lazy-src="require('@/assets/social/google_low.png')" aspect-ratio="2" height="100%" contain></v-img>
                        </v-avatar>
                        {{ $t('gauth') }}
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
    name: 'Login',

    methods: {

        sendLogin () {
            var vm = this
            vm.$refs.registrationForm.validate()

            if (vm.$data.rules.valid) {
                vm.$data.loading = true
                vm.$http.post('user/login/', vm.$data.formdata)
                .then(function (response) {
                    vm.$store.commit('login')
                    vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + vm.$store.state.auth.token
                    vm.$router.push('/dashboard')
                    vm.$notify({ type: 'success', title: vm.$t('success.title'), text: vm.$t('success.text') })
                }).catch(function (error) {
                    if (error.response && error.response.data.reason === 'email_not_confirmed') {
                        vm.$router.push('/confirm')
                        vm.$notify({ type: 'error', title: vm.$t('failconfirm.title'), text: vm.$t('failconfirm.text') })
                    } else {
                        vm.$notify({ type: 'error', title: vm.$t('fail.title'), text: vm.$t('fail.text') })
                    }
                }).then(function () {
                    vm.loading = false
                })
            }
        },

        googleAuth(){

            this.loading2 = true

            this.$gAuth.signIn()
            .then(GoogleUser => {
                // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
                console.log('user', GoogleUser)
                // GoogleUser.getId() : Get the user's unique ID string.
                // GoogleUser.getBasicProfile() : Get the user's basic profile information.
                // GoogleUser.getAuthResponse() : Get the response object from the user's auth session. access_token and so on
                this.isSignIn = this.$gAuth.isAuthorized
            })
            .catch(error  => {
                //on fail do something
            })

            /*
            this.$gAuth.getAuthCode()
            .then(authCode => {
                // on success
                console.log(authCode)
            })
            .then(response => {
                // after ajax
                console.log(response)
            })
            .catch(error => {
                // on fail do something
                console.log(error)
            })
            */
            this.loading2 = false

        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Login',
                gauth: 'Sign in with Google',
                mail: 'E-Mail',
                password: 'Password',
                keepLogged: 'Keep Login',
                success: {
                    title: 'Login Successful!',
                    text: 'You were redirected to your Dashboard'
                },
                fail: {
                    title: 'Login failed',
                    text: 'E-Mail/Password are incorrect or Account not found'
                },
                failconfirm: {
                    title: 'Login failed',
                    text: 'This account is not confirmed yet. Please check your mails.'
                }
            },
            de: {
                title: 'Anmelden',
                gauth: 'Mit Google anmelden',
                mail: 'E-Mail',
                password: 'Passwort',
                keepLogged: 'Eingeloggt bleiben',
                success: {
                    title: 'Erfolgreich angemeldet!',
                    text: 'Du wurdest zu deinem Dashboard weitergeleitet'
                },
                fail: {
                    title: 'Anmeldung fehlgeschlagen',
                    text: 'E-Mail/Password sind falsch oder der Account existiert nicht'
                },
                failconfirm: {
                    title: 'Anmeldung fehlgeschlagen',
                    text: 'Dieser Account wurde noch nicht bestätigt. Bitte prüfe deine E-Mails.'
                }
            }
        }
    },

    data () {
        return {
            loading: false,
            loading2: false,
            formdata: {
                email: '',
                password: ''
            },
            rules: {
                valid: false,
                email: [
                (v) => !!v || this.$t('errors.required'),
                (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('errors.valid')
                ],
                pass: [
                (v) => !!v || this.$t('errors.required'),
                (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v) || this.$t('strong')
                // (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || this.$t('strong'), <- Too stong lol
                ]
            }
        }
    }

}
</script>

<style scoped>

</style>

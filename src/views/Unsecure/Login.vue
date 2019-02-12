<template>
    <v-container>
        <v-form v-model="rules.valid" ref="registrationForm">
            <v-layout justify-center row wrap>
                <v-flex xs12 sm8 md6>
                    <h1 v-text="$t('title')"></h1>
                    <v-text-field :label="$t('mail')" v-model="formdata.email" :rules="rules.email" type="email" outline></v-text-field>
                    <v-text-field :label="$t('password')" v-model="formdata.password" outline :rules="rules.pass" type="password"></v-text-field>
                    <v-checkbox color="primary" v-model="keepLogin" label="Eingeloggt bleiben"></v-checkbox>
                    <v-btn :loading="loading" :disabled="loading" depressed block @click="sendLogin()" large color="primary">
                        {{ $t('login') }}
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
    i18n: {
        messages: {
            en: {
                title: 'Login',
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
                }
            },
            de: {
                title: 'Anmelden',
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
                }
            }
        }
    },

    methods: {

        sendLogin () {
            var vm = this
            vm.$refs.registrationForm.validate()

            if (vm.$data.rules.valid) {
                vm.$data.loading = true
                vm.$http.post('user/login/', vm.$data.formdata)
                .then(function (response) {
                    vm.$store.commit('login', { token: response.data.content, keep: vm.$data.keepLogin })
                    vm.$notify({
                        group: 'default',
                        type: 'success',
                        title: vm.$t('success.title'),
                        text: vm.$t('success.text')
                    })
                    vm.$router.push('/dashboard')
                }).catch(function () {
                    vm.$notify({
                        group: 'default',
                        type: 'error',
                        title: vm.$t('fail.title'),
                        text: vm.$t('fail.text')
                    })
                }).then(function () {
                    vm.loading = false
                })
            }
        }

    },

    data () {
        return {
            loading: false,
            formdata: {
                email: '',
                password: ''
            },
            keepLogin: false,
            rules: {
                valid: false,
                email: [
                (v) => !!v || this.$t('errors.required'),
                (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('errors.valid')
                ],
                pass: [
                (v) => !!v || this.$t('errors.required'),
                (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(v) || this.$t('errors.valid')
                ]
            }
        }
    }

}
</script>

<style scoped>

</style>

<template>
    <v-container grid-list-md pa-0>

        <v-form v-model="rules.valid" ref="confirmForm">
            <v-layout justify-center row wrap>

                <v-flex xs12>
                    <h1 class="text-xs-center" v-text="$t('title')"></h1>
                </v-flex>

                <v-flex xs12>
                    <v-text-field :label="$t('mail')" v-model="formdata.email" :rules="rules.email" type="email" outline></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-text-field :label="$t('code')" v-model="formdata.code" :rules="rules.code" type="text" outline></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-btn type="submit" :loading="loading" :disabled="loading" depressed block @click="sendConfirmation()" large color="primary">
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
    name: 'Confirm',
    data () {
        return {
            disabled: false,
            loading: false,
            formdata: {
                email: '',
                code: ''
            },
            rules: {
                valid: false,
                email: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('errors.valid')
                ],
                code: [
                    (v) => v && v.length === 20 || this.$t('errors.valid')
                ]
            }
        }
    },
    mounted () {
        if (this.$route.query.mail && this.$route.query.code) {
            this.$data.formdata.email = this.$route.query.mail
            this.$data.formdata.code = this.$route.query.code
            this.sendConfirmation()
        }
    },
    i18n: {
        messages: {
            en: {
                title: 'Confirm you Account',
                mail: 'E-Mail',
                code: 'Code',
                button: 'Confirm now',
                created: {
                    title: 'Successfully confirmed!',
                    text: 'Your Account has been confirmed. You can login now.'
                },
                failed: {
                    title: 'Something went wrong',
                    text: 'Maybe your Account already is confirmed or you used the wrong code.'
                }
            },
            de: {
                title: 'Bestätige deinen Account',
                mail: 'E-Mail',
                code: 'Code',
                button: 'Bestätigen',
                created: {
                    title: 'Erfolgreich bestätigt!',
                    text: 'Dein Account wurde bestätigt. Du kannst dich jetzt anmelden!'
                },
                failed: {
                    title: 'Etwas ging schief',
                    text: 'Vielleicht ist dein Account bereits bestätigt oder der Code ist falsch.'
                }
            }
        }
    },
    methods: {
        sendConfirmation () {
            var vm = this
            vm.$refs.confirmForm.validate()
            if (vm.$data.rules.valid) {
                vm.$data.disabled = true
                vm.$data.loading = true

                vm.$http.post('user/confirm_email/', vm.$data.formdata)
                    .then(function (response) {
                        vm.$data.loading = false
                        vm.$router.push('/login')
                        vm.$notify({ type: 'success', title: vm.$t('created.title'), text: vm.$t('created.text') })
                    }).catch(function () {
                        vm.$notify({ type: 'error', title: vm.$t('failed.title'), text: vm.$t('failed.text') })
                        vm.$data.disabled = false
                        vm.$data.loading = false
                    })
            }
        }
    }

}
</script>

<style scoped>

</style>

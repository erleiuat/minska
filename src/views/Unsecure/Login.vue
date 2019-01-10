<template>
    <v-container>
        <v-form v-model="rules.valid" ref="registrationForm">
            <v-layout justify-center row wrap>
                <v-flex xs6 sm6 md6>
                    <h1 v-text="$t('title')"></h1>
                    <v-text-field :label="$t('mail')" v-model="formdata.email" :rules="rules.email" outline></v-text-field>
                    <v-text-field :label="$t('password')" v-model="formdata.password" outline :rules="rules.pass" :type="'password'"></v-text-field>
                    <v-btn depressed block @click="sendLogin()" large color="primary" :disabled="disabled" v-text="$t('title')"></v-btn>
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
                success: {
                    title: 'Login Successful!',
                    text: 'You were redirected to your Dashboard'
                },
                fail: {
                    title: 'Login failed',
                    text: "E-Mail/Password are incorrect or Account not found"
                }
            },
            de: {
                title: 'Anmelden',
                mail: 'E-Mail',
                password: 'Passwort',
                success: {
                    title: 'Erfolgreich angemeldet!',
                    text: 'Du wurdest zu deinem Dashboard weitergeleitet'
                },
                fail: {
                    title: 'Anmeldung fehlgeschlagen',
                    text: "E-Mail/Password sind falsch oder der Account existiert nicht"
                }
            }
        }
    },

    methods: {

        sendLogin(){

            var vm = this;
            vm.$refs.registrationForm.validate()

            if(vm.$data.rules.valid){

                vm.$data.disabled=true;

                vm.axiosPost({
                    url:'user/login/',
                    data: vm.$data.formdata
                }).then(function (response) {
                    vm.$store.commit('login',  response.data.jwt);
                    vm.$notify({
                        group: 'default',
                        type: 'success',
                        title: vm.$t('success.title'),
                        text: vm.$t('success.text')
                    });
                    vm.$router.push('/dashboard');
                }).catch(function (error) {
                    vm.$notify({
                        group: 'default',
                        type: 'error',
                        title: vm.$t('fail.title'),
                        text: vm.$t('fail.text')
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
                email: 'mail@eliareutlinger.ch',
                password: 'Test@1234'
            },
            rules: {
                valid: false,
                email: [
                (v) => !!v || 'E-mail is required',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                pass: [
                (v) => !!v || 'Password is required',
                (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 'Password not strong enough'
                ],
            }
        }

    }

}
</script>

<style scoped>

</style>

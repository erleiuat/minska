<template>
    <v-container>
        <v-form v-model="rules.valid" ref="registrationForm">
            <v-layout justify-center row wrap>
                <v-flex xs6 sm6 md6>
                    <h1 v-text="$ml.get('views.login')"></h1>
                    <v-text-field :label="$ml.get('general.mail')" v-model="formdata.email" :rules="rules.email" outline></v-text-field>
                    <v-text-field :label="$ml.get('general.password')" v-model="formdata.password" outline :rules="rules.pass" :type="'password'"></v-text-field>
                    <v-btn depressed block @click="sendLogin()" large color="primary" :disabled="disabled" v-text="$ml.get('views.login')"></v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
export default {

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
                        title: 'Login Successful!',
                        text: "You got redirected to your Dashboard"
                    });
                    vm.$router.push('/dashboard');
                }).catch(function (error) {
                    vm.$notify({
                        group: 'default',
                        type: 'error',
                        title: 'Something went wrong',
                        text: "Login was not Successful. Did you create an Account yet?"
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
                password: 'Vera@0291'
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

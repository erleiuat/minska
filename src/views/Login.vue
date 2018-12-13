<template>
    <v-container>
        <v-form v-model="rules.valid" ref="registrationForm">
            <v-layout justify-center row wrap>
                <v-flex xs6 sm6 md6>
                    <h1>Login</h1>
                    <v-text-field label="E-Mail" v-model="formdata.email" :rules="rules.email" outline></v-text-field>
                    <v-text-field label="Password" v-model="formdata.password" outline :rules="rules.pass" :type="'password'"></v-text-field>
                    <v-btn depressed block @click="sendLogin()" large color="primary" :disabled="disabled">Login</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
import { mapActions  } from 'vuex'

export default {

    created(){
        if(this.$store.state.authenticated){
            this.$router.push('/dashboard')
        }
    },

    methods: {
        ...mapActions([
            'login'
        ]),
        sendLogin(){
            this.$refs.registrationForm.validate()
            if(this.$data.rules.valid){
                this.$data.disabled=true;
                this.axios.post('http://localhost/minska/minska-api/api/user/login/', this.$data.formdata)
                .then(response =>(
                    this.$cookie.set('jwt', response.data.jwt, 1),
                    this.$store.dispatch('login'),
                    this.$notify({
                        group: 'popup',
                        type: 'success',
                        title: 'Login Successful!',
                        text: "You got redirected to your Dashboard"
                    }),
                    this.$router.push('/dashboard')
                ))
                .catch(error =>(
                    this.$notify({
                        group: 'popup',
                        type: 'error',
                        title: 'Something went wrong',
                        text: "Login was not Successful. Did you create an Account yet?"
                    }),
                    this.disabled=false
                    ));

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

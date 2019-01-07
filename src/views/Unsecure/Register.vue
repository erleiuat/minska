<template>
    <v-container grid-list-md >
        <v-layout justify-center row wrap>
            <v-flex xs10>
                <v-form v-model="rules.valid" ref="registrationForm">
                    <v-layout justify-center row wrap>

                        <v-flex xs12 >
                            <p>

                            </p>
                        </v-flex>
                        <v-flex xs12 >
                            <h1 class="text-xs-center" v-text="$ml.get('views.register')"></h1>
                        </v-flex>

                        <v-flex xs4>
                            <v-text-field :label="$ml.get('general.firstname')" v-model="formdata.firstname" :rules="rules.name" outline></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field :label="$ml.get('general.lastname')" v-model="formdata.lastname" :rules="rules.name" outline></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field :label="$ml.get('general.mail')" v-model="formdata.email" :rules="rules.email" outline></v-text-field>
                        </v-flex>

                        <v-flex xs6>
                            <v-text-field :label="$ml.get('general.password')" v-model="formdata.password" outline :rules="rules.pass" :type="'password'"></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field :label="$ml.get('general.repeat')" outline :rules="rules.pass2" :type="'password'"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn depressed block @click="sendRegistration()" large color="primary" :disabled="disabled" v-text="$ml.get('views.register')">Register</v-btn>
                        </v-flex>

                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {

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
                        title: 'Account created!',
                        text: "You can now login to your Account"
                    });
                    vm.$router.push('/login');
                }).catch(function (error) {
                    vm.$notify({
                        group: 'default',
                        type: 'error',
                        title: 'Something went wrong',
                        text: "Your Account couldn't be created."
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
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
                ],
                email: [
                (v) => !!v || 'E-mail is required',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                pass: [
                (v) => !!v || 'Password is required',
                (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 'Password not strong enough'
                ],
                pass2: [
                (v) => !!v || 'Please repeat your password',
                (v) => v == this._data.formdata.password || "Passwords don't match",
                ]
            }
        }
    }

}
</script>

<style scoped>

</style>

<template>
    <v-container grid-list-md>
        <h1 v-text="$ml.get('views.settings')"></h1>
        <v-form v-model="rules.valid" ref="settingsForm">
            <v-layout row wrap>

                <v-flex xs12>
                    <v-select v-model="formdata.language" :items="items" item-text="text" item-value="value" :label="$ml.get('general.language')" required></v-select>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex sm6>
                    <v-text-field :label="$ml.get('general.firstname')" v-model="formdata.firstname" :rules="rules.name" outline></v-text-field>
                </v-flex>
                <v-flex sm6>
                    <v-text-field :label="$ml.get('general.lastname')" v-model="formdata.lastname" :rules="rules.name" outline></v-text-field>
                </v-flex>
                <v-flex sm6>
                    <v-text-field :label="$ml.get('general.password')" v-model="formdata.password" outline :rules="rules.pass" :type="'password'"></v-text-field>
                </v-flex>
                <v-flex sm6>
                    <v-text-field :label="$ml.get('general.repeat')" outline :rules="rules.pass2" :type="'password'"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-btn depressed block @click="changeUser()" large color="primary" :disabled="disabled" v-text="$ml.get('general.save')">Register</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: 'settings',
    components: {

    },

    methods: {

        changeUser(){

            var vm = this;
            vm.axiosPost({
                url:'user/update/',
                data: {
                    jwt: this.$store.state.user.auth.token
                }
            }).then(function (response) {
                vm.$store.commit('changeLanguage', vm.$data.select);
            }).catch(function (error) {
                vm.$notify({
                    group: 'default',
                    type: 'error',
                    title: 'Something went wrong',
                    text: "There was an Error. This could have an impact on the Apps behaviour"
                });
            });

        },

        updateSelection(){
            var langItems = [];
            for(var item in this.$ml.list){
                langItems.push({
                    text: this.$ml.get('languages.'+this.$ml.list[item]),
                    value: this.$ml.list[item]
                });
            }
            this.$data.items = langItems;
        }
    },

    beforeMount() {

        this.updateSelection();
        this.$store.watch((state)=>{
            return this.$store.state.user.info.language
        },(newValue, oldValue)=>{
            if(newValue !== oldValue){
                if(this.$store.state.user.info.language){
                    this.updateSelection();
                }
            }
        });

    },

    data() {
        return {

            disabled: true,
            items: [],

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
            },

            formdata: {
                language: this.$store.state.user.info.language,
                firstname: this.$store.state.user.info.firstname,
                lastname: this.$store.state.user.info.lastname,
                password: null
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

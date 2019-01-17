<template>
    <v-container grid-list-xs pa-1>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" scrollable max-width="600px">
            <v-btn color="primary" slot="activator" fab small dark>
                <v-icon>search</v-icon>
            </v-btn>
            <v-card>
                <v-card-title>Select Calorie</v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                    <v-flex xs12 pa-1 v-for="item in items">
                        <v-hover>
                        <v-card @click="useItem(item)" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                            <v-layout>
                                <v-flex xs5>
                                    <v-img :src="image(item.image)" height="125px"></v-img>
                                </v-flex>
                                <v-flex xs7>
                                    <v-card-title primary-title>
                                        <div>
                                            <div class="headline">{{item.title}}</div>
                                            <div>Calories per 100 g/ml: {{item.calories}}</div>
                                            <div>Default Amount: {{item.amount}} g/ml</div>
                                        </div>
                                    </v-card-title>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-hover>
                    </v-flex>
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
    </v-container>
</template>

<script>
export default {

    name: 'CalorieSearch',
    data(){
        return {
            dialog: false,

        }
    },

    methods: {
        image(image){
            if(image !== ''){
                return image;
            } else {
                return require('@/media/defaultFood.jpg');
            }
        },
        useItem(item){
            this.$data.dialog = false;
            this.$emit('useItem', item);
        }
    },

    computed: {
        items(){
            if(!this.$store.state.content.templates){
                var vm = this;
                vm.axiosPost({
                    url:'template/read/',
                    data: {
                        token: this.$store.state.auth.token
                    },
                }).then(function(response) {
                    vm.$store.state.content.templates = response.data.content;
                }).catch(function (error) {
                    /** Deactivated bc too much
                    vm.$notify({
                        group: 'default',
                        type: 'warning',
                        title: vm.$t('alerts.empty.title'),
                        text: vm.$t('alerts.empty.text')
                    });
                    **/
                }).then(function(){
                    vm.$data.loading = false;
                });
            }

            return this.$store.state.content.templates;
        }
    },

}
</script>

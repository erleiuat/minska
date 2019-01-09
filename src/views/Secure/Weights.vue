<template>
    <v-container grid-list-md>

        <WeightAdder v-model="newWeight"/>

        <h1 v-text="$t('views.weights')"></h1>

        <v-data-table :headers="headers" :items="weights" :loading="loading" :rows-per-page-items="[10,20,30]" class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.number }}</td>
                <td>{{ props.item.weight }}</td>
                <td>{{ props.item.measuredate }}</td>
                <td>{{ props.item.creationdate }}</td>
                <td class="text-xs-center">
                    <v-icon small @click="deleteWeight(props.item)">
                        delete
                    </v-icon>
                </td>
            </template>
        </v-data-table>

    </v-container>
</template>

<script>
import WeightAdder from '@/components/Secure/Adder/Weight'

export default {

    name: 'weights',
    components: {
        WeightAdder
    },

    methods: {

        deleteWeight(item){

            var vm = this;
            var postdata = {
                id: item.id,
                jwt: this.$store.state.user.auth.token
            }

            vm.axiosPost({

                url:'weight/delete/',
                data: postdata,

            }).then(function(response) {

                const index = vm.weights.indexOf(item);
                vm.weights.splice(index, 1);
                vm.$notify({
                    group: 'default',
                    type: 'success',
                    title: vm.$t('alerts.saved'),
                    text: vm.$t('alerts.savedMsg')
                });

            }).catch(function (error) {

                vm.$notify({
                    group: 'default',
                    type: 'error',
                    title: vm.$t('alerts.error'),
                    text: vm.$t('alerts.errorMsg')
                });

            });

        },

        updateTable(){
            var vm = this;
            vm.axiosPost({

                url:'weight/read/all/',
                data: {jwt: this.$store.state.user.auth.token},

            }).then(function(response) {

                vm.$data.loading = false;
                vm.$data.weights = response.data.records;

            }).catch(function (error) {

                vm.$notify({
                    group: 'default',
                    type: 'error',
                    title: vm.$t('alerts.error'),
                    text: vm.$t('alerts.errorMsg')
                });
                vm.$data.loading = false;

            });
        }

    },

    mounted(){

        this.updateTable();

    },

    data(){
        return {

            newWeight: false,
            loading: true,
            weights: [],
            headers: [
                {
                    text: '#',
                    align: 'left',
                    value: 'number'
                },
                { text: 'Weight', value: 'weight' },
                { text: 'Measure Date', value: 'measuredate' },
                { text: 'Created', value: 'creationdate' },
                { text: 'Actions', value: 'null'}
            ],

        }
    },

    watch: {
        newWeight: {
            handler: function() {
                this.updateTable();
                this.$data.newWeight = false;
            },
            deep: true
        }
    }

}
</script>

<template>
    <v-container grid-list-md>

        <h1 v-text="$t('weight')"></h1>

        <v-layout row>
            <v-flex md4>
                <WeightAdder v-model="newWeight"/>
            </v-flex>
            <v-flex md8>
                <Chart :chartValues="weights" xData="measuredate" yData="weight"/>
            </v-flex>
        </v-layout>

        <h1 v-text="$t('allEntries')"></h1>

        <v-data-table :rows-per-page-text="$t('rows')" :no-data-text="$t('alerts.empty.title')" :headers="headers" :items="weights" :loading="loading" :rows-per-page-items="[10,20,30]" class="elevation-1">
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
import Chart from '@/components/Secure/Chart'

export default {

    name: 'Weight',
    components: {
        WeightAdder,
        Chart
    },
    i18n: {
        messages: {
            en: {
                allEntries: 'All Entries',
                weight: 'Weight',
                measuredate: 'Measure Date',
                created: 'Created',
                actions: 'Actions',
                rows: 'Rows per page:'
            },
            de: {
                allEntries: 'Alle Einträge',
                weight: 'Gewicht',
                measuredate: 'Gemessen',
                created: 'Hinzugefügt',
                actions: 'Aktionen',
                rows: 'Einträge pro Seite:'
            }
        }
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
                    title: vm.$t('alerts.error.title'),
                    text: vm.$t('alerts.error.text')
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
                if(response.status === 204){
                    vm.$notify({
                        group: 'default',
                        type: 'warning',
                        title: vm.$t('alerts.empty.title'),
                        text: vm.$t('alerts.empty.text')
                    });
                } else {
                    vm.$data.weights = response.data;
                }
            }).catch(function (error) {
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
            { text: '#', align: 'left', value: 'number' },
            { text: this.$t('weight'), value: 'weight' },
            { text: this.$t('measuredate'), value: 'measuredate' },
            { text: this.$t('created'), value: 'creationdate' },
            { text: this.$t('actions'), value: 'null'}
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

<template>
    <v-container grid-list-md pa-0>
        <v-layout row wrap>
            <v-flex xs12>
                <h1 v-text="$t('weight')"></h1>
            </v-flex>

            <v-flex xs12>
                <Chart :chartValues="weights" xData="measuredate" yData="weight"/>
            </v-flex>

            <v-flex xs12>
                <v-divider></v-divider>
                <h1 v-text="$t('allEntries')"></h1>
            </v-flex>

            <v-flex xs12>
                <v-data-table :rows-per-page-text="$t('rows')" :no-data-text="$t('alerts.empty.title')" :headers="headers" :items="weights" :loading="loading" :rows-per-page-items="[10,20,30]" class="elevation-1">
                    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.number }}</td>
                        <td>{{ props.item.weight }}</td>
                        <td>{{ props.item.measuredate }}</td>
                        <td class="text-xs-center">
                            <v-icon small @click="deleteItem(props.item)">
                                delete
                            </v-icon>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import Chart from '@/components/Secure/Chart'

export default {

    name: 'Weight',
    components: {
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

    mounted() {
        if(!this.$store.state.content.weights){
            var vm = this;
            vm.axiosPost({
                url:'weight/read/all/',
                data: {
                    jwt: this.$store.state.auth.token
                },
            }).then(function(response) {
                vm.$store.state.content.weights = response.data.content;
            }).catch(function (error) {
                vm.$notify({
                    group: 'default',
                    type: 'warning',
                    title: vm.$t('alerts.empty.title'),
                    text: vm.$t('alerts.empty.text')
                });
            }).then(function(){
                vm.$data.loading = false;
            });
        }
    },

    methods: {
        deleteItem(item){
            var vm = this;
            vm.axiosPost({
                url:'weight/delete/',
                data: {
                    id: item.id,
                    jwt: this.$store.state.auth.token,
                },
            }).then(function(response) {
                const index = vm.weights.indexOf(item);
                vm.$store.state.content.weights.splice(index, 1);
                vm.$notify({
                    group: 'default',
                    type: 'success',
                    title: vm.$t('alerts.success.title'),
                    text: vm.$t('alerts.success.text')
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
    },

    data(){
        return {
            loading: true,
            headers: [
            { text: '#', align: 'left', value: 'number' },
            { text: this.$t('weight'), value: 'weight' },
            { text: this.$t('measuredate'), value: 'measuredate' },
            { text: this.$t('actions'), value: 'null'}
            ],
        }
    },

    computed: {
        weights(){
            if(this.$store.state.content.weights){
                this.$data.loading = false;
                return this.$store.state.content.weights;
            } else {
                return [];
            }
        }
    }

}
</script>

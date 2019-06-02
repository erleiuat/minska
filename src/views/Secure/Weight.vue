<template>
    <v-container grid-list-md pa-0>
        <v-layout row wrap>
            <v-flex xs12 pa-2 class="display-1 text-xs-center text-md-left">
                {{ $t('weight') }}
            </v-flex>

            <WeightChart :weights="weights" />

            <v-flex xs12>
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 pa-2 class="headline text-xs-center text-md-left">
                {{ $t('allEntries') }}
            </v-flex>

            <v-flex xs12>
                <v-data-table :rows-per-page-text="$t('rows')" :no-data-text="$t('alerts.empty.title')" :headers="headers" :items="weights" :loading="loading" :rows-per-page-items="[10,20,30]" class="elevation-1">
                    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.weight }}</td>
                        <td>{{ formatted(props.item.measuredate) }}</td>
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
import WeightChart from '@/components/Secure/WeightChart'

export default {

    name: 'Weight',
    components: {
        WeightChart
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

    mounted () {
        if (!this.$store.state.content.weights) {
            var vm = this
            vm.$http.get('weight/read/').then(function (response) {
                vm.$store.state.content.weights = response.data.content
            }).catch(function () {
                //vm.$notify({ type: 'warning', title: vm.$t('alerts.empty.title'), text: vm.$t('alerts.empty.text') })
            }).then(function () {
                vm.$data.loading = false
            })
        } else {
            this.$data.loading = false
        }
    },

    methods: {
        deleteItem (item) {
            var vm = this
            vm.$http.post('weight/delete/', { id: item.id })
                .then(function (response) {
                    const index = vm.weights.indexOf(item)
                    vm.$store.state.content.weights.splice(index, 1)
                    vm.$notify({ type: 'success', title: vm.$t('alerts.success.title'), text: vm.$t('alerts.success.text') })
                }).catch(function () {
                    vm.$notify({ type: 'error', title: vm.$t('alerts.error.title'), text: vm.$t('alerts.error.text') })
                })
        },
        formatted (date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${day}.${month}.${year}`
        }
    },

    data () {
        return {
            loading: true,
            headers: [
                { text: this.$t('weight'), value: 'weight' },
                { text: this.$t('measuredate'), value: 'measuredate' },
                { text: this.$t('actions'), value: 'null' }
            ]
        }
    },

    computed: {
        weights () {
            if (this.$store.state.content.weights) {
                return this.$store.state.content.weights
            } else {
                return []
            }
        }
    }

}
</script>

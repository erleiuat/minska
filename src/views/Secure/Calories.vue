<template>
    <v-container grid-list-md pa-0>
        <v-layout row wrap>

            <v-flex xs12>
                <v-layout row>
                    <v-flex xs12>
                        <h1>{{ $t('calories')}}</h1>
                        <i>{{ $t('allEntries') }}</i>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-btn fab small @click="prevDay()">
                        <v-icon>keyboard_arrow_left</v-icon>
                    </v-btn>
                    <v-menu offset-y>
                        <v-btn slot="activator">
                            {{ active.format }}
                        </v-btn>
                        <v-list>
                            <v-list-tile v-for="(date, index) in dates" :key="index" @click="getDay(date)">
                                <v-list-tile-title>{{ date.format }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                    <v-btn fab small @click="nextDay()">
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                </v-layout>
            </v-flex>

            <v-flex xs12>
                <v-data-table :rows-per-page-text="$t('rows')" :no-data-text="$t('alerts.empty.title')" :headers="headers" :items="calories" :loading="loading" :rows-per-page-items="[10,20,30]" class="elevation-1">
                    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.title }}</td>
                        <td>{{ props.item.calories }}</td>
                        <td>{{ props.item.amount }}</td>
                        <td>{{ Math.round(props.item.amount/100*props.item.calories) }}</td>
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
import CalorieAdder from '@/components/Secure/Adder/Calorie'

export default {

    name: 'Weight',
    components: {
        CalorieAdder
    },
    i18n: {
        messages: {
            en: {
                calories: 'Calories',
                allEntries: 'All Entries',
                amount: 'Amount',
                title: 'Title',
                total: 'Total',
                actions: 'Actions',
                rows: 'Rows per page:'
            },
            de: {
                calories: 'Kalorien',
                allEntries: 'Alle Einträge',
                amount: 'Menge',
                title: 'Titel',
                total: 'Total',
                actions: 'Aktionen',
                rows: 'Einträge pro Seite:'
            }
        }
    },

    methods: {

        deleteItem (item) {
            var vm = this
            vm.axiosPost({
                url: 'calorie/delete/',
                data: {
                    id: item.id,
                    token: this.$store.state.auth.token
                }
            }).then(function (response) {
                const index = vm.$data.calories.indexOf(item)
                vm.$data.calories.splice(index, 1)
                if (vm.$store.state.content.calories && vm.$data.active.date == new Date().toISOString().split('T')[0]) {
                    vm.$store.state.content.calories.splice(index, 1)
                }
                vm.$notify({
                    group: 'default',
                    type: 'success',
                    title: vm.$t('alerts.success.title'),
                    text: vm.$t('alerts.success.text')
                })
            }).catch(function (error) {
                vm.$notify({
                    group: 'default',
                    type: 'error',
                    title: vm.$t('alerts.error.title'),
                    text: vm.$t('alerts.error.text')
                })
            })
        },

        prevDay () {
            var vm = this
            var currentIndex = (this.$data.dates.findIndex(function (element) {
                return element == vm.$data.active
            }))
            if (currentIndex !== 0) {
                vm.getDay(vm.$data.dates[currentIndex - 1])
            }
        },

        nextDay () {
            var vm = this
            var currentIndex = (this.$data.dates.findIndex(function (element) {
                return element == vm.$data.active
            }))
            if (currentIndex < vm.$data.dates.length - 1) {
                vm.getDay(vm.$data.dates[currentIndex + 1])
            }
        },

        getDay (date) {
            var vm = this
            if (!vm.$store.state.content.calories || date.date !== new Date().toISOString().split('T')[0]) {
                vm.$data.loading = true
                vm.axiosPost({
                    url: 'calorie/read/byDay/',
                    data: {
                        token: this.$store.state.auth.token,
                        date: date.date
                    }
                }).then(function (response) {
                    vm.$data.calories = response.data.content
                    vm.$data.loading = false
                }).catch(function (error) {
                    vm.$notify({
                        group: 'default',
                        type: 'warning',
                        title: vm.$t('alerts.empty.title'),
                        text: vm.$t('alerts.empty.text')
                    })
                    vm.$data.loading = false
                })
            } else if (this.$store.state.content.calories) {
                vm.$data.calories = vm.$store.state.content.calories
            }

            vm.$data.active = date
        },

        getDates () {
            var vm = this
            vm.axiosPost({
                url: 'calorie/read/days/',
                data: { token: this.$store.state.auth.token }
            }).then(function (response) {
                var tmpDates = []
                response.data.content.forEach(function (item) {
                    const [year, month, day] = item.date.split('-')
                    var formatted = `${day}.${month}.${year}`
                    tmpDates.push({
                        date: item.date, format: formatted
                    })
                })
                vm.$data.dates = tmpDates
                if (!vm.$data.active.date) {
                    vm.getDay(tmpDates[0])
                }
            }).catch(function (error) {
                vm.$notify({
                    group: 'default',
                    type: 'warning',
                    title: vm.$t('alerts.empty.title'),
                    text: vm.$t('alerts.empty.text')
                })
            }).then(function () {
                vm.$data.loading = false
            })
        }

    },

    mounted () {
        this.getDates()
    },

    data () {
        return {
            active: { date: null, format: null },
            loading: true,
            dates: [],
            calories: [],
            headers: [
                { text: this.$t('title'), value: 'title' },
                { text: this.$t('calories'), value: 'calories' },
                { text: this.$t('amount'), value: 'amount' },
                { text: this.$t('total'), value: 'total' },
                { text: this.$t('actions'), value: null }
            ]
        }
    }

}
</script>

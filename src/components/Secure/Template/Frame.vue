<template>
    <v-card v-if="item">
        <v-img :lazy-src="require('@/assets/loadingFood.jpg')" :src="image" height="300px">
            <v-layout column fill-height>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn dark icon class="mr-3">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn dark icon>
                        <v-icon @click="remove(item)">delete</v-icon>
                    </v-btn>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-title class="white--text pt-5">
                    <div class="display-1 pl-3 pt-5">
                        {{item.title}}
                    </div>
                </v-card-title>
            </v-layout>
        </v-img>
        <v-list>
            <v-list-tile >
                <v-list-tile-content>
                    <v-list-tile-sub-title>{{$t('defaultAmount')}}</v-list-tile-sub-title>
                    <v-list-tile-title>{{item.amount}} g/ml</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content>
                    <v-list-tile-sub-title>{{$t('caloriesPer')}}</v-list-tile-sub-title>
                    <v-list-tile-title>{{item.calories}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile >
                <v-list-tile-content>
                    <v-list-tile-sub-title>{{$t('total')}} {{ Math.round(item.amount/100*item.calories) }} Kcal</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
export default {

    name: 'Frame',
    props: {
        item: Object
    },

    i18n: {
        messages: {
            en: {
                caloriesPer: 'Calories per 100 g/ml',
                defaultAmount: 'Default Amount',
                clickHere: 'Click here or drop Image to upload',
                addTemplate: 'Add Template',
                total: 'Total'
            },
            de: {
                caloriesPer: 'Kalorien pro 100 g/ml',
                defaultAmount: 'Standartmenge',
                clickHere: 'Klick hier oder ziehe ein Bild hierher um es hochzuladen',
                addTemplate: 'Vorlage hinzufügen',
                total: 'Insgesamt'
            }
        }
    },

    methods: {
        remove (item) {
            var vm = this
            vm.$http.post('template/delete/', { id: item.id })
                .then(function (response) {
                    const index = vm.$store.state.content.templates.indexOf(item)
                    vm.$store.state.content.templates.splice(index, 1)
                    vm.$notify({ type: 'success', title: vm.$t('alerts.success.title'), text: vm.$t('alerts.success.text') })
                }).catch(function () {
                    vm.$notify({ type: 'warning', title: vm.$t('alerts.error.title'), text: vm.$t('alerts.error.text') })
                }).then(function () {
                    vm.$data.loading = false
                })
        }
    },
    computed: {
        image () {
            if (this.item.image === null || this.item.image === '') {
                return require('@/assets/defaultFood.jpg')
            } else {
                return this.item.image
            }
        }
    }

}
</script>

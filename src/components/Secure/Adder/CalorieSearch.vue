<template>
    <v-container grid-list-xs pa-1>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" scrollable max-width="600px">
                <v-btn aria-label="Select" color="primary" slot="activator" fab small dark>
                    <v-icon>unarchive</v-icon>
                </v-btn>
                <v-card>
                    <v-card-title>{{$t('select')}}</v-card-title>
                    <v-divider></v-divider>

                    <v-card-text>
                        <v-flex xs12 pa-1 v-for="item in items" :key="item.id">
                            <v-hover>
                                <v-card @click="useItem(item)" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                                    <v-layout>
                                        <v-flex xs3 sm5>
                                            <v-img :lazy-src="require('@/assets/loadingFood.jpg')" :src="image(item.image)" height="100%">
                                                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                </v-layout>
                                            </v-img>
                                        </v-flex>
                                        <v-flex xs9 sm6>
                                            <v-card-title primary-title>
                                                <div>
                                                    <div class="headline">{{item.title}}</div>
                                                    <div>{{$t('caloriesPer')}} <b>{{item.calories}}</b></div>
                                                    <div>{{$t('defaultAmount')}} <b>{{item.amount}}</b> g/ml</div>
                                                    <div>{{$t('total')}} <b>{{ Math.round(item.amount/100*item.calories) }}</b> Kcal</div>
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
                        <v-btn color="blue darken-1" flat @click="dialog = false">{{$t('close')}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
export default {

    name: 'CalorieSearch',
    data () {
        return {
            dialog: false

        }
    },

    i18n: {
        messages: {
            en: {
                caloriesPer: 'Calories per 100 g/ml:',
                defaultAmount: 'Default Amount (g/ml):',
                select: 'Select Template',
                close: 'Close',
                total: 'Total'
            },
            de: {
                caloriesPer: 'Kalorien pro 100 g/ml:',
                defaultAmount: 'Standartmenge:',
                select: 'Vorlage auswählen',
                close: 'Schliessen',
                total: 'Insgesamt'
            }
        }
    },

    mounted () {
        if (!this.$store.state.content.templates) {
            var vm = this

            vm.$http.get('template/read/')
                .then(function (response) {
                    vm.$store.state.content.templates = response.data.content
                }).catch(function () {
                }).then(function () {
                    vm.$data.loading = false
                })
        } else {
            this.$data.loading = false
        }
    },

    methods: {
        image (image) {
            if (image !== '') {
                return image
            } else {
                return require('@/assets/defaultFood.jpg')
            }
        },
        useItem (item) {
            this.$data.dialog = false
            this.$emit('useItem', item)
        }
    },

    computed: {
        items () {
            if (this.$store.state.content.templates) {
                return this.$store.state.content.templates
            } else {
                return []
            }
        }
    }

}
</script>

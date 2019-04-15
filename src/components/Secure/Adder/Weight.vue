<template>
    <v-container grid-list-sm pa-1>
        <v-card>

            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ $t('title') }}</div>
                    <span class="grey--text text--darken-3">{{ $t('subtitle') }}</span>
                </div>
            </v-card-title>

            <v-card-text>
                <v-form v-model="rules.valid" ref="addWeightForm">
                    <v-layout row wrap>

                        <v-flex sm12>
                            <v-text-field :label="$t('weight')" v-model="formdata.weight" :rules="rules.weight" type="number" outline></v-text-field>
                        </v-flex>

                        <v-flex sm12>
                            <v-menu :close-on-content-click="false" v-model="dateMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                <v-text-field readonly slot="activator" :label="$t('date')" v-model="computedDateFormatted" :rules="rules.date" outline></v-text-field>
                                <v-date-picker v-model="formdata.date" @input="dateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-flex>

                        <v-flex xs12>
                            <v-btn :loading="loading" :disabled="disabled" large block color="primary" @click="addWeight()">
                                {{ $t('add') }}
                                <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                </span>
                            </v-btn>
                        </v-flex>

                    </v-layout>
                </v-form>
            </v-card-text>

        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'WeightAdder',

    i18n: {
        messages: {
            en: {
                title: 'Add Weight',
                subtitle: 'Enter your weight to get relevant Facts',
                weight: 'Weight (Kg)',
                add: 'Add',
                date: 'Date'
            },
            de: {
                title: 'Gewicht hinzufügen',
                subtitle: 'Notiere dein Gewicht um nützliche Fakten und Kalorienangaben zu erhalten',
                weight: 'Gewicht (Kg)',
                add: 'Hinzufügen',
                date: 'Datum'
            }
        }
    },

    methods: {
        addWeight () {
            this.$refs.addWeightForm.validate()
            if (this.$data.rules.valid) {
                var vm = this
                var postData = vm.$data.formdata
                vm.$data.disabled = true
                vm.$data.loading = true

                vm.$http.post('weight/create/', postData)
                    .then(function (response) {
                        var tmp = {
                            id: response.data.content,
                            measuredate: vm.$data.formdata.date,
                            weight: vm.$data.formdata.weight
                        }

                        if (!vm.$store.state.content.weights || vm.$store.state.content.weights.lenght < 1) {
                            vm.$store.state.content.weights = []
                        }

                        vm.$store.state.content.weights.unshift(tmp)
                        vm.$data.formdata.weight = null
                        vm.$refs.addWeightForm.resetValidation()
                        vm.$data.loading = false

                        vm.$notify({ type: 'success', title: vm.$t('alerts.success.title'), text: vm.$t('alerts.success.text') })
                    }).catch(function () {
                        vm.$notify({ type: 'error', title: vm.$t('alerts.error.title'), text: vm.$t('alerts.error.text') })
                        vm.$data.disabled = false
                        vm.$data.loading = false
                    })
            }
        }
    },

    computed: {
        computedDateFormatted: {
            get () {
                if (!this.$data.formdata.date) return null
                const [year, month, day] = this.$data.formdata.date.split('-')
                return `${day}.${month}.${year}`
            },
            set () {
            }
        }
    },

    data () {
        var tmp = new Date()
        return {
            disabled: true,
            loading: false,
            dateMenu: false,
            formdata: {
                weight: null,
                date: tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate()
            },
            rules: {
                valid: true,
                date: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && new Date(this.$data.formdata.date) !== 'Invalid Date' || this.$t('errors.valid')
                ],
                weight: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && v <= 500 && v >= 30 || this.$t('errors.valid')
                ]
            }
        }
    },

    watch: {
        'formdata': {
            handler: function (val, oldVal) {
                if (val.weight && val.date) {
                    this.disabled = false
                }
            },
            deep: true
        }
    }

}
</script>

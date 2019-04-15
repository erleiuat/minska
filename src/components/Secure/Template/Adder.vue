<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

        <v-btn slot="activator" color="primary" fab small dark>
            <v-icon>add</v-icon>
        </v-btn>

        <v-card>

            <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{$t('addTemplate')}}</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-container grid-list-md pa-0>
                    <v-layout justify-center row wrap>
                        <v-flex xs12 sm8 md6>
                            <v-form ref="adderForm">
                                <v-layout justify-center row wrap>
                                    <v-flex xs12>
                                        <v-subheader>{{$t('addNew')}}</v-subheader>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field v-model="formdata.title" :rules="rules.text" :label="$t('title')" outline></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <v-text-field v-model="formdata.calories" :rules="rules.number" :label="$t('caloriesPer')" outline></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <v-text-field v-model="formdata.amount" :rules="rules.number" :label="$t('defaultAmount')" outline></v-text-field>
                                    </v-flex>

                                    <input type="file" name="img" ref="uploadfield" @change="filesChange($event.target.name, $event.target.files)" accept="image/*" class="input-file">

                                    <v-flex xs12 v-if="!formdata.image">
                                        <v-btn :loading="loading1" large block @click="$refs.uploadfield.click()">
                                            {{ $t('clickHere') }}
                                            <v-icon right dark>cloud_upload</v-icon>
                                        </v-btn>

                                    </v-flex>

                                    <v-flex v-if="formdata.image" xs12>
                                        <div class="text-xs-center">
                                            <h4>Image</h4>
                                            <v-img :src="formdata.image" max-height="500" contain></v-img>
                                            <v-btn @click="reset()">{{$t('retry')}}</v-btn>
                                        </div>
                                    </v-flex>

                                    <v-flex xs12>

                                        <v-btn :loading="loading2" :disabled="disabled" depressed block large color="primary" @click="addTemplate()">
                                            {{ $t('addTemplate') }}
                                            <span slot="loader" class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                            </span>
                                        </v-btn>

                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>

<script>
export default {

    name: 'Adder',
    components: {

    },

    i18n: {
        messages: {
            en: {
                addNew: 'Add a new Template to be used as calorie',
                title: 'Title',
                caloriesPer: 'Calories per 100 g/ml',
                defaultAmount: 'Default Amount (g/ml)',
                clickHere: 'Upload Image',
                addTemplate: 'Add Template',
                retry: 'Try Again',
                uperr: {
                    title: 'Error while uploading',
                    text: 'The image you selected is invalid. Check its type and size.'
                }
            },
            de: {
                addNew: 'Füge eine neue Vorlage hinzu um sie später auswählen zu können',
                title: 'Titel',
                caloriesPer: 'Kalorien pro 100 g/ml',
                defaultAmount: 'Standartmenge (g/ml)',
                clickHere: 'Bild hochladen',
                addTemplate: 'Vorlage hinzufügen',
                retry: 'Erneut versuchen',
                uperr: {
                    title: 'Fehler beim Hochladen',
                    text: 'Das Bild ist fehlerhaft. Überprüfe den Dateityp und die Grösse.'
                }
            }
        }
    },

    methods: {

        reset () {
            this.uploadedFiles = []
            this.formdata.image = false
        },

        filesChange (fieldName, fileList) {
            var vm = this
            vm.$data.loading1 = true
            const formData = new FormData()
            if (!fileList.length) { return };
            formData.append(fieldName, fileList[0], fileList[0].name)
            vm.$http.post('template/create/upload/', formData)
                .then(function (response) {
                    var path = response.config.baseURL + 'template/read/thumbnails/' + response.data.content
                    vm.$data.formdata.image = path
                    vm.$data.loading1 = false
                }).catch(function () {
                    vm.$notify({ type: 'error', title: vm.$t('uperr.title'), text: vm.$t('uperr.text') })
                    vm.$data.loading1 = false
                })
        },

        addTemplate () {
            var vm = this

            if (vm.$refs.adderForm.validate()) {
                vm.$data.disabled = true
                vm.$data.loading2 = true

                vm.$http.post('template/create/', vm.$data.formdata)
                    .then(function (response) {
                        if (!vm.$store.state.content.templates || vm.$store.state.content.templates.lenght < 1) {
                            vm.$store.state.content.templates = []
                        }

                        if (!vm.$data.formdata.image) {
                            vm.$store.state.content.templates.unshift({
                                id: response.data.content,
                                title: vm.$data.formdata.title,
                                calories: vm.$data.formdata.calories,
                                amount: vm.$data.formdata.amount
                            })
                        } else {
                            vm.$store.state.content.templates.unshift({
                                id: response.data.content,
                                title: vm.$data.formdata.title,
                                calories: vm.$data.formdata.calories,
                                amount: vm.$data.formdata.amount,
                                image: vm.$data.formdata.image
                            })
                        }

                        vm.$data.dialog = false
                        vm.$refs.adderForm.reset()
                        vm.reset()
                        vm.$data.disabled = false
                        vm.$data.loading2 = false

                        vm.$notify({ type: 'success', title: vm.$t('alerts.success.title'), text: vm.$t('alerts.success.text') })
                    }).catch(function () {
                        vm.$notify({ type: 'error', title: vm.$t('alerts.error.title'), text: vm.$t('alerts.error.text') })
                        vm.$data.disabled = false
                        vm.$data.loading2 = false
                    })
            }
        }

    },

    data () {
        return {
            uploadedFiles: [],
            dialog: false,
            loading1: false,
            loading2: false,
            disabled: false,
            formdata: {
                title: null,
                calories: null,
                amount: null,
                image: null
            },
            rules: {
                valid: false,
                text: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && v.length <= 100 || this.$t('errors.valid')
                ],
                number: [
                    (v) => !!v || this.$t('errors.required'),
                    (v) => v && v <= 9999 && v >= 0 || this.$t('errors.valid')
                ]
            }
        }
    }

}
</script>

<style scoped>

    .input-file {
        opacity: 0;
        width: 1px;
        height: 1px;
    }

</style>

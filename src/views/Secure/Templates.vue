<template>
    <v-container grid-list-md pa-0>
        <v-layout row wrap>
            <v-flex xs10>
                <h1 v-text="$t('views.templates')"></h1>
            </v-flex>
            <v-flex xs2 text-xs-right>
                <v-btn fab small color="primary">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs12 sm6>
                <v-card>
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75">
                    </v-img>

                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Joghurt</h3>
                            <div>
                                Kalorien pro 100g/ml: 500<br>
                                Standartmenge: 240g/ml
                            </div>
                        </div>
                    </v-card-title>

                    <v-card-actions>
                        <v-btn icon>
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-flex xs12 sm6>
                <v-card>
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75">
                    </v-img>

                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Joghurt</h3>
                            <div>
                                Kalorien pro 100g/ml: 500<br>
                                Standartmenge: 240g/ml
                            </div>
                        </div>
                    </v-card-title>

                    <v-card-actions>
                        <v-btn icon>
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
export default {

    name: 'Templates',
    i18n: {
        messages: {
            en: {

            },
            de: {

            }
        }
    },

}
</script>

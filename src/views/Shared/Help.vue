<template>
    <v-container grid-list-md pa-0>
        <v-layout row wrap>

            <v-flex xs12>
                <h1>{{ $t('views.help') }}</h1>
            </v-flex>

            <v-flex xs12>
                <h2>{{ $t('whatsminska.title') }}</h2>
            </v-flex>
            <v-flex xs12 v-html="$t('whatsminska.text')">
            </v-flex>

            <v-flex xs12>
                <h2>{{ $t('factcards.title') }}</h2>
            </v-flex>
            <v-flex xs12 sm6>
                <h3>{{ $t('factcards.remainingdaily.title') }}</h3>
                <p v-html="$t('factcards.remainingdaily.text')">

                </p>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
export default {

    name: 'Help',
    components: {

    },

    i18n: {
        messages: {
            en: {
                whatsminska: {
                    title: 'What is Minska?',
                    text: 'Minska means <i>to loose weight</i> in swedish'
                }
            },
            de: {
                whatsminska: {
                    title: 'Was ist Minska?',
                    text: `Minska bedeutet <i>abnehmen</i> auf Schwedisch. Und genau das kannst du mit Minska ganz einfach machen.<br/>
                    Der schnellste und sinnvollste Weg um abzunehmen ist das Zählen deiner konsumierten Kalorien. Dies ist das Grundprinzip
                     aller Apps, welche dir beim Abnehmen helfen sollen. Ob dies nun in Punkten (Weightwatchers) oder direkt in Kalorien
                     geschieht, spielt dabei keine Rolle. Mit dieser Taktik <b>spielt es auch keine Rolle was du isst</b>, sondern nur wie viel.
                     Dementsprechend kannst du dir gelegentlich auch eine Kalorienbombe gönnen, solange du den täglichen Rahmen nicht sprengst.
                     <b>Sport ist streng genommen auch nicht nötig</b>, jedoch kannst du dir damit selbst den Kalorienrahmen erweitern.`
                },
                factcards: {
                    title: 'Die sogenannten Fakten',
                    remainingdaily : {
                        title: 'Verbleibend & Täglich',
                        text: `Bei diesen 2 Fakten handelt es sich um Statistiken zu deinen Kalorien. <b>Täglich</b> beschreibt dabei, wie
                        viele Kalorien du pro Tag konsumieren kannst, um dein Ziel-Gewicht an deinem Ziel-Datum zu erreichen. Diese Zahl
                        beschreibt jedoch <b>nur deinen Grundumsatz bei sehr wenig aktivität</b>. Wenn du z.B. einen Bürojob hast, und dich
                        sonst nicht zusätzlich bewegst bzw. keinen Sport betreibst, kannst du diese Zahl nutzen. Falls du aber einen körperlich
                        anstrengenden Beruf hast oder in deiner Freizeit weitere Aktivitäten ausführst, solltest du diesen zusätzlichen Kalorienverbrauch
                        berechnen und zum Grundumsatz hinzufügen. Zu wenig Kalorieneinnahme durch höheren Verbrauch kann sich auf deine Gesundheit schlecht
                        auswirken.`
                    }
                }
            }
        }
    },

}
</script>

<template>
    <v-container grid-list-md pa-0>
        <v-layout row wrap>

            <v-flex xs12>
                <h1>{{ $t('views.help') }}</h1>
            </v-flex>

            <v-tabs slider-color="primary">

                <v-tab key="whatis" ripple>
                    {{ $t('whatsminska.title') }}
                </v-tab>
                <v-tab key="facts" ripple>
                    {{ $t('factcards.title') }}
                </v-tab>
                <v-tab key="template" ripple>
                    {{ $t('templates.title') }}
                </v-tab>
                <v-tab key="impress" ripple>
                    {{ $t('impressum.title') }}
                </v-tab>

                <v-tab-item key="whatis">
                    <v-card flat>
                        <v-card-text v-html="$t('whatsminska.text')"></v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item key="facts">
                    <v-card flat>
                        <v-card-text>
                            <v-layout row wrap>
                            <v-flex xs12>
                                <h3>{{ $t('factcards.remainingdaily.title') }}</h3>
                                <p  v-html="$t('factcards.remainingdaily.text')"></p>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <h3>{{ $t('factcards.recenttotal.title') }}</h3>
                                <p  v-html="$t('factcards.recenttotal.text')"></p>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <h3>{{ $t('factcards.bmi.title') }}</h3>
                                <p  v-html="$t('factcards.bmi.text')"></p>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <h3>{{ $t('factcards.target.title') }}</h3>
                                <p  v-html="$t('factcards.target.text')"></p>
                            </v-flex>
                        </v-layout>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item key="template">
                    <v-card flat>
                        <v-card-text v-html="$t('templates.text')"></v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item key="impress">
                    <v-card flat>
                        <v-card-text v-html="$t('impressum.text')"></v-card-text>
                    </v-card>
                </v-tab-item>

            </v-tabs>

            <v-flex xs12>
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 md6>
                <h4>{{ $t('ask.title') }}</h4>
                <p v-html="$t('ask.text')"></p>
            </v-flex>

            <v-flex xs12 md6>
                <a href="https://eliareutlinger.ch">Elia Reutlinger</a><br/>
                <a href="https://github.com/eliareutlinger/minska-ui">Github</a>
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
                        title: 'Die Fakten',
                        remainingdaily : {
                            title: 'Verbleibend & Täglich',
                            text: `Bei diesen 2 Fakten handelt es sich um Statistiken zu deinen Kalorien. <b>Täglich</b> beschreibt dabei, wie
                            viele Kalorien du pro Tag konsumieren kannst, um dein Ziel-Gewicht an deinem Ziel-Datum zu erreichen. Diese Zahl
                            beschreibt jedoch <b>nur deinen Grundumsatz bei sehr wenig aktivität</b>. Wenn du z.B. einen Bürojob hast, und dich
                            sonst nicht zusätzlich bewegst bzw. keinen Sport betreibst, kannst du diese Zahl nutzen. Falls du aber einen körperlich
                            anstrengenden Beruf hast oder in deiner Freizeit weitere Aktivitäten ausführst, solltest du diesen zusätzlichen Kalorienverbrauch
                            berechnen und zum Grundumsatz hinzufügen. Zu wenig Kalorieneinnahme durch höheren Verbrauch kann sich auf deine Gesundheit schlecht
                            auswirken. Achte darauf, dass du deine Ziele so einstellst, dass dieser Wert mindestens über 900 Kalorien pro Tag beträgt.<br/>
                            <b>Vergleibend</b> beschreibt wie viele Kalorien heute noch übrig sind. Die Zahl passt sich automatisch an, wenn du weitere Kalorien
                            hinzufügst oder löscht.`
                        },
                        recenttotal : {
                            title: 'Kürzlich & Insgesamt Abgenommen',
                            text: `Der Wert unter <b>kürzlich abgenommen</b> berechnet sich aus deinen letzten 2 Einträgen. Er zeigt, wie viel du seit deinem
                            letzten Wiegen insgesamt abgenommen (oder zugenommen) hast. <br/>
                            <b>Insgesamt Abgenommen</b> berechnet sich aus deinem allerersten Eintrag und dem neusten. So siehst du immer deinen Gesamtfortschritt.`
                        },
                        target : {
                            title: 'Zum Ziel',
                            text: `Hier siehst du wie viel du noch abnehmen musst, bis du dein Zielgewicht erreicht hast.`
                        },
                        bmi : {
                            title: 'BMI',
                            text: `Der Body-Mass-Index wird gewöhnlich genutzt um das Körpergewicht zur Körpergrösse zu bewerten. Er ist jedoch lediglich ein
                            grober Richtwert, da er weder Statur noch die individuelle Zusammensetzung der Körpermasse berücksichtigt.`
                        }
                    },
                    templates: {
                        title: 'Vorlagen',
                        text: `Mit Vorlagen kannst du ganz einfach Lebensmittel, welche du häufig nutzt, zur schnellen Wiederverwendung abspeichern. Über die Lupe
                        neben dem Formular zum Eintragen kannst du deine gespeicherten Vorlagen abrufen und auswählen. Anschliessend musst du die Werte nicht mehr
                        erneut eintragen, sondern nur auf <i>Hinzufügen</i> klicken.`
                    },
                    impressum: {
                        title: 'Impressum',
                        text: `
                        <h2>Impressum</h1>
                            <h3>Kontaktadresse</h3>
                            <p>Elia Reutlinger<br/>
                                Schwarzwaldallee 33<br/>
                                4058 Basel<br/>
                                Schweiz<br/>
                                <a href="mailto:mail@eliareutlinger.ch">mail@eliareutlinger.ch</a></p>
                                <h3>Haftungsausschluss</h3>
                                <p>Der Autor übernimmt keinerlei Gewähr hinsichtlich der  inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und  Vollständigkeit der Informationen.
                                    Haftungsansprüche gegen den Autor wegen Schäden materieller  oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw.  Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der  Verbindung oder durch technische Störungen entstanden sind, werden  ausgeschlossen.</p>
                                    <p>Alle  Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile  der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern,  zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig  einzustellen.</p>
                                    <h3>Haftung für Links</h3>
                                    <p>Verweise und Links auf Webseiten  Dritter liegen ausserhalb unseres Verantwortungsbereichs Es wird jegliche Verantwortung für solche Webseiten  abgelehnt.  Der Zugriff und die Nutzung solcher Webseiten erfolgen  auf eigene Gefahr des Nutzers oder der Nutzerin. </p>
                                    <h3>Urheberrechte</h3>
                                    <p>Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich <strong>Elia Reutlinger</strong> oder den speziell genannten  Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.</p>
                                    <h3>Datenschutz</h3>
                                    <p>Gestützt auf Artikel 13 der schweizerischen Bundesverfassung  und die datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG)  hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor  Missbrauch ihrer persönlichen Daten. Wir halten diese Bestimmungen ein.  Persönliche Daten werden streng vertraulich behandelt und weder an Dritte  verkauft noch weiter gegeben.</p>
                                    <p>In enger Zusammenarbeit mit unseren Hosting-Providern  bemühen wir uns, die Datenbanken so gut wie möglich vor fremden Zugriffen, Verlusten,  Missbrauch oder vor Fälschung zu schützen.</p>
                                    <h3>Cookies</h3>
                                    <p>Diese Anwendung nutzt Cookies zur Speicherung von bestimmten Daten. Mit der Nutzung der Anwendung stimmen Sie der Speicherung von Cookies zu.</p>
                                    `
                                },
                                ask: {
                                    title: 'Fragen oder Vorschläge?',
                                    text: 'Über folgende Links können Sie Ihr Anliegen mitteilen:'
                                }
                            }
                        }
                    },

                }
            </script>

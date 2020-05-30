<template>
    <v-container grid-list-md pa-0>
        <v-layout row wrap>

            <v-flex xs12 class="display-1">
                {{ $t('views.help') }}
            </v-flex>

            <v-flex xs12>
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
            </v-flex>

            <v-flex xs12>
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 md6>
                <h4>{{ $t('ask.title') }}</h4>
                <p v-html="$t('ask.text')"></p>
            </v-flex>

            <v-flex xs12 md6>
                <a href="mailto:mail@osis.io">Osis.io (Mail us)</a><br/>
                <a href="https://github.com/eliareutlinger/minska">Github</a>
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
                    title: "What's Minska?",
                    text: `Minska means <i>to lose weight</i> in Swedish. And that's exactly what you can do with Minska.<br/>
                        The fastest and most useful way to lose weight is to count the calories you consume. This is the basic principle
                        of all apps that are designed to help you lose weight. Whether this happens in points (Weightwatchers) or directly
                        in calories, does not matter. With this tactic, <b>it doesn't matter what you eat</b>, it just matters how much.
                        Accordingly, you can occasionally treat yourself to a calorie bomb as long as you don't go beyond your daily routine.
                        Strictly speaking, <b>sport is not necessary either</b>, but you can use it to expand your calorie frame yourself.`
                },
                factcards: {
                    title: 'The Facts',
                    remainingdaily: {
                        title: 'Remaining & Daily',
                        text: `These 2 facts are statistics about your calories. <b>Daily</b> describes how many calories you can consume
                            per day to reach your target weight on your target date. However, this number <b>only describes your basal metabolic
                                rate with very little activity</b>. If, for example, you have an office job and do not do any other exercise or sports,
                                you can use this number. However, if you have a physically demanding job or are doing other activities in your
                                spare time, you should calculate this extra calorie consumption and add it to your basal metabolic rate. Too
                                little calorie intake through higher consumption can have a bad effect on your health. Make sure you set your
                                goals to be at least over 900 calories per day.<br/>
                                <b>Remaining</b> describes how many calories are left today. The number adjusts automatically when you
                                consume or burn more calories.`
                    },
                    recenttotal: {
                        title: 'Recent & Total weight loss',
                        text: `The value under <b>recent loss</b> is calculated from your last 2 entries.
                                It shows how much you have lost (or gained) since your last weighing. <br/>
                                <b>Total loss</b> berechnet sich aus deinem allerersten Eintrag und dem neusten. So siehst du immer deinen Gesamtfortschritt.`
                    },
                    target: {
                        title: 'To the goal',
                        text: `Here you can see how much you have to lose to reach your target weight.`
                    },
                    bmi: {
                        title: 'BMI',
                        text: `The body mass index is usually used to evaluate body weight in relation to height. However, it is only a rough guide
                                as it does not take into account the stature or the individual composition of the body mass.`
                    }
                },
                templates: {
                    title: 'Templates',
                    text: `With templates, you can easily save food you use frequently for quick reuse. Use the magnifying glass next to the
                            registration form to view and select your saved templates. Afterwards you don't have to enter the
                            values again, just click on <i>Add</i>.`
                },
                impressum: {
                    title: 'Imprint',
                    text: `
                            <h3>Contact</h3>
                            <p>
                                Erleiuat<br/>
                                (GitHub)<br/>
                                <br/>
                                Schweiz<br/>
                            </p>
                            <p>
                                The author assumes no liability whatsoever with regard to the correctness, accuracy, up-to-dateness, reliability and
                                completeness of the information provided. Liability claims against the author for damages of a material or immaterial
                                nature arising from access to or use or non-use of the published information, from misuse of the connection or from
                                technical faults are excluded.
                            </p>
                            <p>
                                All offers are non-binding. The author expressly reserves the right to change, supplement or delete parts of the pages
                                or the entire offer without prior notice or to cease publication temporarily or permanently.
                            </p>
                            <h3>Liability for links</h3>
                            <p>
                                References and links to websites of third parties are outside our area of responsibility. Any responsibility for such
                                websites is rejected. Access to and use of such websites is at the user's own risk.
                            </p>
                            <h3>Copyrights</h3>
                            <p>
                                The copyright and all other rights to content, images, photographs or other files on the website belong exclusively to
                                Elia Reutlinger or the specifically named copyright holders. The written consent of the copyright holder must be obtained
                                in advance for the reproduction of any elements.
                            </p>
                            <h3>Data Protection</h3>
                            <p>
                                Based on Article 13 of the Swiss Federal Constitution and the data protection provisions of the Confederation
                                (Data Protection Act, DSG), every person has the right to the protection of his or her privacy and to protection
                                against the misuse of his or her personal data. We comply with these regulations. Personal data will be kept strictly
                                confidential and will not be sold or passed on to third parties.
                            </p>
                            <p>
                                In close cooperation with our hosting providers, we strive to protect the databases as best as possible from
                                unauthorized access, loss, misuse or falsification.
                            </p>
                            <h3>Cookies</h3>
                            <p>
                                This application uses cookies to store certain data. By using the application, you consent to the storage of cookies.
                            </p>
                            `
                },
                ask: {
                    title: 'Questions or Suggestions?',
                    text: 'Follow these links to tell your concerns:'
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
                    remainingdaily: {
                        title: 'Verbleibend & Täglich',
                        text: `Bei diesen 2 Fakten handelt es sich um Statistiken zu deinen Kalorien. <b>Täglich</b> beschreibt dabei, wie
                                viele Kalorien du pro Tag konsumieren kannst, um dein Zielgewicht an deinem Ziel-Datum zu erreichen. Diese Zahl
                                beschreibt jedoch <b>nur deinen Grundumsatz bei sehr wenig aktivität</b>. Wenn du z.B. einen Bürojob hast, und dich
                                sonst nicht zusätzlich bewegst bzw. keinen Sport betreibst, kannst du diese Zahl nutzen. Falls du aber einen körperlich
                                anstrengenden Beruf hast oder in deiner Freizeit weitere Aktivitäten ausführst, solltest du diesen zusätzlichen Kalorienverbrauch
                                berechnen und zum Grundumsatz hinzufügen. Zu wenig Kalorienaufnahme durch höheren Verbrauch kann sich auf deine Gesundheit schlecht
                                auswirken. Achte darauf, dass du deine Ziele so einstellst, dass dieser Wert mindestens über 900 Kalorien pro Tag beträgt.<br/>
                                <b>Verbleibend</b> beschreibt wie viele Kalorien heute noch übrig sind. Die Zahl passt sich automatisch an, wenn du weitere Kalorien
                                hinzufügst oder löscht.`
                    },
                    recenttotal: {
                        title: 'Kürzlich & Insgesamt Abgenommen',
                        text: `Der Wert unter <b>kürzlich abgenommen</b> berechnet sich aus deinen letzten 2 Einträgen. Er zeigt, wie viel du seit deinem
                                letzten Wiegen insgesamt abgenommen (oder zugenommen) hast. <br/>
                                <b>Insgesamt Abgenommen</b> berechnet sich aus deinem allerersten Eintrag und dem neusten. So siehst du immer deinen Gesamtfortschritt.`
                    },
                    target: {
                        title: 'Zum Ziel',
                        text: `Hier siehst du wie viel du noch abnehmen musst, bis du dein Zielgewicht erreicht hast.`
                    },
                    bmi: {
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
                            <h3>Kontakt</h3>
                            <p>
                                Erleiuat<br/>
                                (GitHub)<br/>
                                <br/>
                                Schweiz<br/>
                            </p>
                            <h3>Haftungsausschluss</h3>
                            <p>
                                Der Autor übernimmt keinerlei Gewähr hinsichtlich der  inhaltlichen Richtigkeit, Genauigkeit,
                                Aktualität, Zuverlässigkeit und  Vollständigkeit der Informationen. Haftungsansprüche gegen den
                                Autor wegen Schäden materieller  oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw.
                                Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der  Verbindung oder durch technische
                                Störungen entstanden sind, werden  ausgeschlossen.
                            </p>
                            <p>
                                Alle  Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile  der Seiten oder das
                                gesamte Angebot ohne gesonderte Ankündigung zu verändern,  zu ergänzen, zu löschen oder die Veröffentlichung
                                zeitweise oder endgültig  einzustellen.
                            </p>
                            <h3>Haftung für Links</h3>
                            <p>
                                Verweise und Links auf Webseiten  Dritter liegen ausserhalb unseres Verantwortungsbereichs Es wird jegliche
                                Verantwortung für solche Webseiten  abgelehnt.  Der Zugriff und die Nutzung solcher Webseiten erfolgen auf
                                eigene Gefahr des Nutzers oder der Nutzerin.
                            </p>
                            <h3>Urheberrechte</h3>
                            <p>
                                Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der
                                Website gehören ausschliesslich <strong>Elia Reutlinger</strong> oder den speziell genannten
                                Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der
                                Urheberrechtsträger im Voraus einzuholen.
                            </p>
                            <h3>Datenschutz</h3>

                            <p>
                                Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des
                                Bundes (Datenschutzgesetz, DSG)  hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor
                                Missbrauch ihrer persönlichen Daten. Wir halten diese Bestimmungen ein.  Persönliche Daten werden streng
                                vertraulich behandelt und weder an Dritte  verkauft noch weiter gegeben.
                            </p>
                            <p>
                                In enger Zusammenarbeit mit unseren Hosting-Providern  bemühen wir uns, die Datenbanken so gut wie möglich
                                vor fremden Zugriffen, Verlusten,  Missbrauch oder vor Fälschung zu schützen.
                            </p>
                            <h3>Cookies</h3>
                            <p>
                                Diese Anwendung nutzt Cookies zur Speicherung von bestimmten Daten.
                                Mit der Nutzung der Anwendung stimmen Sie der Speicherung von Cookies zu.
                            </p>
                            `
                },
                ask: {
                    title: 'Fragen oder Vorschläge?',
                    text: 'Über folgende Links können Sie Ihr Anliegen mitteilen:'
                }
            }
        }
    }

}
</script>

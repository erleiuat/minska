import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: process.env.NODE_ENV === 'production',
    silentTranslationWarn: process.env.NODE_ENV === 'development',
    messages: {

        en: {
            alerts: {
                empty: {
                    title: "No Data found",
                    text: "Some functions need more Data"
                },
                error: {
                    title: "Error while execution",
                    text: "There was an Error while executing this task. Changes may not be saved or the Application is in Error."
                },
            },

        },

        de: {
            alerts: {
                empty: {
                    title: "Noch keine Einträge",
                    text: "Einige Funktionen benötigen mehr Daten"
                },
                error: {
                    title: "Problem bei der Ausführung",
                    text: "Bei der Ausführung ist ein Problem aufgetreten. Neue Daten wurden möglicherweise nicht gespeichert, oder die Anwendung weisst nun Fehler auf."
                },
            },
        }
        
    },

})

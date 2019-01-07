import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'

Vue.use(MLInstaller)

export default new MLCreate({
    initial: 'english',
    save: process.env.NODE_ENV === 'production',
    languages: [

        new MLanguage('english').create({

            general: {
                logout: 'Logout',
                welcome: 'Welcome!',
                noLoggin: 'You are not logged in.',
                firstname: 'Firstname',
                lastname: 'Lastname',
                mail: 'E-Mail',
                password: 'Password',
                repeat: 'Repeat',
                language: 'Language',
                save: 'Save changes'
            },
            languages: {
                english: 'English',
                german: 'German'
            },
            errors: {
                notfound: "This page is not available or couldn't be found.",
                nopermission: "You don't have permission to access this page."
            },
            views: {
                home: 'Home',
                dashboard: 'Dashboard',
                weights: 'Weights',
                calories: 'Calories',
                food: 'Food',
                faq: 'FAQ',
                settings: 'Settings',
                login: 'Login',
                register: 'Create Account',
                nopermission: 'No Permissions',
                notfound: 'Not Found',
            },
            dashboard: {
                title: 'Hello {0}!',
                text:  'Here are some personal informations about you:'
            }

        }),

        new MLanguage('german').create({

            general: {
                logout: 'Ausloggen',
                welcome: 'Willkommen!',
                noLoggin: 'Du bist noch nicht eingeloggt.',
                firstname: 'Vorname',
                lastname: 'Nachname',
                mail: 'E-Mail',
                password: 'Passwort',
                repeat: 'Wiederholen',
                language: 'Sprache',
                save: 'Änderungen speichern'
            },
            languages: {
                english: 'Englisch',
                german: 'Deutsch'
            },
            errors: {
                notfound: 'Diese Seite konnte nicht gefunden werden oder ist momentan nicht verfügbar.',
                nopermission: 'Du hast nicht genügend Rechte um diese Seite aufzurufen.'
            },
            views: {
                home: 'Startseite',
                dashboard: 'Dashboard',
                weights: 'Gewichte',
                calories: 'Kalorien',
                food: 'Essen',
                faq: 'Hilfe',
                settings: 'Einstellungen',
                login: 'Einloggen',
                register: 'Account erstellen',
                nopermission: 'Keine Rechte',
                notfound: 'Nicht gefunden',
            },
            dashboard: {
                title: 'Hallo {0}!',
                text:  'Hier sind einige persönliche Infos über dich:'
            }

        })

    ]
})

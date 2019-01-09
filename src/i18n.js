import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: process.env.NODE_ENV === 'production',
    messages: {
        en: {
            general: {
                basic: 'Basic',
                advanced: 'Advanced',
                logout: 'Logout',
                welcome: 'Welcome!',
                noLoggin: 'You are not logged in.',
                firstname: 'Firstname',
                lastname: 'Lastname',
                mail: 'E-Mail',
                password: 'Password',
                repeat: 'Repeat',
                language: 'Language',
                save: 'Save changes',
                gender: 'Gender',
                male: 'Male',
                female: 'Female',
                height: 'Height (cm)',
                weight: 'Weight (kg)',
                aims: 'Aims',
                date: 'Date'
            },
            languages: {
                english: 'English',
                german: 'German'
            },
            errors: {
                notfound: "This page is not available or couldn't be found.",
                nopermission: "You don't have permission to access this page.",
                required: "Value is required",
                valid: "Has to be a valid Value",
            },
            alerts: {
                saved: "Changes saved",
                savedMsg: "Your changes have been successfully saved.",
                error: "Error while execution",
                errorMsg: "There was an Error while executing this task. Changes may not be saved or the Application is in Error.",
                warning: "Attention!",
                warningMsg: "",
                info: "",
                infoMsg: "",
                sessionExp: "Session expired",
                sessionExpMsg: "Your Session expired and you have been logged out. Login again to use the Application."
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
            }
        },

        de: {
            general: {
                basic: 'Grundlegend',
                advanced: 'Details',
                logout: 'Ausloggen',
                welcome: 'Willkommen!',
                noLoggin: 'Du bist noch nicht eingeloggt.',
                firstname: 'Vorname',
                lastname: 'Nachname',
                mail: 'E-Mail',
                password: 'Passwort',
                repeat: 'Wiederholen',
                language: 'Sprache',
                save: 'Änderungen speichern',
                gender: 'Geschlecht',
                male: 'Mann',
                female: 'Frau',
                height: 'Grösse (cm)',
                weight: 'Gewicht (kg)',
                aims: 'Ziele',
                date: 'Datum'
            },
            languages: {
                english: 'Englisch',
                german: 'Deutsch'
            },
            errors: {
                notfound: 'Diese Seite konnte nicht gefunden werden oder ist momentan nicht verfügbar.',
                nopermission: 'Du hast nicht genügend Rechte um diese Seite aufzurufen.',
                required: "Eingabe ist nötig",
                valid: "Eingabe muss gültig sein",
            },
            alerts: {
                saved: "Änderungen gespeichert",
                savedMsg: "Deine Änderungen wurden erfolgreich gespeichert.",
                error: "Problem bei der Ausführung",
                errorMsg: "Bei der Ausführung ist ein Problem aufgetreten. Neue Daten wurden möglicherweise nicht gespeichert, oder die Anwendung weisst nun Fehler auf.",
                warning: "Vorsicht!",
                warningMsg: "",
                info: "",
                infoMsg: "",
                sessionExp: "Session abgelaufen",
                sessionExpMsg: "Ihre Session ist abgelaufen und Sie wurden abgemeldet. Melden Sie sich wieder an um die Anwendung zu nutzen."
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
        }
    },

})

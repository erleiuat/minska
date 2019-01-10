<template>
    <v-container class="text-xs-center">

        <h1>{{ $t('title') }}</h1>
        <p>{{ $t('subtitle') }}</p>

        <router-link to="/login">
            <v-btn color="primary" dark large>{{ $t('login') }}</v-btn>
        </router-link>

        <router-link to="/register">
            <v-btn color="primary" dark large outline>{{ $t('register') }}</v-btn>
        </router-link>


    </v-container>
</template>
<script>
export default {

    name: 'Home',
    i18n: {
        messages: {
            en: {
                title: 'Welcome!',
                subtitle: 'Please Login or create an Account to use this App',
                login: 'Login',
                register: 'Create Account'
            },
            de: {
                title: 'Willkommen!',
                subtitle: 'Melde dich an oder erstelle einen Account um diese Anwendung zu nutzen',
                login: 'Anmelden',
                register: 'Account erstellen'
            }
        }
    },

}
</script>

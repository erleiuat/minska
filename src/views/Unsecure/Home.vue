<template>
    <v-container class="text-xs-center">
        <v-layout row wrap justify-center>
            <v-flex xs10 md6>
                <v-img :src="require('@/assets/minska_logo/title_color.png')" :lazy-src="require('@/assets/minska_logo/title_color_low.png')" aspect-ratio="1.7" contain></v-img>
            </v-flex>
            <v-flex xs12 md10>
                <h1>{{ $t('title') }}</h1>
                <p>{{ $t('subtitle') }}</p>
            </v-flex>
            <v-flex xs12 md10>
                <v-btn color="primary" block dark @click="$router.push('/login')">{{ $t('login') }}</v-btn>
            </v-flex>
            <v-flex xs12 md10>
                <v-btn color="primary" block dark outline @click="$router.push('/register')">{{ $t('register') }}</v-btn>
            </v-flex>
            <v-flex xs12 md10 class="pt-5">
                <p>{{ $t('text') }}</p>
                <v-divider></v-divider>
                <v-img :src="require('@/assets/demos/facts_de.png')" :lazy-src="require('@/assets/minska_logo/title_color_low.png')" contain></v-img>
                <p>{{ $t('text2') }}</p>
                <v-divider></v-divider>
                <v-img class="pa-5" :src="require('@/assets/demos/weight.png')" :lazy-src="require('@/assets/minska_logo/title_color_low.png')" contain></v-img>
                <p>{{ $t('text3') }}</p>
                <v-divider></v-divider>
                <v-img class="pa-5" :src="require('@/assets/demos/devices.png')" :lazy-src="require('@/assets/minska_logo/title_color_low.png')" contain></v-img>
                <p>{{ $t('text4') }}</p>
            </v-flex>
            <v-flex xs12 md10>
                <v-btn color="primary" block dark @click="$router.push('/register')">{{ $t('register') }}</v-btn>
            </v-flex>

        </v-layout>

    </v-container>
</template>
<script>
export default {
    name: 'Home',

    i18n: {
        messages: {
            en: {
                title: 'Welcome!',
                subtitle: 'Please Login or create an Account to use this App.',
                login: 'Login',
                register: 'Create Account',
                text: 'With Minska you can loose weight very easy by just adjust your daily calorie intake.',
                text2: "With the Fact-Cards you'll have your progress and limits always on top.",
                text3: 'Minska will do statistics for so you can visualize your progress.',
                text4: 'And you can use this App for free! What else would you need?'
            },
            de: {
                title: 'Willkommen!',
                subtitle: 'Melde dich an oder erstelle einen Account um diese Anwendung zu nutzen.',
                login: 'Anmelden',
                register: 'Account erstellen',
                text: 'Mit Minska kannst du ganz einfach abnehmen, indem du deinen täglichen Kalorienverbrauch anpasst und verfolgst. ',
                text2: 'Mit den Fakten hast du deinen Vortschritt und deine Limits jederzeit aktuell.',
                text3: 'Minska erstellt dir dabei Statistiken, um dir deinen Fortschritt richtig zu visualisieren.',
                text4: 'Und du kannst die App kostenlos nutzen! Was willst du mehr?'
            }
        }
    }

}
</script>

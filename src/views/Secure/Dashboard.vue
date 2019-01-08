<template>
    <v-container>
        <v-layout row wrap>

            <v-flex xs12>
                <h1>{{ $t('dashboard.title', {name: firstname}) }}</h1>
            </v-flex>

            <v-flex md6>
                <WeightAdder />
            </v-flex>
            <v-flex md6>
                <CalorieAdder />
            </v-flex>

            <v-flex xs12>
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12>
                <h1>Facts</h1>
            </v-flex>

            <v-flex md4>
                <DifferenceFact />
            </v-flex>
            <v-flex md4>
                <DifferenceFact />
            </v-flex>
            <v-flex md4>
                <DifferenceFact />
            </v-flex>
            <v-flex md4>
                <DifferenceFact />
            </v-flex>
            <v-flex md4>
                <DifferenceFact />
            </v-flex>
            <v-flex md4>
                <DifferenceFact />
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import WeightAdder from '@/components/Secure/Adder/Weight'
import CalorieAdder from '@/components/Secure/Adder/Calorie'
import DifferenceFact from '@/components/Secure/Facts/Difference'

export default {

    name: 'home',

    components: {
        WeightAdder,
        CalorieAdder,
        DifferenceFact
    },

    i18n: {
        messages: {
            en: {
                title: 'Hello {name}!',
                subtitle: 'Welcome to your Dashboard.'
            },
            de: {
                title: 'Hallo {name}!',
                subtitle: 'Willkommen auf deinem Dashboard.'
            }
        }
    },

    data () {

        var sessionTimeLeft = ((this.$store.state.user.auth.expiration.client - Math.floor(Date.now() / 1000))/60);
        var tokenTimeLeft = ((this.$store.state.user.auth.expiration.token - Math.floor(Date.now() / 1000))/60);

        return {
            firstname: this.$store.state.user.info.firstname,
            lastname: this.$store.state.user.info.lastname,
            mail: this.$store.state.user.info.email,
            weight: null,
            height: '',
            sessionExpires:  Math.round(sessionTimeLeft*100)/100 +' Minutes',
            tokenExpires: Math.round(tokenTimeLeft*100)/100 +' Minutes',
        }

    },

    mounted() {

        var vm = this;
        vm.axiosPost({
            url:'weight/read/',
            data: {
                jwt: this.$store.state.user.auth.token
            }
        }).then(function (response) {
            vm.$data.weight = response.data.weight;
        }).catch(function (error) {
            vm.$notify({
                group: 'default',
                type: 'error',
                title: 'Something went wrong',
                text: "There was an Error. This could have an impact on the Apps behaviour"
            });
        });

    },

}
</script>

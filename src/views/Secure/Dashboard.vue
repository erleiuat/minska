<template>
    <v-container>

        <h1 v-text="$ml.with(firstname).get('dashboard.title')"></h1>
        <h2 v-text="$ml.get('dashboard.text')"></h2>

        <ul>
            <li>Firstname: {{ firstname }}</li>
            <li>Lastanem: {{ lastname }}</li>
            <li>E-Mail: {{ mail }}</li>
            <li>Current Weight: {{ weight }}</li>
            <li>Current Height: {{ height }}</li>
            <li>Session Expire: {{ sessionExpires }}</li>
            <li>Token Expire: {{ tokenExpires }}</li>
        </ul>


    </v-container>
</template>

<script>
export default {
    name: 'home',
    components: {

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

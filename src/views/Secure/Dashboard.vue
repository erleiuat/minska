<template>
    <v-container>

        <h1>Dashboard</h1>

        <h2>Here is some personal Information about you:</h2>

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
        return {
            firstname: this.$store.state.user.info.firstname,
            lastname: this.$store.state.user.info.lastname,
            mail: this.$store.state.user.info.email,
            weight: null,
            height: '',
            sessionExpires: (this.$store.state.user.auth.expiration.client - Math.floor(Date.now() / 1000))/60+' Minutes',
            tokenExpires: (this.$store.state.user.auth.expiration.token - Math.floor(Date.now() / 1000))/60+' Minutes',
        }
    },
    mounted() {

        this.axios.post('http://localhost/minska/minska-api/api/weight/read/', {jwt: this.$store.state.user.auth.token})
        .then(response =>(
            this.weight = response.data.weight
        )).catch(error =>(
        this.$notify({
            group: 'default',
            type: 'error',
            title: 'Something went wrong',
            text: "There was an Error. This could have an impact on the Apps behaviour"
        })
        ));

    },

}
</script>

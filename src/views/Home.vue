<template>
    <v-container>
        <v-layout justify-center row wrap>
            <v-flex xs12 sm6 md6>
                <h1>Welcome</h1>
                <p>
                    You can Login or Register, if you don't have an Account yet.
                </p>
            </v-flex>
            <v-flex xs12 sm3 md3>
                <v-btn color="primary" dark large @click="" :to="{path: '/login'}">Login</v-btn>
            </v-flex>
            <v-flex xs12 sm3 md3>
                <v-btn color="primary" dark large @click="" :to="{path: '/register'}">Register</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {

    created(){
        if(this.$store.state.authenticated){
            this.$router.push('/dashboard')
        }
    }

}


</script>

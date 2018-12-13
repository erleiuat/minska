<template>
    <div>
        <h1>Dashboard</h1>
        <p>JWT: {{jwt}}</p>
        <p>Vuex: {{auth}}</p>
    </div>
</template>

<script>
export default {

    created(){
        if(!this.$store.state.authenticated){
            this.$router.push('/')
        }
    },

    data(){
        return {
            jwt:this.$cookie.get('jwt'),
            auth: this.$store.state.authenticated
        }
    }

}
</script>

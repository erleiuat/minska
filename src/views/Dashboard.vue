<template>
    <div>
        <h1>Dashboard</h1>
        <p>
            Welcome {{firstname}} {{lastname}}!
        </p>
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
            firstname: this.$store.state.user.firstname,
            lastname: this.$store.state.user.lastname,
        }
    }

}
</script>

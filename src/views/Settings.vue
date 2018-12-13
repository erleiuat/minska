<template>
    <div>
        <h1>Settings</h1>
    </div>
</template>
<script>
export default {

    created(){
        if(!this.$store.state.authenticated){
            this.$router.push('/')
        }
    },

}
</script>

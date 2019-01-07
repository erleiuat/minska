<template>
    <div>
        <h1>401</h1>
        <h1 v-text="$ml.get('views.nopermission')"></h1>
        <p v-text="$ml.get('errors.nopermission')"></p>
    </div>
</template>

<script>

export default {
    name: 'noPermission',
    components: {

    }
}
</script>

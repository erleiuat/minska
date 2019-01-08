<template>
    <div>
        <h1>401</h1>
        <h1 v-text="$t('views.nopermission')"></h1>
        <p v-text="$t('errors.nopermission')"></p>
    </div>
</template>

<script>

export default {
    name: 'noPermission',
    components: {

    }
}
</script>

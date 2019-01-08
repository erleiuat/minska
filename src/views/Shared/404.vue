<template>
    <div>
        <h1>404</h1>
        <h1 v-text="$t('views.notfound')"></h1>
        <p v-text="$t('errors.notfound')"></p>
    </div>
</template>

<script>

export default {
    name: 'notFound',
    components: {

    }
}
</script>

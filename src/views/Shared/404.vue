<template>
    <div>
        <h1>404</h1>
        <h1 v-text="$ml.get('views.notfound')"></h1>
        <p v-text="$ml.get('errors.notfound')"></p>
    </div>
</template>

<script>

export default {
    name: 'notFound',
    components: {

    }
}
</script>

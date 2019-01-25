<template>
    <div>
        <h1>404</h1>
        <h1 v-text="$t('title')"></h1>
        <p v-text="$t('text')"></p>
    </div>
</template>

<script>

export default {
    name: 'notFound',
    i18n: {
        messages: {
            en: {
                title: 'Not found',
                text: "This page is not available or couldn't be found"
            },
            de: {
                title: 'Seite nicht gefunden',
                text: 'Diese Seite konnte nicht gefunden werden oder ist momentan nicht verfügbar'
            }
        }
    }
}
</script>

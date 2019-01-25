<template>
    <div>
        <h1>401</h1>
        <h1 v-text="$t('title')"></h1>
        <p v-text="$t('text')"></p>
    </div>
</template>

<script>

export default {
    name: 'noPermission',
    i18n: {
        messages: {
            en: {
                title: 'No Permission',
                text: "You don't have permission to access this page. Are you logged in?"
            },
            de: {
                title: 'Keine Rechte',
                text: 'Du hast nicht genügend Rechte um diese Seite aufzurufen. Bist du Eingeloggt?'
            }
        }
    }
}
</script>

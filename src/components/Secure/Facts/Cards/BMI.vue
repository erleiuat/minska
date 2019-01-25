<template>
    <FactCard :card="card"/>
</template>

<script>
import FactCard from '../FactCard'

export default {

    name: 'BMI',
    components: {
        FactCard
    },

    i18n: {
        messages: {
            en: {
                title: 'BMI',
                description: 'Current Body-Mass-Index'
            },
            de: {
                title: 'BMI',
                description: 'Aktueller Body-Mass-Index'
            }
        }
    },

    computed: {
        card () {
            try {
                var value = Math.round(this.$store.state.content.weights[0].weight / ((this.$store.state.user.height / 1000) * (this.$store.state.user.height / 1000)) / 10) / 10

                var type = ''

                if (value > 30 || value < 15) {
                    type = 'error'
                } else if (value > 25 || value < 20) {
                    type = 'warning'
                }

                return {
                    title: this.$t('title'),
                    description: this.$t('description'),
                    value: value,
                    unit: '',
                    type: type
                }
            } catch (err) {
                return {
                    title: this.$t('title'),
                    description: this.$t('alerts.empty.short')
                }
            }
        }
    }

}

</script>

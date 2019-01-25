<template>
    <FactCard :card="card"/>
</template>

<script>
import FactCard from '../FactCard'

export default {

    name: 'Recently',
    components: {
        FactCard
    },

    i18n: {
        messages: {
            en: {
                title: 'Recent Loss',
                description: '= Latest 2 Entries'
            },
            de: {
                title: 'Kürzlich Abgenommen',
                description: '= Letzte 2 Einträge'
            }
        }
    },

    computed: {
        card () {
            if (this.$store.state.content.weights.length >= 2) {
                var target = this.$store.state.user.aims.weight - this.$store.state.content.weights[0].weight
                var value = this.$store.state.content.weights[0].weight - this.$store.state.content.weights[1].weight

                value = Math.round(value * 100) / 100
                if (value > 0) {
                    value = '+' + value
                }

                var type = 'error'
                if (target < 0 && value < 0) {
                    type = 'success'
                }

                return {
                    title: this.$t('title'),
                    description: this.$t('description'),
                    value: value,
                    unit: 'Kg',
                    type: type
                }
            } else {
                return {
                    title: this.$t('title'),
                    description: this.$t('alerts.empty.short')
                }
            }
        }
    }

}

</script>

<template>
    <FactCard :card="card"/>
</template>

<script>
import FactCard from '../FactCard'

export default {

    name: 'Total',
    components: {
        FactCard
    },

    i18n: {
        messages: {
            en: {
                title: 'Total Loss',
                description: 'From start til now'
            },
            de: {
                title: 'Insgesamt Abgenommen',
                description: 'Vom Anfang bis jetzt'
            }
        }
    },

    computed: {
        card () {
            try {
                var value = this.$store.state.content.weights[0].weight - this.$store.state.content.weights[this.$store.state.content.weights.length - 1].weight
                value = Math.round(value * 100) / 100
                if (value > 0) {
                    value = '+' + value
                }

                return {
                    title: this.$t('title'),
                    description: this.$t('description'),
                    value: value,
                    unit: 'Kg'
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

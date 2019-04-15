<template>
    <FactCard :card="card"/>
</template>

<script>
import FactCard from '../FactCard'

export default {

    name: 'Daily',
    components: {
        FactCard
    },

    i18n: {
        messages: {
            en: {
                title: 'Daily',
                description: 'To loose {value} Kg per day'
            },
            de: {
                title: 'Tägliche Kalorien',
                description: 'Um {value} Kg pro Tag abzunehmen'
            }
        }
    },

    computed: {
        card () {
            try {
                var target = new Date(this.$store.state.user.aims.date).getTime()
                var difference = target - new Date().getTime()
                var differenceDays = Math.round(difference / (1000 * 60 * 60 * 24))
                var neededLoss = this.$store.state.user.aims.weight - this.$store.state.content.weights[0].weight
                var lossPerDayInCal = neededLoss / differenceDays * 7000

                var ageDate = new Date(Date.now() - Date.parse(this.$store.state.user.birthdate))
                var dayNeed = Math.abs(ageDate.getUTCFullYear() - 1970)

                if (this.$store.state.user.gender === 'female') {
                    dayNeed = 655 + (9.5 * this.$store.state.content.weights[0].weight) + (1.9 * this.$store.state.user.height) + (4.7 * dayNeed) // Womans
                } else {
                    dayNeed = 66 + (13.8 * this.$store.state.content.weights[0].weight) + (5.0 * this.$store.state.user.height) + (6.8 * dayNeed) // Mans
                }

                var value = Math.round((lossPerDayInCal + dayNeed))

                var type = ''
                if (value < 800) {
                    type = 'error'
                } else if (value < 1000) {
                    type = 'warning'
                }

                return {
                    title: this.$t('title'),
                    description: this.$t('description', { value: Math.round(((this.$store.state.user.aims.weight - this.$store.state.content.weights[0].weight) / differenceDays) * 100) / 100 }),
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

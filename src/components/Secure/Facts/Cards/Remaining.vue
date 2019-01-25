<template>
    <FactCard :card="card"/>
</template>

<script>
import FactCard from '../FactCard'

export default {

    name: 'Remaining',
    components: {
        FactCard
    },

    i18n: {
        messages: {
            en: {
                title: 'Remaining Calories',
                description: '{value} already used'
            },
            de: {
                title: 'Verbleibende Kalorien',
                description: 'Bereits {value} verbraucht'
            }
        }
    },

    computed: {
        card () {
            try {
                var target = new Date(this.$store.state.user.aims.date).getTime()
                var difference_ms = target - new Date().getTime()
                var difference_days = Math.round(difference_ms / (1000 * 60 * 60 * 24))
                var lossPerDayInCal = (this.$store.state.user.aims.weight - this.$store.state.content.weights[0].weight) / difference_days * 7000

                var ageDate = new Date(Date.now() - Date.parse(this.$store.state.user.birthdate))
                var age = Math.abs(ageDate.getUTCFullYear() - 1970)

                if (this.$store.state.user.isFemale) {
                    var dailyCalNeeded = 655 + (9.5 * this.$store.state.content.weights[0].weight) + (1.9 * this.$store.state.user.height) + (4.7 * age) // Womans
                } else {
                    var dailyCalNeeded = 66 + (13.8 * this.$store.state.content.weights[0].weight) + (5.0 * this.$store.state.user.height) + (6.8 * age) // Mans
                }

                var daily = Math.round((lossPerDayInCal + dailyCalNeeded) * 100) / 100
                var used = 0

                if (this.$store.state.content.calories) {
                    this.$store.state.content.calories.forEach(function (item) {
                        used = used + (item.amount / 100 * item.calories)
                    })
                    var value = Math.round((daily - used) * 100) / 100
                } else {
                    var value = daily
                }

                if (value > 200) {
                    var type = 'success'
                } else if (value > 0) {
                    var type = 'warning'
                } else {
                    var type = 'error'
                }

                return {
                    title: this.$t('title'),
                    description: this.$t('description', { value: Math.round((used) * 100) / 100 }),
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

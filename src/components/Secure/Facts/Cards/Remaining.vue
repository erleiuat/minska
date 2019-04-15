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
                var difference = target - new Date().getTime()
                var differenceDays = Math.round(difference / (1000 * 60 * 60 * 24))
                var lossPerDayInCal = (this.$store.state.user.aims.weight - this.$store.state.content.weights[0].weight) / differenceDays * 7000

                var ageDate = new Date(Date.now() - Date.parse(this.$store.state.user.birthdate))
                var dayNeed = Math.abs(ageDate.getUTCFullYear() - 1970)

                if (this.$store.state.user.gender === 'female') {
                    dayNeed = 655 + (9.5 * this.$store.state.content.weights[0].weight) + (1.9 * this.$store.state.user.height) + (4.7 * dayNeed) // Womans
                } else {
                    dayNeed = 66 + (13.8 * this.$store.state.content.weights[0].weight) + (5.0 * this.$store.state.user.height) + (6.8 * dayNeed) // Mans
                }

                var value = Math.round((lossPerDayInCal + dayNeed))
                var used = 0

                if (this.$store.state.content.calories) {
                    this.$store.state.content.calories.forEach(function (item) {
                        used = used + (item.amount / 100 * item.calories)
                    })
                    value = Math.round((value - used))
                }

                var type = 'error'
                if (value > 200) {
                    type = 'success'
                } else if (value > 0) {
                    type = 'warning'
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

<template>
    <FactCard :card="card"/>
</template>

<script>
import FactCard from '../FactCard'

export default {

    name: 'Daily',
    components: {
        FactCard,
    },

    i18n: {
        messages: {
            en: {
                title: 'Daily',
                description: 'This is how much you can eat per Day to reach your aims',
            },
            de: {
                title: 'Täglich',
                description: 'Mögliche Kalorien pro Tag um Ziele zu erreichen',
            }
        }
    },

    computed: {
        card(){

            try {

                var target = new Date(this.$store.state.user.aims.date).getTime();
                var difference_ms = target - new Date().getTime();
                var difference_days = Math.round(difference_ms/ (1000*60*60*24) );
                var neededLoss = this.$store.state.user.aims.weight - this.$store.state.content.weights[0].weight;
                var lossPerDayInCal = neededLoss / difference_days * 7000;

                var ageDate = new Date(Date.now() - Date.parse(this.$store.state.user.birthdate));
                var age = Math.abs(ageDate.getUTCFullYear() - 1970);

                if(this.$store.state.user.isFemale){
                    var dailyCalNeeded = 655 + (9.5 * this.$store.state.content.weights[0].weight) + (1.9 * this.$store.state.user.height) + (4.7 * age); //Womans
                } else {
                    var dailyCalNeeded = 66 + (13.8 * this.$store.state.content.weights[0].weight) + (5.0 * this.$store.state.user.height) + (6.8 * age); //Mans
                }

                var value = Math.round((lossPerDayInCal + dailyCalNeeded)*100)/100;

                var type = '';
                if(value < 800){
                    var type = 'error';
                } else if (value < 1000){
                    var type = 'warning';
                }

                return {
                    title: this.$t('title'),
                    description: this.$t('description'),
                    value: value,
                    unit: 'KCal',
                    type: type
                }

            } catch(err){
                return {
                    title: this.$t('title'),
                    description: this.$t('alerts.empty.short'),
                };
            }

        }
    }

}

</script>

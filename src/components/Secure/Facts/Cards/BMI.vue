<template>
    <FactCard :card="card"/>
</template>

<script>
import FactCard from '../FactCard'

export default {

    name: 'BMI',
    components: {
        FactCard,
    },

    i18n: {
        messages: {
            en: {
                title: 'BMI',
                description: 'Current Body-Mass-Index (Should be between 20 and 25)',
            },
            de: {
                title: 'BMI',
                description: 'Aktueller Body-Mass-Index (Sollte zwischen 20 und 25 sein)',
            }
        }
    },

    computed: {
        card(){

            if(this.$store.state.content.weights){

                var value = Math.round(this.$store.state.content.weights[0].weight/((this.$store.state.user.height/1000)*(this.$store.state.user.height/1000)))/100;

                var type = '';
                if(value > 25 || value < 20){
                    type = 'warning';
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
                    description: this.$t('alerts.empty.short'),
                };
            }

        }
    }

}

</script>

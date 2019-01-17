<template>
    <FactCard :card="card"/>
</template>

<script>
import FactCard from '../FactCard'

export default {

    name: 'Target',
    components: {
        FactCard,
    },

    i18n: {
        messages: {
            en: {
                title: 'Target',
                description: 'Difference between latest and target. (Target: {value} Kg)',
            },
            de: {
                title: 'Ziel',
                description: 'Unterschied zwischen aktuellem und Ziel-Gewicht. (Ziel: {value} Kg)',
            }
        }
    },

    computed: {
        card(){

            if(this.$store.state.content.weights){

                var value = this.$store.state.user.aims.weight - this.$store.state.content.weights[0].weight;
                value = Math.round(value*100)/100;
                if(value > 0){
                    value = '+'+value;
                }

                var type = '';
                if(value > -2 && value < 2){
                    type = 'success';
                }

                return {
                    title: this.$t('title'),
                    description: this.$t('description', {value: this.$store.state.user.aims.weight }),
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

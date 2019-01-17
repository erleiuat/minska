<template>
    <FactCard :card="card"/>
</template>

<script>
import FactCard from '../FactCard'

export default {

    name: 'Recently',
    components: {
        FactCard,
    },

    i18n: {
        messages: {
            en: {
                title: 'Recently',
                description: 'Difference between latest 2 Entries (Most Recent: {value} Kg)',
            },
            de: {
                title: 'Kürzlich',
                description: 'Unterschied zwischen den letzten 2 Einträgen (Neuster: {value} Kg)',
            }
        }
    },

    computed: {
        card(){

            if(this.$store.state.content.weights.length >= 2){

                var target = this.$store.state.user.aims.weight - this.$store.state.content.weights[0].weight;

                var value = this.$store.state.content.weights[0].weight - this.$store.state.content.weights[1].weight;
                value = Math.round(value*100)/100;
                if(value > 0){
                    value = '+'+value;
                }

                if(target < 0 && value < 0){
                    var type = 'success';
                } else {
                    var type = 'error';
                }

                return {
                    title: this.$t('title'),
                    description: this.$t('description', {value: this.$store.state.content.weights[0].weight}),
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

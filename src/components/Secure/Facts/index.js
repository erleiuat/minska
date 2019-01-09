import Vue from 'vue'
import FactCard from './FactCard'

var store = {
    weight: {
        current: 80,
        last: 90,
        first: 120,
        target: 75
    },
    height: 180,
    calorie: {
        total: null,
        used: null
    }
}


var Recently = Vue.component('recently', {

    computed: {
        card() {
            return {
                title: 'Recently',
                description: 'Difference between latest 2 Entries (Most Recent: '+store.weight.current+' Kg)',
                value: store.weight.current - store.weight.last,
                unit: 'Kg',
                type: null
            }
        }
    },

    components: {
        FactCard
    },
    render(createElement) {
        return createElement(
            'FactCard', {
                attrs: {
                    'card': this.card,
                },
            }
        );
    },

})

var Total = Vue.component('total', {
    computed: {
        card() {
            return {
                title: 'Target',
                description: 'Difference between latest and target. (Target: '+store.weight.target+' Kg)',
                value: store.weight.target - store.weight.current,
                unit: 'Kg',
                type: null
            }
        }
    },
    components: {
        FactCard
    },
    render(createElement) {
        store.weight.current = 79;
        return createElement(
            'FactCard', {
                attrs: {
                    'card': this.card
                },
            }
        );
    },
})

var Target = Vue.component('target', {
    data() {
        return {
            card: {
                title: 'Total',
                description: 'Difference between first and latest Entry',
                value: store.weight.current - store.weight.first,
                unit: 'Kg',
                type: null
            }
        }
    },
    components: {
        FactCard
    },
    render(createElement) {
        console.log('yay');
        return createElement(
            'FactCard', {
                attrs: {
                    'card': this.card
                },
            }
        );
    },
})

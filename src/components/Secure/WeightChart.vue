<template>
    <v-flex xs12>
        <highcharts v-if="chartOptions" :options="chartOptions"></highcharts>
    </v-flex>
</template>

<script>
import { Chart } from 'highcharts-vue'

export default {

    name: 'WeightChart',
    props: ['weights'],

    components: {
        highcharts: Chart
    },

    computed: {

        chartOptions () {
            var tmpLabels = []
            var tmpData = []

            if (this.weights.length > 0) {
                for (var i = 0; i < this.weights.length; i++) {
                    const [year, month, day] = this.weights[i].measuredate.split('-')
                    tmpLabels.unshift(`${day}.${month}.${year}`)
                    tmpData.unshift(parseInt(this.weights[i].weight))
                }
            } else {
                return false
            }

            return {
                title: null,
                xAxis: {
                    categories: tmpLabels
                },
                series: [{
                    name: 'Weight',
                    data: tmpData
                }]
            }
        }

    }

}
</script>

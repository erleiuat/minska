<template>
    <line-chart v-if="datacollection" :chart-data="datacollection" :options="options"></line-chart>
</template>

<script>
import LineChart from './LineChart.js'

export default {

    name: 'Chart',
    props: {
        weights: Array
    },
    components: {
        LineChart
    },
    data () {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                }
            }
        }
    },
    computed: {

        datacollection () {
            var tmpLabels = []
            var tmpData = []

            if (this.weights.length > 0) {
                for (var i = 0; i < this.weights.length; i++) {
                    const [year, month, day] = this.weights[i].measuredate.split('-')
                    tmpLabels.unshift(`${day}.${month}.${year}`)
                    tmpData.unshift(this.weights[i].weight)
                }
            } else {
                return false
            }

            return {
                labels: tmpLabels,
                datasets: [{ data: tmpData }]
            }
        }

    }
}
</script>

<template>
    <line-chart v-if="cData.length" :min="null" :chart-data="datacollection" download="boom" :colors="['black']"></line-chart>
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

        datacollection: {
            labels: ['Weight', 'Date'],
            datasets: [
                { label: null, data: ['12.12.2019', '100'] }
            ]
        }

      }

    },
    computed: {

        cData () {
            var tmpData = []
            if (this.weights.length > 0) {
                for (var i = 0; i < this.weights.length; i++) {
                    tmpData.push([this.weights[i].measuredate, this.weights[i].weight])
                }
            }
            return tmpData
        }

    }
}
</script>

<style>
.small {
    max-width: 600px;
    margin:  150px auto;
}
</style>

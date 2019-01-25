<template>
    <line-chart :min="null" :data="chartData" download="boom" :colors="['black']"></line-chart>
</template>
<script>
export default {

    name: 'Chart',
    props: {
        weights: Array
    },

    computed: {
        chartData () {
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

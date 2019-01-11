<template>
    <div style="min-height: 400px" class="chart" ref="chart"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

export default {

    name: 'Chart',
    props: {
        chartValues: Array,
        xData: String,
        yData: String
    },

    methods: {
        buildChart(){
            let chart = am4core.create(this.$refs.chart, am4charts.XYChart);

            let data = [];
            let visits = 10;
            for (let i = 1; i < 366; i++) {
                visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
                data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
            }

            chart.data = this.chartValues;

            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 35;

            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = this.xData;
            series.dataFields.valueY = this.yData;

            series.tooltipText = "{valueY.value}";
            chart.cursor = new am4charts.XYCursor();

            let scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            chart.scrollbarX = scrollbarX;

            this.chart = chart;
        }
    },

    watch: {
        chartValues: {
            handler: function() {
                this.buildChart();
            },
            deep: true
        }
    },

    mounted(){
        if(this.chartValues.length > 0){
            this.buildChart();
        }
    }

}
</script>

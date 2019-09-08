<template>
  <div ref="chart" style="height: 50vh"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    interface: {
      type: Object,
      default() {
        return {
          series: [],
          dynasty: ''
        }
      }
    }
  },
  data() {
    return {
      chart: null,
      option: {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'cross'
          },
          formatter(params) {
            return (
              params.name +
              ' | ' +
              params.seriesName +
              ' | 字频：' +
              params.value.toFixed(7)
            )
          },
          label: {
            fontWeight: 'bold'
          }
        },
        legend: {},
        xAxis: {
          name: '朝代',
          type: 'category',
          data: [
            '先秦',
            '汉',
            '魏晋',
            '南北朝',
            '隋',
            '唐',
            '宋',
            '辽',
            '金',
            '元',
            '明',
            '清'
          ]
        },
        yAxis: {
          name: '百分比',
          type: 'value'
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0]
          },
          {
            type: 'inside',
            yAxisIndex: [0]
          }
        ],
        series: []
      }
    }
  },
  watch: {
    'interface.dynasty': function() {
      this.updateData()
      this.chart.setOption(this.option)
    }
  },
  created() {
    this.updateData()
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
    this.chart.setOption(this.option)
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed() {
    window.addEventListener('resize', this.resizeHandler)
    this.chart.dispose()
  },
  methods: {
    resizeHandler() {
      this.chart.resize()
    },
    updateData() {
      this.option.series = this.interface.series
    }
  }
}
</script>

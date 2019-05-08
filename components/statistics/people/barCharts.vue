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
          xAxis: [],
          data: [],
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
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: null
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            data: null,
            label: {
              show: true,
              position: 'top',
              formatter(params) {
                return params.name + ' ' + params.value.toFixed(4)
              }
            },
            itemStyle: {
              color: function() {
                return (
                  'rgb(' +
                  [
                    Math.round(Math.random() * 200),
                    Math.round(Math.random() * 200),
                    Math.round(Math.random() * 200)
                  ].join(',') +
                  ')'
                )
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 30,
                fontWeight: 'bold'
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    'interface.dynasty': function() {
      this.option.xAxis.data = this.interface.xAxis
      this.option.series[0].data = this.interface.data
      this.chart.setOption(this.option)
    }
  },
  created() {},
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
    this.chart.setOption(this.option)
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    resizeHandler() {
      this.chart.resize()
    }
  }
}
</script>

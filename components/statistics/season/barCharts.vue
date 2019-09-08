<template>
  <div ref="charts" style="height: 50vh"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    theData: {
      type: Array,
      default() {
        return []
      }
    },
    theX: {
      type: Array,
      default() {
        return []
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
          data: this.theX
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            data: this.theData,
            label: {
              show: true,
              position: 'top',
              formatter(params) {
                return params.name + ' ' + params.value
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
    theData: {
      handler(newVal) {
        this.option.series[0].data = newVal
        this.option.xAxis.data = this.theX
        this.chart.setOption(this.option)
      },
      deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.charts)
    this.chart.setOption(this.option)
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
    this.chart.dispose()
  },
  methods: {
    resizeHandler() {
      this.chart.resize()
    }
  }
}
</script>

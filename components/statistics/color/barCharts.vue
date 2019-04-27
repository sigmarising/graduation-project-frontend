<template>
  <div ref="chart" style="height: 45vh"></div>
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
    },
    theColor: {
      type: String,
      default: ''
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
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            data: [],
            label: {
              show: true,
              position: 'top',
              formatter(params) {
                return params.name + ' ' + params.value
              }
            },
            itemStyle: {
              color: ''
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
        const _this = this
        _this.option.series[0].data = newVal
        _this.option.series[0].itemStyle.color = _this.theColor
        _this.option.xAxis.data = _this.theX
        _this.chart.setOption(_this.option)
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    const _this = this
    _this.option.series[0].data = _this.theData
    _this.option.series[0].itemStyle.color = _this.theColor
    _this.option.xAxis.data = _this.theX
    _this.chart = echarts.init(_this.$refs.chart)
    _this.chart.setOption(_this.option)
    window.addEventListener('resize', _this.resizeHandler)
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

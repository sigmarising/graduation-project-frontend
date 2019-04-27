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
    theColor: {
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
        tooltip: {},
        color: null,
        series: [
          {
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [],
            label: {
              show: true
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
        _this.option.color = _this.theColor
        _this.chart.setOption(_this.option)
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
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

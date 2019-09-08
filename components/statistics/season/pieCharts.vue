<template>
  <div ref="echarts" style="height: 400px"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    selected: {
      type: String,
      default: ''
    },
    theData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      thisChart: null,
      option: {
        tooltip: {},
        series: [
          {
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: this.theData,
            roseType: false,
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
  computed: {},
  watch: {
    selected: {
      handler() {
        const _this = this
        _this.option.series[0].data = _this.theData
        _this.thisChart.setOption(_this.option)
      }
    }
  },
  mounted() {
    const _this = this
    _this.thisChart = echarts.init(_this.$refs.echarts)
    _this.thisChart.setOption(_this.option)
    window.addEventListener('resize', _this.resizeHandler)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
    this.thisChart.dispose()
  },
  methods: {
    resizeHandler() {
      this.thisChart.resize()
    }
  }
}
</script>

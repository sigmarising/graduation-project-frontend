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
    color: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      option: {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: this.$store.state.poetry.dynastys.slice(0, -1)
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
              position: 'top'
            },
            itemStyle: {
              color: this.color,
              emphasis: {
                shadowBlur: 20,
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
  mounted() {
    const _this = this
    _this.chart = echarts.init(_this.$refs.charts)
    _this.chart.setOption(_this.option)
    window.addEventListener('resize', _this.resizeHandler)
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

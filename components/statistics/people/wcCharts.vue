<template>
  <div ref="chart" style="height: 50vh"></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-wordcloud'

export default {
  props: {
    interface: {
      type: Object,
      default() {
        return {
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
        tooltip: {},
        series: [
          {
            type: 'wordCloud',
            gridSize: 30,
            sizeRange: [10, 200],
            rotationRange: [-45, 45],
            shape: 'pentagon',
            width: '100%',
            height: '100%',
            textStyle: {
              normal: {
                color: function() {
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(',') +
                    ')'
                  )
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: []
          }
        ]
      }
    }
  },
  watch: {
    'interface.dynasty': function() {
      this.option.series[0].data = this.interface.data
      this.chart.setOption(this.option)
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
    this.option.series[0].data = this.interface.data
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

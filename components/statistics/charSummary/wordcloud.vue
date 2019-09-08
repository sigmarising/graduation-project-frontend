<template>
  <div ref="echarts" style="height: 70vh"></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-wordcloud'

export default {
  props: {
    dynastySlected: {
      type: String,
      default: ''
    },
    showN: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      chart: null,
      wordData: [],
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
  computed: {},
  watch: {
    dynastySlected: {
      handler(newVal) {
        const _this = this

        const raw = _this.$store.state.poetry.rawCharsSummary[newVal]
        const arr = []
        for (const key in raw) {
          arr.push({
            name: key,
            value: raw[key][newVal]
          })
        }
        arr.sort((x, y) => {
          return y.value - x.value
        })
        _this.wordData = []
        for (const item of arr.slice(0, _this.showN)) {
          _this.wordData.push(item)
        }
        _this.option.series[0].data = _this.wordData
        _this.chart.setOption(_this.option)
      }
    }
  },
  mounted() {
    const _this = this
    _this.chart = echarts.init(_this.$refs.echarts)
    window.addEventListener('resize', _this.resizeHandler)
  },
  destroyed() {
    const _this = this
    window.removeEventListener('resize', _this.resizeHandler)
    this.chart.dispose()
  },
  methods: {
    resizeHandler() {
      this.chart.resize()
    }
  }
}
</script>

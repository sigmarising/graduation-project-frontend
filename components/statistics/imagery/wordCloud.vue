<template>
  <div ref="chart" style="height: 50vh"></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-wordcloud'

export default {
  props: {
    topN: {
      type: Number,
      default: 67
    },
    selected: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      imagerys: this.$store.state.poetry.imagery,
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
    selected(newVal) {
      this.updateData(newVal)
      this.chart.setOption(this.option)
    }
  },
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
    },
    updateData(dynasty) {
      const _this = this
      const raw = _this.$store.state.poetry.rawImagery[dynasty]
      const arr = []
      for (const v of _this.imagerys) {
        arr.push({
          name: v,
          value: raw[v]
        })
      }
      arr.sort((x, y) => y.value - x.value)
      _this.option.series[0].data = arr
    }
  }
}
</script>

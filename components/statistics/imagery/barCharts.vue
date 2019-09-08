<template>
  <div ref="chart" style="height: 50vh"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    topN: {
      type: Number,
      default: 30
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
    selected(newVal) {
      this.updateData(newVal)
      this.chart.setOption(this.option)
    }
  },
  created() {},
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
    this.chart.dispose()
  },
  methods: {
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
      const _x = []
      const _data = []
      for (const item of arr.slice(0, this.topN)) {
        _x.push(item.name)
        _data.push(item.value)
      }

      _this.option.xAxis.data = _x
      _this.option.series[0].data = _data
    },
    resizeHandler() {
      this.chart.resize()
    }
  }
}
</script>

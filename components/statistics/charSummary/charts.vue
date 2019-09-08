<template>
  <div ref="charts" style="height: 70vh"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    selected: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      raw: null,
      dynastys: this.$store.state.poetry.dynastys,
      option: {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'cross'
          },
          formatter(params) {
            return (
              params.name +
              ' | ' +
              params.seriesName +
              ' | 字频：' +
              params.value.toFixed(7)
            )
          },
          label: {
            fontWeight: 'bold'
          }
        },
        legend: {},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          name: '朝代',
          type: 'category',
          data: [
            '先秦',
            '汉',
            '魏晋',
            '南北朝',
            '隋',
            '唐',
            '宋',
            '辽',
            '金',
            '元',
            '明',
            '清'
          ]
        },
        yAxis: {
          name: '百分比',
          type: 'value'
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0]
          },
          {
            type: 'inside',
            yAxisIndex: [0]
          }
        ],
        series: []
      }
    }
  },
  computed: {
    xAxis() {
      return this.$store.state.poetry.dynastys.slice(0, -1)
    }
  },
  watch: {
    selected: {
      handler(newStr) {
        this.flushData(newStr)
      },
      immediate: false
    }
  },
  mounted() {
    const _this = this
    _this.chart = echarts.init(_this.$refs.charts)
    window.addEventListener('resize', _this.resizeHandler)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
    this.chart.dispose()
  },
  methods: {
    flushData(newStr) {
      const _this = this

      _this.raw = _this.$store.state.poetry.rawCharsSummary[newStr]
      _this.option.series = []
      const arr = []
      for (const key in _this.raw) {
        arr.push(key)
      }
      arr.sort((a, b) => {
        return _this.raw[b][newStr] - _this.raw[a][newStr]
      })
      for (const key of arr.slice(0, 10)) {
        const obj = {
          name: key,
          type: 'line',
          smooth: true,
          data: [],
          emphasis: {
            label: {
              show: true,
              fontWeight: 'bold',
              formatter(params) {
                return '字频：' + params.value.toString().slice(0, 6)
              }
            },
            itemStyle: {
              borderWidth: 5
            }
          }
        }
        for (const val of _this.xAxis) {
          obj.data.push(_this.raw[key][val])
        }
        _this.option.series.push(obj)
      }
      _this.chart.setOption(_this.option)
    },
    resizeHandler() {
      this.chart.resize()
    }
  }
}
</script>

<template>
  <div style="padding: 4px">
    <div ref="chart" style="height: 75vh"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china'

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
        backgroundColor: '#404A59',
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params.name + ' : ' + params.value[2]
          }
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'bottom',
          data: ['地点影响力'],
          textStyle: {
            color: '#FFFFFF'
          }
        },
        visualMap: {
          min: 0,
          max: null,
          range: [],
          calculable: true,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d']
          },
          textStyle: {
            color: '#FFFFFF'
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: null,
            symbolSize: 15,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#FFFFFF',
                borderWidth: 3
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    'interface.dynasty': function() {
      this.updateValue()
      this.chart.setOption(this.option)
    }
  },
  created() {
    this.updateValue()
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
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
    },
    updateValue() {
      this.option.series[0].data = this.interface.data
      let max = -1
      for (const item of this.interface.data) {
        if (item.value[2] > max) max = item.value[2]
      }
      this.option.visualMap.max = max
      this.option.visualMap.range = [0, max]
    }
  }
}
</script>

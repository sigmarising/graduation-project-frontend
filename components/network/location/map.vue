<template>
  <div style="padding: 4px">
    <div ref="chart" style="height: 90vh"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china'

export default {
  props: {
    all: {
      type: Object,
      default() {
        return {
          color: '',
          nodes: [],
          edges: []
        }
      }
    }
  },
  data() {
    return {
      chart: null,
      option: {
        backgroundColor: '#404a59',
        tooltip: {
          trigger: 'item'
        },
        legend: {},
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#404a59'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 1,
              color: '#fff',
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                color: null,
                width: 0,
                curveness: 0.2
              }
            },
            data: null
          },
          {
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 10,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: 'triangle',
              symbolSize: 10
            },
            lineStyle: {
              normal: {
                color: null,
                width: 1,
                opacity: 0.6,
                curveness: 0.2
              }
            },
            data: null
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}'
              }
            },
            // symbolSize: function(val) {
            //   return val[2] / 8
            // },
            itemStyle: {
              normal: {
                color: null
              }
            },
            data: null
          }
        ]
      }
    }
  },
  watch: {
    'all.color': function(obj) {
      this.option.series[0].data = this.all.edges
      this.option.series[1].data = this.all.edges
      this.option.series[2].data = this.all.nodes
      this.option.series[0].lineStyle.normal.color = this.all.color
      this.option.series[1].lineStyle.normal.color = this.all.color
      this.option.series[2].itemStyle.normal.color = this.all.color
      this.chart.setOption(this.option)
    }
  },
  created() {},
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
    // this.chart.setOption(this.option)
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

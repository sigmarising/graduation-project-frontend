<template>
  <div ref="chart" style="height: 80vh"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    layout: {
      type: String,
      default: 'none'
    },
    categories: {
      type: Array,
      default() {
        return []
      }
    },
    nodes: {
      type: Array,
      default() {
        return []
      }
    },
    edges: {
      type: Array,
      default() {
        return []
      }
    },
    draggable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null,
      option: {
        tooltip: {},
        legend: {},
        animationDuration: 1500,
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: this.layout,
            data: this.nodes,
            links: this.edges,
            categories: this.categories,
            hoverAnimation: true,
            roam: true,
            draggable: this.draggable,
            focusNodeAdjacency: true,
            edgeSymbol: ['none', 'none'],
            edgeSymbolSize: [10, 10],
            itemStyle: {
              borderColor: '#FFF',
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            label: {
              position: 'right'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              lineStyle: {
                width: 7
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    nodes(newVal) {
      this.option.series[0].data = newVal
      this.chart.setOption(this.option)
    },
    edges(newVal) {
      this.option.series[0].links = newVal
      this.chart.setOption(this.option)
    }
  },
  created() {
    const _this = this
    switch (_this.layout) {
      case 'circular':
        _this.option.series[0].circular = {
          rotateLabel: true
        }
        break
      case 'force':
        _this.option.series[0].force = {
          repulsion: 50,
          gravity: 0.1,
          edgeLength: 30,
          layoutAnimation: true
        }
        break
      default:
        break
    }
  },
  mounted() {
    const _this = this
    _this.chart = echarts.init(_this.$refs.chart)
    _this.chart.setOption(_this.option)
    window.addEventListener('resize', _this.resizeHandler)
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

<template>
  <div>
    <!-- 单选按钮 -->
    <v-flex class="card">
      <v-card>
        <v-layout column align-center justify-center>
          <v-flex>
            <v-card-text>
              <p class="headline">朝代选择:</p>
              <v-radio-group v-model="dynastySelected" row>
                <v-radio
                  v-for="(dynasty, index) in dynastys"
                  :key="index"
                  :label="dynasty"
                  :value="dynasty"
                ></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <!-- echarts area -->
    <v-layout row wrap>
      <!-- barcharts -->
      <v-flex xs12 class="card">
        <v-card>
          <v-card-title>
            <p class="title" style="margin">
              {{ dynastySelected }} - 常用词 词频 Top 20 排行
            </p>
          </v-card-title>
          <!-- charts -->
          <barChart :interface="interfaceBar"></barChart>
        </v-card>
      </v-flex>
      <!-- linecharts -->
      <v-flex xs12 class="card">
        <v-card>
          <v-card-title>
            <p class="title" style="margin">
              {{ dynastySelected }} - 常用词 词频 趋势
            </p>
          </v-card-title>
          <!-- charts -->
          <lineChart :interface="interfaceLine"></lineChart>
        </v-card>
      </v-flex>
      <!-- wordcloud -->
      <v-flex xs12 class="card">
        <v-card>
          <v-card-title>
            <p class="title" style="margin">
              {{ dynastySelected }} - 常用词词云
            </p>
          </v-card-title>
          <!-- charts -->
          <wc :interface="interfaceWc"></wc>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- float btn -->
    <floatBtn :dialog-title="dialogTitle" :dialog-content="dialogContent">
    </floatBtn>
  </div>
</template>

<script>
import barChart from '@/components/statistics/wordSummary/barCharts.vue'
import lineChart from '@/components/statistics/wordSummary/lineCharts.vue'
import wc from '@/components/statistics/people/wcCharts.vue'
import floatBtn from '@/components/floatBtn.vue'
import axios from 'axios'

export default {
  components: {
    barChart,
    lineChart,
    wc,
    floatBtn
  },
  data() {
    return {
      topN: 100,
      dynastySelected: '',
      dynastys: this.$store.state.poetry.dynastys,
      rawSummary: null,
      interfaceBar: {
        data: [],
        xAxis: [],
        dynasty: ''
      },
      interfaceLine: {
        series: [],
        dynasty: ''
      },
      interfaceWc: {
        data: [],
        dynasty: ''
      },
      dialogTitle: '常用词统计',
      dialogContent: `对于原始数据集，使用 CRF++ 进行了分词处理，并进行了词频统计，
      给出了对应朝代的常用词随着历史变化的词频变化趋势。`
    }
  },
  computed: {
    dynastysSlice() {
      return this.dynastys.slice(0, -1)
    }
  },
  watch: {
    dynastySelected(newVal) {
      this.updateData(newVal)
    }
  },
  async asyncData() {
    const { data } = await axios.get('/api/v1/wordSummary')
    return {
      rawData: data
    }
  },
  created() {
    this.dynastySelected = '先秦'
    this.updateData(this.dynastySelected)
  },

  methods: {
    findWordArr(word) {
      const result = []
      for (const dynasty of this.dynastysSlice) {
        const raw = this.rawData[dynasty]
        let needZero = true
        for (const item of raw) {
          if (item.name === word) {
            result.push(item.value)
            needZero = false
            break
          }
        }
        if (needZero) {
          result.push(0)
        }
      }
      return result
    },
    updateData(dynasty) {
      const _this = this
      const rawData = _this.rawData[dynasty]

      _this.interfaceBar.data = []
      _this.interfaceBar.xAxis = []
      _this.interfaceLine.series = []
      _this.interfaceWc.data = []

      let count = 0
      for (const item of rawData) {
        count += 1

        if (count <= 20) {
          _this.interfaceBar.xAxis.push(item.name)
          _this.interfaceBar.data.push(item.value)
        }

        if (count <= 10) {
          const obj = {
            name: item.name,
            type: 'line',
            smooth: true,
            data: _this.findWordArr(item.name),
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
          _this.interfaceLine.series.push(obj)
        }

        if (count <= 200) {
          _this.interfaceWc.data.push(item)
        }
      }
      _this.interfaceBar.dynasty = dynasty
      _this.interfaceLine.dynasty = dynasty
      _this.interfaceWc.dynasty = dynasty
    }
  }
}
</script>

<style scoped>
.card {
  padding: 4px;
}
</style>

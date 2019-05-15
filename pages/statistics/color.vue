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
    <!-- echarts -->
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 class="card">
        <v-card>
          <v-card-title>
            <p class="title text-xs-center">
              {{ dynastySelected }} - 颜色使用占比:
            </p>
          </v-card-title>
          <pie :the-data="pieData.data" :the-color="pieData.color"> </pie>
        </v-card>
      </v-flex>
      <v-flex
        v-for="item in barData"
        :key="item.color"
        class="card"
        xs12
        sm6
        md4
      >
        <v-card>
          <v-card-title>
            <p class="title text-xs-center">
              {{ dynastySelected }} - {{ item.color }}色具体占比:
            </p>
          </v-card-title>
          <bar
            :the-data="item.data"
            :the-x="item.x"
            :the-color="colorMap[item.color]"
          ></bar>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- float btn -->
    <floatBtn :dialog-title="dialogTitle" :dialog-content="dialogContent">
    </floatBtn>
  </div>
</template>

<script>
import pie from '@/components/statistics/color/pieCharts.vue'
import bar from '@/components/statistics/color/barCharts.vue'
import floatBtn from '@/components/floatBtn.vue'

export default {
  components: {
    bar,
    pie,
    floatBtn
  },
  data() {
    return {
      dynastySelected: '',
      dynastys: this.$store.state.poetry.dynastys,
      rawData: null,
      pieData: {
        color: [],
        data: []
      },
      barData: [],
      colorMap: {
        白: '#B0BEC5',
        黑: '#424242',
        红: '#F44336',
        黄: '#FFD600',
        蓝: '#0277BD',
        绿: '#4CAF50',
        紫: '#9C27B0'
      },
      dialogTitle: '颜色统计',
      dialogContent: `首先将古诗文中的颜色，分为了七个色系，并将古诗文中代表颜色的五十个字，划分进七个色系，
      并对各个朝代的颜色字进行了统计`
    }
  },
  watch: {
    dynastySelected(newVal) {
      this.updatePieData(newVal)
      this.updateBarData(newVal)
    }
  },
  created() {
    this.initData()
  },
  methods: {
    updatePieData(dynasty) {
      const _this = this
      const raw = _this.rawData[dynasty]

      const _pieColor = []
      const _pieData = []
      const arr = []
      for (const key in raw) {
        if (key !== 'summary') {
          if (raw[key].summary > 0) {
            arr.push({
              name: key,
              value: raw[key].summary
            })
          }
        }
      }
      arr.sort((x, y) => y.value - x.value)
      for (const item of arr) {
        _pieColor.push(_this.colorMap[item.name])
        _pieData.push(item)
      }
      _this.pieData.color = _pieColor
      _this.pieData.data = _pieData
    },
    updateBarData(dynasty) {
      const _this = this
      const raw = _this.rawData[dynasty]
      _this.barData = []

      for (const color in raw) {
        if (color !== 'summary') {
          const _x = []
          const _data = []
          const _arr = []
          for (const detial in raw[color]) {
            if (detial !== 'summary') {
              _arr.push({ name: detial, value: raw[color][detial] })
            }
          }
          _arr.sort((x, y) => y.value - x.value)
          for (const item of _arr) {
            _x.push(item.name)
            _data.push(item.value)
          }
          _this.barData.push({
            color: color,
            summary: raw[color].summary,
            x: _x,
            data: _data
          })
        }
      }
      _this.barData.sort((x, y) => y.summary - x.summary)
    },
    initData: async function() {
      const _this = this
      const res = await _this.$axios.get('/api/v1/colorSummary')
      _this.rawData = res.data

      _this.dynastySelected = '先秦'
      _this.updatePieData(_this.dynastySelected)
      _this.updateBarData(_this.dynastySelected)
    }
  }
}
</script>

<style scoped>
.card {
  padding: 4px;
}
</style>

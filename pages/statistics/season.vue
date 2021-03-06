<template>
  <div>
    <!-- 单选按钮 -->
    <v-flex class="card">
      <v-card>
        <v-layout column align-center justify-center>
          <v-flex>
            <v-card-text>
              <p class="headline" style="margin: 0">朝代选择:</p>
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
    <!-- echarts 区域 -->
    <v-layout row wrap>
      <v-flex
        v-for="item in allData"
        :key="item.name"
        class="card"
        xs12
        sm6
        md4
      >
        <v-card>
          <v-card-title>
            <p class="title text-xs-center">
              {{ dynastySelected }} - {{ item.name }}:
            </p>
          </v-card-title>
          <pie :selected="dynastySelected" :the-data="item.value"></pie>
        </v-card>
      </v-flex>
      <v-flex class="card" xs12>
        <v-card>
          <v-card-title>
            <p class="title text-xs-center">
              {{ dynastySelected }} - 节气多样性排名:
            </p>
          </v-card-title>
          <bar :the-data="barData" :the-x="barX"></bar>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- float btn -->
    <floatBtn :dialog-title="dialogTitle" :dialog-content="dialogContent">
    </floatBtn>
  </div>
</template>

<script>
/* eslint-disable */
import pie from '@/components/statistics/season/pieCharts.vue'
import bar from '@/components/statistics/season/barCharts.vue'
import floatBtn from '@/components/floatBtn.vue'

export default {
  components: { pie, bar, floatBtn },
  data() {
    return {
      season: ['春', '夏', '秋', '冬'],
      solarTerm: [
        '立春',
        '雨水',
        '惊蛰',
        '春分',
        '清明',
        '谷雨',
        '立夏',
        '小满',
        '芒种',
        '夏至',
        '小暑',
        '大暑',
        '立秋',
        '处暑',
        '白露',
        '秋分',
        '寒露',
        '霜降',
        '立冬',
        '小雪',
        '大雪',
        '冬至',
        '小寒',
        '大寒'
      ],
      dynastySelected: '',
      dynastys: this.$store.state.poetry.dynastys,
      barData: [],
      barX: [],
      rawData: {
        season: null,
        solarTerm: null
      },
      allData: {},
      dialogTitle: '节气与季节统计',
      dialogContent: `对数据集中出现的季节、节气进行统计，并进行了占比分析。结果中包含了对四季用字的统计，以及各个
      季节的节气的统计`
    }
  },
  watch: {
    dynastySelected(newVal) {
      this.setAllData(newVal)
    }
  },
  created() {
    const _this = this
    _this.getInit()
  },
  methods: {
    setAllData(dynasty) {
      const _this = this
      _this.allData = []

      const _season = []
      const _all = []
      const _spring = []
      const _summer = []
      const _fall = []
      const _winter = []

      for (const i of _this.season) {
        const item = {
          name: i,
          value: _this.rawData.season[dynasty][i]
        }
        if (item.value > 0) _season.push(item)
      }

      let count = 0
      for (const i of _this.solarTerm) {
        count += 1
        const item = { name: i, value: _this.rawData.solarTerm[dynasty][i] }

        if (item.value > 0) {
          _all.push(item)
          if (1 <= count && count <= 6) {
            _spring.push(item)
          } else if (7 <= count && count <= 12) {
            _summer.push(item)
          } else if (13 <= count && count <= 18) {
            _fall.push(item)
          } else {
            _winter.push(item)
          }
        }
      }

      if (_season.length === 0) _season.push({ name: '无', value: 0 })
      if (_all.length === 0) _all.push({ name: '无', value: 0 })
      if (_spring.length === 0) _spring.push({ name: '无', value: 0 })
      if (_summer.length === 0) _summer.push({ name: '无', value: 0 })
      if (_fall.length === 0) _fall.push({ name: '无', value: 0 })
      if (_winter.length === 0) _winter.push({ name: '无', value: 0 })
      const compare1 = (x, y) => x.value - y.value
      const compare2 = (x, y) => y.value - x.value
      _season.sort(compare1)
      _all.sort(compare1)
      _spring.sort(compare1)
      _summer.sort(compare1)
      _fall.sort(compare1)
      _winter.sort(compare1)
      _this.allData.push({ name: '季节统计', value: _season })
      _this.allData.push({ name: '节气统计', value: _all })
      _this.allData.push({ name: '春季节气', value: _spring })
      _this.allData.push({ name: '夏季节气', value: _summer })
      _this.allData.push({ name: '秋季节气', value: _fall })
      _this.allData.push({ name: '冬季节气', value: _winter })

      const barRaw = []
      for (const item of _this.solarTerm) {
        barRaw.push({
          name: item,
          value: _this.rawData.solarTerm[dynasty][item]
        })
      }
      barRaw.sort(compare2)
      _this.barData = []
      _this.barX = []
      for (const item of barRaw) {
        _this.barX.push(item.name)
        _this.barData.push(item.value)
      }
    },
    getInit: async function() {
      const _this = this
      const dataSeason = await _this.$axios.get('/api/v1/seasonSummary')
      const dataSolarTerm = await _this.$axios.get('/api/v1/solarTermSummary')
      _this.rawData.season = dataSeason.data
      _this.rawData.solarTerm = dataSolarTerm.data

      _this.dynastySelected = '先秦'
      _this.setAllData(_this.dynastySelected)
    }
  }
}
</script>

<style scoped>
.card {
  padding: 4px;
}
</style>

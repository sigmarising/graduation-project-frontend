<template>
  <div>
    <!-- 单选按钮 -->
    <v-layout column align-center justify-center>
      <v-flex>
        <div>
          <p class="headline">朝代选择:</p>
          <v-radio-group v-model="dynastySelected" row>
            <v-radio
              v-for="(dynasty, index) in dynastys"
              :key="index"
              :label="dynasty"
              :value="dynasty"
            ></v-radio>
          </v-radio-group>
        </div>
      </v-flex>
    </v-layout>
    <!-- echarts 区域 -->
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <p class="title text-xs-center">{{ dynastySelected }} - 季节统计:</p>
        <pie :selected="dynastySelected" :the-data="allData.season"></pie>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <p class="title text-xs-center">{{ dynastySelected }} - 节气统计:</p>
        <pie :selected="dynastySelected" :the-data="allData.all"></pie>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <p class="title text-xs-center">{{ dynastySelected }} - 春季节气:</p>
        <pie :selected="dynastySelected" :the-data="allData.spring"></pie>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <p class="title text-xs-center">{{ dynastySelected }} - 夏季节气:</p>
        <pie :selected="dynastySelected" :the-data="allData.summer"></pie>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <p class="title text-xs-center">{{ dynastySelected }} - 秋季节气:</p>
        <pie :selected="dynastySelected" :the-data="allData.fall"></pie>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <p class="title text-xs-center">{{ dynastySelected }} - 冬季节气:</p>
        <pie :selected="dynastySelected" :the-data="allData.winter"></pie>
      </v-flex>
      <v-flex xs12>
        <p class="title text-xs-center">
          {{ dynastySelected }} - 节气多样性柱形图:
        </p>
        <bar :the-data="barData" :the-x="barX"></bar>
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
      allData: {
        season: null,
        all: null,
        spring: null,
        summer: null,
        fall: null,
        winter: null
      },
      dialogTitle: '处理方法',
      dialogContent: `对于原始数据集，依据朝代的不同，分别统计常用字 Top100 排名，
      并依次获取每个朝代的常用字在其他朝代的使用情况。
      其中处理数据时，去掉了一些虚词、语气词、标点。`
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

      _this.allData.season = []
      _this.allData.all = []
      _this.allData.spring = []
      _this.allData.summer = []
      _this.allData.fall = []
      _this.allData.winter = []

      for (const i of _this.season) {
        const item = {
          name: i,
          value: _this.rawData.season[dynasty][i]
        }
        if (item.value > 0) _this.allData.season.push(item)
      }

      let count = 0
      for (const i of _this.solarTerm) {
        count += 1
        const item = { name: i, value: _this.rawData.solarTerm[dynasty][i] }

        if (item.value > 0) {
          _this.allData.all.push(item)

          if (1 <= count && count <= 6) {
            _this.allData.spring.push(item)
          } else if (7 <= count && count <= 12) {
            _this.allData.summer.push(item)
          } else if (13 <= count && count <= 18) {
            _this.allData.fall.push(item)
          } else {
            _this.allData.winter.push(item)
          }
        }
      }
      for (const key in _this.allData) {
        if (_this.allData[key].length === 0) {
          _this.allData[key].push({ name: '无', value: 0 })
        }
      }
      const compare1 = (x, y) => x.value - y.value
      const compare2 = (x, y) => y.value - x.value
      _this.allData.season.sort(compare1)
      _this.allData.all.sort(compare1)
      _this.allData.spring.sort(compare1)
      _this.allData.summer.sort(compare1)
      _this.allData.fall.sort(compare1)
      _this.allData.winter.sort(compare1)

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

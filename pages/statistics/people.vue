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
      <v-flex class="card" xs12>
        <v-card>
          <v-card-title>
            <p class="title text-xs-left">
              {{ dynastySelected }} - 人物影响力排行:
            </p>
          </v-card-title>
          <bar :interface="interfaceBar"></bar>
        </v-card>
      </v-flex>
      <v-flex class="card" xs12>
        <v-card>
          <v-card-title>
            <p class="title text-xs-left">
              {{ dynastySelected }} - 人物影响力词云图:
            </p>
          </v-card-title>
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
import bar from '@/components/statistics/people/barCharts.vue'
import wc from '@/components/statistics/people/wcCharts.vue'
import floatBtn from '@/components/floatBtn.vue'
import axios from 'axios'

export default {
  components: {
    bar,
    wc,
    floatBtn
  },
  data() {
    return {
      dynastySelected: '',
      dynastys: this.$store.state.poetry.dynastys,
      limited: 20,
      interfaceBar: {
        xAxis: [],
        data: [],
        dynasty: ''
      },
      interfaceWc: {
        data: [],
        dynasty: ''
      },
      dialogTitle: '人物影响力',
      dialogContent: `对原始数据集运行 Lattice LSTM 模型进行 NER，将其中所有诗人提
      及到的人物进行统计，并排名，得出了统计学意义上的人物影响力排名`
    }
  },
  watch: {
    dynastySelected(newVal) {
      this.updateData(newVal)
    }
  },
  async asyncData() {
    const { data } = await axios.get('/api/v1/impactPerson')
    return {
      rawData: data
    }
  },
  created() {
    const _this = this
    _this.dynastySelected = '先秦'
  },
  methods: {
    updateData(dynasty) {
      const _this = this
      const raw = _this.rawData[dynasty]
      const arr = raw.sort((a, b) => b.value - a.value)
      // const result = arr.slice(0, _this.limited)

      _this.interfaceBar.xAxis = []
      _this.interfaceBar.data = []
      _this.interfaceWc.data = []
      let count = 1
      for (const item of arr) {
        if (count <= _this.limited) {
          _this.interfaceBar.xAxis.push(item.name)
          _this.interfaceBar.data.push(item.value)
          count += 1
        }
        _this.interfaceWc.data.push(item)
      }
      _this.interfaceBar.dynasty = dynasty
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

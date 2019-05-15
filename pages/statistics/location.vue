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
            <p class="title text-xs-left" style="margin: 0">
              {{ dynastySelected }} - 地点影响力：
            </p>
          </v-card-title>
          <theMap :interface="interfaceMap"></theMap>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- float btn -->
    <floatBtn :dialog-title="dialogTitle" :dialog-content="dialogContent">
    </floatBtn>
  </div>
</template>

<script>
import floatBtn from '@/components/floatBtn.vue'
import theMap from '@/components/statistics/location/map.vue'
import axios from 'axios'

export default {
  components: {
    floatBtn,
    theMap
  },
  data() {
    return {
      dynastySelected: '',
      dynastys: this.$store.state.poetry.dynastys,
      interfaceMap: {
        data: [],
        dynasty: ''
      },
      dialogTitle: '地点影响力',
      dialogContent: `对原始数据集运行 Lattice LSTM 模型进行 NER，将其中所有诗人提
      及到的地点进行统计，并排名，得出了统计学意义上的地点影响力排名`
    }
  },
  watch: {
    dynastySelected(newDynasty) {
      this.updateData(newDynasty)
    }
  },
  async asyncData() {
    const { data } = await axios.get('/api/v1/impactLocation')
    return {
      allData: data
    }
  },
  created() {
    this.dynastySelected = '先秦'
  },
  methods: {
    updateData(dynasty) {
      this.interfaceMap.data = []
      this.interfaceMap.data = this.allData[dynasty]
      this.interfaceMap.dynasty = dynasty
    }
  }
}
</script>

<style scoped>
.card {
  padding: 4px;
}
</style>

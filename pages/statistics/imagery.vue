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
              {{ dynastySelected }} - 意象使用排行:
            </p>
          </v-card-title>
          <bar :selected="dynastySelected"></bar>
        </v-card>
      </v-flex>
      <v-flex class="card" xs12>
        <v-card>
          <v-card-title>
            <p class="title text-xs-left">
              {{ dynastySelected }} - 意象词云图:
            </p>
          </v-card-title>
          <wc :selected="dynastySelected"></wc>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- float btn -->
    <floatBtn :dialog-title="dialogTitle" :dialog-content="dialogContent">
    </floatBtn>
  </div>
</template>

<script>
import bar from '@/components/statistics/imagery/barCharts.vue'
import wc from '@/components/statistics/imagery/wordCloud.vue'
import floatBtn from '@/components/floatBtn.vue'

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
      imagerys: this.$store.state.poetry.imagery,
      rawImagerys: null,
      dialogTitle: '意象统计',
      dialogContent: `首先收录了常见意象词50个以上，并对各个朝代出现的意象进行了分析与对比排名`
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData: async function() {
      const _this = this
      const res = await _this.$axios.get('/api/v1/imagerySummary')
      _this.$store.commit('poetry/updateImagery', res.data)
      _this.rawImagerys = res.data
      _this.dynastySelected = '先秦'
    }
  }
}
</script>

<style scoped>
.card {
  padding: 4px;
}
</style>

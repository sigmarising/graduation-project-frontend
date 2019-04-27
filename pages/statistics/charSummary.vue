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
      <!-- 折线趋势图 -->
      <v-flex xs12 class="card">
        <v-card>
          <v-card-title>
            <p class="title">{{ dynastySelected }} - 常用字变化趋势:</p>
          </v-card-title>
          <charts :selected="dynastySelected"></charts>
        </v-card>
      </v-flex>
      <!-- 词云显示 -->
      <v-flex xs12 class="card">
        <v-card>
          <v-card-title>
            <p class="title">{{ dynastySelected }} - 常用字词云图:</p>
          </v-card-title>
          <wc :dynasty-slected="dynastySelected"></wc>
        </v-card>
      </v-flex>
      <!-- 表格显示 -->
      <v-flex xs12 class="card">
        <v-card>
          <v-card-title>
            <p class="title">{{ dynastySelected }} - 常用字统计表:</p>
          </v-card-title>
          <Mtable :selected="dynastySelected"></Mtable>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- float btn -->
    <floatBtn :dialog-title="dialogTitle" :dialog-content="dialogContent">
    </floatBtn>
  </div>
</template>

<script>
import charts from '@/components/statistics/charSummary/charts.vue'
import Mtable from '@/components/statistics/charSummary/table.vue'
import wc from '@/components/statistics/charSummary/wordcloud.vue'
import floatBtn from '@/components/floatBtn.vue'

export default {
  components: { charts, Mtable, floatBtn, wc },
  data() {
    return {
      dynastySelected: '',
      dynastys: this.$store.state.poetry.dynastys,
      rawSummary: null,
      dialogTitle: '处理方法',
      dialogContent: `对于原始数据集，依据朝代的不同，分别统计常用字 Top100 排名，
      并依次获取每个朝代的常用字在其他朝代的使用情况。
      其中处理数据时，去掉了一些虚词、语气词、标点。`
    }
  },
  created() {
    const _this = this
    _this.$axios.get('/api/v1/charSummary').then(res => {
      _this.$store.commit('poetry/updateSummary', res.data)
      _this.rawSummary = _this.$store.state.rawCharsSummary
      _this.dynastySelected = '先秦'
    })
  }
}
</script>

<style scoped>
.card {
  padding: 4px;
}
</style>

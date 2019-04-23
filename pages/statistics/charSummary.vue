<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <!-- 单选按钮 -->
      <div class="radio">
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
      <!-- 折线趋势图 -->
      <div>
        <p class="title">{{ dynastySelected }} - 常用字变化趋势:</p>
        <charts :selected="dynastySelected"></charts>
      </div>
      <!-- 表格显示 -->
      <div>
        <p class="title">{{ dynastySelected }} - 常用字统计表:</p>
        <Mtable :selected="dynastySelected"></Mtable>
      </div>
      <!-- float btn -->
      <floatBtn
        :dialog-title="dialogTitle"
        :dialog-content="dialogContent"
      ></floatBtn>
    </v-flex>
  </v-layout>
</template>

<script>
import charts from '@/components/statistics/charSummary/charts.vue'
import Mtable from '@/components/statistics/charSummary/table.vue'
import floatBtn from '@/components/floatBtn.vue'

export default {
  components: { charts, Mtable, floatBtn },
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

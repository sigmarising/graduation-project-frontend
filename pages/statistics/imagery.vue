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
    <!-- echarts -->
    <v-layout row wrap>
      <v-flex xs12>
        <p class="title text-xs-left">{{ dynastySelected }} - 意象使用排行:</p>
        <bar :selected="dynastySelected"></bar>
      </v-flex>
      <v-flex xs12>
        <p class="title text-xs-left">{{ dynastySelected }} - 意象词云图:</p>
        <wc :selected="dynastySelected"></wc>
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
      dialogTitle: '处理方法',
      dialogContent: `对于原始数据集，依据朝代的不同，分别统计常用字 Top100 排名，
      并依次获取每个朝代的常用字在其他朝代的使用情况。
      其中处理数据时，去掉了一些虚词、语气词、标点。`
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

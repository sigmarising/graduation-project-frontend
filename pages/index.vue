<template>
  <div>
    <v-layout row align-center justify-center wrap>
      <v-flex xs12 sm8 md12 text-xs-center>
        <p class="display-3">古诗文数据挖掘</p>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12 sm8 md12 text-xs-left style="margin-top: 10px">
        <p class="title">数据集统计展示：</p>
      </v-flex>
      <v-flex xs12 md6>
        <dataCharts
          title="各朝代诗词数量统计"
          color="#C23531"
          :the-data="dataDynasty"
        >
        </dataCharts>
      </v-flex>
      <v-flex xs12 md6>
        <dataCharts
          title="各朝代诗人数量统计"
          color="#2F4554"
          :the-data="dataAuthor"
        >
        </dataCharts>
      </v-flex>
      <floatBtn
        :dialog-title="btnTitle"
        :dialog-content="btnContent"
        btn-icon="assessment"
      ></floatBtn>
    </v-layout>
  </div>
</template>

<script>
import dataCharts from '@/components/dataSetCharts.vue'
import floatBtn from '@/components/floatBtn.vue'

export default {
  components: {
    dataCharts,
    floatBtn
  },
  data() {
    return {
      dynastys: this.$store.state.poetry.dynastys.slice(0, -1),
      objDynasty: {
        元: 10361,
        先秦: 452,
        南北朝: 1726,
        唐: 45358,
        宋: 204722,
        明: 11114,
        汉: 1013,
        清: 3048,
        辽: 21,
        金: 821,
        隋: 174,
        魏晋: 1000
      },
      objAuthor: {
        元: 433,
        先秦: 8,
        南北朝: 49,
        唐: 2407,
        宋: 7930,
        明: 162,
        汉: 25,
        清: 235,
        辽: 9,
        金: 23,
        隋: 14,
        魏晋: 33
      },
      btnTitle: '数据集说明',
      btnContent: `本课题使用的数据集，来自“国学大师诗词曲库”以及“八斗文学诗词网”，
      数据采集使用爬虫的方式获取。经过爬虫后，对于分别获取到的两个数据集，
      使用以余弦相似度算法为核心的自查重、互查重策略进行合并，得到了本课题的最终数据集。`
    }
  },
  computed: {
    dataDynasty() {
      const _this = this
      const arr = []
      for (const i of _this.dynastys) {
        arr.push(_this.objDynasty[i])
      }
      return arr
    },
    dataAuthor() {
      const _this = this
      const arr = []
      for (const i of _this.dynastys) {
        arr.push(_this.objAuthor[i])
      }
      return arr
    }
  }
}
</script>

<template>
  <div>
    <!-- echarts layout -->
    <v-layout row wrap>
      <v-flex xs12 md6 class="card">
        <v-card>
          <v-card-title>
            <p class="title">人物关系环形图：</p>
          </v-card-title>
          <!-- echarts graph -->
          <graph
            layout="circular"
            :categories="categories"
            :nodes="nodesCircular"
            :edges="edgesCircular"
          ></graph>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 class="card">
        <v-card>
          <v-card-title>
            <p class="title">人物关系力导图：</p>
          </v-card-title>
          <!-- echarts graph -->
          <graph
            layout="force"
            :categories="categories"
            :nodes="nodesForce"
            :edges="edgesForce"
          ></graph>
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
import graph from '@/components/network/person/graph.vue'

export default {
  components: {
    floatBtn,
    graph
  },
  props: {},
  data() {
    return {
      dynastys: this.$store.state.poetry.dynastys,
      categories: null,
      nodesCircular: null,
      nodesForce: null,
      edgesCircular: null,
      edgesForce: null,
      dialogTitle: '处理方法',
      dialogContent: `对于原始数据集，依据朝代的不同，分别统计常用字 Top100 排名，
      并依次获取每个朝代的常用字在其他朝代的使用情况。
      其中处理数据时，去掉了一些虚词、语气词、标点。`
    }
  },
  watch: {},
  created() {
    const _this = this
    _this.initData()
    _this.categories = []
    const arr = _this.dynastys.slice(0, -1)
    const color = [
      '#c23531',
      '#2f4554',
      '#61a0a8',
      '#d48265',
      '#91c7ae',
      '#749f83',
      '#ca8622',
      '#bda29a',
      '#6e7074',
      '#546570',
      '#c4ccd3',
      '#9999aa'
    ]
    let index = 0
    for (const item of arr) {
      _this.categories.push({ name: item, itemStyle: { color: color[index] } })
      index += 1
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    initData: async function() {
      const _this = this
      const res = await _this.$axios.get('/api/v1/personNetwork')
      const rawData = res.data

      _this.nodesCircular = rawData.nodes
      _this.nodesForce = rawData.nodes
      _this.edgesCircular = rawData.edges
      _this.edgesForce = rawData.edges
    }
  }
}
</script>

<style scoped>
.card {
  padding: 4px;
}
</style>

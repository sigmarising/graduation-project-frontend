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
    <!-- echarts 地图 -->
    <v-layout row wrap>
      <v-flex xs12 class="card">
        <v-card>
          <v-card-title>
            <p class="title" style="margin: 0px">
              {{ dynastySelected }} - 类迁移模拟图：
            </p>
          </v-card-title>
          <theMap :all="all"></theMap>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import theMap from '@/components/network/location/map.vue'
import axios from 'axios'

export default {
  components: {
    theMap
  },
  data() {
    return {
      dynastySelected: '',
      dynastys: this.$store.state.poetry.dynastys.slice(0, -1),
      color: [
        '#e01f54',
        '#27727b',
        '#fcce10',
        '#e87c25',
        '#b5c334',
        '#fe8463',
        '#9bca63',
        '#fad860',
        '#f3a43b',
        '#60c0dd',
        '#c6e579',
        '#f4e001'
      ],
      all: {
        color: '',
        nodes: [],
        edges: []
      }
    }
  },
  watch: {
    dynastySelected(newVal) {
      this.all.nodes = this.raw[newVal].nodes
      this.all.edges = this.raw[newVal].edges
      this.all.color = this.color[this.dynastys.indexOf(newVal)]
    }
  },
  async asyncData() {
    const { data } = await axios.get('/api/v1/locationNetwork')
    return {
      raw: data
    }
  },
  created() {
    this.dynastySelected = '唐'
  }
}
</script>

<style scoped>
.card {
  padding: 4px;
}
</style>

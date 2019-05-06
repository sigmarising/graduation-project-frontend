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
      this.all.nodes = this.raw.nodes
      this.all.edges = this.raw.edges
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
    this.dynastySelected = '先秦'
  }
}
</script>

<style scoped>
.card {
  padding: 4px;
}
</style>

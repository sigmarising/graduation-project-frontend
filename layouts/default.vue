<template>
  <!-- 应用 -->
  <v-app>
    <!-- 导航栏 -->
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>
        <!-- 主页 -->
        <v-list-tile to="/" router exact>
          <v-list-tile-action><v-icon>home</v-icon></v-list-tile-action>
          <v-list-tile-title>主页</v-list-tile-title>
        </v-list-tile>
        <!-- group 统计分析 -->
        <v-list-group prepend-icon="assignment" no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>统计分析</v-list-tile-title>
            </v-list-tile>
          </template>
          <!-- sub 基于字的分析 -->
          <v-list-group sub-group no-action>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>基于字的分析</v-list-tile-title>
                <v-list-tile-action><v-icon>code</v-icon></v-list-tile-action>
              </v-list-tile>
            </template>
            <!-- subpage 常用字 -->
            <v-list-tile to="/statistics/charSummary" router exact>
              <v-list-tile-title>常用字统计分析</v-list-tile-title>
              <v-list-tile-action
                ><v-icon>bar_chart</v-icon></v-list-tile-action
              >
            </v-list-tile>
            <!-- subpage 颜色 -->
            <v-list-tile to="/statistics/color" router exact>
              <v-list-tile-title>颜色统计分析</v-list-tile-title>
              <v-list-tile-action
                ><v-icon>bar_chart</v-icon></v-list-tile-action
              >
            </v-list-tile>
          </v-list-group>
          <!-- sub 基于词的分析 -->
          <v-list-group sub-group no-action>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>基于词的分析</v-list-tile-title>
                <v-list-tile-action><v-icon>code</v-icon></v-list-tile-action>
              </v-list-tile>
            </template>
            <!-- subpage 常用词 -->
            <v-list-tile to="/statistics/wordSummary" router exact>
              <v-list-tile-title>常用词统计分析</v-list-tile-title>
              <v-list-tile-action
                ><v-icon>bar_chart</v-icon></v-list-tile-action
              >
            </v-list-tile>
            <!-- subpage 季节与节气 -->
            <v-list-tile to="/statistics/season" router exact>
              <v-list-tile-title>季节/节气分析</v-list-tile-title>
              <v-list-tile-action
                ><v-icon>bar_chart</v-icon></v-list-tile-action
              >
            </v-list-tile>
            <!-- subpage 意象分析 -->
            <v-list-tile to="/statistics/imagery" router exact>
              <v-list-tile-title>意象统计分析</v-list-tile-title>
              <v-list-tile-action
                ><v-icon>bar_chart</v-icon></v-list-tile-action
              >
            </v-list-tile>
            <!-- subpage 人物影响力 -->
            <v-list-tile to="/statistics/people" router exact>
              <v-list-tile-title>人物影响力</v-list-tile-title>
              <v-list-tile-action
                ><v-icon>bar_chart</v-icon></v-list-tile-action
              >
            </v-list-tile>
            <!-- subpage 地点影响力 -->
            <v-list-tile to="/statistics/location" router exact>
              <v-list-tile-title>地点影响力</v-list-tile-title>
              <v-list-tile-action
                ><v-icon>bar_chart</v-icon></v-list-tile-action
              >
            </v-list-tile>
          </v-list-group>
        </v-list-group>
        <!-- group 网络分析 -->
        <v-list-group prepend-icon="language" no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>网络分析</v-list-tile-title>
            </v-list-tile>
          </template>
          <!-- subpage 人物关系网络 -->
          <v-list-tile to="/network/person" router exact>
            <v-list-tile-title>人物关系网络</v-list-tile-title>
            <v-list-tile-action
              ><v-icon>trip_origin</v-icon></v-list-tile-action
            >
          </v-list-tile>
          <!-- subpage 地点关系网络 -->
          <v-list-tile to="/network/location" router exact>
            <v-list-tile-title>地点关系网络</v-list-tile-title>
            <v-list-tile-action
              ><v-icon>trip_origin</v-icon></v-list-tile-action
            >
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!-- 状态栏 -->
    <v-toolbar :clipped-left="clipped" color="#1867C0" dark fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-toolbar>

    <!-- 路由挂载点 -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <!-- 底部 -->
    <v-footer :fixed="false" height="auto">
      <v-layout justify-center row wrap>
        <v-flex text-xs-center>
          <span>Powered by Nuxt.js with Vuetify</span>
          <br />
          <span>BUPT - DSSC &copy; 2019 </span>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      title: '古诗词数据挖掘'
    }
  }
}
</script>

<style>
/* scrollbar global */
::-webkit-scrollbar-track {
  border-radius: 0px;
  -webkit-box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 7px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 0px;
  -webkit-box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.3);
  background-color: #a8a8a8;
}
</style>

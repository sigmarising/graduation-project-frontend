<template>
  <v-layout column justify-center align-center>
    <v-flex text-xs-center>
      <img class="img" src="/img/devilman.png" alt="KKSK" height="300px" />
      <p class="display-3">错误: {{ error.statusCode }}</p>
      <nuxt-link to="/" class="title">返回首页</nuxt-link>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable */
export default {
  props: ['error'],
  layout: 'blog' // 你可以为错误页面指定自定义的布局
}
</script>

<style scoped>
.img {
  border-radius: 50%;
  -webkit-animation: rotateMy 10s linear infinite;
}

@-webkit-keyframes rotateMy {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>

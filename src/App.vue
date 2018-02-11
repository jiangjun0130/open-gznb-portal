<template>
  <div style="">
    <v-header></v-header>
    <!--<v-index></v-index>-->
    <!--<router-link to="/index">首页</router-link>
    <router-link to="/portal/interfaceDoc">API接口文档</router-link>-->
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header'
  import footer from './components/footer/footer'
  import index from './views/index/index'
  export default {
    components: {
      'v-header': header,
      'v-index': index,
      'v-footer': footer
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>

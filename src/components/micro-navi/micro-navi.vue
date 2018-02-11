<template>
  <div class="micro-navi-layout">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="bread in breadList"
                          :to="bread.path" :key="bread.path">
        {{bread.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script type="text/ecmascript-6">
  import ElBreadcrumbItem from '../../../node_modules/element-ui/packages/breadcrumb/src/breadcrumb-item.vue'
  import common from '../../common/js/common'

  export default {
    name: 'MircoNavi',
    components: {ElBreadcrumbItem},
    created() {
      this.getBreadcrumb()
    },
    computed: {
      breadList() {
        return common.BREAD_LIST
      }
    },
    methods: {
      getBreadcrumb() {
        // 面包屑位置索引放到meta里预设好，首页索引为0，一级默认为1
        var breadLevel = typeof (this.$route.meta.breadLevel) !== 'undefined' ? this.$route.meta.breadLevel : 1
        var breadLength = common.BREAD_LIST.length // 目前breadlist集合数组个数
        var currentNaviName = this.$route.meta.pathName
        var currentFullPath = this.$route.fullPath
        var indexNavi = {path: '/index', name: '首页'}
        var newBread = {path: currentFullPath, name: currentNaviName}
        if (breadLevel === 1) {
          // 首页
          common.BREAD_LIST.splice(0, common.BREAD_LIST.length)
          common.BREAD_LIST.push(indexNavi)
          common.BREAD_LIST.push(newBread)
        } else {
          if (breadLength <= breadLevel) {
            // breadlist集合个数等于或者小于目前层级breadNumber
            common.BREAD_LIST.push(newBread)
          } else {
            // 截取
            common.BREAD_LIST.splice(breadLevel + 1, (breadLength - breadLevel) - 1)
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .micro-navi-layout
    margin-right 20px
    display block
</style>

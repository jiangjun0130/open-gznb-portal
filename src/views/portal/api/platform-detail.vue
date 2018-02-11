<template>
  <div>
      <div class="platform-wrapper">
        <div class="title">
          <h1>平台信息</h1>
        </div>
        <div class="content">
          <el-row>
            <el-col :span="4" :offset="1">
              平台名称：
            </el-col>
            <el-col :span="7">
             <el-tag>{{platform.platformName}}</el-tag>
            </el-col>
            <el-col :span="4" :offset="1">
              TEST环境地址：
            </el-col>
            <el-col :span="7">
              <el-tag type="gray">{{platform.testUrl}}</el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :offset="1">
              PRE环境地址：
            </el-col>
            <el-col :span="7">
              <el-tag type="primary">{{platform.preUrl}}</el-tag>
            </el-col>
            <el-col :span="4" :offset="1">
              PRD环境地址：
            </el-col>
            <el-col :span="7">
              <el-tag type="success">{{platform.prdUrl}}</el-tag>
            </el-col>
          </el-row>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import common from '../../../common/js/common'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElTag from 'element-ui/packages/tag/src/tag'

  export default {
    components: {
      ElTag,
      ElCol,
      ElRow},
    data() {
      return {
        platform: {}
      }
    },
    props: {
      platformId: {
        type: String
      }
    },
    created() {
      this.queryPlatformById()
    },
    methods: {
      queryPlatformById() {
        Vue.axios.post('systemPlatform/getDataById/' + this.platformId)
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.platform = response.data.dataWraps['platform'].data
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '错误', message: '保存失败！', duration: 6000, offset: 100})
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .platform-wrapper
    display block
    color #475669
    font-family Microsoft YaHei
    padding-left 5px
    .title
      padding-top 10px
      font-size 30px
      font-weight 400
      font-style normal
    .content
      padding-top 25px
      line-height 28px
</style>

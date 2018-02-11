<template>
  <div>
    <el-row>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-transparent open-block">
          <div class="block-content">
            <div class="block-title" style="margin-bottom: 30px">
              <h3>项目列表</h3>
            </div>
            <el-form :inline="true" :model="platform" class="demo-form-inline">
              <el-form-item label="系统名称:">
                <el-input v-model="platform.name" placeholder="请输入系统名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" v-for="(platform,index) in pageBean.recordList" :key="index" :offset="1">
        <el-card :body-style="{ padding: '20px',bottom: '10px' }">
          <img :src="platform.platformImage" class="image " v-if="platform.platformImage" >
          <img src="./hamburge.png" class="image" v-else>
          <div style="padding: 14px;">
            <div class="platform-name">
              <!--<el-tooltip :content="platform.description" placement="top" effect="light" transition="el-fade-in-linear" :open-delay="200" popper-class="desc-pop">

              </el-tooltip>-->
              <el-tag>{{ platform.platformName }}</el-tag>
            </div>
            <div class="platform-desc">
              {{ platform.description }}
            </div>
            <div class="bottom clearfix">
                <el-button type="text" class="button" @click="toApiListUI(platform)">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-transparent">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageBean.currentPage"
            :page-sizes="pageSizes"
            :page-size="pageBean.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :page-count="pageBean.pageCount"
            :total="pageBean.recordCount">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import common from '../../../common/js/common'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElTag from '../../../../node_modules/element-ui/packages/tag/src/tag'
  import ElPopover from '../../../../node_modules/element-ui/packages/popover/src/main'
  import ElFormItem from '../../../../node_modules/element-ui/packages/form/src/form-item'

  export default {
    components: {
      ElFormItem,
      ElTag,
      ElCol,
      ElRow,
      ElPopover
    },
    data() {
      const baseSize = 4
      return {
        platform: {
          id: 0,
          name: ''
        },
        pageBean: {
          beginPageIndex: 1,
          currentPage: 1,
          endPageIndex: 1,
          pageCount: 1,
          pageSize: baseSize,
          recordCount: 0,
          startIndex: 0,
          recordList: []
        },
        customPageSize: baseSize
      }
    },
    computed: {
      // 自定义计算分页页数
      pageSizes() {
        return [1 * this.customPageSize, 2 * this.customPageSize, 3 * this.customPageSize, 4 * this.customPageSize]
      }
    },
    created() {
      this.queryPagedData()
    },
    methods: {
      onSubmit() {
        this.queryPagedData()
      },
      handleSizeChange(val) {
        this.pageBean.pageSize = val
        this.queryPagedData()
      },
      handleCurrentChange(val) {
        this.pageBean.currentPage = val
        this.queryPagedData()
      },
      queryPagedData() {
        // 查询分页数据
        Vue.axios.post('systemPlatform/queryPagedData', {
          'platformName': this.platform.name,
          'pageBean': {
            'pageSize': this.pageBean.pageSize,
            'currentPage': this.pageBean.currentPage
          }
        })
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.pageBean = response.data.dataWraps['pageBean'].data
            } else if (responseData.flag === common.EXECUTE_ERROR) {
              this.$notify.error({title: '查询数据失败', message: responseData.message, duration: 6000})
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            console.log(response)
          })
      },
      toApiListUI(platform) {
        this.$router.push({path: '/api/interface/' + platform.id + '/'})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .platform-name
    font-size 16px
    font-weight 600
    color #8492A6

  .platform-desc
    font-size 12px
    margin-top 5px
    opacity .7
    color #99A9BF
    position: relative
    height: 100px
    line-height: 30px
    // white-space: nowrap
    // overflow: hidden
    // text-overflow: ellipsis

  .image
    height 200px

  .desc-pop
    color #8492A6
    opacity .9

</style>

<template>
  <div>
    <el-row>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-transparent open-block">
          <div class="block-content">
            <div class="block-title">
              <h3>字典列表</h3>
            </div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="目录类型:">
                <el-input v-model="dicType" placeholder="请输入字典目录类型"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="queryPagedData" icon="search">查询</el-button>
                <el-button type="primary" @click="toEditDic" icon="plus">添加</el-button>
                <el-button type="primary" @click="goBack" icon="arrow-left">返回</el-button>
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
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-transparent open-block" >
          <el-table :data="pageBean.recordList" border style="width: 100%" align="center">
            <el-table-column label="目录类型" width="200" align="center" prop="catalogType"></el-table-column>
            <el-table-column label="目录名称" width="200" align="center" prop="catalogName"></el-table-column>
            <el-table-column label="目录说明" width="200" align="center" prop="catalogDesc"></el-table-column>
            <el-table-column label="字典名称" width="200" align="center" prop="dicName"></el-table-column>
            <el-table-column label="字典值" width="200" align="center" prop="dicValue"></el-table-column>
            <el-table-column label="字典状态"  width="200" align="center" prop="dicStatus">
            <template scope="scope">
              <el-tag type="success" v-if="scope.row.dicStatus == 1">正常</el-tag>
              <el-tag type="danger" v-if="scope.row.dicStatus == 2">禁用</el-tag>
            </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template scope="scope">
                <el-button @click="deleteDic(scope.$index, scope.row)" type="danger" size="small" icon="delete" class="img-button">删除</el-button>
                <el-button @click="toEditDic(scope.row)" type="primary" size="small" icon="edit" class="img-button">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
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

    <el-dialog title="提示" :visible.sync="dialogDeleteVisible" size="tiny">
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteCommit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import ElRow from 'element-ui/packages/row/src/row'
  import Vue from 'vue'
  import common from '../../../common/js/common'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElTag from '../../../../node_modules/element-ui/packages/tag/src/tag'
  import ElPopover from '../../../../node_modules/element-ui/packages/popover/src/main'

  export default {
    components: {
      ElTag,
      ElCol,
      ElRow,
      ElPopover
    },
    data() {
      return {
        pageBean: common.pageBean,
        customPageSize: 15,
        dicType: '',
        dialogDeleteVisible: false,
        dialogFormVisible: false,
        deleteId: 0,
        dicStatus: '',
        dicStatus1: '正常',
        dicStatus2: '禁用'
      }
    },
    computed: {
      pageSizes() {
        // return [1 * common.PAGE_SIZE, 2 * common.PAGE_SIZE, 3 * common.PAGE_SIZE, 4 * common.PAGE_SIZE]
        return [1 * this.customPageSize, 2 * this.customPageSize, 3 * this.customPageSize, 4 * this.customPageSize]
      }
    },
    created() {
      this.queryPagedData()
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      handleSizeChange(val) {
        this.pageBean.pageSize = val
        this.queryPagedData()
      //  this.queryPlatformById()
      },
      handleCurrentChange(val) {
        this.pageBean.currentPage = val
        this.queryPagedData()
    //    this.queryPlatformById()
      },
      toEditDic(row) {
        var catalogId = ''
        if (row != null) {
          // update系统平台业务字典id
          catalogId = row.catalogId
        }
        var platformId = this.$route.params.platformId
        var url = '/admin/dicEdit/' + catalogId + '/' + platformId
        this.$router.push({path: url})
      },
      deleteDic(index, row) {
        this.dialogDeleteVisible = true
        this.deleteId = row.id
      },
      deleteCommit() {
        console.log(this.deleteId)
        console.log(this.$route.params.platformId)
        Vue.axios.post('systemPlatformDic/deleteDic/' + this.deleteId + '/' + this.$route.params.platformId)
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.pageBean = response.data.dataWraps['pageBean'].data
              this.$notify({title: '删除成功', message: responseData.message, type: 'success', duration: 6000})
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '异常', message: '操作失败！', duration: 6000})
          })
        this.dialogDeleteVisible = false
      },
      editDic() {
      },
      // 查询系统平台数据字典列表
      queryPagedData() {
        // 查询分页数据
        // 修改每页显示数据
        Vue.axios.post('systemPlatformDic/queryDicData', {
          'platformId': this.$route.params.platformId,
          'catalogType': this.dicType,
          'pageBean': {
            'pageSize': this.customPageSize,
            'currentPage': this.pageBean.currentPage
          }
        })
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.pageBean = response.data.dataWraps['pageBean'].data
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '错误', message: '查询数据字典信息失败！', duration: 6000
            })
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
</style>

<template>
  <div>
    <el-row>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-transparent open-block">
          <div class="block-content">
            <v-micro-navi></v-micro-navi>
            <div class="block-title">
              <h4>接口列表[{{platformModuleName}}模块]</h4>
            </div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="接口名称:">
                <el-input v-model="searchName" placeholder="请输入接口名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="queryPagedData" icon="search">查询</el-button>
                <el-button type="primary" @click="toEditUI" icon="plus">添加</el-button>
<!--                <el-button type="primary" @click="goBack" icon="arrow-left">返回</el-button> -->
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
        <div class="grid-content bg-transparent open-block">
          <el-table :data="pageBean.recordList" border style="width: 100%">
            <!--<el-table-column label="序号" icon="edit" width="80" align="center">
              <template scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>-->
            <el-table-column label="接口名称" width="180" align="center" prop="interfaceName" fixed></el-table-column>
            <el-table-column label="接口路径" width="180" align="center" prop="interfaceUrl"></el-table-column>
            <el-table-column label="平台名称" width="180" align="center" prop="platformName"></el-table-column>
            <el-table-column label="模块名称" width="180" align="center" prop="moduleName"></el-table-column>
            <el-table-column label="模块路径" width="180" align="center" prop="moduleUrl"></el-table-column>
            <el-table-column label="HTTP请求方式" width="180" align="center" prop="requestModeName">
              <template scope="scope">
                <el-tag type="primary" v-if="scope.row.requestMode === '1'">
                  {{scope.row.requestModeName}}
                </el-tag>
                <el-tag type="warning" v-if="scope.row.requestMode === '2'">
                  {{scope.row.requestModeName}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="接口请求参数格式" width="180" align="center" prop="paramFormat">
              <template scope="scope">
                <el-tag type="primary" v-if="scope.row.requestParamFormat == 1">
                  {{scope.row.paramFormat}}
                </el-tag>
                <el-tag type="warning" v-if="scope.row.requestParamFormat == 2">
                  {{scope.row.paramFormat}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="接口状态" width="180" align="center" prop="statusName">
              <template scope="scope">
                <el-tag type="success" v-if="scope.row.interfaceStatus == 1">
                  {{scope.row.statusName}}
                </el-tag>
                <el-tag type="danger" v-if="scope.row.interfaceStatus == 2">
                  {{scope.row.statusName}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="接口版本" width="180" align="center" prop="interfaceVersion"></el-table-column>
            <el-table-column label="接口描述" width="180" align="center" prop="description"></el-table-column>
            <el-table-column label="操作" width="220" align="center" fixed="right">
              <template scope="scope">
                <el-button size="small" icon="edit" type="primary" class="img-button" @click="toEditUI(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" icon="delete" class="img-button" @click="deleteConfirm(scope.$index, scope.row)">删除</el-button>
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
        <el-button type="primary" @click="deleteInterface">确 定</el-button>
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
  import MircoNavi from '../../../components/micro-navi/micro-navi'

  export default {
    components: {
      ElTag,
      ElCol,
      ElRow,
      ElPopover,
      'v-micro-navi': MircoNavi
    },
    data() {
      return {
        platformModuleName: '',
        moduleId: 0,
        interface: {},
        searchName: '',
        pageBean: common.pageBean,
        customPageSize: 15,
        dialogDeleteVisible: false,
        deleteId: 0,
        statusValue: '',
        statusOptions: [{
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '禁用'
        }]
      }
    },
    computed: {
      pageSizes() {
        // return [1 * common.PAGE_SIZE, 2 * common.PAGE_SIZE, 3 * common.PAGE_SIZE, 4 * common.PAGE_SIZE]
        return [1 * this.customPageSize, 2 * this.customPageSize, 3 * this.customPageSize, 4 * this.customPageSize]
      }
    },
    created() {
      this.platformModuleName = this.$route.params.platformModuleName
      this.queryPagedData()
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      toEditUI(row) {
        var interfaceId = ''
        if (row != null) {
          // update
          interfaceId = row.id
        }
        var platformId = this.$route.params.platformId
        var moduleName = this.$route.params.platformModuleName
        var moduleId = this.$route.params.moduleId
        var url = '/admin/api/edit/' + interfaceId + '/' + platformId + '/' + moduleId + '/' + moduleName
        this.$router.push({path: url})
      },
      // 状态变化监听
      statusChange() {
        this.interface.interfaceStatus = this.statusValue
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
        // 修改每页显示数据
        Vue.axios.post('systemInterface/queryPagedData', {
          'platformId': this.$route.params.platformId,
          'moduleId': this.$route.params.moduleId,
          'name': this.searchName,
          'pageBean': {
            'pageSize': this.customPageSize,
            'currentPage': this.pageBean.currentPage
          }
        })
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.pageBean = response.data.dataWraps['pageBean'].data
              console.log(this.pageBean)
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({
              title: '错误',
              message: '查询模块信息失败！',
              duration: 6000
            })
          })
      },
      // 删除模块确认
      deleteConfirm(index, row) {
        this.dialogDeleteVisible = true
        this.deleteId = row.id
        this.moduleId = row.moduleId
        console.log('moduleId:' + this.moduleId)
      },
      // 删除模块
      deleteInterface() {
        Vue.axios.post('systemInterface/delete/' + this.deleteId + '/' + this.moduleId)
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

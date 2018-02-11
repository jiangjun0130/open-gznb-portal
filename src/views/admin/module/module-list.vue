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
              <h4>模块列表[{{platform.platformName}}系统]</h4>
          </div>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="模块名称:">
              <el-input v-model="searchName" placeholder="请输入模块名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryPagedData" icon="search">查询</el-button>
              <el-button type="primary" @click="editModule" icon="plus">添加</el-button>
<!--              <el-button type="primary" @click="goBack" icon="arrow-left">返回</el-button> -->
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
            <el-table-column label="平台名称" width="180" align="center" prop="platformName" fixed></el-table-column>
            <el-table-column label="模块名称" width="180" align="center" prop="moduleName"></el-table-column>
            <el-table-column label="模块路径" width="180" align="center" prop="moduleUrl"></el-table-column>
            <el-table-column label="模块状态" width="120" align="center" prop="moduleStatusName">
              <template scope="scope">
                <el-tag type="success" v-if="scope.row.moduleStatus == 1">
                  {{scope.row.moduleStatusName}}
                </el-tag>
                <el-tag type="danger" v-if="scope.row.moduleStatus == 2">
                  {{scope.row.moduleStatusName}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="模块描述" align="center" prop="description"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
              <template scope="scope">
                <el-button size="small" icon="edit" type="primary" class="img-button" @click="editModule(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" icon="document" type="primary" class="img-button" @click="toApiUI(scope.row)">接口</el-button>
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
        <el-button type="primary" @click="deleteModule">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="模块信息" :visible.sync="dialogFormVisible">
      <el-form :model="module" :rules="rules" ref="module" label-width="100px" class="demo-ruleForm">
        <el-form-item label="平台名称" prop="platformName">
          <el-input v-model="platform.platformName" placeholder="请输入平台名称" :disabled="true" @change=""></el-input>
        </el-form-item>
        <el-form-item label="模块名称" prop="moduleName">
          <el-input v-model="module.moduleName" placeholder="请输入模块名称"></el-input>
        </el-form-item>
        <el-form-item label="模块路径" prop="moduleUrl">
          <el-input v-model="module.moduleUrl"></el-input>
        </el-form-item>
        <el-form-item label="模块状态" prop="moduleStatus">
          <el-select v-model="statusValue" placeholder="请选择模块状态" @change="statusChange">
            <el-option v-for="option in statusOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模块描述" prop="description">
          <el-input v-model="module.description" placeholder="请输入描述信息" type="textarea" autosize=""></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="note">
          <el-input v-model="module.note" placeholder="请输入备注信息">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveModule('module')">保存</el-button>
          <el-button @click="resetForm('module')">重置</el-button>
        </el-form-item>
      </el-form>
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
        platform: {},
        module: {
          platformId: 0,
          platformName: '',
          moduleName: '',
          moduleUrl: '',
          moduleStatus: '',
          description: '',
          note: ''
        },
        searchName: '',
        pageBean: common.pageBean,
        customPageSize: 15,
        dialogDeleteVisible: false,
        dialogFormVisible: false,
        deleteId: 0,
        statusValue: '',
        statusOptions: [{
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '禁用'
        }],
        rules: {
          moduleName: [
            { required: true, message: '请输入模块名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
          ],
/*          moduleUrl: [
            { required: true, message: '请输入模块路径', trigger: 'blur' }
          ], */
          moduleStatus: [
            { required: true, message: '请选择状态', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入平台简介', trigger: 'blur' }
          ]
        }
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
      this.queryPlatformById()
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      toApiUI(row) {
        var moduleId = row.id
        var platformId = this.$route.params.platformId
        var platformModuleName = row.moduleName
        var url = '/admin/api/list/' + platformId + '/' + moduleId + '/' + platformModuleName
        // 转向接口列表
        this.$router.push({path: url})
      },
      // 状态变化监听
      statusChange() {
        this.module.moduleStatus = this.statusValue
      },
      handleSizeChange(val) {
        this.pageBean.pageSize = val
        this.queryPagedData()
      },
      handleCurrentChange(val) {
        this.pageBean.currentPage = val
        this.queryPagedData()
      },
      // 删除模块确认
      deleteConfirm(index, row) {
        this.dialogDeleteVisible = true
        this.deleteId = row.id
      },
      // 删除模块
      deleteModule() {
        Vue.axios.post('systemModule/delete/' + this.deleteId + '/' + this.platform.id)
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
      // 编辑模块
      editModule(index, row) {
        this.module = {}
        if (row != null) {
          // update
          this.module = row
          this.statusValue = row.moduleStatus
        } else {
          this.statusValue = ''
        }
        this.dialogFormVisible = true
      },
      // 保存
      saveModule(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.axios.post('systemModule/save', {
              'platformId': this.platform.id,
              'moduleId': this.module.id,
              'status': this.module.moduleStatus,
              'name': this.module.moduleName,
              'path': this.module.moduleUrl,
              'description': this.module.description,
              'note': this.module.note
            })
              .then((response) => {
                var responseData = response.data
                if (responseData.flag === common.EXECUTE_OK) {
                  this.pageBean = response.data.dataWraps['pageBean'].data
                  this.$notify({title: '成功', message: responseData.message, type: 'success', duration: 6000, offset: 100})
                } else if (responseData.flag === common.EXECUTE_LOGIN) {
                  window.location.href = responseData.message
                } else {
                  this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
                }
              })
              .catch(function (response) {
                this.$notify.error({title: '错误', message: '保存失败！', duration: 6000, offset: 100})
              })
            // 关闭对话框
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      // 根据系统平台id查询平台信息
      queryPlatformById() {
        Vue.axios.post('systemPlatform/getDataById/' + this.$route.params.platformId)
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              if (response.data.dataWraps != null) {
                this.platform = responseData.dataWraps['platform'].data
              }
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '错误', message: '查询平台信息失败！', duration: 6000})
          })
      },
      // 查询系统平台模块列表
      queryPagedData() {
        // 查询分页数据
        // 修改每页显示数据
        Vue.axios.post('systemModule/queryPagedData', {
          'platformId': this.$route.params.platformId,
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
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '错误', message: '查询模块信息失败！', duration: 6000
            })
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

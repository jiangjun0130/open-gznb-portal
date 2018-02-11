<template>
  <div id="mainDiv">
    <el-row>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-transparent open-block">
          <div class="block-content">
            <div class="block-title" style="margin-bottom: 30px">
              <h3>待我审核</h3>
            </div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="应用名称:">
                <el-input placeholder="请输入应用名称" v-model="searchName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
                <router-link to="/api/apply/createApp">
                </router-link>
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
          <el-table
            :data="pageBean.recordList"
            border
            style="width: 100%">
            <el-table-column label="序号" icon="edit" width="80" align="center">
              <template scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column
              label="应用"
              prop="busPlatformName">
            </el-table-column>
            <el-table-column
              label="申请平台"
              prop="platformName">
            </el-table-column>
            <el-table-column
              label="提交日期"
              :formatter="dateFormat">
            </el-table-column>
            <el-table-column
              label="申请人">
              <template scope="scope">
                <span>{{ scope.row.applyUser }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="备注信息">
              <template scope="scope">
                <span>{{ scope.row.applyDescription }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template scope="scope">
                <el-button size="small" icon="edit" type="primary" class="img-button" @click="confirmApply(scope.row,true)">通过</el-button>
                <el-button size="small" icon="document" type="danger" class="img-button" @click="confirmApply(scope.row,false)">驳回</el-button>
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
    <el-dialog title="提示" :visible.sync="dialogApplyVisible" size="tiny">
      <div>{{confirmMessage}}</div>
      <div style="margin: 20px 0;"></div>
      <div>
        <el-input
          type="textarea"
          :rows="2" resize="none"
          placeholder="请输入原因"
          v-model="applyForm.auditDescription">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogApplyVisible = false">取 消</el-button>
        <el-button type="primary" @click="auditApply()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import common from '../../../common/js/common'
  import axios from 'axios'
  import ElSpinner from '../../../../node_modules/element-ui/packages/spinner/src/spinner'
  import ElRow from 'element-ui/packages/row/src/row'
  export default {
    components: {
      ElRow,
      ElSpinner},
    data() {
      return {
        screenHeight: document.body.clientHeight - 60, // 减去header的60px
        busSystemAccess: {
          id: 0,
          platformId: 0,
          busPlatformId: 0,
          busPlatformName: '',
          platformName: '',
          moduleId: 0,
          applyUser: '',
          applyDescription: '', // 申请描述
          accessStatus: '',
          updateTime: '',
          createTime: '',
          createUser: '',
          updateUser: '',
          platformManager: ''
        },
        dialogApplyVisible: false,
        confirmMessage: '',
        pageBean: common.pageBean,
        searchName: null,
        applyId: 0,
        applyForm: {
          auditDescription: '',
          auditResult: ''
        }
      }
    },
    mounted() {
      document.getElementById('mainDiv').style.height = this.screenHeight - 180 + 'px' // 页面初始化
    },
    computed: {
      pageSizes() {
        // return [1 * common.PAGE_SIZE, 2 * common.PAGE_SIZE, 3 * common.PAGE_SIZE, 4 * common.PAGE_SIZE]
        return [5, 15, 20, 50, 100]
      },
      platformList() {
        return this.platform
      }
    },
    created: function () {
      this.queryPagedData()
    },
    methods: {
      handleSizeChange(val) {
        this.pageBean.pageSize = val
        this.customPageSize = val
        this.queryPagedData()
      },
      handleCurrentChange(val) {
        this.pageBean.currentPage = val
        this.queryPagedData()
      },
      onSubmit() {
        this.queryPagedData()
      },
      dateFormat(row, column) {
        return new Date(row.createTime).toLocaleString()
      },
      queryPagedData() {
        // 查询分页数据
        axios.post('busSystemApplyRecord/queryPagedData', {
          'platformName': this.searchName,
          'applyStatus': '2', // TODO 审核状态
          'platformManager': common.getCookie('CUSERNAME'),
          'pageBean': {
            'pageSize': this.pageBean.pageSize,
            'currentPage': this.pageBean.currentPage
          }
        })
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.pageBean = response.data.dataWraps['pageBean'].data
              console.log(this.pageBean)
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({
                title: '错误',
                message: '查询失败！',
                duration: 6000
              })
            }
          })
          .catch(function (response) {
            this.$notify.error({
              title: '错误',
              message: '查询失败！',
              duration: 6000
            })
          })
      },
      confirmApply(row, isPass) {
        this.applyId = row.id
        let str = ''
        if (isPass) {
          str = '确定通过'
          this.applyForm.auditResult = '1'
        } else {
          str = '确定驳回'
          this.applyForm.auditResult = '2'
        }
        str = str + '【' + row.busPlatformName + '】' + '对平台【' + row.platformName + '】的审核吗？'
        this.confirmMessage = str
        this.dialogApplyVisible = true
      },
      auditApply() {
        axios.post('busSystemApplyRecord/audit/' + this.applyId, {
          'auditUser': common.getCookie('CUSERNAME'),
          'auditDescription': this.applyForm.auditDescription,
          'auditResult': this.applyForm.auditResult,
          'platformManager': common.getCookie('CUSERNAME')
        })
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.pageBean = response.data.dataWraps['pageBean'].data
              this.$notify.success({title: '成功', message: '审核成功！', duration: 6000})
              console.log(this.pageBean)
            } else {
              this.$notify.error({
                title: '错误',
                message: '审核失败！',
                duration: 6000
              })
            }
          })
          .catch(function (response) {
            this.$notify.error({
              title: '异常',
              message: '审核异常！',
              duration: 6000
            })
          })
        this.dialogApplyVisible = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

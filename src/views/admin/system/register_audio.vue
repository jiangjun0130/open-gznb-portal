<template>
  <el-col :span="19" style="padding-left: 10px;">
    <el-row>
      <el-col>
        <div class="grid-content bg-transparent open-block">
          <div class="block-content">
            <div class="block-title">
              <h3>注册用户审核</h3>
            </div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="用户名称:">
                <el-input placeholder="请输入用户名称" v-model="searchName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="pageBean.recordList"
        border
        style="width: 100%">
        <el-table-column
          label="用户名">
          <template scope="scope">
            <span style="margin-left: 10px">{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="申请角色">
          <template scope="scope">
            <el-tag style="margin: 5px;" v-if="scope.row.userType=='1'">超级管理员</el-tag>
            <el-tag style="margin: 5px;" type="success" v-if="scope.row.userType=='2'">集成系统平台用户</el-tag>
            <el-tag style="margin: 5px;" type="warning" v-if="scope.row.userType=='3'">业务系统平台管理用户</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="审核结果">
          <template scope="scope">
            <el-tag style="margin: 5px;" type="warning" v-if="scope.row.audioStatus==1">审核中</el-tag>
            <el-tag style="margin: 5px;" type="success" v-if="scope.row.audioStatus==2">审核通过</el-tag>
            <el-tag style="margin: 5px;" type="danger" v-if="scope.row.audioStatus==3">审核失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="申请时间"
          prop="registerTime"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          label="注册备注信息"
          prop="note">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="primary" @click="audioRegister(scope.row)">通过</el-button>
            <el-button size="small" type="danger" @click="audio(scope.row)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col>
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

      <el-dialog title="注册用户审核" :visible.sync="dialogVisible" :before-close="dialogClose" @close="dialogVisible = false">
        <el-form ref="audioItem" :rules="rules" :model="audioItem" label-width="80px">
          <el-form-item label="用户名">
            <h3>{{audioItem.userName}}</h3>
          </el-form-item>
          <el-form-item label="驳回原因" prop="note">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入驳回原因"
              v-model="audioItem.note"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="unAudioRegister">驳回注册申请</el-button>
        </div>
      </el-dialog>
    </el-row>
  </el-col>
</template>

<script>
  import common from '../../../common/js/common'
  import axios from 'axios'
  import ElTag from '../../../../node_modules/element-ui/packages/tag/src/tag'
  import ElInput from '../../../../node_modules/element-ui/packages/input/src/input'

  export default{
    components: {
      ElInput,
      ElTag
    },
    data() {
      return {
        currentUser: common.getCookie('CUSERNAME'),
        searchName: '',
        dialogVisible: false,
        audio_tag: '',
        systemUser: {
          id: 0,
          userName: '',
          mobile: '',
          userType: '',
          updateTime: '',
          registerTime: '',
          createUser: '',
          note: '',
          audioStatus: ''
        },
        audioItem: {},
        pageBean: common.pageBean,
        customPageSize: 10,
        rules: {
          note: [
            {required: true, message: '请填写驳回原因', trigger: 'blur'},
            {min: 1, max: 150, message: '长度在 1 到 150 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      pageSizes() {
        return [1 * this.customPageSize, 2 * this.customPageSize, 3 * this.customPageSize, 4 * this.customPageSize]
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
        this.queryPagedData()
      },
      handleCurrentChange(val) {
        this.pageBean.currentPage = val
        this.queryPagedData()
      },
      dialogClose(done) {
        this.dialogVisible = false
        this.audioItem = {}
      },
      onSubmit() {
        if (this.searchName !== undefined && this.searchName !== '') {
          this.queryPagedData()
        }
      },
      audio(item) {
        this.dialogVisible = true
        this.audioItem = item
      },
      // 通过审核
      audioRegister(item) {
        let userType = ''
        if (item.userType === '1') {
          userType = '超级管理员'
        } else if (item.userType === '2') {
          userType = '集成系统平台用户'
        } else if (item.userType === '3') {
          userType = '业务系统管理员'
        }
        let info = '确定通过【 ' + item.userName + ' 】' + '注册：【 ' + userType + ' 】' + '?'
        let self = this
        this.$confirm(info)
          .then(_ => {
            self.update(2, item.id)
          })
          .catch(_ => {
            console.log('cancel')
          })
      },
      // 驳回注册申请
      unAudioRegister() {
        let self = this
        this.$refs['audioItem'].validate((valid) => {
          if (valid) {
            self.update(3, self.audioItem.id)
            self.dialogVisible = false
            self.queryPagedData()
          } else {
            return false
          }
        })
      },
      // 修改
      update(audioStatus, id) {
        let self = this
        axios.post('systemuser/update', {
          'id': id,
          'audioStatus': audioStatus
        })
          .then((response) => {
            let responseData = response.data
            console.log(responseData)
            if (responseData.flag === common.EXECUTE_OK) {
              self.$notify.success({
                title: '成功',
                message: '审核成功！',
                duration: 6000
              })
              self.queryPagedData()
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              self.$notify.error({
                title: '错误',
                message: '审核用户注册失败',
                duration: 6000
              })
            }
          })
          .catch(function (response) {
            self.$notify.error({
              title: '错误',
              message: '查询注册用户列表异常！',
              duration: 6000
            })
          })
      },
      queryPagedData() {
        let self = this
        axios.post('systemuser/users/audio', {
          'userName': self.searchName,
          audioStatus: 1,
          'pageBean': {
            'pageSize': self.pageBean.pageSize,
            'currentPage': self.pageBean.currentPage
          }
        })
          .then((response) => {
            let responseData = response.data
            console.log(responseData)
            if (responseData.flag === common.EXECUTE_OK) {
              this.pageBean = response.data.dataWraps['pageBean'].data
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
            } else {
              this.$notify.error({
                title: '错误',
                message: '查询注册用户列表失败！',
                duration: 6000
              })
            }
          })
          .catch(function (response) {
            this.$notify.error({
              title: '错误',
              message: '查询注册用户列表异常！',
              duration: 6000
            })
          })
      },
      dateFormat(row, column) {
        return new Date(row.createTime).toLocaleString()
      }
    }
  }
</script>

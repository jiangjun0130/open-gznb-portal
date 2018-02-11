<template>
  <el-col :span="19" style="padding-left: 10px;">
    <el-row>
      <el-col>
        <div class="grid-content bg-transparent open-block">
          <div class="block-content">
            <div class="block-title">
              <h3>用户列表</h3>
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
            <el-tag style="margin: 5px;" v-if="scope.row.userType==='1'">超级管理员</el-tag>
            <el-tag style="margin: 5px;" type="success" v-if="scope.row.userType==='2'">集成系统平台用户</el-tag>
            <el-tag style="margin: 5px;" type="warning" v-if="scope.row.userType==='3'">业务系统平台管理用户</el-tag>
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
          label="注册时间"
          prop="registerTime"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          align="center"
          width="260"
          label="操作">
          <template scope="scope">
            <el-button type="text" @click="editPermission(scope.row)"><i class="el-icon-edit"> 授权</i></el-button>
            <template>
              <el-button style="color: #67C23A" v-if="scope.row.audioStatus==1" type="text"
                         @click="audioRegister(scope.row)"><i class="el-icon-circle-check"> 通过申请</i></el-button>
              <el-button style="color: #FA5555" v-if="scope.row.audioStatus==1" type="text danger"
                         @click="audio(scope.row)"><i class="el-icon-circle-close "> 驳回申请</i>
              </el-button>
            </template>
          </template>
        </el-table-column>
        <!--<el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="primary">权限管理</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <el-dialog title="用户授权" :visible.sync="dialogFormVisible" @close="dialogClose">
        <el-form :model="systemUser" label-width="80px">
          <el-form-item label="用户">
            <el-input v-model="systemUser.userName" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-checkbox-group
              v-model="roles">
              <el-checkbox label="1" border>超级管理员</el-checkbox>
              <el-checkbox label="2" border>集成系统平台用户</el-checkbox>
              <el-checkbox label="3" border>业务系统管理员</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="comitPermission">确 定</el-button>
        </div>
      </el-dialog>

      <!--通过-驳回注册审核-->
      <el-dialog title="注册用户审核" :visible.sync="audioDialogVisible" :before-close="audiodialogClose"
                 @close="dialogVisible = false">
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
          <el-button @click="audioDialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="unAudioRegister">驳回注册申请</el-button>
        </div>
      </el-dialog>

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
    </el-row>
  </el-col>
</template>

<script>
  import common from '../../../common/js/common'
  import axios from 'axios'
  import ElTag from '../../../../node_modules/element-ui/packages/tag/src/tag'
  import ElFormItem from '../../../../node_modules/element-ui/packages/form/src/form-item'

  export default{
    components: {
      ElFormItem,
      ElTag
    },
    data() {
      const baseSize = 15
      return {
        audioDialogVisible: false,
        dialogFormVisible: false,
        currentUser: common.getCookie('CUSERNAME'),
        searchName: '',
        roles: [],
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
        userTypes: [],
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
        customPageSize: baseSize,
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
      onSubmit() {
        this.queryPagedData()
      },
      dialogClose() {
        this.systemUser = {
          id: 0,
          userName: '',
          mobile: '',
          userType: '',
          updateTime: '',
          registerTime: '',
          createUser: '',
          note: '',
          audioStatus: ''
        }
        this.roles = []
      },
      audiodialogClose(done) {
        this.audioDialogVisible = false
        this.audioItem = {}
        this.$refs['audioItem'].resetFields()
        done()
      },
      audio(item) {
        this.audioDialogVisible = true
        this.audioItem = item
      },
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
      editPermission(row) {
        axios.post('systemuser/users', {
          'name': row.userName,
          'audioStatus': 2,
          'pageBean': {
            'pageSize': 10,
            'currentPage': 1
          }
        })
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              let data = response.data.dataWraps['pageBean'].data
              this.systemUser = data.recordList[0]
              let roleArray = this.systemUser.userType
              if (roleArray !== undefined && roleArray.length > 0) {
                this.roles = roleArray.split(',')
              }
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({
                title: '错误',
                message: '查询用户列表失败！',
                duration: 6000
              })
            }
          })
          .catch(function (response) {
            this.$notify.error({
              title: '错误',
              message: '查询用户列表异常！',
              duration: 6000
            })
          })
        this.dialogFormVisible = true
      },
      comitPermission() {
        let self = this
        self.$confirm('警告，确认进行该操作？')
          .then(_ => {
            let role = ''
            if (this.roles !== undefined && this.roles !== '' && this.roles.length > 0) {
              role = this.roles.join(',')
            }
            axios.post('systemuser/users/permission', {
              'name': self.systemUser.userName,
              'type': role
            })
              .then((response) => {
                let responseData = response.data
                console.log(responseData)
                if (responseData.flag === common.EXECUTE_OK) {
                  this.dialogFormVisible = false
                  self.queryPagedData()
                } else if (responseData.flag === common.EXECUTE_LOGIN) {
                  window.location.href = responseData.message
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: '用户授权失败！',
                    duration: 6000
                  })
                }
              })
              .catch(function (response) {
                this.$notify.error({
                  title: '错误',
                  message: '用户授权异常！',
                  duration: 6000
                })
              })
          }).catch(_ => {})
      },
      queryPagedData() {
        let self = this
        axios.post('systemuser/users/audio', {
          'name': self.searchName,
          // audioStatus: 2,
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
              window.location.href = responseData.message
            } else {
              this.$notify.error({
                title: '错误',
                message: '查询用户列表失败！',
                duration: 6000
              })
            }
          })
          .catch(function (response) {
            this.$notify.error({
              title: '错误',
              message: '查询用户列表异常！',
              duration: 6000
            })
          })
      },
      dateFormat(row, column) {
        return new Date(row.registerTime).toLocaleString()
      }
    }
  }
</script>

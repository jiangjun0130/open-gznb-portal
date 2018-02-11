<template>
  <div class="menu">
    <el-menu theme="dark" :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
             @select="handleSelect">
      <el-menu-item index="index">
        <div class="logo-wrapper">
          <div class="logo-img">
            <span class="icon-logo"><span class="path1"></span><span class="path2"></span><span
              class="path3"></span><span class="path4"></span><span class="path5"></span><span
              class="path6"></span><span class="path7"></span><span class="path8"></span><span
              class="path9"></span><span class="path10"></span><span class="path11"></span><span
              class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span
              class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span
              class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span
              class="path24"></span><span class="path25"></span></span>
          </div>
          <div class="logo-content">
            开放平台
          </div>
        </div>
      </el-menu-item>
      <el-menu-item index="/index" v-if="permission.base">首页</el-menu-item>
      <el-menu-item index="/api/platform" v-if="permission.base">接口文档</el-menu-item>
      <el-menu-item index="/api/apply" v-if="permission.interfaceAccess">接口接入</el-menu-item>
      <el-menu-item index="/admin/platform" v-if="permission.platformManager">平台管理</el-menu-item>
      <el-menu-item index="/admin/apply" v-if="permission.accessExamine">
        <span>待我审核</span>
      </el-menu-item>
      <el-menu-item index="/admin/system/userlist" v-if="permission.userManager">系统管理</el-menu-item>
      <div class="register-wrapper">
        <div v-if="userName" class="register-wrapper">
          <span class="userinfo-wrapper">{{sayHello}}{{userName}}</span>
          <el-menu-item index="" @click="logout" style="border-right: 1px solid #767676">退出登录</el-menu-item>
          <el-menu-item index="" @click="doRegister">注册</el-menu-item>
        </div>
        <div v-else class="register-wrapper">
          <el-menu-item index="" @click="doLogin">登录</el-menu-item>
        </div>
      </div>
    </el-menu>

    <el-dialog title="注册账号" :visible.sync="dialogFormVisible" size="tiny">
      <el-form :model="registerform" :rules="rules" ref="registerform">
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-col :span="15">
            <el-input v-model="registerform.phone" placeholder="请输入手机号" auto-complete="off" size="small"></el-input>

          </el-col>
        </el-form-item>
        <el-form-item label="已注册角色" :label-width="formLabelWidth" v-if="registed_role.length>0">
          <el-tag type="primary" v-for="(v,i) in registed_role" :key="i">
            <span v-if="v.userType==='1'">超级管理员</span>
            <span type="success" v-if="v.userType==='2'">集成系统平台用户</span>
            <span type="warning" v-if="v.userType==='3'">业务系统平台管理用户</span>
          </el-tag>
        </el-form-item>
        <el-form-item label="用户角色" :label-width="formLabelWidth" prop="registertype">
          <el-select v-model="register_types" :disabled="registed_role.length===1 && registed_role[0].userType==='1'"  multiple placeholder="请选择注册角色">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册备注" prop="note">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入备注"
            v-model="registerform.note">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('registerform')">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import ElMenu from 'element-ui/packages/menu/src/menu'
  import ElMenuItem from 'element-ui/packages/menu/src/menu-item'
  import common from '../../common/js/common'
  import ElButton from 'element-ui/packages/button/src/button'
  import axios from 'axios'
  import Vue from 'vue'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item'

  export default {
    components: {
      ElFormItem,
      ElCol,
      ElButton,
      ElMenuItem,
      ElMenu
    },
    data() {
      var checkmobilephone = (rule, value, callback) => {
        value = value.trim()
        var numberReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
        if (!value) {
          return callback(new Error('请填写手机号码'))
        }
        setTimeout(() => {
          if (!numberReg.test(value)) {
            callback(new Error('请输入正确手机号码'))
          } else {
            if (value.length < 11) {
              callback(new Error('手机号码必须为11位'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      var checkUserType = (rule, value, callback) => {
        if (this.register_types === null) {
          callback(new Error('请选择角色'))
        } else if (this.register_types.length < 1) {
          callback(new Error('请选择角色'))
        } else {
          callback()
        }
      }
      return {
        userName: '',
        permission: {
          base: true, // 基本权限（首页、接口文档）
          interfaceAccess: false, // 接口接入
          platformManager: false, // 平台管理
          accessExamine: false, // 接入审核权限
          userManager: false // 用户管理权限
        },
        activeIndex: '/index',
        isLogin: true,
        userRole: 0,
        recordCount: '',
        registerform: {
          phone: '',
          note: ''
        },
        formLabelWidth: '100px',
        options: [{
          value: 3,
          label: '业务系统管理员'
        }, {
          value: 2,
          label: '集成系统平台用户'
        }],
        registed_role: [],
        register_types: [],
        dialogFormVisible: false,
        rules: {
          note: [
            {required: true, message: '请填写注册说明信息', trigger: 'blur'},
            {min: 1, max: 150, message: '长度在 1 到 150 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请填写手机号码', trigger: 'blur'},
            {validator: checkmobilephone, trigger: 'change'}
          ],
          registertype: [{
            validator: checkUserType,
            trigger: 'change'
          }]
        },
        validators: {}
      }
    },
    computed: {
      sayHello: function () {
        var msg = ''
        var hour = new Date().getHours()
        if (hour < 6) {
          msg = '凌晨好！'
        } else if (hour < 9) {
          msg = '早上好！'
        } else if (hour < 12) {
          msg = '上午好！'
        } else if (hour < 14) {
          msg = '中午好！'
        } else if (hour < 17) {
          msg = '下午好！'
        } else if (hour < 19) {
          msg = '傍晚好！'
        } else if (hour < 22) {
          msg = '晚上好！'
        } else {
          msg = '夜里好！'
        }
        return msg
      }
    },
    created: function () {
      //   this.isLogin = this.$store.state.system.currentUser.isLogin
      //   this.userRole = this.$store.state.system.currentUser.userRole
      this.userName = common.getCookie('CUSERNAME')
      this.queryRole()
    },
    methods: {
      handleSelect(key, keyPath) {
      },
      logout() {
        //   this.$store.dispatch('logout')
        //     console.log('退出登录')
        Vue.axios.post('/logout')
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.$notify({title: '退出成功', message: responseData.message, type: 'success', duration: 6000})
              this.$router.push({
                path: this.$route.query.redirect ? this.$route.query.redirect : '/index'
              })
              this.userName = ''
              common.delCookie('CSESSIONID')
              common.delCookie('CUSERNAME')
              common.delCookie('CUSERTYPE')
            } else {
              this.$notify.error({title: '系统异常', message: '退出失败', duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '异常', message: '操作失败！', duration: 6000})
          })
      },
      doRegister() {
        this.dialogFormVisible = true
      },
      doLogin() {
        axios.post('/toLoginUI').then(response => {
          var responseData = response.data
          if (responseData.flag === common.EXECUTE_LOGIN) {
            window.location.href = responseData.message
          } else {
            this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
          }
        })
      },
      queryRole() {
        axios.get('systemuser/role/' + this.userName)
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              let dataList = responseData.dataWraps['data'].dataList
              if (dataList !== undefined && dataList.length > 0) {
                for (var item of dataList) {
                  this.registerform.phone = item.mobile
                  this.registed_role.push(item)
                  for (var i = 0; i < this.options.length; i++) {
                    if (this.options[i].value === parseInt(item.userType)) {
                      this.options.splice(i, 1)
                    }
                  }
                }
              }
              let self = this
              setTimeout(function () {
                self.initPermission()
              }, 100)
            } else if (response.data.flag === common.EXECUTE_LOGIN) {
              window.location.href = response.data.message
            } else {
              this.$notify.error({title: '系统异常', message: '注册用户失败', duration: 6000})
            }
          })
          .catch(function (response) {
            console.log(response)
            this.openalert('error', response.data.message)
          })
      },
      initPermission() {
        let self = this
        if (self.registed_role === null || self.registed_role.length === 0) {
          console.log('registed_role is nil')
          return
        }
        for (var role of self.registed_role) {
          // 超級管理员，有所有权限
          if (role.userType === '1') {
            self.permission.interfaceAccess = true
            self.permission.platformManager = true
            self.permission.accessExamine = true
            self.permission.userManager = true
            break
          }
          // 集成系统平台用户,
          if (role.userType === '2') {
            self.permission.interfaceAccess = true
            continue
          }
          // 业务系统平台管理用户，可进行平台项目管理、申请审核
          if (role.userType === '3') {
            self.permission.accessExamine = true
            self.permission.platformManager = true
          }
        }
        this.$store.commit('initPermission', self.permission)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var ut = ''
            for (let type of this.register_types) {
              ut += (type + ',')
            }
            console.log(this.register_types)
            axios.post('/systemuser/register', {
              'name': common.getCookie('CUSERNAME'),
              'mobile': this.registerform.phone.trim(),
              'note': this.registerform.note,
              'type': ut
            })
              .then((response) => {
                console.log(response.data)
                // this.success()
                if (response.data.flag === common.EXECUTE_OK) {
                  this.$notify({title: '成功', message: '注册用户成功', type: 'success', duration: 6000, offset: 100})
                  this.$router.push({
                    path: this.$route.query.redirect ? this.$route.query.redirect : '/index'
                  })
                } else if (response.data.flag === common.EXECUTE_LOGIN) {
                  window.location.href = response.data.message
                } else {
                  this.$notify.error({title: '系统异常', message: '注册用户失败', duration: 6000})
                }
              })
              .catch(function (response) {
                console.log(response)
                this.openalert('error', response.data.message)
              })
            this.dialogFormVisible = false
          } else {
            return false
          }
        })
      },
      openalert(flag, msg) {
        this.$message({
          message: msg,
          type: flag
        })
      },
      computed: {
        loginInfo() {
          return this.$store.state.user.currentUser.isLogin
        },
        role() {
          return this.$store.state.user.currentUser.userRole
        }
      },
      watch: {
        'loginInfo': function (newVal, oldVal) {
          this.isLogin = newVal + ''
          console.log('isLogin' + this.isLogin)
          console.log('old' + oldVal)
        },
        'role': function (newVal, oldVal) {
          this.userRole = newVal
          console.log('userRole' + this.userRole)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .menu
    margin-bottom 0px

  .logo-wrapper
    display inline-block
    padding 0 50px
    .logo-img
      display inline-block
      .icon-logo
        font-size 22px
    .logo-content
      display inline-block
      font-size 25px
      font-weight 500

  .register-wrapper
    float right
    padding-right 10px
    .el-menu-item
      height 20px
      line-height 20px
      margin-top 20px

  .userinfo-wrapper
    display inline-block
    height auto
    vertical-align middle
    height 60px
    line-height 60px
    color darkgray
    float left

  .item {
    margin-top -20px
  }
</style>

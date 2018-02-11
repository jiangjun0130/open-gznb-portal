<template>
  <el-row>
    <el-col :span="7" :offset="8">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item>
          <span style="margin-left:60px;font-size: 20px">注册账号</span>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="手机号码" value="15687809708"></el-input>
        </el-form-item>
        <!-- <el-form-item label="邮箱" prop="emil">
           <el-input placeholder="请输入邮箱" v-model="ruleForm.emil" >
             <template slot="append">.com</template>
           </el-input>
         </el-form-item>-->

        <el-form-item label="角色" prop="userType">
          <el-checkbox-group v-model="ruleForm.userTypes">
            <el-checkbox label="3">业务系统管理员</el-checkbox>
            <el-checkbox label="2">集成系统平台用户</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!--<el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="最少6位"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="ruleForm.confirmPassword"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElFormItem from '../../../../node_modules/element-ui/packages/form/src/form-item'
  import common from '../../../common/js/common'
  import store from '../../../common/js/store/store'
  import axios from 'axios'
  export default {
    components: {
      ElFormItem,
      ElCol,
      ElRow,
      common,
      store
    },
    data() {
      var checkmobilephone = (rule, value, callback) => {
        value = value.trim()
        var numberReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
        if (!value) {
          return callback(new Error('手机号码不能为空'))
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
        if (this.ruleForm.userTypes === null) {
          callback(new Error('请选择角色'))
        } else if (this.ruleForm.userTypes.length < 1) {
          callback(new Error('请选择角色'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          name: '',
          phone: '',
          userTypes: [],
          password: '',
          confirmPassword: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'change'},
            {min: 1, max: 15, message: '用户名不超过15位', trigger: 'change'}
          ],
          phone: [{
            validator: checkmobilephone,
            trigger: 'change'
          }],
          emil: [
            {required: true, message: '请输入邮箱', trigger: 'change'}
          ],
          userType: [{
            validator: checkUserType,
            trigger: 'change'
          }]
        },
        validators: {}
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var ut = ''
            for (let type of this.ruleForm.userTypes) {
              ut += (type + ',')
            }
            axios.post('/systemuser/register', {
              'name': '张三',
              'mobile': this.ruleForm.phone.trim(),
              'type': ut
            })
              .then((response) => {
                console.log(response.data)
                // this.success()
                if (response.data.flag === common.EXECUTE_OK) {
                  this.openalert('success', '注册用户成功')
                  this.$store.commit('setUser', {
                    'isLogin': true,
                    'userName': '李四',
                    'userRole': '3',
                    'userToken': 'sdfgsdf@4234'
                  })
                  this.$router.push({
                    path: this.$route.query.redirect ? this.$route.query.redirect : '/index'
                  })
                } else {
                  this.openalert('error', response.data.message)
                }
              })
              .catch(function (response) {
                console.log(response)
                this.openalert('error', response.data.message)
              })
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-col
    min-height 300px
    border: 1px solid #eaeefb
    border-radius: 4px
    margin-top 80px
    padding-right 30px
    .el-form-item
      margin 5px 10px 40px;
      .el-button
        width: 100%;

</style>


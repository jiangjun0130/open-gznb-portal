<template>
  <el-row>
    <el-col :span="7" :offset="8" class="loginContainer">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item>
          <span style="margin-left:60px;font-size: 20px">登录平台</span>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <router-link style="float: right;color:#20a0ff " to="/register">>>快速注册用户</router-link>
        </el-form-item>

      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElFormItem from '../../../../node_modules/element-ui/packages/form/src/form-item'
  export default {
    components: {
      ElFormItem,
      ElCol,
      ElRow
    },
    data() {
      return {
        ruleForm: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'change'},
            {message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .loginContainer
    min-height 400px
    border: 1px solid #eaeefb
    border-radius: 4px
    margin-top 100px
    padding-right 30px
    .el-form-item
      margin 30px 15px 40px;
      .el-button
        width: 100%;

</style>

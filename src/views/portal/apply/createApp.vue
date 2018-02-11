<template>
  <el-col :span="19">
    <el-form :model="businessPlatform" :rules="rules" ref="businessPlatform" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-form-item>
          <el-col>
            <div class="grid-content bg-transparent open-block" style="border: none">
              <div class="block-content">
                <div class="block-title">
                  <h3>我的应用 / 新建应用</h3>
                </div>
                <el-steps space="33%" :active="1" :center=true :align-center=true>
                  <el-step title="创建应用"></el-step>
                  <el-step title="选择功能"></el-step>
                  <el-step title="提交审核"></el-step>
                </el-steps>
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item prop="platformName">
          <el-col>
            <div class="grid-content bg-transparent open-block" style="border: none">
              <div class="block-content">
                <div class="block-title">
                  <h4>应用名称：</h4>
                  <br/>
                  <el-input
                    placeholder="应用名称" v-model="businessPlatform.platformName">
                  </el-input>
                </div>
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col>
            <div class="grid-content bg-transparent open-block" style="border: none">
              <div class="block-content">
                <div class="block-title">
                  <h4>选择功能：</h4>
                  <br/>
                  <!--<el-checkbox-group v-model="businessPlatform.systemPlatformIds">
                    <el-checkbox v-for="sp in systemPlatform" :label="sp.id" :key="sp.id">{{sp.platformName}}</el-checkbox>
                  </el-checkbox-group>-->
                  <el-radio v-for="sp in systemPlatform" v-model="businessPlatform.systemPlatformId" :label="sp.id"
                            :key="sp.id">{{sp.platformName}}
                  </el-radio>
                  <br/>
                </div>
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item prop="applyDescription" v-if="showApplyDescription">
          <el-col>
            <div class="grid-content bg-transparent open-block" style="border: none">
              <div class="block-content">
                <div class="block-title">
                  <h4>申请功能备注</h4>
                  <br/>
                  <el-row>
                    <el-col>
                      <el-input
                        type="textarea"
                        :rows="5"
                        v-model="businessPlatform.applyDescription"
                        placeholder="请输入申请功能备注">
                      </el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item prop="note">
          <el-col>
            <div class="grid-content bg-transparent open-block" style="border: none">
              <div class="block-content">
                <div class="block-title">
                  <h4>应用描述</h4>
                  <br/>
                  <el-row>
                    <el-col>
                      <el-input
                        type="textarea"
                        :rows="5"
                        v-model="businessPlatform.note"
                        placeholder="请输入应用描述">
                      </el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col>
            <el-button type="primary" @click='submitForm("businessPlatform")'>创建应用<i
              class="el-icon-upload el-icon--right"></i></el-button>
          </el-col>
        </el-form-item>
      </el-row>
    </el-form>
  </el-col>
</template>

<script>
  import common from '../../../common/js/common'
  import store from '../../../common/js/store/user'
  import ElFormItem from '../../../../node_modules/element-ui/packages/form/src/form-item'
  export default{
    components: {ElFormItem},
    data() {
      return {
        currentUser: common.getCookie('CUSERNAME'),
        businessPlatform: {
          platformName: '',
          applyDescription: '',
          note: '',
          createUser: common.getCookie('CUSERNAME'),
          applyUserPhone: '',
          applyUserEmail: '',
          systemPlatformId: 0
        },
        systemPlatform: {
          platformId: 0,
          platFormName: ''
        },
        rules: {
          platformName: [
            {required: true, message: '请填写应用名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          applyDescription: [
            {required: true, message: '请输入输入申请审核备注信息', trigger: 'blur'},
            {min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur'}
          ],
          note: [
            {required: true, message: '请输入应用描述', trigger: 'blur'},
            {min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur'}
          ]
        },
        pageBean: common.pageBean,
        showApplyDescription: false
      }
    },
    created: function () {
      this.querySystemPlatformList()
    },
    watch: {
      businessPlatform: {
        handler(curVal, oldVal) {
          if (curVal.systemPlatformId === 0) {
            this.showApplyDescription = false
          } else {
            this.showApplyDescription = true
          }
        },
        deep: true
      }
    },
    methods: {
      // 创建应用
      submitForm(formName) {
        let self = this
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.axios.post('businessPlatform/save', {
              listId: self.businessPlatform.systemPlatformId, // 系统平台ID集合
              platformName: self.businessPlatform.platformName, // 应用名称
              note: self.businessPlatform.note, // 应用描述
              description: self.businessPlatform.applyDescription, // 功能申请备注
              createUser: self.currentUser, // 应用创建人
              applyUserPhone: store.state.phone, // 申请人电话
              applyUserEmail: store.state.userEmail // 申请人邮箱
            })
              .then((response) => {
                let responseData = response.data
                if (responseData.flag === common.EXECUTE_OK) {
                  self.$notify.success({
                    title: '添加成功',
                    message: '创建应用成功，将跳转到应用详细页面',
                    duration: 2000
                  })
                  self.$router.push({
                    path: '/api/Apply/projectInfo',
                    query: {
                      'projectId': response.data.dataWraps['businessPlateFormId']
                    }
                  })
                } else {
                  self.$notify.error({
                    title: '错误',
                    message: '查询失败！',
                    duration: 6000
                  })
                }
              })
              .catch(function (response) {
                self.$notify.error({
                  title: '错误',
                  message: '查询失败！',
                  duration: 6000
                })
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      // 查询系统平台列表
      querySystemPlatformList() {
        this.axios.post('systemPlatform/queryPagedData', {
          'pageBean': {
            'pageSize': 100,
            'currentPage': this.pageBean.currentPage
          }
        })
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.systemPlatform = response.data.dataWraps['pageBean'].data.recordList
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .block-content
    padding 5px
    margin 5px
</style>

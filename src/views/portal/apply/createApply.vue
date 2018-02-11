<template>
  <el-col :span="19" style="padding-left: 10px;">
    <el-form :model="businessPlatform" :rules="rules" ref="businessPlatform" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-form-item>
          <el-col>
            <div class="grid-content bg-transparent open-block" style="border: none">
              <div class="block-content">
                <div class="block-title">
                  <h3>我的应用 / 申请功能</h3>
                </div>
                <el-steps space="33%" :active="2" :center=true :align-center=true>
                  <el-step title="注册账号"></el-step>
                  <el-step title="选择功能，创建应用"></el-step>
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
                    placeholder="应用名称" v-model="businessPlatform.platformName" :disabled="true">
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
                  <h4>已申请平台：</h4>
                  <br/>
                  <el-row style="margin-left: 20px;">
                    <el-col
                      v-if="businessPlatform.busSystemApplyRecords ==null || businessPlatform.busSystemApplyRecords.length===0">
                      <span>暂无接入</span>
                    </el-col>
                    <el-col v-else>
                      <el-checkbox v-for="s in businessPlatform.busSystemApplyRecords"
                                   v-model="businessPlatform.systemPlateforms" :checked="true" :key="s.id" disabled>
                        {{s.platformName}}
                      </el-checkbox>
                    </el-col>
                  </el-row>
                  <br/>
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
                  <h4>申请功能：</h4>
                  <br/>
                  <el-row style="margin-left: 20px;">
                    <el-col>
                      <el-radio v-for="sp in platformList"
                                :label="sp.id"
                                v-model="platformIds"
                                :key="sp.id">{{sp.platformName}}
                      </el-radio>
                    </el-col>
                  </el-row>
                  <br/>
                </div>
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item prop="applyDescription">
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
        <el-form-item>
          <el-col>
            <el-button type="primary" @click='submitData("businessPlatform")'>申请接入<i
              class="el-icon-upload el-icon--right"></i></el-button>
          </el-col>
        </el-form-item>
      </el-row>
    </el-form>
  </el-col>
</template>

<script>
  import common from '../../../common/js/common'
  import ElButton from '../../../../node_modules/element-ui/packages/button/src/button'
  import ElPopover from '../../../../node_modules/element-ui/packages/popover/src/main'
  export default{
    components: {
      ElPopover,
      ElButton
    },
    data() {
      return {
        currentUser: common.getCookie('CUSERNAME'),
        businessPlatform: {
          id: 0,
          platformName: '',
          applyDescription: '', // 申请功能备注
          busSystemApplyRecords: {
            platformName: '', // 系统平台名称
            busPlatformName: '', // 业务系统名称
            description: ''
          },
          systemPlateforms: true
        },
        pageBean: common.pageBean,
        platformList: [],
        platformIds: 0, // 系统平台ID集合
        rules: {
          platformName: [
            {required: true, message: '请填写应用名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 5 个字符', trigger: 'blur'}
          ],
          applyDescription: [
            {required: true, message: '请填写申请备注信息', trigger: 'blur'},
            {min: 1, max: 200, message: '长度在 31 到 200 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created: function () {
      let appId = this.$route.query.projectId
      this.initData(appId)
      this.getMayApplyData(appId)
    },
    methods: {
      // 查询应用信息,以及已经申请的应用
      initData(projectId) {
        let self = this
        self.axios.post('businessPlatform/queryPagedDataWithApply', {
          'id': projectId,
          'pageBean': {
            'pageSize': this.pageBean.pageSize,
            'currentPage': this.pageBean.currentPage
          }
        })
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              self.businessPlatform = response.data.dataWraps['pageBean'].data.recordList[0]
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              self.message_error('查询失败！')
            }
          })
          .catch(function (response) {
            self.message_error('查询失败！')
          })
      },
      // 查询还可以进行申请的应用列表
      getMayApplyData(appId) {
        let self = this
        self.axios.get('busSystemApplyRecord/mayApply/' + appId)
          .then(response => {
            if (response.data.flag === common.EXECUTE_OK) {
              self.platformList = response.data.dataWraps['list'].dataList
            } else {
              self.message_error('查询失败！')
            }
          }).catch(function (response) {
            self.message_error('查询失败！')
          })
      },
      submitData() {
        let self = this
        self.axios.post('busSystemApplyRecord/apply', {
          busPlatformId: self.businessPlatform.id,
          platformId: self.platformIds,
          applyUser: self.currentUser,
          applyDescription: self.businessPlatform.applyDescription,
          createUser: self.currentUser
        })
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              self.message_ok('提交申请信息成功！')
              self.$router.push({path: '/api/Apply/myApply'})
            } else {
              self.message_error('申请功能失败！')
            }
          })
          .catch(function (response) {
            self.message_error('提交申请异常！')
          })
      },

      // ------------------------------------------------------消息提示方法
      message_ok(msg) {
        let self = this
        self.$notify({
          title: '成功',
          message: msg === undefined ? '操作成功' : msg,
          type: 'success'
        })
      },
      message_error(msg) {
        let self = this
        self.$notify.error({
          title: '错误',
          message: msg === undefined ? '操作失败' : msg,
          duration: 6000
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

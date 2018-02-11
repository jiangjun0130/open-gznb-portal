<template>
  <el-col :span="19" style="padding-left: 10px;">
    <el-row>
      <el-col>
        <div class="grid-content bg-transparent open-block" style="border: none">
          <div class="block-content">
            <div class="block-title">
              <h3>我的应用 / {{businessPlatform.platformName}}</h3>
            </div>
            <el-steps space="25%" :active="4" :center=true :align-center=true>
              <el-step title="注册账号"></el-step>
              <el-step title="创建应用"></el-step>
              <el-step title="选择功能"></el-step>
              <el-step title="审核"></el-step>
            </el-steps>
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="grid-content bg-transparent open-block" style="border: none">
          <div class="block-content">
            <div class="block-title">
              <h4>应用名称：</h4>
              <br/>
<!--              <el-input
                placeholder="当前应用" v-model="businessPlatform.platformName" style="margin-left: 20px;width: 98%"
                :disabled="true">
              </el-input>  -->
              <div slot="reference" style="margin-left: 20px;width: 98%">
                <el-tag>{{ businessPlatform.platformName }}</el-tag>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <!--<el-col>
        <div class="grid-content bg-transparent open-block" style="border: none">
          <div class="block-content">
            <div class="block-title">
              <h4>应用描述：</h4>
              <br/>
              <span>{{businessPlatform.description}}</span>
            </div>
          </div>
        </div>
      </el-col>-->
      <el-col>
        <div class="grid-content bg-transparent open-block" style="border: none">
          <div class="block-content">
            <div class="block-title">
              <h4>功能接入</h4>
              <br/>
              <div
                v-if="businessPlatform.systemPlatforms ===null || businessPlatform.systemPlatforms.length===0">
                <span style="margin-left: 20px">暂无接入，</span>
                <router-link :to="{path:'/api/apply/createApply',query:{projectId:businessPlatform.id}}">
                  <span style="color: #20a0ff;">立即申请</span>
                </router-link>
              </div>
              <!--功能接入-->
              <el-card v-if class="box-card" v-for="bp in businessPlatform.systemPlatforms" :key="bp.id"
                       style="margin-left: 20px;">
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;">{{bp.platformName}}
                  <span>({{bp.platformStatus | merchantStatus}})</span></span>

                  <el-button style="float: right;" type="primary" size="small"
                             @click="openDialog(businessPlatform.id,bp.id,0,businessPlatform.platformNo, bp.platformNo)">
                    <i class="el-icon-plus"> 新增商户</i></el-button>
                </div>
                <div class="text item" style="font-size: 15px;color: #5e6d82">
                  <el-row style="margin-left: 20px;margin-top: 10px;">
                    <el-col :span="3"><span>功能描述: </span></el-col>
                    <el-col :span="21">
                      <span>{{bp.description}}</span>
                    </el-col>
                  </el-row>
                  <el-row style="margin-left: 20px;margin-top: 10px;">
                    <el-col :span="3"><span>加密类型: </span></el-col>
                    <el-col :span="21">
                      <span>{{bp.encryptType | encryptType}}</span>
                    </el-col>
                  </el-row>
                  <el-row style="margin-left: 20px;margin-top: 10px;">
                    <el-col :span="3"><span>{{bp.platformName}}响应公钥: </span></el-col>
                    <el-col :span="21">
                      <el-button type="text" class="button-style" :disabled="downloadAbled(bp.systemPublicKeyUriTest)"
                                 @click="downloadEntryFile(bp.systemPublicKeyUriTest)" v-show="bp.systemPublicKeyUriTest"> test环境
                      </el-button>
                      <el-button type="text" class="button-style" :disabled="downloadAbled(bp.systemPublicKeyUriPrd)"
                                 @click="downloadEntryFile(bp.systemPublicKeyUriPrd)" v-show="bp.systemPublicKeyUriPrd"> prd环境
                      </el-button>
                    </el-col>
                  </el-row>
                  <el-row style="margin-left: 20px;margin-top: 10px;">
                    <el-col :span="3"><span>商户: </span></el-col>
                    <el-col :span="21">
                      <el-table :data="bp.merchants" border>
                        <el-table-column prop="merchantName" label="商户名称" width="120">
                        </el-table-column>
                        <el-table-column prop="merchantNo" label="商户编号" width="200">
                        </el-table-column>
                        <el-table-column label="状态" width="120">
                          <template scope="scope">
                            <el-tag type="success" v-if="scope.row.merchantStatus == '1'">正常</el-tag>
                            <el-tag type="warning" v-if="scope.row.merchantStatus == '2'">禁用</el-tag>
                            <el-tag type="danger" v-if="scope.row.merchantStatus == '3'">删除</el-tag>
                          </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作">
                          <template scope="scope">
                            <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
                            <el-button @click="openDialog(0,0,scope.row.id,0,0)" type="text" size="small">编辑
                            </el-button>
                            <router-link :to="{path:'/api/apply/merchant',query:{merchantId:scope.row.id}}">
                              <el-button style="margin-left: 10px" size="small" type="text">渠道管理</el-button>
                            </router-link>
                            <el-button @click="generaterKey(scope.row)" type="text" size="small">生成秘钥</el-button>
                            <el-button :disabled="downloadAbled(scope.row.busPrivateKeyUriTest)" type="text"
                                       @click="downloadEntryFile(scope.row.busPrivateKeyUriTest)"
                                       v-show="scope.row.busPrivateKeyUriTest"> 请求私钥test环境
                            </el-button>
                            <el-button :disabled="downloadAbled(scope.row.busPrivateKeyUriPrd)" type="text"
                                       @click="downloadEntryFile(scope.row.busPrivateKeyUriPrd)"
                                       v-show="scope.row.busPrivateKeyUriPrd"> 请求私钥prd环境
                            </el-button>
                            <!--                            <el-button :disabled="downloadAbled(scope.row.busPublicKeyUri)" type="text"
                                                                   @click="downloadEntryFile(scope.row.busPublicKeyUri)" v-show="scope.row.busPublicKeyUri"> 下载商户公钥
                                                        </el-button>  -->
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </div>
          </div>
        </div>

        <!--添加、修改渠道dialog-->
        <el-dialog title="商户信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="5%"
                   :before-close="handleClose">
          <el-form :model="merchant" :rules="rules" ref="merchant" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商户名称" prop="merchantName">
              <el-input v-model="merchant.merchantName" placeholder="请输入渠道名称"></el-input>
            </el-form-item>
            <el-form-item label="uuid" prop="merchantUuid">
              <el-input v-model="merchant.merchantUuid" placeholder="请输入uuid"></el-input>
            </el-form-item>
            <el-form-item label="商户状态">
              <el-radio class="radio" v-model="merchant.merchantStatus" label="1">正常</el-radio>
              <el-radio class="radio" v-model="merchant.merchantStatus" label="2">禁用</el-radio>
              <el-radio class="radio" v-model="merchant.merchantStatus" label="3">删除</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleMerchant">保存</el-button>
              <el-button @click="resetForm">重置</el-button>
              <el-button type="danger" @click="handleClose">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>
    </el-row>
  </el-col>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .function
    border 1px solid #eaeefb
    border-left solid 5px #20a0ff
    padding-left 5px
    background-color #eef1f6

  .box-card
    margin-top 20px

  .demo-table-expand
    font-size 0

  .demo-table-expand label
    width 90px
    color #99a9bf

  .demo-table-expand .el-form-item
    margin-right 0
    margin-bottom 0
    width 50%

  .button-style
    padding: 2px 15px
</style>

<script>
  import common from '../../../common/js/common'
  import ElFormItem from '../../../../node_modules/element-ui/packages/form/src/form-item'
  import ElRadio from '../../../../node_modules/element-ui/packages/radio/src/radio'
  import ElInput from '../../../../node_modules/element-ui/packages/input/src/input'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElButton from '../../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {
      ElButton,
      ElRow,
      ElCol,
      ElInput,
      ElRadio,
      ElFormItem
    },
    data() {
      let checkBusChannelNo = (rule, value, callback) => {
        if (value !== null && value !== '') {
          if (value.length > 15) {
            return callback(new Error('渠道编号不能超过16位'))
          } else {
            callback()
          }
        }
        callback()
      }
      return {
        currentUser: common.getCookie('CUSERNAME'),
        dialogFormVisible: false, // 添加、修改渠道dialog开关
        uploadUrl: '/api/upload/uploadPic', // TODO 此处考虑设置为全局常量
        uploadDisabled: false,
        merchant: {
          id: 0,
          platformId: 0, // 系统平台ID
          busPlatformId: 0, // 业务系统ID
          merchantName: '', // 商户名称
          merchantUuid: '', // 商户Uuid
          merchantStatus: '1', // 商户状态
          createUser: common.getCookie('CUSERNAME'),
          updateUser: common.getCookie('CUSERNAME')
        },
        fileList: [],
        businessPlatform: {
          id: 0,
          platformName: '',
          note: '',
          description: '',
          systemPlatforms: {} // 系统平台集合
        },
        rules: {
          merchantName: [
            {required: true, message: '请填写商户名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
//          merchantUuid: [
//            {required: true, message: '请填写uuid', trigger: 'blur'},
//            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
//          ],
          busChannelNo: [{
            validator: checkBusChannelNo,
            trigger: 'change'
          }],
          channelStatus: [
            {required: true, message: '请选择渠道状态', trigger: 'blur'}
          ],
          envFlag: [
            {required: true, message: '请选择系统环境', trigger: 'blur'}
          ]
        },
        tableData: [],
        pageBean: common.pageBean
      }
    },
    created: function () {
      this.initData()
    },
    methods: {
      /**
       * 添加渠道dialog关闭时触发
       * */
      resetForm() {
        this.$refs['merchant'].resetFields()
        this.merchant = {
          id: 0,
          platformId: 0, // 系统平台ID
          busPlatformId: 0, // 业务系统ID
          merchantName: '', // 商户名称
          merchantUuid: '', // 商户Uuid
          merchantStatus: '1', // 商户状态
          busPlatformNo: '',   // 业务系统编号
          platformNo: '',  // 开放系统编号
          createUser: common.getCookie('CUSERNAME'),
          updateUser: common.getCookie('CUSERNAME')
        }
      },
      handleClose(done) {
        this.resetForm()
        this.dialogFormVisible = false
      },
      generaterKey(row) {
        let self = this
        self.$confirm('此操作会覆盖之前已生成的秘钥, 是否继续?', '警告', {
          confirmButtonText: '确定执行',
          cancelButtonText: '放弃',
          type: 'warning'
        }).then(() => {
          self.axios.get('merchant/generate', {
            'id': row.id,
            'platformId': row.platformId
          })
            .then((response) => {
              let responseData = response.data
              if (responseData.flag === common.EXECUTE_OK) {
                self.$message({
                  type: 'success',
                  message: '生成秘钥成功!'
                })
              } else {
                self.message_error('生成秘钥失败！')
              }
            })
            .catch(function (response) {
              self.message_error('生成秘钥失败！')
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      openDialog(businessId, systemId, merchantId, busPlatformNo, sysPlatformNo) {
        let self = this
        if (merchantId === 0) {
          // 新增商户
          self.merchant.busPlatformId = businessId
          self.merchant.platformId = systemId
          self.merchant.busPlatformNo = busPlatformNo
          self.merchant.platformNo = sysPlatformNo
        } else {
          // 修改操作
          self.axios.get('merchant/byId/' + merchantId)
            .then((response) => {
              let responseData = response.data
              if (responseData.flag === common.EXECUTE_OK) {
                self.merchant = responseData.dataWraps['data'].data
                // self.fileList.push(self.channel.certPath) 证书文件回显
              } else {
                self.message_error('查询失败！')
              }
            })
            .catch(function (response) {
              self.message_error('查询失败！')
            })
        }
        self.dialogFormVisible = true
      },
      openChannelDialog(id, type) {
        let self = this
        if (type === 'update') {
          // 修改渠道信息操作，根据id查询渠道信息，并回显到dialog中

        }
        self.dialogFormVisible = true
        self.channel.busMerchantId = id // 设置商户id
      },
      // ------------------------------------------------------------------------------渠道列表查询
      initData() {
        let projectId = this.$route.query.projectId
        let self = this
        self.axios.get('businessPlatform/queryWhitChannel/' + projectId)
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              self.businessPlatform = response.data.dataWraps['data'].data
              console.log(self.businessPlatform)
            } else {
              self.message_error('查询失败！')
            }
          })
          .catch(function (response) {
            self.message_error('查询失败！')
          })
      },
      // ------------------------------------------------------------------------------渠道管理
      // 添加渠道、修改渠道
      handleMerchant() {
        let self = this
        self.$refs['merchant'].validate((valid) => {
          if (valid) {
            self.axios.post('merchant/save', self.merchant)
              .then((response) => {
                let responseData = response.data
                if (responseData.flag === common.EXECUTE_OK) {
                  self.message_ok('保存商户信息成功')
                  self.handleClose()
                  self.initData()
                } else {
                  self.message_error('保存商户信息失败！')
                }
              })
              .catch(function (response) {
                self.message_error('保存商户信息失败！')
              })
          } else {
            return false
          }
        })
      },

      // ------------------------------------------------------------------------------删除商户（商户状态置为3）
      handleDelete(id) {
        let self = this
        self.$confirm('确定进行该操作？')
          .then(_ => {
            self.axios.post('merchant/update', {
              id: id,
              merchantStatus: 3,
              updateUser: self.currentUser
            })
              .then((response) => {
                let responseData = response.data
                if (responseData.flag === common.EXECUTE_OK) {
                  self.message_ok()
                  self.initData()
                } else {
                  self.message_error()
                }
              })
              .catch(function (response) {
                self.message_error()
              })
          })
      },
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
      },
      // ------------------------------------------------------------------------------上传图片相关方法
      /**
       *手动点击上传
       * */
      submitUpload() {
        this.$refs.upload.submit()
      },
      handleRemove(file, fileList) {
        let self = this
        self.$refs.upload.clearFiles()
        self.fileList = self.$refs.upload.fileList
        self.uploadDisabled = false
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 1
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过2M')
        }
        return isLt2M
      },
      /**
       * 限制一次只能上传一个证书
       * @param file
       * @param fileList
       */
      handleChange(file, fileList) {
        let self = this
        let length = fileList.length
        self.uploadDisabled = length >= 1
      },
      handleSuccess(response, file, fileList) {
        this.fileList.push(file)
        this.channel.certPath = response.url
        this.$message.success(' (*^﹏^*) 上传文件成功')
        console.log(response)
      },
      uploadNow() {
        if (this.uploadDisabled) {
          this.$message.error('（⊙ｏ⊙）只能上传一个文件哦')
        }
      },
      // ----------------------------------------------------------------------------------------下载证书
      // 控制下载按钮可见
      downloadAbled(url) {
        if (typeof (url) === 'undefined' || url === null || url === '') {
          return true
        }
        return false
      },
      // 下载证书
      downloadEntryFile(url) {
        let self = this
        console.log(url)
        if (url === null || url === '') {
          self.message_error('证书路径为空')
        } else if (url.substring(0, 7) === 'http://') {
          window.open(url)
        } else {
          self.message_error('证书路径地址错误，地址：' + url)
        }
      },
      // 商户管理
      addMerchant() {

      }
    },
    // ----------------------------------------------------------------------------------------过滤器
    filters: {
      merchantStatus: function (status) {
        if (status === '1') {
          console.log(status)
          return '启用'
        }
        if (status === '2') {
          return '禁用'
        }
        if (status === '3') {
          return '删除'
        }
      },
      encryptType: function (encryptType) {
        if (encryptType === '1') {
          return 'RSA加密'
        }
        if (encryptType === '2') {
          return 'AES加密'
        }
        if (encryptType === '3') {
          return 'MD5加密'
        }
        return '无'
      }
    }
  }
</script>

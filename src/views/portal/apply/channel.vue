<template>
  <el-col :span="19" style="padding-left: 10px;">
    <el-row>
      <el-col>
        <div class="grid-content bg-transparent open-block">
          <div class="block-content">
            <div class="block-title" style="margin-bottom: 30px">
              <h3>我的应用/ {{merchant.merchantName}}/ 渠道列表</h3>
            </div>
            <div class="block-title">
            </div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="渠道名称:">
                <el-input placeholder="请输入渠道名称" v-model="searchName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
                <el-button type="primary" icon="add" @click="openChannelDialog('add')"><i class="el-icon-plus"></i> 新增渠道
                </el-button>
                <el-button type="primary" icon="add" @click="goBack()"><i class="el-icon-arrow-left"> 返回</i>
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="pageBean.recordList"
        style="width: 100%">
             <el-table-column type="expand">
               <template scope="props">
                 <el-form label-position="left" inline class="demo-table-expand">
                   <el-form-item label="MD5秘钥：">
                     <span>{{ props.row.md5Key }}</span>
                   </el-form-item>
                   <el-form-item label="渠道签名秘钥：">
                     <span>{{ props.row.reqPrivateKey }}</span>
                   </el-form-item>
                   <el-form-item label="响应验签公钥：">
                     <span>{{ props.row.resPublicKey }}</span>
                   </el-form-item>
                   <el-form-item label="证书下载：">
                     <el-button :disabled="downloadAbled(props.row.certPath)" type="text"
                                @click="downloadEntryFile(props.row.certPath)"> 下载
                     </el-button>
                   </el-form-item>
                   <el-form-item label="证书密码：">
                     <span>{{ props.row.certPassword }}</span>
                   </el-form-item>
                 </el-form>
               </template>
             </el-table-column>
             <el-table-column
               prop="busChannelName"
               label="渠道名称">
             </el-table-column>
             <el-table-column
               prop="busChannelNo"
               label="渠道编号">
             </el-table-column>
             <el-table-column
               label="渠道类型">
               <template scope="scope">
                 <el-tag type="success" v-if="scope.row.busChannelType == '1'">
                   微信
                 </el-tag>
                 <el-tag type="success" v-if="scope.row.busChannelType == '2'">
                   支付宝
                 </el-tag>
                 <el-tag type="success" v-if="scope.row.busChannelType == '3'">
                   生活交费
                 </el-tag>
               </template>
             </el-table-column>
             <el-table-column
               prop="channelStatus"
               label="状态">
               <template scope="scope">
                 <el-tag type="success" v-if="scope.row.channelStatus == '1'">
                   正常
                 </el-tag>
                 <el-tag type="warning" v-if="scope.row.channelStatus == '2'">
                   禁用
                 </el-tag>
                 <el-tag type="danger" v-if="scope.row.channelStatus == '3'">
                   删除
                 </el-tag>
               </template>
             </el-table-column>
             <el-table-column
               fixed="right"
               label="操作">
               <template scope="scope">
                 <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
                 <el-button @click="openChannelDialog(scope.row.id, 'update')" type="text" size="small">编辑
                 </el-button>
               </template>
             </el-table-column>
        <!--添加、修改渠道dialog-->
        <el-dialog title="渠道信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="5%"
                   :before-close="handleClose">
          <el-form :model="channel" :rules="rules" ref="channel" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="渠道名称" prop="busChannelName">
                  <el-input v-model="channel.busChannelName" placeholder="请输入渠道名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="渠道编号" prop="busChannelNo">
                  <el-input v-model="channel.busChannelNo" placeholder="渠道编号，如不填则系统自动生成"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="应用标识" prop="channelAppId">
                  <el-input v-model="channel.channelAppId" placeholder="请输入渠道应用标识"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商户标识" prop="channelMerId">
                  <el-input v-model="channel.channelMerId" placeholder="请输入渠道商户标识"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="渠道状态" prop="channelStatus">
                  <el-select v-model="channel.channelStatus" placeholder="请选择渠道状态">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="禁用" value="2"></el-option>
                    <el-option label="删除" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="系统环境" prop="envFlag">
                  <el-select v-model="channel.envFlag" placeholder="请选择系统环境">
                    <el-option label="dev" value="1"></el-option>
                    <el-option label="test" value="2"></el-option>
                    <el-option label="pre" value="3"></el-option>
                    <el-option label="prd" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="加密类型" prop="channelEncryptType">
                  <el-select v-model="channel.channelEncryptType" placeholder="请选择渠道加密类型">
                    <el-option label="RSA加密" value="1"></el-option>
                    <el-option label="AES加密" value="2"></el-option>
                    <el-option label="MD5加密" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="渠道类型" prop="busChannelType">
                  <el-select v-model="channel.busChannelType" placeholder="请选择渠道类型">
                    <el-option label="微信" value="1"></el-option>
                    <el-option label="支付宝" value="2"></el-option>
                    <el-option label="生活卡支付" value="3"></el-option>
                    <el-option label="光大" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="MD5密钥" prop="md5Key">
                  <el-input v-model="channel.md5Key" placeholder="请输入md5密钥串"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="签名密钥" prop="reqPrivateKey">
                  <el-input v-model="channel.reqPrivateKey" placeholder="请输入请求渠道签名密钥"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="验签公钥" prop="resPublicKey">
              <el-input v-model="channel.resPublicKey" placeholder="请输入渠道响应验签公钥"></el-input>
            </el-form-item>
            <el-form-item label="证书密码" prop="certPassword">
              <el-input v-model="channel.certPassword" placeholder="请输入渠道证书密码"></el-input>
            </el-form-item>
            <el-row>
              <el-col>
                <el-form-item label="证书文件">
                  <el-upload
                    name="pic"
                    class="upload-demo"
                    ref="upload"
                    :action="uploadUrl"
                    :on-remove="handleRemove"
                    :before-upload="beforeAvatarUpload"
                    :on-change="handleChange"
                    :on-success="handleSuccess"
                    :disabled="!uploadDisabled"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary" @click="uploadNow">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload"
                               :disabled="!uploadDisabled">上传到服务器
                    </el-button>
                    <div slot="tip" class="el-upload__tip">* 只能上传一个文件，且大小不超过1MB</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="渠道描述">
              <el-input v-model="channel.description" placeholder="请输入渠道描述"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="channel.note" placeholder="请输入备注信息"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveChannel">保存</el-button>
              <el-button @click="resetForm">重置</el-button>
              <el-button type="danger" @click="handleClose">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-table>

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

      <!--添加、修改渠道dialog-->
      <el-dialog title="渠道信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="5%"
                 :before-close="handleClose">
        <el-form :model="channel" :rules="rules" ref="channel" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="渠道名称" prop="busChannelName">
                <el-input v-model="channel.busChannelName" placeholder="请输入渠道名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="渠道编号" prop="busChannelNo">
                <el-input v-model="channel.busChannelNo" placeholder="渠道编号，如不填则系统自动生成"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="应用标识" prop="channelAppId">
                <el-input v-model="channel.channelAppId" placeholder="请输入渠道应用标识"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商户标识" prop="channelMerId">
                <el-input v-model="channel.channelMerId" placeholder="请输入渠道商户标识"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="渠道状态" prop="channelStatus">
                <el-select v-model="channel.channelStatus" placeholder="请选择渠道状态">
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="禁用" value="2"></el-option>
                  <el-option label="删除" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="系统环境" prop="envFlag">
                <el-select v-model="channel.envFlag" placeholder="请选择系统环境">
                  <el-option label="dev" value="1"></el-option>
                  <el-option label="test" value="2"></el-option>
                  <el-option label="pre" value="3"></el-option>
                  <el-option label="prd" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="加密类型" prop="channelEncryptType">
                <el-select v-model="channel.channelEncryptType" placeholder="请选择渠道加密类型">
                  <el-option label="RSA加密" value="1"></el-option>
                  <el-option label="AES加密" value="2"></el-option>
                  <el-option label="MD5加密" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="渠道类型" prop="busChannelType">
                <el-select v-model="channel.busChannelType" placeholder="请选择渠道类型">
                  <el-option label="微信" value="1"></el-option>
                  <el-option label="支付宝" value="2"></el-option>
                  <el-option label="生活卡支付" value="3"></el-option>
                  <el-option label="光大" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="MD5密钥" prop="md5Key">
                <el-input v-model="channel.md5Key" placeholder="请输入md5密钥串"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签名密钥" prop="reqPrivateKey">
                <el-input v-model="channel.reqPrivateKey" placeholder="请输入请求渠道签名密钥"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="公众号id" prop="channelOpenId" v-show="channel.busChannelType == 1">
                <el-input v-model="channel.channelOpenId" placeholder="请输入微信公众号openId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="验签公钥" prop="resPublicKey">
            <el-input v-model="channel.resPublicKey" placeholder="请输入渠道响应验签公钥"></el-input>
          </el-form-item>
          <el-form-item label="证书密码" prop="certPassword">
            <el-input v-model="channel.certPassword" placeholder="请输入渠道证书密码"></el-input>
          </el-form-item>
          <el-row>
            <el-col>
              <el-form-item label="证书文件">
                <el-upload
                  name="pic"
                  class="upload-demo"
                  ref="upload"
                  :action="uploadUrl"
                  :on-remove="handleRemove"
                  :before-upload="beforeAvatarUpload"
                  :on-change="handleChange"
                  :on-success="handleSuccess"
                  :file-list="fileList"
                  :disabled="uploadDisabled"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary" @click="uploadNow">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload"
                             :disabled="!uploadDisabled">上传到服务器
                  </el-button>
                  <div slot="tip" class="el-upload__tip">* 只能上传一个文件，且大小不超过1MB</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="渠道描述">
            <el-input v-model="channel.description" placeholder="请输入渠道描述"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="channel.note" placeholder="请输入备注信息"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveChannel">保存</el-button>
            <el-button @click="resetForm">重置</el-button>
            <el-button type="danger" @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
  </el-col>
</template>

<script>
  import common from '../../../common/js/common'
  import axios from 'axios'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  export default {
    components: {
      ElCol,
      ElRow},
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
        searchName: '',
        dialogFormVisible: false, // 添加、修改渠道dialog开关
        uploadUrl: '/api/upload/uploadPic', // TODO 此处考虑设置为全局常量
        uploadDisabled: false,
        fileList: [],
        merchant: {
          id: 0,
          platformId: 0, // 系统平台ID
          busPlatformId: 0, // 业务系统ID
          merchantName: '', // 商户名称
          merchantStatus: '1', // 商户状态
          createUser: common.getCookie('CUSERNAME'),
          updateUser: common.getCookie('CUSERNAME'),
          channels: []
        },
        channel: {
          busMerchantId: null,
          busChannelNo: '', // 渠道编号
          busChannelName: '', // 渠道名称
          busChannelType: '', // 渠道类型。1：微信；2：支付宝；3：生活卡支付；4：光大；
          channelStatus: '', // 渠道状态。1：正常；2：禁用；3：删除
          md5Key: '', // MD5秘钥
          envFlag: '', // 系统环境标识。1：dev环境；2：test环境；3：pre环境；4：prd环境
          channelAppId: this.$route.query.projectId,
          channelMerId: '',
          channelEncryptType: '', // 加密类型
          reqPrivateKey: '', // 请求渠道签名密钥。
          channelOpenID: '', // 微信openID。
          resPublicKey: '', // 渠道响应验签公钥
          certPath: '', // 渠道证书路径
          certPassword: '', // 渠道证书密码
          description: '',
          note: '',
          certFileName: '',
          create_user: common.getCookie('CUSERNAME'),
          updateUser: common.getCookie('CUSERNAME')
        },
        rules: {
          busChannelName: [
            {required: true, message: '请填写渠道名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          busChannelNo: [{
            validator: checkBusChannelNo,
            trigger: 'change'
          }],
          /* channelAppId: [
           {required: true, message: '请填写渠道应用标识', trigger: 'blur'},
           {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
           ], */
          channelStatus: [
            {required: true, message: '请选择渠道状态', trigger: 'blur'}
          ],
          envFlag: [
            {required: true, message: '请选择系统环境', trigger: 'blur'}
          ]/*,
           channelEncryptType: [
           {required: true, message: '请选择渠道加密类型', trigger: 'blur'}
           ],
           busChannelType: [
           {required: true, message: '请选择渠道类型', trigger: 'blur'}
           ],
           md5Key: [
           {required: true, message: '请填写MD5秘钥', trigger: 'blur'}
           ],
           reqPrivateKey: [
           {required: true, message: '请填写签名秘钥', trigger: 'blur'}
           ],
           resPublicKey: [
           {required: true, message: '请输入响应验签公钥', trigger: 'blur'}
           ],
           certPassword: [
           {required: true, message: '请输入渠道证书数码', trigger: 'blur'}
           ],
           certPath: [
           {required: true, message: '请输入证书密码地址', trigger: 'blur'}
           ] */
        },
        pageBean: common.pageBean,
        customPageSize: 15
      }
    },
    computed: {
      pageSizes() {
        return [1 * this.customPageSize, 2 * this.customPageSize, 3 * this.customPageSize, 4 * this.customPageSize]
      }
    },
    created: function () {
      let self = this
      self.merchant.id = self.$route.query.merchantId
      this.initData()
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      handleClose(done) {
        this.$refs.upload.clearFiles()
        this.dialogFormVisible = false
        this.uploadDisabled = false
        this.initData()
        this.channel = {
          busMerchantId: null,
          busMerchantNo: '', // 商户编号
          busChannelNo: '', // 渠道编号
          busChannelName: '', // 渠道名称
          busChannelType: '', // 渠道类型。1：微信；2：支付宝；3：生活卡支付；4：光大；
          channelStatus: '', // 渠道状态。1：正常；2：禁用；3：删除
          md5Key: '', // MD5秘钥
          envFlag: '', // 系统环境标识。1：dev环境；2：test环境；3：pre环境；4：prd环境
          channelAppId: this.$route.query.projectId,
          channelMerId: '',
          channelEncryptType: '', // 加密类型
          reqPrivateKey: '', // 请求渠道签名密钥。
          channelOpenId: '', // 微信openID。
          resPublicKey: '', // 渠道响应验签公钥
          certPath: '', // 渠道证书路径
          certPassword: '', // 渠道证书密码
          description: '',
          note: '',
          certFileName: '',
          create_user: common.getCookie('CUSERNAME'),
          updateUser: common.getCookie('CUSERNAME')
        }
      },
      /**
       * 添加渠道dialog关闭时触发
       * */
      resetForm() {
        this.$refs['channel'].resetFields()
        this.fileList.push()
        this.channel = {
          busMerchantId: null,
          busMerchantNo: '', //
          busChannelNo: '', // 渠道编号
          busChannelName: '', // 渠道名称
          busChannelType: '', // 渠道类型。1：微信；2：支付宝；3：生活卡支付；4：光大；
          channelStatus: '', // 渠道状态。1：正常；2：禁用；3：删除
          md5Key: '', // MD5秘钥
          envFlag: '', // 系统环境标识。1：dev环境；2：test环境；3：pre环境；4：prd环境
          channelAppId: this.$route.query.projectId,
          channelMerId: '',
          channelEncryptType: '', // 加密类型
          reqPrivateKey: '', // 请求渠道签名密钥。
          channelOpenId: '', // 微信openID。
          resPublicKey: '', // 渠道响应验签公钥
          certPath: '', // 渠道证书路径
          certPassword: '', // 渠道证书密码
          description: '',
          note: '',
          certFileName: '',
          create_user: common.getCookie('CUSERNAME'),
          updateUser: common.getCookie('CUSERNAME')
        }
      },
      handleSizeChange(val) {
        this.pageBean.pageSize = val
        this.initData()
      },
      handleCurrentChange(val) {
        this.pageBean.currentPage = val
        this.initData()
      },
      // -----------------------------------------------------------------查询渠道列表
      initData() {
        let self = this
        // 查询分页数据
        self.pageBean.pageSize = self.customPageSize // 修改每页显示数据
        axios.post('buschannel/queryPagedData', {
          'busMerchantId': self.merchant.id,
          'busChannelName': self.searchName,
          'pageBean': {
            'pageSize': self.pageBean.pageSize,
            'currentPage': self.pageBean.currentPage
          }
        })
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              self.merchant = responseData.dataWraps.data.data
              self.pageBean = responseData.dataWraps.data.data.channels
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
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
      },
      onSubmit() {
        this.initData()
      },
      // ------------------------------------------------------------------------------渠道管理
      openChannelDialog(id, type) {
        let self = this
        if (type === 'update') {
          // 修改渠道信息操作，根据id查询渠道信息，并回显到dialog中
          self.axios.get('buschannel/one/' + id)
            .then((response) => {
              let responseData = response.data
              if (responseData.flag === common.EXECUTE_OK) {
                self.channel = response.data.dataWraps['data'].data
                console.log(self.channel)
                self.fileList = []
                self.fileList.push({name: self.channel.certFileName, url: self.channel.certPath})
              } else {
                self.message_error('查询失败！')
              }
            })
            .catch(function (response) {
              self.message_error('查询失败！')
            })
        }
        self.dialogFormVisible = true
        self.channel.busMerchantId = id // 设置商户id
      },
      // 添加渠道、修改渠道
      saveChannel() {
        let self = this
        self.$refs['channel'].validate((valid) => {
          if (valid) {
            self.channel.busMerchantId = self.merchant.id
            self.channel.busMerchantNo = self.merchant.merchantNo
            self.axios.post('buschannel', self.channel)
              .then((response) => {
                let responseData = response.data
                if (responseData.flag === common.EXECUTE_OK) {
                  self.message_ok('保存渠道信息成功')
                  self.dialogFormVisible = false
                  this.uploadDisabled = false
                  self.initData()
                  this.fileList.push()
                } else {
                  self.message_error('保存渠道信息失败！')
                }
              })
              .catch(function (response) {
                self.message_error('保存渠道信息失败！')
              })
          } else {
            return false
          }
        })
      },

      // 删除渠道
      handleDelete(id) {
        let self = this
        self.$confirm('删除后不可恢复哦，确定删除？')
          .then(_ => {
            self.axios('buschannel/delete/' + id)
              .then((response) => {
                let responseData = response.data
                if (responseData.flag === common.EXECUTE_OK) {
                  self.message_ok('删除渠道成功')
                  this.initData()
                } else {
                  self.message_error('删除渠道失败！')
                }
              })
              .catch(function (response) {
                self.message_error('删除渠道失败！')
              })
          })
          .catch(_ => {

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
        console.log(file, fileList)
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
        console.log(file)
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
<style lang="stylus" rel="stylesheet/stylus">
  .demo-table-expand
    font-size: 0

  .demo-table-expand label
    width: 120px
    color: #99a9bf

  .demo-table-expand .el-form-item
    margin-right: 0
    margin-bottom: 0
    width: 50%
</style>

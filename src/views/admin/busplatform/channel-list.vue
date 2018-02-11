<template>
  <div>
    <el-row>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-transparent open-block">
          <div class="block-content">
            <v-micro-navi></v-micro-navi>
            <div class="block-title">
              <h4>渠道列表[{{merchantName}}]商户</h4>
            </div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="应用名称:">
                <el-input v-model="searchQuery.channelName" placeholder="请输入渠道名称"></el-input>
              </el-form-item>
              <el-form-item label="应用编号:">
                <el-input v-model="searchQuery.channelNo" placeholder="请输入渠道编号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="queryPagedData" icon="search">查询</el-button>
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
          <el-table :data="pageBean.recordList" border style="width: 100%">
            <el-table-column label="序号" icon="edit" width="80" align="center">
              <template scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column label="渠道名称" width="200" align="center" prop="busChannelName"></el-table-column>
            <el-table-column label="渠道编号" width="200" align="center" prop="busChannelNo"></el-table-column>
            <el-table-column label="渠道状态" width="120" align="center" prop="channelStatusName">
              <template scope="scope">
                <el-tag type="success" v-if="scope.row.channelStatus == 1">
                  {{scope.row.channelStatusName}}
                </el-tag>
                <el-tag type="danger" v-if="scope.row.channelStatus == 2">
                  {{scope.row.channelStatusName}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="商户名称" width="200" align="center" prop="busMerchantName"></el-table-column>
            <el-table-column label="商户编号" width="200" align="center" prop="busMerchantNo"></el-table-column>
            <el-table-column label="平台名称" width="200" align="center" prop="platformName"></el-table-column>
            <el-table-column label="平台编号" width="200" align="center" prop="platformNo"></el-table-column>
            <el-table-column label="应用名称" width="200" align="center" prop="busPlatformName"></el-table-column>
            <el-table-column label="应用编号" width="200" align="center" prop="busPlatformNo"></el-table-column>
            <el-table-column label="操作" align="center" width="120" fixed="right">
              <template scope="scope">
                <el-button size="small" icon="document" type="primary" class="img-button" @click="toChannelUI(scope.row.id)">详细信息</el-button>
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
    <el-dialog title="商户渠道详细信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="5%"
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

<!--        <el-form-item>
          <el-button type="primary" @click="saveChannel">保存</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="danger" @click="handleClose">取消</el-button>
        </el-form-item> -->
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import common from '../../../common/js/common'
  import MircoNavi from '../../../components/micro-navi/micro-navi'

  export default {
    components: {
      'v-micro-navi': MircoNavi
    },
    data() {
      return {
        dialogFormVisible: false,
        searchQuery: {
          channelName: '',
          channelNo: ''
        },
        merchantName: '',
        pageBean: {
          beginPageIndex: 1,
          currentPage: 1,
          endPageIndex: 1,
          pageCount: 1,
          pageSize: common.PAGE_SIZE * 2,
          recordCount: 0,
          startIndex: 0,
          recordList: []
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
        }
      }
    },
    computed: {
      pageSizes() {
        return [1 * common.PAGE_SIZE, 2 * common.PAGE_SIZE, 3 * common.PAGE_SIZE, 4 * common.PAGE_SIZE]
        // return [1 * this.customPageSize, 2 * this.customPageSize, 3 * this.customPageSize, 4 * this.customPageSize]
      }
    },
    created() {
      this.merchantName = this.$route.params.merchantName
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
      queryPagedData() {
        // 修改每页显示数据
        Vue.axios.post('/buschannel/queryPagedDataAdmin', {
          'platformNo': this.$route.params.platformNo,
          'merchantNo': this.$route.params.merchantNo,
          'channelName': this.searchQuery.channelName,
          'channelNo': this.searchQuery.channelNo,
          'pageBean': {
            'pageSize': this.pageBean.pageSize,
            'currentPage': this.pageBean.currentPage
          }
        })
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.pageBean = response.data.dataWraps['pageBean'].data
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '错误', message: '查询失败！', duration: 6000})
          })
      },
      toChannelUI(id) {
        this.axios.get('buschannel/one/' + id)
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.channel = response.data.dataWraps['data'].data
              console.log(this.channel)
              this.fileList = []
              this.fileList.push({name: this.channel.certFileName, url: this.channel.certPath})
            } else {
              this.message_error('查询失败！')
            }
          })
          .catch(function (response) {
            this.message_error('查询失败！')
          })
        this.dialogFormVisible = true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

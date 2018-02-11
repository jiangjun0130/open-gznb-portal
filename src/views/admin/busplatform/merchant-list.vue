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
              <h4>商户列表[{{platformName}}]</h4>
            </div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="应用名称:">
                <el-input v-model="searchQuery.busPlatformName" placeholder="请输入应用名称"></el-input>
              </el-form-item>
              <el-form-item label="应用编号:">
                <el-input v-model="searchQuery.busPlatformNo" placeholder="请输入应用编号"></el-input>
              </el-form-item>
              <el-form-item label="商户名称:">
                <el-input v-model="searchQuery.merchantName" placeholder="请输入商户名称"></el-input>
              </el-form-item>
              <el-form-item label="商户编号:">
                <el-input v-model="searchQuery.merchantNo" placeholder="请输入商户编号"></el-input>
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
          <el-table :data="pageBean.recordList" border style="width: 200%">
            <!--<el-table-column label="序号" width="70">
              <template scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>-->
            <el-table-column label="商户名称" width="120" align="center" prop="merchantName" fixed></el-table-column>
            <el-table-column label="商户编号" width="180" align="center" prop="merchantNo"></el-table-column>
            <el-table-column label="商户状态" width="100"  align="center" prop="merchantStatusName">
              <template scope="scope">
                <el-tag type="success" v-if="scope.row.merchantStatus == 1">
                  {{scope.row.merchantStatusName}}
                </el-tag>
                <el-tag type="danger" v-if="scope.row.merchantStatus == 2">
                  {{scope.row.merchantStatusName}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="平台名称" width="150" align="center" prop="platformName"></el-table-column>
            <el-table-column label="平台编号" width="190" align="center" prop="platformNo"></el-table-column>
            <el-table-column label="应用名称" width="100" align="center" prop="busPlatformName"></el-table-column>
            <el-table-column label="应用编号" width="190" align="center" prop="busPlatformNo"></el-table-column>
            <el-table-column label="平台私钥下载"  width="180" align="center" prop="busPlatformNo">
              <template scope="scope">
                <el-button :disabled="downloadAbled(scope.row.systemPrivateKeyUriTest)" type="text"
                           @click="downloadEntryFile(scope.row.systemPrivateKeyUriTest)"
                           v-show="scope.row.systemPrivateKeyUriTest"> test环境
                </el-button>
                <el-button :disabled="downloadAbled(scope.row.systemPrivateKeyUriPrd)" type="text"
                           @click="downloadEntryFile(scope.row.systemPrivateKeyUriPrd)"
                           v-show="scope.row.systemPrivateKeyUriPrd"> prd环境
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="商户公钥下载" align="center" prop="busPlatformNo">
              <template scope="scope">
                <el-button :disabled="downloadAbled(scope.row.busPublicKeyUriTest)" type="text"
                           @click="downloadEntryFile(scope.row.busPublicKeyUriTest)"
                           v-show="scope.row.busPublicKeyUriTest"> test环境
                </el-button>
                <el-button :disabled="downloadAbled(scope.row.busPublicKeyUriPrd)" type="text"
                           @click="downloadEntryFile(scope.row.busPublicKeyUriPrd)"
                           v-show="scope.row.busPublicKeyUriPrd">prd环境
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="180">
              <template scope="scope">
                <el-button size="small" icon="document" type="primary" class="img-button" @click="toChannelUI(scope.row)">渠道
                </el-button>
                <el-button size="small" type="danger" icon="delete" class="img-button" @click="deleteConfirm(scope.$index, scope.row)">删除</el-button>
                <el-button size="small" type="warning" icon="warning" class="img-button" @click="disableConfirm(scope.$index, scope.row)" v-if="scope.row.merchantStatus === '1'">禁用</el-button>
                <el-button size="small" type="info" icon="circle-check" class="img-button" @click="disableConfirm(scope.$index, scope.row)" v-if="scope.row.merchantStatus === '2'">恢复使用</el-button>
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

    <el-dialog title="提示" :visible.sync="dialogDisableVisible" size="tiny">
      <span>确定禁用或者恢复禁用吗？操作将导致该商户下的渠道状态发生变化！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDisableVisible = false">取 消</el-button>
        <el-button type="primary" @click="disableOrEnableMerchant">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogDeleteVisible" size="tiny">
      <span>确定删除所选商户吗？操作将导致该商户下的渠道也会进行删除！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteMerchant">确 定</el-button>
      </span>
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
        searchQuery: {
          busPlatformName: '',
          busPlatformNo: '',
          merchantName: '',
          merchantNo: ''
        },
        platformName: '',
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
        dialogDisableVisible: false,
        dialogDeleteVisible: false,
        disableId: 0,
        merchantStatus: '',  // 待操作更新的状态
        deleteId: 0
      }
    },
    computed: {
      pageSizes() {
        return [1 * common.PAGE_SIZE, 2 * common.PAGE_SIZE, 3 * common.PAGE_SIZE, 4 * common.PAGE_SIZE]
        // return [1 * this.customPageSize, 2 * this.customPageSize, 3 * this.customPageSize, 4 * this.customPageSize]
      }
    },
    created() {
      this.platformName = this.$route.params.platformName
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
        Vue.axios.post('/merchant/queryPagedData', {
          'platformNo': this.$route.params.platformNo,
          'busPlatformName': this.searchQuery.busPlatformName,
          'busPlatformNo': this.searchQuery.busPlatformNo,
          'merchantName': this.searchQuery.busPlatformNo,
          'merchantNo': this.searchQuery.busPlatformNo,
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
      toChannelUI(row) {
        var platformNo = row.platformNo
        var merchantNo = row.merchantNo
        var merchantName = row.merchantName
        this.$router.push({path: '/admin/channel/list/' + platformNo + '/' + merchantNo + '/' + merchantName})
      },
      // 删除平台确认
      disableConfirm(index, row) {
        this.dialogDisableVisible = true
        this.disableId = row.id
        this.merchantStatus = row.merchantStatus
      },
      // 禁用商户
      disableOrEnableMerchant() {
        if (this.disableId === 0) {
          this.$notify.error({title: '操作失败', message: '请先选择要禁用的商户！', duration: 6000})
        }
        Vue.axios.post('/merchant/disableOrEnable', {
          'platformNo': this.$route.params.platformNo,
          'merchantStatus': this.merchantStatus,
          'id': this.disableId,
          'pageBean': {
            'pageSize': this.pageBean.pageSize,
            'currentPage': this.pageBean.currentPage
          }
        })
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.pageBean = response.data.dataWraps['pageBean'].data
              this.$notify({title: '操作提示', message: '禁用成功！', type: 'success', duration: 6000})
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '错误', message: '查询失败！', duration: 6000})
          })
        this.dialogDisableVisible = false
      },
      deleteConfirm(index, row) {
        this.dialogDeleteVisible = true
        this.deleteId = row.id
      },
      deleteMerchant() {
        if (this.deleteId === 0) {
          this.$notify.error({title: '操作失败', message: '请先选择要删除的商户！', duration: 6000})
        }
        Vue.axios.post('/merchant/delete', {
          'platformNo': this.$route.params.platformNo,
          'id': this.deleteId,
          'pageBean': {
            'pageSize': this.pageBean.pageSize,
            'currentPage': this.pageBean.currentPage
          }
        })
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.pageBean = response.data.dataWraps['pageBean'].data
              this.$notify({title: '操作提示', message: '删除成功！', type: 'success', duration: 6000})
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '错误', message: '查询失败！', duration: 6000})
          })
        this.dialogDeleteVisible = false
      },
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
      downloadAbled(url) {
        if (typeof (url) === 'undefined' || url === null || url === '') {
          return true
        }
        return false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

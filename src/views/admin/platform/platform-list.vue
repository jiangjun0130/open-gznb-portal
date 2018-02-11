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
            <div style="margin: 15px"></div>
            <el-form :inline="true" :model="platform" class="demo-form-inline">
              <el-form-item label="平台名称:">
                <el-input v-model="searchName" placeholder="请输入平台名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="queryPagedData" icon="search">查询</el-button>
                <el-button type="primary" @click="editPlatform" icon="plus">添加</el-button>
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
            <el-table-column label="平台名称" width="150" align="center" prop="platformName">
              <template scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p style="line-height: 28px" v-show="scope.row.prdUrl"><el-tag type='success'>PRD环境地址: </el-tag> {{ scope.row.prdUrl }}</p>
                  <p style="line-height: 28px" v-show="scope.row.preUrl"><el-tag type='primary'>PRE环境地址: </el-tag> {{ scope.row.preUrl }}</p>
                  <p style="line-height: 28px" v-show="scope.row.testUrl"><el-tag type='gray'>TEST环境地址: </el-tag> {{ scope.row.testUrl }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag>{{ scope.row.platformName }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="平台编号" width="200" align="center" prop="platformNo">
            </el-table-column>
            <el-table-column label="加密类型" width="120" align="center" prop="encryptTypeName"></el-table-column>
            <el-table-column label="平台状态" width="120" align="center" prop="platformStatusName">
              <template scope="scope">
<!--
                <el-tag type="scope.row.platformStatus == '1'? success:danger">{{scope.row.platformStatusName}}</el-tag>
-->
                <el-tag type="success" v-if="scope.row.platformStatus == 1">
                  {{scope.row.platformStatusName}}
                </el-tag>
                <el-tag type="danger" v-if="scope.row.platformStatus == 2">
                  {{scope.row.platformStatusName}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="平台图片" width="200" align="center">
              <template scope="scope">
                <img :src="scope.row.platformImage"  class="img-thumbnail"/>
              </template>
            </el-table-column>
<!--
            <el-table-column label="平台描述" width="200" align="center" prop="description"></el-table-column>
-->
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <el-button size="small" icon="dictionaries" type="primary" class="el-icon-date" @click="toDataDictionaryUI(scope.row)">数据字典</el-button>
                <el-button size="small" icon="edit" type="primary" class="img-button" @click="editPlatform(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" icon="menu" type="primary" class="img-button" @click="toModuleUI(scope.row)">模块</el-button>
                <el-button size="small" icon="setting" type="primary" class="img-button" @click="toMerchantUI(scope.row)">商户</el-button>
<!--
                <el-button size="small" icon="document" type="primary" class="img-button" @click="toApiUI(scope.row)">接口</el-button>
-->
                <el-button size="small" type="danger" icon="delete" class="img-button" @click="deleteConfirm(scope.$index, scope.row)">删除</el-button>
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

    <el-dialog title="平台信息" :visible.sync="dialogFormVisible" @close="onClosePlatform()">
      <el-form :model="platform" :rules="rules" ref="platform" label-width="100px" class="demo-ruleForm">
        <el-form-item label="平台名称" prop="platformName">
          <el-input v-model="platform.platformName" placeholder="请输入平台名称" @change="platformChange"></el-input>
        </el-form-item>
        <el-form-item label="平台编号" prop="platformNo" v-show="false">
          <el-input v-model="platform.platformNo"></el-input>
        </el-form-item>
        <el-form-item label="加密类型" prop="optionValue">
          <el-select v-model="optionValue" placeholder="请选择加密类型" @change="optionChange">
            <el-option v-for="option in encryptOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平台状态" prop="platformStatus">
          <el-select v-model="statusValue" placeholder="请选择平台状态" @change="statusChange">
            <el-option v-for="option in statusOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平台封面">
          <img :src="platform.platformImage"  class="img-thumbnail" v-show="platform.platformImage"/>
          <el-upload name="pic" ref="uploadPic"
                     action="/api/upload/uploadPic"
                     list-type="picture-card"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="uploadImgRemove"
                     :before-upload="uploadImgBefore"
                     :on-success="uploadImgSuccess"
                     :on-error="uploadImgError">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="平台描述" prop="description">
          <el-input v-model="platform.description" placeholder="请输入描述信息" type="textarea" autosize=""></el-input>
        </el-form-item>
        <el-form-item label="平台负责人" prop="platformManager"
                      :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                   { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]">
          <el-input v-model="platform.platformManager" placeholder="请输入平台负责人邮箱"></el-input>
        </el-form-item>
        <el-form-item label="TEST环境地址" prop="testUrl">
          <el-input v-model="platform.testUrl" placeholder="请输入地址">
      <!--      <template slot="prepend">http://</template> -->
          </el-input>
        </el-form-item>
        <el-form-item label="PRE环境地址" prop="preUrl">
          <el-input v-model="platform.preUrl" placeholder="请输入地址">
<!--            <template slot="prepend">http://</template> -->
          </el-input>
        </el-form-item>
        <el-form-item label="PRD环境地址" prop="prdUrl">
          <el-input v-model="platform.prdUrl" placeholder="请输入地址">
           <!-- <template slot="prepend">http://</template> -->
          </el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="note">
          <el-input class="text" type="textarea" :rows="6" v-model="platform.note" placeholder="请输入备注信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savePlatform('platform')">保存</el-button>
          <el-button @click="resetForm('platform')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogDeleteVisible" size="tiny">
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogDeleteVisible = false">取 消</el-button>
    <el-button type="primary" @click="deletePlatform">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import ElRow from 'element-ui/packages/row/src/row'
  import Vue from 'vue'
  import common from '../../../common/js/common'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElTag from '../../../../node_modules/element-ui/packages/tag/src/tag'
  import ElPopover from '../../../../node_modules/element-ui/packages/popover/src/main'
  import MircoNavi from '../../../components/micro-navi/micro-navi'

  export default {
    components: {
      ElTag,
      ElCol,
      ElRow,
      ElPopover,
      'v-micro-navi': MircoNavi
    },
    data() {
      const baseSize = 3
      return {
        currentUser: common.getCookie('CUSERNAME'),
        editFlag: false,
        platform: {
          id: 0,
          platformName: '',
          platformStatus: '',
          encryptType: '',
          platformImage: '',
          description: '',
          testUrl: '',
          preUrl: '',
          prdUrl: '',
          note: '',
          platformManager: ''
        },
        encryptOptions: [{
          value: '1',
          label: 'RSA加密'
        }, {
          value: '2',
          label: 'AES加密'
        }, {
          value: '3',
          label: 'MD5加密'
        }],
        optionValue: '',
        searchName: '',
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
        dialogImageUrl: '',
        dialogFormVisible: false,
        dialogVisible: false,
        dialogImgVisible: false,
        statusValue: '',
        dialogDeleteVisible: false,
        deleteId: 0,
        statusOptions: [{
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '禁用'
        }],
        rules: {
          platformName: [
            {required: true, message: '请输入平台名称', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur'}
          ],
          encryptType: [
            {required: true, message: '请选择加密类型', trigger: 'change'}
          ],
          platformStatus: [
            {required: true, message: '请选择状态', trigger: 'blur'}
          ],
          /* platformImage: [
           { required: true, message: '请选择平台封面图片', trigger: 'change' }
           ], */
          description: [
            {required: true, message: '请输入平台简介', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      pageSizes() {
        // return [1 * common.PAGE_SIZE, 2 * common.PAGE_SIZE, 3 * common.PAGE_SIZE, 4 * common.PAGE_SIZE]
        return [1 * this.customPageSize, 2 * this.customPageSize, 3 * this.customPageSize, 4 * this.customPageSize]
      },
      isAdmin() { // 判断是不是超级管理员，如果是超级管理员则列表查询所有平台，否则根据登陆者姓名查询
        return this.$store.getters.isSAdmin
      },
      platformList() {
        return this.platform
      }
    },
    created() {
      this.queryPagedData()
    },
    methods: {
      onClosePlatform() {
        // this.platform.platformImage = ''
        this.$refs.uploadPic.clearFiles()
        this.queryPagedData()
      },
      // 转向系统模块页面
      toModuleUI(row) {
        var platformId = row.id
        this.$router.push({path: '/admin/module/' + platformId})
      },
      toApiUI(row) {
        var platformId = row.id
        this.$router.push({path: '/admin/api/' + platformId})
      },
      toMerchantUI(row) {
        var platformNo = row.platformNo
        var platformName = row.platformName
        this.$router.push({path: '/admin/merchant/list/' + platformNo + '/' + platformName})
      },
      // 加密类型变化监听
      optionChange() {
        this.platform.encryptType = this.optionValue
      },
      // 状态变化监听
      statusChange() {
        this.platform.platformStatus = this.statusValue
      },
      // 平台名称变化监听
      platformChange() {
        console.log(this.platform.platformName)
      },
      // 上传图片失败回调
      uploadImgError(err, file, fileList) {
        console.log('upload error!')
        console.log(err, file, fileList)
      },
      // 上传图片成功回调
      uploadImgSuccess(response, file) {
        this.platform.platformImage = response.url
      },
      // 上传图片列表移除回调
      uploadImgRemove(file, fileList) {
        console.log('upload remove!')
        console.log(file, fileList)
      },
      // 上传图片之前检查函数
      uploadImgBefore(file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isPNG && !isJPG) {
          this.$message.error('上传图片只能 PNG 和 JPG 格式！')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isPNG || isJPG && isLt2M
      },
      handlePictureCardPreview(file) {
        console.log('upload handlePictureCardPreview!')
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleSizeChange(val) {
        this.pageBean.pageSize = val
        this.queryPagedData()
      },
      handleCurrentChange(val) {
        this.pageBean.currentPage = val
        this.queryPagedData()
      },
      // 查看平台数据字典信息
      toDataDictionaryUI(row) {
        var platformId = row.id
        this.$router.push({path: '/admin/dicList/' + platformId})
      },
      // 编辑平台信息
      editPlatform(index, row) {
        this.platform = {}
        if (row != null) {
          // update
          this.platform = row
          this.optionValue = row.encryptType
          this.statusValue = row.platformStatus
          this.platform.platformImage = row.platformImage
          this.editFlag = true
        } else {
          this.optionValue = ''
          this.statusValue = ''
        }
        this.dialogFormVisible = true
      },
      // 删除平台确认
      deleteConfirm(index, row) {
        this.dialogDeleteVisible = true
        this.deleteId = row.id
      },
      // 删除平台
      deletePlatform() {
        Vue.axios.post('systemPlatform/delete/', {
          'platformId': this.deleteId,
          'pageBean': {
            'pageSize': this.pageBean.pageSize,
            'currentPage': this.pageBean.currentPage
          }
        })
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              // this.pageBean = response.data.dataWraps['pageBean'].data
              this.$notify({title: '删除成功', message: responseData.message, type: 'success', duration: 6000})
              this.queryPagedData()
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '删除失败', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '异常', message: '操作失败！', duration: 6000})
          })
        this.dialogDeleteVisible = false
      },
      // 查询系统平台列表
      queryPagedData() {
        // 查询分页数据
       // 修改每页显示数据
        Vue.axios.post('/systemPlatform/queryPagedData', {
          'platformName': this.searchName,
          'createUser': this.isAdmin ? null : this.currentUser,
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
      savePlatform(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.axios.post('systemPlatform/save', {
              'platformId': this.platform.id,
              'platformNo': this.platform.platformNo,
              'platformName': this.platform.platformName,
              'encryptType': this.platform.encryptType,
              'status': this.platform.platformStatus,
              'imageUrl': this.platform.platformImage,
              'description': this.platform.description,
              'testEnvUrl': this.platform.testUrl,
              'preEnvUrl': this.platform.preUrl,
              'prdEnvUrl': this.platform.prdUrl,
              'note': this.platform.note,
              'platformManager': this.platform.platformManager,
              'createUser': this.currentUser,
              'pageBean': {
                'pageSize': this.pageBean.pageSize,
                'currentPage': this.pageBean.currentPage
              }
            })
              .then((response) => {
                var responseData = response.data
                if (responseData.flag === common.EXECUTE_OK) {
                  // this.pageBean = responseData.dataWraps['pageBean'].data
                  this.$notify({
                    title: '成功',
                    message: responseData.message,
                    type: 'success',
                    duration: 6000,
                    offset: 100
                  })
                  this.queryPagedData()
                } else if (responseData.flag === common.EXECUTE_LOGIN) {
                  window.location.href = responseData.message
                } else {
                  this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
                }
              })
              .catch(function (response) {
                this.$notify.error({title: '错误', message: '保存失败！', duration: 6000, offset: 100})
              })
            // 关闭对话框
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

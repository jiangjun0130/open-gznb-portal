<template>
  <div>
    <el-row>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-transparent open-block">
          <div class="block-content edit-form">
            <div class="block-title">
              <h3>字典信息</h3>
            </div>
            <el-tabs type="border-card">
              <el-tab-pane label="基本信息">
                <span slot="label"><i class="el-icon-date"></i> 基本信息</span>
                <el-form :model="dicdata" ref="dicForm" label-width="150px" class="">
                  <el-form-item label="目录类型" prop="catalogType">
                    <el-input class="text" v-model="dicdata.catalogType" placeholder="请输入目录类型"></el-input>
                  </el-form-item>
                  <el-form-item label="目录名称" prop="catalogName">
                    <el-input class="text" v-model="dicdata.catalogName" placeholder="请输入目录名称"></el-input>
                  </el-form-item>

                  <el-form-item label="目录说明" prop="catalogDesc">
                    <el-input class="text" v-model="dicdata.catalogDesc" placeholder="请输入目录说明"></el-input>
                  </el-form-item>
                  <el-form-item label="目录状态" prop="catalogStatus">
                    <el-select v-model="dicdata.catalogStatus" placeholder="请选择目录状态">
                      <el-option v-for="option in statusOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="备注信息" prop="note">
                    <el-input class="text" v-model="dicdata.note" placeholder="请输入备注信息">
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="saveDicData('dicForm')" icon="circle-check">保存基本信息
                    </el-button>
                    <el-button type="primary" @click="goBack" icon="arrow-left">返回</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="数据字典值信息" border style="width: 100%">
                <el-table :data="reqParamList" border style="width: 100%">
                  <el-table-column label="字典名称名称" align="center" prop="dicName"></el-table-column>
                  <el-table-column label="字典值" align="center" prop="dicValue"></el-table-column>
                  <el-table-column label="字典状态" align="center" prop="dicStatus">
                    <template scope="scope">
                      <el-tag type="success" v-if="scope.row.dicStatus == 1">正常</el-tag>
                      <el-tag type="danger" v-if="scope.row.dicStatus == 2">禁用</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" fixed="right">
                    <template scope="scope">
                      <el-button size="small" icon="edit" type="primary" class="img-button" @click="editParam(scope.$index, scope.row)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="系统平台业务字典">
                <span slot="label"><i class="el-icon-view"></i> 系统平台业务字典</span>
                <el-col :span="24">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span style="line-height: 36px;">系统平台业务字典编辑</span>
                      <el-button style="float: right" type="primary"
                                 @click="saveParamSample()" icon="circle-check"
                                 v-show="paramDicData.params.length > 0">保存
                      </el-button>
                    </div>
                    <el-form ref="paramDicData" :model="paramDicData" :rules="rules" label-width="100px"
                             class="demo-dynamic">
                      <el-form-item v-for="(param, index) in paramDicData.params" label="参数对" :key="param.key"
                                    :prop="'params.' + index + '.value'">
                        <el-col :span="5">
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="5">
                          <el-input v-model="param.dicName" placeholder="请输入字典名称" prop="dicName"></el-input>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="5">
                          <el-input v-model="param.dicValue" placeholder="请输入字典值" prop="dicName"></el-input>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="5">
                          <el-select v-model="param.dicStatus" placeholder="请选择字典状态" >
                            <el-option v-for="option in statusOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
                          </el-select>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="5" >
                          <el-button @click.prevent="removeParam(param)">删除</el-button  >
                        </el-col>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" icon="plus" @click="addParam">添加字典值</el-button>
                      </el-form-item>
                    </el-form>
                  </el-card>
                </el-col>
              </el-tab-pane>
            </el-tabs>

          </div>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
    </el-row>
    <el-dialog title="数据字典值信息" :visible.sync="dialogFormVisible">
      <el-form :model="dicParamData" :rules="rules" ref="dicParam" label-width="100px" class="demo-ruleForm">
        <el-form-item label="字典名称" prop="dicName">
          <el-input v-model="dicParamData.dicName" placeholder="请输入字典名称" ></el-input>
        </el-form-item>
        <el-form-item label="字典值" prop="dicValue">
          <el-input v-model="dicParamData.dicValue" placeholder="请输入字典值" ></el-input>
        </el-form-item>
        <el-form-item label="字典状态" prop="dicStatus">
          <el-select v-model="dicParamData.dicStatus" placeholder="请选择字典状态">
            <el-option v-for="option in statusOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveDicParamData('dicParam')">保存</el-button>
          <el-button @click="resetData('dicParam')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  import common from '../../../common/js/common'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElTag from 'element-ui/packages/tag/src/tag'
  import ElPopover from 'element-ui/packages/popover/src/main'
  import ElFormItem from 'element-ui/packages/form/src/form-item'
  import ElInput from 'element-ui/packages/input/src/input'
  import ElOptionGroup from 'element-ui/packages/select/src/option-group'
  import ElOption from 'element-ui/packages/select/src/option'

  export default {
    components: {
      ElOption,
      ElOptionGroup,
      ElInput,
      ElFormItem,
      ElTag,
      ElCol,
      ElRow,
      ElPopover
    },
    data() {
      return {
        optFlag: '',  // 标识是insert还是update
        platformId: 0,
        dicdata: {
          id: 0,  // 标识字典目录类型id
          platformName: '',
          catalogType: '',
          catalogName: '',
          catalogDesc: '',
          catalogStatus: '1',
          description: '',
          note: '',
          dicName: '',
          dicValue: '',
          dicStatus: ''
        },
        statusValue: '',
        reqParamList: [],  // 请求参数列表
        dialogFormVisible: false,
        // 响应参数示例
        dicParamData: {
          id: 0,
          dicName: 0,
          dicValue: '',
          dicStatus: '',
          userName: ''
        },
        statusOptions: [{
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '禁用'
        }],
        // 请求参数示例表单model
        paramDicData: {
          params: [
            {
              dicName: null,
              dicValue: null,
              dicStatus: '1'
            }
          ]
        },
        rules: {
          dicName: [
            {required: true, message: '请输入字典名称', trigger: 'blur'}
          ],
          dicValue: [
            {required: true, message: '请输入字典值', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      var platformId = this.dicdata.platformId = this.$route.params.platformId
      var catalogId = this.$route.params.catalogId
      if (catalogId === '' || catalogId === 'undefined') {
        // insert
        this.optFlag = 'insert'
        //  this.initInsertData(platformId)
      } else {
        // update
        this.optFlag = 'update'
        this.dicdata.id = catalogId
        this.initUpdateData(platformId, catalogId)
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      saveDicData(formName) {
        var catalogId = this.$route.params.catalogId
        if (catalogId !== 'undefined') {
          Vue.axios.post('systemPlatformDic/updateCatalog', {
            'platformId': this.$route.params.platformId,
            'id': catalogId,
            'catalogType': this.dicdata.catalogType,
            'catalogName': this.dicdata.catalogName,
            'catalogDesc': this.dicdata.catalogDesc,
            'catalogStatus': this.dicdata.catalogStatus,
            'note': this.dicdata.note,
            'createUser': common.getCookie('CUSERNAME'),
            'updateUser': common.getCookie('CUSERNAME')
          })
            .then((response) => {
              var responseData = response.data
              if (responseData.flag === common.EXECUTE_OK) {
                this.$notify({
                  title: '保存成功',
                  message: responseData.message,
                  type: 'success',
                  duration: 6000,
                  offset: 100
                })
              } else if (responseData.flag === common.EXECUTE_LOGIN) {
                window.location.href = responseData.message
              } else {
                this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
              }
            }).catch(function (response) {
              this.$notify.error({title: '错误', message: '保存失败！', duration: 6000, offset: 100})
            })
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              Vue.axios.post('systemPlatformDic/saveDic', {
                'platformId': this.$route.params.platformId,
                'id': this.dicdata.id,
                'catalogType': this.dicdata.catalogType,
                'catalogName': this.dicdata.catalogName,
                'catalogDesc': this.dicdata.catalogDesc,
                'catalogStatus': this.dicdata.catalogStatus,
                'note': this.dicdata.note,
                'createUser': common.getCookie('CUSERNAME'),
                'updateUser': common.getCookie('CUSERNAME')
              })
                .then((response) => {
                  var responseData = response.data
                  this.dicdata.id = response.data.dataWraps['dicdataId'].data
                  console.log('dicdataId:' + this.dicdata.id)
                  if (responseData.flag === common.EXECUTE_OK) {
                    this.$notify({
                      title: '保存成功',
                      message: responseData.message,
                      type: 'success',
                      duration: 6000,
                      offset: 100
                    })
                  } else if (responseData.flag === common.EXECUTE_LOGIN) {
                    window.location.href = responseData.message
                  } else {
                    this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
                  }
                }).catch(function (response) {
                  this.$notify.error({title: '错误', message: '保存失败！', duration: 6000, offset: 100})
                })
            }
          })
        }
      },
      removeParam(item) {
        console.log(item)
        var index = this.paramDicData.params.indexOf(item)
        if (index !== -1) {
          this.paramDicData.params.splice(index, 1)
        }
      },
      addParam() {
        if (this.dicdata.id === 0) {
          this.$notify.error({title: '操作失败', message: '请先保存数据字典基本信息！', duration: 6000, offset: 100})
          return
        }
        this.statusValue = 0
        this.paramDicData.params.push({dicName: null, dicValue: null, dicStatus: '1', key: Date.now()})
      },
      saveParamSample() {
        for (var i = 0; i < this.paramDicData.params.length; i++) {
          console.log(this.paramDicData.params[i].dicName)
          if (this.paramDicData.params[i].dicName === null || this.paramDicData.params[i].dicValue === null) {
            console.log(this.paramDicData.params[i].dicName)
            this.$notify.error({title: '保存失败', message: '字典名称或字典值不能为空！', duration: 6000, offset: 100})
            return
          }
        }
        console.log(this.paramDicData.params)
        var url = 'systemPlatformDic/save'
        var catalogId = this.$route.params.catalogId
        var dicdataId = ''
        if (catalogId !== 'undefined') {
         // UPDATE
          dicdataId = catalogId
        } else if (this.dicdata.id !== 0 && this.dicdata.id !== undefined) {
              // INSERT
          dicdataId = this.dicdata.id
        } else {
          this.$notify.error({title: '操作失败', message: '请先保存数据字典基本信息！', duration: 6000, offset: 100})
          return
        }
        Vue.axios.post(url, {
          'dicdataId': dicdataId,
          'userName': common.getCookie('CUSERNAME'),
          'dicList': this.paramDicData.params
        })
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.$notify({
                title: '保存成功',
                message: responseData.message,
                type: 'success',
                duration: 6000,
                offset: 100
              })
              var dataList = responseData.dataWraps['dataList'].data
              if (dataList !== undefined && dataList !== null) {
                this.reqParamList = dataList
              }
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '错误', message: '保存失败！', duration: 6000, offset: 100})
          })
      },
      // 初始化更新数据字典信息
      initUpdateData(platformId, catalogId) {
        // 1:查询数据字典基本信息
        Vue.axios.post('systemPlatformDic/getDataBycatalogId/' + catalogId)
            .then((response) => {
              // 1 :查询数据字典基本信息 init data
              console.log('init update step1 result:' + response.data)
              var responseData = response.data
              if (responseData.flag === common.EXECUTE_OK) {
                var data = responseData.dataWraps['data'].data
                if (data !== undefined && data !== null) {
                  this.dicdata = data
                }
              } else if (responseData.flag === common.EXECUTE_LOGIN) {
                window.location.href = responseData.message
              } else {
                this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
              }
              // 2:查询数据字典请求参数列表
              return Vue.axios.post('systemPlatformDic/getDicDataBycatalogId/' + platformId + '/' + catalogId)
            }).then((response) => {
          // step2 查询数据字典请求参数列表 init data
              console.log('init update step2 result:' + response.data)
              var responseData = response.data
              if (responseData.flag === common.EXECUTE_OK) {
                var dataList = responseData.dataWraps['dataList'].data
                if (dataList !== undefined && dataList !== null) {
                  this.reqParamList = dataList
                }
              } else {
                this.$notify.error({title: '错误', message: responseData.message, duration: 6000, offset: 100})
              }
            }).catch(err => {
              console.log(err)
            })
      },
      editParam(index, row) {
        this.dicParamData = {}
        if (row != null) {
          // update
          this.dicParamData = row
          this.dicParamData.id = row.id
          this.dicParamData.dicName = row.dicName
          this.dicParamData.dicValue = row.dicValue
          this.statusValue = row.dicStatus
        } else {
          this.dicParamData.dicName = ''
          this.statusValue = ''
        }
        this.dialogFormVisible = true
      },
      resetData(formName) {
        this.dicParamData.dicName = ''
        this.dicParamData.dicValue = ''
        this.statusValue = ''
      },
      saveDicParamData(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.axios.post('systemPlatformDic/update', {
              'dicdataId': this.dicParamData.id,
              'userName': common.getCookie('CUSERNAME'),
              'dicName': this.dicParamData.dicName,
              'dicValue': this.dicParamData.dicValue,
              'dicStatus': this.dicParamData.dicStatus,
              'catalogId': this.$route.params.catalogId
            })
                .then((response) => {
                  var responseData = response.data
                  if (responseData.flag === common.EXECUTE_OK) {
                    this.$notify({
                      title: '保存成功',
                      message: responseData.message,
                      type: 'success',
                      duration: 6000,
                      offset: 100
                    })
                    this.dialogFormVisible = false
                  } else if (responseData.flag === common.EXECUTE_LOGIN) {
                    window.location.href = responseData.message
                  } else {
                    this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
                  }
                })
                .catch(function (response) {
                  this.$notify.error({title: '错误', message: '保存失败！', duration: 6000, offset: 100})
                })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .sample-item
    line-height 35px
    display block
    padding 5px 0px
    width 100%
    word-wrap break-word
    word-break break-all

  .edit-form
    margin-left 10px
    .text
      width 50%

  .demo-table-expand
    font-size: 0

  .demo-table-expand label
    width: 90px
    color: #99a9bf

  .demo-table-expand .el-form-item
    margin-right: 0
    margin-bottom: 0
    width: 50%

  .clearfix:before,
  .clearfix:after
    display: table
    content: ""

  .clearfix:after
    clear: both

  .box-card
  //width: 720px
    margin-left 5px

  .line
    text-align: center

</style>

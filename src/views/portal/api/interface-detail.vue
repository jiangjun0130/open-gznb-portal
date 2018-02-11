<template>
  <div>
<!--
    <v-platform-guide :platformId="platformId"></v-platform-guide>
-->
    <div class="interface-wrapper">
      <div>
        <div class="interface-wrapper-title">
          <h1>接口信息</h1>
        </div>
        <div class="interface-wrapper-content">
          <el-row>
            <el-col :span="5" :offset="1">
              平台名称
            </el-col>
            <el-col :span="6">
              <el-tag type="gray">{{interface.platformName}}</el-tag>
            </el-col>
            <el-col :span="5" :offset="1">
              接口名称
            </el-col>
            <el-col :span="6">
              <el-tag>{{interface.interfaceName}}</el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="1">
              HTTP请求方式
            </el-col>
            <el-col :span="6">
              <el-tag type="success" v-show="interface.requestMode === '1'">{{interface.requestModeName}}</el-tag>
              <el-tag type="danger" v-show="interface.requestMode === '2'">{{interface.requestModeName}}</el-tag>
            </el-col>
            <el-col :span="5" :offset="1">
              请求参数格式
            </el-col>
            <el-col :span="6">
              <el-tag type="success" v-show="interface.requestParamFormat === '1'">{{interface.paramFormat}}</el-tag>
              <el-tag type="danger" v-show="interface.requestParamFormat === '2'">{{interface.paramFormat}}</el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="1">
              响应数据格式
            </el-col>
            <el-col :span="6">
              <el-tag type="success" v-show="interface.responseParamFormat === '1'">{{interface.responseFormatName}}</el-tag>
              <el-tag type="danger" v-show="interface.responseParamFormat === '2'">{{interface.responseFormatName}}</el-tag>
              <el-tag type="primary" v-show="interface.responseParamFormat === '3'">{{interface.responseFormatName}}</el-tag>
            </el-col>
            <el-col :span="5" :offset="1">
              接口版本号
            </el-col>
            <el-col :span="6">
              {{interface.interfaceVersion}}
            </el-col>
          </el-row>
          <el-row v-show="interface.reqSignRule">
            <el-col :span="5" :offset="1">
              请求签名规则
            </el-col>
            <el-col :span="18">
              <span class="interface-rule sign-info">{{interface.reqSignRule}}</span>
            </el-col>
          </el-row>
          <el-row v-show="interface.reqSignDesc">
            <el-col :span="5" :offset="1">
              请求签名规则说明
            </el-col>
            <el-col :span="18">
              <span class="interface-rule sign-info">{{interface.reqSignDesc}}</span>
            </el-col>
          </el-row>
          <el-row v-show="interface.respSignRule">
            <el-col :span="5" :offset="1">
              响应签名规则
            </el-col>
            <el-col :span="18">
              <span class="interface-rule sign-info">{{interface.respSignRule}}</span>
            </el-col>
          </el-row>
          <el-row v-show="interface.respSignDesc">
            <el-col :span="5" :offset="1">
              响应签名规则说明
            </el-col>
            <el-col :span="18">
              <span class="interface-rule sign-info">{{interface.respSignDesc}}</span>
            </el-col>
          </el-row>
          <el-row v-show="interface.description">
            <el-col :span="5" :offset="1">
              接口描述
            </el-col>
            <el-col :span="18">
              {{interface.description}}
            </el-col>
          </el-row>
          <el-row v-if="interface.note">
            <el-col :span="5" :offset="1">
              接口备注信息
            </el-col>
            <el-col :span="18">
              <div v-html="interface.note" class="div-new-line"></div>
            </el-col>
          </el-row>
          <el-row v-if="interface.platformNote">
            <el-col :span="5" :offset="1">
              平台备注信息
            </el-col>
            <el-col :span="18">
              <div v-html="interface.platformNote" class="div-new-line"></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div>
        <div class="interface-wrapper-title" v-if="showEnvInfo">
          <h1>请求地址</h1>
        </div>
        <div class="interface-wrapper-content" v-show="showEnvInfoTable">
          <el-table :data="envInfo" stripe border style="width: 100%">
            <el-table-column label="环境类型" prop="envName" width="180">
              <template scope="scope">
                <el-tag :type="scope.row.envName === 'PRD' ? 'success' : scope.row.envName === 'PRE' ? 'primary':'gray'" close-transition>
                  {{scope.row.envName}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="地址" prop="envUrl"></el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <div class="interface-wrapper-title">
          <h1>请求参数信息</h1>
        </div>
        <div class="interface-wrapper-content">
          <div v-show="interface.reqParamWrapperType === '1'">
            <el-table :data="reqParamList" border style="width: 100%">
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="描述" v-show="props.row.description">
                      <span>{{ props.row.description }}</span>
                    </el-form-item>
                    <el-form-item label="测试值" v-show="props.row.paramTestValue">
                      <span>{{ props.row.paramTestValue }}</span>
                    </el-form-item>
                    <el-form-item label="备注" v-show="props.row.note">
                      <span>{{ props.row.note }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="名称" align="center" prop="paramName"></el-table-column>
              <el-table-column label="说明" align="center" prop="paramNameCn"></el-table-column>
              <el-table-column label="类型" align="center" prop="paramTypeName"></el-table-column>
              <el-table-column label="是否必须"align="center" prop="requiredName">
                <template scope="scope">
                  <el-tag type="danger" v-if="scope.row.requiredName === '是'">
                    {{scope.row.requiredName}}
                  </el-tag>
                  <el-tag type="primary" v-if="scope.row.requiredName === '否'">
                    {{scope.row.requiredName}}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show="interface.reqParamWrapperType === '2'">
            <div v-for="segment in reqParamListBySegment">
              <el-tag>{{segment.segmentName}}</el-tag>
              <el-table :data="segment.segmentList" border style="width: 100%">
                <el-table-column type="expand">
                  <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="描述" v-show="props.row.description">
                        <span>{{ props.row.description }}</span>
                      </el-form-item>
                      <el-form-item label="测试值" v-show="props.row.paramTestValue">
                        <span>{{ props.row.paramTestValue }}</span>
                      </el-form-item>
                      <el-form-item label="备注" v-show="props.row.note">
                        <span>{{ props.row.note }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="名称" align="center" prop="paramName"></el-table-column>
                <el-table-column label="说明" align="center" prop="paramNameCn"></el-table-column>
                <el-table-column label="类型" align="center" prop="paramTypeName"></el-table-column>
                <el-table-column label="是否必须"align="center" prop="requiredName">
                  <template scope="scope">
                    <el-tag type="danger" v-if="scope.row.requiredName === '是'">
                      {{scope.row.requiredName}}
                    </el-tag>
                    <el-tag type="primary" v-if="scope.row.requiredName === '否'">
                      {{scope.row.requiredName}}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          </div>
      </div>
      <div>
        <div class="interface-wrapper-title">
          <h1>响应参数信息</h1>
        </div>
        <div class="interface-wrapper-content">
          <div v-show="interface.respParamWrapperType === '1'">
            <el-table :data="respParamList" border style="width: 100%">
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="描述" v-show="props.row.description">
                      <span>{{ props.row.description }}</span>
                    </el-form-item>
                    <el-form-item label="备注" v-show="props.row.note">
                      <span>{{ props.row.note }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="名称" align="center" prop="paramName"></el-table-column>
              <el-table-column label="说明" align="center" prop="paramNameCn"></el-table-column>
              <el-table-column label="类型" align="center" prop="paramTypeName"></el-table-column>
            </el-table>
          </div>
          <div v-show="interface.respParamWrapperType === '2'">
            <div v-for="segment in respParamListBySegment">
              <el-tag>{{segment.segmentName}}</el-tag>
              <el-table :data="segment.segmentList" border style="width: 100%">
                <el-table-column type="expand">
                  <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="描述" v-show="props.row.description">
                        <span>{{ props.row.description }}</span>
                      </el-form-item>
                      <el-form-item label="备注" v-show="props.row.note">
                        <span>{{ props.row.note }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="名称" align="center" prop="paramName"></el-table-column>
                <el-table-column label="说明" align="center" prop="paramNameCn"></el-table-column>
                <el-table-column label="类型" align="center" prop="paramTypeName"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="interface-wrapper-title">
          <h1>示例</h1>
        </div>
        <div class="interface-wrapper-content">
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="请求参数示例" name="reqParamSample">
              <span slot="label"><i class="el-icon-view"></i> 请求示例</span>
<!--              <div class="interface-wrapper-sub-content" v-show="reqParamSample.requestSample">
                <el-tag type="" class="sample-tag">参数示例</el-tag>
              </div> -->
              <div id="reqSampleResult" v-html="reqParamSample.requestSample" class="div-new-line"></div>
<!--              <div class="interface-wrapper-sub-content">
                <el-tag type="" class="sample-tag" v-show="reqParamSample.sampleUri">截图示例</el-tag>
              </div> -->
              <img :src="reqParamSample.sampleUri"  class="img-thumbnail" v-show="reqParamSample.sampleUri" style="width:100%;height:100%"/>

            </el-tab-pane>
            <el-tab-pane label="响应参数示例" name="respParamSample">
              <span slot="label"><i class="el-icon-view"></i> 响应参数示例</span>
<!--              <div class="interface-wrapper-sub-content" v-show="respParamSample.responseSample">
                <el-tag type="" class="sample-tag">参数示例</el-tag>
              </div> -->
              <div id="respSampleResult" v-html="respParamSample.responseSample" class="div-new-line"></div>
<!--              <div class="interface-wrapper-sub-content" v-show="respParamSample.sampleUri">
                <el-tag type="" class="sample-tag">截图示例</el-tag>
              </div> -->
              <img :src="respParamSample.sampleUri"  class="img-thumbnail" v-show="respParamSample.sampleUri" style="width:100%;height:100%"/>

            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="interface-wrapper-title" v-if="showDic">
        <h1>数据字典信息</h1>
      </div>
      <div class="interface-wrapper-content">
        <el-row style="width: 100%" :index="dicData.catalogId + ''" v-for="(dicData,index) in dicList" :key="dicData.catalogId">
           <el-col>
             <el-tag type="primary">
               {{dicData.catalogType}}
             </el-tag>
           </el-col>
          <el-col>
            <span v-show="dicData.note" style="color: #8492A6;font-size: 11px">
              {{ dicData.note}}
            </span>
          </el-col>
          <el-col>
            <el-table :data="dicData.systemDicList" style="width: 100%">
              <el-table-column  prop="date" :label="dicData.catalogName" alert="center">
                <template scope="scope">
                  <span style="margin-left: 10px">{{scope.row.dicName}}</span>
                </template></el-table-column>
              <el-table-column  prop="name" :label="dicData.catalogDesc" alert="center" class="content-font">
                <template scope="scope">
                  <span style="margin-left: 10px">{{scope.row.dicValue}}</span>

                </template>
              </el-table-column>
<!--              <el-table-column  prop="address"  label="字典状态" alert="center">
                <template scope="scope">
                  <span style="margin-left: 10px">{{scope.row.dicStatus}}</span>
                </template>
              </el-table-column>-->
            </el-table>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import platformDetail from './platform-detail'
  import Vue from 'vue'
  import common from '../../../common/js/common'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElTag from 'element-ui/packages/tag/src/tag'
  export default {
    components: {
      ElTag,
      ElCol,
      ElRow,
      'v-platform-detail': platformDetail
    },
    data() {
      return {
        showEnvInfo: false,
        showEnvInfoTable: false,
        showDic: false,
        pageBean: common.pageBean,
        platformId: 0,
        interfaceId: 0,
        interface: {},
        reqParamList: [], // 请求参数列表
        dicList: [], // 数据字典请求列表
        systemDicList: [],
        reqParamListBySegment: [],  // 按域划分请求参数列表
        reqParamListRootNames: [],  // 按域划分请求参数根域名
        respParamList: [],
        respParamListBySegment: [],  // 按域划分响应参数列表
        respParamListRootNames: [],  // 按域划分请求参数根域名
        reqParamSample: {},
        respParamSample: {},
        activeName: 'reqParamSample'
      }
    },
    computed: {
      envInfo: function () {
        var env = []
        console.log(this.interface.testUrl !== undefined && this.interface.moduleUrl !== '' && this.interface.interfaceUrl !== '' + 'aaa')
        console.log(this.interface.preUrl !== undefined && this.interface.moduleUrl !== '' && this.interface.interfaceUrl !== '')
        console.log(this.interface.prdUrl !== undefined && this.interface.moduleUrl !== '' && this.interface.interfaceUrl !== '')
        if (this.interface.testUrl !== undefined && this.interface.moduleUrl !== '' && this.interface.interfaceUrl !== '') {
          env.push({envName: 'TEST', envUrl: this.interface.testUrl + '/' + this.interface.moduleUrl + '/' + this.interface.interfaceUrl})
          this.showEnvInfo = true
          this.showEnvInfoTable = true
        }
        if (this.interface.preUrl !== undefined && this.interface.moduleUrl !== '' && this.interface.interfaceUrl !== '') {
          env.push({envName: 'PRE', envUrl: this.interface.preUrl + '/' + this.interface.moduleUrl + '/' + this.interface.interfaceUrl})
          this.showEnvInfo = true
          this.showEnvInfoTable = true
        }
        if (this.interface.prdUrl !== undefined && this.interface.moduleUrl !== '' && this.interface.interfaceUrl !== '') {
          env.push({envName: 'PRD', envUrl: this.interface.prdUrl + '/' + this.interface.moduleUrl + '/' + this.interface.interfaceUrl})
          this.showEnvInfo = true
          this.showEnvInfoTable = true
        }
        return env
      }
    },
    created() {
      this.platformId = this.$route.params.platformId
      this.interfaceId = this.$route.params.interfaceId
      console.log('platformId:' + this.platformId + ';interfaceId:' + this.interfaceId)
      this.initData()
      this.queryPagedData()
    },
    methods: {
      initData() {
        // 1:查询接口基本信息
        Vue.axios.post('systemInterface/getDataById/' + this.interfaceId)
          .then((response) => {
            // todo step1 查询接口基本信息 init data
            console.log('step1 result:' + response.data)
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var data = responseData.dataWraps['data'].data
              if (data !== undefined && data !== null) {
                this.interface = data
              }
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
            // 2:查询接口请求参数列表
            return Vue.axios.post('requestParam/getDataListById/' + this.interface.platformId + '/' + this.interfaceId + '/' + this.$route.params.moduleId)
          }).then((response) => {
          // todo step2 查询接口请求参数列表 init data
            console.log('step2 result:' + response.data)
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var dataList = responseData.dataWraps['dataList'].data
              if (dataList !== undefined && dataList !== null) {
                // 初始化请求参数列表
                this.reqParamList = dataList
                // 如果请求参数包装类型为json复杂类型，则分域显示
                if (this.interface.reqParamWrapperType === '2') {
                  this.syncReqParamList(dataList)
                }
              }
            } else {
              this.$notify.error({title: '错误', message: responseData.message, duration: 6000, offset: 100})
            }
            // 3:：查询接口响应参数列表
            return Vue.axios.post('responseParam/getDataListById/' + this.interface.platformId + '/' + this.interfaceId + '/' + this.$route.params.moduleId)
          }).then((response) => {
            // todo step3 查询接口响应参数列表 init data
            console.log('step3 result:' + response.data)
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var dataList = response.data.dataWraps['dataList'].data
              if (dataList !== undefined && dataList !== null) {
                this.respParamList = dataList
                // 如果响应参数包装类型为json复杂类型，则分域显示
                if (this.interface.respParamWrapperType === '2') {
                  this.syncRespParamList(dataList)
                }
              }
            } else {
              this.$notify.error({title: '错误', message: responseData.message, duration: 6000, offset: 100})
            }
            // 4:查询接口请求参数示例
            return Vue.axios.post('reqParamSample/getDataByInterfaceId/' + this.interfaceId)
          }).then((response) => {
            // todo step4 查询接口请求参数示例 init data
            console.log('step4 result:' + response.data)
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var data = response.data.dataWraps['data'].data
              if ((data !== undefined) && (data !== null)) {
                this.reqParamSample = response.data.dataWraps['data'].data
                if (this.reqParamSample.sampleUri === null) {
                  this.reqParamSample.sampleUri = false
                }
              }
            } else {
              this.$notify.error({title: '错误', message: responseData.message, duration: 6000, offset: 100})
            }
            // 5:查询接口响应参数示例
            return Vue.axios.post('respParamSample/getDataByInterfaceId/' + this.interfaceId)
          }).then(response => {
            // todo step5 查询接口响应参数示例 init data
            console.log('step5 result:' + response.data)
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var data = response.data.dataWraps['data'].data
              if ((data !== undefined) && (data !== null)) {
                this.respParamSample = response.data.dataWraps['data'].data
                if (this.respParamSample.sampleUri === null) {
                  this.respParamSample.sampleUri = false
                }
              }
            } else {
              this.$notify.error({title: '错误', message: responseData.message, duration: 6000, offset: 100})
            }
          }).catch(err => {
            console.log(err)
          })
      },
      syncReqParamList(dataList) {
        // 清空历史值
        this.reqParamListBySegment.splice(0, this.reqParamListBySegment.length)
        var otherList = []
        dataList.forEach(param => {
          if (param.parentId === undefined) {
            // 如果父id为空，则为父节点或者为root、没有子节点、只有值的节点
            if (param.paramType === '4') {
              // 如果为父节点,并且类型为Object，则循环获取其子节点参数
              this.reqParamListRootNames.push(param.paramName)
              var subList = []
              dataList.forEach(subParam => {
                if (subParam.parentId === param.id) {
                  subList.push(subParam)
                }
              })
              this.reqParamListBySegment.push({'segmentName': param.paramName, 'segmentList': subList})
            } else {
              // 如果为root、没有子节点、只有值的节点
              otherList.push(param)
            }
          }
        })
        this.reqParamListBySegment.push({'segmentName': '其他域', 'segmentList': otherList})
        this.reqParamListRootNames.push('其他域')
      },
      syncRespParamList(dataList) {
        // 清空历史值
        this.respParamListBySegment.splice(0, this.respParamListBySegment.length)
        var otherList = []
        dataList.forEach(param => {
          var subList = []
          if (param.parentId === undefined) {
            // 如果父id为空，则为父节点或者为root、没有子节点、只有值的节点
            if (param.paramType === '4') {
              // 如果为父节点,并且类型为Object，则循环获取其子节点参数
              this.respParamListRootNames.push(param.paramName)
              dataList.forEach(subParam => {
                if (subParam.parentId === param.id) {
                  subList.push(subParam)
                }
              })
              this.respParamListBySegment.push({'segmentName': param.paramName, 'segmentList': subList})
            } else {
              // 如果为root、没有子节点、只有值的节点
              otherList.push(param)
            }
          } else {
            // 如果父节点不为空，参数节点类型为2（Branch），并且类型为4（Object）
            if (param.paramType === '4' && param.paramTree === '2') {
              // 如果为父节点,并且类型为Object，则循环获取其子节点参数
              this.respParamListRootNames.push(param.paramName)
              dataList.forEach(subParam => {
                if (subParam.parentId === param.id) {
                  subList.push(subParam)
                }
              })
              this.respParamListBySegment.push({'segmentName': param.parentName + '/' + param.paramName, 'segmentList': subList})
            }
          }
        })
        this.respParamListBySegment.push({'segmentName': '其他域', 'segmentList': otherList})
        this.respParamListRootNames.push('其他域')
      },
      // 查询系统平台数据字典列表
      queryPagedData() {
        // 查询分页数据
        Vue.axios.post('systemPlatform/queryData', {
          'platformId': this.$route.params.platformId,
          'pageBean': {
            'pageSize': this.pageBean.pageSize,
            'currentPage': this.pageBean.currentPage
          }
        })
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.dicList = response.data.dataWraps['recordList'].data
              if (this.dicList[0] !== undefined) {
                this.showDic = true
              }
              console.log(this.dicList + 'aaa')
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '错误', message: '查询数据字典信息失败！', duration: 6000
            })
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .interface-wrapper
    display block
    color #475669
    font-family Microsoft YaHei
    padding-left 5px
    .interface-wrapper-title
      padding-top 25px
      font-size 20px
      font-weight 400
      font-style normal
    .interface-wrapper-content
      padding-top 20px
      line-height 28px
      .interface-rule
        font-size 14px
        font-weight bold
      .interface-wrapper-sub-content
        padding 15px auto
        font-size 16px

  .sample-item
    line-height 35px
    display block
    padding 5px 0px
    width 100%
    word-wrap break-word
    word-break break-all

  .sign-info
    display block
    padding 5px 0px
    width 100%
    word-wrap break-word
    word-break break-all
    white-space pre-wrap

  .sample-tag
    font-weight 400
    font-size 20px

  .demo-table-expand
    font-size: 0

  .demo-table-expand label
    width: 90px
    color: #99a9bf

  .demo-table-expand .el-form-item
    margin-right: 0
    margin-bottom: 0
    width: 100%

</style>

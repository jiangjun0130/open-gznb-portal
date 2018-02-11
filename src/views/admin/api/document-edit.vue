<template>
  <div>
    <el-row>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-transparent open-block">
          <div class="block-content edit-form">
            <el-row>
              <v-micro-navi></v-micro-navi>
            </el-row>
            <el-tabs type="border-card">
              <el-tab-pane label="基本信息">
                <span slot="label"><i class="el-icon-date"></i> 基本信息</span>
                <el-form :rules="interfaceRules" :model="interface" ref="interfaceForm" label-width="150px" class="">
                  <el-form-item label="系统名称">
                    <el-input class="text" v-model="interface.platformName" placeholder="请输入系统名称"
                              :disabled="true"></el-input>
                  </el-form-item>
                  <!--<el-form-item label="模块名称" v-show="optFlag == 'insert'">
&lt;!&ndash;                    <el-select v-model="moduleId" placeholder="请选择模块" @change="moduleChange">
                      <el-option v-for="option in moduleOptions" :key="option.value" :label="option.label"
                                 :value="option.value" :disabled="option.disabled"></el-option>
                    </el-select>&ndash;&gt;
                    <el-input class="text" v-model="interface.moduleName" placeholder="请输入系统名称"
                              :disabled="true"></el-input>
                  </el-form-item>-->
<!--                  <el-form-item label="模块名称" v-show="optFlag == 'edit'">
                    <el-input class="text" v-model="interface.moduleName" placeholder="请输入模块名称"
                              :disabled="true"></el-input>
                  </el-form-item>-->
                  <el-form-item label="接口名称" prop="interfaceName">
                    <el-input class="text" v-model="interface.interfaceName" placeholder="请输入接口名称"></el-input>
                  </el-form-item>
                  <el-form-item label="接口路径" prop="interfaceUrl">
                    <el-input class="text" v-model="interface.interfaceUrl"></el-input>
                  </el-form-item>
                  <el-form-item label="HTTP请求方式" prop="requestMode">
                    <el-select v-model="interface.requestMode" placeholder="请选择HTTP请求方式" @change="">
                      <el-option v-for="option in methodOptions" :key="option.value" :label="option.label"
                                 :value="option.value" :disabled="option.disabled"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="参数提交格式" prop="requestParamFormat">
                    <el-select v-model="interface.requestParamFormat" placeholder="请选择参数提交格式">
                      <el-option v-for="option in reqFormatOptions" :key="option.value" :label="option.label"
                                 :value="option.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="请求参数包装类型" prop="reqParamWrapperType">
                    <el-select v-model="interface.reqParamWrapperType" placeholder="请选择请求包装类型">
                      <el-option v-for="option in paramWrapperOptions" :key="option.value" :label="option.label"
                                 :value="option.value" :disabled="option.disabled"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="响应参数包装类型" prop="respParamWrapperType">
                    <el-select v-model="interface.respParamWrapperType" placeholder="请选择响应包装类型">
                      <el-option v-for="option in paramWrapperOptions" :key="option.value" :label="option.label"
                                 :value="option.value" :disabled="option.disabled"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="响应数据类型" prop="responseParamFormat">
                    <el-select v-model="interface.responseParamFormat" placeholder="请选择响应数据类型" @change="">
                      <el-option v-for="option in respFormatOptions" :key="option.value" :label="option.label"
                                 :value="option.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="接口状态" prop="interfaceStatus">
                    <el-select v-model="interface.interfaceStatus" placeholder="请选择模块状态" @change="">
                      <el-option v-for="option in statusOptions" :key="option.value" :label="option.label"
                                 :value="option.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="版本号" prop="interfaceVersion">
                    <el-input class="text" v-model="interface.interfaceVersion" placeholder="请输入接口版本号"></el-input>
                  </el-form-item>
                  <el-form-item label="请求签名规则" prop="reqSignRule">
                    <el-input class="text" type="textarea" :rows="6" v-model="interface.reqSignRule" placeholder="请输入接口请求签名规则"></el-input>
                  </el-form-item>
                  <el-form-item label="请求签名规则说明" prop="">
                    <el-input class="text" type="textarea" :rows="6" v-model="interface.reqSignDesc" placeholder="请输入接口请求签名规则说明"></el-input>
                  </el-form-item>
                  <el-form-item label="响应签名规则" prop="respSignRule">
                    <el-input class="text" type="textarea" :rows="6" v-model="interface.respSignRule" placeholder="请输入接口响应签名规则"></el-input>
                  </el-form-item>
                  <el-form-item label="响应签名规则说明" prop="">
                    <el-input class="text" type="textarea" :rows="6" v-model="interface.respSignDesc" placeholder="请输入接口响应签名规则说明"></el-input>
                  </el-form-item>
                  <el-form-item label="接口描述" prop="description">
                    <el-input class="text" v-model="interface.description" placeholder="请输入描述信息" type="textarea" :rows="3"></el-input>
                  </el-form-item>
                  <el-form-item label="备注信息">
                    <el-input class="text" v-model="interface.note" placeholder="请输入备注信息">
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="saveInterface('interfaceForm')" icon="circle-check">保存基本信息
                    </el-button>
                    <el-button type="primary" @click="goBack" icon="arrow-left">返回</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="请求参数" v-if="requestParm">
                <span slot="label"><i class="el-icon-upload"></i> 请求参数</span>
                <el-table :data="reqParamList" border style="width: 100%">
                  <el-table-column type="expand">
                    <template scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="节点类型">
                          <span>{{ props.row.treeType }}</span>
                        </el-form-item>
                        <el-form-item label="父节点">
                          <span>{{ props.row.parentName }}</span>
                        </el-form-item>
                        <el-form-item label="测试值">
                          <span>{{ props.row.paramTestValue }}</span>
                        </el-form-item>
                        <el-form-item label="描述">
                          <span>{{ props.row.description }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                          <span>{{ props.row.note }}</span>
                        </el-form-item>

                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="名称" align="center" prop="paramName"></el-table-column>
                  <el-table-column label="说明" align="center" prop="paramNameCn"></el-table-column>
                  <el-table-column label="类型" align="center" prop="paramTypeName"></el-table-column>
                  <el-table-column label="状态" align="center" prop="paramStatus">
                    <template scope="scope">
                      <el-tag type="success" v-if="scope.row.paramStatus == 1">
                        {{scope.row.statusName}}
                      </el-tag>
                      <el-tag type="danger" v-if="scope.row.paramStatus == 2">
                        {{scope.row.statusName}}
                      </el-tag>
                    </template>
                  </el-table-column>
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
                  <el-table-column label="公共参数"align="center" prop="commonFlag">
                    <template scope="scope">
                      <el-tag type="danger" v-if="scope.row.commonFlag === '1'">是</el-tag>
                      <el-tag type="primary" v-if="scope.row.commonFlag === '2'">否</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" fixed="right">
                    <template scope="scope">
                      <el-button size="small" icon="edit" type="primary" class="img-button" @click="editParam('req',scope.$index, scope.row)"></el-button>
                      <el-button size="small" type="danger" icon="delete" class="img-button" @click="deleteParamConfirm('req',scope.$index, scope.row)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button type="primary" @click="editParam('req')" icon="plus" style="margin-top: 5px">添加请求参数</el-button>
              </el-tab-pane>
              <el-tab-pane label="响应参数" v-if="requestParm">
                <span slot="label"><i class="el-icon-upload"></i> 响应参数</span>
                <el-table :data="respParamList" border style="width: 100%">
                  <el-table-column type="expand">
                    <template scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="节点类型">
                          <span>{{ props.row.treeType }}</span>
                        </el-form-item>
                        <el-form-item label="父节点">
                          <span>{{ props.row.parentName }}</span>
                        </el-form-item>
                        <el-form-item label="描述">
                          <span>{{ props.row.description }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                          <span>{{ props.row.note }}</span>
                        </el-form-item>

                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="名称" align="center" prop="paramName"></el-table-column>
                  <el-table-column label="说明" align="center" prop="paramNameCn"></el-table-column>
                  <el-table-column label="类型" align="center" prop="paramTypeName"></el-table-column>
                  <el-table-column label="状态" align="center" prop="paramStatus">
                    <template scope="scope">
                      <el-tag type="success" v-if="scope.row.paramStatus == 1">
                        {{scope.row.statusName}}
                      </el-tag>
                      <el-tag type="danger" v-if="scope.row.paramStatus == 2">
                        {{scope.row.statusName}}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="公共参数"align="center" prop="commonFlag">
                    <template scope="scope">
                      <el-tag type="danger" v-if="scope.row.commonFlag === '1'">是</el-tag>
                      <el-tag type="primary" v-if="scope.row.commonFlag === '2'">否</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" fixed="right">
                    <template scope="scope">
                      <el-button size="small" icon="edit" type="primary" class="img-button" @click="editParam('resp',scope.$index, scope.row)"></el-button>
                      <el-button size="small" type="danger" icon="delete" class="img-button" @click="deleteParamConfirm('resp',scope.$index, scope.row)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button type="primary" @click="editParam('resp')" icon="plus" style="margin-top: 5px">添加响应参数</el-button>
              </el-tab-pane>
              <el-tab-pane label="请求参数示例" name="reqParamSample" v-if="requestParm">
                <span slot="label"><i class="el-icon-view"></i> 请求参数示例</span>
                <el-col :span="24">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span style="line-height: 36px;">请求参数编辑</span>
                      <el-button type="primary" style="float: right;" @click="saveParamSample('paramReqSampleForm', 'req')" icon="circle-check"
                                 v-show="paramReqSampleForm.params.length > 0">保存示例</el-button>
                    </div>
                    <el-form ref="paramReqSampleForm" :model="paramReqSampleForm" label-width="100px" class="demo-dynamic">
                      <div class="editor-container" v-if="reqFlag">
                        <UE :defaultMsg=reqDefaultMsg :config=config :id=ue1 ref="UE1"></UE>
                      </div>
                    </el-form>
                  </el-card>
                </el-col>
              </el-tab-pane>
              <el-tab-pane label="响应参数示例" v-if="requestParm">
                <span slot="label"><i class="el-icon-view"></i> 响应参数示例</span>
                <el-col :span="24">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span style="line-height: 36px;">响应参数编辑</span>
                      <el-button style="float: right" type="primary" @click="saveParamSample('paramRespSampleForm','resp')" icon="circle-check"
                                 v-show="paramRespSampleForm.params.length > 0">保存示例</el-button></div>
                    <el-form ref="paramRespSampleForm" :model="paramRespSampleForm" label-width="100px" class="demo-dynamic">
                      <div class="editor-container" v-if="respFlag">
                        <UE :defaultMsg=respDefaultMsg :config=config :id=ue2 ref="UE2"></UE>
                      </div>
                    </el-form>
                  </el-card>
                </el-col>
                <el-col :span="12">
                </el-col>
              </el-tab-pane>
              <el-tab-pane label="示例图片" v-if="requestParm">
                <span slot="label"><i class="el-icon-picture"></i> 参数示例图片</span>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span style="line-height: 36px;">请求参数示例</span>
                      <el-button style="float: right;" type="primary" icon="circle-check" @click="saveSampleUrl('req')">保存请求示例</el-button>
                    </div>
                    <el-upload name="pic"
                               action="/api/upload/uploadPic"
                               :show-file-list="false"
                               :on-preview="handleReqSamplePictureCardPreview"
                               :on-remove="handleReqSampleRemove"
                               :before-upload="uploadImgBefore"
                               :on-success="uploadReqSampleImgSuccess">
                      <img :src="reqParamSample.sampleUrl"  class="img-thumbnail" v-if="reqParamSample.sampleUrl" style="width:100%;height:100%"/>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
  <!--                  <div :span="12" v-if="showing === true">
                      <img :src="reqParamSample.sampleUrl"  class="img-thumbnail" v-show="reqParamSample.sampleUrl" style="width:100%;height:100%"/>
                    </div>-->
                    <el-dialog v-model="dialogReqSampleVisible" size="tiny">
                      <img width="100%" :src="dialogReqSampleImageUrl" alt="">
                    </el-dialog>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span style="line-height: 36px;">响应参数示例</span>
                      <el-button style="float: right;" type="primary" icon="circle-check" @click="saveSampleUrl('resp')">保存响应示例</el-button>
                    </div>
                    <el-upload name="pic"
                               action="/api/upload/uploadPic"
                               :show-file-list="false"
                               :on-preview="handleRespSamplePictureCardPreview"
                               :on-remove="handleRespSampleRemove"
                               :before-upload="uploadImgBefore"
                               :on-success="uploadRespSampleImgSuccess"
                    >
                      <img :src="respParamSample.sampleUrl" v-if="respParamSample.sampleUrl"
                           class="img-thumbnail" style="width: 100%;height: 100%"/>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
<!--                    <div :span="12" v-if="respShowing === true">
                      <img :src="respParamSample.sampleUrl" v-show="respParamSample.sampleUrl"
                           class="img-thumbnail" style="width: 100%;height: 100%"/>
                    </div>-->
                    <el-dialog v-model="dialogRespSampleVisible" size="tiny">
                      <img width="100%" :src="dialogRespSampleImageUrl" alt="">
                    </el-dialog>
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
    <el-dialog title="参数信息" :visible.sync="dialogReqParamFormVisible">
      <el-form :model="reqParam" :rules="reqParamRules" ref="reqParamForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="参数名称" prop="paramName">
          <el-input v-model="reqParam.paramName" placeholder="请输入参数名称"></el-input>
        </el-form-item>
        <el-form-item label="参数说明" prop="paramNameCn">
          <el-input v-model="reqParam.paramNameCn" placeholder="请输入参数说明"></el-input>
        </el-form-item>
        <el-form-item label="是否必需" prop="required" v-show="paramFlag === 'req'">
          <el-select v-model="reqParamRequired" placeholder="请选择是否必需" @change="reqParamRequiredChange">
            <el-option v-for="option in requiredOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="树节点类型" prop="paramTree" v-show="showTreeType">
          <el-select v-model="treeType" placeholder="请选择参数树节点类型" @change="paramTreeTypeChange">
            <el-option v-for="option in paramTreeTypeOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父节点" prop="paramParentId" v-show="showParentReq && (paramFlag === 'req')">
          <el-select v-model="parentId" placeholder="请选择返回参数树父节点" @change="reqParamParentChange">
            <el-option v-for="option in reqParamParentOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父节点" prop="paramParentId" v-show="showParentResp && (paramFlag === 'resp')">
          <el-select v-model="parentId" placeholder="请选择响应参数树父节点" @change="reqParamParentChange">
            <el-option v-for="option in respParamParentOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数类型" prop="paramType">
          <el-select v-model="reqParamType" placeholder="请选择类型" @change="reqParamTypeChange">
            <el-option v-for="option in reqParamTypeOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数状态" prop="paramStatus">
          <el-select v-model="reqParamStatus" placeholder="请选择状态" @change="reqParamStatusChange">
            <el-option v-for="option in statusOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公共参数">
          <el-switch v-model="commonFlag" on-value="1" off-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="测试值" prop="paramTestValue" v-show="paramFlag === 'req'">
          <el-input v-model="reqParam.paramTestValue" placeholder="请输入测试值"></el-input>
        </el-form-item>
        <el-form-item label="参数描述" prop="description">
          <el-input v-model="reqParam.description" placeholder="请输入描述信息" type="textarea" autosize=""></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="note">
          <el-input v-model="reqParam.note" placeholder="请输入备注信息">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveParam('reqParamForm')">保存</el-button>
          <el-button @click="resetForm('reqParamForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogReqParamDeleteVisible" size="tiny">
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogReqParamDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteReqParam">确 定</el-button>
      </span>
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
  import UE from '../../../components/ue.vue'
  import { Notification } from 'element-ui'
  import MircoNavi from '../../../components/micro-navi/micro-navi'

  export default {
    components: {
      ElOption,
      ElOptionGroup,
      ElInput,
      ElFormItem,
      ElTag,
      ElCol,
      ElRow,
      ElPopover,
      UE,
      'v-micro-navi': MircoNavi
    },
    data() {
      return {
        editFlag: '',
        showTreeTypeReq: '',
        showTreeTypeResp: '',
        uploadreqImgList: [],
        uploadrespImgList: [],
        platformModuleName: '',
        interfaceName: '',
        reqFlag: false,
        respFlag: false,
        requestParm: false,
        reqDefaultMsg: '',
        respDefaultMsg: 'hahahh ',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        ue1: 'ue1', // 不同编辑器必须不同的id
        ue2: 'ue2',
        optFlag: '',  // 标识是insert还是update
        moduleId: '',
        interface: {
          id: 0,
          platformId: 0,
          platformName: '',
          moduleId: 0,
          moduleName: '',
          interfaceName: '',
          interfaceUrl: '',
          interfaceStatus: '',
          interfaceVersion: '',
          reqSignRule: '',
          reqSignDesc: '',
          respSignRule: '',
          respSignDesc: '',
          description: '',
          note: '',
          requestMode: '',
          reqParamWrapperType: '',
          respParamWrapperType: '',
          requestParamFormat: '',
          responseParamFormat: ''
        },
        reqParam: {
          id: 0,
          interfaceId: 0,
          paramName: '',
          paramNameCn: '',
          required: '',
          paramType: '',
          paramStatus: '',
          paramTestValue: '',
          description: '',
          note: '',
          requiredParam: '',
          paramTree: '',
          paramParentId: 0
        },
        commonFlag: '2',  // 默认不是公共参数
        showParentReq: false,
        showParentResp: false,
        showTreeType: false,  // 显示参数信息中树节点类型标识
        showing: true,
        respShowing: true,
        treeType: '',
        reqParamRequired: '',
        reqParamType: '',
        reqParamStatus: '',
        reqParamList: [],  // 请求参数列表
        respParamList: [],  // 响应参数列表
        paramFlag: '',  // 标识是请求参数还是响应参数
        paramSampleFlag: '',  // 标识是请求参数示例还是响应参数示例
        moduleOptions: [],
        methodOptions: [
          {value: '1', label: 'GET'},
          {value: '2', label: 'POST'},
          {value: '3', label: 'PUT', disabled: true},
          {value: '4', label: 'DELETE', disabled: true}
        ],
        methodValue: '',
        reqFormatOptions: [
          {value: '1', label: 'FORM'},
          {value: '2', label: 'JSON'}
        ],
        reqFormatValue: '',
        respFormatOptions: [
          {value: '1', label: 'VOID'},
          {value: '2', label: 'JSON'},
          {value: '3', label: 'STRING'}
        ],
        paramWrapperOptions: [
          {value: '1', label: 'key-value键值对'},
          {value: '2', label: 'json复杂包装类型'}
        ],
        wrapperTypeValue: '',
        respFormatValue: '',
        statusOptions: [{
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '禁用'
        }],
        statusValue: '',
        dialogReqParamFormVisible: false,
        dialogReqParamDeleteVisible: false, // 删除请求参数标识
        deleteId: 0,  // 删除标识
        requiredOptions: [
          {value: '1', label: '是'},
          {value: '0', label: '否'}
        ],
        reqParamTypeOptions: [
          {value: '1', label: 'int'},
          {value: '2', label: 'long'},
          {value: '3', label: 'String'},
          {value: '4', label: 'Object'}
        ],
        paramTreeTypeOptions: [
          {value: '1', label: 'Root'},
          {value: '2', label: 'Branch'},
          {value: '3', label: 'Leaf'}
        ],
        reqParamParentOptions: [],
        respParamParentOptions: [],
        parentId: null,
        interfaceRules: {
          interfaceName: [{required: true, message: '请输入接口名称', trigger: 'blur'}],
/*          interfaceUrl: [{required: true, message: '请输入接口路径', trigger: 'blur'}], */
          requestMode: [{required: true, message: '请选择请求方式', trigger: 'blur'}],
          requestParamFormat: [{required: true, message: '请选择参数提交格式', trigger: 'blur'}],
          reqParamWrapperType: [{required: true, message: '请选择请求参数包装类型', trigger: 'blur'}],
          respParamWrapperType: [{required: true, message: '请选择响应参数包装类型', trigger: 'blur'}],
          responseParamFormat: [{required: true, message: '请选择响应数据类型', trigger: 'blur'}],
          interfaceStatus: [{required: true, message: '请选择状态', trigger: 'blur'}],
          interfaceVersion: [{required: true, message: '请输入接口版本号', trigger: 'blur'}],
          description: [{required: true, message: '请输入描述信息', trigger: 'blur'}]
        },
        reqParamRules: {
          paramName: [{ required: true, message: '请输入参数名称', trigger: 'blur' }],
          paramNameCn: [{ required: true, message: '请输入参数说明', trigger: 'blur' }],
          required: [{ required: true, message: '请选择是否必需', trigger: 'change' }],
          paramType: [{ required: true, message: '请选择类型', trigger: 'change' }],
          paramStatus: [{ required: true, message: '请选择状态', trigger: 'change' }],
          description: [{ required: true, message: '请输入平台简介', trigger: 'blur' }]
        },
        // 请求参数示例表单model
        paramReqSampleForm: {
          params: [
            {
              name: '',
              value: ''
            }
          ]
        },
        paramReqOptions: [],
        paramReqRootNames: [],  // 请求参数根节点列表
        paramRespRootNames: [],  // 响应参数根节点列表
        // 响应参数示例表单model
        paramRespSampleForm: {
          params: [
            {
              name: '',
              value: ''
            }
          ]
        },
        paramRespOptions: [],
        // 请求参数示例
        reqParamSample: {
          id: 0,
          interfaceId: 0,
          requestSample: '',
          sampleUrl: ''
        },
        // 响应参数示例
        respParamSample: {
          id: 0,
          interfaceId: 0,
          responseSample: '',
          sampleUrl: ''
        },
        // upload variable
        dialogReqSampleImageUrl: '',
        dialogRespSampleImageUrl: '',
        dialogReqSampleVisible: false,
        dialogRespSampleVisible: false
      }
    },
    created() {
      var platformId = this.interface.platformId = this.$route.params.platformId
      this.platformId = platformId
      // 只有update才有对应接口标识
      var interfaceId = this.$route.params.interfaceId
      this.interfaceId = interfaceId
      if (interfaceId === '' || interfaceId === 'undefined') {
        // insert
        this.optFlag = 'insert'
        this.initInsertData(platformId)
      } else {
        // update
        this.requestParm = true
        this.optFlag = 'update'
        this.interface.id = interfaceId
        this.initUpdateData(platformId, interfaceId)
      }
    },
    mounted() {
      this.initReqUEEditorData()
      this.initRespUEEditorData()
    },
    methods: {
      initReqUEEditorData () {
          // 如果是添加接口，则不需要初始化ue editor
        if (this.$route.params.interfaceId === 'undefined') {
          this.reqDefaultMsg = '请输入示例参数'
          this.reqFlag = true
          return this.reqDefaultMsg
        }
        Vue.axios.post('reqParamSample/getDataByInterfaceId/' + this.$route.params.interfaceId)
          .then((response) => {
            // step4 查询接口请求参数示例 init data
            console.log('init update step4 result:' + response.data)
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var data = response.data.dataWraps['data'].data
              if ((data !== undefined) && (data !== null)) {
                this.reqParamSample = response.data.dataWraps['data'].data
                this.reqParamSample.sampleUrl = response.data.dataWraps['data'].data.sampleUri
                this.reqDefaultMsg = response.data.dataWraps['data'].data.requestSample
                if ((this.reqDefaultMsg === undefined) || (this.reqDefaultMsg === null) || this.reqDefaultMsg === '') {
                  this.reqDefaultMsg = '请输入示例参数'
                }
                this.reqFlag = true
                return this.reqDefaultMsg
              } else {
                this.reqDefaultMsg = '请输入示例参数'
                this.reqFlag = true
                return this.reqDefaultMsg
              }
            } else {
              this.$notify.error({title: '错误', message: responseData.message, duration: 6000, offset: 100})
            }
          }).catch(function (response) {
            this.$notify.error({title: '异常', message: '操作失败！', duration: 6000})
          })
      },
      initRespUEEditorData () {
        // 如果是添加接口，则不需要初始化ue editor
        if (this.$route.params.interfaceId === 'undefined') {
          this.respDefaultMsg = '请输入示例参数'
          this.respFlag = true
          return this.respDefaultMsg
        }
        Vue.axios.post('respParamSample/getDataByInterfaceId/' + this.$route.params.interfaceId)
          .then(response => {
            console.log('init update step5 result:' + response.data)
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var data = response.data.dataWraps['data'].data
              if ((data !== undefined) && (data !== null)) {
                this.respParamSample = response.data.dataWraps['data'].data
                this.respParamSample.sampleUrl = response.data.dataWraps['data'].data.sampleUri
                this.respDefaultMsg = response.data.dataWraps['data'].data.responseSample
                if ((this.respDefaultMsg === undefined) || (this.respDefaultMsg === null) || this.respDefaultMsg === '') {
                  this.respDefaultMsg = '请输入示例参数'
                }
                this.respFlag = true
                return this.respDefaultMsg
              } else {
                this.respDefaultMsg = '请输入示例参数'
                this.respFlag = true
                return this.respDefaultMsg
              }
            } else {
              this.$notify.error({title: '错误', message: responseData.message, duration: 6000, offset: 100})
            }
          }).catch(err => {
            console.log(err)
          })
      },
      getUEContent() {
        let content = this.$refs.UE.getUEContent()
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        })
        console.log(content)
      },
      goBack() {
        this.$router.back()
      },
      moduleChange() {
        this.interface.moduleId = this.moduleId
      },
      reqParamRequiredChange() {
        this.reqParam.required = this.reqParamRequired
      },
      reqParamTypeChange() {
        this.reqParam.paramType = this.reqParamType
      },
      reqParamParentChange() {
        this.reqParam.paramParentId = this.parentId
      },
      paramTreeTypeChange() {
        this.reqParam.paramTree = this.treeType
        console.log('paramFlag' + this.paramFlag + '....' + 'showTreeTypeReq' + this.showTreeTypeReq + '...' + 'reqParamWrapperType' + this.interface.reqParamWrapperType)
        console.log('paramFlag' + this.paramFlag + '....' + 'showTreeTypeResp' + this.showTreeTypeResp + '...' + 'respParamWrapperType' + this.interface.respParamWrapperType)
        console.log(this.paramFlag === 'req' && this.showTreeTypeReq === 'req' && this.interface.reqParamWrapperType === '2')
        console.log(this.paramFlag === 'resp' && this.showTreeTypeResp === 'resp' && this.interface.respParamWrapperType === '2')
        if (this.paramFlag === 'req' && this.showTreeTypeReq === 'req' && this.interface.reqParamWrapperType === '2') {
          this.showParentReq = (this.treeType !== '1')
        }
        if (this.paramFlag === 'resp' && this.showTreeTypeResp === 'resp' && this.interface.respParamWrapperType === '2') {
          this.showParentResp = (this.treeType !== '1')
        }
      },
      reqParamStatusChange() {
        this.reqParam.paramStatus = this.reqParamStatus
      },
      // 上传图片之前检查函数
      uploadImgBefore(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传图片只能 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      // 初始化新增接口相关信息
      initInsertData(platformId) {
        // 1:查询平台信息
        Vue.axios.post('systemPlatform/getDataById/' + platformId)
          .then((response) => {
            console.log('init insert step1 result:' + response.data)
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var platform = response.data.dataWraps['platform'].data
              this.interface.platformId = platform.id
              this.interface.platformName = platform.platformName
              if (this.$route.params.platformModuleName !== 'undefined') {
                this.interface.moduleName = this.$route.params.platformModuleName
              }
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
            // 2:查询模块列表
            return Vue.axios.post('systemModule/queryDataByPlatformId/' + platformId)
          }).then(response => {
            console.log('init insert step2 result:' + response.data)
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var dataList = response.data.dataWraps['dataList'].data
              dataList.forEach((module) => {
                this.moduleOptions.push({'value': module.id, 'label': module.moduleName})
              })
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
            this.queryReqAndRespParamList(platformId, this.interface.id)
          })
      },
      // 初始化更新接口信息
      initUpdateData(platformId, interfaceId) {
        // 1:查询接口基本信息
        Vue.axios.post('systemInterface/getDataById/' + interfaceId)
          .then((response) => {
            // step1 查询接口基本信息 init data
            console.log('init update step1 result:' + response.data)
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
            return Vue.axios.post('requestParam/getDataListById/' + platformId + '/' + interfaceId + '/' + this.$route.params.moduleId)
          }).then((response) => {
          // step2 查询接口请求参数列表 init data
            console.log('init update step2 result:' + response.data)
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var dataList = responseData.dataWraps['dataList'].data
              if (dataList !== undefined && dataList !== null) {
                // 初始化请求参数列表
                this.reqParamList = dataList
                // 同步请求参数示例中的option
                this.syncReqParamOptions(dataList)
                this.syncReqParamParentOptions(dataList)
              }
            } else {
              this.$notify.error({title: '错误', message: responseData.message, duration: 6000, offset: 100})
            }
            // 3:：查询接口响应参数列表
            return Vue.axios.post('responseParam/getDataListById/' + platformId + '/' + interfaceId + '/' + this.$route.params.moduleId)
          }).then((response) => {
          // step3 查询接口响应参数列表 init data
            console.log('init update step3 result:' + response.data)
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var dataList = response.data.dataWraps['dataList'].data
              if (dataList !== undefined && dataList !== null) {
                this.respParamList = dataList
              // 同步响应参数示例中的option
                this.syncRespParamOptions(dataList)
                this.syncRespParamParentOptions(dataList)
              }
            } else {
              this.$notify.error({title: '错误', message: responseData.message, duration: 6000, offset: 100})
            }
          })
      },
      // 同步请求参数示例tab中的select option选项
      syncReqParamOptions(dataList) {
        // 清空历史值
        this.paramReqOptions.splice(0, this.paramReqOptions.length)
        // 请求参数为key-value对
        if (this.interface.reqParamWrapperType === '1') {
          dataList.forEach((param) => {
            this.paramReqOptions.push({'value': param.paramName, 'label': param.paramName})
          })
        } else {
          // 请求参数为json复杂包装类型
          // 根据接口参数包装类型初始化对应的请求参数示例options
          var otherOptions = []
          dataList.forEach(param => {
            if (param.parentId === undefined) {
              // 如果父id为空，则为父节点或者为root、没有子节点、只有值的节点
              if (param.paramType === '4') {
                // 如果为父节点,并且类型为Object，则循环获取其子节点参数
                this.paramReqRootNames.push(param.paramName)
                var subOptions = []
                dataList.forEach(subParam => {
                  if (subParam.parentId === param.id) {
                    subOptions.push({'label': subParam.paramName, 'value': subParam.paramName + '-' + subParam.parentName})
                  }
                })
                this.paramReqOptions.push({'label': param.paramName, options: subOptions})
              } else {
                // 如果为root、没有子节点、只有值的节点
                otherOptions.push({'label': param.paramName, value: param.paramName + '-' + '其他域'})
              }
            }
          })
          this.paramReqOptions.push({'label': '其他域', options: otherOptions})
          this.paramReqRootNames.push('其他域')
          console.log('paramReqOptions:' + this.paramReqOptions)
        }
      },
      // 同步响应参数示例tab中的select option选项
      syncRespParamOptions(dataList) {
        // 清空历史值
        this.paramRespOptions.splice(0, this.paramRespOptions.length)
        // 根据接口参数包装类型初始化对应的请求参数示例options
        if (this.interface.respParamWrapperType === '1') {
          dataList.forEach((param) => {
            this.paramRespOptions.push({'value': param.paramName, 'label': param.paramName})
          })
        } else {
          // 请求参数为json复杂包装类型
          // 根据接口参数包装类型初始化对应的请求参数示例options
          var otherOptions = []
          dataList.forEach(param => {
            if (param.parentId === undefined) {
              // 如果父id为空，则为父节点或者为root、没有子节点、只有值的节点
              if (param.paramType === '4') {
                // 如果为父节点,并且类型为Object，则循环获取其子节点参数
                this.paramRespRootNames.push(param.paramName)
                var subOptions = []
                dataList.forEach(subParam => {
                  if (subParam.parentId === param.id) {
                    subOptions.push({'label': subParam.paramName, 'value': subParam.paramName + '-' + subParam.parentName})
                  }
                })
                this.paramRespOptions.push({'label': param.paramName, options: subOptions})
              } else {
                // 如果为root、没有子节点、只有值的节点
                otherOptions.push({'label': param.paramName, value: param.paramName + '-' + '其他域'})
              }
            }
          })
          this.paramRespOptions.push({'label': '其他域', options: otherOptions})
          this.paramRespRootNames.push('其他域')
        }
      },
      // 同步请求参数父节点
      syncReqParamParentOptions(dataList) {
        this.reqParamParentOptions.splice(0, this.reqParamParentOptions.length)
        dataList.forEach((param) => {
          if (param.paramTree !== '3') {
            this.reqParamParentOptions.push({'value': param.id, 'label': param.paramName})
          }
        })
      },
      // 同步响应参数父节点
      syncRespParamParentOptions(dataList) {
        this.respParamParentOptions.splice(0, this.respParamParentOptions.length)
        dataList.forEach((param) => {
          if (param.paramTree !== '3') {
            this.respParamParentOptions.push({'value': param.id, 'label': param.paramName})
          }
        })
      },
      // 根据平台标识查询平台信息
      queryPlatformInfoById(platformId) {
        Vue.axios.post('systemPlatform/getDataById/' + platformId)
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var platform = response.data.dataWraps['platform'].data
              this.interface.platformId = platform.id
              this.interface.platformName = platform.platformName
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
      queryModuleInfoByPlatformId(platformId) {
        Vue.axios.post('systemModule/queryDataByPlatformId/' + platformId)
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var dataList = response.data.dataWraps['dataList'].data
              dataList.forEach((module) => {
                this.moduleOptions.push({'value': module.id, 'label': module.moduleName})
              })
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
      // 查询请求和响应参数列表
      queryReqAndRespParamList(platformId, interfaceId) {
        Vue.axios.post('requestParam/getDataListById/' + this.interface.platformId + '/' + this.interface.id + '/' + this.$route.params.moduleId)
          .then(response => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var dataList = responseData.dataWraps['dataList'].data
              if (dataList !== undefined && dataList !== null) {
                // 初始化请求参数列表
                this.reqParamList = dataList
                // 同步请求参数示例中的option
                this.syncReqParamOptions(dataList)
                this.syncReqParamParentOptions(dataList)
              }
            } else {
              this.$notify.error({title: '错误', message: responseData.message, duration: 6000, offset: 100})
            }
            // 查询接口响应公共参数列表
            return Vue.axios.post('responseParam/getDataListById/' + this.interface.platformId + '/' + this.interface.id + '/' + this.$route.params.moduleId)
          }).then(response => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var dataList = response.data.dataWraps['dataList'].data
              if (dataList !== undefined && dataList !== null) {
                this.respParamList = dataList
                // 同步响应参数示例中的option
                this.syncRespParamOptions(dataList)
                this.syncRespParamParentOptions(dataList)
              }
            } else {
              this.$notify.error({title: '错误', message: responseData.message, duration: 6000, offset: 100})
            }
          })
      },
      saveInterface(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.axios.post('systemInterface/save', {
              'platformId': this.interface.platformId,
              'moduleId': this.$route.params.moduleId,
              'interfaceId': this.interface.id,
              'name': this.interface.interfaceName,
              'path': this.interface.interfaceUrl,
              'method': this.interface.requestMode,
              'reqWrapperType': this.interface.reqParamWrapperType,
              'respWrapperType': this.interface.respParamWrapperType,
              'paramFormat': this.interface.requestParamFormat,
              'responseFormat': this.interface.responseParamFormat,
              'status': this.interface.interfaceStatus,
              'description': this.interface.description,
              'note': this.interface.note,
              'version': this.interface.interfaceVersion,
              'reqRule': this.interface.reqSignRule,
              'reqRuleDesc': this.interface.reqSignDesc,
              'respRule': this.interface.respSignRule,
              'respRuleDesc': this.interface.respSignDesc
            })
              .then((response) => {
                var responseData = response.data
                this.interface.id = response.data.dataWraps['interfaceId'].data
                console.log('interfaceId:' + this.interface.id)
                if (responseData.flag === common.EXECUTE_OK) {
                  this.$notify({title: '保存成功', message: responseData.message, type: 'success', duration: 6000, offset: 100})
                  this.requestParm = true
                  this.showParentReq = false
                  this.showParentResp = false
                } else if (responseData.flag === common.EXECUTE_LOGIN) {
                  window.location.href = responseData.message
                } else {
                  // this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
                  this.$notify({title: '系统异常', message: responseData.message, type: 'error', duration: 6000})
                }
                this.queryReqAndRespParamList(this.interface.platformId, this.interface.id)
              }).catch(function (response) {
                // this.$notify.error({title: '错误', message: '保存失败！', duration: 6000, offset: 100})
                // this.$notify({title: '删除成功', message: '保存失败', type: 'success', duration: 6000})
                Notification.error({title: '错误', message: '保存失败', duration: 6000})
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 编辑请求参数
      editParam(flag, index, row) {
        if (this.interface.id === 0) {
          this.$notify.error({title: '操作失败', message: '请先保存接口信息！', duration: 6000, offset: 100})
          return
        }
        this.paramFlag = flag
        this.showTreeTypeReq = flag
        this.showTreeTypeResp = flag
        this.editFlag = flag
        // 根据编辑参数的类型，控制 是否显示 编辑参数页面 树节点类型
        if (flag === 'req') {
          this.showTreeType = this.interface.reqParamWrapperType === '2'
        } else if (flag === 'resp') {
          this.showTreeType = this.interface.respParamWrapperType === '2'
        }
        if (row != null) {
          // udpate
          this.reqParam = row
          // 转换字段
          if (this.reqParam.paramRequired === true) {
            this.reqParamRequired = this.reqParam.required = '1'
          } else if (this.reqParam.paramRequired === false) {
            this.reqParamRequired = this.reqParam.required = '0'
          }
          this.treeType = row.paramTree
          // 显示父节点参数
          if (this.treeType !== '1') {
            this.showParentReq = true
            this.showParentResp = true
            this.parentId = this.reqParam.paramParentId = row.parentId
          }
          this.commonFlag = row.commonFlag
          this.reqParamType = row.paramType
          this.reqParamStatus = row.paramStatus
          if (this.paramFlag === 'resp') {
            // 设置一个默认值，否则表单检查不通过
            this.reqParam.paramRequired = '1'
          }
        } else {
          // insert
          this.reqParam = {}
          // TODO: 重置下拉数据
          this.treeType = ''
          this.reqParam.required = this.reqParamRequired = '1'
          this.reqParamType = ''
          this.reqParam.paramStatus = this.reqParamStatus = '1'
          this.paramParentId = null
          this.parentId = this.reqParam.paramParentId = null
          if (this.interface.reqParamWrapperType === '1') {
            this.reqParam.paramTree = '1'
          }
        }
        if (this.paramFlag === 'resp') {
          // 设置一个默认值，否则表单检查不通过
          this.reqParam.required = '1'
        }
        this.dialogReqParamFormVisible = true
      },
      // 保存请求参数
      saveParam(formName) {
        var url = ''
        if (this.paramFlag === 'req') {
          // 保存请求参数
          url = 'requestParam/save'
        } else if (this.paramFlag === 'resp') {
          url = 'responseParam/save'
        } else {
          this.$notify.error({title: '操作异常', message: '无效的操作标识', duration: 6000})
          return
        }
        if (this.reqParam.paramTree !== '1') {
          if (this.parentId === 0 || this.parentId === null || this.parentId === undefined) {
            alert('请选择父节点参数！' + this.reqParam.paramTree)
            return
          }
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.axios.post(url, {
              'id': this.reqParam.id,
              'moduleId': this.$route.params.moduleId,
              'platformId': this.interface.platformId,
              'interfaceId': this.interface.id,
              'name': this.reqParam.paramName,
              'nameCn': this.reqParam.paramNameCn,
              'commonFlag': this.commonFlag,
              'type': this.reqParam.paramType,
              'required': this.reqParam.required,
              'testValue': this.reqParam.paramTestValue,
              'status': this.reqParam.paramStatus,
              'description': this.reqParam.description,
              'note': this.reqParam.note,
              'treeType': this.reqParam.paramTree,
              'parentId': this.reqParam.paramParentId
            })
              .then((response) => {
                var responseData = response.data
                if (responseData.flag === common.EXECUTE_OK) {
                  var dataList = responseData.dataWraps['dataList'].data
                  if (this.paramFlag === 'req') {
                    // 保存请求参
                    this.reqParamList = dataList
                    // 同步option
                    this.syncReqParamOptions(dataList)
                    if (this.interface.reqParamWrapperType === '2') {
                      this.syncReqParamParentOptions(dataList)
                    }
                  } else if (this.paramFlag === 'resp') {
                    this.respParamList = dataList
                    // 同步opton
                    this.syncRespParamOptions(dataList)
                    if (this.interface.respParamWrapperType === '2') {
                      this.syncRespParamParentOptions(dataList)
                    }
                  }
                  this.$notify({title: '成功', message: responseData.message, type: 'success', duration: 6000, offset: 100})
                  this.showParentReq = false
                  this.showParentResp = false
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
            this.dialogReqParamFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 删除参数确定
      deleteParamConfirm(flag, index, row) {
        this.dialogReqParamDeleteVisible = true
        this.deleteId = row.id
        this.paramFlag = flag
      },
      // 删除请求参数
      deleteReqParam() {
        var interfaceId = 0
        if (this.$route.params.interfaceId !== 'undefined') {
          // alert('qqq' + this.$route.params.interfaceId)
          interfaceId = this.$route.params.interfaceId
        } else {
          interfaceId = this.interface.id
        }
        var url = ''
        if (this.paramFlag === 'req') {
          // 保存请求参
          url = 'requestParam/delete/'
        } else if (this.paramFlag === 'resp') {
          url = 'responseParam/delete/'
        } else {
          this.$notify.error({title: '操作一次', message: '无效的操作标识', duration: 6000})
          return
        }
        url = url + this.$route.params.platformId + '/' + interfaceId + '/' + this.deleteId + '/' + this.$route.params.moduleId
        Vue.axios.post(url)
          .then((response) => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              var dataList = response.data.dataWraps['dataList'].data
              if (this.paramFlag === 'req') {
                // 保存请求参
                this.reqParamList = dataList
              } else if (this.paramFlag === 'resp') {
                this.respParamList = dataList
              }
              this.$notify({title: '删除成功', message: responseData.message, type: 'success', duration: 6000})
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            this.$notify.error({title: '异常', message: '操作失败！', duration: 6000})
          })
        this.dialogReqParamDeleteVisible = false
      },
      // =======================请求参数示例相关方法====================================================
      removeParam(item) {
        var index = this.paramReqSampleForm.params.indexOf(item)
        if (index !== -1) {
          this.paramReqSampleForm.params.splice(index, 1)
        }
      },
      addParam(flag) {
        if (this.interface.id === 0) {
          this.$notify.error({title: '操作失败', message: '请先保存接口信息！', duration: 6000, offset: 100})
          return
        }
        if (flag === 'req') {
          // 请求示例
          this.paramReqSampleForm.params.push({name: '', value: '', key: Date.now()})
        } else if (flag === 'resp') {
          // 响应示例
          this.paramRespSampleForm.params.push({name: '', value: '', key: Date.now()})
        }
      },
      saveParamSample(formName, flag) {
        let content = ''
        if (this.interface.id === 0) {
          this.$notify.error({title: '操作失败', message: '请先保存接口信息！', duration: 6000, offset: 100})
          return
        }
        var url = ''
        var sampleId = 0
        if (flag === 'req') {
          url = 'reqParamSample/save'
          sampleId = this.reqParamSample.id
          content = this.$refs.UE1.getUEContent()
        } else if (flag === 'resp') {
          url = 'respParamSample/save'
          sampleId = this.respParamSample.id
          content = this.$refs.UE2.getUEContent()
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.axios.post(url, {
              'sampleId': sampleId,
              'interfaceId': this.interface.id,
              'sampleContent': content,
              'sampleUrl': ''
            })
              .then((response) => {
                var responseData = response.data
                if (flag === 'req') {
                  this.reqParamSample.id = response.data.dataWraps['sampleId'].data
                } else if (flag === 'resp') {
                  this.respParamSample.id = response.data.dataWraps['sampleId'].data
                }
                if (responseData.flag === common.EXECUTE_OK) {
                  this.$notify({title: '保存成功', message: responseData.message, type: 'success', duration: 6000, offset: 100})
                  this.initUpdateData(this.$route.params.platformId, this.interface.id)
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
      },
      // =======================upload====================================================
      handleReqSampleRemove(file, fileList) {
        console.log(file, fileList)
        this.uploadreqImgList.pop()
        this.showing = false
      },
      handleRespSampleRemove(file, fileList) {
        console.log(file, fileList)
        this.uploadrespImgList.pop()
        this.respShowing = false
      },
      handleReqSamplePictureCardPreview(file) {
        this.dialogReqSampleImageUrl = file.url
        this.dialogReqSampleVisible = true
      },
      handleRespSamplePictureCardPreview(file) {
        this.dialogRespSampleImageUrl = file.url
        this.dialogRespSampleVisible = true
      },
      // 上传图片成功回调
      uploadReqSampleImgSuccess(response, file, fileList) {
        this.reqParamSample.sampleUrl = response.url
        this.uploadreqImgList.push(response.url)
        this.showing = true
        this.dialogReqSampleImageUrl = response.url
      },
      // 上传图片成功回调
      uploadRespSampleImgSuccess(response, file) {
        this.respParamSample.sampleUrl = response.url
        this.dialogReqSampleImageUrl = response.url
      },
      // 保存请求示例图片
      saveSampleUrl(flag) {
        if (this.interface.id === 0) {
          this.$notify.error({title: '操作失败', message: '请先保存接口信息！', duration: 6000, offset: 100})
          return
        }
        var url = ''
        var sampleId = 0
        var imageUrl = ''
        if (flag === 'req') {
          if (this.reqParamSample.id === 0) {
            this.$notify.error({title: '错误', message: '请先保存请求示例参数', duration: 6000, offset: 100})
          }
          if (this.reqParamSample.sampleUrl === undefined || this.reqParamSample.sampleUrl === '') {
            this.$notify.error({title: '错误', message: '请先选择请求参数示例图片', duration: 6000, offset: 100})
            return
          }
          url = 'reqParamSample/save'
          sampleId = this.reqParamSample.id
          imageUrl = this.reqParamSample.sampleUrl
        } else if (flag === 'resp') {
          if (this.respParamSample.id === 0) {
            this.$notify.error({title: '错误', message: '请先保存响应示例参数', duration: 6000, offset: 100})
          }
          if (this.respParamSample.sampleUrl === undefined || this.respParamSample.sampleUrl === '') {
            this.$notify.error({title: '错误', message: '请先选择响应参数示例图片', duration: 6000, offset: 100})
            return
          }
          url = 'respParamSample/save'
          sampleId = this.respParamSample.id
          imageUrl = this.respParamSample.sampleUrl
        }
        Vue.axios.post(url, {
          'sampleId': sampleId,
          'interfaceId': this.interface.id,
          'sampleUrl': imageUrl
        })
          .then((response) => {
            var responseData = response.data
            if (flag === 'req') {
              this.reqParamSample.id = response.data.dataWraps['sampleId'].data
            } else if (flag === 'resp') {
              this.respParamSample.id = response.data.dataWraps['sampleId'].data
            }
            if (responseData.flag === common.EXECUTE_OK) {
              this.$notify({title: '保存成功', message: responseData.message, type: 'success', duration: 6000, offset: 100})
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
          })
          .catch(function (response) {
            // this.$notify.error({title: '错误', message: '保存失败！', duration: 6000, offset: 100})
            Notification.error({title: '错误', message: '保存失败', duration: 6000})
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
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

<template>
  <el-col :span="19" style="padding-left: 10px;">
    <el-row>
      <el-col>
        <div class="grid-content bg-transparent open-block">
          <div class="block-content">
            <div class="block-title">
              <div style="float: left">平台秘钥</div>
              <div style="float: right;">
                <el-button type="primary" size="small" @click="generateEncrypt"><i class="el-icon-menu"> 生成秘钥</i>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row span="24">
      <el-col v-for="(item,index) in encrypts" :key="index" :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;" v-if="item[0].envFlag==='1'">dev环境</span>
            <span style="line-height: 36px;" v-if="item[0].envFlag==='2'">test环境</span>
            <span style="line-height: 36px;" v-if="item[0].envFlag==='3'">pre环境</span>
            <span style="line-height: 36px;" v-if="item[0].envFlag==='4'">prd环境</span>
          </div>
          <el-row v-for="(one,key) in item" :key="index+''+key">
            <el-col v-if="one.encryptType==='1'" :span="12">
              <span>请求秘钥：</span>
              <a>{{one.createTime | dateHandle}}</a>
              <el-form label-width="80px">
                <el-form-item label="公钥">
                  <a class="keyUri" @click="downloadEntryFile(one.publicKeyUri)">{{one.publicKeyUri | spiltKeyName}}</a>
                </el-form-item>
                <el-form-item label="私钥">
                  <a class="keyUri" @click="downloadEntryFile(one.privateKeyUri)">{{one.privateKeyUri | spiltKeyName}}</a>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col v-if="one.encryptType==='2'" :span="12">
              <span>响应秘钥：</span>
              <a>{{one.createTime | dateHandle}}</a>
              <el-form label-width="80px" style="margin-top: 10px;">
                <el-form-item label="公钥">
                  <a class="keyUri" @click="downloadEntryFile(one.publicKeyUri)">{{one.publicKeyUri | spiltKeyName}}</a>
                </el-form-item>
                <el-form-item label="私钥">
                  <a class="keyUri" @click="downloadEntryFile(one.privateKeyUri)">{{one.privateKeyUri | spiltKeyName}}</a>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!--<el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">pre环境</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">test环境</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">dev环境</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>-->
    </el-row>
  </el-col>
</template>

<script>
  import common from '../../../common/js/common'
  import {formatDate} from '../../../common/js/date'
  import axios from 'axios'
  export default {
    data() {
      return {
        encrypts: []
      }
    },
    created: function () {
      this.queryEncrypt()
    },
    methods: {
      generateEncrypt() {
        let self = this
        self.$confirm('警告！生成秘钥会覆盖上一版本秘钥信息，确定进行该操作？')
          .then(_ => {
            axios.get('encrypt/generate')
              .then((response) => {
                let responseData = response.data
                if (responseData.flag === common.EXECUTE_OK) {
                  self.$notify({
                    title: '成功',
                    message: '生成秘钥成功!',
                    type: 'success'
                  })
                  self.queryEncrypt()
                } else if (responseData.flag === common.EXECUTE_LOGIN) {
                  window.location.href = responseData.message
                } else {
                  self.$notify.error({
                    title: '错误',
                    message: '生成秘钥信息错误',
                    duration: 6000
                  })
                }
              })
              .catch(function (response) {
                self.$notify.error({
                  title: '异常',
                  message: '生成秘钥信息异常！',
                  duration: 6000
                })
              })
          })
          .catch(_ => {
          })
      },
      queryEncrypt() {
        let self = this
        axios.get('encrypt')
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              self.encrypts = responseData.dataWraps['encrypts'].data
              console.log(self.encrypts)
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              self.$notify.error({
                title: '错误',
                message: '查询秘钥信息错误',
                duration: 6000
              })
            }
          })
          .catch(function (response) {
            self.$notify.error({
              title: '异常',
              message: '查询秘钥信息异常！',
              duration: 6000
            })
          })
      },
      // 下载证书
      downloadEntryFile(url) {
        let self = this
        if (url === null || url === '') {
          self.message_error('证书路径为空')
        } else if (url.substring(0, 7) === 'http://') {
          window.open(url)
        } else {
          self.message_error('证书路径地址错误，地址：' + url)
        }
      }
    },
    filters: {
      dateHandle(date) {
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:ss')
      },
      spiltKeyName(key) {
        let position = key.lastIndexOf('/')
        let result = key.substring(++position, key.length)
        return result
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }
  .keyUri{
    color: #20A0FF;
    cursor: pointer;
  }

  .keyUri:hover{
    color: #FF4949;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    margin: 10px;
  }
</style>

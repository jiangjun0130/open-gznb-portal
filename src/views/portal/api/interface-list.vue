<template>
  <div class="container">
    <el-row style="">
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :span="22">
        <el-row :router="true">
          <el-col :span="5">
            <el-menu default-active="2" class="el-menu-vertical-demo container">
            <el-submenu :index="module.id + ''" v-for="(module,index) in moduleList" :key="module.id">
                <template slot="title"><i class="el-icon-message" style="margin-right: 15px"></i>{{ module.moduleName }}</template>
              <router-link  v-for="interface in module.interfaceList" :to="'/api/interface/' + module.platformId + '/detail/' + interface.id + '/' + interface.moduleId"
                            :key="interface.id">
                  <el-menu-item :index="module.id + '-' + interface.id + ''"
                                :key="interface.interfaceId">
                    <i class="el-icon-menu" style="margin-right: 15px"></i>{{ interface.interfaceName }}
                  </el-menu-item>
              </router-link>
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col :span="17">
            <router-view :key="$route.path"></router-view>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import common from '../../../common/js/common'
  import ElMenu from '../../../../node_modules/element-ui/packages/menu/src/menu'
  import ElMenuItem from '../../../../node_modules/element-ui/packages/menu/src/menu-item'
  import ElCol from 'element-ui/packages/col/src/col'

  export default {
    components: {
      ElCol,
      ElMenuItem,
      ElMenu
    },
    data() {
      return {
        moduleList: [],
        interfaceList: []
      }
    },
    created() {
      this.queryModuleList()
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      // 查询模块列表及其对应的接口列表信息
      queryModuleList() {
        var platformId = this.$route.params.platformId
        Vue.axios.post('systemModule/queryModuleAndInterfaceListByPlatformId/' + platformId)
          .then(response => {
            var responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.moduleList = response.data.dataWraps['dataList'].data
              console.log(this.moduleList)
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({title: '系统异常', message: responseData.message, duration: 6000})
            }
            this.$router.push('/api/interface/' + this.moduleList[0].platformId + '/detail/' + this.moduleList[0].interfaceList[0].id + '/' + this.moduleList[0].interfaceList[0].moduleId)
          })
          .catch(function (response) {
            console.log(response)
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .container
    min-height 450px
    height 100%
</style>

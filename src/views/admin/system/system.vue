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
              <router-link to="/admin/system/userlist">
                <el-menu-item index="2" ><i class="el-icon-menu"></i>用户管理</el-menu-item>
              </router-link>
              <router-link to="/admin/system/register">
                <el-menu-item index="3" ><i class="el-icon-setting"></i>注册用户审核</el-menu-item>
              </router-link>
              <router-link to="/admin/system/secretkey">
                <el-menu-item index="4" ><i class="el-icon-warning"></i>平台秘钥</el-menu-item>
              </router-link>
            </el-menu>
          </el-col>
          <router-view></router-view>
        </el-row>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-transparent"></div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>

  .container
    min-height 700px
    height 100%

  .el-menu-item.is-active
    color: #20a0ff
    border-right solid 4px #20a0ff

</style>

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
              <router-link to="/api/Apply/myProject">
                <el-menu-item index="2" ><i class="el-icon-menu"></i>我的应用</el-menu-item>
              </router-link>
              <router-link to="/api/Apply/myApply">
                <el-menu-item index="3" ><i class="el-icon-setting"></i>申请记录</el-menu-item>
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

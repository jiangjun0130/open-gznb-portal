<template>
  <el-col :span="19" style="padding-left: 10px;">
    <el-row>
      <el-col>
        <div class="grid-content bg-transparent open-block">
          <div class="block-content">
            <div class="block-title">
              <h3>应用列表</h3>
            </div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="应用名称:">
                <el-input placeholder="请输入应用名称" v-model="searchName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
                <router-link to="/api/apply/createApp">
                  <el-button type="primary" icon="add"><i class="el-icon-plus"></i> 新建应用</el-button>
                </router-link>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="pageBean.recordList"
        border
        style="width: 100%">
        <el-table-column
          label="应用名称">
          <template scope="scope">
            <span style="margin-left: 10px">{{scope.row.platformName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="应用编号">
        <template scope="scope">
          <p>{{scope.row.platformNo}}</p>
        </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          label="创建人">
          <template scope="scope">
            <p>{{ scope.row.createUser }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <router-link :to="{path:'/api/apply/projectInfo',query:{projectId:scope.row.id}}">
              <el-button size="small">详细</el-button>
            </router-link>
            <router-link :to="{path:'/api/apply/createApply',query:{projectId:scope.row.id}}">
              <el-button size="small" type="primary">申请接口</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-col>
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
    </el-row>
  </el-col>
</template>
<script>
  import common from '../../../common/js/common'
  import axios from 'axios'
  export default {
    data() {
      const baseSize = 10
      return {
        currentUser: common.getCookie('CUSERNAME'),
        businessPlatform: {
          id: 0,
          platformNo: '',
          platformName: '',
          platformStatus: '',
          description: '',
          note: '',
          updateTime: '',
          createTime: '',
          create_user: common.getCookie('CUSERNAME'),
          updateUser: common.getCookie('CUSERNAME')
        },
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
        customPageSize: 10,
        searchName: null
      }
    },
    computed: {
      pageSizes() {
        return [1 * this.customPageSize, 2 * this.customPageSize, 3 * this.customPageSize, 4 * this.customPageSize]
      },
      platformList() {
        return this.platform
      }
    },
    created: function () {
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
      onSubmit() {
        this.queryPagedData()
      },
      dateFormat(row, column) {
        return new Date(row.createTime).toLocaleString()
      },
      queryPagedData() {
        let self = this
        axios.post('businessPlatform/queryPagedData', {
          'platformName': self.searchName,
          'createUser': self.currentUser, // TODO 获取登录用户
          'pageBean': {
            'pageSize': self.pageBean.pageSize,
            'currentPage': self.pageBean.currentPage
          }
        })
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              this.pageBean = response.data.dataWraps['pageBean'].data
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              this.$notify.error({
                title: '错误',
                message: '查询失败！',
                duration: 6000
              })
            }
          })
          .catch(function (response) {
            this.$notify.error({
              title: '错误',
              message: '查询失败！',
              duration: 6000
            })
          })
      }
    }
  }
</script>

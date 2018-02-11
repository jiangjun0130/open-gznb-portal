<template>
  <el-col :span="19" style="padding-left: 10px;">
    <el-row>
      <el-col>
        <div class="grid-content bg-transparent open-block" style="border: none">
          <div class="block-content">
            <div class="block-title">
              <h3>申请记录</h3>
            </div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="应用名称:">
                <el-input placeholder="请输入应用名称" v-model="searchName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
                <router-link to="/api/apply/createApp">
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
          label="应用"
          prop="busPlatformName">
        </el-table-column>
        <el-table-column
          label="申请平台"
          prop="platformName">
        </el-table-column>
        <el-table-column
          label="提交日期"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          label="申请人">
          <template scope="scope">
            <span>{{ scope.row.applyUser }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核人">
          <template scope="scope">
            <span>{{ scope.row.auditUser }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="申请状态">
          <template scope="scope">
            <el-tag type="warning" v-if="scope.row.applyStatus == '2'">
              审核中
            </el-tag>
            <el-tag type="success" v-if="scope.row.applyStatus == '3'">
              审核完成
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="审核结果">
          <template scope="scope">
            <el-tag type="success" v-if="scope.row.auditResult == '1'">
              审核通过
            </el-tag>
            <el-tag type="danger" v-if="scope.row.platformStatus == '2'">
              审核未通过
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
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
    </el-row>
  </el-col>
</template>
<script>
  import common from '../../../common/js/common'
  import axios from 'axios'
  import ElSpinner from '../../../../node_modules/element-ui/packages/spinner/src/spinner'
  export default {
    components: {ElSpinner},
    data() {
      return {
        currentUser: common.getCookie('CUSERNAME'),
        busSystemAccess: {
          id: 0,
          platformId: 0,
          busPlatformId: 0,
          busPlatformName: '',
          platformName: '',
          moduleId: 0,
          applyUser: '',
          applyStatus: '', // 申请状态
          auditUser: '', // 审核人
          auditResult: '', // 审核结果
          accessStatus: '',
          updateTime: '',
          createTime: '',
          createUser: '',
          updateUser: ''
        },
        pageBean: common.pageBean,
        customPageSize: 15,
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
        // 查询分页数据
        self.pageBean.pageSize = self.customPageSize // 修改每页显示数据
        axios.post('busSystemApplyRecord/queryPagedData', {
          'platformName': self.searchName,
          'applyUser': self.currentUser, // TODO 获取登录用户
          'pageBean': {
            'pageSize': self.pageBean.pageSize,
            'currentPage': self.pageBean.currentPage
          }
        })
          .then((response) => {
            let responseData = response.data
            if (responseData.flag === common.EXECUTE_OK) {
              self.pageBean = response.data.dataWraps['pageBean'].data
            } else if (responseData.flag === common.EXECUTE_LOGIN) {
              window.location.href = responseData.message
            } else {
              self.$notify.error({
                title: '错误',
                message: '查询失败！',
                duration: 6000
              })
            }
          })
          .catch(function (response) {
            self.$notify.error({
              title: '错误',
              message: '查询失败！',
              duration: 6000
            })
          })
      }
    }
  }
</script>

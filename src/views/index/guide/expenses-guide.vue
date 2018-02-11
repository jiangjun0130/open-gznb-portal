<template>
  <div>
    <el-row class="guide-page">
      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="guide-wrapper">
            <div class="guide-title">
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <div class="guide-wrapper">
            <div class="guide-title">
              <div class="guide-desc">
                <h4 class="size">生活缴费</h4>
                <p class="second-title">接入光大、欧飞缴费平台，让你的应用支持水电煤、话费及加油卡充值缴费</p>
                <el-button style="background-color:#B4BCCC;margin-top: 10px" @click="toCreateAppUI">创建应用</el-button>
              </div>

            </div>
            </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 20px">
      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content process-wrapper">
          <div class="process-item">
            <h3>优势能力</h3>
            <div class="info-list">
              <dl class="info-item">
                <dt>水电煤缴费</dt>
                <dd>通过接入水电煤生活缴费功能，用户可以在应用中方便快捷地进行水（昆明自来水、呈贡清源自来水）、电（云南省电费）、煤气费缴费</dd>
                <!--<dd class="icon-app-account1"></dd>  -->
                <div class="icon-app-account1">
                  <img src="./Group 9.png" width="33px" height="38px"/>
                </div>
              </dl>
              <dl class="info-item">
                <dt>移动、固定话费缴费</dt>
                <dd>通过接入话费缴费功能，用户可以在应用中方便快捷地进行话费缴费</dd>
               <!-- <dd class="icon-app-account2"></dd>  -->
                <div class="icon-app-account2">
                  <img src="./Group 8.png" width="36px" height="36px"/>
                </div>
              </dl>
              <dl class="info-item">
                <dt>加油卡充值</dt>
                <dd>通过接入加油卡充值功能，用户可以在应用中方便快捷地进行加油卡充值</dd>
              <!--  <dd class="icon-app-account3"></dd> -->
                <div class="icon-app-account3">
                  <img src="./Group 7.png" width="36px" height="36px"/>
                </div>
              </dl>
              <dl class="info-item">
                <dt>未来更多能力</dt>
                <dd>未来应用将会开放更多更有价值的接口和能力</dd>
                <div class="icon-app-more">
                  <img src="./Group 13.png" width="36px" height="36px"/>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="9">
        <div class="process-wrapper">
          <div class="process-item">
            <h3>接入流程</h3>
            <el-steps :space="100" direction="vertical" :active="1" style="margin-top: 20px">
              <el-step title="创建应用" description="通过填写应用名称、应用简介，选择将要接入的平台等信息，开发者可以创建应用"></el-step>
              <el-step title="提交审核" description="开发者提交应用创建申请后，X先生将对应用信息进行审核，确保应用质量"></el-step>
              <el-step title="审核通过" description="审核通过后，开发者得到商户、密钥等相关信息，进行相关支付功能的开发"></el-step>
              <el-step title="系统接入" description="得到分配给应用的相关接入信息后，开发者可以通过开发文档进行开发接入"></el-step>
            </el-steps>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'

  export default {
    components: {
      ElCol,
      ElRow},
    methods: {
      toCreateAppUI() {
        this.$router.push({path: '/api/apply/createApp'})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .guide-page
    background transparent url("2.png") repeat-x 0 0

  .guide-wrapper
    width 100%
    height 410px
    .guide-title
      padding-top 50px
      padding-left 50px
      overflow hidden
      display block
      .guide-image
        background url("common.png") 0 -820px no-repeat
        width 286px
        height 286px
        vertical-align middle
        display inline-block
        line-height 500px
        overflow hidden
      .guide-desc
        margin-top 45px
        font-size 60px;
        font-weight 400;
        font-style normal
        .second-title
          font-family: PingFangSC-Regular;
          color: #666666;
          font-size 18px
          padding-left 5px
          line-height 1.6
          display block
          margin-top 20px

  .process-wrapper
    margin-left: auto;
    margin-right: auto;
    line-height 1.6
    .process-item
      font-size: 14px;
      text-align: left;
      text-justify: auto;
      text-align-last: auto;
      display: inline-block;
      vertical-align: top;
      text-align: left;
      h3
        font-size: 18px;
        font-weight: 400;
        font-style: normal;
        display block
      .info-list
        display block
        .info-item
          position: relative;
          margin: 20px 0 38px 56px;
          .icon-app-more
            position: absolute;
            top: 3px;
            left: -56px;
            width: 36px;
            height: 36px;
            vertical-align: middle;
            display: inline-block;
          .icon-app-account1
            position: absolute;
            top: 3px;
            left: -56px;
            width: 33px;
            height: 38px;
            vertical-align: middle;
            display: inline-block;
          .icon-app-account2
            position: absolute;
            top: 3px;
            left: -56px;
            width: 36px;
            height: 36px;
            vertical-align: middle;
            display: inline-block;
          .icon-app-account3
            position: absolute;
            top: 3px;
            left: -56px;
            width: 36px;
            height: 36px;
            vertical-align: middle;
            display: inline-block;
        dl
          display block
        dd
          color #9e9f9f

  .open-step
    margin-left 40px
  .size
    font-size: 40px;
    font-family: "微软雅黑";
    font-weight: 300px
    color: #333333;
    letter-spacing: 0;
    display block
</style>

<template>
  <div>
    <el-row style="margin-bottom: 5px">
      <el-carousel :interval="5000" arrow="always" height="568px">
        <el-carousel-item :key="1" style="height: 100%">
          <div class="introduce-wrapper" style="height: 100%">
            <h2 class="title">国资商城第三方平台 开放接入</h2>
            <p class="desc">
              为国资商城业务系统接入提供更高效方案，提高服务效果
            </p>
            <el-button type="primary" style="background-color:#475669;margin-top: 10px">了解更多</el-button>
            <div class="introduce-background">
              <img src="./background.png" width="100%" height="100%"/>
            </div>
          </div>
        </el-carousel-item>
        <!--<el-carousel-item :key="2">
        </el-carousel-item>-->
      </el-carousel>
      <div class="wrapper-notice">
        <div class="wrapper-inner">
          <div class="notice-box">
            <i class="icon-speacker"></i>
            <ul>
              <li>
                <a target="_blank" href="">国资商城第三方平台 开放接入</a>
                <i class="icon-new"></i>
              </li>
              <li class="extra">
                <a target="_blank" href="">查看更多</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :span="5">
        <div class="desc_box">
          <ul class="">
            <li class="box_item">
              <div class="item-inner">
                <dl>
                  <dt>支付网关</dt>
                  <dd class="item-content">聚合支付SDK，方便快捷的支付接入体验。
                    让你的应用支持智慧生活卡支付、支付宝支付、微信支付</dd>
                  <dd class="read-more">
                    <a href="javascript:;" class="btn" @click="toPayGateGuide">了解更多</a>
                  </dd>
                  <div>
                    <img src="./app_dev0.png" width="64px" height="64px"/>
                  </div>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="desc_box">
          <ul class="">
            <li class="box_item">
              <div class="item-inner">
                <dl>
                  <dt>生活缴费</dt>
                  <dd class="item-content">接入光大、欧飞缴费平台，让你的应用支持水电煤、话费及加油卡充值缴费</dd>
                  <dd class="read-more">
                    <a href="javascript:;" class="btn" @click="toExpensesGuide">了解更多</a>
                  </dd>
         <!--         <dd class="icon_site_desc1 app_dev1"></dd> -->
                  <div>
                    <img src="./app_dev1.png" width="64px" height="64px"/>
                  </div>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="desc_box">
          <ul class="">
            <li class="box_item">
              <div class="item-inner">
                <dl>
                  <dt>短信网关</dt>
                  <dd class="item-content">面向各系统提供统一发送短信平台，支持短信发送结果监控、短信渠道监控</dd>
                  <dd class="read-more">
                    <a href="javascript:;" class="btn" @click="toSmsGateGuide">了解更多</a>
                  </dd>
                 <!-- <dd class="icon_site_desc2 app_dev2"></dd> -->
                  <div>
                    <img src="./app_dev2.png" width="64px" height="64px"/>
                  </div>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="desc_box">
          <ul class="">
            <li class="box_item">
              <div class="item-inner">
                <dl>
                  <dt>用户中心</dt>
                  <dd class="item-content">提供公司组织架构及人员信息，定时全量推送或实时更新同步各需求系统</dd>
                  <dd class="read-more">
                    <a href="javascript:;" class="btn" @click="toUserCenterGuide">了解更多</a>
                  </dd>
                 <!-- <dd class="icon_site_desc3 app_dev3"></dd> -->
                  <div>
                    <img src="./app_dev3.png" width="64px" height="64px"/>
                  </div>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-transparent"></div>
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
      ElRow
    },
    methods: {
      toPayGateGuide() {
        this.$router.push({path: '/guide/paygate'})
      },
      toExpensesGuide() {
        this.$router.push({path: '/guide/expenses'})
      },
      toSmsGateGuide() {
        this.$router.push({path: '/guide/smsgate'})
      },
      toUserCenterGuide() {
        this.$router.push({path: '/guide/usercenter'})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-carousel__item h3
    color: #475669
    font-size: 18px
    opacity: 0.75
    line-height: 300px
    margin: 0 auto

  .el-carousel__item:nth-child(2n)
    background-color: #99a9bf

  .el-carousel__item:nth-child(2n+1)
    background-color: #99a9bf

  .wrapper-notice
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 10;
    display block
    line-height 1.6
    background-color: #99A9BF;
    opacity: .8;
    width: 100%;
    height: 35px;
    .wrapper-inner
      height: 100%;
      width: 1000px;
      margin-left: auto;
      margin-right: auto;
      .notice-box
        padding: 0 20px;
        position: relative;
        line-height: 35px;
        background: 0;
        border-radius: 3px
        li
          float: left;
          margin-left: 12px;
          margin-right: 12px;
          padding-left: 14px;
          display: list-item;
        a
          color: #222;
          text-decoration: none;
        .icon-speacker
          background: url("base.png") 0 -2460px no-repeat;
          width: 16px;
          height: 16px;
          vertical-align: middle;
          display: inline-block;
          float: left;
          margin-top: 10px;
        .icon-new
          height: 12px;
          margin-top 0
          margin-left: 3px;
          line-height: 100px;
          background: url("base.png") 0 -2173px no-repeat;
          width: 20px;
          vertical-align: middle;
          display: inline-block;
          font-style: italic;
        .extra
          position: absolute;
          right: 0;
          background: url("arrow_right.png") no-repeat right 10px;
          padding-right: 15px;

  .introduce-wrapper
    display block
    color #475669
    text-align center
    font-family Microsoft YaHei
    background-position center 110px
    .title
      font-size 50px
      font-weight 400
      font-style normal
      line-height 38px
      padding-top 250px
    .desc
      font-size 18px
      line-height 30px
      margin-top 24px
      opacity .7
    .introduce-background
      position absolute
      top 0px
      left 0px
      width 100%
      height 100%
      z-index -1

  .desc_box
    padding-top 40px
    margin-bottom 300px
    text-align: center
    .box_item
      float left
      width 100%
      line-height: 1.6;
      .item-inner
        padding 0px 50px
      dl
        position relative
        font-size 14px
        display block
        text-align: center
      dt
        margin-top: 80px;
        position: absolute;
        left: 0;
        width: 100%;
        height: 10px
        font-size: 20px;
        font-family: "微软雅黑";
        font-weight: 300px
        color: #333333;
        letter-spacing: 0;
        display block
      dd
        width: 278px;
        height: 34px
        display: block;
      .item-content
        font-size 12px
        margin-top: 120px;
        font-family: ""
        opacity: .7;
        font-family: PingFangSC-Regular;
        color: #666666;
        letter-spacing: 0;
        position absolute
        left 0
        width 100%
      .app_dev0
        background url("app_dev0.png")
      .icon_site_desc0
        width 52px
        height 44px
        vertical-align middle
        display inline-block
      .app_dev1
        background url("app_dev1.png")
      .icon_site_desc1
        width 59px
        height 56px
        vertical-align middle
        display inline-block
      .app_dev2
        background url("app_dev2.png")
      .icon_site_desc2
        width 62px
        height 43px
        vertical-align middle
        display inline-block
      .app_dev3
        background url("app_dev3.png")
      .icon_site_desc3
        width 55px
        height 50px
        vertical-align middle
        display inline-block
      .read-more
        margin-top 210px
        position absolute
        left 0px
        width 100%
        a
          color: #3292ff;
          text-decoration: none;
        .btn
          height: 30px;
          line-height: 30px;
          padding: 0 12px;
          border: 0;
</style>

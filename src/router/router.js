/**
 * 路由设置
 * Created by jj02 on 2017/6/19.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index/index'
import ApiPlatformList from '../views/portal/api/platform-list'
import PlatformList from '../views/admin/platform/platform-list'
import ModuleList from '../views/admin/module/module-list'
import MerchantList from '../views/admin/busplatform/merchant-list'
import ChannelList from '../views/admin/busplatform/channel-list'
import DocumentListMgr from '../views/admin/api/document-list'
import DocumentEditMgr from '../views/admin/api/document-edit'
import InterfaceList from '../views/portal/api/interface-list'
import InterfaceDetail from '../views/portal/api/interface-detail'
import Login from '../views/portal/system/Login'
import Register from '../views/portal/system/Register'
import Apply from '../views/portal/apply/apply'
import MyProject from '../views/portal/apply/myproject'
import myApply from '../views/portal/apply/myapply'
import createApp from '../views/portal/apply/createApp'
import projectInfo from '../views/portal/apply/projectInfo'
import createApply from '../views/portal/apply/createApply'
import ApplyList from '../views/admin/apply/apply-list'
import paygateGuide from '../views/index/guide/paygate-guide'
import expensesGuide from '../views/index/guide/expenses-guide'
import smsgateGuide from '../views/index/guide/smsgate-guide'
import usercenterGuide from '../views/index/guide/usercenter-guide'
import DatadictionaryList from '../views/admin/datadictionary/datadictionary_list'
import DatadictionaryEdit from '../views/admin/datadictionary/datadictionary_edit'
import Merchant from '../views/portal/apply/channel'
import System from '../views/admin/system/system'
import UserList from '../views/admin/system/user_list'
import RegisterAudio from '../views/admin/system/register_audio'
import Secretkey from '../views/admin/system/secretkey'

Vue.use(VueRouter)

const routes = [
  {name: 'index', path: '/index', component: Index, meta: { pathName: '首页', breadLevel: 0 }},
  {name: 'paygateGuide', path: '/guide/paygate', component: paygateGuide},
  {name: 'expensesGuide', path: '/guide/expenses', component: expensesGuide},
  {name: 'smsgateGuide', path: '/guide/smsgate', component: smsgateGuide},
  {name: 'usercenterGuide', path: '/guide/usercenter', component: usercenterGuide},
  {name: 'apiPlatformList', path: '/api/platform', component: ApiPlatformList},
  {name: 'platformList', path: '/admin/platform', component: PlatformList, meta: {pathName: '系统列表', breadLevel: 1}},
  {name: 'moduleList', path: '/admin/module/:platformId', component: ModuleList, meta: {pathName: '模块列表', breadLevel: 2}},
  {name: 'apiListMgr', path: '/admin/api/list/:platformId/:moduleId/:platformModuleName', component: DocumentListMgr, meta: {pathName: '接口列表', breadLevel: 3}},
  {name: 'apiEditMgr', path: '/admin/api/edit/:interfaceId/:platformId/:moduleId/:moduleName', component: DocumentEditMgr, meta: {pathName: '接口信息编辑', breadLevel: 4}},
  {name: 'merchantList', path: '/admin/merchant/list/:platformNo/:platformName', component: MerchantList, meta: {pathName: '商户列表', breadLevel: 2}},
  {name: 'ChannelList', path: '/admin/channel/list/:platformNo/:merchantNo/:merchantName', component: ChannelList, meta: {pathName: '渠道列表', breadLevel: 3}},
  {name: 'login', path: '/login', component: Login},
  {name: 'register', path: '/register', component: Register},
  {name: 'applyList', path: '/admin/apply', component: ApplyList},
  {name: 'datadictionarylist', path: '/admin/dicList/:platformId', component: DatadictionaryList},
  {name: 'datadictionaryedit', path: '/admin/dicEdit/:catalogId/:platformId', component: DatadictionaryEdit},
  {
    name: 'apply',
    path: '/api/Apply',
    component: Apply,
    children: [
      {name: 'main', path: '/', redirect: 'myProject'},
      {name: 'myProject', path: 'myProject', component: MyProject},
      {name: 'myApply', path: 'myApply', component: myApply},
      {name: 'createApp', path: 'createApp', component: createApp},
      {name: 'projectInfo', path: 'projectInfo', component: projectInfo},
      {name: 'createApply', path: 'createApply', component: createApply},
      {name: 'merchant', path: 'merchant', component: Merchant}
    ]
  },
  {
    name: 'apiList',
    path: '/api/interface/:platformId',
    component: InterfaceList,
    children: [
      {
        name: 'apiDetail', path: 'detail/:interfaceId/:moduleId', component: InterfaceDetail
      }
    ]
  },
  {
    name: 'system',
    path: '/admin/system',
    component: System,
    children: [
      {
        name: 'userList', path: 'userlist', component: UserList
      },
      {
        name: 'registerAudio', path: 'register', component: RegisterAudio
      },
      {
        name: 'secretkey', path: 'secretkey', component: Secretkey
      }
    ]
  }
]

export default new VueRouter({
  routes: routes,
  linkActiveClass: 'active'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/ueditor.all'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse'

Vue.use(VueAxios, axios)

axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api/'

import './common/stylus/index.styl'
import './common/js/common'
import store from './common/js/store/store'

Vue.config.productionTip = false

Vue.prototype.$notify = Notification
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  router: router,
  store: store
})

router.push('/index')

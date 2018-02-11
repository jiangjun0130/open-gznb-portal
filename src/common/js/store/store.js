/**
 * Created by kl09 on 2017/6/26.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import permission from './permission'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user: user,
    permission: permission
  }
})
export default store

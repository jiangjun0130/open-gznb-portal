/**
 * Created by kl09 on 2017/6/26.
 */
const IS_LOGIN = 'isLogin'
const USER_ROLE = 'userRole'
const USER_NAME = 'userName'
const TOKEN = 'token'
const EMAIL = 'email'
const PHONE = 'phone'
export default {
  state: {
    currentUser: {
      isLogin: localStorage.getItem(IS_LOGIN),
      userRole: localStorage.getItem(USER_ROLE),
      userName: localStorage.getItem(USER_NAME),
     // userName: 'zhangxueyou@gznb.com', // TODO 登录用户信息保存
      userEmail: localStorage.getItem(EMAIL),
      token: localStorage.getItem(TOKEN),
      phone: localStorage.getItem(PHONE)
    }
  },
  mutations: {
    setUser(state, {isLogin, userName, userRole, userToken}) {
      console.log('isLogin:' + isLogin, 'userName:' + userName, 'userRole:' + userRole)
      state.currentUser.isLogin = isLogin
      state.currentUser.userName = userName
      state.currentUser.userRole = userRole
      state.currentUser.token = userToken
      localStorage.setItem(IS_LOGIN, isLogin)
      localStorage.setItem(USER_ROLE, userRole)
      localStorage.setItem(USER_NAME, userName)
      localStorage.setItem(TOKEN, userToken)
    }
  },
  getters: {
    getUserName() {
      return localStorage.getItem(USER_NAME)
    },
    getUserRole() {
      return localStorage.getItem(USER_ROLE)
    }
  },
  actions: {
    logout(context) {
      // 退出登录时清除用户信息
      context.state.currentUser.isLogin = false
      localStorage.setItem(IS_LOGIN, false)
    },
    cleanLoginInfo(context) {
      // 可以设置半小时后清除用户信息
      setTimeout(
        function () {
          this.actions.logout(context)
        }, 1800000)
    }
  }

}

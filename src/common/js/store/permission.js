/**
 * Created by kl09 on 2017/10/25.
 */
export default {
  state: {
    permission: {
      base: true, // 基本权限（首页、接口文档）
      interfaceAccess: false, // 接口接入
      platformManager: false, // 平台管理
      accessExamine: false, // 接入审核权限
      userManager: false // 用户管理权限
    }
  },
  mutations: {
    initPermission(state, permission) {
      console.log(permission)
      state.permission.interfaceAccess = permission.interfaceAccess
      state.permission.platformManager = permission.platformManager
      state.permission.accessExamine = permission.accessExamine
      state.permission.userManager = permission.userManager
    },
    getPermission: state => {
      console.log(state.permission)
      return state.permission
    }
  },
  getters: {
    getPermission: state => {
      return state.permission
    },
    isSAdmin: state => {
      return state.permission.interfaceAccess && state.permission.platformManager && state.permission.accessExamine && state.permission.userManager
    }
  }
}


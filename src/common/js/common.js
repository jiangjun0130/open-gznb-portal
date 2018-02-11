/**
 * 公共类
 *
 * Created by jj02 on 2017/6/23.
 */

const CUSER_NAME = 'CUSERNAME'

// 操作成功
const EXECUTE_OK = 1

// 操作失败
const EXECUTE_ERROR = 0

// 执行登录操作标识
const EXECUTE_LOGIN = -1

const PAGE_SIZE = 5

// 路由集合
const BREAD_LIST = []

var pageBean = {
  beginPageIndex: 1,
  currentPage: 1,
  endPageIndex: 1,
  pageCount: 1,
  pageSize: PAGE_SIZE,
  recordCount: 0,
  startIndex: 0,
  recordList: [],
  pageArray: [1 * PAGE_SIZE, 2 * PAGE_SIZE, 3 * PAGE_SIZE, 4 * PAGE_SIZE]
}

function getCookie(key) {
  var name = key + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(key) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}
function delCookie(key) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(key)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

export default {
  EXECUTE_OK,
  EXECUTE_ERROR,
  EXECUTE_LOGIN,
  PAGE_SIZE,
  pageBean,
  CUSER_NAME,
  BREAD_LIST,
  getCookie,
  delCookie
}

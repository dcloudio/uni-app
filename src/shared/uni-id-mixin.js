function b64DecodeUnicode (str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

function getCurrentUserInfo () {
  const token = (__PLATFORM__ === 'h5' || __PLATFORM__ === 'app-plus' ? uni : __GLOBAL__).getStorageSync('uni_id_token') || ''
  const tokenArr = token.split('.')
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    }
  }
  let userInfo
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]))
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message)
  }
  userInfo.tokenExpired = userInfo.exp * 1000
  delete userInfo.exp
  delete userInfo.iat
  return userInfo
}

export function uniIdMixin (Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    const {
      role
    } = getCurrentUserInfo()
    return role.indexOf(roleId) > -1
  }
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    const {
      permission
    } = getCurrentUserInfo()
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1
  }
  Vue.prototype.uniIDTokenValid = function () {
    const {
      tokenExpired
    } = getCurrentUserInfo()
    return tokenExpired > Date.now()
  }
}

function b64DecodeUnicode(str: string): string {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

interface UniIdUserInfo {
  uid: null | string
  role: Array<string>
  permission: Array<string>
  tokenExpired: number
}

function getCurrentUserInfo(): UniIdUserInfo {
  const token = uni.getStorageSync('uni_id_token') || ''
  const tokenArr = token.split('.')
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0,
    }
  }
  let userInfo
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]))
  } catch (error: any) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message)
  }
  userInfo.tokenExpired = userInfo.exp * 1000
  delete userInfo.exp
  delete userInfo.iat
  return userInfo
}

export function uniIdMixin(globalProperties: Record<string, any>): void {
  globalProperties.uniIDHasRole = function (roleId: string): boolean {
    const { role } = getCurrentUserInfo()
    return role.indexOf(roleId) > -1
  }
  globalProperties.uniIDHasPermission = function (
    permissionId: string
  ): boolean {
    const { permission } = getCurrentUserInfo()
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1
  }
  globalProperties.uniIDTokenValid = function (): boolean {
    const { tokenExpired } = getCurrentUserInfo()
    return tokenExpired > Date.now()
  }
}

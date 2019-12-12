import {
  invoke
} from '../../bridge'

const loginServices = {}

const loginByService = (provider, callbackId) => {
  function login () {
    loginServices[provider].login(res => {
      const authResult = res.target.authResult
      invoke(callbackId, {
        code: authResult.code,
        authResult: authResult,
        errMsg: 'login:ok'
      })
    }, err => {
      invoke(callbackId, {
        code: err.code,
        errMsg: 'login:fail:' + err.message
      })
    }, {scope: 'email'})
  }
  // 先注销再登录
  // apple登录logout之后无法重新触发获取email,fullname
  if (provider === 'apple') {
    login()
  } else {
    loginServices[provider].logout(login, login)
  }
}
/**
 * 微信登录
 */
export function login (params, callbackId) {
  const provider = params.provider || 'weixin'
  if (loginServices[provider]) {
    loginByService(provider, callbackId)
  } else {
    plus.oauth.getServices(services => {
      loginServices[provider] = services.find(({
        id
      }) => id === provider)
      if (!loginServices[provider]) {
        invoke(callbackId, {
          code: '',
          errMsg: 'login:fail:登录服务[' + provider + ']不存在'
        })
      } else {
        loginByService(provider, callbackId)
      }
    }, err => {
      invoke(callbackId, {
        code: err.code,
        errMsg: 'login:fail:' + err.message
      })
    })
  }
}

export function getUserInfo (params, callbackId) {
  const provider = params.provider || 'weixin'
  const loginService = loginServices[provider]
  if (!loginService || !loginService.authResult) {
    return invoke(callbackId, {
      errMsg: 'operateWXData:fail:请先调用 uni.login'
    })
  }
  loginService.getUserInfo(res => {
    let userInfo
    if (provider === 'weixin') {
      const wechatUserInfo = loginService.userInfo
      userInfo = {
        openId: wechatUserInfo.openid,
        nickName: wechatUserInfo.nickname,
        gender: wechatUserInfo.sex,
        city: wechatUserInfo.city,
        province: wechatUserInfo.province,
        country: wechatUserInfo.country,
        avatarUrl: wechatUserInfo.headimgurl,
        unionId: wechatUserInfo.unionid
      }
    } else if (provider === 'apple') {
        const appleInfo = loginService.appleInfo
        userInfo = {
          openId: appleInfo.user,
          fullName: appleInfo.fullName,
          email: appleInfo.email,
          authorizationCode: appleInfo.authorizationCode,
          identityToken: appleInfo.identityToken,
          realUserStatus: appleInfo.realUserStatus
        }
    } else {
      loginService.userInfo.openId = loginService.userInfo.openId || loginService.userInfo.openid ||
                loginService.authResult.openid
      loginService.userInfo.nickName = loginService.userInfo.nickName || loginService.userInfo.nickname
      loginService.userInfo.avatarUrl = loginService.userInfo.avatarUrl || loginService.userInfo.avatarUrl ||
                loginService.userInfo.headimgurl
      userInfo = loginService.userInfo
    }
    const result = {
      errMsg: 'operateWXData:ok'
    }
    if (params.data && params.data.api_name === 'webapi_getuserinfo') {
      result.data = {
        data: JSON.stringify(userInfo),
        rawData: '',
        signature: '',
        encryptedData: '',
        iv: ''
      }
    } else {
      result.userInfo = userInfo
    }
    invoke(callbackId, result)
  }, err => {
    invoke(callbackId, {
      errMsg: 'operateWXData:fail:' + err.message
    })
  })
}

/**
 * 获取用户信息
 */
export function operateWXData (params, callbackId) {
  switch (params.data.api_name) {
    case 'webapi_getuserinfo':
      getUserInfo(params, callbackId)
      break
    default:
      return {
        errMsg: 'operateWXData:fail'
      }
  }
}

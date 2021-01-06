import {
  invoke
} from '../../bridge'
import {
  warpPlusSuccessCallback,
  warpPlusErrorCallback
} from '../util'

function getService (provider) {
  return new Promise((resolve, reject) => {
    plus.oauth.getServices(services => {
      const service = services.find(({ id }) => id === provider)
      service ? resolve(service) : reject(new Error('provider not find'))
    }, reject)
  })
}

/**
 * 微信登录
 */
export function login (params, callbackId) {
  const provider = params.provider || 'weixin'
  const errorCallback = warpPlusErrorCallback(callbackId, 'login')

  getService(provider).then(service => {
    function login () {
      service.login(res => {
        const authResult = res.target.authResult
        invoke(callbackId, {
          code: authResult.code,
          authResult: authResult,
          errMsg: 'login:ok'
        })
      }, errorCallback, provider === 'apple' ? { scope: 'email' } : { univerifyStyle: params.univerifyStyle } || {})
    }
    // 先注销再登录
    // apple登录logout之后无法重新触发获取email,fullname；一键登录无logout
    if (provider === 'apple' || provider === 'univerify') {
      login()
    } else {
      service.logout(login, login)
    }
  }).catch(errorCallback)
}

export function getUserInfo (params, callbackId) {
  const provider = params.provider || 'weixin'
  const errorCallback = warpPlusErrorCallback(callbackId, 'operateWXData')
  getService(provider).then(loginService => {
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
        userInfo = loginService.userInfo
        userInfo.openId = userInfo.openId || userInfo.openid || loginService.authResult.openid
        userInfo.nickName = userInfo.nickName || userInfo.nickname
        userInfo.avatarUrl = userInfo.avatarUrl || userInfo.headimgurl
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
    }, errorCallback)
  }).catch(() => {
    invoke(callbackId, {
      errMsg: 'operateWXData:fail:请先调用 uni.login'
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

export function preLogin (params, callbackId) {
  const successCallback = warpPlusSuccessCallback(callbackId, 'preLogin')
  const errorCallback = warpPlusErrorCallback(callbackId, 'preLogin')
  getService(params.provider).then(service => service.preLogin(successCallback, errorCallback)).catch(errorCallback)
}

export function closeAuthView () {
  getService('univerify').then(service => service.closeAuthView())
}

import {
  invoke
} from '../../bridge'
import {
  warpPlusSuccessCallback,
  warpPlusErrorCallback
} from '../util'
import { isPlainObject, toRawType, callback } from 'uni-shared'

let univerifyManager

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
export function login (params, callbackId, plus = true) {
  const provider = params.provider || 'weixin'
  const errorCallback = warpErrorCallback(callbackId, 'login', plus)
  const isAppleLogin = provider === 'apple'
  const authOptions = isAppleLogin
    ? { scope: 'email' }
    : params.univerifyStyle
      ? { univerifyStyle: univerifyButtonsClickHandling(params.univerifyStyle, errorCallback) }
      : {}
  const _invoke = plus ? invoke : callback.invoke

  getService(provider).then(service => {
    function login () {
      if (params.onlyAuthorize && provider === 'weixin') {
        service.authorize(({ code }) => {
          _invoke(callbackId, {
            code,
            authResult: '',
            errMsg: 'login:ok'
          })
        }, errorCallback)
        return
      }
      service.login(res => {
        const authResult = res.target.authResult
        const appleInfo = res.target.appleInfo
        _invoke(callbackId, {
          code: authResult.code,
          authResult: authResult,
          appleInfo,
          errMsg: 'login:ok'
        })
      }, errorCallback, authOptions)
    }
    // 先注销再登录
    // apple登录logout之后无法重新触发获取email,fullname；一键登录无logout
    if (isAppleLogin || provider === 'univerify') {
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
      errMsg: 'operateWXData:fail 请先调用 uni.login'
    })
  })
}
/**
 * 获取用户信息-兼容
 */
export function getUserProfile (params, callbackId) {
  return getUserInfo(params, callbackId)
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

export function preLogin (params, callbackId, plus) {
  const successCallback = warpSuccessCallback(callbackId, 'preLogin', plus)
  const errorCallback = warpErrorCallback(callbackId, 'preLogin', plus)
  getService(params.provider).then(service => service.preLogin(successCallback, errorCallback)).catch(errorCallback)
}

export function closeAuthView () {
  return getService('univerify').then(service => service.closeAuthView())
}

export function getCheckBoxState (params, callbackId, plus) {
  const successCallback = warpSuccessCallback(callbackId, 'getCheckBoxState', plus)
  const errorCallback = warpErrorCallback(callbackId, 'getCheckBoxState', plus)
  try {
    getService('univerify').then(service => {
      const state = service.getCheckBoxState()
      successCallback({ state })
    })
  } catch (error) {
    errorCallback(error)
  }
}

/**
 * 一键登录自定义登陆按钮点击处理
 */
function univerifyButtonsClickHandling (univerifyStyle, errorCallback) {
  if (isPlainObject(univerifyStyle) && isPlainObject(univerifyStyle.buttons) && toRawType(univerifyStyle.buttons.list) === 'Array') {
    univerifyStyle.buttons.list.forEach((button, index) => {
      univerifyStyle.buttons.list[index].onclick = function () {
        const res = {
          code: '30008',
          message: '用户点击了自定义按钮',
          index,
          provider: button.provider
        }
        isPlainObject(univerifyManager)
          ? univerifyManager._triggerUniverifyButtonsClick(res)
          : closeAuthView().then(() => {
            errorCallback(res)
          })
      }
    })
  }
  return univerifyStyle
}

class UniverifyManager {
  constructor () {
    this.provider = 'univerify'
    this.eventName = 'api.univerifyButtonsClick'
  }

  close () {
    closeAuthView()
  }

  login (options) {
    this._warp((data, callbackId) => login(data, callbackId, false), options)
  }

  getCheckBoxState (options) {
    this._warp((_, callbackId) => getCheckBoxState(_, callbackId, false), options)
  }

  preLogin (options) {
    this._warp((data, callbackId) => preLogin(data, callbackId, false), options)
  }

  onButtonsClick (callback) {
    UniServiceJSBridge.on(this.eventName, callback)
  }

  offButtonsClick (callback) {
    UniServiceJSBridge.off(this.eventName, callback)
  }

  _triggerUniverifyButtonsClick (res) {
    UniServiceJSBridge.emit(this.eventName, res)
  }

  _warp (fn, options) {
    return callback.warp(fn)(this._getOptions(options))
  }

  _getOptions (options = {}) {
    return Object.assign({}, options, { provider: this.provider })
  }
}

export function getUniverifyManager () {
  return univerifyManager || (univerifyManager = new UniverifyManager())
}

function warpSuccessCallback (callbackId, name, plus = true) {
  return plus
    ? warpPlusSuccessCallback(callbackId, name)
    : (options) => {
      callback.invoke(callbackId, Object.assign({}, options, {
        errMsg: `${name}:ok`
      }))
    }
}

function warpErrorCallback (callbackId, name, plus = true) {
  return plus
    ? warpPlusErrorCallback(callbackId, name)
    : (error) => {
      const { code = 0, message: errorMessage } = error
      callback.invoke(callbackId, {
        errMsg: `${name}:fail ${errorMessage || ''}`,
        errCode: code,
        code
      })
    }
}

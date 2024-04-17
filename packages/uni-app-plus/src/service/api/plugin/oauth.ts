import {
  API_CLOSE_AUTH_VIEW,
  API_GET_CHECK_BOX_STATE,
  API_GET_UNIVERIFY_MANAGER,
  API_GET_USER_INFO,
  API_GET_USER_PROFILE,
  API_LOGIN,
  API_PRE_LOGIN,
  type API_TYPE_CLOSE_AUTH_VIEW,
  type API_TYPE_GET_CHECK_BOX_STATE,
  type API_TYPE_GET_UNIVERIFY_MANAGER,
  type API_TYPE_GET_USER_INFO,
  type API_TYPE_GET_USER_PROFILE,
  type API_TYPE_LOGIN,
  type API_TYPE_PRE_LOGIN,
  GetUserInfoProtocol,
  GgetUserProfileProtocol,
  LoginProtocol,
  PreLoginOptions,
  PreLoginProtocol,
  defineAsyncApi,
  defineSyncApi,
} from '@dcloudio/uni-api'
import { extend, isPlainObject, toTypeString } from '@vue/shared'
import {
  warpPlusErrorCallback,
  warpPlusSuccessCallback,
} from '../../../helpers/plus'

type Provider = PlusOauthAuthService
type CallBack = {
  resolve: (res: any) => void
  reject: (errMsg: string, errRes?: any) => void
}

let univerifyManager: UniverifyManager

function getService(provider: string): Promise<Provider> {
  return new Promise((resolve, reject) => {
    plus.oauth.getServices((services) => {
      const service = services.find(({ id }) => id === provider)
      service ? resolve(service) : reject(new Error('provider not find'))
    }, reject)
  })
}

export const login = defineAsyncApi<API_TYPE_LOGIN>(
  API_LOGIN,
  (params, { resolve, reject }) => {
    const provider = params.provider || 'weixin'
    const errorCallback = warpPlusErrorCallback(reject)
    const isAppleLogin = provider === 'apple'
    const authOptions = isAppleLogin
      ? { scope: 'email' }
      : params.univerifyStyle
      ? {
          univerifyStyle: univerifyButtonsClickHandling(
            params.univerifyStyle,
            errorCallback
          ),
        }
      : {}

    getService(provider)
      .then((service) => {
        function login() {
          if (params.onlyAuthorize && provider === 'weixin') {
            service.authorize(({ code }) => {
              resolve({
                code,
                authResult: '',
              })
            }, errorCallback)
            return
          }
          service.login(
            (res) => {
              const authResult = res.target.authResult
              const appleInfo = res.target.appleInfo
              resolve({
                code: authResult.code,
                authResult: authResult,
                appleInfo,
              })
            },
            errorCallback,
            authOptions
          )
        }
        // 先注销再登录
        // apple登录logout之后无法重新触发获取email,fullname；一键登录无logout
        if (isAppleLogin || provider === 'univerify') {
          login()
        } else {
          service.logout(login, login)
        }
      })
      .catch(errorCallback)
  },
  LoginProtocol
)

const baseGetUserInfo = (
  params: UniApp.GetUserInfoOptions,
  { resolve, reject }: CallBack
) => {
  const provider = params.provider || 'weixin'
  const errorCallback = warpPlusErrorCallback(reject)
  getService(provider)
    .then((loginService) => {
      loginService.getUserInfo((res) => {
        let userInfo: (PlusOauthAppleInfo | PlusOauthUserInfo) & {
          nickName?: string
          openId?: string
          avatarUrl?: string
          openid?: PlusOauthUserInfo['openid']
          nickname?: PlusOauthUserInfo['nickname']
          gender?: PlusOauthUserInfo['sex']
          headimgurl?: PlusOauthUserInfo['headimgurl']
          unionId?: string
        } = { nickName: '' }
        if (provider === 'weixin') {
          const wechatUserInfo = loginService.userInfo
          if (wechatUserInfo)
            userInfo = {
              openId: wechatUserInfo.openid,
              nickName: wechatUserInfo.nickname,
              gender: wechatUserInfo.sex,
              city: wechatUserInfo.city,
              province: wechatUserInfo.province,
              country: wechatUserInfo.country,
              avatarUrl: wechatUserInfo.headimgurl,
              unionId: wechatUserInfo.unionid,
            }
        } else if (provider === 'apple') {
          const appleInfo = loginService.appleInfo
          if (appleInfo)
            userInfo = {
              openId: appleInfo.user,
              fullName: appleInfo.fullName,
              email: appleInfo.email,
              authorizationCode: appleInfo.authorizationCode,
              identityToken: appleInfo.identityToken,
              realUserStatus: appleInfo.realUserStatus,
            }
        } else {
          userInfo = loginService.userInfo!
          if (userInfo) {
            userInfo.openId =
              userInfo.openId ||
              userInfo.openid ||
              loginService.authResult!.openid
            userInfo.nickName = userInfo.nickName || userInfo.nickname
            userInfo.avatarUrl = userInfo.avatarUrl || userInfo.headimgurl
          }
        }
        let result: Data = {}
        // @ts-expect-error
        if (params.data && params.data.api_name === 'webapi_getuserinfo') {
          result.data = {
            data: JSON.stringify(userInfo),
            rawData: '',
            signature: '',
            encryptedData: '',
            iv: '',
          }
        } else {
          result.userInfo = userInfo
        }
        resolve(result as unknown as UniApp.GetUserInfoRes)
      }, errorCallback)
    })
    .catch(() => {
      reject('请先调用 uni.login')
    })
}

export const getUserInfo = defineAsyncApi<API_TYPE_GET_USER_INFO>(
  API_GET_USER_INFO,
  baseGetUserInfo,
  GetUserInfoProtocol
)

/**
 * 获取用户信息-兼容
 */
export const getUserProfile = defineAsyncApi<API_TYPE_GET_USER_PROFILE>(
  API_GET_USER_PROFILE,
  baseGetUserInfo,
  GgetUserProfileProtocol
)

export const preLogin = defineAsyncApi<API_TYPE_PRE_LOGIN>(
  API_PRE_LOGIN,
  ({ provider }, { resolve, reject }) => {
    const successCallback = warpPlusSuccessCallback(resolve)
    const errorCallback = warpPlusErrorCallback(reject)
    getService(provider as string)
      .then((service) => service.preLogin(successCallback, errorCallback))
      .catch(errorCallback)
  },
  PreLoginProtocol,
  PreLoginOptions
)

const _closeAuthView = () =>
  getService('univerify').then((service) => service.closeAuthView())
export const closeAuthView = defineSyncApi<API_TYPE_CLOSE_AUTH_VIEW>(
  API_CLOSE_AUTH_VIEW,
  _closeAuthView
)

export const getCheckBoxState = defineAsyncApi<API_TYPE_GET_CHECK_BOX_STATE>(
  API_GET_CHECK_BOX_STATE,
  (_, { resolve, reject }) => {
    const successCallback = warpPlusSuccessCallback(resolve)
    const errorCallback = warpPlusErrorCallback(reject)
    try {
      getService('univerify').then((service) => {
        // @ts-expect-error
        const state = service.getCheckBoxState()
        successCallback({ state })
      })
    } catch (error: any) {
      errorCallback(error)
    }
  }
)

/**
 * 一键登录自定义登陆按钮点击处理
 */
function univerifyButtonsClickHandling(
  univerifyStyle: PlusOauthUniverifyStyles,
  errorCallback: Function
) {
  if (
    isPlainObject(univerifyStyle) &&
    isPlainObject(univerifyStyle.buttons) &&
    toTypeString(univerifyStyle.buttons.list) === '[object Array]'
  ) {
    univerifyStyle.buttons.list!.forEach((button, index) => {
      univerifyStyle.buttons!.list![index].onclick = function () {
        const res = {
          code: '30008',
          message: '用户点击了自定义按钮',
          index,
          provider: button.provider,
        }
        isPlainObject(univerifyManager)
          ? univerifyManager._triggerUniverifyButtonsClick(res)
          : _closeAuthView().then(() => {
              errorCallback(res)
            })
      }
    })
  }
  return univerifyStyle
}

class UniverifyManager implements UniApp.UniverifyManager {
  provider: string = 'univerify'
  eventName: string = 'api.univerifyButtonsClick'

  close() {
    return closeAuthView()
  }

  login(options: UniApp.UniverifyLoginOptions) {
    return login(this._getOptions(options))
  }

  getCheckBoxState(options: UniApp.GetCheckBoxStateOptions) {
    return getCheckBoxState(options)
  }

  preLogin(options?: UniApp.CallBackOptions) {
    return preLogin(this._getOptions(options))
  }

  onButtonsClick(callback: UniApp.CallbackFunction) {
    UniServiceJSBridge.on(this.eventName, callback)
  }

  offButtonsClick(callback: UniApp.CallbackFunction) {
    UniServiceJSBridge.off(this.eventName, callback)
  }

  _triggerUniverifyButtonsClick(res: any) {
    UniServiceJSBridge.emit(this.eventName, res)
  }

  _getOptions(options: any = {}) {
    return extend({}, options, { provider: this.provider })
  }
}

export const getUniverifyManager =
  defineSyncApi<API_TYPE_GET_UNIVERIFY_MANAGER>(
    API_GET_UNIVERIFY_MANAGER,
    () => {
      return univerifyManager || (univerifyManager = new UniverifyManager())
    }
  )

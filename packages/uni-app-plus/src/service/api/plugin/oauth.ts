import {
  API_LOGIN,
  API_TYPE_LOGIN,
  LoginProtocol,
  API_GET_USER_INFO,
  API_TYPE_GET_USER_INFO,
  GetUserInfoProtocol,
  API_GET_USER_PROFILE,
  API_TYPE_GET_USER_PROFILE,
  GgetUserProfileProtocol,
  API_PRE_LOGIN,
  API_TYPE_PRE_LOGIN,
  PreLoginOptions,
  PreLoginProtocol,
  API_CLOSE_AUTH_VIEW,
  API_TYPE_CLOSE_AUTH_VIEW,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { isPlainObject, toTypeString } from '@vue/shared'
import {
  warpPlusSuccessCallback,
  warpPlusErrorCallback,
} from '../../../helpers/plus'

type Provider = PlusOauthAuthService

function getService(provider: string): Promise<Provider> {
  return new Promise((resolve, reject) => {
    plus.oauth.getServices((services) => {
      const service = services.find(({ id }) => id === provider)
      service ? resolve(service) : reject(new Error('provider not find'))
    }, reject)
  })
}

/**
 * 微信登录
 */
const baseLogin = (
  params: UniApp.LoginOptions,
  {
    resolve,
    reject,
  }: {
    resolve: (res: any) => void
    reject: (errMsg: string, errRes?: any) => void
  }
) => {
  const provider = params.provider || 'weixin'
  const errorCallback = warpPlusErrorCallback(reject)

  getService(provider)
    .then((service) => {
      function login() {
        service.login(
          (res) => {
            const authResult = res.target.authResult
            resolve({
              code: authResult.code,
              authResult: authResult,
            })
          },
          errorCallback,
          provider === 'apple'
            ? { scope: 'email' }
            : {
                univerifyStyle: univerifyButtonsClickHandling(
                  params.univerifyStyle!,
                  errorCallback
                ),
              } || {}
        )
      }
      // 先注销再登录
      // apple登录logout之后无法重新触发获取email,fullname；一键登录无logout
      if (provider === 'apple' || provider === 'univerify') {
        login()
      } else {
        service.logout(login, login)
      }
    })
    .catch(errorCallback)
}
export const login = defineAsyncApi<API_TYPE_LOGIN>(
  API_LOGIN,
  baseLogin,
  LoginProtocol
)

export const getUserInfo = defineAsyncApi<API_TYPE_GET_USER_INFO>(
  API_GET_USER_INFO,
  (params, { resolve, reject }) => {
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
                // @ts-ignore
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
          // @ts-ignore
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
          resolve(result as unknown as UniApp.GetUserProfileRes)
        }, errorCallback)
      })
      .catch(() => {
        reject('请先调用 uni.login')
      })
  },
  GetUserInfoProtocol
)

/**
 * 获取用户信息-兼容
 */
export const getUserProfile = defineAsyncApi<API_TYPE_GET_USER_PROFILE>(
  API_GET_USER_PROFILE,
  (params, { resolve, reject }) => {
    return baseLogin(params, { resolve, reject })
  },
  GgetUserProfileProtocol
)

export const preLogin = defineAsyncApi<API_TYPE_PRE_LOGIN>(
  API_PRE_LOGIN,
  (params, { resolve, reject }) => {
    const successCallback = warpPlusSuccessCallback(resolve)
    const errorCallback = warpPlusErrorCallback(reject)
    getService(params.provider as string)
      .then((service) => service.preLogin(successCallback, errorCallback))
      .catch(errorCallback)
  },
  PreLoginProtocol,
  PreLoginOptions
)

const _closeAuthView = () =>
  getService('univerify').then((service) => service.closeAuthView())
export const closeAuthView = defineAsyncApi<API_TYPE_CLOSE_AUTH_VIEW>(
  API_CLOSE_AUTH_VIEW,
  _closeAuthView
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
    univerifyStyle.buttons &&
    toTypeString(univerifyStyle.buttons.list) === '[object Array]' &&
    univerifyStyle.buttons.list!.length > 0
  ) {
    univerifyStyle.buttons.list!.forEach((button, index) => {
      univerifyStyle.buttons!.list![index].onclick = function () {
        _closeAuthView().then(() => {
          errorCallback({
            code: '30008',
            message: '用户点击了自定义按钮',
            index,
            provider: button.provider,
          })
        })
      }
    })
  }
  return univerifyStyle
}

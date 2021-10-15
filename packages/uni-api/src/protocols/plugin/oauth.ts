export const API_LOGIN = 'login'
export type API_TYPE_LOGIN = typeof uni.login
export const LoginProtocol: ApiProtocol<API_TYPE_LOGIN> = {
  provider: String as any,
  scopes: [String, Array] as any,
  timeout: Number,
  univerifyStyle: Object as any,
  onlyAuthorize: Boolean,
}

export const API_GET_USER_INFO = 'getUserInfo'
export type API_TYPE_GET_USER_INFO = typeof uni.getUserInfo
export const GetUserInfoProtocol: ApiProtocol<API_TYPE_GET_USER_INFO> = {
  provider: String as any,
  withCredentials: Boolean,
  timeout: Number,
  lang: String,
}

export const API_GET_USER_PROFILE = 'ggetUserProfilegetUserProfile'
export type API_TYPE_GET_USER_PROFILE = typeof uni.getUserProfile
export const GgetUserProfileProtocol: ApiProtocol<API_TYPE_GET_USER_PROFILE> = {
  provider: String as any,
  withCredentials: Boolean,
  timeout: Number,
  lang: String as any,
}

export const API_PRE_LOGIN = 'preLogin'
export type API_TYPE_PRE_LOGIN = typeof uni.preLogin
const provider = {
  UNIVERIFY: 'univerify',
}
export const PreLoginOptions: ApiOptions<API_TYPE_PRE_LOGIN> = {
  formatArgs: {
    provider(value, parmas) {
      if (Object.values(provider).indexOf(String(value)) < 0) {
        return 'provider error'
      }
    },
  },
}
export const PreLoginProtocol: ApiProtocol<API_TYPE_PRE_LOGIN> = {
  provider: {
    type: String as any,
    required: true,
  },
}

export const API_CLOSE_AUTH_VIEW = 'closeAuthView'
export type API_TYPE_CLOSE_AUTH_VIEW = typeof uni.closeAuthView

export const API_GET_CHECK_BOX_STATE = 'getCheckBoxState'
export type API_TYPE_GET_CHECK_BOX_STATE = typeof uni.getCheckBoxState

export const API_GET_UNIVERIFY_MANAGER = 'getUniverifyManager'
export type API_TYPE_GET_UNIVERIFY_MANAGER = typeof uni.getUniverifyManager

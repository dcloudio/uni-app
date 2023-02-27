import { elemInArray } from '../../helpers/protocol'

export const API_SHREA = 'share'
export type API_TYPE_SHARE = typeof uni.share
const SCENE: NonNullable<Parameters<API_TYPE_SHARE>[0]>['scene'][] = [
  'WXSceneSession',
  'WXSceneTimeline',
  'WXSceneFavorite',
]
export const SahreOptions: ApiOptions<API_TYPE_SHARE> = {
  formatArgs: {
    scene(value, params) {
      const { provider, openCustomerServiceChat } = params
      if (
        provider === 'weixin' &&
        !openCustomerServiceChat &&
        (!value || !SCENE.includes(value))
      ) {
        return `分享到微信时，scene必须为以下其中一个：${SCENE.join('、')}`
      }
    },
    summary(value, params) {
      if (params.type === 1 && !value) {
        return '分享纯文本时，summary必填'
      }
    },
    href(value, params) {
      if (params.type === 0 && !value) {
        return '分享图文时，href必填'
      }
    },
    imageUrl(value, params) {
      if ([0, 2, 5].includes(Number(params.type)) && !value) {
        return '分享图文、纯图片、小程序时，imageUrl必填，推荐使用小于20Kb的图片'
      }
    },
    mediaUrl(value, params) {
      if ([3, 4].includes(Number(params.type)) && !value) {
        return '分享音乐、视频时，mediaUrl必填'
      }
    },
    miniProgram(value, params) {
      if (params.type === 5 && !value) {
        return '分享小程序时，miniProgram必填'
      }
    },
    corpid(value, params) {
      if (params.openCustomerServiceChat && !value) {
        return `使用打开客服功能时 corpid 必填`
      }
    },
    customerUrl(value, params) {
      if (params.openCustomerServiceChat && !value) {
        return `使用打开客服功能时 customerUrl 必填`
      }
    },
  },
}
export const ShareProtocols: ApiProtocol<API_TYPE_SHARE> = {
  provider: {
    type: String as any,
    required: true,
  },
  type: Number as any,
  title: String,
  scene: String as any,
  summary: String,
  href: String,
  imageUrl: String,
  mediaUrl: String,
  miniProgram: Object,
}

export const API_SHARE_WITH_SYSTEM = 'shareWithSystem'
export type API_TYPE_SHARE_WITH_SYSTEM = typeof uni.shareWithSystem
const TYPE: NonNullable<Parameters<API_TYPE_SHARE_WITH_SYSTEM>[0]>['type'][] = [
  'text',
  'image',
]
export const ShareWithSystemOptions: ApiOptions<API_TYPE_SHARE_WITH_SYSTEM> = {
  formatArgs: {
    type(value, params) {
      if (value && !TYPE.includes(value))
        return '分享参数 type 不正确。只支持text、image'
      params.type = elemInArray(value, TYPE)
    },
  },
}
export const ShareWithSystemProtocols: ApiProtocol<API_TYPE_SHARE_WITH_SYSTEM> =
  {
    type: String as any,
    summary: String,
    href: String,
    imageUrl: String,
  }

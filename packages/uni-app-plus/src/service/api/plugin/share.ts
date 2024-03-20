import { isString } from '@vue/shared'
import { getRealPath } from '@dcloudio/uni-platform'
import { warpPlusErrorCallback } from '../../../helpers/plus'
import {
  defineAsyncApi,
  API_SHREA,
  API_TYPE_SHARE,
  SahreOptions,
  ShareProtocols,
  API_SHARE_WITH_SYSTEM,
  API_TYPE_SHARE_WITH_SYSTEM,
  ShareWithSystemOptions,
  ShareWithSystemProtocols,
} from '@dcloudio/uni-api'

// 0:图文，1:纯文字，2:纯图片，3:音乐，4:视频，5:小程序
const TYPES = {
  0: {
    name: 'web',
    title: '图文',
  },
  1: {
    name: 'text',
    title: '纯文字',
  },
  2: {
    name: 'image',
    title: '纯图片',
  },
  3: {
    name: 'music',
    title: '音乐',
  },
  4: {
    name: 'video',
    title: '视频',
  },
  5: {
    name: 'miniProgram',
    title: '小程序',
  },
}

const parseParams = (args: UniApp.ShareOptions) => {
  args.type = args.type || 0

  let {
    provider,
    type,
    title,
    summary: content,
    href,
    imageUrl,
    mediaUrl: media,
    scene,
    miniProgram,
    openCustomerServiceChat,
    corpid,
    customerUrl: url,
  } = args

  if (isString(imageUrl) && imageUrl) {
    imageUrl = getRealPath(imageUrl)
  }

  const shareType = TYPES[type]
  if (shareType) {
    const sendMsg = {
      provider,
      type: shareType.name,
      title,
      content,
      href,
      pictures: [imageUrl],
      thumbs: imageUrl ? [imageUrl] : undefined,
      media,
      miniProgram,
      extra: {
        scene,
      },
      openCustomerServiceChat,
      corpid,
      url,
    }
    if (provider === 'weixin' && (type === 1 || type === 2)) {
      delete sendMsg.thumbs
    }
    return sendMsg
  }
  return '分享参数 type 不正确'
}
type ParseParams = ReturnType<typeof parseParams>

const sendShareMsg = function (
  service: PlusShareShareService,
  params: Exclude<ParseParams, string>,
  resolve: (args?: any) => void,
  reject: (errMsg: string, errRes?: any) => void,
  method = 'share'
) {
  const errorCallback = warpPlusErrorCallback(reject)
  const serviceMethod = params.openCustomerServiceChat
    ? 'openCustomerServiceChat'
    : 'send'
  try {
    // openCustomerServiceChat
    service[serviceMethod](
      params,
      () => {
        resolve()
      },
      errorCallback
    )
  } catch (error) {
    errorCallback({
      message: `${params.provider} ${serviceMethod} 方法调用失败`,
    })
  }
}

export const share = defineAsyncApi<API_TYPE_SHARE>(
  API_SHREA,
  (params, { resolve, reject }) => {
    const parsedParams = parseParams(params)
    const errorCallback = warpPlusErrorCallback(reject)

    if (isString(parsedParams)) {
      return reject(parsedParams)
    }

    plus.share.getServices((services) => {
      const service = services.find(({ id }) => id === parsedParams.provider)
      if (!service) {
        reject('service not found')
      } else {
        if (service.authenticated) {
          sendShareMsg(service, parsedParams, resolve, reject)
        } else {
          service.authorize(
            () => sendShareMsg(service, parsedParams, resolve, reject),
            errorCallback
          )
        }
      }
    }, errorCallback)
  },
  ShareProtocols,
  SahreOptions
)

export const shareWithSystem = defineAsyncApi<API_TYPE_SHARE_WITH_SYSTEM>(
  API_SHARE_WITH_SYSTEM,
  ({ type, imageUrl, summary, href }, { resolve, reject }) => {
    const errorCallback = warpPlusErrorCallback(reject)

    if (isString(imageUrl) && imageUrl) {
      imageUrl = getRealPath(imageUrl)
    }
    plus.share.sendWithSystem(
      {
        type,
        pictures: imageUrl ? [imageUrl] : undefined,
        content: summary,
        href,
      },
      () => resolve(),
      errorCallback
    )
  },
  ShareWithSystemProtocols,
  ShareWithSystemOptions
)

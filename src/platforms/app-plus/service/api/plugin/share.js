import {
  TEMP_PATH
} from '../constants'

import {
  getRealPath
} from '../util'

import {
  invoke
} from '../../bridge'

// 0:图文，1:纯文字，2:纯图片，3:音乐，4:视频，5:小程序
const TYPES = {
  0: {
    name: 'web',
    title: '图文'
  },
  1: {
    name: 'text',
    title: '纯文字'
  },
  2: {
    name: 'image',
    title: '纯图片'
  },
  3: {
    name: 'music',
    title: '音乐'
  },
  4: {
    name: 'video',
    title: '视频'
  },
  5: {
    name: 'miniProgram',
    title: '小程序'
  }
}

const parseParams = (args, callbackId, method) => {
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
    miniProgram
  } = args

  if (typeof imageUrl === 'string' && imageUrl) {
    imageUrl = getRealPath(imageUrl)
  }

  const shareType = TYPES[type + '']
  if (shareType) {
    const sendMsg = {
      provider,
      type: shareType.name,
      title,
      content,
      href,
      pictures: [imageUrl],
      thumbs: [imageUrl],
      media,
      miniProgram,
      extra: {
        scene
      }
    }
    if (provider === 'weixin' && (type === 1 || type === 2)) {
      delete sendMsg.thumbs
    }
    return sendMsg
  }
  return '分享参数 type 不正确'
}

const sendShareMsg = function (service, params, callbackId, method = 'share') {
  service.send(
    params,
    () => {
      invoke(callbackId, {
        errMsg: method + ':ok'
      })
    },
    err => {
      invoke(callbackId, {
        errMsg: method + ':fail:' + err.message
      })
    }
  )
}

export function shareAppMessageDirectly ({
  title,
  path,
  imageUrl,
  useDefaultSnapshot
}, callbackId) {
  title = title || __uniConfig.appname
  const goShare = () => {
    share({
      provider: 'weixin',
      type: 0,
      title,
      imageUrl,
      href: path,
      scene: 'WXSceneSession'
    },
    callbackId,
    'shareAppMessageDirectly'
    )
  }
  if (useDefaultSnapshot) {
    const pages = getCurrentPages()
    const webview = plus.webview.getWebviewById(pages[pages.length - 1].__wxWebviewId__ + '')
    if (webview) {
      const bitmap = new plus.nativeObj.Bitmap()
      webview.draw(
        bitmap,
        () => {
          const fileName = TEMP_PATH + '/share/snapshot.jpg'
          bitmap.save(
            fileName, {
              overwrite: true,
              format: 'jpg'
            },
            () => {
              imageUrl = fileName
              goShare()
            },
            err => {
              invoke(callbackId, {
                errMsg: 'shareAppMessageDirectly:fail:' + err.message
              })
            }
          )
        },
        err => {
          invoke(callbackId, {
            errMsg: 'shareAppMessageDirectly:fail:' + err.message
          })
        }
      )
    } else {
      goShare()
    }
  } else {
    goShare()
  }
}

export function share (params, callbackId, method = 'share') {
  params = parseParams(params, callbackId, method)
  if (typeof params === 'string') {
    return invoke(callbackId, {
      errMsg: method + ':fail:' + params
    })
  }
  const provider = params.provider
  plus.share.getServices(
    services => {
      const service = services.find(({
        id
      }) => id === provider)
      if (!service) {
        invoke(callbackId, {
          errMsg: method + ':fail:分享服务[' + provider + ']不存在'
        })
      } else {
        if (service.authenticated) {
          sendShareMsg(service, params, callbackId)
        } else {
          service.authorize(
            () => sendShareMsg(service, params, callbackId),
            err => {
              invoke(callbackId, {
                errMsg: method + ':fail:' + err.message
              })
            }
          )
        }
      }
    },
    err => {
      invoke(callbackId, {
        errMsg: method + ':fail:' + err.message
      })
    }
  )
}

export function shareWithSystem (params, callbackId, method = 'shareWithSystem') {
  let {
    type,
    imageUrl,
    summary: content,
    href
  } = params
  type = type || 'text'
  const allowedTypes = ['text', 'image']
  if (allowedTypes.indexOf(type) < 0) {
    invoke(callbackId, {
      errMsg: method + ':fail:分享参数 type 不正确'
    })
  }
  if (typeof imageUrl === 'string' && imageUrl) {
    imageUrl = getRealPath(imageUrl)
  }
  plus.share.sendWithSystem({
    type,
    pictures: imageUrl && [imageUrl],
    content,
    href
  }, function (res) {
    invoke(callbackId, {
      errMsg: method + ':ok'
    })
  }, function (err) {
    invoke(callbackId, {
      errMsg: method + ':fail:' + err.message
    })
  })
}

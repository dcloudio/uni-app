import {
  urlToFile
} from 'uni-platform/helpers/file'

export function getVideoInfo ({
  src
}, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  urlToFile(src, true).then(file => {
    return file
  }).catch(() => {
    return {}
  }).then(file => {
    const result = file.size ? {
      size: file.size,
      errMsg: 'getVideoInfo:ok'
    } : {
      errMsg: 'getVideoInfo:fail'
    }
    const video = document.createElement('video')
    if (video.onloadedmetadata !== undefined) {
      // 部分浏览器（如微信内置浏览器）未播放无法触发loadedmetadata事件
      const handle = setTimeout(() => {
        video.onloadedmetadata = null
        video.onerror = null
        invoke(callbackId, result)
      }, src.startsWith('data:') || src.startsWith('blob:') ? 300 : 3000)
      // 尝试获取视频的宽高信息
      video.onloadedmetadata = function () {
        clearTimeout(handle)
        video.onerror = null
        invoke(callbackId, Object.assign(result, {
          size: file.size,
          duration: video.duration || 0,
          width: video.videoWidth || 0,
          height: video.videoHeight || 0,
          errMsg: 'getVideoInfo:ok'
        }))
      }
      video.onerror = function () {
        clearTimeout(handle)
        video.onloadedmetadata = null
        invoke(callbackId, result)
      }
      video.src = src
    } else {
      invoke(callbackId, result)
    }
  })
}

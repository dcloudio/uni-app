import { fileToUrl, revokeObjectURL } from 'uni-platform/helpers/file'
import { updateElementStyle } from 'uni-shared'

const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

let videoInput = null

const _createInput = function (options) {
  let inputEl = document.createElement('input')
  inputEl.type = 'file'
  updateElementStyle(inputEl, {
    'position': 'absolute',
    'visibility': 'hidden',
    'z-index': -999,
    'width': 0,
    'height': 0,
    'top': 0,
    'left': 0
  })
  inputEl.accept = 'video/*'
  // 经过测试，仅能限制只通过相机拍摄，不能限制只允许从相册选择。
  if (options.sourceType.length === 1 && options.sourceType[0] === 'camera') {
    inputEl.capture = 'camera'
  }
  return inputEl
}

export function chooseVideo ({
  sourceType
}, callbackId) {
  if (videoInput) {
    document.body.removeChild(videoInput)
    videoInput = null
  }

  videoInput = _createInput({
    sourceType: sourceType
  })
  document.body.appendChild(videoInput)

  videoInput.addEventListener('change', function (event) {
    const file = event.target.files[0]
    const callbackResult = {
      errMsg: 'chooseVideo:ok',
      tempFile: file,
      size: file.size,
      duration: 0,
      width: 0,
      height: 0,
      name: file.name
    }
    let filePath
    Object.defineProperty(callbackResult, 'tempFilePath', {
      get () {
        filePath = filePath || fileToUrl(this.tempFile)
        return filePath
      }
    })

    const video = document.createElement('video')
    if (video.onloadedmetadata !== undefined) {
      const filePath = fileToUrl(file)
      // 尝试获取视频的宽高信息
      video.onloadedmetadata = function () {
        revokeObjectURL(filePath)
        invoke(callbackId, Object.assign(callbackResult, {
          duration: video.duration || 0,
          width: video.videoWidth || 0,
          height: video.videoHeight || 0
        }))
      }
      // 部分浏览器（如微信内置浏览器）未播放无法触发loadedmetadata事件
      setTimeout(() => {
        video.onloadedmetadata = null
        revokeObjectURL(filePath)
        invoke(callbackId, callbackResult)
      }, 300)
      video.src = filePath
    } else {
      invoke(callbackId, callbackResult)
    }
    // TODO 用户取消选择时，触发 fail，目前尚未找到合适的方法。
  })

  videoInput.click()
}

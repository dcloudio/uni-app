import { fileToUrl, revokeObjectURL } from 'uni-platform/helpers/file'
import { t } from 'uni-core/helpers/i18n'
import _createInput from './create_input'
import { interact } from 'uni-mixins'

const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

let videoInput = null

export function chooseVideo ({
  sourceType,
  extension
}, callbackId) {
  if (videoInput) {
    document.body.removeChild(videoInput)
    videoInput = null
  }

  videoInput = _createInput({
    sourceType: sourceType,
    extension,
    type: 'video'
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

  if (!interact.getStatus()) {
    console.warn(`${t('uni.chooseFile.notUserActivation')}`)
  }
}

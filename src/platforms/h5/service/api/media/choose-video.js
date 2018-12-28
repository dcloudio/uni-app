import { fileToUrl } from 'uni-platform/helpers/file'

const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

let videoInput = null

const _createInput = function (options) {
  let inputEl = document.createElement('input')
  inputEl.type = 'file'
  inputEl.style = 'position: absolute;visibility: hidden;z-index: -999;width: 0;height: 0;'
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
    const filePath = fileToUrl(file)

    invoke(callbackId, {
      errMsg: 'chooseVideo:ok',
      tempFilePath: filePath,
      size: file.size
    })

    // TODO 用户取消选择时，触发 fail，目前尚未找到合适的方法。
  })

  videoInput.click()
}

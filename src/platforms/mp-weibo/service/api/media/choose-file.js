import { fileToUrl } from 'uni-platform/helpers/file'
import { t } from 'uni-core/helpers/i18n'
import _createInput from './create_input'
import { interact } from 'uni-mixins'

const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

let fileInput = null

export function chooseFile ({
  // sizeType,
  count,
  sourceType,
  type,
  extension
}, callbackId) {
  // TODO handle sizeType 尝试通过 canvas 压缩

  if (fileInput) {
    document.body.removeChild(fileInput)
    fileInput = null
  }

  fileInput = _createInput({
    count,
    sourceType,
    type,
    extension
  })
  document.body.appendChild(fileInput)

  fileInput.addEventListener('change', function (event) {
    const tempFiles = []
    const fileCount = event.target.files.length
    for (let i = 0; i < fileCount; i++) {
      const file = event.target.files[i]
      let filePath
      Object.defineProperty(file, 'path', {
        get () {
          filePath = filePath || fileToUrl(file)
          return filePath
        }
      })
      if (i < count) tempFiles.push(file)
    }
    const res = {
      errMsg: 'chooseFile:ok',
      get tempFilePaths () {
        return tempFiles.map(({ path }) => path)
      },
      tempFiles: tempFiles
    }
    invoke(callbackId, res)

    // TODO 用户取消选择时，触发 fail，目前尚未找到合适的方法。
  })

  fileInput.click()

  if (!interact.getStatus()) {
    console.warn(`${t('uni.chooseFile.notUserActivation')}`)
  }
}

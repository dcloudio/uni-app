//#region functions
import {
  API_CHOOSE_IMAGE,
  ChooseImageOptions,
  ChooseImageProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { fileToUrl } from '../../../helpers/file'
import _createInput from './createInput'
import { getInteractStatus } from '@dcloudio/uni-components'
import { initI18nChooseFileMsgsOnce, useI18n } from '@dcloudio/uni-core'
//#endregion

//#region types
import type { API_TYPE_CHOOSE_IMAGE } from '@dcloudio/uni-api'
type CallBackResult = AsyncApiRes<AsyncApiOptions<API_TYPE_CHOOSE_IMAGE>>
type TempFile = UniApp.ChooseImageSuccessCallbackResultFile
//#endregion

let imageInput: HTMLInputElement = null as any

export const chooseImage = defineAsyncApi<API_TYPE_CHOOSE_IMAGE>(
  API_CHOOSE_IMAGE,
  (
    {
      count,
      // sizeType,
      sourceType,
      extension,
    },
    { resolve, reject }
  ) => {
    // TODO handle sizeType 尝试通过 canvas 压缩
    initI18nChooseFileMsgsOnce()
    const { t } = useI18n()

    if (imageInput) {
      document.body.removeChild(imageInput)
      imageInput = null as any
    }
    imageInput = _createInput({
      count,
      sourceType,
      extension,
      type: 'image',
    })
    document.body.appendChild(imageInput)

    imageInput.addEventListener('cancel', () => {
      reject('chooseImage:fail cancel')
    })

    imageInput.addEventListener('change', function (event) {
      const eventTarget = event.target as HTMLInputElement

      const tempFiles: TempFile[] = []

      if (eventTarget && eventTarget.files) {
        const fileCount = eventTarget.files.length
        for (let i = 0; i < fileCount; i++) {
          const file = eventTarget.files[i]
          let filePath: string

          Object.defineProperty(file, 'path', {
            get() {
              filePath = filePath || fileToUrl(file)
              return filePath
            },
          })
          if (i < count!) tempFiles.push(file as any)
        }
      }

      const res: CallBackResult = {
        get tempFilePaths() {
          return tempFiles.map(({ path }) => path)
        },
        tempFiles: tempFiles,
      }

      resolve(res)

      // TODO 用户取消选择时，触发 fail，目前尚未找到合适的方法。
    })

    imageInput.click()

    if (!getInteractStatus()) {
      console.warn(t('uni.chooseFile.notUserActivation'))
    }
  },
  ChooseImageProtocol,
  ChooseImageOptions
)

//#region imp functions
import {
  API_CHOOSE_FILE,
  ChooseFileOptions,
  ChooseFileProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { fileToUrl } from '../../../helpers/file'
import _createInput from './createInput'
import { getInteractStatus } from '@dcloudio/uni-components'
import { initI18nChooseFileMsgsOnce, useI18n } from '@dcloudio/uni-core'
//#endregion

//#region types
import type { API_TYPE_CHOOSE_FILE } from '@dcloudio/uni-api'
type CallBackResultType = AsyncApiRes<AsyncApiOptions<API_TYPE_CHOOSE_FILE>>
type TempFile = UniApp.ChooseFileSuccessCallbackResultFile
//#endregion

let fileInput: HTMLInputElement = null as any

export const chooseFile = defineAsyncApi<API_TYPE_CHOOSE_FILE>(
  API_CHOOSE_FILE,
  (
    {
      // sizeType,
      count,
      sourceType,
      type,
      extension,
    },
    { resolve, reject }
  ) => {
    initI18nChooseFileMsgsOnce()
    const { t } = useI18n()
    // TODO handle sizeType 尝试通过 canvas 压缩
    if (fileInput) {
      document.body.removeChild(fileInput)
      fileInput = null as any
    }

    fileInput = _createInput({
      count,
      sourceType,
      type,
      extension,
    })
    document.body.appendChild(fileInput)

    fileInput.addEventListener('cancel', () => {
      reject('chooseFile:fail cancel')
    })

    fileInput.addEventListener('change', function (event: Event) {
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

      const res: CallBackResultType = {
        get tempFilePaths() {
          return tempFiles.map(({ path }) => path)
        },
        tempFiles: tempFiles,
      }

      resolve(res)

      // TODO 用户取消选择时，触发 fail，目前尚未找到合适的方法。
    })

    fileInput.click()

    if (!getInteractStatus()) {
      console.warn(t('uni.chooseFile.notUserActivation'))
    }
  },
  ChooseFileProtocol,
  ChooseFileOptions
)

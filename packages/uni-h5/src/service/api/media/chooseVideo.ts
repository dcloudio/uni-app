//#region functions
import { extend } from '@vue/shared'
import {
  API_CHOOSE_VIDEO,
  ChooseVideoOptions,
  ChooseVideoProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { fileToUrl, revokeObjectURL } from '../../../helpers/file'
import _createInput from './createInput'
import { getInteractStatus } from '@dcloudio/uni-components'
import { initI18nChooseFileMsgsOnce, useI18n } from '@dcloudio/uni-core'
//#endregion

//#region types
import type { API_TYPE_CHOOSE_VIDEO } from '@dcloudio/uni-api'
type CallBackResult = AsyncApiRes<AsyncApiOptions<API_TYPE_CHOOSE_VIDEO>>
//#endregion

let videoInput: HTMLInputElement = null as any

export const chooseVideo = defineAsyncApi<API_TYPE_CHOOSE_VIDEO>(
  API_CHOOSE_VIDEO,
  ({ sourceType, extension }, { resolve, reject }) => {
    initI18nChooseFileMsgsOnce()
    const { t } = useI18n()
    if (videoInput) {
      document.body.removeChild(videoInput)
      videoInput = null as any
    }

    videoInput = _createInput({
      sourceType,
      extension,
      type: 'video',
    })
    document.body.appendChild(videoInput)

    videoInput.addEventListener('cancel', () => {
      reject('chooseVideo:fail cancel')
    })

    videoInput.addEventListener('change', function (event) {
      const eventTarget = event.target as HTMLInputElement

      const file = eventTarget.files![0]
      let filePath: string = ''
      const callbackResult: CallBackResult = {
        tempFilePath: filePath,
        tempFile: file,
        size: file.size,
        duration: 0,
        width: 0,
        height: 0,
        name: file.name,
      }
      Object.defineProperty(callbackResult, 'tempFilePath', {
        get() {
          filePath = filePath || fileToUrl(this.tempFile)
          return filePath
        },
      })

      const video = document.createElement('video')
      if (video.onloadedmetadata !== undefined) {
        const filePath = fileToUrl(file)
        // 尝试获取视频的宽高信息
        video.onloadedmetadata = function () {
          revokeObjectURL(filePath)
          resolve(
            extend(callbackResult, {
              duration: video.duration || 0,
              width: video.videoWidth || 0,
              height: video.videoHeight || 0,
            })
          )
        }
        // 部分浏览器（如微信内置浏览器）未播放无法触发loadedmetadata事件
        setTimeout(() => {
          video.onloadedmetadata = null
          revokeObjectURL(filePath)
          resolve(callbackResult)
        }, 300)
        video.src = filePath
      } else {
        resolve(callbackResult)
      }
      // TODO 用户取消选择时，触发 fail，目前尚未找到合适的方法。
    })

    videoInput.click()

    if (!getInteractStatus()) {
      console.warn(t('uni.chooseFile.notUserActivation'))
    }
  },
  ChooseVideoProtocol,
  ChooseVideoOptions
)

import { TEMP_PATH } from '../constants'
import { warpPlusErrorCallback } from '../../../helpers/plus'
import { getFileName } from '../../../helpers/file'
import { initI18nChooseVideoMsgsOnce, useI18n } from '@dcloudio/uni-core'
import {
  API_TYPE_CHOOSE_VIDEO,
  API_CHOOSE_VIDEO,
  ChooseVideoOptions,
  ChooseVideoProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

export const chooseVideo = defineAsyncApi<API_TYPE_CHOOSE_VIDEO>(
  API_CHOOSE_VIDEO,
  ({ sourceType, compressed, maxDuration, camera }, { resolve, reject }) => {
    initI18nChooseVideoMsgsOnce()
    const { t } = useI18n()
    const errorCallback = warpPlusErrorCallback(reject)

    function successCallback(tempFilePath: string = '') {
      const filename = `${TEMP_PATH}/compressed/${Date.now()}_${getFileName(
        tempFilePath
      )}`
      const compressVideo: Promise<string> = compressed
        ? new Promise((resolve) => {
            plus.zip.compressVideo(
              {
                src: tempFilePath,
                filename,
                quality: 'medium',
              },
              ({ tempFilePath }: { tempFilePath: string }) => {
                resolve(tempFilePath)
              },
              () => {
                resolve(tempFilePath)
              }
            )
          })
        : Promise.resolve(tempFilePath)
      if (compressed) {
        plus.nativeUI.showWaiting()
      }
      compressVideo.then((tempFilePath: string) => {
        if (compressed) {
          plus.nativeUI.closeWaiting()
        }
        plus.io.getVideoInfo({
          filePath: tempFilePath,
          success(videoInfo) {
            const result = {
              errMsg: 'chooseVideo:ok',
              tempFilePath: tempFilePath,
              size: videoInfo.size,
              duration: videoInfo.duration,
              width: videoInfo.width,
              height: videoInfo.height,
            }
            resolve(result as any)
          },
          fail: errorCallback,
        })
      })
    }

    function openAlbum() {
      plus.gallery.pick(
        // NOTE 5+此API分单选和多选，多选返回files:string[]
        // @ts-ignore
        ({ files }) => successCallback(files[0]),
        errorCallback,
        {
          filter: 'video',
          system: false,
          // 不启用 multiple 时 system 无效
          multiple: true,
          maximum: 1,
          filename: TEMP_PATH + '/gallery/',
          permissionAlert: true,
        }
      )
    }

    function openCamera() {
      const plusCamera = plus.camera.getCamera()
      plusCamera.startVideoCapture(successCallback, errorCallback, {
        index: camera === 'front' ? '2' : '1',
        videoMaximumDuration: maxDuration,
        filename: TEMP_PATH + '/camera/',
      })
    }

    if (sourceType!.length === 1) {
      if (sourceType!.includes('album')) {
        openAlbum()
        return
      } else if (sourceType!.includes('camera')) {
        openCamera()
        return
      }
    }

    plus.nativeUI.actionSheet(
      {
        cancel: t('uni.chooseVideo.cancel'),
        buttons: [
          {
            title: t('uni.chooseVideo.sourceType.camera'),
          },
          {
            title: t('uni.chooseVideo.sourceType.album'),
          },
        ],
      },
      (e) => {
        switch (e.index) {
          case 1:
            openCamera()
            break
          case 2:
            openAlbum()
            break
          default:
            errorCallback()
            break
        }
      }
    )
  },
  ChooseVideoProtocol,
  ChooseVideoOptions
)

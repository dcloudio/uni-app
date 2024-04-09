import { TEMP_PATH } from '../constants'
import { warpPlusErrorCallback } from '../../../helpers/plus'
import { initI18nChooseVideoMsgsOnce, useI18n } from '@dcloudio/uni-core'
import {
  API_CHOOSE_VIDEO,
  type API_TYPE_CHOOSE_VIDEO,
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

    function successCallback(tempFilePath: string) {
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
          // @ts-expect-error tempFile、name 仅H5支持
          resolve(result)
        },
        fail: errorCallback,
      })
    }

    function openAlbum() {
      plus.gallery.pick(
        // @ts-expect-error 5+此API分单选和多选，多选返回files:string[]
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
          // @ts-expect-error 新增参数，用于视频压缩
          videoCompress: compressed,
        }
      )
    }

    function openCamera() {
      const plusCamera = plus.camera.getCamera()
      plusCamera.startVideoCapture(successCallback, errorCallback, {
        index: camera === 'front' ? '2' : '1',
        videoMaximumDuration: maxDuration,
        filename: TEMP_PATH + '/camera/',
        // @ts-expect-error 新增参数，用于视频压缩
        videoCompress: compressed,
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

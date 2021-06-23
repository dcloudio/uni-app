import { TEMP_PATH } from '../constants'
import { warpPlusErrorCallback } from '../../../helpers/plus'
import { getFileName } from '../../../helpers/file'
import {
  API_TYPE_CHOOSE_IMAGE,
  API_CHOOSE_IMAGE,
  ChooseImageProtocol,
  ChooseImageOptions,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { initI18nChooseImageMsgsOnce, useI18n } from '@dcloudio/uni-core'

/**
 * 获取文件信息
 * @param {string} filePath 文件路径
 * @returns {Promise} 文件信息Promise
 */
function getFileInfo(filePath: string): Promise<PlusIoMetadata> {
  return new Promise((resolve, reject) => {
    plus.io.resolveLocalFileSystemURL(
      filePath,
      function (entry) {
        entry.getMetadata(resolve, reject, false)
      },
      reject
    )
  })
}

function compressImage(tempFilePath: string): Promise<string> {
  const dst = `${TEMP_PATH}/compressed/${Date.now()}_${getFileName(
    tempFilePath
  )}`
  return new Promise((resolve) => {
    plus.nativeUI.showWaiting()
    plus.zip.compressImage(
      {
        src: tempFilePath,
        dst,
        overwrite: true,
      },
      () => {
        plus.nativeUI.closeWaiting()
        resolve(dst)
      },
      () => {
        plus.nativeUI.closeWaiting()
        resolve(tempFilePath)
      }
    )
  })
}

type File = {
  path: string
  size: number
}

export const chooseImage = defineAsyncApi<API_TYPE_CHOOSE_IMAGE>(
  API_CHOOSE_IMAGE,
  // @ts-ignore crop 属性App特有
  ({ count, sizeType, sourceType, crop } = {}, { resolve, reject }) => {
    initI18nChooseImageMsgsOnce()
    const { t } = useI18n()
    const errorCallback = warpPlusErrorCallback(reject)

    function successCallback(paths: string[]) {
      const tempFiles: File[] = []
      const tempFilePaths: string[] = []
      // plus.zip.compressImage 压缩文件并发调用在iOS端容易出现问题（图像错误、闪退），改为队列执行
      paths
        .reduce((promise, path) => {
          return promise
            .then(() => {
              return getFileInfo(path)
            })
            .then((fileInfo) => {
              const size = fileInfo.size!
              // 压缩阈值 0.5 兆
              const THRESHOLD = 1024 * 1024 * 0.5
              // 判断是否需要压缩
              if (
                !crop &&
                sizeType!.includes('compressed') &&
                size > THRESHOLD
              ) {
                return compressImage(path).then((dstPath) => {
                  path = dstPath
                  return getFileInfo(path)
                })
              }
              return fileInfo
            })
            .then(({ size }) => {
              tempFilePaths.push(path)
              tempFiles.push({
                path,
                size: size!,
              })
            })
        }, Promise.resolve())
        .then(() => {
          resolve({
            tempFilePaths,
            tempFiles,
          })
        })
        .catch(errorCallback)
    }

    function openCamera() {
      const camera = plus.camera.getCamera()
      camera.captureImage((path) => successCallback([path]), errorCallback, {
        filename: TEMP_PATH + '/camera/',
        resolution: 'high',
        crop,
      })
    }

    function openAlbum() {
      // NOTE 5+此API分单选和多选，多选返回files:string[]
      // @ts-ignore
      plus.gallery.pick(({ files }) => successCallback(files), errorCallback, {
        maximum: count,
        multiple: true,
        system: false,
        filename: TEMP_PATH + '/gallery/',
        permissionAlert: true,
        crop,
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
        cancel: t('uni.chooseImage.cancel'),
        buttons: [
          {
            title: t('uni.chooseImage.sourceType.camera'),
          },
          {
            title: t('uni.chooseImage.sourceType.album'),
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
  ChooseImageProtocol,
  ChooseImageOptions
)

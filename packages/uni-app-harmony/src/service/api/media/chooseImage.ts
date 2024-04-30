import picker from '@ohos.file.picker'
import fs from '@ohos.file.fs'
import promptAction from '@ohos.promptAction'
import type { BusinessError } from '@ohos.base'
import {
  API_CHOOSE_IMAGE,
  type API_TYPE_CHOOSE_IMAGE,
  ChooseImageOptions,
  ChooseImageProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { initI18nChooseImageMsgsOnce, useI18n } from '@dcloudio/uni-core'

async function openAlbum(
  count: number = 9
): Promise<UniApp.ChooseImageSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    try {
      const photoSelectOptions = new picker.PhotoSelectOptions()
      photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE
      photoSelectOptions.maxSelectNumber = count
      const photoPicker = new picker.PhotoViewPicker()
      photoPicker
        .select(photoSelectOptions)
        .then((photoSelectResult: picker.PhotoSelectResult) => {
          resolve({
            tempFilePaths: photoSelectResult.photoUris,
            tempFiles: photoSelectResult.photoUris.map((uri) => {
              const file = fs.openSync(uri, fs.OpenMode.READ_ONLY)
              const stat = fs.statSync(file.fd)
              fs.closeSync(file)
              return {
                path: uri,
                size: stat.size,
              }
            }),
          })
          console.info(
            'PhotoViewPicker.select successfully, PhotoSelectResult uri: ' +
              JSON.stringify(photoSelectResult)
          )
        })
        .catch((error: BusinessError) => {
          console.error(
            'PhotoViewPicker.select failed with err: ' + JSON.stringify(error)
          )
          reject(error)
        })
    } catch (error) {
      reject(error as Error)
    }
  })
}

async function openCamera(): Promise<UniApp.ChooseImageSuccessCallbackResult> {
  return {
    tempFilePaths: [],
    tempFiles: [],
  }
}

async function chooseSourceType(): Promise<string> {
  initI18nChooseImageMsgsOnce()
  const { t } = useI18n()
  return new Promise((resolve, reject) => {
    try {
      promptAction.showActionMenu(
        {
          title: '',
          buttons: [
            {
              text: t('uni.chooseImage.sourceType.camera'),
              color: '#000000',
            },
            {
              text: t('uni.chooseImage.sourceType.album'),
              color: '#000000',
            },
          ],
        },
        (err, data) => {
          if (err) {
            console.info(
              `showActionMenu fail callback, error code: ${err.code}, error message: ${err.message}`
            )
            reject(err)
          }
          console.info(
            'showActionMenu success callback, click button: ' + data.index
          )
          switch (data.index) {
            case 0:
              resolve('camera')
              return
            case 1:
              resolve('album')
              return
            default:
              break
          }
        }
      )
    } catch (error) {
      reject(error as Error)
    }
  })
}

export const chooseImage: API_TYPE_CHOOSE_IMAGE =
  defineAsyncApi<API_TYPE_CHOOSE_IMAGE>(
    API_CHOOSE_IMAGE,
    function ({ count, sourceType } = {}, { resolve, reject }) {
      return Promise.resolve()
        .then(async () => {
          let realSourceType: string = ''
          if (sourceType && sourceType.length === 1) {
            if (sourceType!.includes('album')) {
              realSourceType = 'album'
            } else if (sourceType!.includes('camera')) {
              realSourceType = 'camera'
            }
          }
          if (!realSourceType) {
            realSourceType = await chooseSourceType()
          }
          switch (realSourceType) {
            case 'album':
              return openAlbum(count)
            case 'camera':
              return openCamera()
            default:
              break
          }
        })
        .then(resolve)
        .catch(reject)
    },
    ChooseImageProtocol,
    ChooseImageOptions
  )

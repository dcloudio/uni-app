import picker from '@ohos.file.picker'
import { _chooseMedia } from './media'
import {
  API_CHOOSE_IMAGE,
  type API_TYPE_CHOOSE_IMAGE,
  ChooseImageOptions,
  ChooseImageProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

export const chooseImage: API_TYPE_CHOOSE_IMAGE =
  defineAsyncApi<API_TYPE_CHOOSE_IMAGE>(
    API_CHOOSE_IMAGE,
    function ({ count } = {}, { resolve, reject }) {
      _chooseMedia({
        mimeType: picker.PhotoViewMIMETypes.IMAGE_TYPE,
        count,
      })
        .then((res) => {
          return {
            tempFilePaths: res.tempFiles.map((file) => file.tempFilePath),
            tempFiles: res.tempFiles.map((file) => {
              return {
                path: file.tempFilePath,
                size: file.size,
              }
            }),
          }
        })
        .then(resolve, reject)
    },
    ChooseImageProtocol,
    ChooseImageOptions
  )

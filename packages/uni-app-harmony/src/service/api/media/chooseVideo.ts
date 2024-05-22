import picker from '@ohos.file.picker'
import { _chooseMedia } from './media'
import {
  API_CHOOSE_VIDEO,
  type API_TYPE_CHOOSE_VIDEO,
  ChooseVideoOptions,
  ChooseVideoProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

export const chooseVideo: API_TYPE_CHOOSE_VIDEO =
  defineAsyncApi<API_TYPE_CHOOSE_VIDEO>(
    API_CHOOSE_VIDEO,
    function ({} = {}, { resolve, reject }) {
      _chooseMedia({
        mimeType: picker.PhotoViewMIMETypes.VIDEO_TYPE,
      })
        .then((res) => {
          const file = res.tempFiles[0]
          return {
            tempFilePath: file.tempFilePath,
            duration: file.duration,
            size: file.size,
            width: file.width,
            height: file.height,
          }
        })
        // TODO 修正chooseVideo的类型
        // @ts-expect-error tempFile、name 仅H5支持
        .then(resolve, reject)
    },
    ChooseVideoProtocol,
    ChooseVideoOptions
  )

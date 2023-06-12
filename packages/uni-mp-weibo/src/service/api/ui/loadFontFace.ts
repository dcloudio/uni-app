import {
  API_LOAD_FONT_FACE,
  API_TYPE_LOAD_FONT_FACE,
  defineAsyncApi,
  LoadFontFaceProtocol,
} from '@dcloudio/uni-api'
import { addFont } from '@dcloudio/uni-shared'

export const loadFontFace = defineAsyncApi<API_TYPE_LOAD_FONT_FACE>(
  API_LOAD_FONT_FACE,
  ({ family, source, desc }, { resolve, reject }) => {
    addFont(family, source, desc)
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject(`loadFontFace:fail ${err}`)
      })
  },
  LoadFontFaceProtocol
)

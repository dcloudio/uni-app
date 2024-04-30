import {
  API_LOAD_FONT_FACE,
  type API_TYPE_LOAD_FONT_FACE,
  LoadFontFaceProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getRealPath } from '@dcloudio/uni-platform'
import { addFont } from '@dcloudio/uni-shared'

export const loadFontFace = defineAsyncApi<API_TYPE_LOAD_FONT_FACE>(
  API_LOAD_FONT_FACE,
  ({ family, source, desc }, { resolve, reject }) => {
    if (source.startsWith(`url("`) || source.startsWith(`url('`)) {
      source = `url('${getRealPath(source.substring(5, source.length - 2))}')`
    } else if (source.startsWith('url(')) {
      source = `url('${getRealPath(source.substring(4, source.length - 1))}')`
    } else {
      source = getRealPath(source)
    }
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

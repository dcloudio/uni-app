import { extend } from '@vue/shared'
import { nextTick, reactive } from 'vue'
import {
  API_PREVIEW_IMAGE,
  API_TYPE_PREVIEW_IMAGE,
  defineAsyncApi,
  PreviewImageProtocol,
  PreviewImageOptions,
} from '@dcloudio/uni-api'
import { ensureRoot, createRootApp } from '../../ui/popup/utils'
import ImagePreview, { Props } from './ImagePreview'

let state: Props | null = null

export const previewImage = <API_TYPE_PREVIEW_IMAGE>defineAsyncApi(
  API_PREVIEW_IMAGE,
  (args, { resolve }) => {
    if (!state) {
      state = reactive(args) as Props
      // 异步执行，避免干扰 getCurrentInstance
      nextTick(() => {
        const app = createRootApp(ImagePreview, state as Props, () => {
          state = null
          nextTick(() => {
            app.unmount()
          })
        })
        app.mount(ensureRoot('u-a-p'))
      })
    } else {
      extend(state, args)
    }
    resolve()
  },
  PreviewImageProtocol,
  PreviewImageOptions
)

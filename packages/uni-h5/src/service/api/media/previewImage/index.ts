import { extend } from '@vue/shared'
import { nextTick, reactive } from 'vue'
import {
  API_CLOSE_PREVIEW_IMAGE,
  API_PREVIEW_IMAGE,
  type API_TYPE_CLOSE_PREVIEW_IMAGE,
  type API_TYPE_PREVIEW_IMAGE,
  PreviewImageOptions,
  PreviewImageProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { createRootApp, ensureRoot } from '../../ui/popup/utils'
import ImagePreview, { type Props } from './ImagePreview'

let state: Props | null = null
let imagePreviewInstance: ReturnType<typeof createRootApp> | null

const closePreviewImageView = () => {
  state = null
  nextTick(() => {
    imagePreviewInstance?.unmount()
    imagePreviewInstance = null
    const rootEl = document.getElementById('u-a-p')
    rootEl && document.body.removeChild(rootEl)
  })
}

export const previewImage = defineAsyncApi<API_TYPE_PREVIEW_IMAGE>(
  API_PREVIEW_IMAGE,
  (args, { resolve }) => {
    if (!state) {
      state = reactive(args) as Props
      // 异步执行，避免干扰 getCurrentInstance
      nextTick(() => {
        imagePreviewInstance = createRootApp(
          ImagePreview,
          state as Props,
          closePreviewImageView
        )
        imagePreviewInstance.mount(ensureRoot('u-a-p'))
      })
    } else {
      extend(state, args)
    }
    resolve()
  },
  PreviewImageProtocol,
  PreviewImageOptions
)

export const closePreviewImage = defineAsyncApi<API_TYPE_CLOSE_PREVIEW_IMAGE>(
  API_CLOSE_PREVIEW_IMAGE,
  (_, { resolve, reject }) => {
    if (imagePreviewInstance) {
      closePreviewImageView()
      resolve()
    } else {
      reject()
    }
  }
)

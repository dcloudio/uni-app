import { once } from '@dcloudio/uni-shared'
import UniPreviewImagePage from '@/uni_modules/uni-previewImage/pages/previewImage/previewImage.vue'
import {
  closePreviewImage as closePreviewImageApi,
  previewImage as previewImageApi,
  // @ts-expect-error
} from '@/uni_modules/uni-previewImage'
import {
  API_PREVIEW_IMAGE,
  type API_TYPE_PREVIEW_IMAGE,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { registerSystemRoute } from '../../../framework/route'
import { extend } from '@vue/shared'

const registerPreviewImageOnce = /* @__PURE__ */ once(() => {
  registerSystemRoute('uni:previewImage', UniPreviewImagePage)
})

export const closePreviewImage = () => {
  registerPreviewImageOnce()
  closePreviewImageApi()
}

export const previewImage = defineAsyncApi<API_TYPE_PREVIEW_IMAGE>(
  API_PREVIEW_IMAGE,
  (args, { resolve, reject }) => {
    registerPreviewImageOnce()
    previewImageApi(
      // 拷贝参数，避免 defineAsyncApi 处理 args 影响传入参数
      extend(
        {
          success: (res) => {
            resolve(res)
          },
          fail: (err) => {
            reject(err)
          },
        },
        args
      )
    )
  }
)

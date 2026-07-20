import { once } from '@dcloudio/uni-shared'
import UniPreviewImagePage from '@/uni_modules/uni-previewImage/pages/previewImage/previewImage.vue'
import UniPreviewImageNonVapor from '@/uni_modules/uni-previewImage/components/uni-previewImageNonVapor/uni-previewImageNonVapor.vue'
import UniPreviewImageItem from '@/uni_modules/uni-previewImage/components/uni-previewImageItem/uni-previewImageItem.vue'
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
import { extend, isArray } from '@vue/shared'

type ComponentWithStyles = {
  styles?: string[]
}

function mergeComponentStyles(
  page: ComponentWithStyles,
  components: ComponentWithStyles[]
) {
  const styles = isArray(page.styles) ? [...page.styles] : []
  components.forEach((component) => {
    if (isArray(component.styles)) {
      styles.push(...component.styles)
    }
  })
  page.styles = styles
}

const registerPreviewImageOnce = /* @__PURE__ */ once(() => {
  // dist-x 会把每个 SFC 的 CSS 挂到各自的 styles 上，而系统页面注册只处理根组件样式。
  // script setup 的局部组件保存在渲染函数闭包中，注册时无法遍历，因此需要显式合并两层子组件样式。
  mergeComponentStyles(
    UniPreviewImagePage as ComponentWithStyles,
    [UniPreviewImageNonVapor, UniPreviewImageItem] as ComponentWithStyles[]
  )
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

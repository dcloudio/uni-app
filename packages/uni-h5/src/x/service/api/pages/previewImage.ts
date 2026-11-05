import { once } from '@dcloudio/uni-shared'
import UniPreviewImagePage from '@/uni_modules/uni-previewImage/pages/previewImage/previewImage.vue'
//#if !_X_VAPOR_
import UniPreviewImageNonVapor from '@/uni_modules/uni-previewImage/components/uni-previewImageNonVapor/uni-previewImageNonVapor.vue'
//#endif
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
  // 每个 SFC 的 CSS 挂在各自的 styles 上，系统路由仅安装页面样式，需显式合并子组件样式。
  // Vapor 模板不使用 NonVapor 子组件，编译时排除其导入和样式，避免保留整套旧实现。
  mergeComponentStyles(
    UniPreviewImagePage as ComponentWithStyles,
    [
      //#if !_X_VAPOR_
      UniPreviewImageNonVapor,
      //#endif
      UniPreviewImageItem,
    ] as ComponentWithStyles[]
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

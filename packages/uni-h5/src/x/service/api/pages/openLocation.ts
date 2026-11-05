import { once } from '@dcloudio/uni-shared'
import UniOpenLocationPage from '@/uni_modules/uni-openLocation/pages/openLocation/openLocation.vue'
import UniBackArrowCircle from '@/uni_modules/uni-openLocation/pages/openLocation/uni-back-arrow-circle.vue'
import {
  openLocation as openLocationApi,
  // @ts-expect-error
} from '@/uni_modules/uni-openLocation'
import {
  API_OPEN_LOCATION,
  type API_TYPE_OPEN_LOCATION,
  OpenLocationOptions,
  OpenLocationProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { registerSystemRoute } from '../../../framework/route'
import { extend } from '@vue/shared'

const registerOpenLocationOnce = /* @__PURE__ */ once(() => {
  // SFC 样式各自挂在组件的 styles 上，系统路由仅安装页面样式。
  // 首次注册时合并返回箭头的样式，避免漏载；重复调用 openLocation 不重复合并。
  const page = UniOpenLocationPage as { styles?: string[] }
  const backArrow = UniBackArrowCircle as { styles?: string[] }
  page.styles = [...(page.styles || []), ...(backArrow.styles || [])]
  registerSystemRoute('uni:openLocation', UniOpenLocationPage)
})

export const openLocation = defineAsyncApi<API_TYPE_OPEN_LOCATION>(
  API_OPEN_LOCATION,
  (args, { resolve, reject }) => {
    registerOpenLocationOnce()
    openLocationApi(
      extend({}, args, {
        success: (res) => resolve(res),
        fail: (err) => reject(err.errMsg, err),
      })
    )
  },
  OpenLocationProtocol,
  OpenLocationOptions
)

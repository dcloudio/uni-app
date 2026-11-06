import Picker from '@dcloudio/uni-ext-component/uni-form/components/picker/picker.uvue'
import UniPickerPage from '@/uni_modules/uni-form/pages/picker/picker.vue'
import { once } from '@dcloudio/uni-shared'
import { extend } from '@vue/shared'
import { registerSystemRoute } from '../../framework/route'

const registerPickerOnce = /* @__PURE__ */ once(() => {
  registerSystemRoute('uni:picker', UniPickerPage)
})

// 页面依赖跟随框架 Picker，避免 showModal 等调用 openDialogPage 时也带入 Picker。
// 首个实例 setup 时注册，早于点击打开；不增加组件层级，也不改共用源码及非 Vapor 入口。
// 纯初始化让未使用 Picker 的项目可以连同页面依赖一起裁剪。
export default /* @__PURE__ */ extend({}, Picker, {
  setup: ((props, context) => {
    registerPickerOnce()
    return Picker.setup!(props, context)
  }) as typeof Picker.setup,
})

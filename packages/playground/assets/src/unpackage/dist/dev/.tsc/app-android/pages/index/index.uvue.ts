
import invalidStatic from './static/pages-index-static_invalid-static.jpg'
import logo from '../../static/static_logo.png'
const __sfc__ = defineComponent({
    data() {
        return {
            invalidStatic,
            logo
        }
    }
})

export default __sfc__
function GenPagesIndexIndexRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_navigator = resolveComponent("navigator")
const _component_test_com = resolveEasyComponent("test-com",_easycom_test_com)

  return createElementVNode("scroll-view", utsMapOf({ direction: "vertical" }), [
    createVNode(_component_navigator, utsMapOf({ url: "/pages/sub/test/test" }), utsMapOf({
      default: withSlotCtx((): any[] => ["test"]),
      _: 1 /* STABLE */
    })),
    createVNode(_component_test_com),
    createElementVNode("view", null, [
      createElementVNode("view", null, "3:" + toDisplayString(_ctx.invalidStatic), 1 /* TEXT */),
      createElementVNode("image", utsMapOf({
        style: normalizeStyle(utsMapOf({"width":"50px","height":"50px"})),
        src: _imports_0
      }), null, 4 /* STYLE */)
    ]),
    createElementVNode("view", null, [
      createElementVNode("view", null, "4:" + toDisplayString(_ctx.logo), 1 /* TEXT */),
      createElementVNode("image", utsMapOf({
        style: normalizeStyle(utsMapOf({"width":"50px","height":"50px"})),
        src: _imports_1
      }), null, 4 /* STYLE */)
    ])
  ])
}
const GenPagesIndexIndexStyles = []

import _easycom_test_com from '@/uni_modules/test-com/components/test-com/test-com.vue'
import _imports_0 from './static/pages-index-static_invalid-static.jpg'
import _imports_1 from '../../static/static_logo.png'

import shuijiao from '../../static/uni_modules-test-com-static_shuijiao.jpg';
import logo from '../../static/uni_modules-test-com-static_logo.png';
const __sfc__ = defineComponent({
    data() {
        return {
            shuijiao,
            logo
        };
    }
});
export default __sfc__;
function GenUniModulesTestComComponentsTestComTestComRender(this: InstanceType<typeof __sfc__>): any | null {
    const _ctx = this;
    const _cache = this.$.renderCache;
    return createElementVNode("view", null, [
        createElementVNode("view", null, [
            createElementVNode("view", null, "1:" + toDisplayString(_ctx.shuijiao), 1 /* TEXT */),
            createElementVNode("image", utsMapOf({
                style: normalizeStyle(utsMapOf({ "width": "50px", "height": "50px" })),
                src: _imports_0
            }), null, 4 /* STYLE */)
        ]),
        createElementVNode("view", null, [
            createElementVNode("view", null, "2:" + toDisplayString(_ctx.logo), 1 /* TEXT */),
            createElementVNode("image", utsMapOf({
                style: normalizeStyle(utsMapOf({ "width": "50px", "height": "50px" })),
                src: _ctx.logo
            }), null, 12 /* STYLE, PROPS */, ["src"])
        ])
    ]);
}
export type TestComComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesTestComComponentsTestComTestComStyles = [];
import _imports_0 from '../../static/uni_modules-test-com-static_shuijiao.jpg';
//# sourceMappingURL=test-com.vue.map
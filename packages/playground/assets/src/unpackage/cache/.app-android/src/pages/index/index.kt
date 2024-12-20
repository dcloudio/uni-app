@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER")
package uni.UNIXXXXXXX
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.unicloud.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
open class GenPagesIndexIndex : BasePage {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        val _component_navigator = resolveComponent("navigator")
        val _component_test_com = resolveEasyComponent("test-com", GenUniModulesTestComComponentsTestComTestComClass)
        return createElementVNode("scroll-view", utsMapOf("direction" to "vertical"), utsArrayOf(
            createVNode(_component_navigator, utsMapOf("url" to "/pages/sub/test/test"), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                return utsArrayOf(
                    "test"
                )
            }
            ), "_" to 1)),
            createVNode(_component_test_com),
            createElementVNode("view", null, utsArrayOf(
                createElementVNode("view", null, "3:" + toDisplayString(_ctx.invalidStatic), 1),
                createElementVNode("image", utsMapOf("style" to normalizeStyle(utsMapOf("width" to "50px", "height" to "50px")), "src" to `default`), null, 4)
            )),
            createElementVNode("view", null, utsArrayOf(
                createElementVNode("view", null, "4:" + toDisplayString(_ctx.logo), 1),
                createElementVNode("image", utsMapOf("style" to normalizeStyle(utsMapOf("width" to "50px", "height" to "50px")), "src" to default1), null, 4)
            ))
        ))
    }
    open var invalidStatic: Any? by `$data`
    open var logo: Any? by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return utsMapOf("invalidStatic" to `default`, "logo" to default1)
    }
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(), utsArrayOf(
                GenApp.styles
            ))
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}

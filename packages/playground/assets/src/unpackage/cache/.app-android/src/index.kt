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
val runBlock1 = run {
    __uniConfig.getAppStyles = fun(): Map<String, Map<String, Map<String, Any>>> {
        return GenApp.styles
    }
}
open class GenApp : BaseApp {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onLaunch(fun(_: OnLaunchOptions) {}, __ins)
    }
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf())
        }
    }
}
val GenAppClass = CreateVueAppComponent(GenApp::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "app", name = "", inheritAttrs = true, inject = Map(), props = Map(), propsNeedCastKeys = utsArrayOf(), emits = Map(), components = Map(), styles = GenApp.styles)
}
, fun(instance): GenApp {
    return GenApp(instance)
}
)
val `default` = "/assets/pages-index-static_invalid-static.34ae5d3b.jpg"
val default1 = "/static/static_logo.png"
val default2 = "/uni_modules/test-com/static/uni_modules-test-com-static_shuijiao.jpg"
val default3 = "/static/static_logo.png"
val GenUniModulesTestComComponentsTestComTestComClass = CreateVueComponent(GenUniModulesTestComComponentsTestComTestCom::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesTestComComponentsTestComTestCom.inheritAttrs, inject = GenUniModulesTestComComponentsTestComTestCom.inject, props = GenUniModulesTestComComponentsTestComTestCom.props, propsNeedCastKeys = GenUniModulesTestComComponentsTestComTestCom.propsNeedCastKeys, emits = GenUniModulesTestComComponentsTestComTestCom.emits, components = GenUniModulesTestComComponentsTestComTestCom.components, styles = GenUniModulesTestComComponentsTestComTestCom.styles)
}
, fun(instance): GenUniModulesTestComComponentsTestComTestCom {
    return GenUniModulesTestComComponentsTestComTestCom(instance)
}
)
val GenPagesIndexIndexClass = CreateVueComponent(GenPagesIndexIndex::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesIndexIndex.inheritAttrs, inject = GenPagesIndexIndex.inject, props = GenPagesIndexIndex.props, propsNeedCastKeys = GenPagesIndexIndex.propsNeedCastKeys, emits = GenPagesIndexIndex.emits, components = GenPagesIndexIndex.components, styles = GenPagesIndexIndex.styles)
}
, fun(instance): GenPagesIndexIndex {
    return GenPagesIndexIndex(instance)
}
)
val default4 = "/pages/sub/static/pages-sub-static_2.jpg"
val GenPagesSubTestTestClass = CreateVueComponent(GenPagesSubTestTest::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesSubTestTest.inheritAttrs, inject = GenPagesSubTestTest.inject, props = GenPagesSubTestTest.props, propsNeedCastKeys = GenPagesSubTestTest.propsNeedCastKeys, emits = GenPagesSubTestTest.emits, components = GenPagesSubTestTest.components, styles = GenPagesSubTestTest.styles)
}
, fun(instance): GenPagesSubTestTest {
    return GenPagesSubTestTest(instance)
}
)
fun createApp(): UTSJSONObject {
    val app = createSSRApp(GenAppClass)
    return UTSJSONObject(Map<String, Any?>(utsArrayOf(
        utsArrayOf(
            "app",
            app
        )
    )))
}
fun main(app: IApp) {
    definePageRoutes()
    defineAppConfig()
    (createApp()["app"] as VueApp).mount(app, GenUniApp())
}
open class UniAppConfig : io.dcloud.uniapp.appframe.AppConfig {
    override var name: String = "assets"
    override var appid: String = "__UNI__XXXXXXX"
    override var versionName: String = "1.0.0"
    override var versionCode: String = "100"
    override var uniCompilerVersion: String = "4.44"
    constructor() : super() {}
}
fun definePageRoutes() {
    __uniRoutes.push(UniPageRoute(path = "pages/index/index", component = GenPagesIndexIndexClass, meta = UniPageMeta(isQuit = true), style = utsMapOf()))
    __uniRoutes.push(UniPageRoute(path = "pages/sub/test/test", component = GenPagesSubTestTestClass, meta = UniPageMeta(isQuit = false), style = utsMapOf()))
}
val __uniLaunchPage: Map<String, Any?> = utsMapOf("url" to "pages/index/index", "style" to utsMapOf<String, Any?>())
fun defineAppConfig() {
    __uniConfig.entryPagePath = "/pages/index/index"
    __uniConfig.globalStyle = utsMapOf()
    __uniConfig.getTabBarConfig = fun(): Map<String, Any>? {
        return null
    }
    __uniConfig.tabBar = __uniConfig.getTabBarConfig()
    __uniConfig.conditionUrl = ""
    __uniConfig.uniIdRouter = Map()
    __uniConfig.ready = true
}
open class GenUniApp : UniAppImpl() {
    open val vm: GenApp?
        get() {
            return getAppVm() as GenApp?
        }
    open val `$vm`: GenApp?
        get() {
            return getAppVm() as GenApp?
        }
}
fun getApp(): GenUniApp {
    return getUniApp() as GenUniApp
}

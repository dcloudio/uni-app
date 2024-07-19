package uni.UNIXXXXXXX;
import io.dcloud.uniapp.*;
import io.dcloud.uniapp.extapi.*;
import io.dcloud.uniapp.framework.*;
import io.dcloud.uniapp.runtime.*;
import io.dcloud.uniapp.vue.*;
import io.dcloud.uniapp.vue.shared.*;
import io.dcloud.unicloud.*;
import io.dcloud.unicloud.InternalUniCloudConfig;
import io.dcloud.uts.*;
import io.dcloud.uts.Map;
import io.dcloud.uts.Set;
import io.dcloud.uts.UTSAndroid;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
import kotlinx.coroutines.async;
import io.dcloud.uniapp.appframe.AppConfig;
import io.dcloud.uniapp.vue.createSSRApp;
open class GenApp : BaseApp {
    constructor(instance: ComponentInternalInstance) : super(instance) {}
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>>
            get() {
                return normalizeCssStyles(utsArrayOf());
            }
    }
}
val GenAppClass = CreateVueAppComponent(GenApp::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(name = "", inheritAttrs = true, props = Map(), propsNeedCastKeys = utsArrayOf(), emits = Map(), components = Map(), styles = GenApp.styles);
}
, fun(instance): GenApp {
    return GenApp(instance);
}
);
fun test() {
    val arr: UTSArray<Number> = utsArrayOf(
        1
    );
    console.log(arr[1], " at pages/index/test.uts:3");
}
val GenPagesIndexIndexClass = CreateVueComponent(GenPagesIndexIndex::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(name = "", inheritAttrs = true, props = Map(), propsNeedCastKeys = utsArrayOf(), emits = Map(), components = Map(), styles = GenPagesIndexIndex.styles);
}
, fun(instance): GenPagesIndexIndex {
    return GenPagesIndexIndex(instance);
}
);
fun createApp(): UTSJSONObject {
    val app = createSSRApp(GenAppClass);
    return object : UTSJSONObject() {
        var app = app
    };
}
fun main(app: IApp) {
    defineAppConfig();
    definePageRoutes();
    (createApp()["app"] as VueApp).mount(app);
}
open class UniAppConfig : AppConfig {
    override var name: String = "uni-app-x";
    override var appid: String = "__UNI__XXXXXXX";
    override var versionName: String = "1.0.0";
    override var versionCode: String = "100";
    override var singleThread: Boolean = true;
    constructor(){}
}
fun definePageRoutes() {
    __uniRoutes.push(UniPageRoute(path = "pages/index/index", component = GenPagesIndexIndexClass, meta = UniPageMeta(isQuit = true), style = utsMapOf()));
}
val __uniTabBar: Map<String, Any?>? = null;
val __uniLaunchPage: Map<String, Any?> = utsMapOf("url" to "pages/index/index", "style" to utsMapOf<String, Any?>());
@Suppress("UNCHECKED_CAST")
fun defineAppConfig() {
    __uniConfig.entryPagePath = "/pages/index/index";
    __uniConfig.globalStyle = utsMapOf();
    __uniConfig.tabBar = __uniTabBar as Map<String, Any>?;
}
open class UniCloudConfig : InternalUniCloudConfig {
    override var isDev: Boolean = true;
    override var spaceList: String = "[]";
    override var debuggerInfo: String? = "{}";
    override var secureNetworkEnable: Boolean = false;
    override var secureNetworkConfig: String? = "";
    constructor(){}
}
fun getApp(): GenApp {
    return getBaseApp() as GenApp;
}

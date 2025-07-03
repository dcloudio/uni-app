@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNIADA0E20
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
import io.dcloud.uniapp.extapi.connectSocket as uni_connectSocket
import io.dcloud.uniapp.extapi.exit as uni_exit
import io.dcloud.uniapp.extapi.getSystemInfoSync as uni_getSystemInfoSync
import io.dcloud.uniapp.extapi.openDialogPage as uni_openDialogPage
import uts.sdk.modules.utsOpenSchema.openSchema as utsOpenSchema
import io.dcloud.uniapp.extapi.removeStorageSync as uni_removeStorageSync
import io.dcloud.uniapp.extapi.setStorageSync as uni_setStorageSync
import io.dcloud.uniapp.extapi.showToast as uni_showToast
val runBlock1 = run {
    __uniConfig.getAppStyles = fun(): Map<String, Map<String, Map<String, Any>>> {
        return GenApp.styles
    }
}
fun initRuntimeSocket(hosts: String, port: String, id: String): UTSPromise<SocketTask?> {
    if (hosts == "" || port == "" || id == "") {
        return UTSPromise.resolve(null)
    }
    return hosts.split(",").reduce<UTSPromise<SocketTask?>>(fun(promise: UTSPromise<SocketTask?>, host: String): UTSPromise<SocketTask?> {
        return promise.then(fun(socket): UTSPromise<SocketTask?> {
            if (socket != null) {
                return UTSPromise.resolve(socket)
            }
            return tryConnectSocket(host, port, id)
        }
        )
    }
    , UTSPromise.resolve(null))
}
val SOCKET_TIMEOUT: Number = 500
fun tryConnectSocket(host: String, port: String, id: String): UTSPromise<SocketTask?> {
    return UTSPromise(fun(resolve, reject){
        val socket = uni_connectSocket(ConnectSocketOptions(url = "ws://" + host + ":" + port + "/" + id, fail = fun(_) {
            resolve(null)
        }
        ))
        val timer = setTimeout(fun(){
            socket.close(CloseSocketOptions(code = 1006, reason = "connect timeout"))
            resolve(null)
        }
        , SOCKET_TIMEOUT)
        socket.onOpen(fun(e){
            clearTimeout(timer)
            resolve(socket)
        }
        )
        socket.onClose(fun(e){
            clearTimeout(timer)
            resolve(null)
        }
        )
        socket.onError(fun(e){
            clearTimeout(timer)
            resolve(null)
        }
        )
    }
    )
}
fun initRuntimeSocketService(): UTSPromise<Boolean> {
    val hosts: String = "127.0.0.1,192.168.12.153,192.168.31.211"
    val port: String = "8090"
    val id: String = "app-android_GrVXVA"
    if (hosts == "" || port == "" || id == "") {
        return UTSPromise.resolve(false)
    }
    var socketTask: SocketTask? = null
    __registerWebViewUniConsole(fun(): String {
        return "!function(){\"use strict\";\"function\"==typeof SuppressedError&&SuppressedError;var e=[\"log\",\"warn\",\"error\",\"info\",\"debug\"],n=e.reduce((function(e,n){return e[n]=console[n].bind(console),e}),{}),t=null,r=new Set,o={};function i(e){if(null!=t){var n=e.map((function(e){if(\"string\"==typeof e)return e;var n=e&&\"promise\"in e&&\"reason\"in e,t=n?\"UnhandledPromiseRejection: \":\"\";if(n&&(e=e.reason),e instanceof Error&&e.stack)return e.message&&!e.stack.includes(e.message)?\"\".concat(t).concat(e.message,\"\\n\").concat(e.stack):\"\".concat(t).concat(e.stack);if(\"object\"==typeof e&&null!==e)try{return t+JSON.stringify(e)}catch(e){return t+String(e)}return t+String(e)})).filter(Boolean);n.length>0&&t(JSON.stringify(Object.assign({type:\"error\",data:n},o)))}else e.forEach((function(e){r.add(e)}))}function a(e,n){try{return{type:e,args:u(n)}}catch(e){}return{type:e,args:[]}}function u(e){return e.map((function(e){return c(e)}))}function c(e,n){if(void 0===n&&(n=0),n>=7)return{type:\"object\",value:\"[Maximum depth reached]\"};switch(typeof e){case\"string\":return{type:\"string\",value:e};case\"number\":return function(e){return{type:\"number\",value:String(e)}}(e);case\"boolean\":return function(e){return{type:\"boolean\",value:String(e)}}(e);case\"object\":try{return function(e,n){if(null===e)return{type:\"null\"};if(function(e){return e.\$&&s(e.\$)}(e))return function(e,n){return{type:\"object\",className:\"ComponentPublicInstance\",value:{properties:Object.entries(e.\$.type).map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n);if(s(e))return function(e,n){return{type:\"object\",className:\"ComponentInternalInstance\",value:{properties:Object.entries(e.type).map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n);if(function(e){return e.style&&null!=e.tagName&&null!=e.nodeName}(e))return function(e,n){return{type:\"object\",value:{properties:Object.entries(e).filter((function(e){var n=e[0];return[\"id\",\"tagName\",\"nodeName\",\"dataset\",\"offsetTop\",\"offsetLeft\",\"style\"].includes(n)})).map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n);if(function(e){return\"function\"==typeof e.getPropertyValue&&\"function\"==typeof e.setProperty&&e.\$styles}(e))return function(e,n){return{type:\"object\",value:{properties:Object.entries(e.\$styles).map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n);if(Array.isArray(e))return{type:\"object\",subType:\"array\",value:{properties:e.map((function(e,t){return function(e,n,t){var r=c(e,t);return r.name=\"\".concat(n),r}(e,t,n+1)}))}};if(e instanceof Set)return{type:\"object\",subType:\"set\",className:\"Set\",description:\"Set(\".concat(e.size,\")\"),value:{entries:Array.from(e).map((function(e){return function(e,n){return{value:c(e,n)}}(e,n+1)}))}};if(e instanceof Map)return{type:\"object\",subType:\"map\",className:\"Map\",description:\"Map(\".concat(e.size,\")\"),value:{entries:Array.from(e.entries()).map((function(e){return function(e,n){return{key:c(e[0],n),value:c(e[1],n)}}(e,n+1)}))}};if(e instanceof Promise)return{type:\"object\",subType:\"promise\",value:{properties:[]}};if(e instanceof RegExp)return{type:\"object\",subType:\"regexp\",value:String(e),className:\"Regexp\"};if(e instanceof Date)return{type:\"object\",subType:\"date\",value:String(e),className:\"Date\"};if(e instanceof Error)return{type:\"object\",subType:\"error\",value:e.message||String(e),className:e.name||\"Error\"};var t=void 0,r=e.constructor;r&&r.get\$UTSMetadata\$&&(t=r.get\$UTSMetadata\$().name);var o=Object.entries(e);(function(e){return e.modifier&&e.modifier._attribute&&e.nodeContent})(e)&&(o=o.filter((function(e){var n=e[0];return\"modifier\"!==n&&\"nodeContent\"!==n})));return{type:\"object\",className:t,value:{properties:o.map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n)}catch(e){return{type:\"object\",value:{properties:[]}}}case\"undefined\":return{type:\"undefined\"};case\"function\":return function(e){return{type:\"function\",value:\"function \".concat(e.name,\"() {}\")}}(e);case\"symbol\":return function(e){return{type:\"symbol\",value:e.description}}(e);case\"bigint\":return function(e){return{type:\"bigint\",value:String(e)}}(e)}}function s(e){return e.type&&null!=e.uid&&e.appContext}function f(e,n,t){var r=c(n,t);return r.name=e,r}var l=null,p=[],y={},g=\"---BEGIN:EXCEPTION---\",d=\"---END:EXCEPTION---\";function v(e){null!=l?l(JSON.stringify(Object.assign({type:\"console\",data:e},y))):p.push.apply(p,e)}var m=/^\\s*at\\s+[\\w/./-]+:\\d+\$/;function b(){function t(e){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var o=function(e,n,t){if(t||2===arguments.length)for(var r,o=0,i=n.length;o<i;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return e.concat(r||Array.prototype.slice.call(n))}([],t,!0);if(o.length){var u=o[o.length-1];\"string\"==typeof u&&m.test(u)&&o.pop()}if(n[e].apply(n,o),\"error\"===e&&1===t.length){var c=t[0];if(\"string\"==typeof c&&c.startsWith(g)){var s=g.length,f=c.length-d.length;return void i([c.slice(s,f)])}if(c instanceof Error)return void i([c])}v([a(e,t)])}}return function(){var e=console.log,n=Symbol();try{console.log=n}catch(e){return!1}var t=console.log===n;return console.log=e,t}()?(e.forEach((function(e){console[e]=t(e)})),function(){e.forEach((function(e){console[e]=n[e]}))}):function(){}}function _(e){var n={type:\"WEB_INVOKE_APPSERVICE\",args:{data:{name:\"console\",arg:e}}};return window.__uniapp_x_postMessageToService?window.__uniapp_x_postMessageToService(n):window.__uniapp_x_.postMessageToService(JSON.stringify(n))}!function(){if(!window.__UNI_CONSOLE_WEBVIEW__){window.__UNI_CONSOLE_WEBVIEW__=!0;var e=\"[web-view]\".concat(window.__UNI_PAGE_ROUTE__?\"[\".concat(window.__UNI_PAGE_ROUTE__,\"]\"):\"\");b(),function(e,n){if(void 0===n&&(n={}),l=e,Object.assign(y,n),null!=e&&p.length>0){var t=p.slice();p.length=0,v(t)}}((function(e){_(e)}),{channel:e}),function(e,n){if(void 0===n&&(n={}),t=e,Object.assign(o,n),null!=e&&r.size>0){var a=Array.from(r);r.clear(),i(a)}}((function(e){_(e)}),{channel:e}),window.addEventListener(\"error\",(function(e){i([e.error])})),window.addEventListener(\"unhandledrejection\",(function(e){i([e])}))}}()}();"
    }
    , fun(data: String){
        socketTask?.send(SendSocketMessageOptions(data = data))
    }
    )
    return UTSPromise.resolve().then(fun(): UTSPromise<Boolean> {
        return initRuntimeSocket(hosts, port, id).then(fun(socket): Boolean {
            if (socket == null) {
                return false
            }
            socketTask = socket
            return true
        }
        )
    }
    ).`catch`(fun(): Boolean {
        return false
    }
    )
}
val runBlock2 = run {
    initRuntimeSocketService()
}
var firstBackTime: Number = 0
open class GenApp : BaseApp {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onLaunch(fun(_: OnLaunchOptions) {
            console.log("App Launch", " at App.uvue:6")
        }
        , __ins)
        onAppShow(fun(_: OnShowOptions) {
            console.log("App Show", " at App.uvue:9")
        }
        , __ins)
        onAppHide(fun() {
            console.log("App Hide", " at App.uvue:12")
        }
        , __ins)
        onLastPageBackPress(fun() {
            console.log("App LastPageBackPress", " at App.uvue:16")
            if (firstBackTime == 0) {
                uni_showToast(ShowToastOptions(title = "再按一次退出应用", position = "bottom"))
                firstBackTime = Date.now()
                setTimeout(fun(){
                    firstBackTime = 0
                }, 2000)
            } else if (Date.now() - firstBackTime < 2000) {
                firstBackTime = Date.now()
                uni_exit(null)
            }
        }
        , __ins)
        onExit(fun() {
            console.log("App Exit", " at App.uvue:33")
        }
        , __ins)
        onError(fun(err: OnErrorOptions) {
            console.log("_UNI_ERR_", JSON.stringify((err as UTSError)), " at App.uvue:39")
        }
        , __ins)
    }
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("uni-row" to _pS(_uM("flexDirection" to "row")), "uni-column" to _pS(_uM("flexDirection" to "column")))
            }
    }
}
val GenAppClass = CreateVueAppComponent(GenApp::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "app", name = "", inheritAttrs = true, inject = Map(), props = Map(), propsNeedCastKeys = _uA(), emits = Map(), components = Map(), styles = GenApp.styles)
}
, fun(instance): GenApp {
    return GenApp(instance)
}
)
open class StoreListItem (
    @JsonNotNull
    open var enable: Boolean = false,
    @JsonNotNull
    open var id: String,
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var scheme: String,
    @JsonNotNull
    open var priority: Number,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("StoreListItem", "uni_modules/uni-upgrade-center-app/utils/call-check-version.uts", 1, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return StoreListItemReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
open class StoreListItemReactiveObject : StoreListItem, IUTSReactive<StoreListItem> {
    override var __v_raw: StoreListItem
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: StoreListItem, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(enable = __v_raw.enable, id = __v_raw.id, name = __v_raw.name, scheme = __v_raw.scheme, priority = __v_raw.priority) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): StoreListItemReactiveObject {
        return StoreListItemReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var enable: Boolean
        get() {
            return _tRG(__v_raw, "enable", __v_raw.enable, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("enable")) {
                return
            }
            val oldValue = __v_raw.enable
            __v_raw.enable = value
            _tRS(__v_raw, "enable", oldValue, value)
        }
    override var id: String
        get() {
            return _tRG(__v_raw, "id", __v_raw.id, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("id")) {
                return
            }
            val oldValue = __v_raw.id
            __v_raw.id = value
            _tRS(__v_raw, "id", oldValue, value)
        }
    override var name: String
        get() {
            return _tRG(__v_raw, "name", __v_raw.name, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("name")) {
                return
            }
            val oldValue = __v_raw.name
            __v_raw.name = value
            _tRS(__v_raw, "name", oldValue, value)
        }
    override var scheme: String
        get() {
            return _tRG(__v_raw, "scheme", __v_raw.scheme, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("scheme")) {
                return
            }
            val oldValue = __v_raw.scheme
            __v_raw.scheme = value
            _tRS(__v_raw, "scheme", oldValue, value)
        }
    override var priority: Number
        get() {
            return _tRG(__v_raw, "priority", __v_raw.priority, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("priority")) {
                return
            }
            val oldValue = __v_raw.priority
            __v_raw.priority = value
            _tRS(__v_raw, "priority", oldValue, value)
        }
}
open class UniUpgradeCenterResult (
    @JsonNotNull
    open var _id: String,
    @JsonNotNull
    open var appid: String,
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var title: String,
    @JsonNotNull
    open var contents: String,
    @JsonNotNull
    open var url: String,
    @JsonNotNull
    open var platform: UTSArray<String>,
    @JsonNotNull
    open var version: String,
    @JsonNotNull
    open var uni_platform: String,
    @JsonNotNull
    open var stable_publish: Boolean = false,
    @JsonNotNull
    open var is_mandatory: Boolean = false,
    open var is_silently: Boolean? = null,
    @JsonNotNull
    open var create_env: String,
    @JsonNotNull
    open var create_date: Number,
    @JsonNotNull
    open var message: String,
    @JsonNotNull
    open var code: Number,
    @JsonNotNull
    open var type: String,
    open var store_list: UTSArray<StoreListItem>? = null,
    open var min_uni_version: String? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UniUpgradeCenterResult", "uni_modules/uni-upgrade-center-app/utils/call-check-version.uts", 8, 13)
    }
}
fun `default`(): UTSPromise<UniUpgradeCenterResult> {
    return UTSPromise<UniUpgradeCenterResult>(fun(resolve, reject){
        val systemInfo = uni_getSystemInfoSync()
        val appId = systemInfo.appId
        val appVersion = systemInfo.appVersion
        if (UTSAndroid.`typeof`(appId) === "string" && UTSAndroid.`typeof`(appVersion) === "string" && appId.length > 0 && appVersion.length > 0) {
            var data: UTSJSONObject = object : UTSJSONObject(UTSSourceMapPosition("data", "uni_modules/uni-upgrade-center-app/utils/call-check-version.uts", 35, 17)) {
                var action = "checkVersion"
                var appid = "__TEST__"
                var appVersion = "1.0.0"
                var is_uniapp_x = true
                var wgtVersion = "0.0.0.0.0.1"
            }
            try {
                uniCloud.callFunction(UniCloudCallFunctionOptions(name = "uni-upgrade-center", data = data)).then(fun(res){
                    val code = res.result["code"]
                    val codeIsNumber = _uA(
                        "Int",
                        "Long",
                        "number"
                    ).includes(UTSAndroid.`typeof`(code))
                    if (codeIsNumber) {
                        if ((code as Number) == 0) {
                            reject(object : UTSJSONObject() {
                                var code = res.result["code"]
                                var message = res.result["message"]
                            })
                        } else if ((code as Number) < 0) {
                            reject(object : UTSJSONObject() {
                                var code = res.result["code"]
                                var message = res.result["message"]
                            })
                        } else {
                            val result = UTSAndroid.consoleDebugError(JSON.parse<UniUpgradeCenterResult>(JSON.stringify(res.result)), " at uni_modules/uni-upgrade-center-app/utils/call-check-version.uts:63") as UniUpgradeCenterResult
                            resolve(result)
                        }
                    }
                }).`catch`<Unit>(fun(err: Any?){
                    val error = err as UniCloudError
                    if (error.errMsg == "未匹配到云函数[uni-upgrade-center]") {
                        error.errMsg = "【uni-upgrade-center-app】未配置uni-upgrade-center，无法升级。参考: https://uniapp.dcloud.net.cn/uniCloud/upgrade-center.html"
                    }
                    reject(error.errMsg)
                })
            } catch (e: Throwable) {
                reject(e.message)
            }
        } else {
            reject("invalid appid or appVersion")
        }
    }
    )
}
val platform_iOS: String = "iOS"
val platform_Android: String = "Android"
val PACKAGE_INFO_KEY = "__package_info__"
fun default1(): UTSPromise<UniUpgradeCenterResult> {
    return UTSPromise<UniUpgradeCenterResult>(fun(resolve, reject){
        `default`().then(fun(uniUpgradeCenterResult): UTSPromise<Unit> {
            return wrapUTSPromise(suspend w@{
                    val code = uniUpgradeCenterResult.code
                    val message = uniUpgradeCenterResult.message
                    val url = "https://app-cdn.tonn.cn/pubLic/_UNI__E93D809_1109151324_1731136611103_0.apk"
                    if (code > 0) {
                        val tcbRes = await(uniCloud.getTempFileURL(UniCloudGetTempFileURLOptions(fileList = _uA(
                            url
                        ))))
                        if (UTSAndroid.`typeof`(tcbRes.fileList[0].tempFileURL) !== "undefined") {
                            uniUpgradeCenterResult.url = tcbRes.fileList[0].tempFileURL
                        }
                        uni_setStorageSync(PACKAGE_INFO_KEY, uniUpgradeCenterResult)
                        uni_openDialogPage(OpenDialogPageOptions(url = "/uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup?local_storage_key=" + PACKAGE_INFO_KEY, disableEscBack = true, fail = fun(err){
                            console.error("更新弹框跳转失败", err, " at uni_modules/uni-upgrade-center-app/utils/check-update.ts:83")
                            uni_removeStorageSync(PACKAGE_INFO_KEY)
                        }))
                        return@w resolve(uniUpgradeCenterResult)
                    } else if (code < 0) {
                        console.error(message, " at uni_modules/uni-upgrade-center-app/utils/check-update.ts:91")
                        return@w reject(uniUpgradeCenterResult)
                    }
                    return@w resolve(uniUpgradeCenterResult)
            })
        }
        ).`catch`(fun(err){
            reject(err)
        }
        )
    }
    )
}
val themeChange = fun(res: OnHostThemeChangeCallbackResult){
    console.log("res: ", res, " at pages/index/index.uvue:35")
}
val GenPagesIndexIndexClass = CreateVueComponent(GenPagesIndexIndex::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesIndexIndex.inheritAttrs, inject = GenPagesIndexIndex.inject, props = GenPagesIndexIndex.props, propsNeedCastKeys = GenPagesIndexIndex.propsNeedCastKeys, emits = GenPagesIndexIndex.emits, components = GenPagesIndexIndex.components, styles = GenPagesIndexIndex.styles)
}
, fun(instance, renderer): GenPagesIndexIndex {
    return GenPagesIndexIndex(instance, renderer)
}
)
val GenPagesBBClass = CreateVueComponent(GenPagesBB::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesBB.inheritAttrs, inject = GenPagesBB.inject, props = GenPagesBB.props, propsNeedCastKeys = GenPagesBB.propsNeedCastKeys, emits = GenPagesBB.emits, components = GenPagesBB.components, styles = GenPagesBB.styles)
}
, fun(instance, renderer): GenPagesBB {
    return GenPagesBB(instance, renderer)
}
)
val GenPagesCCClass = CreateVueComponent(GenPagesCC::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesCC.inheritAttrs, inject = GenPagesCC.inject, props = GenPagesCC.props, propsNeedCastKeys = GenPagesCC.propsNeedCastKeys, emits = GenPagesCC.emits, components = GenPagesCC.components, styles = GenPagesCC.styles)
}
, fun(instance, renderer): GenPagesCC {
    return GenPagesCC(instance, renderer)
}
)
val requiredKey = _uA(
    "version",
    "url",
    "type"
)
var downloadTask: DownloadTask? = null
var openSchemePromise: UTSPromise<Boolean>? = null
val openSchema1 = fun(url: String): UTSPromise<Boolean> {
    return UTSPromise<Boolean>(fun(resolve, reject){
        try {
            utsOpenSchema(url)
            resolve(true)
        }
         catch (e: Throwable) {
            reject(false)
        }
    }
    )
}
val GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopupClass = CreateVueComponent(GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopup::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopup.inheritAttrs, inject = GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopup.inject, props = GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopup.props, propsNeedCastKeys = GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopup.propsNeedCastKeys, emits = GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopup.emits, components = GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopup.components, styles = GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopup.styles)
}
, fun(instance, renderer): GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopup {
    return GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopup(instance, renderer)
}
)
fun createApp(): UTSJSONObject {
    val app = createSSRApp(GenAppClass)
    return _uO("app" to app)
}
fun main(app: IApp) {
    definePageRoutes()
    defineAppConfig()
    (createApp()["app"] as VueApp).mount(app, GenUniApp())
}
open class UniAppConfig : io.dcloud.uniapp.appframe.AppConfig {
    override var name: String = "uts-test"
    override var appid: String = "__UNI__ADA0E20"
    override var versionName: String = "1.0.0"
    override var versionCode: String = "100"
    override var uniCompilerVersion: String = "4.71"
    constructor() : super() {}
}
fun definePageRoutes() {
    __uniRoutes.push(UniPageRoute(path = "pages/index/index", component = GenPagesIndexIndexClass, meta = UniPageMeta(isQuit = true), style = _uM("navigationBarTitleText" to "uni-app x")))
    __uniRoutes.push(UniPageRoute(path = "pages/B/B", component = GenPagesBBClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "B")))
    __uniRoutes.push(UniPageRoute(path = "pages/C/C", component = GenPagesCCClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup", component = GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopupClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
}
val __uniTabBar: Map<String, Any?>? = _uM("backgroundColor" to "@tabBarBackgroundColor", "list" to _uA(
    _uM("text" to "首页", "pagePath" to "pages/index/index"),
    _uM("text" to "首页", "pagePath" to "pages/B/B")
))
val __uniLaunchPage: Map<String, Any?> = _uM("url" to "pages/index/index", "style" to _uM("navigationBarTitleText" to "uni-app x"))
fun defineAppConfig() {
    __uniConfig.entryPagePath = "/pages/index/index"
    __uniConfig.globalStyle = _uM("pageOrientation" to "portrait", "navigationBarTitleText" to "Hello uniapp x", "navigationBarTextStyle" to "@navigationBarTextStyle", "navigationBarBackgroundColor" to "@navigationBarBackgroundColor", "backgroundColorContent" to "@backgroundColorContent", "backgroundColor" to "@backgroundColor", "backgroundTextStyle" to "@backgroundTextStyle")
    __uniConfig.getTabBarConfig = fun(): Map<String, Any>? {
        return _uM("backgroundColor" to "@tabBarBackgroundColor", "list" to _uA(
            _uM("text" to "首页", "pagePath" to "pages/index/index"),
            _uM("text" to "首页", "pagePath" to "pages/B/B")
        ))
    }
    __uniConfig.tabBar = __uniConfig.getTabBarConfig()
    __uniConfig.conditionUrl = ""
    __uniConfig.uniIdRouter = _uM()
    __uniConfig.themeConfig = _uM("light" to _uM("navigationBarTextStyle" to "white", "navigationBarBackgroundColor" to "#007AFF", "backgroundColorContent" to "#efeff4", "backgroundColor" to "#efeff4", "backgroundTextStyle" to "dark", "tabBarColor" to "#7A7E83", "tabBarSelectedColor" to "#007AFF", "tabBarBorderStyle" to "black", "tabBarBackgroundColor" to "#F8F8F8", "tabBarComponentIconPath" to "static/component.png", "tabBarComponentSelectedIconPath" to "static/componentHL.png", "tabBarAPIIconPath" to "static/api.png", "tabBarAPISelectedIconPath" to "static/apiHL.png", "tabBarCSSIconPath" to "static/css.png", "tabBarCSSSelectedIconPath" to "static/cssHL.png", "tabBarTemplateIconPath" to "static/template.png", "tabBarTemplateSelectedIconPath" to "static/templateHL.png"), "dark" to _uM("navigationBarTextStyle" to "white", "navigationBarBackgroundColor" to "#1F1F1F", "backgroundColor" to "#1F1F1F", "backgroundColorContent" to "#646464", "backgroundTextStyle" to "light", "tabBarColor" to "#cacaca", "tabBarSelectedColor" to "#007AFF", "tabBarBorderStyle" to "white", "tabBarBackgroundColor" to "#1F1F1F", "tabBarComponentIconPath" to "static/component.png", "tabBarComponentSelectedIconPath" to "static/componentHL.png", "tabBarAPIIconPath" to "static/api.png", "tabBarAPISelectedIconPath" to "static/apiHL.png", "tabBarCSSIconPath" to "static/css.png", "tabBarCSSSelectedIconPath" to "static/cssHL.png", "tabBarTemplateIconPath" to "static/template.png", "tabBarTemplateSelectedIconPath" to "static/templateHL.png"))
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

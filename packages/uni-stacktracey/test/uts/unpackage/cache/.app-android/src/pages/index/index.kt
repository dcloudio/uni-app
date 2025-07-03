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
import io.dcloud.uniapp.extapi.getAppBaseInfo as uni_getAppBaseInfo
import io.dcloud.uniapp.extapi.getSystemInfoSync as uni_getSystemInfoSync
import io.dcloud.uniapp.extapi.onHostThemeChange as uni_onHostThemeChange
import io.dcloud.uniapp.extapi.openDialogPage as uni_openDialogPage
import uts.sdk.modules.utsOpenSchema.openSchema
import io.dcloud.uniapp.extapi.removeStorageSync as uni_removeStorageSync
import io.dcloud.uniapp.extapi.setAppTheme as uni_setAppTheme
import io.dcloud.uniapp.extapi.setStorageSync as uni_setStorageSync
open class GenPagesIndexIndex : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onLoad(fun(_: OnLoadOptions) {
            val info = uni_getSystemInfoSync()
            console.log(info, " at pages/index/index.uvue:50")
            this.themeId = uni_onHostThemeChange(themeChange)
            uni_setAppTheme(SetAppThemeOptions(theme = "auto"))
        }
        , __ins)
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        val _component_navigator = resolveComponent("navigator")
        return _cE("view", null, _uA(
            _cE("image", _uM("class" to "logo", "src" to "/static/logo.png")),
            _cE("view", _uM("class" to "text-area"), _uA(
                _cE("text", _uM("class" to "title"), _tD(_ctx.title), 1)
            )),
            _cE("button", _uM("onClick" to _ctx.error), "error", 8, _uA(
                "onClick"
            )),
            _cE("button", _uM("onClick" to _ctx.openSchemaError), "openSchemaError", 8, _uA(
                "onClick"
            )),
            _cV(_component_navigator, _uM("url" to "/pages/C/C"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                return _uA(
                    _cE("button", null, "C")
                )
            }
            ), "_" to 1)),
            _cE("view", _uM("style" to _nS(_uM("padding" to "30rpx 0"))), "扫描结果：" + _tD(_ctx.result), 5),
            _cE("button", _uM("type" to "primary", "onClick" to _ctx.scan), "开启扫描", 8, _uA(
                "onClick"
            )),
            " " + _tD(_ctx.modelValue) + " ",
            _cE("button", _uM("onClick" to _ctx.checkUpdate), "升级中心", 8, _uA(
                "onClick"
            )),
            _cE("button", _uM("onClick" to _ctx.test), "test", 8, _uA(
                "onClick"
            )),
            _cE("button", _uM("onClick" to _ctx.getAppBaseInfo), "getAppBaseInfo", 8, _uA(
                "onClick"
            ))
        ))
    }
    open var title: String by `$data`
    open var type: String by `$data`
    open var result: String by `$data`
    open var modelValue: Number by `$data`
    open var themeId: Number by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("title" to "Hello", "type" to "", "result" to "", "modelValue" to 0, "themeId" to -1)
    }
    open var openSchemaError = ::gen_openSchemaError_fn
    open fun gen_openSchemaError_fn() {
        openSchema("12312312")
    }
    open var error = ::gen_error_fn
    open fun gen_error_fn() {
        setTimeout(fun(){
            throw UTSError("setTimeout ABC")
        }
        , 1000)
        throw UTSError("ABC")
    }
    open var getAppBaseInfo = ::gen_getAppBaseInfo_fn
    open fun gen_getAppBaseInfo_fn() {
        console.log(uni_getAppBaseInfo(null), " at pages/index/index.uvue:72")
    }
    open var offHostThemeChange = ::gen_offHostThemeChange_fn
    open fun gen_offHostThemeChange_fn() {}
    open var test = ::gen_test_fn
    open fun gen_test_fn() {}
    open var update = ::gen_update_fn
    open fun gen_update_fn() {
        val info = UniUpgradeCenterResult(_id = "", message = "", code = 0, min_uni_version = "", is_silently = false, is_mandatory = false, appid = "__UNI__HelloUniAppX", name = "Hello uni-app x", title = "1.6.3更新", contents = "1. 使用HBuilderX4.31版本编译\n2. 新增ad、map、native-view等组件示例\n3. 新增隐私政策页面示例\n4. 优化其它示例用户体验", platform = _uA(
            "Android"
        ), version = "1.6.3", url = "https://web-ext-storage.dcloud.net.cn/uni-app-x/pkg/hello-uniappx.apk", stable_publish = true, type = "native_app", store_list = _uA(), uni_platform = "android", create_env = "upgrade-center", create_date = 1729853731640)
        uni_setStorageSync("PACK_INFO", info)
        uni_openDialogPage(OpenDialogPageOptions(url = "/uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup?local_storage_key=PACK_INFO", disableEscBack = true, fail = fun(err){
            console.error("更新弹框跳转失败", err, " at pages/index/index.uvue:117")
            uni_removeStorageSync("PACK_INFO")
        }
        ))
    }
    open var checkUpdate = ::gen_checkUpdate_fn
    open fun gen_checkUpdate_fn() {
        default1().then(fun(res){
            console.log("res: ", res, " at pages/index/index.uvue:127")
        }
        ).`catch`(fun(e){
            console.log("e: ", e, " at pages/index/index.uvue:129")
        }
        )
    }
    open var scan = ::gen_scan_fn
    open fun gen_scan_fn() {}
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ), _uA(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("logo" to _pS(_uM("height" to 100, "width" to 100, "marginTop" to 100, "marginRight" to "auto", "marginBottom" to 25, "marginLeft" to "auto")), "title" to _pS(_uM("fontSize" to 18, "color" to "#8f8f94", "textAlign" to "center")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}

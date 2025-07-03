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
import uts.sdk.modules.utsProgressNotification.CreateNotificationProgressOptions
import uts.sdk.modules.utsProgressNotification.FinishNotificationProgressOptions
import io.dcloud.uniapp.extapi.closeDialogPage as uni_closeDialogPage
import uts.sdk.modules.utsProgressNotification.createNotificationProgress
import uts.sdk.modules.utsProgressNotification.cancelNotificationProgress
import uts.sdk.modules.utsProgressNotification.finishNotificationProgress
import io.dcloud.uniapp.extapi.downloadFile as uni_downloadFile
import io.dcloud.uniapp.extapi.getStorageSync as uni_getStorageSync
import io.dcloud.uniapp.extapi.installApk as uni_installApk
import io.dcloud.uniapp.extapi.navigateBack as uni_navigateBack
import io.dcloud.uniapp.extapi.showModal as uni_showModal
open class GenUniModulesUniUpgradeCenterAppPagesUniAppXUpgradePopup : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onUnload(fun() {
            if (this.needNotificationProgress) {
                cancelNotificationProgress()
            }
        }
        , __ins)
        onLoad(fun(onLoadOptions: OnLoadOptions) {
            val local_storage_key: String? = onLoadOptions["local_storage_key"]
            if (local_storage_key == null) {
                console.error("local_storage_key为空，请检查后重试", " at uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup.uvue:143")
                this.closePopup()
                return
            }
            val localPackageInfo = uni_getStorageSync(local_storage_key)
            if (localPackageInfo == null) {
                console.error("安装包信息为空，请检查后重试", " at uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup.uvue:150")
                this.closePopup()
                return
            }
            this.show(UTSAndroid.consoleDebugError(JSON.parse<UniUpgradeCenterResult>(JSON.stringify(localPackageInfo)), " at uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup.uvue:155") as UniUpgradeCenterResult)
        }
        , __ins)
        onBackPress(fun(options: OnBackPressOptions): Boolean? {
            if (this.is_mandatory) {
                return true
            }
            if (!this.needNotificationProgress) {
                if (downloadTask != null) {
                    downloadTask!!.abort()
                }
            }
            return false
        }
        , __ins)
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        val _component_progress = resolveComponent("progress")
        return _cE("view", _uM("class" to "mask flex-center"), _uA(
            _cE("view", _uM("class" to "content"), _uA(
                _cE("view", _uM("class" to "content-top"), _uA(
                    _cE("text", _uM("class" to "content-top-text"), _tD(_ctx.title), 1),
                    _cE("image", _uM("class" to "content-top-image", "mode" to "widthFix", "src" to "/uni_modules/uni-upgrade-center-app/static/app/bg_top.png"))
                )),
                _cE("view", _uM("class" to "content-space")),
                _cE("view", _uM("class" to "content-body"), _uA(
                    _cE("view", _uM("class" to "content-body-title"), _uA(
                        _cE("text", _uM("class" to "text title"), _tD(_ctx.subTitle), 1),
                        _cE("text", _uM("class" to "text version"), "v" + _tD(_ctx.version), 1)
                    )),
                    _cE("view", _uM("class" to "body"), _uA(
                        _cE("scroll-view", _uM("class" to "box-des-scroll", "scroll-y" to "true"), _uA(
                            _cE("text", _uM("class" to "text box-des"), _tD(_ctx.contents), 1)
                        ))
                    )),
                    _cE("view", _uM("class" to "footer flex-center"), _uA(
                        if (isTrue(_ctx.isiOS)) {
                            _cE("button", _uM("key" to 0, "class" to "content-button", "style" to _nS(_uM("border" to "none", "color" to "#fff")), "plain" to "", "onClick" to _ctx.jumpToAppStore), _tD(_ctx.downLoadBtnTextiOS), 13, _uA(
                                "onClick"
                            ))
                        } else {
                            _cE(Fragment, _uM("key" to 1), _uA(
                                if (isTrue(!_ctx.downloadSuccess)) {
                                    _cE(Fragment, _uM("key" to 0), _uA(
                                        if (isTrue(_ctx.downloading)) {
                                            _cE("view", _uM("key" to 0, "class" to "progress-box flex-column"), _uA(
                                                _cV(_component_progress, _uM("class" to "progress", "percent" to _ctx.downLoadPercent, "activeColor" to "#3DA7FF", "show-info" to true, "stroke-width" to 10), null, 8, _uA(
                                                    "percent"
                                                )),
                                                _cE("view", _uM("style" to _nS(_uM("width" to "100%", "display" to "flex", "justify-content" to "space-around", "flex-direction" to "row"))), _uA(
                                                    _cE("text", _uM("class" to "text", "style" to _nS(_uM("font-size" to "14px"))), _tD(_ctx.downLoadingText), 5),
                                                    _cE("text", _uM("class" to "text", "style" to _nS(_uM("font-size" to "14px"))), "(" + _tD(_ctx.downloadedSize) + "/" + _tD(_ctx.packageFileSize) + "M)", 5)
                                                ), 4)
                                            ))
                                        } else {
                                            _cE("button", _uM("key" to 1, "class" to "content-button", "onClick" to _ctx.updateApp), _tD(_ctx.downLoadBtnText), 9, _uA(
                                                "onClick"
                                            ))
                                        }
                                    ), 64)
                                } else {
                                    if (isTrue(_ctx.downloadSuccess && !_ctx.installed)) {
                                        _cE("button", _uM("key" to 1, "class" to "content-button", "loading" to _ctx.installing, "disabled" to _ctx.installing, "onClick" to _ctx.installPackage), _tD(if (_ctx.installing) {
                                            "正在安装……"
                                        } else {
                                            "下载完成，立即安装"
                                        }), 9, _uA(
                                            "loading",
                                            "disabled",
                                            "onClick"
                                        ))
                                    } else {
                                        if (isTrue(_ctx.installed)) {
                                            _cE("button", _uM("key" to 2, "class" to "content-button", "onClick" to _ctx.installPackage), " 安装未完成，点击安装 ", 8, _uA(
                                                "onClick"
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    }
                                }
                            ), 64)
                        }
                    ))
                )),
                _cE("view", _uM("class" to "content-bottom"), _uA(
                    if (isTrue(!_ctx.is_mandatory)) {
                        _cE("image", _uM("key" to 0, "class" to "close-img", "mode" to "widthFix", "src" to "/uni_modules/uni-upgrade-center-app/static/app/app_update_close.png", "onClick" to _ctx.closeUpdate), null, 8, _uA(
                            "onClick"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                ))
            ))
        ))
    }
    open var installForBeforeFilePath: String by `$data`
    open var installed: Boolean by `$data`
    open var installing: Boolean by `$data`
    open var downloadSuccess: Boolean by `$data`
    open var downloading: Boolean by `$data`
    open var downLoadPercent: Number by `$data`
    open var downloadedSize: Number by `$data`
    open var packageFileSize: Number by `$data`
    open var tempFilePath: String by `$data`
    open var title: String by `$data`
    open var contents: String by `$data`
    open var version: String by `$data`
    open var is_mandatory: Boolean by `$data`
    open var url: String by `$data`
    open var platform: UTSArray<String> by `$data`
    open var store_list: UTSArray<StoreListItem>? by `$data`
    open var subTitle: String by `$data`
    open var downLoadBtnTextiOS: String by `$data`
    open var downLoadBtnText: String by `$data`
    open var downLoadingText: String by `$data`
    open var isiOS: Boolean by `$data`
    open var isAndroid: Boolean by `$data`
    open var needNotificationProgress: Boolean by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("installForBeforeFilePath" to "", "installed" to false, "installing" to false, "downloadSuccess" to false, "downloading" to false, "downLoadPercent" to 0, "downloadedSize" to 0, "packageFileSize" to 0, "tempFilePath" to "", "title" to "更新日志", "contents" to "", "version" to "", "is_mandatory" to false, "url" to "", "platform" to _uA<String>(), "store_list" to null as UTSArray<StoreListItem>?, "subTitle" to "发现新版本", "downLoadBtnTextiOS" to "立即跳转更新", "downLoadBtnText" to "立即下载更新", "downLoadingText" to "安装包下载中，请稍后", "isiOS" to computed<Boolean>(fun(): Boolean {
            return this.platform.includes(platform_iOS)
        }
        ), "isAndroid" to computed<Boolean>(fun(): Boolean {
            return this.platform.includes(platform_Android)
        }
        ), "needNotificationProgress" to computed<Boolean>(fun(): Boolean {
            return this.isAndroid && !this.is_mandatory
        }
        ))
    }
    open var jumpToAppStore = ::gen_jumpToAppStore_fn
    open fun gen_jumpToAppStore_fn() {
        openSchema1(this.url)
    }
    open var show = ::gen_show_fn
    open fun gen_show_fn(localPackageInfo: UniUpgradeCenterResult?) {
        if (localPackageInfo == null) {
            return
        }
        for(key in resolveUTSKeyIterator(localPackageInfo)){
            if (requiredKey.indexOf(key) != -1 && localPackageInfo[key] == null) {
                console.error("\u53C2\u6570 " + key + " \u5FC5\u586B\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u8BD5", " at uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup.uvue:175")
                this.closePopup()
                return
            }
        }
        this.title = localPackageInfo.title
        this.url = localPackageInfo.url
        this.contents = localPackageInfo.contents
        this.is_mandatory = localPackageInfo.is_mandatory
        this.platform = localPackageInfo.platform
        this.version = localPackageInfo.version
        this.store_list = localPackageInfo.store_list
    }
    open var askAbortDownload = ::gen_askAbortDownload_fn
    open fun gen_askAbortDownload_fn() {
        uni_showModal(ShowModalOptions(title = "是否取消下载？", cancelText = "否", confirmText = "是", success = fun(res){
            if (res.confirm) {
                if (downloadTask != null) {
                    downloadTask!!.abort()
                }
                this.closePopup()
            }
        }
        ))
    }
    open var closeUpdate = ::gen_closeUpdate_fn
    open fun gen_closeUpdate_fn() {
        if (this.downloading && !this.needNotificationProgress) {
            this.askAbortDownload()
            return
        }
        this.closePopup()
    }
    open var closePopup = ::gen_closePopup_fn
    open fun gen_closePopup_fn() {
        this.downloadSuccess = false
        this.downloading = false
        this.downLoadPercent = 0
        this.downloadedSize = 0
        this.packageFileSize = 0
        this.tempFilePath = ""
        this.installing = false
        this.installed = false
        uni_closeDialogPage(CloseDialogPageOptions(dialogPage = this.`$page`))
    }
    open var updateApp = ::gen_updateApp_fn
    open fun gen_updateApp_fn() {
        val checkStoreScheme = this.checkStoreScheme()
        if (checkStoreScheme != null) {
            checkStoreScheme.then(fun(_){}).`catch`(fun(){
                this.downloadPackage()
            }).`finally`(fun(){
                openSchemePromise = null
            })
        } else {
            this.downloadPackage()
        }
    }
    open var checkStoreScheme = ::gen_checkStoreScheme_fn
    open fun gen_checkStoreScheme_fn(): UTSPromise<Boolean>? {
        if (this.store_list != null) {
            val storeList: UTSArray<StoreListItem> = this.store_list!!.filter(fun(item: StoreListItem): Boolean {
                return item.enable
            }
            )
            if (storeList.length > 0) {
                if (openSchemePromise == null) {
                    openSchemePromise = UTSPromise.reject() as UTSPromise<Boolean>
                }
                storeList.sort(fun(cur: StoreListItem, next: StoreListItem): Number {
                    return next.priority - cur.priority
                }
                ).map(fun(item: StoreListItem): String {
                    return item.scheme
                }
                ).reduce(fun(promise: UTSPromise<Boolean>, cur: String): UTSPromise<Boolean> {
                    openSchemePromise = promise.`catch`<Boolean>(fun(): UTSPromise<Boolean> {
                        return openSchema1(cur)
                    }
                    )
                    return openSchemePromise!!
                }
                , openSchemePromise!!)
                return openSchemePromise!!
            }
        }
        return null
    }
    open var downloadPackage = ::gen_downloadPackage_fn
    open fun gen_downloadPackage_fn() {
        downloadTask = uni_downloadFile(DownloadFileOptions(url = this.url, success = fun(res){
            if (res.statusCode == 200) {
                this.tempFilePath = res.tempFilePath
                this.downLoadComplete()
            }
        }
        , fail = fun(err){
            console.log("downloadFile err: ", err, " at uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup.uvue:268")
        }
        ))
        if (downloadTask != null) {
            this.downloading = true
            if (this.needNotificationProgress) {
                this.closePopup()
            }
            downloadTask!!.onProgressUpdate(fun(res){
                this.downLoadPercent = parseFloat(res.progress.toFixed(0))
                this.downloadedSize = parseFloat((res.totalBytesWritten / Math.pow(1024, 2)).toFixed(2))
                this.packageFileSize = parseFloat((res.totalBytesExpectedToWrite / Math.pow(1024, 2)).toFixed(2))
                if (this.needNotificationProgress) {
                    createNotificationProgress(CreateNotificationProgressOptions(title = "升级中心正在下载安装包……", content = "" + this.downLoadPercent + "%", progress = this.downLoadPercent, onClick = fun(){
                        if (!this.downloadSuccess) {
                            this.askAbortDownload()
                        }
                    }
                    ))
                }
            }
            )
        }
    }
    open var downLoadComplete = ::gen_downLoadComplete_fn
    open fun gen_downLoadComplete_fn() {
        this.downloadSuccess = true
        this.downloading = false
        this.downLoadPercent = 0
        this.downloadedSize = 0
        this.packageFileSize = 0
        downloadTask = null
        if (this.needNotificationProgress) {
            finishNotificationProgress(FinishNotificationProgressOptions(title = "安装升级包", content = "下载完成", onClick = fun() {}))
            this.installPackage()
            return
        }
        if (this.is_mandatory) {
            this.installPackage()
        }
    }
    open var installPackage = ::gen_installPackage_fn
    open fun gen_installPackage_fn() {
        this.installing = true
        uni_installApk(InstallApkOptions(filePath = this.tempFilePath, success = fun(_){
            this.installing = false
            this.installed = true
        }
        , fail = fun(err){
            console.error("installApk fail", err, " at uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup.uvue:332")
            this.installing = false
            this.installed = false
            uni_showModal(ShowModalOptions(title = "更新失败，请重新下载", content = "uni.installApk \u9519\u8BEF\u7801 " + err.errCode, showCancel = false))
        }
        ))
        if (!this.is_mandatory) {
            uni_navigateBack(null)
        }
    }
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
                return _uM("flex-center" to _pS(_uM("justifyContent" to "center", "alignItems" to "center")), "mask" to _pS(_uM("position" to "fixed", "left" to 0, "top" to 0, "right" to 0, "bottom" to 0, "backgroundColor" to "rgba(0,0,0,0.65)")), "content" to _pS(_uM("position" to "relative", "top" to 0, "width" to "600rpx", "backgroundColor" to "rgba(0,0,0,0)")), "text" to _pS(_uM("fontFamily" to "Source Han Sans CN")), "content-top" to _pS(_uM("width" to "100%", "borderBottomColor" to "#ffffff", "borderBottomWidth" to 15, "borderBottomStyle" to "solid")), "content-space" to _pS(_uM("width" to "100%", "height" to 50, "backgroundColor" to "#ffffff", "position" to "absolute", "top" to 140, "zIndex" to -1)), "content-top-image" to _pS(_uM("width" to "100%", "position" to "relative", "bottom" to -18)), "content-top-text" to _pS(_uM("fontSize" to 22, "fontWeight" to "bold", "color" to "#F8F8FA", "position" to "absolute", "width" to "65%", "top" to 77.5, "left" to 25, "zIndex" to 1)), "content-body" to _pS(_uM("boxSizing" to "border-box", "paddingTop" to 0, "paddingRight" to 25, "paddingBottom" to 0, "paddingLeft" to 25, "width" to "100%", "backgroundColor" to "#ffffff", "borderBottomLeftRadius" to 15, "borderBottomRightRadius" to 15)), "content-body-title" to _pS(_uM("flexDirection" to "row", "alignItems" to "center")), "version" to _uM(".content-body-title " to _uM("paddingLeft" to 4, "color" to "#ffffff", "fontSize" to 10, "marginLeft" to 5, "paddingTop" to 2, "paddingRight" to 4, "paddingBottom" to 2, "borderTopLeftRadius" to 10, "borderTopRightRadius" to 10, "borderBottomRightRadius" to 10, "borderBottomLeftRadius" to 10, "backgroundImage" to "none", "backgroundColor" to "#50aefd")), "title" to _pS(_uM("fontSize" to 16, "fontWeight" to "bold", "color" to "#3DA7FF", "lineHeight" to "38px")), "footer" to _pS(_uM("height" to 75, "display" to "flex", "alignItems" to "center", "justifyContent" to "space-around")), "box-des-scroll" to _pS(_uM("boxSizing" to "border-box", "paddingTop" to 0, "paddingRight" to 15, "paddingBottom" to 0, "paddingLeft" to 15, "height" to 100)), "box-des" to _pS(_uM("fontSize" to 13, "color" to "#000000", "lineHeight" to "25px")), "progress-box" to _pS(_uM("width" to "100%")), "progress" to _pS(_uM("width" to "90%", "height" to 20)), "content-bottom" to _pS(_uM("height" to 75)), "close-img" to _pS(_uM("width" to 35, "height" to 35, "zIndex" to 1000, "position" to "relative", "bottom" to -25, "left" to 132)), "content-button" to _pS(_uM("width" to "100%", "height" to 40, "lineHeight" to "40px", "fontSize" to 15, "fontWeight" to "400", "borderTopLeftRadius" to 20, "borderTopRightRadius" to 20, "borderBottomRightRadius" to 20, "borderBottomLeftRadius" to 20, "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "color" to "#ffffff", "textAlign" to "center", "backgroundColor" to "#1785ff")), "flex-column" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}

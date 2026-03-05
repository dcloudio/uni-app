package uts.sdk.modules.uniWebView

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.Rect
import android.net.Uri
import android.net.http.SslError
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import android.text.TextUtils
import android.util.AttributeSet
import android.view.ActionMode
import android.view.Menu
import android.view.MenuItem
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.view.ViewTreeObserver.OnGlobalLayoutListener
import android.view.WindowInsets
import android.view.WindowInsetsController
import android.webkit.ConsoleMessage
import android.webkit.GeolocationPermissions
import android.webkit.JavascriptInterface
import android.webkit.MimeTypeMap
import android.webkit.PermissionRequest
import android.webkit.SslErrorHandler
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.content.FileProvider
import androidx.webkit.WebSettingsCompat
import androidx.webkit.WebViewFeature
import io.dcloud.uniapp.runtime.UniActivityCallback
import io.dcloud.uniapp.runtime.UniActivityParams
import uts.sdk.modules.uniWebView.R
import uts.sdk.modules.uniWebView.WebViewProgressBar
import uts.sdk.modules.uniWebView.WebViewFileChooseDialog
import io.dcloud.uts.UTSAndroid
import io.dcloud.uts.UTSArray
import io.dcloud.uts.utsArrayOf
import java.io.File
import kotlin.String
import kotlin.math.abs
import kotlin.math.roundToInt
import androidx.core.net.toUri

class NativeWebViewImpl @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr) {

    companion object {
        /** JS 发送到 Native 消息类型 */
        const val POST_MESSAGE = 1 // 组件外部事件 @message
        const val POST_MESSAGE_TO_SERVICE = 2 // 组件内部事件，用于 HTML 中调用 uni API

        /** SSL策略 */
        const val SSL_TYPE_REFUSE = "refuse"
        const val SSL_TYPE_WARNING = "warning"

        /** Error信息 */
        const val CODE_SSL_ERROR = 100001
        const val CODE_PAGE_ERROR = 100002
        const val CODE_HTTP_ERROR = 100003
        const val MESSAGE_SSL_ERROR = "ssl error"
        const val MESSAGE_PAGE_ERROR = "page error"
        const val MESSAGE_HTTP_ERROR = "http error"

        const val JS_INTERFACE_NAME = "__uniapp_x_"
        const val JS_PREFIX = "javascript:(function(){"

        /** <input type="file" /> 操作类型 */
        const val REQUEST_CODE_FILE = 1
        const val REQUEST_CODE_CAMERA = 2
        const val REQUEST_CODE_MICROPHONE = 3

        /** 软键盘遮挡输入框的不同情况处理标识 */
        const val INPUT_SCROLL_CONTENT = 1 // 网页内容滚动
        const val INPUT_TRANSLATE_PAGE = 2 // 位移页面

        /** 滚动触底判断阈值 */
        const val REACH_BOTTOM_THRESHOLD = 5

        /** 缓存目录 */
        const val WEB_VIEW_CACHE_DIR = "uni-web-view"
    }

    val mWebView by lazy { UniInternalWebView(context) }

    /** 当前系统状态栏、导航栏状态 */
    private var mCurrentSystemUiVisibility = 0

    /** 自定义 view */
    private var mCustomView: View? = null
    private var mCustomViewCallback: WebChromeClient.CustomViewCallback? = null

    /** 加载进度条 */
    private var mProgressShow = true
    private var mProgressColor = "#00FF00"
    private var mIsProgressing = false
    private val mWebViewProgressBar by lazy { WebViewProgressBar(context) }

    /** 定义回调 */
    private var mEventCallback: EventCallback? = null

    /** 文件选择 */
    private var mFileChooseDialog: WebViewFileChooseDialog? = null
    private var mFilePathCallback: ValueCallback<Array<Uri>>? = null
    private var mCameraOutputUri: Uri? = null

    private var mSSLType = SSL_TYPE_WARNING

    /** 软键盘 */
    private val mOnGlobalLayoutListener: OnGlobalLayoutListener
    private val mContentView: View? by lazy {
        UTSAndroid.getTopPageActivity()?.findViewById(android.R.id.content)
    }
    private var mInputDeltaY: Int? = null
    private var mInputFlag: Int? = null
    internal var mRenderContainer: View? = null

    /** 主题 */
    private var mAppThemeChangedListenerId: Number = 0
    private var mDarkModeEnable = true

    /** activity 回调 */
    private val mActivityCallback by lazy {
        object : UniActivityCallback() {
            override fun onActivityResult(params: UniActivityParams, requestCode: Int, resultCode: Int, data: Intent?) {
                handleOnActivityResult(requestCode, resultCode, data)
            }
        }
    }

    /** 默认 ua */
    private val mDefaultUserAgent by lazy {
        "uni-app-x/${UTSAndroid.getUniRuntimeVersion()}"
    }

    /** 调试模式 */
    private var mDebug = false

    init {
        initWebView()
        addView(mWebView, LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
        UTSAndroid.onActivityCallback(mActivityCallback)
        mOnGlobalLayoutListener = OnGlobalLayoutListener {
            val rect = Rect()
            getWindowVisibleDisplayFrame(rect)
            val usableHeight = rect.bottom
            val contentHeight = mContentView?.height ?: 0
            val keyboardHeight = contentHeight - usableHeight
            if (keyboardHeight > contentHeight / 4) {
                if (!mWebView.isFocused) return@OnGlobalLayoutListener
                keyBoardShow(usableHeight)
            } else {
                keyBoardHide()
            }
        }
        viewTreeObserver.addOnGlobalLayoutListener(mOnGlobalLayoutListener)
    }

    fun loadUrl(url: String) {
        mWebView.loadUrl(
            if (url.isEmpty()) {
                "data:text/html;charset=utf-8,<html></html>"
            } else if (url.startsWith("https://") || url.startsWith("http://")) { // 网络网页
                url
            } else { // 本地网页
                "file://${UTSAndroid.convert2AbsFullPath(url)}"
            }
        )
    }

    fun setProgressStyle(show: Boolean, color: String? = null) {
        mProgressShow = show
        if (color != null) {
            mProgressColor = color
        }
    }

    fun setHorizontalScrollBarAccess(access: Boolean) {
        mWebView.isHorizontalScrollBarEnabled = access
    }

    fun setVerticalScrollBarAccess(access: Boolean) {
        mWebView.isVerticalScrollBarEnabled = access
    }

    fun enableBounces(enable: Boolean) {
        mWebView.overScrollMode = if (enable) {
            View.OVER_SCROLL_ALWAYS
        } else {
            View.OVER_SCROLL_NEVER
        }
    }

    fun setNestedScroll(type: String) {
        mWebView.mNestedScrollType = type
    }

    fun enableDarkMode(enable: Boolean) {
        if (!enable) {
            setTheme("light")
        }
        mDarkModeEnable = enable
    }

    fun disableUserSelectMenu(disable: Boolean) {
        mWebView.mDisableUserSelectMenu = disable
    }

    fun back() {
        mWebView.apply {
            if (canGoBack()) goBack()
        }
    }

    fun forward() {
        mWebView.apply {
            if (canGoForward()) goForward()
        }
    }

    fun reload() {
        mWebView.reload()
    }

    fun stop() {
        mWebView.stopLoading()
    }

    fun loadData(options: UniWebViewElementLoadDataOptions) {
        mWebView.loadDataWithBaseURL(options.baseURL, options.data, options.mimeType ?: "text/html", options.encoding ?: "UTF-8", null)
    }

    fun evalJS(js : String) {
        val script = if (!js.startsWith(JS_PREFIX)) {
            "${JS_PREFIX}$js;})();"
        } else {
            js
        }
        mWebView.evaluateJavascript(script, null)
    }

    fun getContentHeight() : Number {
        return mWebView.mContentHeight
    }

    fun destroy() {
        UTSAndroid.offActivityCallback(mActivityCallback)
        viewTreeObserver.removeOnGlobalLayoutListener(mOnGlobalLayoutListener)
        if (mAppThemeChangedListenerId != 0) {
            UTSAndroid.offAppThemeChanged(mAppThemeChangedListenerId)
        }
        (mWebView.parent as? ViewGroup)?.removeView(mWebView)
        mWebView.destroy()
    }

    fun getAndroidWebView() : WebView {
        return mWebView
    }

    fun setEventCallback(callback: EventCallback) {
        mEventCallback = callback
    }

    /**
     * 初始化WebView
     */
    private fun initWebView() {
        val metaData = context.packageManager.getApplicationInfo(context.packageName, PackageManager.GET_META_DATA).metaData
        if (metaData != null) {
            mDebug = metaData.getBoolean("DCLOUD_DEBUG")
        }
        if (mDebug) {
            WebView.setWebContentsDebuggingEnabled(true)
        }
        mWebView.settings.apply {
            useWideViewPort = true
            loadWithOverviewMode = true
            domStorageEnabled = true
            setSupportZoom(true)
            builtInZoomControls = true
            displayZoomControls = false
            allowContentAccess = true
            defaultTextEncodingName = "GB2312"
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            WebViewUtils.openJSEnabled(this)
            WebViewUtils.setFileAccess(this, true)
            userAgentString = "$userAgentString $mDefaultUserAgent"
        }
        mWebView.apply {
            // 透明背景
            setBackgroundColor(Color.TRANSPARENT)
            removeJavascriptInterface("searchBoxJavaBridge_")
            removeJavascriptInterface("accessibilityTraversal")
            removeJavascriptInterface("accessibility")
            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                    val url = request?.url?.toString() ?: return false
                    if (isContinueLoad(url)) { // WebView加载
                        return false
                    } else { // WebView不加载，可能跳转其他应用
                        val intent = if (url.startsWith("intent://")) {
                            Intent.parseUri(url, Intent.URI_INTENT_SCHEME).apply {
                                addCategory(Intent.CATEGORY_BROWSABLE)
                                component = null
                                selector = null
                            }
                        } else {
                            Intent(Intent.ACTION_VIEW, url.toUri()).apply { addFlags(Intent.FLAG_ACTIVITY_NEW_TASK) }
                        }
                        if (context.packageManager.queryIntentActivities(intent, 0).isNotEmpty()) {
                            (context as? Activity)?.startActivityIfNeeded(intent, -1)
                        }
                        return true
                    }
                }

                override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                    if (url == null) return
                    mEventCallback?.onLoading(url)
                }

                override fun onPageFinished(view: WebView?, url: String?) {
                    if (view == null || url == null) return
                    if (view.progress == 100) { // onPageFinished 可能回调多次
                        mWebView.registerContentHeightObserver()
                        mEventCallback?.onLoad(url)
                    }
                }

                override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
                    super.onReceivedError(view, request, error)
                    if (request == null) return
                    mEventCallback?.onError(CODE_PAGE_ERROR, MESSAGE_PAGE_ERROR, request.url.toString())
                }

                override fun onReceivedHttpError(view: WebView?, request: WebResourceRequest?, errorResponse: WebResourceResponse?) {
                    if (request == null) return
                    mEventCallback?.onError(CODE_HTTP_ERROR, MESSAGE_HTTP_ERROR, request.url.toString())
                }

                override fun onReceivedSslError(view: WebView?, handler: SslErrorHandler?, error: SslError?) {
                    if (handler == null || error == null) return
                    when (mSSLType) {
                        SSL_TYPE_REFUSE -> {
                            handler.cancel()
                        }
                        SSL_TYPE_WARNING -> {
                            AlertDialog.Builder(context).create().apply {
                                setIcon(android.R.drawable.ic_secure)
                                setTitle(R.string.uniappx_webview_safety_warning)
                                setCanceledOnTouchOutside(false)
                                val msg = if (error.url.isNotEmpty()) {
                                    "${error.url}\n${context.getString(R.string.uniappx_webview_certificate_continue)}"
                                } else {
                                    context.getString(R.string.uniappx_webview_certificate_continue)
                                }
                                setMessage(msg)
                                val listener = DialogInterface.OnClickListener { _, which ->
                                    when (which) {
                                        DialogInterface.BUTTON_NEGATIVE -> {
                                            cancel()
                                            dismiss()
                                        }
                                        DialogInterface.BUTTON_POSITIVE -> {
                                            WebViewUtils.setSslHandlerState(handler, 1)
                                            dismiss()
                                        }
                                    }
                                }
                                setButton(
                                    DialogInterface.BUTTON_NEGATIVE,
                                    context.getString(android.R.string.cancel),
                                    listener
                                )
                                setButton(
                                    DialogInterface.BUTTON_POSITIVE,
                                    context.getString(android.R.string.ok),
                                    listener
                                )
                                show()
                            }
                        }
                        else -> { // 默认接受
                            WebViewUtils.setSslHandlerState(handler, 1)
                        }
                    }
                    mEventCallback?.onError(CODE_SSL_ERROR, MESSAGE_SSL_ERROR, error.url)
                }

                override fun onScaleChanged(view: WebView?, oldScale: Float, newScale: Float) {
                    super.onScaleChanged(view, oldScale, newScale)
                    mWebView.mScale = newScale
                }
            }
            webChromeClient = object : WebChromeClient() {
                override fun onPermissionRequest(request: PermissionRequest?) {
                    request?.grant(request.resources)
                }

                override fun onProgressChanged(view: WebView?, newProgress: Int) {
                    if (!mIsProgressing && newProgress < 100) {
                        mIsProgressing = true
                        startProgress()
                    }
                    // 处理无法加载或其他没有回调 onPageFinished 的情况
                    if (mIsProgressing && newProgress >= 100) {
                        mIsProgressing = false
                        endProgress()
                    }
                }

                override fun onReceivedTitle(view: WebView?, title: String?) {

                }

                override fun onGeolocationPermissionsShowPrompt(origin: String?, callback: GeolocationPermissions.Callback?) {
                    val ctx = context as? Activity ?: return
                    UTSAndroid.requestSystemPermission(ctx, utsArrayOf(Manifest.permission.ACCESS_FINE_LOCATION), { allRight: Boolean, grantedList: UTSArray<String> ->
                        if (allRight) {
                            callback?.invoke(origin, true, false)
                        }
                    }, { doNotAskAgain: Boolean, grantedList: UTSArray<String> ->
                        if (doNotAskAgain) {
                            Toast.makeText(ctx, resources.getString(R.string.uniappx_webview_no_location_permission), Toast.LENGTH_SHORT).show()
                        }
                        callback?.invoke(origin, false, false)
                    })
                }

                /**
                 * <input type="file" />
                 */
                override fun onShowFileChooser(webView: WebView?, filePathCallback: ValueCallback<Array<Uri>>?, fileChooserParams: FileChooserParams?): Boolean {
                    showFileChooser(
                        filePathCallback,
                        fileChooserParams?.acceptTypes?.getOrNull(0) ?: "*/*",
                        fileChooserParams?.mode == FileChooserParams.MODE_OPEN_MULTIPLE,
                        fileChooserParams?.isCaptureEnabled == true
                    )
                    return true
                }

                /**
                 * 进入全屏模式
                 */
                override fun onShowCustomView(view: View?, callback: CustomViewCallback?) {
                    if (mCustomView != null) {
                        callback?.onCustomViewHidden()
                        return
                    }
                    addView(
                        view,
                        LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
                    )
                    mCustomView = view
                    mCustomViewCallback = callback
                    setBarVisibility(false)
                }

                /**
                 * 退出全屏模式
                 */
                override fun onHideCustomView() {
                    if (mCustomView == null) return
                    removeView(mCustomView)
                    mCustomView = null
                    mCustomViewCallback?.onCustomViewHidden()
                    mCustomViewCallback = null
                    setBarVisibility(true)
                }

                /**
                 * 日志输出
                 */
                override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                    if (mDebug && consoleMessage != null) {
                        mEventCallback?.onConsoleMessage(consoleMessage.message(), consoleMessage.lineNumber(), consoleMessage.sourceId())
                    }
                    return false
                }
            }
            addJavascriptInterface(object : Any() {
                @JavascriptInterface
                public fun postMessage(message: String?) {
                    message?.let {
                        mEventCallback?.onMessage(it, POST_MESSAGE)
                    }
                }

                @JavascriptInterface
                public fun postMessageToService(message: String?) {
                    message?.let {
                        mEventCallback?.onMessage(it, POST_MESSAGE_TO_SERVICE)
                    }
                }

                @JavascriptInterface
                public fun onContentHeightChange(height: Float) {
                    mWebView.mContentHeight = height
                    mEventCallback?.onContentHeightChange(height)
                }
            }, JS_INTERFACE_NAME)

            setDownloadListener { url, userAgent, contentDisposition, mimetype, contentLength ->
                mEventCallback?.onDownload(url, userAgent, contentDisposition, mimetype, contentLength)
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                mAppThemeChangedListenerId = UTSAndroid.onAppThemeChanged {
                    setTheme(it.getString("appTheme"), mDarkModeEnable)
                }
                setTheme(UTSAndroid.getAppTheme())
            }
        }
    }

    private fun showFileChooser(callback: ValueCallback<Array<Uri>>?, acceptType: String, multiple: Boolean, isCaptureEnabled: Boolean) {
        val ctx = context as? Activity ?: return
        mFilePathCallback = callback
        val mimeType = if (acceptType.isEmpty()) {
            "*/*"
        } else {
            val extension = MimeTypeMap.getFileExtensionFromUrl(acceptType)
            MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension.lowercase()) ?: acceptType
        }
        if (isCaptureEnabled) {
            if (mimeType.startsWith("audio/")) {
                try {
                    val intent = Intent(MediaStore.Audio.Media.RECORD_SOUND_ACTION)
                    ctx.startActivityForResult(intent, REQUEST_CODE_MICROPHONE)
                } catch (_ : ActivityNotFoundException) { }
            } else if (mimeType.startsWith("image/") || mimeType.startsWith("video/")) {
                UTSAndroid.requestSystemPermission(ctx, utsArrayOf(Manifest.permission.CAMERA), { allRight: Boolean, grantedList: UTSArray<String> ->
                    if (allRight) {
                        var ext = ""
                        val intent = Intent()
                        if (mimeType.startsWith("image/")) {
                            ext = ".jpg"
                            intent.action = MediaStore.ACTION_IMAGE_CAPTURE
                        } else if (mimeType.startsWith("video/")) {
                            ext = ".mp4"
                            intent.action = MediaStore.ACTION_VIDEO_CAPTURE
                        }
                        val file = File("${ctx.externalCacheDir}/${WEB_VIEW_CACHE_DIR}/", System.currentTimeMillis().toString() + ext)
                        if (file.parentFile?.exists() == false) file.parentFile?.mkdirs()
                        val uri = FileProvider.getUriForFile(ctx, ctx.packageName + ".dc.fileprovider", file)
                        intent.putExtra(MediaStore.EXTRA_OUTPUT, uri)
                        ctx.startActivityForResult(intent, REQUEST_CODE_CAMERA)
                        mCameraOutputUri = uri
                    }
                }, { doNotAskAgain: Boolean, grantedList: UTSArray<String> ->
                    if (doNotAskAgain) {
                        Toast.makeText(ctx, resources.getString(R.string.uniappx_webview_no_camera_permission), Toast.LENGTH_SHORT).show()
                    }
                    mFilePathCallback?.onReceiveValue(null)
                })
            } else {
                showFileChooseDialog(ctx, mimeType, multiple)
            }
        } else {
            showFileChooseDialog(ctx, mimeType, multiple)
        }
    }

    private fun showFileChooseDialog(ctx: Activity, mimeType: String, multiple: Boolean) {
        val intent = Intent(Intent.ACTION_GET_CONTENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = mimeType
            if (multiple) putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
        }
        mFileChooseDialog = WebViewFileChooseDialog(ctx, intent)
        mFileChooseDialog?.show()
        mFileChooseDialog?.setOnCancelListener {
            mFilePathCallback?.onReceiveValue(null)
        }
    }

    private fun handleOnActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == REQUEST_CODE_FILE) { // 文件
                val value = data?.data
                if (value != null) {
                    mFilePathCallback?.onReceiveValue(arrayOf(value))
                } else {
                    val _value = data?.clipData
                    if (_value != null) {
                        val count = _value.itemCount
                        val uris = arrayListOf<Uri>()
                        for (i in 0 until count) {
                            uris.add(_value.getItemAt(i).uri)
                        }
                        mFilePathCallback?.onReceiveValue(uris.toTypedArray())
                    } else {
                        mFilePathCallback?.onReceiveValue(null)
                    }
                }
            } else if (requestCode == REQUEST_CODE_CAMERA) { // 相机
                val value = mCameraOutputUri
                if (value != null) {
                    mFilePathCallback?.onReceiveValue(arrayOf(value))
                } else {
                    val _value = mFileChooseDialog?.cameraUri
                    if (_value != null) {
                        mFilePathCallback?.onReceiveValue(arrayOf(_value))
                    } else {
                        mFilePathCallback?.onReceiveValue(null)
                    }
                }
            } else if (resultCode == REQUEST_CODE_MICROPHONE) { // 录音机
                val value = data?.data
                if (value != null) {
                    mFilePathCallback?.onReceiveValue(arrayOf(value))
                } else {
                    mFilePathCallback?.onReceiveValue(null)
                }
            }
        } else {
            // 当取消操作的时候也需要调用，避免程序不响应
            mFilePathCallback?.onReceiveValue(null)
        }
        mFileChooseDialog?.dismiss()
        mFileChooseDialog = null
        mFilePathCallback = null
    }

    /**
     * 设置状态栏和导航栏显示隐藏
     */
    @Suppress("DEPRECATION")
    private fun setBarVisibility(visible: Boolean) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val controller = windowInsetsController
            if (visible) {
                controller?.show(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
            } else {
                controller?.hide(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
            }
            controller?.systemBarsBehavior =
                WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        } else {
            val decorView = (context as? Activity)?.window?.decorView ?: return
            if (visible) {
                decorView.systemUiVisibility = mCurrentSystemUiVisibility // 恢复之前的配置
            } else {
                mCurrentSystemUiVisibility = decorView.systemUiVisibility // 缓存之前的配置
                decorView.systemUiVisibility =
                    SYSTEM_UI_FLAG_HIDE_NAVIGATION or SYSTEM_UI_FLAG_FULLSCREEN or SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            }
        }
    }

    private fun startProgress() {
        if (!showProgress()) return
        if (mWebViewProgressBar.parent == null) {
            addView(mWebViewProgressBar, LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, UTSAndroid.convertToNativePx("2", 2)))
        }
        mWebViewProgressBar.setColorInt(UTSAndroid.convertToNativeColor(mProgressColor, Color.parseColor("#00FF00")))
        mWebViewProgressBar.startProgress()
    }

    private fun endProgress() {
        if (!showProgress()) return
        mWebViewProgressBar.finishProgress()
    }

    private fun showProgress(): Boolean {
        return mProgressShow && !TextUtils.isEmpty(mWebView.url) && mWebView.url?.startsWith("file") == false
    }

    /**
     * 判断当前WebView是否继续加载url
     */
    @Suppress("DEPRECATION")
    private fun isContinueLoad(url: String): Boolean {
        return url.run {
            startsWith("file://")
                || startsWith("http://") && !startsWith("http://localhost")
                || startsWith("https://") && !startsWith("https://localhost")
                || startsWith("rtmp://") && !startsWith("rtmp://localhost")
                || startsWith("rtsp://") && !startsWith("rtsp://localhost")
                || startsWith(Environment.getExternalStorageDirectory().path)
                || startsWith(Environment.getExternalStorageDirectory().path.substring(1))
                || context.filesDir.parent?.let { startsWith(it) } ?: false
                || context.filesDir.parent?.let { startsWith(it.substring(1)) } ?: false
        }
    }

    private fun keyBoardShow(usableHeight: Int) {
        mWebView.evaluateJavascript(
            """
                javascript:(function() {
                    try {
                        var targetActiveElement = document.activeElement;
                        var targetIFrameTop = 0;
                        if (targetActiveElement.tagName == 'IFRAME') {
                            while (targetActiveElement.contentDocument != null) {
                                targetIFrameTop = targetActiveElement.getBoundingClientRect().top;
                                targetActiveElement = targetActiveElement.contentDocument.activeElement;
                            }
                        }
                        if (targetActiveElement.tagName == 'INPUT' || targetActiveElement.tagName == 'TEXTAREA') {
                            var targetActiveElementType = targetActiveElement.getAttribute('type');
                            if (targetActiveElementType == null || targetActiveElementType == 'text' || targetActiveElementType == 'password' || targetActiveElementType == 'number' || targetActiveElementType == 'email' || targetActiveElementType == 'tel' || targetActiveElementType == 'search') {
                                return targetActiveElement.getBoundingClientRect().bottom + targetIFrameTop;
                            }
                        }
                    } catch (err) {
                        console.log(JSON.stringify(err));
                    }
                })();
            """.trimIndent()
        ) {
            if (it == "null") return@evaluateJavascript
            val location = IntArray(2)
            mWebView.getLocationOnScreen(location)
            val inputBottom = (it.toFloat() * mWebView.mScale).roundToInt() + location[1]
            if (inputBottom > usableHeight) { // 输入框被遮挡
                val deltaY = inputBottom - usableHeight
                if (mWebView.scrollY + mWebView.height + deltaY > mWebView.contentHeight * mWebView.mScale || location[1] >= usableHeight) { // 滚动距离不满足或 WebView 完全被软键盘遮挡，页面位移
                    mInputFlag = INPUT_TRANSLATE_PAGE
                    mRenderContainer?.translationY = -deltaY.toFloat()
                } else { // 滚动距离满足，WebView 内网页内容滚动
                    mInputFlag = INPUT_SCROLL_CONTENT
                    mWebView.scrollBy(0, deltaY)
                }
                mInputDeltaY = deltaY
            }
        }
    }

    private fun keyBoardHide() {
        val flag = mInputFlag ?: return
        val deltaY = mInputDeltaY ?: return
        when (flag) {
            INPUT_SCROLL_CONTENT -> mWebView.scrollBy(0, -deltaY)
            INPUT_TRANSLATE_PAGE -> mRenderContainer?.translationY = 0f
        }
        mInputFlag = null
        mInputDeltaY = null
    }

    @Suppress("DEPRECATION")
    private fun setTheme(appTheme: String?, enable: Boolean = true) {
        if (!enable) return
        if (context.packageManager.getPackageInfo(context.packageName, 0).applicationInfo!!.targetSdkVersion >= Build.VERSION_CODES.TIRAMISU
            && WebViewFeature.isFeatureSupported(WebViewFeature.ALGORITHMIC_DARKENING)) {
            when (appTheme) {
                "light" -> {
                    AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
                    WebSettingsCompat.setAlgorithmicDarkeningAllowed(mWebView.settings, false)
                }
                "dark" -> {
                    AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
                    WebSettingsCompat.setAlgorithmicDarkeningAllowed(mWebView.settings, false)
                }
                "auto" -> {
                    if (UTSAndroid.getOsTheme() == "light") {
                        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
                        WebSettingsCompat.setAlgorithmicDarkeningAllowed(mWebView.settings, false)
                    } else {
                        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
                        WebSettingsCompat.setAlgorithmicDarkeningAllowed(mWebView.settings, false)
                    }
                }
            }
        } else if (WebViewFeature.isFeatureSupported(WebViewFeature.FORCE_DARK)) {
            when (appTheme) {
                "light" -> WebSettingsCompat.setForceDark(mWebView.settings, WebSettingsCompat.FORCE_DARK_OFF)
                "dark" -> WebSettingsCompat.setForceDark(mWebView.settings, WebSettingsCompat.FORCE_DARK_ON)
                "auto" -> {
                    if (UTSAndroid.getOsTheme() == "light") {
                        WebSettingsCompat.setForceDark(mWebView.settings, WebSettingsCompat.FORCE_DARK_OFF)
                    } else {
                        WebSettingsCompat.setForceDark(mWebView.settings, WebSettingsCompat.FORCE_DARK_ON)
                    }
                }
            }
        }
    }
}

@SuppressLint("ClickableViewAccessibility")
class UniInternalWebView @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null
) : WebView(context, attrs) {
    internal var mNestedScrollType = "all"
    internal var mScale = scale
    internal var mContentHeight = 0f
    internal var mDisableUserSelectMenu = false

    private var mContentWidth = 0f
    private var lastX = 0f
    private var lastY = 0f

    override fun startActionMode(callback: ActionMode.Callback?): ActionMode? {
        return if (mDisableUserSelectMenu) {
            super.startActionMode(DisableMenuCallback())
        } else {
            super.startActionMode(callback)
        }
    }

    override fun startActionMode(callback: ActionMode.Callback?, type: Int): ActionMode? {
        return if (mDisableUserSelectMenu) {
            super.startActionMode(DisableMenuCallback(), type)
        } else {
            super.startActionMode(callback, type)
        }
    }

    override fun dispatchTouchEvent(event: MotionEvent): Boolean {
        if (mNestedScrollType == "none") {
            parent?.requestDisallowInterceptTouchEvent(true)
            return super.dispatchTouchEvent(event)
        }
        when (event.action) {
            MotionEvent.ACTION_DOWN -> {
                lastX = event.x
                lastY = event.y
                parent?.requestDisallowInterceptTouchEvent(true)
            }
            MotionEvent.ACTION_MOVE -> {
                val deltaX = abs(event.x - lastX)
                val deltaY = abs(event.y - lastY)
                when (mNestedScrollType) {
                    "all" -> {
                        if (scrollY <= 0 && event.y > lastY && deltaY > deltaX * 2
                            || scrollY + height + NativeWebViewImpl.REACH_BOTTOM_THRESHOLD >= contentHeight * mScale && event.y < lastY && deltaY > deltaX * 2
                            || scrollX <= 0 && event.x > lastX && deltaX > deltaY * 2
                            || scrollX + width + NativeWebViewImpl.REACH_BOTTOM_THRESHOLD >= mContentWidth * mScale && event.x < lastX && deltaX > deltaY * 2) {
                            parent?.requestDisallowInterceptTouchEvent(false)
                        }
                    }
                    "horizontal" -> {
                        if (scrollX <= 0 && event.x > lastX && deltaX > deltaY * 2
                            || scrollX + width + NativeWebViewImpl.REACH_BOTTOM_THRESHOLD >= mContentWidth * mScale && event.x < lastX && deltaX > deltaY * 2) {
                            parent?.requestDisallowInterceptTouchEvent(false)
                        }
                    }
                    "vertical" -> {
                        if (scrollY <= 0 && event.y > lastY && deltaY > deltaX * 2
                            || scrollY + height + NativeWebViewImpl.REACH_BOTTOM_THRESHOLD >= contentHeight * mScale && event.y < lastY && deltaY > deltaX * 2) {
                            parent?.requestDisallowInterceptTouchEvent(false)
                        }
                    }
                }
            }
        }
        return super.dispatchTouchEvent(event)
    }

    fun registerContentHeightObserver() {
        mContentHeight = contentHeight.toFloat()
        evaluateJavascript(
            """
                javascript:(function() {
                    try {
                        var currentContentHeight = Math.min(document.body.scrollHeight, document.documentElement.scrollHeight);
                        window.__uniapp_x_.onContentHeightChange(currentContentHeight);
                        var lastContentHeight = currentContentHeight;
                        setTimeout(function () {
                            currentContentHeight = Math.min(document.body.scrollHeight, document.documentElement.scrollHeight);
                            if (currentContentHeight != lastContentHeight) {
                                lastContentHeight = currentContentHeight;
                                window.__uniapp_x_.onContentHeightChange(currentContentHeight);
                            }
                        }, 100);
                        new MutationObserver(function () {
                            currentContentHeight = document.documentElement.scrollHeight;
                            if (currentContentHeight != lastContentHeight) {
                                lastContentHeight = currentContentHeight;
                                window.__uniapp_x_.onContentHeightChange(currentContentHeight);
                            }
                        }).observe(document.documentElement, {
                            subtree: true,
                            childList: true,
                            attributes: true
                        });
                        return document.body.scrollWidth;
                    } catch (err) {
                        console.log(JSON.stringify(err));
                    }
                })();
            """.trimIndent()
        ) {
            if (it == "null") return@evaluateJavascript
            mContentWidth = it.toFloat()
        }
    }
}

interface EventCallback {
    fun onError(errCode: Number, errMsg: String, fullUrl: String)
    fun onLoading(url: String)
    fun onLoad(url: String)
    fun onDownload(url: String, userAgent: String, contentDisposition: String, mimetype: String, contentLength: Number)
    fun onMessage(params: String, type: Number)
    fun onContentHeightChange(height: Number)
    fun onConsoleMessage(message: String, lineNumber: Number, sourceId: String)
}

private class DisableMenuCallback() : ActionMode.Callback {
    override fun onCreateActionMode(mode: ActionMode?, menu: Menu?): Boolean {
        return true
    }

    override fun onPrepareActionMode(mode: ActionMode?, menu: Menu?): Boolean {
        return false
    }

    override fun onActionItemClicked(mode: ActionMode?, item: MenuItem?): Boolean {
        return false
    }

    override fun onDestroyActionMode(mode: ActionMode?) {
    }
}

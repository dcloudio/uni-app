//
//  InnerWebView.swift
//
//  Created on 2025/11/11.
//

import Foundation
import UIKit
import WebKit
import DCloudUTSFoundation
import DCloudUniappRuntime

let kInnerWebViewScriptBirdgeName = "__uniapp_x_"
let kNativeObserverKeyPathTitle = "title"
let kNativeObserverKeyPathProgress = "estimatedProgress"
let kNativeObserverKeyPathContentSize = "contentSize"
let kInnerWebViewProgressHeight: CGFloat = 2

public typealias UniNativeViewEventCallback = (UniNativeViewEvent) -> Void

// MARK: - web style 定义
public class InnerWebViewStyles: NSObject {
    var progressColor: UIColor = .green
    var showProgress: Bool = true
    
    override init() {
        super.init()
    }
    
    func update(isShow: Bool?, color: UIColor) {
        if let isShow = isShow {
            showProgress = isShow
        }
        progressColor = color
    }
}


// MARK: - Event 定义
public class InnerWebViewLoadingEvent: UniEvent {
    public static let eventName = "loading"
    public class Detail {
        public var url: String = ""
        public var src: String = ""
    }
    
    public var detail: Detail
    
    init(detail: Detail) {
        self.detail = detail
        super.init(InnerWebViewLoadingEvent.eventName)
    }
    
    func toMap() -> [String: Any?] {
        var ret: [String: Any?] = [:]
        ret["type"] = self.type
        ret["detail"] = detailMap()
        return ret
    }
    
    func detailMap() -> [String: Any?] {
        let detail = [
            "url": detail.url,
            "src": detail.src
        ]
        return detail
    }
}

public class InnerWebViewLoadedEvent: UniEvent {
    public static let eventName = "loaded"
    
    public class Detail {
        public var url: String = ""
        public var src: String = ""
        
        init(_ url: String, _ src: String) {
            self.url = url
            self.src = src
        }
    }
    
    public var detail: Detail
    
    init(detail: Detail) {
        self.detail = detail
        super.init(InnerWebViewLoadedEvent.eventName)
    }
    
    func toMap() -> [String: Any?] {
        var ret: [String: Any?] = [:]
        ret["type"] = self.type
        ret["detail"] = detailMap()
        return ret
    }
    
    func detailMap() -> [String: Any?] {
        let detail = [
            "url": detail.url,
            "src": detail.src
        ]
        return detail
    }
}


public class InnerWebViewLoadEvent: UniEvent {
    public static let eventName = "load"
    
    public class Detail {
        public var url: String = ""
        public var src: String = ""
        
        init(_ url: String, _ src: String) {
            self.url = url
            self.src = src
        }
    }
    
    public var detail: Detail
    
    init(detail: Detail) {
        self.detail = detail
        super.init(InnerWebViewLoadEvent.eventName)
    }
    
    func toMap() -> [String: Any?] {
        var ret: [String: Any?] = [:]
        ret["type"] = self.type
        ret["detail"] = detailMap()
        return ret
    }
    
    func detailMap() -> [String: Any?] {
        let detail = [
            "url": detail.url,
            "src": detail.src
        ]
        return detail
    }
}

public class InnerWebViewMessageEvent: UniEvent {
    public static let eventName = "message"
    public class Detail {
        public var data: [UTSJSONObject] = []
    }
    
    public var detail: Detail
    
    init(detail: Detail) {
        self.detail = detail
        super.init(InnerWebViewMessageEvent.eventName)
    }
    
    func toMap() -> [String: Any?] {
        var ret: [String: Any?] = [:]
        ret["type"] = self.type
        ret["detail"] = detailMap()
        return ret
    }
    
    func detailMap() -> [String: Any?] {
        let arr = self.detail.data.map { $0.toMap() }
        let detail = ["data": arr]
        return detail
    }
}

public class InnerWebViewServiceMessageEvent: UniEvent {
    public static let eventName = "onWebViewServiceMessage"

    public class Detail {
        public var data: [String: Any] = [:]

        init(_ data: [String: Any]) {
            self.data = data
        }
    }

    public var detail: Detail

    init(detail: Detail) {
        self.detail = detail
        super.init(InnerWebViewServiceMessageEvent.eventName)
    }

    func toMap() -> [String: Any?] {
        var ret: [String: Any?] = [:]
        ret["type"] = self.type
        ret["detail"] = detailMap()
        return ret
    }

    func detailMap() -> [String: Any?] {
        let detail = ["data": self.detail.data]
        return detail
    }
}

public class InnerWebViewDownloadEvent: UniEvent {
    public static let eventName = "download"
    
    public class Detail {
        public var url: String = ""
        public var userAgnet: String = ""
        public var contentDisposition: String = ""
        public var mimetype: String = ""
        public var contentLength: NSNumber = 0
    }
    
    public var detail: Detail
    
    init(detail: Detail) {
        self.detail = detail
        super.init(InnerWebViewDownloadEvent.eventName)
    }
    
    func toMap() -> [String: Any?] {
        var ret: [String: Any?] = [:]
        ret["type"] = self.type
        
        ret["detail"] = detailMap()
        return ret
    }
    
    func detailMap() -> [String: Any?] {
        let detail = [
            "url": detail.url,
            "userAgnet": detail.userAgnet,
            "contentDisposition": detail.contentDisposition,
            "mimetype": detail.mimetype,
            "contentLength": "\(detail.contentLength.doubleValue)"
        ]
        return detail
    }
}


public enum InnerWebViewErrorType: Int {
    case ssl = 100001
    case page = 100002
    case http = 100003
}


public class InnerWebViewErrorEvent: UniEvent {
    public static let eventName = "error"
    
    public class Detail {
        public var errMsg: String = ""
        public var errCode: NSNumber = NSNumber(value: 0)
        public var errSubject: String = "uni-web-view"
        public var url: String = ""
        public var fullUrl: String = ""
        public var src: String = ""
        
        
        init(_ type: InnerWebViewErrorType) {
            errCode = NSNumber(value: type.rawValue)
            switch type {
            case .ssl:
                errMsg = "ssl error"
            case .page:
                errMsg = "page error"
            case .http:
                errMsg = "http error"
            }
        }
        
        convenience init(_ error: NSError) {
            let type = Self.getErrorType(error)
            self.init(type)
        }
        
        static func getErrorType(_ error: NSError) -> InnerWebViewErrorType {
            let code = (error as NSError).code
            switch code {
            case NSURLErrorCancelled,
                NSURLErrorBadURL,
                NSURLErrorTimedOut,
                NSURLErrorUnsupportedURL,
                NSURLErrorCannotFindHost,
                NSURLErrorCannotConnectToHost,
                NSURLErrorNetworkConnectionLost,
                NSURLErrorDNSLookupFailed,
                NSURLErrorHTTPTooManyRedirects,
                NSURLErrorResourceUnavailable,
                NSURLErrorNotConnectedToInternet,
                NSURLErrorRedirectToNonExistentLocation,
                NSURLErrorBadServerResponse,
                NSURLErrorUserCancelledAuthentication,
                NSURLErrorUserAuthenticationRequired,
                NSURLErrorZeroByteResource,
                NSURLErrorCannotDecodeRawData,
                NSURLErrorCannotDecodeContentData,
                NSURLErrorCannotParseResponse,
                NSURLErrorInternationalRoamingOff,
                NSURLErrorCallIsActive,
                NSURLErrorDataNotAllowed,
                NSURLErrorRequestBodyStreamExhausted,
                NSURLErrorAppTransportSecurityRequiresSecureConnection,
                NSURLErrorFileDoesNotExist,
                NSURLErrorFileIsDirectory,
                NSURLErrorNoPermissionsToReadFile,
                NSURLErrorDataLengthExceedsMaximum,
            NSURLErrorFileOutsideSafeArea:
                
                return .http
            case NSURLErrorSecureConnectionFailed,
                NSURLErrorServerCertificateHasBadDate,
                NSURLErrorServerCertificateUntrusted,
                NSURLErrorServerCertificateHasUnknownRoot,
                NSURLErrorServerCertificateNotYetValid,
                NSURLErrorClientCertificateRejected,
                NSURLErrorClientCertificateRequired,
            NSURLErrorCannotLoadFromNetwork:
                return .ssl
            default:
                return .page
            }
        }
    }
    
    public var detail: Detail
    
    init(detail: Detail) {
        self.detail = detail
        super.init(InnerWebViewErrorEvent.eventName)
    }
    
    func toMap() -> [String: Any?] {
        var ret: [String: Any?] = [:]
        ret["type"] = self.type
        
        ret["detail"] = detailMap()
        return ret
    }
    
    func detailMap() -> [String: Any?] {
        let detail: [String: Any] = [
            "url": detail.url,
            "fullUrl": detail.fullUrl,
            "src": detail.src,
            "errMsg": detail.errMsg,
            "errCode": detail.errCode,
            "errSubject": detail.errSubject
        ]
        return detail
    }
}

public class InnerWebViewContentHeightChangeEvent: UniEvent {
    
    public static let eventName = "contentheightchange"
    
    public class Detail {
        public var height: NSNumber
        
        init(contentHeight: NSNumber) {
            self.height = contentHeight
        }
    }
    
    public var detail: Detail
    
    init(detail: Detail) {
        self.detail = detail
        super.init(InnerWebViewContentHeightChangeEvent.eventName)
    }
    
    func toMap() -> [String: Any?] {
        var ret: [String: Any?] = [:]
        ret["type"] = self.type
        
        ret["detail"] = detailMap()
        return ret
    }
    
    func detailMap() -> [String: Any?] {
        let detail = [
            "height": detail.height,
        ]
        return detail
    }
}

public class InnerWebViewDidTerminateEvent: UniEvent {
    
    public static let eventName = "didterminate"
    
    init() {
        super.init(InnerWebViewDidTerminateEvent.eventName)
    }
    
    func toMap() -> [String: Any?] {
        var ret: [String: Any?] = [:]
        ret["type"] = self.type
        ret["detail"] = detailMap()
        return ret
    }
    
    func detailMap() -> [String: Any?] {
        return [:]
    }
}

// MARK: WKScriptMessageHandler 实现
/// 弱引用的WKScriptMessageHandler， 避免引起循环引用
class InnerWeakScriptMessageDelegate: NSObject, WKScriptMessageHandler {
    weak var scriptDelegate: WKScriptMessageHandler? = nil
    
    init(scriptDelegate: WKScriptMessageHandler? = nil) {
        self.scriptDelegate = scriptDelegate
        super.init()
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        scriptDelegate?.userContentController(userContentController, didReceive: message)
    }
    
}

// MARK: WebView  的 native 模式实现
public class InnerWebView: UniBaseWebView, UIGestureRecognizerDelegate {

    public var progressView: UIProgressView?
    public var innerUrl: String?
    public var domNode: UniElementImpl?

    public var wvStyles: InnerWebViewStyles?
    public var disableUserSelectMenu: Bool = false
    
    public var needRemoveObserver: Bool = false
    public var horizontalScrollBarAccess: Bool = true {
        didSet {
            self.scrollView.showsHorizontalScrollIndicator = horizontalScrollBarAccess
        }
    }
    public var verticalScrollBarAccess: Bool = true {
        didSet {
            self.scrollView.showsVerticalScrollIndicator = verticalScrollBarAccess
        }
    }
    public var webViewBounces: Bool = true {
        didSet {
            self.scrollView.bounces = webViewBounces
        }
    }
    
    public var didFinishedLoad: Bool = false
    
    /// 文档就绪状态（通过JavaScript主动通知）
    private var documentReady: Bool = false
    
    public var contentHeight: CGFloat = 0
    
    /// 是否已添加白屏检测通知监听
    private var hasAddedBlankScreenObserver: Bool = false

    /// 是否正在选择文本
    private var isSelectingText = false
    
    // MARK: - JS Cache
    fileprivate var jsSourceId = 0
    fileprivate var jsSourceDict: [Int: String] = [:]
    
    // MARK: - Event Callbacks (可选，供外部设置)
    public var onLoadingCallback: UniNativeViewEventCallback?
    public var onLoadedCallback: UniNativeViewEventCallback?
    public var onLoadCallback: UniNativeViewEventCallback?
    public var onErrorCallback: UniNativeViewEventCallback?
    public var onMessageCallback: UniNativeViewEventCallback?
    public var onDownloadCallback: UniNativeViewEventCallback?
    public var onContentHeightChangeCallback: UniNativeViewEventCallback?
    public var onDidTerminateCallback: UniNativeViewEventCallback?
    
    public var onServiceMessageCallback: UniNativeViewEventCallback?
		
    // MARK: - Init
    public init(frame: CGRect = .zero,
                configuration: WKWebViewConfiguration? = nil,
                styles: InnerWebViewStyles? = nil,
                initialUrl: String? = nil,
                initialSource: String? = nil) {
        
        let config = configuration ?? WKWebViewConfiguration()
        if let appConfig = domNode?.context.getUniContext().getApp()?.appConfig {
            config.allowsInlineMediaPlayback = appConfig.allowsInlineMediaPlayback
            //            config.mediaPlaybackRequiresUserAction = appConfig.mediaPlaybackRequiresUserAction
            if appConfig.allowFileAccessFromFileURLs {
                config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
            }
        }
        
        super.init(frame: frame, configuration: config)
        
        // 配置 webview
        if #available(iOS 16.4, *) {
            self.isInspectable = true
        }
        if #available(iOS 9.0, *) {
            self.customUserAgent =  UTSiOS.getUserAgent()
        }
        if #available(iOS 11.0, *) {
            self.scrollView.contentInsetAdjustmentBehavior = .never
        }
        self.scrollView.showsVerticalScrollIndicator = verticalScrollBarAccess
        self.scrollView.showsHorizontalScrollIndicator = horizontalScrollBarAccess
        self.scrollView.bounces = webViewBounces

        // 初始化属性
        self.wvStyles = styles ?? InnerWebViewStyles()

        if let urlStr = initialUrl {
            _ = updateUrl(urlStr)
        }

        // 添加点击手势识别器 (用于 click 事件控制)
        setupTapGesture()
    }

    // MARK: - Tap Gesture Setup
    private func setupTapGesture() {
        let tap = UITapGestureRecognizer(target: self, action: #selector(handleTap(_:)))
        tap.delaysTouchesBegan = true
        tap.delegate = self
        self.addGestureRecognizer(tap)
    }

    @objc func handleTap(_ tap: UITapGestureRecognizer) {
        checkSelectedText()

        // 获取点击位置（WebView 坐标系）
        let locationInWebView = tap.location(in: self)

        // 通过 JS 同步检测该坐标是否点击了链接或图片
        let checkJS = "window.__uniapp_x_checkClickableElement ? window.__uniapp_x_checkClickableElement(\(locationInWebView.x), \(locationInWebView.y)) : null"

        self.evaluateJavaScript(checkJS) { [weak self] (result, error) in
            guard let self = self else { return }

            // 检查文本选择状态
            if self.isSelectingText {
                // 文本选择状态下，不触发 click 事件
                self.isSelectingText = false
                return
            }

            // 判断是否点击了可点击元素
            var needSendClickEvent = false
            if let resultDict = result as? [String: Any],
               let elementClicked = resultDict["elementClicked"] as? Bool,
               elementClicked {
                // 点击了链接或图片，阻断外层 click 事件
                needSendClickEvent = true

                if let elementType = resultDict["type"] as? String {
                    if elementType == "link", let href = resultDict["href"] as? String {
                        UNILogDebug("InnerWebView: Link clicked at (\(locationInWebView.x), \(locationInWebView.y)) - \(href), blocking component click")
                    } else if elementType == "img", let src = resultDict["src"] as? String {
                        UNILogDebug("InnerWebView: Image clicked at (\(locationInWebView.x), \(locationInWebView.y)) - \(src), blocking component click")
                    }
                }
            }

            // 根据检测结果决定是否触发组件 click 事件（点击链接/图片不触发）
            if !needSendClickEvent {
                if let component = self.domNode?.component {
                    component.onClick(tap)
                }
            }
        }
    }

    // 检查是否处于选择文本状态
    func checkSelectedText() {
        guard !isSelectingText else { return }

        let js = "window.getSelection().toString();"
        self.evaluateJavaScript(js) { [weak self] (result, error) in
            if let selectedText = result as? String, !selectedText.isEmpty {
                self?.isSelectingText = true
            }
        }
    }

    // UIGestureRecognizerDelegate - 允许与其他手势同时识别
    public func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        // 不与长按手势同时识别
        if otherGestureRecognizer is UILongPressGestureRecognizer {
            return false
        }
        return true
    }
    
    required public init?(coder: NSCoder) {
        super.init(coder: coder)
        self.wvStyles = InnerWebViewStyles()
    }
    
    // MARK: - Lifecycle Methods
    /// 对应原来的 viewDidLoad()
    public override func onViewDidLoad() {
        super.onViewDidLoad()
        
        self.uiDelegate = self
        self.navigationDelegate = self
        self.backgroundColor = .clear
        self.isOpaque = false
        self.addObserver(self, forKeyPath: kNativeObserverKeyPathTitle, options: .new, context: nil)
        self.scrollView.addObserver(self, forKeyPath: kNativeObserverKeyPathContentSize, options: .new, context: nil)
        self.needRemoveObserver = true
        
        let source = """
            ;function __uniapp_x_postMessage(data) {
                window.webkit.messageHandlers.__uniapp_x_.postMessage({type:3,data:data});
            };
            ;function __uniapp_x_postMessageToService(data) {
                window.webkit.messageHandlers.__uniapp_x_.postMessage({type:4,data:data});
            };
            ;function __uniapp_x_uni_sendSourceIdInternal(data) {
                window.webkit.messageHandlers.__uniapp_x_.postMessage({type:1012,data:data});
            };
            window.__uniapp_x_ = {
                postMessage: function(str) {
                    const data = JSON.parse(str);
                    window.webkit.messageHandlers.__uniapp_x_.postMessage({type:3,data:data});
                },
                postMessageToService: function(str) {
                    const data = JSON.parse(str);
                    window.webkit.messageHandlers.__uniapp_x_.postMessage({type:4,data:data});
                }
            };

            // 文档就绪状态检测和通知
            (function() {
                var notified = false;
                function notifyReady() {
                    if (!notified && (document.readyState === 'interactive' || document.readyState === 'complete')) {
                        notified = true;
                        window.webkit.messageHandlers.__uniapp_x_.postMessage({type:1013,data:{ready:true}});

                        // 文档就绪后，添加链接点击监听 (用于阻断外层 click 事件)
                        setupLinkClickListener();
                    }
                }

                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', notifyReady, {once: true});
                } else {
                    notifyReady();
                }
            })();

            // 公共函数：从指定元素向上查找可点击元素 (<a> 或 <img>)
            // maxDepth: 向上查找的最大层数 (默认 5 层)
            function findClickableElement(element, maxDepth) {
                if (!element) return null;
                maxDepth = maxDepth || 5;

                let target = element;
                let clickedElement = null;
                let elementType = null;

                // 向上查找最多 maxDepth 层
                for (let i = 0; i < maxDepth && target; i++) {
                    // 检查是否是链接
                    if (target.tagName === 'A' && target.href) {
                        clickedElement = target;
                        elementType = 'link';
                        break;
                    }
                    // 检查是否是图片
                    if (target.tagName === 'IMG') {
                        clickedElement = target;
                        elementType = 'img';
                        break;
                    }
                    target = target.parentElement;
                }

                if (clickedElement) {
                    let result = {
                        elementClicked: true,
                        type: elementType
                    };
                    if (elementType === 'link') {
                        result.href = clickedElement.href;
                    } else if (elementType === 'img') {
                        result.src = clickedElement.src;
                    }
                    return result;
                }
                return null;
            }

            // 坐标检测函数：检查指定坐标是否点击了链接或图片
            window.__uniapp_x_checkClickableElement = function(x, y) {
                let element = document.elementFromPoint(x, y);
                return findClickableElement(element, 5);
            };

            // 设置链接和图片点击监听器 (阻断 click 事件冒泡到组件层)
            function setupLinkClickListener() {
                document.addEventListener('click', function(e) {
                    let result = findClickableElement(e.target, 5);

                    if (result) {
                        // 通知原生层有链接或图片被点击，阻断外层 click
                        window.webkit.messageHandlers.__uniapp_x_.postMessage({
                            type: 1014,
                            data: result
                        });
                    }
                }, true); // 使用捕获阶段确保优先执行
            }
            """
        let userScript = WKUserScript(source: source, injectionTime: .atDocumentStart, forMainFrameOnly: false)
        
        self.configuration.userContentController.addUserScript(userScript)
        let userContentController = InnerWeakScriptMessageDelegate(scriptDelegate: self)
        self.configuration.userContentController.add(userContentController, name: kInnerWebViewScriptBirdgeName)
        if let url = self.innerUrl {
            self.loadUrl(url)
        }
        
        // 添加应用激活通知监听，用于检测白屏
        setupBlankScreenDetection()
    }
    
    /// 对应原来的 viewWillLoad()
    public override func onViewWillAppear() {
        super.onViewWillAppear()
        checkAndRecoverFromBlankScreen()
    }
    
    /// 对应原来的 viewWillUnload()
    public override func onViewWillDisappear() {
        if hasAddedBlankScreenObserver {
            NotificationCenter.default.removeObserver(self, name: UIApplication.willEnterForegroundNotification, object: nil)
            hasAddedBlankScreenObserver = false
        }
        
        
        if self.needRemoveObserver {
            self.needRemoveObserver = false
            self.removeObserver(self, forKeyPath: kNativeObserverKeyPathTitle)
            self.scrollView.removeObserver(self, forKeyPath: kNativeObserverKeyPathContentSize)
            self.configuration.userContentController.removeAllUserScripts()
            self.configuration.userContentController.removeScriptMessageHandler(forName: kInnerWebViewScriptBirdgeName)
            self.closeProgress()
        }
        self.clearJSSource()
        super.onViewWillDisappear()
    }
    
    // MARK: - Public Methods
    
    /// 加载 URL
    public func loadUrl(_ strUrl: String?)  {
        guard Thread.isMainThread, let strUrl = strUrl, !strUrl.isEmpty,
              let url = URL(string: strUrl) else {
            return
        }
        
        if #available(iOS 9.0, *) {
            if url.isFileURL {
                self.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
                return
            }
        }
        
        let request = URLRequest(url: url)
        self.load(request)
    }
    
    /// 更新 URL
    @discardableResult
    func updateUrl(_ url: String) -> Bool {
        var newURL = url
        if newURL.hasPrefix("/") || newURL.hasPrefix("_doc") || newURL.hasPrefix("../") || newURL.hasPrefix("./") || url.hasPrefix(UniResource.CACHE_PATH)
            || url.hasPrefix(UniResource.USER_DATA_PATH) || url.hasPrefix(UniResource.SANDBOX_PATH) {
            guard let pageUrl = self.domNode?.context.getUniPageImpl()?.pageUrl as? NSString else {
                return false
            }
            if let appResource = UniSDKEngine.shared.getAppManager()?.getCurrentApp()?.getAppResource() {
                let urlPath = UTSiOS.convert2SystemPath(url, appResource, pageUrl.deletingLastPathComponent)
                if let sp = urlPath.components(separatedBy: "?").first,
                   FileManager.default.fileExists(atPath: sp)  {
                    newURL = "file://\(urlPath)"
                }
            } else {
                UNILogError("Invalid local resource URL:\(newURL), no resource found.", #file, #line)
            }
        }
        
        if newURL.isEmpty {
            return false
        }
        
        if newURL != self.innerUrl {
            self.innerUrl = newURL
            return true
        } else {
            return false
        }
    }
    
    /// 重新加载
    public func reloadWebView() {
        self.reload()
    }
    
    /// 后退
    public func back() {
        if self.canGoBack {
            self.goBack()
        }
    }
    
    /// 前进
    public func forward() {
        if self.canGoForward {
            self.goForward()
        }
    }
    
    /// 执行 JavaScript
    public func evalJs(_ js: String?) {
        guard let js = js else { return }
        
        if canExecuteJSDirectly() {
            logJSExecution(js, method: getExecutionMethod())
            self.evaluateJavaScript(js)
        } else {
            // 缓存等待文档就绪或主框架完成
            logJSExecution(js, method: "Cached")
            cacheJavaScript(js)
        }
    }
    
    /// 执行 JavaScript (别名)
    public func evalJS(_ js: String?) {
        self.evalJs(js)
    }
    
    /// 停止加载
    public func stop() {
        if self.isLoading {
            self.stopLoading()
        }
    }
    
    /// 加载数据
    public func loadData(_ options: UniWebViewContextLoadDataOptions) {
        let htmlStr = options.data ?? ""
        var encoding = options.encoding != "" ? options.encoding! : "utf-8"
        encoding = encoding.lowercased()

        // 正确的编码转换：从字符串名称转换为 String.Encoding
        let stringEncoding: String.Encoding
        switch encoding {
        case "utf-8", "utf8":
            stringEncoding = .utf8
        case "utf-16", "utf16":
            stringEncoding = .utf16
        case "ascii":
            stringEncoding = .ascii
        case "unicode":
            stringEncoding = .unicode
        case "gb2312", "gbk", "gb18030":
            stringEncoding = String.Encoding(rawValue: CFStringConvertEncodingToNSStringEncoding(CFStringEncoding(CFStringEncodings.GB_18030_2000.rawValue)))
        default:
            stringEncoding = String.Encoding(rawValue: UInt(encoding) ?? String.Encoding.utf8.rawValue)
        }

        let data = htmlStr.data(using: stringEncoding)
        var baseUrl: URL = URL(string: "about:blank") ?? Bundle.main.bundleURL
        if let urlStr = options.baseURL, let url = URL(string: urlStr) {
            baseUrl = url
        }
        let mimeType = options.mimeType ?? "text/html"
        if let data = data {
            self.load(
                data,
                mimeType: mimeType,
                characterEncodingName: encoding,
                baseURL: baseUrl
            )
        } else {
            if let baseUrl = options.baseURL,
                let baseURL = URL(
                    string: baseUrl
                )
            {
                self.loadHTMLString(htmlStr, baseURL: baseURL)
            } else {
                self.loadHTMLString(htmlStr, baseURL: nil)
            }
        }
    }
                            
    /// 发送消息到 webview
    public func postMessage(_ data: [String: Any]) {
        guard let pageUrl = domNode?.context.getUniPageImpl()?.pageUrl as? NSString else {
            return
        }
        
        var bundleUrlOrigin = ""
        
        if let url = URL(string: pageUrl as String) {
            bundleUrlOrigin = "\(url.scheme ?? "")://\(url.host ?? "")\(url.port != nil ? ":\(url.port!)" : "")"
        }
        
        let initDic: [String: Any] = [
            "type": "message",
            "data": data,
            "origin": bundleUrlOrigin
        ]
        
        if let json = UniUtility.jsonString(initDic){
            let code = "(function (){window.dispatchEvent(new MessageEvent('message', \(json)));}())"
            self.evaluateJavaScript(code, completionHandler: nil)
        }
    }
    
    /// 通知 webview
    public func notifyWebview(_ data: [String: Any]) {
        if let json = UniUtility.jsonString(data) {
            let code = "(function(){var evt=null;var data=\(json);if(typeof CustomEvent==='function'){evt=new CustomEvent('notify',{detail:data})}else{evt=document.createEvent('CustomEvent');evt.initCustomEvent('notify',true,true,data)}document.dispatchEvent(evt)}())"
            self.evaluateJavaScript(code)
        }
    }
    
    /// 获取基础信息
    public func baseInfo() -> [String: Any] {
        var info: [String: Any] = [:]
        
        info["url"] = self.url?.absoluteString ?? ""
        info["title"] = self.title ?? ""
        info["canGoBack"] = self.canGoBack
        info["canGoForward"] = self.canGoForward
        
        return info
    }
    
    // MARK: - Private Methods - JS Cache
    
    fileprivate func getJSSourceId() -> Int {
        var sourceId = 0
        sourceId = jsSourceId % (1024*1024)
        jsSourceId += 1
        sourceId = jsSourceId
        return sourceId
    }
    
    fileprivate func storeJSSource(_ source: String) -> Int {
        let sourceId = getJSSourceId()
        jsSourceDict[sourceId] = source
        return sourceId
    }
    
    fileprivate func removeJSSourceById(_ sourceId: Int) {
        jsSourceDict.removeValue(forKey: sourceId)
    }
    
    fileprivate func clearJSSource() {
        jsSourceDict.removeAll()
    }
    
    private func handleDocumentReady() {
        guard !documentReady else { return }

        documentReady = true
        UNILogDebug("🟢 InnerWebView: Document ready notification received (didFinishedLoad: \(didFinishedLoad))")

        // 文档就绪后立即执行缓存的JavaScript，无需等待 didFinish
        // 因为 DOM 已经可以安全地操作了
        executeCachedJavaScripts()
    }
    
    /// 执行所有缓存的JavaScript
    private func executeCachedJavaScripts() {
        guard !jsSourceDict.isEmpty else { return }
        
        UNILogDebug("🟢 InnerWebView: Executing \(jsSourceDict.count) cached scripts")
        
        let cachedScripts = jsSourceDict
        jsSourceDict.removeAll()
        
        for (_, value) in cachedScripts {
            self.evaluateJavaScript(value) { result, error in
                if let error = error {
                    UNILogError("❌ InnerWebView: Failed to execute cached script: \(error.localizedDescription)", #file, #line)
                }
            }
        }
    }
    
    /// 判断是否可以直接执行JavaScript
    private func canExecuteJSDirectly() -> Bool {
        return didFinishedLoad || documentReady
    }
    
    private func cacheJavaScript(_ js: String) {
        _ = self.storeJSSource(js)
    }
    
    private func getExecutionMethod() -> String {
        if didFinishedLoad {
            return "Direct (didFinishedLoad)"
        } else if documentReady {
            return "Direct (documentReady)"
        } else {
            return "Direct (unknown)"
        }
    }
    
    /// debug：记录JavaScript执行方式
    private func logJSExecution(_ js: String, method: String) {
#if DEBUG
        let preview = js.count > 50 ? String(js.prefix(50)) + "..." : js
        UNILogDebug("🟡 InnerWebView: \(method) - \(preview)")
#endif
    }
    
    /// 设置白屏检测的通知监听
    private func setupBlankScreenDetection() {
        guard !hasAddedBlankScreenObserver else { return }
        
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleAppActivation),
            name: UIApplication.willEnterForegroundNotification,
            object: nil
        )
        
        hasAddedBlankScreenObserver = true
    }
    
    @objc private func handleAppActivation() {
        checkAndRecoverFromBlankScreen()
    }
    
    /// 检测并恢复白屏
    private func checkAndRecoverFromBlankScreen() {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) { [weak self] in
            guard let self = self else { return }
            
            if self.isLoading { return }
            
            let currentURL = self.url?.absoluteString ?? ""
            let isValidURL = !currentURL.isEmpty && currentURL != "about:blank"
            if !isValidURL && self.innerUrl == nil {
                return
            }
            
            let isContentEmpty = self.scrollView.subviews.isEmpty
            let isTitleEmpty = (self.title == nil || self.title?.isEmpty == true)
            
            if isContentEmpty || isTitleEmpty {
                if self.layer.sublayers?.isEmpty ?? true {
                    UNILogDebug("⚠️ InnerWebView: 检测到白屏，reload")
                    // didterminate 调用回调
                    let event = InnerWebViewDidTerminateEvent()
                    let utsJsonObject = UTSJSONObject(event.detailMap())
                    onDidTerminateCallback?(UniNativeViewEvent(event.type, utsJsonObject))
                    // 重新加载页面
                    self.reload()
                }
            }
        }
    }
}

extension InnerWebView {
    public override func canPerformAction(_ action: Selector, withSender sender: Any?) -> Bool {
        if disableUserSelectMenu {
            self.allowsLinkPreview = false
            return false
        }
        return super.canPerformAction(action, withSender: sender)
    }
    
    public override func target(forAction action: Selector, withSender sender: Any?) -> Any? {
        if disableUserSelectMenu {
            return nil
        }
        return super.target(forAction: action, withSender: sender)
    }
}

// MARK: - WKNavigationDelegate
extension InnerWebView: WKNavigationDelegate {
    
    public func webView(_ webView: WKWebView, didFinish navigation: WKNavigation) {
        hiddenProgress()
        didFinishedLoad = true
        
        let url = self.url?.absoluteString ?? ""
        
        let detail = InnerWebViewLoadEvent.Detail(url, url)
        let event = InnerWebViewLoadEvent(detail: detail)
        // load 事件回调
        let utsJsonObject = UTSJSONObject(event.detailMap())
        onLoadCallback?(UniNativeViewEvent(event.type, utsJsonObject))
        
        // 为了向下兼容，继续发送loaded事件事件回调
        let detail1 = InnerWebViewLoadedEvent.Detail(url, url)
        let event1 = InnerWebViewLoadedEvent(detail: detail1)
        let utsJsonObject_loaded = UTSJSONObject(event1.detailMap())
        onLoadedCallback?(UniNativeViewEvent(event1.type, utsJsonObject_loaded))
        
        // 遍历页面素有a标签，将 target 属性设置为 '_self'，解决 target 属性为其他值时点击无反应的问题
        webView.evaluateJavaScript("var a = document.getElementsByTagName('a');for(var i=0;i<a.length;i++){a[i].setAttribute('target','_self');}", completionHandler: nil)
        
        // 执行缓存的js,执行后清除
        self.executeCachedJavaScripts()
    }
    
    public func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        hiddenProgress()
        
        let err = error as NSError
        let src = self.url?.absoluteString ?? ""
        var url = ""
        if let webUrl = self.url,
           let components = URLComponents(url: webUrl, resolvingAgainstBaseURL: false),
           let scheme = components.scheme,
           let host = components.host {
            url = scheme + "://" + host
        }
        if src.hasPrefix("file://") {
            url = src
        }
        
        let detail = InnerWebViewErrorEvent.Detail(err)
        detail.url = url
        detail.fullUrl = src
        detail.src = src
        let event = InnerWebViewErrorEvent(detail: detail)
        
        // error 事件回调
        let utsJsonObject = UTSJSONObject(event.detailMap())
        onErrorCallback?(UniNativeViewEvent(event.type, utsJsonObject))
    }
    
    public func webView(_ webView: WKWebView, didFail navigation: WKNavigation, withError error: Error) {
        hiddenProgress()
        
        if let urlString = (error as NSError).userInfo[NSURLErrorFailingURLStringErrorKey] as? String, !urlString.hasPrefix("http") {
            return
        }
        let err = error as NSError
        let detail = InnerWebViewErrorEvent.Detail(err)
        let event = InnerWebViewErrorEvent(detail: detail)
        
        // error 事件回调
        let utsJsonObject = UTSJSONObject(event.detailMap())
        onErrorCallback?(UniNativeViewEvent(event.type, utsJsonObject))
    }
    
    public func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        let scheme = navigationAction.request.url?.scheme?.lowercased() ?? ""
        if !scheme.hasPrefix("http") && !scheme.hasPrefix("file") && !scheme.hasPrefix("about") {
            UIApplication.shared.open(navigationAction.request.url!)
            decisionHandler(.cancel)
            return
        }
        if scheme.hasPrefix("http") {
            showProgress()
        }
        
        self.didFinishedLoad = false
        self.documentReady = false
        
        if navigationAction.targetFrame?.isMainFrame == true {
            
            let detail = InnerWebViewLoadingEvent.Detail()
            detail.url = navigationAction.request.url?.absoluteString ?? ""
            detail.src = detail.url
            let event = InnerWebViewLoadingEvent(detail: detail)
            
            // loading 事件回调
            let utsJsonObject = UTSJSONObject(event.detailMap())
            onLoadingCallback?(UniNativeViewEvent(event.type, utsJsonObject))
        }
        decisionHandler(.allow)
    }
    
    public func webView(_ webView: WKWebView, decidePolicyFor navigationResponse: WKNavigationResponse, decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
        if navigationResponse.canShowMIMEType {
            decisionHandler(.allow)
        }else {
            
            let detail = InnerWebViewDownloadEvent.Detail()
            detail.url = navigationResponse.response.url?.absoluteString ?? ""
            detail.userAgnet = webView.customUserAgent ?? ""
            detail.contentDisposition = ""
            detail.contentLength = NSNumber(value: navigationResponse.response.expectedContentLength)
            detail.mimetype = navigationResponse.response.mimeType ?? ""
            let event = InnerWebViewDownloadEvent(detail: detail)
            
            // download 事件回调
            let utsJsonObject = UTSJSONObject(event.detailMap())
            onDownloadCallback?(UniNativeViewEvent(event.type, utsJsonObject))
            decisionHandler(.cancel)
        }
    }
    
    
    public func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        // 调用回调
        onDidTerminateCallback?(UniNativeViewEvent("didterminate", UTSJSONObject()))
        self.reload()
    }
}

// MARK: - WKUIDelegate
extension InnerWebView: WKUIDelegate {
    
    public func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                        for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if navigationAction.targetFrame == nil || !navigationAction.targetFrame!.isMainFrame {
            self.load(navigationAction.request)
        }
        return nil
    }
    
    public func webView(_ webView: WKWebView,
                        runJavaScriptAlertPanelWithMessage message: String,
                        initiatedByFrame frame: WKFrameInfo,
                        completionHandler: @escaping () -> Void) {
        
        let alertController = UIAlertController(title: "", message: message, preferredStyle: .alert)
        
        alertController.addAction(UIAlertAction(title: NSLocalizedString("OK", comment: ""), style: .default, handler: nil))
        
        let currentVC = UIViewController.__findCurrentShowing()
        
        currentVC?.present(alertController, animated: true, completion: nil)
        
        completionHandler()
    }
    
    public func webView(_ webView: WKWebView,
                        runJavaScriptConfirmPanelWithMessage message: String,
                        initiatedByFrame frame: WKFrameInfo,
                        completionHandler: @escaping (Bool) -> Void) {
        
        let alertController = UIAlertController(title: "", message: message, preferredStyle: .alert)
        
        alertController.addAction(UIAlertAction(title: NSLocalizedString("Cancel", comment: ""), style: .cancel, handler: { action in
            completionHandler(false)
        }))
        
        alertController.addAction(UIAlertAction(title: NSLocalizedString("OK", comment: ""), style: .default, handler: { action in
            completionHandler(true)
        }))
        
        let currentVC = UIViewController.__findCurrentShowing()
        
        currentVC?.present(alertController, animated: true, completion: nil)
    }
    
    public func webView(_ webView: WKWebView,
                        runJavaScriptTextInputPanelWithPrompt prompt: String,
                        defaultText: String?,
                        initiatedByFrame frame: WKFrameInfo,
                        completionHandler: @escaping (String?) -> Void) {
        
        let alertController = UIAlertController(title: prompt, message: "", preferredStyle: .alert)
        
        alertController.addTextField(configurationHandler: { textField in
            textField.text = defaultText
        })
        
        alertController.addAction(UIAlertAction(title: NSLocalizedString("OK", comment: ""), style: .default, handler: { action in
            completionHandler(alertController.textFields?[0].text ?? "")
        }))
        
        let currentVC = UIViewController.__findCurrentShowing()
        currentVC?.present(alertController, animated: true, completion: nil)
    }
}

// MARK: - WKScriptMessageHandler
extension InnerWebView: WKScriptMessageHandler {
    
    public func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if let body = message.body as? [AnyHashable: Any], let type = body["type"] as? Int {
            switch type {
            case 3:
                if let data = body["data"] as? [String: Any], let messageContent = data["data"] as? [String: Any] {
                    let detail = InnerWebViewMessageEvent.Detail()
                    detail.data = [UTSJSONObject(messageContent)]
                    let event = InnerWebViewMessageEvent(detail: detail)
                    
                    // message 事件回调
                    let utsJsonObject = UTSJSONObject(event.detailMap())
                    onMessageCallback?(UniNativeViewEvent(event.type, utsJsonObject))
                }
            case 4:
                if let data = body["data"] as? [String: Any] {
                    // 通过回调发送消息到 index.uts 进行处理
                    let detail = InnerWebViewServiceMessageEvent.Detail(data)
                    let event = InnerWebViewServiceMessageEvent(detail: detail)

                    // servicemessage 事件回调
                    let utsJsonObject = UTSJSONObject(event.detailMap())
                    onServiceMessageCallback?(UniNativeViewEvent(event.type, utsJsonObject))
                }
            case 1012:
                break
            case 1013:
                // 文档加载完成通知
                if let data = body["data"] as? [String: Any],
                   let ready = data["ready"] as? Bool, ready {
                    self.handleDocumentReady()
                }
            case 1014:
                // 链接或图片点击通知 - 已废弃，使用坐标检测机制替代
                // 保留此 case 以避免未知消息类型警告，但不做任何处理
                break
            default:
                break
            }
        }
    }
}

// MARK: - Progress Bar
extension InnerWebView {
    func showProgress() {
        if self.wvStyles?.showProgress == true {
            var rect = self.bounds
            if self.progressView == nil {
                self.progressView = UIProgressView(frame: .zero)
                self.progressView?.progressTintColor = self.wvStyles?.progressColor ?? .green
                self.addSubview(self.progressView!)
                self.addObserver(self, forKeyPath: kNativeObserverKeyPathProgress, options: .new, context: nil)
            }
            rect.size.height = kInnerWebViewProgressHeight
            self.progressView?.isHidden = false
            self.progressView?.frame = rect
            guard let progressView = progressView else { return }
            // 原始高度大约为 2pt，缩小为一半 => 1pt
            // 向上平移 (原高度 - 新高度)/2 = 0.5pt
            let scale: CGFloat = 0.5
            let translateY = (1.0 - scale) * progressView.intrinsicContentSize.height / 2
            
            progressView.transform = CGAffineTransform(translationX: 0, y: -translateY)
                .scaledBy(x: 1.0, y: scale)
        }
    }
    
    func hiddenProgress() {
        UIView.animate(withDuration: 0.3, animations: {
            self.progressView?.alpha = 0
        }, completion: { finished in
            self.progressView?.isHidden = true
            self.progressView?.alpha = 1.0
            self.progressView?.transform = .identity
        })
    }
    
    func closeProgress() {
        if self.progressView != nil {
            self.removeObserver(self, forKeyPath: kNativeObserverKeyPathProgress)
            self.progressView?.removeFromSuperview()
            self.progressView = nil
        }
    }
    
    public override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        
        if keyPath == kNativeObserverKeyPathProgress {
            if let progressView = self.progressView, (self.estimatedProgress >= Double(progressView.progress)) || self.estimatedProgress == 0 {
                self.progressView?.setProgress(Float(self.estimatedProgress), animated: true)
            }
        }else if keyPath == kNativeObserverKeyPathContentSize {
            // 通过 js 获取 body 高度
            var jsscript = "document.documentElement.scrollHeight"
            if #available(iOS 13.0, *) {
                jsscript = "document.body.scrollHeight"
            }
            
            self.evaluateJavaScript(jsscript) {[weak self] (result, error) in
                guard let self = self else { return }
                if let height = result as? CGFloat, self.contentHeight != height {
                    self.contentHeight = height
                    
                    let detail = InnerWebViewContentHeightChangeEvent.Detail(contentHeight: NSNumber(value: Float(height)))
                    let event = InnerWebViewContentHeightChangeEvent(detail: detail)
                    // contentheightchange 事件回调
                    let utsJsonObject = UTSJSONObject(event.detailMap())
                    onContentHeightChangeCallback?(UniNativeViewEvent(event.type, utsJsonObject))
                }
            }
        }
    }
    
    public func getContentHeight() -> NSNumber {
        return NSNumber(value: Double(contentHeight))
    }
}

// MARK: 原生和uts 接口定义
protocol InnerWebViewInterface {
    func setSrc(_ src: String?)
    func setWebViewStyles(isShow: Bool, color: UIColor)
    func setHorizontalScrollBarAccess(_ horizontalScrollBarAccess : Bool)
    func setVerticalScrollBarAccess(_ verticalScrollBarAccess : Bool)
    func setBounces(_ bounces : Bool)
    func setDisableUserSelectMenu(_ disableUserSelectMenu : Bool)
    
    func setOnLoadingCallback(_ callback: UniNativeViewEventCallback?)
    func setOnLoadedCallback(_ callback: UniNativeViewEventCallback?)
    func setOnLoadCallback(_ callback: UniNativeViewEventCallback?)
    func setOnErrorCallback(_ callback: UniNativeViewEventCallback?)
    func setOnMessageCallback(_ callback: UniNativeViewEventCallback?)
    func setOnDownloadCallback(_ callback: UniNativeViewEventCallback?)
    func setOnContentHeightChangeCallback(_ callback: UniNativeViewEventCallback?)
    func setOnDidTerminateCallback(_ callback: UniNativeViewEventCallback?)
    func setOnServiceMessageCallback(_ callback: UniNativeViewEventCallback?)
}

extension InnerWebView: InnerWebViewInterface {
    public func setSrc(_ src: String?) {
        if let src = src, updateUrl(src) {
            self.loadUrl(self.innerUrl)
        }
    }
    
    public func setWebViewStyles(isShow: Bool, color: UIColor) {
        self.wvStyles?.update(isShow: isShow, color: color)
    }
    
    public func setHorizontalScrollBarAccess(_ horizontalScrollBarAccess : Bool) {
        self.horizontalScrollBarAccess = horizontalScrollBarAccess
    }
    
    public func setVerticalScrollBarAccess(_ verticalScrollBarAccess : Bool) {
        self.verticalScrollBarAccess = verticalScrollBarAccess
    }
    
    public func setBounces(_ bounces : Bool) {
        self.webViewBounces = bounces
    }
    
    public func setDisableUserSelectMenu(_ disableUserSelectMenu : Bool) {
        self.disableUserSelectMenu = disableUserSelectMenu
    }
    
    //设置callback回调
    public func setOnLoadingCallback(_ callback: UniNativeViewEventCallback?) {
        onLoadingCallback = callback
    }
    
    public func setOnLoadedCallback(_ callback: UniNativeViewEventCallback?) {
        onLoadedCallback = callback
    }
    
    public func setOnLoadCallback(_ callback: UniNativeViewEventCallback?) {
        onLoadCallback = callback
    }
    
    public func setOnErrorCallback(_ callback: UniNativeViewEventCallback?) {
        onErrorCallback = callback
    }
    
    public func setOnMessageCallback(_ callback: UniNativeViewEventCallback?) {
        onMessageCallback = callback
    }
    
    public func setOnDownloadCallback(_ callback: UniNativeViewEventCallback?) {
        onDownloadCallback = callback
    }
    
    public func setOnContentHeightChangeCallback(_ callback: UniNativeViewEventCallback?) {
        onContentHeightChangeCallback = callback
    }
    
    public func setOnDidTerminateCallback(_ callback: UniNativeViewEventCallback?) {
        onDidTerminateCallback = callback
    }

    public func setOnServiceMessageCallback(_ callback: UniNativeViewEventCallback?) {
        onServiceMessageCallback = callback
    }
}

extension UIViewController {
    
    static func __findCurrentShowing() -> UIViewController? {
        guard let window = UIApplication.frontMostWindow else { return nil }
        guard let rootVC = window.rootViewController else { return nil }
        return rootVC.topVisibleViewController()
    }
    
    fileprivate func topVisibleViewController() -> UIViewController {
        var current: UIViewController = self
        
        while true {
            if let presented = current.presentedViewController {
                current = presented
            } else if let tab = current as? UITabBarController,
                      let selected = tab.selectedViewController {
                current = selected
            } else if let nav = current as? UINavigationController,
                      let visible = nav.visibleViewController {
                current = visible
            } else {
                break
            }
        }
        
        return current
    }
}

extension UIApplication {
    static var frontMostWindow: UIWindow? {
        
        if #available(iOS 13.0, *) {
            let scenes = UIApplication.shared.connectedScenes
                .compactMap { $0 as? UIWindowScene }
                .filter { $0.activationState == .foregroundActive }
            
            for scene in scenes {
                if let keyWindow = scene.windows.first(where: { $0.isKeyWindow }) {
                    return keyWindow
                }
                
                if let visible = scene.windows.first(where: { !$0.isHidden }) {
                    return visible
                }
            }
        }
        
        if let key = UIApplication.shared.keyWindow { return key }
        return UIApplication.shared.windows.first(where: { !$0.isHidden })
    }
}


import AVFoundation
import MediaPlayer
import DCloudUniappRuntime
@_implementationOnly import KTVHTTPCache

private enum UniAudioObserveKeypath: String {
    case status = "status"
    case timeControlStatus = "timeControlStatus"
    case rate = "rate"
    case loadedTimeRanges = "loadedTimeRanges"
    case playbackBufferEmpty = "playbackBufferEmpty"
    case playbackLikelyToKeepUp = "playbackLikelyToKeepUp"
}

private enum UniAudioEvent: String {
    case canplay = "canplay"
    case play = "play"
    case pause = "pause"
    case stop = "stop"
    case ended = "ended"
    case timeUpdate = "timeUpdate"
    case waiting = "waiting"
    case seeking = "seeking"
    case seeked = "seeked"
}

// 闭包class化，方便通过 == 对比
private class CallbackWrapper: Equatable {
    enum CallbackType {
        case callback(UniAudioEventCallback)
        case errorCallback(UniAudioErrorEventCallback)
    }
    
    let callbackType: CallbackType
    
    init(callback: @escaping UniAudioEventCallback) {
        self.callbackType = .callback(callback)
    }
    
    init(errorCallback: @escaping UniAudioErrorEventCallback) {
        self.callbackType = .errorCallback(errorCallback)
    }
    
    public static func == (lhs: CallbackWrapper, rhs: CallbackWrapper) -> Bool {
        return lhs === rhs
    }
}

typealias UniAudioEventCallback = (_ result: Any) -> Void
typealias UniAudioErrorEventCallback = (_ result: ICreateInnerAudioContextFail) -> Void


@objc(UniAudioPlayer)
@objcMembers
public class UniAudioPlayer: NSObject, InnerAudioContext {
    
    static var mixWithOther = true 
    static var speakerOn = true {
        didSet {
            guard oldValue != speakerOn else { return }
            notifyAllInstancesToReconfigure()
        }
    }
    static var obeyMuteSwitch = true {
        didSet {
            guard oldValue != obeyMuteSwitch else { return }
            notifyAllInstancesToReconfigure()
        }
    }
    
    // 维护存活实例，便于全局策略变更时同步生效
    private static let livePlayers = NSHashTable<UniAudioPlayer>.weakObjects()
     
    private lazy var playerItem: AVPlayerItem? = {
        if let url = URL(string: src) {
            return AVPlayerItem(url: url)
        } else {
            return nil
        }
    }()
    
    private lazy var player: AVPlayer? = {
        return AVPlayer(playerItem: playerItem)
    }()
    
    private var _src: String = "" {
        didSet {
            updatePlayerItem()
        }
    }
    private var _startTime: NSNumber = 0 {
        didSet {
            innerSeek(_startTime)
        }
    }
    private var _buffered: NSNumber = 0
    private var _autoplay: Bool = false {
        didSet {
            if player?.timeControlStatus != .playing && !_isManualPause {
                innerPlay(needDispathEvent: true)
            }
        }
    }
    private var _loop: Bool = false
    private var _cache: Bool = true {
        didSet {
            if _isActuallyPlaying == false {
                initCacheConfig()
                player?.replaceCurrentItem(with: nil)
                updatePlayerItem()
            }
        }
    }
    
    private var _isActuallyPlaying: Bool {
        guard let currentItem = player?.currentItem else { return false }
        return  player?.rate != 0 &&
        player?.error == nil &&
        currentItem.status == .readyToPlay &&
        currentItem.isPlaybackLikelyToKeepUp
    }
    
    private var _volume: NSNumber = 1.0 {
        didSet {
            player?.volume = _volume.toFloat()
        }
    }
    private var _playbackRate: NSNumber = 1.0 {
        didSet {
            if player?.timeControlStatus == .playing {
                player?.rate = _playbackRate.toFloat()
            } else {
                player?.pause()
            }
        }
    }
    private var _isNeedSetRate = false //添加该变量优化系统默认的只有播放状态设置rate才有效的情况
    private var _status: AVPlayerItem.Status? //playitem 监听status状态
    private var _isManualPlay = false  //是否正在播放，侧重于用户是否点击了播放按钮
    private var _isManualPause = false //是否用户点击暂停，和缓冲的暂停无关
    private var _hasPlayError = false //是否播放出错
    private var _currentFailImpl: CreateInnerAudioContextFailImpl? = nil //当前播放出错error对象
    private var _isSeeking = false //是否是正在seeking状态
    private var _readyToPlay = false //是否canPlay状态
    private var _cacheSize: Int64 = 100*1024*1024 //默认缓存大小100M
    private var _hasAddObservers = false //是否添加了观察者
    private var _isPlayingBeforeInterruption = false //电话、闹铃等系统行为打断前是否正在播放
    private var _isPlayingBeforeResignActive = false //进入非活跃状态（后台、下拉系统状态栏）
    
    private var eventCallbacks: [String: [CallbackWrapper]] = [:]
    private var errorEventCallBacks: [UniAudioErrorEventCallback] = []
    private var timeObserverToken: Any?
    
    public var duration: NSNumber {
        get {
            var tmp = playerItem?.asset.duration.seconds.round(3) ?? 0.0
            if tmp.isNaN || tmp.isInfinite {
                tmp = 0.0
            }
            return NSNumber(floatLiteral: tmp)
        }
        set {}
    }
    
    public var currentTime: NSNumber {
        get {
            var second = 0.0
            if let temp = player?.currentTime().seconds, temp >= 0 {
                second = temp
            }
            return NSNumber(floatLiteral: second.round(3))
        }
        set {}
    }
    
    public var paused: Bool {
        get {
            return player?.timeControlStatus == .paused || player?.timeControlStatus == .waitingToPlayAtSpecifiedRate
        }
        set {}
    }
    
    public var src: String {
        get { return _src}
        set { _src = newValue }
    }
    
    public var startTime: NSNumber{
        get { return
            _startTime
        }
        set {
            _startTime = newValue
        }
    }
    
    public var buffered: NSNumber{
        get { return _buffered }
        set { _buffered = newValue }
    }
    
    public var autoplay: Bool{
        get { return _autoplay }
        set { _autoplay = newValue }
    }
    
    public var loop: Bool{
        get { return _loop }
        set { _loop = newValue }
    }
    
    public var obeyMuteSwitch: Bool {
        get { return UniAudioPlayer.obeyMuteSwitch }
        set { UniAudioPlayer.obeyMuteSwitch = newValue }
    }
    
    public var volume: NSNumber {
        get { return _volume }
        set { _volume = newValue }
    }
    
    public var playbackRate: NSNumber? {
        get { return _playbackRate }
        set {
            if _playbackRate != newValue && !isHLSLiveOrEvent() {
                _isNeedSetRate = true
                _playbackRate = newValue ?? 1.0
            }
        }
    }
    
    public var cache: Bool {
        get { return _cache }
        set { _cache = newValue }
    }
    
    public func seek(_ position: NSNumber) {
        innerSeek(position, needDispathEvent: true)
    }
    
    public override init() {
        super.init()
        UniAudioPlayer.livePlayers.add(self)
        configurePlayer()
    }
    
    deinit {
        destroy()
    }
    
    public func destroy() {
        releaseResources()
    }
    
    public func onCanplay(_ callback: @escaping (Any) -> Void) {
        addEvent(event: .canplay, eventCallback: callback)
    }
    
    public func offCanplay(_ callback: @escaping (Any) -> Void) {
        removeEvent(event: .canplay, eventCallback: callback)
    }
    
    public func onPlay(_ callback: @escaping (Any) -> Void) {
        addEvent(event: .play, eventCallback: callback)
    }
    
    public func offPlay(_ callback: @escaping (Any) -> Void) {
        removeEvent(event: .play, eventCallback: callback)
    }
    
    public func onPause(_ callback: @escaping (Any) -> Void) {
        addEvent(event: .pause, eventCallback: callback)
    }
    
    public func offPause(_ callback: @escaping (Any) -> Void) {
        removeEvent(event: .pause, eventCallback: callback)
    }
    
    public func onStop(_ callback: @escaping (Any) -> Void) {
        addEvent(event: .stop, eventCallback: callback)
    }
    
    public func offStop(_ callback: @escaping (Any) -> Void) {
        removeEvent(event: .stop, eventCallback: callback)
    }
    
    public func onEnded(_ callback: @escaping (Any) -> Void) {
        addEvent(event: .ended, eventCallback: callback)
    }
    
    public func offEnded(_ callback: @escaping (Any) -> Void) {
        removeEvent(event: .ended, eventCallback: callback)
    }
    
    public func onTimeUpdate(_ callback: @escaping (Any) -> Void) {
        addEvent(event: .timeUpdate, eventCallback: callback)
        addPeriodicTimeObserver()
    }
    
    public func offTimeUpdate(_ callback: @escaping (Any) -> Void) {
        removeEvent(event: .timeUpdate, eventCallback: callback)
        removePeriodicTimeObserver()
    }
    
    public func onError(_ callback: @escaping (any ICreateInnerAudioContextFail) -> Void) {
        errorEventCallBacks.append(callback)
    }
    
    public func offError(_ callback: @escaping (any ICreateInnerAudioContextFail) -> Void) {
        errorEventCallBacks.removeAll()
    }
    
    public func onWaiting(_ callback: @escaping (Any) -> Void) {
        addEvent(event: .waiting, eventCallback: callback)
    }
    
    public func offWaiting(_ callback: @escaping (Any) -> Void) {
        removeEvent(event: .waiting, eventCallback: callback)
    }
    
    public func onSeeking(_ callback: @escaping (Any) -> Void) {
        addEvent(event: .seeking, eventCallback: callback)
    }
    
    public func offSeeking(_ callback: @escaping (Any) -> Void) {
        removeEvent(event: .seeking, eventCallback: callback)
    }
    
    public func onSeeked(_ callback: @escaping (Any) -> Void) {
        addEvent(event: .seeked, eventCallback: callback)
    }
    
    public func offSeeked(_ callback: @escaping (Any) -> Void) {
        removeEvent(event: .seeked, eventCallback: callback)
    }
    
    public func play() {
        configureAudioSession()
        innerPlay(needDispathEvent: true)
        _isManualPlay = true
        _isManualPause = false
    }
    
    public func pause() {
        if let player = player {
            player.pause()
            _isManualPause = true
            _isManualPlay = false
            dispatchEvent(event: .pause)
        }
    }
    
    public func stop() {
        if let player = player {
            player.pause()
            _isManualPause = true
            _isManualPlay = false
            innerSeek(0)
            dispatchEvent(event: .stop)
        }
    }
}

extension UniAudioPlayer {
    fileprivate static func notifyAllInstancesToReconfigure() {
        UNILogDebug("======audio======, 全局音频策略变更，通知所有存活实例重新配置...")
        DispatchQueue.main.async {
            let instances = livePlayers.allObjects
            UNILogDebug("======audio======, 当前存活播放器实例数: \(instances.count)")
            for instance in instances {
                instance.reconfigureAudioSessionIfNeeded()
            }
        }
    }
    private func initCacheConfig() {
        if self._cache == false { return }
        
        //设置是否显示KTVHTTPCache的log日志
        KTVHTTPCache.logSetConsoleLogEnable(false)
        try? KTVHTTPCache.proxyStart()
        KTVHTTPCache.cacheSetMaxCacheLength(_cacheSize)
        KTVHTTPCache.cacheSetRootPath("Caches/uni-audio")
        //配置MIME类型集
        let contentTypes: [String] = [
            "audio/wav",
            "audio/flac",
            "audio/aiff",
            "audio/caf",
            "audio/mpeg",
            "audio/mp4",
            "audio/m4a",
            "audio/x-m4a",
            "audio/aac",
            "audio/*" //通配符
        ]
        //设置可接受的内容类型
        KTVHTTPCache.downloadSetAcceptableContentTypes(contentTypes)
        
        //通过拦截url中的contentType动态设置是否要继续请求
        KTVHTTPCache.downloadSetUnacceptableContentTypeDisposer { url, contentType in
            if let contentType = contentType {
                UNILogDebug("======audio======, KTVHTTPCache Intercepted Content-Type: \(contentType)")
            }
            return true
        }
    }
    
    private func innerPlay(needDispathEvent: Bool? = false) {
        if let player = player {
            if self.startTime.toDouble() > 0 {
                innerSeek(self.startTime)
            }
            if !_hasPlayError {
                // 恢复播放前，判断当前位置是否还在 seekable 范围内
                if let range = player.currentItem?.seekableTimeRanges.last?.timeRangeValue {
                    let rangeStart = CMTimeGetSeconds(range.start)
                    let rangeEnd = CMTimeGetSeconds(CMTimeRangeGetEnd(range))
                    let current = CMTimeGetSeconds(player.currentTime())
                    
                    /// 如果rangeStart == rangeEnd 或者 duration过小，就是直播源的server没有配置Event模式（服务器没有提供 DVR 缓存窗口），只能seek到当前播放点，没有快退能力，
                    let duration = CMTimeGetSeconds(range.duration)
                    let isSupportDVR = duration > 10
                    
                    if (current < rangeStart || current > rangeEnd) && !isSupportDVR {
                        // 已经不在可播放范围，回到直播点
                        player.seek(to: CMTime(seconds: rangeEnd, preferredTimescale: 600)) {
                            _ in player.play()
                        }
                    } else {
                        // 在范围内，继续播放
                        player.play()
                    }
                } else {
                    player.play()
                }
            }
            if let needDispathEvent = needDispathEvent, needDispathEvent, !_hasPlayError, _readyToPlay {
                dispatchEvent(event: .play)
            }
        }
    }
    
    private func innerSeek(_ position: NSNumber, needDispathEvent: Bool? = false) {
        guard let player = player, let currentItem = player.currentItem else { return }
        
        // 检查 AVPlayerItem 状态
        if currentItem.status != .readyToPlay {
            UNILogDebug("======audio======, Player item is not ready to play, skipping seek.")
            return
        }
        
        if (position.toDouble() >= 0) {
            let timeScale = player.currentItem?.asset.duration.timescale ?? CMTimeScale(NSEC_PER_SEC)
            let seekTime = CMTime(seconds: position.toDouble(), preferredTimescale: timeScale)
            if !seekTime.isValid || seekTime.isIndefinite {
                UNILogDebug("======audio======, Invalid seek time, skipping seek.")
                return
            }
            if let needDispathEvent = needDispathEvent, needDispathEvent {
                UNILogDebug("======audio======, Seeking started，调用seek方法后调用")
                dispatchEvent(event: .seeking)
                _isSeeking = true
            }
            
            player.seek(to: seekTime, completionHandler: { [weak self] finished in
                self?.dispatchEvent(event: .seeked)
                self?._isSeeking = false
            })
        }
    }
    
    private func failedAction(_ errorCode: NSNumber, errMsg: String? = nil) {
        let failImpl = CreateInnerAudioContextFailImpl(errorCode)
        if let errMsg = errMsg {
            failImpl.errMsg = errMsg
        }
        _hasPlayError = true
        _currentFailImpl = failImpl
        errorEventCallBacks.forEach { $0(failImpl) }
        player?.pause()
    }
    
    // 初始化 AVPlayer 并配置选项
    private func configurePlayer() {
        initCacheConfig()
        player?.volume = self.volume.toFloat()
        if self.startTime.toDouble() > 0 {
            innerSeek(self.startTime)
        }
        player?.rate = playbackRate?.toFloat() ?? 1.0
    }
    
    // 配置音频会话，支持混音播放、扬声器/听筒切换、静音键遵循
    private func configureAudioSession() {
        let audioSession = AVAudioSession.sharedInstance()
        let isOtherAppAudioPlaying = audioSession.secondaryAudioShouldBeSilencedHint && audioSession.isOtherAudioPlaying
        
        var categoryOptions: AVAudioSession.CategoryOptions = []
        var category: AVAudioSession.Category = .playback
        
        do {
            // speakerOn = true 时，强制独占音频（mixWithOther 无效）
            if UniAudioPlayer.speakerOn {
                // 扬声器播放：独占模式
                // 只有 speakerOn=true && obeyMuteSwitch=true 时才遵循静音键
                if UniAudioPlayer.obeyMuteSwitch {
                    category = .soloAmbient
                    UNILogDebug("======audio======, 配置: 扬声器独占 + 遵循静音键 (.soloAmbient)")
                } else {
                    category = .playback
                    UNILogDebug("======audio======, 配置: 扬声器独占 + 不遵循静音键 (.playback)")
                }
                
                if !UniAudioPlayer.mixWithOther {
                    UniBackgroundAudioManagerBridge.pause()
                }
                
                try audioSession.setCategory(category, mode: .default, options: categoryOptions)
                // 强制使用扬声器输出
                try audioSession.overrideOutputAudioPort(.speaker)
                UNILogDebug("======audio======, 已设置音频路由: 扬声器")
            } else {
                // speakerOn = false：听筒播放，统一不遵循静音键
                // 使用 .playAndRecord（不受静音键影响，类似 .playback）
                category = .playAndRecord
                categoryOptions.insert(.allowBluetoothA2DP)
                
                // 听筒模式支持混音
                if UniAudioPlayer.mixWithOther {
                    categoryOptions.insert(.mixWithOthers)
                    UNILogDebug("======audio======, 配置: 听筒 + 混音 + 不遵循静音键 (.playAndRecord + mixWithOthers)")
                } else {
                    UniBackgroundAudioManagerBridge.pause()
                    UNILogDebug("======audio======, 配置: 听筒独占 + 不遵循静音键 (.playAndRecord)")
                }
                
                try audioSession.setCategory(category, mode: .default, options: categoryOptions)
                // 使用听筒（默认音频路由）
                try audioSession.overrideOutputAudioPort(.none)
                UNILogDebug("======audio======, 已设置音频路由: 听筒/默认")
            }
            
            try audioSession.setActive(true)
            UNILogDebug("======audio======, 音频会话激活成功，当前配置: speakerOn=\(UniAudioPlayer.speakerOn), obeyMuteSwitch=\(UniAudioPlayer.obeyMuteSwitch)")
        } catch {
            UNILogDebug("======audio======, Failed to set up audio session: \(error)")
        }
        
        // 如果背景音频正在播放，需要重新设置下 MPNowPlayingInfoCenter 状态
        if isOtherAppAudioPlaying == false {
            let nowPlayingInfo = MPNowPlayingInfoCenter.default().nowPlayingInfo ?? [:]
            MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
        }
    }
    // 设置播放源并更新 AVPlayerItem
    private func updatePlayerItem() {
        guard let player = player else { return }
        
        if src == "" {
            failedAction(1107609)
            return
        }
        var url: URL? = nil
        if self.src.startsWith("http") || self.src.startsWith("https") {
            if let _url = URL(string: self.src) {
                url = _url
            }
        } else {
            let temp = UTSiOS.convert2AbsFullPath(self.src)
            url = URL(fileURLWithPath: temp)
            if let path = url?.path {
                if (!FileManager.default.fileExists(atPath: path)) {
                    failedAction(1107603)
                    return
                }
            }
        }
        
        var tempCacheUrl: URL?
        
        let isM3u8 = url?.path.lowercased().contains("m3u8") ?? false
        if let cacheUrl = KTVHTTPCache.cacheCompleteFileURL(with: url), !isM3u8, self._cache {
            tempCacheUrl = cacheUrl
        }
        if let asset = player.currentItem?.asset as? AVURLAsset, (asset.url == url || asset.url == tempCacheUrl) {
            if _hasPlayError {
                innerSeek(0)
                if let errCode = _currentFailImpl?.errCode {
                    failedAction(errCode)
                }
            }
            return
        } else {
            _hasPlayError = false
        }
        
        playerItem = nil
        if let url = url {
            _readyToPlay = false
            if let scheme = url.scheme, scheme.startsWith("http"), self._cache {
                var _cacheUrl: URL
                if let cacheUrl = KTVHTTPCache.cacheCompleteFileURL(with: url), !isM3u8 {
                    _cacheUrl = cacheUrl
                } else {
                    let headers = [
                        "User-Agent": UTSiOS.getUserAgent(),
                        "Cookie": UTSiOS.getCookieString(url)
                    ]
                    KTVHTTPCache.downloadSetAdditionalHeaders(headers)
                    _cacheUrl = KTVHTTPCache.proxyURL(withOriginalURL: url, bindToLocalhost: false)
                }
                playerItem = AVPlayerItem(url: _cacheUrl)
            } else {
                playerItem = AVPlayerItem(url: url)
            }
            
            player.replaceCurrentItem(with: playerItem)
        }
        player.pause()
        
        // 监听各种状态
        addPlayerObservers()
        
        if autoplay {
            innerPlay()
        }
    }
    
    /// 判断是不是HLS 流是不是 live / event
    private func isHLSLiveOrEvent() -> Bool {
        guard let playerItem = player?.currentItem, playerItem.status == .readyToPlay else {
            return false
        }
        
        if playerItem.duration.isIndefinite {
            return true
        }
        
        return false
    }
    
    //释放资源
    private func releaseResources() {
        removePlayerObservers()
        pause()
        player = nil
        playerItem = nil
    }
}


//event事件
extension UniAudioPlayer {
    private func addEvent(event: UniAudioEvent, eventCallback: @escaping UniAudioEventCallback) {
        guard let _ = player else { return }
        var callbacks = eventCallbacks[event.rawValue] ?? []
        let wrapper = CallbackWrapper(callback: eventCallback)
        if !callbacks.contains(wrapper) {
            callbacks.append(wrapper)
            eventCallbacks.set(event.rawValue, callbacks)
        }
    }
    
    private func removeEvent(event: UniAudioEvent,  eventCallback: @escaping UniAudioEventCallback) {
        guard let _ = player else { return }
        if var callbacks = eventCallbacks.get(event.rawValue) {
            callbacks.removeAll()
            eventCallbacks.set(event.rawValue, callbacks)
        }
    }
    
    private func dispatchEvent(event: UniAudioEvent, result: Any? = nil) {
        guard let _ = player else { return }
        eventCallbacks.get(event.rawValue)?.forEach({ callbackWrapper in
            switch callbackWrapper.callbackType {
            case .callback(let callback):
                UNILogDebug("======audio======, 触发事件：\(event.rawValue)")
                callback(result ?? UTSJSONObject())
            case .errorCallback(_):
                break
            }
        })
    }
}

//监听逻辑
extension UniAudioPlayer {
    public override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        if keyPath == UniAudioObserveKeypath.status.rawValue {
            if let statusNumber =  change?[.newKey] as? NSNumber {
                let status = AVPlayerItem.Status(rawValue: statusNumber.intValue) ?? .unknown
                handleAudioPlayerStatus(status)
            }
        } else if keyPath == UniAudioObserveKeypath.rate.rawValue {
            //            UNILogDebug("======audio======, rate发生变化：\(player?.rate ?? 0)")
        } else if keyPath == UniAudioObserveKeypath.loadedTimeRanges.rawValue {
            if let timeRange = playerItem?.loadedTimeRanges.first?.timeRangeValue {
                self.buffered = (timeRange.end.seconds.round(3) as NSNumber)
            }
        } else if keyPath == UniAudioObserveKeypath.playbackBufferEmpty.rawValue {
            UNILogDebug("======audio======, buffer empty, 但可能还在播放")
            dispatchEvent(event: .waiting)
        } else if keyPath == UniAudioObserveKeypath.playbackLikelyToKeepUp.rawValue {
            UNILogDebug("======audio======, buffer 充足, 当前buffered = \(self.buffered)")
        } else if keyPath == UniAudioObserveKeypath.timeControlStatus.rawValue {
            if let player = player {
                //                UNILogDebug("======audio======, 播放状态改变为 = \(player.timeControlStatus)")
                if player.timeControlStatus == .playing {
                    _hasPlayError = false
                    if _isNeedSetRate {
                        _isNeedSetRate = false
                        player.rate = playbackRate?.toFloat() ?? 1.0
                    }
                } else {
                    _isNeedSetRate = true
                }
            }
        }
    }
    
    private func addPlayerObservers() {
        guard let player = player else { return }
        if !_hasAddObservers {
            player.addObserver(self, forKeyPath: UniAudioObserveKeypath.timeControlStatus.rawValue, options: .new, context: nil)
            player.addObserver(self, forKeyPath: UniAudioObserveKeypath.rate.rawValue, options: .new, context: nil)
        }
        
        if let currentItem = player.currentItem {
            currentItem.addObserver(self, forKeyPath: UniAudioObserveKeypath.status.rawValue, options: .new, context: nil)
            currentItem.addObserver(self, forKeyPath: UniAudioObserveKeypath.loadedTimeRanges.rawValue, options: .new, context: nil)
            currentItem.addObserver(self, forKeyPath: UniAudioObserveKeypath.playbackBufferEmpty.rawValue, options: .new, context: nil)
            currentItem.addObserver(self, forKeyPath: UniAudioObserveKeypath.playbackLikelyToKeepUp.rawValue, options: .new, context: nil)
        }
        addListenerInterruption()
        
        //监听播放完毕
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(playerDidFinishPlaying(_:)),
            name: AVPlayerItem.didPlayToEndTimeNotification,
            object: playerItem
        )
        
        //监听即将进入非活跃状态
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleAppStateChange),
            name: UIApplication.willResignActiveNotification,
            object: nil
        )
        
        //监听进入活跃状态
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleAppStateChange),
            name: UIApplication.didBecomeActiveNotification,
            object: nil
        )
        _hasAddObservers = true
    }
    
    @objc private func handleAppStateChange(notification: Notification) {
        if notification.name == UIApplication.willResignActiveNotification {
            if paused == false {
                _isPlayingBeforeResignActive = true
                pause()
            } else {
                _isPlayingBeforeResignActive = false
            }
        } else if notification.name == UIApplication.didBecomeActiveNotification {
            if _isPlayingBeforeResignActive {
                play()
            }
        }
    }
    
    
    @objc private func playerDidFinishPlaying(_ notification: Notification) {
        innerSeek(0)
        if self.loop {
            innerPlay()
        } else {
            UNILogDebug("======audio======, 播放结束")
            dispatchEvent(event: .ended)
        }
    }
    
    private func removePlayerObservers() {
        removePeriodicTimeObserver()
        if let player = player, let currentItem = player.currentItem {
            player.removeObserver(self, forKeyPath: UniAudioObserveKeypath.timeControlStatus.rawValue, context: nil)
            player.removeObserver(self, forKeyPath: UniAudioObserveKeypath.rate.rawValue, context: nil)
            currentItem.removeObserver(self, forKeyPath: UniAudioObserveKeypath.status.rawValue, context: nil)
            currentItem.removeObserver(self, forKeyPath: UniAudioObserveKeypath.loadedTimeRanges.rawValue, context: nil)
            currentItem.removeObserver(self, forKeyPath: UniAudioObserveKeypath.playbackBufferEmpty.rawValue, context: nil)
            currentItem.removeObserver(self, forKeyPath: UniAudioObserveKeypath.playbackLikelyToKeepUp.rawValue, context: nil)
        }
        NotificationCenter.default.removeObserver(self, name: AVPlayerItem.didPlayToEndTimeNotification, object: nil)
        NotificationCenter.default.removeObserver(self, name: UIApplication.didBecomeActiveNotification, object: nil)
        NotificationCenter.default.removeObserver(self, name: UIApplication.willResignActiveNotification, object: nil)
        
        player?.replaceCurrentItem(with: nil)
        removeListenerInterruption()
        _hasAddObservers = false
    }

    // 当全局策略改动时，实例级重新配置音频会话（不中断当前播放）
    fileprivate func reconfigureAudioSessionIfNeeded() {
        UNILogDebug("======audio======, 检测到全局音频策略变更，重新配置会话...")
        UNILogDebug("======audio======, 当前策略: speakerOn=\(UniAudioPlayer.speakerOn), obeyMuteSwitch=\(UniAudioPlayer.obeyMuteSwitch), mixWithOther=\(UniAudioPlayer.mixWithOther)")
        configureAudioSession()
    }
    
    // 添加播放进度监听
    private func addPeriodicTimeObserver() {
        guard let player = player else { return }
        
        // 设置观察间隔
        let interval = CMTime(seconds: 1.0, preferredTimescale: CMTimeScale(NSEC_PER_SEC))
        // 添加时间观察器
        timeObserverToken = player.addPeriodicTimeObserver(forInterval: interval, queue: .main) { [weak self] time in
            let currentTime = CMTimeGetSeconds(time)
            
            if let duration = self?.player?.currentItem?.duration {
                if let isSeeking = self?._isSeeking, !isSeeking, let iaPaused = self?.paused, !iaPaused {
                    UNILogDebug("======audio======, 当前时间: \(currentTime), 总时长: \(CMTimeGetSeconds(duration))")
                    self?.dispatchEvent(event: .timeUpdate)
                }
            }
        }
    }
    
    // 移除时间观察器
    private func removePeriodicTimeObserver() {
        if let token = timeObserverToken {
            player?.removeTimeObserver(token)
            timeObserverToken = nil
        }
    }
    
    private func handleAudioPlayerStatus(_ status: AVPlayerItem.Status) {
        _status = status
        switch status {
        case .readyToPlay:
            dispatchEvent(event: .canplay)
            if !_readyToPlay {
                if _isManualPlay {
                    dispatchEvent(event: .play)
                }
                _readyToPlay = true
            }
            UNILogDebug("======audio======, AVPlayerItem is ready to play")
        case .failed:
            UNILogDebug("======audio======, AVPlayerItem failed, 获取错误的域和错误码以进一步分析失败原因")
            if let error = playerItem?.error as NSError? {
                if error.domain == NSURLErrorDomain {
                    failedAction(1107602, errMsg: error.localizedDescription)
                } else if error.domain == AVFoundationErrorDomain {
                    failedAction(1107604)
                }
            } else {
                failedAction(117605)
            }
        case .unknown:
            UNILogDebug("======audio======, AVPlayerItem status is unknown")
            failedAction(117605)
        @unknown default:
            UNILogDebug("======audio======, AVPlayerItem status is unknown default case")
            failedAction(117605)
        }
    }
    
    private func addListenerInterruption() {
        // 监听音频被其他三方中断
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleInterruption(_:)),
            name: AVAudioSession.interruptionNotification,
            object: nil
        )
        
        // 监听耳机或其他音频设备插拔
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(audioRouteChangeListenerCallback(_:)),
            name: AVAudioSession.routeChangeNotification,
            object: nil
        )
    }
    
    private func removeListenerInterruption() {
        NotificationCenter.default.removeObserver(self, name: AVAudioSession.interruptionNotification, object: nil)
        NotificationCenter.default.removeObserver(self, name: AVAudioSession.routeChangeNotification, object: nil)
    }
    
    @objc private func handleInterruption(_ notification: Notification) {
        UNILogDebug("======audio======, 监听音频被其他三方中断")
        guard let userInfo = notification.userInfo,
              let interruptionTypeValue = userInfo[AVAudioSessionInterruptionTypeKey] as? UInt,
              let interruptionType = AVAudioSession.InterruptionType(rawValue: interruptionTypeValue) else {
            return
        }
        
        switch interruptionType {
        case .began:
            UNILogDebug("======audio======, 音频中断开始")
            _isPlayingBeforeInterruption = !paused
            if _isPlayingBeforeInterruption {
                pause()
            }
        case .ended:
            UNILogDebug("======audio======, 音频中断结束时的处理逻辑")
            if _isPlayingBeforeInterruption {
                play()
            }
        @unknown default:
            break
        }
    }
    
    @objc private func audioRouteChangeListenerCallback(_ notification: Notification) {
        UNILogDebug("======audio======, 监听耳机或其他音频设备插拔")
        guard let interruptionDict = notification.userInfo,
              let routeChangeReasonValue = interruptionDict[AVAudioSessionRouteChangeReasonKey] as? UInt,
              let routeChangeReason = AVAudioSession.RouteChangeReason(rawValue: routeChangeReasonValue) else {
            return
        }
        
        switch routeChangeReason {
        case .newDeviceAvailable:
            UNILogDebug("======audio======, 耳机或其他音频设备插入")
        case .oldDeviceUnavailable:
            UNILogDebug("======audio======, 耳机或其他音频设备拔出")
            pause()
        case .categoryChange:
            UNILogDebug("======audio======, 音频会话类别发生变化")
        default:
            break
        }
    }
}


private class UniBackgroundAudioManagerBridge {
    
    private static let className = "UniBackgroundAudioManager"
    
    // 获取单例实例
    static func getInstance() -> NSObject? {
        guard let cls = NSClassFromString(className) as? NSObject.Type else {
            return nil
        }
        return cls.value(forKey: "shared") as? NSObject
    }
    
    // 判断是否正在播放（paused == false）
    static func isPlaying() -> Bool? {
        guard let instance = getInstance() else { return nil }
        return instance.value(forKey: "paused") as? Bool == false
    }
    
    // 调用 pause()
    static func pause() {
        guard let instance = getInstance() else { return }
        let sel = NSSelectorFromString("pause")
        if instance.responds(to: sel) {
            instance.perform(sel)
        }
    }
    
    // 调用 play()
    static func play() {
        guard let instance = getInstance() else { return }
        let sel = NSSelectorFromString("play")
        if instance.responds(to: sel) {
            instance.perform(sel)
        }
    }
    
    // 调用 stop()
    static func stop() {
        guard let instance = getInstance() else { return }
        let sel = NSSelectorFromString("stop")
        if instance.responds(to: sel) {
            instance.perform(sel)
        }
    }
}

extension NSNumber {
    func toDouble() -> Double {
        return Double(truncating: self)
    }
    
    func toFloat() -> Float {
        return Float(truncating: self)
    }
    
    /// 设置最多小数点位数, 显示控制直接移除小数点位数
    func maximumFractionDigits(_ count: Int) -> NSNumber {
        let formatter = NumberFormatter()
        formatter.maximumFractionDigits = count
        return formatter.number(from: formatter.string(from: self) ?? self.stringValue) ?? self
    }
}



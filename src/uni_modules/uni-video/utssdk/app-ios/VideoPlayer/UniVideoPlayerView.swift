//
//  UniVideoPlayerView.swift
//  UniVideoPlayer
//
//  Created by Fred on 2025/1/8.
//

import Foundation
import AVFoundation
import UIKit
import DCloudUTSFoundation
import DCloudUniappRuntime

private enum PosterPresentationPhase {
    case idle
    case waitingForFrame
    case video
}

private struct PosterContent {
    var url: String = ""
    var image: UIImage?
    var loadRevision: UInt64 = 0
}

// MARK: - UniVideoPlayerView
@available(iOS 13.0, *)
public class UniVideoPlayerView: UIView {

    // MARK: - Properties

    /// 封面图视图
    private var posterImageView: UIImageView?

    /// Poster 内容与展示阶段分离，异步加载只更新内容，渲染统一由 renderPoster() 决定。
    private var posterContent = PosterContent()
    private var posterPhase: PosterPresentationPhase = .idle

    /// 播放器管理类实例
    private var playerManager: UniVideoPlayerManager?

    /// 播放器配置
    private var configuration: UniVideoPlayerConfiguration?

    /// 事件代理
    public weak var eventDelegate: UniVideoPlayerEventDelegate?

    /// 是否已准备好
    private var isPrepared: Bool = false

    /// playerManager 尚未创建时收到 play 请求，等 manager 完成初始化后补偿执行。
    private var pendingPlayAfterManagerSetup: Bool = false

    /// View 侧 source 版本，旧异步任务不得回退当前 source 的 poster。
    private var sourceRevision: UInt64 = 0

    /// 当前播放速率
    private var _playbackRate: Float = 1.0

    /// 动态通道：http缓存开关（未配置前暂存）
    private var _httpCacheOverride: Bool?

    /// 动态通道：外部指定的时长（未配置前暂存）
    private var _durationOverride: TimeInterval?

    /// 缓存的当前时间
    private var _cachedCurrentTime: TimeInterval = 0

    /// 缓存的时长
    private var _cachedDuration: TimeInterval = 0

    /// 缓存的播放状态
    private var _cachedIsPlaying: Bool = false

    /// 是否已停止（用于过滤 stop 后的回调）
    private var isStopped: Bool = false

    /// 仅记录权威 ready 事件与 play 事件的到达顺序，不参与播放器控制。
    private var isVideoReadyForDisplay: Bool = false

    /// 当前是否全屏
    private var isFullscreen: Bool = false

    /// 销毁态下丢弃所有异步状态/事件回调，避免页面析构后继续触发 DOM 访问
    private var isDestroying: Bool = false

    private var destroyTask: Task<Void, Never>?

    private var playStartTime: CFAbsoluteTime?

    private var siblingBringToFrontWorkItem: DispatchWorkItem?

    private weak var slotHostView: UIView?

    private weak var titleBarOverlayView: UIView?

    private weak var controlsBarOverlayView: UIView?

    private let siblingBringToFrontDelay: TimeInterval = 0.1

    // MARK: - Public Properties

    /// 当前播放时间
    public var currentTime: TimeInterval {
        return _cachedCurrentTime
    }

    /// 视频总时长
    public var duration: TimeInterval {
        get {
            return _cachedDuration
        }
        set {
            let sanitized = max(0, newValue)
            _durationOverride = sanitized
            _cachedDuration = sanitized
            configuration?.duration = sanitized
        }
    }

    /// 是否启用 httpCache（动态通道）
    public var httpCache: Bool {
        get {
            if let override = _httpCacheOverride {
                return override
            }
            return configuration?.httpCache ?? false
        }
        set {
            if _httpCacheOverride == newValue && configuration?.httpCache == newValue {
                return
            }
            _httpCacheOverride = newValue
            configuration?.httpCache = newValue

            Task { @MainActor in
                await self.playerManager?.setHttpCache(newValue)
            }
        }
    }

    /// 是否正在播放
    public var isPlaying: Bool {
        return _cachedIsPlaying
    }

    /// 视频真实宽度，未准备好时为 0。
    public var videoWidth: CGFloat {
        return playerManager?.currentVideoSize.width ?? 0
    }

    /// 视频真实高度，未准备好时为 0。
    public var videoHeight: CGFloat {
        return playerManager?.currentVideoSize.height ?? 0
    }

    /// 封面图
    public var poster: String {
        get {
            return posterContent.url
        }
        set {
            updatePoster(newValue)
        }
    }

    // MARK: - Initialization

    public override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        self.backgroundColor = .black

        let imageView = UIImageView(frame: self.bounds)
        imageView.contentMode = .scaleAspectFit
        imageView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        imageView.clipsToBounds = true
        imageView.isHidden = true
        self.addSubview(imageView)
        self.posterImageView = imageView
    }

    deinit {
        isDestroying = true
        eventDelegate = nil
        siblingBringToFrontWorkItem?.cancel()
        siblingBringToFrontWorkItem = nil

        let manager = playerManager
        Task { @MainActor in
            manager?.delegate = nil
            await manager?.cleanup()
        }
    }

    public override func didMoveToSuperview() {
        super.didMoveToSuperview()

        guard self.superview != nil else {
            siblingBringToFrontWorkItem?.cancel()
            siblingBringToFrontWorkItem = nil
            return
        }

        siblingBringToFrontWorkItem?.cancel()
        siblingBringToFrontWorkItem = nil
    }

    // MARK: - Configuration

    /// 配置播放器
    /// - Parameters:
    ///   - src: 视频源地址
    ///   - options: 播放器选项
    public func configure(src: String, options: UniVideoPlayerOptions?) {
        let objectFitValue: VideoObjectFit
        if let objectFitString = options?.objectFit {
            objectFitValue = VideoObjectFit(stringValue: objectFitString) ?? .contain
        } else {
            objectFitValue = .contain
        }

        self.configuration = UniVideoPlayerConfiguration(
            loop: options?.loop ?? false,
            src: src,
            poster: options?.poster,
            initialTime: options?.initialTime ?? 0,
            duration: 0,
            autoplay: options?.autoplay ?? false,
            muted: options?.muted ?? false,
            objectFit: objectFitValue,
            pageGesture: options?.pageGesture ?? true,
            httpCache: options?.httpCache ?? false,
            pip: options?.pip ?? false,
            isDRM: false,
            drmConfiguration: nil
        )

        applyOptionOverrides()
        let initialPoster = self.configuration?.poster ?? ""
        sourceRevision &+= 1
        posterPhase = .idle
        isVideoReadyForDisplay = false
        posterContent.loadRevision &+= 1
        posterContent.url = ""
        posterContent.image = nil
        posterImageView?.contentMode = objectFitValue.contentMode
        poster = initialPoster

        Task { @MainActor in
            self.setupPlayerManager()
        }
    }

    /// 设置播放器管理类
    @MainActor
    private func setupPlayerManager() {
        guard !isDestroying, let config = self.configuration else { return }

        self.playerManager = UniVideoPlayerManager(configuration: config)
        self.playerManager?.delegate = self
        self.playerManager?.setupPlayerView(in: self)

        let shouldStartPlayback = (config.autoplay || pendingPlayAfterManagerSetup) && !config.src.isEmpty

        preloadPrepare()

        if shouldStartPlayback {
            pendingPlayAfterManagerSetup = false
            play()
        }
    }

    // MARK: - Playback Control

    /// 显式预加载播放器资源
    public func preloadPrepare() {
        let requestedSourceRevision = sourceRevision
        Task { @MainActor in
            guard let playerManager = self.playerManager else { return }

            do {
                try await playerManager.prepareIfNeeded()
                guard requestedSourceRevision == self.sourceRevision else { return }
                self.isPrepared = playerManager.isReady
            } catch {
                guard requestedSourceRevision == self.sourceRevision else { return }
                self.posterPlaybackFailed()
                self.eventDelegate?.onError(error)
            }
        }
    }

    /// 播放
    public func play() {
        guard !isDestroying else { return }
        let requestedSourceRevision = sourceRevision
        playStartTime = CFAbsoluteTimeGetCurrent()

        isStopped = false
        Task { @MainActor in
            guard let playerManager = self.playerManager else {
                self.pendingPlayAfterManagerSetup = true
                return
            }

            do {
                try await playerManager.play()
                guard requestedSourceRevision == self.sourceRevision else { return }
                self.isPrepared = playerManager.isReady
            } catch {
                guard requestedSourceRevision == self.sourceRevision else { return }
                self.posterPlaybackFailed()
                self.eventDelegate?.onError(error)
            }
        }
    }

    /// 暂停
    public func pause() {
        Task { @MainActor in
            await self.playerManager?.pause()
            self._cachedIsPlaying = false
        }
    }

    public func seek(_ position: TimeInterval) {
        isStopped = false

        Task.detached { @MainActor [weak self] in
            guard let self = self else { return }

            self.eventDelegate?.onSeeking(time: position)

            do {
                let managerSeekStart = CFAbsoluteTimeGetCurrent()
                try await self.playerManager?.seek(to: position)
                let managerSeekEnd = CFAbsoluteTimeGetCurrent()

                self._cachedCurrentTime = position
                self.eventDelegate?.onSeeked(time: position)
            } catch {
                self.eventDelegate?.onError(error)
            }
        }
    }

    public func changeVolume(_ volume: Float) {
        Task { @MainActor in
            await self.playerManager?.setVolume(volume)
        }
    }

    /// 停止
    public func stop() {
        isStopped = true
        Task { @MainActor in
            await self.playerManager?.stop()
            self._cachedIsPlaying = false
            self._cachedCurrentTime = 0
            self.eventDelegate?.onStop()
        }
    }

    /// 设置播放速率
    public func setPlaybackRate(_ rate: Float) {
        _playbackRate = rate
        Task { @MainActor in
            await self.playerManager?.setPlaybackRate(rate)
        }
    }

    /// 设置静音
    public func setMuted(_ muted: Bool) {
        Task { @MainActor in
            await self.playerManager?.setMuted(muted)
        }
    }

    /// 设置循环
    public func setLoop(_ loop: Bool) {
        Task { @MainActor in
            await self.playerManager?.setLoop(loop)
        }
    }

    /// 设置自动播放
    public func setAutoplay(_ autoplay: Bool) {
        configuration?.autoplay = autoplay
        Task { @MainActor in
            await self.playerManager?.setAutoplay(autoplay)
        }
    }

    /// 当视频大小与 video 容器大小不一致时，视频的表现形式
    /// - Parameter objectFit: 填充模式 ("contain" | "fill" | "cover")
    public func setObjectFit(_ objectFit: ObjectFit) {
        // 从字符串转换为 enum
        guard let objectFitEnum = VideoObjectFit(stringValue: objectFit) else {
            UNILogDebug("[UniVideoPlayerView] Invalid objectFit value: \(objectFit)")
            return
        }

        // 更新配置
        self.configuration?.objectFit = objectFitEnum

        // poster 与视频画面使用相同的填充模式。
        self.posterImageView?.contentMode = objectFitEnum.contentMode

        // 通知播放器管理器更新 AVPlayerLayer 的 videoGravity
        Task { @MainActor in
            await self.playerManager?.setObjectFit(objectFitEnum)
        }
    }

    /// 更新视频源
    public func updateSource(_ src: String, autoplay: Bool? = nil) {
        sourceRevision &+= 1
        let requestedSourceRevision = sourceRevision
        if let autoplay {
            configuration?.autoplay = autoplay
        }
        configuration?.src = src
        let autoplayEnabled = configuration?.autoplay == true
        isPrepared = false
        isStopped = false
        posterPhase = .idle
        isVideoReadyForDisplay = false
        if posterContent.url.isEmpty {
            posterContent.image = nil
        }
        if !posterContent.url.isEmpty && posterContent.image == nil {
            // 播放完成后已释放图片；换源时需要重新加载同一张 poster。
            updatePoster(posterContent.url)
        } else {
            renderPoster()
        }
        _cachedCurrentTime = 0
        _cachedDuration = 0
        _cachedIsPlaying = false
        Task { @MainActor in
            do {
                await self.playerManager?.setAutoplay(autoplayEnabled)
                guard requestedSourceRevision == self.sourceRevision else { return }

                // setAutoplay 的 await 期间旧 source 仍可能回调；更新 source 前再次重置 View 状态。
                self.posterPhase = .idle
                if self.posterContent.url.isEmpty {
                    self.posterContent.image = nil
                }
                self.renderPoster()

                try await self.playerManager?.updateSource(src)
                guard requestedSourceRevision == self.sourceRevision else { return }
                self.isPrepared = self.playerManager?.isReady == true
                self._cachedIsPlaying = autoplayEnabled && !src.isEmpty
            } catch {
                guard requestedSourceRevision == self.sourceRevision else { return }
                self.isPrepared = false
                self._cachedIsPlaying = false
                self.posterPlaybackFailed()
                self.eventDelegate?.onError(error)
            }
        }
    }

    /// 销毁播放器
    public func destroy() {
        guard !isDestroying else { return }
        isDestroying = true
        sourceRevision &+= 1
        eventDelegate = nil
        siblingBringToFrontWorkItem?.cancel()
        siblingBringToFrontWorkItem = nil

        let manager = self.playerManager
        manager?.delegate = nil
        self.playerManager = nil

        destroyTask?.cancel()
        destroyTask = Task { @MainActor in
            await manager?.cleanup()
        }
    }

    /// 更新全屏状态
    public func updateFullscreenState(_ isFullscreen: Bool) {
        guard !isDestroying else { return }
        self.isFullscreen = isFullscreen

        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            guard !self.isDestroying else { return }

            Task { @MainActor in
                self.playerManager?.updateFullscreenState(isFullscreen)
            }

            self.setNeedsLayout()
            self.layoutIfNeeded()
            self.scheduleSiblingBringToFrontAfterLayout()
        }
    }

    public override func layoutSubviews() {
        super.layoutSubviews()
        posterImageView?.frame = bounds

        // 更新播放器层的 frame
        Task { @MainActor in
            self.playerManager?.updatePlayerLayerFrame(self.bounds)
        }

        scheduleSiblingBringToFrontAfterLayout()
    }

    public func setSlotHostView(_ slotHostView: UIView?) {
        self.slotHostView = slotHostView
        guard slotHostView != nil else {
            siblingBringToFrontWorkItem?.cancel()
            siblingBringToFrontWorkItem = nil
            return
        }
        scheduleSiblingBringToFrontAfterLayout()
    }

    public func setOverlayControlViews(_ titleBarOverlayView: UIView?, _ controlsBarOverlayView: UIView?) {
        self.titleBarOverlayView = titleBarOverlayView
        self.controlsBarOverlayView = controlsBarOverlayView
        scheduleSiblingBringToFrontAfterLayout()
    }
}

@available(iOS 13.0, *)
extension UniVideoPlayerView {
    private func scheduleSiblingBringToFrontAfterLayout() {
        guard slotHostView != nil else {
            siblingBringToFrontWorkItem?.cancel()
            siblingBringToFrontWorkItem = nil
            return
        }

        siblingBringToFrontWorkItem?.cancel()
        let workItem = DispatchWorkItem { [weak self] in
            guard let self = self else { return }
            self.bringSiblingContainerToFrontAfterDelay()
        }

        siblingBringToFrontWorkItem = workItem

        // js 在全屏切换处理中有延时处理，所以这个延时是必要的，能更好的捕获添加的子组件
        DispatchQueue.main.asyncAfter(deadline: .now() + siblingBringToFrontDelay, execute: workItem)
    }

    private func bringSiblingContainerToFrontAfterDelay() {
        defer {
            siblingBringToFrontWorkItem = nil
        }

        guard let targetView = slotHostView,
              let superview = targetView.superview else {
            return
        }

        let isTop = superview.subviews.last === targetView

        if !isTop {
            superview.bringSubviewToFront(targetView)
        }

        bringOverlayViewToFront(titleBarOverlayView)
        bringOverlayViewToFront(controlsBarOverlayView)
    }

    private func bringOverlayViewToFront(_ overlayView: UIView?) {
        guard let overlayView = overlayView,
              let overlaySuperview = overlayView.superview else {
            return
        }

        if overlaySuperview.subviews.last !== overlayView {
            overlaySuperview.bringSubviewToFront(overlayView)
        }
    }
    private func updatePoster(_ url: String) {
        configuration?.poster = url
        posterContent.loadRevision &+= 1
        let requestedRevision = posterContent.loadRevision
        posterContent.url = url
        posterContent.image = nil
        renderPoster()

        guard !url.isEmpty else { return }

        UTSiOS.loadImage(url) { [weak self] (image, data) in
            DispatchQueue.main.async {
                guard let self = self, !self.isDestroying else { return }
                guard self.posterContent.url == url,
                      self.posterContent.loadRevision == requestedRevision else { return }
                guard let image = image else { return }

                self.posterContent.image = image
                self.renderPoster()
            }
        }
    }

    private func posterPlaybackStarted() {
        if isVideoReadyForDisplay {
            posterPhase = .video
        } else if case .idle = posterPhase {
            posterPhase = .waitingForFrame
        }
        renderPoster()
    }

    private func posterVideoReady() {
        guard case .waitingForFrame = posterPhase else { return }
        posterPhase = .video
        renderPoster()
    }

    private func posterPlaybackFailed() {
        guard case .waitingForFrame = posterPhase else { return }
        posterPhase = .idle
        renderPoster()
    }

    private func renderPoster() {
        guard let posterImageView = posterImageView else { return }

        switch posterPhase {
        case .idle:
            guard let image = posterContent.image else {
                hidePosterView(posterImageView)
                return
            }
            posterImageView.image = image
            if let objectFit = configuration?.objectFit {
                posterImageView.contentMode = objectFit.contentMode
            }
            posterImageView.layer.removeAllAnimations()
            posterImageView.alpha = 1
            posterImageView.isHidden = false
            bringSubviewToFront(posterImageView)
        case .waitingForFrame:
            // 视频首帧未就绪时保留旧 poster，新的 poster 加载完成后替换它。
            guard !posterContent.url.isEmpty else {
                hidePosterView(posterImageView)
                break
            }
            guard let image = posterContent.image else { break }
            posterImageView.image = image
            if let objectFit = configuration?.objectFit {
                posterImageView.contentMode = objectFit.contentMode
            }
            posterImageView.layer.removeAllAnimations()
            posterImageView.alpha = 1
            posterImageView.isHidden = false
            bringSubviewToFront(posterImageView)
        case .video:
            hidePosterView(posterImageView)
        }
    }

    private func hidePosterView(_ posterImageView: UIImageView) {
        posterImageView.layer.removeAllAnimations()
        posterImageView.alpha = 0
        posterImageView.isHidden = true
        posterImageView.image = nil
        posterContent.image = nil
    }

    private func applyOptionOverrides() {
        if let override = _httpCacheOverride {
            configuration?.httpCache = override
        }
        if let override = _durationOverride {
            configuration?.duration = override
            _cachedDuration = override
        }
    }

    private func logPlayPerformance() {
        if let playStartTime = playStartTime {
            let playElapsed = (CFAbsoluteTimeGetCurrent() - playStartTime) * 1000
            let logMessage = "⏱️ Play Performance: Total \(String(format: "%.1f", playElapsed))ms"
            UNILogDebug("[UniVideoPlayerManager] \(logMessage)")
        }
        playStartTime = nil
    }

    private var shouldIgnoreCallbacks: Bool {
        return isDestroying || playerManager == nil
    }
}

// MARK: - UniVideoPlayerDelegate
@available(iOS 13.0, *)
extension UniVideoPlayerView: UniVideoPlayerDelegate {

    @MainActor
    public func videoPlayer(_ player: UniVideoPlayerManager, didChangeState state: UniVideoPlayerState) {
        guard !shouldIgnoreCallbacks else { return }
        UNILogDebug("[UniVideoPlayerState didChangeState: ] \(state)")

        // 只更新内部状态，不触发事件回调（事件回调由 didReceiveEvent 统一处理）
        switch state {
        case .playing:
            _cachedIsPlaying = true
        case .paused, .ended, .idle:
            _cachedIsPlaying = false
        case .ready:
            // ready 状态需要获取时长信息并触发 onPrepared
            Task { @MainActor [weak self] in
                guard let self = self, !self.shouldIgnoreCallbacks else { return }
                if let timeInfo = await player.getCurrentTimeInfo(), !self.shouldIgnoreCallbacks {
                    self._cachedDuration = timeInfo.duration
                    self.eventDelegate?.onPrepared(duration: timeInfo.duration)
                }
            }
        case .failed(let error):
            // 错误状态需要立即通知
            self.posterPlaybackFailed()
            eventDelegate?.onError(error)
        default:
            break
        }
    }

    @MainActor
    public func videoPlayer(_ player: UniVideoPlayerManager, didReceiveEvent event: UniVideoPlayerEvent) {
        guard !shouldIgnoreCallbacks else { return }
        UNILogDebug("[UniVideoPlayerEvent didReceiveEvent: ] \(event)")

        switch event {
        case .play:
            _cachedIsPlaying = true
            posterPlaybackStarted()
            eventDelegate?.onPlay()

#if DEBUG
            logPlayPerformance()
#endif

        case .pause:
            _cachedIsPlaying = false
            eventDelegate?.onPause()
        case .end:
            _cachedIsPlaying = false
            eventDelegate?.onEnded()
        case .timeUpdate(let currentTime, let duration):
            guard !isStopped else { return }
            guard currentTime.isFinite && duration.isFinite && duration > 0 else {
                return
            }
            _cachedCurrentTime = currentTime
            _cachedDuration = duration
            guard !shouldIgnoreCallbacks else { return }
            eventDelegate?.onTimeUpdate(time: currentTime, duration: duration)
        case .waiting:
            eventDelegate?.onWaiting()
        case .error(let error):
            posterPlaybackFailed()
            eventDelegate?.onError(error)
        case .firstFrameCaptured(let image):
            eventDelegate?.onFirstFrameCaptured(image: image)

            if posterContent.url.isEmpty, posterContent.image == nil {
                posterContent.image = image
                renderPoster()
            }
        case .videoReadyForDisplay:
            isVideoReadyForDisplay = true
            player.updatePlayerLayerFrame(bounds)
            posterVideoReady()
        case .bufferUpdate:
            break
        }
    }
}

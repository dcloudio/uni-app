//
//  UniVideoPlayerManager.swift
//  UniVideoPlayer
//
//  Created by Fred on 3/12/25.
//
//  架构说明:
//  =========
//  本 Manager 负责所有 AVPlayer 相关操作，运行在 @MainActor
//
//  职责:
//  - 持有和管理 AVPlayer / AVPlayerItem
//  - 设置和管理 KVO 观察者
//  - 处理 DRM 会话
//  - 管理 PlayerLayer / PIP / 手势
//  - 执行实际的播放、暂停、seek 等操作
//
//  与 Actor 的协作 (完全类型安全):
//  - Manager → Actor: 通过 await 调用方法（请求决策、更新状态）
//  - Actor → Manager: 通过 AsyncStream 推送状态变化
//  - 不使用 nonisolated(unsafe)，完全依赖编译器检查
//
//  数据流:
//  ┌─────────────────────────────────────────────────────┐
//  │  UniVideoPlayerManager (@MainActor)                 │
//  │       │                         ▲                   │
//  │       │ await transition()      │ for await state   │
//  │       ▼                         │                   │
//  │  UniVideoPlayerActor ───(AsyncStream)───┘          │
//  └─────────────────────────────────────────────────────┘

import Foundation
import AVFoundation
import UIKit
import QuartzCore
import DCloudUniappRuntime

/// UniVideoPlayerManager - 播放器管理类 (@MainActor)
///
/// 设计原则:
/// 1. 所有 AVPlayer 操作在 MainActor 执行
/// 2. 状态决策委托给 UniVideoPlayerActor
/// 3. KVO 观察者统一在此管理
@available(iOS 13.0, *)
@MainActor
public class UniVideoPlayerManager {
    
    // MARK: - AVPlayer 相关属性 (MainActor 持有)
    
    /// 播放器实例
    private var player: AVPlayer?
    
    /// 播放项
    private var playerItem: AVPlayerItem?
    
    /// 播放器图层
    private var playerLayer: AVPlayerLayer?
    
    /// 时间观察者
    private var timeObserver: Any?

    /// 播放结束通知观察者，block-based NotificationCenter API 必须保存 token 才能正确移除。
    private var playbackEndObserver: NSObjectProtocol?

    /// 当前资源的播放层是否已经有可显示画面，避免重复发送 readyForDisplay
    private var hasSentVideoReadyForDisplay = false

    /// 当前视频真实展示尺寸，用于未指定全屏方向时按横竖屏自动选择。
    public private(set) var currentVideoSize: CGSize = .zero
    
    /// KVO 观察者列表
    private var observers: [NSKeyValueObservation] = []
    
    // MARK: - DRM 相关属性
    
    /// DRM 管理器
    private var drmManager: DRMManager?
    
    /// 内容密钥会话
    private var contentKeySession: AVContentKeySession?
    
    /// DRM 代理
    private var drmDelegate: DRMContentKeyDelegate?
    
    // MARK: - 其他管理器
    
    /// 画中画管理器
    private var pipManager: PIPManager?
    
    /// 手势管理器
    private var gestureManager: GestureManager?
    
    // MARK: - 状态管理
    
    /// 状态 Actor - 负责线程安全的状态管理
    private let stateActor: UniVideoPlayerActor
    
    /// 播放器配置 (本地副本，用于快速访问)
    private var configuration: UniVideoPlayerConfiguration
    
    /// 状态监听任务
    private var stateObservationTask: Task<Void, Never>?
    
    /// 是否正在 seek (用于过滤旧的时间回调)
    private var isSeeking = false
    
    /// 当前 seek 操作的唯一标识
    private var currentSeekID = UUID()
    
    /// 等待 ready 状态的 continuation 列表（prepare、play 可能同时等待同一次 loading 完成）
    private var readyContinuations: [CheckedContinuation<Void, Error>] = []
    
    // MARK: - 公开属性
    
    /// 播放器代理
    public weak var delegate: UniVideoPlayerDelegate?
    
    /// 播放器视图容器
    public private(set) var playerView: UIView?
    
    /// 当前播放状态 (从 Actor 同步)
    public private(set) var currentState: UniVideoPlayerState = .idle

    /// 第一帧截图
    public private(set) var firstFrame: UIImage?
    
    /// 首帧预览调度句柄
    private var firstFramePreviewHandle: FirstFramePreviewHandle?

    /// 当前首帧截图代次，用于过滤 submit 竞态和晚到截图回写。
    private var firstFramePreviewGenerationID = UUID()

    /// 是否正在清理，避免 cleanup 与析构并发重入
    private var isCleaningUp = false

    /// 是否已经完成清理，丢弃所有晚到回调
    private var hasCleanedUp = false
    
    // MARK: - 初始化
    
    /// 初始化播放器管理器
    /// - Parameter configuration: 播放器配置
    public init(configuration: UniVideoPlayerConfiguration) {
        self.configuration = configuration
        self.stateActor = UniVideoPlayerActor(configuration: configuration)
        
        // 启动状态流监听
        startStateObservation()
    }
    
    /// 析构函数
    ///
    /// 设计说明：
    /// - @MainActor 类的实例销毁时，deinit 在 MainActor 上执行
    /// - 使用 MainActor.assumeIsolated 向编译器断言当前已在 MainActor
    /// - 这是 Swift 并发模型推荐的处理方式（SE-0392）
    deinit {
        stateObservationTask?.cancel()
        
        // 使用 MainActor.assumeIsolated 执行清理
        // 对于 @MainActor 类，deinit 保证在 MainActor 上执行
        MainActor.assumeIsolated {
            guard !hasCleanedUp else { return }
            isCleaningUp = true
            cancelFirstFramePreview(resetImage: false)
            delegate = nil
            finishReadyContinuation(UniVideoPlayerError.loadFailed("Player destroyed"))

            // 移除时间观察者
            if let observer = timeObserver, let player = player {
                player.removeTimeObserver(observer)
            }
            
            // 移除播放结束通知观察者
            if let observer = playbackEndObserver {
                NotificationCenter.default.removeObserver(observer)
                playbackEndObserver = nil
            }
            
            // 移除 KVO 观察者
            observers.forEach { $0.invalidate() }
            
            // 清理 M3U8 ResourceLoader（防止内存泄漏）
            if let item = playerItem,
               let asset = item.asset as? AVURLAsset {
                LocalM3U8Handler.shared.cleanup(for: asset)
            }
            
            // 清理播放器
            player?.pause()
            player?.replaceCurrentItem(with: nil)
            
            // 清理 DRM
            contentKeySession?.expire()
            
            // 清理 UI 相关
            pipManager?.cleanup()
            gestureManager?.cleanup()
            
            // 清理图层
            playerLayer?.player = nil
            playerLayer?.removeFromSuperlayer()

            hasCleanedUp = true
        }
    }
    
    // MARK: - 设置方法
    
    /// 设置播放器视图
    /// - Parameter containerView: 播放器容器视图
    public func setupPlayerView(in containerView: UIView) {
        // 创建播放器图层
        let layer = AVPlayerLayer()

        performWithoutLayerAnimations {
            layer.frame = containerView.bounds
            layer.backgroundColor = UIColor.black.cgColor
            // 播放层必须在所有 UIKit 子视图下方，否则 poster/覆盖控件可能被黑色 AVPlayerLayer 盖住。
            containerView.layer.insertSublayer(layer, at: 0)
        }
        
        self.playerLayer = layer
        self.playerView = containerView
        updateVideoGravity(configuration.objectFit)
        
        // 设置手势管理
        if configuration.pageGesture {
            setupGestureManager(on: containerView)
        }
        
        // 设置画中画
        if configuration.pip {
            setupPIPManager(with: layer)
        }
        
        UNILogDebug("[UniVideoPlayerManager] Player view setup completed - frame: \(containerView.bounds)")
    }
    
    // MARK: - 公开 API
    
    /// 准备播放
    public func prepare() async throws {
        // 1. 通知 Actor 进入 loading 状态
        await stateActor.transition(to: .loading)
        
        // 2. 解析并创建 AVURLAsset（区分网络视频和本地视频）
        let (asset, isLocal) = try parseVideoAsset(from: configuration.src)
        
        do {
            // 视频播放需要主动切到 playback，避免受物理静音键影响。
            try configureAudioSessionForPlayback()
            
            // 3. 启动缓存服务（仅网络视频且开启 httpCache 时）
            if !isLocal && configuration.httpCache {
                try CacheManager.shared.startProxyServer()
            }
            
            // 4. 创建播放项
            if configuration.isDRM {
                try await setupDRM()
                // DRM 场景暂不支持 ResourceLoader
                if let session = contentKeySession {
                    asset.resourceLoader.setDelegate(nil, queue: nil)
                    session.addContentKeyRecipient(asset)
                }
            }
            
            playerItem = AVPlayerItem(asset: asset)
            
            guard let item = playerItem else {
                throw UniVideoPlayerError.loadFailed("Failed to create player item")
            }
            
            // 创建播放器
            player = AVPlayer(playerItem: item)
            player?.automaticallyWaitsToMinimizeStalling = true
            player?.isMuted = configuration.muted
            if #available(iOS 16.0, *) {
                player?.defaultRate = Float(configuration.rate)
            }
            
            // 关联播放器到 layer；禁用隐式动画，避免首帧接管时 layer 内容发生一次缩放过渡。
            performWithoutLayerAnimations {
                playerLayer?.player = player
            }
            
            setupObservers()
            
            // 设置初始播放位置
            if configuration.initialTime > 0 {
                let time = CMTime(seconds: configuration.initialTime, preferredTimescale: 600)
                await player?.seek(to: time)
            }
            
            UNILogDebug("[UniVideoPlayerManager] Prepare initiated, waiting for readyToPlay callback")
            
            // 等待 ready 状态（由 handleStatusChange 中的 .readyToPlay 回调触发）
            try await waitForReady()
        } catch {
            await stateActor.transition(to: .failed(error))
            throw error
        }
    }

    /// 显式预加载资源
    public func prepareIfNeeded() async throws {
        let state = await stateActor.getState()

        switch state {
        case .ready, .playing, .paused:
            return
        case .loading:
            try await waitForReady()
        case .idle, .failed(_):
            try await prepare()
        case .ended:
            return
        }
    }

    private func configureAudioSessionForPlayback() throws {
        let audioSession = AVAudioSession.sharedInstance()
        try audioSession.setCategory(.playback, mode: .moviePlayback, options: [])
        try audioSession.setActive(true)
    }
    
    /// 播放
    public func play() async throws {
        // 外部可能在 prepare/updateSource 的 loading 阶段调用 play；这里等待 ready 后继续执行本次播放意图。
        if case .loading = await stateActor.getState() {
            try await waitForReady()
        }

        // 1. 向 Actor 请求决策
        let decision = await stateActor.decidePlay()
        
        switch decision {
        case .allow:
            // 2. 执行播放
            guard let player = player else {
                throw UniVideoPlayerError.loadFailed("Player not initialized")
            }
            
            
#if DEBUG
            // 诊断信息
            UNILogDebugPlayDiagnostics()
#endif
            
            player.play()
            
            if configuration.rate != 1.0 {
                player.rate = Float(configuration.rate)
            }
            
            // 3. 通知 Actor 更新状态
            await stateActor.transition(to: .playing)
            
            // 4. 发送事件
            sendEvent(.play)
            
            UNILogDebug("[UniVideoPlayerManager] ▶️ Play called - rate: \(player.rate)")
            
        case .needsPrepare:
            // 需要先准备
            try await prepare()
            try await play()
            
        case .deny(let reason):
            UNILogDebug("[UniVideoPlayerManager] Play denied: \(reason)")
        }
    }
    
    /// 暂停
    public func pause() async {
        // 1. 检查是否可以暂停
        guard await stateActor.decidePause() else {
            UNILogDebug("[UniVideoPlayerManager] Pause denied: not playing")
            return
        }
        
        // 2. 执行暂停
        player?.pause()
        
        // 3. 更新状态
        await stateActor.transition(to: .paused)
        
        // 4. 发送事件
        sendEvent(.pause)
    }
    
    /// 停止
    public func stop() async {
        player?.pause()
        
        if let item = playerItem {
            await item.seek(to: .zero)
        }
        
        await stateActor.transition(to: .paused)
    }
    
    /// 跳转到指定时间
    /// - Parameter time: 目标时间（秒）
    public func seek(to time: TimeInterval) async throws {
        let seekStartTime = CFAbsoluteTimeGetCurrent()
        UNILogDebug("🟢 [Manager Seek] START - time: \(time), thread: \(Thread.current)")
        
        // 1. 向 Actor 请求决策
        let decisionStart = CFAbsoluteTimeGetCurrent()
        let decision = await stateActor.decideSeek(to: time)
        let decisionEnd = CFAbsoluteTimeGetCurrent()
        UNILogDebug("🟢 [Manager Seek] Decision took: \(String(format: "%.1f", (decisionEnd - decisionStart) * 1000))ms")
        
        switch decision {
        case .allow(let clampedTime):
            // 2. 标记 seek 开始
            let seekID = UUID()
            currentSeekID = seekID
            isSeeking = true
            
            // 3. 执行 seek
            guard let player = player else {
                throw UniVideoPlayerError.loadFailed("Player not initialized")
            }
            
            let cmTime = CMTime(seconds: clampedTime, preferredTimescale: 600)
            
            // 使用精确 seek
            let avSeekStart = CFAbsoluteTimeGetCurrent()
            UNILogDebug("🟢 [Manager Seek] AVPlayer.seek START")
            let finished = await player.seek(to: cmTime, toleranceBefore: .zero, toleranceAfter: .zero)
            let avSeekEnd = CFAbsoluteTimeGetCurrent()
            UNILogDebug("🟢 [Manager Seek] AVPlayer.seek END - took: \(String(format: "%.1f", (avSeekEnd - avSeekStart) * 1000))ms, finished: \(finished)")
            
            // 4. 检查是否被新的 seek 打断
            guard currentSeekID == seekID else {
                UNILogDebug("🟢 [Manager Seek] Interrupted by new seek")
                return
            }
            
            // 5. 更新时间信息到 Actor
            let updateStart = CFAbsoluteTimeGetCurrent()
            updateTimeInfoToActor()
            let updateEnd = CFAbsoluteTimeGetCurrent()
            UNILogDebug("🟢 [Manager Seek] updateTimeInfoToActor took: \(String(format: "%.1f", (updateEnd - updateStart) * 1000))ms")
            
            // 6. 如果 seek 成功，立即发送正确的时间事件，确保 UI 同步
            if finished {
                let eventStart = CFAbsoluteTimeGetCurrent()
                // 此时 playerItem.currentTime() 可能还没更新，直接使用目标时间
                let duration = player.currentItem?.duration.seconds ?? 0
                if duration.isFinite && duration > 0 {
                    sendEvent(.timeUpdate(currentTime: clampedTime, duration: duration))
                }
                let eventEnd = CFAbsoluteTimeGetCurrent()
                UNILogDebug("🟢 [Manager Seek] sendEvent took: \(String(format: "%.1f", (eventEnd - eventStart) * 1000))ms")
            }
            
            // 7. 延迟重置 isSeeking，过滤积压的旧回调
            let sleepStart = CFAbsoluteTimeGetCurrent()
            try? await Task.sleep(nanoseconds: 250_000_000) // 0.25s
            let sleepEnd = CFAbsoluteTimeGetCurrent()
            UNILogDebug("🟢 [Manager Seek] Sleep took: \(String(format: "%.1f", (sleepEnd - sleepStart) * 1000))ms")
            
            if currentSeekID == seekID {
                isSeeking = false
            }
            
            let totalElapsed = (CFAbsoluteTimeGetCurrent() - seekStartTime) * 1000
            UNILogDebug("🟢 [Manager Seek] END - total: \(String(format: "%.1f", totalElapsed))ms")
            
        case .deny(let reason):
            UNILogDebug("🔴 [Manager Seek] DENIED: \(reason)")
            throw UniVideoPlayerError.loadFailed("Seek denied: \(reason)")
        }
    }
    
    /// 设置音量
    public func setVolume(_ volume: Float) async {
        player?.volume = max(0.0, min(1.0, volume))
    }
    
    /// 设置静音
    public func setMuted(_ muted: Bool) async {
        player?.isMuted = muted
        await stateActor.updateMuted(muted)
        configuration.muted = muted
    }
    
    /// 设置循环播放
    public func setLoop(_ loop: Bool) async {
        await stateActor.updateLoop(loop)
        configuration.loop = loop
    }
    
    /// 设置 httpCache（播放前设置）
    public func setHttpCache(_ enabled: Bool) async {
        configuration.httpCache = enabled
        await stateActor.updateHttpCache(enabled)
    }
    
    /// 设置视频填充模式
    public func setObjectFit(_ objectFit: VideoObjectFit) async {
        configuration.objectFit = objectFit
        updateVideoGravity(objectFit)
    }
    
    /// 更新播放器层的视频填充模式
    private func updateVideoGravity(_ objectFit: VideoObjectFit) {
        guard let layer = playerLayer else { return }
        performWithoutLayerAnimations {
            layer.videoGravity = objectFit.videoGravity
        }
    }
    
    /// 设置播放速率
    /// - Parameter rate: 播放速率 (0.5 - 2.0)
    public func setPlaybackRate(_ rate: Float) async {
        let clampedRate = max(0.5, min(2.0, rate))
        
        configuration.rate = Double(clampedRate)
        
        if #available(iOS 16.0, *) {
            player?.defaultRate = clampedRate
        }
        
        guard let player = player else { return }
        let currentState = await stateActor.getState()
        let isCurrentlyPlaying = currentState == .playing || currentState == .loading
        if isCurrentlyPlaying {
            player.rate = clampedRate
        }
    }
    
    /// 为无显式 poster 的场景提前截取首帧，不改变播放器状态，也不触发 prepare/play。
    public func preloadFirstFrameForPoster() {
        guard !configuration.src.isEmpty else { return }
        if let firstFrame = firstFrame {
            sendEvent(.firstFrameCaptured(firstFrame))
            return
        }
        guard firstFramePreviewHandle == nil else { return }

        guard !isHLSVideoSource(configuration.src) else { return }
        guard canPreviewFirstFrame(for: configuration.src) else { return }

        do {
            let (asset, _) = try parseVideoAsset(from: configuration.src)
            preloadFirstFrame(from: asset, source: configuration.src)
        } catch {
            // poster 预取失败不能影响后续手动 play；真正播放错误仍由 prepare/play 上报。
            UNILogDebug("[UniVideoPlayerManager] ⚠️ Failed to create asset for poster first frame: \(error)")
        }
    }

    /// 更新视频源
    /// - Parameter src: 新的视频源地址
    public func updateSource(_ src: String) async throws {
        // 1. 清理当前播放器
        cleanupPlayer()
        
        // 2. 更新配置
        configuration.src = src
        await stateActor.updateSource(src)
        
        guard !src.isEmpty else {
            await stateActor.reset()
            return
        }
        
        try await prepare()
        
        // 3. 根据 autoplay 决定是否立即播放；未播放场景只刷新首帧 poster。
        if configuration.autoplay {
            try await play()
        }
    }
    
    /// 启用/禁用自动播放
    public func setAutoplay(_ autoplay: Bool) async {
        configuration.autoplay = autoplay
        await stateActor.updateAutoplay(autoplay)
    }
    
    /// 启用/禁用手势控制
    public func setPageGesture(_ enabled: Bool) {
        configuration.pageGesture = enabled
        gestureManager?.setEnabled(enabled)
    }
    
    /// 启用/禁用画中画
    public func setPIP(_ enabled: Bool) {
        configuration.pip = enabled
        pipManager?.setEnabled(enabled)
    }
    
    /// 开始画中画
    public func startPIP() throws {
        guard configuration.pip else {
            UNILogDebug("[UniVideoPlayerManager] PIP is not enabled in configuration")
            return
        }
        try pipManager?.startPIP()
    }
    
    /// 停止画中画
    public func stopPIP() {
        pipManager?.stopPIP()
    }
    
    // MARK: - Fullscreen Handling
    
    /// 更新全屏状态
    /// - Parameter isFullscreen: 是否全屏
    public func updateFullscreenState(_ isFullscreen: Bool) {
        UNILogDebug("[UniVideoPlayerManager] 全屏状态: \(isFullscreen)")
        
        // 根据全屏状态调整播放器层的视频填充模式
        if isFullscreen {
            playerLayer?.videoGravity = .resizeAspect  // 全屏时保持比例
        } else {
            // 恢复原始填充模式
             updateVideoGravity(configuration.objectFit)
        }
    }
    
    /// 更新播放器层的 frame
    public func updatePlayerLayerFrame(_ bounds: CGRect) {
        performWithoutLayerAnimations {
            playerLayer?.frame = bounds
        }
    }
    
    /// 获取当前播放时间信息
    public func getCurrentTimeInfo() async -> VideoTimeInfo? {
        return await stateActor.getCurrentTimeInfo()
    }
    
    /// 获取缓存信息
    public func getCacheInfo() -> CacheInfo? {
        guard let url = URL(string: configuration.src) else { return nil }
        return CacheManager.shared.getCacheInfo(for: url)
    }
    
    /// 清理播放器资源
    public func cleanup() async {
        guard !hasCleanedUp, !isCleaningUp else { return }
        isCleaningUp = true
        delegate = nil
        finishReadyContinuation(UniVideoPlayerError.loadFailed("Player destroyed"))

        // 1. 取消状态监听
        stateObservationTask?.cancel()
        stateObservationTask = nil
        
        // 2. 取消首帧预加载任务
        cancelFirstFramePreview(resetImage: true)
        
        // 3. 清理播放器核心资源
        cleanupPlayer()
        
        // 4. 清理 UI 相关资源
        pipManager?.cleanup()
        pipManager = nil
        
        gestureManager?.cleanup()
        gestureManager = nil
        
        // 清理首帧缓存
        firstFrame = nil
        
        playerLayer?.player = nil
        playerLayer?.removeFromSuperlayer()
        playerLayer = nil
        playerView = nil
        
        // 5. 重置 Actor 状态
        await stateActor.reset()

        hasCleanedUp = true
        
        UNILogDebug("[UniVideoPlayerManager] Cleanup completed")
    }
    
    // MARK: - Private Methods - 设置
    
    /// prepare 到 avplayer ready 的动态响应
    private func waitForReady() async throws {
        let state = await stateActor.getState()
        if case .ready = state { return }
        if case .failed(let error) = state { throw error }
        
        let timeoutTask = Task { @MainActor [weak self] in
            try await Task.sleep(nanoseconds: 30_000_000_000) // 30秒
            // 超时后如果 continuation 还在，说明没有收到 ready
            self?.finishReadyContinuation(UniVideoPlayerError.loadFailed("Prepare timeout"))
        }
        
        defer { timeoutTask.cancel() }
        
        // 挂起当前执行，等待 startStateObservation 中恢复
        try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Void, Error>) in
            self.readyContinuations.append(continuation)
        }
    }

    private func finishReadyContinuation(_ error: Error? = nil) {
        guard !readyContinuations.isEmpty else {
            return
        }

        let continuations = readyContinuations
        readyContinuations.removeAll()

        for continuation in continuations {
            if let error = error {
                continuation.resume(throwing: error)
            } else {
                continuation.resume()
            }
        }
    }
    
    /// 创建优化的 AVURLAsset
    /// - Parameters:
    ///   - url: 视频 URL
    ///   - isLocal: 是否为本地视频
    /// - Returns: 配置好的 AVURLAsset
    private func createOptimizedAsset(for url: URL, isLocal: Bool) -> AVURLAsset {
        var options: [String: Any] = [:]
        
        if isLocal {
            options[AVURLAssetPreferPreciseDurationAndTimingKey] = true
            
            UNILogDebug("[UniVideoPlayerManager] Creating asset for local video: \(url.path)")
        } else {
            // 网络视频优化配置
            // 1. 优先从缓存加载（减少网络延迟）
            options[AVURLAssetPreferPreciseDurationAndTimingKey] = false
            
            // 2. 允许使用蜂窝网络
            options["AVURLAssetAllowsCellularAccessKey"] = true
            
            // 3. HTTP 头部配置（减少握手时间）
            var headers: [String: String] = [:]
            headers["Connection"] = "keep-alive"
            headers["Accept-Encoding"] = "identity"
            options["AVURLAssetHTTPHeaderFieldsKey"] = headers
            
            UNILogDebug("[UniVideoPlayerManager] Creating asset for remote video: \(url.absoluteString)")
        }
        
        let asset = AVURLAsset(url: url, options: options)
        
        // 预加载关键属性
        asset.loadValuesAsynchronously(forKeys: ["playable", "duration"]) {
            // 预加载完成，但不阻塞
        }
        
        return asset
    }
    
    /// 启动状态流监听
    /// 使用 AsyncStream 接收 Actor 的状态变化，完全类型安全
    private func startStateObservation() {
        stateObservationTask = Task { [weak self] in
            guard let self = self else { return }
            
            // 获取状态流（nonisolated 访问）
            let stream = await self.stateActor.stateStream!
            
            // 在 MainActor 上消费状态流
            for await stateChange in stream {
                // 检查任务是否被取消
                if Task.isCancelled || self.shouldDropCallbacks { break }
                
                // 转换为 UniVideoPlayerState 并更新
                let state = stateChange.toState()
                self.currentState = state
                guard !self.shouldDropCallbacks else { break }
                self.delegate?.videoPlayer(self, didChangeState: state)
                
                // 如果有等待 ready 的 continuation，在状态变为 ready 时恢复
                if case .ready = state {
                    self.finishReadyContinuation()
                }
                
                // 如果状态变为 failed，也要恢复 continuation
                if case .failed(let error) = state {
                    self.finishReadyContinuation(error)
                }
            }
        }
    }
    
    /// 设置 KVO 观察者
    private func setupObservers() {
        guard let item = playerItem, let player = player else { return }

        // AVPlayerLayer 真正有可显示画面后再通知上层隐藏 poster，避免 play 事件先到导致露出黑底/首帧跳变。
        if let layer = playerLayer {
            let readyForDisplayObserver = layer.observe(\.isReadyForDisplay, options: [.new, .initial]) { [weak self] layer, _ in
                Task { @MainActor in
                    guard let self = self else { return }
                    guard layer.isReadyForDisplay, !self.hasSentVideoReadyForDisplay else { return }
                    self.hasSentVideoReadyForDisplay = true
                    self.sendEvent(.videoReadyForDisplay)
                }
            }
            observers.append(readyForDisplayObserver)
        }
        
        // 观察播放状态
        let statusObserver = item.observe(\.status, options: [.new, .initial]) { [weak self] item, _ in
            Task { @MainActor in
                await self?.handleStatusChange(item.status)
            }
        }
        observers.append(statusObserver)
        
        // 观察 duration 变化
        let durationObserver = item.observe(\.duration, options: [.new, .initial]) { [weak self] item, _ in
            Task { @MainActor in
                guard let self = self else { return }
                
                if item.duration.isValid && !item.duration.isIndefinite {
                    let duration = item.duration.seconds
                    self.updateTimeInfoToActor()
                }
            }
        }
        observers.append(durationObserver)

        // 观察视频展示尺寸，presentationSize 已包含视频旋转信息。
        let presentationSizeObserver = item.observe(\.presentationSize, options: [.new, .initial]) { [weak self] item, _ in
            Task { @MainActor in
                self?.updateVideoPresentationSize(item.presentationSize)
            }
        }
        observers.append(presentationSizeObserver)
        
        // 观察缓冲区为空
        let bufferEmptyObserver = item.observe(\.isPlaybackBufferEmpty, options: [.new]) { [weak self] item, _ in
            Task { @MainActor in
                if item.isPlaybackBufferEmpty {
                    UNILogDebug("[UniVideoPlayerManager] ⚠️ Buffer empty - buffering...")
                    self?.sendEvent(.waiting)
                }
            }
        }
        observers.append(bufferEmptyObserver)
        
        // 观察缓冲区可继续播放
        let bufferKeepUpObserver = item.observe(\.isPlaybackLikelyToKeepUp, options: [.new]) { [weak self] item, _ in
            Task { @MainActor in
                guard let self = self else { return }
                if item.isPlaybackLikelyToKeepUp {
                    UNILogDebug("[UniVideoPlayerManager] ✅ Buffer ready - can play")
                    // 如果正在播放状态，确保继续播放
                    if await self.stateActor.isPlaying() {
                        self.player?.play()
                        if self.configuration.rate != 1.0 {
                            self.player?.rate = Float(self.configuration.rate)
                        }
                    }
                }
            }
        }
        observers.append(bufferKeepUpObserver)
        
        // 观察缓冲区已满
        let bufferFullObserver = item.observe(\.isPlaybackBufferFull, options: [.new]) { [weak self] item, _ in
            Task { @MainActor in
                if item.isPlaybackBufferFull {
                    UNILogDebug("[UniVideoPlayerManager] 💾 Buffer full")
                }
            }
        }
        observers.append(bufferFullObserver)
        
        // 观察播放结束
        if let observer = playbackEndObserver {
            NotificationCenter.default.removeObserver(observer)
            playbackEndObserver = nil
        }
        playbackEndObserver = NotificationCenter.default.addObserver(
            forName: .AVPlayerItemDidPlayToEndTime,
            object: item,
            queue: .main
        ) { [weak self] _ in
            Task { @MainActor in
                await self?.handlePlaybackEnd()
            }
        }
        
        // 时间观察者 - 使用后台队列避免阻塞主线程
        let interval = CMTime(seconds: 1.0, preferredTimescale: CMTimeScale(NSEC_PER_SEC))
        let backgroundQueue = DispatchQueue(label: "com.dcloud.uni.video.timeobserver", qos: .userInitiated)
        timeObserver = player.addPeriodicTimeObserver(forInterval: interval, queue: backgroundQueue) { [weak self] time in
            Task { @MainActor in
                self?.handleTimeUpdate(time)
            }
        }
    }
    
    /// 设置 DRM
    private func setupDRM() async throws {
        guard let drmConfig = configuration.drmConfiguration else {
            throw UniVideoPlayerError.drmFailed("DRM configuration not provided")
        }
        
        drmManager = DRMManager(configuration: drmConfig)
        try await drmManager?.loadCertificate()
        
        contentKeySession = DRMManager.createContentKeySession()
        
        if let manager = drmManager {
            drmDelegate = DRMContentKeyDelegate(drmManager: manager)
            contentKeySession?.setDelegate(drmDelegate, queue: DispatchQueue.main)
        }
        
        UNILogDebug("[UniVideoPlayerManager] DRM setup completed")
    }
    
    /// 设置手势管理器
    private func setupGestureManager(on view: UIView) {
        gestureManager = GestureManager()
        gestureManager?.setup(on: view)
        gestureManager?.setEnabled(configuration.pageGesture)
        
        gestureManager?.onVolumeChanged = { [weak self] volume in
            Task {
                await self?.setVolume(volume)
            }
        }
        
        gestureManager?.onBrightnessChanged = { brightness in
            
            UNILogDebug("[UniVideoPlayerManager] Brightness changed to: \(brightness)")
        }
    }
    
    /// 设置画中画管理器
    private func setupPIPManager(with playerLayer: AVPlayerLayer) {
        pipManager = PIPManager()
        do {
            try pipManager?.setup(with: playerLayer)
            pipManager?.setEnabled(configuration.pip)
            
            pipManager?.onPIPDidStart = {
                UNILogDebug("[UniVideoPlayerManager] PIP started")
            }
            
            pipManager?.onPIPDidStop = {
                UNILogDebug("[UniVideoPlayerManager] PIP stopped")
            }
            
            pipManager?.onPIPError = { error in
                UNILogDebug("[UniVideoPlayerManager] PIP error: \(error)")
            }
        } catch {
            UNILogDebug("[UniVideoPlayerManager] Failed to setup PIP: \(error)")
        }
    }
    
    // MARK: - Private Methods - 事件处理
    
    /// 处理播放状态变化
    private func handleStatusChange(_ status: AVPlayerItem.Status) async {
        switch status {
        case .readyToPlay:
            let currentState = await stateActor.getState()
            
            if currentState == .loading {
                await stateActor.transition(to: .ready, options: .markPrepared)
                
                updateTimeInfoToActor()
                
                UNILogDebug("[UniVideoPlayerManager] Transitioned to ready state")
            }
        case .failed:
            if let error = playerItem?.error {
                UNILogDebug("[UniVideoPlayerManager] Failed: \(error)")
                let playerError = UniVideoPlayerError.unknown(error)
                await stateActor.transition(to: .failed(playerError))
                sendEvent(.error(playerError))
            }
        default:
            break
        }
    }
    
    /// 处理时间更新
    private func handleTimeUpdate(_ time: CMTime) {
        guard !isSeeking else { return }
        
        // 2. 过滤非播放状态下的回调
        guard currentState == .playing else { return }
        
        guard let item = playerItem else { return }
        
        // 3. 一次性获取所有时间信息（避免重复调用）
        let rawCurrent = item.currentTime().seconds
        let rawDuration = item.duration.seconds
        
        guard rawCurrent.isFinite, rawDuration.isFinite else { return }
        
        let currentTime = (rawCurrent * 10).rounded() / 10
        let duration = rawDuration
        
        // 4. 异步更新 Actor（不阻塞）
        let buffered = item.loadedTimeRanges.first?.timeRangeValue.end.seconds ?? 0
        Task.detached { [weak self] in
            guard let self = self else { return }
            
            let timeInfo = VideoTimeInfo(
                currentTime: currentTime,
                duration: duration,
                bufferedTime: buffered.isNaN ? 0 : buffered
            )
            await self.stateActor.updateTimeInfo(timeInfo)
        }
        
        // 5. 发送事件（主线程）
        sendEvent(.timeUpdate(
            currentTime: currentTime,
            duration: duration
        ))
    }
    
    /// 处理播放结束
    private func handlePlaybackEnd() async {
        
        await stateActor.transition(to: .ended)
        sendEvent(.end)
        
        if await stateActor.shouldLoop() {
            do {
                try await seek(to: 0)
                try await play()
            } catch {
                UNILogDebug("[UniVideoPlayerManager] Loop playback failed: \(error)")
            }
        }
    }
    
    // MARK: - Private Methods
    
    /// 解析视频源并创建 AVURLAsset
    /// - Parameter src: 视频源地址
    /// - Returns: (AVURLAsset, isLocal)
    /// - Throws: 解析失败时抛出错误
    private func parseVideoAsset(from src: String) throws -> (AVURLAsset, Bool) {
        // 判断是否为网络视频
        if src.hasPrefix("http://") || src.hasPrefix("https://") {
            guard let url = URL(string: src) else {
                throw UniVideoPlayerError.invalidURL
            }
            let asset = createOptimizedAsset(for: url, isLocal: false)
            return (asset, false)
        }
        
        // 本地路径处理
        let absolutePath = UTSiOS.convert2AbsFullPath(src)
        
        // 检查文件是否存在
        if !FileManager.default.fileExists(atPath: absolutePath) {
            UNILogError("[UniVideoPlayerManager] Local video file not found: \(absolutePath)")
            throw UniVideoPlayerError.loadFailed("Local video file not found: \(absolutePath)")
        }
        
        // 特殊处理：本地 m3u8 文件（可能包含远程分片）
        if absolutePath.lowercased().hasSuffix(".m3u8") || absolutePath.lowercased().hasSuffix(".m3u") {
            let (asset, isLocal) = try LocalM3U8Handler.shared.handleLocalM3U8(
                localPath: absolutePath,
                originalSrc: src
            )
            return (asset, isLocal)
        }
        
        // 普通本地视频文件
        let url = URL(fileURLWithPath: absolutePath)
        let asset = createOptimizedAsset(for: url, isLocal: true)
        return (asset, true)
    }
    
    /// 判断是否为 HLS 视频
    private func isHLSVideo(url: URL) -> Bool {
        let pathExtension = url.pathExtension.lowercased()
        return pathExtension == "m3u8" || pathExtension == "m3u"
    }

    /// 基于原始 src 判断 HLS，避免仅为 poster 预取而提前初始化本地 m3u8 handler。
    private func isHLSVideoSource(_ src: String) -> Bool {
        if src.hasPrefix("http://") || src.hasPrefix("https://"), let url = URL(string: src) {
            return isHLSVideo(url: url)
        }

        let absolutePath = UTSiOS.convert2AbsFullPath(src)
        return isHLSVideo(url: URL(fileURLWithPath: absolutePath))
    }
    
    private func processURLForCache(_ url: URL) -> URL {
        guard configuration.httpCache else { return url }
        return CacheManager.shared.proxyURL(for: url, enableCache: configuration.httpCache)
    }
    
    private func updateVideoPresentationSize(_ size: CGSize) {
        let width = abs(size.width)
        let height = abs(size.height)
        guard width > 0, height > 0 else { return }
        currentVideoSize = CGSize(width: width, height: height)
    }

    /// 更新时间信息到 Actor
    private func updateTimeInfoToActor() {
        guard let item = playerItem else { return }
        
        guard item.duration.isValid && !item.duration.isIndefinite else {
            UNILogDebug("[UniVideoPlayerManager] Duration not ready yet, skipping time info update")
            return
        }
        
        let currentTime = item.currentTime().seconds
        let duration = item.duration.seconds
        let buffered = item.loadedTimeRanges.first?.timeRangeValue.end.seconds ?? 0
        
        let timeInfo = VideoTimeInfo(
            currentTime: currentTime.isNaN ? 0 : currentTime,
            duration: duration.isNaN ? 0 : duration,
            bufferedTime: buffered.isNaN ? 0 : buffered
        )
        
        UNILogDebug("[UniVideoPlayerManager] Updating time info - duration: \(duration)s")
        
        Task {
            await stateActor.updateTimeInfo(timeInfo)
        }
    }
    
    /// 发送事件给代理
    private func sendEvent(_ event: UniVideoPlayerEvent) {
        guard !shouldDropCallbacks else { return }
        delegate?.videoPlayer(self, didReceiveEvent: event)
    }

    /// AVPlayerLayer 的 frame / gravity / player 切换不能带隐式动画，否则 poster 移除时会暴露一次缩放过渡。
    private func performWithoutLayerAnimations(_ updates: () -> Void) {
        CATransaction.begin()
        CATransaction.setDisableActions(true)
        updates()
        CATransaction.commit()
    }
    
    /// 预加载第一帧
    private func preloadFirstFrame(from asset: AVAsset, source: String) {
        guard firstFrame == nil else { return }

        cancelFirstFramePreview(resetImage: false)
        let generationID = UUID()
        firstFramePreviewGenerationID = generationID
        let ownerID = ObjectIdentifier(self)

        let request = FirstFramePreviewRequest(
            id: generationID,
            ownerID: ownerID,
            source: source,
            asset: asset,
            priority: .normal
        ) { [weak self] result in
            guard let self = self else { return }
            defer {
                if self.firstFramePreviewGenerationID == generationID {
                    self.firstFramePreviewHandle = nil
                    self.firstFramePreviewGenerationID = UUID()
                }
            }

            guard !self.shouldDropCallbacks else { return }
            guard self.firstFramePreviewGenerationID == generationID, self.configuration.src == source else { return }

            switch result {
            case .success(let image, _):
                self.firstFrame = image
                self.delegate?.videoPlayer(self, didReceiveEvent: .firstFrameCaptured(image))
            case .cancelled:
                break
            case .failed(let error, _):
                UNILogDebug("[UniVideoPlayerManager] ⚠️ Failed to preload first frame: \(error)")
            }
        }

        Task { @MainActor in
            let handle = await FirstFramePreviewCenter.shared.submit(request)
            guard self.firstFramePreviewGenerationID == generationID,
                  self.configuration.src == source,
                  self.firstFrame == nil,
                  !self.shouldDropCallbacks else {
                await FirstFramePreviewCenter.shared.cancel(handle)
                return
            }
            self.firstFramePreviewHandle = handle
        }
    }

    private func cancelFirstFramePreview(resetImage: Bool) {
        if let handle = firstFramePreviewHandle {
            Task {
                await FirstFramePreviewCenter.shared.cancel(handle)
            }
        }
        firstFramePreviewHandle = nil
        firstFramePreviewGenerationID = UUID()
        if resetImage {
            firstFrame = nil
        }
    }
    
    private func UNILogDebugPlayDiagnostics() {
        guard let player = player, let item = playerItem else { return }
        
        UNILogDebug("=== Play Diagnostics ===")
        UNILogDebug("Status: \(item.status.rawValue)")
        UNILogDebug("Buffer Empty: \(item.isPlaybackBufferEmpty)")
        UNILogDebug("Buffer Likely to Keep Up: \(item.isPlaybackLikelyToKeepUp)")
        UNILogDebug("Buffer Full: \(item.isPlaybackBufferFull)")
        UNILogDebug("Duration: \(item.duration.seconds)")
        UNILogDebug("Current Time: \(item.currentTime().seconds)")
        UNILogDebug("Rate: \(player.rate)")
        UNILogDebug("======================")
    }
    
    /// 清理播放器核心资源
    private func cleanupPlayer() {
        cancelFirstFramePreview(resetImage: true)

        // 移除时间观察者
        if let observer = timeObserver, let player = player {
            player.removeTimeObserver(observer)
        }
        timeObserver = nil
        hasSentVideoReadyForDisplay = false
        currentVideoSize = .zero
				
        if let observer = playbackEndObserver {
            NotificationCenter.default.removeObserver(observer)
            playbackEndObserver = nil
        }
				
        // 移除 KVO 观察者
        observers.forEach { $0.invalidate() }
        observers.removeAll()
        
        if let item = playerItem,
           let asset = item.asset as? AVURLAsset {
            LocalM3U8Handler.shared.cleanup(for: asset)
        }
        
        // 清理播放器
        player?.pause()
        player?.replaceCurrentItem(with: nil)
        player = nil
        playerItem = nil
        
        // 清理 DRM
        contentKeySession?.expire()
        contentKeySession = nil
        drmManager = nil
        drmDelegate = nil
    }

    private func canPreviewFirstFrame(for source: String) -> Bool {
        let unsuitableExtensions: Set<String> = ["avi", "flv", "mkv", "ogg", "ogv", "webm", "wmv"]
        let trimmedSource = source.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedSource.isEmpty else { return false }

        let path = URL(string: trimmedSource)?.path ?? trimmedSource.components(separatedBy: "?").first ?? trimmedSource
        let pathExtension = (path as NSString).pathExtension.lowercased()
        guard !pathExtension.isEmpty else { return true }

        return !unsuitableExtensions.contains(pathExtension)
    }

    private var shouldDropCallbacks: Bool {
        return isCleaningUp || hasCleanedUp
    }
}

// MARK: - Public Extensions

@available(iOS 13.0, *)
public extension UniVideoPlayerManager {
    
    /// 播放器是否正在播放
    var isPlaying: Bool {
        return currentState == .playing
    }
    
    /// 播放器是否已准备好
    var isReady: Bool {
        return currentState == .ready || currentState == .playing || currentState == .paused
    }
    
    /// 播放器是否失败
    var isFailed: Bool {
        if case .failed = currentState {
            return true
        }
        return false
    }
}

//
//  UniVideoPlayerInstance.swift
//  UniVideoPlayer
//
//  Created by Fred on 2025/1/5.
//

import Foundation
import AVFoundation
import UIKit

// MARK: - UniVideoPlayer协议
@available(iOS 13.0, *)
public protocol UniVideoPlayerProtocol: AnyObject {
    /// 播放视频
    func play()
    
    /// 暂停播放
    func pause()
    
    /// 跳转到指定位置（秒）
    func seek(_ position: TimeInterval)
    
    /// 停止播放
    func stop()
    
    /// 设置播放速率
    func setPlaybackRate(_ rate: Float)
    
    /// 设置静音
    func setMuted(_ muted: Bool)
    
    /// 设置循环播放
    func setLoop(_ loop: Bool)
    
    /// 获取当前播放时间（秒）
    var currentTime: TimeInterval { get }
    
    /// 获取视频总时长（秒）
    var duration: TimeInterval { get }
    
    /// 获取播放状态
    var isPlaying: Bool { get }
    
    /// 播放器视图
    var playerView: UIView? { get }
    
    /// 事件代理
    var eventDelegate: UniVideoPlayerEventDelegate? { get set }
}

// MARK: - 事件代理协议
@available(iOS 13.0, *)
public protocol UniVideoPlayerEventDelegate: AnyObject {
    
    /// 播放开始
    func onPlay()
    
    /// 播放暂停
    func onPause()
    
    /// 播放结束
    func onEnded()
    
    /// 播放停止
    func onStop()
    
    /// 播放错误
    func onError(_ error: Error)
    
    /// 视频准备完成
    /// - Parameter duration: 视频总时长（秒）
    func onPrepared(duration: TimeInterval)
    
    /// 正在跳转
    /// - Parameter time: 目标时间（秒）
    func onSeeking(time: TimeInterval)
    
    /// 跳转完成
    /// - Parameter time: 当前时间（秒）
    func onSeeked(time: TimeInterval)
    
    /// 播放进度更新
    /// - Parameters:
    ///   - time: 当前播放时间（秒）
    ///   - duration: 视频总时长（秒）
    func onTimeUpdate(time: TimeInterval, duration: TimeInterval)
    
    /// 全屏状态变化
    /// - Parameter fullscreen: 是否全屏
    func onFullscreenChange(fullscreen: Bool)

    /// 缓冲中
    func onWaiting()

    /// 第一帧截取完成
    func onFirstFrameCaptured(image: UIImage)
}

// MARK: - 事件代理默认实现
@available(iOS 13.0, *)
public extension UniVideoPlayerEventDelegate {
    func onPlay() {}
    func onPause() {}
    func onEnded() {}
    func onStop() {}
    func onError(_ error: Error) {}
    func onPrepared(duration: TimeInterval) {}
    func onSeeking(time: TimeInterval) {}
    func onSeeked(time: TimeInterval) {}
    func onTimeUpdate(time: TimeInterval, duration: TimeInterval) {}
    func onFullscreenChange(fullscreen: Bool) {}
    func onWaiting() {}
    func onFirstFrameCaptured(image: UIImage) {}
}

// MARK: - UniVideoPlayer实现类
@available(iOS 13.0, *)
public class UniVideoPlayer: NSObject, UniVideoPlayerProtocol {
    
    // MARK: - Properties
    
    /// 播放器管理类实例（@MainActor隔离）
    private var playerManager: UniVideoPlayerManager?
    
    /// 播放器配置
    private var configuration: UniVideoPlayerConfiguration
    
    /// 容器视图
    private weak var containerView: UIView?
    
    /// 事件代理
    public weak var eventDelegate: UniVideoPlayerEventDelegate?
    
    /// 是否已准备好
    private var isPrepared: Bool = false
    
    /// 当前播放速率
    private var _playbackRate: Float = 1.0
    
    /// 缓存的当前时间（用于同步访问）
    private var _cachedCurrentTime: TimeInterval = 0
    
    /// 缓存的时长（用于同步访问）
    private var _cachedDuration: TimeInterval = 0
    
    /// 缓存的播放状态
    private var _cachedIsPlaying: Bool = false
    
    // MARK: - UniVideoPlayerProtocol Properties
    
    /// 当前播放时间（返回缓存值，异步更新）
    public var currentTime: TimeInterval {
        return _cachedCurrentTime
    }
    
    /// 视频总时长（返回缓存值，异步更新）
    public var duration: TimeInterval {
        return _cachedDuration
    }
    
    /// 是否正在播放
    public var isPlaying: Bool {
        return _cachedIsPlaying
    }
    
    /// 播放器视图（缓存）
    private weak var _cachedPlayerView: UIView?
    
    /// 播放器视图
    public var playerView: UIView? {
        return _cachedPlayerView
    }
    
    // MARK: - Initialization
    
    /// 初始化播放器实例
    /// - Parameters:
    ///   - src: 视频源地址
    ///   - containerView: 播放器容器视图
    ///   - options: 可选的播放器配置选项
    /// 注意: 必须在主线程调用此初始化方法
    public init(src: String, containerView: UIView, options: UniVideoPlayerOptions? = nil) {
        // 创建配置
        self.configuration = UniVideoPlayerConfiguration(
            loop: options?.loop ?? false,
            src: src,
            poster: options?.poster,
            initialTime: options?.initialTime ?? 0,
            duration: 0,
            autoplay: options?.autoplay ?? false,
            muted: options?.muted ?? false,
            rate: options?.rate ?? 1.0,
            pageGesture: options?.pageGesture ?? true,
            httpCache: options?.httpCache ?? false,
            pip: options?.pip ?? false,
            isDRM: false,
            drmConfiguration: nil
        )
        
        self.containerView = containerView
        self._cachedPlayerView = containerView
        
        super.init()
        
        // 异步在主线程创建播放器管理类
        Task { @MainActor in
            self.setupPlayerManager(in: containerView)
        }
    }
    
    /// 设置播放器管理类（必须在主线程调用）
    @MainActor
    private func setupPlayerManager(in containerView: UIView) {
        self.playerManager = UniVideoPlayerManager(configuration: configuration)
        self.playerManager?.delegate = self
        self.playerManager?.setupPlayerView(in: containerView)
        self._cachedPlayerView = self.playerManager?.playerView ?? containerView
    }
    
    deinit {
        Task { @MainActor [weak playerManager] in
            await playerManager?.cleanup()
        }
    }
    
    // MARK: - Public Methods
    
    /// 准备播放器（异步加载视频资源）
    public func prepare() {
        Task { @MainActor in
            do {
                try await self.playerManager?.prepare()
                self.isPrepared = true
                self.updateCachedTimeInfo()
            } catch {
                self.eventDelegate?.onError(error)
            }
        }
    }
    
    /// 更新视频源
    /// - Parameter src: 新的视频源地址
    public func updateSource(_ src: String) {
        configuration.src = src
        Task { @MainActor in
            do {
                try await self.playerManager?.updateSource(src)
            } catch {
                self.eventDelegate?.onError(error)
            }
        }
    }
    
    // MARK: - UniVideoPlayerProtocol Methods
    
    /// 播放
    public func play() {
        Task { @MainActor in
            do {
                // 如果尚未准备好，先准备
                if !self.isPrepared {
                    try await self.playerManager?.prepare()
                    self.isPrepared = true
                }
                try await self.playerManager?.play()
                self._cachedIsPlaying = true
            } catch {
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
    
    /// 跳转
    public func seek(_ position: TimeInterval) {
        eventDelegate?.onSeeking(time: position)
        Task { @MainActor in
            do {
                try await self.playerManager?.seek(to: position)
                self._cachedCurrentTime = position
                self.eventDelegate?.onSeeked(time: position)
            } catch {
                self.eventDelegate?.onError(error)
            }
        }
    }
    
    /// 停止
    public func stop() {
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
    
    /// 清理资源
    public func destroy() {
        Task { @MainActor in
            await self.playerManager?.cleanup()
            self.playerManager = nil
        }
    }
    
    // MARK: - Private Methods
    
    /// 更新缓存的时间信息
    @MainActor
    private func updateCachedTimeInfo() {
        Task {
            if let timeInfo = await self.playerManager?.getCurrentTimeInfo() {
                self._cachedCurrentTime = timeInfo.currentTime
                self._cachedDuration = timeInfo.duration
            }
        }
    }
}

// MARK: - UniVideoPlayerDelegate
@available(iOS 13.0, *)
extension UniVideoPlayer: UniVideoPlayerDelegate {
    
    /// 状态变化回调（在主线程调用）
    @MainActor
    public func videoPlayer(_ player: UniVideoPlayerManager, didChangeState state: UniVideoPlayerState) {
        // 更新缓存状态
        switch state {
        case .playing:
            _cachedIsPlaying = true
        case .paused, .ended, .idle:
            _cachedIsPlaying = false
        default:
            break
        }
        
        // 转发事件给delegate
        switch state {
        case .idle:
            break
        case .loading:
            eventDelegate?.onWaiting()
        case .ready:
            Task { @MainActor in
                if let timeInfo = await player.getCurrentTimeInfo() {
                    self._cachedDuration = timeInfo.duration
                    self.eventDelegate?.onPrepared(duration: timeInfo.duration)
                }
            }
        case .playing:
            eventDelegate?.onPlay()
        case .paused:
            eventDelegate?.onPause()
        case .ended:
            eventDelegate?.onEnded()
        case .failed(let error):
            eventDelegate?.onError(error)
        }
    }
    
    /// 事件回调（在主线程调用）
    @MainActor
    public func videoPlayer(_ player: UniVideoPlayerManager, didReceiveEvent event: UniVideoPlayerEvent) {
        switch event {
        case .play:
            _cachedIsPlaying = true
            eventDelegate?.onPlay()
        case .pause:
            _cachedIsPlaying = false
            eventDelegate?.onPause()
        case .end:
            _cachedIsPlaying = false
            eventDelegate?.onEnded()
        case .timeUpdate(let currentTime, let duration):
            // 更新缓存的时间信息
            _cachedCurrentTime = currentTime
            _cachedDuration = duration
            eventDelegate?.onTimeUpdate(time: currentTime, duration: duration)
        case .waiting:
            eventDelegate?.onWaiting()
        case .error(let error):
            eventDelegate?.onError(error)
        case .firstFrameCaptured:
            break
        case .videoReadyForDisplay:
            break
        case .bufferUpdate:
            break
        }
    }
}

// MARK: - 播放器选项配置
public struct UniVideoPlayerOptions {
    /// 是否循环播放
    public var loop: Bool?
    
    /// 初始播放位置（秒）
    public var initialTime: TimeInterval?
    
    /// 是否自动播放
    public var autoplay: Bool?
    
    /// 是否静音
    public var muted: Bool?
    
    /// 播放速率
    public var rate: Double?
    
    /// 是否启用手势控制
    public var pageGesture: Bool?
    
    /// 是否启用缓存
    public var httpCache: Bool?
    
    /// 是否启用画中画
    public var pip: Bool?
    
    /// poster
    public var poster: String?
    
    public var objectFit: String?
    
    public init(
        loop: Bool? = false,
        initialTime: TimeInterval? = 0,
        autoplay: Bool? = false,
        muted: Bool? = false,
        rate: Double? = 1.0,
        pageGesture: Bool? = true,
        httpCache: Bool? = false,
        pip: Bool? = false,
        poster: String? = "",
        objectFit: String? = "contain"
    ) {
        self.loop = loop
        self.initialTime = initialTime
        self.autoplay = autoplay
        self.muted = muted
        self.rate = rate
        self.pageGesture = pageGesture
        self.httpCache = httpCache
        self.pip = pip
        self.poster = poster
        self.objectFit = objectFit
    }
}

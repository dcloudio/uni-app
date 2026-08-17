//
//  UniVideoPlayerActor.swift
//  UniVideoPlayer
//
//  Created by Fred on 3/12/25.
//
//  架构说明:
//  =========
//  本 Actor 采用 AsyncStream 进行状态通知，完全符合 Swift Concurrency 规范
//
//  通信模式:
//  - Manager 通过 await 调用 Actor 方法（请求-响应）
//  - Actor 通过 AsyncStream 推送状态变化（发布-订阅）
//  - 所有跨隔离域通信都是类型安全的
//
//  线程安全保证:
//  - Actor 内部状态由 Actor 隔离保护
//  - AsyncStream 的 continuation 是线程安全的
//  - 不使用 nonisolated(unsafe)，完全依赖编译器检查

import Foundation
import AVFoundation

// MARK: - 决策结果类型
@available(iOS 13.0, *)
public enum PlayDecision: Sendable {
    case allow
    case needsPrepare
    case deny(reason: String)
}

@available(iOS 13.0, *)
public enum SeekDecision: Sendable {
    case allow(clampedTime: TimeInterval)
    case deny(reason: String)
}

// MARK: - 状态变化事件

/// 状态变化通知 - 用于跨隔离域传递
@available(iOS 13.0, *)
public enum StateChange: Sendable {
    case idle
    case loading
    case ready
    case playing
    case paused
    case ended
    case failed(errorMessage: String)
    
    /// 从 UniVideoPlayerState 创建（在 Actor 内部调用）
    init(from state: UniVideoPlayerState) {
        switch state {
        case .idle: self = .idle
        case .loading: self = .loading
        case .ready: self = .ready
        case .playing: self = .playing
        case .paused: self = .paused
        case .ended: self = .ended
        case .failed(let error): self = .failed(errorMessage: error.localizedDescription)
        }
    }
    
    /// 转换为 UniVideoPlayerState（在 MainActor 调用）
    public func toState() -> UniVideoPlayerState {
        switch self {
        case .idle: return .idle
        case .loading: return .loading
        case .ready: return .ready
        case .playing: return .playing
        case .paused: return .paused
        case .ended: return .ended
        case .failed(let message):
            let error = NSError(domain: "UniVideoPlayer", code: -1,
                                userInfo: [NSLocalizedDescriptionKey: message])
            return .failed(error)
        }
    }
}

// MARK: - UniVideoPlayerActor

/// 核心播放器状态 Actor - 线程安全的纯状态管理
///
/// 设计原则:
/// 1. 只管理状态和配置，不持有 AVPlayer
/// 2. 提供决策方法，由 Manager 执行实际操作
/// 3. 使用 AsyncStream 进行状态通知，完全类型安全
@available(iOS 13.0, *)
public actor UniVideoPlayerActor {
    
    // MARK: - 状态属性 (Actor 隔离保护)
    
    /// 当前播放器状态
    private var state: UniVideoPlayerState = .idle
    
    /// 播放器配置
    private var configuration: UniVideoPlayerConfiguration
    
    /// 缓存的时间信息
    private var cachedTimeInfo: VideoTimeInfo?
    
    /// 是否已准备完成
    private var isPrepared: Bool = false
    
    // MARK: - 状态流 (AsyncStream)
    
    /// 状态变化流的 continuation
    private var stateStreamContinuation: AsyncStream<StateChange>.Continuation?
    
    /// 状态变化流 - Manager 订阅此流接收状态更新
    public private(set) var stateStream: AsyncStream<StateChange>!
    
    // MARK: - 初始化
    
    public init(configuration: UniVideoPlayerConfiguration) {
        self.configuration = configuration
        
        // 创建 AsyncStream
        // 注意：必须在 init 中同步完成，不能用 async
        let (stream, continuation) = AsyncStream<StateChange>.makeStream(bufferingPolicy: .bufferingNewest(1))
        self.stateStream = stream
        self.stateStreamContinuation = continuation
    }
    
    deinit {
        stateStreamContinuation?.finish()
    }
    
    // MARK: - 状态查询
    public func getState() -> UniVideoPlayerState {
        return state
    }
    
    public func getConfiguration() -> UniVideoPlayerConfiguration {
        return configuration
    }
    
    public func getCurrentTimeInfo() -> VideoTimeInfo? {
        return cachedTimeInfo
    }
    
    public func getIsPrepared() -> Bool {
        return isPrepared
    }
    
    public func isPlaying() -> Bool {
        return state == .playing
    }
    
    public func isPlayable() -> Bool {
        switch state {
        case .ready, .paused, .playing:
            return true
        default:
            return false
        }
    }
    
    // MARK: - 决策方法
    public func decidePlay() -> PlayDecision {
        switch state {
        case .idle:
            return .needsPrepare
        case .loading:
            return .deny(reason: "正在加载中")
        case .ready, .paused, .ended:
            return .allow
        case .playing:
            return .deny(reason: "已经在播放")
        case .failed(let error):
            return .deny(reason: "播放失败: \(error.localizedDescription)")
        }
    }
    
    public func decidePause() -> Bool {
        return state == .playing
    }
    
    public func decideSeek(to time: TimeInterval) -> SeekDecision {
        guard isPrepared else {
            return .deny(reason: "播放器未准备完成")
        }
        guard let timeInfo = cachedTimeInfo, timeInfo.duration > 0 else {
            return .deny(reason: "无法获取视频时长")
        }
        let clampedTime = max(0, min(time, timeInfo.duration))
        return .allow(clampedTime: clampedTime)
    }
    
    public func shouldAutoplay() -> Bool {
        return configuration.autoplay && state == .ready
    }
    
    public func shouldLoop() -> Bool {
        return configuration.loop
    }
    
    /// 状态转换 - 统一的状态更新方法
    @discardableResult
    public func transition(to newState: UniVideoPlayerState, options: TransitionOptions = []) -> Bool {
        if options.contains(.resetPrepared) {
            isPrepared = false
            cachedTimeInfo = nil
        }
        if options.contains(.markPrepared) {
            isPrepared = true
        }
        
        // 状态更新
        let shouldNotify = state != newState
        state = newState
        
        // 通过 AsyncStream 发送状态变化
        if shouldNotify {
            let change = StateChange(from: newState)
            stateStreamContinuation?.yield(change)
        }
        
        return shouldNotify
    }
    
    @discardableResult
    public func reset() -> Bool {
        return transition(to: .idle, options: .resetPrepared)
    }
    
    public func updateSource(_ src: String) {
        configuration.src = src
        isPrepared = false
        cachedTimeInfo = nil
    }
    
    public func updateMuted(_ muted: Bool) {
        configuration.muted = muted
    }
    
    public func updateLoop(_ loop: Bool) {
        configuration.loop = loop
    }
    
    public func updateAutoplay(_ autoplay: Bool) {
        configuration.autoplay = autoplay
    }
    
    public func updateHttpCache(_ enabled: Bool) {
        configuration.httpCache = enabled
    }
    
    public func updateTimeInfo(_ timeInfo: VideoTimeInfo) {
        cachedTimeInfo = timeInfo
    }
}


@available(iOS 13.0, *)
public struct TransitionOptions: OptionSet, Sendable {
    public let rawValue: Int
    
    public init(rawValue: Int) {
        self.rawValue = rawValue
    }
    
    public static let resetPrepared = TransitionOptions(rawValue: 1 << 0)
    public static let markPrepared = TransitionOptions(rawValue: 1 << 1)
}


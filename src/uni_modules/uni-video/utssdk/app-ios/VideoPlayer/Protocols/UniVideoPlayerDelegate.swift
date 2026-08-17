//
//  UniVideoPlayerDelegate.swift
//  UniVideoPlayer
//
//  Created by Fred on 3/12/25.
//

import Foundation

/// UniVideoPlayerDelegate - 播放器管理类代理协议
@available(iOS 13.0, *)
public protocol UniVideoPlayerDelegate: AnyObject {
    /// 播放器状态变化回调
    /// - Parameters:
    ///   - player: 播放器管理类实例
    ///   - state: 新的播放状态
    /// - Note: 此方法在主线程调用
    @MainActor
    func videoPlayer(_ player: UniVideoPlayerManager, didChangeState state: UniVideoPlayerState)

    /// 播放器事件回调
    /// - Parameters:
    ///   - player: 播放器管理类实例
    ///   - event: 播放器事件
    /// - Note: 此方法在主线程调用
    @MainActor
    func videoPlayer(_ player: UniVideoPlayerManager, didReceiveEvent event: UniVideoPlayerEvent)
}

/// UniVideoPlayerDelegate默认实现（空实现，子类可选择性重写）
@available(iOS 13.0, *)
public extension UniVideoPlayerDelegate {
    @MainActor
    func videoPlayer(_ player: UniVideoPlayerManager, didChangeState state: UniVideoPlayerState) {}
    @MainActor
    func videoPlayer(_ player: UniVideoPlayerManager, didReceiveEvent event: UniVideoPlayerEvent) {}
}

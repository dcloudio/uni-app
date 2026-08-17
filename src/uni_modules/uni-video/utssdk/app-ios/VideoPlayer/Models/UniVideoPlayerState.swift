//
//  UniVideoPlayerState.swift
//  UniVideoPlayer
//
//  Created by Fred on 3/12/25.
//

import Foundation
import AVFoundation

/// 播放器状态
public enum UniVideoPlayerState: Equatable {
    case idle
    case loading
    case ready
    case playing
    case paused
    case ended
    case failed(Error)

    public static func == (lhs: UniVideoPlayerState, rhs: UniVideoPlayerState) -> Bool {
        switch (lhs, rhs) {
        case (.idle, .idle),
             (.loading, .loading),
             (.ready, .ready),
             (.playing, .playing),
             (.paused, .paused),
             (.ended, .ended):
            return true
        case (.failed(let lhsError), .failed(let rhsError)):
            return lhsError.localizedDescription == rhsError.localizedDescription
        default:
            return false
        }
    }
}

/// 视频源类型
public enum VideoSourceType {
    case video      // 普通视频
    case live       // 直播
    case drm        // DRM加密视频
}

/// 播放器错误
public enum UniVideoPlayerError: Error {
    case invalidURL
    case loadFailed(String)
    case drmFailed(String)
    case networkError(String)
    case unsupportedFormat
    case pipNotAvailable
    case cacheError(String)
    case unknown(Error)

    public var localizedDescription: String {
        switch self {
        case .invalidURL:
            return "Invalid video URL"
        case .loadFailed(let message):
            return "Load failed: \(message)"
        case .drmFailed(let message):
            return "DRM failed: \(message)"
        case .networkError(let message):
            return "Network error: \(message)"
        case .unsupportedFormat:
            return "Unsupported video format"
        case .pipNotAvailable:
            return "Picture in Picture not available"
        case .cacheError(let message):
            return "Cache error: \(message)"
        case .unknown(let error):
            return "Unknown error: \(error.localizedDescription)"
        }
    }
}

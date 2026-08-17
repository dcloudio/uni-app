//
//  UniVideoPlayerEvent.swift
//  UniVideoPlayer
//
//  Created by Fred on 3/12/25.
//

import Foundation
import UIKit

/// 播放器事件
public enum UniVideoPlayerEvent {
    case play
    case pause
    case end
    case timeUpdate(currentTime: TimeInterval, duration: TimeInterval)
    case waiting
    case error(UniVideoPlayerError)
    case firstFrameCaptured(UIImage)
    case videoReadyForDisplay
    case bufferUpdate(start: TimeInterval, end: TimeInterval)
}

/// 播放器时间信息
public struct VideoTimeInfo {
    public let currentTime: TimeInterval
    public let duration: TimeInterval
    public let bufferedTime: TimeInterval

    public var progress: Double {
        guard duration > 0 else { return 0 }
        return currentTime / duration
    }

    public var bufferProgress: Double {
        guard duration > 0 else { return 0 }
        return bufferedTime / duration
    }
}

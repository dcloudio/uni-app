//
//  UniVideoPlayerConfiguration.swift
//  UniVideoPlayer
//
//  Created by Fred on 3/12/25.
//

import Foundation
import AVFoundation
import UIKit

/// 视频填充模式
@available(iOS 13.0, *)
public enum VideoObjectFit: String, Sendable {
    /// 包含 - 保持宽高比，完整显示视频内容（可能有黑边）
    case contain

    /// 填充 - 拉伸填满容器（可能变形）
    case fill

    /// 覆盖 - 保持宽高比，裁剪超出部分（无黑边）
    case cover

    /// 转换为 AVLayerVideoGravity, 作用于avplayer
    public var videoGravity: AVLayerVideoGravity {
        switch self {
        case .contain:
            return .resizeAspect
        case .fill:
            return .resize
        case .cover:
            return .resizeAspectFill
        }
    }

    /// 转换为 UIView.ContentMode， 作用于poster
    public var contentMode: UIView.ContentMode {
        switch self {
        case .contain:
            return .scaleAspectFit
        case .fill:
            return .scaleToFill
        case .cover:
            return .scaleAspectFill
        }
    }

    public init?(stringValue: String) {
        self.init(rawValue: stringValue)
    }
}

/// 视频播放器配置
public struct UniVideoPlayerConfiguration {

    /// 是否循环播放
    public var loop: Bool

    /// 视频资源地址
    public var src: String
    
    /// poster
    public var poster: String?

    /// 指定视频初始播放位置（秒）
    public var initialTime: TimeInterval

    /// 指定视频长度（秒，0表示使用实际长度）
    public var duration: TimeInterval

    /// 是否自动播放
    public var autoplay: Bool

    /// 是否静音播放
    public var muted: Bool

    /// 播放速率
    public var rate: Double

    /// 视频填充模式
    public var objectFit: VideoObjectFit

    /// 是否开启亮度与音量调节手势
    public var pageGesture: Bool

    /// 是否对 http、https 视频源开启本地缓存
    public var httpCache: Bool

    /// 是否开启画中画
    public var pip: Bool

    /// 是否为 DRM 视频源
    public var isDRM: Bool

    /// DRM 相关配置
    public var drmConfiguration: DRMConfiguration?

    public init(
        loop: Bool = false,
        src: String,
        poster: String?,
        initialTime: TimeInterval = 0,
        duration: TimeInterval = 0,
        autoplay: Bool = false,
        muted: Bool = false,
        rate: Double = 1.0,
        objectFit: VideoObjectFit = .contain,
        pageGesture: Bool = true,
        httpCache: Bool = false,
        pip: Bool = false,
        isDRM: Bool = false,
        drmConfiguration: DRMConfiguration? = nil
    ) {
        self.loop = loop
        self.src = src
        self.poster = poster
        self.initialTime = initialTime
        self.duration = duration
        self.autoplay = autoplay
        self.muted = muted
        self.rate = rate
        self.objectFit = objectFit
        self.pageGesture = pageGesture
        self.httpCache = httpCache
        self.pip = pip
        self.isDRM = isDRM
        self.drmConfiguration = drmConfiguration
    }
}

/// DRM 配置
public struct DRMConfiguration {
    public let certificateURL: URL?
    public let licenseURL: URL?
    public let headers: [String: String]?

    public init(certificateURL: URL?, licenseURL: URL?, headers: [String: String]? = nil) {
        self.certificateURL = certificateURL
        self.licenseURL = licenseURL
        self.headers = headers
    }
}

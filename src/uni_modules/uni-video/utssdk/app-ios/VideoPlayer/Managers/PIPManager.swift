//
//  PIPManager.swift
//  UniVideoPlayer
//
//  Created by Fred on 3/12/25.
//

import Foundation
import AVKit
import DCloudUniappRuntime

/// 画中画管理器
@available(iOS 13.0, *)
@MainActor
class PIPManager: NSObject {

    // MARK: - Properties
    private var pipController: AVPictureInPictureController?
    private weak var playerLayer: AVPlayerLayer?
    private var isEnabled: Bool = false

    var isPIPActive: Bool {
        return pipController?.isPictureInPictureActive ?? false
    }

    var isPIPSupported: Bool {
        return AVPictureInPictureController.isPictureInPictureSupported()
    }

    var onPIPWillStart: (() -> Void)?
    var onPIPDidStart: (() -> Void)?
    var onPIPWillStop: (() -> Void)?
    var onPIPDidStop: (() -> Void)?
    var onPIPError: ((Error) -> Void)?

    // MARK: - Initialization
    override init() {
        super.init()
    }

    // MARK: - Public Methods

    /// 配置画中画
    func setup(with playerLayer: AVPlayerLayer) throws {
        guard isPIPSupported else {
            throw UniVideoPlayerError.pipNotAvailable
        }

        self.playerLayer = playerLayer

        // 创建 PIP 控制器
        if let controller = AVPictureInPictureController(playerLayer: playerLayer) {
            controller.delegate = self
            self.pipController = controller
            UNILogDebug("[PIPManager] PIP controller created successfully")
        } else {
            throw UniVideoPlayerError.pipNotAvailable
        }
    }

    /// 启用/禁用画中画
    func setEnabled(_ enabled: Bool) {
        isEnabled = enabled
        UNILogDebug("[PIPManager] PIP enabled: \(enabled)")
    }

    /// 开始画中画
    func startPIP() throws {
        guard isEnabled else {
            UNILogDebug("[PIPManager] PIP is not enabled")
            return
        }

        guard isPIPSupported else {
            throw UniVideoPlayerError.pipNotAvailable
        }

        guard let controller = pipController, !controller.isPictureInPictureActive else {
            UNILogDebug("[PIPManager] PIP already active or controller not available")
            return
        }

        if #available(iOS 14.2, *) {
            controller.canStartPictureInPictureAutomaticallyFromInline = true
        }

        controller.startPictureInPicture()
        UNILogDebug("[PIPManager] Starting PIP")
    }

    /// 停止画中画
    func stopPIP() {
        guard let controller = pipController, controller.isPictureInPictureActive else {
            UNILogDebug("[PIPManager] PIP not active")
            return
        }

        controller.stopPictureInPicture()
        UNILogDebug("[PIPManager] Stopping PIP")
    }

    /// 清理资源
    func cleanup() {
        stopPIP()
        pipController?.delegate = nil
        pipController = nil
        playerLayer = nil
        UNILogDebug("[PIPManager] Cleaned up")
    }
}

// MARK: - AVPictureInPictureControllerDelegate
@available(iOS 13.0, *)
extension PIPManager: AVPictureInPictureControllerDelegate {

    func pictureInPictureControllerWillStartPictureInPicture(_ pictureInPictureController: AVPictureInPictureController) {
        UNILogDebug("[PIPManager] Will start PIP")
        onPIPWillStart?()
    }

    func pictureInPictureControllerDidStartPictureInPicture(_ pictureInPictureController: AVPictureInPictureController) {
        UNILogDebug("[PIPManager] Did start PIP")
        onPIPDidStart?()
    }

    func pictureInPictureControllerWillStopPictureInPicture(_ pictureInPictureController: AVPictureInPictureController) {
        UNILogDebug("[PIPManager] Will stop PIP")
        onPIPWillStop?()
    }

    func pictureInPictureControllerDidStopPictureInPicture(_ pictureInPictureController: AVPictureInPictureController) {
        UNILogDebug("[PIPManager] Did stop PIP")
        onPIPDidStop?()
    }

    func pictureInPictureController(_ pictureInPictureController: AVPictureInPictureController,
                                   failedToStartPictureInPictureWithError error: Error) {
        UNILogDebug("[PIPManager] Failed to start PIP: \(error)")
        onPIPError?(error)
    }

    func pictureInPictureController(_ pictureInPictureController: AVPictureInPictureController,
                                   restoreUserInterfaceForPictureInPictureStopWithCompletionHandler completionHandler: @escaping (Bool) -> Void) {
        UNILogDebug("[PIPManager] Restore user interface")
        completionHandler(true)
    }
}

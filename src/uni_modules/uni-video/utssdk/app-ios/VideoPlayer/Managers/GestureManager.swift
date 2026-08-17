//
//  GestureManager.swift
//  UniVideoPlayer
//
//  Created by Fred on 3/12/25.
//

import UIKit
import AVFoundation
import DCloudUniappRuntime

/// 手势管理器 - 控制亮度和音量
@available(iOS 13.0, *)
@MainActor
class GestureManager: NSObject {

    // MARK: - Properties
    private weak var view: UIView?
    private var panGesture: UIPanGestureRecognizer?
    private var isEnabled: Bool = false

    private var initialBrightness: CGFloat = 0
    private var initialVolume: Float = 0
    private var isAdjustingVolume: Bool = false

    // MARK: - Callbacks
    var onVolumeChanged: ((Float) -> Void)?
    var onBrightnessChanged: ((CGFloat) -> Void)?

    // MARK: - Initialization
    override init() {
        super.init()
    }

    // MARK: - Public Methods

    /// 配置手势
    func setup(on view: UIView) {
        self.view = view

        let pan = UIPanGestureRecognizer(target: self, action: #selector(handlePanGesture(_:)))
        pan.delegate = self
        view.addGestureRecognizer(pan)
        self.panGesture = pan

        UNILogDebug("[GestureManager] Gesture setup completed")
    }

    /// 启用/禁用手势
    func setEnabled(_ enabled: Bool) {
        isEnabled = enabled
        panGesture?.isEnabled = enabled
        UNILogDebug("[GestureManager] Gesture enabled: \(enabled)")
    }

    /// 清理资源
    func cleanup() {
        if let gesture = panGesture, let view = view {
            view.removeGestureRecognizer(gesture)
        }
        panGesture = nil
        view = nil
        UNILogDebug("[GestureManager] Cleaned up")
    }

    // MARK: - Private Methods

    @objc private func handlePanGesture(_ gesture: UIPanGestureRecognizer) {
        guard isEnabled, let view = view else { return }

        let translation = gesture.translation(in: view)
        let location = gesture.location(in: view)

        switch gesture.state {
        case .began:
            let viewWidth = view.bounds.width
            isAdjustingVolume = location.x > viewWidth / 2

            if isAdjustingVolume {
                initialVolume = getCurrentVolume()
            } else {
                initialBrightness = UIScreen.main.brightness
            }

            UNILogDebug("[GestureManager] Gesture began - adjusting: \(isAdjustingVolume ? "Volume" : "Brightness")")

        case .changed:
            let sensitivity: CGFloat = 0.01
            let delta = -translation.y * sensitivity // 负号使向上滑动增加值

            if isAdjustingVolume {
                adjustVolume(delta: Float(delta))
            } else {
                adjustBrightness(delta: delta)
            }

            // 重置translation以便计算增量
            gesture.setTranslation(.zero, in: view)

        case .ended, .cancelled:
            UNILogDebug("[GestureManager] Gesture ended")

        default:
            break
        }
    }

    private func adjustVolume(delta: Float) {
        var newVolume = getCurrentVolume() + delta
        newVolume = max(0.0, min(1.0, newVolume)) // 限制在0-1范围

        setVolume(newVolume)
        onVolumeChanged?(newVolume)
    }

    private func adjustBrightness(delta: CGFloat) {
        var newBrightness = UIScreen.main.brightness + delta
        newBrightness = max(0.0, min(1.0, newBrightness)) // 限制在0-1范围

        UIScreen.main.brightness = newBrightness
        onBrightnessChanged?(newBrightness)
    }

    private func getCurrentVolume() -> Float {
        // 通过 AVAudioSession 获取系统音量
        return AVAudioSession.sharedInstance().outputVolume
    }

    private func setVolume(_ volume: Float) {
        UNILogDebug("[GestureManager] Volume adjusted to: \(volume)")
    }
}

// MARK: - UIGestureRecognizerDelegate
@available(iOS 13.0, *)
extension GestureManager: UIGestureRecognizerDelegate {

    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer,
                          shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        // 允许与其他手势同时识别
        return false
    }

    func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
        // 只在垂直方向的滑动时触发
        if let pan = gestureRecognizer as? UIPanGestureRecognizer {
            let velocity = pan.velocity(in: pan.view)
            return abs(velocity.y) > abs(velocity.x)
        }
        return true
    }
}

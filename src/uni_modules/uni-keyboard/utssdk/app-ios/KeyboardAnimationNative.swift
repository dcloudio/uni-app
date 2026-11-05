import Foundation
import QuartzCore
import UIKit

/// Bridges UIKit keyboard frame animations to a display-synchronized height callback.
/// Public listener fan-out is handled by the UTS layer; this class owns one native listener.
public final class KeyboardAnimationNative: NSObject {
    public static let shared = KeyboardAnimationNative()

    private var callback: ((NSNumber, String) -> Void)?
    private var keyboardObserver: NSObjectProtocol?
    private var displayLink: CADisplayLink?
    private weak var probeWindow: UIWindow?
    private var probeView: UIView?
    private var animationVersion = 0
    private var lastHeight: CGFloat = 0
    private var lastRunningHeight: CGFloat = -1
    private var targetHeight: CGFloat = 0
    private var animating = false

    private override init() {
        super.init()
    }

    public func start(_ callback: @escaping (NSNumber, String) -> Void) {
        runOnMain { [weak self] in
            guard let self = self else { return }
            self.stopLocked()
            self.callback = callback
            self.keyboardObserver = NotificationCenter.default.addObserver(
                forName: UIResponder.keyboardWillChangeFrameNotification,
                object: nil,
                queue: .main
            ) { [weak self] notification in
                self?.handleKeyboardFrameChange(notification)
            }
        }
    }

    public func stop() {
        runOnMain { [weak self] in
            self?.stopLocked()
        }
    }

    private func runOnMain(_ action: @escaping () -> Void) {
        if Thread.isMainThread {
            action()
        } else {
            DispatchQueue.main.async(execute: action)
        }
    }

    private func stopLocked() {
        animationVersion += 1
        animating = false
        stopDisplayLink()
        if let observer = keyboardObserver {
            NotificationCenter.default.removeObserver(observer)
            keyboardObserver = nil
        }
        probeView?.layer.removeAllAnimations()
        probeView?.removeFromSuperview()
        probeView = nil
        probeWindow = nil
        callback = nil
        lastHeight = 0
        lastRunningHeight = -1
        targetHeight = 0
    }

    private func handleKeyboardFrameChange(_ notification: Notification) {
        guard callback != nil,
              let userInfo = notification.userInfo,
              let beginValue = userInfo[UIResponder.keyboardFrameBeginUserInfoKey] as? NSValue,
              let endValue = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue,
              let window = activeWindow(for: notification.object as? UIScreen) else {
            return
        }

        let beginHeight = visibleKeyboardHeight(for: beginValue.cgRectValue, notification: notification, window: window)
        let endHeight = visibleKeyboardHeight(for: endValue.cgRectValue, notification: notification, window: window)
        let duration = max(0, (userInfo[UIResponder.keyboardAnimationDurationUserInfoKey] as? NSNumber)?.doubleValue ?? 0)
        let curve = max(0, (userInfo[UIResponder.keyboardAnimationCurveUserInfoKey] as? NSNumber)?.intValue ?? UIView.AnimationCurve.easeInOut.rawValue)

        let startHeight = animating ? currentPresentationHeight() : beginHeight
        beginAnimation(from: startHeight, to: endHeight, duration: duration, curve: curve, window: window)
    }

    private func beginAnimation(
        from startHeight: CGFloat,
        to endHeight: CGFloat,
        duration: TimeInterval,
        curve: Int,
        window: UIWindow
    ) {
        animationVersion += 1
        let version = animationVersion
        animating = false
        stopDisplayLink()

        let probe = prepareProbe(in: window)
        probe.layer.removeAllAnimations()
        UIView.performWithoutAnimation {
            var frame = probe.frame
            frame.origin.y = startHeight
            probe.frame = frame
        }

        lastHeight = startHeight
        lastRunningHeight = startHeight
        targetHeight = endHeight
        emit(height: startHeight, state: "start")

        // A callback can synchronously unsubscribe or replace the native listener.
        guard callback != nil, animationVersion == version else { return }

        if duration <= 0 || abs(endHeight - startHeight) < 0.01 {
            UIView.performWithoutAnimation {
                var frame = probe.frame
                frame.origin.y = endHeight
                probe.frame = frame
            }
            finishAnimation(version: version)
            return
        }

        animating = true
        let link = CADisplayLink(target: self, selector: #selector(handleDisplayLink(_:)))
        displayLink = link
        link.add(to: .main, forMode: .common)

        var options = UIView.AnimationOptions(rawValue: UInt(curve) << 16)
        options.insert(.beginFromCurrentState)
        options.insert(.allowUserInteraction)
        UIView.animate(
            withDuration: duration,
            delay: 0,
            options: options,
            animations: {
                var frame = probe.frame
                frame.origin.y = endHeight
                probe.frame = frame
            },
            completion: { [weak self] finished in
                guard finished else { return }
                self?.finishAnimation(version: version)
            }
        )
    }

    @objc private func handleDisplayLink(_ link: CADisplayLink) {
        guard link === displayLink, animating, callback != nil else { return }
        let height = currentPresentationHeight()
        guard abs(height - lastRunningHeight) >= 0.01 else { return }
        lastRunningHeight = height
        lastHeight = height
        emit(height: height, state: "running")
    }

    private func finishAnimation(version: Int) {
        guard version == animationVersion, callback != nil else { return }
        animating = false
        stopDisplayLink()
        lastHeight = targetHeight
        lastRunningHeight = targetHeight
        emit(height: targetHeight, state: "end")
    }

    private func emit(height: CGFloat, state: String) {
        callback?(NSNumber(value: Double(max(0, height))), state)
    }

    private func stopDisplayLink() {
        displayLink?.invalidate()
        displayLink = nil
    }

    private func prepareProbe(in window: UIWindow) -> UIView {
        if let probe = probeView, probeWindow === window {
            return probe
        }
        probeView?.layer.removeAllAnimations()
        probeView?.removeFromSuperview()
        let probe = UIView(frame: CGRect(x: -2, y: lastHeight, width: 1, height: 1))
        probe.isUserInteractionEnabled = false
        probe.alpha = 0
        window.addSubview(probe)
        probeView = probe
        probeWindow = window
        return probe
    }

    private func currentPresentationHeight() -> CGFloat {
        if let presentation = probeView?.layer.presentation() {
            return max(0, presentation.frame.origin.y)
        }
        return max(0, probeView?.frame.origin.y ?? lastHeight)
    }

    private func visibleKeyboardHeight(
        for screenFrame: CGRect,
        notification: Notification,
        window: UIWindow
    ) -> CGFloat {
        let sourceCoordinateSpace = (notification.object as? UIScreen)?.coordinateSpace
            ?? window.screen.coordinateSpace
        let frame = sourceCoordinateSpace.convert(screenFrame, to: window)
        let intersection = window.bounds.intersection(frame)
        if intersection.isNull || intersection.isEmpty {
            return 0
        }
        return max(0, min(window.bounds.height, intersection.height))
    }

    private func activeWindow(for screen: UIScreen?) -> UIWindow? {
        if #available(iOS 13.0, *) {
            let scenes = UIApplication.shared.connectedScenes
                .compactMap { $0 as? UIWindowScene }
                .filter { scene in
                    guard scene.activationState == .foregroundActive || scene.activationState == .foregroundInactive else {
                        return false
                    }
                    return screen == nil || scene.screen === screen
                }

            for scene in scenes {
                if let window = scene.windows.first(where: { $0.isKeyWindow }) {
                    return window
                }
            }
            for scene in scenes {
                if let window = scene.windows.first(where: { !$0.isHidden }) {
                    return window
                }
            }
            return nil
        }
        return UIApplication.shared.keyWindow
            ?? UIApplication.shared.windows.first(where: { !$0.isHidden })
    }
}

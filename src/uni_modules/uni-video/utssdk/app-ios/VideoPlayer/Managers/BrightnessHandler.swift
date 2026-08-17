//
//  BrightnessHandler.swift
//  UniVideoPlayer
//
//  Created by Fred on 2026/03/23.
//


import UIKit

typealias BrightnessChangeCallback = (CGFloat) -> Void

final class BrightnessHandler: NSObject {

    private let changeThreshold: CGFloat = 0.0001

    private var brightnessObserver: NSObjectProtocol?
    private var brightnessChangeCallback: BrightnessChangeCallback?

    private(set) var currentBrightness: CGFloat
    private(set) var initialBrightness: CGFloat

    private var pendingProgrammaticBrightness: CGFloat?

    override init() {
        let brightness = BrightnessHandler.readCurrentBrightness()
        self.currentBrightness = brightness
        self.initialBrightness = brightness
        super.init()
    }

    func startObserving(callback: @escaping BrightnessChangeCallback) {
        executeOnMain {
            self.stopObservingLocked()
            self.brightnessChangeCallback = callback
            let brightness = UIScreen.main.brightness
            self.initialBrightness = brightness
            self.currentBrightness = brightness

            self.brightnessObserver = NotificationCenter.default.addObserver(
                forName: UIScreen.brightnessDidChangeNotification,
                object: UIScreen.main,
                queue: .main
            ) { [weak self] _ in
                self?.brightnessDidChange()
            }
        }
    }

    func stopObserving() {
        executeOnMain {
            self.stopObservingLocked()
        }
    }

    func getCurrentBrightness() -> CGFloat {
        return executeOnMain {
            let brightness = UIScreen.main.brightness
            self.currentBrightness = brightness
            return brightness
        }
    }

    func setBrightness(_ value: CGFloat) {
        executeOnMain {
            self.setBrightnessLocked(value)
        }
    }

    func restoreBrightness() {
        executeOnMain {
            self.setBrightnessLocked(self.initialBrightness)
        }
    }

    deinit {
        stopObservingLocked()
    }

    private func brightnessDidChange() {
        let brightness = UIScreen.main.brightness

        if let pendingProgrammaticBrightness,
           abs(brightness - pendingProgrammaticBrightness) < changeThreshold {
            self.pendingProgrammaticBrightness = nil
            currentBrightness = brightness
            return
        }

        pendingProgrammaticBrightness = nil

        guard abs(brightness - currentBrightness) >= changeThreshold else {
            return
        }

        currentBrightness = brightness
        brightnessChangeCallback?(brightness)
    }

    private func stopObservingLocked() {
        if let observer = brightnessObserver {
            NotificationCenter.default.removeObserver(observer)
            brightnessObserver = nil
        }
        brightnessChangeCallback = nil
        pendingProgrammaticBrightness = nil
    }

    private func setBrightnessLocked(_ value: CGFloat) {
        let brightness = max(0.0, min(1.0, value))
        let screenBrightness = UIScreen.main.brightness

        guard abs(brightness - screenBrightness) >= changeThreshold else {
            pendingProgrammaticBrightness = nil
            self.currentBrightness = screenBrightness
            return
        }

        pendingProgrammaticBrightness = brightness
        UIScreen.main.brightness = brightness
        self.currentBrightness = brightness
    }

    private static func readCurrentBrightness() -> CGFloat {
        if Thread.isMainThread {
            return UIScreen.main.brightness
        }

        var brightness: CGFloat = 0.0
        DispatchQueue.main.sync {
            brightness = UIScreen.main.brightness
        }
        return brightness
    }

    private func executeOnMain(_ block: @escaping () -> Void) {
        if Thread.isMainThread {
            block()
        } else {
            DispatchQueue.main.sync(execute: block)
        }
    }

    private func executeOnMain<T>(_ block: () -> T) -> T {
        if Thread.isMainThread {
            return block()
        } else {
            return DispatchQueue.main.sync(execute: block)
        }
    }
}

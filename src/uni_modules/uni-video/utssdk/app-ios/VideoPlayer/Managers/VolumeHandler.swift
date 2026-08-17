//
//  VolumeHandler.swift
//  UniVideoPlayer
//
//  Created by Fred on 2026/03/18.
//

import Foundation
import AVFoundation

/// 系统音量变化回调
typealias VolumeChangeCallback = (Float) -> Void

/// 现代化的音量监听处理器
/// 使用AVAudioSession.outputVolume KVO观察，替代私有API AVSystemController_SystemVolumeDidChangeNotification
final class VolumeHandler: NSObject {
    
    // MARK: - Properties
    
    /// 音频会话
    private let audioSession = AVAudioSession.sharedInstance()
    
    /// 音量观察者
    private var volumeObservation: NSKeyValueObservation?
    
    /// 音量变化回调
    private var volumeChangeCallback: VolumeChangeCallback?
    
    /// 当前音量值
    private(set) var currentVolume: Float = 0.0
    
    // MARK: - Initialization
    
    override init() {
        super.init()
        currentVolume = audioSession.outputVolume
    }
    
    // MARK: - Public Methods
    
    /// 开始监听系统音量变化
    /// - Parameter callback: 音量变化回调
    func startObserving(callback: @escaping VolumeChangeCallback) {
        stopObserving()

        volumeChangeCallback = callback
        currentVolume = audioSession.outputVolume
        setupVolumeObservation()
    }
    
    /// 停止监听音量变化
    func stopObserving() {
        volumeObservation?.invalidate()
        volumeObservation = nil
        volumeChangeCallback = nil
    }
    
    /// 获取当前系统音量
    /// - Returns: 当前音量值 (0.0 - 1.0)
    func getCurrentVolume() -> Float {
        let volume = audioSession.outputVolume
        currentVolume = volume
        return volume
    }
    
    // MARK: - Private Methods
    
    /// 设置音量观察
    private func setupVolumeObservation() {
        do {
            // 激活音频会话以便监听音量变化，停止监听时不由本类停用全局会话。
            try audioSession.setActive(true)
            
            // 使用KVO观察outputVolume属性
            volumeObservation = audioSession.observe(\.outputVolume, options: [.new]) { [weak self] _, change in
                guard let self = self else { return }
                guard let newVolume = change.newValue else { return }

                if Thread.isMainThread {
                    self.handleVolumeChange(newVolume)
                } else {
                    DispatchQueue.main.async { [weak self] in
                        self?.handleVolumeChange(newVolume)
                    }
                }
            }
        } catch {
        }
    }
    
    /// 处理音量变化
    /// - Parameter newVolume: 新的音量值
    private func handleVolumeChange(_ newVolume: Float) {
        guard abs(newVolume - currentVolume) >= 0.0001 else { return }

        currentVolume = newVolume

        volumeChangeCallback?(newVolume)
    }
    
    deinit {
        stopObserving()
    }
}

extension VolumeHandler {
    
    /// 检查是否静音
    var isMuted: Bool {
        return currentVolume <= 0.0001
    }
    
    /// 音量变化的增量检测
    /// - Parameter threshold: 变化阈值
    /// - Returns: 是否有显著变化
    func hasSignificantVolumeChange(threshold: Float = 0.01) -> Bool {
        let effectiveThreshold = max(0.0, threshold)
        let sessionVolume = audioSession.outputVolume
        return abs(sessionVolume - currentVolume) >= effectiveThreshold
    }
    
    /// 重新同步当前音量（在某些情况下可能需要）
    func syncCurrentVolume() {
        let sessionVolume = audioSession.outputVolume
        guard abs(sessionVolume - currentVolume) >= 0.0001 else { return }

        if Thread.isMainThread {
            handleVolumeChange(sessionVolume)
        } else {
            DispatchQueue.main.async { [weak self] in
                self?.handleVolumeChange(sessionVolume)
            }
        }
    }
}

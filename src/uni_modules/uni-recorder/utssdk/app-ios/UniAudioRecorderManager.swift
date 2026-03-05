
//
//  UniAudioRecorderManager.swift
//  TestFra
//
//  Created by Fred on 2025/3/7.
//

import Foundation
import AVFoundation
import AVFAudio
import DCloudUTSFoundation
import DCloudUniappRuntime

@objc(StateChangeRes)
@objcMembers
public class StateChangeRes : NSObject, RecorderManagerOnStopResult {
    public var tempFilePath: String = ""
    public var errMsg: String?
    public var frameBuffer: ArrayBuffer?
    public var isLastFrame: Bool = false
}

public enum UniAudioRecorderFormat: String, CaseIterable {
    case aac
    case mp3
    case pcm
    case wav
}

public enum UniAudioRecorderCategory: String {
    case recorder
    case playAndRecorder
}

public enum UniAudioRecorderEvent {
    case start
    case pause
    case stop
    case resume
    case frameRecorded
    case interruptionBegin
    case interruptionEnd
    case error(String?)
    
    public var rawValue: String {
        switch self {
        case .start: return "start"
        case .pause: return "pause"
        case .stop: return "stop"
        case .resume: return "resume"
        case .frameRecorded: return "frameRecorded"
        case .interruptionBegin: return "interruptionBegin"
        case .interruptionEnd: return "interruptionEnd"
        case .error(_): return "error"
        }
    }
}

typealias UniAudioRecorderEventCallback = (_ result: Any) -> Void
typealias UniAudioRecorderStopEventCallback = (_ result: RecorderManagerOnStopResult) -> Void
typealias UniAudioRecorderErrorEventCallback = (_ result: IRecorderManagerFail) -> Void


public class UniAudioRecorderManager: NSObject, RecorderManager {
    
    public static var shared = UniAudioRecorderManager()
    
    
    private var audioRecorder: AVAudioRecorder?
    
    private var displayLink: CADisplayLink?
    private var starTime: TimeInterval = 0 //记录录音开始时间
    private var maxDuration: TimeInterval = 0 //录音最大时长
    private var isPaused: Bool = false //是否处于暂停状态
    /*
     iOS 设备支持的常见采样率如下：
     •    8000 Hz（8kHz）：电话质量，适用于 VoIP（如 G.711 编码）
     •    11025 Hz（11.025kHz）：低质量语音
     •    16000 Hz（16kHz）：适用于高质量语音（如 WebRTC）
     •    22050 Hz（22.05kHz）：中等质量
     •    32000 Hz（32kHz）：高质量语音，广播级别
     •    44100 Hz（44.1kHz）：CD 音质（标准）
     •    48000 Hz（48kHz）：专业级别（标准视频音频）
     •    96000 Hz（96kHz）：高分辨率音频
     •    192000 Hz（192kHz）：极高质量，通常用于专业音频工程
     iOS 设备通常默认使用 44.1kHz 或 48kHz 作为系统音频采样率
     */
    private var sampleRates: [Int32] = [8000, 11025, 12000, 16000, 22050, 24000, 32000, 44100, 48000]
    
    private var eventCallbacks: [String: UniAudioRecorderEventCallback] = [:]
    private var stopEventCallback: UniAudioRecorderStopEventCallback?
    private var errorEventCallBack: UniAudioRecorderErrorEventCallback?

    private var audioFormat: UniAudioRecorderFormat = .aac
    
    public override init() {
       
    }
    
    public func start(_ options: RecorderManagerStartOptions) {
        
        requestRecordPermission { [weak self] granted in
            guard let self = self else { return }
            
            if granted == false {
                failedAction(1107601)
                return
            }
            
            self.stop()
            
            let duration = TimeInterval(truncating: options.duration ?? 60000) / 1000
            let sampleRate = options.sampleRate ?? 44100
            guard sampleRates.contains(sampleRate.int32Value) else {
                failedAction(1107602)
                return
            }
            let channels = options.numberOfChannels ?? 1
            let bitRate = options.encodeBitRate ?? 128000
            
            let (valid, error) = isValidEncodeBitRate(bitRate.int32Value, compare: sampleRate.int32Value)
            guard valid else {
                failedAction(1107603, errMsg: error)
                return
            }
            
            if let format = options.format {
                if format == UniAudioRecorderFormat.aac.rawValue {
                    self.audioFormat = .aac
                } else if format == UniAudioRecorderFormat.mp3.rawValue {
                    self.audioFormat = .mp3
                } else if format == UniAudioRecorderFormat.pcm.rawValue {
                    self.audioFormat = .pcm
                } else if format == UniAudioRecorderFormat.wav.rawValue {
                    self.audioFormat = .wav
                } else {
                    failedAction(1107605)
                    return
                }
            }
            
            self.innerStart(duration: duration, sampleRate: sampleRate.doubleValue, channels: channels.intValue, bitRate: bitRate.intValue, frameSize: options.frameSize?.int64Value)
        }
    }
    
    public func stop() {
        if let isRecording = audioRecorder?.isRecording, (isRecording || isPaused) {
            audioRecorder?.stop()
            stopDisplayLink()
            
            let result = StateChangeRes()
            result.tempFilePath = audioRecorder?.url.absoluteString ?? ""
            dispatchStopEvent(event:.stop , result: result)
            
            print("录音已完成，文件保存在: \(audioRecorder?.url.absoluteString ?? "未知路径")")
            audioRecorder = nil
        }
    }
    
    public func pause() {
        guard let recorder = audioRecorder, recorder.isRecording else { return }
        recorder.pause()
        isPaused = true
        stopDisplayLink()
        dispatchEvent(event: .pause)
    }
    
    public func resume() {
        guard let recorder = audioRecorder, !recorder.isRecording else { return }
        recorder.record()
        isPaused = false
        startDisplayLink()
        dispatchEvent(event: .resume)
    }
    
    public func onStart(_ options: @escaping (Any) -> Void) {
        addEvent(event: .start, eventCallback: options)
    }
    
    public func onPause(_ options: @escaping (Any) -> Void) {
        addEvent(event: .pause, eventCallback: options)
    }
    
    public func onStop(_ options: @escaping (any RecorderManagerOnStopResult) -> Void) {
        addStopEvent(event: .stop, eventCallback: options)
    }
    
    public func onResume(_ options: @escaping (Any) -> Void) {
        addEvent(event: .resume, eventCallback: options)
    }
    
    public func onFrameRecorded(_ options: @escaping (Any) -> Void) {
        addEvent(event: .frameRecorded, eventCallback: options)
    }

    public func onError(_ options: @escaping (_ result: IRecorderManagerFail) -> Void) {
        errorEventCallBack = options
    }
    
    public func onInterruptionBegin(_ options: @escaping (Any) -> Void) {
        addEvent(event: .interruptionBegin, eventCallback: options)
    }
    
    public func onInterruptionEnd(_ options: @escaping (Any) -> Void) {
        addEvent(event: .interruptionEnd, eventCallback: options)
    }
    
    public func offStart() {
        removeEvent(event: .start)
    }
    
    public func offPause() {
        removeEvent(event: .pause)
    }
    
    public func offStop() {
        removeEvent(event: .stop)
    }
    
    public func offFrameRecorded() {
        removeEvent(event: .frameRecorded)
    }
    
    public func offError() {
        removeEvent(event: .error(nil))
    }
    
    public func offResume() {
        removeEvent(event: .resume)
    }
    
    public func offInterruptionBegin() {
        removeEvent(event: .interruptionBegin)
    }
    
    public func offInterruptionEnd() {
        removeEvent(event: .interruptionEnd)
    }
    
}

extension UniAudioRecorderManager {
    
    private func requestRecordPermission(completion: @escaping (Bool) -> Void) {
        AVAudioSession.sharedInstance().requestRecordPermission { granted in
            DispatchQueue.main.async {
                if granted {
                    completion(true)
                } else {
                    completion(false)
                }
            }
        }
    }
    
    private func innerStart(duration: TimeInterval, sampleRate: Double, channels: Int, bitRate: Int, frameSize: Int64? = nil) {
        
        var format : AudioFormatID = kAudioFormatMPEG4AAC
        
        switch audioFormat {
        case .aac:
            format = kAudioFormatMPEG4AAC
        case .mp3:
            format = kAudioFormatLinearPCM
        case .pcm:
            format = kAudioFormatLinearPCM
        case .wav:
            format = kAudioFormatLinearPCM
        }
        
        let audioSession = AVAudioSession.sharedInstance()
        do {
            try audioSession.setCategory(.playAndRecord, mode: .default, options: [.defaultToSpeaker, .allowBluetooth])
            try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
            
            let settings: [String: Any] = [
                AVFormatIDKey: format,
                AVSampleRateKey: sampleRate,
                AVNumberOfChannelsKey: channels,
                AVEncoderBitRateKey: bitRate,
                AVEncoderAudioQualityKey: AVAudioQuality.max.rawValue,
                AVLinearPCMBitDepthKey: 16,                   // 16-bit 位深
                AVLinearPCMIsBigEndianKey: false,             // 小端存储
                AVLinearPCMIsFloatKey: false                  // 整数采样（非浮点）
            ]
            
            let fileURL = getAudioRecorderFileURL()
            audioRecorder = try AVAudioRecorder(url: fileURL, settings: settings)
            audioRecorder?.delegate = self
            audioRecorder?.isMeteringEnabled = true
            
            let prepareToRecord = audioRecorder?.prepareToRecord() ?? false
            let record = audioRecorder?.record() ?? false
            if prepareToRecord && record {
                if let frameSize = frameSize {
                    // TODO: 设置帧大小
                }
                //录音计时逻辑
                starTime = CACurrentMediaTime()
                maxDuration = duration
                isPaused = false
                startDisplayLink()
                
                dispatchEvent(event: .start)
            } else {
                failedAction(1107604, errMsg: "录音启动失败，请对比采样率与编码码率是否匹配")
            }
            
        } catch {
            failedAction(1107604, errMsg: error.localizedDescription)
            print("录音启动失败: \(error.localizedDescription)")
        }
    }
    
    private func startDisplayLink() {
        stopDisplayLink()
        displayLink = CADisplayLink(target: self, selector: #selector(updateTimer))
        displayLink?.add(to: .main, forMode: .common)
    }
    
    private func stopDisplayLink() {
        displayLink?.invalidate()
        displayLink = nil
    }
    
    @objc func updateTimer() {
        guard !isPaused else { return }
        let elapsedTime = CACurrentMediaTime() - starTime
        if elapsedTime >= maxDuration {
            stop()
        }
    }
    
    private func getAudioRecorderFileURL() -> URL {
        var cachePath = UniResource.CACHE_PATH + "uni-recorder/"
        cachePath = UTSiOS.convert2AbsFullPath(cachePath)
        ensureDirExist(cachePath)
        var suffixName = audioFormat.rawValue
        if audioFormat.rawValue == UniAudioRecorderFormat.pcm.rawValue || audioFormat.rawValue == UniAudioRecorderFormat.mp3.rawValue {
            suffixName = "caf"
        }
        let fileName = Date().timeIntervalSince1970.toString() + "." + suffixName
        cachePath += fileName
        return URL(fileURLWithPath: cachePath)
    }
    
    private func ensureDirExist(_ path: String) {
        if FileManager.default.fileExists(atPath: path) == false {
            do {
                try FileManager.default.createDirectory(atPath: path, withIntermediateDirectories: true)
            }catch {
                
            }
        }
    }
    
    /// 判断采样率是否和编码码率匹配
    private func isValidEncodeBitRate(_ encodeBitRate: Int32, compare sampleRate: Int32) -> (Bool, String?) {
        var error: String?
        if sampleRate == 8000 && !(16000...48000).contains(encodeBitRate) {
            error = "invalid encodeBitRate \(encodeBitRate), encodeBitRate should be greater than 16000 and less than 48000"
        } else if sampleRate == 11025 && !(16000...48000).contains(encodeBitRate) {
            error = "invalid encodeBitRate \(encodeBitRate), encodeBitRate should be greater than 16000 and less than 48000"
        } else if sampleRate == 12000 && !(24000...64000).contains(encodeBitRate) {
            error = "invalid encodeBitRate \(encodeBitRate), encodeBitRate should be greater than 24000 and less than 64000"
        } else if sampleRate == 16000 && !(24000...96000).contains(encodeBitRate) {
            error = "invalid encodeBitRate \(encodeBitRate), encodeBitRate should be greater than 24000 and less than 96000"
        } else if sampleRate == 22050 && !(32000...128000).contains(encodeBitRate) {
            error = "invalid encodeBitRate \(encodeBitRate), encodeBitRate should be greater than 32000 and less than 128000"
        } else if sampleRate == 24000 && !(32000...128000).contains(encodeBitRate) {
            error = "invalid encodeBitRate \(encodeBitRate), encodeBitRate should be greater than 32000 and less than 128000"
        } else if sampleRate == 32000 && !(48000...192000).contains(encodeBitRate) {
            error = "invalid encodeBitRate \(encodeBitRate), encodeBitRate should be greater than 48000 and less than 192000"
        } else if sampleRate == 44100 && !(64000...320000).contains(encodeBitRate) {
            error = "invalid encodeBitRate \(encodeBitRate), encodeBitRate should be greater than 64000 and less than 320000"
        } else if sampleRate == 48000 && !(64000...320000).contains(encodeBitRate) {
            error = "invalid encodeBitRate \(encodeBitRate), encodeBitRate should be greater than 64000 and less than 320000"
        }
        
        if let error = error {
            return (false, error)
        }
        
        return (true, nil)
    }
    
    private func failedAction(_ errorCode: NSNumber, errMsg: String? = nil) {
        let failImpl = RecorderManagerFailImpl(errorCode)
        if let errMsg = errMsg {
            failImpl.errMsg = errMsg
        }
        errorEventCallBack?(failImpl)
    }
}

extension UniAudioRecorderManager: AVAudioRecorderDelegate {
    public func audioRecorderDidFinishRecording(_ recorder: AVAudioRecorder, successfully flag: Bool) {
        print("audioRecorderDidFinishRecording: \(flag)")
    }
    
    public func audioRecorderEncodeErrorDidOccur(_ recorder: AVAudioRecorder, error: (any Error)?) {
        failedAction(1107606, errMsg: error?.localizedDescription)
    }
    
    public func audioRecorderBeginInterruption(_ recorder: AVAudioRecorder) {
        stop()
        dispatchEvent(event: .interruptionBegin)
    }
    
    public func audioRecorderEndInterruption(_ recorder: AVAudioRecorder, withOptions flags: Int) {
//        do {
//            try AVAudioSession.sharedInstance().setActive(true)
//            if flags == AVAudioSession.InterruptionOptions.shouldResume.rawValue {
//                recorder.record()
//                dispatchEvent(event: .interruptionEnd, result: "录音已恢复")
//            }
//        } catch {
//            dispatchEvent(event: .interruptionEnd, result: "录音恢复失败\(error.localizedDescription)")
//        }
        dispatchEvent(event: .interruptionEnd)
    }
}


extension UniAudioRecorderManager {
    private func addEvent(event: UniAudioRecorderEvent, eventCallback: @escaping UniAudioRecorderEventCallback) {
        eventCallbacks.set(event.rawValue, eventCallback)
    }
    
    private func addStopEvent(event: UniAudioRecorderEvent, eventCallback: @escaping UniAudioRecorderStopEventCallback) {
        if event.rawValue == UniAudioRecorderEvent.stop.rawValue {
            stopEventCallback = eventCallback
        }
    }
    
    private func removeEvent(event: UniAudioRecorderEvent) {
        guard let _ = audioRecorder else { return }
        if let _ = eventCallbacks.get(event.rawValue) {
            eventCallbacks.removeValue(forKey: event.rawValue)
        }
    }
    
    private func dispatchStopEvent(event: UniAudioRecorderEvent, result: RecorderManagerOnStopResult) {
        guard let _ = audioRecorder else { return }
        if event.rawValue == UniAudioRecorderEvent.stop.rawValue {
            stopEventCallback?(result)
            if let path = audioRecorder?.url.absoluteString {
                //                fileSizeMonitor?.stopMonitoring(filePath: path)
            }
        }
    }
    
    private func dispatchEvent(event: UniAudioRecorderEvent, result: Any? = nil) {
        if event.rawValue == UniAudioRecorderEvent.error(nil).rawValue || audioRecorder != nil {
            eventCallbacks.get(event.rawValue)?(result ?? UTSJSONObject())
        }
    }
}


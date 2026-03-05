//
//  CameraImpl.swift
//  UniCamera
//
//  Created by dcloud-thb on 2024/12/23.
//

import Foundation
import UIKit
import AVFoundation
import DCloudUniappRuntime

typealias ICallBack = (String, Any?) -> Void

@objc(UniCameraComponentRegister)
@objcMembers
public class UniCameraComponentRegister : NSObject {
    public static func registerComponent() {
        UniSDKEngine.shared.registerUniComponent(type: "uni-camera-element", nodeClazz: UniCameraElementImpl.constructor, componentCls: UniViewComponent.self);
        UniSDKEngine.shared.registerExtComponent(type: "uni-camera-element");
    }
}

@objc public class CameraImpl: NSObject {
    fileprivate var previewView: UIView? = nil
    fileprivate var currentResolution = "medium"
    fileprivate var cameraManager = CameraManager()
    fileprivate var stopRecordType = 0
    fileprivate var stopRecordSuccess: ICallBack? = nil
    fileprivate var stopRecordFail: ICallBack? = nil
    fileprivate var timer: DispatchSourceTimer? = nil
    fileprivate let picturesFloder = "uni-media"
    fileprivate let videosFloder = "uni-media"
    fileprivate let picturePrefix = "Pic_"
    fileprivate let videoPrefix = "Video_"
    fileprivate var isRecording = false
    
    func getCameraPreviewView(_ resolution: String) -> UIView {
        currentResolution = resolution
        defaultConfig()
        previewView = UIView()
        cameraManager.askUserForCameraPermission { allow in
            if allow {
                var preset = AVCaptureSession.Preset.medium
                switch resolution {
                    case "low":
                        preset = .low
                    case "medium":
                        preset = .medium
                    case "high":
                        preset = .high
                    default:
                        preset = .medium
                }
                self.cameraManager.cameraOutputQuality = preset
                self.cameraManager.addLayerPreviewToView(self.previewView!, newCameraOutputModes: [], completion: nil)
            } else {
                self.errorCallBack?("error", "permission denied")
            }
        }
        return previewView!
    }
    
    
    fileprivate func defaultConfig() {
        cameraManager.animateCameraDeviceChange = false
    }
    
    func switchCamera(position: String) {
        if isRecording {
            return
        }
        var device = CameraDevice.back
        switch position {
        case "front":
            device = .front
        case "back":
            device = .back
        default:
            device = .back
        }
        cameraManager.cameraDevice = device
    }
    
    
    func setFlash(flash: String) {
        if isRecording {
            return
        }
        var mode = CameraFlashMode.auto
        switch flash {
        case "auto":
            mode = .auto
        case "on":
            mode = .on
        case "off":
            mode = .off
        case "torch":
            mode = .torch
        default :
            mode = .auto
        }
        cameraManager.flashMode = mode
    }
    
    func setFrameSize(size: String) {
        if isRecording {
            return
        }
        var preset = AVCaptureSession.Preset.medium
        switch size {
        case "small":
            preset = .low
        case "medium":
            preset = .medium
        case "large":
            preset = .high
        default:
            preset = .medium
        }
        self.cameraManager.cameraOutputQuality = preset
    }
    
    
    func setInitDoneCallBack(callback: @escaping ICallBack) {
        self.cameraManager.initDoneCallBack = { maxzoom in
            callback("initdone", maxzoom)
        }
    }
    
    fileprivate var errorCallBack: ICallBack?
    func setErrorCallBack(callback: @escaping ICallBack) {
        self.errorCallBack = callback
    }
    
    
    func setStopCallBack(callback: @escaping ICallBack) {
        self.cameraManager.stopCallBack = { msg in
            callback("stop", msg)
        }
    }
    
    func setZoom(_ zoom: Float) {
        cameraManager.zoom(CGFloat(zoom))
    }
    
    func takePhoto(_ quality: String, _ selfieMirror: Bool, _ success: ICallBack?, _ fail: ICallBack?) {
        self.cameraManager.shouldFlipFrontCameraImage = selfieMirror
        self.cameraManager.capturePictureWithCompletion(self.getJpegQuality(quality)) { result in
            self.savePicture(result.imageData, success, fail)
            self.cameraManager.shouldFlipFrontCameraImage = false
        }
    }
    
    func setFrameCallback(_ callback: ICallBack?) {
        self.cameraManager.cameraFrameCallback = { width, height, data in
            callback?("frame", ["width": width, "height": height, "buffer": data])
        }
    }
    
    func startOnFrame() {
        self.cameraManager.captureFrameStatus = true
        self.cameraManager.cameraOutputModes = [.stillImage, .videoData]
        self.cameraManager.applyBlockInSessionQueue {
            self.cameraManager.registerAnalyzer()
        }
    }
    
    func stopOnFrame() {
        self.cameraManager.captureFrameStatus = false
        self.cameraManager.unRegisterAnalyzer()
    }
    
    func startRecord(_ timeout: Int = 30, _ selfieMirror: Bool = true, _ timeoutCallback: ICallBack?, _ recordSuccess: ICallBack?, _ recordFail: ICallBack?) {
        if isRecording {
            return
        }
        self.cameraManager.cameraOutputModes = [.stillImage, .videoData, .videoWithMic]
        self.cameraManager.shouldFlipFrontCameraImage = selfieMirror
        self.cameraManager.applyVideoMirror()
        self.cameraManager.askUserForCameraPermission { [weak self] allow in
            guard let self = self else {
                return
            }
            
            if !allow {
                self.cameraManager.cameraOutputModes = [.stillImage, .videoData, .videoOnly]
            }
            
            guard let videoPath = self.getVideoPath() else {
                if self.stopRecordType == 1 {
                    timeoutCallback?("timeoutCallback", "video path is empty")
                } else {
                    recordFail?("stopRecordFail", "video path is empty")
                }
                return
            }
            
            self.cameraManager.didStartRecordingCallback = {[weak self] in
                guard let self = self else {
                    return
                }
                recordSuccess?("recordsuccess", nil)
                self.timer = DispatchSource.makeTimerSource(queue: DispatchQueue.global())
                self.timer?.schedule(deadline: .now() + Double(timeout))
                self.timer?.setEventHandler { [weak self] in
                    self?.timer?.cancel()
                    self?.stopRecord(1, nil, nil)
                }
                self.timer?.resume()
            }
            
            self.cameraManager.didFinishRecordingCallback = { [weak self] url , error in
                guard let self = self else {
                    return
                }
                self.cameraManager.shouldFlipFrontCameraImage = false
                self.cameraManager.applyVideoMirror()
                
                if let error = error {
                    if self.stopRecordType == 1 {
                        timeoutCallback?("timeoutCallback", error.localizedDescription)
                    } else {
                        recordFail?("stopRecordFail", error.localizedDescription)
                    }
                } else {
                    let firstFramePath = self.saveFirstFrame(url)
                    if self.stopRecordType == 1 {
                        timeoutCallback?("timeoutCallback", ["tempVideoPath": url.absoluteString, "tempThumbPath": firstFramePath])
                    } else {
                        self.stopRecordSuccess?("stopRecordSuccess", ["tempVideoPath": url.absoluteString, "tempThumbPath": firstFramePath])
                    }
                }
                self.recordReset()
            }
            
            isRecording = true
            self.cameraManager.applyBlockInSessionQueue {
                self.cameraManager.startRecordingVideo(videoPath)
            }
        }
    }
    
    func stopRecord(_ stopRecordType: Int = 0, _ stopRecordSuccess: ICallBack?, _ stopRecordFail: ICallBack?) {
        if isRecording {
            isRecording = false
            self.stopRecordSuccess = stopRecordSuccess
            self.stopRecordFail = stopRecordFail
            self.stopRecordType = stopRecordType
            self.cameraManager.stopVideoRecording()
            timer?.cancel()
            timer = nil
        }
    }
    
    
    func startAnalysis(_ cameraOriginalFrameCallback: @escaping ICallBack) {
        self.cameraManager.cameraOriginalFrameCallback = { type, buffer in
            cameraOriginalFrameCallback(type, buffer)
        }
        self.cameraManager.analysisStatus = true
        self.cameraManager.cameraOutputModes = [.stillImage, .videoData]
        self.cameraManager.applyBlockInSessionQueue {
            self.cameraManager.registerAnalyzer()
        }
        
    }
    
    func stopAnalysis() {
        self.cameraManager.cameraOriginalFrameCallback = nil
        self.cameraManager.analysisStatus = false
        self.cameraManager.unRegisterAnalyzer()
    }
    
    fileprivate func saveFirstFrame(_ url: URL) -> String? {
        let asset = AVAsset(url: url)
        let imageGenerator = AVAssetImageGenerator(asset: asset)
        imageGenerator.appliesPreferredTrackTransform = true // 确保方向正确
        
        let time = CMTime(seconds: 0, preferredTimescale: 600) // 第一帧（时间 0 秒）
        
        do {
            let cgImage = try imageGenerator.copyCGImage(at: time, actualTime: nil)
            let firstFrame = UIImage(cgImage: cgImage)
            guard let imageData = firstFrame.jpegData(compressionQuality: 1.0) else {
                return nil
            }
            // 写入文件
            do {
                guard let fileUrl = self.getPicturePath() else { return nil }
                try imageData.write(to: fileUrl, options: .atomic)
                return fileUrl.absoluteString
            } catch {
                return nil
            }
        } catch {
            return nil
        }
    }
    
    fileprivate func recordReset() {
        isRecording = false
        self.stopRecordSuccess = nil
        self.stopRecordFail = nil
        self.stopRecordType = 0
        timer?.cancel()
        timer = nil
    }
    
    fileprivate func getJpegQuality(_ quality: String) -> Float {
        switch quality {
        case "low":
            return 0.3
        case "normal":
            return 0.9
        case "high":
            return 0.95
        case "original":
            return 1.0
        default:
            return 0.9
        }
    }
    
    fileprivate func savePicture(_ data: Data?, _ success: ICallBack?, _ fail: ICallBack?) {
        guard let data = data else { return }
        do {
            guard let fileUrl = self.getPicturePath() else { return  }
            try data.write(to: fileUrl, options: .atomic)
            success?("takephotosuccess", fileUrl.absoluteString)
        } catch {
            fail?("takephotofail", error.localizedDescription)
        }
    }
    
    fileprivate func getPicturePath() -> URL? {
        guard let cacheDirectory = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first else { return nil }
        let folderUrl = cacheDirectory.appendingPathComponent(picturesFloder)
        do {
            if !FileManager.default.fileExists(atPath: folderUrl.path) {
                try FileManager.default.createDirectory(atPath: folderUrl.path, withIntermediateDirectories: true, attributes: nil)
            }
            let fileName = "\(picturePrefix)\(Date().timeIntervalSince1970).jpg"
            return folderUrl.appendingPathComponent(fileName)
        } catch {
            return nil
        }
    }
    
    fileprivate func getVideoPath() -> URL? {
        guard let cacheDirectory = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first else { return nil }
        let folderUrl = cacheDirectory.appendingPathComponent(videosFloder)
        
        do {
            if !FileManager.default.fileExists(atPath: folderUrl.path) {
                try FileManager.default.createDirectory(atPath: folderUrl.path, withIntermediateDirectories: true, attributes: nil)
            }
            let fileName = "\(videoPrefix)\(Date().timeIntervalSince1970)"
            return folderUrl.appendingPathComponent(fileName).appendingPathExtension("mp4")
        } catch {
            return nil
        }
    }
    
    func getCurrentZoom() -> Float {
        return Float(cameraManager.zoomScale)
    }
    
    /**
     停止相机捕获会话，但保留所有设置，以便稍后恢复。
     适用于应用进入后台或页面暂时不可见时调用。
     */
    func stopCamera() {
        cameraManager.stopCaptureSession()
    }
    
    /**
     恢复之前停止的相机捕获会话。
     适用于应用回到前台或页面重新可见时调用。
     */
    func resumeCamera() {
        cameraManager.resumeCaptureSession()
    }
    
    /**
     完全停止并移除相机捕获会话，释放所有相关资源。
     适用于不再需要相机时调用，例如页面被销毁时。
     */
    func releaseCamera() {
        cameraManager.stopAndRemoveCaptureSession()
    }
}

//
//  CameraManager.swift
//  camera
//
//  Created by Natalia Terlecka on 10/10/14.
//  Copyright (c) 2014 Imaginary Cloud. All rights reserved.
//

import AVFoundation
import CoreImage
import UIKit
import Foundation

public enum CameraState {
    case ready, accessDenied, noDeviceFound, notDetermined
}

public enum CameraDevice {
    case front, back
}

public enum CameraFlashMode: Int {
    case off, on, auto, torch
}

public enum CameraOutputMode {
    case stillImage, videoWithMic, videoOnly, videoData
}

public enum CaptureResult {
    case success(content: CaptureContent)
    case failure(Error)
    
    init(_ image: UIImage) {
        self = .success(content: .image(image))
    }
    
    init(_ data: Data) {
        self = .success(content: .imageData(data))
    }
    
    var imageData: Data? {
        if case let .success(content) = self {
            return content.asData
        } else {
            return nil
        }
    }
}

public enum CaptureContent {
    case imageData(Data)
    case image(UIImage)
}

extension CaptureContent {
    public var asImage: UIImage? {
        switch self {
            case let .image(image): return image
            case let .imageData(data): return UIImage(data: data)
        }
    }
    
    public var asData: Data? {
        switch self {
            case let .image(image): return image.jpegData(compressionQuality: 1.0)
            case let .imageData(data): return data
        }
    }
}

public enum CaptureError: Error {
    case noImageData
    case invalidImageData
    case noVideoConnection
    case noSampleBuffer
    case assetNotSaved
}

public enum CaptureVideoDataQuality: String{
    case small, medium, large
}

/// Class for handling iDevices custom camera usage
open class CameraManager: NSObject, AVCaptureFileOutputRecordingDelegate, UIGestureRecognizerDelegate {
    // MARK: - Public properties
    
    /// Property for capture session to customize camera settings.
    open var captureSession: AVCaptureSession?
    
    
    /// Property to determine if the manager should show the camera permission popup immediatly when it's needed or you want to show it manually. Default value is true. Be carful cause using the camera requires permission, if you set this value to false and don't ask manually you won't be able to use the camera.
    open var showAccessPermissionPopupAutomatically = false
    
    
    open var showErrorBlock: (_ erTitle: String, _ erMessage: String) -> Void = { (erTitle: String, erMessage: String) -> Void in
        NSLog("aaa \(erTitle)  \(erMessage)")
    }
    
    /// 相机初始化完成时触发
    open var initDoneCallBack: ((_ maxZoom: Float) -> Void)?
    /// 相机停止事件
    open var stopCallBack: ((_ msg: String) -> Void)?
    
    open func canSetPreset(preset: AVCaptureSession.Preset) -> Bool? {
        if let validCaptureSession = captureSession {
            return validCaptureSession.canSetSessionPreset(preset)
        }
        return nil
    }
    
    /**
     Property to determine if manager should follow device orientation.
     - note: Default value is **true**
     */
    open var shouldRespondToOrientationChanges = true {
        didSet {
            if shouldRespondToOrientationChanges {
                _startFollowingDeviceOrientation()
            } else {
                _stopFollowingDeviceOrientation()
            }
        }
    }
    
    /**
     Property to determine if manager should horizontally flip image took by front camera.
     - note: Default value is **false**
     */
    open var shouldFlipFrontCameraImage = false
    
    /**
     Property to determine if manager should keep view with the same bounds when the orientation changes.
     - note: Default value is **false**
     */
    open var shouldKeepViewAtOrientationChanges = false
    
    /**
     Property to determine if manager should enable tap to focus on camera preview.
     - note: Default value is **true**
     */
    open var shouldEnableTapToFocus = false {
        didSet {
            focusGesture.isEnabled = shouldEnableTapToFocus
        }
    }
    
    /**
     Property to determine if manager should enable pinch to zoom on camera preview.
     - note: Default value is **true**
     */
    open var shouldEnablePinchToZoom = false {
        didSet {
            zoomGesture.isEnabled = shouldEnablePinchToZoom
        }
    }
    
    /**
     Property to determine if manager should enable pan to change exposure/brightness.
     - note: Default value is **true**
     */
    open var shouldEnableExposure = false {
        didSet {
            exposureGesture.isEnabled = shouldEnableExposure
        }
    }
    
    /// Property to determine if the camera is ready to use.
    open var cameraIsReady: Bool {
        return cameraIsSetup
    }
    
    /// Property to determine if current device has front camera.
    open var hasFrontCamera: Bool = {
        let frontDevices = AVCaptureDevice.videoDevices.filter { $0.position == .front }
        return !frontDevices.isEmpty
    }()
    
    /// Property to determine if current device has flash.
    open var hasFlash: Bool = {
        let hasFlashDevices = AVCaptureDevice.videoDevices.filter { $0.hasFlash }
        return !hasFlashDevices.isEmpty
    }()
    
    /**
     Property to enable or disable flip animation when switch between back and front camera.
     - note: Default value is **true**
     */
    open var animateCameraDeviceChange: Bool = true
    
    /**
     Property to enable or disable shutter animation when taking a picture.
     - note: Default value is **true**
     */
    open var animateShutter: Bool = false
    
    /// Property to change camera device between front and back.
    open var cameraDevice: CameraDevice = .back {
        didSet {
            if cameraIsSetup, cameraDevice != oldValue {
                if animateCameraDeviceChange {
                    _doFlipAnimation()
                }
                _setupInputs(self.captureSession, cameraDevice)
                _updateIlluminationMode(flashMode)
                _setupMaxZoomScale()
                _zoom(0)
                _orientationChanged()
            }
        }
    }
    
    /// Property to change camera flash mode.
    open var flashMode: CameraFlashMode = .auto {
        didSet {
            if cameraIsSetup && flashMode != oldValue {
                _updateIlluminationMode(flashMode)
            }
        }
    }
    
    /// Property to change camera output quality.
    open var cameraOutputQuality: AVCaptureSession.Preset = .high {
        didSet {
            if cameraIsSetup && cameraOutputQuality != oldValue {
                _updateCameraQualityMode(cameraOutputQuality)
            }
        }
    }
    
    /// Property to change camera output.
    open var cameraOutputModes: [CameraOutputMode] = [.stillImage, .videoData] {
        didSet {
            if cameraIsSetup {
                if cameraOutputModes != oldValue {
                    sessionQueue.async { [weak self] in
                        guard let self = self else { return }
                        _setupOutputMode(cameraOutputModes, oldCameraOutputModes: oldValue)
                    }
                }
                _setupMaxZoomScale()
                _zoom(0)
            }
        }
    }
    
    /// Property to check video recording duration when in progress.
    open var recordedDuration: CMTime { return movieOutput?.recordedDuration ?? CMTime.zero }
    
    /// Property to check video recording file size when in progress.
    open var recordedFileSize: Int64 { return movieOutput?.recordedFileSize ?? 0 }
    
    /// Property to set focus mode when tap to focus is used (_focusStart).
    open var focusMode: AVCaptureDevice.FocusMode = .continuousAutoFocus
    
    /// Property to set exposure mode when tap to focus is used (_focusStart).
    open var exposureMode: AVCaptureDevice.ExposureMode = .continuousAutoExposure
    
    /// Property to set video stabilisation mode during a video record session
    open var videoStabilisationMode: AVCaptureVideoStabilizationMode = .auto {
        didSet {
            if oldValue != videoStabilisationMode {
                _setupVideoConnection()
            }
        }
    }
    
    // Property to get the stabilization mode currently active
    open var activeVideoStabilisationMode: AVCaptureVideoStabilizationMode {
        if let movieOutput = movieOutput {
            for connection in movieOutput.connections {
                for port in connection.inputPorts {
                    if port.mediaType == AVMediaType.video {
                        let videoConnection = connection as AVCaptureConnection
                        return videoConnection.activeVideoStabilizationMode
                    }
                }
            }
        }
        
        return .off
    }
    
    /// 是否开启分析
    var analysisStatus: Bool = false
    
    /// 是否监听视频流
    var captureFrameStatus: Bool = false
    
    /**
     录制开始回调
     */
    var didStartRecordingCallback: (() -> Void)?
    /**
     录制结束回调
     */
    var didFinishRecordingCallback: ((URL, Error?) -> Void)?
    
    /// 视频帧回调
    var cameraFrameCallback: ((Int, Int, Data) -> Void)?
    
    /**
     返回原始数据帧的回调
     */
    var cameraOriginalFrameCallback: ((String, CMSampleBuffer) -> Void)?
    
    
    // MARK: - Private properties
    
    fileprivate weak var embeddingView: UIView?
    fileprivate var sessionQueue: DispatchQueue = DispatchQueue(label: "CameraSessionQueue", attributes: [])
    
    fileprivate lazy var frontCameraDevice: AVCaptureDevice? = {
        AVCaptureDevice.videoDevices.filter { $0.position == .front }.first
    }()
    
    fileprivate lazy var backCameraDevice: AVCaptureDevice? = {
        AVCaptureDevice.videoDevices.filter { $0.position == .back }.first
    }()
    
    fileprivate lazy var mic: AVCaptureDevice? = {
        AVCaptureDevice.default(for: AVMediaType.audio)
    }()
    
    fileprivate var stillImageOutput: AVCaptureStillImageOutput?
    fileprivate var movieOutput: AVCaptureMovieFileOutput?
    fileprivate var videoDataOutput: AVCaptureVideoDataOutput?
    fileprivate var previewLayer: AVCaptureVideoPreviewLayer?
    
    fileprivate var cameraIsSetup = false
    var zoomScale = CGFloat(1.0)
    fileprivate var beginZoomScale = CGFloat(1.0)
    fileprivate var maxZoomScale = CGFloat(1.0)
    
    /// Real device orientation from DeviceMotion
    fileprivate var deviceOrientation: UIDeviceOrientation = .portrait
    
    /// 监听设备方向变化的observer
    fileprivate var observer: NSObjectProtocol?
    
    
    fileprivate let sharedCIContext = CIContext()
    
    // MARK: - CameraManager
    
    
    //MARK: 生命周期
    deinit {
        // 在 deinit 中直接执行停止操作，而不是调用可能会异步执行的方法
        if Thread.isMainThread {
            // 直接在主线程上执行清理操作
            UIDevice.current.endGeneratingDeviceOrientationNotifications()
            if let observer = observer {
                NotificationCenter.default.removeObserver(observer)
            }
            observer = nil
        } else {
            // 如果不在主线程，使用同步调用确保在 deinit 完成前执行完毕
            DispatchQueue.main.sync {
                UIDevice.current.endGeneratingDeviceOrientationNotifications()
                if let observer = observer {
                    NotificationCenter.default.removeObserver(observer)
                }
                observer = nil
            }
        }
        
        NotificationCenter.default.removeObserver(self)
        stopAndRemoveCaptureSession()
    }
    
    //MARK: 通知监听
    @objc func captureSessionDidStopRunning(_ notification: Notification) {
        var fail = ""
        
        // 确保在主线程上访问 UIApplication.shared.applicationState
        if Thread.isMainThread {
            if UIApplication.shared.applicationState != .active {
                fail = "the application enters the background"
            } else {
                fail = "camera is disabled"
            }
            
            self.stopCallBack?(fail)
        } else {
            DispatchQueue.main.async { [weak self] in
                if UIApplication.shared.applicationState != .active {
                    fail = "the application enters the background"
                } else {
                    fail = "camera is disabled"
                }
                
                self?.stopCallBack?(fail)
            }
        }
    }
    
    
    /**
     Inits a capture session and adds a preview layer to the given view. Preview layer bounds will automaticaly be set to match given view. Default session is initialized with still image output.
     
     :param: view The view you want to add the preview layer to
     :param: cameraOutputMode The mode you want capturesession to run image / video / video and microphone
     :param: completion Optional completion block
     
     :returns: Current state of the camera: Ready / AccessDenied / NoDeviceFound / NotDetermined.
     */
    @discardableResult open func addPreviewLayerToView(_ view: UIView) -> CameraState {
        return addPreviewLayerToView(view, newCameraOutputModes: cameraOutputModes)
    }
    
    @discardableResult open func addPreviewLayerToView(_ view: UIView, newCameraOutputModes: [CameraOutputMode]) -> CameraState {
        return addLayerPreviewToView(view, newCameraOutputModes: newCameraOutputModes, completion: nil)
    }
    
    @discardableResult open func addLayerPreviewToView(_ view: UIView, newCameraOutputModes: [CameraOutputMode], completion: (() -> Void)?) -> CameraState {
        if _canLoadCamera() {
            if let _ = embeddingView {
                if let validPreviewLayer = previewLayer {
                    validPreviewLayer.removeFromSuperlayer()
                }
            }
            if cameraIsSetup {
                _addPreviewLayerToView(view)
                if !newCameraOutputModes.isEmpty {
                    cameraOutputModes = newCameraOutputModes
                }
                if let validCompletion = completion {
                    validCompletion()
                }
            } else {
                _setupCamera {
                    self._addPreviewLayerToView(view)
                    if !newCameraOutputModes.isEmpty {
                        self.cameraOutputModes = newCameraOutputModes
                    }
                    if let validCompletion = completion {
                        validCompletion()
                    }
                    self.initDoneCallBack?(Float(self.maxZoomScale))
                }
            }
        }
        return _checkIfCameraIsAvailable()
    }
    
    /**
     Zoom in to the requested scale.
     */
    open func zoom(_ scale: CGFloat) {
        _zoom(scale)
    }
    
    /**
     Asks the user for camera permissions. Only works if the permissions are not yet determined. Note that it'll also automaticaly ask about the microphone permissions if you selected VideoWithMic output.
     
     :param: completion Completion block with the result of permission request
     */
    open func askUserForCameraPermission(_ completion: @escaping (Bool) -> Void) {
        AVCaptureDevice.requestAccess(for: AVMediaType.video, completionHandler: { (allowedAccess) -> Void in
            if self.cameraOutputModes.contains(.videoWithMic) {
                AVCaptureDevice.requestAccess(for: AVMediaType.audio, completionHandler: { (allowedAccess) -> Void in
                    DispatchQueue.main.async { () -> Void in
                        completion(allowedAccess)
                    }
                })
            } else {
                DispatchQueue.main.async { () -> Void in
                    completion(allowedAccess)
                }
            }
        })
    }
    
    /**
     Stops running capture session but all setup devices, inputs and outputs stay for further reuse.
     */
    open func stopCaptureSession() {
        sessionQueue.sync {
            if let session = captureSession, session.isRunning {
                session.stopRunning()
            }
        }
        
        // 直接调用内部实现，避免异步调用
        _stopFollowingDeviceOrientationInternal()
    }
    
    /**
     Resumes capture session.
     */
    open func resumeCaptureSession() {
        if let validCaptureSession = captureSession {
            if !validCaptureSession.isRunning, cameraIsSetup {
                sessionQueue.async {
                    validCaptureSession.startRunning()
                    
                    // 直接调用，方法内部会确保在主线程上执行
                    self._startFollowingDeviceOrientation()
                }
            }
        } else {
            // 如果没有嵌入视图，则不需要设置相机
            guard embeddingView != nil else {
                NSLog("Cannot resume capture session: no embedding view available")
                return
            }
            
            if _canLoadCamera() {
                if cameraIsSetup {
                    stopAndRemoveCaptureSession()
                }
                _setupCamera {
                    if let validEmbeddingView = self.embeddingView {
                        self._addPreviewLayerToView(validEmbeddingView)
                    }
                }
            }
        }
    }
    
    /**
     Stops running capture session and removes all setup devices, inputs and outputs.
     */
    open func stopAndRemoveCaptureSession() {
        stopCaptureSession()
        let oldAnimationValue = animateCameraDeviceChange
        animateCameraDeviceChange = false
        cameraDevice = .back
        cameraIsSetup = false
        previewLayer = nil
        captureSession = nil
        frontCameraDevice = nil
        backCameraDevice = nil
        mic = nil
        stillImageOutput = nil
        movieOutput = nil
        animateCameraDeviceChange = oldAnimationValue
    }
    
    /**
     Captures still image from currently running capture session.
     
     :param: imageCompletion Completion block containing the captured UIImage
     */
    open func capturePictureWithCompletion(_ quality: Float, _ imageCompletion: @escaping (CaptureResult) -> Void) {
        capturePictureDataWithCompletion { result in
            guard let imageData = result.imageData else {
                if case let .failure(error) = result {
                    imageCompletion(.failure(error))
                } else {
                    imageCompletion(.failure(CaptureError.noImageData))
                }
                
                return
            }
            
            if self.animateShutter {
                self._performShutterAnimation {
                    self._capturePicture(quality, imageData, imageCompletion)
                }
            } else {
                self._capturePicture(quality, imageData, imageCompletion)
            }
        }
    }
    
    fileprivate func _capturePicture(_ quality: Float, _ imageData: Data, _ imageCompletion: @escaping (CaptureResult) -> Void) {
        guard let img = UIImage(data: imageData) else {
            imageCompletion(.failure(NSError()))
            return
        }
        let image = fixOrientation(withImage: img)
        imageCompletion(CaptureResult(image.jpegData(compressionQuality: CGFloat(min(max(quality, 0), 1.0)))! as Data))
    }
    
    /**
     Captures still image from currently running capture session.
     
     :param: imageCompletion Completion block containing the captured imageData
     */
    open func capturePictureDataWithCompletion(_ imageCompletion: @escaping (CaptureResult) -> Void) {
        guard cameraIsSetup else {
            _show(NSLocalizedString("No capture session setup", comment: ""), message: NSLocalizedString("I can't take any picture", comment: ""))
            return
        }
        
        guard cameraOutputModes.contains(.stillImage) else {
            _show(NSLocalizedString("Capture session output mode video", comment: ""), message: NSLocalizedString("I can't take any picture", comment: ""))
            return
        }
        
        _updateIlluminationMode(flashMode)
        
        sessionQueue.async {
            let stillImageOutput = self._getStillImageOutput()
            if let connection = stillImageOutput.connection(with: AVMediaType.video),
               connection.isEnabled {
                if self.cameraDevice == CameraDevice.front, connection.isVideoMirroringSupported,
                   self.shouldFlipFrontCameraImage {
                    connection.isVideoMirrored = true
                }
                if connection.isVideoOrientationSupported {
                    connection.videoOrientation = self._currentCaptureVideoOrientation()
                }
                
                stillImageOutput.captureStillImageAsynchronously(from: connection, completionHandler: { [weak self] sample, error in
                    
                    if let error = error {
                        self?._show(NSLocalizedString("Error", comment: ""), message: error.localizedDescription)
                        imageCompletion(.failure(error))
                        return
                    }
                    
                    guard let sample = sample else { imageCompletion(.failure(CaptureError.noSampleBuffer)); return }
                    if let imageData = AVCaptureStillImageOutput.jpegStillImageNSDataRepresentation(sample) {
                        imageCompletion(CaptureResult(imageData))
                    } else {
                        imageCompletion(.failure(CaptureError.noImageData))
                    }
                    
                })
            } else {
                imageCompletion(.failure(CaptureError.noVideoConnection))
            }
        }
    }
    
    fileprivate func _imageOrientation(forDeviceOrientation deviceOrientation: UIDeviceOrientation, isMirrored: Bool) -> UIImage.Orientation {
        switch deviceOrientation {
            case .landscapeLeft:
                return isMirrored ? .upMirrored : .up
            case .landscapeRight:
                return isMirrored ? .downMirrored : .down
            default:
                break
        }
        
        return isMirrored ? .leftMirrored : .right
    }
    
    /**
     Starts recording a video with or without voice as in the session preset.
     */
    open func startRecordingVideo(_ path: URL) {
        let videoOutput = _getMovieOutput()
        let connect = videoOutput.connection(with: .video)
        guard let connection = connect else {
            return
        }
        if (connection.isActive) {
            _updateIlluminationMode(flashMode)
            videoOutput.startRecording(to: path, recordingDelegate: self)
        }
    }
    
    /**
     Stop recording a video. Save it to the cameraRoll and give back the url.
     */
    open func stopVideoRecording() {
        if let runningMovieOutput = movieOutput,
           runningMovieOutput.isRecording {
            runningMovieOutput.stopRecording()
        }
    }
    
    /**
     The signature for a handler.
     The success value is the string representation of a scanned QR code, if any.
     */
    public typealias QRCodeDetectionHandler = (Result<String, Error>) -> Void
    
    /**
     Check if the device rotation is locked
     */
    open func deviceOrientationMatchesInterfaceOrientation() -> Bool {
        return deviceOrientation == UIDevice.current.orientation
    }
    
    /**
     Current camera status.
     
     :returns: Current state of the camera: Ready / AccessDenied / NoDeviceFound / NotDetermined
     */
    open func currentCameraStatus() -> CameraState {
        return _checkIfCameraIsAvailable()
    }
    
    /**
     Change current flash mode to next value from available ones.
     
     :returns: Current flash mode: Off / On / Auto
     */
    open func changeFlashMode() -> CameraFlashMode {
        guard let newFlashMode = CameraFlashMode(rawValue: (flashMode.rawValue + 1) % 3) else { return flashMode }
        flashMode = newFlashMode
        return flashMode
    }
    
    /**
     Check the camera device has flash
     */
    open func hasFlash(for cameraDevice: CameraDevice) -> Bool {
        let devices = AVCaptureDevice.videoDevices
        for device in devices {
            if device.position == .back, cameraDevice == .back {
                return device.hasFlash
            } else if device.position == .front, cameraDevice == .front {
                return device.hasFlash
            }
        }
        return false
    }
    
    /**
     应用录制视频镜像
     */
    func applyVideoMirror() {
        if let movieOutput = movieOutput {
            for connection in movieOutput.connections {
                for port in connection.inputPorts {
                    if port.mediaType == AVMediaType.video {
                        let videoConnection = connection as AVCaptureConnection
                        if videoConnection.isVideoMirroringSupported {
                            videoConnection.isVideoMirrored = (cameraDevice == CameraDevice.front && shouldFlipFrontCameraImage)
                        }
                    }
                }
            }
        }
    }
    
    func registerAnalyzer() {
        _getVideoDataOutput().setSampleBufferDelegate(self, queue: sessionQueue)
    }
    
    func unRegisterAnalyzer() {
        if !captureFrameStatus && !analysisStatus {
            _getVideoDataOutput().setSampleBufferDelegate(nil, queue: sessionQueue)
        }
    }
    
    func applyBlockInSessionQueue(_ block: @escaping () -> Void) {
        sessionQueue.async {
            block()
        }
    }
    
    // MARK: - AVCaptureFileOutputRecordingDelegate
    public func fileOutput(_: AVCaptureFileOutput, didStartRecordingTo _: URL, from _: [AVCaptureConnection]) {
        captureSession?.beginConfiguration()
        if flashMode != .off {
            _updateIlluminationMode(flashMode)
        }
        captureSession?.commitConfiguration()
        didStartRecordingCallback?()
    }
    
    open func fileOutput(_: AVCaptureFileOutput, didFinishRecordingTo outputFileURL: URL, from _: [AVCaptureConnection], error: Error?) {
        didFinishRecordingCallback?(outputFileURL, error)
    }
    
    
    // MARK: - UIGestureRecognizerDelegate
    
    fileprivate lazy var zoomGesture = UIPinchGestureRecognizer()
    
    fileprivate func attachZoom(_ view: UIView) {
        DispatchQueue.main.async {
            self.zoomGesture.addTarget(self, action: #selector(CameraManager._zoomStart(_:)))
            view.addGestureRecognizer(self.zoomGesture)
            self.zoomGesture.delegate = self
        }
    }
    
    open func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
        if gestureRecognizer.isKind(of: UIPinchGestureRecognizer.self) {
            beginZoomScale = zoomScale
        }
        
        return true
    }
    
    @objc fileprivate func _zoomStart(_ recognizer: UIPinchGestureRecognizer) {
        guard let view = embeddingView,
              let previewLayer = previewLayer
        else { return }
        
        var allTouchesOnPreviewLayer = true
        let numTouch = recognizer.numberOfTouches
        
        for i in 0 ..< numTouch {
            let location = recognizer.location(ofTouch: i, in: view)
            let convertedTouch = previewLayer.convert(location, from: previewLayer.superlayer)
            if !previewLayer.contains(convertedTouch) {
                allTouchesOnPreviewLayer = false
                break
            }
        }
        if allTouchesOnPreviewLayer {
            _zoom(recognizer.scale)
        }
    }
    
    fileprivate func _zoom(_ scale: CGFloat) {
        let device: AVCaptureDevice?
        
        switch cameraDevice {
            case .back:
                device = backCameraDevice
            case .front:
                device = frontCameraDevice
        }
        
        do {
            let captureDevice = device
            try captureDevice?.lockForConfiguration()
            
            zoomScale = max(1.0, min(beginZoomScale * scale, maxZoomScale))
            
            captureDevice?.videoZoomFactor = zoomScale
            
            captureDevice?.unlockForConfiguration()
            
        } catch {
            print("Error locking configuration")
        }
    }
    
    // MARK: - UIGestureRecognizerDelegate
    
    fileprivate lazy var focusGesture = UITapGestureRecognizer()
    
    fileprivate func attachFocus(_ view: UIView) {
        DispatchQueue.main.async {
            self.focusGesture.addTarget(self, action: #selector(CameraManager._focusStart(_:)))
            view.addGestureRecognizer(self.focusGesture)
            self.focusGesture.delegate = self
        }
    }
    
    fileprivate lazy var exposureGesture = UIPanGestureRecognizer()
    
    fileprivate func attachExposure(_ view: UIView) {
        DispatchQueue.main.async {
            self.exposureGesture.addTarget(self, action: #selector(CameraManager._exposureStart(_:)))
            view.addGestureRecognizer(self.exposureGesture)
            self.exposureGesture.delegate = self
        }
    }
    
    @objc fileprivate func _focusStart(_ recognizer: UITapGestureRecognizer) {
        let device: AVCaptureDevice?
        
        switch cameraDevice {
            case .back:
                device = backCameraDevice
            case .front:
                device = frontCameraDevice
        }
        
        _changeExposureMode(mode: .continuousAutoExposure)
        translationY = 0
        exposureValue = 0.5
        
        if let validDevice = device,
           let validPreviewLayer = previewLayer,
           let view = recognizer.view {
            let pointInPreviewLayer = view.layer.convert(recognizer.location(in: view), to: validPreviewLayer)
            let pointOfInterest = validPreviewLayer.captureDevicePointConverted(fromLayerPoint: pointInPreviewLayer)
            
            do {
                try validDevice.lockForConfiguration()
                
                _showFocusRectangleAtPoint(pointInPreviewLayer, inLayer: validPreviewLayer)
                
                if validDevice.isFocusPointOfInterestSupported {
                    validDevice.focusPointOfInterest = pointOfInterest
                }
                
                if validDevice.isExposurePointOfInterestSupported {
                    validDevice.exposurePointOfInterest = pointOfInterest
                }
                
                if validDevice.isFocusModeSupported(focusMode) {
                    validDevice.focusMode = focusMode
                }
                
                if validDevice.isExposureModeSupported(exposureMode) {
                    validDevice.exposureMode = exposureMode
                }
                
                validDevice.unlockForConfiguration()
            } catch {
                print(error)
            }
        }
    }
    
    fileprivate var lastFocusRectangle: CAShapeLayer?
    fileprivate var lastFocusPoint: CGPoint?
    fileprivate func _showFocusRectangleAtPoint(_ focusPoint: CGPoint, inLayer layer: CALayer, withBrightness brightness: Float? = nil) {
        if let lastFocusRectangle = lastFocusRectangle {
            lastFocusRectangle.removeFromSuperlayer()
            self.lastFocusRectangle = nil
        }
        
        let size = CGSize(width: 75, height: 75)
        let rect = CGRect(origin: CGPoint(x: focusPoint.x - size.width / 2.0, y: focusPoint.y - size.height / 2.0), size: size)
        
        let endPath = UIBezierPath(rect: rect)
        endPath.move(to: CGPoint(x: rect.minX + size.width / 2.0, y: rect.minY))
        endPath.addLine(to: CGPoint(x: rect.minX + size.width / 2.0, y: rect.minY + 5.0))
        endPath.move(to: CGPoint(x: rect.maxX, y: rect.minY + size.height / 2.0))
        endPath.addLine(to: CGPoint(x: rect.maxX - 5.0, y: rect.minY + size.height / 2.0))
        endPath.move(to: CGPoint(x: rect.minX + size.width / 2.0, y: rect.maxY))
        endPath.addLine(to: CGPoint(x: rect.minX + size.width / 2.0, y: rect.maxY - 5.0))
        endPath.move(to: CGPoint(x: rect.minX, y: rect.minY + size.height / 2.0))
        endPath.addLine(to: CGPoint(x: rect.minX + 5.0, y: rect.minY + size.height / 2.0))
        if brightness != nil {
            endPath.move(to: CGPoint(x: rect.minX + size.width + size.width / 4, y: rect.minY))
            endPath.addLine(to: CGPoint(x: rect.minX + size.width + size.width / 4, y: rect.minY + size.height))
            
            endPath.move(to: CGPoint(x: rect.minX + size.width + size.width / 4 - size.width / 16, y: rect.minY + size.height - CGFloat(brightness!) * size.height))
            endPath.addLine(to: CGPoint(x: rect.minX + size.width + size.width / 4 + size.width / 16, y: rect.minY + size.height - CGFloat(brightness!) * size.height))
        }
        
        let startPath = UIBezierPath(cgPath: endPath.cgPath)
        let scaleAroundCenterTransform = CGAffineTransform(translationX: -focusPoint.x, y: -focusPoint.y).concatenating(CGAffineTransform(scaleX: 2.0, y: 2.0).concatenating(CGAffineTransform(translationX: focusPoint.x, y: focusPoint.y)))
        startPath.apply(scaleAroundCenterTransform)
        
        let shapeLayer = CAShapeLayer()
        shapeLayer.path = endPath.cgPath
        shapeLayer.fillColor = UIColor.clear.cgColor
        shapeLayer.strokeColor = UIColor(red: 1, green: 0.83, blue: 0, alpha: 0.95).cgColor
        shapeLayer.lineWidth = 1.0
        
        layer.addSublayer(shapeLayer)
        lastFocusRectangle = shapeLayer
        lastFocusPoint = focusPoint
        
        CATransaction.begin()
        
        CATransaction.setAnimationDuration(0.2)
        CATransaction.setAnimationTimingFunction(CAMediaTimingFunction(name: CAMediaTimingFunctionName.easeOut))
        
        CATransaction.setCompletionBlock {
            if shapeLayer.superlayer != nil {
                shapeLayer.removeFromSuperlayer()
                self.lastFocusRectangle = nil
            }
        }
        if brightness == nil {
            let appearPathAnimation = CABasicAnimation(keyPath: "path")
            appearPathAnimation.fromValue = startPath.cgPath
            appearPathAnimation.toValue = endPath.cgPath
            shapeLayer.add(appearPathAnimation, forKey: "path")
            
            let appearOpacityAnimation = CABasicAnimation(keyPath: "opacity")
            appearOpacityAnimation.fromValue = 0.0
            appearOpacityAnimation.toValue = 1.0
            shapeLayer.add(appearOpacityAnimation, forKey: "opacity")
        }
        
        let disappearOpacityAnimation = CABasicAnimation(keyPath: "opacity")
        disappearOpacityAnimation.fromValue = 1.0
        disappearOpacityAnimation.toValue = 0.0
        disappearOpacityAnimation.beginTime = CACurrentMediaTime() + 0.8
        disappearOpacityAnimation.fillMode = CAMediaTimingFillMode.forwards
        disappearOpacityAnimation.isRemovedOnCompletion = false
        shapeLayer.add(disappearOpacityAnimation, forKey: "opacity")
        
        CATransaction.commit()
    }
    
    var exposureValue: Float = 0.1 // EV
    var translationY: Float = 0
    var startPanPointInPreviewLayer: CGPoint?
    
    let exposureDurationPower: Float = 4.0 // the exposure slider gain
    let exposureMininumDuration: Float64 = 1.0 / 2000.0
    
    @objc fileprivate func _exposureStart(_ gestureRecognizer: UIPanGestureRecognizer) {
        guard gestureRecognizer.view != nil else { return }
        let view = gestureRecognizer.view!
        
        _changeExposureMode(mode: .custom)
        
        let translation = gestureRecognizer.translation(in: view)
        let currentTranslation = translationY + Float(translation.y)
        if gestureRecognizer.state == .ended {
            translationY = currentTranslation
        }
        if currentTranslation < 0 {
            // up - brighter
            exposureValue = 0.5 + min(abs(currentTranslation) / 400, 1) / 2
        } else if currentTranslation >= 0 {
            // down - lower
            exposureValue = 0.5 - min(abs(currentTranslation) / 400, 1) / 2
        }
        _changeExposureDuration(value: exposureValue)
        
        // UI Visualization
        if gestureRecognizer.state == .began {
            if let validPreviewLayer = previewLayer {
                startPanPointInPreviewLayer = view.layer.convert(gestureRecognizer.location(in: view), to: validPreviewLayer)
            }
        }
        
        if let validPreviewLayer = previewLayer, let lastFocusPoint = self.lastFocusPoint {
            _showFocusRectangleAtPoint(lastFocusPoint, inLayer: validPreviewLayer, withBrightness: exposureValue)
        }
    }
    
    // Available modes:
    // .Locked .AutoExpose .ContinuousAutoExposure .Custom
    func _changeExposureMode(mode: AVCaptureDevice.ExposureMode) {
        let device: AVCaptureDevice?
        
        switch cameraDevice {
            case .back:
                device = backCameraDevice
            case .front:
                device = frontCameraDevice
        }
        if device?.exposureMode == mode {
            return
        }
        
        do {
            try device?.lockForConfiguration()
            
            if device?.isExposureModeSupported(mode) == true {
                device?.exposureMode = mode
            }
            device?.unlockForConfiguration()
            
        } catch {
            return
        }
    }
    
    func _changeExposureDuration(value: Float) {
        if cameraIsSetup {
            let device: AVCaptureDevice?
            
            switch cameraDevice {
                case .back:
                    device = backCameraDevice
                case .front:
                    device = frontCameraDevice
            }
            
            guard let videoDevice = device else {
                return
            }
            
            do {
                try videoDevice.lockForConfiguration()
                
                let p = Float64(pow(value, exposureDurationPower)) // Apply power function to expand slider's low-end range
                let minDurationSeconds = Float64(max(CMTimeGetSeconds(videoDevice.activeFormat.minExposureDuration), exposureMininumDuration))
                let maxDurationSeconds = Float64(CMTimeGetSeconds(videoDevice.activeFormat.maxExposureDuration))
                let newDurationSeconds = Float64(p * (maxDurationSeconds - minDurationSeconds)) + minDurationSeconds // Scale from 0-1 slider range to actual duration
                
                if videoDevice.exposureMode == .custom {
                    let newExposureTime = CMTimeMakeWithSeconds(Float64(newDurationSeconds), preferredTimescale: 1000 * 1000 * 1000)
                    videoDevice.setExposureModeCustom(duration: newExposureTime, iso: AVCaptureDevice.currentISO, completionHandler: nil)
                }
                
                videoDevice.unlockForConfiguration()
            } catch {
                return
            }
        }
    }
    
    
    // MARK: - CameraManager()
    fileprivate func _getMovieOutput() -> AVCaptureMovieFileOutput {
        if movieOutput == nil {
            _createMovieOutput()
        }
        
        return movieOutput!
    }
    
    fileprivate func _createMovieOutput() {
        
        let newMovieOutput = AVCaptureMovieFileOutput()
        newMovieOutput.movieFragmentInterval = CMTime.invalid
        
        movieOutput = newMovieOutput
        
        _setupVideoConnection()
    }
    
    fileprivate func _setupVideoConnection() {
        if let movieOutput = movieOutput {
            for connection in movieOutput.connections {
                for port in connection.inputPorts {
                    if port.mediaType == AVMediaType.video {
                        let videoConnection = connection as AVCaptureConnection
                        // setup video mirroring
                        if videoConnection.isVideoMirroringSupported {
                            videoConnection.isVideoMirrored = (cameraDevice == CameraDevice.front && shouldFlipFrontCameraImage)
                        }
                        
                        if videoConnection.isVideoStabilizationSupported {
                            videoConnection.preferredVideoStabilizationMode = videoStabilisationMode
                        }
                    }
                }
            }
        }
    }
    
    fileprivate func _getStillImageOutput() -> AVCaptureStillImageOutput {
        if let stillImageOutput = stillImageOutput, let connection = stillImageOutput.connection(with: AVMediaType.video),
           connection.isActive {
            return stillImageOutput
        }
        let newStillImageOutput = AVCaptureStillImageOutput()
        stillImageOutput = newStillImageOutput
        if let captureSession = captureSession, captureSession.canAddOutput(newStillImageOutput) {
            captureSession.beginConfiguration()
            captureSession.addOutput(newStillImageOutput)
            captureSession.commitConfiguration()
        }
        return newStillImageOutput
    }
    
    
    @objc fileprivate func _orientationChanged() {
        for outputModel in cameraOutputModes {
            var currentConnection: AVCaptureConnection?
            switch outputModel {
                case .stillImage:
                    currentConnection = stillImageOutput?.connection(with: AVMediaType.video)
                case .videoOnly, .videoWithMic:
                    currentConnection = _getMovieOutput().connection(with: AVMediaType.video)
                case .videoData:
                    currentConnection = _getVideoDataOutput().connection(with: AVMediaType.video)
            }
            
            if let validPreviewLayer = previewLayer {
                if !shouldKeepViewAtOrientationChanges {
                    if let validPreviewLayerConnection = validPreviewLayer.connection,
                       validPreviewLayerConnection.isVideoOrientationSupported {
                        validPreviewLayerConnection.videoOrientation = _currentPreviewVideoOrientation()
                    }
                }
                if let validOutputLayerConnection = currentConnection,
                   validOutputLayerConnection.isVideoOrientationSupported {
                    validOutputLayerConnection.videoOrientation = _currentCaptureVideoOrientation()
                }
                if !shouldKeepViewAtOrientationChanges {
                    DispatchQueue.main.async { () -> Void in
                        if let validEmbeddingView = self.embeddingView {
                            validPreviewLayer.frame = validEmbeddingView.bounds
                        }
                    }
                }
            }
        }
    }
    
    fileprivate func _currentCaptureVideoOrientation() -> AVCaptureVideoOrientation {
        if deviceOrientation == .faceDown
            || deviceOrientation == .faceUp
            || deviceOrientation == .unknown {
            return _currentPreviewVideoOrientation()
        }
        
        return _videoOrientation(forDeviceOrientation: deviceOrientation)
    }
    
    fileprivate func _currentPreviewDeviceOrientation() -> UIDeviceOrientation {
        if shouldKeepViewAtOrientationChanges {
            return .portrait
        }
        
        return UIDevice.current.orientation
    }
    
    fileprivate func _currentPreviewVideoOrientation() -> AVCaptureVideoOrientation {
        let orientation = _currentPreviewDeviceOrientation()
        return _videoOrientation(forDeviceOrientation: orientation)
    }
    
    open func resetOrientation() {
        // Main purpose is to reset the preview layer orientation.  Problems occur if you are recording landscape, present a modal VC,
        // then turn portriat to dismiss.  The preview view is then stuck in a prior orientation and not redrawn.  Calling this function
        // will then update the orientation of the preview layer.
        _orientationChanged()
    }
    
    fileprivate func _videoOrientation(forDeviceOrientation deviceOrientation: UIDeviceOrientation) -> AVCaptureVideoOrientation {
        switch deviceOrientation {
            case .landscapeLeft:
                return .landscapeRight
            case .landscapeRight:
                return .landscapeLeft
            case .portraitUpsideDown:
                return .portraitUpsideDown
            case .faceUp:
                /*
                 Attempt to keep the existing orientation.  If the device was landscape, then face up
                 getting the orientation from the stats bar would fail every other time forcing it
                 to default to portrait which would introduce flicker into the preview layer.  This
                 would not happen if it was in portrait then face up
                 */
                if let validPreviewLayer = previewLayer, let connection = validPreviewLayer.connection {
                    return connection.videoOrientation // Keep the existing orientation
                }
                // Could not get existing orientation, try to get it from stats bar
                return _videoOrientationFromStatusBarOrientation()
            case .faceDown:
                /*
                 Attempt to keep the existing orientation.  If the device was landscape, then face down
                 getting the orientation from the stats bar would fail every other time forcing it
                 to default to portrait which would introduce flicker into the preview layer.  This
                 would not happen if it was in portrait then face down
                 */
                if let validPreviewLayer = previewLayer, let connection = validPreviewLayer.connection {
                    return connection.videoOrientation // Keep the existing orientation
                }
                // Could not get existing orientation, try to get it from stats bar
                return _videoOrientationFromStatusBarOrientation()
            default:
                return .portrait
        }
    }
    
    fileprivate func _videoOrientationFromStatusBarOrientation() -> AVCaptureVideoOrientation {
        // 由于 statusBarOrientation 已被弃用，我们需要一个更可靠的方法来获取界面方向
        
        // 在主线程上执行
        if !Thread.isMainThread {
            var orientation: AVCaptureVideoOrientation = .portrait
            DispatchQueue.main.sync {
                orientation = self._videoOrientationFromStatusBarOrientation()
            }
            return orientation
        }
        
        // 获取当前窗口的方向（iOS 13+）
        if #available(iOS 13.0, *) {
            if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
                let interfaceOrientation = windowScene.interfaceOrientation
                
                switch interfaceOrientation {
                case .landscapeLeft:
                    return .landscapeLeft
                case .landscapeRight:
                    return .landscapeRight
                case .portrait:
                    return .portrait
                case .portraitUpsideDown:
                    return .portraitUpsideDown
                default:
                    return .portrait
                }
            }
        }
        
        // 回退到设备方向（如果无法获取窗口方向）
        let deviceOrientation = UIDevice.current.orientation
        switch deviceOrientation {
        case .landscapeLeft:
            return .landscapeRight  // 注意：设备方向和视频方向是相反的
        case .landscapeRight:
            return .landscapeLeft   // 注意：设备方向和视频方向是相反的
        case .portraitUpsideDown:
            return .portraitUpsideDown
        case .portrait, .faceUp, .faceDown:
            return .portrait
        default:
            return .portrait
        }
    }
    
    fileprivate func fixOrientation(withImage image: UIImage) -> UIImage {
        guard let cgImage = image.cgImage else { return image }
        
        var isMirrored = false
        let orientation = image.imageOrientation
        if orientation == .rightMirrored
            || orientation == .leftMirrored
            || orientation == .upMirrored
            || orientation == .downMirrored {
            isMirrored = true
        }
        
        let newOrientation = _imageOrientation(forDeviceOrientation: deviceOrientation, isMirrored: isMirrored)
        
        if image.imageOrientation != newOrientation {
            return UIImage(cgImage: cgImage, scale: image.scale, orientation: newOrientation)
        }
        
        return image
    }
    
    
    @discardableResult fileprivate func _getVideoDataOutput() -> AVCaptureVideoDataOutput {
        if videoDataOutput == nil {
            self.videoDataOutput = AVCaptureVideoDataOutput()
            // 检查支持的像素格式
            let availableFormats = videoDataOutput!.availableVideoPixelFormatTypes
            var selectedFormat: OSType?
            for format in availableFormats {
                if format == kCVPixelFormatType_32BGRA {
                    selectedFormat = format
                    break
                }
            }
            
            if selectedFormat == nil {
                for format in availableFormats {
                    if format == kCVPixelFormatType_32RGBA {
                        selectedFormat = format
                        break
                    }
                }
            }
            
            // 如果没有合适的 RGB 格式，使用默认格式并提示
            if selectedFormat == nil, let firstFormat = availableFormats.last {
                selectedFormat = firstFormat
            }
            
            
            if let pixelFormat = selectedFormat {
                videoDataOutput?.videoSettings = [
                    kCVPixelBufferPixelFormatTypeKey as String : pixelFormat
                ]
            }
            
            videoDataOutput?.alwaysDiscardsLateVideoFrames = true
            
            return videoDataOutput!
        }
        
        return videoDataOutput!
    }
    
    
    fileprivate func _canLoadCamera() -> Bool {
        let currentCameraState = _checkIfCameraIsAvailable()
        return currentCameraState == .ready || (currentCameraState == .notDetermined && showAccessPermissionPopupAutomatically)
    }
    
    
    fileprivate func _setupCamera(_ completion: @escaping () -> Void) {
        captureSession = AVCaptureSession()
        
        NotificationCenter.default.removeObserver(self)
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(captureSessionDidStopRunning(_:)),
            name: .AVCaptureSessionDidStopRunning,
            object: captureSession
        )
        
        sessionQueue.async {
            if let validCaptureSession = self.captureSession {
                validCaptureSession.beginConfiguration()
                validCaptureSession.sessionPreset = AVCaptureSession.Preset.low
                self._setupInputs(self.captureSession, self.cameraDevice)
                self._setupOutputs()
                self._setupOutputMode(self.cameraOutputModes, oldCameraOutputModes: nil)
                self._setupPreviewLayer()
                validCaptureSession.commitConfiguration()
                self._updateIlluminationMode(self.flashMode)
                self._updateCameraQualityMode(self.cameraOutputQuality)
                validCaptureSession.startRunning()
                self._setupMaxZoomScale()
                
                // 直接调用，方法内部会确保在主线程上执行
                self._startFollowingDeviceOrientation()
                
                DispatchQueue.main.async {
                    self.cameraIsSetup = true
                    self._orientationChanged()
                    completion()
                }
            }
        }
    }
    
    fileprivate func _startFollowingDeviceOrientation() {
        // 确保在主线程上执行设备方向通知的注册
        if Thread.isMainThread {
            UIDevice.current.beginGeneratingDeviceOrientationNotifications()
            observer = NotificationCenter.default.addObserver(
                forName: UIDevice.orientationDidChangeNotification,
                object: nil,
                queue: .main
            ) { [weak self] _ in
                guard let self = self else { return }
                self._orientationChanged()
            }
        } else {
            DispatchQueue.main.async { [weak self] in
                guard let self = self else { return }
                self._startFollowingDeviceOrientation()
            }
        }
    }
    
    // 添加一个内部方法，直接执行停止操作
    fileprivate func _stopFollowingDeviceOrientationInternal() {
        if Thread.isMainThread {
            UIDevice.current.endGeneratingDeviceOrientationNotifications()
            if let observer = observer {
                NotificationCenter.default.removeObserver(observer)
            }
            observer = nil
        } else {
            DispatchQueue.main.sync {
                UIDevice.current.endGeneratingDeviceOrientationNotifications()
                if let observer = observer {
                    NotificationCenter.default.removeObserver(observer)
                }
                observer = nil
            }
        }
    }

    // 保留原方法，但改为调用内部实现
    fileprivate func _stopFollowingDeviceOrientation() {
        _stopFollowingDeviceOrientationInternal()
    }
    
    fileprivate func _addPreviewLayerToView(_ view: UIView) {
        embeddingView = view
//        attachZoom(view)
//        attachFocus(view)
//        attachExposure(view)
        
        DispatchQueue.main.async { () -> Void in
            guard let previewLayer = self.previewLayer else { return }
            previewLayer.frame = view.layer.bounds
            view.clipsToBounds = true
            view.layer.addSublayer(previewLayer)
        }
    }
    
    fileprivate func _setupMaxZoomScale() {
        var maxZoom = CGFloat(1.0)
        beginZoomScale = CGFloat(1.0)
        
        if cameraDevice == .back, let backCameraDevice = backCameraDevice {
            maxZoom = backCameraDevice.activeFormat.videoMaxZoomFactor
        } else if cameraDevice == .front, let frontCameraDevice = frontCameraDevice {
            maxZoom = frontCameraDevice.activeFormat.videoMaxZoomFactor
        }
        
        maxZoomScale = maxZoom
    }
    
    fileprivate func _checkIfCameraIsAvailable() -> CameraState {
        let deviceHasCamera = UIImagePickerController.isCameraDeviceAvailable(UIImagePickerController.CameraDevice.rear) || UIImagePickerController.isCameraDeviceAvailable(UIImagePickerController.CameraDevice.front)
        if deviceHasCamera {
            let authorizationStatus = AVCaptureDevice.authorizationStatus(for: AVMediaType.video)
            let userAgreedToUseIt = authorizationStatus == .authorized
            if userAgreedToUseIt {
                return .ready
            } else if authorizationStatus == AVAuthorizationStatus.notDetermined {
                return .notDetermined
            } else {
                _show(NSLocalizedString("Camera access denied", comment: ""), message: NSLocalizedString("You need to go to settings app and grant acces to the camera device to use it.", comment: ""))
                return .accessDenied
            }
        } else {
            _show(NSLocalizedString("Camera unavailable", comment: ""), message: NSLocalizedString("The device does not have a camera.", comment: ""))
            return .noDeviceFound
        }
    }
    
    fileprivate func _setupOutputMode(_ newCameraOutputModes: [CameraOutputMode], oldCameraOutputModes: [CameraOutputMode]?) {
        var sessionOutputModes:[CameraOutputMode] = []
        if let sessionOutputs = self.captureSession?.outputs {
            for sessionOutput in sessionOutputs {
                if sessionOutput is AVCaptureStillImageOutput {
                    sessionOutputModes.append(.stillImage)
                } else if sessionOutput is AVCaptureMovieFileOutput {
                    let hasMicrophone = self.captureSession?.inputs.contains { input in
                        if let deviceInput = input as? AVCaptureDeviceInput {
                            return deviceInput.device.hasMediaType(.audio)
                        }
                        return false
                    }
                    if let hasMicrophone = hasMicrophone, hasMicrophone {
                        sessionOutputModes.append(.videoWithMic)
                    } else {
                        sessionOutputModes.append(.videoOnly)
                    }
                } else if sessionOutput is AVCaptureVideoDataOutput {
                    sessionOutputModes.append(.videoData)
                }
            }
        }
        
        let needRemoveModes = sessionOutputModes.filter({ mode in
            return !newCameraOutputModes.contains(mode)
        })
        
        let needAddModes = newCameraOutputModes.filter { mode in
            return !sessionOutputModes.contains(mode)
        }
        
        captureSession?.beginConfiguration()
        for removeCameraOutputMode in needRemoveModes {
            switch removeCameraOutputMode {
                case .stillImage:
                    if let validStillImageOutput = stillImageOutput {
                        captureSession?.removeOutput(validStillImageOutput)
                    }
                case .videoOnly, .videoWithMic:
                    if let validMovieOutput = movieOutput {
                        captureSession?.removeOutput(validMovieOutput)
                    }
                    if removeCameraOutputMode == .videoWithMic {
                        _removeMicInput()
                    }
                case .videoData:
                    //如果现在是扫描或者捕捉帧数据，二者其一都不能删除output
                    if let validVideoDataOutput = videoDataOutput, !captureFrameStatus, !analysisStatus {
//                        validVideoDataOutput.setSampleBufferDelegate(nil, queue: sessionQueue)
                        captureSession?.removeOutput(validVideoDataOutput)
                    }
            }
        }
        
        _setupOutputs()
        
        for newCameraOutputMode in needAddModes {
            switch newCameraOutputMode {
                case .stillImage:
                    let validStillImageOutput = _getStillImageOutput()
                    if let captureSession = captureSession, captureSession.canAddOutput(validStillImageOutput) {
                        captureSession.addOutput(validStillImageOutput)
                    }
                case .videoOnly, .videoWithMic:
                    let videoMovieOutput = _getMovieOutput()
                    if let captureSession = captureSession, captureSession.canAddOutput(videoMovieOutput) {
                        captureSession.addOutput(videoMovieOutput)
                    }
                    
                    if newCameraOutputMode == .videoWithMic, let validMic = _deviceInputFromDevice(mic) {
                        captureSession?.addInput(validMic)
                    }
                case .videoData:
                    let videoDataOutput = _getVideoDataOutput()
                    if let captureSession = captureSession, captureSession.canAddOutput(videoDataOutput) {
//                        videoDataOutput.setSampleBufferDelegate(self, queue: sessionQueue)
                        captureSession.addOutput(videoDataOutput)
                    }
            }
        }

        captureSession?.commitConfiguration()
        
        _updateCameraQualityMode(cameraOutputQuality)
       _orientationChanged()
    }
    
    fileprivate func _setupOutputs() {
        if stillImageOutput == nil {
            stillImageOutput = AVCaptureStillImageOutput()
        }
        if movieOutput == nil {
            movieOutput = _getMovieOutput()
        }
        if videoDataOutput == nil {
            videoDataOutput = _getVideoDataOutput()
        }
    }
    
    fileprivate func _setupPreviewLayer() {
        if let validCaptureSession = captureSession {
            previewLayer = AVCaptureVideoPreviewLayer(session: validCaptureSession)
            previewLayer?.videoGravity = AVLayerVideoGravity.resizeAspectFill
        }
    }
    
    /**
     Switches between the current and specified camera using a flip animation similar to the one used in the iOS stock camera app.
     */
    
    fileprivate var cameraTransitionView: UIView?
    fileprivate var transitionAnimating = false
    
    open func _doFlipAnimation() {
        if transitionAnimating {
            return
        }
        
        if let validEmbeddingView = embeddingView,
           let validPreviewLayer = previewLayer {
            var tempView = UIView()
            
            if CameraManager._blurSupported() {
                let blurEffect = UIBlurEffect(style: .light)
                tempView = UIVisualEffectView(effect: blurEffect)
                tempView.frame = validEmbeddingView.bounds
            } else {
                tempView = UIView(frame: validEmbeddingView.bounds)
                tempView.backgroundColor = UIColor(white: 0.0, alpha: 0.5)
            }
            
            validEmbeddingView.insertSubview(tempView, at: Int(validPreviewLayer.zPosition + 1))
            
            cameraTransitionView = validEmbeddingView.snapshotView(afterScreenUpdates: true)
            
            if let cameraTransitionView = cameraTransitionView {
                validEmbeddingView.insertSubview(cameraTransitionView, at: Int(validEmbeddingView.layer.zPosition + 1))
            }
            tempView.removeFromSuperview()
            
            transitionAnimating = true
            
            validPreviewLayer.opacity = 0.0
            
            DispatchQueue.main.async {
                self._flipCameraTransitionView()
            }
        }
    }
    
    // Determining whether the current device actually supports blurring
    // As seen on: http://stackoverflow.com/a/29997626/2269387
    fileprivate class func _blurSupported() -> Bool {
        var supported = Set<String>()
        supported.insert("iPad")
        supported.insert("iPad1,1")
        supported.insert("iPhone1,1")
        supported.insert("iPhone1,2")
        supported.insert("iPhone2,1")
        supported.insert("iPhone3,1")
        supported.insert("iPhone3,2")
        supported.insert("iPhone3,3")
        supported.insert("iPod1,1")
        supported.insert("iPod2,1")
        supported.insert("iPod2,2")
        supported.insert("iPod3,1")
        supported.insert("iPod4,1")
        supported.insert("iPad2,1")
        supported.insert("iPad2,2")
        supported.insert("iPad2,3")
        supported.insert("iPad2,4")
        supported.insert("iPad3,1")
        supported.insert("iPad3,2")
        supported.insert("iPad3,3")
        
        return !supported.contains(_hardwareString())
    }
    
    fileprivate class func _hardwareString() -> String {
        var sysinfo = utsname()
        uname(&sysinfo)
        guard let deviceName = String(bytes: Data(bytes: &sysinfo.machine, count: Int(_SYS_NAMELEN)), encoding: .ascii)?.trimmingCharacters(in: .controlCharacters) else {
            return ""
        }
        return deviceName
    }
    
    fileprivate func _flipCameraTransitionView() {
        if let cameraTransitionView = cameraTransitionView {
            UIView.transition(with: cameraTransitionView,
                              duration: 0.5,
                              options: UIView.AnimationOptions.transitionFlipFromLeft,
                              animations: nil,
                              completion: { (_) -> Void in
                self._removeCameraTransistionView()
            })
        }
    }
    
    fileprivate func _removeCameraTransistionView() {
        if let cameraTransitionView = cameraTransitionView {
            if let validPreviewLayer = previewLayer {
                validPreviewLayer.opacity = 1.0
            }
            
            UIView.animate(withDuration: 0.5,
                           animations: { () -> Void in
                
                cameraTransitionView.alpha = 0.0
                
            }, completion: { (_) -> Void in
                
                self.transitionAnimating = false
                
                cameraTransitionView.removeFromSuperview()
                self.cameraTransitionView = nil
            })
        }
    }
    
    fileprivate func _setupInputs(_ captureSession: AVCaptureSession?, _: CameraDevice) {
        if let validCaptureSession = captureSession {
            validCaptureSession.beginConfiguration()
            defer { validCaptureSession.commitConfiguration() }
            let inputs: [AVCaptureInput] = validCaptureSession.inputs
            
            for input in inputs {
                if let deviceInput = input as? AVCaptureDeviceInput, deviceInput.device != mic {
                    validCaptureSession.removeInput(deviceInput)
                }
            }
            
            switch cameraDevice {
                case .front:
                    if hasFrontCamera {
                        if let validFrontDeviceInput = _deviceInputFromDevice(frontCameraDevice),
                           !inputs.contains(validFrontDeviceInput), validCaptureSession.canAddInput(validFrontDeviceInput) {
                            validCaptureSession.addInput(validFrontDeviceInput)
                        }
                    }
                case .back:
                    if let validBackDeviceInput = _deviceInputFromDevice(backCameraDevice),
                       !inputs.contains(validBackDeviceInput), validCaptureSession.canAddInput(validBackDeviceInput) {
                        validCaptureSession.addInput(validBackDeviceInput)
                    }
            }
        }
    }
    
    fileprivate func _updateIlluminationMode(_ mode: CameraFlashMode) {
        switch flashMode {
            case .off:
                _updateFlash(.off)
                _updateTorch(false)
            case .on:
                _updateFlash(.on)
                _updateTorch(false)
            case .auto:
                _updateFlash(.auto)
                _updateTorch(false)
            case .torch:
                _updateFlash(.off)
                _updateTorch(true)
        }
    }
    
    fileprivate func _updateTorch(_ isTorch: Bool) {
        captureSession?.beginConfiguration()
        defer { captureSession?.commitConfiguration() }
        for captureDevice in AVCaptureDevice.videoDevices {
            var torchMode = AVCaptureDevice.TorchMode.auto
            if isTorch {
                torchMode = .on
            } else {
                torchMode = .off
            }
            if captureDevice.isTorchModeSupported(torchMode), cameraDevice == .back {
                do {
                    try captureDevice.lockForConfiguration()
                    captureDevice.torchMode = torchMode
                    captureDevice.unlockForConfiguration()
                    
                } catch {
                    return
                }
            }
        }
    }
    
    fileprivate func _updateFlash(_ flashMode: CameraFlashMode) {
        captureSession?.beginConfiguration()
        defer { captureSession?.commitConfiguration() }
        for captureDevice in AVCaptureDevice.videoDevices {
            guard let avFlashMode = AVCaptureDevice.FlashMode(rawValue: flashMode.rawValue) else { continue }
            if captureDevice.isFlashModeSupported(avFlashMode) {
                do {
                    try captureDevice.lockForConfiguration()
                    captureDevice.flashMode = avFlashMode
                    captureDevice.unlockForConfiguration()
                } catch {
                    return
                }
            }
        }
    }
    
    fileprivate func _performShutterAnimation(_ completion: (() -> Void)?) {
        if let validPreviewLayer = previewLayer {
            DispatchQueue.main.async {
                let duration = 0.1
                
                CATransaction.begin()
                
                if let completion = completion {
                    CATransaction.setCompletionBlock(completion)
                }
                
                let fadeOutAnimation = CABasicAnimation(keyPath: "opacity")
                fadeOutAnimation.fromValue = 1.0
                fadeOutAnimation.toValue = 0.0
                validPreviewLayer.add(fadeOutAnimation, forKey: "opacity")
                
                let fadeInAnimation = CABasicAnimation(keyPath: "opacity")
                fadeInAnimation.fromValue = 0.0
                fadeInAnimation.toValue = 1.0
                fadeInAnimation.beginTime = CACurrentMediaTime() + duration * 2.0
                validPreviewLayer.add(fadeInAnimation, forKey: "opacity")
                
                CATransaction.commit()
            }
        }
    }
    
    fileprivate func _updateCameraQualityMode(_ newCameraOutputQuality: AVCaptureSession.Preset) {
        if let validCaptureSession = captureSession {
            var sessionPreset = newCameraOutputQuality
            if newCameraOutputQuality == .high {
                //                if cameraOutputModes == .stillImage {
                //                    sessionPreset = AVCaptureSession.Preset.photo
                //                } else {
                //
                //                }
                sessionPreset = AVCaptureSession.Preset.high
            }
            
            if validCaptureSession.canSetSessionPreset(sessionPreset) {
                validCaptureSession.beginConfiguration()
                validCaptureSession.sessionPreset = sessionPreset
                validCaptureSession.commitConfiguration()
            } else {
                _show(NSLocalizedString("Preset not supported", comment: ""), message: NSLocalizedString("Camera preset not supported. Please try another one.", comment: ""))
            }
        } else {
            _show(NSLocalizedString("Camera error", comment: ""), message: NSLocalizedString("No valid capture session found, I can't take any pictures or videos.", comment: ""))
        }
    }
    
    fileprivate func _removeMicInput() {
        guard let inputs = captureSession?.inputs else { return }
        
        for input in inputs {
            if let deviceInput = input as? AVCaptureDeviceInput,
               deviceInput.device == mic {
                captureSession?.removeInput(deviceInput)
                break
            }
        }
    }
    
    fileprivate func _show(_ title: String, message: String) {
        DispatchQueue.main.async { () -> Void in
            self.showErrorBlock(title, message)
        }
    }
    
    fileprivate func _deviceInputFromDevice(_ device: AVCaptureDevice?) -> AVCaptureDeviceInput? {
        guard let validDevice = device else { return nil }
        do {
            return try AVCaptureDeviceInput(device: validDevice)
        } catch let outError {
            _show(NSLocalizedString("Device setup error occured", comment: ""), message: "\(outError)")
            return nil
        }
    }
}

private extension AVCaptureDevice {
    static var videoDevices: [AVCaptureDevice] {
        return AVCaptureDevice.devices(for: AVMediaType.video)
    }
}

extension CameraManager: AVCaptureMetadataOutputObjectsDelegate {
    /**
     Called when a QR code is detected.
     */
    public func metadataOutput(_: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from _: AVCaptureConnection) {
        
    }
}


extension CameraManager: AVCaptureVideoDataOutputSampleBufferDelegate {
    public func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, from connection: AVCaptureConnection) {
        if captureFrameStatus {
            guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else {
                return
            }
            let width = CVPixelBufferGetWidth(pixelBuffer)
            let height = CVPixelBufferGetHeight(pixelBuffer)
            let data = convertImageBufferToRGBA(pixelBuffer)
            self.cameraFrameCallback?(width, height, data ?? Data())
        }
        if analysisStatus {
            cameraOriginalFrameCallback?("original_frame", sampleBuffer)
            //            // 获取当前相机位置作为字符串
            //            let devicePositionStr: String = cameraDevice == .front ? "front" : "back"
            //
            //            // 调用扫码处理，传递字符串类型的相机位置
            //            Scanner.processScanBarCode(sampleBuffer, [], false, 375, 667, nil, devicePositionStr)
        }
    }
    
    fileprivate func convertImageBufferToRGBA(_ imageBuffer: CVImageBuffer) -> Data? {
        // 锁定图像缓冲区的基地址
        CVPixelBufferLockBaseAddress(imageBuffer, .readOnly)
        
        // 创建 CIImage
        let ciImage = CIImage(cvPixelBuffer: imageBuffer)
        
        // 创建 CIContext
        // let context = CIContext()
        
        // 创建 CGImage
        guard let cgImage = sharedCIContext.createCGImage(ciImage, from: ciImage.extent) else {
            CVPixelBufferUnlockBaseAddress(imageBuffer, .readOnly)
            return nil
        }
        
        // 获取图像的宽度和高度
        let width = cgImage.width
        let height = cgImage.height
        
        // 创建一个字节数组来存储 RGBA 数据
        let bytesPerPixel = 4
        let bytesPerRow = bytesPerPixel * width
        let totalBytes = height * bytesPerRow
        var rgbaData = Data(count: totalBytes)
        
        // 创建一个颜色空间
        let colorSpace = CGColorSpaceCreateDeviceRGB()
        
        // 创建一个位图上下文
        rgbaData.withUnsafeMutableBytes { ptr in
            guard let context = CGContext(data: ptr.baseAddress,
                                          width: width,
                                          height: height,
                                          bitsPerComponent: 8,
                                          bytesPerRow: bytesPerRow,
                                          space: colorSpace,
                                          bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue | CGBitmapInfo.byteOrder32Big.rawValue) else {
                CVPixelBufferUnlockBaseAddress(imageBuffer, .readOnly)
                return
            }
            
            // 将 CGImage 绘制到位图上下文中
            context.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))
        }
        
        // 解锁图像缓冲区的基地址
        CVPixelBufferUnlockBaseAddress(imageBuffer, .readOnly)
        
        return rgbaData
    }
    
    //    func saveRGBADataAsImage(_ rgbaData: Data, width: Int, height: Int, to url: URL) -> Bool {
    //        // 创建一个颜色空间
    //        let colorSpace = CGColorSpaceCreateDeviceRGB()
    //
    //        // 创建一个位图上下文
    //        guard let context = CGContext(data: UnsafeMutableRawPointer(mutating: (rgbaData as NSData).bytes),
    //                                      width: width,
    //                                      height: height,
    //                                      bitsPerComponent: 8,
    //                                      bytesPerRow: 4 * width,
    //                                      space: colorSpace,
    //                                      bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else {
    //            return false
    //        }
    //
    //        // 创建 CGImage
    //        guard let cgImage = context.makeImage() else {
    //            return false
    //        }
    //
    //        // 创建 UIImage
    //        let image = UIImage(cgImage: cgImage)
    //
    //        guard let imageData = image.jpegData(compressionQuality: 1.0) else {
    //            return false
    //        }
    //
    //        do {
    //            try imageData.write(to: url)
    //            return true
    //        } catch {
    //            return false
    //        }
    //    }
    
    // vimage只有iOS13才支持，换方案
    
    //    func convertBGRAToRGBAUsingVImage(_ pixelBuffer: CVPixelBuffer) -> [UInt8]? {
    //        // 锁定 CVPixelBuffer
    //        CVPixelBufferLockBaseAddress(pixelBuffer, .readOnly)
    //        defer { CVPixelBufferUnlockBaseAddress(pixelBuffer, .readOnly) }
    //
    //        // 获取 CVPixelBuffer 的属性
    //        guard let baseAddress = CVPixelBufferGetBaseAddress(pixelBuffer) else {
    //            print("无法获取基地址")
    //            return nil
    //        }
    //
    //        let width = CVPixelBufferGetWidth(pixelBuffer)
    //        let height = CVPixelBufferGetHeight(pixelBuffer)
    //        let bytesPerRow = CVPixelBufferGetBytesPerRow(pixelBuffer)
    //
    //        // 创建源 vImage_Buffer
    //        var sourceBuffer = vImage_Buffer(
    //            data: baseAddress,
    //            height: vImagePixelCount(height),
    //            width: vImagePixelCount(width),
    //            rowBytes: bytesPerRow
    //        )
    //
    //        // 创建目标 vImage_Buffer
    //        var destinationBuffer = vImage_Buffer()
    //        let status = vImageBuffer_Init(
    //            &destinationBuffer,
    //            vImagePixelCount(height),
    //            vImagePixelCount(width),
    //            32, // 32 位 RGBA
    //            vImage_Flags(kvImageNoFlags)
    //        )
    //
    //        guard status == kvImageNoError else {
    //            print("无法初始化目标缓冲区")
    //            return nil
    //        }
    //
    //        // 定义通道映射（将 BGRA 转换为 RGBA）
    //        let permuteMap: [UInt8] = [2, 1, 0, 3] // 将 BGR 通道重新排列为 RGB，Alpha 通道保持不变
    //
    //        // 执行通道重排
    //        let error = vImagePermuteChannels_ARGB8888(
    //            &sourceBuffer,
    //            &destinationBuffer,
    //            permuteMap,
    //            vImage_Flags(kvImageNoFlags)
    //        )
    //
    //        guard error == kvImageNoError else {
    //            print("通道重排失败")
    //            return nil
    //        }
    //
    //        // 将目标缓冲区数据复制到数组中
    //        let rgbaData = [UInt8](repeating: 0, count: width * height * 4)
    //        memcpy(UnsafeMutableRawPointer(mutating: rgbaData), destinationBuffer.data, width * height * 4)
    //        return rgbaData
    //    }
    
    //    func savePixelBufferToFile(_ pixelBuffer: CVPixelBuffer, fileName: String) -> String? {
    //        let ciImage = CIImage(cvPixelBuffer: pixelBuffer)
    //        let uiImage = UIImage(ciImage: ciImage)
    //
    //        if let data = uiImage.pngData() {
    //            let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    //            let fileURL = documentsDirectory.appendingPathComponent(fileName)
    //            do {
    //                try data.write(to: fileURL)
    //                print("Saved compressed image to: \(fileURL.path)")
    //                return fileURL.path
    //            } catch {
    //                print("Failed to save image: \(error.localizedDescription)")
    //                return nil
    //            }
    //
    //        }
    //        return nil
    //    }
    
    //    fileprivate func getPicturePath() -> URL? {
    //        guard let cacheDirectory = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first else { return nil }
    //        let folderUrl = cacheDirectory.appendingPathComponent("camera/photo")
    //        do {
    //            if !FileManager.default.fileExists(atPath: folderUrl.path) {
    //                try FileManager.default.createDirectory(atPath: folderUrl.path, withIntermediateDirectories: true, attributes: nil)
    //            }
    //            let fileName = "\("Pic_")\(Date().timeIntervalSince1970).jpg"
    //            return folderUrl.appendingPathComponent(fileName)
    //        } catch {
    //            return nil
    //        }
    //    }
    
    //    func getSampleBufferSize(_ sampleBuffer: CMSampleBuffer) -> Int? {
    //        // 获取 CVPixelBuffer
    //        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else {
    //            print("Failed to get pixel buffer")
    //            return nil
    //        }
    //
    //        // 获取宽度和高度
    //        let width = CVPixelBufferGetWidth(pixelBuffer)
    //        let height = CVPixelBufferGetHeight(pixelBuffer)
    //
    //        // 获取每行字节数（考虑对齐）
    //        let bytesPerRow = CVPixelBufferGetBytesPerRow(pixelBuffer)
    //
    //        // 计算总字节数
    //        let totalBytes = bytesPerRow * height
    //
    //        //        print("Width: \(width), Height: \(height), BytesPerRow: \(bytesPerRow), TotalBytes: \(totalBytes)")
    //        return totalBytes
    //    }
}

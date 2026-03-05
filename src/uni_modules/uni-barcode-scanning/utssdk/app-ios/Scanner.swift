//
//  ScanCode.swift
//  UniCamera
//
//  Created by dcloud-thb on 2025/3/13.
//

import CoreMedia
import CoreImage
import UIKit
@_implementationOnly import MLKit
import AVFoundation

class AtomicBoolean {
    private var value: Bool
    private let queue = DispatchQueue(label: "io.dcloud.scanner.atomicBoolean")
    
    init(_ initialValue: Bool) {
        self.value = initialValue
    }
    
    func get() -> Bool {
        return queue.sync {
            value
        }
    }
    
    func set(_ newValue: Bool) {
        queue.sync {
            value = newValue
        }
    }
    
    func compareAndSet(_ expected: Bool, _ newValue: Bool) -> Bool {
        return queue.sync {
            if value == expected {
                value = newValue
                return true
            }
            return false
        }
    }
}

protocol ScannerCallback {
    func onScanSuccess(_ barcodeInformation: [IosBarcodeInformation], _ screenShot: ScreenShot?)
    func onScanFailure(_ error: String)
    func needZoom()
    func onLight(_ light: Bool)
}


class IosBarcodeInformation: CustomStringConvertible {
    var result: String
    var scanType: String
    var charset: String
    var rawData: String
    var scanArea: [Int]
    
    init(result: String, scanType: String, charset: String, rawData: String, scanArea: [Int]) {
        self.result = result
        self.scanType = scanType
        self.charset = charset
        self.rawData = rawData
        self.scanArea = scanArea
    }
    
    var description: String {
        return "BarcodeInformation(result='\(result)', scanType='\(scanType)', charset='\(charset)', rawData='\(rawData)', scanArea=\(scanArea))"
    }
}

class ScreenShot: CustomStringConvertible {
    var image: UIImage
    
    init(image: UIImage) {
        self.image = image
    }
    
    var description: String {
        return "ScreenShot(image=\(image))"
    }
}



class Scanner {
    private static let isProcessing = AtomicBoolean(false) // 控制帧率
    private static var lastAnalysisTime = 0 // 时间戳限制
    private static var lastImageSaveTime: Date?

    static func processScanBarCode(_ sampleBuffer: CMSampleBuffer, _ scanType: [String], _ autoZoom: Bool, _ width: Int, _ height: Int, _ scannerCallback: ScannerCallback?, _ devicePosition: String = "back") {
        let currentTime = Int(Date().timeIntervalSince1970 * 1000)
        let filterOut = currentTime - lastAnalysisTime < 200 || !isProcessing.compareAndSet(false, true)
        if (filterOut) {
            return
        }
        
        // 检测亮度
        let brightness = detectBrightness(sampleBuffer)
        scannerCallback?.onLight(brightness < 0.15)
        
        // 将字符串转换为 AVCaptureDevice.Position
        let position: AVCaptureDevice.Position = devicePosition == "front" ? .front : .back
        
        guard let imageData = processSampleBufferToImageData(sampleBuffer, width: width, height: height, devicePosition: position) else {
            isProcessing.set(false)
            return
        }
        
        let barcodeOptions = BarcodeScannerOptions(formats: getScanType(formStr: scanType))
        let barcodeScanner = BarcodeScanner.barcodeScanner(options: barcodeOptions)
        
        // 不再需要传递方向参数，因为方向已经在 imageData 中正确处理
        _processScanBarCode(imageData, true, barcodeScanner, autoZoom, scannerCallback)
    }
    
    static func processScanBarCode(_ filePath: String, _ scanType: [String], _ scannerCallback: ScannerCallback?) {
        let cleanPath = filePath.replacingOccurrences(of: "file://", with: "")
        let exist = FileManager.default.fileExists(atPath: cleanPath)
        if exist {
            let url = URL(fileURLWithPath: cleanPath)
            let data = try? Data(contentsOf: url)
            if let data = data {
                let barcodeOptions = BarcodeScannerOptions(formats: getScanType(formStr: scanType))
                let barcodeScanner = BarcodeScanner.barcodeScanner(options: barcodeOptions)
                _processScanBarCode(data, false, barcodeScanner, false, scannerCallback)
            } else {
                DispatchQueue.main.async {
                    scannerCallback?.onScanFailure("reading file")
                }
            }
        } else {
            DispatchQueue.main.async {
                scannerCallback?.onScanFailure("file not found")
            }
        }
    }
    
    
    fileprivate static func _processScanBarCode(_ imageData: Data?, _ isVideoFrame: Bool, _ barcodeScanner: BarcodeScanner, _ autoZoom: Bool, _ scannerCallback: ScannerCallback?) {
        defer {
            lastAnalysisTime = Int(Date().timeIntervalSince1970 * 1000)
            isProcessing.set(false)
        }
        
        if let data = imageData, let image = UIImage(data: data) {
            let visionImage = VisionImage(image: image)
            // 使用图像自带的方向，不再需要额外设置
            
            do {
                let barcodes = try barcodeScanner.results(in: visionImage)
                // 处理图片没扫到码的情况
                if !isVideoFrame {
                    if barcodes.isEmpty {
                        DispatchQueue.main.async {
                            scannerCallback?.onScanFailure("no barcode found")
                        }
                        return
                    } else {
                        var isEmptyOfRawData = false
                        for barcode in barcodes {
                            if barcode.rawData != nil && barcode.rawData!.isEmpty == true {
                                isEmptyOfRawData = true
                                break
                            }
                        }
                        if isEmptyOfRawData {
                            DispatchQueue.main.async {
                                scannerCallback?.onScanFailure("no barcode found")
                            }
                            return
                        }
                    }
                }
                
                var needZoom = false
                var barcodeInformation: [IosBarcodeInformation] = []
                for barcode in barcodes {
                    if barcode.frame == .zero {
                        continue
                    }
                    let rawData = barcode.rawData
                    if isVideoFrame && autoZoom && !needZoom {
                        if rawData == nil || rawData!.isEmpty {
                            needZoom = true
                            continue
                        }
                    }
                    
                    let rawValue = barcode.rawValue ?? ""
                    let format = getBarcodeFormatStr(barcode.format) ?? ""
                    let scanArea = [Int(barcode.frame.origin.x), Int(barcode.frame.origin.y), Int(barcode.frame.width), Int(barcode.frame.height)]
                    if let rawData = barcode.rawData, let rawDataBase64 = barcode.rawData?.base64EncodedString() {
                        let charset = getCharset(rawData) ?? ""
                        barcodeInformation.append(IosBarcodeInformation(result: rawValue, scanType: format, charset: charset, rawData: rawDataBase64, scanArea: scanArea))
                        needZoom = false
                    }
                }
                
                if autoZoom && needZoom {
                    DispatchQueue.main.async {
                        scannerCallback?.needZoom()
                    }
                }
                
                if barcodeInformation.count > 0 {
                    if barcodeInformation.count == 1 {
                        DispatchQueue.main.async {
                            scannerCallback?.onScanSuccess(barcodeInformation, nil)
//                            NSLog("aaa \(barcodeInformation)")
                        }
                    } else {
                        if isVideoFrame {
                            // 扫到多个二维码
                            DispatchQueue.main.async {
                                scannerCallback?.onScanSuccess(barcodeInformation, ScreenShot(image: image))
                            }
                        } else {
                            // 扫图片的时候，包含多个码
                            DispatchQueue.main.async {
                                scannerCallback?.onScanSuccess(barcodeInformation, nil)
                            }
                        }
                    }
                }
            } catch {
                scannerCallback?.onScanFailure(error.localizedDescription)
            }
        }
    }
    
    
    fileprivate static func getScanType(formStr typeStrs: [String]) -> BarcodeFormat{
        if typeStrs.isEmpty {
            return .all
        }
        
        var barcodeFormat: BarcodeFormat = .UPCE
        var assign = false
        for typeStr in typeStrs {
            switch typeStr{
                case "qrCode":
                    barcodeFormat.formUnion(.qrCode)
                    assign = true
                case "datamatrix":
                    barcodeFormat.formUnion(.dataMatrix)
                    assign = true
                case "pdf417":
                    barcodeFormat.formUnion(.PDF417)
                    assign = true
                default:
                    break
            }
        }
        if assign {
            barcodeFormat.remove(.UPCE)
        }
        
        return barcodeFormat
    }
    
    fileprivate static func getBarcodeFormatStr(_ format: BarcodeFormat) -> String? {
        switch format {
            case .qrCode:
                return "QR_CODE"
            case .aztec:
                return "AZTEC"
            case .codaBar:
                return "CODABAR"
            case .code39:
                return "CODE_39"
            case .code93:
                return "CODE_93"
            case .code128:
                return "CODE_128"
            case .dataMatrix:
                return "DATA_MATRIX"
            case .EAN8:
                return "EAN_8"
            case .EAN13:
                return "EAN_13"
            case .ITF:
                return "ITF"
            case .PDF417:
                return "PDF_417"
            case .UPCA:
                return "UPC_A"
            case .UPCE:
                return "UPC_E"
            default:
                return nil
        }
    }
    
    fileprivate static func getCharset(_ data: Data) -> String? {
        let encoding = NSString.stringEncoding(for: data, encodingOptions: nil, convertedString: nil, usedLossyConversion: nil)
        if encoding == 0 {
            return nil
        }
        return charsetName(from: String.Encoding(rawValue: encoding))
    }
    
    fileprivate static func charsetName(from encoding: String.Encoding) -> String? {
        let cfEncoding = CFStringConvertNSStringEncodingToEncoding(encoding.rawValue)
        if let cfCharsetName = CFStringConvertEncodingToIANACharSetName(cfEncoding) {
            return cfCharsetName as String
        }
        return nil
    }
    
    // 压缩 SampleBuffer
    fileprivate static func compressSampleBuffer(_ sampleBuffer: CMSampleBuffer, targetSize: CGSize) -> CMSampleBuffer? {
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else {
            NSLog("Failed to get pixel buffer")
            return nil
        }
        
        
        let ciImage = CIImage(cvPixelBuffer: pixelBuffer)
        let originalWidth = CGFloat(CVPixelBufferGetWidth(pixelBuffer))
        let originalHeight = CGFloat(CVPixelBufferGetHeight(pixelBuffer))
        let scale = min(targetSize.width / originalWidth, targetSize.height / originalHeight)
        let scaledImage = ciImage.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
        
        // 创建新的 PixelBuffer（尝试 YUV 格式以减小大小）
        var newPixelBuffer: CVPixelBuffer?
        let status = CVPixelBufferCreate(kCFAllocatorDefault,
                                         Int(scaledImage.extent.width),
                                         Int(scaledImage.extent.height),
                                         kCVPixelFormatType_420YpCbCr8BiPlanarFullRange, // YUV 格式，1.5 字节/像素
                                         nil,
                                         &newPixelBuffer)
        
        guard status == kCVReturnSuccess, let outputPixelBuffer = newPixelBuffer else {
            NSLog("Failed to create new pixel buffer, status: \(status)")
            return nil
        }
        
        let context = CIContext()
        context.render(scaledImage, to: outputPixelBuffer)
        //        NSLog("Rendered scaled image to new pixel buffer")
        
        var timingInfo = CMSampleTimingInfo()
        if CMSampleBufferGetSampleTimingInfo(sampleBuffer, at: 0, timingInfoOut: &timingInfo) != noErr {
            NSLog("Failed to get timing info")
            return nil
        }
        
        var newFormatDescription: CMFormatDescription?
        let formatStatus = CMVideoFormatDescriptionCreateForImageBuffer(allocator: kCFAllocatorDefault,
                                                                        imageBuffer: outputPixelBuffer,
                                                                        formatDescriptionOut: &newFormatDescription)
        guard formatStatus == noErr, let formatDescription = newFormatDescription else {
            NSLog("Failed to create format description, status: \(formatStatus)")
            return nil
        }
        
        var newSampleBuffer: CMSampleBuffer?
        let createStatus = CMSampleBufferCreateReadyWithImageBuffer(allocator: kCFAllocatorDefault,
                                                                    imageBuffer: outputPixelBuffer,
                                                                    formatDescription: formatDescription,
                                                                    sampleTiming: &timingInfo,
                                                                    sampleBufferOut: &newSampleBuffer)
        
        guard createStatus == noErr, let finalSampleBuffer = newSampleBuffer else {
            NSLog("Failed to create new sample buffer, status: \(createStatus)")
            return nil
        }
        
        //        NSLog("Successfully created compressed sample buffer")
        return finalSampleBuffer
    }
    
    fileprivate static func detectBrightness(_ sampleBuffer: CMSampleBuffer) -> Float {
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else {
            return 0.0
        }
        
        let width = CVPixelBufferGetWidth(pixelBuffer)
        let height = CVPixelBufferGetHeight(pixelBuffer)
        
        CVPixelBufferLockBaseAddress(pixelBuffer, .readOnly)
        defer {
            CVPixelBufferUnlockBaseAddress(pixelBuffer, .readOnly)
        }
        
        // 获取图像数据
        let baseAddress = CVPixelBufferGetBaseAddress(pixelBuffer)
        let bytesPerRow = CVPixelBufferGetBytesPerRow(pixelBuffer)
        let buffer = baseAddress?.assumingMemoryBound(to: UInt8.self)
        
        var totalBrightness: Float = 0
        let samplingStep = 10 // 每10个像素采样一次
        var samplingCount = 0
        
        // 针对BGRA格式优化的亮度计算
        for y in stride(from: 0, to: height, by: samplingStep) {
            for x in stride(from: 0, to: width, by: samplingStep) {
                let pixelOffset = y * bytesPerRow + x * 4
                
                // BGRA格式: [0]=B, [1]=G, [2]=R, [3]=A
                let b = Float(buffer?[pixelOffset] ?? 0)
                let g = Float(buffer?[pixelOffset + 1] ?? 0)
                let r = Float(buffer?[pixelOffset + 2] ?? 0)
                
                // 使用标准亮度转换公式
                // Y = 0.299R + 0.587G + 0.114B
                let brightness = 0.299 * r + 0.587 * g + 0.114 * b
                
                totalBrightness += brightness
                samplingCount += 1
            }
        }
        
        // 防止除以零
        guard samplingCount > 0 else { return 0.0 }
        
        // 计算平均亮度 (0-255)
        let averageBrightness = totalBrightness / Float(samplingCount)
        // 归一化到 0-1
        return averageBrightness / 255.0
    }
    
    // 裁剪图像，保持中心部分
    static func cropImage(_ image: UIImage, toWidth cropWidth: Int, height cropHeight: Int) -> UIImage {
        let sourceWidth = Int(image.size.width)
        let sourceHeight = Int(image.size.height)
        
        // 计算裁剪区域（居中）
        let xOffset = (sourceWidth - cropWidth) / 2
        let yOffset = (sourceHeight - cropHeight) / 2
        
        // 创建裁剪区域
        let cropRect = CGRect(x: xOffset, y: yOffset, width: cropWidth, height: cropHeight)
        
        // 裁剪图像
        if let croppedCGImage = image.cgImage?.cropping(to: cropRect) {
            return UIImage(cgImage: croppedCGImage, scale: image.scale, orientation: image.imageOrientation)
        }
        
        // 如果裁剪失败，返回原图
        return image
    }

    // 将 CMSampleBuffer 按照指定宽高比例裁剪并缩放
    static func processSampleBufferToImageData(_ sampleBuffer: CMSampleBuffer, width: Int, height: Int, compressionQuality: CGFloat = 1.0, devicePosition: AVCaptureDevice.Position = .back) -> Data? {
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else {
            NSLog("Failed to get pixel buffer")
            return nil
        }
        
        // 创建 CIImage
        let ciImage = CIImage(cvPixelBuffer: pixelBuffer)
        
        // 记录原始尺寸
        let originalWidth = ciImage.extent.width
        let originalHeight = ciImage.extent.height
        NSLog("Original image dimensions: \(originalWidth) x \(originalHeight)")
        
        // 获取正确的图像方向 - 仅基于相机位置
//        let correctOrientation = imageOrientation(fromDevicePosition: devicePosition)
//        NSLog("Correct image orientation: \(correctOrientation.rawValue)")
        
        // 根据方向确定是否需要交换宽高
        let targetWidth = width
        let targetHeight = height
        // 这里去掉旋转，因为除了第一帧是right后续的都是正方向，所以直接裁剪缩放
        
        
        // 检查方向是否为横向（需要交换宽高）
//        let isLandscapeOrientation = correctOrientation == .right || correctOrientation == .left || 
//                                    correctOrientation == .rightMirrored || correctOrientation == .leftMirrored
        
        // 如果图像方向是横向的，需要交换目标宽高
//        if isLandscapeOrientation {
//            // 交换宽高值
//            let temp = targetWidth
//            targetWidth = targetHeight
//            targetHeight = temp
//            NSLog("Image orientation is landscape, swapped target dimensions to: \(targetWidth) x \(targetHeight)")
//        }
        
        // 处理裁剪和缩放 - 在应用方向变换之前进行
        var processedImage = ciImage
        if targetWidth != -1 && targetHeight != -1 {
            let imageWidth = ciImage.extent.width
            let imageHeight = ciImage.extent.height
            
            // 计算宽高比
            let targetAspectRatio = CGFloat(targetHeight) / CGFloat(targetWidth)
            let imageAspectRatio = imageHeight / imageWidth
            
            NSLog("Target dimensions: \(targetWidth) x \(targetHeight)")
            NSLog("Target aspect ratio: \(targetAspectRatio), Image aspect ratio: \(imageAspectRatio)")
            
            // 裁剪图像以匹配目标宽高比
            if imageAspectRatio > targetAspectRatio {
                // 图像太高，需要裁剪高度
                let newHeight = imageWidth * targetAspectRatio
                let yOffset = (imageHeight - newHeight) / 2
                
                // 创建裁剪区域
                let cropRect = CGRect(x: 0, y: yOffset, width: imageWidth, height: newHeight)
                processedImage = processedImage.cropped(to: cropRect)
                NSLog("Cropped height: new dimensions \(processedImage.extent.width) x \(processedImage.extent.height)")
            } else if imageAspectRatio < targetAspectRatio {
                // 图像太宽，需要裁剪宽度
                let newWidth = imageHeight / targetAspectRatio
                let xOffset = (imageWidth - newWidth) / 2
                
                // 创建裁剪区域
                let cropRect = CGRect(x: xOffset, y: 0, width: newWidth, height: imageHeight)
                processedImage = processedImage.cropped(to: cropRect)
                NSLog("Cropped width: new dimensions \(processedImage.extent.width) x \(processedImage.extent.height)")
            }
            
            // 缩放到目标尺寸
            let scaleX = CGFloat(targetWidth) / processedImage.extent.width
            let scaleY = CGFloat(targetHeight) / processedImage.extent.height
            processedImage = processedImage.transformed(by: CGAffineTransform(scaleX: scaleX, y: scaleY))
            NSLog("Scaled to: \(processedImage.extent.width) x \(processedImage.extent.height)")
        }
        
        // 创建 CIContext 和 CGImage
        let context = CIContext()
        guard let cgImage = context.createCGImage(processedImage, from: processedImage.extent) else {
            NSLog("Failed to create CGImage")
            return nil
        }
        
        // 创建 UIImage，直接应用正确的方向
        let uiImage = UIImage(cgImage: cgImage, scale: 1.0, orientation: .up)
        NSLog("Final image dimensions: \(uiImage.size.width) x \(uiImage.size.height), orientation: \(uiImage.imageOrientation.rawValue)")
        
        // 保存图像到文件进行验证
//        saveImageForVerification(uiImage, orientation: .up)
        
        // 转换为 JPEG 数据
        return uiImage.jpegData(compressionQuality: compressionQuality)
    }

    // 将 UIImage.Orientation 转换为 EXIF 方向值
    private static func orientationToExifOrientation(_ orientation: UIImage.Orientation) -> Int32 {
        switch orientation {
        case .up:
            return 1
        case .down:
            return 3
        case .left:
            return 8
        case .right:
            return 6
        case .upMirrored:
            return 2
        case .downMirrored:
            return 4
        case .leftMirrored:
            return 5
        case .rightMirrored:
            return 7
        @unknown default:
            return 1
        }
    }
    
    
    private static func currentUIOrientation() -> UIDeviceOrientation {
        let deviceOrientation = { () -> UIDeviceOrientation in
            switch UIApplication.shared.statusBarOrientation {
                case .landscapeLeft:
                    return .landscapeRight
                case .landscapeRight:
                    return .landscapeLeft
                case .portraitUpsideDown:
                    return .portraitUpsideDown
                case .portrait, .unknown:
                    return .portrait
                @unknown default:
                    return .portrait
            }
        }
        
        guard Thread.isMainThread else {
            var currentOrientation: UIDeviceOrientation = .portrait
            DispatchQueue.main.sync {
                currentOrientation = deviceOrientation()
            }
            return currentOrientation
        }
        return deviceOrientation()
    }
    
    // 根据设备方向和相机位置确定图像方向
    public static func imageOrientation(
        fromDevicePosition devicePosition: AVCaptureDevice.Position = .back
    ) -> UIImage.Orientation {
        // 简化方向处理，只基于相机位置
        // 前置摄像头需要镜像，后置摄像头不需要
        return devicePosition == .front ? .leftMirrored : .right
    }
    

    // 添加一个辅助方法来保存图像
    private static func saveImageForVerification(_ image: UIImage, orientation: UIImage.Orientation) {
        // 创建文件名，包含时间戳和方向信息
        let timestamp = Int(Date().timeIntervalSince1970)
        let orientationString: String
        switch orientation {
        case .up: orientationString = "up"
        case .down: orientationString = "down"
        case .left: orientationString = "left"
        case .right: orientationString = "right"
        default: orientationString = "other"
        }
        
        let filename = "scan_verify_\(timestamp)_\(orientationString).jpg"
        
        // 获取文档目录路径
        let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        let fileURL = documentsDirectory.appendingPathComponent(filename)
        
        // 限制保存频率，每10秒最多保存一张图片
        let currentTime = Date()
        if lastImageSaveTime == nil || currentTime.timeIntervalSince(lastImageSaveTime!) >= 1.0 {
            if let data = image.jpegData(compressionQuality: 0.9) {
                do {
                    try data.write(to: fileURL)
                    NSLog("Verification image saved to: \(fileURL.path)")
                    lastImageSaveTime = currentTime
                } catch {
                    NSLog("Failed to save verification image: \(error.localizedDescription)")
                }
            }
        }
    }
}

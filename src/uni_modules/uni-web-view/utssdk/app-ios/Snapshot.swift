//
//  Snapshot.swift
//  TestFra
//
//  Created by Fred on 9/12/25.
//

import Foundation
import UIKit
import WebKit
import DCloudUniappRuntime

extension UIView {
    
    func inner__takeSnapShotPath(
        offsetX: CGFloat? = nil,
        offsetY: CGFloat? = nil,
        backgroundColor: UIColor? = nil,
        path: String? = nil,
        isViewToTempFilePath: Bool = false,
        completion: @escaping (String?) -> Void
    ) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return completion(nil) }
            
            let viewBgColor = self.backgroundColor
            let opaqueColor = isViewToTempFilePath ? self.findFirstOpaqueBackgroundColor() : nil
            
            self.uni__takeSnapshot { mainImage in
                guard let mainImage = mainImage else { return completion(nil) }
                
                self.__processImageInBackground(
                    image: mainImage,
                    fixedImages: [],
                    offsetX: offsetX, offsetY: offsetY,
                    backgroundColor: backgroundColor,
                    path: path,
                    isViewToTempFilePath: isViewToTempFilePath,
                    viewBackgroundColor: viewBgColor,
                    opaqueBackgroundColor: opaqueColor,
                    completion: completion
                )
            }
        }
    }
    
    private func __processImageInBackground(
        image: UIImage,
        fixedImages: [(UIImage, CGRect)],
        offsetX: CGFloat?,
        offsetY: CGFloat?,
        backgroundColor: UIColor?,
        path: String?,
        isViewToTempFilePath: Bool,
        viewBackgroundColor: UIColor?,
        opaqueBackgroundColor: UIColor?,
        completion: @escaping (String?) -> Void
    ) {
        DispatchQueue.global(qos: .userInitiated).async {
            
            var finalImage: UIImage? = image
            
            // === 裁剪 ===
            let dx = offsetX ?? 0
            let dy = offsetY ?? 0
            finalImage = finalImage?.uni__cropImage(offsetX: dx, offsetY: dy)
            
            // === 背景处理 ===
            let bgColor: UIColor = {
                if isViewToTempFilePath {
                    if let bg = backgroundColor, bg != .clear {
                        return bg
                    }
                    //截取全图（内部截图截取的背景色如果是透明色，就找第一个不是透明色的父view背景色，都是透明色就设置背景色为白色）
                    return opaqueBackgroundColor ?? .white
                } else {
                    //元素截图(调用takeSnapshot外部截图截取元素的背景色，没有就设置为透明色)
                    return viewBackgroundColor ?? .clear
                }
            }()
            finalImage = finalImage?.uni__changeBackgroundColor(to: bgColor)
            
            // === 拼接 fixed 图片 ===
            for (img, rect) in fixedImages {
                finalImage = finalImage?.uni__merge(with: img, at: rect.origin)
            }
            
            guard let pngData = finalImage?.pngData() else {
                DispatchQueue.main.async { completion(nil) }
                return
            }
            
            // === 写文件 ===
            let filePath: String
            if let p = path {
                filePath = p
            } else {
                //截屏存储路径定义：UniSnapshotCacheDir() + /uni-snapshot + 时间搓 + ".png"
                filePath = "\(UniSnapshotCacheDir())/\(Date().timeIntervalSince1970).png"
            }
            
            do {
                try pngData.write(to: URL(fileURLWithPath: filePath), options: .atomic)
                DispatchQueue.main.async { completion(filePath) }
            } catch {
                DispatchQueue.main.async { completion(nil) }
            }
        }
    }
    


    
    func uni__isWKWebView() -> Bool {
        if self is WKWebView {
            return true
        }
        return false
    }
    
    func uni__takeSnapshot(completion: @escaping (UIImage?) -> Void) {
        if uni__isWKWebView(), let wkWebView = self as? WKWebView {
            wkWebView.uni__takeFullSnapshotNoFlicker { image in
                completion(image)
            }
        }
    }
    
    private func findFirstOpaqueBackgroundColor() -> UIColor? {
        if let bgColor = backgroundColor, bgColor != .clear {
            return bgColor
        }
        
        return superview?.findFirstOpaqueBackgroundColor()
    }
}

extension WKWebView {
    
    /// 获取截图瞬间webview当前可见渲染区域截图和位置
    func getSnapshotImage() -> (UIImage, CGPoint) {
        let visibleRect = CGRect(origin: scrollView.contentOffset, size: scrollView.bounds.size)
        
        let format = UIGraphicsImageRendererFormat()
        format.scale = UIScreen.main.scale
        let renderer = UIGraphicsImageRenderer(bounds: visibleRect, format: format)
        
        let snapshot = renderer.image { context in
            scrollView.layer.render(in: context.cgContext)
        }
        
        return (snapshot, visibleRect.origin)
    }
    
    /// 添加一个截图遮罩覆盖在 WebView 上，防止用户看到滚动或加载过程
    func addSnapshotMaskOverlay() {
        let visibleRect = CGRect(origin: scrollView.contentOffset, size: scrollView.bounds.size)
        
        let format = UIGraphicsImageRendererFormat()
        format.scale = UIScreen.main.scale
        let renderer = UIGraphicsImageRenderer(bounds: visibleRect, format: format)
        
        let snapshot = renderer.image { context in
            scrollView.layer.render(in: context.cgContext)
        }
        
        let imageView = UIImageView(image: snapshot)
        
        let convertedOrigin = scrollView.convert(visibleRect.origin, to: self)
        imageView.frame = CGRect(origin: convertedOrigin, size: visibleRect.size)
        
        imageView.contentMode = .scaleToFill // 或者不要设置，默认即可
        imageView.clipsToBounds = true
        imageView.isUserInteractionEnabled = true
        imageView.autoresizingMask = []
        imageView.layer.shouldRasterize = true
        imageView.layer.rasterizationScale = UIScreen.main.scale
        imageView.tag = 999_999
        
        self.addSubview(imageView)
        self.bringSubviewToFront(imageView)
    }
    
    /// 移除遮罩
    func removeSnapshotMaskOverlay() {
        
        guard let maskView = self.viewWithTag(999_999) else { return }
        
        // 添加淡出动画
        UIView.animate(withDuration: 0.15, delay: 0, options: [.curveEaseOut], animations: {
            maskView.alpha = 0
        }, completion: { _ in
            DispatchQueue.main.async {
                maskView.removeFromSuperview()
            }
        })
    }
    
    /// 遮罩+frame调整+截图+恢复，保证用户无感知的真WebView长截图
    func uni__takeFullSnapshotNoFlicker(completion: @escaping (UIImage?) -> Void) {
        guard scrollView.contentSize.width > 0 && scrollView.contentSize.height > 0 else {
            completion(nil)
            return
        }
        
        // 1. 添加遮罩
        addSnapshotMaskOverlay()
        
        // 2. 保存原始状态
        let originalFrame = self.frame
        let originalConstraints = constraints
        let originalScrollViewOffset = scrollView.contentOffset
        let originalIsScrollEnabled = scrollView.isScrollEnabled
        let originalAlpha = self.alpha
        
        let newSize = scrollView.contentSize
        
        // 3. 禁止滚动，避免用户误操作
        scrollView.isScrollEnabled = false
        
        // 4. 移除约束，调整frame和offset
        removeConstraints(originalConstraints)
        translatesAutoresizingMaskIntoConstraints = true
        frame = CGRect(origin: .zero, size: newSize)
        scrollView.contentOffset = .zero
        
        // 5. 等待一小段时间，确保渲染完成
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) { [self] in
            UIGraphicsBeginImageContextWithOptions(newSize, false, 0)
            defer {
                UIGraphicsEndImageContext()
            }
            var isSuccess = self.scrollView.drawHierarchy(in: self.scrollView.bounds, afterScreenUpdates: false)
            if let tempSnapshot = UIGraphicsGetImageFromCurrentImageContext(), tempSnapshot.uni__isBlank() {
                isSuccess = false
            }
            if !isSuccess, let context = UIGraphicsGetCurrentContext() {
                self.scrollView.layer.render(in: context)
            }
            let image = UIGraphicsGetImageFromCurrentImageContext()
            
            // 6. 恢复原始状态
            self.frame = originalFrame
            self.translatesAutoresizingMaskIntoConstraints = false
            self.addConstraints(originalConstraints)
            self.scrollView.contentOffset = originalScrollViewOffset
            self.scrollView.isScrollEnabled = originalIsScrollEnabled
            self.alpha = originalAlpha
            
            // 7. 移除遮罩
            removeSnapshotMaskOverlay()
            
            completion(image)
        }
    }
}

extension UIImage {
    func uni__changeBackgroundColor(to color: UIColor) -> UIImage? {
        UIGraphicsBeginImageContextWithOptions(size, false, scale)
        
        guard let context = UIGraphicsGetCurrentContext() else { return nil }
        
        color.setFill()
        context.fill(CGRect(origin: .zero, size: size))
        
        draw(at: .zero)
        
        let newImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return newImage
    }
    
    func uni__cropImage(offsetX: CGFloat, offsetY: CGFloat) -> UIImage? {
        guard let cgImage = self.cgImage else { return nil }
        
        let scale = UIScreen.main.nativeScale
        let x = offsetX * scale
        let y = offsetY * scale
        let width = (size.width - offsetX) * scale
        let height = (size.height - offsetY) * scale
        
        let cropRect = CGRect(x: x, y: y, width: width, height: height)
        if let croppedImage = cgImage.cropping(to: cropRect) {
            return UIImage(cgImage: croppedImage, scale: scale, orientation: .up)
        }
        
        return nil
    }
    
    func uni__cropImage(offsetX: CGFloat, offsetY: CGFloat, width: CGFloat, height: CGFloat) -> UIImage? {
        guard let cgImage = self.cgImage else { return nil }
        
        let scale = UIScreen.main.nativeScale
        let x = offsetX * scale
        let y = offsetY * scale
        let width = width * scale
        let height = height * scale
        
        let cropRect = CGRect(x: x, y: y, width: width, height: height)
        if let croppedImage = cgImage.cropping(to: cropRect) {
            return UIImage(cgImage: croppedImage, scale: scale, orientation: .up)
        }
        
        return nil
    }
    
    func uni__merge(with image: UIImage, at position: CGPoint) -> UIImage? {
        let format = UIGraphicsImageRendererFormat()
        format.scale = UIScreen.main.nativeScale
        
        let renderer = UIGraphicsImageRenderer(size: size, format: format)
        
        let mergedImage = renderer.image { context in
            draw(at: .zero)
            image.draw(at: position)
        }
        
        return mergedImage
    }
    
    //判断是否是空白页面： 全白、全黑或几乎没有颜色变化的图片
    func uni__isBlank() -> Bool {
        //截取图片中间2像素的竖条用来判断该图片是否是空白页面，减少大量计算造成的性能损耗
        let image = uni__cropImage(offsetX: size.width*0.5 - 1, offsetY: 0, width: 2, height: size.height)
        
        guard let ciImage = CIImage(image: image ?? self) else { return false }
        
        let extent = ciImage.extent
        let context = CIContext(options: nil)
        
        // 使用 CIAreaMaximum 和 CIAreaMinimum 来找到最大和最小颜色值
        let minFilter = CIFilter(name: "CIAreaMinimum", parameters: [kCIInputImageKey: ciImage, kCIInputExtentKey: CIVector(cgRect: extent)])!
        let maxFilter = CIFilter(name: "CIAreaMaximum", parameters: [kCIInputImageKey: ciImage, kCIInputExtentKey: CIVector(cgRect: extent)])!
        
        let minOutputImage = minFilter.outputImage!
        let maxOutputImage = maxFilter.outputImage!
        
        var minBitmap = [UInt8](repeating: 0, count: 4)
        var maxBitmap = [UInt8](repeating: 0, count: 4)
        
        context.render(minOutputImage, toBitmap: &minBitmap, rowBytes: 4, bounds: CGRect(x: 0, y: 0, width: 1, height: 1), format: .RGBA8, colorSpace: nil)
        context.render(maxOutputImage, toBitmap: &maxBitmap, rowBytes: 4, bounds: CGRect(x: 0, y: 0, width: 1, height: 1), format: .RGBA8, colorSpace: nil)
        
        let minR = CGFloat(minBitmap[0]) / 255.0
        let minG = CGFloat(minBitmap[1]) / 255.0
        let minB = CGFloat(minBitmap[2]) / 255.0
        
        let maxR = CGFloat(maxBitmap[0]) / 255.0
        let maxG = CGFloat(maxBitmap[1]) / 255.0
        let maxB = CGFloat(maxBitmap[2]) / 255.0
        
        // 计算颜色的差异，如果差异非常小，则认为是单一颜色图片
        let colorThreshold: CGFloat = 0.01
        return abs(maxR - minR) < colorThreshold && abs(maxG - minG) < colorThreshold && abs(maxB - minB) < colorThreshold
    }
}



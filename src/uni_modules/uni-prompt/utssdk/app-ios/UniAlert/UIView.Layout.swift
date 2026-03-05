//
//  UIView.Layout.swift
//  DCloudAlertController
//
//  Created by lizhongyi on 2023/3/10.
//

import UIKit

let pix = (1.0 / UIScreen.main.scale)
extension UIView {
    
    var top: CGFloat {
        get {
            return self.frame.origin.y
        }
        set {
            var frame = self.frame
            frame.origin.y = newValue
            self.frame = frame
        }
    }
    
    var left: CGFloat {
        get {
            return self.frame.origin.x
        }
        set {
            var frame = self.frame
            frame.origin.x = newValue
            self.frame = frame
        }
    }
    
    var bottom: CGFloat {
        get {
            return self.frame.origin.y + self.frame.size.height
        }
        set {
            var frame = self.frame
            frame.origin.y = newValue - self.frame.size.height
            self.frame = frame
        }
    }
    
    var right: CGFloat {
        get {
            return self.frame.origin.x + self.frame.size.width
        }
        set {
            var frame = self.frame
            frame.origin.x = newValue - frame.size.width
            self.frame = frame
        }
    }
    
    var x: CGFloat {
        get {
            return self.frame.origin.x
        }
        set {
            var frame = self.frame
            frame.origin.x = newValue
            self.frame = frame
        }
    }
    
    var y: CGFloat {
        get {
            return self.frame.origin.y
        }
        set {
            var frame = self.frame
            frame.origin.y = newValue
            self.frame = frame
        }
    }
    
    var centerX: CGFloat {
        get {
            return self.center.x
        }
        set {
            self.center = CGPoint(x: newValue, y: self.center.y)
        }
    }
    
    var centerY: CGFloat {
        get {
            return self.center.y
        }
        set {
            self.center = CGPoint(x: self.center.x, y: newValue)
        }
    }
    
    var width: CGFloat {
        get {
            return self.frame.size.width
        }
        set {
            var frame = self.frame
            frame.size.width = newValue
            self.frame = frame
        }
    }
    
    var height: CGFloat {
        get {
            return self.frame.size.height
        }
        set {
            var frame = self.frame
            frame.size.height = newValue
            self.frame = frame
        }
    }
    
    var origin: CGPoint {
        get {
            return self.frame.origin
        }
        set {
            var frame = self.frame
            frame.origin = newValue
            self.frame = frame
        }
    }
    
    var size: CGSize {
        get {
            return self.frame.size
        }
        set {
            var frame = self.frame
            frame.size = newValue
            self.frame = frame
        }
    }
}

extension UIView {
    static func getTopSafeAreaHeight() -> CGFloat {
        if #available(iOS 13.0, *) {
            if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
                if let window = scene.windows.first {
                    return window.safeAreaInsets.top
                }
            }
        } else if #available(iOS 11.0, *) {
            if let window = UIApplication.shared.windows.first {
                return window.safeAreaInsets.top
            }
        }
        return UIDevice.statusBarFrameHeight()
    }
}

extension UIDevice {
    
    static func statusBarFrameHeight() -> CGFloat {
        if #available(iOS 13.0, *) {
            if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
                if let statusBarMananger = scene.statusBarManager {
                    return statusBarMananger.statusBarFrame.height
                }
            }
        }
        return UIApplication.shared.statusBarFrame.height
    }
    static let screenHeight = max(UIScreen.main.bounds.size.height, UIScreen.main.bounds.size.width)
    static let screenWidth = min(UIScreen.main.bounds.size.height, UIScreen.main.bounds.size.width)
    static let nativeScale = UIScreen.main.nativeScale
    static var isiPhone: Bool {
        return UIDevice.current.userInterfaceIdiom == .phone
    }
    
    static var isiPad: Bool {
        return UIDevice.current.userInterfaceIdiom == .pad
    }
    
    static var isiPhoneCompact: Bool {
        return isiPhone && (screenHeight <= 568.0) // e.g., iPhone 5/5S/5C
    }

    static var isiPhoneStandard: Bool {
        return isiPhone && (screenHeight > 568.0 && screenHeight <= 667.0) // e.g., iPhone 6, 7, 8, 6s, SE
    }

    static var isiPhonePlus: Bool {
        return isiPhone && (screenHeight > 667.0 && screenHeight <= 736.0) // e.g., iPhone 6 Plus, 7 Plus, 8 Plus
    }
    
    static var isiPhoneMini: Bool {
        return isiPhone && (screenHeight == 812.0 && screenWidth == 375.0 && nativeScale >= 2.0) // e.g., iPhone 12, 13 Mini
    }

    static var isiPhoneXType: Bool {
        return isiPhone && (screenHeight > 736.0 && screenHeight <= 812.0 && !isiPhoneMini) // e.g., iPhone X, XS, 11 Pro
    }

    static var isMediumiPhone: Bool {
        return isiPhone && (screenHeight > 812.0 && screenHeight <= 844.0 ) // e.g., iPhone 12, 13, 13 Pro
    }
    
    static var isiPhoneLarge: Bool {
        return isiPhone && (screenHeight > 844.0 && screenHeight <= 896.0 && !isiPhoneXR && !isiPhoneXSMax) // e.g., iPhone 11
    }
    
    static var isiPhoneXR: Bool {
        return isiPhone && (screenHeight == 896.0 && screenWidth == 414.0 && nativeScale == 2.0) // e.g., iPhone XR
    }
    
    static var isiPhoneXSMax: Bool {
        return isiPhone && (screenHeight == 896.0 && screenWidth == 414.0 && nativeScale == 3.0) // e.g., iPhone XS Max
    }

    static var isiPhoneProMax: Bool {
        return isiPhone && (screenHeight > 896.0) // e.g., iPhone 12/13/14 Pro Max
    }

    static var isiPhoneDynamicIsland: Bool {
        return isiPhone && (screenHeight == 852.0 || screenHeight == 932.0) // iPhone 14 Pro/Pro Max
    }
    
    static var isLandscape: Bool {
//        print("test-------screenWidth= \(screenWidth)-----screenHeight= \(screenHeight)----scale= \(nativeScale)")
        if #available(iOS 13.0, *) {
            if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
                let orientationMask = windowScene.interfaceOrientation
                switch orientationMask {
                case .portrait, .portraitUpsideDown:
                    return false
                case .landscapeLeft, .landscapeRight:
                    return true
                default:
                    return false
                }
            }
        } else {
            let orientation = UIApplication.shared.statusBarOrientation
            switch orientation {
            case .portrait, .portraitUpsideDown:
                return false
            case .landscapeLeft, .landscapeRight:
                return true
            case .unknown:
                return false
            @unknown default:
                return false
            }
        }
        return false
    }
    
    static var isPortrait: Bool {
        return !isLandscape
    }
}

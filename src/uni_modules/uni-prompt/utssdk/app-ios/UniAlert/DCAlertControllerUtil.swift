//
//  DCAlertControllerUtil.swift
//  DCloudAlertController
//
//  Created by lizhongyi on 2023/3/10.
//

import UIKit

class DCAlertControllerUtil {
    
    static func topViewController(base: UIViewController? = {
        if #available(iOS 13.0, *) {
        return UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap { $0.windows }
            .filter { $0.isKeyWindow && $0.windowLevel == .normal && $0.frame == UIScreen.main.bounds }
            .first?.rootViewController
    } else {
        return UIApplication.shared.keyWindow?.rootViewController
    }
    }()) -> UIViewController? {
        if let nav = base as? UINavigationController {
            return topViewController(base: nav.visibleViewController)
        }
        
        if let tab = base as? UITabBarController {
            if let selected = tab.selectedViewController {
                return topViewController(base: selected)
            }
        }
        
        if let presented = base?.presentedViewController {
            return topViewController(base: presented)
        }
        
        return base
    }
    
   static func topPresentedViewController(_ baseVC: UIViewController?) -> UIViewController? {
        var vc: UIViewController? = nil
        if let baseVC = baseVC {
            vc = baseVC
        }else if let t_baseVC = UIApplication.shared.delegate?.window??.rootViewController {
            vc = t_baseVC
        }
        if var vc = vc {
            while true {
                if let p_vc = vc.presentedViewController {
                    if p_vc.isBeingDismissed {
                        break
                    }else {
                        vc = p_vc
                    }
                }else {
                    break
                }
            }
        }
        return vc
    }
}

extension NSString {
    func dc_hasLinebreaks() -> Bool {
        return self.components(separatedBy: NSCharacterSet.newlines).count >= 2
    }
    
    public func dc_boundingSize(_ font: UIFont?, _ lineHeight: CGFloat, _ size: CGSize) -> CGSize {
        let options: NSStringDrawingOptions = [.truncatesLastVisibleLine, .usesFontLeading, .usesLineFragmentOrigin]
        let newFont = font ?? UIFont.systemFont(ofSize: UIFont.systemFontSize)
        let paragraphStyle: NSMutableParagraphStyle = NSMutableParagraphStyle.init()
        paragraphStyle.lineSpacing = max(0.0, lineHeight - newFont.lineHeight)
        
        let bounds: CGRect = self.boundingRect(with: size,
                                               options: options,
                                               attributes: [NSAttributedString.Key.font : newFont, NSAttributedString.Key.paragraphStyle : paragraphStyle],
                                               context: nil)

        return CGSize(width: ceil(bounds.size.width), height: ceil(bounds.size.height))
    }
}

extension UIColor {
    static func colorWithHexString(_ string: String) -> UIColor {
        var hex = string.hasPrefix("#")
          ? String(string.dropFirst())
          : string
        guard hex.count == 3 || hex.count == 6
          else {
            let color = self.init(white: 1.0, alpha: 0.0)
            return color
        }
        if hex.count == 3 {
          for (index, char) in hex.enumerated() {
            hex.insert(char, at: hex.index(hex.startIndex, offsetBy: index * 2))
          }
        }
        
        guard let intCode = Int(hex, radix: 16) else {
          let color = UIColor.init(white: 1.0, alpha: 0.0)
            return color
        }
        
        let color = UIColor.init(
            red:   CGFloat((intCode >> 16) & 0xFF) / 255.0,
            green: CGFloat((intCode >> 8) & 0xFF) / 255.0,
            blue:  CGFloat((intCode) & 0xFF) / 255.0, alpha: 1.0)
        return color
    }
    
    static func templateColor(_ light: UIColor, _ dark: UIColor, _ canDarkModel: Bool = true) -> UIColor {
        if canDarkModel, #available(iOS 13.0, *) {
            return UIColor { t in
                return t.userInterfaceStyle == .dark ? dark : light
            }
        }
        return light
    }
}

class Colors {
    static func white(_ canDarkModel: Bool = true) -> UIColor {
        UIColor.templateColor(.white, .black, canDarkModel)
    }
    
    static func black(_ canDarkModel: Bool = true) -> UIColor {
        UIColor.templateColor(.black, .white, canDarkModel)
    }
    
    static func bgColor(_ canDarkModel: Bool = true) -> UIColor {
        UIColor.templateColor(.white, UIColor.colorWithHexString("#272727"), canDarkModel)
    }
    
    static func textViewBg(_ canDarkModel: Bool = true) -> UIColor {
        UIColor.templateColor(UIColor.colorWithHexString("#F6F6F6"), UIColor.colorWithHexString("#1C1C1C"), canDarkModel)
    }
    
    static func mainText(_ canDarkModel: Bool = true) -> UIColor {
        UIColor.templateColor(.black, UIColor.colorWithHexString("#CFCFCF"), canDarkModel)
    }
    
    static func subText(_ canDarkModel: Bool = true) -> UIColor {
        UIColor.templateColor(UIColor.colorWithHexString("#696969"), UIColor.colorWithHexString("#D8D8D8"), canDarkModel)
    }
    
    static func cancelBtn(_ canDarkModel: Bool = true) -> UIColor {
        UIColor.templateColor(.black, UIColor.colorWithHexString("#A5A5A5"), canDarkModel)
    }
    
    static func sureBtn(_ canDarkModel: Bool = true) -> UIColor {
        UIColor.templateColor(UIColor.colorWithHexString("#4A5E86"), UIColor.colorWithHexString("#7388A2"), canDarkModel)
    }
    
    static func hairLine(_ canDarkModel: Bool = true) -> UIColor {
        UIColor.templateColor(UIColor.colorWithHexString("#E0E0E0"), UIColor.colorWithHexString("#303030"), canDarkModel)
    }
    static func seperator(_ canDarkModel: Bool = true) -> UIColor {
        UIColor.templateColor(UIColor.colorWithHexString("#E3E3E3"), UIColor.colorWithHexString("#303030"), canDarkModel)
    }
    
    static func placeholder(_ canDarkModel: Bool = true) -> UIColor {
        UIColor.templateColor(UIColor.colorWithHexString("#9C9C9C"), UIColor.colorWithHexString("#4F4F4F"), canDarkModel)
    }
    
    static func footer(_ canDarkModel: Bool = true) -> UIColor {
        UIColor.templateColor(UIColor.colorWithHexString("#F6F6F6"), UIColor.colorWithHexString("#1C1C1C"), canDarkModel)
    }
    
    
}

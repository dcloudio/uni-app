//
//  MCToast+Status.swift
//  MCToast
//
//  Created by Mccc on 2020/6/24.
//
import UIKit

extension MCToast {
    /// Toast类型
    public enum MCToastType {
        /// 成功
        case success
        /// 失败
        case failure
        /// 警告
        case warning
    }
}



extension UIResponder {
    
    /// 成功类型的Toast
    /// - Parameters:
    ///   - text: 文字内容
    ///   - duration: 展示时间（秒）
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
    public func mc_success(_ text:String,
                           duration: CGFloat = MCToastConfig.shared.duration,
                           respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
                           callback: MCToast.MCToastCallback? = nil) {
        DispatchQueue.main.async {
            MCToast.mc_success(text, duration: duration, respond: respond, callback: callback)
        }
    }
    
    
    /// 失败类型的Toast
    /// - Parameters:
    ///   - text: 文字内容
    ///   - duration: 展示时间（秒）
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
    public func mc_failure(_ text: String,
                           duration:CGFloat = MCToastConfig.shared.duration,
                           respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
                           callback: MCToast.MCToastCallback? = nil) {
        DispatchQueue.main.async {
            MCToast.mc_failure(text, duration: duration, respond: respond, callback: callback)
        }
    }
    
    
    /// 警告类型的Toast
    /// - Parameters:
    ///   - text: 文字内容
    ///   - duration: 展示时间（秒）
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
    public func mc_warning(_ text: String,
                           duration:CGFloat = MCToastConfig.shared.duration,
                           respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
                           callback: MCToast.MCToastCallback? = nil) {
        DispatchQueue.main.async {
            MCToast.mc_warning(text, duration: duration, respond: respond, callback: callback)
        }
    }
}



extension MCToast {
    
    /// 成功类型的Toast
    /// - Parameters:
    ///   - text: 文字内容
    ///   - duration: 展示时间（秒）
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
    public static func mc_success(_ text:String,
        duration: CGFloat = MCToastConfig.shared.duration,
        respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
        callback: MCToast.MCToastCallback? = nil) {
        
        DispatchQueue.main.async {
            MCToast.showStatus(.success, text: text, iconImage: nil, duration: duration, respond: respond, callback: callback)
        }
    }
    
    
    /// 失败类型的Toast
    /// - Parameters:
    ///   - text: 文字内容
    ///   - duration: 展示时间（秒）
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
    public static func mc_failure(_ text: String,
                                  duration:CGFloat = MCToastConfig.shared.duration,
                                  respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
                                  callback: MCToast.MCToastCallback? = nil) {
        
        DispatchQueue.main.async {
            MCToast.showStatus(.failure, text: text, iconImage: nil, duration: duration, respond: respond, callback: callback)
        }
    }
    
    
    /// 警告类型的Toast
    /// - Parameters:
    ///   - text: 文字内容
    ///   - duration: 展示时间（秒）
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
    public static func mc_warning(_ text: String,
                                  duration: CGFloat = MCToastConfig.shared.duration,
                                  respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
                                  callback: MCToast.MCToastCallback? = nil) {
        
        DispatchQueue.main.async {
            MCToast.showStatus(.warning, text: text, iconImage: nil, duration: duration, respond: respond,callback: callback)
        }
    }
}






// MARK: - 展示各种状态Toast
extension MCToast {
    
    
    @discardableResult
    public static func showStatus(_ type: MCToast.MCToastType?,
                                  text: String,
                                  iconImage: UIImage?,
                                  duration: CGFloat,
                                  respond: MCToast.MCToastRespond,
                                  callback: MCToast.MCToastCallback? = nil) -> (imageView: UIImageView, label: UILabel) {
        
        clearAllToast()
        
        let kToastSize = MCToastConfig.shared.background.size
        var kToastImageSize = MCToastConfig.shared.icon.size
        if (kToastImageSize.width > kToastSize.width) || (kToastImageSize.height > kToastSize.height)  {
            kToastImageSize = CGSize.init(width: 40, height: 40)
        }
        
        
        var showImage: UIImage?
        
        if let tempType = type {
            switch tempType {
            case .success:
                if let trueImage = MCToastConfig.shared.icon.successImage {
                    showImage = trueImage
                }
            case .failure:
                if let trueImage = MCToastConfig.shared.icon.failureImage {
                    showImage = trueImage
                }
            case .warning:
                if let trueImage = MCToastConfig.shared.icon.warningImage {
                    showImage = trueImage
                }
            }
        }
        
        if let _ = iconImage {
            showImage = iconImage
        }
        
        let checkmarkView = UIImageView(image: showImage)
        let checkmarkX = (kToastSize.width - kToastImageSize.width) / 2
        let checkmarkY = ((kToastSize.height - kToastImageSize.height - 35) / 2)
        checkmarkView.frame = CGRect.init(x: checkmarkX, y: checkmarkY, width: kToastImageSize.width, height: kToastImageSize.height)
        
        
        let label = UILabel()
        label.font = MCToastConfig.shared.text.font
//        label.textColor = MCToast.colorWithSystemStyle(UIColor.black, UIColor.white)
        label.textColor = .white
        label.text = text
        label.numberOfLines = 2
        label.textAlignment = NSTextAlignment.center
        let labelWidth = kToastSize.width - 20
        let labelSize = label.sizeThatFits(CGSize(width: labelWidth, height: CGFloat.greatestFiniteMagnitude))
        label.frame = CGRect(x: 10, y: checkmarkView.frame.maxY + 15, width: labelWidth, height: labelSize.height)
        
        
        let frame = CGRect(x: 0, y: 0, width: kToastSize.width, height: kToastSize.height - 20 + labelSize.height)
        
        let window = MCToast.createWindow(respond: respond, frame: frame)
        
        let mainView = MCToast.createMainView(frame: frame)
        window.addSubview(mainView)
        mainView.center = CGPoint.init(x: window.frame.size.width/2, y: kScreenHeight/2 - window.frame.origin.y)
        
        mainView.addSubview(checkmarkView)
        mainView.addSubview(label)
        
        window.addSubview(mainView)
        windows.append(window)
        
        MCToast.autoRemove(window: window, duration: duration, callback: callback)
        
        return (checkmarkView, label)
    }
}



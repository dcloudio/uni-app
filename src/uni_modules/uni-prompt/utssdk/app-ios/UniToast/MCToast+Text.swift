//
//  MCToast+Text.swift
//  MCToast
//
//  Created by Mccc on 2020/6/24.
//

import UIKit

extension UIResponder {
    
    /// 展示文字toast
    /// - Parameters:
    ///   - text: 文字内容
    ///   - offset: 距离屏幕Y轴中心的距离（正下，负上）
    ///   - duration: 显示的时间（秒）
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
    public func mc_text(_ text: String,
                        offset: CGFloat? = nil,
                        duration: CGFloat = MCToastConfig.shared.duration,
                        respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
                        callback: MCToast.MCToastCallback? = nil) {
        MCToast.mc_text(text, offset: offset, duration: duration, respond: respond, callback: callback)
    }
}


extension MCToast {
    
    
    /// 展示文字toast
    /// - Parameters:
    ///   - text: 文字内容
    ///   - offset: 距离屏幕Y轴中心的距离（正下，负上）
    ///   - duration: 显示的时间（秒）
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
    public static func mc_text(_ text: String,
                               offset: CGFloat? = nil,
                               duration: CGFloat = MCToastConfig.shared.duration,
                               respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
                               callback: MCToast.MCToastCallback? = nil) {
        
        DispatchQueue.main.async {
            MCToast.showText(text, offset: offset, duration: duration, respond: respond, callback: callback)
        }
    }
}


// MARK: - 显示纯文字
extension MCToast {
    
    
    /// 展示文字toast
    /// - Parameters:
    ///   - text: 文字内容
    ///   - offset: 距离屏幕Y轴中心的距离（正下，负上）
    ///   - duration: 显示的时间（秒）
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
    @discardableResult
    internal static func showText(_ text: String,
                                  offset: CGFloat? = nil,
                                  duration: CGFloat,
                                  respond: MCToast.MCToastRespond,
                                  callback: MCToast.MCToastCallback? = nil) -> UIWindow {
        
        clearAllToast()
        
        let label = UILabel()
        label.text = text
        label.numberOfLines = 0
        label.font = MCToastConfig.shared.text.font
        label.textAlignment = .center
//        label.textColor = MCToast.colorWithSystemStyle(UIColor.black, UIColor.white)
        label.textColor = .white

        let labelWidth = kScreenWidth-(MCToastConfig.shared.spacing.margin + MCToastConfig.shared.spacing.padding) * 2
        let size = label.sizeThatFits(CGSize(width: labelWidth, height: CGFloat.greatestFiniteMagnitude))
        label.frame = CGRect(x: 0, y: 0, width: size.width, height: size.height)
        
        
        let superFrame = CGRect(x: 0, y: 0, width: label.frame.width + 2*MCToastConfig.shared.spacing.padding, height: label.frame.height + 30)
        
        
        let mainView = MCToast.createMainView(frame: superFrame)
        
        let window = MCToast.createWindow(respond: respond, frame: superFrame)
        
        var tempOffset: CGFloat = 0
        
        if let temp = offset {
            tempOffset = temp
        } else {
            tempOffset = MCToastConfig.shared.text.offset
        }
        
        window.addSubview(mainView)
        var main_y = tempOffset + superFrame.size.height/2
        if respond == .noRespond {
            main_y = tempOffset + window.frame.height/2
        }
        mainView.center = CGPoint.init(x: window.frame.size.width/2, y: main_y)
        
        mainView.addSubview(label)
        label.center = CGPoint.init(x: mainView.frame.size.width/2, y: mainView.frame.size.height/2)


        windows.append(window)
        
        MCToast.autoRemove(window: window, duration: duration, callback: callback)
        
        return window
    }
}

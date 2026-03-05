//
//  MCToast+noticeBar.swift
//  MCToast
//
//  Created by Mccc on 2020/6/24.
//

import Foundation
import UIKit
extension UIResponder {
    
    /// 在状态栏栏显示一个toast
    /// - Parameters:
    ///   - text: 显示的文字内容
    ///   - duration: 显示的时长（秒）
    ///   - font: 文字字体
    ///   - backgroundColor: 背景颜色
    ///   - callback: 隐藏的回调
    public func mc_statusBar( _ text: String,
           duration: CGFloat = MCToastConfig.shared.duration,
           font: UIFont = MCToastConfig.shared.text.font,
           backgroundColor: UIColor? = nil,
           callback: MCToast.MCToastCallback? = nil) {
        MCToast.mc_statusBar(text, duration: duration, font: font, backgroundColor: backgroundColor, callback: callback)
    }
}


extension MCToast {

    /// 在状态栏栏显示一个toast
    /// - Parameters:
    ///   - text: 显示的文字内容
    ///   - duration: 显示的时长（秒）
    ///   - font: 文字字体
    ///   - backgroundColor: 背景颜色
    ///   - callback: 隐藏的回调
    public static func mc_statusBar(
        _ text: String,
        duration: CGFloat = MCToastConfig.shared.duration,
        font: UIFont = MCToastConfig.shared.text.font,
        backgroundColor: UIColor? = nil,
        callback: MCToast.MCToastCallback? = nil) {
                
        DispatchQueue.main.async {
            MCToast.noticeOnStatusBar(text, duration: duration, backgroundColor: backgroundColor, font: font, callback: callback)
        }
    }
}



// MARK: - 在状态栏上显示提示框
extension MCToast {
    

    @discardableResult
    internal static func noticeOnStatusBar(
        _ text: String,
        duration: CGFloat,
        backgroundColor: UIColor?,
        font: UIFont,
        callback: MCToast.MCToastCallback? = nil) -> UIWindow {
        
        clearAllToast()

        
        var labelY: CGFloat = 0
        let labelHeight: CGFloat = 20
        
        
        let topSafeAreaHeight: CGFloat = safeAreaInsets().top
        
        var frame = UIApplication.shared.statusBarFrame
        
        if frame.size.height > 20 {
            frame.size.height = topSafeAreaHeight + labelHeight
            labelY = topSafeAreaHeight
        } else {
            labelY = 0
        }
        
        
        let window = UIWindow()
        window.backgroundColor = UIColor.clear
        
        
        let view = UIView()
        
        if let color = backgroundColor {
            view.backgroundColor = color
        } else {
            view.backgroundColor = UIColor(red: 0x6a/0x100, green: 0xb4/0x100, blue: 0x9f/0x100, alpha: 1)
        }
        
        let label = UILabel()
        label.frame = CGRect.init(x: 0, y: labelY, width: frame.width, height: labelHeight)
        label.textAlignment = NSTextAlignment.center
        label.font = font
//        label.textColor = MCToast.colorWithSystemStyle(UIColor.black, UIColor.white)
            label.textColor = .white
        label.text = text
        view.addSubview(label)
        
        window.frame = frame
        view.frame = frame
        
        
        window.windowLevel = UIWindow.Level.statusBar
        window.isHidden = false
        window.addSubview(view)
        windows.append(window)
        
        var origPoint = view.frame.origin
        origPoint.y = -(view.frame.size.height)
        let destPoint = view.frame.origin
        view.tag = sn_topBar
        
        view.frame = CGRect(origin: origPoint, size: view.frame.size)
        UIView.animate(withDuration: 0.3, animations: {
            view.frame = CGRect(origin: destPoint, size: view.frame.size)
        }, completion: { b in
            MCToast.autoRemove(window: window, duration: duration, callback: callback)
        })
        return window
    }
}

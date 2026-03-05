//
//  MCToast.swift
//  MCToast
//
//  Created by Mccc on 2019/4/19.
//



//待处理
//Wait状态，用json文件处理
// 多个状态更新的方案 （开始上传，正在上传，上传成功）


import Foundation
import UIKit

internal let sn_topBar: Int = 1001


internal let kScreenWidth = UIScreen.main.bounds.size.width
internal let kScreenHeight = UIScreen.main.bounds.size.height




public class MCToast: NSObject {
    
    /// 管理所有的windows
    internal static var windows = Array<UIWindow?>()
    internal static let keyWindow = UIApplication.shared.keyWindow?.subviews.first as UIView?
    internal static var timer: DispatchSource!
    internal static var timerTimes = 0
    
    private override init() { }
    
    internal static func safeAreaInsets() -> (top: CGFloat, bottom: CGFloat) {
        if #available(iOS 11.0, *) {
            
            let inset = UIApplication.shared.delegate?.window??.safeAreaInsets
            return (inset?.top ?? 0, inset?.bottom ?? 0)
        } else {
            return (0, 0)
        }
    }
}


extension MCToast {
    public typealias MCToastCallback = () -> Void

    public enum MCToastRespond {
        
        /// Toast展示期间允许事件交互(等于respond)
        case `default`
        
        /// Toast展示期间不允许事件交互
        case noRespond
        
        /// Toast展示期间允许事件交互
        case respond
        
        /// Toast展示期间只允许导航条交互
        case navBarRespond
    }
}


extension MCToast {
    
    
    /// 创建Window
    /// - Parameters:
    ///   - respond: 交互类型
    ///   - frame: window的frame
    static func createWindow(respond: MCToastRespond, frame: CGRect) -> UIWindow {
        
        let window = UIWindow()
        window.backgroundColor = UIColor.clear
        
        switch respond {
            case .respond, .default:
                window.frame = frame
                window.center = keyWindow!.center
        case .noRespond:
            window.frame = CGRect.init(x: 0, y: 0, width: kScreenWidth, height: kScreenHeight)
        case .navBarRespond:
            let vc = UIViewController.current()
            let rectNav = vc.navigationController?.navigationBar.frame
            let maxY = rectNav?.maxY ?? 0
            
            if vc.navigationController != nil && vc.navigationController?.navigationBar.isHidden == false {
                window.frame = CGRect.init(x: 0, y: maxY, width: kScreenWidth, height: kScreenHeight - maxY)
            } else {
                window.frame = CGRect.init(x: 0, y: 0, width: kScreenWidth, height: kScreenHeight)
            }
        }
        window.windowLevel = UIWindow.Level.alert
        window.isHidden = false
        
        return window
    }
    
    /// 创建主视图区域
    static func createMainView(frame: CGRect) -> UIView {
        let mainView = UIView()
        mainView.layer.cornerRadius = 10
        mainView.backgroundColor = MCToastConfig.shared.background.color
//        let darkColor : UIColor = UIColor.init(_colorLiteralRed: 1.0, green: 1.0, blue: 1.0, alpha: 0.8)
//        let lightColor : UIColor = UIColor.init(_colorLiteralRed: 0.0, green: 0.0, blue: 0.0, alpha: 0.7)
//        mainView.backgroundColor = MCToast.colorWithSystemStyle(darkColor, lightColor)
        
//        mainView.backgroundColor = UIColor.init(_colorLiteralRed: 0.0, green: 0.0, blue: 0.0, alpha: 0.7)
        mainView.frame = frame
        mainView.alpha = 0.0
        UIView.animate(withDuration: 0.2, animations: {
            mainView.alpha = 1
        })
        return mainView
    }
    

}

extension MCToast{
    public static func colorWithSystemStyle(_ darkColor:UIColor,_ defaultColor: UIColor) -> UIColor{
        if #available(iOS 13.0, *){
            let color = UIColor.init { traitCollection in
                return traitCollection.userInterfaceStyle == .dark ? darkColor : defaultColor
            }
            return color
        }
        return defaultColor
    }
}

//
//  MCToast+Remove.swift
//  MCToast
//
//  Created by Mccc on 2020/6/24.
//

import Foundation
import UIKit

extension UIResponder {
    
    /// 移除toast
    /// - Parameter callback: 移除成功的回调
    public func mc_remove(callback: MCToast.MCToastCallback? = nil) {
        MCToast.clearAllToast(callback: callback)
    }
}


extension MCToast {
    /// 移除toast
    /// - Parameter callback: 移除成功的回调
    public static func mc_remove(callback: MCToast.MCToastCallback? = nil) {
        DispatchQueue.main.async {
            MCToast.clearAllToast(callback: callback)
        }
    }
}


internal extension Selector {
    static let hideNotice = #selector(MCToast.hideNotice(_:))
}

extension MCToast {
    
    /// 隐藏
    @objc static func hideNotice(_ sender: AnyObject) {
        if let window = sender as? UIWindow {
            
            if let v = window.subviews.first {
                UIView.animate(withDuration: 0.2, animations: {
                    
                    if v.tag == sn_topBar {
                        v.frame = CGRect(x: 0, y: -v.frame.height, width: v.frame.width, height: v.frame.height)
                    }
                    v.alpha = 0
                }, completion: { b in
                    
                    if let index = windows.firstIndex(where: { (item) -> Bool in
                        return item == window
                    }) {
                        windows.remove(at: index)
                    }
                })
            }
        }
    }
    
    
    /// 清空
    static func clearAllToast(callback: MCToastCallback? = nil) {
        self.cancelPreviousPerformRequests(withTarget: self)
        if let _ = timer {
            timer.cancel()
            timer = nil
            timerTimes = 0
        }
        windows.removeAll(keepingCapacity: false)
        callback?()
    }
}


extension MCToast {
    
    /// 自动隐藏
    static func autoRemove(window: UIWindow, duration: CGFloat, callback: MCToastCallback?) {
        let autoClear : Bool = duration > 0 ? true : false
        if autoClear {
            self.perform(.hideNotice, with: window, afterDelay: TimeInterval(duration))
             
            let time = DispatchTime.now() + .milliseconds(Int(duration * 1000))
            DispatchQueue.main.asyncAfter(deadline: time) {
                callback?()
            }
        }
    }
}

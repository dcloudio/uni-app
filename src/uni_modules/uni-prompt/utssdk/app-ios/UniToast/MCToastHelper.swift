//
//  MCToastHelper.swift
//  MCToast
//
//  Created by Mccc on 2019/11/25.
//

import Foundation
import UIKit


@objc extension Bundle {
    
    /**
     * 加载指定bundle下的图片资源
     * 在哪个pod下的哪个bundle下的image
     */
    static func loadImage(_ imageName: String, from bundleName: String, in podName: String) -> UIImage? {
        
        
        var associateBundleURL = Bundle.main.url(forResource: "Frameworks", withExtension: nil)
        associateBundleURL = associateBundleURL?.appendingPathComponent(podName)
        associateBundleURL = associateBundleURL?.appendingPathExtension("framework")
       
        
        if associateBundleURL != nil {
            let associateBunle = Bundle.init(url: associateBundleURL!)
            associateBundleURL = associateBunle?.url(forResource: bundleName, withExtension: "bundle")
            let bundle = Bundle.init(url: associateBundleURL!)
            if let path = bundle?.path(forResource: imageName, ofType: "png") {
                let image1 = UIImage.init(contentsOfFile: path)
                return image1
            }
            
//            let scale = Int(UIScreen.main.scale)
//            
//            // 适配2x还是3x图片
//            let name = imageName + "@" + String(scale) + "x"
//            if let path = bundle?.path(forResource: name, ofType: "png") {
//                let image1 = UIImage.init(contentsOfFile: path)
//                return image1
//            }
        }

        return nil
    }
    
    static func getBundleWithName(
        _ bundleName: String,
        inPod podName: String) -> Bundle? {
        
        
        var associateBundleURL = Bundle.main.url(forResource: "Frameworks", withExtension: nil)
        associateBundleURL = associateBundleURL?.appendingPathComponent(podName)
        associateBundleURL = associateBundleURL?.appendingPathExtension("framework")
       
        
        if associateBundleURL == nil {
            print("获取bundle失败")
            return nil
        }
        
        let associateBunle = Bundle.init(url: associateBundleURL!)
        associateBundleURL = associateBunle?.url(forResource: bundleName, withExtension: "bundle")
        let bundle = Bundle.init(url: associateBundleURL!)
    
        return bundle
    }
}



extension UIViewController {
    
    /// 获取当前控制器
    static func current() -> UIViewController {
        let vc = UIApplication.shared.keyWindow?.rootViewController
        return UIViewController.findBest(vc: vc!)
    }
    
    private static func findBest(vc: UIViewController) -> UIViewController {
        if vc.presentedViewController != nil {
            return UIViewController.findBest(vc: vc.presentedViewController!)
        } else if vc.isKind(of: UISplitViewController.self) {
            let svc = vc as! UISplitViewController
            if svc.viewControllers.count > 0 {
                return UIViewController.findBest(vc: svc.viewControllers.last!)
            } else {
                return vc
            }
        } else if vc.isKind(of: UINavigationController.self) {
            let svc = vc as! UINavigationController
            if svc.viewControllers.count > 0 {
                return UIViewController.findBest(vc: svc.topViewController!)
            } else {
                return vc
            }
        } else if vc.isKind(of: UITabBarController.self) {
            let svc = vc as! UITabBarController
            if (svc.viewControllers?.count ?? 0) > 0 {
                return UIViewController.findBest(vc: svc.selectedViewController!)
            } else {
                return vc
            }
        } else {
            return vc
        }
    }
}





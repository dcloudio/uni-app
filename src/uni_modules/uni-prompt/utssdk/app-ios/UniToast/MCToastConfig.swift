//
//  MCToastConfig.swift
//  MCComponentFunction_Example
//
//  Created by Mccc on 2019/7/8.
//  Copyright © 2019 CocoaPods. All rights reserved.
//

import Foundation
import UIKit

public class MCToastConfig: NSObject {
    public static let shared = MCToastConfig()
    
    /// 设置交互区域 默认导航栏下禁止交互
    public var respond = MCToast.MCToastRespond.respond
    
    /// 背景的设置
    public var background = Background()
    
    /// 状态Icon的设置
    public var icon = Icon()
    
    /// 文本的设置
    public var text = Text()
    
    /// 间距的设置
    public var spacing = MainAreaSpacing()
    
    /// 自动隐藏的时长
    public var duration: CGFloat = 1.5
}


extension MCToastConfig {
    public struct Background {
        /// toast 的背景颜色
        public var color: UIColor = UIColor(red: 76/255, green: 76/255, blue: 76/255, alpha: 0.9)
        /// toast的size
        public var size: CGSize = CGSize.init(width: 135, height: 135)
    }
    
    public struct Icon {
        /// toast icon的size
        public var size: CGSize = CGSize.init(width: 50, height: 50)
        public var successImage: UIImage?
        public var failureImage: UIImage?
        public var warningImage: UIImage?
    }
    
    public struct Text {
        public var textColor: UIColor?
        public var font: UIFont = UIFont.systemFont(ofSize: 15)
        public var offset: CGFloat = (UIScreen.main.bounds.size.height / 2 - 120)
    }
    
    
    /// 主区域的间距
    public struct MainAreaSpacing {
        /// 外边距（toast距离屏幕边的最小边距）
        public var margin: CGFloat = 55
        /// 内边距（toast和其中的内容的最小边距）
        public var padding: CGFloat = 15
    }
}

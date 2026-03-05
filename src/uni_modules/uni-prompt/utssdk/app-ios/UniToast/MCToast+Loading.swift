//
//  MCToast+Loading.swift
//  MCToast
//
//  Created by Mccc on 2020/6/24.
//




/**
 loading 里面新增
 
 1. 帧动画
 2. json动画
 3. 系统loading
 4. 是否需要文字提示
 5. 如何动态更新文字 （比如上传图片的数量的改动）
 6. 
 */

//import Lottie
import UIKit

extension UIResponder {
    
    
    /// loading (菊花)
    /// - Parameters:
    ///   - text: 显示的内容
    ///   - duration: 持续时间
    ///   - respond: 交互方式
    ///   - callback: 隐藏回调
    public func mc_loading(text: String = "正在加载中",
                           duration: CGFloat = 0,
                           respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
                           callback: MCToast.MCToastCallback? = nil) {
        DispatchQueue.main.async {
            MCToast.loading(text: text, duration: duration, respond: respond, callback: callback)
        }
    }
    
    /// loading (帧动画)
    /// - Parameters:
    ///   - imageNames: 图片组
    ///   - animationSpeed: 动画帧速度（秒）
    ///   - duration: 持续时间
    ///   - respond: 交互方式
    ///   - callback: 隐藏回调
    public func mc_loading(imageNames: [UIImage?],
                           animationSpeed: CGFloat = 0.1,
                           duration: CGFloat = 0,
                           respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
                           callback: MCToast.MCToastCallback? = nil) {
        DispatchQueue.main.async {
            MCToast.loading(imageNames: imageNames, animationSpeed: animationSpeed, duration: duration, respond: respond, callback: callback)
        }
    }
    
    
    
    /// Loading （Json动画）
    /// - Parameters:
    ///   - animation: json动画类型
    ///   - animationSpeed: 动画播放速度，越大越快
    ///   - duration: 持续时间
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
//    public static func mc_loading(animation: Animation? = nil,
//                               animationSpeed: CGFloat = 1,
//                               duration: CGFloat = 0,
//                               respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
//                               callback: MCToast.MCToastCallback? = nil) {
//        DispatchQueue.main.async {
//            MCToast.loading(animation: animation, animationSpeed: animationSpeed, duration: duration, respond: respond, callback: callback)
//        }
//    }
}


extension MCToast {
    
    /// loading (菊花)
    ///
    /// - Parameters:
    ///   - text: 文字内容 默认为 "正在加载中"
    ///   - duration: 自动隐藏的时间
    ///   - font: 字体大小
    public static func mc_loading(text: String = "正在加载中",
                                  duration: CGFloat = 0,
                                  respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
                                  callback: MCToast.MCToastCallback? = nil) {
        DispatchQueue.main.async {
            MCToast.loading(text: text, duration: duration, respond: respond, callback: callback)
        }
    }
    
    /// loading (帧动画)
    /// - Parameters:
    ///   - imageNames: 图片组
    ///   - animationSpeed: 动画帧速度（秒）
    ///   - duration: 持续时间
    ///   - respond: 交互方式
    ///   - callback: 隐藏回调
    public static func mc_loading(imageNames: [UIImage?],
                                  animationSpeed: CGFloat = 0.1,
                                  duration: CGFloat = 0,
                                  respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
                                  callback: MCToast.MCToastCallback? = nil) {
        DispatchQueue.main.async {
            MCToast.loading(imageNames: imageNames, animationSpeed: animationSpeed, duration: duration, respond: respond, callback: callback)
        }
    }
    
    

    
    /// Loading （Json动画）
    /// - Parameters:
    ///   - animation: json动画类型
    ///   - animationSpeed: 动画播放速度，越大越快
    ///   - duration: 持续时间
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
//    public static func mc_loading(animation: Animation? = nil,
//                               animationSpeed: CGFloat = 1,
//                               duration: CGFloat = 0,
//                               respond: MCToast.MCToastRespond = MCToastConfig.shared.respond,
//                               callback: MCToast.MCToastCallback? = nil) {
//        DispatchQueue.main.async {
//            MCToast.loading(animation: animation, animationSpeed: animationSpeed, duration: duration, respond: respond, callback: callback)
//        }
//    }
}




// MARK: - 网络等待 菊花转圈
extension MCToast {
    
    
    /// Loading （菊花）
    /// - Parameters:
    ///   - text: 文字内容
    ///   - animationSpeed: 动画帧速度
    ///   - duration: 持续时间
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
    @discardableResult
    fileprivate static func loading(text: String,
                               duration: CGFloat,
                               respond: MCToast.MCToastRespond,
                               callback: MCToast.MCToastCallback? = nil) -> UIWindow {
        
        clearAllToast()
        
        let frame = MCToast.getMainFrame()

        let kToastSize = frame.size
        var kToastImageSize = MCToastConfig.shared.icon.size

        if (kToastImageSize.width > kToastSize.width) || (kToastImageSize.height > kToastSize.height)  {
            kToastImageSize = CGSize.init(width: 40, height: 40)
        }
                
        let window = MCToast.createWindow(respond: respond, frame: frame)
        let mainView = MCToast.createMainView(frame: frame)
    
        window.addSubview(mainView)
        windows.append(window)
        
        mainView.center = CGPoint.init(x: window.frame.size.width/2, y: kScreenHeight/2 - window.frame.origin.y)
        
        let isShowLoadingOnly = text.count > 0 ? false : true
        
        let activity = UIActivityIndicatorView(style: UIActivityIndicatorView.Style.whiteLarge)
        let activityX = (kToastSize.width - kToastImageSize.width) / 2
        let fitActivityOffset = isShowLoadingOnly ? 0.0 : 30.0
        let activityY = ((kToastSize.height - kToastImageSize.height - fitActivityOffset) / 2)
        activity.frame = CGRect.init(x: activityX, y: activityY, width: kToastImageSize.width, height: kToastImageSize.height)
        activity.startAnimating()
        mainView.addSubview(activity)
        
        if !isShowLoadingOnly {
            let label = UILabel()
            label.text = text
            label.font = MCToastConfig.shared.text.font
            label.textAlignment = .center
    //        label.textColor = MCToast.colorWithSystemStyle(UIColor.black, UIColor.white)
            label.textColor = .white
            label.numberOfLines = 2
            label.backgroundColor = UIColor.clear
            
            let w: Double = kToastSize.width - 14.0
            var textHeight =  (text as NSString).dc_getBoundingSize(label.font, label.font.lineHeight, CGSize(width: w, height: Double(MAXFLOAT))).height
            if textHeight > 36 {
                textHeight = 36
            }
            label.frame = CGRect(x: 7, y: activity.frame.maxY + 12, width: kToastSize.width - 14, height: textHeight)
            mainView.frame.size = CGSize(width: mainView.bounds.size.width, height: label.frame.maxY + 18)
            mainView.addSubview(label)
        }
        
        MCToast.autoRemove(window: window, duration: duration, callback: callback)
        
        return window
    }
    
    
    /// Loading （图片帧动画）
    /// - Parameters:
    ///   - imageNames: 图片数组
    ///   - animationSpeed: 动画帧速度
    ///   - duration: 持续时间
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
    @discardableResult
    fileprivate static func loading(imageNames: [UIImage?] = [],
                                 animationSpeed: CGFloat,
                                 duration: CGFloat,
                                 respond: MCToast.MCToastRespond,
                                 callback: MCToast.MCToastCallback?) -> UIWindow {
        
        clearAllToast()

        let frame = MCToast.getMainFrame()
        let window = MCToast.createWindow(respond: respond, frame: frame)
        let mainView = MCToast.createMainView(frame: frame)
        mainView.center = CGPoint.init(x: window.frame.size.width/2, y: kScreenHeight/2 - window.frame.origin.y)
        
        window.addSubview(mainView)
        windows.append(window)
        
        if imageNames.count > timerTimes {
            if imageNames.count > timerTimes {
                let iv = UIImageView(frame: frame)
                iv.image = imageNames.first!
                iv.contentMode = UIView.ContentMode.scaleAspectFit
                mainView.addSubview(iv)
                timer = (DispatchSource.makeTimerSource(flags: DispatchSource.TimerFlags(rawValue: UInt(0)), queue: DispatchQueue.main) as! DispatchSource)
                timer.schedule(deadline: DispatchTime.now(), repeating: DispatchTimeInterval.milliseconds(Int(animationSpeed*1000)))
                timer.setEventHandler(handler: { () -> Void in
                    let name = imageNames[timerTimes % imageNames.count]
                    iv.image = name
                    timerTimes += 1
                })
                timer.resume()
            }
        }
        
        MCToast.autoRemove(window: window, duration: duration, callback: callback)
        
        return window
    }
    
    
    
    
    /// Loading （Json动画）
    /// - Parameters:
    ///   - animation: json动画类型
    ///   - animationSpeed: 动画播放速度，越大越快
    ///   - duration: 持续时间
    ///   - respond: 交互类型
    ///   - callback: 隐藏的回调
//    @discardableResult
//    fileprivate static func loading(animation: Animation? = nil,
//                               animationSpeed: CGFloat,
//                               duration: CGFloat,
//                               respond: MCToast.MCToastRespond,
//                               callback: MCToast.MCToastCallback?) -> UIWindow {
//        
//        clearAllToast()
//
//        let frame = MCToast.getMainFrame()
//        let window = MCToast.createWindow(respond: respond, frame: frame)
//        
//        let mainView = MCToast.createMainView(frame: frame)
//        mainView.center = CGPoint.init(x: window.frame.size.width/2, y: kScreenHeight/2 - window.frame.origin.y)
//        window.addSubview(mainView)
//        windows.append(window)
//        
//        var animationTemp: Animation?
//        
//        if let _ = animation {
//            animationTemp = animation
//        } else {
//            if let bundle = Bundle.getBundleWithName("ToastBundle", inPod: "MCToast"),
//                let path = bundle.path(forResource: "waiting", ofType: "json") {
//                animationTemp = Animation.filepath(path, animationCache: nil)
//            }
//        }
//        
//        let animationView = AnimationView()
//        animationView.animation = animationTemp
//        animationView.loopMode = .loop
//        animationView.animationSpeed = animationSpeed
//        animationView.contentMode = .scaleAspectFit
//        animationView.backgroundBehavior = .pauseAndRestore
//        animationView.frame = frame
//        animationView.play()
//        mainView.addSubview(animationView)
//        
//        MCToast.autoRemove(window: window, duration: duration, callback: callback)
//        
//        return window
//    }
}


extension MCToast {
    fileprivate static func getMainFrame() -> CGRect {
        let kToastSize = MCToastConfig.shared.background.size
        let frame = CGRect(x: 0, y: 0, width: kToastSize.width, height: kToastSize.height)
        return frame
    }
}


extension NSString {
    public func dc_getBoundingSize(_ font: UIFont?, _ lineHeight: CGFloat, _ size: CGSize) -> CGSize {
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

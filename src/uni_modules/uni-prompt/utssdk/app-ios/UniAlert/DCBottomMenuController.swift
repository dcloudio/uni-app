//
//  DCBottomMenuController.swift
//  DCloudAlertController
//
//  Created by lizhongyi on 2023/3/7.
//

import Foundation
import UIKit

enum DCBottomMenuShowStyle: Int {
    case unknow = 0
    case bottom = 1
    case middle = 2
    case top = 3
}

typealias DCBottomMenuControllerTapMaskBlock = () -> Void

protocol DCBottomMenuControllerProtocol {
    func contentHeight(_ parentSize: CGSize) -> CGFloat
    func contentWidth(_ parentSize: CGSize) -> CGFloat
}

extension DCBottomMenuControllerProtocol {
    func contentHeight(_ parentSize: CGSize) -> CGFloat {
        return kBottomMenuMAXContentHeight
    }
    
    func contentWidth(_ parentSize: CGSize) -> CGFloat {
        return parentSize.width
    }
}

let kBottomMenuMAXContentHeight = UIScreen.main.bounds.height * 0.8
let kBottomMenuMinBackWindowHeight = 0
let isPad = UIDevice.current.userInterfaceIdiom == .pad

class DCBottomMenuController: UIViewController {
    var contentViewController: (UIViewController & DCBottomMenuControllerProtocol)?
    var shouldDismissOnTapBackgroud: Bool = true
    var bottomMenuShowStyle: DCBottomMenuShowStyle = .bottom
    var tapMaskDismissCallBack: DCBottomMenuControllerTapMaskBlock?
    /// 是否禁止向底层 view  controller 发送 life cycle events，default: NO
    var disableLifeCycleEvents: Bool = false
    var contentVisiable: Bool = false
    
    lazy var maskView: UIControl = {
        let mask = UIControl(frame: self.view.bounds)
        mask.backgroundColor = UIColor(white: 0.0, alpha: 0.6)
        mask.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        mask.addTarget(self, action: #selector(onTapMaskView(_:)), for: .touchUpInside)
        return mask
    }()
    
    static func bottomMenuMaxContentHeight() -> CGFloat {
        return kBottomMenuMAXContentHeight
    }
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nil, bundle: nil)
        self.transitioningDelegate = self
        self.modalPresentationStyle = .custom
        if isPad {
            self.bottomMenuShowStyle = .middle
        }else {
            self.bottomMenuShowStyle = .bottom
        }
        self.shouldDismissOnTapBackgroud = true
        
    }
    
    convenience init(_ contentViewController: UIViewController & DCBottomMenuControllerProtocol) {
        self.init(nibName: nil, bundle: nil)
        self.setContentVC(contentViewController)
    }
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask {
        return DCActionSheetController.supportedInterfaceOrientations ?? .portrait
    }
    
    convenience init(_ contentViewController: UIViewController & DCBottomMenuControllerProtocol, _ bottomMenuShowStyle: DCBottomMenuShowStyle) {
        self.init(nibName: nil, bundle: nil)
        self.setContentVC(contentViewController)
        self.bottomMenuShowStyle = bottomMenuShowStyle
    }
    
    override var shouldAutorotate: Bool {
        return true
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setContentVC(_ vc: UIViewController & DCBottomMenuControllerProtocol) {
        let oldVC = self.contentViewController
        self.contentViewController = vc
        if let contentVC = self.contentViewController {
            self.installContentViewController(contentVC)
            self.setContentVisiable(false)
            if let oldVC = oldVC {
                self.maskView.alpha = 1.0
                UIView.animate(withDuration: 0.25, animations: {
                    oldVC.view.top = self.view.height
                }) { finished in
                    self.uninstallContentViewController(oldVC)
                    UIView.animate(withDuration: 0.25) {
                        self.setContentVisiable(true)
                    }
                }
            }else {
                UIView.animate(withDuration: 0.25) {
                    self.setContentVisiable(true)
                }
            }
        }else if let old = oldVC {
            uninstallContentViewController(old)
        }
    }
    
    func uninstallContentViewController(_ vc: UIViewController?) {
        guard let newVc = vc else { return }
        newVc.willMove(toParent: nil)
        newVc.view.removeFromSuperview()
        vc?.removeFromParent()
        vc?.didMove(toParent: nil)
    }
    
    func installContentViewController(_ vc: UIViewController?) {
        guard let newVC = vc else { return }
        newVC.willMove(toParent: self)
        self.view.addSubview(newVC.view)
        self.addChild(newVC)
        newVC.didMove(toParent: self)
        if self.bottomMenuShowStyle == .middle {
            newVC.view.layer.cornerRadius = 5.0
            newVC.view.layer.masksToBounds = true
        }
    }
    
    override func loadView() {
        super.loadView()
        maskView.alpha = 0
        self.view.insertSubview(maskView, at: 0)
        installContentViewController(self.contentViewController)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.clear
        self.modalPresentationStyle = .custom
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        self.setContentVisiable(self.contentVisiable)
    }
    
    @objc func onTapMaskView(_ tap: UITapGestureRecognizer) {
        if self.shouldDismissOnTapBackgroud == true {
            self.dismissNoAnimatedWithCompletion {
                self.tapMaskDismissCallBack?()
            }
        }
    }
    
    func setContentVisiable(_ visiable: Bool) {
        if let contentVC = self.contentViewController {
            var contentWidth = self.maskView.bounds.size.width
            if isPad, self.bottomMenuShowStyle == .middle {
                contentWidth = 440.0
            }
            contentWidth = contentVC.contentWidth(maskView.bounds.size)
            contentWidth = min(contentWidth, self.view.width)
            
            var contentHeight = kBottomMenuMAXContentHeight
            contentHeight = contentVC.contentHeight(CGSize(width: contentWidth, height: contentHeight))
            contentHeight = min(contentHeight, kBottomMenuMAXContentHeight)
            contentHeight = min(contentHeight, self.view.height)
            
            if visiable == true {
                maskView.alpha = 1.0
                if bottomMenuShowStyle == .middle {
                    contentViewController?.view.alpha = 1.0
                    contentViewController?.view.frame = CGRect(x: (self.view.width - contentWidth) / 2.0, y: (self.view.height - contentHeight) / 2.0, width: contentWidth, height: contentHeight)
                }else {
                    contentViewController?.view.frame = CGRect(x: 0.0, y: self.view.height - contentHeight, width: self.view.width, height: contentHeight)
                }
            }else {
                maskView.alpha = 0.0
                if bottomMenuShowStyle == .middle {
                    contentViewController?.view.alpha = 0.0
                    contentViewController?.view.frame = CGRect(x: (self.view.width - contentWidth) / 2.0, y: (self.view.height - contentHeight) / 2.0, width: contentWidth, height: contentHeight)
                }else {
                    contentViewController?.view.frame = CGRect(x: 0.0, y: self.view.height - contentHeight, width: self.view.width, height: contentHeight)
                }
            }
        }
        self.contentVisiable = visiable
    }
    
    func setMaskViewBgColor(_ color: UIColor) {
        maskView.backgroundColor = color
    }
    
    func show()  {
        if self.presentingViewController != nil {
            return
        }
        if let topVC = DCAlertControllerUtil.topViewController() {
            if topVC.isBeingPresented, topVC is DCBottomMenuController {
                return
            }
            UIApplication.shared.beginIgnoringInteractionEvents()
            topVC.present(self, animated: true) {
                UIApplication.shared.endIgnoringInteractionEvents()
            }
        }
    }
    
    func dismiss() {
        self.dismiss(animated: true)
    }
    
    func dismissWithCompletion(_ completion: @escaping ()->Void) {
        self.dismiss(animated: true, completion: completion)
    }
    
    func dismissNoAnimatedWithCompletion(_ completion: (()->Void)? = nil) {
        self.dismiss(animated: false, completion: completion)
    }
}

extension DCBottomMenuController: UIViewControllerTransitioningDelegate {
    func animationController(forPresented presented: UIViewController, presenting: UIViewController, source: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        return DCBottomMenuControllerAnimator.init(false, self.disableLifeCycleEvents)
    }
    
    func animationController(forDismissed dismissed: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        return DCBottomMenuControllerAnimator.init(true, self.disableLifeCycleEvents)
    }
}

class DCBottomMenuControllerAnimator: NSObject, UIViewControllerAnimatedTransitioning {

    var dismissing: Bool
    var disableLifeCycleEvents: Bool
    
    init(_ dismissing: Bool, _ disableLifeCycleEvents: Bool) {
        self.dismissing = dismissing
        self.disableLifeCycleEvents = disableLifeCycleEvents
        super.init()
    }
    
    
    func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
        return 0.25
    }
    
    func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {
        guard
            let fromVC = transitionContext.viewController(forKey: .from),
            let toVC = transitionContext.viewController(forKey: .to)
        else {
            return
        }
        
        var alert: DCBottomMenuController? = nil
        if fromVC.isBeingDismissed {
            alert = fromVC as? DCBottomMenuController
        }else {
            alert = toVC as? DCBottomMenuController
            
        }
        
        guard let alert = alert else {
            assert(false, "错误的视图")
            return
        }
        
        let fromView = transitionContext.view(forKey: .from)
        let toView = transitionContext.view(forKey: .to)
        
        let containerView = transitionContext.containerView
        let isAnimated = transitionContext.isAnimated
        var completion: (_ finished: Bool) -> Void
        
        if self.dismissing == true {
            if fromVC.modalPresentationStyle == .fullScreen {
                containerView.addSubview(toVC.view)
            }
            containerView.bringSubviewToFront(fromVC.view)
            if self.disableLifeCycleEvents == false, fromVC.modalPresentationStyle == .custom {
                toVC.beginAppearanceTransition(true, animated: isAnimated)
            }
            completion = { [weak self] finished in
                guard let self = self else { return }
                if self.disableLifeCycleEvents == false, fromVC.modalPresentationStyle == .custom {
                    toVC.endAppearanceTransition()
                }
                transitionContext.completeTransition(!transitionContext.transitionWasCancelled)
                while UIApplication.shared.isIgnoringInteractionEvents {
                    UIApplication.shared.extendStateRestoration()
                }
            }
            fromView?.layer.removeAllAnimations()
        }else {
            if let view = toView {
                containerView.addSubview(view)
            }
            toView?.frame = containerView.bounds
            alert.setContentVisiable(false)
            if self.disableLifeCycleEvents == false, toVC.modalPresentationStyle == .custom {
                fromVC.beginAppearanceTransition(false, animated: isAnimated)
            }
            completion = { [weak self] finished in
                guard let self = self else { return }
                if self.disableLifeCycleEvents == false, toVC.modalPresentationStyle == .custom {
                    fromVC.endAppearanceTransition()
                }
                transitionContext.completeTransition(!transitionContext.transitionWasCancelled)
                while UIApplication.shared.isIgnoringInteractionEvents {
                    UIApplication.shared.extendStateRestoration()
                }
            }
            toView?.layer.removeAllAnimations()
        }
        
        if isAnimated {
            UIView.animate(withDuration: self.transitionDuration(using: transitionContext),
                           animations: {
                                alert.setContentVisiable(!self.dismissing)
            }, completion: completion)
        }else {
            alert.setContentVisiable(!self.dismissing)
            completion(true)
        }
    }
}

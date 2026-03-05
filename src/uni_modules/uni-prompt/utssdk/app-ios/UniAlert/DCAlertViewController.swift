//
//  DCAlertViewController.swift
//  DCloudAlertController
//
//  Created by lizhongyi on 2023/3/9.
//

import Foundation
import UIKit


public enum DCAlertViewControllerStyle: Int {
    case alert = 0
    case textViewAlert = 1
}

////////////////////////////// DCAlertViewControllerDismissDelegate /////////////////////

public protocol DCAlertViewControllerDismissDelegate: UITextViewDelegate {
    func canDismissWithAction(_ action: DCAlertAction?, _ param: Any?) -> Bool
}


////////////////////////////// DCAlertViewController /////////////////////

public class DCAlertViewController: UIViewController {
    public var canOpenDarkMode: Bool = false
    public var contentViewVisible: Bool = false {
        didSet {
            if preferredStyle == .alert {
                contentView?.alpha = (contentViewVisible ? 1.0 : 0.0)
                maskView.alpha = (contentViewVisible ? 1.0 : 0.0)
            }
        }
    }
    public var mesageTitle: String? {
        get {
           return contentView?.title
        }
        set {
            contentView?.title = newValue
            if self.isViewLoaded {
                self.view.setNeedsLayout()
            }
        }
    }
    public var message: String? {
        get {
            return contentView?.message
        }
        set {
            contentView?.message = newValue
            if self.isViewLoaded {
                self.view.setNeedsLayout()
            }
        }
    }
    public var textViewText: String? {
        get {
            return textView?.text
        }
    }
    
    public var textView: UITextView? {
        get {
            if self.alertIsTextViewView() == true {
                return (contentView as? DCAlertTextViewView)?.textView
            }
            return nil
        }
    }
    
    public weak var dismissDelegate: DCAlertViewControllerDismissDelegate? {
        didSet {
            if self.alertIsTextViewView(), let delegate = dismissDelegate {
                self.textView?.delegate = delegate
            }
        }
    }
    
    public var preferredStyle: DCAlertViewControllerStyle
    
    public var tapGesture: UITapGestureRecognizer?
    public var contentView: (UIView & DCAlertControllerContentViewProtocol)?
    var keyboardFrame: CGRect = .zero
    
    lazy var maskView: UIControl = {
        let mask = UIControl.init(frame: self.view.bounds)
        mask.backgroundColor = UIColor(white: 0.0, alpha: 0.47)
        mask.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        return mask
    }()
    
    lazy var nightModeWindowMask: UIView? = {
        if canOpenDarkMode, !isDarkMode(), let view = contentView {
            let mask = UIView(frame: view.frame)
            mask.layer.zPosition = CGFloat(Float.greatestFiniteMagnitude)
            mask.isUserInteractionEnabled = false
            mask.backgroundColor = UIColor(white: 0.0, alpha: 0.5)
            view.addSubview(mask)
            return mask
        }
        return nil
    }()
    
    deinit {
        if let tap = tapGesture {
            tap.delegate = nil
            self.view.removeGestureRecognizer(tap)
        }
        if self.alertIsTextViewView() {
            NotificationCenter.default.removeObserver(self)
        }
    }
    
//  MARK: - init
    
    public init(_ title: String?, _ message: String?, _ preferredStyle: DCAlertViewControllerStyle, _ placeholder: String?) {
        self.preferredStyle = preferredStyle
        super.init(nibName: nil, bundle: nil)

        if preferredStyle == .alert {
            contentView = DCAlertContentView()
            self.message = message
        }else if preferredStyle == .textViewAlert {
            contentView = DCAlertTextViewView()
            
            if let msg = message, let content = contentView as? DCAlertTextViewView {
                content.textView.text = msg
                content.frame.size = msg.dc_boundingSize(UIFont.systemFont(ofSize: 15.0), content.textView.font?.lineHeight ?? 20, CGSize(width: content.bounds.size.width, height: 100))
            }
            if let content = contentView as? DCAlertTextViewView {
                content.textView.placeholder = placeholder
                content.bounds.size.height = placeholder?.dc_boundingSize(UIFont.systemFont(ofSize: 15.0), content.textView.font?.lineHeight ?? 20, CGSize(width: content.bounds.size.width, height: 100)).height ?? 100
            }
            
        }
        
        self.mesageTitle = title
        self.transitioningDelegate = self
        self.modalPresentationStyle = .custom
    }
    
    public init(_ customView: UIView & DCAlertControllerContentViewProtocol, _ preferredStyle: DCAlertViewControllerStyle) {
        self.preferredStyle = preferredStyle
        super.init(nibName: nil, bundle: nil)
        contentView = customView
        self.transitioningDelegate = self
        self.modalPresentationStyle = .custom
        
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
//  MARK: - life cycle
    
    public override func loadView() {
        super.loadView()
        self.view.addSubview(maskView)
        if let view = contentView {
            self.view.addSubview(view)
        }
        self.addTapGesture()
        if self.alertIsTextViewView() == true {
            NotificationCenter.default.addObserver(self, selector: #selector(keyboardFrameWillChange(_:)), name: UIApplication.keyboardWillShowNotification, object: nil)

            NotificationCenter.default.addObserver(self, selector: #selector(keyboardFrameWillChange(_:)), name: UIApplication.keyboardWillChangeFrameNotification, object: nil)

            NotificationCenter.default.addObserver(self, selector: #selector(keyboardFrameWillChange(_:)), name: UIApplication.keyboardWillHideNotification, object: nil)
        }
    }
    

    
    public override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        let rect = self.view.bounds.size
        if preferredStyle == .alert || preferredStyle == .textViewAlert {
            if let fitSize = contentView?.sizeThatFits(CGSize(width: 300, height: 300)), let contentSize = contentView?.bounds.size {
                if !CGSizeEqualToSize(fitSize, contentSize) {
                    contentView?.size = fitSize
                }
            }
            var center = CGPoint(x: rect.width * 0.5, y: round(rect.height * 0.5) - 44.0)
            if keyboardFrame.origin.y > 0, keyboardFrame.origin.y < rect.height {
                let maxY = min(keyboardFrame.minY, rect.height)
                center.y = maxY / 2.0
            }
            if let point = contentView?.center, !CGPointEqualToPoint(center, point) {
                contentView?.center = center
            }
        }
    }
    
    
    public override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.clear
        self.modalPresentationStyle = .custom
        
        contentView?.actionClickedHandler = { [weak self] action in
            guard let self = self else { return }
            if let delegate = self.dismissDelegate {
                var canDismiss = true
                if self.alertIsTextViewView() == true {
                    canDismiss = delegate.canDismissWithAction(action, self.textViewText)
                }else {
                    canDismiss = delegate.canDismissWithAction(action, self)
                }
                if canDismiss == true {
                    self.onTapAction(action)
                }
                
            }else {
                self.onTapAction(action)
            }
        }
    }
    
//  MARK: - convenience
    public func alertControllerWithTitle(_ title: String?, _ message: String?, _ preferredStyle: DCAlertViewControllerStyle, _ placeholder: String?) -> DCAlertViewController {
        return DCAlertViewController.init(title, message, preferredStyle, placeholder)
    }

    public func alertControllerWithCustomView(_ view: UIView & DCAlertControllerContentViewProtocol, _ preferredStyle: DCAlertViewControllerStyle) -> DCAlertViewController {
        return DCAlertViewController.init(view, preferredStyle)
    }

    public func addActionWithTitle(_ title: NSString, _ style: DCAlertActionStyle, _ handler: @escaping (_ action: DCAlertAction) ->Void) -> DCAlertAction {
        let action = DCAlertAction.init(title: title as String, style: style, handler: handler)
        addAction(action)
        return action
    }
    
//  MARK: -
    
    func alertIsTextViewView() -> Bool {
        return preferredStyle == .textViewAlert && (contentView is DCAlertTextViewView)
    }
    
    func isDarkMode() -> Bool {
        if #available(iOS 13.0, *) {
            return UITraitCollection.current.userInterfaceStyle == .dark
        }
        return false
    }
    
    public func addImage(_ image: UIImage, _ position: DCAlertImagePosition) {
        contentView?.imagePositon = position
        contentView?.image = image
        if self.isViewLoaded {
            self.view.setNeedsLayout()
        }
    }
    
    public func addCustomView(_ customView: UIView) {
        contentView?.customView = customView
        if self.isViewLoaded {
            self.view.setNeedsLayout()
        }
    }
    
    public func addAction(_ action: DCAlertAction)  {
        contentView?.addAction(action)
    }
    
    public func addTapGesture() {
        if tapGesture == nil {
            tapGesture = UITapGestureRecognizer.init(target: self, action: #selector(onTapGesture(_:)))
            self.view.addGestureRecognizer(tapGesture!)
        }
    }
    
    public func onTapAction(_ action: DCAlertAction) {
        self.dismiss(animated: true) {
            action.handler(action)
        }
    }
    
    @objc func onTapGesture(_ sender: UITapGestureRecognizer) {
        if let field = self.textView {
            let rect = self.view.convert(field.frame, from: contentView)
            if CGRectContainsPoint(rect, sender.location(in: self.view)) == false {
                field.resignFirstResponder()
            }
        }
    }
    

    public func resetDoneBtnTitleColor(_ color: UIColor) {
        if let buttons = contentView?.buttons, let doneBtn = buttons.last {
            doneBtn.setTitleColor(color, for: .normal)
        }
    }
    
    func adapterNightStyleShow() {
        
    }
    
//  MARK: - nofitication
    @objc func keyboardFrameWillChange(_ notification: Notification) {
        UIView.performWithoutAnimation {
            self.view.setNeedsLayout()
            self.view.layoutIfNeeded()
        }
        if let userInfo = notification.userInfo,
               let dict = userInfo as? [String: NSValue],
           let rect = dict["UIKeyboardFrameEndUserInfoKey"]?.cgRectValue,
           let duration = (dict["UIKeyboardAnimationDurationUserInfoKey"] as? NSNumber)?.doubleValue,
           let options = (dict["UIKeyboardAnimationCurveUserInfoKey"] as? NSNumber)?.uintValue {
            
            self.keyboardFrame = rect
            UIView.animate(withDuration: duration, delay: 0.0, options: .init(rawValue: options)) {
                self.view.setNeedsLayout()
                self.view.layoutIfNeeded()
            }
        }
    }
}

// MARK: - 转场动画
extension DCAlertViewController: UIViewControllerTransitioningDelegate {
    public func animationController(forPresented presented: UIViewController, presenting: UIViewController, source: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        return DCAlertViewControllerAnimator.init(self.preferredStyle, false)
    }
    
    public func animationController(forDismissed dismissed: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        return DCAlertViewControllerAnimator.init(self.preferredStyle, true)
    }
}





////////////////////////////// DCAlertViewControllerAnimator /////////////////////


class DCAlertViewControllerAnimator: NSObject, UIViewControllerAnimatedTransitioning {

    var dismissing: Bool = false
    var style: DCAlertViewControllerStyle = .alert
    
    init(_ style: DCAlertViewControllerStyle, _ dismissing: Bool) {
        self.style = style
        self.dismissing = dismissing
        super.init()
    }
    
    override init() {
        dismissing = false
        style = .alert
        super.init()
    }
    
    
    func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
        return dismissing ? 0.25 : 0.30
    }
    
    func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {
        guard
            let fromVC = transitionContext.viewController(forKey: .from),
            let toVC = transitionContext.viewController(forKey: .to)
        else {
            return
        }

        var alert: DCAlertViewController? = nil
        if fromVC.isBeingDismissed {
            alert = fromVC as? DCAlertViewController
        }else {
            alert = toVC as? DCAlertViewController

        }

        guard let alert = alert else {
            assert(false, "错误的视图")
            return
        }

        let fromView = transitionContext.view(forKey: .from)
        let toView = transitionContext.view(forKey: .to)
        let containerView = transitionContext.containerView
        let isAnimated = transitionContext.isAnimated
        var completion: ((_ finished: Bool) -> Void)? = nil
        var animation: (() -> Void)? = nil
        
        if self.dismissing == true {
            if fromVC.modalPresentationStyle == .fullScreen {
                containerView.addSubview(toVC.view)
            }
            containerView.bringSubviewToFront(fromVC.view)
            if fromVC.modalPresentationStyle == .custom {
                toVC.beginAppearanceTransition(true, animated: isAnimated)
            }
            
            animation = {
                alert.contentViewVisible = false
            }
            completion = { finished in
                if fromVC.modalPresentationStyle == .custom {
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
            alert.contentViewVisible = false
            
            if style == .alert {
                toView?.transform = CGAffineTransform(scaleX: 1.15, y: 1.15)
            }
            if toVC.modalPresentationStyle == .custom {
                fromVC.beginAppearanceTransition(false, animated: isAnimated)
            }
            animation = {
                alert.contentViewVisible = true
                toView?.transform = CGAffineTransformIdentity
            }
            completion = { finished in
                if toVC.modalPresentationStyle == .custom {
                    fromVC.endAppearanceTransition()
                }
                transitionContext.completeTransition(!transitionContext.transitionWasCancelled)
                while UIApplication.shared.isIgnoringInteractionEvents {
                    UIApplication.shared.extendStateRestoration()
                }
            }
            toView?.layer.removeAllAnimations()
        }

        if isAnimated, let ani = animation {
            UIView.animate(withDuration: self.transitionDuration(using: transitionContext),
                           animations: ani, completion: completion)
        }else {
            animation?()
            completion?(true)
        }
    }
}

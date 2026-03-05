//
//  UniBaseWebView.swift
//
//  Created by Fred on 2025/11/11.
//

import Foundation
import WebKit
import DCloudUniappRuntime

/// WKWebView 基类：实现生命周期协议（通过协议扩展复用逻辑）
public class UniBaseWebView: WKWebView, UniViewLifecycle {
    
    //生命周期状态
    public var hasLoaded: Bool = false
    public var hasAppeared: Bool = false
    public var isVisible: Bool = false
    
    public override init(frame: CGRect, configuration: WKWebViewConfiguration) {
        super.init(frame: frame, configuration: configuration)
        onViewLoad()
    }
    
    required public init?(coder: NSCoder) {
        super.init(coder: coder)
        onViewLoad()
    }
    
    public override func didMoveToSuperview() {
        super.didMoveToSuperview()
        lifecycle_didMoveToSuperview()
    }
    
    public override func didMoveToWindow() {
        super.didMoveToWindow()
        lifecycle_didMoveToWindow()
    }
    
    /// 对应 UIViewController.loadView()
    /// 在初始化时调用，用于初始配置
    public func onViewLoad() {
        removeUniTouchGestureIfNeeded()
    }
    
    /// 对应 UIViewController.viewDidLoad()
    /// 在首次添加到父视图时调用
    public func onViewDidLoad() { }
    
    /// 对应 UIViewController.viewWillAppear
    /// 在添加到父视图时调用
    public func onViewWillAppear() { }
    
    /// 对应 UIViewController.viewDidAppear
    /// 在视图变为可见时调用（添加到 window）
    public func onViewDidAppear() { }
    
    /// 对应 UIViewController.viewWillDisappear
    /// 在从父视图移除时调用
    public func onViewWillDisappear() {  }
    
    /// 对应 UIViewController.viewDidDisappear
    /// 在视图不可见时调用（从 window 移除）
    public func onViewDidDisappear() { }
    
    /// 对应 deinit
    /// 在视图即将释放时调用
    public func onDeinit() { }
    
    public override func addGestureRecognizer(_ gestureRecognizer: UIGestureRecognizer) {
        if gestureRecognizer is UniTouchGestureRecognizer {
            return
        }
        super.addGestureRecognizer(gestureRecognizer)
    }
    
    deinit {
        onDeinit()
    }
}

extension UniBaseWebView {
		// 移除 uniapp 框架添加的默认手势以避免冲突
    private func removeUniTouchGestureIfNeeded() {
        if let gestureRecognizers = self.gestureRecognizers {
            for gesture in gestureRecognizers {
                if gesture is UniTouchGestureRecognizer {
                    self.removeGestureRecognizer(gesture)
                }
            }
        }
    }
}

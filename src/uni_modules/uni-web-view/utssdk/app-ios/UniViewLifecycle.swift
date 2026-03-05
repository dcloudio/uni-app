//
//  UniViewLifecycle.swift
//
//  Created by Fred on 2025/11/11.
//

import UIKit

public protocol UniViewLifecycle: AnyObject {
    // 生命周期状态
    var hasLoaded: Bool { get set }
    var hasAppeared: Bool { get set }
    var isVisible: Bool { get set }

    // 生命周期回调
    func onViewLoad()
    func onViewDidLoad()
    func onViewWillAppear()
    func onViewDidAppear()
    func onViewWillDisappear()
    func onViewDidDisappear()
    func onDeinit()

    // 生命周期触发（转发）
    func lifecycle_didMoveToSuperview()
    func lifecycle_didMoveToWindow()
}

public extension UniViewLifecycle where Self: UIView {

    func lifecycle_didMoveToSuperview() {
        if superview != nil {
            if !hasLoaded {
                hasLoaded = true
                onViewDidLoad()
            }
            onViewWillAppear()
        } else {
            onViewWillDisappear()
        }
    }

    func lifecycle_didMoveToWindow() {
        let isNowVisible = (window != nil) && lifecycle_isParentVisible()

        if isNowVisible != isVisible {
            isVisible = isNowVisible
            if isNowVisible {
                if !hasAppeared {
                    hasAppeared = true
                    onViewDidAppear()
                    lifecycle_notifyChildrenVisible(true)
                }
            } else {
                if hasAppeared {
                    hasAppeared = false
                    onViewDidDisappear()
                    lifecycle_notifyChildrenVisible(false)
                }
            }
        }
    }

    // 判断父视图是否可见
    private func lifecycle_isParentVisible() -> Bool {
        guard let superview = superview else { return true }
        if let parent = superview as? UniViewLifecycle {
            return parent.isVisible
        }
        return true
    }

    // 子视图可见性递归
    private func lifecycle_notifyChildrenVisible(_ visible: Bool) {
        for sub in subviews {
            guard let child = sub as? (UIView & UniViewLifecycle) else { continue }
            if child.isVisible != visible {
                child.isVisible = visible
                if visible {
                    child.onViewDidAppear()
                    child.lifecycle_notifyChildrenVisible(true)
                } else {
                    child.onViewDidDisappear()
                    child.lifecycle_notifyChildrenVisible(false)
                }
            }
        }
    }
}

//
//  UniInputView.swift
//  TestDrawImage
//
//  Created by zhongyili on 2025/11/1.
//

import UIKit

public class UniInputView : UITextField {
    
    public var padding = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
    public var holdKeyboardEnabled = false
    private lazy var suppressedKeyboardView = UIView(frame: .zero)
    private lazy var outsideTapGesture: UITapGestureRecognizer = {
        let gesture = UITapGestureRecognizer(target: self, action: #selector(handleOutsideTap(_:)))
        gesture.cancelsTouchesInView = false
        return gesture
    }()
    private weak var outsideTapHostView: UIView?
    
    override open func textRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.inset(by: padding)
    }
    
    override open func placeholderRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.inset(by: padding)
    }
    
    override open func editingRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.inset(by: padding)
    }

    override open func didMoveToWindow() {
        super.didMoveToWindow()
        updateOutsideTapHost()
    }

    override open func didMoveToSuperview() {
        super.didMoveToSuperview()
        updateOutsideTapHost()
    }

    public func setSelectionRange(start: Int, end: Int) {
        let textCount = text?.count ?? 0
        let normalizedStart = max(0, min(start, textCount))
        let normalizedEnd = max(0, min(end, textCount))
        guard let startPosition = position(from: beginningOfDocument, offset: normalizedStart) else { return }
        guard let endPosition = position(from: beginningOfDocument, offset: normalizedEnd) else { return }
        selectedTextRange = textRange(from: startPosition, to: endPosition)
    }

    public func caretBottomOffset() -> CGFloat {
        let fallbackBottom = editingRect(forBounds: bounds).maxY
        guard let selectedTextRange else { return fallbackBottom }
        let caretRect = self.caretRect(for: selectedTextRange.end)
        guard caretRect.isNull == false, caretRect.isInfinite == false, caretRect.isEmpty == false else {
            return fallbackBottom
        }
        return min(max(0, caretRect.maxY), max(bounds.height, fallbackBottom))
    }

    public func setKeyboardSuppressed(_ suppressed: Bool) {
        inputView = suppressed ? suppressedKeyboardView : nil
        if isFirstResponder {
            reloadInputViews()
        }
    }

    deinit {
        outsideTapHostView?.removeGestureRecognizer(outsideTapGesture)
    }

    @objc private func handleOutsideTap(_ gesture: UITapGestureRecognizer) {
        guard isFirstResponder, !holdKeyboardEnabled else { return }
        guard let hostView = outsideTapHostView else {
            resignFirstResponder()
            return
        }
        let hostPoint = gesture.location(in: hostView)
        if let targetView = hostView.hitTest(hostPoint, with: nil), shouldKeepKeyboardForTap(on: targetView) {
            return
        }
        let point = convert(hostPoint, from: hostView)
        if bounds.contains(point) {
            return
        }
        resignFirstResponder()
    }

    private func shouldKeepKeyboardForTap(on targetView: UIView) -> Bool {
        var currentView: UIView? = targetView
        while let view = currentView {
            if view === self {
                return true
            }
            if view is UITextField || view is UITextView {
                return true
            }
            currentView = view.superview
        }
        return false
    }

    private func updateOutsideTapHost() {
        var hostView = superview
        while let nextHostView = hostView?.superview {
            hostView = nextHostView
        }
        guard outsideTapHostView !== hostView else { return }
        outsideTapHostView?.removeGestureRecognizer(outsideTapGesture)
        outsideTapHostView = hostView
        outsideTapHostView?.addGestureRecognizer(outsideTapGesture)
    }
}

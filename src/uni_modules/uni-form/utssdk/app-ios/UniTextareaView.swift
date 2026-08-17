//
//  UniTextareaView.swift
//  uni-form
//
//  Created by Codex on 2026/4/3.
//

import UIKit

public class UniTextareaView: UITextView {

    public var lineHeightValue: CGFloat?
    public var letterSpacingValue: CGFloat?
    public var styledTextColor: UIColor = .black
    public var holdKeyboardEnabled = false
    private lazy var outsideTapGesture: UITapGestureRecognizer = {
        let gesture = UITapGestureRecognizer(target: self, action: #selector(handleOutsideTap(_:)))
        gesture.cancelsTouchesInView = false
        return gesture
    }()
    private weak var outsideTapHostView: UIView?

    override public var font: UIFont? {
        didSet {
            if let font {
                typingAttributes[.font] = font
            }
        }
    }

    override open func didMoveToWindow() {
        super.didMoveToWindow()
        updateOutsideTapHost()
    }

    override open func didMoveToSuperview() {
        super.didMoveToSuperview()
        updateOutsideTapHost()
    }

    override open func caretRect(for position: UITextPosition) -> CGRect {
        var originalRect = super.caretRect(for: position)
        if let font = self.font, let lineHeightValue {
            let offset = lineHeightValue - font.lineHeight
            originalRect.origin.y += offset
            originalRect.size.height = font.lineHeight
        }
        return originalRect
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
        let fallbackBottom = bounds.height - textContainerInset.bottom
        guard let selectedTextRange else { return fallbackBottom }
        let caretRect = self.caretRect(for: selectedTextRange.end)
        guard caretRect.isNull == false, caretRect.isInfinite == false, caretRect.isEmpty == false else {
            return fallbackBottom
        }
        return min(max(0, caretRect.maxY), max(bounds.height, fallbackBottom))
    }

    public func applyTextStyle() {
        let currentText = text ?? ""
        let selectedRange = self.selectedRange

        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.alignment = textAlignment
        paragraphStyle.lineBreakMode = .byWordWrapping
        if let lineHeightValue {
            paragraphStyle.minimumLineHeight = lineHeightValue
            paragraphStyle.maximumLineHeight = lineHeightValue
        }

        var attributes: [NSAttributedString.Key: Any] = [
            .foregroundColor: styledTextColor,
            .paragraphStyle: paragraphStyle
        ]
        if let font {
            attributes[.font] = font
        }
        if let letterSpacingValue {
            attributes[.kern] = letterSpacingValue
        }

        attributedText = NSAttributedString(string: currentText, attributes: attributes)
        typingAttributes = attributes

        if let start = position(from: beginningOfDocument, offset: selectedRange.location),
           let end = position(from: start, offset: selectedRange.length),
           let textRange = textRange(from: start, to: end) {
            selectedTextRange = textRange
        }
    }

    public func calculatedContentHeight() -> CGFloat {
        let targetWidth = bounds.width > 0 ? bounds.width : UIScreen.main.bounds.width
        return ceil(sizeThatFits(CGSize(width: targetWidth, height: .greatestFiniteMagnitude)).height)
    }

    public func currentLineCount() -> Int {
        let fontLineHeight = lineHeightValue ?? font?.lineHeight ?? UIFont.systemFont(ofSize: 16).lineHeight
        guard fontLineHeight > 0 else { return 0 }
        let verticalInset = textContainerInset.top + textContainerInset.bottom
        let textHeight = max(0, calculatedContentHeight() - verticalInset)
        return max(1, Int(round(textHeight / fontLineHeight)))
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

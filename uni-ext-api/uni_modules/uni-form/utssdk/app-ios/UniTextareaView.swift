//
//  UniTextareaView.swift
//  uni-form
//
//  Created by Codex on 2026/4/3.
//

import UIKit

public class UniTextareaView: UITextView {

    private var editorCursorColor: UIColor?
    private var editorSelectionColor: UIColor?
    private var appliedEditorTint: UIColor?
    private var hasAppliedEditorTint = false

    public func setEditorCursorColor(_ color: UIColor?) {
        editorCursorColor = color
        updateEditorTint()
    }

    public func setEditorSelectionColor(_ color: UIColor?) {
        editorSelectionColor = color
        updateEditorTint()
    }

    override open var selectedTextRange: UITextRange? {
        didSet { updateEditorTint() }
    }

    override open func layoutSubviews() {
        super.layoutSubviews()
        updateEditorTint()
    }

    public func updateEditorTint() {
        // UIKit derives selection highlights and handles from tintColor.
        // Its native highlight opacity is retained. A collapsed selection
        // restores the independently configured insertion-caret color.
        let isSelecting = selectedTextRange.map { !$0.isEmpty } ?? false
        let color = isSelecting ? (editorSelectionColor ?? editorCursorColor) : editorCursorColor
        guard !hasAppliedEditorTint || appliedEditorTint != color else { return }
        hasAppliedEditorTint = true
        appliedEditorTint = color
        tintColor = color
    }


    public var lineHeightValue: CGFloat?
    public var letterSpacingValue: CGFloat?
    public var styledTextColor: UIColor = .black
    public var holdKeyboardEnabled = false
    private var baseWritingDirection: NSWritingDirection = .leftToRight
    private weak var keyboardDismissCoordinator: UniEditorKeyboardDismissCoordinator?

    override open func becomeFirstResponder() -> Bool {
        let becameFirstResponder = super.becomeFirstResponder()
        if becameFirstResponder {
            activateKeyboardDismissCoordinator()
        }
        return becameFirstResponder
    }

    override open func resignFirstResponder() -> Bool {
        let resignedFirstResponder = super.resignFirstResponder()
        if resignedFirstResponder {
            deactivateKeyboardDismissCoordinator()
        }
        return resignedFirstResponder
    }

    override open func didMoveToWindow() {
        super.didMoveToWindow()
        if isFirstResponder {
            activateKeyboardDismissCoordinator()
        }
    }

    override open func didMoveToSuperview() {
        super.didMoveToSuperview()
        guard isFirstResponder, let window else { return }
        UniEditorKeyboardDismissCoordinator.coordinator(for: window).refresh(editor: self)
    }

    override public var font: UIFont? {
        didSet {
            if let font {
                typingAttributes[.font] = font
            }
        }
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

    public func setWritingDirectionRTL(_ isRTL: Bool) {
        baseWritingDirection = isRTL ? .rightToLeft : .leftToRight
        semanticContentAttribute = isRTL ? .forceRightToLeft : .forceLeftToRight
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
        paragraphStyle.baseWritingDirection = baseWritingDirection
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

    private func activateKeyboardDismissCoordinator() {
        guard let window else { return }
        let coordinator = UniEditorKeyboardDismissCoordinator.coordinator(for: window)
        if keyboardDismissCoordinator !== coordinator {
            keyboardDismissCoordinator?.deactivate(editor: self)
            keyboardDismissCoordinator = coordinator
        }
        coordinator.activate(editor: self) { [weak self] in
            self?.holdKeyboardEnabled ?? false
        }
    }

    private func deactivateKeyboardDismissCoordinator() {
        keyboardDismissCoordinator?.deactivate(editor: self)
        keyboardDismissCoordinator = nil
    }

    deinit {
        deactivateKeyboardDismissCoordinator()
    }

}

//
//  UniInputView.swift
//  TestDrawImage
//
//  Created by zhongyili on 2025/11/1.
//

import UIKit

public class UniInputView : UITextField {

    public func setEditorCursorColor(_ color: UIColor?) {
        tintColor = color
    }
    
    public var padding = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
    public var holdKeyboardEnabled = false
    private lazy var suppressedKeyboardView = UIView(frame: .zero)
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
    
    override open func textRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.inset(by: padding)
    }
    
    override open func placeholderRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.inset(by: padding)
    }
    
    override open func editingRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.inset(by: padding)
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
        let currentTextAlignment = textAlignment
        semanticContentAttribute = isRTL ? .forceRightToLeft : .forceLeftToRight

        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.alignment = currentTextAlignment
        paragraphStyle.baseWritingDirection = isRTL ? .rightToLeft : .leftToRight
        var attributes = defaultTextAttributes
        attributes[.paragraphStyle] = paragraphStyle
        defaultTextAttributes = attributes

        if let range = textRange(from: beginningOfDocument, to: endOfDocument) {
            setBaseWritingDirection(isRTL ? .rightToLeft : .leftToRight, for: range)
        }

        // On iOS 18, updating writing-direction attributes may reset an
        // explicitly configured alignment. Keep direction and alignment
        // independent so editing and non-editing states render consistently.
        textAlignment = currentTextAlignment
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

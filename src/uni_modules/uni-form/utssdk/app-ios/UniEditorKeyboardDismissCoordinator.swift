import UIKit
import ObjectiveC

private var uniEditorKeyboardDismissCoordinatorKey: UInt8 = 0

/// Coordinates outside-tap and scroll keyboard dismissal for uni-form editors.
/// Scroll dismissal reuses existing pan recognizers to avoid gesture competition.
final class UniEditorKeyboardDismissCoordinator: NSObject, UIGestureRecognizerDelegate {
    private static let selectionHandleProtectionInset: CGFloat = 24

    private weak var window: UIWindow?
    private weak var activeEditor: UIView?
    private var holdKeyboardProvider: (() -> Bool)?
    private let observedScrollViews = NSHashTable<UIScrollView>.weakObjects()

    private lazy var outsideTapGesture: UITapGestureRecognizer = {
        let gesture = UITapGestureRecognizer(target: self, action: #selector(handleOutsideTap(_:)))
        gesture.cancelsTouchesInView = false
        gesture.delegate = self
        return gesture
    }()

    private init(window: UIWindow) {
        self.window = window
        super.init()
        window.addGestureRecognizer(outsideTapGesture)
    }

    static func coordinator(for window: UIWindow) -> UniEditorKeyboardDismissCoordinator {
        if let coordinator = objc_getAssociatedObject(
            window,
            &uniEditorKeyboardDismissCoordinatorKey
        ) as? UniEditorKeyboardDismissCoordinator {
            return coordinator
        }

        let coordinator = UniEditorKeyboardDismissCoordinator(window: window)
        objc_setAssociatedObject(
            window,
            &uniEditorKeyboardDismissCoordinatorKey,
            coordinator,
            .OBJC_ASSOCIATION_RETAIN_NONATOMIC
        )
        return coordinator
    }

    func activate(editor: UIView, holdKeyboardProvider: @escaping () -> Bool) {
        activeEditor = editor
        self.holdKeyboardProvider = holdKeyboardProvider
        updateObservedScrollViews(for: editor)
    }

    func refresh(editor: UIView) {
        guard activeEditor === editor else { return }
        updateObservedScrollViews(for: editor)
    }

    func deactivate(editor: UIView) {
        guard activeEditor === editor else { return }
        removeScrollObservers()
        activeEditor = nil
        holdKeyboardProvider = nil
    }

    private func updateObservedScrollViews(for editor: UIView) {
        removeScrollObservers()
        guard let window else { return }
        observeScrollViews(in: window, excluding: editor)
    }

    private func observeScrollViews(in view: UIView, excluding editor: UIView) {
        if let scrollView = view as? UIScrollView,
           scrollView !== editor,
           !scrollView.isDescendant(of: editor) {
            scrollView.panGestureRecognizer.addTarget(self, action: #selector(handleScrollPan(_:)))
            observedScrollViews.add(scrollView)
        }
        for subview in view.subviews {
            observeScrollViews(in: subview, excluding: editor)
        }
    }

    private func removeScrollObservers() {
        for scrollView in observedScrollViews.allObjects {
            scrollView.panGestureRecognizer.removeTarget(self, action: #selector(handleScrollPan(_:)))
        }
        observedScrollViews.removeAllObjects()
    }

    @objc private func handleOutsideTap(_ gesture: UITapGestureRecognizer) {
        guard gesture.state == .ended else { return }
        dismissActiveEditorIfNeeded()
    }

    @objc private func handleScrollPan(_ gesture: UIPanGestureRecognizer) {
        guard gesture.state == .began else { return }
        if let editor = activeEditor {
            let point = gesture.location(in: editor)
            let inset = Self.selectionHandleProtectionInset
            let protectedBounds = editor.bounds.insetBy(dx: -inset, dy: -inset)
            if protectedBounds.contains(point) {
                return
            }
        }
        if let scrollView = gesture.view,
           let touchedView = scrollView.hitTest(gesture.location(in: scrollView), with: nil),
           isTextInputHierarchy(touchedView) {
            return
        }
        dismissActiveEditorIfNeeded()
    }

    private func dismissActiveEditorIfNeeded() {
        guard let editor = activeEditor, editor.isFirstResponder else { return }
        guard holdKeyboardProvider?() != true else { return }
        editor.resignFirstResponder()
    }

    private func isTextInputHierarchy(_ targetView: UIView?) -> Bool {
        var currentView = targetView
        while let view = currentView {
            if view is UITextInput {
                return true
            }
            currentView = view.superview
        }
        return false
    }

    func gestureRecognizer(
        _ gestureRecognizer: UIGestureRecognizer,
        shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer
    ) -> Bool {
        return true
    }

    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldReceive touch: UITouch) -> Bool {
        guard let editor = activeEditor, editor.isFirstResponder else { return false }
        guard holdKeyboardProvider?() != true else { return false }
        return !isTextInputHierarchy(touch.view)
    }
}

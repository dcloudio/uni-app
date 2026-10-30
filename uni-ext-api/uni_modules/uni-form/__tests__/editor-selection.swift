// Standalone UIKit regression: compile with the two app-ios Swift view sources,
// then run the binary on an iOS Simulator using `xcrun simctl spawn`.
import UIKit

private final class SelectionDelegate: NSObject, UITextFieldDelegate, UITextViewDelegate {
    func textFieldDidChangeSelection(_ textField: UITextField) {
        (textField as? UniInputView)?.updateEditorTint()
    }

    func textViewDidChangeSelection(_ textView: UITextView) {
        (textView as? UniTextareaView)?.updateEditorTint()
    }
}

@main
struct EditorSelectionTests {
    private static func expectTint(_ view: UIView, _ color: UIColor, _ message: String) {
        precondition(view.tintColor.isEqual(color), message)
    }

    static func main() {
        autoreleasepool {
            let delegate = SelectionDelegate()
            withExtendedLifetime(delegate) {
                let host = UIView(frame: CGRect(x: 0, y: 0, width: 300, height: 300))
                host.tintColor = .purple
                let input = UniInputView(frame: CGRect(x: 0, y: 0, width: 250, height: 40))
                let textarea = UniTextareaView(frame: CGRect(x: 0, y: 60, width: 250, height: 150))
                host.addSubview(input)
                host.addSubview(textarea)
                input.delegate = delegate
                textarea.delegate = delegate
                input.text = "Selection regression"
                textarea.text = "Selection regression"
                input.setEditorCursorColor(.red)
                input.setEditorSelectionColor(.green)
                textarea.setEditorCursorColor(.red)
                textarea.setEditorSelectionColor(.green)
                host.layoutIfNeeded()

                input.setSelectionRange(start: 0, end: 5)
                expectTint(input, .green, "Input selection should use its own color")
                input.insertText("New")
                expectTint(input, .red, "Input replacement should restore the caret without a layout pass")

                // selectedRange does not pass through the selectedTextRange override.
                textarea.selectedRange = NSRange(location: 0, length: 5)
                expectTint(textarea, .green, "Native textarea selection should update immediately")
                textarea.insertText("New")
                expectTint(textarea, .red, "Textarea replacement should restore the caret immediately")

                textarea.selectedRange = NSRange(location: 0, length: 3)
                textarea.setMarkedText("汉", selectedRange: NSRange(location: 1, length: 0))
                precondition(textarea.markedTextRange != nil, "The IME composition should stay active")
                precondition(textarea.selectedRange.length == 0, "The IME replacement should collapse the selection")
                expectTint(textarea, .red, "IME replacement should not leave the selection tint on the caret")
                textarea.unmarkText()

                textarea.selectedRange = NSRange(location: 0, length: 2)
                textarea.setEditorCursorColor(.blue)
                expectTint(textarea, .green, "Updating caret color should preserve the selected highlight")
                textarea.selectedRange = NSRange(location: 2, length: 0)
                expectTint(textarea, .blue, "Collapsing the native selection should restore the latest caret color")

                textarea.selectedRange = NSRange(location: 0, length: 2)
                textarea.setEditorSelectionColor(.clear)
                expectTint(textarea, .clear, "An explicit transparent selection color should remain explicit")
                textarea.setEditorSelectionColor(nil)
                expectTint(textarea, .blue, "Removing selection color should restore the caret tint")
                textarea.setEditorCursorColor(nil)
                expectTint(textarea, .purple, "Removing both colors should restore inherited tint")
                print("PASS: native selection, replacement, IME composition, color updates and removal")
            }
        }
    }
}

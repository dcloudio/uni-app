import Foundation
import UIKit

public enum UniApplicationToastPresenter {
    private static var window: UIWindow?
    private static var dismissWorkItem: DispatchWorkItem?

    public static func show(text: String, offset: CGFloat, duration: CGFloat, mask: Bool) {
        DispatchQueue.main.async {
            dismissWorkItem?.cancel()
            removeOnMain()

            let label = UILabel()
            label.text = text
            label.numberOfLines = 0
            label.font = MCToastConfig.shared.text.font
            label.textAlignment = .center
            label.textColor = .white

            let labelWidth = kScreenWidth - (MCToastConfig.shared.spacing.margin + MCToastConfig.shared.spacing.padding) * 2
            let labelSize = label.sizeThatFits(CGSize(width: labelWidth, height: CGFloat.greatestFiniteMagnitude))
            label.frame = CGRect(x: 0, y: 0, width: labelSize.width, height: labelSize.height)

            let frame = CGRect(
                x: 0,
                y: 0,
                width: label.frame.width + 2 * MCToastConfig.shared.spacing.padding,
                height: label.frame.height + 30
            )
            let respond = mask ? MCToast.MCToastRespond.noRespond : MCToast.MCToastRespond.default
            let toastWindow = MCToast.createWindow(respond: respond, frame: frame)
            let mainView = MCToast.createMainView(frame: frame)
            toastWindow.addSubview(mainView)

            var mainY = offset + frame.height / 2
            if mask {
                mainY = offset + toastWindow.frame.height / 2
            }
            mainView.center = CGPoint(x: toastWindow.frame.width / 2, y: mainY)
            mainView.addSubview(label)
            label.center = CGPoint(x: mainView.frame.width / 2, y: mainView.frame.height / 2)

            window = toastWindow
            if duration > 0 {
                let workItem = DispatchWorkItem {
                    if window === toastWindow {
                        removeOnMain()
                    }
                }
                dismissWorkItem = workItem
                DispatchQueue.main.asyncAfter(
                    deadline: .now() + Double(duration),
                    execute: workItem
                )
            }
        }
    }

    public static func remove() {
        DispatchQueue.main.async {
            dismissWorkItem?.cancel()
            removeOnMain()
        }
    }

    private static func removeOnMain() {
        window?.isHidden = true
        window?.removeFromSuperview()
        window = nil
        dismissWorkItem = nil
    }
}

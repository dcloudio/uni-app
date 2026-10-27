import AuthenticationServices
import Foundation
import UIKit

@objc public protocol AppleLoginNativeDelegate: AnyObject {
    @objc func appleLoginNativeDidSucceed(_ result: NSDictionary)
    @objc func appleLoginNativeDidFail(_ code: NSNumber, message: String)
}

@objcMembers
public final class AppleLoginNativeManager: NSObject {
    public static let shared = AppleLoginNativeManager()

    private weak var delegate: AppleLoginNativeDelegate?
    private var authorizationController: ASAuthorizationController?
    private var timeoutTimer: Timer?
    private var requestState = ""
    // Swift 层兜底保护原生授权状态，防止未来绕过 UTS 入口时发生重入。
    private var isAuthorizing = false

    public func isAppleLoginAvailable() -> Bool {
        if #available(iOS 13.0, *) { return true }
        return false
    }

    public func startLogin(_ onlyAuthorize: Bool, _ timeout: Double, _ delegate: AppleLoginNativeDelegate) {
        guard !isAuthorizing else {
            delegate.appleLoginNativeDidFail(1310507, message: "登录请求正在进行")
            return
        }
        guard isAppleLoginAvailable() else {
            delegate.appleLoginNativeDidFail(1310514, message: "Sign in with Apple requires iOS 13.0+")
            return
        }
        guard topViewController() != nil else {
            delegate.appleLoginNativeDidFail(1310507, message: "无法获取当前页面，不能弹出 Apple 授权窗口")
            return
        }
        guard timeout >= 0 else {
            delegate.appleLoginNativeDidFail(1310510, message: "超时时间必须为正整数")
            return
        }

        self.delegate = delegate
        isAuthorizing = true

        if timeout > 0 {
            timeoutTimer = Timer.scheduledTimer(withTimeInterval: timeout / 1000.0, repeats: false) { [weak self] _ in
                self?.finishFail(code: 1310511, message: "Apple 登录请求超时")
            }
        }

        startAppleAuthorization(onlyAuthorize: onlyAuthorize)
    }

    private func finishSuccess(_ result: [String: Any]) {
        guard let delegate else { return }
        invalidateTimeout()
        authorizationController = nil
        isAuthorizing = false
        self.delegate = nil
        delegate.appleLoginNativeDidSucceed(result as NSDictionary)
    }

    private func finishFail(code: Int, message: String) {
        guard let delegate else { return }
        invalidateTimeout()
        authorizationController = nil
        isAuthorizing = false
        self.delegate = nil
        delegate.appleLoginNativeDidFail(NSNumber(value: code), message: message)
    }

    private func invalidateTimeout() {
        timeoutTimer?.invalidate()
        timeoutTimer = nil
    }

    private func currentKeyWindow() -> UIWindow? {
        UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap { $0.windows }
            .first { $0.isKeyWindow }
    }

    private func topViewController() -> UIViewController? {
        var controller = currentKeyWindow()?.rootViewController
        while let presented = controller?.presentedViewController {
            controller = presented
        }
        return controller
    }

    private func startAppleAuthorization(onlyAuthorize: Bool) {
        guard #available(iOS 13.0, *) else {
            finishFail(code: 1310514, message: "Sign in with Apple requires iOS 13.0+")
            return
        }

        requestState = UUID().uuidString
        pendingOnlyAuthorize = onlyAuthorize

        let provider = ASAuthorizationAppleIDProvider()
        let request = provider.createRequest()
        request.requestedScopes = [.fullName, .email]
        request.state = requestState

        let controller = ASAuthorizationController(authorizationRequests: [request])
        controller.delegate = self
        controller.presentationContextProvider = self
        authorizationController = controller
        controller.performRequests()
    }

    private var pendingOnlyAuthorize = false
}

@available(iOS 13.0, *)
extension AppleLoginNativeManager: ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding {
    public func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        currentKeyWindow() ?? UIWindow()
    }

    public func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        guard let credential = authorization.credential as? ASAuthorizationAppleIDCredential else {
            finishFail(code: 1310503, message: "Apple authorization credential type is invalid")
            return
        }

        let userIdentifier = credential.user
        guard !userIdentifier.isEmpty else {
            finishFail(code: 1310503, message: "Apple credential userIdentifier is empty")
            return
        }
        guard credential.state == requestState else {
            finishFail(code: 1310508, message: "Apple credential state is invalid")
            return
        }

        let authorizationCode = credential.authorizationCode.flatMap { String(data: $0, encoding: .utf8) } ?? ""
        let identityToken = credential.identityToken.flatMap { String(data: $0, encoding: .utf8) } ?? ""
        guard !authorizationCode.isEmpty else {
            finishFail(code: 1310504, message: "Apple authorizationCode is empty")
            return
        }

        var fullName = ""
        if let name = credential.fullName {
            fullName = PersonNameComponentsFormatter().string(from: name)
        }

        let appleInfo: [String: Any] = [
            "authorizationCode": authorizationCode,
            "identityToken": identityToken,
            "realUserStatus": credential.realUserStatus.rawValue,
            "loginType": "apple",
            "credentialSource": "appleAuthorization",
            "user": userIdentifier,
            "userIdentifier": userIdentifier,
            "fullName": fullName
        ]

        finishSuccess([
            "code": authorizationCode,
            "authResult": pendingOnlyAuthorize ? [:] : appleInfo,
            "appleInfo": appleInfo
        ])
    }

    public func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        let nsError = error as NSError
        let code: Int
        switch nsError.code {
        case ASAuthorizationError.canceled.rawValue:
            code = 1310509
        case ASAuthorizationError.invalidResponse.rawValue:
            code = 1310503
        default:
            code = 1310507
        }
        let userInfoDescription = String(describing: nsError.userInfo)
        let message = "Apple authorization failed. domain=\(nsError.domain), code=\(nsError.code), description=\(nsError.localizedDescription), userInfo=\(userInfoDescription)"
        finishFail(code: code, message: message)
    }
}

import { NotificationCenter } from 'Foundation';
import { CGRect } from "CoreFoundation";
import { UIApplication, UIView, UITextField, UIScreen, UIDevice } from "UIKit"
import { UTSiOS } from "DCloudUTSFoundation"
import { DispatchQueue } from 'Dispatch';
import { SetUserCaptureScreenOptions, OnUserCaptureScreenCallbackResult, OnUserCaptureScreen, OffUserCaptureScreen, SetUserCaptureScreen, UserCaptureScreenCallback, SetUserCaptureScreenSuccess  } from "../interface.uts"
import { SetUserCaptureScreenFailImpl } from "../unierror.uts"
/**
	* 定义监听截屏事件工具类
	*/
class CaptureScreenTool {
	static listener : UserCaptureScreenCallback | null;
	static secureView : UIView | null;

	// 监听截屏
	static listenCaptureScreen(callback : UserCaptureScreenCallback | null) {
		this.listener = callback
 
		// 注册监听截屏事件及回调方法
		// target-action 回调方法需要通过 Selector("方法名") 构建
		const method = Selector("userDidTakeScreenshot")
		NotificationCenter.default.addObserver(this, selector = method, name = UIApplication.userDidTakeScreenshotNotification, object = null)
	}

	// 捕获截屏回调的方法
	// target-action 的方法前需要添加 @objc 前缀
	@objc static userDidTakeScreenshot() {
		// 回调
		const res: OnUserCaptureScreenCallbackResult = {
		}
		this.listener?.(res)
	}

	// 移除监听事件
	static removeListen(callback : UserCaptureScreenCallback | null) {
		this.listener = null
		NotificationCenter.default.removeObserver(this)
	}

	static createSecureView() : UIView | null {
		let field = new UITextField(frame = CGRect.zero)
		field.isSecureTextEntry = true
		if (field.subviews.length > 0 && UIDevice.current.systemVersion != '15.1') {
			let view = field.subviews[0]
			view.subviews.forEach((item) => {
				item.removeFromSuperview()
			})
			view.isUserInteractionEnabled = true
			return view
		}
		return null
	}

	// 开启防截屏
	static onAntiScreenshot(option : SetUserCaptureScreenOptions) {
		// uts方法默认会在子线程中执行，涉及 UI 操作必须在主线程中运行，通过 DispatchQueue.main.async 方法可将代码在主线程中运行
		DispatchQueue.main.async(execute = () : void => {
			let secureView = this.createSecureView()
			let window = UTSiOS.getKeyWindow()
			let rootView = window.rootViewController == null ? null : window.rootViewController!.view
			if (secureView != null && rootView != null) {
				let rootSuperview = rootView!.superview
				if (rootSuperview != null) {
					this.secureView = secureView
					rootSuperview!.addSubview(secureView!)
					rootView!.removeFromSuperview()
					secureView!.addSubview(rootView!)
					let rect = rootView!.frame
					secureView!.frame = UIScreen.main.bounds
					rootView!.frame = rect
				}
			}
			let res: SetUserCaptureScreenSuccess = {
			}
			option.success?.(res)
			option.complete?.(res)
		})
	}

	// 关闭防截屏
	static offAntiScreenshot(option : SetUserCaptureScreenOptions) {
		DispatchQueue.main.async(execute = () : void => {
			if (this.secureView != null) {
				let window = UTSiOS.getKeyWindow()
				let rootView = window.rootViewController == null ? null : window.rootViewController!.view
				if (rootView != null && this.secureView!.superview != null) {
					let rootSuperview = this.secureView!.superview
					if (rootSuperview != null) {
						rootSuperview!.addSubview(rootView!)
						this.secureView!.removeFromSuperview()
					}
				}
				this.secureView = null
			}
			let res: SetUserCaptureScreenSuccess = {
			}
			option.success?.(res)
			option.complete?.(res)
		})
	}
}

/**
	* 开启截图监听
	*/
export const onUserCaptureScreen : OnUserCaptureScreen = function (callback : UserCaptureScreenCallback | null) {
	CaptureScreenTool.listenCaptureScreen(callback)
}

/**
	* 关闭截屏监听
	*/
export const offUserCaptureScreen : OffUserCaptureScreen = function (callback : UserCaptureScreenCallback | null) {
	CaptureScreenTool.removeListen(callback)
}

/**
	* 开启/关闭防截屏
	*/
export const setUserCaptureScreen : SetUserCaptureScreen = function (options : SetUserCaptureScreenOptions) {
	if (UIDevice.current.systemVersion < "13.0") {
		let res = new SetUserCaptureScreenFailImpl(12001)
		options.fail?.(res);
		options.complete?.(res);

	} else if (UIDevice.current.systemVersion == "15.1") {
		let res = new SetUserCaptureScreenFailImpl(12010)
		options.fail?.(res);
		options.complete?.(res);
	} else {
		if (options.enable == true) {
			CaptureScreenTool.offAntiScreenshot(options)
		} else {
			CaptureScreenTool.onAntiScreenshot(options)
		}
	}
}


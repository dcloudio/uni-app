import { UTSAndroid } from "io.dcloud.uts";
import ActivityCompat from "androidx.core.app.ActivityCompat";
import Manifest from "android.Manifest";
import PackageManager from "android.content.pm.PackageManager";
import Build from "android.os.Build";
import FileObserver from "android.os.FileObserver";
import File from "java.io.File";
import Environment from "android.os.Environment";
import System from 'java.lang.System';
import WindowManager from 'android.view.WindowManager';
import { OnUserCaptureScreenCallbackResult, UserCaptureScreenCallback, OnUserCaptureScreen, OffUserCaptureScreen, SetUserCaptureScreenSuccess, SetUserCaptureScreenOptions, SetUserCaptureScreen } from "../interface.uts";
import string from 'android.R.string';


/**
	* 文件监听器
	*/
let observer : ScreenFileObserver | null = null;
/**
	* 记录文件监听器上次监听的时间戳，避免重复监听
	*/
let lastObserverTime : number = 0;
/**
	* 截屏回调
	*/
let listener : UserCaptureScreenCallback | null = null;

/**
	* android 文件监听实现
	*/
@UTSAndroid.Suppress("DEPRECATION")
class ScreenFileObserver extends FileObserver {

	/**
		* 截屏文件目录
		*/
	private screenFile : File;

	constructor(screenFileStr : string) {
		super(screenFileStr);
		this.screenFile = new File(screenFileStr);
	}

	override onEvent(event : Int, path : string | null) : void {
		// 只监听文件新增事件
		if (event == FileObserver.CREATE) {
			if (path != null) {
				const currentTime = System.currentTimeMillis();
				if ((currentTime - lastObserverTime) < 1000) {
					// 本地截屏行为比上一次超过1000ms, 才认为是一个有效的时间
					return;
				}
				lastObserverTime = currentTime;

				const screenShotPath = new File(this.screenFile, path).getPath();
				const res : OnUserCaptureScreenCallbackResult = {
					path: screenShotPath
				}
				listener?.(res);
			}
		}
	}
}

/**
	* 开启截图监听
	*/
export const onUserCaptureScreen : OnUserCaptureScreen = function (callback : UserCaptureScreenCallback | null) {
	// 检查相关权限是否已授予
	if (ActivityCompat.checkSelfPermission(UTSAndroid.getAppContext()!, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
		// 无权限，申请权限
		ActivityCompat.requestPermissions(UTSAndroid.getUniActivity()!, arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE), 1001);
		return;
	}
	// 更新监听
	listener = callback;

	let directory_screenshot : File;
	if (Build.MANUFACTURER.toLowerCase() == "xiaomi") {
		// @Suppress("DEPRECATION")
		directory_screenshot = new File(new File(Environment.getExternalStorageDirectory(), Environment.DIRECTORY_DCIM), "Screenshots");
	} else {
		// @Suppress("DEPRECATION")
		directory_screenshot = new File(new File(Environment.getExternalStorageDirectory(), Environment.DIRECTORY_PICTURES), "Screenshots");
	}
	// 先结束监听 再开启监听
	observer?.stopWatching();
	observer = new ScreenFileObserver(directory_screenshot.getPath());
	observer?.startWatching();


	UTSAndroid.onAppActivityDestroy(function(){
		observer?.stopWatching()
		observer = null
	})

}

/**
	* 关闭截屏监听
	*/
export const offUserCaptureScreen : OffUserCaptureScreen = function (_ : UserCaptureScreenCallback | null) {
	// android10以上，关闭监听通过移除文件监听器实现
	observer?.stopWatching();
	observer = null;
	lastObserverTime = 0;
}

/**
	* 设置是否禁止截屏
	*/
export const setUserCaptureScreen : SetUserCaptureScreen = function (option : SetUserCaptureScreenOptions) {
	// 切换到UI线程
	UTSAndroid.getUniActivity()?.runOnUiThread(new SetUserCaptureScreenRunnable(option.enable));
	const res : SetUserCaptureScreenSuccess = {}
	option.success?.(res);
	option.complete?.(res);
}

class SetUserCaptureScreenRunnable extends Runnable {

	/**
		* ture: 允许用户截屏
		* false: 不允许用户截屏，防止用户截屏到应用页面内容
		*/
	private enable : boolean;

	constructor(enable : boolean) {
		super();
		this.enable = enable;
	}

	override run() : void {
		if (this.enable) {
			UTSAndroid.getUniActivity()?.getWindow()?.clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
		} else {
			UTSAndroid.getUniActivity()?.getWindow()?.addFlags(WindowManager.LayoutParams.FLAG_SECURE);
		}
	}
}

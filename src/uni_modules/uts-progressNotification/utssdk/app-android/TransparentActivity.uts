import Activity from "android.app.Activity";
import Bundle from 'android.os.Bundle';
import Build from 'android.os.Build';
import View from 'android.view.View';
import Color from 'android.graphics.Color';
import WindowManager from 'android.view.WindowManager';
import { getGlobalNotificationProgressCallBack, getGlobalNotificationProgressFinishCallBack, setGlobalNotificationProgressCallBack, setGlobalNotificationProgressFinishCallBack} from './callbacks.uts';
import { ACTION_DOWNLOAD_FINISH, ACTION_DOWNLOAD_PROGRESS } from "./constant.uts"


export class TransparentActivity extends Activity {
	constructor() {
		super()
	}

  @Suppress("DEPRECATION")
	override onCreate(savedInstanceState : Bundle | null) {
		super.onCreate(savedInstanceState)
		this.fullScreen(this)
		const action = this.getIntent().getAction()
		if (action == ACTION_DOWNLOAD_FINISH) {
			setTimeout(() => {
        getGlobalNotificationProgressFinishCallBack()?.()
        setGlobalNotificationProgressFinishCallBack(() => { })
			}, 100)
			this.overridePendingTransition(0, 0)
		}

		if (action == ACTION_DOWNLOAD_PROGRESS) {
			setTimeout(() => {
				getGlobalNotificationProgressCallBack()?.()
        setGlobalNotificationProgressCallBack(() => { })
			}, 100)
			this.overridePendingTransition(0, 0)
		}

		setTimeout(() => {
			this.finish()
		}, 20)
	}


	@Suppress("DEPRECATION")
	private fullScreen(activity : Activity) {
		if (Build.VERSION.SDK_INT >= 19) {
			if (Build.VERSION.SDK_INT >= 21) {
				const window = activity.getWindow();
				const decorView = window.getDecorView();
				const option = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
				decorView.setSystemUiVisibility(option);
				window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
				window.setStatusBarColor(Color.TRANSPARENT);
			} else {
				const window = activity.getWindow();
				const attributes = window.getAttributes();
				const flagTranslucentStatus = WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS;
				attributes.flags |= flagTranslucentStatus;
				window.setAttributes(attributes);
			}
		}
	}
}


export type UniShowModalResult =  {
	/**
	 * editable 为 true 时，用户输入的文本
	 */
	content?: string|null
	/**
	* 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
	*/
	cancel: boolean
	/**
	* 为 true 时，表示用户点击了确定按钮
	*/
	confirm: boolean
}

export type UniShowModalErrorCode = 4

export interface UniShowModalFail extends IUniError {
  errCode: UniShowModalErrorCode
}

export class UniShowModalFailImpl extends UniError implements UniShowModalFail {
  override errCode: UniShowModalErrorCode
  constructor(errMsg: string = 'showModal:fail cancel', errCode: UniShowModalErrorCode = 4) {
    super()
    this.errMsg = errMsg
    this.errCode = errCode
  }
}


type UniShowModalFailCallback = (result: UniShowModalFail) => void

type UniShowModalSuccessCallback = (result: UniShowModalResult) => void

type UniShowModalCompleteCallback = (result: any) => void


export type ShowModalOptions = {
  /**
   * 提示的标题
   */
  title?: string | null,
  /**
   * 提示的内容
   */
  content?: string | null,
  /**
   * @defaultValue true
   * @default true
   * 是否显示取消按钮，默认为 true
   */
  showCancel?: boolean | null,
  /**
   * 取消按钮的文字，默认为"取消"
   */
  cancelText?: string | null,
  /**
   * 取消按钮的文字颜色，默认为"#000000"
   */
  cancelColor?: string.ColorString | null,
  /**
   * 确定按钮的文字，默认为"确定"
   */
  confirmText?: string | null,
  /**
   * 确定按钮的文字颜色
   */
  confirmColor?: string.ColorString | null,
  /**
   * 是否显示输入框
   * @defaultValue false
   */
  editable?: boolean | null,
  /**
   * 显示输入框时的提示文本
   */
  placeholderText?: string | null,
  /**
   * 接口调用成功的回调函数
   */
  success?: UniShowModalSuccessCallback | null,
  /**
   * 接口调用失败的回调函数
   */
  fail?: UniShowModalFailCallback | null,
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: UniShowModalCompleteCallback | null
}

export type ShowModal = (options: ShowModalOptions) => ModalPage | null;

export type ModalPage = UniPage;

/**
 * HideModal 数据结构定义
 */
export type UniHideModalResult =  {

}

export type UniHideModalErrorCode = 4

export interface UniHideModalFail extends IUniError {
  errCode: UniHideModalErrorCode
}

export class UniHideModalFailImpl extends UniError implements UniHideModalFail {
  override errCode: UniHideModalErrorCode
  constructor(errMsg: string = 'hideModal:fail cancel', errCode: UniHideModalErrorCode = 4) {
    super()
    this.errMsg = errMsg
    this.errCode = errCode
  }
}

type UniHideModalFailCallback = (result: UniHideModalFail) => void

type UniHideModalSuccessCallback = (result: UniHideModalResult) => void

type UniHideModalCompleteCallback = (result: any) => void


export type HideModalOptions = {
  /**
   * 期望隐藏的目标modal 如果为null 会关闭当前栈顶全部modal
   */
  modalPage?: ModalPage | null,
  /**
   * 接口调用成功的回调函数
   */
  success?: UniHideModalSuccessCallback | null,
  /**
   * 接口调用失败的回调函数
   */
  fail?: UniHideModalFailCallback | null,
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: UniHideModalCompleteCallback | null
}

export type HideModal = (options: HideModalOptions | null) => void;


export interface Uni {

	/**
	 * @description 显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮。类似于一个API整合了 html 中：alert、confirm。
	 * @example
	  ```typescript
	  uni.showModal({
	    title: '提示',
	    content: '这是一个模态弹窗',
	    success: function (res) {
	      if (res.confirm) {
	        console.log('用户点击确定');
	      } else if (res.cancel) {
	        console.log('用户点击取消');
	      }
	    }
	  });
	  ```
	 * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/ui/prompt.html#showmodal
	 * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/prompt.html#showmodal
	 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/prompt.html#showmodal
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "√",
	        "uniUtsPlugin": "x",
	        "unixVer": "3.91"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "√",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.11",
	        "unixUtsPlugin": "4.11"
	      },
	      "harmony": {
	        "osVer": "3.0",
	        "uniVer": "4.23",
	        "unixVer": "4.61"
	      }
	    },
	    "mp": {
	      "weixin": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "4.41"
	      },
	      "alipay": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "baidu": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "toutiao": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "lark": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "qq": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "kuaishou": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "jd": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "√",
	      "unixVer": "4.0"
	    }
	  }
	 */
	showModal(options: ShowModalOptions): ModalPage | null,

	/**
	 * @description 隐藏已弹出的对话框实例，如果 `modalPage` 参数为空，则隐藏当前栈顶全部对话框
	 * @example
	  ```typescript
		uni.hideModal({
			modalPage:null,
			success: function (res) {
			}
		});
	  ```
	 * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/ui/prompt.html#hidemodal
	 * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/prompt.html#hidemodal
	 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/prompt.html#hidemodal
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61"
	      },
	      "harmony": {
	        "osVer": "x",
	        "uniVer": "x",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "x",
	      "unixVer": "4.61"
	    }
	  }
	 */
	hideModal(options: HideModalOptions | null):void
}

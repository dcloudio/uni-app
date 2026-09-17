export interface ShowModalSuccess {
	/**
	 * 错误信息
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	errMsg: string
	/**
	 * editable 为 true 时，用户输入的文本
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	content?: string | null
	/**
	 * 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	cancel: boolean
	/**
	 * 为 true 时，表示用户点击了确定按钮
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	confirm: boolean
}

export type ShowModalErrorCode = 4

export interface ShowModalFail extends IUniError {
	errCode: ShowModalErrorCode
}

export class ShowModalSuccessImpl implements ShowModalSuccess {
	errMsg: string
	content?: string | null
	cancel: boolean
	confirm: boolean
	constructor(cancel: boolean, confirm: boolean, content: string | null = null, errMsg: string = 'showModal:ok') {
		this.errMsg = errMsg
		this.content = content
		this.cancel = cancel
		this.confirm = confirm
	}
}

export class ShowModalFailImpl extends UniError implements ShowModalFail {
	override errCode: ShowModalErrorCode
	constructor(errMsg: string = 'showModal:fail cancel', errCode: ShowModalErrorCode = 4) {
		super()
		this.errMsg = errMsg
		this.errCode = errCode
	}
}

type ShowModalFailCallback = (result: ShowModalFail) => void

type ShowModalSuccessCallback = (result: ShowModalSuccess) => void

type ShowModalComplete = any

type UniShowModalCompleteCallback = (result: ShowModalComplete) => void

export type ShowModalOptions = {
	/**
	 * 提示的标题
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	title?: string | null,
	/**
	 * 提示的内容
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	content?: string | null,
	/**
	 * @defaultValue true
	 * @default true
	 * 是否显示取消按钮，默认为 true
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	showCancel?: boolean | null,
	/**
	 * 取消按钮的文字，默认为"取消"
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	cancelText?: string | null,
	/**
	 * 取消按钮的文字颜色，默认为"#000000"
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	cancelColor?: string.ColorString | null,
	/**
	 * 确定按钮的文字，默认为"确定"
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	confirmText?: string | null,
	/**
	 * 确定按钮的文字颜色
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	confirmColor?: string.ColorString | null,
	/**
	 * 是否显示输入框
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	 * @defaultValue false
	 */
	editable?: boolean | null,
	/**
	 * 显示输入框时的提示文本
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	placeholderText?: string | null,
	/**
	 * 接口调用成功的回调函数
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	success?: ShowModalSuccessCallback | null,
	/**
	 * 接口调用失败的回调函数
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	fail?: ShowModalFailCallback | null,
	/**
	 * 接口调用结束的回调函数（调用成功、失败都会执行）
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	complete?: UniShowModalCompleteCallback | null
}

export type ShowModal = (options?: ShowModalOptions | null) => ModalPage | null

export type ModalPage = UniPage

export interface HideModalSuccess {
	errMsg: string
}

export type HideModalErrorCode = 4

export interface HideModalFail extends IUniError {
	errCode: HideModalErrorCode
}

export class HideModalSuccessImpl implements HideModalSuccess {
	errMsg: string
	constructor(errMsg: string = 'hideModal:ok') {
		this.errMsg = errMsg
	}
}

export class HideModalFailImpl extends UniError implements HideModalFail {
	override errCode: HideModalErrorCode
	constructor(errMsg: string = 'hideModal:fail cancel', errCode: HideModalErrorCode = 4) {
		super()
		this.errMsg = errMsg
		this.errCode = errCode
	}
}

type UniHideModalFailCallback = (result: HideModalFail) => void

type UniHideModalSuccessCallback = (result: HideModalSuccess) => void

type HideModalComplete = any

type UniHideModalCompleteCallback = (result: HideModalComplete) => void

export type HideModalOptions = {
	/**
	 * 期望隐藏的目标 modal，如果为 null 会关闭当前栈顶全部 modal
	 * @uniPlatform {
		"app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
	      }
		},
		"mp": {
			"weixin": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"alipay": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"baidu": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"toutiao": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"lark": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"qq": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"kuaishou": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"jd": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			}
		},
		"web": {
			"uniVer": "√",
			"unixVer": "4.0"
		}
	}
	 */
	modalPage?: ModalPage | null,
	/**
	 * 接口调用成功的回调函数
	 * @uniPlatform {
		"app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
	      }
		},
		"mp": {
			"weixin": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"alipay": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"baidu": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"toutiao": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"lark": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"qq": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"kuaishou": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"jd": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			}
		},
		"web": {
			"uniVer": "√",
			"unixVer": "4.0"
		}
	}
	 */
	success?: UniHideModalSuccessCallback | null,
	/**
	 * 接口调用失败的回调函数
	 * @uniPlatform {
		"app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
	      }
		},
		"mp": {
			"weixin": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"alipay": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"baidu": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"toutiao": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"lark": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"qq": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"kuaishou": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"jd": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			}
		},
		"web": {
			"uniVer": "√",
			"unixVer": "4.0"
		}
	}
	 */
	fail?: UniHideModalFailCallback | null,
	/**
	 * 接口调用结束的回调函数（调用成功、失败都会执行）
	 * @uniPlatform {
		"app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
	      }
		},
		"mp": {
			"weixin": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"alipay": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"baidu": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"toutiao": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"lark": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"qq": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"kuaishou": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			},
			"jd": {
				"hostVer": "x",
				"uniVer": "x",
				"unixVer": "x"
			}
		},
		"web": {
			"uniVer": "√",
			"unixVer": "4.0"
		}
	}
	 */
	complete?: UniHideModalCompleteCallback | null
}

export type HideModal = (options?: HideModalOptions | null) => void

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
	 * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/modal.html
	 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/modal.html
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
	        "unixVer": "5.25"
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
	showModal(options?: ShowModalOptions | null): ModalPage | null,

	/**
	 * @description 隐藏已弹出的对话框实例，如果 `modalPage` 参数为空，则隐藏当前栈顶全部对话框
	 * @example
	  ```typescript
		uni.hideModal({
			modalPage: null,
			success: function (res) {
			}
		});
	  ```
	 * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/ui/prompt.html#hidemodal
	 * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/modal.html#hidemodal
	 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/modal.html#hidemodal
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
	      }
	    },
	    "mp": {
	      "weixin": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
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
	hideModal(options?: HideModalOptions | null): void
}

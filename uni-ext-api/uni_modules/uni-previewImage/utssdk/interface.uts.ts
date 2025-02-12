/**
 * 错误码
 */
export type PreviewImageErrorCode =
	/**
	 * 用户取消
	 */
	1101001 |
	/**
	 * urls至少包含一张图片地址
	 */
	1101002 |
	/**
	 * 文件不存在
	 */
	1101003 |
	/**
	 * 图片加载失败
	 */
	1101004 |
	/**
	 * 未获取权限
	 */
	1101005 |
	/**
	 * 其他错误
	 */
	1101010;

export interface IPreviewImageError extends IUniError {
	errCode : PreviewImageErrorCode
};
export type PreviewImageSuccess = {
	/**
	 * 调用API的名称
	 */
	errSubject : string,
	/**
	 * 描述信息
	 */
	errMsg : string
}
export type PreviewImageFail = IPreviewImageError;
export type PreviewImageSuccessCallback = (callback : PreviewImageSuccess) => void
export type PreviewImageFailCallback = (callback : PreviewImageFail) => void
export type PreviewImageCompleteCallback = (callback : any) => void

export type LongPressActionsSuccessResult = {
	/**
	 * 接口调用失败的回调函数
	 */
	tapIndex : number,
	/**
	 * 接口调用结束的回调函数（调用成功、失败都会执行）
	 */
	index : number
};

export type LongPressActionsFailResult = IPreviewImageError
export type LongPressActionsOptions = {
	/**
	 * 按钮的文字数组
	 */
	itemList : string[],
	/**
	 * 按钮的文字颜色，字符串格式，默认为"#000000"
	 */
	itemColor : string | null,
	/**
	 * 接口调用成功的回调函数
	 */
	success : ((result : LongPressActionsSuccessResult) => void) | null,
	/**
	 * 接口调用失败的回调函数
	 */
	fail : ((result : LongPressActionsFailResult) => void) | null,
	/**
	 * 接口调用结束的回调函数（调用成功、失败都会执行）
	 */
	complete : ((result : any) => void) | null
};

export type PreviewImageOptions = {
	/**
	 * current 为当前显示图片的链接/索引值，不填或填写的值无效则为 urls 的第一张。APP平台仅支持索引值。
	 * @type string | number
	 */
	current ?: any | null,
	/**
	 * 需要预览的图片链接列表
	 */
	urls : Array<string.ImageURIString>,
	/**
	 * 是否显示长按菜单
	 *
	 * @uniPlatform {
	 *	 "app": {
	 *		"android": {
	 *			"osVer": "5.0",
	 *			"uniVer": "√",
	 *			"unixVer": "x"
	 *		},
	 *		"ios": {
	 *			"osVer": "10.0",
	 *			"uniVer": "√",
	 *			"unixVer": "x"
	 *		},
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.23",
   *      "unixVer": "4.61"
   *    }
	 *	},
	*  "mp": {
	*    "weixin": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "4.41"
	*    },
	*    "alipay": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "baidu": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "toutiao": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "lark": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "qq": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "kuaishou": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "jd": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    }
	*  },
	 *	"web": {
	 *		"uniVer": "√",
	 *		"unixVer": "x"
	 *	}
	 * }
	 */
	showmenu ?: boolean | null,
	/**
	 * 图片指示器样式
	 *
	 * @uniPlatform {
	 *	 "app": {
		 *		"android": {
		 *			"osVer": "5.0",
		 *			"uniVer": "√",
		 *			"unixVer": "3.9"
		 *		},
		 *		"ios": {
		 *			"osVer": "10.0",
		 *			"uniVer": "√",
		 *			"unixVer": "4.11"
		 *		},
   *    "harmony": {
   *      "osVer": "x",
   *      "uniVer": "x",
   *      "unixVer": "x"
   *    }
	 *	},
	 *	"web": {
	 *		"uniVer": "√",
	 *		"unixVer": "x"
	 *	}
	 * }
	 */
	indicator ?:
	/**
	 * 底部圆点指示器
	 */
	'default' |
	/**
	 * 顶部数字指示器
	 */
	'number' |
	/**
	 * 不显示指示器
	 */
	'none' |
	null,
	/**
	 * 是否可循环预览
	 * @type boolean
	 * @uniPlatform {
		   *	 "app": {
				 *		"android": {
				 *			"osVer": "5.0",
				 *			"uniVer": "√",
				 *			"unixVer": "3.9"
				 *		},
				 *		"ios": {
				 *			"osVer": "10.0",
				 *			"uniVer": "√",
				 *			"unixVer": "4.11"
				 *		},
	 *    "harmony": {
	 *      "osVer": "x",
	 *      "uniVer": "x",
	 *      "unixVer": "x"
	 *    }
		   *	},
		 *	"web": {
		 *		"uniVer": "√",
		 *		"unixVer": "x"
		 *	}
		   * }
	 */
	loop ?: boolean | null,
	/**
	 * 长按图片显示操作菜单。
	 * @uniPlatform {
	 *	 "app": {
	 *		"android": {
	 *			"osVer": "5.0",
	 *			"uniVer": "√",
	 *			"unixVer": "4.51"
	 *		},
	 *     "ios": {
	 *			"osVer": "5.0",
	 *			"uniVer": "√",
	 *			"unixVer": "x"
	 *		},
   *    "harmony": {
   *      "osVer": "x",
   *      "uniVer": "x",
   *      "unixVer": "x"
   *    }
	 *	},
	 *    "web": {
	 *      "osVer": "x",
	 *      "uniVer": "x",
	 *      "unixVer": "x"
	 *    },
	*  "mp": {
	*    "weixin": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "4.41"
	*    },
	*    "alipay": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "baidu": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "toutiao": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "lark": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "qq": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "kuaishou": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "jd": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    }
	*  }
	 * }
	 */
	longPressActions ?: LongPressActionsOptions | null,
	/**
	 * 接口调用成功的回调函数
	 */
	success ?: (PreviewImageSuccessCallback) | null,
	/**
	 * 接口调用失败的回调函数
	 */
	fail ?: (PreviewImageFailCallback) | null,
	/**
	 * 接口调用结束的回调函数（调用成功、失败都会执行）
	 */
	complete ?: (PreviewImageCompleteCallback) | null
};

export type PreviewImage = (options : PreviewImageOptions) => void;

export type ClosePreviewImage = (options : ClosePreviewImageOptions) => void;
export type ClosePreviewImageSuccess = {
	/**
	 * 错误信息
	 */
	errMsg : string
};

export type ClosePreviewImageFail = IPreviewImageError;
export type ClosePreviewImageSuccessCallback = (callback : ClosePreviewImageSuccess) => void
export type ClosePreviewImageFailCallback = (callback : ClosePreviewImageFail) => void
export type ClosePreviewImageCompleteCallback = PreviewImageCompleteCallback

export type ClosePreviewImageOptions = {
	/**
	 * 接口调用成功的回调函数
	 */
	success ?: (ClosePreviewImageSuccessCallback) | null,
	/**
	 * 接口调用失败的回调函数
	 */
	fail ?: (ClosePreviewImageFailCallback) | null,
	/**
	 * 接口调用结束的回调函数（调用成功、失败都会执行）
	 */
	complete ?: (ClosePreviewImageCompleteCallback) | null
};

export interface Uni {
	/**
	 * 预览图片
	 * @description 预览图片
	 * @uniPlatform {
	 *	 "app": {
	 *		"android": {
	 *			"osVer": "5.0",
	 *			"uniVer": "√",
	 *			"unixVer": "3.9+"
	 *		},
	 *		"ios": {
	 *			"osVer": "12.0",
	 *			"uniVer": "√",
	 *			"unixVer": "4.11"
	 *		},
	 *    "harmony": {
	 *      "osVer": "3.0",
	 *      "uniVer": "4.23",
	 *      "unixVer": "4.61"
	 *    }
	 *	},
	 *  "web": {
	 *    "uniVer": "√",
	 *    "unixVer": "4.0"
	 *  },
	 * "mp": {
   *    "weixin": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "4.41"
   *    },
   *    "alipay": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "baidu": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "toutiao": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "lark": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "qq": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "kuaishou": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "jd": {
   *      "hostVer": "x",
   *      "uniVer": "x",
   *      "unixVer": "x"
   *    }
   *  }
	 * }
	 * @uniVueVersion 2,3
	 * @example
	 * ```typescript
	 * uni.previewImage({
	 *	urls:['/static/a.jpg','/static/b.jpg'],
	 *	success(e){
	 *		console.log(JSON.stringify(e))
	 * 	}
	 * })
	 * ```
	 * @tutorial-uni-app https://uniapp.dcloud.net.cn/api/media/image.html#unipreviewimageobject
	 * @tutorial-uni-app-x https://doc.dcloud.net.cn/uni-app-x/api/preview-image.html
	 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/preview-image.html
	 * @autotest {
	   generated:false
	 }
	 */
	previewImage(options : PreviewImageOptions) : void;
	/**
	 * 关闭图片预览
	 * @description 关闭图片预览
	 * @uniPlatform {
	 *	 "app": {
	 *		"android": {
	 *			"osVer": "5.0",
	 *			"uniVer": "√",
	 *			"unixVer": "3.9+"
	 *		},
	 *		"ios": {
	 *			"osVer": "12.0",
	 *			"uniVer": "√",
	 *			"unixVer": "4.11"
	 *		},
	 *    "harmony": {
	 *      "osVer": "3.0",
	 *      "uniVer": "4.23",
	 *      "unixVer": "4.61"
	 *    }
	 *	},
	*  "mp": {
	*    "weixin": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "4.41"
	*    },
	*    "alipay": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "baidu": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "toutiao": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "lark": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "qq": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "kuaishou": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    },
	*    "jd": {
	*        "hostVer": "√",
	*        "uniVer": "√",
	*        "unixVer": "x"
	*    }
	*  },
	 *  "web": {
	 *    "uniVer": "√",
	 *    "unixVer": "4.0"
	 *  }
	 * }
	 * @uniVueVersion 2,3
	 * @example
	 * ```typescript
	 * uni.closePreviewImage({
	 *	success(e){
	 *		console.log(JSON.stringify(e))
	 * 	}
	 * })
	 * ```
	 * @tutorial-uni-app https://uniapp.dcloud.net.cn/api/media/image.html#closepreviewimage
	 * @tutorial-uni-app-x https://doc.dcloud.net.cn/uni-app-x/api/preview-image.html#closepreviewimage
	 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/preview-image.html#closepreviewimage
	 * @autotest {
	   generated:false
	 }
	 */
	closePreviewImage(options : ClosePreviewImageOptions) : void;
}

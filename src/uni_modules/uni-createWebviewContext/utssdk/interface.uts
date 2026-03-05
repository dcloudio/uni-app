export type CreateWebviewContext = (webviewId : string.WebviewIdString, component ?: ComponentPublicInstance | null) => WebviewContext | null;

export type UniWebviewContextLoadDataOptions = {
	/**
	 * 要加载的内容，编码后的字符串
	 */
	data: string,
	/**
	 * 页面的基础URL
	 */
	baseURL?: string | null,
	/**
	 * 加载的页面内容类型，默认值为"text/html"
	 */
	mimeType?: string | null,
	/**
	 * 页面内容的编码类型，默认值为"utf-8"
	 */
	encoding?: string | null
}

export interface WebviewContext {
	/**
	 * @description 后退到 web-view 组件网页加载历史的上一页，如果不存在上一页则没有任何效果。
	 * @uniPlatform {
	 *  "app": {
	 *    "android": {
	 *      "osVer": "5.0",
	 *      "uniVer": "x",
	 *      "unixVer": "3.9.0"
	 *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "√",
     *      "unixVer": "4.11"
     *    },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.28",
   *      "unixVer": "4.61",
   *      "unixvVer": "5.0"
   *    }
	 *  }
	 * }
	 * @uniVueVersion 2,3
	 */
	back() : void

	/**
	 * @description 前进到 web-view 组件网页加载历史的下一页，如果不存在下一页则没有任何效果。
	 * @uniPlatform {
	 *  "app": {
	 *    "android": {
	 *      "osVer": "5.0",
	 *      "uniVer": "x",
	 *      "unixVer": "3.9.0"
	 *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "√",
     *      "unixVer": "4.11"
     *    },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.28",
   *      "unixVer": "4.61",
   *      "unixvVer": "5.0"
   *    }
	 *  }
	 * }
	 * @uniVueVersion 2,3
	 */
	forward() : void

	/**
	 * @description 重新加载 web-view 组件当前页面。
	 * @uniPlatform {
	 *  "app": {
	 *    "android": {
	 *      "osVer": "5.0",
	 *      "uniVer": "x",
	 *      "unixVer": "3.9.0"
	 *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "√",
     *      "unixVer": "4.11"
     *    },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.28",
   *      "unixVer": "4.61",
   *      "unixvVer": "5.0"
   *    }
	 *  }
	 * }
	 * @uniVueVersion 2,3
	 */
	reload() : void

	/**
	 * @description 停止加载 web-view 组件当前网页，该方法不能阻止已经加载的 html 文档，但是能够阻止未完成的图片及延迟加载的资源。
	 * @uniPlatform {
	 *  "app": {
	 *    "android": {
	 *      "osVer": "5.0",
	 *      "uniVer": "x",
	 *      "unixVer": "3.9.0"
	 *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "√",
     *      "unixVer": "4.11"
     *    },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.28",
   *      "unixVer": "4.61",
   *      "unixvVer": "5.0"
   *    }
	 *  }
	 * }
	 * @uniVueVersion 2,3
	 */
	stop() : void

	/**
	 * @description 在网页中执行指定的js脚本，在 uvue 页面中可通过此方法向 web-view 组件加载的页面发送数据
	 * @uniPlatform {
	 *  "app": {
	 *    "android": {
	 *      "osVer": "5.0",
	 *      "uniVer": "x",
	 *      "unixVer": "3.9.0"
	 *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "√",
     *      "unixVer": "4.11"
     *    },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.28",
   *      "unixVer": "4.61",
   *      "unixvVer": "5.0"
   *    }
	 *  }
	 * }
	 * @uniVueVersion 2,3
	 */
	evalJS(js : string) : void

	/**
	 * @description 在web-view组件中加载页面内容
	 * @uniPlatform {
	 *  "app": {
	 *    "android": {
	 *      "osVer": "5.0",
	 *      "uniVer": "x",
	 *      "unixVer": "4.71"
	 *    },
	 *    "ios": {
	 *      "osVer": "12.0",
	 *      "uniVer": "x",
	 *      "unixVer": "4.71"
	 *    },
	 *    "harmony": {
	 *      "osVer": "3.0",
	 *      "uniVer": "4.71",
	 *      "unixVer": "4.71",
	 *      "unixvVer": "5.0"
	 *    }
	 *  }
	 * }
	 * @uniVueVersion 2,3
	 */
	loadData(options: UniWebviewContextLoadDataOptions) : void
}

export interface Uni {
	/**
	 * @description 创建 web-view 组件的上下文对象，用于操作 web-view 的行为。
	 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/create-webview-context.html
	 * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/create-webview-context.html
	 * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/create-webview-context.html#createwebviewcontext
	 * @uniPlatform {
	 *  "app": {
	 *    "android": {
	 *      "osVer": "5.0",
	 *      "uniVer": "x",
	 *      "unixVer": "3.9.0"
	 *    },
   *    "ios": {
   *      "osVer": "12.0",
   *      "uniVer": "√",
   *      "unixVer": "4.11"
   *    },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.28",
   *      "unixVer": "4.61",
   *      "unixvVer": "5.0"
   *    }
	 *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "x"
     *  }
	 * }
	 * @uniVueVersion 2,3
	 * @return {WebviewContext} web-view组件上下文对象
	 */
	createWebviewContext(webviewId : string.WebviewIdString, component ?: ComponentPublicInstance | null): WebviewContext | null;
}

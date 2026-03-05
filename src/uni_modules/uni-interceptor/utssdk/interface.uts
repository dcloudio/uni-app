import { Interceptor } from '@dcloudio/uni-runtime'


export type AddInterceptorOptions = Interceptor
export type RemoveInterceptorOptions = Interceptor

export type AddInterceptor = (
    name: string,
    interceptor: AddInterceptorOptions,
) => void

export type RemoveInterceptor = (
    name: string,
    interceptor: RemoveInterceptorOptions | null,
) => void

export interface Uni {
    /**
     * 添加拦截器
     * @param name 需要拦截的 API 名称
     * @param interceptor 拦截器
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/interceptor.html
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/interceptor.html
     * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/interceptor.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *        "osVer": "5.0",
     *        "uniVer": "√",
     *        "unixVer": "3.97"
     *      },
     *      "ios": {
     *          "osVer": "12.0",
     *          "uniVer": "√",
     *          "unixVer": "4.11"
     *      },
     *    "harmony": {
     *      "osVer": "3.0",
     *      "uniVer": "4.23",
     *      "unixVer": "4.61",
     *      "unixvVer": "5.0"
     *    }
     *  },
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
     *      "uniVer": "√",
     *      "unixVer": "4.0"
     *  }
     * }
     */
    addInterceptor(name: string, interceptor: AddInterceptorOptions): void
    /**
     * 删除拦截器
     * @param name 需要删除拦截器的 API 名称
     * @param interceptor 拦截器
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/interceptor.html#removeinterceptor
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/interceptor.html#removeinterceptor
     * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/interceptor.html#removeinterceptor
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *        "osVer": "5.0",
     *        "uniVer": "√",
     *        "unixVer": "3.97"
     *      },
     *      "ios": {
     *          "osVer": "12.0",
     *          "uniVer": "√",
     *          "unixVer": "4.11"
     *      },
     *    "harmony": {
     *      "osVer": "3.0",
     *      "uniVer": "4.23",
     *      "unixVer": "4.61",
     *      "unixvVer": "5.0"
     *    }
     *  },
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
     *      "uniVer": "√",
     *      "unixVer": "4.0"
     *  }
     * }
     */
    removeInterceptor(
        name: string,
        interceptor?: RemoveInterceptorOptions | null,
    ): void
}

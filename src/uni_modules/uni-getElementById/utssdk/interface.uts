export type GetElementById = (id: string.IDString | string) => UniElement | null

export interface Uni {
    /**
     * 返回一个匹配特定 ID 的元素， 如果不存在，返回 null。\
     * 如果需要获取指定的节点类型，需要使用 as 进行类型转换。\
     * ID 区分大小写，且应该是唯一的。如果存在多个匹配的元素，则返回第一个匹配的元素。
     *
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/get-element.html
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/get-element.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *        "osVer": "5.0",
     *        "uniVer": "x",
     *        "unixVer": "3.91"
     *      },
     *      "ios": {
     *          "osVer": "12.0",
     *          "uniVer": "x",
     *          "unixVer": "4.11",
     *          "uniUtsPlugin": "x",
     *          "unixUtsPlugin": "4.25"
     *      },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61",
     *      "unixUtsPlugin": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "4.41"
     *    },
     *    "alipay": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "baidu": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "toutiao": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "lark": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "qq": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "kuaishou": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "jd": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     *  },
     *  "web": {
     *      "uniVer": "x",
     *      "unixVer": "4.0"
     *  }
     * }
     */
    getElementById(id: string.IDString | string): UniElement | null
    getElementById<T>(id: string.IDString | string): T | null
}

/**
 * TextEncoder 接受码位流作为输入，并提供 UTF-8 字节流作为输出。
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder)
 */
interface TextEncoder {
  /**
   * Returns "utf-8".
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder/encoding)
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "√",
   *            "uniUtsPlugin": "√",
   *            "unixVer": "4.28",
   *            "unixUtsPlugin": "4.28"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "√",
   *            "uniUtsPlugin": "x",
   *            "unixVer": "x",
   *            "unixUtsPlugin": "x"
   *   	    },
   *        "harmony": {
   *           "osVer": "x",
   *           "uniVer": "x",
   *           "unixVer": "x"
   *        }
   *    },
   *    "web": {
   *       "uniVer": "√",
   *       "unixVer": "√"
   *    }
   * }
   */
  readonly encoding : string;
  /**
   * TextEncoder.encode() 方法接受一个字符串作为输入，返回一个对参数中给定的文本的编码后的 Uint8Array，编码的方法通过 TextEncoder 对象指定。
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder/encode)
   * @param input 一个包含了将要编码的文本。
   * @returns 一个 Uint8Array 对象。
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "√",
   *            "uniUtsPlugin": "√",
   *            "unixVer": "4.28",
   *            "unixUtsPlugin": "4.28"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "√",
   *            "uniUtsPlugin": "x",
   *            "unixVer": "x",
   *            "unixUtsPlugin": "x"
   *   	    },
   *        "harmony": {
   *           "osVer": "x",
   *           "uniVer": "x",
   *           "unixVer": "x"
   *        }
   *    },
   *    "web": {
   *       "uniVer": "√",
   *       "unixVer": "√"
   *    }
   * }
   */
  encode(input ?: string) : Uint8Array;
}

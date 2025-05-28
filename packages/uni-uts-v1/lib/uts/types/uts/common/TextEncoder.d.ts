/**
 * TextEncoder 接受码位流作为输入，并提供 UTF-8 字节流作为输出。
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder)
 */
interface TextEncoder {
  /**
     返回 "utf-8".
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.31",
                "unixUtsPlugin": "4.31"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "x",
                "uniUtsPlugin": "x",
                "unixVer": "4.71",
                "unixUtsPlugin": "4.71"
              },
            "harmony": {
               "osVer": "5.0.2",
               "uniVer": "√",
               "unixVer": "4.71"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  readonly encoding : string;
  /**
     TextEncoder.encode() 方法接受一个字符串作为输入，返回一个对参数中给定的文本的编码后的 Uint8Array，编码的方法通过 TextEncoder 对象指定。
     @param input 一个包含了将要编码的文本。
     @returns 一个 Uint8Array 对象。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.31",
                "unixUtsPlugin": "4.31"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "x",
                "uniUtsPlugin": "x",
                "unixVer": "4.71",
                "unixUtsPlugin": "4.71"
              },
            "harmony": {
               "osVer": "5.0.2",
               "uniVer": "√",
               "unixVer": "4.71"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  encode(input ?: string) : Uint8Array;
}
declare var TextEncoder : {
  new() : TextEncoder;
};

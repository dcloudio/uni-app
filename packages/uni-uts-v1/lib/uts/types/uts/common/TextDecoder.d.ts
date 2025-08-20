
interface TextDecoder {
  /**
     只读属性 TextDecoder.encoding 返回一个字符串，其中包含了指定的解码器的解码算法的名称。
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
     TextDecoder.decode() 方法返回一个字符串，其包含作为参数传递的缓冲区解码后的文本。
     @param input ArrayBuffer。
     @returns 一个字符串。
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
  decode(input : ArrayBuffer) : string;
  /**
     TextDecoder.decode() 方法返回一个字符串，其包含作为参数传递的缓冲区解码后的文本。
     @param input DataView。
     @returns 一个字符串。
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
                "unixVer": "x",
                "unixUtsPlugin": "x"
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
  decode(input : DataView) : string;
  /**
     TextDecoder.decode() 方法返回一个字符串，其包含作为参数传递的缓冲区解码后的文本。
     @param input Float32Array，Float64Array，Int8Array，Int16Array，Int32Array，Uint8Array，Uint8ClampedArray，Uint16Array，Uint32Array 的实例
     @returns 一个字符串。
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
  decode(input : TypedArray) : string;
}

declare var TextDecoder : {
  /**
     TextDecoder() 构造函数使用参数中指定的编码返回一个新创建的
     @param label  一个字符串，支持utf-8,gbk,gb2312默认是 "utf-8"，如果传入的值不属于上述范围，会按照默认的"utf-8" 处理，另外
     @returns 一个字符串。
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
  new(label ?: string) : TextDecoder;
};

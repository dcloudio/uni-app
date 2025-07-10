/**
 * 代表二进制数据的原始缓冲区，用于为不同的类型化数组存储数据。
 * ArrayBuffer 不能直接读取或写入，但可以传递给类型化数组或 DataView 对象
 * 来按需要解释原始缓冲区。
 */
interface ArrayBuffer {
  /**
     ArrayBuffer 实例的 byteLength 访问器属性返回该数组缓冲区的长度（以字节为单位）。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/arraybuffer.html#bytelength
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "x",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  readonly byteLength : number;

  /**
     ArrayBuffer 实例的 slice() 方法返回一个新的 ArrayBuffer 实例，其包含原 ArrayBuffer 实例中从 begin 开始（包含）到 end 结束（不含）的所有字节的副本。
     @param begin 可选，要开始提取的位置索引（从 0 开始），将被转换为整数。负数索引将会从缓冲区末尾开始计算——如果 start < 0，那么将会使用 start + buffer.length。
     如果 start < -buffer.length 或省略了 start，则会使用 0。
     如果 start >= buffer.length，则不会提取任何内容。
     @param end 可选，要结束提取的位置索引（从 0 开始），将被转换为整数。slice() 提取到但不包括 end。
     负数索引将会从缓冲区末尾开始计算——如果 end < 0，那么将会使用 end + buffer.length。
     如果 end < -buffer.length，则会使用 0。
     如果 end >= buffer.length 或省略了 end，则会使用 buffer.length，则会导致直到末尾的所有元素都被提取。
     如果标准化后的 end 位置在 start 位置之前，则不会提取任何内容。
     @return 一个新的 ArrayBuffer 对象。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/arraybuffer.html#slice-begin-end
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "x",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  slice(begin ?: number, end ?: number) : ArrayBuffer;
  /**
     ArrayBuffer 实例的 toByteBuffer() 方法返回一个android原生ByteBuffer对象。
     @return android 原生ByteBuffer对象。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "x",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "x",
                "uniVer": "x",
                "uniUtsPlugin": "x",
                "unixVer": "x",
                "unixUtsPlugin": "x"
              },
            "harmony": {
               "osVer": "x",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "x",
           "unixVer": "x"
        }
     }
   */
  toByteBuffer() : ByteBuffer;
  /**
     ArrayBuffer 实例的 toData() 方法返回一个 iOS 原生 Data 对象。
     @return iOS 原生 Data 对象。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/arraybuffer.html#toData
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "x",
                "uniVer": "x",
                "uniUtsPlugin": "x",
                "unixVer": "x",
                "unixUtsPlugin": "x"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "x",
                "uniUtsPlugin": "4.51",
                "unixVer": "x",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "x",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "x",
           "unixVer": "x"
        }
     }
   */
  toData() : Data;
}
interface ArrayBufferConstructor {
  /**
     构造函数创建一个以字节为单位的给定长度的新 ArrayBuffer
     @param byteLength 长度，单位字节
     @return ArrayBuffer
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/arraybuffer.html#constructor-bytelength
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "√",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "x",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  new(byteLength : number) : ArrayBuffer;
  /**
     ArrayBuffer.isView() 静态方法用于确定传递的值是否是 ArrayBuffer 视图之一。
     @param arg 需要检测的值。
     @return 如果 arg 是 ArrayBuffer 视图之一，则返回 true，例如类型化数组对象或者 DataView。否则返回 false。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/arraybuffer.html#isView
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "√",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "x",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  isView(arg : any) : boolean;
  /**
     ArrayBuffer.fromByteBuffer() 静态方法用于将android 原生的ByteBuffer对象转换为ArrayBuffer
     @param byteBuffer android原生bytebuffer对象
     @return ArrayBuffer
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "x",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "x",
                "uniVer": "x",
                "uniUtsPlugin": "x",
                "unixVer": "x",
                "unixUtsPlugin": "x"
              },
            "harmony": {
               "osVer": "x",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "x",
           "unixVer": "x"
        }
     }
   */
  fromByteBuffer(byteBuffer : ByteBuffer) : ArrayBuffer;
  /**
     ArrayBuffer.fromData() 静态方法用于将 iOS 原生的 Data 对象转换为 ArrayBuffer
     @param data iOS 原生 Data 对象
     @return ArrayBuffer
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/arraybuffer.html#fromData
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "x",
                "uniVer": "x",
                "uniUtsPlugin": "",
                "unixVer": "x",
                "unixUtsPlugin": "x"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "x",
                "uniUtsPlugin": "4.51",
                "unixVer": "x",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "x",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "x",
           "unixVer": "x"
        }
     }
   */
  fromData(data : Data) : ArrayBuffer;
}
/**
 * Allowed ArrayBuffer types for the buffer of an ArrayBufferView and related Typed Arrays.
 */
interface ArrayBufferTypes {
  ArrayBuffer : ArrayBuffer;
}
type ArrayBufferLike = ArrayBufferTypes[keyof ArrayBufferTypes];

declare var ArrayBuffer : ArrayBufferConstructor;

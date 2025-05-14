/**
     表示“非数字”（Not-A-Number）。和 NaN 相同。
     在相等比较中，NaN不等于任何值，包括它自己。要测试一个值是否等于NaN，使用isNaN函数。

     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/global.html#NaN
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.9",
               "uniUtsPlugin": "3.9",
               "unixUtsPlugin": "3.9"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
               "unixVer": "x",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "x"
            },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
        "web": {
            "uniVer": "√",
            "unixVer": "4.0"
        }
     }
   */
declare var NaN: number;
/**
     全局属性 Infinity 是一个数值，表示无穷大。

     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/global.html#Infinity
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "x",
               "uniVer": "√",
               "unixVer": "x",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "x"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
               "unixVer": "x",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "x"
            },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
        "web": {
            "uniVer": "√",
            "unixVer": "4.0"
        }
     }
   */
declare var Infinity: number;

declare type RequestAnimationFrameCallback = (task: number) => void


/**
  eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。
  @param x 一个表示 JavaScript 表达式、语句或一系列语句的字符串。表达式可以包含变量与已存在对象的属性。
  @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/eval.html
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "√",
        "uniUtsPlugin": "x",
        "unixVer": "x",
        "unixUtsPlugin": "x"
      },
      "ios": {
        "osVer": "x",
        "uniVer": "x",
        "unixVer": "x",
        "uniUtsPlugin": "x",
        "unixUtsPlugin": "x"
      },
      "harmony": {
          "osVer": "5.0.0",
          "uniVer": "√",
          "unixVer": "x",
          "uniUtsPlugin": "√",
          "unixUtsPlugin": "x"
      }
    },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
    "web": {
      "uniVer": "√",
      "unixVer": "4.0"
    }
  }
 */
declare function eval(x: string): any;


/**
  parseInt(string, radix) 解析一个字符串并返回指定基数的十进制整数，radix 是 2-36 之间的整数，表示被解析字符串的基数。
  @param string 要被解析的值。字符串开头的空白符将会被忽略。（注意：只接收字符串类型的参数，其他类型将编译报错。）
  @param radix 从 2 到 36 的整数，表示进制的基数。例如指定 16 表示被解析值是十六进制数。如果超出这个范围，将返回 NaN。假如指定 0 或未指定，基数将会根据字符串的值进行推算。注意，推算的结果不会永远是默认值 10！
  @return 从给定的字符串中解析出的一个整数，或者 NaN。当radix 小于 2 或大于 36，或第一个非空格字符不能转换为数字时返回 NAN。
  @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#parseInt
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "√",
        "uniUtsPlugin": "3.91",
        "unixVer": "3.91",
        "unixUtsPlugin": "3.91"
      },
      "ios": {
        "osVer": "12.0",
        "uniVer": "√",
        "uniUtsPlugin": "4.11",
        "unixVer": "4.11",
        "unixUtsPlugin": "4.11"
      },
      "harmony": {
          "osVer": "5.0.0",
          "uniVer": "√",
          "unixVer": "4.61",
          "uniUtsPlugin": "√",
          "unixUtsPlugin": "4.61"
      }
    },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
    "web": {
      "uniVer": "√",
      "unixVer": "4.0"
    }
  }
 */
declare function parseInt(string: string, radix?: number): number;


/**
  parseFloat() 函数解析一个参数（直接收字符串类型的参数，其他类型编译报错）并返回一个浮点数。
  @param string 需要被解析成为浮点数的值。
  @return 给定值被解析成浮点数。如果给定值不能被转换成数值，则会返回 NaN。
  @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#parseFloat
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "√",
        "uniUtsPlugin": "3.91",
        "unixVer": "3.91",
        "unixUtsPlugin": "3.91"
      },
      "ios": {
        "osVer": "12.0",
        "uniVer": "√",
        "uniUtsPlugin": "4.11",
        "unixVer": "4.11",
        "unixUtsPlugin": "4.11"
      },
      "harmony": {
          "osVer": "5.0.0",
          "uniVer": "√",
          "unixVer": "4.61",
          "uniUtsPlugin": "√",
          "unixUtsPlugin": "4.61"
      }
    },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
    "web": {
      "uniVer": "√",
      "unixVer": "4.0"
    }
  }
 */
declare function parseFloat(string: string): number;


/**
  isNaN() 函数用来确定一个值是否为NaN 。注：isNaN函数内包含一些非常有趣的规则；你也可以使用 ECMAScript 2015 中定义的 Number.isNaN() 来判断。
  @param number 要被检测的值。
  @return 如果给定值为 NaN则返回值为true；否则为false。
  @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#isNaN
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "√",
        "uniUtsPlugin": "3.91",
        "unixVer": "3.91",
        "unixUtsPlugin": "3.91"
      },
      "ios": {
        "osVer": "12.0",
        "uniVer": "√",
        "uniUtsPlugin": "4.11",
        "unixVer": "4.11",
        "unixUtsPlugin": "4.11"
      },
      "harmony": {
          "osVer": "5.0.0",
          "uniVer": "√",
          "unixVer": "4.61",
          "uniUtsPlugin": "√",
          "unixUtsPlugin": "4.61"
      }
    },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
    "web": {
      "uniVer": "√",
      "unixVer": "4.0"
    }
  }
 */
declare function isNaN(number: number): boolean;


/**
  isFinite() 函数用来判断被传入的参数值是否为一个有限数值（finite number）。
  @param number 要被检测的值。
  @return 如果参数是 NaN，正无穷大或者负无穷大，会返回false，其他返回 true。
  @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#isFinite
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "√",
        "uniUtsPlugin": "3.91",
        "unixVer": "3.91",
        "unixUtsPlugin": "3.91"
      },
      "ios": {
        "osVer": "12.0",
        "uniVer": "√",
        "uniUtsPlugin": "4.11",
        "unixVer": "4.11",
        "unixUtsPlugin": "4.11"
      },
      "harmony": {
          "osVer": "5.0.0",
          "uniVer": "√",
          "unixVer": "4.61",
          "uniUtsPlugin": "√",
          "unixUtsPlugin": "4.61"
      }
    },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
    "web": {
      "uniVer": "√",
      "unixVer": "4.0"
    }
  }
 */
declare function isFinite(number: number): boolean;


/**
  decodeURI() 函数能解码由encodeURI 创建或其他流程得到的统一资源标识符（URI）。
  @param encodedURI 一个完整的编码过的 URI
  @return 返回一个给定编码统一资源标识符 (URI) 的未编码版本的新字符串, 当 encodedURI 包含无效字符序列时，会返回null
  @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#decodeURI
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "√",
        "uniUtsPlugin": "3.91",
        "unixVer": "3.91",
        "unixUtsPlugin": "3.91"
      },
      "ios": {
        "osVer": "12.0",
        "uniVer": "√",
        "uniUtsPlugin": "4.11",
        "unixVer": "4.11",
        "unixUtsPlugin": "4.11"
      },
      "harmony": {
          "osVer": "5.0.0",
          "uniVer": "√",
          "unixVer": "4.61",
          "uniUtsPlugin": "√",
          "unixUtsPlugin": "4.61"
      }
    },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
    "web": {
      "uniVer": "√",
      "unixVer": "4.0"
    }
  }
 */
declare function decodeURI(encodedURI: string): string | null;


/**
  decodeURIComponent() 方法用于解码由 encodeURIComponent 方法或者其他类似方法编码的部分统一资源标识符（URI）。
  @param encodedURIComponent 编码后的部分 URI
  @return 一个解码后的统一资源标识符（URI）字符串，处理前的 URI 经过了给定格式的编码。当 encodedURI 包含无效字符序列时，会返回null.
  @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#decodeURIComponent
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "√",
        "uniUtsPlugin": "3.91",
        "unixVer": "3.91",
        "unixUtsPlugin": "3.91"
      },
      "ios": {
        "osVer": "12.0",
        "uniVer": "√",
        "uniUtsPlugin": "4.11",
        "unixVer": "4.11",
        "unixUtsPlugin": "4.11"
      },
      "harmony": {
          "osVer": "5.0.0",
          "uniVer": "√",
          "unixVer": "4.61",
          "uniUtsPlugin": "√",
          "unixUtsPlugin": "4.61"
      }
    },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
    "web": {
      "uniVer": "√",
      "unixVer": "4.0"
    }
  }
 */
declare function decodeURIComponent(encodedURIComponent: string): string | null;


/**
  encodeURI() 函数通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列) 由两个 "代理" 字符组成)。
  @param uri 一个完整的 URI。
  @return 一个新字符串，表示提供的字符串编码为统一资源标识符 (URI)。
  @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#encodeURI
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "√",
        "uniUtsPlugin": "3.91",
        "unixVer": "3.91",
        "unixUtsPlugin": "3.91"
      },
      "ios": {
        "osVer": "12.0",
        "uniVer": "√",
        "uniUtsPlugin": "4.11",
        "unixVer": "4.11",
        "unixUtsPlugin": "4.11"
      },
      "harmony": {
          "osVer": "5.0.0",
          "uniVer": "√",
          "unixVer": "4.61",
          "uniUtsPlugin": "√",
          "unixUtsPlugin": "4.61"
      }
    },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
    "web": {
      "uniVer": "√",
      "unixVer": "4.0"
    }
  }
 */
declare function encodeURI(uri: string): string | null;


/**
  encodeURIComponent() 函数通过将特定字符的每个实例替换成代表字符的 UTF-8 编码的一个、两个、三个或四个转义序列来编码 URI（只有由两个“代理”字符组成的字符会被编码为四个转义序列）。与 encodeURI() 相比，此函数会编码更多的字符，包括 URI 语法的一部分。
  @param uriComponent 要被检测的 string 值。
  @return 原字串作为 URI 组成部分被被编码后的新字符串。
  @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#encodeURIComponent
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "√",
        "uniUtsPlugin": "3.91",
        "unixVer": "3.91",
        "unixUtsPlugin": "3.91"
      },
      "ios": {
        "osVer": "12.0",
        "uniVer": "√",
        "uniUtsPlugin": "4.11",
        "unixVer": "4.11",
        "unixUtsPlugin": "4.11"
      },
      "harmony": {
          "osVer": "5.0.0",
          "uniVer": "√",
          "unixVer": "4.61",
          "uniUtsPlugin": "√",
          "unixUtsPlugin": "4.61"
      }
    },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
    "web": {
      "uniVer": "√",
      "unixVer": "4.0"
    }
  }
 */
declare function encodeURIComponent(uriComponent: string): string | null;


/**
  atob() 函数会对经过 Base64 编码的字符串进行解码
  @param encodedData 一个包含 base64 编码数据的二进制字符串（即字符串中的每个字符都被视为一字节的二进制数据）。
  @return 从 encodedData 解码出来的 ASCII 字符串
  @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#atob
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "√",
        "uniUtsPlugin": "4.25",
        "unixVer": "4.25",
        "unixUtsPlugin": "4.25"
      },
      "ios": {
        "osVer": "12.0",
        "uniVer": "4.61",
        "uniUtsPlugin": "4.61",
        "unixVer": "4.61",
        "unixUtsPlugin": "4.61"
      },
      "harmony": {
          "osVer": "5.0.0",
          "uniVer": "√",
          "unixVer": "4.61",
          "uniUtsPlugin": "√",
          "unixUtsPlugin": "4.61"
      }
    },
    "web": {
      "uniVer": "√",
      "unixVer": "√"
    }
  }
 */
declare function atob(encodedData: string): string


/**
  btoa() 方法可以将一个二进制字符串（例如，将字符串中的每一个字节都视为一个二进制数据字节）编码为 Base64 编码的 ASCII 字符串
  @param stringToEncode 一个需要编码的二进制字符串
  @return 一个包含 stringToEncode 的 Base64 表示的 ASCII 字符串。
  @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#btoa
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "√",
        "uniUtsPlugin": "4.25",
        "unixVer": "4.25",
        "unixUtsPlugin": "4.25"
      },
      "ios": {
        "osVer": "12.0",
        "uniVer": "4.61",
        "uniUtsPlugin": "4.61",
        "unixVer": "4.61",
        "unixUtsPlugin": "4.61"
      },
      "harmony": {
          "osVer": "5.0.0",
          "uniVer": "√",
          "unixVer": "4.61",
          "uniUtsPlugin": "√",
          "unixUtsPlugin": "4.61"
      }
    },
    "web": {
      "uniVer": "√",
      "unixVer": "√"
    }
  }
 */
declare function btoa(stringToEncode: string): string


/**
  在下一次重绘之前，调用用户提供的回调函数
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "x",
        "uniUtsPlugin": "x",
        "unixVer": "4.25",
        "unixUtsPlugin": "4.25"
      },
      "ios": {
        "osVer": "12.0",
        "uniVer": "x",
        "uniUtsPlugin": "x",
        "unixVer": "4.25",
        "unixUtsPlugin": "x"
      },
      "harmony": {
        "osVer": "5.0.0",
        "uniVer": "x",
        "unixVer": "4.61"
      }
    },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
    "web": {
      "uniVer": "√",
      "unixVer": "4.0"
    }
  }
 */
declare function requestAnimationFrame(callback: RequestAnimationFrameCallback): number;


/**
  取消一个先前通过调用 requestAnimationFrame() 方法添加到计划中的动画帧请求
  @uniPlatform
  {
    "app": {
      "android": {
        "osVer": "5.0",
        "uniVer": "x",
        "uniUtsPlugin": "x",
        "unixVer": "4.25",
        "unixUtsPlugin": "4.25"
      },
      "ios": {
        "osVer": "12.0",
        "uniVer": "x",
        "uniUtsPlugin": "x",
        "unixVer": "4.25",
        "unixUtsPlugin": "x"
      },
      "harmony": {
        "osVer": "5.0.0",
        "uniVer": "x",
        "unixVer": "4.61"
      }
    },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
    "web": {
      "uniVer": "√",
      "unixVer": "4.0"
    }
  }
 */
declare function cancelAnimationFrame(taskId: number): void;

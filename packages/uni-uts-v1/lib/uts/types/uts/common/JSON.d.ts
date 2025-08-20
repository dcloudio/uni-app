interface IJSONStringify {
  /**
   * 支持开发者自定义class序列化结果，此函数的返回值就是实现了此接口的class的序列化返回值
   * @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/JSON.html#parse
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.53",
               "uniUtsPlugin": "4.53",
               "unixUtsPlugin": "4.53"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
               "uniUtsPlugin": "x",
               "unixVer": "x",
               "unixUtsPlugin": "x"
            }
        },
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toJSON(): any
}

interface JSON {

  /**
     JSON.parse() 方法用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象。提供可选的 reviver 函数用以在返回之前对所得到的对象执行变换 (操作)。
     @param text 要被解析成 JavaScript 值的字符串
     @param reviver [可选] 转换器，如果传入该参数 (函数)，可以用来修改解析生成的原始值，调用时机在 parse 函数返回之前。
     @param_uniPlatform reviver {
       "app": {
         "android": {
           "osVer": "x",
           "uniVer": "x",
           "unixVer": "x",
           "uniUtsPlugin": "x",
           "unixUtsPlugin": "x"
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
           "uniVer": "x",
           "unixVer": "x"
         }
       },
       "web": {
         "uniVer": "x",
         "unixVer": "x"
       }
     }
     @param ignoreError [ignoreError=false] 是否要忽略，解析错误时引发的控制台报错，默认为false
     @param_uniPlatform ignoreError {
       "app": {
         "android": {
           "osVer": "5.0",
           "uniVer": "x",
           "unixVer": "4.41",
           "uniUtsPlugin": "4.41",
           "unixUtsPlugin": "4.41"
         },
         "ios": {
           "osVer": "x",
           "uniVer": "x",
           "uniUtsPlugin": "x",
           "unixVer": "x",
           "unixUtsPlugin": "x"
         },
         "harmony": {
           "osVer": "√",
           "uniVer": "√",
           "unixVer": "√"
         }
       },
       "web": {
         "uniVer": "√",
         "unixVer": "√"
       }
     }
     @return 返回一个any 或者 null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/JSON.html#parse
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "√",
               "uniUtsPlugin": "√",
               "unixVer": "4.11",
               "unixUtsPlugin": "4.11"
            },
            "harmony": {
                "osVer": "5.0.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.61"
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
  parse(text: string, reviver?: (this: any, key: string, value: any) => any, ignoreError?: boolean): any | null;

  /**
     JSON.parse() 方法用来解析 JSON 字符串，构造由字符串描述的值或者对象，其类型由泛型参数T决定
     如果输入的是一个合法的json值或者对象，返回一个对应的T值或者对象，如果json描述的值或对象和 T 指定的类型不符，将返回null
     @param text 要被解析成 JavaScript 值的字符串
     @param ignoreError [ignoreError=false] 是否要忽略，解析错误时引发的控制台报错，默认为false
     @param_uniPlatform ignoreError {
       "app": {
         "android": {
           "osVer": "5.0",
           "uniVer": "x",
           "unixVer": "4.41",
           "uniUtsPlugin": "4.41",
           "unixUtsPlugin": "4.41"
         },
         "ios": {
           "osVer": "x",
           "uniVer": "x",
           "unixVer": "x",
           "unixUtsPlugin": "x"
         },
        "harmony": {
            "osVer": "5.0.0",
            "uniVer": "√",
            "uniUtsPlugin": "√",
            "unixVer": "4.61"
            "unixUtsPlugin": "4.61"
        }
       },
       "web": {
         "uniVer": "x",
         "unixVer": "x"
       }
     }
     @return 返回一个T类型的值或者对象 或者 null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/JSON.html#parse<T>
     @inline
     @reified
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
               "unixUtsPlugin": "3.90"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "3.9+",
               "uniUtsPlugin": "3.9+",
               "unixVer": "4.11",
               "unixUtsPlugin": "4.11"
            },
            "harmony": {
                "osVer": "5.0.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.61"
                "unixUtsPlugin": "4.61"
            }
        },
        "web": {
            "uniVer": "x",
            "unixVer": "4.0"
        }
     }
   */
  parse<T>(text: string, ignoreError?: boolean): T | null;
  /**
   * 目前仅限内部使用，重要：不能标记inline、reified
   * @internal
   * @param text
   * @param typeOfT
   */
  parse<T>(text: string, typeOfT?: any): T | null;


  /**
     JSON.parseObject() 方法用来解析 JSON 字符串，构造由字符串描述的对象。
     如果输入的是一个合法的json对象，返回一个对应的UTSJSONObject，如果是json array 或者其他格式的字符串返回null
     @param text 要被解析成 JavaScript 值的字符串
     @return 返回一个UTSJSONObjet 或者 null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/JSON.html#parseObject
     @inline
     @reified
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
               "unixUtsPlugin": "3.90"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "√",
               "uniUtsPlugin": "√",
               "unixVer": "4.11",
               "unixUtsPlugin": "4.11"
            },
            "harmony": {
                "osVer": "5.0.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.61"
                "unixUtsPlugin": "4.61"
            }
        },
        "web": {
            "uniVer": "x",
            "unixVer": "4.0"
        }
     }
   */
  parseObject(text: string): UTSJSONObject | null;




  /**
     JSON.parseObject() 方法用来解析 JSON 字符串，构造由字符串描述的对象，该对象的类型由泛型参数T决定
     如果输入的是一个合法的json对象，返回一个对应的T对象，如果是json array 或者其他格式的字符串返回null
     @param text 要被解析成 JavaScript 值的字符串
     @return 返回一个T类型对象 或者 null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/JSON.html#parseObject<T>
     @inline
     @reified
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
               "unixUtsPlugin": "3.90"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "3.9+",
               "uniUtsPlugin": "3.9+",
               "unixVer": "4.11",
               "unixUtsPlugin": "4.11"
            },
            "harmony": {
                "osVer": "5.0.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.61"
                "unixUtsPlugin": "4.61"
            }
        },
        "web": {
            "uniVer": "x",
            "unixVer": "4.0"
        }
     }
   */
  parseObject<T>(text: string): T | null;


  /**
     JSON.parseArray() 方法用来解析 JSON 字符串，构造由字符串描述的数组。数组元素类型为any
     如果输入的是一个合法的json数组，返回一个对应的Array，如果是json object 或者其他格式的字符串返回null
     @param text 要被解析成 JavaScript 值的字符串
     @return 返回一个Array 或者 null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/JSON.html#parseArray
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
               "unixUtsPlugin": "3.90"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "√",
               "uniUtsPlugin": "√",
               "unixVer": "4.11",
               "unixUtsPlugin": "4.11"
            },
            "harmony": {
                "osVer": "5.0.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.61"
                "unixUtsPlugin": "4.61"
            }
        },
        "web": {
            "uniVer": "x",
            "unixVer": "4.0"
        }
     }
   */
  parseArray(text: string): Array<any> | null;

  /**
     JSON.parseArray() 方法用来解析 JSON 字符串，构造由字符串描述的数组。数组元素类型由泛型T决定
     如果输入的是一个合法的json数组，返回一个对应的Array，如果是json object 或者其他格式的字符串返回null
     @param text 要被解析成 JavaScript 值的字符串
     @return 返回一个Array 或者 null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/JSON.html#parseArray<T>
     @inline
     @reified
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
               "unixUtsPlugin": "3.90"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "√",
               "uniUtsPlugin": "√",
               "unixVer": "4.11",
               "unixUtsPlugin": "4.11"
            },
            "harmony": {
                "osVer": "5.0.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.61"
                "unixUtsPlugin": "4.61"
            }
        },
        "web": {
            "uniVer": "x",
            "unixVer": "4.0"
        }
     }
   */
  parseArray<T>(text: string): Array<T> | null;


  /**
     JSON.stringify() 方法将一个 JavaScript 对象或值转换为 JSON 字符串，如果指定了一个 replacer 函数，则可以选择性地替换值，或者指定的 replacer 是数组，则可选择性地仅包含数组指定的属性
     @param value 将要序列化成 一个 JSON 字符串的值。
     @param replacer 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。 仅Android/web HBuilder X 4.25之后支持
     @param_uniPlatform replacer {
      "app": {
        "android": {
            "osVer": "5.0",
            "uniVer": "√",
            "unixVer": "4.25",
            "uniUtsPlugin": "√",
            "unixUtsPlugin": "4.25"
         },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "unixVer": "4.11",
          "uniUtsPlugin": "x",
          "unixUtsPlugin": "x"
        },
            "harmony": {
                "osVer": "5.0.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.61"
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
        "unixVer": "4.25"
      }
     }
     @param space 指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为 10。该值若小于 1，则意味着没有空格；如果该参数为字符串（当字符串长度超过 10 个字母，取其前 10 个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。 仅Android/web HBuilder X 4.25之后支持
     @param_uniPlatform space {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "unixVer": "4.25",
          "uniUtsPlugin": "√",
          "unixUtsPlugin": "4.25"
         },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "unixVer": "4.11",
          "uniUtsPlugin": "x",
          "unixUtsPlugin": "x"
        },
            "harmony": {
                "osVer": "5.0.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.61"
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
        "unixVer": "4.25"
      }
     }
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/JSON.html#stringify
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "√",
               "uniUtsPlugin": "√",
               "unixVer": "4.11",
               "unixUtsPlugin": "4.11"
            },
            "harmony": {
                "osVer": "5.0.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.61"
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
  stringify(value: any | null, replacer?: any | null, space?: any | null): string;
}

/**
 * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
 */
declare var JSON: JSON;

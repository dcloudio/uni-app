interface RegExp {

  /**
     返回一个字符串，由当前正则表达式对象的标志组成。此属性是一个只读属性
     此字符串中的字符按以下顺序排序和连接:

        - "g" for global
        - "i" for ignoreCase
        - "m" for multiline
        - "u" for unicode
        - "y" for sticky

     如果没有设置标志，则该值为空字符串。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#flags
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
               "unixVer": "4.11",
               "uniUtsPlugin": "√",
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
  readonly flags: string;

  /**
     表明是否在正则表达式中一起使用"s"修饰符（引入/s 修饰符，使得。可以匹配任意单个字符）。dotAll 是一个只读的属性，属于单个正则表达式实例。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#dotAll
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
               "uniVer": "√",
                "unixVer": "x"
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
  readonly dotAll: boolean;

  /**
     指示 d 标志是否与正则表达式一起使用。只读的。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#hasIndices
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
               "uniVer": "√",
                "unixVer": "x"
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
  readonly hasIndices: boolean;

  /**
     搜索是否具有粘性（仅从正则表达式的 lastIndex 属性表示的索引处搜索）。sticky 是正则表达式对象的只读属性。默认为false。只读的。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#sticky
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
               "uniVer": "√",
                "unixVer": "x"
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
  readonly sticky: boolean;

  /**
     表明正则表达式带有"u" 标志。 unicode 是正则表达式独立实例的只读属性。unicode 的值是 Boolean，并且如果使用了 "u" 标志则为 true；否则为 false。"u" 标志开启了多种 Unicode 相关的特性。使用 "u" 标志，任何 Unicode 代码点的转义都会被解释。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#unicode
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
               "uniVer": "√",
                "unixVer": "x"
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
  readonly unicode: boolean;

  /**
     在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
     @param string 要匹配正则表达式的字符串。
     @return 如果匹配失败，exec() 方法返回 null，并将正则表达式的 lastIndex 重置为 0。如果匹配成功，exec() 方法返回一个数组，并更新正则表达式对象的 lastIndex 属性。完全匹配成功的文本将作为返回数组的第一项，从第二项起，后续每项都对应一个匹配的捕获组。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#exec
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
               "unixVer": "4.11",
               "uniUtsPlugin": "√",
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
  exec(string: string): RegExpExecArray | null;

  /**
     执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false。
     @param string 用来与正则表达式匹配的字符串。
     @return 如果正则表达式与指定的字符串匹配，返回true；否则false。如果正则表达式设置了全局标志，test() 的执行会改变正则表达式 lastIndex属性。连续的执行test()方法，后续的执行将会从 lastIndex 处开始匹配字符串。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#test
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
               "unixVer": "4.11",
               "uniUtsPlugin": "√",
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
  test(string: string): boolean;

  /**
     返回一个值为当前正则表达式对象的模式文本的字符串，该字符串不会包含正则字面量两边的斜杠以及任何的标志字符。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#source
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
               "unixVer": "4.11",
               "uniUtsPlugin": "√",
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
  readonly source: string;

  /**
     表明正则表达式是否使用了 "g" 标志。global 是一个正则表达式实例的只读属性。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#global
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
               "unixVer": "4.11",
               "uniUtsPlugin": "√",
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
  readonly global: boolean;

  /**
     表明正则表达式是否使用了 "i" 标志。ignoreCase 是正则表达式实例的只读属性。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#ignoreCase
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
               "unixVer": "4.11",
               "uniUtsPlugin": "√",
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
  readonly ignoreCase: boolean;

  /**
     表明正则表达式是否使用了 "m" 标志。multiline 是正则表达式实例的一个只读属性。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#multiline
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
               "unixVer": "4.11",
               "uniUtsPlugin": "√",
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
  readonly multiline: boolean;
  /**
     正则表达式的一个可读可写的整型属性，用来指定下一次匹配的起始索引。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#lastIndex
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
               "unixVer": "4.11",
               "uniUtsPlugin": "√",
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
  lastIndex: number;

}

interface RegExpConstructor {
  /**
     用于创建正则表达式对象，该对象用于将文本与一个模式匹配。
     @param pattern 正则表达式的文本，也可以是另一个 RegExp 对象或文字。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#constructor
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
               "unixVer": "4.11",
               "uniUtsPlugin": "√",
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
  new(pattern: RegExp | string): RegExp;
  /**
     用于创建正则表达式对象，该对象用于将文本与一个模式匹配。
     @param pattern 正则表达式的文本，也可以是另一个 RegExp 对象或文字。
     @param flags 如果指定，flags 是包含要添加的标志的字符串。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/RegExp.html#constructor
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
               "unixVer": "4.11",
               "uniUtsPlugin": "√",
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
  new(pattern: string, flags?: string): RegExp;
  (pattern: RegExp | string): RegExp;
  (pattern: string, flags?: string): RegExp;
  readonly prototype: RegExp;
}

declare var RegExp: RegExpConstructor;


interface RegExpMatchArray extends Array<string | null> {
  /**
     The index of the search at which the result was found.
   */
  index?: number;
  /**
     A copy of the search string.
   */
  input?: string;
  /**
     The first match. This will always be present because `null` will be returned if there are no matches.
   */
  0: string;
}

interface RegExpExecArray extends Array<string> {
  /**
     The index of the search at which the result was found.
   */
  index: number;
  /**
     A copy of the search string.
   */
  input: string;
  /**
     The first match. This will always be present because `null` will be returned if there are no matches.
   */
  0: string;
}

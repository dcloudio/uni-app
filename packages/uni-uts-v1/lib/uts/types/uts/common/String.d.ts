interface String {
  /**
     返回一个字符串，表示指定的字符串。
     @return String 包装对象的字符串值。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#toString
     @uniPlatform {
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
               "unixVer": "x",
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
            "unixVer": "4.0"
        }
     }
   */
  toString() : string;

  /**
     返回一个由给定索引处的单个 UTF-16 码元构成的新字符串。
     @param pos 要返回的字符的索引，从零开始。
     @return 返回一个字符串，该字符串表示指定 index 处的字符（恰好是一个 UTF-16 码元）。如果 index 超出了 0 – str.length - 1 的范围，charAt() 将返回一个空字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#charAt
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
  charAt(pos : number) : string;


  /**
     String 的 toWellFormed() 方法返回一个字符串，其中该字符串的所有单独代理项都被替换为 Unicode 替换字符 U+FFFD。
     @return 新的字符串是原字符串的一个拷贝，其中所有的单独代理项被替换为 Unicode 替换字符 U+FFFD。如果 str 是格式正确的，仍然会返回一个新字符串（本质上是 str 的一个拷贝）。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#toWellFormed
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.25",
               "uniUtsPlugin": "4.25",
               "unixUtsPlugin": "4.25"
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
                "uniUtsPlugin": "√",
                "unixVer": "4.61"
                "unixUtsPlugin": "4.61"
            }
        },
        "web": {
            "uniVer": "√",
            "unixVer": "√"
        }
     }
   */
  toWellFormed() : string;

  /**
     String 值的 isWellFormed() 方法返回一个表示该字符串是否包含单独代理项的布尔值。
     @return 如果字符串不包含单独代理项，返回 true，否则返回 false。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#isWellFormed
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.25",
               "uniUtsPlugin": "4.25",
               "unixUtsPlugin": "4.25"
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
                "uniUtsPlugin": "√",
                "unixVer": "4.61"
                "unixUtsPlugin": "4.61"
            }
        },
        "web": {
            "uniVer": "√",
            "unixVer": "√"
        }
     }
   */
  isWellFormed() : string;


  /**

     返回包含此字符串的字符的[kotlin.CharArray]。
     @return 字符数组
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#toCharArray
     @deprecated
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90"
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
                "uniUtsPlugin": "√",
                "unixVer": "4.61"
                "unixUtsPlugin": "4.61"
            }
        },
        "harmony": {
            "osVer": "x",
            "uniVer": "x",
            "unixVer": "x"
        },
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toCharArray() : CharArray;

  /**
     返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元
     @param index 一个大于等于 0，小于字符串长度的整数。如果不是一个数值，则默认为 0。
     @return 指定 index 处字符的 UTF-16 代码单元值的一个数字；如果 index 超出范围，charCodeAt() 返回 NaN。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#charCodeAt
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
  charCodeAt(index : number) : number;

  /**
     将字符串参数连接到调用的字符串，并返回一个新的字符串。
     @param strings T要连接到 str 的一个或多个字符串。
     @return 一个包含所提供的多个字符串文本组合的新字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#concat
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
  concat(...strings : string[]) : string;

  /**
     在字符串中搜索指定子字符串，并返回其第一次出现的位置索引。它可以接受一个可选的参数指定搜索的起始位置，如果找到了指定的子字符串，则返回的位置索引大于或等于指定的数字。
     @param searchString 要搜索的子字符串。
     @param position 该方法返回指定子字符串在大于或等于 position 位置的第一次出现的索引，默认为 0。如果 position 大于调用字符串的长度，则该方法根本不搜索调用字符串。如果 position 小于零，该方法的行为就像 position 为 0 时一样。
     @return 查找的字符串 searchValue 的第一次出现的索引，如果没有找到，则返回 -1。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#indexOf
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
  indexOf(searchString : string, position ?: number) : number;

  /**
     搜索该字符串并返回指定子字符串最后一次出现的索引。它可以接受一个可选的起始位置参数，并返回指定子字符串在小于或等于指定数字的索引中的最后一次出现的位置。
     @param searchString 要搜索的子字符串。
     @param position 该方法返回指定子字符串在小于或等于 position 的位置中的最后一次出现的索引，默认为 +Infinity。如果 position 大于调用字符串的长度，则该方法将搜索整个字符串。如果 position 小于 0，则行为与 0 相同，即该方法只在索引 0 处查找指定的子字符串。
     @return 如果找到了 searchString，则返回最后一次出现的索引，否则返回 -1。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#lastIndexOf
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
  lastIndexOf(searchString : string, position ?: number) : number;

  /**
     返回一个数字，表示参考字符串在排序顺序中是在给定字符串之前、之后还是与之相同。
     @param that 与 referenceStr 进行比较的字符串。
     @return 返回一个数字表示 referenceStr 在排序中是否位于 compareString 的前面、后面或二者相同。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#localeCompare
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
  localeCompare(that : string) : number;

  /**
     match() 方法检索字符串与正则表达式进行匹配的结果。
     @param regexp 一个正则表达式对象或者任何具有 Symbol.match 方法的对象。
     @return 一个 Array，其内容取决于是否存在全局（g）标志，如果没有匹配，则返回 null。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#match
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "√",
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
  match(regexp : string | RegExp) : RegExpMatchArray | null;

  /**
     返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式。
     @param searchValue  RegExp: 一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。string: 一个将被 newSubStr 替换的 字符串。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。
     @param replaceValue 用于替换掉第一个参数在原字符串中的匹配部分的字符串。
     @return 一个部分或全部匹配由替代模式所取代的新的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#replace
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
  replace(searchValue : string | RegExp, replaceValue : string) : string;

  /**
     返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值是一个每次匹配都要调用的回调函数。如果pattern是字符串，则仅替换第一个匹配项。
     @param searchValue RegExp: 一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。string: 一个将被 newSubStr 替换的 字符串。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。
     @param replacer 一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。在iOS中replacer的第二个参数是字符串数组而非可变参数。
     @return 一个部分或全部匹配由替代模式所取代的新的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#replace
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
  replace(searchValue : string | RegExp, replacer : (substring : string, ...args : any[]) => string) : string;

  /**
     search() 方法执行正则表达式和 String 对象之间的一个搜索匹配。
     @param regexp 一个正则表达式（regular expression）对象。
     @return 如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#search
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
  search(regexp : string | RegExp) : number;

  /**
     slice() 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
     @param start 可选。从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 strLength + beginIndex 看待，这里的strLength 是字符串的长度（例如，如果 beginIndex 是 -3 则看作是：strLength - 3）
     @param end 可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice() 会一直提取到字符串末尾。如果该参数为负数，则被看作是 strLength + endIndex，这里的 strLength 就是字符串的长度 (例如，如果 endIndex 是 -3，则是，strLength - 3)。
     @return 返回一个从原字符串中提取出来的新字符串
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#slice
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
  slice(start ?: number, end ?: number) : string;

  /**
     split() 方法接受一个模式，通过搜索模式将字符串分割成一个有序的子串列表，将这些子串放入一个数组，并返回该数组。
     @param separator 描述每个分割应该发生在哪里的模式。
     @param limit 一个非负整数，指定数组中包含的子字符串的数量限制。当提供此参数时，split 方法会在指定 separator 每次出现时分割该字符串，但在已经有 limit 个元素时停止分割。任何剩余的文本都不会包含在数组中。
     @return 在给定字符串中出现 separator 的每一个点上进行分割而成的字符串数组。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#split
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
  split(separator : string | RegExp, limit ?: number) : string[];

  /**
     返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引直到字符串的末尾的一个子集。
     @param start 要截取的第一个字符的索引，该索引位置的字符作为返回的字符串的首字母。
     @param end 可选。一个 0 到字符串长度之间的整数，以该数字为索引的字符不包含在截取的字符串内。
     @return 包含给定字符串的指定部分的新字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#substring
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
  substring(start : number, end ?: number) : string;

  /** toLowerCase() 会将调用该方法的字符串值转为小写形式，并返回。
     @return 一个新的字符串，表示转换为小写的调用字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#toLowerCase
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
  toLowerCase() : string;

  /**
     根据任何指定区域语言环境设置的大小写映射，返回调用字符串被转换为小写的格式。
     @param locales 可选。指明要转换成小写格式的特定语言区域。如果以一个数组 Array 形式给出多个 locales, 最合适的地区将被选出来应用。默认的 locale 是主机环境的当前区域 (locale) 设置。
     @return 根据任何特定于语言环境的案例映射规则将被调用字串转换成小写格式的一个新字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#toLocaleLowerCase
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
  toLocaleLowerCase(locales ?: string | string[]) : string;
  /**
     将调用该方法的字符串转为大写形式并返回（如果调用该方法的值不是字符串类型会被强制转换）。
     @return 一个新的字符串，表示转换为大写的调用字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#toUpperCase
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
  toUpperCase() : string;
  /**
     根据本地主机语言环境把字符串转换为大写格式，并返回转换后的字符串。
     @param locales locales参数指示要用于根据任何特定于语言环境的大小写映射转换为大写的语言环境。如果Array中给出了多个区域设置，则使用最佳可用区域设置。默认语言环境是主机环境的当前语言环境。
     @return 根据任何特定于语言环境的大小写映射，表示转换为大写的调用字符串的新字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#toLocaleUpperCase
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
  toLocaleUpperCase(locales ?: string | string[]) : string;
  /**
     从字符串的两端清除空格，返回一个新的字符串，而不修改原始字符串。此上下文中的空格是指所有的空白字符（空格、tab、不换行空格等）以及所有行终止符字符（如 LF、CR 等）。
     @return 一个表示 str 去掉了开头和结尾的空白字符后的新字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#trim
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
  trim() : string;
  /**
     返回字符串的 UTF-16 码元长度。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#length
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
  readonly length : number;

  // IE extensions
  /**
     返回一个字符串中从指定位置开始到指定字符数的字符。
     @deprecated 已废弃。警告： 尽管 String.prototype.substr(…) 没有严格被废弃 (as in "removed from the Web standards"), 但它被认作是遗留的函数并且可以的话应该避免使用。它并非 JavaScript 核心语言的一部分，未来将可能会被移除掉。如果可以的话，使用 substring() 替代它。
     @param from 开始提取字符的位置。如果为负值，则被看作 strLength + start，其中 strLength 为字符串的长度（例如，如果 start 为 -3，则被看作 strLength + (-3)）。
     @param length 可选。提取的字符数。
     @return 返回一个字符串中从指定位置开始到指定字符数的字符。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#substr
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
  substr(from : number, length ?: number) : string;

  /** 返回 String 对象的原始值
     @return String 对象的原始值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#valueOf
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
  valueOf() : string;

  /**
     用另一个字符串填充当前字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的开头开始的。
     @param targetLength 当前 str 填充后的长度。如果该值小于或等于 str.length，则会直接返回当前 str。
     @param padString 可选。用于填充当前 str 的字符串。如果 padString 太长，无法适应 targetLength，则会从末尾被截断。默认值为“ ”字符（U+0020）。
     @return 在开头填充 padString 直到达到给定的 targetLength 所形成的 String。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#padStart
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
  padStart(targetLength : number, padString ?: string) : string;

  /**
     将当前字符串从末尾开始填充给定的字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的末尾开始的。
     @param targetLength 当前 str 填充后的长度。如果该值小于或等于 str.length，则会直接返回当前 str。
     @param padString 可选。用于填充当前 str 的字符串。如果 padString 太长，无法适应 targetLength，则会被截断。默认值为“ ”字符（U+0020）。
     @return 在开头填充 padString 直到达到给定的 targetLength 所形成的 String。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#padEnd
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
  padEnd(targetLength : number, padString ?: string) : string;

  readonly [index : number] : string;
  /**
     返回一个小于 1114112 (0x110000) 的非负整数 Number，它是 UTF-16 编码的代码点的代码点值，该代码点始于将此对象转换为字符串而产生的字符串中位置 pos 处的字符串元素。
     如果该位置没有元素，则结果未定义。
     如果有效的 UTF-16 代理项对不是从 pos 开始，则结果是 pos 处的代码单元。
     @param pos 这个字符串中需要转码的元素的位置。
     @return 返回值是在字符串中的给定索引的编码单元体现的数字，如果在索引处没找到元素则返回 null。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#codePointAt
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
  codePointAt(pos : number) : number | null;

  /**
     如果 searchString 作为此对象转换为 String 的结果的子字符串出现在大于或等于position的一个或多个位置，则返回 true；否则，返回 false。
     @param searchString 要在 str 中搜索的字符串。不能是正则表达式。
     @param position 在字符串中开始搜索 searchString 的位置。（默认为 0。）
     @return 如果在给定的字符串中找到了要搜索的字符串（包括 searchString 为空字符串的情况），则返回 true，否则返回 false。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#includes
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
  includes(searchString : string, position ?: number) : boolean;

  /**
     endsWith() 方法用于判断一个字符串是否以指定字符串结尾，如果是则返回 true，否则返回 false。该方法区分大小写。
     @param searchString 要搜索的作为结尾的字符串，不能是正则表达式。所有非正则表达式的值都会被强制转换为字符串。
     @param endPosition  可选，预期找到 searchString 的末尾位置（即 searchString 最后一个字符的索引加 1）。默认为 str.length。
     @return 如果被检索字符串的末尾出现了指定的字符串（包括 searchString 为空字符串的情况），则返回 true；否则返回 false。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#endsWith
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
  endsWith(searchString : string, endPosition ?: number) : boolean;

  /**
     normalize() 方法会按照指定的一种 Unicode 正规形式将当前字符串规范化。（如果该值不是字符串，则首先将其转换为一个字符串）。
     @param form 四种 Unicode 正规形式（Unicode Normalization Form）"NFC"、"NFD"、"NFKC"，或 "NFKD" 其中的一个，默认值为 "NFC"。
     @return 含有给定字符串的 Unicode 规范化形式的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#normalize
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
  normalize(form : "NFC" | "NFD" | "NFKC" | "NFKD") : string;

  /**
     normalize() 方法会按照指定的一种 Unicode 正规形式将当前字符串规范化。（如果该值不是字符串，则首先将其转换为一个字符串）。
     @param form 四种 Unicode 正规形式（Unicode Normalization Form）"NFC"、"NFD"、"NFKC"，或 "NFKD" 其中的一个，默认值为 "NFC"。
     @return 含有给定字符串的 Unicode 规范化形式的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#normalize
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
  normalize(form ?: string) : string;

  /**
     repeat() 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。
     @param count 介于 0 和 +Infinity 之间的整数。表示在新构造的字符串中重复了多少遍原字符串。
     @return 包含指定字符串的指定数量副本的新字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#repeat
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
  repeat(count : number) : string;

  /**
     startsWith() 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。这个方法区分大小写。
     @param searchString 要搜索的子字符串。
     @param position 在 str 中搜索 searchString 的开始位置，默认值为 0。
     @return 如果在字符串的开头找到了给定的字符则返回 true；否则返回 false。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#startsWith
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
  startsWith(searchString : string, position ?: number) : boolean;

  /**
     anchor() 方法创建一个 <a> HTML 锚元素，被用作超文本靶标（hypertext target）。
     @deprecated 浏览器兼容性的遗留特性。警告： 该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。
     @param name 一个字符串，表示被创建的标签的 name 属性。
     @return 包含 <a> HTML 元素的一个字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#anchor
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
  anchor(name : string) : string;

  /**
     创建一个使字符串显示大号字体的<big>标签。
     @deprecated 已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
     @return 带有 <big>标签的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#big
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
  big() : string;


  /**
     blink() 方法创建一个字符串，其在 <blink>str</blink> 中嵌入字符串，这使得字符串在旧版浏览器中闪烁。
     @deprecated 已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
   # @return 包含 <blink> HTML 元素的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#blink
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
  blink() : string;

  /**
     bold() 方法会创建 HTML 元素“b”，并将字符串加粗展示。
     @deprecated 已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
     @return 包含 HTML 元素 <b> 的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#bold
     @uniPlatform {
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
               "unixVer": "x",
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
            "unixVer": "4.0"
        }
     }
   */
  bold() : string;

  /**
     fixed() 方法创建了一个 <tt> 标签元素将字符串包裹起来，从而让这个字符串里面的内容具有固定间距。
     @deprecated 已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
     @return 返回一个表示 <tt> HTML 元素的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#fixed
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
  fixed() : string;


  /**
     创建一个<font>的 HTML 元素让字符串被显示成指定的字体颜色。
     @deprecated 已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
     备注： <font> 元素已经在在HTML5 中 (en-US)被移除并且不应该在使用。替代的是，Web 开发者应该使用CSS属性。
     @param color 代表颜色的一个字符串，可以是三个一组的十六进制的 RGB 值，也可以是一个颜色名称的字符串字面量.
     @return 一个包含一个<font> HTML 元素的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#fontcolor
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
  fontcolor(color : string) : string;

  /**
     返回一个' <font> ' HTML元素并设置size属性值
     @deprecated 已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
     @param size 1到7之间的整数。
     @return 包含<font> HTML元素的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#fontsize
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
  fontsize(size : number) : string;

  /**
     返回一个' <font> ' HTML元素并设置size属性值
     @deprecated 已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
     @param size 表示1到7之间的有符号整数的字符串。
     @return 包含<font> HTML元素的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#fontsize
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
  fontsize(size : string) : string;

  /**
     italics()方法创建一个<i> HTML元素，使字符串变为斜体。
     @deprecated已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
     @return 返回一个<i> HTML元素，使字符串变为斜体。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#italics
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
  italics() : string;

  /**
     link() 方法创建一个 HTML 元素 <a> ，用该字符串作为超链接的显示文本，参数作为指向另一个 URL 的超链接。
     @deprecated 已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
     @param url 任何能够指定 a 标签的 href 属性的字符串；它应当是有效的 URL（相对或绝对），任何 & 字符将会被转义为 &amp;，任何 " 字符将会被转义为 &quot;。
     @return 一个带有一个 HTML 元素 <a> 的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#link
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
  link(url : string) : string;

  /**
     small() 方法的作用是创建一个使字符串显示小号字体的 <small> 标签。
     @deprecated 已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
     @return 带有 <small> 标签的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#small
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
  small() : string;

  /**
     strike()方法创建<strike> HTML 元素，使字符串展示为被删除的文本。
     @deprecated 已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
     @return 包含<strike> HTML 元素的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#strike
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
  strike() : string;

  /**
     sub()方法创建一个 <sub> HTML 元素，使字符串展示为下标。
     @deprecated 已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
     @return 包含<sub> HTML 元素的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#sub
     @uniPlatform {
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
               "unixVer": "x",
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
            "unixVer": "4.0"
        }
     }
   */
  sub() : string;

  /**
     sup()方法创建 一个<sup>HTML 元素，使字符串显示为上标。
     @deprecated 已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。
     @return 包含<sup> HTML 元素的字符串。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#sup
     @uniPlatform {
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
               "unixVer": "x",
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
            "unixVer": "4.0"
        }
     }
   */
  sup() : string;

  /**
     方法接受一个整数值，并返回一个新的 String，该字符串由位于指定偏移量处的单个 UTF-16 码元组成
     @param index 字符指定偏移量处，允许正整数和负整数，负整数从字符串中的最后一个字符开始倒数。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#at
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
  at(index : number) : string | null;
}

interface StringConstructor {
  /**
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#constructor
     @uniPlatform {
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
               "unixVer": "x",
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
            "unixVer": "4.0"
        }
     }
   */
  //new(value ?: any) : String;
  /**
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#constructor
     @uniPlatform {
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
               "unixVer": "x",
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
            "unixVer": "4.0"
        }
     }
   */
  (value ?: any) : string;
  readonly prototype : String;
  /**
     String.fromCharCode() 静态方法返回由指定的 UTF-16 码元序列创建的字符串。
     @param codes 介于 0 和 65535（0xFFFF）之间的数字，表示一个 UTF-16 码元。大于 0xFFFF 的数字会被截断为最后的 16 位。不进行有效性检查。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html#fromCharCode
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
               "uniUtsPlugin": "3.9+",
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
  fromCharCode(...codes : number[]) : string;

}

/**
 * Allows manipulation and formatting of text strings and determination and location of substrings within strings.
 */
declare var String : StringConstructor;

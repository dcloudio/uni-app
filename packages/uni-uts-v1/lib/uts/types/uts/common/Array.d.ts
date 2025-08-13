interface Array<T> {
  /**
     length 是 Array 的实例属性，表示该数组中元素的个数。该值是一个无符号 32 位整数，并且其数值总是大于数组最大索引。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#length
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  length: number

  /**
     toString() 方法返回一个字符串，表示指定的数组及其元素。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#toString
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "x",
               "uniVer": "√",
               "unixVer": "3.90"
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
  toString(): string

  /**
     toKotlinList() 将当前的Array对象转换为 kotlin 中对应的List对象
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#toKotlinList
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90"
               "uniUtsPlugin": "3.90",
               "unixUtsPlugin": "3.90"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
               "unixVer": "x"
            },
            "harmony": {
                "osVer": "x",
                "uniVer": "x",
                "unixVer": "x"
            }
        },
        "mp": {
          "weixin": {
            "hostVer": "x",
            "uniVer": "x",
            "unixVer": "x"
          }
        },
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toKotlinList(): kotlin.collections.List<any>

  /**
     将指定的元素追加到此列表的末尾，不推荐使用本方法，推荐使用push替代。
     @param item 添加到数组的元素。
     @return 是否成功添加
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#add
     @deprecated
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.11"
            },
            "harmony": {
               "osVer": "x",
               "uniVer": "x",
               "unixVer": "x",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "x"
            }
        },
        "mp": {
          "weixin": {
            "hostVer": "x",
            "uniVer": "x",
            "unixVer": "x"
          }
        },
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  add(item: T): boolean

  /**

     toLocaleString() 方法返回一个字符串，表示数组中的所有元素。每个元素通过调用它们自己的 toLocaleString 方法转换为字符串，并且使用特定于语言环境的字符串（例如逗号“,”）分隔开。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#toLocaleString
     @deprecated
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
                "unixVer": "x"
            },
            "harmony": {
                "osVer": "x",
                "uniVer": "x",
                "unixVer": "x"
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
  toLocaleString(): string

  /**
     从所有元素中使用[separator]创建字符串
     @param separator 分隔符
     @return 拼接完成的字符串
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#joinToString
     @deprecated
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90"
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                "unixVer": "x"
            },
            "harmony": {
                "osVer": "x",
                "uniVer": "x",
                "unixVer": "x"
            }
        }
     }
   */
  joinToString(separator: string): string

  /**
     pop() 方法从数组中删除最后一个元素，并返回该元素的值。此方法会更改数组的长度。

     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#pop
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  pop(): T | undefined
  /**
     push() 方法将指定的元素添加到数组的末尾，并返回新的数组长度。
     @param items 添加到数组末尾的元素。
     @return 调用方法的对象的新 length 属性。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#push
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  push(...items: T[]): number
  /**
     concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

     @param items 数组和/或值，将被合并到一个新的数组中。如果省略了所有 valueN 参数，则 concat 会返回调用此方法的现存数组的一个浅拷贝。详情请参阅下文描述。
     @return 新的 Array 实例。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#concat
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  concat(...items: ConcatArray<T>[]): T[]
  /**
     concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
     @param items 数组和/或值，将被合并到一个新的数组中。如果省略了所有 valueN 参数，则 concat 会返回调用此方法的现存数组的一个浅拷贝。详情请参阅下文描述。
     @return 新的 Array 实例。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#concat
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  concat(...items: (T | ConcatArray<T>)[]): T[]
  /**
     join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，用逗号或指定的分隔符字符串分隔。如果数组只有一个元素，那么将返回该元素而不使用分隔符。
     @param separator 指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果省略，数组元素用逗号（,）分隔。如果 separator 是空字符串（""），则所有元素之间都没有任何字符。
     @return 一个所有数组元素连接的字符串。如果 arr.length 为 0，则返回空字符串。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#join
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        }
     }
   */
  join(separator?: string): string
  /**
     reverse() 方法就地反转数组中的元素，并返回同一数组的引用。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。换句话说，数组中的元素顺序将被翻转，变为与之前相反的方向。
     @return 原始数组反转后的引用。注意，数组是就地反转的，并且没有复制。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#reverse
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  reverse(): T[]
  /**
     shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
     @return 从数组中删除的元素；如果数组为空则返回 null。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#shift
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  shift(): T | null
  /**
     slice() 方法返回一个新的数组对象，这一对象是一个由 start 和 end 决定的原数组的浅拷贝（包括 start，不包括 end），其中 start 和 end 代表了数组元素的索引。原始数组不会被改变。
     @param start 提取起始处的索引（从 0 开始），会转换为整数。
     @param end 提取终止处的索引（从 0 开始），会转换为整数。slice() 会提取到但不包括 end 的位置。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#slice
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  slice(start?: number, end?: number): T[]

  /**
     sort() 方法就地对数组的元素进行排序，并返回对相同数组的引用。默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序。
     @param compareFn 定义排序顺序的函数。返回值应该是一个数字，其正负性表示两个元素的相对顺序。该函数使用以下参数调用：
         a:第一个用于比较的元素。不会是 null。
         b:第二个用于比较的元素。不会是 null。
     如果省略该函数，数组元素会被转换为字符串，然后根据每个字符的 Unicode 码位值进行排序。
     @return 经过排序的原始数组的引用。注意数组是就地排序的，不会进行复制。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#sort
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  sort(compareFn?: (a: T, b: T) => number): this
  /**
     splice() 方法通过移除或者替换已存在的元素和/或添加新元素就地改变一个数组的内容。
     @param start 从 0 开始计算的索引，表示要开始改变数组的位置，它会被转换成整数。
     @param deleteCount 一个整数，表示数组中要从 start 开始删除的元素数量。
     @return 一个包含了删除的元素的数组。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#splice
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  splice(start: number, deleteCount?: number): T[]
  /**
     splice() 方法通过移除或者替换已存在的元素和/或添加新元素就地改变一个数组的内容。
     @param start 从 0 开始计算的索引，表示要开始改变数组的位置，它会被转换成整数。
     @param deleteCount 一个整数，表示数组中要从 start 开始删除的元素数量。
     @return 一个包含了删除的元素的数组。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#splice
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  splice(start: number, deleteCount: number, ...items: T[]): T[]

  /**
     unshift() 方法将指定元素添加到数组的开头，并返回数组的新长度。
     @param items 添加到 arr 开头的元素。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#unshift
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  unshift(...items: T[]): number

  /**
     indexOf() 方法返回数组中第一次出现给定元素的下标，如果不存在则返回 -1。
     @param searchElement 数组中要查找的元素。
     @param fromIndex 开始搜索的索引（从零开始），会转换为整数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#indexOf
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  indexOf(searchElement: T, fromIndex?: number): number
  /**
     lastIndexOf() 方法返回数组中给定元素最后一次出现的索引，如果不存在则返回 -1。该方法从 fromIndex 开始向前搜索数组。
     @param searchElement 被查找的元素。
     @param fromIndex 以 0 起始的索引，表明反向搜索的起始位置，会被转换为整数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#lastIndexOf
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  lastIndexOf(searchElement: T, fromIndex?: number): number
  /**
     every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。
     @param predicate 为数组中的每个元素执行的函数。它应该返回一个真值以指示元素通过测试，否则返回一个假值。该函数被调用时将传入以下参数：
         value:数组中当前正在处理的元素。
         index:正在处理的元素在数组中的索引。
         array:调用了 every() 的数组本身。
     @param thisArg 执行 callbackFn 时用作 this 的值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#every
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "x",
               "uniVer": "√",
                "unixVer": "x"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                "unixVer": "x"
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
  every<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): this is S[]
  /**
     every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。
     @param predicate 为数组中的每个元素执行的函数。它应该返回一个真值以指示元素通过测试，否则返回一个假值。该函数被调用时将传入以下参数：
         value:数组中当前正在处理的元素。
         index:正在处理的元素在数组中的索引。
         array:调用了 every() 的数组本身。
     @param thisArg 执行 callbackFn 时用作 this 的值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#every
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  every(
    predicate: (value: T, index: number, array: T[]) => boolean,
    thisArg?: any
  ): boolean
  /**
     some() 方法测试数组中是否至少有一个元素通过了由提供的函数实现的测试。如果在数组中找到一个元素使得提供的函数返回 true，则返回 true；否则返回 false。它不会修改数组。
     @param predicate 为数组中的每个元素执行的函数。它应该返回一个真值以指示元素通过测试，否则返回一个假值。该函数被调用时将传入以下参数：
         value:数组中当前正在处理的元素。
         index:正在处理的元素在数组中的索引。
         array:调用了 some() 的数组本身。
     @param thisArg 执行 callbackFn 时用作 this 的值。
     @return 如果回调函数对数组中至少一个元素返回一个真值，则返回 true。否则返回 false。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#some
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  some(
    predicate: (value: T, index: number, array: T[]) => boolean,
    thisArg?: any
  ): boolean
  /**
     forEach() 方法对数组的每个元素执行一次给定的函数。
     @param callbackfn  为数组中每个元素执行的函数。并会丢弃它的返回值。该函数被调用时将传入以下参数：
         value:数组中正在处理的当前元素。
         index:数组中正在处理的当前元素的索引。
         array:调用了 forEach() 的数组本身。
     @param thisArg  执行 callbackFn 时用作 this 的值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#forEach
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void
  /**
     map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
     @param callbackfn 为数组中的每个元素执行的函数。它的返回值作为一个元素被添加为新数组中。该函数被调用时将传入以下参数：
         value:数组中当前正在处理的元素。
         index:正在处理的元素在数组中的索引。
         array:调用了 map() 的数组本身。
     @param thisArg 执行 callbackFn 时用作 this 的值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#map
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[]
  /**
     filter() 方法创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素。
     @param predicate 为数组中的每个元素执行的函数。它应该返回一个真值以将元素保留在结果数组中，否则返回一个假值。该函数被调用时将传入以下参数：
         value:数组中当前正在处理的元素。
         index:正在处理的元素在数组中的索引。
         array:调用了 filter() 的数组本身。
     @param thisArg 执行 callbackFn 时用作 this 的值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#filter
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "x",
               "uniVer": "√",
                "unixVer": "x"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                "unixVer": "x"
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
  filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S[]
  /**
     filter() 方法创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素。
     @param predicate 为数组中的每个元素执行的函数。它应该返回一个真值以将元素保留在结果数组中，否则返回一个假值。该函数被调用时将传入以下参数：
         value:数组中当前正在处理的元素。
         index:正在处理的元素在数组中的索引。
         array:调用了 filter() 的数组本身。
     @param thisArg 执行 callbackFn 时用作 this 的值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#filter
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  filter(
    predicate: (value: T, index: number, array: T[]) => boolean,
    thisArg?: any
  ): T[]
  /**
     reduce() 方法对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
     @param callbackfn 为数组中每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将作为 reduce() 的返回值。该函数被调用时将传入以下参数：
         previousValue:上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为 array[0] 的值。
         currentValue:当前元素的值。在第一次调用时，如果指定了 initialValue，则为 array[0] 的值，否则为 array[1]。
         currentIndex:currentValue 在数组中的索引位置。在第一次调用时，如果指定了 initialValue 则为 0，否则为 1
         array:调用了 reduce() 的数组本身。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#reduce
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T
  /**
     reduce() 方法对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
     @param callbackfn 为数组中每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将作为 reduce() 的返回值。该函数被调用时将传入以下参数：
         previousValue:上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为 array[0] 的值。
         currentValue:当前元素的值。在第一次调用时，如果指定了 initialValue，则为 array[0] 的值，否则为 array[1]。
         currentIndex:currentValue 在数组中的索引位置。在第一次调用时，如果指定了 initialValue 则为 0，否则为 1
         array:调用了 reduce() 的数组本身。
     @param initialValue 第一次调用回调时初始化 accumulator 的值。如果指定了 initialValue，则 callbackFn 从数组中的第一个值作为 currentValue 开始执行。如果没有指定 initialValue，则 accumulator 初始化为数组中的第一个值，并且 callbackFn 从数组中的第二个值作为 currentValue 开始执行。在这种情况下，如果数组为空（没有第一个值可以作为 accumulator 返回），则会抛出错误。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#reduce
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T
  /**
     reduce() 方法对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
     @param callbackfn 为数组中每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将作为 reduce() 的返回值。该函数被调用时将传入以下参数：
         previousValue:上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为 array[0] 的值。
         currentValue:当前元素的值。在第一次调用时，如果指定了 initialValue，则为 array[0] 的值，否则为 array[1]。
         currentIndex:currentValue 在数组中的索引位置。在第一次调用时，如果指定了 initialValue 则为 0，否则为 1
         array:调用了 reduce() 的数组本身。
     @param initialValue 第一次调用回调时初始化 accumulator 的值。如果指定了 initialValue，则 callbackFn 从数组中的第一个值作为 currentValue 开始执行。如果没有指定 initialValue，则 accumulator 初始化为数组中的第一个值，并且 callbackFn 从数组中的第二个值作为 currentValue 开始执行。在这种情况下，如果数组为空（没有第一个值可以作为 accumulator 返回），则会抛出错误。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#reduce
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "x",
               "uniVer": "√",
                "unixVer": "x"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                "unixVer": "x"
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
  reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U
  /**
     reduceRight() 方法对累加器（accumulator）和数组的每个值（按从右到左的顺序）应用一个函数，并使其成为单个值。
     @param callbackfn 为数组中的每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将成为 reduceRight() 的返回值。该函数被调用时将传入以下参数：
         previousValue:上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为数组最后一个元素的值。
         currentValue:数组中当前正在处理的元素。
         currentIndex:正在处理的元素在数组中的索引。
         array:调用了 reduceRight() 的数组本身。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#reduceRight
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T
  /**
     reduceRight() 方法对累加器（accumulator）和数组的每个值（按从右到左的顺序）应用一个函数，并使其成为单个值。
     @param callbackfn 为数组中的每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将成为 reduceRight() 的返回值。该函数被调用时将传入以下参数：
         previousValue:上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为数组最后一个元素的值。
         currentValue:数组中当前正在处理的元素。
         currentIndex:正在处理的元素在数组中的索引。
         array:调用了 reduceRight() 的数组本身。
     @param initialValue 首次调用 callbackFn 时累加器的值。如果不提供初始值，则将使用数组中的最后一个元素，并在迭代时跳过它。没有初始值的情况下，在空数组上调用 reduceRight() 会产生 TypeError。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#reduceRight
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T
  /**
     reduceRight() 方法对累加器（accumulator）和数组的每个值（按从右到左的顺序）应用一个函数，并使其成为单个值。
     @param callbackfn 为数组中的每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将成为 reduceRight() 的返回值。该函数被调用时将传入以下参数：
         previousValue:上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为数组最后一个元素的值。
         currentValue:数组中当前正在处理的元素。
         index:正在处理的元素在数组中的索引。
         array:调用了 reduceRight() 的数组本身。
     @param initialValue 首次调用 callbackFn 时累加器的值。如果不提供初始值，则将使用数组中的最后一个元素，并在迭代时跳过它。没有初始值的情况下，在空数组上调用 reduceRight() 会产生 TypeError。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#reduceRight
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "x",
               "uniVer": "√",
                "unixVer": "x"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                "unixVer": "x"
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
  reduceRight<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U

  [n: number]: T

  /**
     find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 null。
     @param predicate 为数组中的每个元素执行的函数。它应该返回一个真值来表示已经找到了匹配的元素。
     @param thisArg 执行 callbackFn 时用作 this 的值。
     @return 数组中第一个满足所提供测试函数的元素的值，否则返回 null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#find
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  find<S extends T>(
    predicate: (value: T, index: number, obj: T[]) => value is S,
    thisArg?: any
  ): S | null
  find(
    predicate: (value: T, index: number, obj: T[]) => boolean,
    thisArg?: any
  ): T | null

  /**
     findIndex() 方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1。
     @param predicate 为数组中的每个元素执行的函数。它应该返回一个真值以指示已找到匹配元素，否则返回一个假值。
     @param thisArg 执行 callbackFn 时用作 this 的值。
     @return 数组中第一个满足测试条件的元素的索引。否则返回 -1。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#findIndex
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "3.90"
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
  findIndex(
    predicate: (value: T, index: number, obj: T[]) => boolean,
    thisArg?: any
  ): number
  /**
     fill() 方法用一个固定值填充一个数组中从起始索引（默认为 0）到终止索引（默认为 array.length）内的全部元素。它返回修改后的数组。
     @param value 用来填充数组元素的值。注意所有数组中的元素都将是这个确定的值：如果 value 是个对象，那么数组的每一项都会引用这个元素。
     @param start 基于零的索引，从此开始填充，转换为整数。
     @param end 基于零的索引，在此结束填充，转换为整数。fill() 填充到但不包含 end 索引。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#fill
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
  fill(value: T, start?: number, end?: number): this

  /**
     copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。
     @param target 序列开始替换的目标位置，以 0 为起始的下标表示，且将被转换为整数
     @param start 要复制的元素序列的起始位置，以 0 为起始的下标表示，且将被转换为整数
     @param end 要复制的元素序列的结束位置，以 0 为起始的下标表示，且将被转换为整数。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#copyWithin
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
  copyWithin(target: number, start?: number, end?: number): this

  /**
     includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。
     @param searchElement 需要查找的值。
     @param fromIndex 可选。开始搜索的索引（从零开始），会转换为整数。
     @return 一个布尔值，如果在数组中（或者在 fromIndex 所指示的数组部分中，如果指定 fromIndex 的话）找到 searchElement 值，则该值为 true。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#includes
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
  includes(searchElement: any, fromIndex?: number): boolean
}

interface ArrayConstructor {
  // /**
  //  * @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#constructor
  //  * @uniPlatform {
  //  *    "app": {
  //  *        "android": {
  //  *           "osVer": "x",
  //  *           "uniVer": "x",
  //  *            "unixVer": "x"
  //  *        },
  //  *        "ios": {
  //  *           "osVer": "x",
  //  *           "uniVer": "x",
  //  *            "unixVer": "x"
  //  *        }
  //  *    },
  //  *    "web": {
  //  *        "uniVer": "√",
  //  *        "unixVer": "4.0"
  //  *    }
  //  * }
  //  */
  // new(arrayLength ?: number) : any[];
  // /**
  //  * @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#constructor
  //  * @uniPlatform {
  //  *    "app": {
  //  *        "android": {
  //  *           "osVer": "x",
  //  *           "uniVer": "x",
  //  *            "unixVer": "x"
  //  *        },
  //  *        "ios": {
  //  *           "osVer": "x",
  //  *           "uniVer": "x",
  //  *            "unixVer": "x"
  //  *        }
  //  *    },
  //  *    "web": {
  //  *        "uniVer": "√",
  //  *        "unixVer": "4.0"
  //  *    }
  //  * }
  //  */
  // new <T>(arrayLength : number) : T[];
  /**
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#constructor
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
  new <T>(...items: T[]): T[]
  // /**
  //  * @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#constructor
  //  * @uniPlatform {
  //  *    "app": {
  //  *        "android": {
  //  *           "osVer": "x",
  //  *           "uniVer": "x",
  //  *           "unixVer": "x"
  //  *        },
  //  *        "ios": {
  //  *           "osVer": "x",
  //  *           "uniVer": "x",
  //  *            "unixVer": "x"
  //  *        }
  //  *    },
  //  *    "web": {
  //  *        "uniVer": "√",
  //  *        "unixVer": "4.0"
  //  *    }
  //  * }
  //  */
  // (arrayLength ?: number) : any[];
  // /**
  //  * @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#constructor
  //  * @uniPlatform {
  //  *    "app": {
  //  *        "android": {
  //  *           "osVer": "x",
  //  *           "uniVer": "x",
  //  *           "unixVer": "x"
  //  *        },
  //  *        "ios": {
  //  *           "osVer": "x",
  //  *           "uniVer": "x",
  //  *           "unixVer": "x"
  //  *        }
  //  *    },
  //  *    "web": {
  //  *        "uniVer": "√",
  //  *        "unixVer": "4.0"
  //  *    }
  //  * }
  //  */
  // <T>(arrayLength : number) : T[];
  // /**
  //  * @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#constructor
  //  * @uniPlatform {
  //  *    "app": {
  //  *        "android": {
  //  *           "osVer": "x",
  //  *           "uniVer": "x",
  //  *           "unixVer": "x"
  //  *        },
  //  *        "ios": {
  //  *           "osVer": "x",
  //  *           "uniVer": "x",
  //  *           "unixVer": "x"
  //  *        }
  //  *    },
  //  *    "web": {
  //  *        "uniVer": "√",
  //  *        "unixVer": "4.0"
  //  *    }
  //  * }
  //  */
  // <T>(...items : T[]) : T[];
  /**
     Array.isArray() 静态方法用于确定传递的值是否是一个 Array。
     @param arg 需要检测的值。
     @return 如果 value 是 Array，则为 true；否则为 false。如果 value 是 TypedArray 实例，则总是返回 false。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#isArray
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
  isArray(arg: any): arg is any[]

  /**
     Array.of() 静态方法通过可变数量的参数创建一个新的 Array 实例，而不考虑参数的数量或类型
     @param items 用于创建数组的元素。
     @return 新的 Array 实例。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#of
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.51",
               "uniUtsPlugin": "4.51",
               "unixUtsPlugin": "4.51"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "√",
               "unixVer": "4.11",
               "uniUtsPlugin": "4.51",
               "unixUtsPlugin": "4.51"
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
  of<T>(...items: T[]): T[]


  /**
   * Array.from() 静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例。
      @param arrayLike 想要转换成数组的类数组或可迭代对象。
      @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#from
      @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.51",
               "uniUtsPlugin": "4.51",
               "unixUtsPlugin": "4.51"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "√",
               "unixVer": "4.11",
               "uniUtsPlugin": "4.51",
               "unixUtsPlugin": "4.51"
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
  from<T>(arrayLike: ArrayLike<T>): T[];

  /**
   * Array.from() 静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例。
   * @param arrayLike 想要转换成数组的类数组或可迭代对象。
   * @param mapfn 调用数组每个元素的函数。如果提供，每个将要添加到数组中的值首先会传递给该函数，然后将 mapFn 的返回值增加到数组中。使用以下参数调用该函数：element 数组当前正在处理的元素。index 数组当前正在处理的元素的索引。
    @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#from
    @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.51",
               "uniUtsPlugin": "4.51",
               "unixUtsPlugin": "4.51"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "√",
               "unixVer": "4.11",
               "uniUtsPlugin": "4.51",
               "unixUtsPlugin": "4.51"
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
  from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U): U[];

  /**
   * Array.fromAsync() 静态方法可以由一个异步可迭代对象、可迭代对象或类数组对象创建一个新的、浅拷贝的 Array 实例。
   * @param arrayLike 要转换为数组的异步可迭代、可迭代或类数组对象。
   * @param mapfn 为数组中的每个元素执行的函数。如果提供了该函数，则每个要添加到数组中的值都会先通过该函数处理，mapFn 的返回值将代替该值被添加到数组中（在等待兑现后）。该函数被调用时将传入以下参数：element 数组当前正在处理的元素。index 数组当前正在处理的元素的索引。
   * @return 一个新的 Promise，其兑现值是一个新的 Array 实例。
    @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#fromAsync
    @uniPlatform {
      "app": {
          "android": {
             "osVer": "5.0",
             "uniVer": "√",
             "unixVer": "4.51",
             "uniUtsPlugin": "4.51",
             "unixUtsPlugin": "4.51"
          },
          "ios": {
             "osVer": "12.0",
             "uniVer": "√",
             "unixVer": "4.11",
             "uniUtsPlugin": "4.51",
             "unixUtsPlugin": "4.51"
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
  fromAsync<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U): Promise<U[]>;

  /**
     fromNative() 方法 从native 数据结构中 转换得到一个UTS环境下的Array对象
     支持传入的参数类型有: kotlin.collections.List/ kotlin.Array/kotlin.ByteArray/Kotlin.LongArray/Kotlin.IntArray 等
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Array.html#fromNative
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
                  "unixVer": "x"
            }
        }
     }
   */
  fromNative(input : kotlin.ByteArray | Kotlin.LongArray | Kotlin.IntArray | Kotlin.FloatArray | Kotlin.DoubleArray | Kotlin.ShortArray | Kotlin.CharArray | Kotlin.BooleanArray | kotlin.Array | kotlin.collections.List) : Array;

  readonly prototype: any[]
}

declare var Array: ArrayConstructor

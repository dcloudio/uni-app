interface Set<T> {
  /**
     如果 Set 对象中没有具有相同值的元素，则 add() 方法将插入一个具有指定值的新元素到 Set 对象中。
     @param value 要添加到 Set 对象的元素的值。
     @return Set 对象本身。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Set.html#add
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
  add(value: T): this

  /**
     移除 Set 对象中所有元素。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Set.html#clear
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
  clear(): void

  /**
     从 Set 对象中删除指定的值（如果该值在 Set 中）。
     @param value 要从 Set 中移除的值。
     @return 成功删除返回 true，否则返回 false。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Set.html#delete
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
  delete(value: T): boolean
  /**
     对 Set 对象中的每个值按插入顺序执行一次提供的函数。
     @param callbackfn 为集合中每个元素执行的回调函数，该函数接收三个参数：value、key: Set 中正在处理的当前元素。因为 Set 中没有键，所以 value 会被共同传递给这两个参数。set: 调用 forEach() 的 Set 对象。
     @param thisArg 值在执行 callbackFn 时作为 this 使用。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Set.html#forEach
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
  forEach(
    callbackfn: (value: T, value2: T, set: Set<T>) => void,
    thisArg?: any
  ): void
  /**
     返回一个布尔值来指示对应的值是否存在于 Set 对象中。
     @param value 要测试是否存在于 Set 对象中的值。
     @return 如果 Set 对象中存在具有指定值的元素，则返回 true；否则返回 false。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Set.html#has
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
  has(value: T): boolean

  /**
     返回 Set 对象中（唯一的）元素的个数。
     @return 返回 Set 对象中（唯一的）元素的个数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Set.html#size
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
  readonly size: number
}

interface SetConstructor {
  /**
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Set.html#constructor
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
  new <T = any>(values?: readonly T[] | null): Set<T>
  readonly prototype: Set<any>
}
declare var Set: SetConstructor

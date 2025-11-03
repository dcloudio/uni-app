interface UTSJSONObject {
  constructor: Function;
  // 4.41
  [key: string]: any | null
  /**
     获取一个 属性，返回类型是any 或者 null
     @return 如果属性存在返回结果，不存在返回null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#get
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.0"
        }
     }
   */
  get(key: string): any | null;
  /**
     添加或更新一个指定的属性
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#set
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.0"
        }
     }
   */
  set(key: string, value: any): void;
  /**
     获取一个 属性，返回类型是any 或者 null
     @return 如果属性存在返回结果，不存在返回null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getAny
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.0"
        }
     }
   */
  getAny(key: string): any | null;
  /**
     获取一个 属性，返回类型是any
     @param key 属性值, 可以是keyPath
     @param def 指定的默认值
     @return 如果属性存在返回结果，不存在返回指定的默认值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getAny
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.51"
        }
     }
   */
  getAny(key: string, def: any): any;
  /**
     获取一个Boolean属性，返回类型是Boolean 或者 null
     @return 如果属性名存在，且类型为Boolean返回对应的结果，不存在返回null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getBoolean
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.0"
        }
     }
   */
  getBoolean(key: string): boolean | null;
  /**
     获取一个Boolean属性，返回类型是Boolean
     @param key 属性值, 可以是keyPath
     @param def 指定的默认值
     @return 如果属性名存在，且类型为Boolean返回对应的结果，不存在返回指定的默认值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getBoolean
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.51"
        }
     }
   */
  getBoolean(key: string, def: boolean): boolean;
  /**
     获取一个number属性，返回类型是number 或者 null
     @return 如果属性名存在，且类型为number返回对应的结果，不存在返回null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getNumber
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.0"
        }
     }
   */
  getNumber(key: string): number | null;
  /**
     获取一个number属性，返回类型是number
     @param key 属性值, 可以是keyPath
     @param def 指定的默认值
     @return 如果属性名存在，且类型为number返回对应的结果，不存在返回指定的默认值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getNumber
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.51"
        }
     }
   */
  getNumber(key: string, def: number): number;
  /**
     获取一个string属性，返回类型是string 或者 null
     @return 如果属性名存在，且类型为string返回对应的结果，不存在返回null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getString
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.0"
        }
     }
   */
  getString(key: string): string | null;
  /**
     获取一个string属性，返回类型是string
     @param key 属性值, 可以是keyPath
     @param def 指定的默认值
     @return 如果属性名存在，且类型为string返回对应的结果，不存在返回指定的默认值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getString
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.51"
        }
     }
   */
  getString(key: string, def: string): string;
  /**
     获取一个UTSJSONObject属性，返回类型是UTSJSONObject 或者 null
     @return 如果属性名存在，且类型为UTSJSONObject返回对应的结果，不存在返回null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getJSON
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.0"
        }
     }
   */
  getJSON(key: string): UTSJSONObject | null;
  /**
     获取一个UTSJSONObject属性，返回类型是UTSJSONObject
     @param key 属性值, 可以是keyPath
     @param def 指定的默认值
     @return 如果属性名存在，且类型为UTSJSONObject返回对应的结果，不存在返回指定的默认值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getJSON
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.51"
        }
     }
   */
  getJSON(key: string, def: UTSJSONObject): UTSJSONObject;
  /**
     获取一个Array属性，返回类型是Array 或者 null, 数组元素类型由泛型T决定
     @return 如果属性名存在，且类型为Array返回对应的结果，不存在返回null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getArray<T>
     @inline
     @reified
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.0"
        }
     }
   */
  getArray<T>(key: string): Array<T> | null;
  /**
     获取一个Array属性，返回类型是Array, 数组元素类型由泛型T决定
     @param key 属性值, 可以是keyPath
     @param def 指定的默认值
     @return 如果属性名存在，且类型为Array返回对应的结果，不存在返回指定的默认值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getArray<T>
     @inline
     @reified
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.51"
        }
     }
   */
  getArray<T>(key: string, def: Array<T>): Array<T>;
  /**
     获取一个Array属性，返回类型是Array 或者 null
     @return 如果属性名存在，且类型为Array返回对应的结果，不存在返回null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getArray
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.0"
        }
     }
   */
  getArray(key: string): Array<any> | null;
  /**
     获取一个Array属性，返回类型是Array
     @param key 属性值, 可以是keyPath
     @param def 指定的默认值
     @return 如果属性名存在，且类型为Array返回对应的结果，不存在返回指定的默认值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#getArray
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.51"
        }
     }
   */
  getArray(key: string, def: Array<any>): Array<any>;
  /**
     将当前 UTSJSONObject 实例转换为 Map 实例。
     @return 返回 Map<string, any> 类型的 map
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#toMap
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
        "web": {
           "uniVer": "x",
           "unixVer": "4.0"
        }
     }
   */
  toMap(): Map<string, any>;


  /**
     将当前的UTSJSONObject对象转换为某一个具体的类型 T
     @return 具体的类型T，如果失败返回null
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#parse
     @inline
     @reified
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "3.90",
               "uniUtsPlugin": "3.90",
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
                "osVer": "x",
                "uniVer": "x",
                "uniUtsPlugin": "x",
                "unixVer": "x"
                "unixUtsPlugin": "x"
            }
        },
        "web": {
           "uniVer": "x",
           "unixVer": "x"
        },
        "mp": {
          "weixin": {
            "hostVer": "x",
            "uniVer": "x",
            "unixVer": "x"
          }
        }
     }
   */
  parse<T>(): T | null;

}

interface UTSJSONObjectConstructor {
  new(value?: any): UTSJSONObject;
  /**
     以数组的形式返回指定UTSJSONObjetc 对象内可枚举属性的名称列表
     @param item 需要检索的UTSJSONObject 实例对象
     @return 返回 Array<string> 类型的可枚举属性的名称列表
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#keys
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
               "uniUtsPlugin": "4.23",
               "unixUtsPlugin": "4.23"
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
            "uniVer": "x",
            "unixVer": "4.41"
          }
        },
        "web": {
           "uniVer": "x",
           "unixVer": "4.25"
        }
     }
   */
  keys(item: UTSJSONObject): Array<string>;

  /**
     该方法允许输入一个或者多个UTSJSONObject对象，合并后返回一个新的UTSJSONObject，其中包含全部输入对象的属性字段，如果存在同名的属性会以后传入的属性为准
     @param items 需要被合并的UTSJSONObject 实例对象
     @return 合并后的UTSJSONObject
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#assign
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
               "uniUtsPlugin": "4.23",
               "unixUtsPlugin": "4.23"
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
            "uniVer": "x",
            "unixVer": "4.41"
          }
        },
        "web": {
           "uniVer": "x",
           "unixVer": "4.25"
        }
     }
   */
  assign(...items: UTSJSONObject[]): UTSJSONObject;

  /**
     该方法允许输入一个或者多个UTSJSONObject对象，合并后返回一个新的泛型对象T，其中包含全部输入对象的属性字段，如果存在同名的属性会以后传入的属性为准
     @param items 需要被合并的实例对象
     @return 合并后的泛型对象
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/UTSJSONObject.html#assign
     @inline
     @reified
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
               "uniUtsPlugin": "4.23",
               "unixUtsPlugin": "4.23"
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
            "uniVer": "x",
            "unixVer": "4.41"
          }
        },
        "web": {
           "uniVer": "x",
           "unixVer": "4.25"
        }
     }
   */
  assign<T>(...items: any[]): T | null;
}

declare var UTSJSONObject: UTSJSONObjectConstructor;

// type Int = number;
// type Float = number;
// type Double = number;
// type Int64 = number;
// type Int32 = number;
// type Int16 = number;
// type Int8 = number;
// type UInt = number;
// type UInt64 = number;
// type UInt32 = number;
// type UInt16 = number;
// type UInt8 = number;
// type Byte = number;
// type Short = number;
// type Long = number;
// type UByte = number;
// type UShort = number;
// type ULong = number;

interface Number {
  /**
     返回指定 Number 对象的字符串表示形式。如果转换的基数大于 10，则会使用字母来表示大于 9 的数字，比如基数为 16 的情况，则使用 a 到 f 的字母来表示 10 到 15。如果基数没有指定，则使用 10。如果对象是负数，则会保留负号。即使 radix 是 2 时也是如此：返回的字符串包含一个负号（-）前缀和正数的二进制表示，不是 数值的二进制补码。进行数字到字符串的转换时，建议用小括号将要转换的目标括起来，防止出错。
     @param radix 指定要用于数字到字符串的转换的基数 (从 2 到 36)。如果未指定 radix 参数，则默认值为 10。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toString
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
  toString(radix?: number): string;

  /**
     使用定点表示法来格式化一个数值。
     @param fractionDigits 小数点后数字的个数；介于 0 到 20（包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0。
     @return 使用定点表示法表示给定数字的字符串。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toFixed
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
  toFixed(fractionDigits?: number): string;

  /**
     以指数表示法返回该数值字符串表示形式。
     @param fractionDigits 可选。一个整数，用来指定小数点后有几位数字。默认情况下用尽可能多的位数来显示数字。如果 fractionDigits 太小或太大将会抛出该错误。必须介于 0 和 20（包括 20）之间。
     @return 一个用幂的形式 (科学记数法) 来表示Number 对象的字符串。小数点后以 fractionDigits 提供的值来四舍五入。如果 fractionDigits 参数被忽略了，小数点后的将尽可能用最多的位数来表示该数值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toExponential
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
  toExponential(fractionDigits?: number): string;

  /**
     以指定的精度返回该数值对象的字符串表示。
     @param precision 一个用来指定有效数个数的整数。 必须介于 1 到 21 之间。
     @return 以定点表示法或指数表示法表示的一个数值对象的字符串表示，四舍五入到 precision 参数指定的显示数字位数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toPrecision
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
  toPrecision(precision?: number): string;

  /**
     返回一个被 Number 对象包装的原始值。
     @return 表示指定 Number 对象的原始值的数字。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#valueOf
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
  valueOf(): number;

  /**
     返回一个Int 值
     @return 返回 number 对应的 Int 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toInt
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
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
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
            "unixVer": "x"
        }
     }
   */
  toInt(): Int;

  /**
     返回一个Float 值
     @return 返回 number 对应的 Float 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toFloat
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
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
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
            "unixVer": "x"
        }
     }
   */
  toFloat(): Float;

  /**
     返回一个 Double 值
     @return 返回 number 对应的 Double 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toDouble
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
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
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
            "unixVer": "x"
        }
     }
   */
  toDouble(): Double;

  /**
     返回一个 Int64 值, app-iOS平台特有。
     @return 返回 number 对应的 Int64 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toInt64
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
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
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
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toInt64(): Int64;


  /**
     返回一个 Int32 值, app-iOS平台特有。
     @return 返回 number 对应的 Int32 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toInt32
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
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
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
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toInt32(): Int32;


  /**
     返回一个 Int16 值, app-iOS平台特有。
     @return 返回 number 对应的 Int16 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toInt16
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
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
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
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toInt16(): Int16;

  /**
     返回一个 Int8 值, app-iOS平台特有。
     @return 返回 number 对应的 Int8 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toInt8
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
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
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
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toInt8(): Int8;

  /**
     返回一个 UInt 值
     @return 返回 number 对应的 UInt 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toUInt
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
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
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
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toUInt(): UInt;

  /**
     返回一个 UInt64 值, app-iOS平台特有。
     @return 返回 number 对应的 UInt64 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toUInt64
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
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
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
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toUInt64(): UInt64;


  /**
     返回一个 UInt32 值, app-iOS平台特有。
     @return 返回 number 对应的 UInt32 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toUInt32
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
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
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
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toUInt32(): UInt32;


  /**
     返回一个 UInt16 值, app-iOS平台特有。
     @return 返回 number 对应的 UInt16 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toUInt16
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
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
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
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toUInt16(): UInt16;

  /**
     返回一个 UInt8 值, app-iOS平台特有。
     @return 返回 number 对应的 UInt8 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toUInt8
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
               "osVer": "12.0",
               "uniVer": "x",
               "unixVer": "x",
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
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toUInt8(): UInt8;

  /**
     将当前的Number数据转换为Byte表示，如果超出Byte最大值表示范围，会得到溢出后余数表示, app-andorid平台特有。
     @return 返回 number 对应的 Byte 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toByte
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
        },
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  toByte(): Byte;

  /**
     将当前的Number数据转换为Long表示，如果超出Long最大值表示范围，会得到溢出后余数表示, app-andorid平台特有。
     @return 返回 number 对应的 Long 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toLong
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
   */
  toLong(): Long;

  /**
     将当前的Number数据转换为Short表示，如果超出Short最大值表示范围，会得到溢出后余数表示, app-andorid平台特有。
     @return 返回 number 对应的 Short 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toShort
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
   */
  toShort(): Short;


  /**
     将当前的 Number 数据转换为 UShort 表示，如果超出 UShort 最大值表示范围，会得到溢出后余数表示, app-andorid平台特有。
     @return 返回 number 对应的 UShort 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toUShort
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
   */
  toUShort(): UShort;

  /**
     将当前的 Number 数据转换为 ULong 表示，如果超出 ULong 最大值表示范围，会得到溢出后余数表示, app-andorid平台特有。
     @return 返回 number 对应的 ULong 值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#toULong
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
   */
  toULong(): ULong;

}

interface NumberConstructor {

  /**
     创建一个 Number 对象。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#constructor
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
  new(value?: any): Number;
  /**
     创建一个 Number 对象。
     @param 所创建对象的数值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#constructor
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
  (value?: any): number;
  readonly prototype: Number;

  /**
     在 JavaScript 里所能表示的最大数值。无限接近于 1.79E+308。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#MAX_VALUE
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
  readonly MAX_VALUE: number;

  /**
     表示在 JavaScript 中所能表示的最小的正值。 无限接近于 5.00E-324。

     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#MIN_VALUE
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
  readonly MIN_VALUE: number;

  /**
     表示“非数字”（Not-A-Number）。和 NaN 相同。
     在相等比较中，NaN不等于任何值，包括它自己。要测试一个值是否等于NaN，使用isNaN函数。

     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#NaN
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
  readonly NaN: number;

  /**
     表示负无穷大。
     Number.NEGATIVE_INFINITY 的值和全局对象的 Infinity 属性的负值相同。

     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#NEGATIVE_INFINITY
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
  readonly NEGATIVE_INFINITY: number;

  /**
     表示正无穷大。
     Number.POSITIVE_INFINITY 的值同全局对象 Infinity 属性的值相同。

     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#POSITIVE_INFINITY
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
  readonly POSITIVE_INFINITY: number;

  /**
     通过 Int | Float | Double | Int64 | Int32 | Int16 | Int8 | UInt | UInt64 | UInt32 | UInt16 | UInt8  | Byte | Short | Long 类型创建一个 number
     @param value 必填。一个 Swift 或者 Kotlin 专有数字类型的值。其中 Swift 平台 支持 Int, Float, Double, Int64, Int32, Int16, Int8, UInt,  UInt64, UInt32, UInt16, UInt8。Kotlin 平台支持  Int, Float, Double, Byte, Short, Long
     @return 返回 number
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Number.html#from
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
               "uniVer": "x",
               "unixVer": "x",
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
        "web": {
            "uniVer": "x",
            "unixVer": "x"
        }
     }
   */
  from(value: Int | Float | Double | Int64 | Int32 | Int16 | Int8 | UInt | UInt64 | UInt32 | UInt16 | UInt8 | Byte | Short | Long): number;
}

/** An object that represents a number of any kind. All JavaScript numbers are 64-bit floating-point numbers. */
declare var Number: NumberConstructor;

/** Enables basic storage and retrieval of dates and times. */
interface Date {
  /**
     返回一个字符串，以本地的时区表示该 Date 对象。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#toString
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
     以美式英语和人类易读的形式返回一个日期对象日期部分的字符串。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#toDateString
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  toDateString() : string;
  /**
     以人类易读形式返回一个日期对象时间部分的字符串，该字符串以美式英语格式化。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#toTimeString
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
            "osVer": "√",
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
  toTimeString() : string;
  /**
     返回该日期对象的字符串，该字符串格式因不同语言而不同。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#toLocalString
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  toLocaleString() : string;
  /**
     返回指定日期对象日期部分的字符串，该字符串格式因不同语言而不同。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#toLocalDateString
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  toLocaleDateString() : string;
  /**
     返回该日期对象时间部分的字符串，该字符串格式因语言而异。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#toLocalTimeString
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  toLocaleTimeString() : string;
  /**
     返回从UTC时间1970年1月1日午夜开始以毫秒为单位存储的时间值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#valueOf
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  valueOf() : number;
  /**
     返回从UTC时间1970年1月1日午夜开始以毫秒为单位存储的时间值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getTime
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  getTime() : number;
  /**
     根据本地时间返回指定日期的年份。此方法替代 getYear() 。
     @return 根据当地时间，返回一个对应于给定日期的年份数字。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getFullYear
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
            "osVer": "√",
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
  getFullYear() : number;
  /**
     以世界时为标准，返回一个指定的日期对象的年份。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getUTCFullYear
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  getUTCFullYear() : number;
  /**
     根据本地时间，返回一个指定的日期对象的月份，为基于 0 的值（0 表示一年中的第一月）。
     @return 一个 0 到 11 的整数值：0 代表一月份，1 代表二月份，2 代表三月份，依次类推。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getMonth
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
            "osVer": "√",
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
  getMonth() : number;
  /**
     以世界时为标准，返回一个指定的日期对象的月份，它是从 0 开始计数的（0 代表一年的第一个月）。
     @return  返回一个 0 到 11 的整数，分别对应以下月份：0 代表一月，1 代表二月，2 代表三月，依次类推。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getUTCMonth
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  getUTCMonth() : number;
  /**
     根据本地时间，返回一个指定的日期对象为一个月中的哪一日（从 1--31）。
     @return  返回一个 1 到 31 的整数值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getDate
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
            "osVer": "√",
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
  getDate() : number;
  /**
     以世界时为标准，返回一个指定的日期对象为一个月中的第几天
     @return 返回一个 1 到 31 的整数值
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getUTCDate
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  getUTCDate() : number;
  /**
     根据本地时间，返回一个具体日期中一周的第几天，0 表示星期天。
     @return 根据本地时间，返回一个 0 到 6 之间的整数值，代表星期几：0 代表星期日，1 代表星期一，2 代表星期二，依次类推。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getDay
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
            "osVer": "√",
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
  getDay() : number;
  /**
     以世界时为标准，返回一个指定的日期对象为一星期中的第几天，其中 0 代表星期天。
     @return 返回一个对应一星期中第几天的整数：0 代表星期天，1 代表星期一，2 代表星期二，依次类推。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getUTCDay
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  getUTCDay() : number;
  /**
     根据本地时间，返回一个指定的日期对象的小时。
     @return 返回一个 0 到 23 之间的整数值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getHours
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  getHours() : number;
  /**
     以世界时为标准，返回一个指定的日期对象的小时数。
     @return  返回一个 0 到 23 的整数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getUTCHours
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  getUTCHours() : number;
  /**
     根据本地时间，返回一个指定的日期对象的分钟数。
     @return 返回一个 0 到 59 的整数值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getMinutes
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  getMinutes() : number;
  /**
     以世界时为标准，返回一个指定的日期对象的分钟数。
     @return 返回一个 0 到 59 的整数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getUTCMinutes
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  getUTCMinutes() : number;
  /**
     根据本地时间，返回一个指定的日期对象的秒数。
     @return 返回一个 0 到 59 的整数值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getSeconds
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  getSeconds() : number;
  /**
     以世界时为标准，返回一个指定的日期对象的秒数。
     @return 返回一个 0 到 59 的整数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getUTCSeconds
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  getUTCSeconds() : number;
  /**
     根据本地时间，返回一个指定的日期对象的毫秒数。
     @return 返回一个 0 到 999 的整数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getMilliseconds
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  getMilliseconds() : number;
  /**
     以世界时为标准，返回一个指定的日期对象的毫秒数。
     @return 返回一个 0 到 999 的整数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getUTCMilliseconds
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  getUTCMilliseconds() : number;
  /**
     返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟。
     @return 时区偏差（time-zone offset）表示协调世界时（UTC）与本地时区之间的差值，单位为分钟。需要注意的是如果本地时区后于协调世界时，则该差值为正值，如果先于协调世界时则为负值。例如你所在时区为 UTC+10（澳大利亚东部标准时间），将会返回 -600。对于同一个时区，夏令时（Daylight Saving Time）将会改变这个值。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#getTimezoneOffset
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  getTimezoneOffset() : number;
  /**
     以一个表示从 1970-1-1 00:00:00 UTC 计时的毫秒数为来为 Date 对象设置时间。
     @param time 一个整数，表示从 1970-1-1 00:00:00 UTC 开始计时的毫秒数。
     @return UTC 1970 年 1 月 1 日 00:00:00 与更新日期之间的毫秒数（实际上是自变量的值）。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setTime
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  setTime(time : number) : number;
  /**
     根据本地时间设置一个日期对象的豪秒数。如果指定的数字超出了合理范围，则日期对象的时间信息会被相应地更新。例如，如果指定了 1005，则秒数加 1，豪秒数为 5。
     @param ms 一个 0 到 999 的数字，表示豪秒数。
     @return 返回更新后的时间距 1970 年 1 月 1 日 00:00:00 的毫秒数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setMilliseconds
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  setMilliseconds(ms : number) : number;
  /**
     根据世界时来设置指定时间的毫秒数。如果传递的参数超出了指定的范围，setUTCMilliseconds() 方法会相应地尝试更新储存在 Date 的时间信息。例如，假设你传递参数的值是 1100，存储在 Date 的秒数会加 1，然后使用 100 来作为毫秒数。
     @param ms 0 - 999 之间的数值，代表毫秒数。
     @return 返回更新后的时间距 1970 年 1 月 1 日 00:00:00 (UTC) 的毫秒数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setUTCMilliseconds
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  setUTCMilliseconds(ms : number) : number;

  /**
     根据本地时间设置一个日期对象的秒数。
     @param sec 一个 0 到 59 的整数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setSeconds
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  setSeconds(sec : number) : number;
  /**
     为一个依据国际通用时间的特定日期设置秒数。
     @param sec 一个在 0 到 59 之间的整数，表示秒数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setUTCSeconds
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  setUTCSeconds(sec : number) : number;
  /**
     根据本地时间为一个日期对象设置分钟数。
     @param min 一个 0 到 59 的整数，表示分钟数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setMinutes
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  setMinutes(min : number) : number;
  /**
     根据世界协调时（UTC）来设置指定日期的分钟数。
     @param min 必填，表示要设置的分钟数，是一个介于 0 和 59 之间的整数。
     @return 返回从 UTC 时间 1970 年 1 月 1 日 0 时 0 分 0 秒至设置后的时间的毫秒数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setUTCMinutes
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  setUTCMinutes(min : number) : number;
  /**
     根据本地时间为一个日期对象设置小时数，返回从 1970-01-01 00:00:00 UTC 到更新后的 日期 对象实例所表示时间的毫秒数。
     @param hours 必填，一个 0 到 23 的整数，表示小时。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setHours
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  setHours(hours : number) : number;
  /**
     根据世界协调时（UTC）为一个日期对象设置小时数，返回从 1970-01-01 00:00:00 UTC 到更新后的 日期 对象实例所表示时间的毫秒数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setUTCHours
     @param hours 必填，表示小时的整数，取值 0 到 23 之间。
     @return 返回从 1970-01-01 00:00:00 UTC 到更新后的日期所表示时间的毫秒数。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  setUTCHours(hours : number) : number;
  /**
     根据本地时间来指定一个日期对象的天数。如果 dayValue 超出了月份的合理范围，setDate 将会相应地更新 Date 对象。例如，如果为 dayValue 指定 0，那么日期就会被设置为上个月的最后一天。如果 dayValue 被设置为负数，日期会设置为上个月最后一天往前数这个负数绝对值天数后的日期。-1 会设置为上月最后一天的前一天（译者注：例如当前为 4 月，如果 setDate(-2),则为 3 月 29 日）
     @param date 一个整数，表示该月的第几天。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setDate
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  setDate(date : number) : number;
  /**
     根据全球时间设置特定 date 对象的日期。如果你指定的参数超出了范围，setUTCDate() 会尝试更新对应的Date 中的日期信息。例如，如果你使用了 40 来作为参数，但是Date 中存储的月份为 6 月，那么日期将被改写为 10 且月份被增到 7 月。
     @param date 一个 1-31 的整形数字，用来指定日期。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setUTCDate
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  setUTCDate(date : number) : number;
  /**
     根据本地时间为一个日期对象设置月份。
     @param month 必填参数，介于 0 到 11 之间的整数（表示一月到十二月）。
     @return 基于 1 January 1970 00:00:00 UTC 开始计算的毫秒数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setMonth
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  setMonth(month : number) : number;
  /**
     根据通用的时间（ UTC ）来设置一个准确的月份。
     @param month 必填参数，一个 0-11 的整数，代表 1 月到 12 月。
     @return 这个数值是从 1970 年 1 月 1 号 00:00:00 到当前时间的毫秒数（国际通用时间）
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setUTCMonth
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  setUTCMonth(month : number) : number;
  /**
     根据本地时间为一个日期对象设置年份。
     @param year 指定年份的整数值，例如 1995。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setFullYear
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "osVer": "√",
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
  setFullYear(year : number) : number;
  /**
     根据世界标准时间 (UTC) 为一个具体日期设置年份。
     @param year 指定年份整数值，例如，1995
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#setUTCFullYear
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
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
            "osVer": "√",
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
  setUTCFullYear(year : number) : number;
  /** 把一个日期转换为一个字符串，使用 UTC 时区。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#toUTCString
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
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
            "osVer": "√",
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
  toUTCString() : string;
  /** 一个 ISO（ISO 8601 Extended Format）格式的字符串： YYYY-MM-DDTHH:mm:ss.sssZ。时区总是 UTC（协调世界时），加一个后缀“Z”标识。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#toISOString
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "4.4",
               "uniVer": "√",
               "unixVer": "4.11",
               "uniUtsPlugin": "4.11",
               "unixUtsPlugin": "4.11"
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
            "osVer": "√",
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
  toISOString() : string;
  /** 返回 Date 对象的字符串形式。调用 toJSON() 返回一个 JSON 格式字符串 (使用 toISOString())，表示该日期对象的值。默认情况下，这个方法常用于 JSON序列化Date对象。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#toJSON
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "4.4",
               "uniVer": "x",
               "unixVer": "4.11",
               "uniUtsPlugin": "4.11",
               "unixUtsPlugin": "4.11"
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
            "osVer": "√",
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
  toJSON(key ?: any) : string;
}

interface DateConstructor {
  /**
     新创建的 Date 对象代表当前的日期和时间。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#constructor
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
            "osVer": "√",
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
  new() : Date;
  /**
     @param value 为整数时，代表自 UTC 1970 年 1 月 1 日 00:00:00 （ECMAScript 纪元，与 UNIX 纪元相同）以来的毫秒数，忽略闰秒。请记住，大多数 UNIX 时间戳函数只精确到最近的秒。为字符串时：代表日期的字符串值，其格式由 Date.parse() 方法所识别。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#constructor
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
            "osVer": "√",
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
  new(value : number | string) : Date;
  /**
     构造一个新的日期。
     @param year 表示年的整数。从 0 到 99 的值映射了 1900 到 1999 年。其他值对应真实的年份。
     @param monthIndex 表示月份的整数，从代表一月的 0 开始到代表十二月的 11 结束。
     @param date 可选：表示一个月中第几天的整数。默认为 1。
     @param hours 可选：表示一天中的小时数的整数值，在 0 到 23 之间。默认值为 0。
     @param minutes 可选：表示时间的分钟段的整数值。默认为小时后的 0 分钟。
     @param seconds 可选：表示时间的秒数段的整数值。默认为分钟后的 0 秒。
     @param ms 可选：表示时间的毫秒段的整数值。默认为 0 毫秒的秒数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#new
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
            "osVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
        "web": {
            "uniVer": "√",
            "unixVer": "4.0"
        }
     }

   * */
  new(year : number, monthIndex : number, date ?: number, hours ?: number, minutes ?: number, seconds ?: number, ms ?: number) : Date;
  () : string;
  readonly prototype : Date;
  /**
     解析一个表示某个日期的字符串，并返回从 1970-1-1 00:00:00 UTC 到该日期对象（该日期对象的 UTC 时间）的毫秒数，如果该字符串无法识别，或者一些情况下，包含了不合法的日期数值（如：2015-02-31），则返回值为 NaN。
     @param s 一个符合 RFC2822 或 ISO 8601 日期格式的字符串（其他格式也许也支持，但结果可能与预期不符）。
     @return 一个表示从 1970-1-1 00:00:00 UTC 到给定日期字符串所表示时间的毫秒数的数值。如果参数不能解析为一个有效的日期，则返回NaN。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#parse
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
            "osVer": "√",
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
  parse(s : string) : number;

  /**
     接受的参数同 Date 构造函数接受最多参数时一样，但该前者会视它们为 UTC 时间，其返回从 1970 年 1 月 1 日 00:00:00 UTC 到指定时间的毫秒数。
     @param year 一个表示年份的整数值。从 0 到 99 的值会被映射到 1900 至 1999 年。其他的值则代表实际的年份。
     @param monthIndex 0（一月）到 11（十二月）之间的一个整数，表示月份。从 ECMAScript 2017 开始，如果忽略该值，则默认为 0。（直到 ECMAScript 2016，month 都是必须的参数。而从 ES2017 开始，它不再是必须的。）
     @param date 1 到 31 之间的一个整数，表示某月当中的第几天。如果忽略该值，则默认为 1。
     @param hours 0 到 23 之间的一个整数，表示小时。如果忽略该值，则默认为 0。
     @param minutes 0 到 59 之间的一个整数，表示分钟。如果忽略该值，则默认为 0。
     @param seconds 0 到 59 之间的一个整数，表示秒。如果忽略该值，则默认为 0。
     @param ms 0 到 999 之间的一个整数，表示毫秒。如果忽略该值，则默认为 0。
     @return 一个数字，表示从 1970 年 1 月 1 日 00:00:00 UTC 到给定时间的毫秒数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#UTC
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "√",
               "unixVer": "4.71",
               "uniUtsPlugin": "4.71",
               "unixUtsPlugin": "4.71"
            },ss
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
            "osVer": "√",
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
  UTC(year : number, monthIndex : number, date ?: number, hours ?: number, minutes ?: number, seconds ?: number, ms ?: number) : number;
  /**
     返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数。
     @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Date.html#now
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
            "osVer": "√",
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
  now() : number;
}

declare var Date : DateConstructor;

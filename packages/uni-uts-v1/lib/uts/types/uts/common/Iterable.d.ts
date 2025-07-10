 /**
     迭代器执行返回结果，包含当前迭代值，以及是否已迭代完成
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "4.41",
          "unixUtsPlugin": "4.41"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "x",
          "unixUtsPlugin": "4.41"
        },
        "harmony": {
            "osVer": "5.0.0",
            "uniVer": "√",
            "uniUtsPlugin": "x",
            "unixVer": "4.61"
            "unixUtsPlugin": "x"
        }
      },
      "web": {
        "uniVer": "x",
        "unixVer": "4.41"
      }
    }
 */
type UTSIteratorResult<T> = {
  done: boolean;
  value: T;
}
 /**
     UTS 迭代器对象，其提供了 next() 方法用以返回迭代器结果对象
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "4.41",
          "unixUtsPlugin": "4.41"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "x",
          "unixUtsPlugin": "4.41"
        },
        "harmony": {
            "osVer": "5.0.0",
            "uniVer": "√",
            "uniUtsPlugin": "x",
            "unixVer": "4.61"
            "unixUtsPlugin": "x"
        }
      },
      "web": {
        "uniVer": "x",
        "unixVer": "4.41"
      }
    }
 */
type UTSIterator<T> = {
  next:() => UTSIteratorResult<T>
}

 /**
     可迭代协议，用来定义 for..of 迭代规则
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "4.41",
          "unixUtsPlugin": "4.41"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "x",
          "unixUtsPlugin": "4.41"
        },
        "harmony": {
            "osVer": "5.0.0",
            "uniVer": "x",
            "uniUtsPlugin": "x",
            "unixVer": "x"
            "unixUtsPlugin": "x"
        }
      },
      "web": {
        "uniVer": "x",
        "unixVer": "4.41"
      }
    }
 */
interface UTSValueIterable<T> {
  valueIterator() : UTSIterator<T>
}
 /**
     可枚举协议，用来定义 for..in 枚举规则
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "4.41",
          "unixUtsPlugin": "4.41"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "x",
          "unixUtsPlugin": "4.41"
        },
        "harmony": {
            "osVer": "5.0.0",
            "uniVer": "x",
            "uniUtsPlugin": "x",
            "unixVer": "x"
            "unixUtsPlugin": "x"
        }
      },
      "web": {
        "uniVer": "x",
        "unixVer": "4.41"
      }
    }
 */
interface UTSKeyIterable {
  keyIterator() : UTSIterator<string>
  ignoredKeys(): Array<String>
}

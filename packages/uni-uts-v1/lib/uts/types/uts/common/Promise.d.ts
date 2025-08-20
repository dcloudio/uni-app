/**
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
interface PromiseSettledResult<T> {
  status: string
}
/**
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
        },
        "harmony": {
            "osVer": "5.0.0",
            "uniVer": "√",
            "uniUtsPlugin": "√",
            "unixVer": "4.61"
            "unixUtsPlugin": "4.61"
        }
      }
    }
   */
interface PromiseFulfilledResult<T>
  extends PromiseSettledResult<T> {
  value: T
}
/**
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
interface PromiseRejectedResult
  extends PromiseSettledResult<never> {
  reason: any | null
}
/**
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
declare class Promise<T> {
  /**
     创建一个新的 Promise 对象。该构造函数主要用于封装还没有添加 promise 支持的函数。
     @param fn 在构造函数中执行的 function。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  constructor(
    fn: (
      resolve: (value: T) => void,
      reject: (reason: any | null) => void
    ) => void
  )
  /**
     创建一个新的 Promise 对象。该构造函数主要用于封装还没有添加 promise 支持的函数。
     @param fn 在构造函数中执行的 function。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  constructor(fn: (resolve: (value: T) => void) => void)
  /**
     将一个兑现处理器和拒绝处理器附加到 Promise 上，并返回一个新的 Promise，解决为调用处理器得到的返回值，或者如果 Promise 没有被处理（即相关处理器 onFulfilled 或 onRejected 不是函数），则以原始敲定值解决。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  then(): Promise<T>
  /**
     将一个兑现处理器和拒绝处理器附加到 Promise 上，并返回一个新的 Promise，解决为调用处理器得到的返回值，或者如果 Promise 没有被处理（即相关处理器 onFulfilled 或 onRejected 不是函数），则以原始敲定值解决。
     @param onFulfilled 一个在此 Promise 对象被兑现时异步执行的函数。它的返回值将成为 then() 返回的 Promise 对象的兑现值。
     @param onRejected 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  then<R>(onFulfilled: () => R, onRejected?: Function | null): Promise<R>
  /**
     将一个兑现处理器和拒绝处理器附加到 Promise 上，并返回一个新的 Promise，解决为调用处理器得到的返回值，或者如果 Promise 没有被处理（即相关处理器 onFulfilled 或 onRejected 不是函数），则以原始敲定值解决。
     @param onFulfilled 一个在此 Promise 对象被兑现时异步执行的函数。它的返回值将成为 then() 返回的 Promise 对象的兑现值。
     @param onRejected 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  then<R>(
    onFulfilled: () => Promise<R>,
    onRejected?: Function | null
  ): Promise<R>
  /**
     将一个兑现处理器和拒绝处理器附加到 Promise 上，并返回一个新的 Promise，解决为调用处理器得到的返回值，或者如果 Promise 没有被处理（即相关处理器 onFulfilled 或 onRejected 不是函数），则以原始敲定值解决。
     @param onFulfilled 一个在此 Promise 对象被兑现时异步执行的函数。它的返回值将成为 then() 返回的 Promise 对象的兑现值。
     @param onRejected 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  then<R>(
    onFulfilled: (res: T) => R,
    onRejected?: Function | null
  ): Promise<R>
  /**
     将一个兑现处理器和拒绝处理器附加到 Promise 上，并返回一个新的 Promise，解决为调用处理器得到的返回值，或者如果 Promise 没有被处理（即相关处理器 onFulfilled 或 onRejected 不是函数），则以原始敲定值解决。
     @param onFulfilled 一个在此 Promise 对象被兑现时异步执行的函数。它的返回值将成为 then() 返回的 Promise 对象的兑现值。
     @param onRejected 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  then<R>(
    onFulfilled: (res: T) => Promise<R>,
    onRejected?: Function | null
  ): Promise<R>
  /**
     将一个拒绝处理回调函数附加到 Promise 上，并返回一个新的 Promise，如果回调被调用，则解决为回调的返回值，如果 Promise 被兑现，解决为其原始兑现值。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  catch(): Promise<T>
  /**
     将一个拒绝处理回调函数附加到 Promise 上，并返回一个新的 Promise，如果回调被调用，则解决为回调的返回值，如果 Promise 被兑现，解决为其原始兑现值。
     @param onRejected 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  catch<R>(onRejected: () => R): Promise<R>
  /**
     将一个拒绝处理回调函数附加到 Promise 上，并返回一个新的 Promise，如果回调被调用，则解决为回调的返回值，如果 Promise 被兑现，解决为其原始兑现值。
     @param onRejected 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  catch<R>(onRejected: () => Promise<R>): Promise<R>
  /**
     将一个拒绝处理回调函数附加到 Promise 上，并返回一个新的 Promise，如果回调被调用，则解决为回调的返回值，如果 Promise 被兑现，解决为其原始兑现值。
     @param onRejected 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  catch<R>(onRejected: (res: any | null) => R): Promise<R>
  /**
     将一个拒绝处理回调函数附加到 Promise 上，并返回一个新的 Promise，如果回调被调用，则解决为回调的返回值，如果 Promise 被兑现，解决为其原始兑现值。
     @param onRejected 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  catch<R>(onRejected: (res: any | null) => Promise<R>): Promise<R>
  /**
     将一个处理器附加到 Promise 上，并返回一个新的 Promise，当原始 Promise 被解决时解决。无论 Promise 是否被兑现还是被拒绝，处理器都会在 Promise 敲定时被调用。
     @param callback 一个当 promise 敲定时异步执行的函数。它的返回值将被忽略，除非返回一个被拒绝的 promise。调用该函数时不带任何参数。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  finally(callback: Function): Promise<T>
  /**
     返回一个新的 Promise 对象，该对象以给定的值兑现。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  static resolve(): Promise<void>
  /**
     返回一个新的 Promise 对象，该对象以给定的值兑现。
     @param value 一个兑现的值。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  static resolve<T>(value: T | null): Promise<T>
  /**
     返回一个新的 Promise 对象，该对象以给定的值兑现。
     @param value 一个 Promise。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  static resolve<T>(value: Promise<T> | null): Promise<T>
  /**
     返回一个新的 Promise 对象，该对象以给定的原因拒绝。
     @param value 一个拒绝的原因。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  static reject(value?: any | null): Promise<never>
  /**
     接受一个 Promise 可迭代对象作为输入，并返回单个 Promise。返回的 Promise 在所有输入的 Promise 都兑现时（包括传入的可迭代对象为空时）被兑现，其值为一个包含所有兑现值的数组。如果输入的任何 Promise 被拒绝，返回的 Promise 也会被拒绝，并返回第一个拒绝的原因。
     @param arr 一个 Promise 数组。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  static all<T>(arr: Array<Promise<T>>): Promise<Array<T>>
  /**
     接受一个 Promise 可迭代对象作为输入，并返回单个 Promise。返回的 Promise 与第一个敲定的 Promise 的最终状态保持一致。
     @param arr 一个 Promise 数组。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  static race<T>(arr: Array<Promise<T>>): Promise<T>
  /**
     接受一个 Promise 可迭代对象作为输入，并返回单个 Promise。返回的 Promise 在任何输入的 Promise 兑现时兑现，其值为第一个兑现的值。如果所有输入的 Promise 都被拒绝（包括传入的可迭代对象为空时），返回的 Promise 将以带有一个包含拒绝原因的数组的 AggregateError 拒绝。
     @param arr 一个 Promise 数组。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  static any<T>(arr: Array<Promise<T>>): Promise<T>
  /**
     接受一个 Promise 可迭代对象作为输入，并返回单个 Promise。返回的 Promise 在所有输入的 Promise 都敲定时兑现（包括传入的可迭代对象为空时），其值为一个描述每个 Promise 结果的对象数组。
     @param arr 一个 Promise 数组。
     @returns 一个新的 Promise。
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "√",
          "uniUtsPlugin": "3.9+",
          "unixVer": "3.9+",
          "unixUtsPlugin": "3.9+"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "√",
          "uniUtsPlugin": "4.31",
          "unixVer": "4.11",
          "unixUtsPlugin": "4.31"
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
  static allSettled<T>(
    arr: Array<Promise<T>>
  ): Promise<Array<PromiseSettledResult<T>>>
}


interface UTSPromiseAggregateError {
  name: string,
  message: string,
  errors: Array<any | null>,
  addError(error: any | null): void
}

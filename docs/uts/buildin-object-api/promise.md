# Promise

Promise 对象表示异步操作最终的完成（或失败）以及其结果值。

### Constructor(fn)

创建一个新的 Promise 对象。该构造函数主要用于封装还没有添加 promise 支持的函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fn | (resolve: (value: T) => void, reject: (reason?: any) => void) => void | 是 | - | - | 在构造函数中执行的 function。 | 




::: preview 

>UTS
```uts
      // 常规方式
      let p = new Promise<number>((resolve, reject) => {
        let success = true;
        setTimeout(() => {
          if (success) {
            resolve(2024)
          } else {
            let error = new Error("something going wrong")
            reject(error)
          }
        }, 10);
      });
      p.then((res: number) => {
        console.log(res) // 2024
      })

      // 单个函数
      let p1 = new Promise<any | null>((resolve: (value: any | null) => void) => {
        setTimeout(function () {
          resolve(null)
        }, 10);
      })
      p1.then((res: any | null) => {
        console.log(res) // null
      })

      // 指定函数类型
      let p2 = new Promise((resolve: (value: string) => void, reject: (error: any | null) => void) => {
        setTimeout(function () {
          reject(null)
        }, 10);
      })
      p2.then()
        .catch((error: any | null) => {
          console.log(error) // null
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### Constructor(fn)

创建一个新的 Promise 对象。该构造函数主要用于封装还没有添加 promise 支持的函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fn | (resolve: (value: T) => void) => void | 是 | - | - | 在构造函数中执行的 function。 | 




::: preview 

>UTS
```uts
      // 常规方式
      let p = new Promise<number>((resolve, reject) => {
        let success = true;
        setTimeout(() => {
          if (success) {
            resolve(2024)
          } else {
            let error = new Error("something going wrong")
            reject(error)
          }
        }, 10);
      });
      p.then((res: number) => {
        console.log(res) // 2024
      })

      // 单个函数
      let p1 = new Promise<any | null>((resolve: (value: any | null) => void) => {
        setTimeout(function () {
          resolve(null)
        }, 10);
      })
      p1.then((res: any | null) => {
        console.log(res) // null
      })

      // 指定函数类型
      let p2 = new Promise((resolve: (value: string) => void, reject: (error: any | null) => void) => {
        setTimeout(function () {
          reject(null)
        }, 10);
      })
      p2.then()
        .catch((error: any | null) => {
          console.log(error) // null
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


## 实例方法


### then()

将一个兑现处理器和拒绝处理器附加到 Promise 上，并返回一个新的 Promise，解决为调用处理器得到的返回值，或者如果 Promise 没有被处理（即相关处理器 onFulfilled 或 onRejected 不是函数），则以原始敲定值解决。



**返回值**
| 类型 |
| :- |
| Promise\<T> | 


::: preview 

>UTS
```uts
      let p = new Promise<string>((reslove, reject) => {
        setTimeout(function () {
          reslove("hello world")
        }, 13);
      })

      p.then(
        (res: string): Promise<string> => {
          console.log(res) // "hello world"
          let p0 = new Promise<string>((reslove, reject) => {
            var success = true;
            setTimeout(function () {
              success = true;
              if (success) {
                reslove(res + " 2024")
              } else {
                reject("first then p0 reject message")
              }
            }, 8);
          })
          return p0;
        },
        (err: any | null): void => {
          throw new Error("first then throw error")
        }
      )
        .catch(
          (err): string => {
            return "first catch return message"
          }
        )
        .then(
          (res) => {
            console.log(res) // "hello world 2024"
          }
        )
        .catch(
          (err) => {
            console.log(err, "this is seconded catch")
          }
        )
        .finally(() => {
          console.log("finally") // "finally"
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### then(onFulfilled, onRejected?)

将一个兑现处理器和拒绝处理器附加到 Promise 上，并返回一个新的 Promise，解决为调用处理器得到的返回值，或者如果 Promise 没有被处理（即相关处理器 onFulfilled 或 onRejected 不是函数），则以原始敲定值解决。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| onFulfilled | () => any | 是 | - | - | 一个在此 Promise 对象被兑现时异步执行的函数。它的返回值将成为 then() 返回的 Promise 对象的兑现值。 |
| onRejected | (...args?: any) => any | 否 | - | - | 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。 | 


**返回值**
| 类型 |
| :- |
| Promise\<R> | 


::: preview 

>UTS
```uts
      let p = new Promise<string>((reslove, reject) => {
        setTimeout(function () {
          reslove("hello world")
        }, 13);
      })

      p.then(
        (res: string): Promise<string> => {
          console.log(res) // "hello world"
          let p0 = new Promise<string>((reslove, reject) => {
            var success = true;
            setTimeout(function () {
              success = true;
              if (success) {
                reslove(res + " 2024")
              } else {
                reject("first then p0 reject message")
              }
            }, 8);
          })
          return p0;
        },
        (err: any | null): void => {
          throw new Error("first then throw error")
        }
      )
        .catch(
          (err): string => {
            return "first catch return message"
          }
        )
        .then(
          (res) => {
            console.log(res) // "hello world 2024"
          }
        )
        .catch(
          (err) => {
            console.log(err, "this is seconded catch")
          }
        )
        .finally(() => {
          console.log("finally") // "finally"
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### then(onFulfilled, onRejected?)

将一个兑现处理器和拒绝处理器附加到 Promise 上，并返回一个新的 Promise，解决为调用处理器得到的返回值，或者如果 Promise 没有被处理（即相关处理器 onFulfilled 或 onRejected 不是函数），则以原始敲定值解决。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| onFulfilled | () => Promise\<any> | 是 | - | - | 一个在此 Promise 对象被兑现时异步执行的函数。它的返回值将成为 then() 返回的 Promise 对象的兑现值。 |
| onRejected | (...args?: any) => any | 否 | - | - | 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。 | 


**返回值**
| 类型 |
| :- |
| Promise\<R> | 


::: preview 

>UTS
```uts
      let p = new Promise<string>((reslove, reject) => {
        setTimeout(function () {
          reslove("hello world")
        }, 13);
      })

      p.then(
        (res: string): Promise<string> => {
          console.log(res) // "hello world"
          let p0 = new Promise<string>((reslove, reject) => {
            var success = true;
            setTimeout(function () {
              success = true;
              if (success) {
                reslove(res + " 2024")
              } else {
                reject("first then p0 reject message")
              }
            }, 8);
          })
          return p0;
        },
        (err: any | null): void => {
          throw new Error("first then throw error")
        }
      )
        .catch(
          (err): string => {
            return "first catch return message"
          }
        )
        .then(
          (res) => {
            console.log(res) // "hello world 2024"
          }
        )
        .catch(
          (err) => {
            console.log(err, "this is seconded catch")
          }
        )
        .finally(() => {
          console.log("finally") // "finally"
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### then(onFulfilled, onRejected?)

将一个兑现处理器和拒绝处理器附加到 Promise 上，并返回一个新的 Promise，解决为调用处理器得到的返回值，或者如果 Promise 没有被处理（即相关处理器 onFulfilled 或 onRejected 不是函数），则以原始敲定值解决。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| onFulfilled | (res: T) => any | 是 | - | - | 一个在此 Promise 对象被兑现时异步执行的函数。它的返回值将成为 then() 返回的 Promise 对象的兑现值。 |
| onRejected | (...args?: any) => any | 否 | - | - | 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。 | 


**返回值**
| 类型 |
| :- |
| Promise\<R> | 


::: preview 

>UTS
```uts
      let p = new Promise<string>((reslove, reject) => {
        setTimeout(function () {
          reslove("hello world")
        }, 13);
      })

      p.then(
        (res: string): Promise<string> => {
          console.log(res) // "hello world"
          let p0 = new Promise<string>((reslove, reject) => {
            var success = true;
            setTimeout(function () {
              success = true;
              if (success) {
                reslove(res + " 2024")
              } else {
                reject("first then p0 reject message")
              }
            }, 8);
          })
          return p0;
        },
        (err: any | null): void => {
          throw new Error("first then throw error")
        }
      )
        .catch(
          (err): string => {
            return "first catch return message"
          }
        )
        .then(
          (res) => {
            console.log(res) // "hello world 2024"
          }
        )
        .catch(
          (err) => {
            console.log(err, "this is seconded catch")
          }
        )
        .finally(() => {
          console.log("finally") // "finally"
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### then(onFulfilled, onRejected?)

将一个兑现处理器和拒绝处理器附加到 Promise 上，并返回一个新的 Promise，解决为调用处理器得到的返回值，或者如果 Promise 没有被处理（即相关处理器 onFulfilled 或 onRejected 不是函数），则以原始敲定值解决。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| onFulfilled | (res: T) => Promise\<any> | 是 | - | - | 一个在此 Promise 对象被兑现时异步执行的函数。它的返回值将成为 then() 返回的 Promise 对象的兑现值。 |
| onRejected | (...args?: any) => any | 否 | - | - | 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。 | 


**返回值**
| 类型 |
| :- |
| Promise\<R> | 


::: preview 

>UTS
```uts
      let p = new Promise<string>((reslove, reject) => {
        setTimeout(function () {
          reslove("hello world")
        }, 13);
      })

      p.then(
        (res: string): Promise<string> => {
          console.log(res) // "hello world"
          let p0 = new Promise<string>((reslove, reject) => {
            var success = true;
            setTimeout(function () {
              success = true;
              if (success) {
                reslove(res + " 2024")
              } else {
                reject("first then p0 reject message")
              }
            }, 8);
          })
          return p0;
        },
        (err: any | null): void => {
          throw new Error("first then throw error")
        }
      )
        .catch(
          (err): string => {
            return "first catch return message"
          }
        )
        .then(
          (res) => {
            console.log(res) // "hello world 2024"
          }
        )
        .catch(
          (err) => {
            console.log(err, "this is seconded catch")
          }
        )
        .finally(() => {
          console.log("finally") // "finally"
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### catch()

将一个拒绝处理回调函数附加到 Promise 上，并返回一个新的 Promise，如果回调被调用，则解决为回调的返回值，如果 Promise 被兑现，解决为其原始兑现值。



**返回值**
| 类型 |
| :- |
| Promise\<T> | 


::: preview 

>UTS
```uts
      let p = Promise.reject()
      p.then()
        .catch((res: any | null) => {
          console.log(res) // null
        })

      // catch 指定返回值
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          reject("2024")
        }, 12)
      })
        .then()
        .catch((res: any | null): string => {
          console.log(res!) // "2024"
          return "hello world"
        })
        .then((res) => {
          console.log(res) // "hello world"
        })

      // catch 返回Promise
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          reject("2024")
        }, 12)
      })
        .then()
        .catch((res: any | null): Promise<number> => {
          console.log(res!) // "2024"
          let p = new Promise<number>((resolve, reject) => {
            resolve(1)
          })
          return p
        })
        .then((res) => {
          console.log(res) // 1
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### catch(onRejected)

将一个拒绝处理回调函数附加到 Promise 上，并返回一个新的 Promise，如果回调被调用，则解决为回调的返回值，如果 Promise 被兑现，解决为其原始兑现值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| onRejected | () => any | 是 | - | - | 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。 | 


**返回值**
| 类型 |
| :- |
| Promise\<R> | 


::: preview 

>UTS
```uts
      let p = Promise.reject()
      p.then()
        .catch((res: any | null) => {
          console.log(res) // null
        })

      // catch 指定返回值
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          reject("2024")
        }, 12)
      })
        .then()
        .catch((res: any | null): string => {
          console.log(res!) // "2024"
          return "hello world"
        })
        .then((res) => {
          console.log(res) // "hello world"
        })

      // catch 返回Promise
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          reject("2024")
        }, 12)
      })
        .then()
        .catch((res: any | null): Promise<number> => {
          console.log(res!) // "2024"
          let p = new Promise<number>((resolve, reject) => {
            resolve(1)
          })
          return p
        })
        .then((res) => {
          console.log(res) // 1
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### catch(onRejected)

将一个拒绝处理回调函数附加到 Promise 上，并返回一个新的 Promise，如果回调被调用，则解决为回调的返回值，如果 Promise 被兑现，解决为其原始兑现值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| onRejected | () => Promise\<any> | 是 | - | - | 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。 | 


**返回值**
| 类型 |
| :- |
| Promise\<R> | 


::: preview 

>UTS
```uts
      let p = Promise.reject()
      p.then()
        .catch((res: any | null) => {
          console.log(res) // null
        })

      // catch 指定返回值
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          reject("2024")
        }, 12)
      })
        .then()
        .catch((res: any | null): string => {
          console.log(res!) // "2024"
          return "hello world"
        })
        .then((res) => {
          console.log(res) // "hello world"
        })

      // catch 返回Promise
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          reject("2024")
        }, 12)
      })
        .then()
        .catch((res: any | null): Promise<number> => {
          console.log(res!) // "2024"
          let p = new Promise<number>((resolve, reject) => {
            resolve(1)
          })
          return p
        })
        .then((res) => {
          console.log(res) // 1
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### catch(onRejected)

将一个拒绝处理回调函数附加到 Promise 上，并返回一个新的 Promise，如果回调被调用，则解决为回调的返回值，如果 Promise 被兑现，解决为其原始兑现值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| onRejected | (res?: any) => any | 是 | - | - | 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。 | 


**返回值**
| 类型 |
| :- |
| Promise\<R> | 


::: preview 

>UTS
```uts
      let p = Promise.reject()
      p.then()
        .catch((res: any | null) => {
          console.log(res) // null
        })

      // catch 指定返回值
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          reject("2024")
        }, 12)
      })
        .then()
        .catch((res: any | null): string => {
          console.log(res!) // "2024"
          return "hello world"
        })
        .then((res) => {
          console.log(res) // "hello world"
        })

      // catch 返回Promise
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          reject("2024")
        }, 12)
      })
        .then()
        .catch((res: any | null): Promise<number> => {
          console.log(res!) // "2024"
          let p = new Promise<number>((resolve, reject) => {
            resolve(1)
          })
          return p
        })
        .then((res) => {
          console.log(res) // 1
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### catch(onRejected)

将一个拒绝处理回调函数附加到 Promise 上，并返回一个新的 Promise，如果回调被调用，则解决为回调的返回值，如果 Promise 被兑现，解决为其原始兑现值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| onRejected | (res?: any) => Promise\<any> | 是 | - | - | 一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。 | 


**返回值**
| 类型 |
| :- |
| Promise\<R> | 


::: preview 

>UTS
```uts
      let p = Promise.reject()
      p.then()
        .catch((res: any | null) => {
          console.log(res) // null
        })

      // catch 指定返回值
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          reject("2024")
        }, 12)
      })
        .then()
        .catch((res: any | null): string => {
          console.log(res!) // "2024"
          return "hello world"
        })
        .then((res) => {
          console.log(res) // "hello world"
        })

      // catch 返回Promise
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          reject("2024")
        }, 12)
      })
        .then()
        .catch((res: any | null): Promise<number> => {
          console.log(res!) // "2024"
          let p = new Promise<number>((resolve, reject) => {
            resolve(1)
          })
          return p
        })
        .then((res) => {
          console.log(res) // 1
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### finally(callback)

将一个处理器附加到 Promise 上，并返回一个新的 Promise，当原始 Promise 被解决时解决。无论 Promise 是否被兑现还是被拒绝，处理器都会在 Promise 敲定时被调用。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
|  | (...args?: any) => any | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| Promise\<T> | 


::: preview 

>UTS
```uts
      Promise.resolve(2)
        .finally(() => {
          console.log("finally")
        })
        .then((res) => {
          console.log(res) // 2
        })

      Promise.reject(3)
        .finally(() => {
          console.log("finally")
        })
        .catch((res) => {
          console.log(res) // 3
        })

      Promise.resolve(2)
        .finally((): number => {
          console.log("finally")
          return 88
        })
        .then((res) => {
          console.log(res) // 2
        })

      Promise.reject(3).finally(() => {
        throw new Error("99")
      })
        .catch((res) => {
          console.log((res as Error).message) // "99";
        })

      console.log("start");
      Promise.reject(4).finally((): Promise<number> => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(20)
          }, 1000)
        })
      })
        .catch((res) => {
          console.log(res) // 4
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### resolve()

返回一个新的 Promise 对象，该对象以给定的值兑现。



**返回值**
| 类型 |
| :- |
| Promise\<void> | 


::: preview 

>UTS
```uts
      // resolve array
      Promise.resolve([1, 2, 3])
        .then((res) => {
          console.log(res) // [1, 2, 3]
        })

      // resolve string
      Promise.resolve("成功")
        .then((res) => {
          console.log(res) // "成功";
        })

      // resolve null
      Promise.resolve()
        .then((res) => {
          // console.log(res) // null;
        })

      // resolve promise
      const original = Promise.resolve(33)
      const cast = Promise.resolve(original)
      cast.then((res) => {
        console.log(res) // 33;
      })
      // 注：此处飘红是编译器误报，实际可以判等
      console.log(original === cast) // true
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### resolve(value)

返回一个新的 Promise 对象，该对象以给定的值兑现。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | T \| null | 是 | - | - | 一个兑现的值。 | 


**返回值**
| 类型 |
| :- |
| Promise\<T> | 


::: preview 

>UTS
```uts
      // resolve array
      Promise.resolve([1, 2, 3])
        .then((res) => {
          console.log(res) // [1, 2, 3]
        })

      // resolve string
      Promise.resolve("成功")
        .then((res) => {
          console.log(res) // "成功";
        })

      // resolve null
      Promise.resolve()
        .then((res) => {
          // console.log(res) // null;
        })

      // resolve promise
      const original = Promise.resolve(33)
      const cast = Promise.resolve(original)
      cast.then((res) => {
        console.log(res) // 33;
      })
      // 注：此处飘红是编译器误报，实际可以判等
      console.log(original === cast) // true
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### resolve(value)

返回一个新的 Promise 对象，该对象以给定的值兑现。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | Promise\<T> \| null | 是 | - | - | 一个 Promise。 | 


**返回值**
| 类型 |
| :- |
| Promise\<T> | 


::: preview 

>UTS
```uts
      // resolve array
      Promise.resolve([1, 2, 3])
        .then((res) => {
          console.log(res) // [1, 2, 3]
        })

      // resolve string
      Promise.resolve("成功")
        .then((res) => {
          console.log(res) // "成功";
        })

      // resolve null
      Promise.resolve()
        .then((res) => {
          // console.log(res) // null;
        })

      // resolve promise
      const original = Promise.resolve(33)
      const cast = Promise.resolve(original)
      cast.then((res) => {
        console.log(res) // 33;
      })
      // 注：此处飘红是编译器误报，实际可以判等
      console.log(original === cast) // true
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### reject(value?)

返回一个新的 Promise 对象，该对象以给定的原因拒绝。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | any \| null | 否 | - | - | 一个拒绝的原因。 | 


**返回值**
| 类型 |
| :- |
| Promise\<never> | 


::: preview 

>UTS
```uts
      // reject array
      Promise.reject([1, 2, 3])
        .catch((err) => {
          console.log(err) // [1, 2, 3]
        })

      // reject error
      Promise.reject(new Error("this is reject error message"))
        .catch((err) => {
          console.log((err as Error).message) // "this is reject error message";
        })

      // reject null
      Promise.reject()
        .catch((err) => {
          console.log(err) // null;
        })

      // reject promise
      const original = Promise.reject(33)
      const cast = Promise.reject(original)
      cast.catch((err) => {
        console.log((err as Promise<any>) === original) // true;
      })
      console.log(original === cast) // false
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### all(arr)

接受一个 Promise 可迭代对象作为输入，并返回单个 Promise。返回的 Promise 在所有输入的 Promise 都兑现时（包括传入的可迭代对象为空时）被兑现，其值为一个包含所有兑现值的数组。如果输入的任何 Promise 被拒绝，返回的 Promise 也会被拒绝，并返回第一个拒绝的原因。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arr | Array&lt;Promise&gt;\<Promise\<T>> | 是 | - | - | 一个 Promise 数组。 | 


**返回值**
| 类型 |
| :- |
| Promise\<Array\<T>> | 


::: preview 

>UTS
```uts
      let p0 = new Promise<string>((resolve, reject) => {
        setTimeout(function () {
          resolve("1");
        }, 10);
      })

      let p1 = new Promise<string>((resolve, reject) => {
        setTimeout(function () {
          resolve("2");
        }, 10);
      })

      let p2 = new Promise<string>((resolve, reject) => {
        setTimeout(function () {
          resolve("3");
        }, 10);
      })

      let p3 = new Promise<string>((resolve, reject) => {
        setTimeout(function () {
          let error = new Error("p3 reject reason")
          reject(error);
        }, 10);
      })
      // resolve
      Promise.all([p0, p1, p2])
        .then((res) => {
          console.log(res) // ["1", "2", "3"]
        })

      // reject
      Promise.all([p1, p2, p3])
        .then()
        .catch((error) => {
          console.log(error);
          console.log((error as Error).message) // "p3 reject reason";
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### race(arr)

接受一个 Promise 可迭代对象作为输入，并返回单个 Promise。返回的 Promise 与第一个敲定的 Promise 的最终状态保持一致。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arr | Array&lt;Promise&gt;\<Promise\<T>> | 是 | - | - | 一个 Promise 数组。 | 


**返回值**
| 类型 |
| :- |
| Promise\<T> | 


::: preview 

>UTS
```uts
      let p0 = new Promise<string | null>((resolve, reject) => {
        setTimeout(function () {
          resolve("fast");
        }, 10);
      })

      let p1 = new Promise<string | null>((resolve, reject) => {
        setTimeout(function () {
          resolve("slow");
        }, 15);
      })

      let p2 = new Promise<string | null>((resolve, reject) => {
        setTimeout(function () {
          reject(null)
        }, 12);
      })

      // test for resolve
      Promise.race([p0, p1])
        .then((res) => {
          console.log("test for race resolve ===> ", res);
          console.log(res) // "fast";
        })

      // test for reject 
      Promise.race([p1, p2])
        .then()
        .catch((error) => {
          console.log("test for race reject ===> ", error);
          console.log(error) // null;
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### any(arr)

接受一个 Promise 可迭代对象作为输入，并返回单个 Promise。返回的 Promise 在任何输入的 Promise 兑现时兑现，其值为第一个兑现的值。如果所有输入的 Promise 都被拒绝（包括传入的可迭代对象为空时），返回的 Promise 将以带有一个包含拒绝原因的数组的 AggregateError 拒绝。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arr | Array&lt;Promise&gt;\<Promise\<T>> | 是 | - | - | 一个 Promise 数组。 | 


**返回值**
| 类型 |
| :- |
| Promise\<T> | 


::: preview 

>UTS
```uts
      let p0 = new Promise<string | null>((resolve, reject) => {
        setTimeout(function () {
          resolve("1");
        }, 10);
      })

      let p1 = new Promise<string | null>((resolve, reject) => {
        setTimeout(function () {
          resolve(null);
        }, 15);
      })

      let p2 = new Promise<string | null>((resolve, reject) => {
        setTimeout(function () {
          reject(null)
        }, 10);
      })

      let p3 = new Promise<string | null>((resolve, reject) => {
        setTimeout(function () {
          reject("error");
        }, 12);
      })

      // test for resolve
      Promise.any([p0, p1, p2])
        .then((res) => {
          console.log(res)
          console.log(res) // "1";
        })

      // test for reject
      Promise.any([p2, p3])
        .then()
        .catch(
          (error: any | null) => {
            console.log("test for promise.any error ==> ", error);
            // #ifdef APP-IOS
            console.log((error as UTSPromiseAggregateError).name) // "AggregateError";
            console.log((error as UTSPromiseAggregateError).message) // "All promises were rejected";
            console.log((error as UTSPromiseAggregateError).errors) // [null, "error"];
            // #endif

            // #ifdef APP-ANDROID
            console.log((error as UTSPromiseAggregateError).name) // "AggregateError";
            console.log((error as UTSPromiseAggregateError).message) // "All promises were rejected";
            console.log((error as UTSPromiseAggregateError).errors) // [null, "error"];
            // #endif
          })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |


### allSettled(arr)

接受一个 Promise 可迭代对象作为输入，并返回单个 Promise。返回的 Promise 在所有输入的 Promise 都敲定时兑现（包括传入的可迭代对象为空时），其值为一个描述每个 Promise 结果的对象数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arr | Array&lt;Promise&gt;\<Promise\<T>> | 是 | - | - | 一个 Promise 数组。 | 


**返回值**
| 类型 |
| :- |
| Promise\<Array\<PromiseSettledResult\<T>>> | 


::: preview 

>UTS
```uts
      let p0 = new Promise<string | null>((resolve, reject) => {
        setTimeout(function () {
          resolve("1");
        }, 10);
      })

      let p1 = new Promise<string | null>((resolve, reject) => {
        setTimeout(function () {
          resolve(null);
        }, 10);
      })

      let p2 = new Promise<string | null>((resolve, reject) => {
        setTimeout(function () {
          reject(null)
        }, 10);
      })

      let p3 = new Promise<string | null>((resolve, reject) => {
        setTimeout(function () {
          let error = new Error("p3 reject reason")
          reject(error);
        }, 10);
      })

      Promise.allSettled([p0, p1, p2, p3])
        .then((res) => {
          console.log(res);
          let statusArr: string[] = []
          res.forEach((item, index: number) => {
            statusArr.push(item.status)
          })
          console.log(statusArr) // ["fulfilled", "fulfilled", "rejected", "rejected"]
        })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 3.9 | 4.31 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | 4.31 | √ |



### 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.buildInObject.Promise)

## Bug & Tips@tips

* 目前 Promise 类型编译到 kotlin 为 io.dcloud.uts.UTSPromise
* 自 HBuilder X 4.31 版本起支持编译到 swift。在 swift 中编译为 UTSPromise。在uvue里因为iOS默认js驱动所以可以使用Promise，没有 4.31 版本的限制。

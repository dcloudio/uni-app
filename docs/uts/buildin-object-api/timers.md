# Timers

## 全局方法

### setInterval(handler, timeout?, ...arguments)

setInterval() 方法重复调用一个函数或执行一个代码片段，在每次调用之间具有固定的时间间隔。<br/>     它返回一个 interval ID，该 ID 唯一地标识时间间隔，因此你可以稍后通过调用 clearInterval() 来移除定时器。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| handler | string \| Function | 是 | - | - | - |
| timeout | number | 否 | - | - | - |
| arguments | any[\] | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| number | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | - | 3.90 | 4.11 | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | 3.90 | - |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.timerMethods.setInterval)

### setTimeout(handler, timeout?, ...arguments)

全局的 setTimeout() 方法设置一个定时器，一旦定时器到期，就会执行一个函数或指定的代码片段。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| handler | string \| Function | 是 | - | - | - |
| timeout | number | 否 | - | - | - |
| arguments | any[\] | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| number | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | - | 3.90 | 4.11 | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | 3.90 | - |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.timerMethods.setTimeout)

### clearInterval(id)

clearInterval() 方法可取消先前通过 setInterval() 设置的重复定时任务。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number \| undefined | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | 3.90 | √ |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.timerMethods.clearInterval)

### clearTimeout(id)

clearTimeout() 方法取消了先前通过调用setTimeout()建立的定时器

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number \| undefined | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | 3.90 | √ |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.timerMethods.clearTimeout)

示例代码

```html
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      timerSetTimeout() {
        // 定义 setTimeout 返回值
        let timerID = 0;

        // 启动 setTimeout 并更新 timerID
        timerID = setTimeout(() => {
          // 执行一次
          console.log('setTimeout', timerID);
        }, 1000)

        // 取消
        // clearTimeout(timerID)
      },
      timerSetInterval() {
        // 定义 setInterval 返回值
        let timerID = 0;

        // 启动 setInterval 并更新 timerID
        timerID = setInterval(() => {
          // 周期执行 (1000毫秒)
          console.log('setInterval', timerID);

          // 取消
          clearInterval(timerID)
        }, 1000)
      }
    }
  }
</script>
```

### Android平台差异

需要注意：JS环境中只有一个线程，所以 `setTimeout/setInterval` 执行任务代码的线程和 调用 setTimeout/setInterval 总是同一个线程。

但是Android平台需要分两种情况：

+ 如果在主线程/dom 线程 等具备`Looper` 环境的线程调用`setTimeout/setInterval`： 那么可以确保 任务代码执行的线程 和调用setTimeout/setInterval的线程 是同一个线程。

+ 如果在匿名线程等 不具备 `Looper` 环境的线程中调用`setTimeout/setInterval`： 任务代码不会和 调用setTimeout/setInterval的线程 保持同一线程。


关于 `Android`系统`Looper`的[更多介绍](https://developer.android.com/reference/android/os/Looper)



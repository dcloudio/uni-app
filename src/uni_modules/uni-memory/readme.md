## 使用说明

### uni.onMemoryWarning(CALLBACK)

监听内存不足告警事件，当系统应用进程发出内存警告时，触发该事件。

Android 下有告警等级划分，iOS 无等级划分。

CALLBACK返回参数：

|参数名	|类型		|说明																						|
|:-:		|:-:		|:-:																						|
|level	|Number	|仅 Android 有该字段，对应系统内存告警等级宏定义|

level 的合法值：

|值	|对应的Android告警值					|说明																																															|
|:-:|:-:													|:-:																																															|
|5	|TRIM_MEMORY_RUNNING_MODERATE	|进程在后台LRU列表的中间；释放内存可以帮助系统保持列表中稍后运行的其他进程，以获得更好的整体性能。|
|10	|TRIM_MEMORY_RUNNING_LOW			|该进程不是可消耗的后台进程，但设备内存不足																												|
|15	|TRIM_MEMORY_RUNNING_CRITICAL	|该进程不是可消耗的后台进程，但设备运行的内存极低，即将无法保持任何后台进程运行。									|

另外Android App还会返回如下值：

20：TRIM_MEMORY_UI_HIDDEN
40：TRIM_MEMORY_BACKGROUND
60：TRIM_MEMORY_MODERATE
80：TRIM_MEMORY_COMPLETE

5/10/15 是“前台运行中，系统内存压力越来越大”
20/40/60/80 是“应用已不在前台，系统要求你逐步更积极地释放资源”

示例：

```js
const callback = function (res) {
 console.log(res,'onMemoryWarningReceive');
}
uni.onMemoryWarning(callback);
```

### uni.offMemoryWarning(CALLBACK)

取消监听内存不足告警事件。

onMemoryWarning 传入的监听函数。不传此参数则移除所有监听函数。

示例：
```js
const callback = function (res) {
 console.log(res);
}
uni.onMemoryWarning(callback);
// 和 onMemoryWarning 传入同一个函数即可
uni.offMemoryWarning(callback);
```
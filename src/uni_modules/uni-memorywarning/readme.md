## 使用说明

### uni.onMemoryWarning(CALLBACK)

监听内存不足告警事件，当系统应用进程发出内存警告时，触发该事件。

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/memory.html#onmemorywarning](https://uniapp.dcloud.net.cn/api/system/memory.html#onmemorywarning)

**注意平台差异：仅Android平台有返回值，iOS平台无返回值**


### uni.offMemoryWarning(CALLBACK)

取消监听内存不足告警事件。

onMemoryWarning 传入的监听函数。不传此参数则移除所有监听函数。

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/memory.html#offmemorywarning](https://uniapp.dcloud.net.cn/api/system/memory.html#offmemorywarning)


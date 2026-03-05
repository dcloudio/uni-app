# Worker

现代CPU都是多核的。主线程的代码是运行在CPU的主核上的。可以通过 worker api来利用其他核并行计算，加快运算速度。

uni-app x的代码，默认都是在主线程执行的，主线程也称为UI线程。

当需要使用子线程能力时，可以通过本API操作。

当然本API只是一种跨端封装，并且为了跨端还约束了一些写法。开发者也可以在uts插件中自行使用纯原生代码来操作线程。

注意：
- 所有UI操作、界面绘制，都必须在主线程进行。也就是子线程不能操作DOM API、不能操作绑定在界面上的响应式变量。
- Android上通过surface渲染的界面组件，可以在子线程操作。
- 线程之间通信，可以post消息，也可以共享变量。web和小程序仅支持shareArrayBuffer数据类型的共享。App平台没有限制，引用类型都可以共享变量。但共享变量时，需要开发者注意线程安全问题，避免多线程同时写同一个变量，或一个线程读、同时另一个线程在写同一个变量，这可能引发崩溃。
- 线程和Android的协程是不同的。Android上request api内部已经使用了协程。
- CPU的核数有限，不要同时开太多线程。

常见场景：
- 当你的界面掉帧时，应该检查是什么耗时任务导致不能及时渲染，是否可以剥离一些计算任务到子线程来做。
- 多份大数据需要尽快处理，比如多个json文件需要压缩，可以启动多线程。


<!-- ## uni.createWorker(url) @createworker -->

::: sourceCode
## uni.createWorker(url) @createworker

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-createWorker


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-createWorker

:::

创建一个Worker对象

### createWorker 兼容性 
| Web | 微信小程序 | Android | Android uni-app x UTS 插件 | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS uni-app x UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- |
| 4.81 | 4.41 | 4.81 | 4.81 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.81 | 4.81 | 4.81 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | Worker脚本的URL | 


### 返回值 

| 类型 |
| :- |
| [Worker](#worker-values) |

#### Worker 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| env | **WorkerEnv** | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: x; HarmonyOS: - | worker内的环境变量<br/> |

##### env 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| USER_DATA_PATH | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: x; HarmonyOS: - | 文件系统中的用户目录路径 (本地路径)<br/> |
#### Worker 的方法 @worker-values 

#### onMessage(callback: WorkerOnMessageCallback): void; @onmessage
onMessage
监听主线程/Worker 线程向当前线程发送的消息的事件。
##### onMessage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | - | x | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (message: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - |  | 


#### onError(callback: WorkerOnErrorCallback): void; @onerror
onError
监听 Worker 线程错误事件。当 Worker 线程中发生脚本错误时会触发此事件。
##### onError 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | - | x | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [WorkerOnErrorCallbackResult](#workeronerrorcallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - |  | 

##### WorkerOnErrorCallbackResult 的属性值 @workeronerrorcallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 5000501 | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | worker 运行错误 |
| 5000502 | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | worker 序列化失败 |
| 5000503 | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | worker 实例未运行 |
| 5000504 | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | worker 线程中不支持调用的API。 |
| 5000505 | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | worker 线程初始化失败 |
| 5000506 | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | worker 文件路径无效 |
| 5000510 | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 非主线程调用worker API |
| 5000511 | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | worker 线程无效 |


#### postMessage(message: any, options?: WorkerPostMessageOptions \| null): void; @postmessage
postMessage
向主线程/Worker 线程发送的消息。
##### postMessage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | - | x | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| message | any | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - |  |
| options | **WorkerPostMessageOptions** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| harmonySendable | boolean | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 是否支持符合Sendable协议的对象作为共享变量发送，使用postMessageWithSharedSendable实现，默认值为false<br/>仅鸿蒙平台支持，参考：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-sendable<br/> |
| transfer | Array&lt;any&gt; | 否 | - | Web: 4.81; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 可转移对象数组，默认值为空数组<br/>仅鸿蒙、web平台支持，参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects<br/> | 


#### terminate(): void; @terminate
terminate
结束当前 Worker 线程。仅限在主线程 worker 对象上调用。
##### terminate 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | - | x | - |


 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/create-worker/create-worker.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/create-worker/create-worker.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/create-worker/create-worker

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/create-worker/create-worker

>示例
```vue
<template>
  <scroll-view class="container">
    <view class="status-section">
      <text class="status-label">Worker状态: </text>
      <text class="status-text">{{statusText}}</text>
    </view>

    <view class="button-group">
      <text class="description-text">操作步骤：1.创建Worker 2.添加消息监听 3.发送数据测试</text>
      <button class="btn" type="primary" :disabled="created_boolean" @click="create">创建Worker</button>
      <button class="btn" type="primary" @click="onWorkerMsg">添加消息监听</button>
      <button class="btn" type="primary" @click="onWorkerError">添加错误监听</button>
      <button class="btn" @click="destory" :disabled="workerStatus != 'created'">销毁Worker</button>
    </view>

    <view class="input-section">
      <text class="section-title">输入测试值:</text>
      <text class="description-text">点击发送按钮后，会将输入值传给WorkerTask，在子线程执行+1操作后返回结果</text>
      <input class="input-field" v-model="inputValue" type="number" placeholder="请输入数字" />
      <button class="btn" type="primary" @click="sendMessage" :disabled="workerStatus != 'created'">发送到WorkerTask (值+1)</button>
    </view>

    <view class="log-section">
      <text class="section-title">通信日志:</text>
      <scroll-view class="log-container">
        <view v-for="(log, index) in logs" :key="index" class="log-item">
          <text :class="['log-text', log.type]">{{log.message}}</text>
        </view>
      </scroll-view>
      <button @click="clearLogs" class="btn clear-btn">清空日志</button>
    </view>

    <!-- #ifdef APP-HARMONY || WEB -->
    <view class="uni-btn-v">
      <navigator url="/pages/API/create-worker/worker-sendable-transfer">
        <button type="primary">worker sendable transfer 示例</button>
      </navigator>
    </view>
    <!-- #endif -->
  </scroll-view>
</template>

<script setup lang="uts">
  type TaskResultType = {
    value: string
  }

  const created_boolean = ref<boolean>(false)
  const workerStatus = ref<string>('none') // none, created, destroyed
  const isListening = ref<boolean>(false)
  const logs = ref<Array<UTSJSONObject>>([])
  const inputValue = ref<string>('1') // 默认值为1
  const taskResult = reactive({ value: '' } as TaskResultType)
  const worker = ref<Worker | null>(null)

  const statusText = computed(() : string => {
    switch (workerStatus.value) {
      case 'none': return '未创建';
      case 'created': return '已创建';
      case 'destroyed': return '已销毁';
      default: return '未知';
    }
  })

  // 添加日志方法
  function addLog(message : string, type : string = 'info') {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const logItem = {
      message: `[${timeStr}] ${message}`,
      type: type,
      time: timeStr
    } as UTSJSONObject;
    logs.value.unshift(logItem);
    // 限制日志数量
    if (logs.value.length > 50) {
      logs.value = logs.value.slice(0, 50);
    }
  }

  // 创建Worker
  const create = () => {
    worker.value = uni.createWorker('workers/helloWorkerTask.uts');
    workerStatus.value = 'created';
    addLog('Worker创建成功', 'success');
    created_boolean.value = true;
  }

  const onWorkerMsg = () => {
    if (worker.value == null) {
      addLog('请先创建worker', 'warning');
      return;
    }
    worker.value!.onMessage((result) => {
      // 处理Worker返回的消息
      console.log(`收到Worker消息:`, result);
      const res = result as UTSJSONObject;
      const resultData = res['data'] as string;
      taskResult.value = resultData;
      inputValue.value = taskResult.value
      addLog(`收到WorkerTask返回: ${resultData}`, 'receive');
    })
  }

  const onWorkerError = () => {
    if (worker.value == null) {
      addLog('请先创建worker', 'warning');
      return;
    }
    worker.value!.onError((error) => {
      console.error('Worker发生错误:', error);
      // addLog(`Worker错误: ${error.message}`, 'error');
    })
  }

  // 向workerTask发送消息
  const sendMessage = () => {
    // 检查输入值
    if (inputValue.value == '') {
      addLog('请输入有效的数字', 'warning');
      return;
    }
    const options = {
      data: inputValue.value,
      needReply: true
    };
    worker.value!.postMessage(options, null);
    addLog(`发送值到WorkerTask: ${inputValue.value}`, 'send');
  }

  // 销毁Worker
  const destory = () => {
    if (worker.value == null) {
      addLog('没有创建worker,无法销毁', 'warning');
      return;
    }
    worker.value!.terminate();
    workerStatus.value = 'destroyed';
    isListening.value = false;
    addLog('Worker已销毁', 'warning');
    created_boolean.value = false;
  }

  // 清空日志
  const clearLogs = () => {
    logs.value = [];
  }

  const test_resetInputValue = () => {
    inputValue.value = '1'
  }

  onUnmounted(() => {
    destory();
  })

  defineExpose({
    taskResult,
    test_resetInputValue,
    create,
    onWorkerMsg,
    sendMessage
  })
</script>

<style>
  .container {
    flex: 1;
    padding: 10px;
  }

  .status-section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .status-label {
    font-size: 16px;
    color: #666666;
  }

  .status-text {
    font-size: 16px;
    font-weight: bold;
    margin-left: 8px;
  }


  .button-group {
    flex-direction: column;
    margin-bottom: 10px;
  }

  .input-section {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .input-field {
    /* #ifdef MP-WEIXIN */
    height: 3em;
    /* #endif */
    width: 100%;
    padding: 12px;
    border: 1px solid #dddddd;
    border-radius: 6px;
    font-size: 16px;
    margin: 10px 0;
    background-color: #ffffff;
  }

  .btn {
    /*  height: 50px; */
    margin-bottom: 10px;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 14px;
    text-align: center;
  }

  .log-section {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 15px;
  }

  .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 10px;
  }

  .log-container {
    height: 300px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
    background-color: #fafafa;
  }

  .log-item {
    margin-bottom: 5px;
  }

  .log-text {
    font-size: 12px;
    line-height: 1.4;
  }

  .log-text.info {
    color: #2196F3;
  }

  .log-text.success {
    color: #4CAF50;
  }

  .log-text.warning {
    color: #ff9800;
  }

  .log-text.error {
    color: #f44336;
  }

  .log-text.send {
    color: #9C27B0;
  }

  .log-text.receive {
    color: #009688;
  }

  .clear-btn {
    background-color: #ff9800;
    font-size: 12px;
    padding: 8px 12px;
    color: #ffffff;
    border-radius: 4px;
    text-align: center;
  }

  .description-text {
    font-size: 14px;
    color: #666666;
    line-height: 1.4;
    margin-bottom: 10px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.worker.createWorker)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/worker/Worker.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createWorker&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createWorker&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createWorker&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createWorker&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createWorker)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createWorker&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |



## Worker 使用流程 @tutorial

### 1. 配置 Worker 信息

worker 代码，是独立的 `uts` 文件，所有worker代码文件需要放置在专门的目录。在项目的 `manifest.json` 中可配置 Worker 文件放置的目录：
```json
{
  //...
  "workers": {
    "path": "workers",        // 相对于项目根目录。此配置的意思是在项目根目录下的workers目录下存放worker代码。
    "isSubpackage": true      // 是否分包，默认为 false（仅微信小程序有效）
  }
}
```

如果不使用微信小程序的分包配置，也可以使用简写配置：
```json
{
  //...
  "workers" : "workers"
}
```


### 2. 添加 Worker 代码文件

参考上一步的配置，在项目根目录下创建 `workers` 目录，并创建示例 `HelloWorkerTask.uts` 文件如下：

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
├─ static
├─ workers                    // Worker 目录
│  └─ HelloWorkerTask.uts     // Worker 代码文件
├─ App.uvue
├─ main.uts
├─ manifest.json
└─ pages.json
</code>
</pre>


### 3. 编写 Worker 代码

Worker 代码中需定义一个类并继承自基类 `WorkerTaskImpl`，重写 `onMessage` 方法接收主线程发送的数据。

以下是 `HelloWorkerTask.uts` 示例代码：
```uts
/**
 * HelloWorkerTask
 */
export class HelloWorkerTask extends WorkerTaskImpl {
  /**
   * 构造函数
   */
  constructor() {
    super();
    //初始化操作
    // console.log("构造器初始化");
  }

  /**
   * 实现入口函数
   */
  override entry() {
    //入口函数，Worker 启动时执行
    // console.log("启动完成，等待主线程消息");
  }

  /**
   * 实现接收主线程发送的消息
   */
  override onMessage(message : any) {
    // 处理消息对象
    const messageData = message as UTSJSONObject;

    // console.log('收到主线程数据:', messageData);

    // 发送消息给主线程
    this.postMessageToMain();
  }

  /**
   * 回复消息
   */
  private postMessageToMain() {
    const response = {
      msg: 'message send by worker!'
    };

    // 调用 postMessage 发送消息给主线程
    this.postMessage(response);
  }
}
```

其中 `WorkerTaskImpl` 基类定义如下：
```uts
/**
 * WorkerTaskImpl
 */
export class WorkerTaskImpl {
  /**
   * 入口函数
   * 可重写修改
   */
  override entry():void;
  /**
   * 接收主线程发送的消息
   * 可重写修改
   */
  override onMessage(message: any): void;

  /**
   * 向主线程发送消息
   */
  postMessage(message: any, options: WorkerPostMessageOptions|null = null): void;
}

/**
 * WorkerPostMessageOptions
 */
export type WorkerPostMessageOptions = {
  /**
   * 是否支持符合Sendable协议的对象作为共享变量发送，使用postMessageWithSharedSendable实现，默认值为false
   * 仅鸿蒙平台支持，参考：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-sendable
   */
  harmonySendable: boolean
  /**
   * 可转移对象数组，默认值为空数组
   * 仅鸿蒙、web平台支持，参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects
   */
  transfer: Array<any>
}
```


### 4. 主线程中创建 Worker

在主线程的代码中调用 `uni.createWorker` 创建并返回 Worker 对象，可通过其 `onMessage` 方法监听 Worker 子线程发送的数据，通过其 `onError` 方法监听 Worker 子线程的错误。

参考以下示例代码：

```uts
// 创建 Worker 实例
const worker = uni.createWorker('workers/HelloWorkerTask.uts');

// 监听 Worker 消息
worker.onMessage((message: any) => {
  const messageData = message as UTSJSONObject;

  console.log('收到Worker子线程数据:', messageData);
});

// 监听 Worker 错误
worker.onError((error: WorkerOnErrorCallbackResult) => {
  console.error('Worker子线程发生错误:', error);
});
```


### 5. 主线程向 Worker 发送消息

调用 `uni.createWorker` 创建并返回 Worker 对象的 `postMessage` 方法向 Worker 子线程发送数据。

参考以下示例代码：
```uts
// 向 Worker 子线程发送消息
worker.postMessage({
  msg: 'message send by main!'
});
```

### 6. harmonySendable 和 transfer 的使用

仅 `HarmonyOS` 和 `Web` 支持 示例：[worker Sendable Transfer](https://gitcode.com/dcloud/hello-uni-app-x/blob/1f8ad2f89a765e49c447c66802999f89e81bd9d6/pages/API/create-worker/worker-sendable-transfer.uvue)

#### harmonySendable

> 仅 HarmonyOS 支持。示例：[uts-worker-sendable-transfer](https://gitcode.com/dcloud/hello-uni-app-x/blob/1f8ad2f89a765e49c447c66802999f89e81bd9d6/uni_modules/uts-worker-sendable-transfer/utssdk/index.uts)

- 在 uts 插件的同级建立 ets 文件，导出 `Sendable` 对象 [示例](https://gitcode.com/dcloud/hello-uni-app-x/blob/1f8ad2f89a765e49c447c66802999f89e81bd9d6/uni_modules/uts-worker-sendable-transfer/utssdk/sendable.ets)
  ```ts
  @Sendable
  export class SendableObject {
    a: number = 45;
  }
  ```

- 在 uts 插件中引入 **注意引入时要有 `.ets` 后缀** [示例](https://gitcode.com/dcloud/hello-uni-app-x/blob/1f8ad2f89a765e49c447c66802999f89e81bd9d6/uni_modules/uts-worker-sendable-transfer/utssdk/index.uts#L3)
  ```uts
  // #ifdef APP-HARMONY
  import { SendableObject } from './sendable.ets';
  // #endif
  ```

- 在 uts 插件中使用，向子线程发送 Sendable 对象 [示例](https://gitcode.com/dcloud/hello-uni-app-x/blob/1f8ad2f89a765e49c447c66802999f89e81bd9d6/uni_modules/uts-worker-sendable-transfer/utssdk/index.uts#L41)
  ```uts
  workerImp.postMessage(new SendableObject())
  ```

- 在 worker 中接收到该对象后的修改会直接体现到宿主线程中
  -  [Sendable 的修改](https://gitcode.com/dcloud/hello-uni-app-x/blob/1f8ad2f89a765e49c447c66802999f89e81bd9d6/workers/sendableTransferWorker.uts#L20)
  -   [Sendable 修改后在宿主线程的体现](https://gitcode.com/dcloud/hello-uni-app-x/blob/898db493f689b96ea6c53ab44b56e109edbe76af/pages/API/create-worker/worker-sendable-transfer.uvue#L88)

#### transfer

> 一个可转移对象数组。示例：[worker Sendable Transfer](https://gitcode.com/dcloud/hello-uni-app-x/blob/1f8ad2f89a765e49c447c66802999f89e81bd9d6/pages/API/create-worker/worker-sendable-transfer.uvue#L101)

- Web 支持 `ArrayBuffer[]、MessagePort[]、ImageBitmap[]` 等。 [可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects)
- HarmonyOS 仅支持 `ArrayBuffer[]`

::: warning 注意事项
- HarmonyOS 平台上使用 `transfer` 后，转移的 ArrayBuffer 长度不会改变，数组本身变为在宿主线程不可用。[鸿蒙文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-worker#postmessagewithsharedsendable12)
- Web 平台使用 `transfer` 后，转移的数组长度会变为 0。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/postMessage#%E8%BD%AC%E7%A7%BB%E7%A4%BA%E4%BE%8B)
:::

### 7. 结束 Worker

Worker 线程不再使用需主动结束释放相关资源，调用 Worker 对象的 `terminate` 方法结束子线程。

参考以下示例代码：
```uts
// 结束 Worker 子线程
worker.terminate();
```

## Tips
- `uni.createWorker` 仅支持在主线程中使用，在 Worker 子线程中使用会返回错误
- 各平台在 Worker 中使用全局变量或静态属性在内存管理中存在差异，Android/iOS平台可以共享内存，其它平台不能共享，为了避免这些差异带来的影响建议不要使用全局变量和静态属性
- Worker 子线程间暂不支持直接互相通讯，如要通讯可通过主线程中转发送消息来实现
- Android/iOS平台主线程与 Worker 线程传输的引用类型数据是直接共享使用（其它平台是默认为复制），需避免并发访问，暂未提供线程间安全访问机制，需通过业务逻辑控制避免并发访问这些共享的数据
- 鸿蒙平台主线程与 Worker 线程传输的数据默认为浅拷贝，如需传出共享对象，可在[uts插件](../plugin/uts-plugin.md)中混编开发定义[Sendable对象](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-sendable)，调用 `Worker.postMessage` 发送这些共享对象时设置 `harmonySendable` 参数为 true
- iOS平台 Worker 仅支持在[uts插件](../plugin/uts-plugin.md)中使用，不能直接在 `uvue` 页面中调用 `uni.createWorker`
- Worker 中仅支持调用界面无关的API（如 uni.request、uni.getLocation 等），这些 API 触发的回调运行在 Workder 线程中
- Web 平台不支持在 worker 中调用 uni 上的 API

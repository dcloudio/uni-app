# 云函数请求中的中间状态通知通道

> 新增于HBuilderX 4.71

云函数在执行长时间任务时客户端无法获取云端任务执行状态，用户无法确定云函数是否还在正常执行，有些用户可能直接放弃等待刷新页面重新执行，从而导致浪费了更多的云函数资源。因此在此场景下需要一个云函数通知客户端发送执行状态或中间结果的通道。

在常规web开发时通过云端向响应流多次写入数据的方式来实现，但是云函数不支持这种用法，因此我们基于uni-push实现了这个替代方案。

使用此功能前需要先开通uni-push 2.0，参考文档：[uni-push 2.0](https://uniapp.dcloud.net.cn/unipush-v2.html)。uni-app-x项目使用SSEChannel需要自行配置uni-push模块到manifest.json内，且开发期间需要打包自定义基座进行测试。

但是，在uni-app x中使用AI大模型流式返回数据时，持续保持云函数活跃会产生更多的费用。为此 uni-ai x，支持了云端返回临时token，由客户端直连LLM。除了节省费用，uni-ai x还提供了完整的客户端开源代码。[详见](https://ext.dcloud.net.cn/plugin?name=uni-ai-x)

## 客户端api

### SSEChannel(options) @ssechannel

<!-- UTSUNICLOUDAPIJSON.SSEChannel.description -->

<!-- UTSUNICLOUDAPIJSON.SSEChannel.compatibility -->

<!-- UTSUNICLOUDAPIJSON.SSEChannel.param -->

<!-- UTSUNICLOUDAPIJSON.SSEChannel.returnValue -->

<!-- UTSUNICLOUDAPIJSON.SSEChannel.tutorial -->


### 客户端代码示例

```javascript
async function receiveMessage() {
  const sseChannel = new uniCloud.SSEChannel()
  sseChannel.on('message', (message?: any | null) => {
    console.log('message: ' + (message as string)) // message可能是任意类型，需要自行as为实际类型再使用
  })
  sseChannel.on('end', (message?: any | null) => {
    console.log('end: ' + message) // message可能是任意类型，需要自行as为实际类型再使用。此处在云端end事件返回了null。目标语言是js时可能会返回undefined
  })
  sseChannel.on('open', () => {
    console.log('sseChannel open')
  })
  sseChannel.on('close', () => {
    console.log('sseChannel close')
  })
  sseChannel.on('error', (error: UniCloudError) => {
    console.log('sseChannel error: ' + error.message)
  })
  await sseChannel.open() // 必须await通道开启，才可以将sseChannel传入云函数
  const res = await uniCloud.callFunction({
    name: 'sse',
    data: {
      sseChannel
    }
  })
  console.log(res)
}
```

## 云函数api

### 反序列化消息通道@cloud-deserialize-channel

将客户端传入的sseChannel反序列化为SSEChannel对象，用于发送消息。

```javascript
uniCloud.deserializeSSEChannel(sseChannelObj: string): SSEChannel
```

### sseChannel.write

向客户端发送消息。

```javascript
sseChannel.write(message: any): Promise<void>
```

### sseChannel.end

结束消息通道。

```javascript
sseChannel.end(message: any): Promise<void>
```

### 云函数代码示例

```javascript
'use strict';
exports.main = async (event, context) => {
  const sseChannelObj = event.sseChannel
  const sseChannel = uniCloud.deserializeSSEChannel(sseChannelObj)
  return new Promise(async (resolve, reject) => {
    await sseChannel.write('message1')
    await sseChannel.write('message2')
    setTimeout(async () => {
      await sseChannel.end()
      resolve({
        errCode: 0
      })
    }, 300)
  })
};
```
### requestAnimationFrame(callback)@requestanimationframe

在下一次重绘之前，调用用户提供的回调函数

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (task: number) => void | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| number | 


<!-- UTSJSON.Global.requestAnimationFrame.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.25 | 4.25 | 4.61 | 4.25 | x | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | - |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.requestAnimationFrame)

### cancelAnimationFrame(taskId) @cancelanimationframe

取消一个先前通过调用 requestAnimationFrame() 方法添加到计划中的动画帧请求

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| taskId | number | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.Global.cancelAnimationFrame.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.25 | 4.25 | 4.61 | 4.25 | x | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | - |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.cancelAnimationFrame)

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/animation-frame/animation-frame.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/animation-frame/animation-frame.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/animation-frame/animation-frame

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/animation-frame/animation-frame

>示例
```vue
<template>
  <view class="page">
    <page-head :title="data.title"></page-head>
    <button @click="startRequestAnimationFrame">requestAnimationFrame</button>
    <button @click="stopRequestAnimationFrame">cancelAnimationFrame</button>
    <text class="frame-count">FPS: {{data.FPSString}}</text>
    <text class="frame-count">FrameCount: {{data.testFrameCount}}</text>
    <text class="tips">提示: 在当前测试例子中，每增加一次调用 requestAnimationFrame 帧率翻倍，cancelAnimationFrame 后恢复</text>
  </view>
</template>

<script setup lang="uts">
  type DataType = {
    title: string;
    taskId: number;
    FPSString: string;
    lastTime: number;
    frameCount: number;
    testFrameCount: number;
  }

  const data = reactive({
    title: 'AnimationFrame',
    taskId: 0,
    FPSString: '- / -ms',
    lastTime: 0,
    frameCount: 0,
    testFrameCount: 0
  } as DataType)

  const updateFPS = (timestamp : number) => {
    data.frameCount++
    if (timestamp - data.lastTime >= 1000) {
      const timeOfFrame = (1000 / data.frameCount)
      data.FPSString = `${data.frameCount} / ${timeOfFrame.toFixed(3)}ms`
      data.frameCount = 0
      data.lastTime = timestamp
    }
  }

  type StartRequestAnimationFrameType = () => void
  let startRequestAnimationFrame: StartRequestAnimationFrameType = () => {}
  startRequestAnimationFrame = () => {
    data.taskId = requestAnimationFrame((timestamp : number) => {
      updateFPS(timestamp)
      data.testFrameCount++
      startRequestAnimationFrame()
    })
  }

  const stopRequestAnimationFrame = () => {
    cancelAnimationFrame(data.taskId)
    data.lastTime = 0
    data.frameCount = 0
    data.FPSString = '- / -ms'
  }

  onUnload(() => {
    if (data.taskId > 0) {
      stopRequestAnimationFrame()
    }
  })

  defineExpose({
    data,
    startRequestAnimationFrame,
    stopRequestAnimationFrame
  })
</script>

<style>
  .page {
    padding: 15px;
  }

  .frame-count {
    margin-top: 15px;
  }

  .tips {
    font-size: 12px;
    margin-top: 30px;
    opacity: 0.7;
  }
</style>

```

:::

**提示**
- requestAnimationFrame/cancelAnimationFrame 为全局 API，如果需要跨平台处理 canvas 动画应使用 [uni.createCanvasContextAsync](./create-canvas-context-async.md)
- `Android uni-app x` requestAnimationframe 目前仅支持有参数callback，示例：`requestAnimationFrame((timestamp : number) => {})`

### requestAnimationFrame(callback)@requestanimationframe

在下一次重绘之前，调用用户提供的回调函数

**参数**
| 名称 | 类型 | 必填 |
| :- | :- | :- |
| callback | (timestamp: number) => void | 是 | 


**返回值**
| 类型 |
| :- |
| number | 


<!-- UTSJSON.Global.requestAnimationFrame.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| Web | Android | iOS | HarmonyOS | iOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- |
| 4.0 | 4.25 | 4.25 | 4.61 | x |


**uni-app 兼容性 <Help />**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | x |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.requestAnimationFrame)

### cancelAnimationFrame(taskId) @cancelanimationframe

取消一个先前通过调用 requestAnimationFrame() 方法添加到计划中的动画帧请求

**参数**
| 名称 | 类型 | 必填 |
| :- | :- | :- |
| taskId | number | 是 | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.Global.cancelAnimationFrame.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| Web | Android | iOS | HarmonyOS | iOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- |
| 4.0 | 4.25 | 4.25 | 4.61 | x |


**uni-app 兼容性 <Help />**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | x |



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
    <text class="tips">提示: 重复点击会忽略重复启动，避免创建多个并行的 requestAnimationFrame 循环</text>
  </view>
</template>

<script setup lang="uts">
  type DataType = {
    title: string;
    taskId: number;
    isRunning: boolean;
    FPSString: string;
    lastTime: number;
    frameCount: number;
    testFrameCount: number;
  }

  const initialData: DataType = {
    title: 'AnimationFrame',
    taskId: 0,
    isRunning: false,
    FPSString: '- / -ms',
    lastTime: 0,
    frameCount: 0,
    testFrameCount: 0
  }

  const data = reactive<DataType>(initialData)

  const updateFPS = (timestamp : number) => {
    data.frameCount++
    if (timestamp - data.lastTime >= 1000) {
      const timeOfFrame = (1000 / data.frameCount)
      data.FPSString = `${data.frameCount} / ${timeOfFrame.toFixed(3)}ms`
      data.frameCount = 0
      data.lastTime = timestamp
    }
  }

  type RunAnimationFrameType = (timestamp : number) => void
  let runAnimationFrame: RunAnimationFrameType = (timestamp : number) => {}
  runAnimationFrame = (timestamp : number) => {
    if (!data.isRunning) {
      return
    }
    updateFPS(timestamp)
    data.testFrameCount++
    data.taskId = requestAnimationFrame(runAnimationFrame)
  }

  type StartRequestAnimationFrameType = () => void
  let startRequestAnimationFrame: StartRequestAnimationFrameType = () => {}
  startRequestAnimationFrame = () => {
    if (data.isRunning) {
      return
    }
    data.isRunning = true
    data.taskId = requestAnimationFrame(runAnimationFrame)
  }

  const stopRequestAnimationFrame = () => {
    if (data.taskId > 0) {
      cancelAnimationFrame(data.taskId)
    }
    data.taskId = 0
    data.isRunning = false
    data.lastTime = 0
    data.frameCount = 0
    data.testFrameCount = 0
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

## 高刷专题@High-refresh-rate

早期手机的刷新率为60Hz，后来陆续出现90Hz、120Hz、144Hz等更高刷新率。

更高的刷新率意味着UI更丝滑，但也更费电。

60Hz的刷新率是16.6ms绘制一帧图像，而120高刷是8.3ms绘制一帧。

如何在流畅和节电之间取舍，是手机系统厂商、app开发者、最终用户的3方平衡，在不同手机系统中的表现也不相同。

通用的规则有：
1. 手机进入节能模式时，会关闭高刷
2. 部分手机提供给用户手动开启/关闭高刷的设置
3. 除非在节能模式下，否则应用在滚动时会自动开启高刷，这点无需应用申请
4. 某些动画、帧回调API，需要应用开发者主动申请高刷。但手机厂商仍然会选择性允许，这种选择规则各厂商不同且大多不公开，可能存在包名白名单。而如果应用不申请，则这些API无法获取到高刷的细腻体验。

具体到uni-app x的情况：
- iOS平台，从HBuilderX 5.21+，requestAnimationFrame 接口支持申请高刷新率。css动画和UniElement.animate动画一直支持高刷。web-view组件，被iOS强制限制在60Hz，网页内无法体验高刷。
- 安卓和鸿蒙平台，从HBuilderX 5.22+，requestAnimationFrame 以及 CSS 动画和UniElement.animate动画支持申请高刷。
- 暂未提供关闭申请高刷的设置

注意无论哪个平台，最终高刷是否生效仍受手机系统策略以及用户设置影响。


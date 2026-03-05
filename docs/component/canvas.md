<!-- ## canvas -->

::: sourceCode
## canvas

> GitCode: https://gitcode.com/dcloud/uni-component/tree/alpha/uni_modules/uni-canvas


> GitHub: https://github.com/dcloudio/uni-component/tree/alpha/uni_modules/uni-canvas

:::

> 组件类型：[UniCanvasElement](/api/dom/unicanvaselement.md) 

 画布


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.21 | 4.41 | 4.25 | 4.25 | 4.61 | 5.0 |


App平台4.25之前没有完整的canvas组件，但提供了`DrawableContext`。
* 截图或海报需求，无需像webview那样通过canvas中转，app平台view直接提供截图API，[takesnapshot](../dom/unielement.html#takesnapshot)。

在绘制形状、文字、图片方面，uni-app x有2种解决方案：`canvas组件`和 [DOM的DrawableContext API](../dom/drawablecontext.md)

它们的区别是：
1. canvas组件的语法是W3C标准语法；DrawableContext是对原生view的绘制API的封装，语法尽可能靠齐W3C规范，但不相同。
2. canvas组件全平台支持，而DrawableContext仅app支持
3. canvas组件是一个独立组件，而DrawableContext是对现有的view组件进行绘制
4. DrawableContext在iOS上绘制文字的性能略低，其原生系统如此
5. 对于复杂绘制场景，比如游戏，canvas组件的绘制速度优于DrawableContext；对于简单场景，canvas组件的内存占用高于普通view。
6. canvas是一个独立模块，在Android和iOS平台占用几百K体积，鸿蒙平台封装自鸿蒙自身的canvas。canvas模块不使用时会被摇树摇掉

### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| type | string | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | *(string)*<br/>指定 canvas 类型，支持 2d (2.9.0) 和 webgl (2.7.0) |
| canvas-id | string | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>canvas 组件的唯一标识符，若指定了 type 则无需再指定该属性 |
| disable-scroll | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新 |
| width | number | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): 5.0 | - |
| height | number | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): 5.0 | - |
| @touchstart | eventhandle | - | Web: 4.21; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): - | *(eventhandle)*<br/>手指触摸动作开始 |
| @touchmove | eventhandle | - | Web: 4.21; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): - | *(eventhandle)*<br/>手指触摸后移动 |
| @touchend | eventhandle | - | Web: 4.21; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): - | *(eventhandle)*<br/>手指触摸动作结束 |
| @touchcancel | eventhandle | - | Web: 4.21; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): - | *(eventhandle)*<br/>手指触摸动作被打断，如来电提醒，弹窗 |
| @longtap | eventhandle | - | Web: 4.21; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): - | *(eventhandle)*<br/>手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动 |
| @error | eventhandle | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandle)*<br/>当发生错误时触发 error 事件，detail = {errMsg} |

注意：Android平台默认会开启硬件加速无需额外设置



<!-- UTSCOMJSON.canvas.component_type-->

### 子组件 @children-tags
不可以嵌套组件

## API

老版 uni-app 的 canvas 使用了微信小程序的的旧版规范，和 W3C 规范有差异。微信小程序新版的 canvas 规范已经与 W3C 规范拉齐。

uni-app x 中废弃了老版方案，使用了 W3C 规范和微信小程序的新版规范。

注意：在uni-app x 4.21版以前，Web平台开发者写的老版canvas是可以运行的。但从 4.21+ 支持新版规范起，不再支持老版规范。开发者需调整代码。

注意：新版规范需要开发者根据自己的场景手动处理高清屏问题。

canvas相关的API较多，参考如下：

- [W3C 规范](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)
- canvas.toDataURL()  [W3C](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL)
- uni.createCanvasContextAsync 获取[CanvasContext对象](../api/create-canvas-context-async.md)
- [CanvasRenderingContext2D对象](../api/canvasrenderingcontext2d.md)
- [动画帧](../api/animation-frame.md)

## 获取组件上下文对象CanvasContext@CanvasContext

1. 异步方式获取CanvasContext

这种方式跨平台，一般推荐这种写法。需HBuilderX 4.25+支持。

组合式

```html
<template>
  <canvas id="canvas"></canvas>
</template>
<script setup>
  onReady(() => {
    // HBuilderX 4.25+
    // 异步调用方式, 跨平台写法
    uni.createCanvasContextAsync({
      id: 'canvas',
      component: getCurrentInstance().proxy,
      success: (context : CanvasContext) => {
        const canvasContext = context.getContext('2d')!;
        const canvas = canvasContext.canvas;

        // 处理高清屏逻辑
        const dpr = uni.getDeviceInfo().devicePixelRatio ?? 1;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        canvasContext.scale(dpr, dpr); // 仅需调用一次，当调用 reset 方法后需要再次 scale
      }
    })
  })
</script>
```

选项式

```html
<template>
  <view>
    <canvas id="canvas"></canvas>
  </view>
</template>

<script>
  export default {
    name: 'canvas',
    data() {
      return {
      }
    },
    onReady() {
      uni.createCanvasContextAsync({
        id: 'canvas',
        component: this,
        success: (context : CanvasContext) => {
          const canvasContext = context.getContext('2d')!;
          const canvas = canvasContext.canvas;

          // 处理高清屏逻辑
          const dpr = uni.getDeviceInfo().devicePixelRatio ?? 1;
          canvas.width = canvas.offsetWidth * dpr;
          canvas.height = canvas.offsetHeight * dpr;
          canvasContext.scale(dpr, dpr); // 仅需调用一次，当调用 reset 方法后需要再次 scale
        }
      })
    }
  }
</script>
```

文档[详见](../api/create-canvas-context-async.md)

2. 同步方式CanvasContext

需HBuilderX 4.21+支持。

同步方式不支持小程序。仅App和web可以使用。

```html
<template>
  <canvas id="canvas"></canvas>
</template>
<script setup>
  onReady(() => {
    // 同步调用方式，仅支持 app/web
    const canvas = uni.getElementById("canvas") as UniCanvasElement
    const context = canvas.getContext("2d")!;

    // 处理高清屏逻辑
    const dpr = uni.getDeviceInfo().devicePixelRatio ?? 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    context.scale(dpr, dpr); // 仅需调用一次，当调用 reset 方法后需要再次 scale
    // 省略绘制代码，和 w3c 规范保持一致
  })
</script>
```

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/canvas/canvas.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/canvas/canvas.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/canvas/canvas

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/canvas/canvas

>示例
```vue
<template>
  <view class="page" id="page-canvas">
    <canvas id="canvas" class="canvas-element"></canvas>
    <scroll-view class="scroll-view">
      <!-- #ifdef WEB -->
      <button class="canvas-drawing-button" @click="canvasToBlob">canvasToBlob</button>
      <view>
        <text>testToBlobResult: {{data.testToBlobResult}}</text>
      </view>
      <!-- #endif -->
      <button class="canvas-drawing-button" id="toDataURL" @click="canvasToDataURL">canvasToDataURL</button>
      <view class="text-group" v-if="data.dataBase64.length>0">
        <text>canvasToDataURL:</text>
        <text>{{data.dataBase64.slice(0,22)}}...</text>
      </view>
      <button @click="onCreateImage">createImage</button>
      <button @click="onCreatePath2D">createPath2D</button>
      <button @click="startAnimationFrame">requestAnimationFrame</button>
      <button @click="stopAnimationFrame">cancelAnimationFrame</button>
      <view style="padding: 8px 10px;">CanvasContext API 演示</view>
      <navigator url="./canvas-context">
        <button>CanvasContext API</button>
      </navigator>

      <view class="text-group">
        <text>获取 CanvasContext 结果：</text>
        <text id="testCanvasContext">{{data.testCanvasContext}}</text>
      </view>
      <view class="text-group">
        <text>测试 ToDataURL 结果：</text>
        <text id="testToDataURLResult">{{data.testToDataURLResult}}</text>
      </view>

      <view class="text-group">
        <text>测试 createImage 结果：</text>
        <text id="testCreateImage">{{data.testCreateImage}}</text>
      </view>

      <view class="text-group">
        <text>测试 createPath2D 结果：</text>
        <text id="testCreatePath2D">{{data.testCreatePath2D}}</text>
      </view>

      <view class="text-group">
        <text>测试 createCanvasContextAsync 结果：</text>
        <view @click="testCreateContextAsync" id="createCanvasContextAsync">{{testCanvasCtx}}</view>
      </view>
      <canvas-child ref="canvasChildRef"></canvas-child>
    </scroll-view>
  </view>
</template>

<script setup lang="uts">
  import CanvasChild from './canvas-child.uvue'

  const instance = getCurrentInstance()!.proxy

  type DataType = {
    title: string;
    canvas: UniCanvasElement | null;
    canvasContext: CanvasContext | null;
    renderingContext: CanvasRenderingContext2D | null;
    canvasWidth: number;
    canvasHeight: number;
    dataBase64: string;
    taskId: number;
    lastTime: number;
    frameCount: number;
    testCanvasContext: boolean;
    testToBlobResult: boolean;
    testToDataURLResult: boolean;
    testCreateImage: boolean;
    testCreatePath2D: boolean;
    testFrameCount: number;
    testCanvasCtx1: boolean;
    testCanvasCtx2: boolean;
    testCounter: number;
  }

  const data = reactive({
    title: 'Context2D',
    canvas: null,
    canvasContext: null,
    renderingContext: null,
    canvasWidth: 0,
    canvasHeight: 0,
    dataBase64: '',
    taskId: 0,
    lastTime: 0,
    frameCount: 0,
    testCanvasContext: false,
    testToBlobResult: false,
    testToDataURLResult: false,
    testCreateImage: false,
    testCreatePath2D: false,
    testFrameCount: 0,
    testCanvasCtx1: false,
    testCanvasCtx2: false,
    testCounter: 0
  } as DataType)

  const canvasChildRef = ref<ComponentPublicInstance | null>(null)

  const testCanvasCtx = computed(() => {
    return data.testCanvasCtx1 && data.testCanvasCtx2
  })

  function hidpi(canvas : UniCanvasElement) {
    const context = canvas.getContext("2d")!;
    const dpr = uni.getWindowInfo().pixelRatio;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    context.scale(dpr, dpr);
  }

  // #ifdef WEB
  const canvasToBlob = () => {
    data.canvasContext!.toBlob((blob : Blob) => {
      data.testToBlobResult = (blob.size > 0 && blob.type == 'image/jpeg')
    }, 'image/jpeg', 0.95)
  }
  // #endif

  const canvasToDataURL = () => {
    data.dataBase64 = data.canvasContext!.toDataURL()
  }

  const onCreateImage = () => {
    data.renderingContext!.clearRect(0, 0, data.canvasWidth, data.canvasHeight)
    let image = data.canvasContext!.createImage();
    image.src = "/static/test-image/logo.png"
    image.onload = () => {
      data.testCreateImage = true
      data.renderingContext?.drawImage(image, 0, 0, 100, 100);
    }
  }

  const onCreatePath2D = () => {
    data.renderingContext!.clearRect(0, 0, data.canvasWidth, data.canvasHeight)
    const context = data.renderingContext!
    let path2D = data.canvasContext!.createPath2D()
    data.testCreatePath2D = true
    const amplitude = 64;
    const wavelength = 64;
    for (let i = 0; i < 5; i++) {
      const x1 = 0 + (i * wavelength);
      const y1 = 128;
      const x2 = x1 + wavelength / 4;
      const y2 = y1 - amplitude;
      const x3 = x1 + 3 * wavelength / 4;
      const y3 = y1 + amplitude;
      const x4 = x1 + wavelength;
      const y4 = y1;
      context.moveTo(x1, y1);
      path2D.bezierCurveTo(x2, y2, x3, y3, x4, y4);
    }
    context.stroke(path2D);
  }

  const updateFPS = (timestamp : number) => {
    data.frameCount++
    if (timestamp - data.lastTime >= 1000) {
      const timeOfFrame = (1000 / data.frameCount)
      data.renderingContext!.clearRect(0, 0, data.canvasWidth, data.canvasHeight)
      data.renderingContext!.fillText(`${data.frameCount} / ${timeOfFrame.toFixed(3)}ms`, 10, 18)
      data.frameCount = 0
      data.lastTime = timestamp
    }
  }

  type StartAnimationFrameType = () => void
  let startAnimationFrame: StartAnimationFrameType = () => {}
  startAnimationFrame = () => {
    data.taskId = data.canvasContext!.requestAnimationFrame((timestamp : number) => {
        data.testFrameCount++
        updateFPS(timestamp)
        startAnimationFrame()
    })
  }

  const stopAnimationFrame = () => {
    data.canvasContext!.cancelAnimationFrame(data.taskId)
    data.taskId = 0
  }

  const testCreateContextAsync = () => {
    uni.createCanvasContextAsync({
      id: 'canvas',
      component: instance!,
      success: () => {
        data.testCanvasCtx1 = true
      }
    })

    uni.createCanvasContextAsync({
      id: 'canvas',
      success: () => {
        data.testCanvasCtx2 = true
      }
    })
  }

  const onChildReady = (count: number) => {
    // 通过事件传递数据
    data.testCounter = count
  }

  // TODO 暂时使用 onReady NativeView生命周期存在问题
  onReady(() => {
    uni.createCanvasContextAsync({
      id: 'canvas',
      component: instance!,
      success: (context : CanvasContext) => {
        data.canvasContext = context;
        data.renderingContext = context.getContext('2d')!;
        data.canvas = data.renderingContext!.canvas;

        hidpi(data.canvas!);
        data.canvasWidth = data.canvas!.width;
        data.canvasHeight = data.canvas!.height;

        // #ifdef WEB
        context.toBlob((blob : Blob) => {
          data.testToBlobResult = (blob.size > 0 && blob.type == 'image/jpeg')
        }, 'image/jpeg', 0.95);
        // #endif
        // #ifdef APP || WEB || MP
        setTimeout(() => {
          data.testToDataURLResult = data.canvasContext!.toDataURL().startsWith('data:image/png;base64')
        }, 50)
        // #endif
        data.testCanvasContext = true
      }
    })
  })

  onReady(() => {
    // 同步调用方式，仅支持 app/web
    // let canvas = uni.getElementById("canvas") as UniCanvasElement
    // data.renderingContext = canvas.getContext("2d")
    // hidpi(canvas);
    // data.canvas = canvas;
    // data.canvasWidth = canvas.width;
    // data.canvasHeight = canvas.height;
  })

  onLoad(() => {
    //监听canvasChildReady从onReady调整到onLoad，避免监听时机过晚导致无法收到此事件
    uni.$on('canvasChildReady', onChildReady)
  })

  onUnload(() => {
    uni.$off('canvasChildReady', onChildReady)
    if (data.taskId > 0) {
      stopAnimationFrame()
    }
  })

  defineExpose({
    data,
    canvasToDataURL,
    onCreateImage,
    onCreatePath2D
  })
</script>

<style>
  .page {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }

  .scroll-view {
    flex: 1;
  }

  .canvas-element {
    width: 100%;
    height: 250px;
    background-color: #ffffff;
  }

  .btn-to-image {
    margin: 10px;
  }

  .text-group {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;
  }
</style>

```

:::

## 场景

canvas有很多应用场景，插件市场有很多封装好的插件：

* 图表需求：[xCharts 基于原生canvas的图表方案](https://ext.dcloud.net.cn/plugin?id=21099)。插件市场还有基于webview的图表插件：[echart](https://ext.dcloud.net.cn/search?q=chart&orderBy=Relevance&uni-appx=1)、[F2](https://ext.dcloud.net.cn/search?q=f2&orderBy=Relevance&uni-appx=1)
* 二维码展示：[见插件市场](https://ext.dcloud.net.cn/search?q=%E4%BA%8C%E7%BB%B4%E7%A0%81&uni-appx=1)
* 手写签名：[见插件市场](https://ext.dcloud.net.cn/search?q=%E7%AD%BE%E5%90%8D&orderBy=Relevance&uni-appx=1)
* 抽奖转盘：[见插件市场](https://ext.dcloud.net.cn/search?q=%E8%BD%AC%E7%9B%98&orderBy=Relevance&uni-appx=1)
* 刮刮卡：[见插件市场](https://ext.dcloud.net.cn/search?q=%E5%88%AE%E5%88%AE%E5%8D%A1&orderBy=Relevance&uni-appx=1)

一些web平台的canvas插件，并没有适配uts。此时使用web-view中的canvas也是一种方案，uvue页面里的[web-view组件](./web-view.md)可以和uvue页面里的uts代码双向通信。


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.canvas.canvas)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/canvas.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=canvas&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=canvas&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=canvas&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=canvas&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=canvas)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=canvas&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

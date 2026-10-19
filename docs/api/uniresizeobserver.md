## UniResizeObserver

用于监视 UniElement 元素的大小变化。它可以观察一个或多个

### UniResizeObserver 兼容性 <Help /> 
 | Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.16 | x | x | 4.13 | 4.18 | 4.61 |




### 构造函数
| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| callback | (entries: Array&lt;UniResizeObserverEntry&gt;) => void | 是 | 每当监视的元素调整大小时，回调该函数 |

### 构造函数
| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| callback | (entries: Array&lt;UniResizeObserverEntry&gt;, observer: [UniResizeObserver](/api/dom/uniresizeobserver.md)) => void | 是 | 每当监视的元素调整大小时，回调该函数 |


### UniResizeObserver 的方法 @uniresizeobserver-methods
#### disconnect(): void @disconnect

取消所有的对 UniElement 目标的监视

##### disconnect 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.16 | x | x | 4.13 | 4.18 | 4.61 |








#### observe(target: UniElement): void @observe

监视指定 UniElement 大小变化

##### observe 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.16 | x | x | 4.13 | 4.18 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| target | [UniElement](/api/dom/unielement.md) | 是 | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 被监视的 UniElement | 






#### unobserve(target: UniElement): void @unobserve

结束对指定的 UniElement 的监视

##### unobserve 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.16 | x | x | 4.13 | 4.18 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| target | [UniElement](/api/dom/unielement.md) | 是 | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 取消监视的 UniElement | 






### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/uni-resize-observer/uni-resize-observer.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/uni-resize-observer/uni-resize-observer.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/uni-resize-observer/uni-resize-observer

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/uni-resize-observer/uni-resize-observer

>示例
```vue
<template>
    <view style="padding-bottom: var(--uni-safe-area-inset-bottom);">
      <page-intro content="本页演示 uni.createResizeObserver：监听元素尺寸变化，回调中可获取 contentRect（x、y、width、height）。含 view 嵌套、text、image、scroll-view 等组件的监听示例；可点击方块改宽高、改变字体/图片/scroll-view 尺寸，支持停止/恢复监听、隐藏/显示元素。"></page-intro>
      <text>点击蓝色或红色方块区域会修改元素宽高</text>
      <view v-show="boxDisplay" style="align-items: center; justify-content: center; margin: 10px;">
        <view
          style="width: 140px; height: 140px; background-color: blue; align-items: center; justify-content: center; padding: 5px;"
          id="outBox" @click="outBoxClick">
          <view style="width: 80px; height: 80px; background-color: red; padding: 5px;" id="innerBox"
            @click="innerBoxClick"></view>
        </view>
      </view>
      <button @click="revertBoxSize">还原修改前元素宽高</button>
      <button @click="toggleDisplay">{{boxDisplay? '隐藏元素': '显示元素'}}</button>
      <button @click='cancelListen'>停止监听</button>
      <button @click='goOnListen'>恢复监听</button>
      <view>
        <text class="info-text">蓝色方块元素:</text>
        <view class="info-item">
          <text class="info-text">{{outBoxSizeInfo}}</text>
        </view>
        <text class="info-text" style="margin-top: 20px;">红色方块元素:</text>
        <view class="info-item">
          <text class="info-text">{{innerBoxSizeInfo}}</text>
        </view>
      </view>

      <!-- text 组件示例 -->
      <view class="uni-common-mt" v-show="textImageScrollViewDisplay">
        <text class="uni-title-text">Text 组件示例:</text>
        <text id="testText" :style="{fontSize: textFontSize + 'px', color: '#333'}">这是一个可以改变字体大小的文本</text>
        <button @click="changeTextSize">改变文本字体大小</button>
        <view class="info-item">
          <text class="info-text">{{data.textSizeInfo}}</text>
        </view>
      </view>

      <!-- image 组件示例 -->
      <view class="uni-common-mt" v-show="textImageScrollViewDisplay">
        <text class="uni-title-text">Image 组件示例:</text>
        <image id="testImage" :style="{width: imageWidth + 'px', height: imageHeight + 'px'}" src="/static/test-image/logo.png" mode="aspectFit"></image>
        <button @click="changeImageSize">改变图片尺寸</button>
        <view class="info-item">
          <text class="info-text">{{data.imageSizeInfo}}</text>
        </view>
      </view>

      <!-- scroll-view 组件示例 -->
      <view class="uni-common-mt" v-show="textImageScrollViewDisplay">
        <text class="uni-title-text">Scroll-view 组件示例:</text>
        <scroll-view id="testScrollView" :style="{width: scrollViewWidth + 'px', height: '100px', border: '1px solid #ccc'}" >
          <view style="padding: 10px;">
            <text>这是 scroll-view 内的内容</text>
            <text v-for="i in 10" :key="i">第 {{i}} 行内容</text>
          </view>
        </scroll-view>
        <button @click="changeScrollViewSize">改变 scroll-view 宽度</button>
        <view class="info-item">
          <text class="info-text">{{data.scrollViewSizeInfo}}</text>
        </view>
      </view>
    </view>
</template>

<script setup lang="ts">
const outBoxSizeInfo = ref("")
const innerBoxSizeInfo = ref("")
const offset = ref(2)
const boxDisplay = ref(false)
let outBoxElement: UniElement | null = null
let innerBoxElement: UniElement | null = null
let resizeObserver: UniResizeObserver | null = null

// text 组件相关
const textFontSize = ref(16)
let textElement: UniElement | null = null

// image 组件相关
const imageWidth = ref(100)
const imageHeight = ref(100)
let imageElement: UniElement | null = null

// scroll-view 组件相关
const scrollViewWidth = ref(300)
let scrollViewElement: UniElement | null = null

// 控制 text、image、scroll-view 的显示
const textImageScrollViewDisplay = ref(false)

type ContentRectType = {
  x: number,
  y: number,
  width: number,
  height: number,
}

type BoxSizeType = {
  blockSize: number,
  inlineSize: number,
}

type ResizeInfoType = {
  contentRect: ContentRectType,
  borderBoxSize: BoxSizeType,
  contentBoxSize: BoxSizeType,
  // #ifndef WEB
  devicePixelContentBoxSize: BoxSizeType,
  // #endif
}

type DataType = {
  outBoxElementOnResize: boolean,
  textSizeInfo: string,
  imageSizeInfo: string,
  scrollViewSizeInfo: string,
  textSizeInfoObj: ResizeInfoType | null,
  imageSizeInfoObj: ResizeInfoType | null,
  scrollViewSizeInfoObj: ResizeInfoType | null,
}

const data = reactive({
  outBoxElementOnResize: false,
  textSizeInfo: "",
  imageSizeInfo: "",
  scrollViewSizeInfo: "",
  textSizeInfoObj: null,
  imageSizeInfoObj: null,
  scrollViewSizeInfoObj: null,
} as DataType)

function innerBoxClick() {
  if (innerBoxElement != null) {
    innerBoxElement!.style.setProperty("width", innerBoxElement!.offsetWidth + offset.value + 'px')
    innerBoxElement!.style.setProperty("height", innerBoxElement!.offsetWidth + offset.value + 'px')
  }
}

function outBoxClick() {
  if (outBoxElement != null) {
    outBoxElement!.style.setProperty("width", outBoxElement!.offsetWidth + offset.value + 'px')
    outBoxElement!.style.setProperty("height", outBoxElement!.offsetWidth + offset.value + 'px')
  }
}

function revertBoxSize() {
  if (outBoxElement != null) {
    outBoxElement!.style.setProperty("width", "140px")
    outBoxElement!.style.setProperty("height", "140px")
  }
  if (innerBoxElement != null) {
    innerBoxElement!.style.setProperty("width", "80px")
    innerBoxElement!.style.setProperty("height", "80px")
  }
}

//自动化测试专用
function setOutBoxMarginLeft(value : string) {
  if (outBoxElement != null) {
    data.outBoxElementOnResize = false
    outBoxElement!.style.setProperty("margin-left", value)
  }
}

function toggleDisplay() {
  boxDisplay.value = !boxDisplay.value
}

function analysisResizeObserverEntry(entry : UniResizeObserverEntry) : string {
  const contentBoxSize = entry.contentBoxSize[0]
  const borderBoxSize = entry.borderBoxSize[0]

  // #ifndef WEB
  const devicePixelContentBoxSize = entry.devicePixelContentBoxSize[0]
  return "borderBoxSize: \n{blockSize:" + borderBoxSize.blockSize + ", inlineSize:" + borderBoxSize.inlineSize + "}\n" +
    "contentBoxSize: \n{blockSize:" + contentBoxSize.blockSize + ", inlineSize:" + contentBoxSize.inlineSize + "}\n" +
    "devicePixelContentBoxSize: \n{blockSize:" + devicePixelContentBoxSize.blockSize + ", inlineSize:" + devicePixelContentBoxSize.inlineSize + "}\n" +
    "contentRect: \n{x:" + entry.contentRect.x + ", y:" + entry.contentRect.y + ", width:" + entry.contentRect.width + ", height:" + entry.contentRect.height + "}"
  // #endif
  // #ifdef WEB
  return "borderBoxSize: \n{blockSize:" + borderBoxSize.blockSize + ", inlineSize:" + borderBoxSize.inlineSize + "}\n" +
    "contentBoxSize: \n{blockSize:" + contentBoxSize.blockSize + ", inlineSize:" + contentBoxSize.inlineSize + "}\n" +
    "contentRect: \n{x:" + entry.contentRect.x + ", y:" + entry.contentRect.y + ", width:" + entry.contentRect.width + ", height:" + entry.contentRect.height + "}"
  // #endif
}

// 将 ResizeObserverEntry 转换为 ResizeInfoType 对象（用于测试）
function convertResizeEntryToInfo(entry : UniResizeObserverEntry) : ResizeInfoType {
  const contentBoxSize = entry.contentBoxSize[0]
  const borderBoxSize = entry.borderBoxSize[0]
  // #ifndef WEB
  const devicePixelContentBoxSize = entry.devicePixelContentBoxSize[0]
  return {
    contentRect: {
      x: entry.contentRect.x,
      y: entry.contentRect.y,
      width: entry.contentRect.width,
      height: entry.contentRect.height,
    } as ContentRectType,
    borderBoxSize: {
      blockSize: borderBoxSize.blockSize,
      inlineSize: borderBoxSize.inlineSize,
    } as BoxSizeType,
    contentBoxSize: {
      blockSize: contentBoxSize.blockSize,
      inlineSize: contentBoxSize.inlineSize,
    } as BoxSizeType,
    devicePixelContentBoxSize: {
      blockSize: devicePixelContentBoxSize.blockSize,
      inlineSize: devicePixelContentBoxSize.inlineSize,
    } as BoxSizeType,
  } as ResizeInfoType
  // #endif
  // #ifdef WEB
  return {
    contentRect: {
      x: entry.contentRect.x,
      y: entry.contentRect.y,
      width: entry.contentRect.width,
      height: entry.contentRect.height,
    } as ContentRectType,
    borderBoxSize: {
      blockSize: borderBoxSize.blockSize,
      inlineSize: borderBoxSize.inlineSize,
    } as BoxSizeType,
    contentBoxSize: {
      blockSize: contentBoxSize.blockSize,
      inlineSize: contentBoxSize.inlineSize,
    } as BoxSizeType,
  } as ResizeInfoType
  // #endif
}

function cancelListen() {
  // resizeObserver?.unobserve()
  resizeObserver!.unobserve(outBoxElement!)
  resizeObserver!.unobserve(innerBoxElement!)
}

function goOnListen() {
  resizeObserver!.observe(outBoxElement!)
  resizeObserver!.observe(innerBoxElement!)
}

// 改变 text 字体大小
function changeTextSize() {
  textFontSize.value = textFontSize.value + 2
}

// 改变 image 尺寸
function changeImageSize() {
  imageWidth.value = imageWidth.value + 10
  imageHeight.value = imageHeight.value + 10
}

// 改变 scroll-view 宽度
function changeScrollViewSize() {
  scrollViewWidth.value = scrollViewWidth.value + 20
}

onBackPress(() : boolean => {
  if (resizeObserver != null) {
    resizeObserver!.disconnect()
  }
  return false
})

onReady(() => {
  if (resizeObserver == null) {
    resizeObserver = new UniResizeObserver((entries : Array<UniResizeObserverEntry>) => {

      entries.forEach(entry => {
        if (entry.target == outBoxElement) {
          outBoxSizeInfo.value = analysisResizeObserverEntry(entry)
          data.outBoxElementOnResize = true
        } else if (entry.target == innerBoxElement) {
          innerBoxSizeInfo.value = analysisResizeObserverEntry(entry)
        } else if (entry.target == textElement) {
          data.textSizeInfo = analysisResizeObserverEntry(entry)
          data.textSizeInfoObj = convertResizeEntryToInfo(entry)
        } else if (entry.target == imageElement) {
          data.imageSizeInfo = analysisResizeObserverEntry(entry)
          data.imageSizeInfoObj = convertResizeEntryToInfo(entry)
        } else if (entry.target == scrollViewElement) {
          data.scrollViewSizeInfo = analysisResizeObserverEntry(entry)
          data.scrollViewSizeInfoObj = convertResizeEntryToInfo(entry)
        }
      })
    })
    outBoxElement = uni.getElementById("outBox")
    if (outBoxElement != null) {
      resizeObserver!.observe(outBoxElement!)
    }
    innerBoxElement = uni.getElementById("innerBox")
    if (innerBoxElement != null) {
      resizeObserver!.observe(innerBoxElement!)
    }

    //监听 text 组件
    textElement = uni.getElementById("testText")
    if (textElement != null) {
      resizeObserver!.observe(textElement!)
    }

    //监听 image 组件
    imageElement = uni.getElementById("testImage")
    if (imageElement != null) {
      resizeObserver!.observe(imageElement!)
    }

    //监听 scroll-view 组件
    scrollViewElement = uni.getElementById("testScrollView")
    if (scrollViewElement != null) {
      resizeObserver!.observe(scrollViewElement!)
    }

    boxDisplay.value = true
    textImageScrollViewDisplay.value = true
  }
})

defineExpose({
  data,
  setOutBoxMarginLeft,
  changeTextSize,
  changeImageSize,
  changeScrollViewSize
})
</script>

<style>
  .info-item {
    flex-direction: row;
  }

  .info-text {
    font-size: 14px;
  }
</style>

```

:::

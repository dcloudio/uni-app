## UniResizeObserver

用于监视 UniElement 元素的大小变化。它可以观察一个或多个

### UniResizeObserver 兼容性 <Help /> 
 | Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.16 | x | x | 4.13 | 4.18 | 4.61 |

小程序自身未提供ResizeObserver。社区有三方库可模拟实现，虽性能不及原生ResizeObserver，但在需要时也可以使用。参考[lime-resize](https://ext.dcloud.net.cn/plugin?id=14117)




### 构造函数
| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| callback | (entries: Array&lt;[UniResizeObserverEntry](#uniresizeobserverentry-values)&gt;) => void | 是 | 每当监视的元素调整大小时，回调该函数 |

### 构造函数
| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| callback | (entries: Array&lt;[UniResizeObserverEntry](#uniresizeobserverentry-values)&gt;, observer: [UniResizeObserver](/api/uniresizeobserver.md)) => void | 是 | 每当监视的元素调整大小时，回调该函数 |

#### UniResizeObserverEntry 的属性值 @uniresizeobserverentry-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| borderBoxSize | Array&lt;**UniBorderBoxSize**&gt; | 是 | 只读属性 包含被监视的元素带有边框box大小的数组。 |
| contentBoxSize | Array&lt;**UniContentBoxSize**&gt; | 是 | 只读属性 包含被监视的元素内容box大小的数组。 |
| devicePixelContentBoxSize | Array&lt;**UniDevicePixelContentBoxSize**&gt; | 是 | 只读属性 包含被监视的元素内容box设备像素大小的数组。 |
| contentRect | [DOMRect](/api/dom/domrect.md) | 是 | 只读属性 包含被监视元素大小的DOMRect |
| target | [UniElement](/api/dom/unielement.md) | 是 | 只读属性 被监视的 UniElement |

#### borderBoxSize 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| blockSize | number | 是 | 只读属性，被监视元素含边框box的高度 |
| inlineSize | number | 是 | 只读属性，被监视元素含边框box的宽度 |

#### contentBoxSize 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| blockSize | number | 是 | 只读属性，被监视元素内容box的高度 |
| inlineSize | number | 是 | 只读属性，被监视元素内容box的宽度 |

#### devicePixelContentBoxSize 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| blockSize | number | 是 | 只读属性，被监视元素内容box的设备像素高度 |
| inlineSize | number | 是 | 只读属性，被监视元素内容box的设备像素宽度 |


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
      <view class="section-heading">
        <text class="section-title">基础监听</text>
        <text class="section-caption">点击蓝色或红色方块，观察对应元素的尺寸变化</text>
      </view>
      <view v-show="boxDisplay" class="box-stage">
        <view
          style="width: 140px; height: 140px; background-color: blue; align-items: center; justify-content: center; padding: 5px;"
          id="outBox" @click="outBoxClick">
          <view style="width: 80px; height: 80px; background-color: red; padding: 5px;" id="innerBox"
            @click="innerBoxClick"></view>
        </view>
      </view>
      <view class="action-grid">
        <button class="action-grid-button" @click="revertBoxSize">还原尺寸</button>
        <button class="action-grid-button" @click="toggleDisplay">{{boxDisplay? '隐藏元素': '显示元素'}}</button>
        <button class="action-grid-button" @click='cancelListen'>停止监听</button>
        <button class="action-grid-button" @click='goOnListen'>恢复监听</button>
      </view>
      <view class="result-grid">
        <view class="result-card accent-blue">
          <text class="result-title">蓝色外层元素</text>
          <text class="result-summary">{{outBoxSizeInfo ? outBoxSummary : '等待首次回调...'}}</text>
          <text class="result-detail">{{outBoxSizeInfo}}</text>
        </view>
        <view class="result-card accent-red">
          <text class="result-title">红色内层元素</text>
          <text class="result-summary">{{innerBoxSizeInfo ? innerBoxSummary : '等待首次回调...'}}</text>
          <text class="result-detail">{{innerBoxSizeInfo}}</text>
        </view>
      </view>

      <!-- text 组件示例 -->
      <view class="uni-common-mt" v-show="textImageScrollViewDisplay">
        <view class="section-heading"><text class="section-title">Text 组件</text></view>
        <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
        <view class="flat-compare-row">
          <text id="testText" class="flat-compare-item" :style="{fontSize: textFontSize + 'px', color: '#333'}">普通文本</text>
          <text id="testTextFlat" class="flat-compare-item" :style="{fontSize: textFontSize + 'px', color: '#333'}" flatten>拍平文本</text>
        </view>
        <button @click="changeTextSize">改变文本字体大小</button>
        <view class="result-grid">
          <view class="result-card"><text class="result-title">正常</text><text class="result-summary">{{infoSummary(data.textSizeInfoObj)}}</text><text class="result-detail">{{data.textSizeInfo}}</text></view>
          <view class="result-card"><text class="result-title">拍平</text><text class="result-summary">{{infoSummary(data.textFlatSizeInfoObj)}}</text><text class="result-detail">{{data.textFlatSizeInfo}}</text></view>
        </view>
      </view>

      <!-- flatten 拍平元素示例 -->
      <view class="uni-common-mt" v-show="flatDisplay">
        <view class="section-heading"><text class="section-title">View 组件</text></view>
        <view class="flat-compare-row">
          <view id="testViewNormal" class="flat-compare-item" style="background-color: #409eff;" :style="{width: viewFlatWidth + 'px', height: viewFlatHeight + 'px'}"></view>
          <view id="testViewFlat" class="flat-compare-item" style="background-color: #3cb371;" :style="{width: viewFlatWidth + 'px', height: viewFlatHeight + 'px'}" flatten></view>
        </view>
        <button @click="changeViewFlatSize">改变 view 尺寸</button>
        <view class="result-grid">
          <view class="result-card"><text class="result-title">正常</text><text class="result-summary">{{infoSummary(data.viewNormalSizeInfoObj)}}</text><text class="result-detail">{{data.viewNormalSizeInfo}}</text></view>
          <view class="result-card"><text class="result-title">拍平</text><text class="result-summary">{{infoSummary(data.viewFlatSizeInfoObj)}}</text><text class="result-detail">{{data.viewFlatSizeInfo}}</text></view>
        </view>
      </view>

      <!-- image 组件示例 -->
      <view class="uni-common-mt" v-show="textImageScrollViewDisplay">
        <view class="section-heading"><text class="section-title">Image 组件</text></view>
        <view class="flat-compare-row">
          <image id="testImage" class="flat-compare-item" :style="{width: imageWidth + 'px', height: imageHeight + 'px'}" src="/static/test-image/logo.png" mode="aspectFit"></image>
          <image id="testImageFlat" class="flat-compare-item" :style="{width: imageWidth + 'px', height: imageHeight + 'px'}" src="/static/test-image/logo.png" mode="aspectFit" flatten></image>
        </view>
        <button @click="changeImageSize">改变图片尺寸</button>
        <view class="result-grid">
          <view class="result-card"><text class="result-title">正常</text><text class="result-summary">{{infoSummary(data.imageSizeInfoObj)}}</text><text class="result-detail">{{data.imageSizeInfo}}</text></view>
          <view class="result-card"><text class="result-title">拍平</text><text class="result-summary">{{infoSummary(data.imageFlatSizeInfoObj)}}</text><text class="result-detail">{{data.imageFlatSizeInfo}}</text></view>
        </view>
      </view>

      <!-- scroll-view 组件示例 -->
      <view class="uni-common-mt" v-show="textImageScrollViewDisplay">
        <view class="section-heading"><text class="section-title">Scroll-view 组件</text><text class="section-caption">监听滚动容器尺寸</text></view>
        <scroll-view id="testScrollView" :style="{width: scrollViewWidth + 'px', height: '100px', border: '1px solid #ccc'}" >
          <view style="padding: 10px;">
            <text>这是 scroll-view 内的内容</text>
            <text v-for="i in 10" :key="i">第 {{i}} 行内容</text>
          </view>
        </scroll-view>
        <button @click="changeScrollViewSize">改变 scroll-view 宽度</button>
        <view class="result-card"><text class="result-summary">{{infoSummary(data.scrollViewSizeInfoObj)}}</text><text class="result-detail">{{data.scrollViewSizeInfo}}</text></view>
      </view>
    </view>
</template>

<script setup lang="ts">
const outBoxSizeInfo = ref("")
const innerBoxSizeInfo = ref("")
const outBoxSummary = ref("等待首次回调...")
const innerBoxSummary = ref("等待首次回调...")
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

// 拍平（flatten）元素相关
const viewFlatWidth = ref(100)
const viewFlatHeight = ref(100)
let viewFlatElement: UniElement | null = null
let viewNormalElement: UniElement | null = null

let textFlatElement: UniElement | null = null
let imageFlatElement: UniElement | null = null

// 控制 text、image、scroll-view 的显示
const textImageScrollViewDisplay = ref(false)

// 控制拍平元素的显示
const flatDisplay = ref(false)

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

function infoSummary(info : ResizeInfoType | null) : string {
  if (info == null) return "等待首次回调..."
  return "contentRect " + info.contentRect.width + " x " + info.contentRect.height + " px"
}

type DataType = {
  outBoxElementOnResize: boolean,
  textSizeInfo: string,
  imageSizeInfo: string,
  scrollViewSizeInfo: string,
  textSizeInfoObj: ResizeInfoType | null,
  imageSizeInfoObj: ResizeInfoType | null,
  scrollViewSizeInfoObj: ResizeInfoType | null,
  viewFlatSizeInfo: string,
  viewNormalSizeInfo: string,
  textFlatSizeInfo: string,
  imageFlatSizeInfo: string,
  viewFlatSizeInfoObj: ResizeInfoType | null,
  viewNormalSizeInfoObj: ResizeInfoType | null,
  textFlatSizeInfoObj: ResizeInfoType | null,
  imageFlatSizeInfoObj: ResizeInfoType | null,
}

const data = reactive({
  outBoxElementOnResize: false,
  textSizeInfo: "",
  imageSizeInfo: "",
  scrollViewSizeInfo: "",
  textSizeInfoObj: null,
  imageSizeInfoObj: null,
  scrollViewSizeInfoObj: null,
  viewFlatSizeInfo: "",
  viewNormalSizeInfo: "",
  textFlatSizeInfo: "",
  imageFlatSizeInfo: "",
  viewFlatSizeInfoObj: null,
  viewNormalSizeInfoObj: null,
  textFlatSizeInfoObj: null,
  imageFlatSizeInfoObj: null,
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

// 改变 view 尺寸
function changeViewFlatSize() {
  viewFlatWidth.value = viewFlatWidth.value + 10
  viewFlatHeight.value = viewFlatHeight.value + 10
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
          outBoxSummary.value = infoSummary(convertResizeEntryToInfo(entry))
          data.outBoxElementOnResize = true
        } else if (entry.target == innerBoxElement) {
          innerBoxSizeInfo.value = analysisResizeObserverEntry(entry)
          innerBoxSummary.value = infoSummary(convertResizeEntryToInfo(entry))
        } else if (entry.target == textElement) {
          data.textSizeInfo = analysisResizeObserverEntry(entry)
          data.textSizeInfoObj = convertResizeEntryToInfo(entry)
        } else if (entry.target == imageElement) {
          data.imageSizeInfo = analysisResizeObserverEntry(entry)
          data.imageSizeInfoObj = convertResizeEntryToInfo(entry)
        } else if (entry.target == scrollViewElement) {
          data.scrollViewSizeInfo = analysisResizeObserverEntry(entry)
          data.scrollViewSizeInfoObj = convertResizeEntryToInfo(entry)
        } else if (entry.target == viewFlatElement) {
          data.viewFlatSizeInfo = analysisResizeObserverEntry(entry)
          data.viewFlatSizeInfoObj = convertResizeEntryToInfo(entry)
        } else if (entry.target == viewNormalElement) {
          data.viewNormalSizeInfo = analysisResizeObserverEntry(entry)
          data.viewNormalSizeInfoObj = convertResizeEntryToInfo(entry)
        } else if (entry.target == textFlatElement) {
          data.textFlatSizeInfo = analysisResizeObserverEntry(entry)
          data.textFlatSizeInfoObj = convertResizeEntryToInfo(entry)
        } else if (entry.target == imageFlatElement) {
          data.imageFlatSizeInfo = analysisResizeObserverEntry(entry)
          data.imageFlatSizeInfoObj = convertResizeEntryToInfo(entry)
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

    //监听拍平 view 组件
    viewFlatElement = uni.getElementById("testViewFlat")
    if (viewFlatElement != null) {
      resizeObserver!.observe(viewFlatElement!)
    }

    //监听正常 view 组件（拍平对比）
    viewNormalElement = uni.getElementById("testViewNormal")
    if (viewNormalElement != null) {
      resizeObserver!.observe(viewNormalElement!)
    }

    //监听拍平 text 组件
    textFlatElement = uni.getElementById("testTextFlat")
    if (textFlatElement != null) {
      resizeObserver!.observe(textFlatElement!)
    }

    //监听拍平 image 组件
    imageFlatElement = uni.getElementById("testImageFlat")
    if (imageFlatElement != null) {
      resizeObserver!.observe(imageFlatElement!)
    }

    boxDisplay.value = true
    textImageScrollViewDisplay.value = true
    flatDisplay.value = true
  }
})

defineExpose({
  data,
  setOutBoxMarginLeft,
  changeTextSize,
  changeImageSize,
  changeScrollViewSize,
  changeViewFlatSize
})
</script>

<style>
  .section-heading {
    margin-top: 18px;
    margin-bottom: 10px;
  }

  .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
  }

  .section-caption {
    margin-top: 3px;
    font-size: 12px;
    color: #6b7280;
  }

  .box-stage {
    min-height: 170px;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    background-color: #f5f7fa;
    border-radius: 8px;
  }

  .action-grid {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .action-grid-button {
    width: 48%;
    margin-bottom: 8px;
  }

  .result-grid {
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    margin-top: 8px;
  }

  .result-card {
    flex: 1;
    min-width: 0;
    margin: 0 4px 8px 0;
    padding: 10px;
    background-color: #f8fafc;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
  }

  .accent-blue {
    border-left-width: 4px;
    border-left-color: #409eff;
  }

  .accent-red {
    border-left-width: 4px;
    border-left-color: #ef4444;
  }

  .result-title {
    font-size: 14px;
    font-weight: bold;
    color: #374151;
  }

  .result-summary {
    margin-top: 5px;
    font-size: 14px;
    color: #111827;
  }

  .result-detail {
    margin-top: 6px;
    font-size: 11px;
    line-height: 17px;
    color: #6b7280;
  }

  .flat-compare-row {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    min-height: 110px;
    margin: 10px 0 6px;
    background-color: #f5f7fa;
    border-radius: 8px;
  }

  .flat-compare-item {
    margin: 0 5px;
  }
</style>

```

:::

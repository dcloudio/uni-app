::: sourceCode
## loading

> GitCode: https://gitcode.com/dcloud/uni-component/tree/alpha/uni_modules/uni-loading


> GitHub: https://github.com/dcloudio/uni-component/tree/alpha/uni_modules/uni-loading

:::

加载组件。利用系统GPU进行加速渲染，不受主线程繁忙影响。


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 5.0 | 5.0 | 5.0 | 5.0 | 5.0 | 5.0 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| paused | boolean | false | Web: 5.0; 微信小程序: 5.0; Android: 5.0; iOS: 5.0; HarmonyOS: 5.0; HarmonyOS(Vapor): 5.0 | 是否暂停动画 |
| bold | boolean | false | Web: 5.0; 微信小程序: x; Android: 5.0; iOS: 5.0; HarmonyOS: 5.0; HarmonyOS(Vapor): 5.0 | 是否加粗线条 |
| ios-spinner | boolean | false | Web: x; 微信小程序: x; Android: x; iOS: 5.0; HarmonyOS: x; HarmonyOS(Vapor): x | iOS是否采用系统雪花状样式 |



<!-- UTSCOMJSON.loading.component_type -->



## 注意事项：
1. iOS、Android 利用渲染线程加速，完全不受主线程繁忙影响；鸿蒙因OS渲染线程开放能力不足，受主线程轻微影响，但仍可以做到一个界面放置100个loading同时转圈而不卡顿，[详见](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/loading-100/loading-100.uvue)。
2. 仅支持以下css style，支持静态和动态设置：
	* width：组件的宽度，默认值为 16px
	* height：组件的高度，默认值为 16px
	* border-color：加载框线条的颜色，默认值为 #000000
	* color: 仅 ios-spinner = true 时，color的优先级大于border-color； ios-spinner = false 时， color无效；
3. loading组件默认是旋转的，不使用时应v-if删除或设置paused。请注意勿在隐藏或被遮挡的区域让loading持续旋转。
4. 当 ios-spinner = true 时，由于iOS系统雪花非矢量概念，该组件随着 CSS width、height 动态调整大小时会模糊，建议 CSS width、height 不超过 37px；
5. [uni.showLoading API](https://doc.dcloud.net.cn/uni-app-x/api/loading.html#showloading) 从HBuilderX 5.0+ ，在非小程序上通过本内置loading组件实现,

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/loading/loading.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/loading/loading.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/loading/loading

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/loading/loading

>示例
```vue
<template>
  <scroll-view class="container">
   <page-head title="loading组件"></page-head>
   <view class="section">
      <view class="row">
        <view class="item">
          <text class="label">默认样式</text>
          <loading/>
        </view>
        <view class="item">
          <text class="label">paused为true</text>
          <loading paused/>
        </view>
        <view class="item">
          <text class="label">bold为true</text>
          <loading bold/>
        </view>
        <view class="item">
          <text class="label">背景圈黑色，前景白色</text>
          <view style="width: 17px;height: 17px;border-radius: 8.5px;border: black 2px solid;align-items: center;justify-content: center;overflow: visible;">
            <loading style="border-color: white;" bold />
          </view>
        </view>
      </view>
    </view>

    <!-- 动态 style 控制 -->
    <view class="section">
      <text class="section-title">动态 style</text>
      <view class="controls">
        <button size="mini" @click="decreaseSize">-10px</button>
        <button size="mini" @click="increaseSize">+10px</button>
        <button size="mini" @click="toggleBold">bold 属性: {{ isBold }}</button>
        <button size="mini" @click="nextColor">color style: {{ borderColor }}</button>
        <button size="mini" @click="setPaused">paused 属性：{{ paused }}</button>
        <!-- #ifdef APP-IOS -->
        <button size="mini" @click="setIOSSpinner">ios-spinner 属性：{{ iosSpinner }}</button>
        <!-- #endif -->
        <button size="mini" @click="reset">reset</button>
      </view>

      <view class="row">
        <view class="item">
          <text class="label">{{ widthPx }}×{{ heightPx }} / {{ borderColor }} / bold: {{ isBold }} / paused: {{ paused }} / ios-spinner: {{ iosSpinner }}</text>
          <view class="box">
            <loading :bold=isBold :paused="paused" :ios-spinner="iosSpinner" :style="dynamicStyle" />
          </view>
        </view>
      </view>
    </view>

    <!-- 一、Class 实现 -->
   <view class="section">
      <text class="section-title">Class 自定义样式</text>
      <view class="row">
        <view class="item">
          <text class="label">100×100 / blue / bold=false</text>
          <view class="box">
            <loading :bold=false class="size-100 bc-blue" />
          </view>
        </view>
        <view class="item">
          <text class="label">100×100 / red / bold=true</text>
          <view class="box">
            <loading :bold=true class="size-100 bc-red" />
          </view>
        </view>
        <view class="item">
          <text class="label">80×80 / green / bold=false</text>
          <view class="box">
            <loading :bold=false class="size-80 bc-green" />
          </view>
        </view>
        <view class="item">
          <text class="label">140×140 / yellow / bold=true</text>
          <view class="box">
            <loading :bold=true class="size-140 bc-yellow" />
          </view>
        </view>
        <view class="item">
          <text class="label">140×140 / yellow / bold=true, 默认paused属性=true</text>
          <view class="box">
            <loading :bold=true :paused="true" class="size-140 bc-yellow" />
          </view>
        </view>
      </view>
    </view>

    <!-- 二、Style 实现 -->
   <view class="section">
      <text class="section-title">Style 自定义样式</text>
      <view class="row">
        <view class="item">
          <text class="label">80×80 / red / bold=true</text>
          <view class="box">
            <loading :bold=true :style="{ width:'80px', height:'80px', borderColor:'red'}" />
          </view>
        </view>

        <view class="item">
          <text class="label">120×120 / green / bold=false</text>
          <view class="box">
            <loading :bold=false :style="{ width:'120px', height:'120px', borderColor:'green'}" />
          </view>
        </view>
      </view>
    </view>

   <navigator class="uni-common-mb" url="/pages/template/loading-100/loading-100">
      <button>组件性能测试</button>
    </navigator>
  </scroll-view>
</template>

<script setup lang="uts">
const widthPx = ref(100)
const heightPx = ref(100)
const borderColor = ref('blue')
const isBold = ref(false)
const colors = ['blue', 'red', 'green', 'yellow']
const colorIndex = ref(0)
const paused = ref(false)
const iosSpinner = ref(false)

const dynamicStyle = computed(() => {
  return {
    width: widthPx.value + 'px',
    height: heightPx.value + 'px',
    borderColor: borderColor.value,
    borderWidth: isBold.value ? 'thick' : 'medium'
  }
})

const increaseSize = () => {
  widthPx.value += 10
  heightPx.value += 10
}

const decreaseSize = () => {
  widthPx.value = Math.max(20, widthPx.value - 10)
  heightPx.value = Math.max(20, heightPx.value - 10)
}

const toggleBold = () => {
  isBold.value = !isBold.value
}

const nextColor = () => {
  colorIndex.value = (colorIndex.value + 1) % colors.length
  borderColor.value = colors[colorIndex.value]
}

const reset = () => {
  widthPx.value = 100
  heightPx.value = 100
  borderColor.value = 'blue'
  isBold.value = false
  iosSpinner.value = false
  colorIndex.value = 0
  paused.value = false
}

const setPaused = () => {
  paused.value = !paused.value
}

const setIOSSpinner = () => {
  iosSpinner.value = !iosSpinner.value
}
</script>

<style>
.container {
  flex: 1;
  padding: 8px;
  background-color: #f8f8f8;
}

.header {
  margin-bottom: 16px;
  align-items: center;
}

.title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-top: 6px;
  text-align: center;
}

.section {
  margin-bottom: 18px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #444;
  margin-bottom: 10px;
  text-align: center;
  background-color: #f0f0f0;
  padding: 6px;
  border-radius: 6px;
}

.row {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.item {
  align-items: center;
  margin: 8px 4px;
}

.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  text-align: center;
}

.box {
 border-style: none;
}

/* NOTE mp-weixin 类名需要加上父级以提高优先级，否则 class 样式无法生效 */

/* #ifdef MP-WEIXIN */
.item .size-80 { width: 80px; height: 80px; }
.item .size-100 { width: 100px; height: 100px; }
.item .size-140 { width: 140px; height: 140px; }

.item .bc-blue { border-color: blue; }
.item .bc-red { border-color: red; }
.item .bc-green { border-color: green; }
.item .bc-yellow { border-color: yellow; }
/* #endif */

/* #ifndef MP-WEIXIN */
.size-80 { width: 80px; height: 80px; }
.size-100 { width: 100px; height: 100px; }
.size-140 { width: 140px; height: 140px; }

.bc-blue { border-color: blue; }
.bc-red { border-color: red; }
.bc-green { border-color: green; }
.bc-yellow { border-color: yellow; }
/* #endif */

</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.basic-content.loading)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=loading&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=loading&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=loading&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=loading&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=loading&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=loading)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=loading&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


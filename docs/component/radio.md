<!-- ## radio -->

::: sourceCode
## radio
:::

> 组件类型：UniRadioElement 

 单选项。在1组radio-group中只能选中1个


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| disabled | boolean | false | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 是否禁用 |
| value | string | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 表单的控件名称，作为键值对的一部分与表单(form组件)一同提交 |
| checked | boolean | false | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当前是否选中，可用来设置默认选中 |
| ~~color~~ | string([string.ColorString](/uts/data-type.md#ide-string)) | "#007AFF" | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | radio的颜色 (使用foreColor替代) |
| backgroundColor | string([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | radio默认的背景颜色 |
| borderColor | string([string.ColorString](/uts/data-type.md#ide-string)) | "#d1d1d1" | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | radio默认的边框颜色 |
| activeBackgroundColor | string([string.ColorString](/uts/data-type.md#ide-string)) | "#007AFF" | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | radio选中时的背景颜色，优先级大于color属性 |
| activeBorderColor | string([string.ColorString](/uts/data-type.md#ide-string)) | "" | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | radio选中时的边框颜色 |
| ~~iconColor~~ | string([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | radio的图标颜色 (使用foreColor替代) |
| foreColor | string([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | Web: 4.18; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | radio的图标颜色 |
| icon-class | [string.ClassString](/uts/data-type.md#ide-string) | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): 5.0 | 单选框图标的类名 |
| radio-class | [string.ClassString](/uts/data-type.md#ide-string) | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): 5.0 | 单选框的类名 |
| radio-active-class | [string.ClassString](/uts/data-type.md#ide-string) | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): 5.0 | 单选框选中的类名 |



<!-- UTSCOMJSON.radio.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/radio/radio.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/radio/radio.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/radio/radio

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/radio/radio

>示例
```vue
<script setup lang="uts">
  type ItemType = {
    value: string
    name: string
  }

  type DataType = {
    items: ItemType[];
    current: number;
    eventTest: boolean;
    value: string;
    text: string;
    wrapText: string;
    disabled: boolean;
    checked: boolean;
    color: string;
    checked_boolean: boolean;
    disabled_boolean: boolean;
    color_input: string;
    backgroundColor_input: string;
    borderColor_input: string;
    activeBackgroundColor_input: string;
    activeBorderColor_input: string;
    iconColor_input: string;
  }
  // 使用reactive避免ref数据在自动化测试中无法访问
  const data = reactive({
    items: [
      {
        value: 'CHN',
        name: '中国',
      },
      {
        value: 'USA',
        name: '美国',
      },

      {
        value: 'BRA',
        name: '巴西',
      },
      {
        value: 'JPN',
        name: '日本',
      },
      {
        value: 'ENG',
        name: '英国',
      },
      {
        value: 'FRA',
        name: '法国',
      },
    ],
    current: 0,
    eventTest: false,
    value: '',
    text: '未选中',
    wrapText: 'uni-app x，终极跨平台方案\nuts，大一统语言',
    disabled: true,
    checked: true,
    color: '#007aff',
    // 组件属性 autotest
    checked_boolean: false,
    disabled_boolean: false,
    color_input: "#007AFF",
    backgroundColor_input: "#ffffff",
    borderColor_input: "#d1d1d1",
    activeBackgroundColor_input: "#007AFF",
    activeBorderColor_input: "",
    iconColor_input: "#ffffff"
  } as DataType)

  const radioChange = (e: UniRadioGroupChangeEvent) => {
    // 自动化测试
    console.log('test: radio event detail', e.target?.tagName, e.type)
    if ((e.target?.tagName ?? '') == 'RADIO-GROUP' && e.type == 'change') {
      data.eventTest = true
    }

    const selected = data.items.find((item): boolean => {
      return item.value == e.detail.value
    })
    uni.showToast({
      icon: 'none',
      title: '当前选中:' + selected?.name,
    })
  }

  const testChange = (e: UniRadioGroupChangeEvent) => {
    data.value = e.detail.value
  }

  const radio_click = () => {
    console.log("组件被点击时触发")
  }

  const radio_touchstart = () => {
    console.log("手指触摸动作开始")
  }

  const radio_touchmove = () => {
    console.log("手指触摸后移动")
  }

  const radio_touchcancel = () => {
    console.log("手指触摸动作被打断，如来电提醒，弹窗")
  }

  const radio_touchend = () => {
    console.log("手指触摸动作结束")
  }

  const radio_tap = () => {
    console.log("手指触摸后马上离开")
  }

  const radio_longpress = () => {
    console.log("如果一个组件被绑定了 longpress 事件，那么当用户长按这个组件时，该事件将会被触发。")
  }

  const change_checked_boolean = (checked: boolean) => {
    data.checked_boolean = checked
  }

  const change_disabled_boolean = (checked: boolean) => {
    data.disabled_boolean = checked
  }

  const confirm_color_input = (value: string) => {
    data.color_input = value
  }

  const confirm_backgroundColor_input = (value: string) => {
    data.backgroundColor_input = value
  }

  const confirm_borderColor_input = (value: string) => {
    data.borderColor_input = value
  }

  const confirm_activeBackgroundColor_input = (value: string) => {
    data.activeBackgroundColor_input = value
  }

  const confirm_activeBorderColor_input = (value: string) => {
    data.activeBorderColor_input = value
  }

  const confirm_iconColor_input = (value: string) => {
    data.iconColor_input = value
  }

  defineExpose({
    data
  })
</script>

<template>
  <view class="main">
    <radio :disabled="data.disabled_boolean" :checked="data.checked_boolean" :color="data.color_input"
      :backgroundColor="data.backgroundColor_input" :borderColor="data.borderColor_input"
      :activeBackgroundColor="data.activeBackgroundColor_input" :activeBorderColor="data.activeBorderColor_input"
      :iconColor="data.iconColor_input" @click="radio_click" @touchstart="radio_touchstart" @touchmove="radio_touchmove"
      @touchcancel="radio_touchcancel" @touchend="radio_touchend" @tap="radio_tap" @longpress="radio_longpress">
      <text>uni-app-x</text>
    </radio>
  </view>

  <scroll-view style="flex: 1">
    <view class="content">
      <page-head title="组件属性"></page-head>
      <boolean-data :defaultValue="false" title="<radio/> 当前是否选中" @change="change_checked_boolean"></boolean-data>
      <boolean-data :defaultValue="false" title="是否禁用" @change="change_disabled_boolean"></boolean-data>
    </view>

    <view>
      <page-head title="默认及使用"></page-head>
      <view class="uni-padding-wrap">
        <view class="uni-title uni-common-mt">
          <text class="uni-title-text"> 默认样式 </text>
        </view>
        <radio-group class="uni-flex uni-row radio-group" @change="testChange" style="flex-wrap: wrap">
          <radio id="trigger-change" value="r" :checked="data.checked" :color="data.color" style="margin-right: 15px"
            class="radio r">选中
          </radio>
          <radio value="r1" style="margin-right: 15px" class="radio r1">{{
            data.text
          }}</radio>
          <radio value="r2" :disabled="data.disabled" class="radio r2">禁用</radio>
          <radio value="r3" class="radio r3" style="margin-top: 10px">{{
            data.wrapText
          }}</radio>
        </radio-group>
      </view>

      <view class="uni-padding-wrap">
        <view class="uni-title uni-common-mt">
          <text class="uni-title-text"> 不同颜色和尺寸的radio </text>
        </view>
        <radio-group class="uni-flex uni-row radio-group">
          <!-- #ifndef VUE3-VAPOR -->
          <radio value="r1" :checked="true" color="#FFCC33" style="transform: scale(0.7); margin-right: 15px"
            class="radio">选中
          </radio>
          <radio value="r2" color="#FFCC33" style="transform: scale(0.7)" class="radio">未选中</radio>
          <!-- #endif -->
          <!-- #ifdef VUE3-VAPOR -->
          <radio value="r1" :checked="true" radio-active-class="radio-active" style="transform: scale(0.7); margin-right: 15px"
            class="radio">选中
          </radio>
          <radio value="r2" id="radio-vapor" radio-active-class="radio-active" style="transform: scale(0.7)" class="radio">未选中</radio>
          <!-- #endif -->
        </radio-group>
      </view>


      <view class="uni-padding-wrap">
        <view class="uni-title uni-common-mt">
          <text class="uni-title-text"> 两端对齐样式测试 </text>
        </view>
        <radio-group class="uni-flex uni-row radio-group">
          <radio class="justify-test">justify-content样式测试</radio>
        </radio-group>
      </view>

      <view class="uni-padding-wrap">
        <view class="uni-title uni-common-mt">
          <text class="uni-title-text"> 推荐展示样式 </text>
        </view>
      </view>
      <view class="uni-list uni-common-pl">
        <radio-group @change="radioChange" class="radio-group">
          <radio class="uni-list-cell uni-list-cell-pd radio recommand" v-for="(item, index) in data.items" :key="item.value"
            :class="index < data.items.length - 1 ? 'uni-list-cell-line' : ''" :value="item.value"
            :checked="index === data.current">
            {{ item.name }}
          </radio>
        </radio-group>
      </view>
    </view>

    <!-- #ifndef VUE3-VAPOR -->
    <view>
      <input-data defaultValue="#007AFF" title="radio的颜色" type="text" @confirm="confirm_color_input"></input-data>
      <input-data defaultValue="#ffffff" title="radio默认的背景颜色" type="text"
        @confirm="confirm_backgroundColor_input"></input-data>
      <input-data defaultValue="#d1d1d1" title="radio默认的边框颜色" type="text"
        @confirm="confirm_borderColor_input"></input-data>
      <input-data defaultValue="#007AFF" title="radio选中时的背景颜色，优先级大于color属性" type="text"
        @confirm="confirm_activeBackgroundColor_input"></input-data>
      <input-data defaultValue="" title="radio选中时的边框颜色" type="text"
        @confirm="confirm_activeBorderColor_input"></input-data>
      <input-data defaultValue="#ffffff" title="radio的图标颜色" type="text" @confirm="confirm_iconColor_input"></input-data>
    </view>
    <!-- #endif -->

    <navigator class="uni-common-mb" url="/pages/template/radio-200/radio-200">
      <button class="uni-common-mt">组件性能测试</button>
    </navigator>
  </scroll-view>
</template>

<style>
  .main {
    max-height: 250px;
    padding: 5px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    flex-direction: row;
    justify-content: center;
  }

  .uni-list-cell {
    justify-content: flex-start;
  }

  .justify-test {
    width: 100%;
    justify-content: space-between;
  }

  /* #ifdef VUE3-VAPOR */
  .radio-active {
    background-color: #FFCC33;
    border-color: #FFCC33;
  }
  /* #endif */
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.form-component.radio.radio)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/radio.html#radio)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/radio.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=radio&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=radio&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=radio&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=radio&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=radio)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=radio&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

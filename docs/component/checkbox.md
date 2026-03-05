<!-- ## checkbox -->

::: sourceCode
## checkbox
:::

> 组件类型：UniCheckboxElement 

 多选项。在1组check-group中可选择多个


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
| ~~color~~ | string([string.ColorString](/uts/data-type.md#ide-string)) | "#007aff" | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | checkbox的颜色 (使用foreColor替代) |
| backgroundColor | string([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | checkbox默认的背景颜色 |
| borderColor | string([string.ColorString](/uts/data-type.md#ide-string)) | "#d1d1d1" | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | checkbox默认的边框颜色 |
| activeBackgroundColor | string([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | checkbox选中时的背景颜色 |
| activeBorderColor | string([string.ColorString](/uts/data-type.md#ide-string)) | "#d1d1d1" | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | checkbox选中时的边框颜色 |
| ~~iconColor~~ | string([string.ColorString](/uts/data-type.md#ide-string)) | "#007aff" | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | checkbox的图标颜色，优先级大于color属性 (使用foreColor替代) |
| foreColor | string([string.ColorString](/uts/data-type.md#ide-string)) | "#007aff" | Web: 4.18; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): - | checkbox的图标颜色，优先级大于color属性 |
| icon-class | [string.ClassString](/uts/data-type.md#ide-string) | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): 5.0 | 复选框选中图标的类名 |
| checkbox-class | [string.ClassString](/uts/data-type.md#ide-string) | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): 5.0 | 复选框未选中的类名 |
| checkbox-active-class | [string.ClassString](/uts/data-type.md#ide-string) | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): 5.0 | 复选框选中的类名 |



<!-- UTSCOMJSON.checkbox.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/checkbox/checkbox.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/checkbox/checkbox.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/checkbox/checkbox

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/checkbox/checkbox

>示例
```vue
<script setup lang="uts">
  type ItemType = {
    value: string
    name: string
    checked: boolean
  }

  type DataType = {
    items: ItemType[];
    testEvent: boolean;
    text: string;
    wrapText: string;
    value: string[];
    disabled: boolean;
    checked: boolean;
    color: string;
    iconColor: string;
    foreColor: string;
    checked_boolean: boolean;
    disabled_boolean: boolean;
    color_input: string;
    backgroundColor_input: string;
    borderColor_input: string;
    activeBackgroundColor_input: string;
    activeBorderColor_input: string;
    iconColor_input: string;
    foreColor_input: string;
  }
  // 使用reactive避免ref数据在自动化测试中无法访问
  const data = reactive({
    items: [
      {
        value: 'CHN',
        name: '中国',
        checked: true,
      },
      {
        value: 'USA',
        name: '美国',
        checked: false,
      },
      {
        value: 'BRA',
        name: '巴西',
        checked: false,
      },
      {
        value: 'JPN',
        name: '日本',
        checked: false,
      },
      {
        value: 'ENG',
        name: '英国',
        checked: false,
      },
      {
        value: 'FRA',
        name: '法国',
        checked: false,
      },
    ],
    testEvent: false,
    text: '未选中',
    wrapText: 'uni-app x，终极跨平台方案\nuts，大一统语言',
    value: [],
    disabled: true,
    checked: true,
    color: '#007aff',
    iconColor: '#211cfe',
    foreColor: '#ff0000',
    // 组件属性 autotest
    checked_boolean: false,
    disabled_boolean: false,
    color_input: "#007aff",
    backgroundColor_input: "#ffffff",
    borderColor_input: "#d1d1d1",
    activeBackgroundColor_input: "#ffffff",
    activeBorderColor_input: "#d1d1d1",
    iconColor_input: "#007aff",
    foreColor_input: '#ff0000'
  } as DataType)

  const checkboxChange = (e: UniCheckboxGroupChangeEvent) => {
    // 自动化测试
    if ((e.target?.tagName ?? '') == 'CHECKBOX-GROUP' && e.type === 'change') {
      data.testEvent = true
    }

    const selectedNames: string[] = []
    data.items.forEach((item) => {
      if (e.detail.value.includes(item.value)) {
        selectedNames.push(item.name)
      }
    })
    uni.showToast({
      icon: 'none',
      title: '当前选中:' + selectedNames.join(','),
    })
  }

  const testChange = (e: UniCheckboxGroupChangeEvent) => {
    data.value = e.detail.value
  }

  const checkbox_click = () => {
    console.log("组件被点击时触发")
  }

  const checkbox_touchstart = () => {
    console.log("手指触摸动作开始")
  }

  const checkbox_touchmove = () => {
    console.log("手指触摸后移动")
  }

  const checkbox_touchcancel = () => {
    console.log("手指触摸动作被打断，如来电提醒，弹窗")
  }

  const checkbox_touchend = () => {
    console.log("手指触摸动作结束")
  }

  const checkbox_tap = () => {
    console.log("手指触摸后马上离开")
  }

  const checkbox_longpress = () => {
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

  const confirm_foreColor_input = (value: string) => {
    data.foreColor_input = value
  }

  defineExpose({
    data
  })
</script>

<template>
  <view class="main">
    <checkbox :disabled="data.disabled_boolean" :checked="data.checked_boolean" :color="data.color_input"
      :iconColor="data.iconColor_input" :foreColor="data.foreColor_input" :backgroundColor="data.backgroundColor_input"
      :borderColor="data.borderColor_input" :activeBackgroundColor="data.activeBackgroundColor_input"
      :activeBorderColor="data.activeBorderColor_input" @click="checkbox_click" @touchstart="checkbox_touchstart"
      @touchmove="checkbox_touchmove" @touchcancel="checkbox_touchcancel" @touchend="checkbox_touchend"
      @tap="checkbox_tap" @longpress="checkbox_longpress"><text>uni-app-x</text></checkbox>
  </view>

  <scroll-view style="flex: 1">
    <view class="content">
      <page-head title="组件属性"></page-head>
      <boolean-data :defaultValue="false" title="当前是否选中，可用来设置默认选中" @change="change_checked_boolean"></boolean-data>
      <boolean-data :defaultValue="false" title="是否禁用" @change="change_disabled_boolean"></boolean-data>
    </view>

    <view>
      <page-head title="默认及使用"></page-head>
      <view class="uni-padding-wrap uni-common-mt">
        <view class="uni-title uni-common-mt">
          <text class="uni-title-text"> 默认样式 </text>
        </view>
        <view>
          <checkbox-group class="uni-flex uni-row checkbox-group" @change="testChange" style="flex-wrap: wrap">
            <checkbox value="cb" :checked="data.checked" :color="data.color" :iconColor="data.iconColor"
              :foreColor="data.foreColor" style="margin-right: 15px" class="checkbox cb">选中
            </checkbox>
            <checkbox value="cb1" style="margin-right: 15px" class="checkbox cb1">{{ data.text }}</checkbox>
            <checkbox value="cb2" :disabled="data.disabled" class="checkbox cb2">禁用</checkbox>
            <checkbox value="cb3" style="margin-top: 10px" class="checkbox cb3">
              {{ data.wrapText }}
            </checkbox>
          </checkbox-group>
        </view>
        <view class="uni-title uni-common-mt">
          <text class="uni-title-text"> 不同颜色和尺寸的checkbox </text>
        </view>
        <view>
          <checkbox-group class="uni-flex uni-row checkbox-group">
            <!-- #ifndef VUE3-VAPOR -->
            <checkbox value="cb1" :checked="true" color="#FFCC33" style="transform: scale(0.7); margin-right: 15px"
              class="checkbox">选中
            </checkbox>
            <checkbox value="cb" color="#FFCC33" style="transform: scale(0.7)" class="checkbox">未选中</checkbox>
            <!-- #endif -->

            <!-- #ifdef VUE3-VAPOR -->
            <checkbox value="cb1" :checked="true" icon-class="custom-icon"
              style="transform: scale(0.7); margin-right: 15px" class="checkbox">选中
            </checkbox>
            <checkbox value="cb" icon-class="custom-icon" style="transform: scale(0.7)" class="checkbox">未选中</checkbox>
            <!-- #endif -->
          </checkbox-group>
        </view>
        <view class="uni-title uni-common-mt">
          <text class="uni-title-text"> 两端对齐样式测试 </text>
        </view>
        <view>
          <checkbox-group class="uni-flex uni-row checkbox-group">
            <checkbox class="justify-test">justify-content样式测试</checkbox>
          </checkbox-group>
        </view>
      </view>

      <!-- #ifdef VUE3-VAPOR -->
      <view class="uni-padding-wrap">
        <view class="uni-title uni-common-mt">
          <text class="uni-title-text"> 自定义 checkbox </text>
        </view>
        <checkbox-group class="uni-flex uni-row checkbox-group">
          <checkbox checkbox-class="custom-checkbox" id="checkbox-vapor"> 自定义 checkbox </checkbox>
        </checkbox-group>
      </view>
      <!-- #endif -->

      <view class="uni-padding-wrap">
        <view class="uni-title uni-common-mt">
          <text class="uni-title-text"> 推荐展示样式 </text>
        </view>
      </view>
      <view class="uni-list uni-common-pl">
        <checkbox-group @change="checkboxChange" class="checkbox-group" id="trigger-change">
          <checkbox class="uni-list-cell uni-list-cell-pd checkbox" v-for="(item, index) in data.items"
            :key="item.value" :value="item.value" :checked="item.checked" :class="[
              index < data.items.length - 1 ? 'uni-list-cell-line' : '',
              'checkbox-item-' + index,
            ]">
            {{ item.name }}
          </checkbox>
        </checkbox-group>
      </view>
    </view>

    <!-- #ifndef VUE3-VAPOR -->
    <view>
      <input-data defaultValue="#007aff" title="checkbox的颜色" type="text" @confirm="confirm_color_input"></input-data>
      <input-data defaultValue="#ffffff" title="checkbox默认的背景颜色" type="text"
        @confirm="confirm_backgroundColor_input"></input-data>
      <input-data defaultValue="#d1d1d1" title="checkbox默认的边框颜色" type="text"
        @confirm="confirm_borderColor_input"></input-data>
      <input-data defaultValue="#ffffff" title="checkbox选中时的背景颜色" type="text"
        @confirm="confirm_activeBackgroundColor_input"></input-data>
      <input-data defaultValue="#d1d1d1" title="checkbox选中时的边框颜色" type="text"
        @confirm="confirm_activeBorderColor_input"></input-data>
      <input-data defaultValue="#007aff" title="iconColor: checkbox的图标颜色，优先级大于color属性" type="text"
        @confirm="confirm_iconColor_input"></input-data>
      <input-data defaultValue="#ff0000" title="foreColor: checkbox的图标颜色，优先级大于color属性" type="text"
        @confirm="confirm_foreColor_input"></input-data>
    </view>
    <!-- #endif -->

    <navigator class="uni-common-mb" url="/pages/template/checkbox-200/checkbox-200">
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
  .custom-icon {
    color: #FFCC33;
  }

  .custom-checkbox {
    background-color: #e1e1e180;
    border-color: #ffffff;
  }
  /* #endif */
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.form-component.checkbox.checkbox)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/checkbox.html#checkbox)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/checkbox.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=checkbox&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=checkbox&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=checkbox&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=checkbox&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=checkbox)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=checkbox&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

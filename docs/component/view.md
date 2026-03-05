<!-- ## view -->

::: sourceCode
## view
:::

> 组件类型：UniViewElement 

 基本视图容器

view组件是 uni-app x 最基本的视图容器，它的作用类似于HTML中的div标签。


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| hover-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "none" | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果 |
| hover-stop-propagation | boolean | false | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指定是否阻止本节点的祖先节点出现点击态(祖先节点：指根节点到该节点路径上的所有节点都是这个节点的祖先节点) |
| hover-start-time | number | 50 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 按住后多久出现点击态，单位毫秒 |
| hover-stay-time | number | 400 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 手指松开后点击态保留时间，单位毫秒 |
| flatten | boolean | false | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS 系统版本: 6.0; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 是否拍平组件 |

#### hover-class说明@hover-class

- 为什么使用`hover-class`？使用 css :active伪类来实现点击态，很容易触发，并且滚动或滑动时点击态不会消失，体验较差。小程序平台均给view引入了`hover-class`，考虑到跨端兼容和体验，建议使用 `hover-class` 属性来实现点击态效果。并且App平台目前暂不支持css伪类。




<!-- UTSCOMJSON.view.component_type-->

#### App平台@app
- HBuilder4.0以下版本`hover-class`属性App端与微信小程序效果一样，手指按下进入`hover-class`状态后，手指移动就会取消`hover-class`状态
- HBuilder4.0及以上版本App端调整为手指在view范围内移动不会取消`hover-class`状态，手指移动到view范围之外才会取消`hover-class`状态


#### 获取原生view对象@nativeview

为增强uni-app x组件的开放性，从 `HBuilderX 4.25` 起，UniElement对象提供了 [getAndroidView](../dom/unielement.md#getandroidview) 和 [getIOSView](../dom/unielement.md#getiosview) 方法。

该方法可以获取到 view 组件对应的原生对象，即Android的`ViewGroup`对象、iOS的`UIView`对象。

进而可以调用原生对象提供的方法，这极大的扩展了组件的能力。

**Android 平台：**

获取view组件对应的UniElement对象，通过UniElement对象的[getAndroidView](../dom/unielement.md#getandroidview-2)函数获取组件原生ViewGroup对象

```uts
//导入安卓原生ViewGroup对象
import ViewGroup from "android.view.ViewGroup"

//通过view组件定义的id属性值，获取view标签的UniElement对象
const viewElement = uni.getElementById(id)
//UniElement.getAndroidView设置泛型为安卓底层ViewGroup对象, 直接获取ViewGroup 如果泛型不匹配会返回null
if(viewElement != null) {
	//viewGroup就是view组件对应的原生view对象
	const viewGroup = viewElement.getAndroidView<ViewGroup>()
	if(viewGroup != null) {
		// viewGroup.xx 即可使用ViewGroup的方法
	}
}
```

**iOS 平台：**

获取view组件对应的UniElement对象，通过UniElement对象的[getIOSView](../dom/unielement.md#getiosview)函数获取组件原生UIView对象

```uts
//通过 view 组件定义的 id 属性值，获取 view 标签的 UniElement 对象
const viewElement = uni.getElementById(id)
//获取原生 view
const view = viewElement?.getIOSView();
if (view != null && view instanceof UIView) {
    // view.xx 即可使用UIView的方法
}

```

+ iOS平台 uvue 环境使用 js 驱动无法处理原生类型，getIOSView 方法需要在 uts 插件中使用。

更多示例请参考 uts 插件 [uts-get-native-view](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/uni_modules/uts-get-native-view/utssdk/app-ios/index.uts)

### 子组件 @children-tags
支持所有组件

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/view/view.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/view/view.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/view/view

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/view/view

>示例
```vue
<template>
  <page-head title="view"></page-head>
  <scroll-view style="flex: 1">
    <view class="uni-padding-wrap uni-common-mt">
      <!-- view样式大合集 -->
      <text class="uni-title-text">view样式大合集</text>
      <view class="styled-view-row">
        <view class="styled-view">
          <text class="demo-text">普通view</text>
        </view>
        <view class="styled-view" flatten>
          <text class="demo-text" flatten>拍平view</text>
        </view>
      </view>

      <text class="uni-title-text">自定义组件：右边拍平</text>
      <view class="styled-view-row">
        <child></child>
        <child flatten></child>
      </view>

      <text class="uni-title-text uni-common-mt">Hover 点击态效果</text>
      <view id="view" class="main" :hover-class="data.hover_class ? 'is-parent-hover' : 'none'">
        <view id="view-child1" class="test-view" :class="isDarkMode ? 'theme-dark' : 'theme-light'" :hover-class="data.hover_class ? 'is-hover' : 'none'" :hover-stop-propagation="data.stop_propagation"
          :hover-start-time="data.start_time" :hover-stay-time="data.stay_time">
        </view>
      </view>

      <view class="content">
        <boolean-data :defaultValue="false" title="是否指定按下去的样式类" @change="change_hover_class_boolean"></boolean-data>
        <boolean-data :defaultValue="false" title="是否阻止本节点的祖先节点出现点击态"
          @change="change_stop_propagation_boolean"></boolean-data>
        <enum-data :items="data.start_time_enum" title="按住后多久出现点击态" @change="radio_change_start_time_enum"></enum-data>
        <enum-data :items="data.stay_time_enum" title="手指松开后点击态保留时间" @change="radio_change_stay_time_enum"></enum-data>
      </view>

      <!-- #ifdef VUE3-VAPOR -->
      <navigator url="/pages/template/4050/4050">
        <button style="margin:20px;">组件性能测试</button>
      </navigator>
      <!-- #endif -->
    </view>
  </scroll-view>

</template>
<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'
  import { state } from '@/store/index.uts'
  import Child from './child.uvue'

  type DataType = {
    hover_class: boolean;
    stop_propagation: boolean;
    start_time: number;
    stay_time: number;
    start_time_enum: ItemType[];
    stay_time_enum: ItemType[];
  }

  // 使用reactive解决ref数据在自动化测试中无法访问
  const data = reactive({
    hover_class: false,
    stop_propagation: false,
    start_time: 50,
    stay_time: 400,
    start_time_enum: [{ "value": 50, "name": "50毫秒" }, { "value": 200, "name": "200毫秒" }],
    stay_time_enum: [{ "value": 400, "name": "400毫秒" }, { "value": 200, "name": "200毫秒" }]
  } as DataType)

  const isDarkMode = computed((): boolean => {
    return state.isDarkMode
  })

  const change_hover_class_boolean = (checked: boolean) => {
    data.hover_class = checked
  }

  const change_stop_propagation_boolean = (checked: boolean) => {
    data.stop_propagation = checked
  }

  const radio_change_start_time_enum = (time: number) => {
    data.start_time = time
  }

  const radio_change_stay_time_enum = (time: number) => {
    data.stay_time = time
  }

  defineExpose({
    data
  })
</script>

<style>
  .styled-view-row {
    flex-direction: row;
    background: #fff;
    justify-content: space-around;
    height: 120px;
    align-items: center;
  }

  /* view样式大合集 */
  .styled-view {
    width: 80px;
    height: 80px;
    margin: 5px;
    padding: 5px;
    border: 2px solid #007aff;
    border-radius: 8px;
    background-color: #f0f8ff;
    box-shadow: 0 2px 4px rgba(0, 122, 255, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0.95;
    position: relative;
    transform: rotate(45deg);
  }

  .demo-text {
    font-size: 12px;
    color: #007aff;
    font-weight: 500;
  }

  .main {
    padding: 5px 0;
    flex-direction: row;
    justify-content: center;
  }

  .test-view {
    height: 200px;
    width: 200px;
    background-color: var(--list-background-color,#ffffff);
  }

  .is-hover {
    background-color: #179b16;
  }

  .is-parent-hover {
    background-color: #aa0000;
  }

</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.view)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/view.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=view&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=view&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=view&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=view&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=view)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=view&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

view是Drawable的组件，也就是可以在view上调用绘制API自绘内容。它类似canvas，但不需要单独的canvas组件，在view上就可以直接draw。[详见](../dom/drawablecontext.md)

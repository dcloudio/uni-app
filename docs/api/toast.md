<!-- ## uni.showToast(options) @showtoast -->

::: sourceCode
## uni.showToast(options) @showtoast

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-prompt


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-prompt

:::

显示消息提示框

### showToast 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ShowToastOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.showToast参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 提示的内容，长度与 icon 取值有关。 |
| icon | string | 否 | "success" | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: x | icon值说明 |
| image | [string.ImageURIString](/uts/data-type.md#ide-string) | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 自定义图标的本地路径（app端暂不支持gif） |
| mask | boolean | 否 | false | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 是否显示透明蒙层，防止触摸穿透 |
| duration | number | 否 | 1500 | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 提示的延迟时间，单位毫秒 |
| position | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | position值说明。纯文本轻提示显示位置，填写有效值后只有 title 属性生效，且不支持通过 uni.hideToast 隐藏。 |
| success | (res: ShowToastSuccess) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.showToast成功回调函数定义 |
| fail | (res: [ShowToastFail](#showtoastfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.showToast失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.showToast完成回调函数定义 | 

##### icon 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| success | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 显示成功图标 |
| error | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 显示错误图标 |
| fail | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 显示错误图标，此时title文本无长度显示，支付宝、抖音小程序生效 |
| exception | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 显示异常图标，此时title文本无长度显示，支付宝小程序生效 |
| loading | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 显示加载图标 |
| none | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 不显示图标 |

##### position 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| top | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 居上显示 |
| center | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 居中显示 |
| bottom | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 居底显示 |

#### ShowToastFail 的属性值 @showtoastfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 撤销 |
| 1001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求参数非法 |




<!-- UTSAPIJSON.showToast.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.toast.showToast)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#showtoast)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=showToast&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=showToast&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=showToast&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=showToast&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=showToast)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=showToast&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.hideToast() @hidetoast -->

::: sourceCode
## uni.hideToast() @hidetoast

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-prompt


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-prompt

:::

隐藏消息提示框。

### hideToast 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |






<!-- UTSAPIJSON.hideToast.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.toast.hideToast)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#hidetoast)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideToast.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=hideToast&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=hideToast&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=hideToast&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=hideToast&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=hideToast)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=hideToast&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/toast/toast.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/toast/toast.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/toast/toast

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/toast/toast

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view direction="vertical" style="flex:1">
  <!-- #endif -->
    <page-head :title="data.title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-padding-wrap">
        <text class="uni-title-text uni-common-mb">设置icon</text>
      </view>
      <view class="uni-list uni-common-pl">
        <radio-group @change="radioChangeIcon">
          <radio class="uni-list-cell uni-list-cell-pd radio-icon" v-for="(icon, index) in data.icon_enum" :key="icon.value"
            :class="index < data.icon_enum.length - 1 ? 'uni-list-cell-line' : ''" :value="icon.value"
            :checked="index === data.icon_current">{{icon.name}}</radio>
        </radio-group>
      </view>
      <view class="uni-list-cell uni-list-cell-padding">
        <view class="uni-list-cell-db">是否显示自定义图标</view>
        <switch :checked="data.imageSelect" @change="change_image_boolean" />
      </view>
      <view class="uni-list-cell uni-list-cell-padding">
        <view class="uni-list-cell-db">是否显示透明蒙层-屏蔽点击事件</view>
        <switch :checked="data.maskSelect" @change="change_mask_boolean" />
      </view>
      <view class="uni-title uni-list-cell-padding">提示的延迟时间，默认：1500（单位毫秒）</view>
      <view class="uni-list-cell-padding">
        <slider @change="sliderChange" foreColor="#007AFF" :value="data.intervalSelect" :min="1500" :max="5000"
          :show-value="true" />
      </view>
      <view class="uni-btn-v">
        <button type="default" @tap="toast1Tap" id="btn-toast-default">点击弹出toast</button>
        <button type="default" @tap="hideToast" id="btn-toast-hide">点击隐藏toast</button>
      </view>
      <!-- #ifdef APP -->
      <view class="uni-padding-wrap uni-common-mt">
        <text class="uni-title-text uni-common-mb"> 设置position，仅App生效 </text>
      </view>
      <view class="uni-list uni-common-pl">
        <radio-group @change="radioChangePosition">
          <radio class="uni-list-cell uni-list-cell-pd radio-position" v-for="(position, index) in data.position_enum"
            :key="position.value" :class="index < data.position_enum.length - 1 ? 'uni-list-cell-line' : ''"
            :value="position.value" :checked="index === data.position_current">{{position.name}}</radio>
        </radio-group>
      </view>
      <button class="uni-btn uni-common-mb" type="default" @tap="toast2Tap">点击弹出设置position的toast</button>
      <!-- #endif -->
      <text>{{data.exeRet}}</text>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type IconItemType = {
    value : "success" | "error" | "fail" | "exception" | "loading" | "none";
    name : string
  }
  type PositionItemType = {
    value : "top" | "center" | "bottom";
    name : string
  }

  type DataType = {
    title: string;
    exeRet: string;
    imageSelect: boolean;
    maskSelect: boolean;
    intervalSelect: number;
    position_current: number;
    position_enum: PositionItemType[];
    icon_current: number;
    icon_enum: IconItemType[];
  }

  // 使用reactive包装数据，避免ref数据在自动化测试中无法获取
  const data = reactive({
    title: 'toast',
    exeRet: '',
    imageSelect: false,
    maskSelect: false,
    intervalSelect: 1500,
    position_current: 0,
    position_enum: [
      { "value": "top", "name": "top: 居上显示（Android 暂不支持）" },
      { "value": "center", "name": "center: 居中显示（Android 暂不支持）" },
      { "value": "bottom", "name": "bottom: 居底显示" },
    ],
    icon_current: 0,
    icon_enum: [
      {
        value: 'success',
        name: '显示成功图标',
      },
      {
        value: 'error',
        name: '显示错误图标',
      },
      // {
      //   value: 'fail',
      //   name: '显示错误图标',
      // },
      // {
      //   value: 'exception',
      //   name: '显示异常图标，此时title文本无长度显示',
      // },
      {
        value: 'loading',
        name: '显示加载图标',
      },
      {
        value: 'none',
        name: '不显示图标',
      },
    ],
  } as DataType)

  onMounted(() => {
    uni.showToast({
      title: 'onMounted 调用示例,2秒后消失'
    })
    setTimeout(function () {
      uni.hideToast()
    }, 2000);
  })

  //自动化测试例专用
  const jest_getWindowInfo = () : GetWindowInfoResult => {
    return uni.getWindowInfo();
  }

  const radioChangeIcon = (e : UniRadioGroupChangeEvent) => {
    for (let i = 0; i < data.icon_enum.length; i++) {
      if (data.icon_enum[i].value === e.detail.value) {
        data.icon_current = i;
        break;
      }
    }
  }

  const change_image_boolean = (e : UniSwitchChangeEvent) => {
    data.imageSelect = e.detail.value
  }

  const change_mask_boolean = (e : UniSwitchChangeEvent) => {
    data.maskSelect = e.detail.value
  }

  const sliderChange = (e : UniSliderChangeEvent) => {
    data.intervalSelect = e.detail.value
  }

  const radioChangePosition = (e : UniRadioGroupChangeEvent) => {
    for (let i = 0; i < data.position_enum.length; i++) {
      if (data.position_enum[i].value === e.detail.value) {
        data.position_current = i;
        break;
      }
    }
  }

  const toast1Tap = () => {
    uni.showToast({
      title: "默认",
      icon: data.icon_enum[data.icon_current].value,
      duration: data.intervalSelect,
      image: data.imageSelect ? "/static/test-image/logo.png" : null,
      mask: data.maskSelect,
      success: (res) => {
        // console.log('success:',res)
        data.exeRet = "success:" + JSON.stringify(res)
      },
      fail: (res) => {
        data.exeRet = "fail:" + JSON.stringify(res)
      },
    })
  }

  const toast3Tap = () => {
    uni.showToast({
      title: "默认",
      icon: 'none',
      duration: data.intervalSelect,
      image: data.imageSelect ? "/static/test-image/logo.png" : null,
      mask: data.maskSelect,
      success: (res) => {
        // console.log('success:',res)
        data.exeRet = "success:" + JSON.stringify(res)
      },
      fail: (res) => {
        data.exeRet = "fail:" + JSON.stringify(res)
      },
    })
  }

  // #ifdef APP
  const toast2Tap = () => {
    let positionValue = data.position_enum[data.position_current].value
    uni.showToast({
      title: "显示一段轻提示,position:" + positionValue,
      position: positionValue,
      success: (res) => {
        data.exeRet = "success:" + JSON.stringify(res)
      },
      fail: (res) => {
        data.exeRet = "fail:" + JSON.stringify(res)
      },
    })
  }
  // #endif

  const hideToast = () => {
    uni.hideToast()
  }

  defineExpose({
    data,
    toast1Tap,
    toast3Tap,
    // #ifdef APP
    toast2Tap,
    // #endif
    hideToast
  })
</script>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## Bug & Tips@tips
- 在 iOS、微信小程序、Web 平台，showToast 是和页面（包括 dialogPage）绑定的
- 在 Android 平台
	* position 设为 bottom 时，为系统toast，此时与 App 绑定，而不是与页面绑定。position 不为 bottom 时仍与页面绑定
	* 系统toast 不支持 icon 图标，仅支持文字
	* 部分 Android ROM，如 MIUI，调用系统 toast 时，会在 toast 行首自动加上 App 图标。此为 ROM 行为，目的是帮助用户区分该 toast 是哪个 App 弹出的
- 在 HarmonyOS 平台，目前只有系统 toast ，和 App window 绑定
- 当 Toast 和页面绑定时：
  + 当showToast执行时，会寻找当前页面栈顶的窗体（包括 dialogPage），找到后进行绑定，然后弹出 Toast。
	+ 在支持 dialogPage 的平台（Web和App），[uni.showModal](./modal.md)、[uni.showActionSheet](./action-sheet.md) 也是 dialogPage 实现的，此时 toast 会绑定到这些 dialogPage 上
	+ 在弹出 Toast 后，再次打开新页面，新页面会覆盖原页面弹出的 Toast。
		+ 如需在新页面（包括 dialogPage）弹出 Toast，需要再次调用 showToast
  + 关闭页面（包括 dialogPage）时，Toast 会跟随页面（包括 dialogPage）一起消失
		+ 如需在dialogPage关闭后，仍然弹出 Toast，需要在关闭dialogPage后再次调用 showToast
- 当 Toast 和应用绑定时，也即系统 toast：
	弹出和关闭页面，系统 toast 都不会跟随页面被遮挡或消失。
- Android 11 及以上版本，应用进入后台后，调用系统 toast 不弹出。 [文档地址](https://developer.android.google.cn/about/versions/11/behavior-changes-11?hl=nb#toasts)
- showToast 里的 Loading，和 showLoading 的区别是，showLoading 需要手动调用 HideLoading 才会关闭。而 showToast 里的 Loading 显示指定时间后会自动关闭。一般情况都需要精准控制关闭时机，所以大多使用 showLoading 和 hideLoading

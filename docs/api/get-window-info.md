<!-- ## uni.getWindowInfo() @getwindowinfo -->

::: sourceCode
## uni.getWindowInfo() @getwindowinfo

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getSystemInfo


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getSystemInfo

:::

同步获取窗口信息

### getWindowInfo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |




### 返回值 

| 类型 | 描述 |
| :- | :- |
| **GetWindowInfoResult** | result |

#### GetWindowInfoResult 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| pixelRatio | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备像素比<br/> |
| screenWidth | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 屏幕宽度，单位为px<br/> |
| screenHeight | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 屏幕高度，单位为px<br/> |
| windowWidth | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 可使用窗口宽度，单位为px<br/> |
| windowHeight | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 可使用窗口高度，单位为px<br/> |
| statusBarHeight | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 状态栏的高度，单位为px<br/> |
| windowTop | number | 是 | - | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 内容区域距离顶部的距离（同CSS变量 `--window-top`），单位为px<br/> |
| windowBottom | number | 是 | - | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 内容区域距离底部的距离（同CSS变量 `--window-bottom`），单位为px<br/> |
| safeArea | **SafeArea** | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域在屏幕中的位置信息<br/> |
| safeAreaInsets | **SafeAreaInsets** | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域插入位置（与屏幕边界的距离）信息<br/> |
| screenTop | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 窗口上边缘的 y 值，单位为px<br/> |
| cutoutArea | Array&lt;**CutoutRect**&gt; | 否 | - | Web: x; 微信小程序: x; Android 系统版本: 9.0; Android: 4.31; iOS: x; HarmonyOS: x | 挖孔、刘海区域在屏幕中的位置信息<br/> |

##### safeArea 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| left | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域左上角横坐标，单位为px<br/> |
| right | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域右下角横坐标，单位为px<br/> |
| top | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域左上角纵坐标，单位为px<br/> |
| bottom | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域右下角纵坐标，单位为px<br/> |
| width | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域的宽度，单位为px<br/> |
| height | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域的高度，单位为px<br/> |

##### safeAreaInsets 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| left | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域左侧插入位置（距离左边边界距离），单位为px<br/> |
| right | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域右侧插入位置（距离右边边界距离），单位为px<br/> |
| top | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区顶部插入位置（距离顶部边界距离），单位为px<br/> |
| bottom | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域底部插入位置（距离底部边界距离），单位为px<br/> |

##### cutoutArea 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| left | number | 是 | - | Web: x; 微信小程序: x; Android 系统版本: 9.0; Android: 4.31; iOS: x; HarmonyOS: x | 挖孔、刘海区域左上角横坐标，单位为px<br/> |
| right | number | 是 | - | Web: x; 微信小程序: x; Android 系统版本: 9.0; Android: 4.31; iOS: x; HarmonyOS: x | 挖孔、刘海区域右下角横坐标，单位为px<br/> |
| top | number | 是 | - | Web: x; 微信小程序: x; Android 系统版本: 9.0; Android: 4.31; iOS: x; HarmonyOS: x | 挖孔、刘海区域左上角纵坐标，单位为px<br/> |
| bottom | number | 是 | - | Web: x; 微信小程序: x; Android 系统版本: 9.0; Android: 4.31; iOS: x; HarmonyOS: x | 挖孔、刘海区域右下角纵坐标，单位为px<br/> | 


`uni.getWindowInfo`是全局API，沿袭自小程序。但小程序并未考虑丰富的场景，其实手机屏幕尺寸、应用所占区域尺寸、页面所占区域尺寸是3个概念。

在小屏模式、分屏模式、特殊页面（tabbar和dialogPage）等特殊场景下，这3个概念的数值不相同。但uni的全局API无法表达差异，需要在页面对象上补充区域尺寸信息。

其实大多数情况下开发者需要获取的是当前页面的尺寸，此时在UniPage对象上获取高宽、四边位置更精准。[详见](./unipage.md)

下图标注了各区域信息

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/API/getWindowInfo/size.png)

### 安全区域说明 @safearea

由于全面屏手机屏幕有顶部的摄像头挖空区和底部导航的存在，为了确保内容区域不被遮挡，提出了安全区域概念，以便于在安全区域内布局。

app-android平台全屏模式下分安全区域字段说明：
- safeArea.top : statusBarHeight
- safeArea.bottom: statusBarHeight + 应用导航栏高度 + windowHeight + tabbar高度
- safeArea.height: safeArea.bottom - safeArea.top
- safeAreaInsets: 安全区域与可渲染内容区域边界的距离

HBuilderX4.31版本页面内容可渲染区域在设备系统导航栏设置为`全面屏手势`时，调整为可渲染到手势指示条区域，如不想将页面内容渲染到此区域，可在页面底部设置占位view，其高度为safeAreaInsets.bottom值。

app-ios平台safeArea与iOS原生的安全区域概念相同，top与bottom分别对应`window.safeAreaInsets.top` `window.safeAreaInsets.bottom`，具体请参照[Apple文档](https://developer.apple.com/documentation/uikit/uiview/positioning_content_relative_to_the_safe_area)

::: warning 注意事项
- `screenWidth`/`screenHeight`获取的是设备屏幕宽高信息
    + app平台应用在非全屏模式（如“浮窗”或“分屏”）时，仍然返回的设备屏幕的宽高
- `windowWidth`/`windowHeight`获取的是当前栈顶页面的可使用窗口宽高信息，调用此API前如果打开了新页面，可能获取到的是新开页面的信息
    + app平台需要在页面渲染后才能获取到准确信息，稳妥起见，建议在页面生命周期`onReady`后获取
- `statusBarHeight`获取的是系统状态栏高度
    + app-Android平台横屏时获取的状态栏高度与竖屏一致
    + app-iOS平台横屏时获取的状态栏高度为0，与竖屏时获取的高度不一致
- `windowTop`/`windowBottom` 在app平台页面内容无法渲染顶部默认导航栏或底部tabBar区域，返回的值一定为0
- HBuilderX4.25版本开始，app-android平台返回的安全区域的 top 属性值调整为手机状态栏高度
:::

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-window-info/get-window-info.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-window-info/get-window-info.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-window-info/get-window-info

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-window-info/get-window-info

>示例
```vue
<template>
  <page-head :title="title"></page-head>
  <view class="uni-common-mt">
    <view class="uni-list">
      <view class="uni-list-cell" v-for="(item, _) in data.items" style="align-items: center">
        <view class="uni-pd">
          <view class="uni-label" style="width: 180px">{{ item.label }}</view>
        </view>
        <view class="uni-list-cell-db">
          <text class="uni-list-cell-db-text">{{ item.value == '' ? '未获取' : item.value }}</text>
        </view>
      </view>
    </view>
    <view class="uni-padding-wrap">
      <view class="uni-btn-v">
        <button type="primary" @tap="getWindowInfo">获取窗口信息</button>
      </view>
      <view class="uni-btn-v">
        <navigator url="/pages/API/get-window-info/window-area">
          <button type="primary">窗口各区域示例</button>
        </navigator>
      </view>
    </view>
  </view>
</template>
<script setup lang="uts">
  import { setStatusBarHeight, setSafeArea } from '@/store/index.uts'
  // #ifdef APP-ANDROID
  import type { SafeArea } from '@/store/index.uts'
  // #endif

  type Item = {
    label : string,
    value : string,
  }

  type DataType = {
    items: Item[];
  }

  const title = ref('getWindowInfo')
  const data = reactive({
    items: [] as Item[],
  } as DataType)

  const getWindowInfo = () => {
    const res = uni.getWindowInfo();
    // 获取状态栏高度, 供截图对比使用
    setStatusBarHeight(res.statusBarHeight);
    // 获取安全区信息,供截图使用
    // #ifdef APP-ANDROID
    setSafeArea({
      top: res.safeArea.top,
      left: res.safeArea.left,
      right: res.safeArea.right,
      bottom: res.safeArea.bottom,
      width: res.safeArea.width,
      height: res.safeArea.height,
    } as SafeArea);
    // #endif
    // #ifdef APP-IOS
    setSafeArea({
      top: res.safeArea.top,
      left: res.safeArea.left,
      right: res.safeArea.right,
      bottom: res.safeArea.bottom,
      width: res.safeArea.width,
      height: res.safeArea.height,
    });
    // #endif
    data.items = [] as Item[];

    const res_str = JSON.stringify(res);
    const res_obj = JSON.parseObject(res_str);
    const res_map = res_obj!.toMap();
    let keys = [] as string[]
    res_map.forEach((_, key) => {
      keys.push(key);
    });
    keys.sort().forEach(key => {
      const value = res[key];
      if (value != null) {
        const item = {
          label: key,
          value: "" + ((typeof value == "object") ? JSON.stringify(value) : value)
        } as Item;
        data.items.push(item);
      }
    });
  }

  onReady(() => {
    getWindowInfo()
  })

</script>

<style>
  .uni-pd {
    padding-left: 15px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.getWindowInfo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/getWindowInfo.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getWindowInfo.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getWindowInfo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getWindowInfo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getWindowInfo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getWindowInfo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getWindowInfo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getWindowInfo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


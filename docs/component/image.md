<!-- ## image -->

::: sourceCode
## image
:::

> 组件类型：[UniImageElement](/api/dom/uniimageelement.md) 

 图片


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| src | string([string.ImageURIString](/uts/data-type.md#ide-string)) | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 图片资源地址 |
| mode | string | "scaleToFill" | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 图片裁剪、缩放的模式 |
| lazy-load | boolean | false | Web: x; 微信小程序: 4.41; Android: x; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): x | 图片懒加载。只针对page与scroll-view下的image有效。 安卓默认懒加载不支持修改 |
| fade-show | boolean | false | Web: x; 微信小程序: x; Android: 3.9; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 图片显示动画效果 |
| webp | boolean | true | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): x | 是否支持 WebP 格式，web、app平台默认支持 WebP 格式，不支持本属性，无法关闭对 WebP 格式的解析。 |
| show-menu-by-longpress | boolean | false | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 开启长按图片显示识别小程序码菜单 |
| draggable | boolean | false | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 鼠标长按是否能拖动图片(仅H5平台) |
| flatten | boolean | false | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS 系统版本: 6.0; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 是否拍平组件 |
| @error | (event: [UniImageErrorEvent](#uniimageerrorevent)) => void | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 图片加载错误时触发，event.detail = { errMsg } |
| @load | (event: [UniImageLoadEvent](#uniimageloadevent)) => void | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 图片加载完成时触发，event.detail = { width: '图片宽度px', height: '图片高度px' } |

#### mode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| scaleToFill | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素 |
| aspectFit | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 |
| aspectFill | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取 |
| widthFix | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 宽度不变，高度自动变化，保持原图宽高比不变 |
| heightFix | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 高度不变，宽度自动变化，保持原图宽高比不变 |
| top | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不缩放图片，只显示图片的顶部区域 |
| bottom | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不缩放图片，只显示图片的底部区域 |
| center | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不缩放图片，只显示图片的中间区域 |
| left | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不缩放图片，只显示图片的左边区域 |
| right | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不缩放图片，只显示图片的右边区域 |
| top left | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不缩放图片，只显示图片的左上边区域 |
| top right | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不缩放图片，只显示图片的右上边区域 |
| bottom left | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不缩放图片，只显示图片的左下边区域 |
| bottom right | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不缩放图片，只显示图片的右下边区域 |


### 事件
#### UniImageErrorEvent

```mermaid
graph LR
  
UniImageErrorEvent -- Extends --> UniEvent
  style UniEvent color:#42b983
  click UniEvent "https://doc.dcloud.net.cn/uni-app-x/component/common.html#unievent"
```
##### UniImageErrorEvent 的属性值
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| detail | **UniImageErrorEventDetail** | 是 | - | - |  |

#### detail 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | - | 错误信息 |


#### UniImageLoadEvent

```mermaid
graph LR
  
UniImageLoadEvent -- Extends --> UniEvent
  style UniEvent color:#42b983
  click UniEvent "https://doc.dcloud.net.cn/uni-app-x/component/common.html#unievent"
```
##### UniImageLoadEvent 的属性值
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| detail | **UniImageLoadEventDetail** | 是 | - | - |  |

#### detail 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| width | number | 是 | - | - | 图片宽度 |
| height | number | 是 | - | - | 图片高度 |



<!-- UTSCOMJSON.image.component_type-->

### 图片格式
- web平台支持的图片格式，不同浏览器有差异，可查询caniuse
- 小程序平台支持的图片格式与浏览器类似。但由于不同小程序平台的webview版本不一样，需要具体查阅小程序平台的图片组件介绍。
	注意：webp在不同小程序平台策略不同，有的需要打开 webp 属性，有的仅支持来自服务器的webp。
- 鸿蒙next平台的图片格式[参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-image?ha_source=Dcloud&ha_sourceId=89000448)
- Android和iOS平台支持的图片格式如下：
	* [x] bmp
	* [x] gif
	* [x] ico
	* [x] jpg
	* [x] png
	* [x] webp (iOS14起是硬解码，之前是软解码，软解码性能略低。Android支持)
	* [x] heic (iOS支持，Android10+支持)
	* [x] avif (iOS16+支持，Android不支持)
	* [x] tif (iOS支持，Android不支持)
	* [x] svg (iOS13+支持，Android支持。不支持svg动画。Android暂不支持mode属性。需HBuilderX4.81+)

如需其他图片格式，可自行开发uts组件插件或搜索插件市场，如
- [apng插件](https://ext.dcloud.net.cn/search?q=apng&orderBy=Relevance&cat1=8&cat2=82)


### src路径支持说明

- 本地路径/static方式
	由于uni-app/uni-app x编译时，只把/static目录下的静态资源copy到app中，所以src均需指向/static目录下。
	其他目录的图片由于不会被打包进去，所以无法访问。
	app平台文件路径会存在大小写敏感问题，为了有更好的兼容性，建议统一按大小写敏感原则处理 [详情](../api/file-system-spec.md#casesensitive)

- 本地绝对路径file:///方式
	app-android平台形如`file:///storage/emulated/0/Android/data/io.dcloud.uniappx/apps/__UNI__4517034/www/static/test-image/logo.png`。
	访问本应用内的资源时无需使用本方式，推荐使用/static方式。上述地址受包名、appid影响。
	file:///方式一般用于download等公共目录。使用前需确保拥有相关权限。

- 支持网络路径
	* 支持http、https。
	* 安卓端image组件内部使用facebook的[fresco](https://github.com/facebook/fresco)库(2.5.0)，自带缓存策略，也会自动清理缓存。
	* iOS端image组件内部使用[SDWebImage](https://github.com/SDWebImage/SDWebImage)库(5.10.0)，自带缓存策略，默认7天缓存，缓存过期后会自动清理。
	* 鸿蒙平台image组件使用arkUI的image组件，缓存策略[另见](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-image?ha_source=Dcloud&ha_sourceId=89000448)

### 子组件 @children-tags
不可以嵌套组件

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/image/image.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/image/image.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/image/image

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/image/image

>示例
```vue
<template>
  <view style="flex: 1;">
    <page-head :title="data.title"></page-head>
    <scroll-view style="flex: 1">
      <view class="uni-padding-wrap">
        <!-- image样式大合集 -->
        <text class="uni-title-text">image样式大合集</text>
        <text class="uni-subtitle-text uni-common-mb">右边为拍平</text>
        <view class="styled-image-row">
          <image class="styled-image" mode="aspectFill" :src="data.imageSrc"></image>
          <image class="styled-image" mode="aspectFill" :src="data.imageSrc" flatten></image>
        </view>

        <text class="uni-title-text">自定义组件：右边拍平</text>
        <view class="styled-image-row">
          <child></child>
          <child flatten></child>
        </view>

        <!-- 原有的基础拍平测试 -->
        <text class="uni-title-text uni-common-mt">基础（右边为拍平）</text>
        <view class="uni-center image-bg">
          <image class="image" :fade-show="true" mode="widthFix" :src="data.imageSrc" @error="error" @load="load"></image>
          <image class="image" :fade-show="true" mode="widthFix" :src="data.imageSrc" @error="error" @load="load" flatten></image>
        </view>

        <button class="uni-btn" @tap="imageFormat">图片格式示例</button>
        <button class="uni-btn" @tap="imageMode">图片缩放模式示例</button>
        <button class="uni-btn" @tap="imagePath">图片路径示例</button>
        <button class="uni-btn" @tap="imageLarge">大图示例</button>
        <button class="uni-btn" @tap="imageLong">长图示例</button>
        <button class="uni-btn" @tap="imageOrientation">图片方向修正示例</button>

        <!-- #ifdef VUE3-VAPOR -->
        <navigator url="/pages/template/2000-image/2000-image">
          <button class="uni-btn">组件性能测试</button>
        </navigator>
        <!-- #endif -->
      </view>
    </scroll-view>

    <view v-if="data.autoTest">
      <image :src="data.setCookieImage"></image>
      <image :src="data.verifyCookieImage" @error="error"></image>
    </view>
  </view>
</template>
<script setup lang="uts">
  import Child from './child.uvue'
  type DataType = {
    title: string;
    imageSrc: string.ImageURIString;
    loadError: boolean;
    autoTest: boolean;
    setCookieImage: string;
    verifyCookieImage: string;
    eventLoad: UTSJSONObject | null;
    eventError: UTSJSONObject | null;
  }
  // 使用reactive避免ref数据在自动化测试中无法访问
  const data = reactive({
    title: 'image',
    imageSrc: "/static/test-image/logo.png",
    loadError: false,
    // 自动化测试
    autoTest: false,
    setCookieImage: "",
    verifyCookieImage: "",
    eventLoad: null,
    eventError: null
  } as DataType)

  const error = (event: ImageErrorEvent) => {
    data.loadError = true
    console.log(event.type, event.detail);
    if (data.autoTest) {
      data.eventError = {
        "tagName": event.target?.tagName,
        "type": event.type,
        // "errMsg": event.detail.errMsg
      };
    }
  }

  const load = (event: ImageLoadEvent) => {
    console.log(event.type, event.detail);
    if (data.autoTest) {
      data.eventLoad = {
        "tagName": event.target?.tagName,
        "type": event.type,
        "width": event.detail.width,
        "height": event.detail.height
      };
    }
  }

  const imageFormat = () => {
    uni.navigateTo({
      url: '/pages/component/image/image-format'
    });
  }

  const imageMode = () => {
    uni.navigateTo({
      url: '/pages/component/image/image-mode'
    });
  }

  const imagePath = () => {
    uni.navigateTo({
      url: '/pages/component/image/image-path'
    });
  }

  const imageLarge = () => {
    uni.navigateTo({
      url: '/pages/component/image/image-large'
    });
  }

  const imageLong = () => {
    uni.navigateTo({
      url: '/pages/component/image/image-long'
    });
  }

  const imageOrientation = () => {
    uni.navigateTo({
      url: '/pages/component/image/image-orientation'
    });
  }

  defineExpose({
    data,
    error,
    load,
    imageFormat,
    imageMode,
    imagePath,
    imageLarge,
    imageLong
  })
</script>
<style>
  .styled-image-row {
    flex-direction: row;
    background: #fff;
    justify-content: space-around;
    height: 120px;
    align-items: center;
  }

  /* image样式大合集 */
  .styled-image {
    width: 80px;
    height: 80px;
    margin: 5px;
    padding: 5px;
    border: 2px solid #ff6b6b;
    border-radius: 10px;
    background-color: #ffe0e0;
    /* === 阴影 === */
    box-shadow: 0 3px 6px rgba(255, 107, 107, 0.3);
    /* === 可见性 === */
    opacity: 0.98;
    /* === 变换 === */
    transform: rotate(45deg);
  }

  .image {
    margin: 20px auto;
    width: 100px;
  }

  .image-bg {
    background: #FFFFFF;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.media.image)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/image.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=image&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=image&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=image&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=image&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=image)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=image&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### tips
- image组件默认宽度为320px、高度为240px
- 在error事件里监听报错，并重新设置image组件的src，可实现自定义错误图。[详见示例代码](https://gitcode.com/dcloud/hello-uni-app-x/blob/master/pages/component/image/image-path.uvue)
- 图片文件需在static目录（项目下或uni_modules下都支持static目录）下，或者import导入文件，否则文件不会被copy到最终的包中，导致无法访问
- app-android平台由于默认启用了图片缩放（即根据组件实际宽高加载图片，以节省内存），所以可能导致load事件返回的图片尺寸并非图片原始尺寸
- app-android平台不支持CMYK色彩的图片，[详见](https://github.com/facebook/fresco/issues/1404)
- app-ios平台 iOS14 版本开始系统原生支持 WebP 图片格式，iOS14以下的版本使用三方解码器软解码实现对 WebP 的支持，性能存在一定损耗。如果在iOS14以下同一页面中大量使用WebP图片，会增加性能损耗
- app-ios平台不支持padding style（padding-top、padding-left、padding-right、padding-bottom）
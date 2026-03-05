<!-- ## uni.previewImage(options) @previewimage -->

::: sourceCode
## uni.previewImage(options) @previewimage

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-media


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-media

:::

预览图片

### previewImage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **PreviewImageOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| current | any | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | current 为当前显示图片的链接/索引值，不填或填写的值无效则为 urls 的第一张。APP平台仅支持索引值。 |
| urls | Array&lt;[string.ImageURIString](/uts/data-type.md#ide-string)&gt; | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要预览的图片链接列表 |
| showmenu | boolean | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 是否显示长按菜单<br/> |
| indicator | "default" \| "number" \| "none" | 否 | - | Web: x; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: x | 图片指示器样式<br/> |
| loop | boolean | 否 | - | Web: x; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: x | 是否可循环预览 |
| longPressActions | **LongPressActionsOptions** | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.51; iOS: 4.71; HarmonyOS: x | 长按图片显示操作菜单。 |
| success | (callback: [PreviewImageSuccess](#previewimagesuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (callback: [PreviewImageFail](#previewimagefail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (callback: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） |
| referrerPolicy | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.13.0`<br/><br/>`origin`: 发送完整的referrer; `no-referrer`: 不发送。格式固定为 `https://servicewechat.com/{appid}/{version}/page-frame.html`，其中 {appid} 为小程序的 appid，{version} 为小程序的版本号，版本号为 0 表示为开发版、体验版以及审核版本，版本号为 devtools 表示为开发者工具，其余为正式版本；<br/> | 

##### longPressActions 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| itemList | Array&lt;string&gt; | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 按钮的文字数组 |
| itemColor | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 按钮的文字颜色，字符串格式，默认为"#000000" |
| success | (result: [LongPressActionsSuccessResult](#longpressactionssuccessresult-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [LongPressActionsFailResult](#longpressactionsfailresult-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） |

##### LongPressActionsSuccessResult 的属性值 @longpressactionssuccessresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tapIndex | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| index | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） |

##### LongPressActionsFailResult 的属性值 @longpressactionsfailresult-values 

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
| 1001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | urls至少包含一张图片地址 |
| 1101001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 用户取消 |
| 1101003 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件不存在 |
| 1101004 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 图片加载失败 |
| 1101005 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 未获取权限 |
| 1101010 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 其他错误 |

#### PreviewImageSuccess 的属性值 @previewimagesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errSubject | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 调用API的名称 |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 描述信息 |

#### PreviewImageFail 的属性值 @previewimagefail-values 

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
| 1001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | urls至少包含一张图片地址 |
| 1101001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 用户取消 |
| 1101003 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件不存在 |
| 1101004 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 图片加载失败 |
| 1101005 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 未获取权限 |
| 1101010 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 其他错误 |




### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/preview-image/preview-image.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/preview-image/preview-image.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/preview-image/preview-image

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/preview-image/preview-image

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="padding-left: 8px; padding-right: 8px">
      <view>
        <text class="text-desc">图片指示器样式</text>
        <radio-group class="cell-ct" style="background-color: white" @change="onIndicatorChanged">
          <view class="indicator-it" v-for="(item, index) in indicator" :key="item.value">
            <radio :disabled="isWeb" :checked="index == 0" :value="item.value">{{
              item.name
            }}</radio>
          </view>
        </radio-group>
      </view>
      <view>
        <checkbox-group @change="onCheckboxChange" style="margin-top: 16px; margin-left: 8px">
          <checkbox :disabled="isWeb" :checked="isLoop" style="margin-right: 15px">循环播放</checkbox>
        </checkbox-group>
      </view>
      <view>
        <text class="text-desc">长按行为</text>
        <radio-group class="cell-ct" style="background-color: white; margin-bottom: 16px;" @change="onLongPressCheckboxChange">
          <view class="indicator-it" v-for="(item, index) in longPressAction" :key="item.value">
            <radio :disabled="isWeb" :checked="index == 1" :value="item.value">{{
              item.name
            }}</radio>
          </view>
        </radio-group>
      </view>
      <view style="background-color: white">
        <text class="text-desc">点击图片开始预览</text>
        <view class="cell-ct" style="margin: 8px;">
          <view class="cell cell-choose-image" v-for="(image, index) in imageList" :key="index">
            <text style="width: 100px; height: 100px;background-color: lightgray; color: red; text-align: center; line-height: 100px;font-size: 14px;" v-if="image.error"
              @click="previewImage(index)">图片路径非法</text>
            <image style="width: 100px; height: 100px;background-color: white;" mode="aspectFit" :src="image.src"
              v-if="!image.error" @click="previewImage(index)"
              @error="onImageLoadError(index,$event as ImageErrorEvent)">
            </image>
          </view>
          <image class="cell cell-choose-image" src="/static/plus.png" @click="chooseImage">
          </image>
        </view>
      </view>
      <view style="margin:8px;">
        <text style="color: black;font-size: 18px;margin-bottom: 4px;">注意事项:</text>
        <text style="font-size: 17px;margin-left: 4px;color: darkgray;">1、indicator属性仅App平台支持。</text>
        <text style="font-size: 17px;margin-left: 4px;color: darkgray;">2、Web平台不支持loop属性。</text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type Indicator = "number" | "default" | "none"
  type ItemType = {
    value : Indicator,
    name : string
  }

  type ImageType = {
    src : string,
    error : boolean
  }

  type LongPressType = {
    value : string,
    name : string
  }

  const imageList = ref([
    { src: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png", error: false },
    { src: "/static/test-image/logo.png", error: false },
    { src: "/static/test-image/logo.svg", error: false },
    // #ifdef APP
    { src: "/static/uni2.png", error: false },
    // #endif
  ] as ImageType[])

  const indicator = ref([{
    value: "default",
    name: "圆点"
  }, {
    value: "number",
    name: "数字"
  }, {
    value: "none",
    name: "不显示"
  }] as ItemType[])

  const longPressAction = ref([{
    value: "0",
    name: "默认长按行为"
  }, {
    value: "1",
    name: "自定义长按行为"
  }] as LongPressType[])

  const currentIndicator = ref("default"  as Indicator)

  // #ifdef WEB
  const isWeb = ref(true)
  // #endif
  // #ifndef WEB
  const isWeb = ref(false)
  // #endif

  // #ifdef APP-IOS
  const isIOS = ref(true)
  // #endif
  // #ifndef APP-IOS
  const isIOS = ref(false)
  // #endif

  const isLongPress = ref(true)
  const isLoop = ref(true)

  const previewImage = (index : number) => {
    let list = [] as Array<string>
    imageList.value.forEach((item : ImageType) => {
      list.push(item.src)
    })
    uni.previewImage({
      urls: list,
      current: index,
      indicator: currentIndicator.value,
      loop: isLoop.value,
      longPressActions: (isLongPress.value ? ({
        itemList: ["按钮1", "按钮2", "按钮3"],
        itemColor: "#ccc",
        success: (e : LongPressActionsSuccessResult) => {
          uni.showToast({
            title: "用户选中了第" + (e.index + 1) + "张图片，并选中了第" + (e.tapIndex + 1) + "个选项",
            position: "bottom"
          })
        },
        fail: (e : LongPressActionsFailResult) => {
          uni.showToast({
            title: "用户关闭了action sheet",
            position: "bottom"
          })
        }
      } as LongPressActionsOptions) : null)
    })
  }

  const chooseImage = () => {
    uni.chooseImage({
      sourceType: ['album'],
      count: 1,
      success: (e) => {
        imageList.value = imageList.value.concat({ src: e.tempFilePaths[0], error: false } as ImageType)
        // imageList.value = imageList.value.concat(e.tempFilePaths)
      },
      fail(_) {
      }
    })
  }

  const onIndicatorChanged = (e : UniRadioGroupChangeEvent) => {
    currentIndicator.value = e.detail.value as Indicator
  }

  const onCheckboxChange = (_ : UniCheckboxGroupChangeEvent) => {
    isLoop.value = !isLoop.value
  }

  const onLongPressCheckboxChange = (e: UniRadioGroupChangeEvent) => {
    isLongPress.value = (e.detail.value == "1")
  }

  const onImageLoadError = (index : number, error : UniImageErrorEvent) => {
    imageList.value[index].error = true
  }

  const closePreviewImage = ()=>{
    uni.closePreviewImage({})
  }

  const testSetCurrentIndicator = (value:string) =>{
    currentIndicator.value = value as Indicator
  }

  defineExpose({
  	testSetCurrentIndicator,
    previewImage,
    closePreviewImage
  })
</script>

<style>
  .text-desc {
    margin-top: 16px;
    margin-left: 8px;
    margin-bottom: 16px;
    font-weight: bold;
  }

  .cell-ct {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .cell {
    margin-left: 3px;
    margin-right: 3px;
    width: 100px;
    height: 100px;
  }

  .cell-choose-image {
    border-width: 1px;
    border-style: solid;
    border-color: lightgray;
  }

  .indicator-it {
    margin: 8px;
  }
  .cell-pd {
    padding: 11px 0px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.previewImage.previewImage)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/image.html#unipreviewimageobject)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=previewImage&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=previewImage&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=previewImage&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=previewImage&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=previewImage&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=previewImage)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=previewImage&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 开源自定义@custom
内置的previewImage弹出的界面，无法充分自定义。所以uni-app x提供了开源的previewImage页面，开发者可以自己定义UI。

开源插件地址：[https://ext.dcloud.net.cn/plugin?id=21314](https://ext.dcloud.net.cn/plugin?id=21314)

这个插件是[ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，下载到项目下会覆盖uni.previewImage的实现。

单独下载开源插件后，调用uni.previewImage，会在栈顶页面打开一个dialogPage，在父页面的getDialogPages中可以看到。使用内置的uni.previewImage看不到。

该开源插件目前仅支持Android。后续会补充其他平台。

<!-- ## uni.closePreviewImage(options) @closepreviewimage -->

::: sourceCode
## uni.closePreviewImage(options) @closepreviewimage

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-media


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-media

:::

关闭图片预览

### closePreviewImage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 3.9 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ClosePreviewImageOptions** | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (callback: [ClosePreviewImageSuccess](#closepreviewimagesuccess-values)) => void | 否 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (callback: [ClosePreviewImageFail](#closepreviewimagefail-values)) => void | 否 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (callback: any) => void | 否 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### ClosePreviewImageSuccess 的属性值 @closepreviewimagesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

#### ClosePreviewImageFail 的属性值 @closepreviewimagefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1001 | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | urls至少包含一张图片地址 |
| 1101001 | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 用户取消 |
| 1101003 | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 文件不存在 |
| 1101004 | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 图片加载失败 |
| 1101005 | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 未获取权限 |
| 1101010 | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 其他错误 |




<!-- UTSAPIJSON.closePreviewImage.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.previewImage.closePreviewImage)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/image.html#closepreviewimage)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=closePreviewImage&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=closePreviewImage&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=closePreviewImage&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=closePreviewImage&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=closePreviewImage&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=closePreviewImage)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=closePreviewImage&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## uni.getImageInfo(options) @getImageInfo

获取图片信息

### getImageInfo 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 5.25 | 4.18 | 4.25 | 4.61 |


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **GetImageInfoOptions** | 是 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| src | [string.ImageURIString](/uts/data-type.md#ide-string) | 是 | 微信小程序: 4.41; 支付宝小程序: -; Android: 4.18; iOS: 4.25 | 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径 |
| success | (callback: [GetImageInfoSuccess](#getimageinfosuccess-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: -; Android: 4.18; iOS: 4.25 | 接口调用成功的回调函数 |
| fail | (callback: [GetImageInfoFail](#getimageinfofail-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: -; Android: 4.18; iOS: 4.25 | 接口调用失败的回调函数 |
| complete | (callback: any) => void | 否 | 微信小程序: 4.41; 支付宝小程序: -; Android: 4.18; iOS: 4.25 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### GetImageInfoSuccess 的属性值 @getimageinfosuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| width | number | 是 | 微信小程序: 4.41; 支付宝小程序: -; Android: 4.18; iOS: 4.25 | 图片宽度，单位px |
| height | number | 是 | 微信小程序: 4.41; 支付宝小程序: -; Android: 4.18; iOS: 4.25 | 图片高度，单位px |
| path | string | 是 | 微信小程序: 4.41; 支付宝小程序: -; Android: 4.18; iOS: 4.25 | 返回图片的本地路径 |
| orientation | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: 4.18; iOS: 4.25 | 返回图片的方向 |
| type | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: 4.18; iOS: 4.25 | 返回图片的格式 |

#### orientation 的属性描述

| 合法值 |
| :- |
| up |
| down |
| left |
| right |
| up-mirrored |
| down-mirrored |
| left-mirrored |
| right-mirrored |

#### GetImageInfoFail 的属性值 @getimageinfofail-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errCode | number | 是 | 错误码 |
| errSubject | string | 是 | 统一错误主题（模块）名称 |
| data | any | 否 | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 |  |

#### errCode 的属性描述

| 合法值 | 描述 |
| :- | :- |
| 1101001 | 用户取消 |
| 1101002 | urls至少包含一张图片地址 |
| 1101003 | 文件不存在 |
| 1101004 | 图片加载失败 |
| 1101005 | 未获取权限 |
| 1101006 | 图片或视频保存失败 |
| 1101007 | 图片裁剪失败 |
| 1101008 | 拍照或录像失败 |
| 1101009 | 图片压缩失败 |
| 1101010 | 其他错误 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.getImageInfo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/image.html#getimageinfo)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.getImageInfo.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getImageInfo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getImageInfo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getImageInfo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getImageInfo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getImageInfo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getImageInfo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### tips
web平台读取图片的exif信息，需要引入三方库。考虑到影响web runtime的体积大小，这些三方库并没有内置在uni-app x中。

目前比较主流的库是ExifReader，开发者可自行使用。

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-image-info/get-image-info.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-image-info/get-image-info.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-image-info/get-image-info

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-image-info/get-image-info

>示例
```vue
<template>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-title">
        <text class="uni-subtitle-text">获取本地相对路径图片信息</text>
      </view>
      <image class="image" :src="relativeImagePath" mode="aspectFit"></image>
      <text class="margin-top-10">{{absoluteImageInfo}}</text>
      <view class="uni-title">
        <text class="uni-subtitle-text">获取网络路径图片信息</text>
      </view>
      <image class="image" :src="remoteImagePath" mode="aspectFit"></image>
      <text class="margin-top-10">{{remoteImageInfo}}</text>
      <view class="uni-title">
        <text class="uni-subtitle-text">获取本地绝对路径图片信息</text>
      </view>
      <image class="image" :src="absoluteImagePath" mode="aspectFit"></image>
      <text class="margin-top-10">{{relativeImageInfo}}</text>
      <view class="uni-btn-v">
        <button type="primary" @click="chooseImage">拍摄照片或从相册中选择照片</button>
      </view>
    </view>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type TestStateType = {
    imageInfoForTest: UTSJSONObject | null,
    autoTest: boolean
  }

  const title = ref("getImageInfo")
  const relativeImagePath = ref("/static/test-image/logo.png")
  const relativeImageInfo = ref("")
  const absoluteImagePath = ref("")
  const absoluteImageInfo = ref("")
  const remoteImagePath = ref("https://request.dcloud.net.cn/api/http/contentType/image/png")
  const remoteImageInfo = ref("")
  // 自动化测试
  const testState = reactive({
    imageInfoForTest: null as UTSJSONObject | null,
    autoTest: false
  } as TestStateType)

  const chooseImage = () => {
    uni.chooseImage({
      count: 1,
      success: (res) => {
        absoluteImagePath.value = res.tempFilePaths[0];
        uni.getImageInfo({
          src: res.tempFilePaths[0],
          success: (_res) => {
            console.log("getImageInfo success", JSON.stringify(_res));
            relativeImageInfo.value = `图片宽度: ${_res.width}\n图片高度: ${_res.height}\n图片路径: ${_res.path}\n图片方向: ${_res.orientation}\n图片格式: ${_res.type}`;
          },
          fail: (err) => {
            uni.showModal({
              title: "获取图片信息失败",
              content: JSON.stringify(err),
              showCancel: false
            });
          }
        });
      }
    });
  }

  onLoad((options : OnLoadOptions) => {
    testState.autoTest = options['autoTest'] == 'true'
  })

  onReady(() => {
    uni.getImageInfo({
      src: relativeImagePath.value,
      success: (res) => {
        console.log("getImageInfo success", JSON.stringify(res));
        absoluteImageInfo.value = `图片宽度: ${res.width}\n图片高度: ${res.height}\n图片路径: ${res.path}\n图片方向: ${res.orientation}\n图片格式: ${res.type}`;
        testState.imageInfoForTest = {
          "width": res.width,
          "height": res.height,
          "path": res.path.slice(res.path.indexOf('static/') + 'static/'.length),
          "orientation": res.orientation,
          "type": res.type
        };
      },
      fail: (err) => {
        uni.showModal({
          title: "获取图片信息失败",
          content: JSON.stringify(err),
          showCancel: false
        });
        testState.imageInfoForTest = null;
      }
    });
    uni.getImageInfo({
      src: remoteImagePath.value,
      success: (res) => {
        console.log("getImageInfo success", JSON.stringify(res));
        if (testState.autoTest) {
          remoteImageInfo.value = `图片宽度: ${res.width}\n图片高度: ${res.height}\n图片方向: ${res.orientation}\n图片格式: ${res.type}`;
        } else {
          remoteImageInfo.value = `图片宽度: ${res.width}\n图片高度: ${res.height}\n图片路径: ${res.path}\n图片方向: ${res.orientation}\n图片格式: ${res.type}`;
        }
      },
      fail: (err) => {
        uni.showModal({
          title: "获取图片信息失败",
          content: JSON.stringify(err),
          showCancel: false
        });
      }
    });
  })

  defineExpose({
    testState,
    chooseImage
  })
</script>

<style>
  .image {
    align-self: center;
  }

  .margin-top-10 {
    margin-top: 10px;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 错误信息 |


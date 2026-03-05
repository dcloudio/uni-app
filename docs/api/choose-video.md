<!-- ## uni.chooseVideo(options) @choosevideo -->

::: sourceCode
## uni.chooseVideo(options) @choosevideo

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-media


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-media

:::

拍摄视频或从手机相册中选视频，返回视频的临时文件路径。

### chooseVideo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.18 | 4.18 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ChooseVideoOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| pageOrientation | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.33; iOS: 4.33; HarmonyOS: x | 屏幕方向。默认为page.json中的pageOrientation。 |
| sourceType | Array&lt;string&gt; | 否 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera'\] |
| maxDuration | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.18; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 拍摄视频最长拍摄时间，单位秒。最长支持 60 秒 |
| camera | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.18; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 摄像切换<br/> |
| extension | Array&lt;string&gt; | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。 |
| success | (callback: [ChooseVideoSuccess](#choosevideosuccess-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明 |
| fail | (callback: [ChooseVideoFail](#choosevideofail-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (callback: any) => void | 否 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） |
| ~~albumMode~~ | string | 否 | "custom" | Web: x; 微信小程序: -; Android: 4.33; iOS: x; HarmonyOS: x | 视频选择模式  **已废弃，仅为了向下兼容保留** |
| ~~compressed~~ | boolean | 否 | true | Web: x; 微信小程序: 4.41; Android: 4.18; iOS: 4.18; HarmonyOS: x | 是否压缩所选的视频源文件，默认值为true，需要压缩  **已废弃，仅为了向下兼容保留** | 

##### pageOrientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 自动 |
| portrait | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 竖屏显示 |
| landscape | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 横屏显示 |

##### camera 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| front | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 前置摄像头 |
| back | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 后置摄像头 |

##### albumMode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| custom | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 自定义媒体选择器 |
| system | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 系统媒体选择器 |

#### ChooseVideoSuccess 的属性值 @choosevideosuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFilePath | string | 是 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | 选定视频的临时文件路径 |
| duration | number | 是 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | 选定视频的时间长度 |
| size | number | 是 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | 选定视频的数据量大小 |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | 返回选定视频的长 |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | 返回选定视频的宽 |

#### ChooseVideoFail 的属性值 @choosevideofail-values 

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
| 1101001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 用户取消 |
| 1101002 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | urls至少包含一张图片地址 |
| 1101003 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件不存在 |
| 1101004 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 图片加载失败 |
| 1101005 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 未获取权限 |
| 1101006 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 图片或视频保存失败 |
| 1101007 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 图片裁剪失败 |
| 1101008 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 拍照或录像失败 |
| 1101009 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 图片压缩失败 |
| 1101010 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 其他错误 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.chooseVideo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/video.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseVideo.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=chooseVideo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=chooseVideo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=chooseVideo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=chooseVideo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=chooseVideo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=chooseVideo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/choose-video/choose-video.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/choose-video/choose-video.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/choose-video/choose-video

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/choose-video/choose-video

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <video class="video" :src="src" :controls="true" :poster="videoCoverImage"></video>
      <view class="uni-title">
        <text class="uni-subtitle-text">视频信息</text>
      </view>
      <text>{{videoInfo}}</text>
      <view class="uni-btn-v">
        <button type="primary" @click="chooseVideo">选取视频</button>
      </view>
      <enum-data title="视频来源" :items="sourceTypeItemTypes" @change="onSourceTypeChange"></enum-data>
      <!-- #ifdef APP -->
      <enum-data title="屏幕方向" :items="orientationTypeItemTypes" @change="onOrientationTypeChange"></enum-data>
      <!-- #endif -->
      <enum-data title="摄像头" :items="cameraItemTypes" @change="onCameraChange"></enum-data>
      <!-- #ifdef APP-ANDROID -->
      <enum-data title="相册模式" :items="albumModeTypes" @change="onAlbumModeChange"></enum-data>
      <!-- #endif -->
    </view>
    <input-data title="最长拍摄时间，单位秒" defaultValue="60" type="number" @confirm="onMaxDurationConfirm"></input-data>
    <!-- #ifdef APP -->
    <view class="uni-padding-wrap">
      <boolean-data title="是否压缩（HamonyOS 不支持，推荐使用 uni.compressVideo 进行压缩）" :defaultValue="true" @change="onCompressedChange"></boolean-data>
    </view>
    <!-- #endif -->
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types';
  type Camera = "back" | "front"
  type Source = "album" | "camera"

  const title = ref("chooseVideo")
  const src = ref("")
  const orientationTypeItemTypes = ref([{ "value": 0, "name": "竖屏" }, { "value": 1, "name": "横屏" }, { "value": 2, "name": "自动" }] as ItemType[])
  const sourceTypeItemTypes = ref([{ "value": 0, "name": "从相册中选择视频" }, { "value": 1, "name": "拍摄视频" }, { "value": 2, "name": "从相册中选择视频或拍摄视频" }] as ItemType[])
  const sourceTypeItems = ref([["album"], ["camera"], ["album", "camera"]] as Source[][])
  const cameraItemTypes = ref([{ "value": 0, "name": "后置摄像头" }, { "value": 1, "name": "前置摄像头" }] as ItemType[])
  const albumModeTypes = ref([{ "value": 0, "name": "自定义视频选择器" }, { "value": 1, "name": "系统视频选择器" }] as ItemType[])
  const albumModeTypeItems = ref(["custom", "system"])
  const cameraItems = ref(["back", "front"] as Camera[])
  const sourceType = ref(["album", "camera"] as Source[])
  const orientationType = ref("portrait")
  const orientationTypeItems = ref(["portrait", "landscape", "auto"])
  const compressed = ref(true)
  const maxDuration = ref(60)
  const camera = ref("back" as Camera)
  const videoInfo = ref("")
  const videoCoverImage = ref("")
  const albumMode = ref("custom")

  onPageHide(() => {
    console.log("Page Hide");
  })

  const chooseVideo = () => {
    uni.chooseVideo({
      sourceType: sourceType.value,
      // #ifdef APP
      compressed: compressed.value,
      pageOrientation: orientationType.value,
      // #endif
      maxDuration: maxDuration.value,
      // #ifdef APP-ANDROID
      albumMode: albumMode.value,
      // #endif
      camera: camera.value,
      success: (res) => {
        console.log("chooseVideo success", JSON.stringify(res));
        src.value = res.tempFilePath;
        videoInfo.value = `视频长度: ${res.duration}s\n视频大小: ${Math.ceil(res.size)}KB\n视频宽度: ${res.width}\n视频高度: ${res.height}\n`;
        // #ifdef APP-ANDROID || APP-IOS
        uni.getVideoInfo({
          src: res.tempFilePath,
          success: (_res) => {
            if(_res.thumbTempFilePath != null) {
            videoCoverImage.value = _res.thumbTempFilePath!
            }
          }
        });
        // #endif
      },
      fail: (err) => {
        uni.showModal({
          title: "选择视频失败",
          content: JSON.stringify(err),
          showCancel: false
        });
      }
    });
  }

  const onOrientationTypeChange = (value: number) => {
    orientationType.value = orientationTypeItems.value[value];
  }

  const onSourceTypeChange = (value: number) => {
    sourceType.value = sourceTypeItems.value[value];
  }

  const onCompressedChange = (value: boolean) => {
    compressed.value = value;
  }

  const onMaxDurationConfirm = (value: number) => {
    maxDuration.value = value;
  }

  const onCameraChange = (value: number) => {
    camera.value = cameraItems.value[value];
  }

  const onAlbumModeChange = (value: number) => {
    albumMode.value = albumModeTypeItems.value[value]
  }
</script>

<style>
  .video {
    align-self: center;
    width: 300px;
    height: 225px;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |



## Tips
* 视频选择的相册，在入参option中，推荐设置albumMode为system，即选择系统相册来选择视频。这样可以避免权限问题，并且google play上架也有要求。[google play 照片和视频权限政策](https://support.google.com/googleplay/android-developer/answer/14115180)。后续会废弃custom方式。
* 当设置`albumMode`为`system`时，可以正常上架google play。同时需要注意在manifest.json中将`<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />`和`<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />`权限移除。配置方式参考[移除Android权限](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#removepermissions).
* 系统相册选择界面的主题和国际化，跟随手机rom，而不是跟随app。
* 不推荐使用本API的压缩参数，大视频选择时，会卡在视频选择页面很久。应该在选择完毕视频后，自行择机（比如上传视频时）调用uni.compressVideo来压缩视频。
* 本API会自动申请摄像头，如需手动获取app是否拥有摄像头，参考 [uni.getAppAuthorizeSetting](get-app-authorize-setting.md)。（如使用system方式的相册选择，则不需要权限）
* app端拍摄会在应用沙盒目录的cache目录产生临时文件，位置[详见](file-system-spec.md#cache)。如需主动删除临时文件，使用[uni.getFileSystemManager](get-file-system-manager.md)。
* android端由于系统或ROM的限制，拍照的`maxDuration`和`camera`属性在部分手机上不生效。
* 从HBuilderX4.41版起，uni.chooseVideo在`sourceType`为`['album']`、`albumMode`为`system`、`compressed`为`true`时，支持返回Uri地址。
* 系统视频选择器的`sizeType`仅支持设置`['original']`或`['compressed']`。在Android 11及以上的系统中，设置`system`调用的是系统的视频选择器，低于android 11的系统中会调用系统的文件选择器。

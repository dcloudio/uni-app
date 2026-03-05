## uni.getVideoInfo(options) @getVideoInfo

获取视频详细信息

### getVideoInfo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.18 | 4.25 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetVideoInfoOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| src | [string.VideoURIString](/uts/data-type.md#ide-string) | 是 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 视频文件路径，可以是临时文件路径也可以是永久文件路径 |
| success | (callback: [GetVideoInfoSuccess](#getvideoinfosuccess-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (callback: [GetVideoInfoFail](#getvideoinfofail-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (callback: any) => void | 否 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### GetVideoInfoSuccess 的属性值 @getvideoinfosuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| orientation | string | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 画面方向 |
| type | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 视频格式 |
| duration | number | 是 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 视频长度 |
| size | number | 是 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 视频大小，单位 kB |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 视频的长，单位 px |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 视频的宽，单位 px |
| fps | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.18; iOS: 4.25; HarmonyOS: x | 视频帧率 |
| bitrate | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.18; iOS: 4.25; HarmonyOS: x | 视频码率，单位 kbps |
| thumbTempFilePath | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; HarmonyOS: x | 视频缩略图临时文件路径 |
| byteSize | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; HarmonyOS: x | 视频文件的字节大小 |

#### orientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| up | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| down | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| left | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| right | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| up-mirrored | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| down-mirrored | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| left-mirrored | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| right-mirrored | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### GetVideoInfoFail 的属性值 @getvideoinfofail-values 

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
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.getVideoInfo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/video.html#getvideoinfo)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.getVideoInfo.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getVideoInfo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getVideoInfo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getVideoInfo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getVideoInfo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getVideoInfo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getVideoInfo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-video-info/get-video-info.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-video-info/get-video-info.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-video-info/get-video-info

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-video-info/get-video-info

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-title">
        <text class="uni-subtitle-text">获取本地绝对路径视频信息</text>
      </view>
      <video class="video" :src="absoluteVideoPath" :controls="true" :poster="absoluteCoverImagePath"></video>
      <text class="margin-top-10">{{absoluteVideoInfo}}</text>
      <view class="uni-btn-v">
        <button type="primary" @click="chooseVideo">拍摄视频或从相册中选择视频</button>
      </view>
    </view>
    <!-- #ifndef MP -->
    <view class="uni-padding-wrap">
      <view class="uni-title">
        <text class="uni-subtitle-text">获取本地相对路径视频信息</text>
      </view>
      <video class="video" :src="relativeVideoPath" :controls="true" :poster="relativeCoverImagePath"></video>
      <text class="margin-top-10">{{relativeVideoInfo}}</text>
    </view>
    <!-- #endif -->
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type TestStateType = {
    videoInfoForTest: UTSJSONObject | null
  }

  const title = ref("getVideoInfo")
  const relativeVideoPath = ref("/static/test-video/10second-demo.mp4")
  const relativeVideoInfo = ref("")
  const relativeCoverImagePath = ref("")
  const absoluteVideoPath = ref("")
  const absoluteVideoInfo = ref("")
  const absoluteCoverImagePath = ref("")
  // 自动化测试
  const testState = reactive({
    videoInfoForTest: null as UTSJSONObject | null
  } as TestStateType)
  const needLoadOnReady = ref(true)

  // #ifdef APP-ANDROID
  onLoad((event : OnLoadOptions)=>{
    needLoadOnReady.value = (event["is_debug"] ?? "1") == "1";
  })
  // #endif

  onReady(() => {
    // #ifndef MP
    if(!needLoadOnReady.value) return;
    uni.getVideoInfo({
      src: relativeVideoPath.value,
      success: (res) => {
        console.log("getVideoInfo success", JSON.stringify(res));
        relativeVideoInfo.value = `视频画面方向: ${res.orientation}\n视频格式: ${res.type}\n视频长度: ${res.duration}s\n视频大小: ${res.size}KB\n视频宽度: ${res.width}\n视频高度: ${res.height}\n视频帧率: ${res.fps}fps\n视频码率: ${res.bitrate}kbps`;
        // #ifdef APP-ANDROID || APP-IOS
        relativeVideoInfo.value = relativeVideoInfo.value + `\n视频字节大小: ${res.byteSize}B\n视频首帧图片路径: ${res.thumbTempFilePath}`
        if(res.thumbTempFilePath != null) {
        relativeCoverImagePath.value = res.thumbTempFilePath!;
        }
        // #endif

      },
      fail: (err) => {
        uni.showModal({
          title: "获取视频信息失败",
          content: JSON.stringify(err),
          showCancel: false
        });
      }
    });
    // #endif
  })

  const chooseVideo = () => {
    uni.chooseVideo({
      compressed: false,
      success: (res) => {
        absoluteVideoPath.value = res.tempFilePath;
        uni.getVideoInfo({
          src: res.tempFilePath,
          success: (_res) => {
            console.log("getVideoInfo success", JSON.stringify(_res));
            absoluteVideoInfo.value = `视频画面方向: ${_res.orientation}\n视频格式: ${_res.type}\n视频长度: ${_res.duration}s\n视频大小: ${_res.size}KB\n视频宽度: ${_res.width}\n视频高度: ${_res.height}\n视频帧率: ${_res.fps}fps\n视频码率: ${_res.bitrate}kbps`;
            // #ifdef APP-ANDROID || APP-IOS
            absoluteVideoInfo.value = absoluteVideoInfo.value + `\n视频字节大小: ${_res.byteSize}B\n视频首帧图片路径: ${_res.thumbTempFilePath}`
            if(_res.thumbTempFilePath != null) {
            absoluteCoverImagePath.value = _res.thumbTempFilePath!
            }
            // #endif
          },
          fail: (err) => {
            uni.showModal({
              title: "获取视频信息失败",
              content: JSON.stringify(err),
              showCancel: false
            });
          }
        });
      }
    });
  }

  const testGetVideoInfo = () => {
    uni.getVideoInfo({
      src: '/static/test-video/10second-demo.mp4',
      success: (res) => {
        testState.videoInfoForTest = {
          "orientation": res.orientation,
          "type": res.type,
          "duration": Math.trunc(res.duration),
          "size": res.size,
          "width": res.width,
          "height": res.height,
          "fps": res.fps,
          "bitrate": res.bitrate
        };
      },
      fail: (_) => {
        testState.videoInfoForTest = null;
      }
    });
  }
  defineExpose({
    testState,
    testGetVideoInfo
  })
</script>

<style>
  .video {
    width: 100%;
  }

  .margin-top-10 {
    margin-top: 10px;
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
* 从HBuilderX4.61版起，GetVideoInfoSuccess中的duration、size精度统一调整为小数点后3位数
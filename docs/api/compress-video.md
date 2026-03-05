## uni.compressVideo(options) @compressVideo

压缩视频

### compressVideo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.18 | 4.25 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CompressVideoOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| src | [string.VideoURIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 视频文件路径，可以是临时文件路径也可以是永久文件路径 |
| quality | string | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 压缩质量<br/> |
| bitrate | number | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: 4.25; HarmonyOS: - | 码率，单位 kbps |
| fps | number | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: 4.25; HarmonyOS: - | 帧率 |
| resolution | number | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 相对于原视频的分辨率比例，取值范围(0, 1\] |
| success | (callback: [CompressVideoSuccess](#compressvideosuccess-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (callback: [CompressVideoFail](#compressvideofail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (callback: any) => void | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### CompressVideoSuccess 的属性值 @compressvideosuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFilePath | string | 是 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 压缩后的临时文件地址 |
| size | number | 是 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: - | 压缩后的大小，单位 kB |
| byteSize | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; HarmonyOS: x | 视频文件的字节大小 |

#### CompressVideoFail 的属性值 @compressvideofail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1101001 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 用户取消 |
| 1101002 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | urls至少包含一张图片地址 |
| 1101003 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件不存在 |
| 1101004 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 图片加载失败 |
| 1101005 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 未获取权限 |
| 1101006 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 图片或视频保存失败 |
| 1101007 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 图片裁剪失败 |
| 1101008 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 拍照或录像失败 |
| 1101009 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 图片压缩失败 |
| 1101010 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 其他错误 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.compressVideo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/video.html#compressvideo)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.compressVideo.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=compressVideo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=compressVideo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=compressVideo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=compressVideo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=compressVideo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=compressVideo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/compress-video/compress-video.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/compress-video/compress-video.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/compress-video/compress-video
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <page-head :title="title"></page-head>
    <view>
      <view class="uni-padding-wrap">
        <video class="video" :src="beforeCompressPath" :controls="true" :poster="beforeCoverImagePath"></video>
        <view class="uni-title">
          <text class="uni-subtitle-text">压缩前视频信息</text>
        </view>
        <text>{{beforeCompressVideoInfo}}</text>
        <video class="video" :src="afterCompressPath" :controls="true" :poster="afterCoverImagePath"></video>
        <view class="uni-title">
          <text class="uni-subtitle-text">压缩后视频信息</text>
        </view>
        <text>{{afterCompressVideoInfo}}</text>
        <view class="uni-btn-v">
          <button type="primary" @click="chooseVideo">从相册中选取待压缩的视频</button>
        </view>
        <view class="uni-btn-v">
          <button type="primary" @click="compressVideo">压缩视频</button>
        </view>
        <enum-data title="压缩质量" :items="qualityItemTypes" @change="onQualityChange"></enum-data>
        <view class="uni-common-mt">
          <text class="uni-title uni-title-text">相对于原视频的分辨率比例，取值范围(0, 1]</text>
          <slider :min="0.1" :max="1" :step="0.1" :show-value="true" @change="onResolutionChange"></slider>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types';
  type VideoInfoForTest = {
    width: number;
    height: number;
    isSizeReduce: boolean;
  }

  type TestStateType = {
    videoInfoForTest: VideoInfoForTest | null,
    videoSrcForTestWidth: number,
    videoSrcForTestHeight: number
  }

  const title = ref("compressVideo")
  const beforeCompressVideoInfo = ref("")
  const afterCompressVideoInfo = ref("")
  const beforeCompressPath = ref("")
  const afterCompressPath = ref("")
  const beforeCoverImagePath = ref("")
  const afterCoverImagePath = ref("")
  const qualityItemTypes = ref([{ "value": 0, "name": "low(低)" }, { "value": 1, "name": "medium(中)" }, { "value": 2, "name": "high(高)" }] as ItemType[])
  const qualityItems = ref(["low", "medium", "high"])
  const quality = ref(null as string | null)
  const bitrate = ref(null as number | null)
  const fps = ref(null as number | null)
  const resolution = ref(null as number | null)
  const videoSrcForTest = ref('/static/test-video/10second-demo.mp4')
  // 自动化测试
  const testState = reactive({
    videoInfoForTest: null as VideoInfoForTest | null,
    videoSrcForTestWidth: 0,
    videoSrcForTestHeight: 0
  } as TestStateType)

  const compressVideo = () => {
    if (beforeCompressPath.value == "") {
      uni.showToast({
        title: "请先选择视频",
        icon: "error"
      });
      return;
    }
    uni.showLoading({
      title: "视频压缩中"
    });
    uni.compressVideo({
      src: beforeCompressPath.value,
      quality: quality.value,
      resolution: resolution.value,
      success: (res) => {
        console.log("compressVideo success", JSON.stringify(res));
        afterCompressPath.value = res.tempFilePath;
        uni.showToast({
          title: "压缩成功",
          icon: null
        });
        uni.getVideoInfo({
          src: res.tempFilePath,
          success: (_res) => {
            afterCompressVideoInfo.value = `视频画面方向: ${_res.orientation}\n视频格式: ${_res.type}\n视频长度: ${_res.duration}s\n视频大小: ${_res.size}KB\n视频宽度: ${_res.width}\n视频高度: ${_res.height}\n视频帧率: ${_res.fps}fps\n视频码率: ${_res.bitrate}kbps`;
            // #ifdef APP-ANDROID || APP-IOS
            afterCompressVideoInfo.value = afterCompressVideoInfo.value + `\n视频字节大小: ${_res.byteSize}B\n视频首帧图片路径: ${_res.thumbTempFilePath}`
            if(_res.thumbTempFilePath != null) {
            afterCoverImagePath.value = _res.thumbTempFilePath!
            }
            // #endif
          }
        });
      },
      fail: (err) => {
        uni.showModal({
          title: "压缩视频失败",
          content: JSON.stringify(err),
          showCancel: false
        });
      },
      complete: (_) => {
        uni.hideLoading();
      }
    });
  }

  const chooseVideo = () => {
    uni.chooseVideo({
      sourceType: ["album"],
      compressed: false,
      success: (res) => {
        beforeCompressPath.value = res.tempFilePath;
        uni.getVideoInfo({
          src: res.tempFilePath,
          success: (_res) => {
            beforeCompressVideoInfo.value = `视频画面方向: ${_res.orientation}\n视频格式: ${_res.type}\n视频长度: ${_res.duration}s\n视频大小: ${_res.size}KB\n视频宽度: ${_res.width}\n视频高度: ${_res.height}\n视频帧率: ${_res.fps}fps\n视频码率: ${_res.bitrate}kbps`;
            // #ifdef APP-ANDROID || APP-IOS
            beforeCompressVideoInfo.value = beforeCompressVideoInfo.value + `\n视频字节大小: ${_res.byteSize}B\n视频首帧图片路径: ${_res.thumbTempFilePath}`
            if(_res.thumbTempFilePath != null) {
            beforeCoverImagePath.value = _res.thumbTempFilePath!
            }
            // #endif
          }
        });
      }
    });
  }

  const onQualityChange = (value: number) => {
    quality.value = qualityItems.value[value];
  }

  const onResolutionChange = (event: UniSliderChangeEvent) => {
    resolution.value = event.detail.value;
  }

  const testCompressVideo = () => {
    let beforeCompressSize: number, afterComoressSize: number;
    uni.compressVideo({
      src: videoSrcForTest.value,
      quality: 'medium',
      success: (res) => {
        uni.getVideoInfo({
          src: videoSrcForTest.value,
          success: (_res) => {
            beforeCompressSize = Math.trunc(_res.size);
            testState.videoSrcForTestWidth = _res.width
            testState.videoSrcForTestHeight = _res.height
            uni.getVideoInfo({
              src: res.tempFilePath,
              success: (__res) => {
                afterComoressSize = Math.trunc(__res.size);
                testState.videoInfoForTest = {
                  "width": __res.width,
                  "height": __res.height,
                  "isSizeReduce": afterComoressSize < beforeCompressSize
                } as VideoInfoForTest;
              },
              fail(err) {
                console.log('>>>>>> 压缩失败', err.errMsg)
              }
            });
          }
        });
      },
      fail: (_) => {
        testState.videoInfoForTest = null;
      }
    });
  }

  defineExpose({
    testState,
    testCompressVideo
  })
</script>

<style>
  .video {
    align-self: center;
  }

  .image-container {
    flex-direction: row;
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
* 从HBuilderX4.61版起，CompressVideoSuccess中的size精度统一调整为小数点后3位数
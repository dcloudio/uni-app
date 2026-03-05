## uni.saveVideoToPhotosAlbum(options) @saveVideoToPhotosAlbum

保存视频到系统相册

### saveVideoToPhotosAlbum 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.18 | 4.18 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SaveVideoToPhotosAlbumOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | [string.VideoURIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | 视频文件路径，可以是临时文件路径也可以是永久文件路径 |
| success | (callback: SaveVideoToPhotosAlbumSuccess) => void | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (callback: [SaveVideoToPhotosAlbumFail](#savevideotophotosalbumfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (callback: any) => void | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### SaveVideoToPhotosAlbumFail 的属性值 @savevideotophotosalbumfail-values 

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
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.saveVideoToPhotosAlbum)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/video.html#savevideotophotosalbum)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.saveVideoToPhotosAlbum.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=saveVideoToPhotosAlbum&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=saveVideoToPhotosAlbum&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=saveVideoToPhotosAlbum&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=saveVideoToPhotosAlbum&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=saveVideoToPhotosAlbum)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=saveVideoToPhotosAlbum&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/save-video-to-photos-album/save-video-to-photos-album.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/save-video-to-photos-album/save-video-to-photos-album.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/save-video-to-photos-album/save-video-to-photos-album
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <video class="video" :src="src" :controls="true"></video>
      <button type="primary" class="margin-top-10" @click="saveVideo">将视频保存到手机相册</button>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type TestStateType = {
    success: boolean
  }

  const title = ref('saveVideoToPhotosAlbum')
  const src = ref('/static/test-video/10second-demo.mp4')
  // 使用reactive避免ref数据在自动化测试中无法访问
  const testState = reactive({
    success: false
  } as TestStateType)

  const saveVideo = () => {
    uni.saveVideoToPhotosAlbum({
      filePath: src.value,
      success: (_) => {
        console.log("saveVideoToPhotosAlbum success");
        uni.showToast({
          position: "center",
          icon: "none",
          title: "视频保存成功，请到手机相册查看"
        });
        testState.success = true;
      },
      fail: (err) => {
        uni.showModal({
          title: "保存视频到相册失败",
          content: JSON.stringify(err),
          showCancel: false
        });
        testState.success = false;
      }
    });
  }

  defineExpose({
    testState,
    saveVideo
  })
</script>

<style>
  .video {
    align-self: center;
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


## uni.compressImage(options) @compressImage

压缩图片

### compressImage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.18 | 4.25 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CompressImageOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| src | [string.ImageURIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 图片路径，图片的路径，可以是相对路径、临时文件路径、存储文件路径 |
| quality | number | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效） |
| rotate | number | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 旋转度数，范围0～360 |
| compressedHeight | number | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 压缩后图片的高度，单位为px，若不填写则默认以compressedWidth为准等比缩放 |
| compressedWidth | number | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 压缩后图片的宽度，单位为px，若不填写则默认以compressedHeight为准等比缩放。 |
| success | (callback: [CompressImageSuccess](#compressimagesuccess-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (callback: [CompressImageFail](#compressimagefail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (callback: any) => void | 否 | - | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） |
| ~~width~~ | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 缩放图片的宽度  **已废弃** |
| ~~height~~ | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 缩放图片的高度  **已废弃** | 

#### CompressImageSuccess 的属性值 @compressimagesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFilePath | string | 是 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 压缩后图片的临时文件路径 |

#### CompressImageFail 的属性值 @compressimagefail-values 

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
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.compressImage)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/image.html#compressimage)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.compressImage.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=compressImage&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=compressImage&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=compressImage&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=compressImage&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=compressImage)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=compressImage&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/compress-image/compress-image.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/compress-image/compress-image.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/compress-image/compress-image
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <view>
      <page-head :title="title"></page-head>
      <view class="uni-padding-wrap">
        <view class="image-container">
          <image class="image" :src="beforeCompressPath" mode="aspectFit"></image>
          <image class="image" :src="afterCompressPath" mode="aspectFit"></image>
        </view>
        <view class="uni-title">
          <text class="uni-subtitle-text">压缩前图片信息</text>
        </view>
        <text>{{beforeCompressImageInfo}}</text>
        <view class="uni-title">
          <text class="uni-subtitle-text">压缩后图片信息</text>
        </view>
        <text>{{afterCompressImageInfo}}</text>
        <view class="uni-btn-v">
          <button type="primary" @click="chooseImage">从相册中选取待压缩的图片</button>
        </view>
        <view class="uni-btn-v">
          <button type="primary" @click="compressImage">压缩图片</button>
        </view>
      </view>
      <input-data defaultValue="80" title="压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效）" type="number"
        @confirm="onQualityConfirm"></input-data>
      <input-data title="压缩后图片的宽度，单位px" type="string" @confirm="onCompressedWidthConfirm"></input-data>
      <input-data title="压缩后图片的高度，单位px" type="string" @confirm="onCompressedHeightConfirm"></input-data>
      <input-data defaultValue="0" title="旋转度数，范围0～360" type="number" @confirm="onRotateConfirm"></input-data>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  // #ifdef APP-ANDROID
  import FileInputStream from 'java.io.FileInputStream';
  // #endif

  type DataType = {
    imageInfoForTest: UTSJSONObject | null,
    imageSrcForTest: string,
    compressedWidth: number | null,
    compressedHeight: number | null
  }

  const title = ref("compressImage")
  const beforeCompressImageInfo = ref("")
  const afterCompressImageInfo = ref("")
  const beforeCompressPath = ref("")
  const afterCompressPath = ref("")
  const quality = ref(80)
  const rotate = ref(0)
  // 自动化测试
  const data = reactive({
    imageInfoForTest: null,
    imageSrcForTest: '/static/test-image/logo.png',
    compressedWidth: null,
    compressedHeight: null
  } as DataType)

  const compressImage = () => {
    if (beforeCompressPath.value == "") {
      uni.showToast({
        title: "请先选择图片",
        icon: "error"
      });
      return;
    }
    uni.showLoading({
      title: "图片压缩中"
    });
    uni.compressImage({
      src: beforeCompressPath.value,
      quality: quality.value,
      compressedWidth: data.compressedWidth,
      compressedHeight: data.compressedHeight,
      rotate: rotate.value,
      success: (res) => {
        console.log("compressImage success", JSON.stringify(res));
        afterCompressPath.value = res.tempFilePath;
        uni.showToast({
          title: "压缩成功",
          icon: null
        });
        uni.getImageInfo({
          src: res.tempFilePath,
          success: (_res) => {
            afterCompressImageInfo.value = `图片宽度: ${_res.width}\n图片高度: ${_res.height}\n`;
            // #ifdef APP-ANDROID
            const size = new FileInputStream(res.tempFilePath.substring("file://".length)).available() / 1024;
            afterCompressImageInfo.value = afterCompressImageInfo.value.concat(`图片大小: ${size}KB`);
            // #endif
            // #ifdef APP-HARMONY
            const fsm = uni.getFileSystemManager()
            fsm.getFileInfo({
              filePath: res.tempFilePath,
              digestAlgorithm: null,
              success: (res) => {
                afterCompressImageInfo.value = afterCompressImageInfo.value.concat(`图片大小: ${res.size}KB`);
              }
            })
            // #endif
          }
        });
      },
      fail: (err) => {
        uni.showModal({
          title: "压缩图片失败",
          content: JSON.stringify(err),
          showCancel: false
        });
      },
      complete: (_) => {
        uni.hideLoading();
      }
    });
  }

  const chooseImage = () => {
    uni.chooseImage({
      count: 1,
      sizeType: ["original"],
      sourceType: ["album"],
      success: (res) => {
        beforeCompressPath.value = res.tempFilePaths[0];
        uni.getImageInfo({
          src: res.tempFilePaths[0],
          success: (_res) => {
            beforeCompressImageInfo.value = `图片宽度: ${_res.width}\n图片高度: ${_res.height}\n`;
            // #ifdef APP-ANDROID
            const size = new FileInputStream(res.tempFilePaths[0].substring("file://".length)).available() / 1024;
            beforeCompressImageInfo.value = beforeCompressImageInfo.value.concat(`图片大小: ${size}KB`);
            // #endif
            // #ifdef APP-HARMONY
            const fsm = uni.getFileSystemManager()
            fsm.getFileInfo({
              filePath: res.tempFilePaths[0],
              digestAlgorithm: null,
              success: (res) => {
                beforeCompressImageInfo.value = beforeCompressImageInfo.value.concat(`图片大小: ${res.size}KB`);
              },
              fail: (err) => {
                console.log(err);
              }
            })
            // #endif
          }
        });
      }
    });
  }

  const onQualityConfirm = (value: number) => {
    quality.value = value;
  }

  const onCompressedWidthConfirm = (value: string) => {
    data.compressedWidth = parseInt(value);
  }

  const onCompressedHeightConfirm = (value: string) => {
    data.compressedHeight = parseInt(value);
  }

  const onRotateConfirm = (value: number) => {
    rotate.value = value;
  }

  const testCompressImage = () => {
    uni.compressImage({
      src: data.imageSrcForTest,
      quality: 50,
      compressedWidth: 100,
      compressedHeight: 100,
      success: (res) => {
        uni.getImageInfo({
          src: res.tempFilePath,
          success: (_res) => {
            // #ifdef APP-HARMONY || APP-ANDROID
            const fsm = uni.getFileSystemManager()
            fsm.getFileInfo({
              filePath: data.imageSrcForTest,
              digestAlgorithm: null,
              success: (imageInfo) => {
                fsm.getFileInfo({
                  filePath: res.tempFilePath,
                  digestAlgorithm: null,
                  success: (res) => {
                    data.imageInfoForTest = {
                      "width": _res.width,
                      "height": _res.height,
                      "isSizeReduce": res.size < imageInfo.size
                    };
                  }
                })
              }
            })
            // #endif
          }
        });
      },
      fail: (_) => {
        data.imageInfoForTest = null;
      }
    });
  }

  defineExpose({
    data,
    testCompressImage
  })
</script>

<style>
  .image {
    flex: 1;
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

- quality属性
  - Android、iOS平台：仅对JPG格式图片生效，非JPG格式图片quality属性始终为100。
  - HarmonyOS 平台：对 JPG、HEIF 生效，其他为100。[详情](https://developer.huawei.com/consumer/cn/doc/harmonyos-faqs/faqs-image-4?ha_source=Dcloud&ha_sourceId=89000448)
- Android平台仅支持对JPG格式图片进行压缩，其他格式会被压缩为JPG格式。iOS平台支持对JPG和PNG格式进行压缩。
- HarmonyOS 平台支持对 JPG（透明色将变为黑色）、HEIF、PNG（转为 JPG，透明色将变为黑色） 格式进行压缩。

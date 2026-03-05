<!-- ## uni.chooseMedia(options) @choosemedia -->

::: sourceCode
## uni.chooseMedia(options) @choosemedia

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-chooseMedia


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-chooseMedia

:::

拍摄或从手机相册中选择图片或视频。


### chooseMedia 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.51 | 4.51 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ChooseMediaOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| pageOrientation | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.51; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 屏幕方向。默认为page.json中的pageOrientation。 |
| count | number | 否 | 9 | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 最多可以选择的文件个数 |
| mediaType | Array&lt;string&gt; | 否 | ['image', 'video'\] | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | album 从相册选视频，camera 使用相机拍摄，合法值：'image'、'video'、'mix' |
| sourceType | Array&lt;string&gt; | 否 | ['album', 'camera'\] | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | album 从相册选视频，camera 使用相机拍摄 |
| maxDuration | number | 否 | 10 | Web: x; 微信小程序: 4.41; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 30s 之间 |
| camera | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头<br/> |
| success | (callback: [ChooseMediaSuccess](#choosemediasuccess-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明 |
| fail | (callback: [ChooseMediaFail](#choosemediafail-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (callback: any) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） |
| sizeType | Array&lt;string&gt; | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 是否压缩所选文件，基础库2.25.0前仅对 mediaType 为 image 时有效，2.25.0及以后对全量 mediaType 有效<br/> | 

##### pageOrientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 自动 |
| portrait | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 竖屏显示 |
| landscape | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 横屏显示 |

##### camera 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| front | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 前置摄像头 |
| back | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 后置摄像头 |

#### ChooseMediaSuccess 的属性值 @choosemediasuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFiles | Array&lt;**ChooseMediaTempFile**&gt; | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| type | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### tempFiles 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFilePath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 选定视频的临时文件路径 |
| fileType | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件类型 |
| size | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 选定视频的数据量大小，单位 kB |
| byteSize | number | 否 | - | Web: x; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 视频文件的字节大小，单位 B |
| duration | number | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 选定视频的时间长度 |
| height | number | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 返回选定视频的长 |
| width | number | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 返回选定视频的宽 |
| thumbTempFilePath | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 视频缩略图临时文件路径 |

##### fileType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| image | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| video | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| image | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| video | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mix | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### ChooseMediaFail 的属性值 @choosemediafail-values 

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
| 1101005 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 未获取权限 |
| 1101006 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 图片或视频保存失败 |
| 1101008 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 拍照或录像失败 |
| 1101010 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 其他错误 |




Android端返回的路径是content协议。


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.chooseMedia)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/video.html#choosemedia)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=chooseMedia&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=chooseMedia&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=chooseMedia&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=chooseMedia&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=chooseMedia)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=chooseMedia&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/choose-media/choose-media.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/choose-media/choose-media.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/choose-media/choose-media
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view>
      <page-head :title="title"></page-head>
      <view class="uni-common-mt">
        <view class="uni-list">

          <view class="uni-list-cell cell-pd">
            <view class="uni-list-cell-left uni-label">
              来源
            </view>
            <view class="uni-list-cell-right" @click="chooseMediaSource">
              <text class="click-t">{{sourceTypes[sourceTypeIndex].title}}</text>
            </view>
          </view>

          <view class="uni-list-cell cell-pd">
            <view class="uni-list-cell-left uni-label">
              方式
            </view>
            <view class="uni-list-cell-right" @click="chooseMediaType">
              <text class="click-t">{{(mediaTypes[mediaTypeIndex] as ChooseSource).title}}</text>
            </view>
          </view>

          <view class="uni-list-cell cell-pd">
            <view class="uni-list-cell-left uni-label">
              数量限制
            </view>
            <view class="uni-list-cell-right">
              <input class="click-t" ref="refCountInput" :value="count" type="number" :maxlength="1" @blur="chooseMediaCount"/>
            </view>
          </view>

          <!-- #ifdef APP-ANDROID -->
          <view class="uni-list-cell cell-pd">
            <view class="uni-list-cell-left uni-label">
              屏幕方向
            </view>
            <view class="uni-list-cell-right" @click="chooseOrientationType">
              <text class="click-t">{{orientationTypes[orientationTypeIndex].title}}</text>
            </view>
          </view>
          <!-- #endif -->

          <view class="uni-list-cell cell-pd">
            <view class="uni-list-cell-left uni-label">
              摄像头
            </view>
            <view class="uni-list-cell-right" @click="chooseCameraType">
              <text class="click-t">{{cameraTypes[cameraTypeIndex].title}}</text>
            </view>
          </view>
        </view>
        <!-- #ifdef APP-IOS -->
        <input-data title="最长拍摄时间，单位秒" defaultValue="10" type="number" @confirm="onMaxDurationConfirm"></input-data>
        <!-- #endif -->
        <view class="uni-list list-pd" style="padding: 15px;">
          <view class="uni-flex" style="margin-bottom: 10px;">
            <view class="uni-list-cell-left">点击预览</view>
            <view style="margin-left: auto;">
              <text class="click-t">{{mediaList.length}}/{{count}}</text>
            </view>
          </view>
          <view class="uni-flex" style="flex-wrap: wrap;">
            <view v-for="(file,index) in mediaList" :key="index" class="uni-uploader__input-box" style="border: 0;">
              <image style="width: 104px; height: 104px;" :src="file.imagePath" @tap="previewMedia(index)">
              </image>
              <image src="/static/plus.png" class="image-remove" @click="removeMedia(index)"></image>
            </view>
            <image class="uni-uploader__input-box" @tap="chooseMedia" src="/static/plus.png"></image>
          </view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type FileSource = {
    imagePath : string;
    filePath : string;
    fileType : string;
  };
  type ChooseSource = {
    value : string[];
    title : string;
  };
  const sourceTypeList : ChooseSource[] = [
    {
      value: ['camera'],
      title: '拍摄',
    },
    {
      value: ['album'],
      title: '相册',
    },
    {
      value: ['camera', 'album'],
      title: '拍摄或相册',
    }
  ];

  const mediaTypeList : ChooseSource[] = [
    {
      value: ['image'],
      title: '仅图片',
    },
    {
      value: ['video'],
      title: '仅视频',
    },
    {
      value: ['image', 'video'],
      title: '不限制',
    }
  ];

  const orientationTypeList : ChooseSource[] = [
    {
      value: ['portrait'],
      title: '竖屏',
    },
    {
      value: ['landscape'],
      title: '横屏',
    },
    {
      value: ['auto'],
      title: '自动',
    }
  ];
  const cameraTypeList : ChooseSource[] = [
    {
      value: ['front'],
      title: '前置摄像头',
    },
    {
      value: ['back'],
      title: '后置摄像头',
    }
  ];

  const title = ref('chooseMedia')
  const mediaList = ref([] as Array<FileSource>)
  const sourceTypeIndex = ref(2)
  const mediaTypeIndex = ref(2)
  const cameraTypeIndex = ref(1)
  const orientationTypeIndex = ref(0)
  const albumModeTypeIndex = ref(0)
  const count = ref(9)
  const maxDuration = ref(10)
  const sourceTypes = ref(sourceTypeList as ChooseSource[])
  const mediaTypes = ref(mediaTypeList as ChooseSource[])
  const cameraTypes = ref(cameraTypeList as ChooseSource[])
  const orientationTypes = ref(orientationTypeList as ChooseSource[])
  const refCountInput = ref<UniElement | null>(null)

  const chooseMediaSource = () => {
    uni.showActionSheet({
      itemList: ['拍摄', '相册', '拍摄或相册'],
      success: (e) => {
        sourceTypeIndex.value = e.tapIndex
      }
    })
  }

  const chooseMediaType = () => {
    uni.showActionSheet({
      itemList: ['仅图片', '仅视频', '不限制'],
      success: (e) => {
        mediaTypeIndex.value = e.tapIndex
      }
    })
  }

  const chooseMediaCount = (event: UniInputBlurEvent) => {
    let countValue = parseInt(event.detail.value)
    if (countValue < 1 || countValue > 9 || isNaN(countValue)) {
      uni.showToast({
        position: "bottom",
        title: "图片数量应该不小于1不大于9"
      })
      return
    }
    count.value = countValue
  }

  const chooseOrientationType = () => {
    uni.showActionSheet({
      itemList: ['竖屏', '横屏', '自动'],
      success: (e) => {
        orientationTypeIndex.value = e.tapIndex
      }
    })
  }

  const chooseCameraType = () => {
    uni.showActionSheet({
      itemList: ['前置', '后置'],
      success: (e) => {
        cameraTypeIndex.value = e.tapIndex
      }
    })
  }

  const onMaxDurationConfirm = (value: number) => {
    maxDuration.value = value;
  }

  const chooseMedia = () => {
    if (mediaList.value.length >= count.value) {
      const message = "已经有" + count.value + "个了，请删除部分后重新选择";
      uni.showToast({
        position: "bottom",
        title: message
      })
      return
    }

    uni.chooseMedia({
      count: count.value - mediaList.value.length,
      sourceType: sourceTypeList[sourceTypeIndex.value].value,
      mediaType: mediaTypeList[mediaTypeIndex.value].value,
      camera: cameraTypeList[cameraTypeIndex.value].value[0],
      // #ifdef APP-IOS
      maxDuration: maxDuration.value,
      // #endif
      // #ifdef APP-ANDROID
      pageOrientation: orientationTypeList[orientationTypeIndex.value].value[0],
      // #endif
      success: (res) => {
        const tempFiles : ChooseMediaTempFile[] = res.tempFiles as ChooseMediaTempFile[];
        for (let i = 0; i < tempFiles.length; i++) {
          const tempFile : ChooseMediaTempFile = tempFiles[i]
          const imagePath = tempFile.fileType == "image" ? tempFile.tempFilePath : tempFile.thumbTempFilePath;
          const file : FileSource = { imagePath: imagePath!, filePath: tempFile.tempFilePath, fileType: tempFile.fileType };
          mediaList.value.push(file);
        }
      },
      fail: (err) => {
        console.log("err: ", JSON.stringify(err));
        uni.showToast({
          title:"choose media error.code:" + err.errCode+";message:"+err.errMsg,
          position:"bottom"
        })
      }
    })
  }

  const previewMedia = (index: number) => {
    const file : FileSource = mediaList.value[index];
    if (file.fileType == "image") {
      uni.previewImage({
        current: 0,
        urls: [file.filePath]
      })
    } else {
      uni.$once("__ONFULLVIDEOLOAD", () => {
        uni.$emit("__ONRECEIVEURL", {
          "url": file.filePath,
          "cover": file.imagePath
        })
      })
      const url = "/pages/API/choose-media/fullscreen-video";
      uni.navigateTo({
        url: url,
      })
    }
  }

  const removeMedia = (index: number) => {
    mediaList.value.splice(index, 1)
  }
</script>

<style>
  .cell-pd {
    padding: 11px 15px;
  }

  .click-t {
    color: darkgray;
  }

  .list-pd {
    margin-top: 25px;
  }

  .uni-uploader__input-box {
    margin: 5px;
    width: 104px;
    height: 104px;
    border: 1px solid #D9D9D9;
  }

  .uni-uploader__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .image-remove {
    transform: rotate(45deg);
    width: 25px;
    height: 25px;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 13px;
    background-color: rgba(200, 200, 200, 0.8);
  }

  .item_width {
    width: 130px;
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
- chooseMedia的相册选择在App平台是系统UI，其风格不同rom可能有差异。多选时有的是长按、有的是checkbox。系统UI的暗黑模式、国际化跟随系统，而不跟随App。
- android端由于系统或ROM的限制，拍照的`maxDuration`和`camera`属性在部分手机上不生效。
- 从HBuilderX4.61版起，ChooseMediaSuccess中的duration、size精度统一调整为小数点后3位数
- iOS端拍照和相册选择会在应用沙盒目录的cache目录产生临时文件，位置[详见](file-system-spec.md#cache)。如需主动删除临时文件，使用[uni.getFileSystemManager](get-file-system-manager.md)。
- App平台通过chooseMedia选择媒体文件后，默认没有压缩，需自行调用 [uni.compressImage](./compress-image.md) 或 [uni.compressVideo](./compress-video.md) 来压缩。

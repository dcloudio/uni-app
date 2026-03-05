<!-- ## uni.chooseImage(options) @chooseimage -->

::: sourceCode
## uni.chooseImage(options) @chooseimage

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-media


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-media

:::

从本地相册选择图片或使用相机拍照

### chooseImage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ChooseImageOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| pageOrientation | string | 否 | - | Web: x; 微信小程序: x; Android: 4.33; iOS: 4.33; HarmonyOS: x | 屏幕方向。默认为page.json中的pageOrientation。 |
| albumMode | string | 否 | "custom" | Web: x; 微信小程序: x; Android: 4.33; iOS: x; HarmonyOS: x | 图片选择模式 |
| count | number | 否 | 9 | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 最多可以选择的图片张数，app端不限制，微信小程序最多可支持20个。 |
| sizeType | Array&lt;string&gt; | 否 | ['original','compressed'\] | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | original 原图，compressed 压缩图，默认二者都有 |
| sourceType | Array&lt;string&gt; | 否 | ['album','camera'\] | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | album 从相册选图，camera 使用相机，默认二者都有 |
| extension | Array&lt;string&gt; | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。仅H5支持 |
| crop | **ChooseImageCropOptions** | 否 | - | Web: x; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: x | 图像裁剪参数，设置后 sizeType 失效。 |
| success | (callback: [ChooseImageSuccess](#chooseimagesuccess-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 成功则返回图片的本地文件路径列表 tempFilePaths |
| fail | (callback: [ChooseImageFail](#chooseimagefail-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (callback: any) => void | 否 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### pageOrientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 自动 |
| portrait | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 竖屏显示 |
| landscape | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 横屏显示 |

##### albumMode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| custom | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 自定义媒体选择器 |
| system | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 系统媒体选择器 |

##### crop 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 裁剪的宽度，单位为px，用于计算裁剪宽高比。 |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 裁剪的高度，单位为px，用于计算裁剪宽高比。 |
| quality | number | 否 | 80 | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 取值范围为1-100，数值越小，质量越低（仅对jpg格式有效）。默认值为80。 |
| resize | boolean | 否 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 是否将width和height作为裁剪保存图片真实的像素值。默认值为true。注：设置为false时在裁剪编辑界面显示图片的像素值，设置为true时不显示。 |

#### ChooseImageSuccess 的属性值 @chooseimagesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 调用API的名称 |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 描述信息 |
| tempFilePaths | Array&lt;string&gt; | 是 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 图片的本地文件路径列表 |
| tempFiles | Array&lt;**ChooseImageTempFile**&gt; | 是 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 图片的本地文件列表 |

#### tempFiles 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | string | 是 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 本地文件路径 |
| size | number | 是 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 本地文件大小，单位：B |
| name | string | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 包含扩展名的文件名称，仅H5支持 |
| type | string | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 文件类型，仅H5支持 |

#### ChooseImageFail 的属性值 @chooseimagefail-values 

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
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.chooseImage)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/image.html#chooseimage)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseImage.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=chooseImage&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=chooseImage&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=chooseImage&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=chooseImage&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=chooseImage)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=chooseImage&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/choose-image/choose-image.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/choose-image/choose-image.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/choose-image/choose-image

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/choose-image/choose-image

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <page-head :title="title"></page-head>
    <view class="uni-common-mt">
      <view class="uni-list">
        <view class="uni-list-cell cell-pd">
          <text class="uni-list-cell-left uni-label">
            图片来源
          </text>
          <view class="uni-list-cell-right" @click="chooseImageSource">
            <text class="click-t">{{sourceType[sourceTypeIndex]}}</text>
          </view>
        </view>

        <view class="uni-list-cell cell-pd">
          <text class="uni-list-cell-left uni-label">
            图片质量
          </text>
          <view class="uni-list-cell-right" @click="chooseImageType">
            <text class="click-t">{{sizeType[sizeTypeIndex]}}</text>
          </view>
        </view>

        <view class="uni-list-cell cell-pd">
          <text class="uni-list-cell-left uni-label">
            数量限制
          </text>
          <view class="uni-list-cell-right">
            <input class="click-t" :value="count" type="number" :maxlength="1" @blur="chooseImageCount" />
          </view>
        </view>
        <!-- #ifdef APP-ANDROID || APP-IOS -->
        <view class="uni-list-cell cell-pd">
          <text class="uni-list-cell-left uni-label">
            屏幕方向
          </text>
          <view class="uni-list-cell-right" @click="chooseOrientationType">
            <text class="click-t">{{orientationType[orientationTypeIndex]}}</text>
          </view>
        </view>
        <!-- #endif -->
        <!-- #ifdef APP-ANDROID -->
        <view class="uni-list-cell cell-pd">
          <text class="uni-list-cell-left uni-label">
            相册模式
          </text>
          <view class="uni-list-cell-right" @click="albumModeChange">
            <text class="click-t">{{albumModeType[albumModeTypeIndex]}}</text>
          </view>
        </view>
        <!-- #endif -->
        <view class="uni-list-cell cell-pd">
          <text class="uni-list-cell-left uni-label">
            图像裁剪
          </text>
          <view class="uni-list-cell-right">
            <switch :checked="isCrop" @change="switchCrop"></switch>
          </view>
        </view>
        <view ref="cropOptionNode" class="crop-option"
          :style="{'height':isCrop?'200px':'0px','margin-bottom':isCrop?'11px':'0px'}">
          <view class="uni-list-cell cell-pd">
            <view class="uni-list-cell-left item_width">
              图片质量(%)
            </view>
            <view class="uni-list-cell-right">
              <input :value="cropPercent" @confirm="cropPercentConfim" type="number" maxlength="-1" />
            </view>
          </view>
          <view class="uni-list-cell cell-pd">
            <view class="uni-list-cell-left item_width">
              裁剪宽度(px)
            </view>
            <view class="uni-list-cell-right">
              <input :value="cropWidth" @confirm="cropWidthConfim" type="number" maxlength="-1" />
            </view>
          </view>
          <view class="uni-list-cell cell-pd">
            <view class="uni-list-cell-left item_width">
              裁剪高度(px)
            </view>
            <view class="uni-list-cell-right">
              <input :value="cropHeight" @confirm="cropHeightConfim" type="number" maxlength="-1" />
            </view>
          </view>
          <view class="uni-list-cell cell-pd">
            <view class="uni-list-cell-left item_width">
              保留原宽高
            </view>
            <view class="uni-list-cell-right">
              <switch :checked="cropResize" @change="cropResizeChange"></switch>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-list list-pd" style="padding: 15px;">
        <view class="uni-flex" style="margin-bottom: 10px;">
          <view class="uni-list-cell-left">点击可预览选好的图片</view>
          <view style="margin-left: auto;">
            <text class="click-t">{{imageList.length}}/{{count}}</text>
          </view>
        </view>
        <view class="uni-flex" style="flex-wrap: wrap;">
          <view v-for="(image,index) in imageList" :key="index" class="uni-uploader__input-box" style="border: 0;">
            <image style="width: 104px; height: 104px;" :src="image" @tap="previewImage(index)">
            </image>
            <image src="/static/plus.png" class="image-remove" @click="removeImage(index)"></image>
          </view>
          <image class="uni-uploader__input-box" @tap="chooseImage" src="/static/plus.png"></image>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">

const sourceTypeArray = [
  ['camera'],
  ['album'],
  ['camera', 'album']
]
const sizeTypeArray = [
  ['compressed'],
  ['original'],
  ['compressed', 'original']
]
const orientationTypeArray = [
  'portrait',
  'landscape',
  'auto'
]
const albumModeTypeArray = [
  "custom",
  "system"
]

// 响应式数据
const title = ref('chooseImage')
const imageList = ref([] as Array<string>)
const sourceTypeIndex = ref(2)
const sourceType = ref(['拍照', '相册', '拍照或相册'])
const sizeTypeIndex = ref(2)
const sizeType = ref(['压缩', '原图', '压缩或原图'])
const orientationTypeIndex = ref(0)
const orientationType = ref(['竖屏', '横屏', '自动'])
const albumModeTypeIndex = ref(0)
const albumModeType = ref(["自定义相册","系统相册"])
const count = ref(9)
const isCrop = ref(false)
const cropPercent = ref(80)
const cropWidth = ref(100)
const cropHeight = ref(100)
const cropResize = ref(false)

// 生命周期钩子
onPageHide(() => {
  console.log("Page Hide");
})

onUnload(() => {
  imageList.value = [];
  sourceTypeIndex.value = 2
  sourceType.value = ['拍照', '相册', '拍照或相册']
  sizeTypeIndex.value = 2
  sizeType.value = ['压缩', '原图', '压缩或原图']
  orientationTypeIndex.value = 0
  orientationType.value = ['竖屏', '横屏', '自动']
})

// 方法
const cropHeightConfim = (e: InputConfirmEvent) => {
  let value = parseInt(e.detail.value)
  if (value > 0) {
    cropHeight.value = value
  } else {
    uni.showToast({
      position: "bottom",
      title: "裁剪高度需要大于0"
    })
  }
}

const cropWidthConfim = (e: InputConfirmEvent) => {
  let value = parseInt(e.detail.value)
  if (value > 0) {
    cropWidth.value = value
  } else {
    uni.showToast({
      position: "bottom",
      title: "裁剪宽度需要大于0"
    })
  }
}

const cropPercentConfim = (e: InputConfirmEvent) => {
  let value = parseInt(e.detail.value)
  if (value > 0 && value <= 100) {
    cropPercent.value = value
  } else {
    uni.showToast({
      position: "bottom",
      title: "请输入0~100之间的值"
    })
  }
}

const albumModeChange = () => {
  uni.showActionSheet({
    itemList: albumModeType.value,
    success: (e) => {
      albumModeTypeIndex.value = e.tapIndex
    }
  })
}

const cropResizeChange = (e: UniSwitchChangeEvent) => {
  cropResize.value = e.detail.value
}

const switchCrop = (e: UniSwitchChangeEvent) => {
  isCrop.value = e.detail.value
}

const removeImage = (index: number) => {
  imageList.value.splice(index, 1)
}

const chooseImageSource = () => {
  uni.showActionSheet({
    itemList: ['拍照', '相册', '拍照或相册'],
    success: (e) => {
      sourceTypeIndex.value = e.tapIndex
    }
  })
}

const chooseImageType = () => {
  uni.showActionSheet({
    itemList: ['压缩', '原图', '压缩或原图'],
    success: (e) => {
      sizeTypeIndex.value = e.tapIndex
    }
  })
}

const chooseOrientationType = () => {
  uni.showActionSheet({
    itemList: ['竖屏', '横屏', '自动'],
    success: (e) => {
      orientationTypeIndex.value = e.tapIndex
    }
  })
}

const chooseImageCount = (event: InputBlurEvent) => {
  let countValue = parseInt(event.detail.value)
  if (countValue < 0) {
    uni.showToast({
      position: "bottom",
      title: "图片数量应该大于0"
    })
    return
  }
  count.value = countValue
}

const chooseImage = () => {
  if (imageList.value.length >= count.value) {
    uni.showToast({
      position: "bottom",
      title: `已经有 ${count.value} 张图片了，请删除部分图片之后重新选择`
    })
    return
  }
  uni.chooseImage({
    sourceType: sourceTypeArray[sourceTypeIndex.value],
    sizeType: sizeTypeArray[sizeTypeIndex.value],
    crop: isCrop.value ? { "quality": cropPercent.value, "width": cropWidth.value, "height": cropHeight.value, "resize": cropResize.value } as ChooseImageCropOptions : null,
    count: count.value - imageList.value.length,
    // #ifdef APP
    pageOrientation: orientationTypeArray[orientationTypeIndex.value],
    // #endif
    // #ifdef APP-ANDROID
    albumMode: albumModeTypeArray[albumModeTypeIndex.value],
    // #endif
    success: (res) => {
      imageList.value = imageList.value.concat(res.tempFilePaths);
      console.log("imageList: ", imageList.value)
    },
    fail: (err) => {
      console.log("err: ", JSON.stringify(err));
      uni.showToast({
        title:"choose image error.code:" + err.errCode+";message:"+err.errMsg,
        position:"bottom"
      })
    }
  })
}

const previewImage = (index: number) => {
  uni.previewImage({
    current: index,
    urls: imageList.value
  })
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

  .crop-option {
    margin-left: 11px;
    margin-right: 11px;
    border-radius: 11px;
    background-color: #eee;
    transition-property: height, margin-bottom;
    transition-duration: 200ms;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## 相册选择的2种方式
App平台的相册选择，有custom自定义方式和system系统方式。这2种方式有不少区别：
- custom方式
1. app读取相册文件，所以app需要申请相册/本地文件访问权限。而google play目前仅对合理需要相册权限的应用才开放相册权限。如无法向google证明获取相册权限的合理性，则需要使用system方式。google play 政策详见：[google play 照片和视频权限](https://support.google.com/googleplay/android-developer/answer/14115180)，使用custom方式在上架google play时需要提交一份声明以获得试用的资格，谷歌允许延长声明的提交时间到2025年1月22日。uni-app x的开发者可升级HBuilderX 4.41后使用system方式，而uni-app的开发者遇到此问题可以使用插件[uni-chooseSystemMedia](https://ext.dcloud.net.cn/plugin?id=20744)。
2. 支持“原图”选项。
3. 使用非原图，即压缩图片时，会在应用沙盒目录的cache目录产生临时文件（压缩后的图片），位置[详见](file-system-spec.md#cache)
4. 在4.41以前，Android无论如何都会在应用沙盒目录的cache目录产生临时文件。从4.41起，chooseImage支持了contentURI，选择照片时如果不压缩图片，会返回contentURI，不再向cache目录写临时文件了。
- system方式
1. 使用系统选择器时，好处是不需要申请额外权限，它的模式类似于web浏览器中的input type=file，应用其实不具有本机文件访问能力，用户通过系统选择器把图片传给应用。
2. system方式无需特殊向google申明选择权限的必要性，即可正常上架google play。但注意同时需要在manifest.json中将`<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />`和`<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />`权限移除。配置方式参考[移除Android权限](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#removepermissions)。
3. 界面ui无法自定义，比如Android、iOS上无法添加“原图”选项。鸿蒙上系统UI自带原图选项。
4. 界面ui的主题和国际化，跟随手机rom，而不是跟随app（假使App和Rom不一致）
5. 因为不涉及压缩，所以也没有临时文件，不会在cache目录下生成临时文件。

## Tips
* 本API会自动申请摄像头、相册等相关权限，如需手动获取app是否拥有摄像头和相册权限，参考 [uni.getAppAuthorizeSetting](get-app-authorize-setting.md)
* app端拍照和部分情况下的相册选择会在应用沙盒目录的cache目录产生临时文件，位置[详见](file-system-spec.md#cache)。app端如需主动删除临时文件，使用[uni.getFileSystemManager](get-file-system-manager.md)。
* 从HBuilderX4.41版起，uni.chooseImage在`sourceType`为`['album']`、`albumMode`为`system`、`sizeType`为`['original']`并且未设置`crop`时，支持返回Uri地址。
* `albumMode`的`system`属性打开的是系统的图片选择器；`custom`属性打开的是uni-app x框架提供的图片选择器。
* 系统图片选择器的`sizeType`仅支持设置`['original']`或`['compressed']`。在Android 11及以上的系统中，设置`system`调用的是系统的照片选择器，低于android 11的系统中会调用系统的文件选择器。

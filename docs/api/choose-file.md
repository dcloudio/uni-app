<!-- ## uni.chooseFile(options) @choosefile -->

::: sourceCode
## uni.chooseFile(options) @choosefile

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-media


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-media

:::

从本地选择文件


### chooseFile 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.51 | 4.61 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ChooseFileOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| count | number | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 最多可以选择的文件数，默认100,注意Android中count只会决定是否是单选/多选，如果count>1 是多选效果，等于1为单选效果, |
| type | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 选择文件的类型，默认all，可选<br/>- image: 选择图片文件<br/>- video: 选择视频文件<br/>- audio: 选择音频文件<br/>- all: 默认值，选择本地文件，包含图片和视频 |
| extension | Array&lt;string&gt; | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 选择文件的后缀名，暂只支持.zip、.png等，不支持application/msword等值, App平台不支持 |
| sizeType | any | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | original 原图，compressed 压缩图，默认二者都有, App平台不支持 |
| sourceType | Array&lt;string&gt; | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | album 从相册选图，camera 使用相机，默认二者都有, App平台不支持 |
| success | (result: [ChooseFileSuccess](#choosefilesuccess-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 成功则返回图片的本地文件路径列表 tempFilePaths、tempFiles |
| fail | (result: [ChooseFileFail](#choosefilefail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| image | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 图片类型 |
| video | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 视频类型 |
| audio | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 音频类型 |
| all | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### ChooseFileSuccess 的属性值 @choosefilesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFilePaths | Array&lt;string&gt; | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: 4.61; HarmonyOS: x | 文件的本地文件路径列表, Android平台不支持 |
| tempFiles | Array&lt;**ChooseFileTempFile**&gt; | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 文件的本地文件列表，每一项是一个 File 对象 |

#### tempFiles 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| name | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 选择的文件名称 |
| path | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 文件路径 |
| size | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 文件大小，单位 B |
| type | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 选择的文件类型<br/>可选值：<br/>- 'video': 选择了视频文件;<br/>- 'image': 选择了图片文件;<br/>- 'audio': 选择了音频文件;<br/>- 'file': 选择了除图片和视频的文件; |

##### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| video | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 视频类型 |
| image | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 图片类型 |
| audio | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 音频类型 |
| file | Web: 4.0; 微信小程序: 4.41; Android: 4.51; iOS: 4.61; HarmonyOS: x | 除图片和音视频类型的文件 |

#### ChooseFileFail 的属性值 @choosefilefail-values 

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




Android端返回的路径是content协议。

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/choose-file/choose-file.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/choose-file/choose-file.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/choose-file/choose-file

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/choose-file/choose-file

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <view>
      <page-head :title="title"></page-head>
      <!-- #ifdef APP-IOS -->
      <view style="padding-left: 20px; padding-right: 20px;">
      		<text style="color: #353535; font-size: 15px;">
      			iOS 调试首先需要添加对应 audio、video、image 存储到文件系统中，步骤如下：\n
      			1. 从系统相册或者语音备忘录中选择具体的video、image、audio；\n
      			2. 点击 ‘分享’ 按钮；\n
      			3. 下滑点击 ’存储到”文件“‘按钮；\n
      		</text>
      </view>
      <!-- #endif -->
      <button size="mini" @click="log=''">清空日志</button>
      <text style="margin: 2px; padding: 2px; border: 1px solid #000000;">{{ log }}</text>

      <button class="btnstyle" type="primary" @tap="chooseVideo">选择文件(video) 单选</button>
      <button class="btnstyle" type="primary" @tap="chooseVideoMul">选择文件(video) 多选</button>
      <button class="btnstyle" type="primary" @tap="playVideo">选择文件(video)并播放</button>
      <video class="video" :src="src" :controls="true" :autoplay="true" :loop="true">111</video>
      <button class="btnstyle" type="primary" @tap="chooseImage">选择文件(image) 单选</button>
      <button class="btnstyle" type="primary" @tap="chooseImageMul">选择文件(image) 多选</button>
      <button class="btnstyle" type="primary" @tap="viewImg">选择文件(image) 并预览</button>
      <button class="btnstyle" type="primary" @tap="chooseAudio">选择文件(audio) 单选</button>
      <button class="btnstyle" type="primary" @tap="chooseAudioMul">选择文件(audio) 多选</button>
      <button class="btnstyle" type="primary" @tap="playAudio">选择文件(audio) 并播放</button>
      <button class="btnstyle" type="primary" @tap='chooseAll'>选择文件(all) 单选</button>
      <button class="btnstyle" type="primary" @tap='chooseAllMul'>选择文件(all) 多选</button>

      <view style="height: 4px;"></view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  const log = ref('')
  const title = ref('choose-file')
  const src = ref('')
  const _audioContext = ref(null as InnerAudioContext | null)

  onUnmounted(() => {
    if (_audioContext.value != null) {
      _audioContext.value!.destroy()
    }
  })

  const getPath = (chooseFils: ChooseFileTempFile[]): string => {
    var urls = new Array<string>()
    chooseFils.forEach(value => {
      urls.push(value.path)
    })
    return urls.join(', ')
  }

  const chooseVideo = () => {
    uni.chooseFile({
      type: 'video',
      count: 1,
      success: (res) => {
        console.log(res)
        if (res.tempFiles.length > 0) {
          log.value += getPath(res.tempFiles) + '\n\n'
        }
      },
      complete: (res) => {
        console.log(res)
      }
    })
  }

  const chooseVideoMul = () => {
    uni.chooseFile({
      type: 'video',
      success: (res) => {
        console.log(res)
        if (res.tempFiles.length > 0) {
          log.value += getPath(res.tempFiles) + '\n\n'
        }
      },
      complete: (res) => {
        console.log(res)
      }
    })
  }

  const playVideo = () => {
    uni.chooseFile({
      type: 'video',
      count: 1,
      success: (res) => {
        console.log(res)
        if (res.tempFiles.length > 0) {
          src.value = res.tempFiles[0].path
          _audioContext.value?.destroy()
          _audioContext.value = null
        }
      },
      complete: (res) => {
        console.log(res)
      }
    })
  }

  const chooseImage = () => {
    uni.chooseFile({
      type: 'image',
      count: 1,
      success: (res) => {
        console.log(res)
        if (res.tempFiles.length > 0) {
          log.value += getPath(res.tempFiles) + '\n\n'
        }
      },
      complete: (res) => {
        console.log(res)
      }
    })
  }

  const chooseImageMul = () => {
    uni.chooseFile({
      type: 'image',
      count: 90,
      success: (res) => {
        console.log(res)
        if (res.tempFiles.length > 0) {
          log.value += getPath(res.tempFiles) + '\n\n'
        }
      },
      complete: (res) => {
        console.log(res)
      }
    })
  }

  const viewImg = () => {
    uni.chooseFile({
      type: 'image',
      success: (res) => {
        console.log(res)
        if (res.tempFiles.length > 0) {
          const tempFiles: Array<string> = res.tempFiles.map((value) => {
          	return value.path
          })
          uni.previewImage({
            current: 0,
            urls: tempFiles,
            success: (res) => {
              console.log(res)
            },
            fail: (err) => {
              console.log(err)
            }
          })
        }
      },
      complete: (res) => {
        console.log(res)
      }
    })
  }

  const chooseAudio = () => {
    uni.chooseFile({
      type: 'audio',
      count: 1,
      success: (res) => {
        console.log(res)
        if (res.tempFiles.length > 0) {
          log.value += getPath(res.tempFiles) + '\n\n'
        }
      },
      complete: (res) => {
        console.log(res)
      }
    })
  }

  const chooseAudioMul = () => {
    uni.chooseFile({
      type: 'audio',
      success: (res) => {
        console.log(res)
        if (res.tempFiles.length > 0) {
          log.value += getPath(res.tempFiles) + '\n\n'
        }
      },
      complete: (res) => {
        console.log(res)
      }
    })
  }

  const playAudio = () => {
    uni.chooseFile({
      type: 'audio',
      count: 1,
      success: (res) => {
        console.log(res);
        if (res.tempFiles.length > 0) {
          if (_audioContext.value == null) {
          src.value = ''
            _audioContext.value = uni.createInnerAudioContext()
            _audioContext.value!.autoplay = true
          } else if (!_audioContext.value!.paused) {
            _audioContext.value!.stop()
          }
          _audioContext.value!.src = res.tempFiles[0].path
        }
      },
      complete: (res) => {
        console.log(res);
      }
    });
  }

  const chooseAll = () => {
    uni.chooseFile({
      type: 'all',
      count: 1,
      success: (res) => {
        console.log(res)
        if (res.tempFiles.length > 0) {
          log.value += getPath(res.tempFiles) + '\n\n'
        }
      },
      complete: (res) => {
        console.log(res)
      }
    })
  }

  const chooseAllMul = () => {
    uni.chooseFile({
      type: 'all',
      success: (res) => {
        console.log(res)
        if (res.tempFiles.length > 0) {
          log.value += getPath(res.tempFiles) + '\n\n'
        }
      },
      complete: (res) => {
        console.log(res)
      }
    })
  }
</script>

<style>
  .btnstyle {
    margin: 4px;
  }

  .video {
    width: 100%;
    height: 225px;
  }

  .uni-uploader__input-box {
    margin: 5px;
    width: 104px;
    height: 104px;
    border: 1px solid #D9D9D9;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.chooseFile)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/file.html#choosefile)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=chooseFile&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=chooseFile&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=chooseFile&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=chooseFile&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=chooseFile&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=chooseFile)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=chooseFile&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


## tips
- chooseFile是系统UI，其风格不同rom可能有差异。多选时有的是长按、有的是checkbox。系统UI的暗黑模式、国际化跟随系统，而不跟随App。
- chooseFile不仅仅是选择现有文件，有的手机也可以新拍照、拍摄、录音。但不同系统的实现存在差异。

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


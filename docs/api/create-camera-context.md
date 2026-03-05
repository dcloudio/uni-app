<!-- ## uni.createCameraContext() @createcameracontext -->

::: sourceCode
## uni.createCameraContext() @createcameracontext

> GitCode: https://gitcode.com/dcloud/uni-component/tree/alpha/uni_modules/uni-camera


> GitHub: https://github.com/dcloudio/uni-component/tree/alpha/uni_modules/uni-camera

:::

创建 camera 上下文 CameraContext 对象。


通过本API，可操作摄像头组件进行拍照、录像。

参考文档：
- [camera组件文档](../component/camera.md)

### createCameraContext 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | 4.61 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |




### 返回值 

| 类型 | 必备 |
| :- | :- |
| [CameraContext](#cameracontext-values) | 否 |

#### CameraContext 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| offAndroidCameraOriginalFrame | any | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x | 停止获取Android平台的原始帧数据 |
#### CameraContext 的方法 @cameracontext-values 

#### onCameraFrame(callback : (frame : CameraContextOnCameraFrame) => void) : CameraContextCameraFrameListener \| null; @oncameraframe
onCameraFrame
获取 Camera 实时帧数据

##### onCameraFrame 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.61 | 4.61 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (frame: [CameraContextOnCameraFrame](#cameracontextoncameraframe-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 

##### CameraContextOnCameraFrame 的属性值 @cameracontextoncameraframe-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| width | number | 否 | - | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 图像数据矩形的宽度<br/> |
| height | number | 否 | - | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 图像数据矩形的高度<br/> |
| data | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 否 | - | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 图像像素点数据，一维数组，每四项表示一个像素点的 rgba<br/> |

##### 返回值 

| 类型 | 必备 |
| :- | :- |
| [CameraContextCameraFrameListener](#cameracontextcameraframelistener-values) | 否 |

###### CameraContextCameraFrameListener 的方法 @cameracontextcameraframelistener-values 

###### start(options : CameraContextCameraFrameListenerStartOptions) : void; @start
start
开始监听帧数据
###### start 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.61 | 4.61 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CameraContextCameraFrameListenerStartOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 


###### stop(options : CameraContextCameraFrameListenerStopOptions) : void; @stop
stop
停止监听帧数据

###### stop 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.61 | 4.61 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CameraContextCameraFrameListenerStopOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

 

#### onAndroidCameraOriginalFrame(callback: (imageProxy: ImageProxy) => void): void; @onandroidcameraoriginalframe
onAndroidCameraOriginalFrame
获取Android平台的原始帧数据，**获取到了ImageProxy使用后一定要close，否则App会触发崩溃
##### onAndroidCameraOriginalFrame 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | - | - | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (imageProxy: ImageProxy) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 


#### getCurrentZoom() : number; @getcurrentzoom
getCurrentZoom
获取当前缩放级别
##### getCurrentZoom 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | - | - | x |


##### 返回值 

| 类型 |
| :- |
| number |
 

#### setZoom(options : CameraContextSetZoomOptions) : void; @setzoom
setZoom
设置缩放级别

##### setZoom 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.61 | 4.61 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CameraContextSetZoomOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| zoom | number | 是 | - | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 缩放级别，范围\[1, maxZoom]zoom 可取小数，精确到小数后一位。maxZoom 可在 initdone 返回值中获取。 |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用成功的回调函数<br/> |
| fail | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用失败的回调函数<br/> |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### takePhoto(options : CameraContextTakePhotoOptions) : void; @takephoto
takePhoto
拍摄照片

##### takePhoto 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.61 | 4.61 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CameraContextTakePhotoOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| quality | string | 否 | 'normal' | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 成像质量<br/> |
| selfieMirror | boolean | 否 | true | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 前置摄像头拍照时是否开启镜像<br/> |
| success | (result: [CameraContextTakePhotoResult](#cameracontexttakephotoresult-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (error: [CameraContextFail](#cameracontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### quality 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| high | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | - |
| normal | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | - |
| low | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | - |
| original | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | - |

###### CameraContextTakePhotoResult 的属性值 @cameracontexttakephotoresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempImagePath | string | 否 | - | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 照片文件的临时路径 (本地路径)，安卓是jpg图片格式，ios是png。<br/>照片会存放到uni-media目录下[文件系统](https://doc.dcloud.net.cn/uni-app-x/api/file-system-spec.html)<br/> |

###### CameraContextFail 的属性值 @cameracontextfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 2003002 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 相机权限未授权 |
| 2003003 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 拍照失败 |
| 2003004 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 相机不可用 |
| 2003005 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 相机正在使用中 |
| 2003006 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 相机初始化失败 |
| 2003007 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 录制的视频地址不存在 |
| 2003008 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 录制失败 |
| 2003009 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | app进入后台，摄像头终止 |
| 2003100 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 相机内部错误 |
| 2003101 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 录制视频的视频压缩失败 |


#### startRecord(options: CameraContextStartRecordOptions): void; @startrecord
startRecord
开始录像

##### startRecord 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.61 | 4.61 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | [CameraContextStartRecordOptions](#cameracontextstartrecordoptions-values) | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| timeout | number | 否 | 30 | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 录制时长上限，单位为秒 |
| selfieMirror | boolean | 否 | true | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 前置摄像头录制视频时是否开启镜像 |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用成功的回调函数<br/> |
| fail | (error: [CameraContextFail](#cameracontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### CameraContextStartRecordOptions 的方法 @cameracontextstartrecordoptions-values 

##### timeoutCallback: (result: any) => void @timeoutcallback
timeoutCallback
超过录制时长上限时会结束录像并触发此回调，录像异常退出时也会触发此回调
###### timeoutCallback 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.61 | 4.61 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| result | any | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 



#### stopRecord(options: CameraContextStopRecordOptions) : void; @stoprecord
stopRecord
结束录像

##### stopRecord 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.61 | 4.61 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CameraContextStopRecordOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| compressed | boolean | 否 | false | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 启动视频压缩，压缩效果同chooseVideo<br/> |
| success | (result: [CameraContextStopRecordResult](#cameracontextstoprecordresult-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用成功的回调函数<br/> |
| fail | (error: [CameraContextFail](#cameracontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### CameraContextStopRecordResult 的属性值 @cameracontextstoprecordresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempThumbPath | string | 否 | - | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 封面图片文件的临时路径 (本地路径)<br/>图片会以jpg格式存放到uni-media目录下[文件系统](https://doc.dcloud.net.cn/uni-app-x/api/file-system-spec.html)<br/> |
| tempVideoPath | string | 否 | - | Web: -; 微信小程序: -; Android: 4.61; iOS: 4.61; HarmonyOS: x | 视频的文件的临时路径 (本地路径)<br/>视频将以mp4格式存放到uni-media目录下[文件系统](https://doc.dcloud.net.cn/uni-app-x/api/file-system-spec.html)<br/> |

 


<!-- UTSAPIJSON.createCameraContext.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.component.createCameraContext)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/camera/CameraContext.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createCameraContext&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createCameraContext&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createCameraContext&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createCameraContext&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createCameraContext)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createCameraContext&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

示例代码另见 [camera组件文档](../component/camera.md)
<!-- UTSAPIJSON.createCameraContext.example -->

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


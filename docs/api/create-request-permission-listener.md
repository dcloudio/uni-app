<!-- ## uni.createRequestPermissionListener() @createrequestpermissionlistener -->

::: sourceCode
## uni.createRequestPermissionListener() @createrequestpermissionlistener

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-createRequestPermissionListener


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-createRequestPermissionListener

:::

创建一个监听权限申请的对象。

### createRequestPermissionListener 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 4.0 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


app-android平台，可使用本API监听应用权限申请确认框的弹出和关闭。不管是哪处的业务代码在申请权限，当弹出和关闭权限申请确认框时均会触发本监听事件。

华为应用市场审核时要求：`APP在调用终端权限时，应同步告知用户申请该权限的目的`。此时即可使用本API，在app.uvue里全局监听。

创建监听对象后，返回RequestPermissionListener，然后调起其的onConfirm和onComplete。

- 当权限申请的确认框在手机端弹出时，会触发onConfirm
- 当权限申请的确认框被用户关闭后，会触发onComplete



### 返回值 

| 类型 |
| :- |
| [RequestPermissionListener](#requestpermissionlistener-values) |

#### RequestPermissionListener 的方法 @requestpermissionlistener-values 

#### onRequest(callback : RequestPermissionListenerRequestCallback) : void @onrequest
onRequest
监听申请系统权限
##### onRequest 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | - | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (permissions: Array&lt;string&gt;) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: x | 申请系统权限回调，permissions为触发权限申请的所有权限 | 


#### onConfirm(callback : RequestPermissionListenerConfirmCallback) : void @onconfirm
onConfirm
监听弹出系统权限授权框
##### onConfirm 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | - | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (permissions: Array&lt;string&gt;) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: x | 弹出系统权限授权框回调，permissions为触发弹出权限授权框的所有权限 | 


#### onComplete(callback : RequestPermissionListenerCompleteCallback) : void @oncomplete
onComplete
监听权限申请完成
##### onComplete 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | - | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (permissions: Array&lt;string&gt;) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: x | 权限申请完成回调，permissions为申请完成的所有权限 | 


#### stop() : void @stop
stop
取消所有监听
##### stop 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | - | x | x |


 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/create-request-permission-listener/create-request-permission-listener.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/create-request-permission-listener/create-request-permission-listener.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/create-request-permission-listener/create-request-permission-listener
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <page-head title="权限申请监听"></page-head>
    <view class="permission-alert" id="permission-alert"
      :style="{'transform':isPermissionAlertShow ? 'translateY(0)':'translateY(-110px)'}">
      <text style="font-size: 20px;margin-bottom: 10px;margin-top: 5px;">访问日历权限申请说明：</text>
      <text style="color: darkgray;">uni-app x正在申请访问日历权限用于演示，允许或拒绝均不会获取任何隐私信息。</text>
    </view>
    <button type="primary" style="margin: 10px;" @click="requestPermission">点击申请日历权限</button>

  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  const isPermissionAlertShow = ref(false)
  const permissionAlert = ref(null as UniElement | null)
  const timeoutId = ref(-1)
  const permissionListener = ref(null as RequestPermissionListener | null)

  onUnload(() => {
    permissionListener.value?.stop()
    permissionListener.value = null
    clearTimeout(timeoutId.value)
  })

  const watchPermissionRRequest = () => {
    permissionListener.value = uni.createRequestPermissionListener()
    permissionListener.value!.onConfirm((_) => {
      // TODO 目前onConfirm监听实现的在时间上不够精确，暂时需要延迟弹框，后续修复
      // TODO 这里的弹框仅为演示，实际开发中监听权限申请的代码应该在app.uvue中，弹框应全局处理，可参考https://gitcode.net/dcloud/uni-api/-/tree/master/uni_modules/uni-prompt/utssdk/app-android 代码自行封装一个uts的全局弹框
      timeoutId.value = setTimeout(() => {
        isPermissionAlertShow.value = true
      }, 100)
    })
    permissionListener.value!.onComplete((_) => {
      clearTimeout(timeoutId.value)
      isPermissionAlertShow.value = false
    })
  }

  const requestPermission = () => {
    // #ifdef APP-ANDROID
    if (UTSAndroid.checkSystemPermissionGranted(UTSAndroid.getUniActivity()!, ["android.permission.READ_CALENDAR"])) {
      uni.showToast({
        title: "权限已经同意了，不需要再申请",
        position: "bottom"
      })
      return
    }
    UTSAndroid.requestSystemPermission(UTSAndroid.getUniActivity()!, ["android.permission.READ_CALENDAR"], (_ : boolean, p : string[]) => {
      console.log(p)
    }, (_ : boolean, p : string[]) => {
      uni.showToast({
        title: "权限被拒绝了",
        position: "bottom"
      })
      console.log(p)
    })
    // #endif
  }

  onReady(() => {
    watchPermissionRRequest()
  })

</script>

<style>
  .permission-alert {
    width: 90%;
    height: 100px;
    margin: 10px 5%;
    position: absolute;
    top: 0px;
    z-index: 3;
    border-radius: 5px;
    transition-property: transform;
    transition-duration: 200ms;
    background-color: white;
    padding: 10px;
  }
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.createRequestPermissionListener)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/create-request-permission-listener.html)

## Tips

- 如果权限已经申请并且允许之后，`onConfirm`不会触发。
- 如果同时申请多个权限时，`onComplete`可能会触发多次。
- uni-app x 中如果请求一个已经被永久拒绝的权限，可能会触发`onConfirm`。目前的临时方案是做延时处理，如下面示例代码。后续会修复此问题。
- 权限列表参考：[https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#permissions](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#permissions)
- 全局监听权限申请可参考插件[uni-registerRequestPermissionTips](https://ext.dcloud.net.cn/plugin?name=uni-registerRequestPermissionTips)。
-
## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


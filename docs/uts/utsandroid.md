# UTSAndroid

app-android平台专有内置对象。在uni-app和uni-app x的uts环境中均可使用。

## 静态方法


### onAppConfigChange

监听 App配置发生变化, 对应 android原生 onAppConfigChange

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |




### offAppConfigChange

onAppConfigChange 对应的反注册函数

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |



### onAppTrimMemory

注册监听 App 内存不足时的系统回调函数 对应原生的API: onTrimMemory

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (res: Number) => void | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |




### offAppTrimMemory

onAppTrimMemory 对应的反注册函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (res: Number) => void | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |




### onAppActivityPause

注册监听 activity onPause事件

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | () => void | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


```ts
UTSAndroid.onAppActivityPause(() => {
    let eventName = "onAppActivityPause - " + Date.now();
    console.log(eventName);
});
```


### offAppActivityPause

onAppActivityPause 对应的反注册函数

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | () => void | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


```ts
// 移除全部监听
UTSAndroid.offAppActivityPause();
// 移除指定监听
UTSAndroid.offAppActivityPause(() => {
});
```


### onAppActivityResume

注册监听 activity onResume事件

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | () => void | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |




```ts
UTSAndroid.onAppActivityResume(() => {
     let eventName = "onAppActivityResume - " + Date.now();
     console.log(eventName);
});
```



### offAppActivityResume

onAppActivityResume 对应的反注册函数

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | () => void | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |




```ts
// 移除全部监听
UTSAndroid.onAppActivityResume();
// 移除指定监听
UTSAndroid.onAppActivityResume(() => {
});
```


### onAppActivityDestroy

注册监听 activity onDestroy事件

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | () => void | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


```ts
UTSAndroid.onAppActivityDestroy(() => {
     let eventName = "onAppActivityDestroy- " + Date.now();
     console.log(eventName);
});
```


### offAppActivityDestroy

onAppActivityDestroy 对应的反注册函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | () => void | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |



```ts
// 移除全部监听
UTSAndroid.offAppActivityDestroy();
// 移除指定监听
UTSAndroid.offAppActivityDestroy(() => {
});
```


### onAppActivityResult

注册监听 activity onAppActivityResult 函数

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (requestCode: Int, resultCode: Int, data: any) => void | 是 | - | - | 用于监听的响应函数 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |



App 的 activity 启动其他activity的回调结果监听 对应原生的  [onActivityResult](https://developer.android.com/training/basics/intents/result)

需要特别注意的是 `requestCode` 参数，这个参数用于区别 不同的请求来源,开发者应该只处理自己发起请求

```ts
let customRequestCode = 12000

UTSAndroid.onAppActivityResult((requestCode: Int, resultCode: Int, data?: Intent) => {
	if(requestCode == 12000){
		// 我们发起的请求
		let eventName = "onAppActivityResult  -  requestCode:" + requestCode + " -resultCode:"+resultCode + " -data:"+JSON.stringify(data);
    	console.log(eventName);
	}else{
		// 别的代码发起的请求，不要处理
	}

});
```


### offAppActivityResult

onAppActivityResult 对应的反注册函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (requestCode: Int, resultCode: Int, data: any) => void | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


```ts
// 移除全部监听
UTSAndroid.offAppActivityResult();
// 移除指定监听
UTSAndroid.offAppActivityResult(() => {
});
```



### onAppActivityBack

注册监听 activity onAppActivityBack 函数

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | () => void | 是 | - | - | 用于监听的响应函数 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


```ts
UTSAndroid.onAppActivityBack(() => {
     let eventName = "onAppActivityBack- " + Date.now();
     console.log(eventName);
});

```


### offAppActivityBack

取消注册监听 activity onAppActivityBack 函数

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | () => void | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


```ts
// 移除全部监听
UTSAndroid.offAppActivityBack();
// 移除指定监听
UTSAndroid.offAppActivityBack(() => {
});
```


### getAppContext()

获取当前应用Application上下文，对应android平台 Context.getApplicationContext 函数实现

> HBuilderX4.31及以上版本推荐使用 [getApp().getAndroidApplication()](../api/get-app.md#getandroidapplication) 获取android原生 [Application](https://developer.android.google.cn/reference/android/app/Application)。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Context \| null | 当前应用程序 上下文实例对象 | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


<!-- UTSJSON.UTSAndroid.getAppContext.tutorial -->

```uts
let packageName = UTSAndroid.getAppContext()?.packageName
console.log("packageName",packageName)
```

### getUniActivity()

获取当前应用 栈顶的 Activity实例，对应android平台 getActivity 函数实现

> 在uvue页面中也可先通过 [uni.getElementById](../api/get-element-by-id.md) 获取节点元素对象 [UniElement](../dom/unielement.md)，在调用其 [getAndroidActivity](../dom/unielement.md#getandroidactivity) 获取android原生 [Activity](https://developer.android.google.cn/reference/android/app/Activity)。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Activity \| null | 当前应用栈顶的 Activity实例 | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


<!-- UTSJSON.UTSAndroid.getUniActivity.tutorial -->

```uts
// 获取第一个可以响应图像采集行为组件
let takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
if (takePictureIntent.resolveActivity(UTSAndroid.getUniActivity()!.getPackageManager()) != null) {
	UTSAndroid.getUniActivity()!.startActivityForResult(takePictureIntent, 1001);
}
```

### getResourcePath(resourceName:string)

获取资源文件的原生平台路径。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| resourceName | string | 是 | - | - | 资源文件相对于项目的绝对路径, 如：“/static/logo.png” | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 该资源在原生平台的路径 | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


::: warning 注意事项

`getResourcePath` 与 [convert2AbsFullPath](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#convert2absfullpath-path-string) 区别在于：

`getResourcePath` 屏蔽了读取`代码包文件`时 各平台/各模式下的底层细节，即使是存放在`asset`目录也会返回符合android 读取规范的协议地址

`convert2AbsFullPath` 没有实现这一点

当开发者需要读取`代码包文件`时，建议使用 `getResourcePath`


- [代码包文件](../api/file-system-spec.md#package)
  - `代码包文件`在`真机运行`和`云打包`模式下的释放策略不同：\
  	本地真机运行：会被存在放内置储存目录\
  	云打包： `uni-app x`项目会被存放在`asset`目录, `uni-app` 项目默认会被存放在内置储存目录\
  	因此 `uni-app`/`uni-app x` 平台对 `代码包文件` 均仅支持读取操作
- [本地磁盘文件](../api/file-system-spec.md#disk)
	- [沙盒文件](../api/file-system-spec.md#internalsandbox)
		- 不支持
	- [沙盒外文件](../api/file-system-spec.md#%E6%B2%99%E7%9B%92%E5%A4%96%E7%9B%AE%E5%BD%95)
		- 不支持
:::


```ts
/**
 * 代码包文件在真机运行模式下：
 * /storage/emulated/0/Android/data/io.dcloud.uniappx/apps/__UNI__XXXXXXX/www/static/logo.png
 * 代码包文件在云打包模式下：
 * file:///android_asset/apps/__UNI__XXXXXXX/www/static/logo.png
 * /
console.log(UTSAndroid.getResourcePath('static/logo.png'))
// 沙盒文件,不支持，会返回不存在的路径
console.log(UTSAndroid.getResourcePath('unifile://sandbox/static/logo.png'))
// 沙盒外文件,不支持，会返回不存在的路径
console.log(UTSAndroid.getResourcePath('/storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/www/static/logo.png'))
```

### getAppCachePath()

获取app 临时目录。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string \| null | 返回app临时目录路径。存放在该文件可能会在应用退出后被清理 | 


<!-- UTSJSON.UTSAndroid.getAppCachePath.test -->

**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.99 | 3.99 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


<!-- UTSJSON.UTSAndroid.getAppCachePath.tutorial -->

### exit()

退出当前应用



**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSAndroid.exit.test -->

**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


<!-- UTSJSON.UTSAndroid.exit.tutorial -->

### getDispatcher

> 已废弃,请使用 [uni.createWorker](https://doc.dcloud.net.cn/uni-app-x/api/create-worker.html#createworker) 替代

获取一个任务分发器实例
**已废弃,请使用 uni.createWorker 替代**

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| threadName | string \| null | 否 | - | - | 任务组名称，可能为：<br/>main: ui thread / dom: 仅uni-app x环境生效，uni-app 环境会自动切换到 ui<br/>io : io thread<br/>匿名线程 null 或者 '': 来源线程，如果来源线程不支持任务分发，则会在当前线程执行执行. 这个场景下要求第一个参数必须是线程环境 | 


**返回值**
| 类型 |
| :- |
| [UTSTaskDispatcher](#utstaskdispatcher-values) | 



##### UTSTaskDispatcher 的方法 @utstaskdispatcher-values 

##### async(action : (action : any \| null) => void, param ?: any \| null) : void @async
async
在当前任务分发器 异步执行任务
###### async 兼容性 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| action | (action?: any) => void | 是 | - | - | 任务函数 |
| param | any | 否 | - | - | 任务函数需要的参数 | 



**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |



```uts
// 不传任何参数，得到是当前代码运行线程
let currentDispatcher = UTSAndroid.getDispatcher()
console.log("currentDispatcher",currentDispatcher)
// 期望在 io 任务队列执行
UTSAndroid.getDispatcher("io").async(function(_){
    console.log("当前任务执行在",Thread.currentThread().getName())
    // 期望在 主线程 任务队列执行
    UTSAndroid.getDispatcher("main").async(function(_){
        console.log("当前任务执行在",Thread.currentThread().getName())
        currentDispatcher.async(function(_){
            console.log("起始任务执行在",Thread.currentThread().getName())
        },null)
    },null)
},null)
```

** 注意，修改UI或者响应式数据（会触发ui更新） 只能可以在`main`任务队列进行

### getAppId()

获取当前运行的app的AppId。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 当前运行的app的AppId。 | 


<!-- UTSJSON.UTSAndroid.getAppId.test -->

**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


<!-- UTSJSON.UTSAndroid.getAppId.tutorial -->

### getOsTheme()

获取当前系统主题样式



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 系统主题样式 "dark":暗色模式  "light":亮色模式 | 


<!-- UTSJSON.UTSAndroid.getOsTheme.test -->

**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


<!-- UTSJSON.UTSAndroid.getOsTheme.tutorial -->

### isUniMp()

获取当前运行环境是否是unimp。



**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 是否是unimp。 | 


<!-- UTSJSON.UTSAndroid.isUniMp.test -->

**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


<!-- UTSJSON.UTSAndroid.isUniMp.tutorial -->

### getAppName()

获取manifest.json 中配置的应用名称



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 应用名称。 | 


<!-- UTSJSON.UTSAndroid.getAppName.test -->

**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


<!-- UTSJSON.UTSAndroid.getAppName.tutorial -->

### getAppVersion()

获取manifest.json 中配置的应用版本信息



**返回值**
| 类型 | 描述 |
| :- | :- |
| UTSJSONObject | 应用版本信息 | 


<!-- UTSJSON.UTSAndroid.getAppVersion.test -->

**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


<!-- UTSJSON.UTSAndroid.getAppVersion.tutorial -->

### getInnerVersion()

获取引擎版本号。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 引擎版本号。 | 


<!-- UTSJSON.UTSAndroid.getInnerVersion.test -->

**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


<!-- UTSJSON.UTSAndroid.getInnerVersion.tutorial -->

### isUniAppX()

获取当前是否是uniapp x 环境



**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | uniapp x 环境 true, uniapp 环境： false。 | 


<!-- UTSJSON.UTSAndroid.isUniAppX.test -->

**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


<!-- UTSJSON.UTSAndroid.isUniAppX.tutorial -->

### devicePX2px(devicePX:number) : number;

物理像素转换为页面的px像素

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| devicePX | number | 是 | - | - | 待转换的物理像素 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 转换后的页面px | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.95 | 3.95 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| 3.95 |


```ts
// 对 100物理像素长度 进行转换
let pagePX = UTSAndroid.devicePX2px(100)
// 在特定设备返回值:36.3636360168457
console.log("pagePX",pagePX)
```


### requestSystemPermission

请求系统权限

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| context | Activity | 是 | - | - | - |
| requestPermission | Array&lt;string&gt;\<string> | 是 | - | - | 期望请求的权限 |
| success | (allRight: boolean, grantedList: Array&lt;string&gt;) => void | 是 | - | - | - |
| fail | (doNotAskAgain: boolean, grantedList: Array&lt;string&gt;) => void | 是 | - | - | - |
| shallUnCheck | boolean | 否 | false | - | 是否忽略权限检查，需要HBuilder X 4.25 之后版本 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


```uts

	let permissionNeed = ["android.permission.CAMERA"]
    // 请求拍照权限
	UTSAndroid.requestSystemPermission(UTSAndroid.getUniActivity()!, permissionNeed, function (allRight : boolean, _ : string[]) {
		if (allRight) {
			// 权限请求成功
		} else {
			//用户拒绝了部分权限
		}
	}, function (_ : boolean, _ : string[]) {
		//用户拒绝了部分权限
	})

```

请求权限后有三种情况:

+ 用户允许了全部权限请求，会通过 `success`回调通知调用者，并且此时`allRight`参数为 `true`

+ 用户拒绝了全部权限请求，会通过 `fail` 回调通知调用者，`doNotAskAgain` 参数标识了用户拒绝时是否选择了`不再询问`

+ 用户允许了部分请求，拒绝了部分权限请求,此时既会调用`success`也会调用`fail`。由其中的 string数组参数 标识具体被拒绝/允许的权限


### checkSystemPermissionGranted

检查当前应用是否已经具备指定权限

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| context | Activity | 是 | - | - | - |
| requestPermission | Array&lt;string&gt;\<string> | 是 | - | - | 期望具备的权限 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 请求的权限列表中是否已经具备 | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


```uts
let permissionCheck = ["android.permission.CAMERA"]
// 请求拍照权限
if (UTSAndroid.checkSystemPermissionGranted(UTSAndroid.getUniActivity()!, permissionCheck)) {
	console.log("当前已具备指定权限")
}else{
	console.log("当前不具备指定权限")
}
```


### gotoSystemPermissionActivity

跳转至系统权限手动设备列表

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| context | Activity | 是 | - | - | - |
| requestPermission | Array&lt;string&gt;\<string> | 是 | - | - | 期望请求的权限 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |


```ts
// 前往系统权限设置界面
let permissionNeed = ["android.permission.READ_PHONE_STATE"]
UTSAndroid.gotoSystemPermissionActivity(UTSAndroid.getUniActivity()!,permissionNeed)
```


### getSystemPermissionDenied

获取当前应用不具备的权限列表

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| context | Activity | 是 | - | - | - |
| requestPermission | Array&lt;string&gt;\<string> | 是 | - | - | 期望请求的权限 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Array\<string> | 请求的权限列表中已经被禁用的部分 | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |



```ts
	let permissionNeed = ["android.permission.READ_PHONE_STATE"]
	if (UTSAndroid.getSystemPermissionDenied(UTSAndroid.getUniActivity()!, permissionNeed).isEmpty()) {
    	console.log("当前已具备指定权限")
	}
```

### convert2AbsFullPath(path:string)

将文件的项目相对地址转换为 运行期对应的绝对地址<br/>     eg.<br/>        'static/logo.png' -> '/storage/sdcard/0/apps/com.xxxx/files/logo.png'

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| inputPath | string | 是 | - | - | 待转换的文件相对路径 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 转换后文件绝对路径 | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.90 | 3.90 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| √ |



::: warning 注意事项

`convert2AbsFullPath` 与 [getResourcePath](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getresourcepath) 区别在于：

`convert2AbsFullPath` 对文件路径支持范围更大，不仅支持 `代码包文件`内置储存目录的情况，还支持相对路径，沙盒路径，沙盒外路径（包括系统API返回的文件地址） 等形式。

`getResourcePath` 不支持这些

当开发者明确需要操作文件，而非代码包资源时，建议使用 `convert2AbsFullPath`


- [代码包文件](../api/file-system-spec.md#package)
  - `代码包文件`在`真机运行`和`云打包`模式下的释放策略不同：\
  	本地真机运行：会被存在放内置储存目录\
  	云打包： `uni-app x`项目会被存放在`asset`目录, `uni-app` 项目会被存放在内置储存目录\
  	因此在 `uni-app`/`uni-app x` 平台对 `代码包文件` 均仅支持读取操作
- [本地磁盘文件](../api/file-system-spec.md#disk)
	- [沙盒文件](../api/file-system-spec.md#internalsandbox)
		- `uni-app x`支持读写
		- `uni-app`不支持
	- [沙盒外文件](../api/file-system-spec.md#%E6%B2%99%E7%9B%92%E5%A4%96%E7%9B%AE%E5%BD%95)
		- 沙盒管理范围外的其他文件。 调用系统API返回的绝对地址属于此类。`uni-app`/`uni-app x`平台 均支持读写

:::

```ts
/**
 * 代码包文件
 * 本地调试执行结果：/storage/emulated/0/Android/data/io.dcloud.uniappx/apps/__UNI__XXXXXXX/www/static/logo.png
 * 云打包执行结果 ：/android_asset/apps/__UNI__XXXXXXX/www/static/logo.png
 * /
console.log(UTSAndroid.convert2AbsFullPath('static/logo.png'))
/**
 * 沙盒文件
 * 本地调试执行结果：/storage/emulated/0/Android/data/io.dcloud.uniappx/static/logo.png
 * 云打包执行结果 ：/storage/emulated/0/Android/data/io.dcloud.uniappx/static/logo.png
 * /
console.log(UTSAndroid.convert2AbsFullPath('unifile://sandbox/static/logo.png'))
/**
 * 沙盒外文件 包含相对路径
 * 本地调试执行结果：/storage/emulated/0/Android/data/io.dcloud.uniappx/apps/__UNI__XXXXXXX/www/io.dcloud.HBuilder/apps/HBuilder/www/static/logo.png
 * 云打包执行结果 ：/android_asset/apps/__UNI__XXXXXXX/www/io.dcloud.HBuilder/apps/HBuilder/www/static/logo.png
 * /
console.log(UTSAndroid.convert2AbsFullPath('../../../io.dcloud.HBuilder/apps/HBuilder/www/static/logo.png'))
```




### getFileProviderUri(file:File)

将应用的私有文件 通过内置的FileProvider转换为外部应用可以访问的Uri

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| file | File | 是 | - | - | 待转换的私有文件 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Uri | 转换后的Uri | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 3.99 | 3.99 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| 3.99 |


```ts
// 使用外部应用打开项目内置图片资源
let file = new File(UTSAndroid.getResourcePath("static/logo.png"))
const uri = UTSAndroid.getFileProviderUri(file)
const intent = new Intent(Intent.ACTION_VIEW, uri)
intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
const context = UTSAndroid.getUniActivity()!;
context.startActivity(intent);

```

### getExtApiProvider(service, providerName)

获取指定service的指定provider实现

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| service | string | 是 | - | - | 指定的服务名称 |
| providerName | string | 是 | - | - | 指定provider名称 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| T \| null | 指定 provider 实例 | 


<!-- UTSJSON.UTSAndroid.getExtApiProvider.test -->

**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.14 | 4.14 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| 4.14 |


<!-- UTSJSON.UTSAndroid.getExtApiProvider.tutorial -->

### getJavaClass(input:any)

获取对象的jvm class实例

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| input | any | 是 | - | - | 任意不为空对象，如果传入一个Class类型，则返回该Class对应的jvm class实例 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Class | 传入对象所对应的class实例 | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.0 | 4.0 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| 4.0 |


```uts
export function getJavaClassTest() : boolean {
	let dispatcherClass = UTSAndroid.getJavaClass(UTSAndroid.getDispatcher())
	if("io.dcloud.uts.task.UTSTaskDispatcher" == dispatcherClass.name){
		return true
	}
	let applicationClass = UTSAndroid.getJavaClass(UTSAndroid.getAppContext()!)
	if("io.dcloud.uniapp.UniApplication" == applicationClass.name){
		return true
	}
	/**
	* 特殊用法：UTSAndroid.getJavaClass(XXX) 可以传入类而不是实例，这样会被编译成 XXX::class.java
	*/
	let utsAndroidClass = UTSAndroid.getJavaClass(UTSAndroid)
	if("io.dcloud.uts.UTSAndroid" == utsAndroidClass.name){
		return true
	}
	return false
}
```


### getKotlinClass(input:any)

获取对象的 KClass 实例

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| input | any | 是 | - | - | 任意不为空对象，如果传入一个Class类型，则返回该Class对应的 KClasss实例 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| KClass | 传入对象所对应的KClass实例 | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.65 | 4.65 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| 4.65 |



### getTopPageActivity()

获取与当前页面绑定的activity对象，需要注意的是:当页面对象未与activity建立绑定关系时，可能为null



**返回值**
| 类型 | 描述 |
| :- | :- |
| Activity \| null | 当前页面绑定的activity示例 | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.0 | 4.0 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| 4.0 |


```ts
// 获取当前栈顶activity
console.log(UTSAndroid.getTopPageActivity())
```


### onActivityCallback(callback, pageRoute?)

注册监听activity回调方法

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | IUniActivityCallback | 是 | - | - | 回调方法，[查看具体子类实现](https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html) |
| pageRoute | string \| null | 否 | - | - | [页面的路由地址route](https://doc.dcloud.net.cn/uni-app-x/api/get-current-pages.html#getcurrentpages),注意如果是tabBar页面,请传'tabBar'字符串 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| 4.18 |



### offActivityCallback(callback)

onActivityCallback对应的反注册函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | IUniActivityCallback | 是 | - | - | onActivityCallback传入的callback | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| 4.18 |



### getAppTheme()

获取app主题



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 值域为 dark \| light \| auto | 


<!-- UTSJSON.UTSAndroid.getAppTheme.test -->

**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| 4.18 |


<!-- UTSJSON.UTSAndroid.getAppTheme.tutorial -->

### getGenericType\<T>(): Type

获取类型T 对应的 java.lang.reflect.Type 对象



**返回值**
| 类型 |
| :- |
| Type | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.02 | 4.02 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| 4.02 |



### getGenericClassName\<T>(): string

获取类型 T 对应的 class name



**返回值**
| 类型 |
| :- |
| string | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.02 | 4.02 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| 4.02 |





### 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.platformObject.UTSAndroid)

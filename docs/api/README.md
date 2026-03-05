# API概述

uni-app x项目的uts代码中可以使用很多API。包括：

1. uts的api，包括[内置对象](../uts/buildin-object-api/global.md)，以及平台专有对象[UTSAndroid](../uts/utsandroid.md)和[UTSiOS](../uts/utsios.md)
2. 全局api，前面不需要加`uni.`。如`getApp`
3. uni.xxx的内置api。见左侧
4. uniCloud.xxx的内置api [详见](./unicloud/README.md)
5. dom的api [详见](../dom/README.md)
6. vue的api [详见](../vue/README.md)
7. 平台原生api
	* Android 所有原生API
	* iOS 所有原生API
	* harmony 所有原生API
	* Web浏览器所有API
	* 小程序所有API

uni-app x中，不会限制任何平台原来的API无法调用。常用的跨平台API，都已经封装在uni的API中，但所有的平台API均可以在uni-app x中调用。

## os原生api的使用
由于uts可以直接调用Android、iOS、鸿蒙的api，所以os和三方sdk的能力都可以在uts中调用。如下是一个Android的例子：

```vue
<script>
	import Build from 'android.os.Build';
	export default {
		onLoad() {
			console.log(Build.MODEL); //调用原生对象，返回手机型号
			console.log(uni.getSystemInfoSync().deviceModel); //调用uni API，返回手机型号。与上一行返回值相同
		}
	}
</script>
```

上面的示例，在页面启动时打印了2行日志，显示手机型号。

- uni.getSystemInfoSync，是uni的api
- import的Build，是Android os的api

可以看出，在uni-app x里，可以直接调用os的能力，不受限制，语法是uts的语法，但需要了解什么功能在原生里是哪个api。

使用`uni.getSystemInfoSync`则比较简单，看uni的文档即可，且可跨平台。

其实，[uni.getSystemInfoSync](https://gitcode.com/dcloud/uni-api/blob/master/uni_modules/uni-getSystemInfo/utssdk/app-android/index.uts) 的内部实现就是一个uts模块，底层使用了一样的代码，也是import了android.os.Build。

大多数uni.的api，都是uts开发的，它们开源在[uni-api](https://gitcode.com/dcloud/uni-api)。

插件市场也有很多做好的uts插件，方便开发者拿来即用。[uts插件](https://ext.dcloud.net.cn/?cat1=8&type=UpdatedDate)

虽然上述页面可以直接调用原生Android能力，但正规开发时，原生能力应封装为[uni_modules](https://uniapp.dcloud.net.cn/plugin/uni_modules.html)形式的[uts插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)。这样方便共享、方便跨平台。（iOS在js驱动模式时，uvue页面中不支持调用swift API，需封装为uts插件调用原生API）

uni-app x 中不再支持plus和weex的API。过去plus api中一些常用的api，一部分在uni-app x中进行了替换增补、一部分提供了uts操作原生的示例代码。[详见](ext.md)

网上可以找到很多kotlin调用系统api的代码，但如何使用uts来调用这些系统api？

以上面的获取手机型号的代码为例：

1. 打开一个靠谱的ai，询问："kotlin中获取手机型号的代码，需包含导入的类"，得到如下代码：
```kotlin
import android.os.Build

fun getDeviceModel(): String {
    return Build.MODEL
}
```

2. 再问ai："把上述代码转为ts代码"
```ts
function getDeviceModel(): string {
  return Build.MODEL;
}
```

这里注意几个差别：
- kotlin中import包，是`import android.os.Build`，而uts是`	import Build from 'android.os.Build'`。import后面需要跟名字，from后面需要引号括起来。
- import包，需要在uvue页面的`export default`外。复杂的原生插件应该直接创建uts插件，放在单独的uni_modules中。
- kotlin定义一个函数是`fun`，而uts是`function`
- kotlin中定义一个常量是val，而uts是const；kotlin的变量定义是var，而uts推荐使用let。

更复杂的例子可以[参考](ext.md#kt2uts)

## promise
uni的异步api，均支持callback，但只有部分支持promise。对于支持promise的API，在API文档的返回值描述中会包含`Promise`。

## 生命周期@liftcycle

生命周期是一种特殊事件，对于应用、页面、组件，uni-app x提供了一批对应的生命周期，比如应用的onLaunch、页面的onLoad、组件的created。

- 应用生命周期：[详见](../collocation/app.md#applifecycle)
- 页面生命周期：[详见](../page.md#lifecycle)
- 组件生命周期：[详见](../vue/component.md#component-lifecycle)

除了生命周期，uni还提供了一批其他on/off事件监听API，比如uni.onPushMessage()、uni.offPushMessage()。这些不属于生命周期。

# 其它api

在App平台，与uni-app相比，uni-app x多了不少API，但也还有一些API没有，需要通过插件市场的插件替代。

## uni api替代@uni
- 谷歌登录：[见插件市场](https://ext.dcloud.net.cn/search?q=%E8%B0%B7%E6%AD%8C%E7%99%BB%E5%BD%95&orderBy=Relevance&uni-appx=1)
- 谷歌支付：[见插件市场](https://ext.dcloud.net.cn/search?q=%E8%B0%B7%E6%AD%8C%E6%94%AF%E4%BB%98&orderBy=Relevance&uni-appx=1)
- 蓝牙：Bluetooth。[见插件市场](https://ext.dcloud.net.cn/search?q=%E8%93%9D%E7%89%99&orderBy=Relevance&cat1=8&cat2=81)
- NFC：[见插件市场](https://ext.dcloud.net.cn/search?q=nfc&orderBy=Relevance&cat1=8&cat2=81)

## plus api替代@plus
uni-app x 中不再支持plus和weex的API。对于plus api中一些常用的api，在uni-app x中进行了替换增补。
- plus.runtime.quit => [uni.exit](./exit.md)
- plus.runtime.install => [uni.installApk](./install-apk.md)

一些plus api在插件市场有替代：
- plus.sqlite [插件市场](https://ext.dcloud.net.cn/search?q=sqlite&uni-appx=1)
- plus.speech [插件市场](https://ext.dcloud.net.cn/search?q=%E6%96%87%E5%AD%97%E8%BD%AC%E8%AF%AD%E9%9F%B3&orderBy=Relevance&uni-appx=1)
- plus.runtime.openURL [插件市场](https://ext.dcloud.net.cn/plugin?id=17828)
或者参考如下代码调用。

```vue
<template>
	<view>
		<button @click="openSchema('https://uniapp.dcloud.io/uni-app-x')">使用浏览器打开指定URL</button>
		<button @click="openSchema('market://details?id=com.tencent.mm')">使用应用商店打开指定App</button>
		<button @click="openSchema('androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=39.9631018208&lon=116.3406135236&dev=0')">打开地图坐标</button>
	</view>
</template>
<script>
	import Intent from 'android.content.Intent';
	import Uri from 'android.net.Uri';
	export default {
		data() {
			return {}
		},
		methods: {
			openSchema(url : string) {
				const context = UTSAndroid.getUniActivity()!;
				const uri = Uri.parse(url)
				const intent = new Intent(Intent.ACTION_VIEW, uri)
				intent.setData(uri);
				context.startActivity(intent);
			}
		}
	}
</script>
```

插件市场有一些抹平plus写法的插件，自定义了一个plus对象，方法内部再调用uni或uts的api，以兼容历史的plus写法，[详见](https://ext.dcloud.net.cn/search?q=plus&orderBy=Relevance&uni-appx=1)

## kotlin代码转uts简易指南@kt2uts

扩展原生API在uni-app x中很简单，以上面的打开schema代码为例。

1. 打开一个靠谱的ai，询问："kotlin中打开系统浏览器的代码"，得到如下代码：
```kotlin
import android.content.Intent  
import android.net.Uri  
  
fun openSystemBrowser(url: String) {  
    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))  
    startActivity(intent)  
}
```

2. 然后新建一个uni_modules，选uts插件，定义下如何在你的代码中调用这个原生能力，然后通过uts混编的方式调用kt代码，或者通过ai转换为uts代码。
```ts
import Intent from 'android.content.Intent';
import Uri from 'android.net.Uri';

function openSystemBrowser(url: string): void {  
  const intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));  
  startActivity(intent);  
}
```

这里注意几个差别：
- kotlin中import包，是`import android.content.Intent`，而uts是`import Intent from 'android.content.Intent'`。import后面需要跟名字，from后面需要引号括起来。
- kotlin定义一个函数是`fun`，而uts是`function`
- kotlin中定义一个常量是val，而uts是const；kotlin的变量定义是var，而uts推荐使用let。
- uts中实例化对象需要使用new关键字。
- kotlin中是自己创建activity、自己管理。而uts中activity已经被uni-app x框架创建好了，要获取当前activity，有专门的api，`const context = UTSAndroid.getUniActivity()!`

一般推荐使用[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)，只需要告诉uni-agent你的需求，定义好调用方式、说明要调用的原生能力，uni-agent就可以给你写出原生插件。

官方的uni api，都是uts插件，这里面很多例子可以参考：[https://gitcode.com/dcloud/uni-api](https://gitcode.com/dcloud/uni-api)

完整的uts插件开发指南，[详见](../plugin/uts-plugin.md)

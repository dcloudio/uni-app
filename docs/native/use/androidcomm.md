## 启动

需要在打开uni-app x的地方添加如下代码，触发逻辑即可打开uni-app x。

蒸汽模式（Vapor）：

```kotlin
startActivity(Intent(this, UniAppActivity::class.java))
```

::: details VDOM模式

### UniAppXSDK.start(options: UniAppXSDKStartOptions?, activity: Activity)

打开uni-app x应用

|名称		|类型					|默认值	|必填	|描述						|
|:--		|:--					|:--	|:--	|:--						|
|options	|UniAppXSDKStartOptions	|		|否		|UniAppXSDKStartOptions		|
|activity	|Activity				|		|是		|打开uni-app x的Activity对象	|

### UniAppXSDKStartOptions

|名称					|类型	|默认值	|必填	|描述			|
|:--					|:--	|:--	|:--	|:--			|
|appScheme				|String	|		|否		|透传scheme		|
|animationType			|String	|		|否		|动画类型[文档](https://uniapp.dcloud.net.cn/api/router.html#animation)			|
|enterCustomAnimation	|Number	|		|否		|进入动画资源ID	|
|exitCustomAnimation	|Number	|		|否		|退出动画资源ID	|

**Tips**
- `animationType`优先级高于`enterCustomAnimation`和`exitCustomAnimation`，但设置了`animationType`之后，其他动画属性将不生效。
- `enterCustomAnimation`和`exitCustomAnimation`需要同时设置才会生效。

:::

连接手机，点击运行按钮，可以在手机上查看效果。

![avatar](https://img.cdn.aliyun.dcloud.net.cn/nativedocs/5%2BSDK-android/image/7-6.png)


## 通信

### 广播方式

实现实时通讯可以通过安卓原生的广播通信的方式。

#### uni-app x项目

首先需要通过uts插件注册一个BroadcastReceiver接受android原生应用发送的广播信息。

发送广播可以通过`activity.sendBroadcast(intent)`将信息传送到原生。

```uts
import { RegisterBroadcast, UnregisterBroadcast, SendBroadcast, RegisterBroadcastOptions } from '../interface.uts'
import BroadcastReceiver from 'android.content.BroadcastReceiver'
import Context from 'android.content.Context'
import Intent from 'android.content.Intent'
import IntentFilter from 'android.content.IntentFilter'
import Build from 'android.os.Build'

class BroadcastDemoReceiver extends BroadcastReceiver {
	private receiveAction : string = ""
	private receiveCallback : ((value : string) => void) | null = null

	constructor(action : string, callback : (value : string) => void) {
		super()
		this.receiveAction = action
		this.receiveCallback = callback
	}

	override onReceive(context : Context, intent : Intent) {
		const intentAction = intent.getAction()
		if (intentAction == null) {
			return
		}
		if (intentAction == this.receiveAction) {
			const rawValue = intent.getStringExtra("key")
			const value = rawValue != null ? rawValue : ""
			const callback = this.receiveCallback
			if (callback != null) {
				callback(value)
			}
		}
	}
}

let currentReceiver : BroadcastDemoReceiver | null = null

export const unregisterBroadcast : UnregisterBroadcast = function () {
	const receiver = currentReceiver
	if (receiver != null) {
		const activity = UTSAndroid.getUniActivity()
		if (activity != null) {
			activity.unregisterReceiver(receiver)
		}
	}
	currentReceiver = null
}

export const registerBroadcast : RegisterBroadcast = function (options : RegisterBroadcastOptions) {
	unregisterBroadcast()
	const activity = UTSAndroid.getUniActivity()
	if (activity == null) {
		return
	}
	const receiver = new BroadcastDemoReceiver(options.action, options.onReceive)
	const filter = new IntentFilter(options.action)
	if (Build.VERSION.SDK_INT >= 33) {
		activity.registerReceiver(receiver, filter, Context.RECEIVER_EXPORTED)
	} else {
		activity.registerReceiver(receiver, filter)
	}
	currentReceiver = receiver
}

export const sendBroadcast : SendBroadcast = function (action : string, key : string, value : string) {
	const activity = UTSAndroid.getUniActivity()
	if (activity == null) {
		return
	}
	const intent = new Intent(action)
	intent.putExtra(key, value)
	activity.sendBroadcast(intent)
}
```

在uvue页面中主动调用uts插件发送广播，参考示例：

```uvue
<template>
	<view class="content">
		<image class="logo" src="/static/logo.png" @click="send"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script setup lang="uts">
	// #ifdef APP-ANDROID
	import {
		registerBroadcastReceiver,
		sendBroadcast,
		unregisterBroadcastReceiver,
		BroadcastReceiverOptions
	} from '@/uni_modules/uts-broadcast'
	// #endif

	const title = '点击图片发送广播'

	onReady(() => {
		// #ifdef APP-ANDROID
		const options = {
			action: 'ACTION_FROM_NATIVE',
			extraKey: 'key',
			onReceive: (value : string) => {
				uni.showToast({
					title: value
				})
			}
		} as BroadcastReceiverOptions
		registerBroadcastReceiver(options)
		// #endif
	})

	onUnload(() => {
		// #ifdef APP-ANDROID
		unregisterBroadcastReceiver()
		// #endif
	})

	const send = () => {
		// #ifdef APP-ANDROID
		sendBroadcast('ACTION_TO_NATIVE', 'key', '接受到广播，三秒钟之后会接收到原生发送的广播')
		// #endif
	}
</script>

<style>
	.content {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-bottom: 50rpx;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
```

#### android原生项目

首先需要在当前activity注册一个BroadcastReceiver接受uni-app x发送的广播信息。

发送广播可以通过`sendBroadcast(inte)`将信息传送到uni-app x。

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)
        findViewById<View>(R.id.btn_goto).setOnClickListener {
            startActivity(Intent(this@MainActivity, UniAppActivity::class.java))
            if (VERSION.SDK_INT >= 33) {
                registerReceiver(broadcast, IntentFilter("ACTION_TO_NATIVE"), null, null, RECEIVER_EXPORTED)
            } else {
                registerReceiver(broadcast, IntentFilter("ACTION_TO_NATIVE"))
            }
        }
    }

    private val broadcast = object : BroadcastReceiver() {
        val handler = Handler(Looper.getMainLooper())
        override fun onReceive(context: Context, intent: Intent) {
            if(intent.action == "ACTION_TO_NATIVE") {
                Toast.makeText(context, intent.getStringExtra("key"), Toast.LENGTH_SHORT).show()
                handler.postDelayed({
                    val inte = Intent("ACTION_FROM_NATIVE")
                    inte.putExtra("key", "接受来自原生的广播")
                    context.sendBroadcast(inte)
                }, 3000)
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        unregisterReceiver(broadcast)
    }
}
```

**注意：广播要在页面关闭的时候取消注册，避免可能出现崩溃的问题。**

示例可以参考原生SDK中的工程。

## 退出

退出 uni-app x 应用可以在uni-app x中调用`uni.exit()`，整体退出uni-app x。

::: details VDOM模式

VDOM 模式可以调用 UniAppXSDK.exit() 退出应用。

:::


### 注册

::: details VDOM模式

uni-app x全局注册。当前方法用在解决用户无法继承UniApplication。

#### UniAppXApplication.onCreate(application: Application)

Application中onCreate方法中调用

#### UniAppXApplication.onTrimMemory(level: Int)

Application中onTrimMemory方法中调用

#### UniAppXApplication.onConfigurationChanged(newConfig: Configuration?)

Application中onConfigurationChanged方法中调用

示例可以参考原生SDK中的`app-comm`工程。

:::

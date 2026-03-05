
<template>
	<view >

	</view>
</template>
<script lang="uts">
	import TextUtils from 'android.text.TextUtils'
	import Button from 'android.widget.Button'
	import LinearLayout from 'android.widget.LinearLayout'
	import View from 'android.view.View'

	class ButtonClickListenr implements View.OnClickListener {
		override onClick(v ? : View) {
			console.log(v)
		}
	}

	//原生提供以下属性或方法的实现  
	export default {
		/**
		 * 组件名称，也就是开发者使用的标签
		 */
		name: "uts-hello-view",
		/**
		 * 组件涉及的事件声明，只有声明过的事件，才能被正常发送
		 */
		emits: ['buttonClick'],
		/**
		 * 属性声明，组件的使用者会传递这些属性值到组件
		 */
		props: {
			/**
			 * 字符串类型 属性：buttonText  需要设置默认值
			 */
			"buttonText": {
				type: String,
				default: "点击触发"
			}
		},
		/**
		 * 组件内部变量声明
		 */
		data() {
			return {}
		},
		/**
		 * 属性变化监听器实现
		 */
		watch: {
			"buttonText": {
				/**
				 * 这里监听属性变化，并进行组件内部更新
				 */
				handler(newButtonText: string) {
					if (this.$el != null) {
						let button = this.$el!.findViewWithTag("centerButton") as Button
						if (!TextUtils.isEmpty(newButtonText)) {
							button.setText(newButtonText)
						}
					}
				},
				immediate: false //创建时是否通过此方法更新属性，默认值为false  
			},
		},
		/**
		 * 规则：如果没有配置expose，则methods中的方法均对外暴露，如果配置了expose，则以expose的配置为准向外暴露
		 * ['publicMethod'] 含义为：只有 `publicMethod` 在实例上可用
		 */
		expose: ['doSth'],
		methods: {
			/**
			 * 对外公开的组件方法
			 */
			doSth(paramA: string) {
				// 这是组件的自定义方法
				console.log("paramA",paramA)
			},
			/**
			 * 内部使用的组件方法
			 */
			privateMethod() {

			}
		},

		/**
		 * 组件被创建，组件第一个生命周期，
		 * 在内存中被占用的时候被调用，开发者可以在这里执行一些需要提前执行的初始化逻辑
		 * [可选实现]
		 */
		created() {

		},
		/**
		 * 对应平台的view载体即将被创建，对应前端beforeMount  
		 * [可选实现]
		 */
		NVBeforeLoad() {

		},
		/**
		 * 创建原生View，必须定义返回值类型
		 * 开发者需要重点实现这个函数，声明原生组件被创建出来的过程，以及最终生成的原生组件类型
		 * （Android需要明确知道View类型，需特殊校验） 
		 * todo 补充IOS平台限制
	  * [必须实现]
		 */
		NVLoad(): LinearLayout {
			//必须实现  
			let contentLayout = new LinearLayout(this.$androidContext)
			let button = new Button(this.$androidContext)
			button.setText("点击触发");
			button.setTag("centerButton");
			contentLayout.addView(button, new LinearLayout.LayoutParams(500, 500));
			button.setOnClickListener(new ButtonClickListenr())
			return contentLayout
		},

		/**
		 * 原生View已创建 
		 * [可选实现]
		 */
		NVLoaded() {
      // 组件内可以调用 UTSAndroid 内置方法
      console.log("UTSAndroid.devicePX2px(1080) : ",UTSAndroid.devicePX2px(1080))
      console.log("UTSAndroid.rpx2px(1080) : ",UTSAndroid.rpx2px(1080))
      // console.log("UTSAndroid.appJSBundleUrl() : ",UTSAndroid.appJSBundleUrl())
		},
		/**
		 * 原生View布局完成  
		 * [可选实现]
		 */
		NVLayouted() {

		},
		/**
		 * 原生View将释放  
		 * [可选实现]
		 */
		NVBeforeUnload() {},
		/**
		 * 原生View已释放，这里可以做释放View之后的操作  
		 * [可选实现]
		 */
		NVUnloaded() {

		},
		/**
		 * 组件销毁  
		 * [可选实现]
		 */
		unmounted() {},
		/**
		 * 自定组件布局尺寸 
		 * [可选实现]
		 */
		NVMeasure(size: UTSSize,mode:UTSMeasureMode): UTSSize {
			size.width = 120.0.toFloat()
			size.height = 800.0.toFloat()
			return size
		}
	}
</script>
<style>
	
</style>
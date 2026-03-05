<template>
	<view class="defaultStyles">
	</view>
</template>
<script lang="uts">
	import {
		UIButton,
		UIControl
	} from "UIKit"

	// 定义按钮点击后触发回调的类
	class ButtonClickListsner {
		// 按钮点击回调方法
		@objc buttonClick() {
			console.log("按钮被点击")
		}
	}

	//原生提供以下属性或方法的实现  
	export default {
		name: "uts-hello-view",
		emits: ['buttonClick'],
		props: {
			"buttonText": {
				type: String,
				default: "点击触发"
			}
		},
		watch: {
			"buttonText": {
				/**
				 * 这里监听属性变化，并进行组件内部更新
				 */
				handler(newButtonText: string, oldButtonText) {
					this.$el.setTitle(newButtonText, for = UIControl.State.normal)
				},
				immediate: false //创建时是否通过此方法更新属性，默认值为false  
			},
		},
		data() {
			return {
				buttonClickListsner : new ButtonClickListsner()
			}
		},
		expose: ['doSth'],
		methods: {
			/**
			 * 对外公开的组件方法
			 */
			doSth(paramA: string) {
				// 这是组件的自定义方法
				console.log("paramA")
			}
		},
		/**
		 * 创建原生View，必须定义返回值类型
		 */
		NVLoad(): UIButton {
			//必须实现  
			let button = new UIButton()
			button.setTitle(this.buttonText, for = UIControl.State.normal)
			const method = Selector("buttonClick")
			button.addTarget(this.buttonClickListsner, action = method, for = UIControl.Event.touchUpInside)
			return button
		}
	}
</script>
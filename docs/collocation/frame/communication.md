> 自 HBuilderX 2.0.0 起自定义组件编译模式支持，[使用指南](https://ask.dcloud.net.cn/article/36010)

### uni.$emit(eventName,OBJECT)

触发全局的自定事件。附加参数都会传给监听器回调。

|属性		|类型	|描述				|
|---		|---	|---				|
|eventName	|String	|事件名				|
|OBJECT		|Object	|触发事件携带的附加参数	|

**代码示例**
```javascript
	uni.$emit('update',{msg:'页面更新'})
```


### uni.$on(eventName,callback)

监听全局的自定义事件。事件可以由 uni.$emit 触发，回调函数会接收所有传入事件触发函数的额外参数。

|属性		|类型		|描述			|
|---		|---		|---			|
|eventName	|String		|事件名			|
|callback	|Function	|事件的回调函数	|


**代码示例**
```javascript
	uni.$on('update',function(data){
		console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
	})
```


### uni.$once(eventName,callback)

监听全局的自定义事件。事件可以由 uni.$emit 触发，但是只触发一次，在第一次触发之后移除监听器。

|属性		|类型		|描述			|
|---		|---		|---			|
|eventName	|String		|事件名			|
|callback	|Function	|事件的回调函数	|


**代码示例**
```javascript
	uni.$once('update',function(data){
		console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
	})
```

### uni.$off([eventName, callback])

移除全局自定义事件监听器。

|属性		|类型			|描述			|
|---		|---			|---			|
|eventName	|Array＜String＞ |事件名			|
|callback	|Function		|事件的回调函数	|

**Tips**
- 如果没有提供参数，则移除所有的事件监听器；
- 如果只提供了事件，则移除该事件所有的监听器；
- 如果同时提供了事件与回调，则只移除这个回调的监听器；
- 提供的回调必须跟$on的回调为同一个才能移除这个回调的监听器；

**代码示例**

`$emit`、`$on`、`$off`常用于跨页面、跨组件通讯，这里为了方便演示放在同一个页面

```html
	<template>
		<view class="content">
			<view class="data">
				<text>{{val}}</text>
			</view>
			<button type="primary" @click="comunicationOff">结束监听</button>
		</view>
	</template>
	
	<script>
		export default {
			data() {
				return {
					val: 0
				}
			},
			onLoad() {
				setInterval(()=>{
					uni.$emit('add', {
						data: 2
					})
				},1000)
				uni.$on('add', this.add)
			},
			methods: {
				comunicationOff() {
					uni.$off('add', this.add)
				},
				add(e) {
					this.val += e.data
				}
			}
		}
	</script>
	
	<style>
		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	
		.data {
			text-align: center;
			line-height: 40px;
			margin-top: 40px;
		}
	
		button {
			width: 200px;
			margin: 20px 0;
		}
	</style>
	
```


**注意事项**
- uni.$emit、 uni.$on 、 uni.$once 、uni.$off 触发的事件都是 App 全局级别的，跨任意组件，页面，nvue，vue 等
- 使用时，注意及时销毁事件监听，比如，页面 onLoad 里边 uni.$on 注册监听，onUnload 里边 uni.$off 移除，或者一次性的事件，直接使用 uni.$once 监听

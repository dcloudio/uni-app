# UVUE DOM

每个uvue页面，在内存中都有一个 DOM（文档对象模型）。它和浏览器的 [DOM规范](https://www.w3.org/DOM/?spm=a2c7j.-zh-docs-api-weex-variable.0.0.2a5537c6FrgbYp) 类似。

DOM 是页面元素内容的结构数据。DOM 模型用一个逻辑树来表示一个页面文档，树的每个分支的终点都是一个节点，每个节点都对应一个节点对象（UniElement）。

实际上 uvue 的template、数据绑定，在底层调用的也是 DOM API。

在浏览器中，开发者一旦跳过vue框架直接操作dom，vue框架将无法管理相应dom，开发者需要注意两端的冲突。

为了减少冲突，目前不支持通过 DOM API 创建和删除 DOM 树中的元素。只支持获取元素UniElement。

DOM在Web、Android、iOS、鸿蒙、微信小程序均存在。微信小程序受微信限制，只实现了部分DOM API，请注意兼容性表格。

> HBuilderX4.0 开始DOM元素的类型统一调整为 UniElement 对象。废弃之前 HBuilderX 3.91 的 Element对象 和 HBuilderX 3.91以前的 INode 对象。


## 使用场景
通常情况下，使用 uvue 框架的数据绑定来操作更新页面组件就可以。但有2个场景，需要使用 DOM API。

1. 跟手动效

	响应触屏事件更新组件的位置，要想不掉帧，需要保证16毫秒绘制一帧。

	uvue的data更新，有一套diff机制，每次触发data更新，会多几毫秒的耗时。

	此时推荐通过 DOM API 跳过 vue 框架直接操作组件的样式。

2. Draw API

	Android和iOS的原生view，有一些底层的高性能绘制能力，这些API的调用，需要先获取到 UniElement 对象，然后再调用其方法。

在[性能](../performance.md)章节，对这2个场景有详细的阐述。


## DOM元素对象@getDomNode

在操作DOM元素对象前，需要先获取 `UniElement` 对象，可通过 `uni.getElementById` 或 `this.$refs` 获取。

### 通过uni.getElementById获取DOM元素

app-uvue 页面中可以为页面元素节点设置 id 属性，然后通过 [uni.getElementById](../api/get-element.md#getelementbyid) 获取 DOM 元素对象。

但注意这个方法只能获取栈顶页面的element。如需绑定调用的页面，需使用下方的[this.$refs](#refs)

首先需要为组件设置 id 属性值：
```vue
<!-- id 属性值为 myView，后续可以通过此值查找 -->
<view id="myView" class="container">
	<text>Hello World</text>
</view>
```

在页面`onReady` 后（太早组件可能没有创建），通过 `uni.getElementById` 获取。如果长期使用，可以保存在vue的 data 中。
```ts
export default {
	data() {
		return {
			color: 'red',
			myView: null as UniElement | null
		}
	},
	onReady() {
			// 获取组件对象并保存在 this.myView 中
			this.myView = uni.getElementById('myView');
	},
}
```

### 通过this.$refs获取DOM元素@refs
uvue页面中可以通过 vue 框架中的组件实例对象 [this.$refs](https://uniapp.dcloud.net.cn/tutorial/vue3-api.html#%E5%AE%9E%E4%BE%8B-property) 获取 DOM 元素对象。

首先需要为组件设置 ref 属性值，它类似于id：
```vue
<!-- ref 属性值为 myView，后续可以通过此值查找 -->
<view ref="myView" class="container">
	<text>Hello World</text>
</view>
```

在页面`onReady` 后（太早组件可能没有创建），通过 `this.$refs` 获取。如果长期使用，可以保存在vue的 data 中。
```ts
export default {
	data() {
		return {
			color: 'red',
			myView: null as UniElement | null
		}
	},
	onReady() {
			// 获取组件对象并保存在 this.myView 中
			this.myView = this.$refs['myView'] as UniElement;  //需要使用 as 转换
	},
}
```

### 操作DOM元素对象
获取DOM元素对象Elment后，可通过其属性或方法操作组件，完整API参考[UniElement对象文档](unielement.md)

如通过UniElement对象的 style 属性更新组件的样式：
```ts
this.myView?.style?.setProperty('background-color', 'red');
```

### 示例
以下是完整的操作示例：
```vue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex:1;">
	<!-- #endif -->
		<view id="myView" ref="myView" class="container">
			<text>Hello World</text>
		</view>
		<button class="button" @tap="updateElement">操作UniElement</button>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	export default {
		data() {
			return {
				color: 'red',
				myView: null as UniElement | null
			}
		},
		onLoad() {
		},
		onReady() {
			this.myView = uni.getElementById('myView');       //通过uni.getElementById获取
			//this.myView = this.$refs['myView'] as UniElement;  //通过this.$refs获取，需要使用 as 转换
		},
		methods: {
			updateElement() {
				this.color = 'red' == this.color ? 'blue' : 'red';
				this.myView?.style?.setProperty('background-color', this.color);
			}
		},
	}
</script>

<style>
	.container {
		align-self: center;
		align-items: center;
		justify-content: center;
		background-color: lightgray;
		width: 100%;
		height: 200px;
	}
	.button {
		margin: 10px auto;
	}
</style>
```

>以上例子仅为演示DOM API的使用，实际上点击按钮修改背景色这种简单场景，使用数据绑定更简单，class绑定到一个data上，动态修改data即可。


## 通过 DrawableContext 绘制View

uni-app x 在 app 端提供 DrawableContext 绘制内容到 uvue 页面的`view`标签上。可用于绘制文本、形状等内容。

### 获取 DrawableContext 对象

DrawableContext 可通过`view`组件节点对象（UniElement）的`getDrawableContext()`方法获取

```vue
<template>
	<view ref="drawable" class="drawableView"></view>
</template>

<script>
	export default {
		onReady() {
			//获取 DrawableContext 对象
			var ctx = (this.$refs['drawable'] as UniElement).getDrawableContext()!;
		}
	}
</script>
```

**注意**  
`DrawableContext` 对象需等元素渲染到页面后才能正常使用，要在页面 `onReady` 生命周期后获取。  

### 绘制内容

通过 DrawableContext 提供的 Draw API 绘制文本、形状等内容

```ts
<script>
	export default {
		onReady() {
			//获取 DrawableContext 对象
			var ctx = (this.$refs['drawable'] as UniElement).getDrawableContext()!;
			//绘制内容
			ctx.moveTo(50, 40);
			ctx.lineTo(200, 40);
			ctx.stroke();
		}
	}
</script>
```

### 更新到画布

DrawableContext 在调用 API 之后不会主动更新到画布上，需要主动调用`update()`方法更新。

```ts
<script>
	export default {
		onReady() {
			//获取 DrawableContext 对象
			var ctx = (this.$refs['drawable'] as UniElement).getDrawableContext()!;
			//绘制内容
			ctx.moveTo(50, 40);
			ctx.lineTo(200, 40);
			ctx.stroke();
			//更新到画布
			ctx.update();
		}
	}
</script>
```

### 清除画布内容

如果清除已经绘制的内容重新绘制，需要调用`reset()`方法清除内容再进行绘制。

```vue
<script>
	export default {
		methods: {
			refreshDrawable() {
				//获取 DrawableContext 对象
				var ctx = (this.$refs['drawable'] as UniElement).getDrawableContext()!;
				//清除绘制内容
				ctx.reset();
				//再重新绘制
			}
		}
	}
</script>
```

### 示例
以下是完整的操作示例：

```vue
<template>
	<view ref="drawable" class="drawableView"></view>
	<button class="button" @tap="refreshDrawable">重新绘制</button>
</template>

<script>
	export default {
		data(){
			return {
				change: false
			}
		},
		onReady() {
			//获取 DrawableContext 对象
			var ctx = (this.$refs['drawable'] as UniElement).getDrawableContext()!;
			//绘制内容
			ctx.moveTo(50, 40);
			ctx.lineTo(200, 40);
			ctx.stroke();
			//更新到画布
			ctx.update();
		},
		methods: {
			refreshDrawable() {
				//获取 DrawableContext 对象
				var ctx = (this.$refs['drawable'] as UniElement).getDrawableContext()!;
				//清除绘制内容
				ctx.reset();
				//根据状态设置画笔样式
				this.change = !this.change;
				if(this.change) {
					ctx.strokeStyle = "#FF0000";
					ctx.lineWidth = 10
				}
				//绘制内容
				ctx.moveTo(50, 40);
				ctx.lineTo(200, 40);
				ctx.stroke();
				//更新到画布
				ctx.update();
			}
		}
	}
</script>

<style>
	.drawableView {
		width: 750rpx;
		height: 750rpx;
		background-color: #FFFFFF;
	}
	.button {
		margin: 10px auto;
		width: 50%;
	}
</style>
```

## 注意事项

由于排版和渲染是异步的的，在修改 DOM 后，立刻使用 DOM 的同步接口获取 DOM 状态可能获取到的是排版之前的，如果需要及时准确的获取到排版之后的 DOM 状态需要使用 [uni.createSelectorQuery](../api/nodes-info.md) 。

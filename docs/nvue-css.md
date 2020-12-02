
#### nvue所支持的通用样式已在本文档中全部列出，一些组件可能有自定义样式，请参考组件文档。除此之外的属性，均不被支持。


### 注意事项

- nvue的css**仅支持flex布局**，是webview的css语法的子集。这是因为操作系统原生排版不支持非flex之外的web布局。当然flex足以排布出各种页面，只是写法需要适应。
- 在选择器方面支持的较少，只支持简单的```class="classA"```。
- class 进行绑定时只支持数组语法。
- 不支持媒体查询
- 不支持复合样式，不支持简写
- 不能在 style 中引入字体文件
- 布局不能使用百分比，如```width：100%```；
- 有些web的css属性在nvue里无法支持，比如背景图。但可以使用image组件和层级来实现类似web中的背景效果。因为原生开发本身也没有web这种背景图概念
- nvue 的各组件在安卓端默认是透明的，如果不设置```background-color```，可能会导致出现重影的问题
- 文字内容，必须只能在```text```组件下，```text```组件不能换行写内容，否则会出现无法去除的周边空白
- 只有```text```标签可以设置字体大小，字体颜色

下面有些正确和错误的写法示例对比：

- 选择器仅支持class 选择器

```css
	/* 错误 */
	#id {}
	.a .b .c {}
	.a > .b {}
	
	/* 正确 */
	.class {}
```

- 不支持简写

```css
	/* 错误 */
	.class {
	    border: 1px red solid;
	}
	
	/* 正确 */
	.class {
	    border-width: 1px;
	    border-style: solid;
	    border-color: red;
	}
	
	/* 错误 */
	.class {
	    background: red;
	}
	
	/* 正确 */
	.class {
	    background-color: red;
	}
```

- nvue的```uni-app```编译模式下，App.vue 中的样式，会编译到每个 nvue文件。对于共享样式，如果有不合法属性控制台会给出警告，可以通过[条件编译](https://uniapp.dcloud.io/platform)```APP-PLUS-NVUE```屏蔽 App 中的警告。

```css
	/* 错误 */
	/*	控制台警告：
		WARNING: `border` is not a standard property name (may not be supported)  
		WARNING: `-webkit-transform` is not a standard property name (may not be supported)
	*/
	.class {
		border: 1px red solid;
		-webkit-transform: scaleY(.5);
	}

	/* 正确 */
	.class {
		border-width: 1px;
		border-style: solid;
		border-color: red;
		/* #ifndef APP-PLUS-NVUE */
		-webkit-transform: scaleY(.5);
		/* #endif*/
	}
```

## 盒模型

nvue盒模型基于 CSS 盒模型，每个 nvue 元素都可视作一个盒子。我们一般在讨论设计或布局时，会提到「盒模型」这个概念。

盒模型描述了一个元素所占用的空间。每一个盒子有四条边界：外边距边界 ```margin edge```, 边框边界 ```border edge```, 内边距边界 ```padding edge``` 与内容边界 ```content edge```。这四层边界，形成一层层的盒子包裹起来，这就是盒模型大体上的含义。

![图片描述文字](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/ec4f2810-2fec-11eb-899d-733ae62bed2f.png)


> nvue盒模型的 ```box-sizing``` 默认为 ```border-box```，即盒子的宽高包含内容、内边距和边框的宽度，不包含外边距的宽度。

> 在 Android 平台，nvue只支持 ```overflow:hidden```。

> 在 iOS 上，nvue支持 ```overflow:hidden``` 和 ```overflow:visible```，默认是 ```overflow:visible```。




##### 基本用法
```html
	<template>
		<view>
			<image style="width: 400rpx; height: 200rpx; margin-left: 20rpx;" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/9c877c50-2f0c-11eb-899d-733ae62bed2f.png"></image>
		</view>
	</template>
```



|可选值			|描述									|
|--				|--										|
|width {length}	|宽度，默认值 0							|
|height {length}|高度，默认值 0							|

##### 内边距
padding {length}：内边距，内容和边框之间的距离，默认值 0。与标准 CSS 类似，padding 支持简写，也可分解为以下四个：

|可选值					|描述								|
|--						|--									|
|padding {length}		|上、右、下、左四边内边距，默认值 0	|
|padding-left {length}	|左内边距，默认值 0					|
|padding-right {length}	|右内边距，默认值 0					|
|padding-top {length}	|上内边距，默认值 0					|
|padding-bottom {length}|下内边距，默认值 0					|


##### 边框
```border-style``` 设定边框样式，如果四个方向的边框样式不同，可分别设置：

|可选值	|描述					|
|--		|--						|
|border-left-style {string}		|可选值为 ```solid```， ```dashed```， ```dotted```，默认值 ```solid```	|
|border-top-style {string}		|可选值为 ```solid```， ```dashed```， ```dotted```，默认值 ```solid```	|
|border-right-style {string}	|可选值为 ```solid```， ```dashed```， ```dotted```，默认值 ```solid```	|
|border-bottom-style {string}	|可选值为 ```solid```， ```dashed```， ```dotted```，默认值 ```solid```	|



|可选值	|描述					|
|--		|--						|
|solid	|实线边框，默认值 ```solid```	|
|dashed	|方形虚线边框			|
|dotted	|圆点虚线边框			|


##### border-width
```border-width```：设定边框宽度，非负值, 默认值 0，如果四个方向的边框宽度不同，可分别设置：

|可选值							|描述				|
|--								|--					|
|border-width {length}			|非负值, 默认值 0	|
|border-left-width {length}		|非负值, 默认值 0	|
|border-top-width {length}		|非负值, 默认值 0	|
|border-right-width {length}	|非负值, 默认值 0	|
|border-bottom-width {length}	|非负值, 默认值 0	|

##### border-color
```border-color```：设定边框颜色，默认值 ```#000000```，如果四个方向的边框颜色不同，可分别设置：


|可选值						|描述					|
|--							|--						|
|border-color {color}		|默认值 ```#000000```	|
|border-left-color {color}	|默认值 ```#000000```	|
|border-top-color {color}	|默认值 ```#000000```	|
|border-right-color {color}	|默认值 ```#000000```	|
|border-bottom-color {color}|默认值 ```#000000```	|

##### border-radius
```border-radius```：设置边框的圆角，默认值 0，如果四个方向的圆角弧度不同，可分别设置：

|可选值								|描述				|
|--									|--					|
|border-radius {length}				|非负值, 默认值 0	|
|border-bottom-left-radius {length}	|非负值, 默认值 0	|
|border-bottom-right-radius {length}|非负值, 默认值 0	|
|border-top-left-radius {length}	|非负值, 默认值 0	|
|border-top-right-radius {length}	|非负值, 默认值 0	|

> ```border-radius```和```border-width```定义了圆心角为90度的椭圆弧的长轴和半长轴的大小。如果邻接两边```border-radius```(或```border-width```不一致，nvue绘制的边框曲线可能不够平滑。


##### 外边距
margin {length}：外边距，元素和元素之间的空白距离，默认值 0。与标准 CSS 类似，margin 支持简写，也可分解为四边：

|可选值					|描述								|
|--						|--									|
|margin {length}		|上、右、下、左四边外边距，默认值 0	|
|margin-left {length}	|左外边距，默认值 0					|
|margin-right {length}	|右外边距，默认值 0					|
|margin-top {length}	|上外边距，默认值 0					|
|margin-bottom {length}	|下外边距，默认值 0					|




##### Android 兼容性

尽管 ```overflow: hidden``` 在 Android 上是默认行为，但只有下列条件都满足时，一个父 view 才会去剪切它的子 ```view```。

- 父view是```view```, ```cell```, ```refresh``` 或 ```loading```。
- 系统版本是 Android 4.3 或更高。
- 系统版本不是 Andorid 7.0。
- 父 view 没有 ```background-image``` 属性或系统版本是 Android 5.0 或更高。




## Flexbox


### Flex 容器
Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

nvue布局模型基于 CSS Flexbox，以便所有页面元素的排版能够一致可预测，同时页面布局能适应各种设备或者屏幕尺寸。Flexbox 包含 flex 容器和 flex 成员项。如果一个nvue元素可以容纳其他元素，那么它就成为 flex 容器。

> 文档中未说明的 flexbox 属性**均不支持**：如 ```order```、```flex-grow``` 、```flex-shrink``` 、 ```flex-basis```、```align-content```、```align-self``` 等。

**在 nvue中，Flexbox 是默认且唯一的布局模型，所以你不需要手动为元素添加 ```display: flex;``` 属性。**


### flex-direction
	
定义了 flex 容器中 flex 成员项的排列方向，默认值为 ```column```

|可选值			|描述								|
|--				|--									|
|column			|竖排，从上到下排列					|
|column-reverse	|反向竖排，排布方向与```flex-direction:column```相反|
|row			|横排，从左到右排布						|
|row-reverse	|反向横排，排布方向与```flex-direction:row```相反	|



### flex-wrap
	
决定了 flex 成员项在一行还是多行分布，默认值为```nowrap```

|可选值			|描述												|
|--				|--													|
|nowrap			| 不换行，flex 成员项在一行排布，排布的开始位置由direction指定	|
|wrap			| 换行，第一行在上方，flex 成员项在多行排布，排布的开始位置由direction指定	|
|wrap-reverse	|换行，第一行在下方，行为类似于```wrap```，排布方向与其相反						|



### justify-content
	
定义了 flex 容器中 flex 成员项在主轴方向上如何排列以处理空白部分。默认值为 ```flex-start```

|可选值			|描述										|
|--				|--											|
|flex-start		|左对齐，所有的 flex 成员项都排列在容器的前部	|
|flex-end		|右对齐，则意味着成员项排列在容器的后部				|
|center			|居中，即中间对齐，成员项排列在容器中间、两边留白		|
|space-between	|两端对齐，空白均匀地填充到 flex 成员项之间	|
|space-around	|表示 flex 成员项两侧的间隔相等，所以，成员项之间的间隔比成员项与边框的间隔大一倍	|


![图片描述文字](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/9610d190-2f17-11eb-97b7-0dc4655d6e68.png)



	
### align-items
	
定义了 flex 容器中 flex 成员项在纵轴方向上如何排列以处理空白部分。默认值为 stretch。

|可选值		|描述								|
|--			|--									|
|stretch	|即拉伸高度至 flex 容器的大小			|
|flex-start	|上对齐，所有的成员项排列在容器顶部	|
|flex-end	|下对齐，所有的成员项排列在容器底部	|
|center		|中间对齐，所有成员项都垂直地居中显示	|

![图片描述文字](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/ad305030-2f17-11eb-b680-7980c8a877b8.png)

### flex
	
flex 属性定义了 flex 成员项可以占用容器中剩余空间的大小。
flex {number}：值为 number 类型。
- 如果所有的成员项设置相同的值 flex: 1，它们将平均分配剩余空间。
- 经常用作自适应布局，将父容器的display：flex，侧边栏大小固定后，将内容区flex：1，内容区则会自动放大占满剩余空间。
- 如果一个成员项设置的值为 flex: 2，其它的成员项设置的值为 flex: 1，那么这个成员项所占用的剩余空间是其它成员项的 2 倍。

**注意**
	
**Flex 成员项暂不支持 ```flex-shrink``` 、 ```flex-basis```、```align-content``` 属性**。

**该属性不支持 flex: flex-grow | flex-shrink | flex-basis 的简写。**


``` html
	//Gird布局
	<template>
		<view>
			<view v-for="(v, i) in list" class="row">
				<view v-for="(text, k) in v" class="item">
					<view>
						<text>{{text}}</text>
					</view>
				</view>
			</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					list: [
						['A', 'B', 'C'],
						['D', 'E', 'F'],
						['G', 'H', 'I']
					]
				}
			}
		}
	</script>
	<style scoped>
	.row {
		flex-direction: row;
		height: 80px;
	}
	.item {
		flex: 1;
		justify-content: center;
		align-items: center;
		border-width: 1;
		border-style: solid;
		border-color: #FFFFFF;
		background-color: #00AAFF;
	}
	</style>
	</style>
```



``` html
	//等高模块
	<template>
	  <view>
	    <view style="width:300px; height:100px;">
	      <view style="flex: 1;background-color:blue"></view>
	      <view style="flex: 1;background-color:red"></view>
	      <view style="flex: 1;background-color:yellow"></view>
	    </view>
	  </view>
	</template>
```




## position 定位

设置定位类型。默认值为 ```relative```。

|可选值		|描述													|
|--			|--														|
|relative	|是默认值，指的是相对定位									|
|absolute	|绝对定位，以元素的容器作为参考系						|
|fixed		|固定定位，保证元素在页面窗口中的对应位置显示，即使窗口是滚动的它也不会移动						|
|sticky		|指的是仅当元素滚动到页面之外时，元素会固定在页面窗口的顶部，达到吸顶效果/粘性定位（布局）	|

> 运用 position:sticky或position: fixed 可实现头部导航栏固定(吸顶效果)


``` html
	//水平垂直居中
	<template>
		<view class="wrapper">
			<view class="box"></view>
		</view>
	</template>
	<style scoped>
		.wrapper{
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: #cccccc;
			justify-content: center;
			align-items: center;
		}
		.box{
			width: 200px;
			height: 200px;
			background-color: #fc0000;
		}
	</style>
```





> Android 兼容性

如果定位元素超过容器边界，在 Android 下，超出部分将不可见，原因在于 Android 端元素 ```overflow``` 默认值为 ```hidden```，但目前 Android 暂不支持设置 ```overflow: visible```。


## Transition 

```transition```允许 CSS 的属性值在一定的时间区间内平滑地过渡。
#### transition-property
设置过渡动画的属性名，设置不同样式 ```transition``` 效果的键值对，默认值为空，表示不执行任何过渡效果


|参数名				|描述				|
|--					|--					|
|width				|宽度参与过渡动画		|
|height				|高度参与过渡动画		|
|top				|顶部距离参与过渡动画	|
|bottom				|底部距离参与过渡动画	|
|left				|左侧距离参与过渡动画	|
|right				|右侧距离参与过渡动画	|
|background-color	|背景颜色参与过渡动画	|
|opacity			|不透明度参与过渡动画	|
|transform			|变换类型参与过渡动画	|




#### transition-duration
指定过渡的持续时间 (单位是毫秒)，默认值是 0，表示没有动画效果。

#### transition-delay
指定请求过渡操作到执行过渡之间的时间间隔 (单位是毫秒或者秒)，默认值是 0，表示没有延迟，在请求后立即执行过渡。

#### transition-timing-function
描述过渡执行的速度曲线，用于使过渡更为平滑。默认值是 ```ease```。下表列出了所有合法的属性：


|参数名							|描述																																			|
|--								|--																																				|
|ease							|transition 过渡逐渐变慢的过渡效果																												|
|ease-in						|transition 过渡慢速开始，然后变快的过渡效果																									|
|ease-out						|transition 过渡快速开始，然后变慢的过渡效果																									|
|ease-in-out					|transition 过渡慢速开始，然后变快，然后慢速结束的过渡效果																						|
|linear							|transition 过渡以匀速变化																														|
|cubic-bezier(x1, y1, x2, y2)	|使用三阶贝塞尔函数中自定义 transition 变化过程，函数的参数值必须处于 0 到 1 之间。更多关于三次贝塞尔的信息请参阅  [cubic-bezier](https://cubic-bezier.com/?spm=a2c7j.-zh-docs-styles-common-styles.0.0.3f952164z39lZD#.17,.67,.83,.67)和 [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve?spm=a2c7j.-zh-docs-styles-common-styles.0.0.3f952164z39lZD)	|


	
#### 示例


``` html
<template>
	<view class="row">
		<view class="box" :class="{'active':isActive}" @click="isActive = !isActive">
			<image class="img" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/9c877c50-2f0c-11eb-899d-733ae62bed2f.png" mode="aspectFill"></image>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				"isActive":false
			}
		}
	}
</script>
<style scoped>
	.row{
		align-items: center;
		justify-content: center;
	}
	.box{
		margin:20px;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		width:200rpx;
		height:200rpx;
		background-color: #007AFF;
		transition-property: width, height, background-color;
		transition-duration:0.3s;
		transition-delay:0.1s;
		transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1.0);
	}
	.active{
		width:300rpx;
		height:300rpx;
		background-color: #6bd8ff;
	}
	.img{
		width:80rpx;
		height:80rpx;
	}
</style>
```

<img width="300px" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/0d2fc7a0-3089-11eb-8ff1-d5dcf8779628.gif" />

## Transform

应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等。


|参数名							|描述																																			|
|--								|--																																				|
|translateX({<length/percentage>})	|X 轴方向平移，支持长度单位或百分比。																												|
|translateY({<length/percentage>})	|Y 轴方向平移，支持长度单位或百分比。																	|
|translate({<length/percentage>} {<length/percentage>})	|X 轴和 Y 轴方向同时平移，```translateX``` + ```translateY``` 简写。									|
|scaleX(<number>)				|X 轴方向缩放，值为数值，表示缩放比例，不支持百分比。							|
|scaleY(<number>)						|Y 轴方向缩放，值为数值，表示缩放比例，不支持百分比。																													|
|scale(<number>)|X 轴和 Y 轴方向同时缩放，```scaleX``` + ```scaleY``` 简写。|
|rotate(<angle/degree>)|将元素围绕一个定点（由 ```transform-origin``` 属性指定）旋转而不变形的转换。指定的角度定义了旋转的量度。若角度为正，则顺时针方向旋转，否则逆时针方向旋转。|
|rotateX(<angle/degree>)|X 轴方向的旋转。|
|rotateY(<angle/degree>)|Y 轴方向的旋转。|
|rotateZ(<angle/degree>)|Z 轴方向的旋转。|
|perspective(<length>)|指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。z>0 的三维元素比正常大，而 z<0 时则比正常小，大小程度由该属性的值决定。Android 4.1及以上版本支持。|
|transform-origin {length/percentage/关键字(top/left/right/bottom)}:|设置一个元素变形的原点，仅支持 2D 坐标。|

> 除了```perspective```和```transform-origin```，```transition```支持了```transform```的全部能力。 其中transform的```rotate``` 和```rotatez``` 等效.


	
#### 示例


``` html
<template>
	<view class="card">
		<view class="box">
			<view class="row-box">
				<view @click="isRotate = !isRotate" class="fill row-rotate " :class="{'rotate':isRotate}"></view>
			</view>
			<text>rotate(45deg) </text>
		</view>
		<view class="box">
			<view class="row-box">
				<view @click="isScale = !isScale" class="fill row-scale" :class="{'scale':isScale}"></view>
			</view>
			<text>scale(2)</text>
		</view>
		<view class="box">
			<view class="row-box">
				<view @click="isTranslateX = !isTranslateX" class="fill row-translateX" :class="{'translateX':isTranslateX}"></view>
			</view>
			<text>translateX(45px)</text>
		</view>
		<view class="box">
			<view class="row-box">
				<view @click="isTranslateY = !isTranslateY" class="fill row-translateY" :class="{'translateY':isTranslateY}"></view>
			</view>
			<text>translateY(45px)</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				"isRotate": false,
				"isScale":false,
				"isTranslateX":false,
				"isTranslateY":false
			}
		},
	}
</script>
<style>
	.card {
		width:710rpx;
		margin:20rpx;
		flex-direction:row;
		flex-wrap: wrap;
	}
	.box{
		width:355rpx;
		height:355rpx;
		justify-content: center;
		align-items: center;
	}
	.row-box{
		width:200rpx;
		height:200rpx;
		margin:10rpx;
		background-color: #DDDDDD;
	}
	.fill{
		width:200rpx;
		height:200rpx;
		position: relative;
		background-color: #03A9F4;
		opacity: 0.5;
	}
	.row-rotate{
		transition-duration:0.3s;
		transform:rotate(0deg);
	}
	.rotate{
		transition-duration:0.3s;
		transform:rotate(45deg);
	}
	.row-scale{
		transition-duration:0.3s;
		transform:scale(1);
	}
	.scale{
		transform:scale(2);
	}
	.row-translateX{
		transition-duration:0.3s;
		transform:translateX(0px);
	}
	.translateX{
		transform:translateX(45px);
	}
	.row-translateY{
		transition-duration:0.3s;
		transform:translateY(0px);
	}
	.translateY{
		transform:translateY(45px);
	}
</style>
```





<img width="300px" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/810e5de0-3088-11eb-b997-9918a5dda011.gif" />


## 伪类


|参数名		|描述								|
|--			|--									|
|active		|所有组件都支持						|
|focus		|只有 ```input``` 组件和 ```textarea``` 组件支持|
|disabled	|只有 ```input``` 组件和 ```textarea``` 组件支持|
|enabled	|只有 ```input``` 组件和 ```textarea``` 组件支持|

**注意**
> 同时生效的时候，优先级高覆盖优先级低。
> 例如：```input:active:enabled``` 和 ```input:active``` 同时生效，前者覆盖后者

- 互联规则如下所示

<img width="400px" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/f3069420-2f17-11eb-8a36-ebb87efcf8c0.png" />


## 线性渐变

所有组件均支持线性渐变。[CSS3 渐变](https://www.w3cschool.cn/css3/oj26bfli.html)
你可以通过  ``` background-image ```属性创建线性渐变。
``` javascript
	background-image:linear-gradient(to bottom right,#AD18F9,#05DFC7);
```

只支持两种颜色的渐变，渐变方向如下：

|渐变方向		|描述				|
|--				|--					|
|to right		|从左向右渐变		|
|to left		|从右向左渐变		|
|to bottom		|从上到下渐变		|
|to top			|从下到上渐变		|
|to bottom right|从左上角到右下角	|
|to top left	|从右下角到左上角	|

**注意**

> ```background-image``` 优先级高于 ```background-color```，这意味着同时设置 ```background-image``` 和 ```background-color```，```background-color``` 被覆盖。
> ```background``` 不支持简写。
> 
> **目前暂不支持 radial-gradient（径向渐变）。**


<img width="300px" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/8f70e4e0-308b-11eb-97b7-0dc4655d6e68.PNG" />


## 阴影

### IOS平台：阴影```box-shadow```

	
	{box-shadow:inset offset-x offset-y blur-radius color}
	{box-shadow:投影方式 X轴偏移量 Y轴偏移量 阴影模糊半径  阴影颜色}


|参数			|描述																										|
|--				|--																											|
|inset（可选）	|默认阴影在边框外。使用 ```inset``` 后，阴影在边框内（即使是透明边框），背景之上内容之下。						|
|offset-x		|设置水平偏移量，如果是负值则阴影位于元素左边。																|
|offset-y		|设置垂直偏移量，如果是负值则阴影位于元素上面。																|
|blur-radius	|设置模糊半径，px 单位长度值，值越大，模糊面积越大，阴影就越大越淡。不能为负值。默认为0，此时阴影边缘锐利。	|
|color			|设置阴影颜色																								|

示例
``` css
	.box4 {
	    box-shadow: inset 3px 5px 20px rgb(255, 69, 0);
	}
```

**注意**
- 目前仅 iOS 支持 ```box-shadow``` 属性，Android 暂不支持，可以使用```elevation```或者图片代替。
- 每个元素只支持设置一个阴影效果，不支持多个阴影同时作用于一个元素。





### Android平台：阴影```elevation```

Android平台weex对阴影样式(box-shadow)支持不完善，如设置圆角边框时阴影样式显示不正常、设置动画时在Android7上显示不正常、在Android10上出现闪烁现象等。

为解决这些问题，从HBuilderX 2.4.7起，新增elevation属性（**组件的属性，不是css样式**）设置组件的层级，Number类型，层级值越大阴影越明显，阴影效果也与组件位置有关，越靠近页面底部阴影效果越明显


	
用法
``` html
	<view elevation="5px"></view>
```


#### 注意
- 设置```elevation```属性产生的阴影暂时无法修改颜色
- 设置```elevation```后当前组件的层级会高于其他未设置elevation组件的层级，都设置```elevation```值域越大则层级越高！组件覆盖的场景需要留意
- 为了避免```elevation```属性的阴影效果与阴影样式(```box-shadow```)冲突，设置```elevation```属性后```box-shadow```样式失效
- 使用```elevation```需要阴影元素的父元素大于阴影范围，否则会对阴影进行裁剪
- IOS不支持```elevation```属性，请使用```box-shadow```设置阴影



## 文本样式

### color
color {color}：文字颜色，支持如下字段：
 * RGB（ rgb(255, 0, 0) ） 
 * RGBA（ rgba(255, 0, 0, 0.5) ） 
 * 十六进制（ #ff0000 ）；
 * 精简写法的十六进制（ #f00 ）
 * 色值关键字（red）

> 只有```text```标签可以设置字体颜色

### font-size
font-size {number}：文字大小，只有```text```标签可以设置字体大小

### font-style
font-style {string}：字体类别。可选值 ```normal``` | ```italic```，默认为 ```normal```。

### font-weight
font-weight {string}：字体粗细程度。默认值: ```normal```；

- 可选值: ```normal```, ```bold```, 100, 200, 300, 400, 500, 600, 700, 800, 900
- ```normal``` 等同于 400, ```bold``` 等同于 700；
- iOS 支持 9 种 ```font-weight```值；Android 仅支持 400 和 700, 其他值会设为 400 或 700
- 类似 ```lighter```, ```bolder``` 这样的值暂时不支持

### text-decoration
```text-decoration {string}```：字体装饰。默认值为 ```none```。

|可选值			|描述						|
|--				|--							|
|none			|默认。定义标准的文本		|
|underline		|定义文本下的一条线		|
|line-through	|定义穿过文本下的一条线	|


> 只支持 ```text``` 和 ```ricthext```
> 
> 不支持 ```text-decoration:overline```


### text-align
```text-align {string}```：对齐方式。默认值为 ```left```。

|可选值	|描述				|
|--		|--					|
|left	|把文本排列到左边	|
|center	|把文本排列到中间	|
|right	|把文本排列到右边|

> 不支持```text-align:justify```


### font-family
```font-family {string}```：设置字体。这个设置不保证在不同平台，设备间的一致性。
如所选设置在平台上不可用，将会降级到平台默认字体。
如果需要加载自定义字体，请参考相关[DOM.addRule](#addRule)

### text-overflow
```text-overflow {string}```：设置内容超长时的省略样式。

|可选值		|描述							|
|--			|--								|
|clip		|修剪文本						|
|ellipsis	|显示省略符号来代表被修剪的文本	|
> 只支持 ```text``` 和 ```ricthext```

### lines
```lines {number}```: 正整数，指定最大文本行数，默认```lines```值为0，表示不限制最大行数```lines```。如果文本不够长，实际展示行数会小于指定行数。

### line-height
line-height {length}: 正整数，每行文字高度。```line-height```是 top 至 bottom的距离。
```line-height```与```font-size```没有关系，因为```line-height```被 top 和 bottom 所限制，
```font-size``` 被 glyph 所解析。```line-height```和```font-size```相等一般会导致文字被截断。

### word-wrap
```word-wrap:<string>```  对nvue来说 ```anywhere``` 表示在以字符为最小元素做截断换行，其它值或不指定该属性，都以英文单词为单位进行换行。

|可选值		|描述								|
|--			|--									|
|break-word	|在长单词或 URL 地址内部进行换行	|
|normal		|只在允许的断字点换行				|
|anywhere	|以字符为最小元素做截断换行	|



### 尺寸单位
nvue页面只支持[rpx](/frame?id=尺寸单位)，页面中写px也做rpx处理。
### 选择器
 * 类选择器：nvue只支持单个类选择器
 * 伪类选择器：active, focus, disabled, enabled（所有组件都支持 active, 但只有 input 组件和 textarea 组件支持 focus, enabled, disabled）

### flex布局
nvue 只能使用flex布局，不支持其他布局样式
### 通用样式
|属性名称								|可选值										|默认值		|描述																																	|
|---									|---										|---		|---																																	|
|width									|````<length>````							|			|未设置时使用组件自身内容需要的宽度。																									|
|height									|````<length>````							|			|未设置时使用组件自身内容需要的高度。																									|
|padding								|``<length>``								|0			|简写属性，在一个声明中设置所有的内边距属性，该属性可以有1到4个值。																		|
|padding-[left/top/right/bottom]		|``<length>``								|0			|																																		|
|margin									|``<length>``								|0			|简写属性，在一个声明中设置所有的外边距属性，该属性可以有1到4个值。																		|
|margin-[left/top/right/bottom]			|``<length>``								|0			|																																		|
|border-style							|dotted、dashed、solid						|solid		|暂时仅支持1个值，为元素的所有边框设置样式，或者单独为各边边框设置样式。																|
|border-[left/top/right/bottom]-style	|dotted、dashed、solid						|solid		|																																		|
|border-width							|``<length>``								|0			|简写属性，在一个声明中设置元素的所有边框宽度，或者单独为各边边框设置宽度。																|
|border-[left/top/right/bottom]-width	|``<length>``								|0			|																																		|
|border-color							|``<color>``									|black		|简写属性，在一个声明中设置元素的所有边框颜色，或者单独为各边边框设置颜色。																|
|border-[left/top/right/bottom]-color	|``<color>``									|black		|																																		|
|border-radius							|``<length>``								|0			|圆角时只使用border-width，border-[left/top/right/bottom]-width，无效圆角时只使用border-color，border-[left/top/right/bottom]-color无效	|
|border-[top/bottom]-[left/right]-radius|``<length>``								|0			|																																		|
|background-color						|```<color>```								|transparent|设定元素的背景色																														|
|background-image						|```<linear-gradient>```					|			|创建线性渐变																															|
|opacity								|``<number>``								|0xff		|																																		|
|display								|flex、none									|flex		|																																		|
|flex-direction							|row、column								|column		|flex 容器中 flex 成员项的排列方向																										|
|justify-content						|flex-start、flex-end、center、space-between|flex-start	|flex 容器中 flex 成员项在主轴方向上如何排列																							|
|align-items							|stretch、flex-start、flex-end、center		|stretch	|flex 容器中 flex 成员项在纵轴方向上如何排列																							|
|flex									|``<number>``								|			|	flex 成员项可以占用容器中剩余空间的大小																																	|
|position								|relative、absolute、fixed、sticky			|none		|	设置定位类型																																	|
|[left/top/right/bottom]				|``<number>``								|			|设置定位偏移量																																		|


Tips：

* 不支持用 ```z-index``` 提高层级，层级高的元素可排列在后面；
* 不支持用 ``background`` 设置背景颜色、背景图片；
* 不支持```border:1rpx solid #fff000```这样的组合写法。

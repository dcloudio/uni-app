## 长度单位 @length

长度单位用于定义元素在页面中的尺寸、间距、位置和大小等视觉表现。

### 类型  

#### length @lengthvalue
CSS 长度数据类型 `<length>` 表述一个表示距离值，由一个 `<number>` 和一个长度单位构成，在单位的字面值与数字之间没有空格。  
许多 CSS 属性会用到长度，比如 [width](../width.md)、[height](../height.md)、[margin](../margin.md)、[padding](../padding.md)、[border-width](../border-width.md) 等。

**注意**  
- App平台长度 `<length>` 可以不设置单位，不设置单位时当做 px 处理
- Web平台长度 `<length>` 必须设置单位，不设置单位时当做无效值处理

#### percentage @lengthpercentage
CSS 长度数据类型 `<percentage>` 表述一个百分比值。许多 CSS 属性 可以取百分比值，用以根据父元素来确定大小。百分比值由一个`<number>`具体数值后跟着%符号构成，在%和数值之间是不允许有空格。  
许多 CSS 属性支持使用百分比，如 [width](../width.md)、[height](../height.md)、[margin](../margin.md)、[padding](../padding.md) 等。


### 兼容性
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| px | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 |   |
| rpx | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 |   |
| em | Web: 4.0; Android: x; iOS: x; HarmonyOS: x |   |
| rem | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cap | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| ch | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cm | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cqb | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cqh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cqi | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cqmax | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cqmin | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cqw | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| dvb | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| dvh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| dvi | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| dvw | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| ex | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| ic | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| in | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| lh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| lvb | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| lvh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| lvi | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| lvw | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| mm | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| pc | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| pt | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| q | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| rcap | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| rch | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| rex | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| ric | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| rlh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| svb | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| svh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| svi | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| svw | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| vb | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| vh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| vi | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| vmax | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| vmin | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| vw | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| % | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | app平台仅width、height、padding(-*)、margin(-*)、top、left、right、bottom、flex-basis等属性支持 |
| fr | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |

### rpx
`rpx` 是一个以设备750px为基准的单位，`750rpx`即为屏幕宽度，相当于100%；`375rpx`即为屏幕一半宽度，相当于50%。

因为很多设计稿是以750px为基准出图的，所以使用rpx可以比较好的在不同屏幕宽度下还原设计稿。

但是，机械的照搬设计图，是无法自适应不同宽度的屏幕的。尤其是pc宽屏、pad、折叠屏、横屏。

在移动互联网早期，手机屏幕宽度都差不多，rpx曾经广泛流行。但随着宽屏适配需求越来越强，rpx使用范围已经非常少了。

有些开发者误以为只有rpx才能在适配好大小屏幕，他们担心使用px，会在小屏幕上超级大。这个理解恰恰反了。

其实px不是物理像素，px也是逻辑像素。正常使用px，在所有屏幕上都有合适的大小。\
比如不设置font-size时，text组件默认字号是16px，这个字号在各种大小的屏幕上都和OS系统默认字号大小一致。\
设置了rpx，反而在大屏幕上，比如pad、折叠屏、横屏、pc宽屏上，字体显得特别的大。

除了宽屏适配问题，rpx的性能和精度也不如px，但优于百分比。

不管是rpx还是百分比单位，都需要在运行时计算，转换为实际的px才能渲染。

rpx需要根据屏幕宽度做一次计算转换；而百分比需要根据父容器的宽度做计算转换。屏幕宽度是固定的，取一次即可。父容器宽度的计算更复杂，所以百分比单位比rpx的转换逻辑更耗时。

**所以推荐开发者尽量使用px。**

- 在需要根据屏幕宽度适应的场景，使用rpx
- 在需要根据父容器宽度按百分比适应的场景，使用百分比

有些开发者，在font-size，height、padding、margin、边框、阴影，都在使用rpx。这是非常不推荐的行为，性能差且屏幕适配能力差。

rpx仅适用于需要根据屏幕宽度变化的view或image的宽度width设置。

那么不用rpx的话，设计师如何出图、如何切图？

推荐设计师在设计软件中使用1x画布，按390px出普通竖屏图、按834px或1280px出宽屏图。

竖屏图中需根据情况标注不同内容：
1. 弹性容器，即屏幕变宽后，哪块区域向右填充。填充常使用`flex:1`铺满剩余空间
2. 普通限宽小组件，比如按钮，就按设计师标准的px做，图中要求60px宽，那就直接写`width:60px`。
3. 字体规范，默认字体不标，就选用系统默认字体（16px），然后设几个固定字号规范，较大、大、较小、小，都是多少px都要说明。不要让设计图随意给出无限种字号。
4. 间距、圆角规范。同样固定几个枚举值，整个应用所有css中的单位都在这几个固定的值域中。

宽屏图在大多数情况就是一个示意图，无需切图。
除非有特殊的图片，在宽屏下要请求不同的图源、设不同的宽度，此时可放在[match-media组件](../../component/match-media.md)中，为不同的屏幕宽度设不同的内容宽度。

宽屏适配指南[另见](../../adapt.md)

如果坚持不适配宽屏，那么为了防止在宽屏上出问题，可以在app.uvue的page选择器中全局设置页面宽度的max-width，但同时仍需放弃rpx。（注意app平台需蒸汽模式才支持page选择器）

### 不同单位的差异
- 长度默认值差异
	* App平台长度 `<length>` 可以不设置单位，不设置单位时当做 px 处理
	* Web平台长度 `<length>` 必须设置单位，不设置单位时当做无效值处理 \
	App平台允许设置纯数字是为了性能考虑，在需要频繁更改长度时，使用纯数字会比"数字+px"稍微快一点。\
	日常开发为了更好的跨端兼容，还是推荐给长度 `<length>` 指定明确单位。

- 单位精度差异
	- px、rpx属于逻辑像素，在不同dpi的设备上，需要转换为物理像素。当产生浮点数时，由于精度保留策略的不同，在不同浏览器和手机OS，可能造成细微的误差。\
	尤其是浏览器对于小数点的px兼容不够好，早期浏览器很难正常显示`0.5px`。但app可以正常显示。\
	另外`rpx`和`百分比`，比`px`更容易产生浮点数，所以**如果px能满足需求，尽量不用rpx和百分比**。

- 性能差异
   * 性能 px > rpx > 百分比。rpx需要根据屏幕宽度换算为px，而百分比需要根据父容器的高或宽换算为px，计算复杂度高于rpx。



## 字体大小单位

| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| px | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 |   |
| rpx | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 |   |
| em | Web: 4.0; 微信小程序: 4.41; Android(VDOM): 3.9; Android(Vapor): x; iOS(VDOM): 4.11; iOS(Vapor): x; HarmonyOS(VDOM): 4.61; HarmonyOS(Vapor): x | app平台仅line-height属性支持 |
| rem | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cap | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| ch | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cm | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cqb | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cqh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cqi | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cqmax | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cqmin | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| cqw | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| dvb | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| dvh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| dvi | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| dvw | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| ex | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| ic | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| in | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| lh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| lvb | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| lvh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| lvi | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| lvw | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| mm | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| pc | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| pt | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| q | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| rcap | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| rch | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| rex | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| ric | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| rlh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| svb | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| svh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| svi | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| svw | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| vb | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| vh | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| vi | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| vmax | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| vmin | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |
| vw | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |   |

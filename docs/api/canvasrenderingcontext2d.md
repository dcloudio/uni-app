## CanvasRenderingContext2D

canvas元素的绘图2D渲染上下文, 它用于绘制形状、文本、图像和其他对象

参考：[canvas组件](../component/canvas.md)




### CanvasRenderingContext2D 的属性值 @canvasrenderingcontext2d-values
| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| canvas | [UniCanvasElement](/api/dom/unicanvaselement.md) | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 是对与给定上下文关联的HTMLCanvasElement对象的只读引用 |
| direction | string | 是 | inherit | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 描述当前文本方向 |
| fillStyle | string | 是 | #000 (黑色) | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设置填充颜色 |
| filter | string | 是 | none | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 提供模糊、灰度等过滤效果的属性。它类似于 CSS filter 属性，并且接受相同的函数 |
| font | string | 是 | 10px sans-serif | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指定绘制文字所使用的字体样式。使用和 CSS 字体描述符相同的字符串值。<br/>注意App平台只支持font-size、font-family、font-weight |
| fontStretch | string | 是 | normal | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 指定绘制文本时字体如何被扩展或压缩。该属性对应于 CSS 中的 font-stretch 属性 |
| globalAlpha | number | 是 | 1.0 | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 用来描述在 canvas 上绘图之前，设置图形和图片透明度的属性。数值的范围从 0.0（完全透明）到 1.0（完全不透明） |
| globalCompositeOperation | string | 是 | source-over | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x; HarmonyOS(Vapor): x | 在绘制新形状时应用的合成操作的类型，其中 type 是用于标识要使用的合成或混合模式操作的字符串 |
| imageSmoothingEnabled | boolean | 是 | true | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 用于设置是否对缩放后的图片进行平滑处理，true 表示进行平滑处理，false 表示不进行 |
| imageSmoothingQuality | string | 是 | low | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 用于设置图像平滑度,要使此属性生效，imageSmoothingEnabled 属性必须为 true，可选值：`low`低质量； `medium`中等质量；`high`高质量。 |
| letterSpacing | string | 是 | 0px | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 用于指定绘制文本时字母之间的间距。这对应于 CSS 中的 letter-spacing 属性 |
| lineCap | string | 是 | butt | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指定如何绘制每一条线条末端的属性，可选值：`butt`线段末端以方形结束；`round`线段末端以圆形结束；`square`线段末端以方形结束，但是会增加一个一半宽度的矩形区域。 |
| lineDashOffset | number | 是 | 0.0 | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设置虚线偏移量 |
| lineJoin | string | 是 | miter | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设置 2 个长度不为 0 的线条相连部分如何连接在一起的属性，可选值：`bevel`斜角；`round`圆角；`miter`尖角。 |
| lineWidth | number | 是 | 1.0 | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设置线条的宽度, 零、负数、Infinity 和 NaN 值将被忽略 |
| miterLimit | number | 是 | 10.0 | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设置斜接面限制比例的属性。当获取属性值时，会返回当前的值。当给属性赋值时，0、负数、 Infinity 和 NaN 都会被忽略；除此之外都会被赋予一个新值。 |
| shadowBlur | number | 是 | 0 | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 用于描述模糊效果程度,其中 0 表示没有模糊，数字越大表示模糊程度越高。这个值不对应于像素数量，并且不受当前变换矩阵的影响。负数、Infinity 和 NaN 将被忽略 |
| shadowColor | string | 是 | fully-transparent black | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 描述阴影颜色,只有当 shadowColor 属性设置为非透明值时，阴影才会被绘制。其中的 shadowBlur、shadowOffsetX 或 shadowOffsetY 属性中至少有一个必须是非零的。 |
| shadowOffsetX | number | 是 | 0 | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 指定阴影在水平方向上的偏移距离。正值向右偏移，负值向左偏移。默认值为 0（无水平偏移）。Infinity 和 NaN 值将被忽略 |
| shadowOffsetY | number | 是 | 0 | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 指定阴影在垂直方向上的偏移距离。正值向右偏移，负值向左偏移。默认值为 0（无水平偏移）。Infinity 和 NaN 值将被忽略 |
| strokeStyle | string | 是 | #000 (黑色) | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设置边框的颜色 |
| textAlign | string | 是 | left | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设置文本的对齐方式，可取值：`left`左对齐；`center`居中对齐；`right`右对齐。 |
| textBaseline | string | 是 | alphabetic | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 描述绘制文本时，当前文本基线的属性 |
| textRendering | string | 是 | auto | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 用于在渲染文本时向渲染引擎提供应该如何优化的相关信息 |
| wordSpacing | string | 是 | 0px | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 用于指定绘制文本时单词之间的间距, 如果设置为无效或无法解析的值，则属性值将保持不变 |

#### direction 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ltr | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 文字方向为从左到右 |
| rtl | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 文字方向为从右到左 |
| inherit | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 文字方向从相应的 \<canvas> 元素或 Document 继承 |

#### fillStyle 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| interface | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | CanvasGradient 对象（线性或径向渐变）。 |
| interface | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | CanvasPattern 对象（重复的图像）。 |
| string.ColorString | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 同CSS颜色值。 |

#### fontStretch 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ultra-condensed | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 指定比普通字体更紧凑的字体,对应百分比数值为50% |
| extra-condensed | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 指定比普通字体更紧凑的字体,对应百分比数值为62.5% |
| condensed | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 指定比普通字体更紧凑的字体,对应百分比数值为75% |
| semi-condensed | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 指定比普通字体更紧凑的字体,对应百分比数值为87.5% |
| normal | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 普通字体外观 |
| semi-expanded | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 指定比普通字体更扩展的字体,对应百分比数值为112.5% |
| expanded | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 指定比普通字体更扩展的字体,对应百分比数值为125% |
| extra-expanded | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 指定比普通字体更扩展的字体,对应百分比数值为150% |
| ultra-expanded | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 指定比普通字体更扩展的字体,对应百分比数值为200% |

#### globalCompositeOperation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| source-over | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x; HarmonyOS(Vapor): x | 在现有画布上下文之上绘制新图形 |
| source-in | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 新图形只在新图形和目标画布重叠的地方绘制。其他的都是透明的 |
| source-out | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 在不与现有画布内容重叠的地方绘制新图形 |
| source-atop | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x; HarmonyOS(Vapor): x | 新图形只在与现有画布内容重叠的地方绘制。 |
| destination-over | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x; HarmonyOS(Vapor): x | 在现有的画布内容后面绘制新的图形。 |
| destination-atop | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的。 |
| destination-in | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 现有的画布内容保持在新图形和现有画布内容重叠的位置。其他的都是透明的。 |
| destination-out | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x; HarmonyOS(Vapor): x | 现有内容保持在新图形不重叠的地方。 |
| lighter | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x; HarmonyOS(Vapor): x | 两个重叠图形的颜色是通过颜色值相加来确定的。 |
| copy | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 只显示新图形。 |
| xor | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x; HarmonyOS(Vapor): x | 图像中，那些重叠和正常绘制之外的其他地方是透明的。 |
| multiply | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。 |
| screen | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 像素被倒转，相乘，再倒转，结果是一幅更明亮的图片。 |
| overlay | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | multiply 和 screen 的结合，原本暗的地方更暗，原本亮的地方更亮。 |
| darken | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 保留两个图层中最暗的像素 |
| lighten | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 保留两个图层中最亮的像素。 |
| color-dodge | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 将底层除以顶层的反置。 |
| color-burn | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 将反置的底层除以顶层，然后将结果反过来。 |
| hard-light | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | multiply 和 screen 的结合，类似于叠加，但上下图层互换了。 |
| soft-light | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 用顶层减去底层或者相反来得到一个正值。 |
| difference | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 一个柔和版本的 hard-light。纯黑或纯白不会导致纯黑或纯白。 |
| exclusion | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 和 difference 相似，但对比度较低。 |
| hue | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 保留了底层的亮度和色度，同时采用了顶层的色调。 |
| saturation | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 保留底层的亮度和色调，同时采用顶层的色度。 |
| color | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 保留了底层的亮度，同时采用了顶层的色调和色度。 |
| luminosity | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 保持底层的色调和色度，同时采用顶层的亮度。 |

#### imageSmoothingQuality 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| low | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 低质量。 |
| medium | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 中等质量。 |
| high | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 高质量。 |

#### lineCap 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| butt | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `butt`线段末端以方形结束； |
| round | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `round`线段末端以圆形结束； |
| square | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `square`线段末端以方形结束，但是会增加一个一半宽度的矩形区域。 |

#### lineJoin 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| round | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。圆角的半径是线段的宽度。 |
| bevel | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 在相连部分的末端填充一个额外的以三角形为底的区域，每个部分都有各自独立的矩形拐角。 |
| miter | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置受到 miterLimit 属性的影响。默认值。 |

#### strokeStyle 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| interface | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | CanvasGradient 对象（线性或径向渐变）。 |
| interface | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | CanvasPattern 对象（重复的图像）。 |
| string.ColorString | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 同CSS颜色值。 |

#### textAlign 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| left | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文本左对齐。 |
| right | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文本右对齐。 |
| center | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文本居中对齐。 |
| start | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文本对齐界线开始的地方（左对齐指本地从左向右，右对齐指本地从右向左）。 |
| end | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文本对齐界线结束的地方（左对齐指本地从左向右，右对齐指本地从右向左）。 |

#### textBaseline 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| top | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文本基线在文本块的顶部。 |
| hanging | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文本基线是悬挂基线。 |
| middle | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文本基线在文本块的中间。 |
| alphabetic | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文本基线是标准的字母基线。默认值。 |
| ideographic | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文字基线是表意字基线；如果字符本身超出了 alphabetic 基线，那么 ideograhpic 基线位置在字符本身的底部。（用于中文、日文和韩文。） |
| bottom | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文本基线在文本块的底部。与 ideographic 基线的区别在于 ideographic 基线不需要考虑下行字母。 |

#### textRendering 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 浏览器在绘制文本时根据情况对速度、易读性和几何精确性进行优化。 |
| optimizeSpeed | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 浏览器在绘制文本时优先考虑渲染速度，而不是易读性和几何精确性。它禁用字距调整和连字。 |
| optimizeLegibility | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 浏览器在绘制文本时优先考虑易读性，而不是渲染速度和几何精确性。这启用了字距调整和可选连字。 |
| geometricPrecision | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 浏览器在绘制文本时优先考虑几何精确性，而不是渲染速度和易读性。字体的某些方面（例如字距调整）不会线性缩放。对于大的缩放比例，你可能会看到不太美观的文本渲染，但大小是你所期望的（不会被向上或向下舍入到底层操作系统支持的最接近的字体大小）。 |




### CanvasRenderingContext2D 兼容性 
 | Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |

<!-- CUSTOMTYPEJSON.CanvasRenderingContext2D.example -->

### CanvasRenderingContext2D 的方法 @canvasrenderingcontext2d-methods

#### arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void @arc

绘制一段弧线

##### arc 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧中心（圆心）的 x 轴坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧中心（圆心）的 y 轴坐标 |
| radius | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧的半径 |
| startAngle | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧的起始点，x 轴方向开始计算，单位为弧度 |
| endAngle | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧的终点，单位为弧度 |
| anticlockwise | boolean | 否 | true | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧绘制方向，true：逆时针绘制，false：顺时针绘制。 | 






#### arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void @arcto

根据控制点和半径绘制圆弧路径，使用当前的描点 (前一个 moveTo 或 lineTo 等函数的止点)。根据当前描点与给定的控制点 1 连接的直线，和控制点 1 与控制点 2 连接的直线，作为使用指定半径的圆的切线，画出两条切线之间的弧线路径

##### arcTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x1 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第一个控制点的 x 轴坐标 |
| y1 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第一个控制点的 y 轴坐标 |
| x2 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第二个控制点的 x 轴坐标 |
| y2 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第二个控制点的 y 轴坐标 |
| radius | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧的半径 | 






#### beginPath(): void @beginpath

开始创建一个路径。需要调用 fill 或者 stroke 才会使用路径进行填充或描边

##### beginPath 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |








#### bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void @beziercurveto

绘制三次贝赛尔曲线路径

##### bezierCurveTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| cp1x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第一个控制点的 x 轴坐标 |
| cp1y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第一个控制点的 y 轴坐标 |
| cp2x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第二个控制点的 x 轴坐标 |
| cp2y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第二个控制点的 y 轴坐标 |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 结束点的 x 轴坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 结束点的 y 轴坐标 | 






#### clearRect(x: number, y: number, width: number, height: number): void @clearrect

清除画布上在该矩形区域内的内容

##### clearRect 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形起点的 x 轴坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形起点的 y 轴坐标 |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形的宽度 |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形的高度 | 






#### clip(): void @clip

将当前创建的路径设置为当前剪切路径

##### clip 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |








#### clip(path: Path2D): void @clip

将当前创建的路径设置为当前剪切路径

##### clip 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | x | x | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | [Path2D](/api/path2d.md) | 是 | - | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61 | Path2D用来声明路径，用来在canvas中根据需要创建可以保留并重用的路径, 此路径会被CanvasRenderingContext2D对象使用 | 






#### clip(fillRule: string): void @clip

将当前创建的路径设置为当前剪切路径

##### clip 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fillRule | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 






#### clip(path: Path2D, fillRule: string): void @clip

将当前创建的路径设置为当前剪切路径

##### clip 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | [Path2D](/api/path2d.md) | 是 | - | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61 | Path2D用来声明路径，用来在canvas中根据需要创建可以保留并重用的路径, 此路径会被CanvasRenderingContext2D对象使用 |
| fillRule | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 






#### closePath(): void @closepath

关闭一个路径

##### closePath 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |








#### createImageData(width: number, height: number): void @createimagedata

创建一个新的、空白的、指定大小的 ImageData 对象。所有的像素在新对象中都是透明的黑色

##### createImageData 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 






#### createPattern(image: Image, repetition?: string \| null): CanvasPattern \| null @createpattern

对指定的图像创建模式的方法，可在指定的方向上重复元图像

##### createPattern 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| image | [Image](/api/image.md) | 是 | - | Web: 4.0; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 重复的图像源，支持代码包路径和本地临时路径 (本地路径) |
| repetition | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 如何重复图像 | 


##### 返回值 

| 类型 | 必备 |
| :- | :- |
| CanvasPattern | 否 |
 




#### createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient @createlineargradient

创建一个线性的渐变颜色。返回的CanvasGradient对象需要使用 CanvasGradient.addColorStop() 来指定渐变点，至少要两个

##### createLinearGradient 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x0 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 起点的 x 坐标 |
| y0 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 起点的 y 坐标 |
| x1 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 终点的 x 坐标 |
| y1 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 终点的 y 坐标 | 


##### 返回值 

| 类型 | 描述 |
| :- | :- |
| [CanvasGradient](#canvasgradient-values) | 表示描述渐变的不透明对象。该接口通过 CanvasRenderingContext2D.createLinearGradient()、<br/>CanvasRenderingContext2D.createConicGradient()<br/>或 CanvasRenderingContext2D.createRadialGradient() 方法返回 |

###### CanvasGradient 的方法 @canvasgradient-values 

###### addColorStop(stop: number, color: string): void @addcolorstop
addColorStop
添加颜色的渐变点。小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染, 最大支持5个分段
###### addColorStop 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| stop | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 表示渐变中开始与结束之间的位置，范围 0-1 |
| color | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 渐变点的颜色 | 

 




#### createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r01: number): CanvasGradient @createradialgradient

根据参数确定两个圆的坐标，绘制放射性渐变。注意App平台和Web平台绘制效果有差异

##### createRadialGradient 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x0 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 开始圆形的 x 轴坐标 |
| y0 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 开始圆形的 y 轴坐标 |
| r0 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 开始圆形的半径 |
| x1 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 结束圆形的 x 轴坐标 |
| y1 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 结束圆形的 y 轴坐标 |
| r01 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 结束圆形的半径 | 


##### 返回值 

| 类型 | 描述 |
| :- | :- |
| [CanvasGradient](#canvasgradient-values) | 表示描述渐变的不透明对象。该接口通过 CanvasRenderingContext2D.createLinearGradient()、<br/>CanvasRenderingContext2D.createConicGradient()<br/>或 CanvasRenderingContext2D.createRadialGradient() 方法返回 |

###### CanvasGradient 的方法 @canvasgradient-values 

###### addColorStop(stop: number, color: string): void @addcolorstop
addColorStop
添加颜色的渐变点。小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染, 最大支持5个分段
###### addColorStop 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| stop | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 表示渐变中开始与结束之间的位置，范围 0-1 |
| color | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 渐变点的颜色 | 

 




#### draw(): void @draw

将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中, 该操作为可选非web标准，canvas组件会自动选择合适时机进行绘制

##### draw 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |








#### drawImage(imageResource: Image, dx: number, dy: number): void @drawimage

绘制图像到画布

##### drawImage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| imageResource | [Image](/api/image.md) | 是 | - | Web: 4.0; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 所要绘制的图片资源 |
| dx | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | imageResource的左上角在目标 canvas 上 x 轴的位置 |
| dy | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | imageResource的左上角在目标 canvas 上 y 轴的位置 | 






#### drawImage(imageResource: Image, dx: number, dy: number, dWidth: number, dHeight: number): void @drawimage

绘制图像到画布

##### drawImage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| imageResource | [Image](/api/image.md) | 是 | - | Web: 4.0; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 所要绘制的图片资源 |
| dx | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | imageResource的左上角在目标 canvas 上 x 轴的位置 |
| dy | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | imageResource的左上角在目标 canvas 上 y 轴的位置 |
| dWidth | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 在目标画布上绘制imageResource的宽度，允许对绘制的imageResource进行缩放 |
| dHeight | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 在目标画布上绘制imageResource的高度，允许对绘制的imageResource进行缩放 | 






#### drawImage(imageResource: Image, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number): void @drawimage

绘制图像到画布

##### drawImage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| imageResource | [Image](/api/image.md) | 是 | - | Web: 4.0; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 所要绘制的图片资源 |
| sx | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要绘制到画布中的，imageResource的矩形（裁剪）选择框的左上角 x 坐标 |
| sy | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要绘制到画布中的，imageResource的矩形（裁剪）选择框的左上角 y 坐标 |
| sWidth | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要绘制到画布中的，imageResource的矩形（裁剪）选择框的宽度 |
| sHeight | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要绘制到画布中的，imageResource的矩形（裁剪）选择框的高度 |
| dx | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | imageResource的左上角在目标 canvas 上 x 轴的位置 |
| dy | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | imageResource的左上角在目标 canvas 上 y 轴的位置 |
| dWidth | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 在目标画布上绘制imageResource的宽度，允许对绘制的imageResource进行缩放 |
| dHeight | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 在目标画布上绘制imageResource的高度，允许对绘制的imageResource进行缩放 | 






#### ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise: boolean): void @ellipse

添加椭圆路径。椭圆的圆心在（x,y）位置，半径分别是radiusX 和 radiusY，按照anticlockwise（默认顺时针）指定的方向，从 startAngle 开始绘制，到 endAngle 结束

##### ellipse 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 椭圆圆心的 x 轴（水平）坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 椭圆圆心的 y 轴（垂直）坐标 |
| radiusX | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 椭圆长轴的半径。必须为非负数 |
| radiusY | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 椭圆短轴的半径。必须为非负数。 |
| rotation | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 椭圆的旋转角度，以弧度表示。 |
| startAngle | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 椭圆弧的起始偏心角，从正 x 轴沿顺时针测量，用弧度表示。 |
| endAngle | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 椭圆弧的结束偏心角，从正 x 轴沿顺时针测量，用弧度表示。 |
| anticlockwise | boolean | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 一个可选的布尔值，如果为 true，则逆时针绘制椭圆弧。默认值为 false（顺时针）。 | 






#### fill(): void @fill

对当前路径中的内容进行填充

##### fill 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |








#### fill(fillRule: "nonzero" \| "evenodd"): void @fill

对当前路径中的内容进行填充

##### fill 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fillRule | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 填充当前或已存在的路径的方法。采取非零环绕(nonzero)或者奇偶环绕(evenodd)规则 |

#### fillRule 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| nonzero | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| evenodd | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 






#### fill(path: Path2D): void @fill

对指定路径中的内容进行填充

##### fill 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | [Path2D](/api/path2d.md) | 是 | - | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61 | 填充路径 | 






#### fill(path: Path2D, fillRule: "nonzero" \| "evenodd"): void @fill

对指定路径中的内容进行填充

##### fill 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | [Path2D](/api/path2d.md) | 是 | - | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61 | 填充路径 |
| fillRule | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 填充当前或已存在的路径的方法。采取非零环绕(nonzero)或者奇偶环绕(evenodd)规则 |

#### fillRule 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| nonzero | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| evenodd | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 






#### fillRect(x: number, y: number, width: number, height: number): void @fillrect

填充一个矩形。用 setFillStyle 设置矩形的填充色，如果没设置默认是黑色

##### fillRect 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形起点的 x 轴坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形起点的 y 轴坐标 |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形的宽度 |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形的高度 | 






#### fillText(text: string, x: number, y: number, maxWidth?: number): void @filltext

在画布上绘制文本

##### fillText 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要渲染的文本字符串 |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 开始绘制文本的点的 x 轴坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 开始绘制文本的点的 y 轴坐标 |
| maxWidth | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要绘制的最大宽度 | 






#### getImageData(sx: number, sy: number, sw: number, sh: number): ImageData @getimagedata

返回一个ImageData对象，用来描述 canvas 区域隐含的像素数据，这个区域通过矩形表示，起始点为*(sx, sy)、宽为sw、高为sh。

##### getImageData 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| sx | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 将要被提取的图像数据矩形区域的左上角 x 坐标 |
| sy | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 将要被提取的图像数据矩形区域的左上角 y 坐标 |
| sw | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 将要被提取的图像数据矩形区域的宽度 |
| sh | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 将要被提取的图像数据矩形区域的高度 | 


##### 返回值 

| 类型 | 描述 |
| :- | :- |
| **ImageData** | 描述canvas元素的一个隐含像素数据的区域，注意：App平台ImageData只支持context接口获取不支持通过new ImageData方式创建 |

#### ImageData 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md) | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 一维数组，包含以 RGBA 顺序的数据，数据使用 0 至 255（包含）的整数表示 |
| width | number | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 使用像素描述 ImageData 的实际宽度 |
| height | number | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 使用像素描述 ImageData 的实际高度 | 




#### isContextLost(): Boolean @iscontextlost

返回一个Boolean 标记上下文是否已经丢失

##### isContextLost 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |




##### 返回值 

| 类型 |
| :- |
| Boolean |
 




#### isPointInPath(x: number, y: number): boolean @ispointinpath

判断在当前路径中是否包含检测点

##### isPointInPath 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 检测点的 X 坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 检测点的 Y 坐标 | 


##### 返回值 

| 类型 |
| :- |
| boolean |
 




#### isPointInPath(x: number, y: number, fillRule: string): boolean @ispointinpath

判断在当前路径中是否包含检测点

##### isPointInPath 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 检测点的 X 坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 检测点的 Y 坐标 |
| fillRule | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 用来决定点在路径内还是在路径外的算法 | 


##### 返回值 

| 类型 |
| :- |
| boolean |
 




#### isPointInPath(path: Path2D, x: number, y: number): boolean @ispointinpath

判断在当前路径中是否包含检测点

##### isPointInPath 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | [Path2D](/api/path2d.md) | 是 | - | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61 | Path2D应用的路径 |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 检测点的 X 坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 检测点的 Y 坐标 | 


##### 返回值 

| 类型 |
| :- |
| boolean |
 




#### isPointInPath(path: Path2D, x: number, y: number, fillRule: string): boolean @ispointinpath

判断在当前路径中是否包含检测点

##### isPointInPath 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | [Path2D](/api/path2d.md) | 是 | - | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61 | Path2D应用的路径 |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 检测点的 X 坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 检测点的 Y 坐标 |
| fillRule | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 用来决定点在路径内还是在路径外的算法 | 


##### 返回值 

| 类型 |
| :- |
| boolean |
 




#### isPointInStroke(x: number, y: number): boolean @ispointinstroke

检测某点是否在路径的描边线

##### isPointInStroke 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 检测点的 X 坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 检测点的 Y 坐标 | 


##### 返回值 

| 类型 |
| :- |
| boolean |
 




#### getLineDash(): Array\<number> @getlinedash

在填充线时使用虚线模式, 它使用一组值来指定描述模式的线和间隙的交替长度。注意App平台和Web平台绘制效果有差异

##### getLineDash 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |




##### 返回值 

| 类型 |
| :- |
| number[\] |
 




#### lineTo(x: number, y: number): void @lineto

增加一个新点，然后创建一条从上次指定点到目标点的线。用 stroke 方法来画线条

##### lineTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 目标位置的 x 坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 目标位置的 y 坐标 | 






#### measureText(text: string): TextMetrics @measuretext

测量文本尺寸信息。目前仅返回文本宽度

##### measureText 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要渲测量的文本字符串 | 


##### 返回值 

| 类型 | 描述 |
| :- | :- |
| **TextMetrics** | 表示文本的尺寸，通过 CanvasRenderingContext2D.measureText() 方法创建 |

#### TextMetrics 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| width | number | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文本的宽度 | 




#### moveTo(x: number, y: number): void @moveto

把路径移动到画布中的指定点

##### moveTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 目标位置的 x 坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 目标位置的 y 坐标 | 






#### putImageData(imageData: ImageData, x: number, y: number): void @putimagedata

将数据从已有的 ImageData 对象绘制到位图的方法。如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响

##### putImageData 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| imageData | **ImageData** | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 包含像素值的数组对象 |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量） |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量） | 

#### imageData 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md) | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 一维数组，包含以 RGBA 顺序的数据，数据使用 0 至 255（包含）的整数表示 |
| width | number | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 使用像素描述 ImageData 的实际宽度 |
| height | number | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 使用像素描述 ImageData 的实际高度 |






#### putImageData(imageData: ImageData, x: number, y: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number): void @putimagedata

将数据从已有的 ImageData 对象绘制到位图的方法。如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响

##### putImageData 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| imageData | **ImageData** | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 包含像素值的数组对象 |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量） |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量） |
| dirtyX | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标） |
| dirtyY | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标） |
| dirtyWidth | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 在源图像数据中，矩形区域的宽度。默认是图像数据的宽度） |
| dirtyHeight | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 在源图像数据中，矩形区域的高度。默认是图像数据的高度 | 

#### imageData 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md) | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 一维数组，包含以 RGBA 顺序的数据，数据使用 0 至 255（包含）的整数表示 |
| width | number | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 使用像素描述 ImageData 的实际宽度 |
| height | number | 是 | - | Web: 4.0; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 使用像素描述 ImageData 的实际高度 |






#### quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void @quadraticcurveto

创建二次贝塞尔曲线路径

##### quadraticCurveTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| cpx | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 贝塞尔控制点的 x 坐标 |
| cpy | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 贝塞尔控制点的 y 坐标 |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 结束点的 x 坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 结束点的 y 坐标 | 






#### rect(x: number, y: number, width: number, height: number): void @rect

创建一个矩形路径

##### rect 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形路径起点的 x 轴坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形路径起点的 y 轴坐标 |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形路径的宽度 |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形路径的高度 | 






#### resetTransform(): void @resettransform

使用单位矩阵重新设置当前变换

##### resetTransform 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |








#### restore(): void @restore

恢复之前保存的绘图上下文

##### restore 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |








#### rotate(rotate: number): void @rotate

以原点为中心顺时针旋转当前坐标轴

##### rotate 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| rotate | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | ，以弧度计 degrees * Math.PI/180；degrees 范围为 0-360 | 






#### roundRect(x: number, y: number, width: number, height: number, radii: any): void @roundrect

在当前路径中添加一个圆角矩形

##### roundRect 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 包含像素值的数组对象 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 矩形起点的 x 轴坐标，以像素为单位 |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 矩形起点的 y 轴坐标，以像素为单位 |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 矩形的宽度。正值向右，负值向左 |
| radii | any | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 矩形的高度。正值向下，负值向上 | 






#### save(): void @save

保存绘图上下文

##### save 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |








#### scale(x: number, y: number): void @scale

缩放变换

##### scale 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 






#### setLineDash(segments: Array\<number>): void @setlinedash

在填充线时使用虚线模式, 它使用一组值来指定描述模式的线和间隙的交替长度。

##### setLineDash 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| segments | number[\] | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | \<number>一组描述交替绘制线段和间距（坐标空间单位）长度的数字 | 






#### setTransform(scaleX: Number, skewY: Number, skewX: Number, scaleY: Number, translateX: Number, translateY: Number): void @settransform

使用单位矩阵重新设置（覆盖）当前的变换并调用变换

##### setTransform 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| scaleX | Number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 水平缩放 |
| skewY | Number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 垂直倾斜 |
| skewX | Number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 水平倾斜 |
| scaleY | Number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 垂直缩放 |
| translateX | Number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 水平移动 |
| translateY | Number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 垂直移动 | 






#### stroke(): void @stroke

画出当前路径的边框。默认颜色色为黑色

##### stroke 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |








#### stroke(path: Path2D): void @stroke

画出指定路径的边框。默认颜色色为黑色

##### stroke 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | [Path2D](/api/path2d.md) | 是 | - | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61 |  | 






#### strokeRect(x: number, y: number, width: number, height: number): void @strokerect

画一个矩形(非填充)

##### strokeRect 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形起点的 x 轴坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形起点的 y 轴坐标 |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形的宽度 |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形的高度 | 






#### strokeText(text: string, x: number, y: number, maxWidth?: number): void @stroketext

文本描边

##### strokeText 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要渲染的文本字符串 |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 开始绘制文本的点的 x 轴坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 开始绘制文本的点的 y 轴坐标 |
| maxWidth | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要绘制的最大宽度 | 






#### transform(scaleX: Number, skewY: number, skewX: number, scaleY: number, translateX: number, translateY: number): void @transform

使用矩阵多次叠加当前变换，矩阵由方法的参数进行描述。可以缩放、旋转、移动和倾斜上下文

##### transform 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| scaleX | Number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 水平缩放 |
| skewY | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 垂直倾斜 |
| skewX | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 水平倾斜 |
| scaleY | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 垂直缩放 |
| translateX | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 水平移动 |
| translateY | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 垂直移动 | 






#### translate(translateX: number, translateY: number): void @translate

当前网格添加平移变换

##### translate 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| translateX | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 水平方向的移动距离 |
| translateY | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 垂直方向的移动距离 | 






## 使用自定义字体@custonfont
在 canvas 中调用 [CanvasRenderingContext2D.filltext](#filltext)、[CanvasRenderingContext2D.stroketext](#stroketext) 绘制文字时，可通过 `font` 属性指定绘制文字所使用的字体样式，其中字体名称（fontfamily）可设置自定义字体。

当使用自定义字体时，需先通过 [uni.loadFontFace](load-font-face.md) 加载字体，字体加载成功之后在设置 `font` 属性指定字体名称。

完整示例代码参考[hello uni-app x](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/component/canvas/canvas-context.uvue)


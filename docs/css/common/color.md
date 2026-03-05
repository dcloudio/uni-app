# 颜色 @color

css中颜色的表达方式及兼容性表格

| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| named-color | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | CSS 数据类型 <named-color> 为颜色名——如: red、blue、black 或 lightseagreen。- [MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/CSS/named-color) |
| hex-color | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | CSS 数据类型 <hex-color> 为描述 sRGB 颜色的十六进制颜色语法的记号，此记号将颜色的主分量（红、绿、蓝）及其透明度写为十六进制数。如: #FFFFFF 表示白色- [MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/CSS/hex-color) |
| currentColor | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 'color' 属性的值。'currentColor' 关键字的计算值是 'color' 属性的计算值。如果 'currentColor' 关键字设置在 'color' 属性本身上，则在解析时会将其视为 'color:inherit'。 |
| transparent | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 完全透明。这个关键字可以被认为是 rgba(0,0,0,0) 的简写，这是它的计算值。 |
| rgb | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 根据红色、绿色和蓝色值创建颜色。 |
| rgba | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 根据红色、绿色、蓝色和 alpha 值创建颜色。 |
| rgb relative | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据另一个颜色的红色、绿色和蓝色值创建颜色。 |
| hsl | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据色调、饱和度和亮度值创建颜色。 |
| hsla | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据色调、饱和度、亮度和 alpha 值创建颜色。 |
| hsl relative | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据另一个颜色的色调、饱和度和亮度值创建颜色。 |
| hwb | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据色调、白色和黑色值创建颜色。 |
| hwb relative | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据另一个颜色的色调、白色和黑色值创建颜色。 |
| lab | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据亮度、a 和 b 值创建颜色。 |
| lab relative | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据另一个颜色的亮度、a 和 b 值创建颜色。 |
| oklab | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据亮度、a 和 b 值创建颜色。 |
| oklab relative | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据另一个颜色的亮度、a 和 b 值创建颜色。 |
| lch | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据亮度、色度和色调值创建颜色。 |
| lch relative | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据另一个颜色的亮度、色度和色调值创建颜色。 |
| oklch | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据亮度、色度和色调值创建颜色。 |
| oklch relative | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 根据另一个颜色的亮度、色度和色调值创建颜色。 |
| color | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 在特定色彩空间中，根据红色、绿色和蓝色值创建颜色。 |
| color relative | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 在特定色彩空间中，根据另一个颜色的红色、绿色和蓝色值创建颜色。 |
| color-mix | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 在矩形色彩空间中混合两种颜色。 |
| color-mix hue | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 在极坐标色彩空间中混合两种颜色。 |

#### hex-color 的属性描述

| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| #RGB | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 十六进制颜色三值语法，如: #FFF 表示白色 |
| #RGBA | Web: 4.0; 微信小程序: 4.41; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 十六进制颜色四值语法，如: #FFFA 表示半透明白色（透明度值为AA） |
| #RRGGBB | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 十六进制颜色六值语法，如: #FFFFFF 表示白色 |
| #RRGGBBAA | Web: 4.0; 微信小程序: 4.41; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 十六进制颜色八值语法，如: #FFFFFFAA 表示半透明白色（透明度值为AA） |

**注意**

- 在pages.json中，仅支持设置16进制颜色hex-color。

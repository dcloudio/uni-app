## DOMRect

一个 DOMRect 代表一个矩形。

### DOMRect 兼容性 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.11 | 3.9 | 4.11 | 4.61 |

`DOMRect`表示的盒子的类型由返回它的方法或属性指定。例如: [UniElement.getBoundingClientRect()](./unielement.md#getboundingclientrect)指定使用此类对象限制范围内容的矩形。




### 构造函数
| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 否 | 0 | - | 矩形原点的x坐标 |
| y | number | 否 | 0 | - | 矩形原点的y坐标 |
| width | number | 否 | 0 | - | 矩形的宽 |
| height | number | 否 | 0 | - | 矩形的高 |

### DOMRect 的属性值 @domrect-values
| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| width | number | 是 | - | Web: 4.0; 微信小程序: 4.11; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 矩形的宽 |
| height | number | 是 | - | Web: 4.0; 微信小程序: 4.11; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 矩形的高 |
| x | number | 是 | - | Web: 4.0; 微信小程序: 4.11; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 矩形原点的x坐标 |
| y | number | 是 | - | Web: 4.0; 微信小程序: 4.11; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 矩形原点的y坐标 |
| left | number | 是 | - | Web: 4.0; 微信小程序: 4.11; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 矩形的左坐标值 |
| right | number | 是 | - | Web: 4.0; 微信小程序: 4.11; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 矩形的右坐标值 |
| top | number | 是 | - | Web: 4.0; 微信小程序: 4.11; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 矩形的顶坐标值 |
| bottom | number | 是 | - | Web: 4.0; 微信小程序: 4.11; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 矩形的底坐标值 |


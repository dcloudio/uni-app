## transition-property



transition-property 指定应用过渡属性的名称。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
transition-property: none | <single-transition-property>#;
```



### 值限制
- enum



### transition-property 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| all | Web: 4.0; Android: 4.13; iOS: 4.13; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 所有可被动画的属性都表现出过渡动画。 |
| none | Web: 4.0; Android: 4.13; iOS: 4.13; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 没有过渡动画。 |
| width | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制宽度属性的过渡效果 |
| height | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制高度属性的过渡效果 |
| margin | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 控制外边距属性的过渡效果 |
| margin-top | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 控制上外边距属性的过渡效果 |
| margin-bottom | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 控制下外边距属性的过渡效果 |
| margin-left | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 控制左外边距属性的过渡效果 |
| margin-right | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 控制右外边距属性的过渡效果 |
| left | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制左侧位置属性的过渡效果 |
| right | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制右侧位置属性的过渡效果 |
| top | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制顶部位置属性的过渡效果 |
| bottom | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制底部位置属性的过渡效果 |
| padding | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 控制内边距属性的过渡效果 |
| padding-left | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 控制左内边距属性的过渡效果 |
| padding-right | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 控制右内边距属性的过渡效果 |
| padding-top | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 控制上内边距属性的过渡效果 |
| padding-bottom | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 控制下内边距属性的过渡效果 |
| opacity | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制透明度属性的过渡效果 |
| background-color | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制背景颜色属性的过渡效果 |
| border-color | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制边框颜色属性的过渡效果 |
| border-top-color | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制上边框颜色属性的过渡效果 |
| border-bottom-color | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制下边框颜色属性的过渡效果 |
| border-left-color | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制左边框颜色属性的过渡效果 |
| border-right-color | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制右边框颜色属性的过渡效果 |
| transform | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 控制变换属性的过渡效果 |


#### App平台
从 HBuilderX4.11 版起，默认值调整为`all`。HBuilderX4.11 以下版本，默认值为`none`。

### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue-app | all |
| uvue-web | all |

 **注意**：W3C 默认值为：all








### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transition-property)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.transition-property)


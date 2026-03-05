## display



display 属性设置元素的显示或布局方式，默认值为flex（弹性布局）。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
display: [ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>;
```



### 值限制
- enum



### display 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| flex | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 该元素根据弹性盒模型布局。 |
| none | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 使元素不再显示，其对布局不会有影响（页面渲染得好像此元素并不存在），所有的子元素也不会再显示。如需元素占据空间，但不渲染任何东西，应该使用 visibility 属性。 |


**注意**
设置 visibility 为 hidden，或设置 display 为 none 都可以隐藏元素。差异是通过 visibility 隐藏元素仍然占据页面位置，通过 display 隐藏元素不占据页面位置。

### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | flex |

 **注意**：W3C 默认值为：inline








### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/display)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.display)


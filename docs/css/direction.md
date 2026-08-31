## direction



direction CSS 属性用于设置文本水平溢出的方向。


### uni-app x 兼容性 <Help />
| Web | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 5.25 | x | 5.25 | x | 5.25 |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| 5.25 | 5.25 | 4.26 |





### 语法
```
direction: ltr | rtl;
```



### direction 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| ltr | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.25; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.25 | 默认属性。可设置文本和其他元素的默认方向是从左到右。 |
| rtl | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.25; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.25 | 可设置文本和其他元素的默认方向是从右到左。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue-app | ltr |
| uvue-web | ltr |

 **注意**：W3C 默认值为：ltr

### 适用组件 @unix-tags 
 - [text](/component/text.md)




### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/direction)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text.direction)

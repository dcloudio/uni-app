## word-break



word-break 属性指定文本在内容框内溢出时的断行规则。


### uni-app x 兼容性 <Help />
| Web | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 5.30 | x | 5.30 | x | 5.30 |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| 5.30 | 5.30 | 5.30 |





### 语法
```
word-break: normal | break-all | keep-all | break-word;
```



### word-break 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| normal | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.30; iOS(VDOM): x; iOS(Vapor): 5.30; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.30 | 使用默认的断行规则。 |
| break-all | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.30; iOS(VDOM): x; iOS(Vapor): 5.30; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.30 | 对于非中日韩文本，可在任意字符间断行。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue-app | normal |
| uvue-web | normal |

 **注意**：W3C 默认值为：normal

### 适用组件 @unix-tags 
 - [text](/component/text.md)




### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/word-break)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text.word-break)

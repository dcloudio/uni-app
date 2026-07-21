## lines



text 组件专有样式，设置文本的最大行数。


### uni-app x 兼容性 <Help />
| Web | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.9 | x | 4.11 | x | 4.61 | x |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| x | x | x |


**注意**  
此属性因与web规范不同，已废弃。蒸汽模式（Vapor）[text](../component/text.md) 组件提供了 `max-lines` 属性支持此功能。注意是组件属性，不是css属性。


### 语法
```
lines: <integer>;
```



### 值限制
- integer




### 默认值 @default-value 
 `-1`

### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)
- [input](/component/input.md)
- [textarea](/component/textarea.md)






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text.lines)


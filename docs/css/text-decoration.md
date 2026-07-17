## text-decoration



text-decoration 属性用于设置元素中文本的修饰线外观，是 text-decoration-line、text-decoration-color、text-decoration-style、text-decoration-thickness 属性的缩写。


### uni-app x 兼容性 <Help />
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| 4.0 | x | x | x |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| x | x | x |



### 语法
```
text-decoration: <'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>;
```



### 值限制
- enum
- color
- length



### text-decoration 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| dashed | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 虚线。 |
| dotted | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 点划线。 |
| double | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 双实线。 |
| line-through | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 贯穿文本中间的线。 |
| none | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 不画线。 |
| overline | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 在文本的上方的线。 |
| solid | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 实线。 |
| underline | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 下滑线。 |
| wavy | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 波浪线。 |
| text-decoration-line | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 设置使用的装饰类型，例如 underline 或者 line-through。 |
| text-decoration-color | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 设置装饰的颜色。 |
| text-decoration-style | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 设置装饰的线条的颜色，例如 solid、wavy 或者 dashed。 |
| text-decoration-thickness | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 设置用于装饰的线条粗细。 |




### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)



#### tips@suggestion
- app平台暂不支持 text-decoration 简写样式，仅支持 [text-decoration-line](./text-decoration-line.md) 设置修饰线类型





### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text.text-decoration)


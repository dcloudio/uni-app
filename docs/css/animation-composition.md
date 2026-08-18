## animation-composition



The animation-composition CSS property specifies the composite operation to use when multiple animations affect the same property simultaneously.


### uni-app x 兼容性 <Help />
| Android | iOS | HarmonyOS |
| :- | :- | :- |
| x | x | x |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| x | x | x |





### 语法
```
animation-composition: <single-animation-composition>#;
```



### animation-composition 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| replace | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | The effect value overrides the underlying value of the property. This is the default value. |
| add | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | The effect value builds on the underlying value of the property. This operation produces an additive effect. For animation types where the addition operation is not commutative, the order of the operands is the underlying value followed by the effect value. |
| accumulate | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | The effect and underlying values are combined. For animation types where the addition operation is not commutative, the order of the operands is the underlying value followed by the effect value. |


### 默认值 @default-value 
 `replace`






### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-composition)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.animation-composition)

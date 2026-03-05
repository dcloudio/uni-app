# UTSAndroidHookProxy

应用程序生命周期回调协议，此协议内的所有函数均由 app 调用，开发者可按需实现对应时机的回调函数。具体的使用方法[详见](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#hooksclass)

## 应用程序生命周期回调函数

### onCreate(application)

uts 插件创建时的回调。<br/>     对应原生 Application onCreate 函数

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| application | Application | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| x | 3.97 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| 3.97 |



### 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.platformObject.UTSAndroidHookProxy)

### uni.pageScrollTo(OBJECT)

将页面滚动到目标位置。

**OBJECT参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|scrollTop|Number|是|滚动到页面的目标位置（单位px）|
|duration|Number|否|滚动动画的时长，默认300ms，单位 ms|

**示例**

```javascript
uni.pageScrollTo({
	scrollTop: 0,
	duration: 300
});
```


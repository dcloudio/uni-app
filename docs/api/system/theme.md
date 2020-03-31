
### uni.onUIStyleChange(CALLBACK)
监听系统主题状态变化。

**CALLBACK 返回参数**

|参数|类型|说明|平台差异说明|
|:-|:-|:-|:-|
|style|String|主题名称(dark, light)|App2.6.5+ 仅iOS|

**示例**

```javascript
uni.onUIStyleChange(function (res) {
	console.log(res.style);
});
```

**注意**
- 自定义基座生效
- 仅 V3 编译支持，参考 manifest.json 配置
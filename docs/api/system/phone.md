### uni.makePhoneCall(OBJECT)
拨打电话。

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|phoneNumber|String|是|需要拨打的电话号码|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.makePhoneCall({
	phoneNumber: '114' //仅为示例
});
```


注：如需发短信，App端参考：[http://www.html5plus.org/doc/zh_cn/messaging.html](http://www.html5plus.org/doc/zh_cn/messaging.html)

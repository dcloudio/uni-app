### uni.addPhoneContact(OBJECT)
调用后，用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式（APP端目前没有选择步骤，将直接写入），写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加。

App平台提供了更多通讯录相关API，包括读取联系人，详见：[https://www.html5plus.org/doc/zh_cn/contacts.html](https://www.html5plus.org/doc/zh_cn/contacts.html)

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|√|√|x|x|

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|photoFilePath|String|否|头像本地文件路径|
|nickName|String|否|昵称|
|lastName|String|否|姓氏|
|middleName|String|否|中间名|
|firstName|String|是|名字|
|remark|String|否|备注|
|mobilePhoneNumber|String|否|手机号|
|weChatNumber|String|否|微信号|
|addressCountry|String|否|联系地址国家|
|addressState|String|否|联系地址省份|
|addressCity|String|否|联系地址城市|
|addressStreet|String|否|联系地址街道|
|addressPostalCode|String|否|联系地址邮政编码|
|organization|String|否|公司|
|title|String|否|职位|
|workFaxNumber|String|否|工作传真|
|workPhoneNumber|String|否|工作电话|
|hostNumber|String|否|公司电话|
|email|String|否|电子邮件|
|url|String|否|网站|
|workAddressCountry|String|否|工作地址国家|
|workAddressState|String|否|工作地址省份|
|workAddressCity|String|否|工作地址城市|
|workAddressStreet|String|否|工作地址街道|
|workAddressPostalCode|String|否|工作地址邮政编码|
|homeFaxNumber|String|否|住宅传真|
|homePhoneNumber|String|否|住宅电话|
|homeAddressCountry|String|否|住宅地址国家|
|homeAddressState|String|否|住宅地址省份|
|homeAddressCity|String|否|住宅地址城市|
|homeAddressStreet|String|否|住宅地址街道|
|homeAddressPostalCode|String|否|住宅地址邮政编码|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**回调结果**

|回调类型|errMsg|说明|
|:-|:-|:-|
|success|ok|添加成功|
|cancel|fail cancel|用户取消操作|
|fail|fail ${detail}|调用失败，detail 加上详细信息。|

**示例**

```javascript
uni.addPhoneContact({
	nickName: '昵称',
	lastName: '姓',
	firstName: '名',
	remark: '备注',
	mobilePhoneNumber: '114',
	weChatNumber: 'wx123',
	success: function () {
		console.log('success');
	},
	fail: function () {
		console.log('fail');
	}
});
```

**注意**

- 手机OS对通讯录访问有严格的权限限制和要求。在小程序中使用时，需注意微信等小程序载体本身已经获得了手机端的授权许可。
- 打包App时，云打包则需要在manifest中配置权限和模块，离线打包需自行在原生工程中配置。

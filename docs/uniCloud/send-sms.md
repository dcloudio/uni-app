接口形式：`uniCloud.sendSms`

发送短信功能需要去DCloud开发者中心开通，详情参考[使用短信服务](https://ask.dcloud.net.cn/article/37534)

**参数说明**

|参数名			|类型		|必填	|说明											|
|:-:				|:-:		|:-:	|:-:											|
|smsKey			|String	|是		|调用短信接口的密钥key		|
|smsSecret	|String	|是		|调用短信接口的密钥secret	|
|templateId	|String	|是		|模版Id，见下方说明				|
|phone			|String	|是		|用户手机号								|
|data				|Object	|是		|填充到模版的字段，					|

**参数data结构**

目前短信功能包括两个模版，暂不可自定义模版，模版形式如下。参数data内的字段会填充到模版内容里。

|模版Id						|模板内容																																														|
|:-:							|:-:																																																|
|`uniID_code`			|【uniID】“${name}”验证码：${code}，用于${action}，${expMinute}分钟内有效，请勿泄露并尽快验证。		|
|`uni_verify_code`|【uni验证】“${name}”验证码：${code}，用于${action}，${expMinute}分钟内有效，请勿泄露并尽快验证。	|

**上述模版对应的data结构为**

|参数名		|类型		|必填	|说明																|
|:-:			|:-:		|:-:	|:-:																|
|name			|String	|是		|应用名称，长度限制15								|
|code			|String	|是		|验证码串，长度限制6								|
|action		|String	|是		|验证码用途，长度限制6							|
|expMinute|String	|是		|验证码过期时间，单位分钟，长度限制2|

**返回值**

接口调用失败时会直接抛出错误，调用成功时才会有返回值

|参数名	|类型		|说明					|
|:-:		|:-:		|:-:					|
|success|Boolean|只会返回true	|

**调用示例**

```js
'use strict';
exports.main = async (event, context) => {
	const res = await uniCloud.sendSms({
		smsKey: '****************',
		smsSecret: '****************',
		templateId: 'uniID_code',
		phone: '188********',
		data: {
			name: 'DCloud',
			code: '123456',
			action: '注册',
			expMinute: '3',
		}
	})
	return res
};
```

**注意事项**

- data内如果有“测试”字样系统会判定为测试用，不会真正把短信发到指定的手机号，方便开发调试
- 在短信后台绑定uniCloud服务空间之后将会只允许绑定的服务空间调用此接口，绑定列表为空时表示不限制服务空间

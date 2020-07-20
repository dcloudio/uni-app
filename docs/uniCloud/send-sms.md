### 短信发送

uniCloud内置了短信发送API。给开发者提供方便、便宜的短信发送能力。

目前仅提供短信发送验证码能力，提供了2个模板可选，类似小程序的模板消息，在一个固定模板格式的文字里自定义某些字段，而不是所有文字都可以随便写。

后续视需求提供自助申请更多短信模板。

使用本功能需要在[DCloud开发者中心](https://dev.dcloud.net.cn/uniSms)开通并充值，教程参考[短信服务开通指南](https://ask.dcloud.net.cn/article/37534)

因涉及费用，为保障安全，本能力应该在云函数中调用，而不是在前端调用。

云函数API名称：`uniCloud.sendSms`

**参数说明**

参数结构体为json格式。

|参数名		|类型	|必填	|说明															|
|:-:		|:-:	|:-:	|:-:															|
|smsKey		|String	|是		|调用短信接口的密钥key，从 dev.dcloud.net.cn/uniSms 后台获取		|
|smsSecret	|String	|是		|调用短信接口的密钥secret，从 dev.dcloud.net.cn/uniSms 后台获取	|
|phone		|String	|是		|发送目标手机号，长度11位，仅支持中国大陆手机号，不能填写多个手机号，不能在前面添加+86前缀|
|templateId	|String	|是		|模版Id，短信内容为固定模板，详见下方说明						|
|data		|Object	|是		|模版里的各个字段，json格式										|

**参数data结构**

目前短信功能包括两个模版，暂不可自定义新模版，模版形式如下。参数data内的字段会填充到模版内容里。

|模版Id				|模板内容																							|
|:-:				|:-:																								|
|`uniID_code`		|【uniID】“${name}”验证码：${code}，用于${action}，${expMinute}分钟内有效，请勿泄露并尽快验证。	|
|`uni_verify_code`	|【uni验证】“${name}”验证码：${code}，用于${action}，${expMinute}分钟内有效，请勿泄露并尽快验证。	|

`uniID_code`模板为uni-ID业务专用。`uni_verify_code`模板为开发者自定义使用，比如在支付等高安全要求场景中使用。

模板中`${}`中的内容为自定义字段，在data中填写每个自定义字段后拼接成完整的短信内容。

**上述模版对应的data结构为**

|参数名		|类型	|必填	|说明								|
|:-:		|:-:	|:-:	|:-:								|
|name		|String	|是		|应用名称，长度限制15				|
|code		|String	|是		|验证码串，长度限制6，注意一般需要自行提供随机数并在数据库中存储以方便校验	|
|action		|String	|是		|验证码用途，长度限制6				|
|expMinute	|String	|是		|验证码过期时间，单位分钟，长度限制2位，即不超过99分钟。过期校验逻辑需自行开发|


**返回值**

接口调用失败时会直接抛出错误，调用成功时才会有返回值。

注意接口调用成功不代表短信发送成功，比如目标手机关机会导致短信发送失败。真实的短信发送成功与否请在[https://dev.dcloud.net.cn/uniSms](https://dev.dcloud.net.cn/uniSms)后台查看报表。

|参数名	|类型	|说明			|
|:-:	|:-:	|:-:			|
|success|Boolean|只会返回true	|

**调用示例**

```js
'use strict';
exports.main = async (event, context) => {
  try {
    const res = await uniCloud.sendSms({
      smsKey: '****************',
      smsSecret: '****************',
      phone: '188********',
      templateId: 'uniID_code',
      data: {
        name: 'DCloud',
        code: '123456',
        action: '注册',
        expMinute: '3',
      }
    })
    // 调用成功，请注意这时不代表发送成功
    return res
  } catch(err) {
    // 调用失败
    console.log(err.message)
    return {
      success: false,
      msg: err.message
    }
  }
};


// 如果不使用await
uniCloud.sendSms({
  smsKey: '****************',
  smsSecret: '****************',
  phone: '188********',
  templateId: 'uniID_code',
  data: {
    name: 'DCloud',
    code: '123456',
    action: '注册',
    expMinute: '3',
  }
}).then((res)=>{
  // 调用成功，请注意这时不代表发送成功
  console.log(res)
}).catch((err)=>{
  // 调用失败
  console.log(err.message)
})

```

本示例发送的短信，在手机上将显示为：
```
【uniID】“DCloud”验证码：123456，用于注册，3分钟内有效，请勿泄露并尽快验证。
```

**注意事项**

- data内如果有`测试`、`test`等字样，系统可能会被判定为测试用途，不会真正把短信下发到对应手机（此行为由运营商控制，可能真实发送，也可能不发送）
- 在[DCloud开发者中心](https://dev.dcloud.net.cn/uniSms)绑定`uniCloud`服务空间后，将会只允许绑定的服务空间调用此接口，绑定列表为空时表示不限制服务空间

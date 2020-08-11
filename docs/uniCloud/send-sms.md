**短信发送**

从HBuilderX 2.8.1起，uniCloud内置了短信发送API。给开发者提供更方便、更便宜的短信发送能力。

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
|phone		|String	|是		|发送目标手机号，暂仅支持中国大陆手机号，不能填写多个手机号|
|templateId	|String	|是		|模版Id，短信内容为固定模板，详见下方说明						|
|data		|Object	|是		|模版里的各个字段，json格式										|

**参数templateId说明**

目前短信功能包括如下模版，暂不可扩展新模版，模版形式如下。参数data内的字段会填充到模版内容里。

|模版Id				|模板内容																							|
|:-:				|:-:																								|
|`uniID_code`		|【uniID】“${name}”验证码：${code}，用于${action}，${expMinute}分钟内有效，请勿泄露并尽快验证。	|
|`uni_verify_code`	|【uni验证】“${name}”验证码：${code}，用于${action}，${expMinute}分钟内有效，请勿泄露并尽快验证。	|
|`uni_order_unpaid` |【uni订单通知】您在“${name}”的订单${orderNo}未支付，将在${minute}分钟后自动关闭，请及时完成订单|
|`uni_booking` |【uni预约通知】您已成功预订“${name}”提供的${service}。预约时间${dateTime}。注意事项：${notice}|
|`uni_order_shipped` |【uni订单通知】您在“${name}”的订单${orderNo}已发货，${expressCompany}单号${expressNo}，请注意签收|

`uniID_code`模板为uni-ID业务专用。`uni_verify_code`模板为开发者自定义使用，比如在支付等高安全要求场景中使用。

本地运行云函数时，需要`2.8.5+`版本的HBuilderX才可以使用`uni_order_unpaid`、`uni_booking`、`uni_order_shipped`三个模板，上传并运行不受HBuilderX版本影响。

模板中`${}`中的内容为自定义字段，在data中填写每个自定义字段后拼接成完整的短信内容。

**上述模版对应的data内参数限制如下**

所有参数中均不可包含`【`或`】`

|参数名					|类型		|长度限制		|说明																																									|
|:-:						|:-:		|:-:				|:-:																																									|
|name						|String	|长度最大15	|应用名称																																							|
|code						|String	|长度最大6	|验证码串，注意一般需要自行提供随机数并在数据库中存储以方便校验，只允许使用字母或数字	|
|action					|String	|长度最大6	|验证码用途																																						|
|expMinute			|String	|长度最大2	|验证码过期时间，单位分钟，即不超过99分钟。过期校验逻辑需自行开发											|
|orderNo				|String	|长度最大20	|订单号																																								|
|minute					|String	|长度最大2	|单位分钟，即不超过99分钟。																														|
|service				|String	|长度最大10	|-																																										|
|dateTime				|String	|长度最大18	|-																																										|
|notice					|String	|长度最大20	|-																																										|
|expressCompany	|String	|长度最大12	|-																																										|
|expressNo			|String	|长度最大20	|-																																										|

**返回值**

接口调用失败时会直接抛出错误，调用成功时才会有返回值。

注意接口调用成功不代表短信发送成功，比如目标手机关机会导致短信发送失败。真实的短信发送成功与否请在[https://dev.dcloud.net.cn/uniSms](https://dev.dcloud.net.cn/uniSms)后台查看报表。

|参数名	|类型	|说明			|
|:-:	|:-:	|:-:			|
|errCode|Number|成功返回0，调用失败错误码见下表	|
|errMsg|String|错误描述，调用失败时返回	|

**错误码说明**

|错误码	|错误																	|
|:-:		|:-:																	|
|10001	|参数校验未通过,errMsg内会给出详细信息|
|10002	|校验未通过,errMsg内会给出详细信息		|
|10003	|其他错误															|

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
    console.log(err.errCode)
    console.log(err.errMsg)
    return {
      code: err.errCode
      msg: err.errMsg
    }
  }
};

```

本示例发送的短信，在手机上将显示为：
```
【uniID】“DCloud”验证码：123456，用于注册，3分钟内有效，请勿泄露并尽快验证。
```

**注意事项**

- data内如果有`测试`、`test`等字样，系统可能会被判定为测试用途，不会真正把短信下发到对应手机（此行为由运营商控制，可能真实发送，也可能不发送）
- 在[DCloud开发者中心](https://dev.dcloud.net.cn/uniSms)绑定`uniCloud`服务空间后，将会只允许绑定的服务空间调用此接口，绑定列表为空时表示不限制服务空间
- 短信内容不可包含★、 ※、 →、 ●等特殊符号，可能会导致短信乱码
- 如果是用于用户注册的短信验证码，那么强烈推荐使用uni-id，这是一套云端一体的、完善的用户管理方案，已经内置封装好的短信验证码功能，详见：[https://ext.dcloud.net.cn/plugin?id=2116](https://ext.dcloud.net.cn/plugin?id=2116)
- Android手机在App端获取短信验证码，参考：[https://ask.dcloud.net.cn/article/676](https://ask.dcloud.net.cn/article/676)
- 短信内容超过70个字符时为长短信，需分条发送，每67个字按一条短信计算

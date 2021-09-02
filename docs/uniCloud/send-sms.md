**短信发送**

从HBuilderX 2.8.1起，uniCloud内置了短信发送API。给开发者提供更方便、更便宜的短信发送能力。

该服务类似小程序的模板消息，在一个固定模板格式的文字里自定义某些字段，而不是所有文字都可以随便写。

使用本功能需要在[DCloud开发者中心](https://dev.dcloud.net.cn/uniSms)开通并充值，教程参考[短信服务开通指南](https://ask.dcloud.net.cn/article/37534)

因涉及费用，为保障安全，本能力应该在云函数中调用，而不是在前端调用。

云函数API名称：`uniCloud.sendSms`

**参数说明**

参数结构体为json格式。

|参数名		|类型	|必填	|说明															|
|:-:		|:-:	|:-:	|:-:															|
|appid		|String	|是		|DCloud appid，可以在项目manifest.json内看到		|
|smsKey		|String	|是		|调用短信接口的密钥key，从 dev.dcloud.net.cn/uniSms 后台获取		|
|smsSecret	|String	|是		|调用短信接口的密钥secret，从 dev.dcloud.net.cn/uniSms 后台获取	|
|phone		|String	|是		|发送目标手机号，暂仅支持中国大陆手机号，不能填写多个手机号|
|templateId	|String	|是		|模版Id，短信内容为固定模板，详见下方说明（应用开发阶段，可以使用 DCloud 提供的测试模板）						|
|data		|Object	|是		|模版里的各个变量字段，json格式										|


**注意**

- 如果使用uni-id发送短信，请参考[uni-id发送短信验证码](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=sendsmscode)

#### 参数templateId说明@smstemplate

按照国家法律和运营商要求，每个要发送短信的应用，需要备案其短信模板，并且经过运营商的审核。通过审核的模板，会得到一个templateId。

短信内容规范：
1. 不能包含涉政、黄赌毒、暴力、房产、移民、贷款、代开发票等违法内容
2. 不能包含运营商禁止发送的内容
3. 不能包含侵犯第三方权益的内容（如侵犯他人商标或冒名行为）
4. 营销类短信不能违法广告法
5. 不能利用短信骚扰或诈骗用户

报备模板的方式：

1. 如果尚未添加签名，请在在开发者中心-[签名配置](https://dev.dcloud.net.cn/uniSms/sign)内添加签名
2. 在开发者中心-[模板配置](https://dev.dcloud.net.cn/uniSms/tmp)内申请自定义模板

- 短信签名：
即短信内容开头的【xxx】，可选内容为App或小程序名称、网站名称、企业名称（可使用简称，但需具备辨识度）、商标名称。如`【DCloud】`，即是DCloud官方发送短信的签名。签名的作用是明确告知用户该短信由什么样的主体发送。签名内容只允许包含中文、英文、数字，签名的长度限制为2-8位。

- 模板内容：
短信模板必然以短信签名作为开头，其内容中允许有一定的变量，以满足灵活性需求。变量用${}包裹。

例如：【hello uni-app】验证码：${code}，${expMinute}分钟内有效，请勿泄露并尽快验证。

在实际发送短信时，在短信API中传入该模板ID，然后传入合适的变量，最终发送的短信将变为：
`【hello uni-app】验证码：123465，用于注册，15分钟内有效，请勿泄露并尽快验证。`

- 短信类别：
分为3类，即验证码类短信、通知类短信、营销类短信。验证码类短信，其模板审核简单快速，只能单次发送。

**短信测试模板说明**

运营商目前审核比较严格，处于开发阶段的应用可能无法通过运营商的审核。为方便开发者测试短信功能，DCloud 提供了一个测试模板，该模板的templateId为：uni_sms_test，内容为：`【DC】尊敬的用户，您的验证码是：${code}。5分钟内有效，请尽快验证。请勿泄漏您的验证码。` **(注意:目前测试模板仅联通及电信用户可用)**

使用该模板的限制：

1. 每日最多给10个手机号发送不超过100条短信；
2. 使用该模板也会正常收取费用，请保证账户有充足余额。

<!--
目前短信功能包括如下模版，暂不可扩展新模版，模版形式如下。参数data内的字段会填充到模版内容里。

|模版Id				|模板内容																							|
|:-:				|:-:																								|
|`uniID_code`		|【uniID】“${name}”验证码：${code}，用于${action}，${expMinute}分钟内有效，请勿泄露并尽快验证。	|
|`uni_verify_code`	|【uni验证】“${name}”验证码：${code}，用于${action}，${expMinute}分钟内有效，请勿泄露并尽快验证。	|
|`uni_order_unpaid` |【uni订单通知】您在“${name}”的订单${orderNo}未支付，将在${minute}分钟后自动关闭，请及时完成订单|
|`uni_booking` |【uni预约通知】您已成功预订“${name}”提供的${service}。预约时间${dateTime}。注意事项：${notice}|
|`uni_order_shipped` |【uni订单通知】您在“${name}”的订单${orderNo}已发货，${expressCompany}单号${expressNo}，请注意签收|

`uniID_code`模板为uni-ID业务专用。如使用uniCloud的uni-id账户服务，无需自行开发代码调用本API，直接用uni-id即可，内置了注册和忘记密码的短信验证码服务。[详见](https://uniapp.dcloud.io/uniCloud/uni-id)

`uni_verify_code`模板为开发者自定义使用，如未使用uni-id，则可以使用本模板发送短信验证码，也可以在支付等需要再次验证身份的场景中使用。

本地运行云函数时，需要`2.8.5+`版本的HBuilderX才可以使用`uni_order_unpaid`、`uni_booking`、`uni_order_shipped`三个模板，上传并运行不受HBuilderX版本影响。

每个短信模板的商用均必须在运营商备案。上述模板之所以带有uni前缀，是因为它们是DCloud已经在运营商备案过的模板，这些模板开发者可以直接使用。

开发者若需自定义短信模板（包括去掉前面的uni前缀），则需要人工处理，再次向运营商备案。如有相关需求的开发者，可以发送申请邮件到service@dcloud.io，说明账户、预计发送量和新模板格式。
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

-->

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
      appid: '__UNI__xxxxxxx',
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
      code: err.errCode,
      msg: err.errMsg
    }
  }
};

```

本示例使用的模板为：
```
【uniID】“${name}”验证码：${code}，${expMinute}分钟内有效，请勿泄露并尽快验证。
```

本示例发送的短信，在手机上将显示为：
```
【uniID】“DCloud”验证码：123456，3分钟内有效，请勿泄露并尽快验证。
```

**注意事项**

- data内如果有`测试`、`test`等字样，系统可能会被判定为测试用途，不会真正把短信下发到对应手机（此行为由运营商控制，可能真实发送，也可能不发送）
- 在[DCloud开发者中心](https://dev.dcloud.net.cn/uniSms)绑定`uniCloud`服务空间后，将会只允许绑定的服务空间调用此接口，绑定列表为空时表示不限制服务空间
- 短信内容不可包含★、 ※、 →、 ●等特殊符号，可能会导致短信乱码
- 如果是用于用户注册的短信验证码，那么强烈推荐使用uni-id，这是一套云端一体的、完善的用户管理方案，已经内置封装好的短信验证码功能，详见：[https://uniapp.dcloud.net.cn/uniCloud/uni-id](https://uniapp.dcloud.net.cn/uniCloud/uni-id)。
- 发送短信如果需要图形验证码来防止机刷，可以使用[uni-captcha图形验证码](https://ext.dcloud.net.cn/plugin?id=4048)。在云端一体登录模板中已经集成了uni-id、uni-captcha，详见：[https://ext.dcloud.net.cn/plugin?id=13](https://ext.dcloud.net.cn/plugin?id=13)
- Android手机在App端获取短信验证码，参考：[https://ask.dcloud.net.cn/article/676](https://ask.dcloud.net.cn/article/676)
- 短信内容超过70个字符时为长短信，需分条发送，每67个字按一条短信计算
- 如果本地运行提示`不支持的模板ID`，请更新到`2.9.9+`版本的HBuilderX 

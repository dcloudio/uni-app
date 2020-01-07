#### 统计

从uni-app 2.2.3起，支持uni统计。一张报表，掌握全端数据。业务介绍详见[https://tongji.dcloud.net.cn](https://tongji.dcloud.net.cn)

自定义事件是统计中不可获取的功能。开发者可通过本API自定义上报统计数据，如统计登录、注册、点击某个按钮，我们都可以称之为自定义事件。

##### uni.report( eventName , options)

**参数说明**

|参数			|类型							|描述																|
|---			|---							|---																|
|eventName|String						|事件名称，最大长度不超过 255 个字符     |
|options	|String 、 Object	|事件参数														  |

Tips
- eventName 为 String 类型，并且字符长度必须小于255 
- options 为 String 类型时，字符长度必须小于255 
- options 为 Object 类型时，该对象的值只能为 String 类型 
- 字符串支持特殊字符但不包括（英文逗号 , 英文冒号 : 点 .）
- eventName 为 `title` 时为内容标题上报，用户不能自定义。此时数据会展现在uni统计的首页-内容统计及左侧导航的内容统计中。方便查看内容页数据。
- 用户在使用 `uni.login()` 会执行登录事件，不携带参数。如果如需上报携带具体参数的数据，需要手动调用 `uni.report('login',{...})`
- 用户在使用 `uni.share()` 或触发 `onShareAppMessage` 会执行分享事件，不携带参数。如果如需上报携带具体参数的数据，需要手动调用 `uni.report('share',{...})`
- 用户在使用 `uni.requestPayment()` 会执行支付事件，不携带参数。如果如需上报携带具体参数的数据，需要手动调用 `uni.report('pay_success',{...})` 和 `uni.report('pay_fail',{...})`

**示例**

```javascript
// 内容统计
// 当 eventName 为 title 时，options 只能为 String 类型
uni.report('title','首页')

// 登录
uni.report('login',{
  'name':'uni-app',
  'age':'21',
  // ...
})

// 分享
uni.report('share','分享')

// 支付成功
uni.report('pay_success','支付成功')
// or
uni.report('pay_success',{
  "订单金额":'20元',
  "订单名称":'鼠标',
  // ...
})

// 支付失败
uni.report('pay_fail','支付失败')
// or
uni.report('pay_fail',{
  "订单金额":'20元',
  "订单名称":'鼠标',
  // ...
})

// 注册
uni.report('register',{
  'name':'uni-app',
  'age':'21',
  // ...
})

// 搜索
uni.report('search','搜索内容')
// or
uni.report('search',{
  '内容':'搜索内容'
})

```

自定义事件上报后，在统计后台的`事件和转换`栏目中，可以看到上报的事件情况。

**TIPS:**
- 小程序平台，需将`tongji.dcloud.net.cn`配入域名白名单，[详见](https://ask.dcloud.net.cn/article/36298)
- uni统计使用教程：[https://ask.dcloud.net.cn/article/36303](https://ask.dcloud.net.cn/article/36303)

除了官方的uni统计，如果开发者还需要调用小程序平台的自定义统计，给小程序的后台上报数据，那么需使用条件编译，在各端调用此自己的API。

##### 微信小程序平台：
- 数据上报：[wx.reportMonitor](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/report/wx.reportMonitor.html)
- 数据分析：[wx.reportAnalytics](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/data-analysis/wx.reportAnalytics.html)

##### 支付宝小程序平台：
- 自定义分析数据的上报接口：[my.reportAnalytics](https://docs.alipay.com/mini/api/report)

##### 百度小程序平台：
- 数据分析：[swan.reportAnalytics](https://smartprogram.baidu.com/docs/develop/api/data/#swan-reportAnalytics/)

##### 头条小程序平台：
- [reportAnalytics](https://developer.toutiao.com/dev/cn/mini-app/develop/open-capacity/data-analysis/reportanalytics)

##### QQ小程序平台：
- 数据上报：[qq.reportMonitor](https://q.qq.com/wiki/develop/miniprogram/API/open_port/port_dataup.html)
- 数据分析：[qq.reportAnalytics](https://q.qq.com/wiki/develop/miniprogram/API/open_port/port_dataanalysis.html#qq-reportanalytics)

##### App平台的友盟统计：
- 友盟统计：[开发规范](http://www.html5plus.org/doc/zh_cn/statistic.html)，[配置文档](https://ask.dcloud.net.cn/article/74)

### uni.request(OBJECT)
发起网络请求。

> 在各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。

**OBJECT 参数说明**

|参数名|类型|必填|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|url|String|是||开发者服务器接口地址||
|data|Object/String/ArrayBuffer|否||请求的参数|5+App（自定义组件编译模式）不支持ArrayBuffer类型|
|header|Object|否||设置请求的 header，header 中不能设置 Referer。||
|method|String|否|GET|有效值详见下方说明||
|dataType|String|否|json	|如果设为 json，会尝试对返回的数据做一次 JSON.parse||
|responseType|String|否|text	|设置响应的数据类型。合法值：text、arraybuffer|5+App和支付宝小程序不支持|
|success|Function|否||收到开发者服务成功返回的回调函数||
|fail|Function|否||接口调用失败的回调函数||
|complete|Function|否||接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**method 有效值**

必须大写，有效值在不同平台差异说明不同。

|method|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|GET|√|√|√|√|√|√|
|POST|√|√|√|√|√|√|
|PUT|√|√|√|x|√|√|
|DELETE|√|√|√|x|√|x|
|CONNECT|√|√|√|x|x|x|
|HEAD|√|√|√|x|√|x|
|OPTIONS|√|√|√|x|√|x|
|TRACE|√|√|√|x|x|x|

**success 返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|data|Object/String/ArrayBuffer|开发者服务器返回的数据|
|statusCode|Number|开发者服务器返回的 HTTP 状态码|
|header|Object|开发者服务器返回的 HTTP Response Header|

**data 数据说明**

最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String。转换规则如下：

- 对于 ``GET`` 方法，会将数据转换为 query string。例如 ``{ name: 'name', age: 18 }`` 转换后的结果是 ``name=name&age=18``。
- 对于 ``POST`` 方法且 ``header['content-type']`` 为 ``application/json`` 的数据，会进行 JSON 序列化。
- 对于 ``POST`` 方法且 ``header['content-type']`` 为 ``application/x-www-form-urlencoded`` 的数据，会将数据转换为 query string。 

**示例**

```javascript
uni.request({
    url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
    data: {
        text: 'uni.request'
    },
    header: {
        'custom-header': 'hello' //自定义请求头信息
    },
    success: (res) => {
        console.log(res.data);
        this.text = 'request success';
    }
});
```

**返回值**

如果希望返回一个 `requestTask` 对象，需要至少传入 success / fail / complete 参数中的一个。例如：

```javascript
var requestTask = uni.request({
	url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
	complete: ()=> {}
});
requestTask.abort();
```

如果没有传入 success / fail / complete 参数，则会返回封装后的 Promise 对象：[Promise 封装](/api/README?id=promise-%E5%B0%81%E8%A3%85)

通过 `requestTask`，可中断请求任务。

**requestTask 对象的方法列表**

|方法|参数|说明|
|:-|:-|:-|
|abort||中断请求任务|
|offHeadersReceived||取消监听 HTTP Response Header 事件，仅`微信小程序平台`支持，[文档详情](https://developers.weixin.qq.com/miniprogram/dev/api/RequestTask.offHeadersReceived.html)|
|onHeadersReceived||监听 HTTP Response Header 事件。会比请求完成事件更早，仅`微信小程序平台`支持，[文档详情](https://developers.weixin.qq.com/miniprogram/dev/api/RequestTask.onHeadersReceived.html)|

**示例**

```javascript
const requestTask = uni.request({
	url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
	data: {
        name: 'name',
        age: 18
	},
	success: function(res) {
		console.log(res.data);
	}
});

// 中断请求任务
requestTask.abort();
```

**Tips**

- 请求的 ``header`` 中 ``content-type`` 默认为 ``application/json``。
- 网络请求的 ``超时时间`` 可以统一在 ``manifest.json`` 中配置 [networkTimeout](/collocation/manifest?id=networktimeout)。
- H5 端本地调试需注意跨域问题，参考：[调试跨域问题解决方案](https://ask.dcloud.net.cn/article/35267)
- 注意由于百度小程序iOS客户端，请求失败时会进入fail回调，需要针对百度增加相应的处理以解决该问题。
- 注意非 H5 端不支持 cookie，服务器应避免验证 cookie。如果服务器无法修改，也可以使用一些模拟手段，比如这样的工具[https://github.com/charleslo1/weapp-cookie](https://github.com/charleslo1/weapp-cookie)
- 按照 W3C 规范，H5 端无法获取 response header 中 Set-Cookie、Set-Cookie2 这2个字段，对于跨域请求，允许获取的 response header 字段只限于“simple response header”和“Access-Control-Expose-Headers”（[详情](https://www.w3.org/TR/cors/#access-control-allow-credentials-response-header)）
- [uni-app 插件市场](https://ext.dcloud.net.cn/search?q=%E6%8B%A6%E6%88%AA%E5%99%A8)有flyio、axios等三方封装的拦截器可用
- 低版本手机自身不支持 ipv6，如果服务器仅允许 ipv6，会导致老手机无法正常运行或访问速度非常慢
- localhost、127.0.0.1等服务器地址，只能在电脑端运行，手机端连接时不能访问。请使用标准IP并保证手机能连接电脑网络
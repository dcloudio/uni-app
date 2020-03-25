### uni.onPageNotFound(funciton callback)

监听应用要打开的页面不存在事件。该事件与 `App.onPageNotFound` 的回调时机一致

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|√|

#### 参数

**function callback**

要打开的页面不存在事件的回调函数

#### 参数

|属性|类型|说明|
|:-:|:-:|:-:|
|path|String|不存在页面的路径 (代码包路径)|
|query|Object|打开不存在页面的 query 参数|
|isEntryPage|Boolean|是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面）	|

**注意**
- 开发者可以在回调中进行页面重定向，但必须在回调中同步处理，异步处理（例如 `ssetTimeout` 异步执行）无效。
- 若开发者没有调用 `uni.onPageNotFound` 绑定监听，也没有声明 `App.onPageNotFound`，当跳转页面不存在时，将推入客户端原生的页面不存在提示页面。
- 如果回调中又重定向到另一个不存在的页面，将推入客户端原生的页面不存在提示页面，并且不再第二次回调。
- 在除了 `App.vue` 的其他时机中调用 `uni.onPageNotFound` 的话，需要用uni.offPageNotFound取消监听，否则会出现监听多次的情况

### uni.onError(funciton callback)

监听小程序错误事件。如脚本错误或 `API` 调用报错等。该事件与 `App.onError` 的回调时机与参数一致。

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|√|√|

#### 参数

**function callback**

应用错误事件的回调函数

#### 参数
**string error**

错误信息，包含堆栈

### uni.onAppShow(function callback)

监听应用切前台事件。该事件与 `App.onShow` 的回调参数一致。

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|√|√|√|

**支付宝小程序使用说明：**

- 由于开发者工具版本限制，目前本 API 暂不支持在开发者工具调试和真机调试，仅支持真机预览。开发者请调至 预览 模式，在支付宝客户端扫码查看效果。
- 请勿使用 API 监听匿名函数，否则将无法关闭监听。

#### 参数

**function callback**

应用切前台事件的回调函数

#### 参数

|属性|类型|说明|平台差异说明|
|:-:|:-:|:-:|:-:|
|path|String|应用切前台的路径 (代码包路径)||
|scene|Number|应用切前台的场景值||
|query|Object	|应用切前台的 query 参数||
|shareTicket|String	|shareTicket|微信小程序|
|referrerInfo|String|来源信息||
|entryType|String|页面展现的来源标识，可取的值为: 'user'、'schema'、'sys'，对应代表的意义如下表。|百度小程序 2.10.7+|
|appURL|String|展现时的调起协议，仅当entryType值为 schema 时存在。|百度小程序 2.10.7+|
|entryDataHash|String|群入口信息，通过群应用商店打开、群分享卡片打开的小程序可获得。|qq小程序|

**referrerInfo 的结构**

|属性|类型|说明|平台差异说明|
|:-:|:-:|:-:||
|appId|String|来源小程序的appId||
|extraData|Object|来源小程序传过来的数据|微信小程序和qq小程序 scene=1037或1038时支持|

### uni.onAppHide(function callback)

监听应用切后台事件。该事件与 `App.onHide` 的回调参数一致。

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|√|√|√|

**支付宝小程序使用说明：**

- 由于开发者工具版本限制，目前本 API 暂不支持在开发者工具调试和真机调试，仅支持真机预览。开发者请调至 预览 模式，在支付宝客户端扫码查看效果。
- 请勿使用 API 监听匿名函数，否则将无法关闭监听。

#### 参数

**function callback**

应用切后台事件的回调函数

### uni.offPageNotFound(function callback)

取消监听应用要打开的页面不存在事件。

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|√|

#### 参数

**function callback**

应用要打开的页面不存在事件的回调函数

### uni.offError(funciton callback)

取消监听应用错误事件。

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|√|√|

#### 参数

**function callback**

应用错误事件的回调函数

### uni.offAppShow(function callback)

取消监听小程序切前台事件。

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|√|√|√|

#### 参数

**function callback**

应用切前台事件的回调函数

### uni.offAppHide(function callback)

取消监听小程序切后台事件。

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|√|√|√|

#### 参数

**function callback**

应用切后台事件的回调函数

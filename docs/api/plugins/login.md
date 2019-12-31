### uni.login(OBJECT)
登录

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|√|√|√|√|

H5平台登陆注意事项：
- 微信内嵌浏览器运行H5版时，可通过js sdk实现微信登陆，需要引入一个单独的js，[详见](https://ask.dcloud.net.cn/article/35380)
- 普通浏览器上实现微信登陆，并非开放API，需要向微信申请，仅个别开发者有此权限
- H5平台的其他登陆，比如QQ登陆、微博登陆，uni-app未封装，请在条件编译里按普通H5写法编写。

**OBJECT 参数说明**

|参数名|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|provider|String|否|登录服务提供商，通过 [uni.getProvider](/api/plugins/provider) 获取，如果不设置则弹出登录列表选择界面||
|scopes|String/Array|见平台差异说明|授权类型，默认 auth_base。支持 auth_base（静默授权）/ auth_user（主动授权） / auth_zhima（芝麻信用）|支付宝小程序|
|timeout|Number|否|超时时间，单位ms|微信小程序、百度小程序|
|success|Function|否|接口调用成功的回调||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**success 返回参数说明**

|参数名|说明|
|:-|:-|
|authResult|登录服务商提供的登录信息，服务商不同返回的结果不完全相同|
|errMsg|描述信息|

各个平台的登录流程存在差异，详细请参考相关平台的文档说明：

* [微信小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
* [支付宝小程序用户授权](https://docs.alipay.com/mini/introduce/auth)
* [百度小程序登录](https://smartprogram.baidu.com/docs/develop/api/open_log/#%E6%8E%88%E6%9D%83%E6%B5%81%E7%A8%8B%E8%AF%B4%E6%98%8E/)
* [头条小程序登录](https://developer.toutiao.com/dev/cn/mini-app/develop/open-capacity/log-in/login)
* [Apple登录、苹果登录、Sign in with Apple](https://ask.dcloud.net.cn/article/36651)


**示例**

```javascript
uni.login({
  provider: 'weixin',
  success: function (loginRes) {
    console.log(loginRes.authResult);
  }
});
```


### uni.checkSession
检查登录状态是否过期

> 1.6.0 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|√|√|

|属性|类型|必填|说明|
|:-|:-|:-|:-|
|success|function|否|接口调用成功的回调函数|
|fail|function|否|接口调用失败的回调函数|
|complete|function|否|接口调用结束的回调函数（调用成功、失败都会执行）|


### uni.getUserInfo(OBJECT)

获取用户信息。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|√|√|√|√|

**注意：** 微信小程序端，在用户未授权过的情况下调用此接口，不会出现授权弹窗，会直接进入 fail 回调（详见[《微信小程序公告》](https://developers.weixin.qq.com/community/develop/doc/0000a26e1aca6012e896a517556c01)）。在用户已授权的情况下调用此接口，可成功获取用户信息。

**OBJECT 参数说明**

|参数名|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|provider|String|否|登录服务提供商，通过 uni.getProvider 获取||
|withCredentials|Boolean|否|是否带上登录态信息。|微信小程序、头条小程序|
|lang|String|否|指定返回用户信息的语言，默认为 en。更多值请参考下面的说明。|微信小程序|
|timeout|Number|否|超时时间，单位 ms。|微信小程序|
|success|Function|否|接口调用成功的回调||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**lang 值说明**

|值|说明|
|:-|:-|
|zh_CN|简体中文|
|zh_TW|繁体中文|
|en|英文|

**注意：**在小程序 withCredentials 为 true 时或是在 App 调用 uni.getUserInfo，要求此前有调用过 uni.login 且登录态尚未过期。

**success 返回参数说明**

|参数|类型|说明|平台差异说明|
|:-|:-|:-||
|userInfo|OBJECT|用户信息对象||
|rawData|String|不包括敏感信息的原始数据字符串，用于计算签名。||
|signature|String|使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息。|微信小程序、头条小程序|
|encryptedData|String|包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法。|微信小程序、头条小程序|
|iv|String|加密算法的初始向量，详细见加密数据解密算法。|微信小程序、头条小程序|
|errMsg|String|描述信息|&nbsp;|

**userInfo 参数说明**

|参数|类型|说明|平台差异说明|
|:-|:-|:-||
|nickName|String|用户昵称||
|openId|String|该服务商唯一用户标识|App|
|avatarUrl|String|用户头像|&nbsp;|

除了以上三个必有的信息外，不同服务供应商返回的其它信息会存在差异。

#### App端登陆的扩展说明

App端还支持更多登陆相关API，如`logout`，[详见](https://www.html5plus.org/doc/zh_cn/oauth.html)

App端登陆相关的SDK需要在manifest中配置：
1. 打开 manifest.json -> App模块权限配置，勾选 OAuth(登陆鉴权)。
2. 打开 manifest.json -> App SDK配置，查看到登陆鉴权。在说明中有蓝色链接，其中包括向微信、QQ、微博等平台申请sdk的链接。
3. 向微信、QQ、微博等平台申请到sdk的信息后，回填到manifest里。
4. 这些配置需要打包生效，真机运行仍然是HBuilder基座的设置，可使用[自定义基座包](http://ask.dcloud.net.cn/article/12723)。离线打包请参考离线打包文档在原生工程中配置。
5. 配置并打包后，通过`uni.getProvider`可以得到配置的结果列表，注意这里返回的是manifest配置的，与手机端是否安装微信、QQ、微博无关。

如果手机端未安装QQ、微博，调用时会启动这些平台的wap页面登陆，如果已安装相应客户端，会启动它们的客户端登陆。

**示例**

```javascript
uni.login({
  provider: 'weixin',
  success: function (loginRes) {
    console.log(loginRes.authResult);
    // 获取用户信息
    uni.getUserInfo({
      provider: 'weixin',
      success: function (infoRes) {
        console.log('用户昵称为：' + infoRes.userInfo.nickName);
      }
    });
  }
});
```

#### App端集成其他登陆SDK如支付宝、淘宝、facebook登陆的说明
1. 使用原生插件方式，可以集成三方sdk，原生插件开发文档见[https://ask.dcloud.net.cn/article/35428](https://ask.dcloud.net.cn/article/35428)。开发之前可以先去[插件市场](https://ext.dcloud.net.cn/)看下有没有做好的。
2. 支付宝登陆、淘宝登陆在插件市场均有插件，[支付宝登陆](https://ext.dcloud.net.cn/search?q=%E6%94%AF%E4%BB%98%E5%AE%9D%E7%99%BB%E9%99%86)、[淘宝登陆](https://ext.dcloud.net.cn/search?q=%E7%99%BE%E5%B7%9D)。
3. 也可以内嵌web-view组件，使用web登陆模式集成这些三方登陆

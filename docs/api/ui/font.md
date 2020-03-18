### uni.loadFontFace(Object object)

动态加载字体。

注意: 

1. 引入中文字体，体积过大时会发生错误，建议抽离出部分中文，减少体积，或者用图片替代
2. 微信小程序端只支持网络字体，字体链接必须是https。App支持网络或本地的字体（本地字体需使用[平台绝对路径](http://www.html5plus.org/doc/zh_cn/io.html#plus.io.convertLocalFileSystemURL)）。
3. 微信小程序端字体链接必须是同源下的，或开启了cors支持，微信小程序的域名是servicewechat.com
4. canvas等原生组件不支持使用接口添加的字体
5. 工具里提示 Faild to load font可以忽略

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|1.9.0+ [自定义组件编译模式](https://ask.dcloud.net.cn/article/35843)|2.3.4+|基础库 2.1.0+|x|x|x|x|

**参数说明**

|属性|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|family|String||是|定义的字体名称|
|source|String||是|字体资源的地址。建议格式为 TTF 和 WOFF，WOFF2 在低版本的iOS上会不兼容。|
|desc|Object||否|可选的字体描述符|
|success|Function||否|接口调用成功的回调函数|
|fail|Function||否|接口调用失败的回调函数|
|complete|Function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

**Object.desc 的结构**

|属性|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|style|String|normal|否|字体样式，可选值为 normal / italic / oblique|
|weight|String|normal|否|字体粗细，可选值为 normal / bold / 100 / 200../ 900|
|variant|String|normal|否|设置小型大写字母的字体显示文本，可选值为 normal / small-caps / inherit|

**代码示例**

```javascript
uni.loadFontFace({
  family: 'Bitstream Vera Serif Bold',
  source: 'url("https://sungd.github.io/Pacifico.ttf")',
  success() {
	  console.log('success')
  }
})
```

**Tips**

插件市场有加载字体的例子：[https://ext.dcloud.net.cn/plugin?id=954](https://ext.dcloud.net.cn/plugin?id=954)

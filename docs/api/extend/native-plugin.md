### uni.requireNativePlugin(PluginName)

引入 App 原生插件。

平台差异说明：

* App

自 HXuilderX1.4 版本起，``uni-app`` 支持引入原生插件，使用方式如下：

```javascript
const PluginName = uni.requireNativePlugin(PluginName); // PluginName 为原生插件名称
```

不管是vue文件还是nvue文件，都是这个API。

下面以原生插件 [DCloud-RichAlert](https://ext.dcloud.net.cn/plugin?id=36) 为例，介绍如何使用此API。

1. 在 ``uni-app`` 项目工程中添加插件：从 [http://ext.dcloud.net.cn/plugin?id=36](http://ext.dcloud.net.cn/plugin?id=36) 下载 DCloud-RichAlert.zip ，解压到 ``uni-app`` 项目根目录下的 ``nativeplugins`` 目录（如不存在则创建），添加后目录结构为：![ uni-app](https://img-cdn-qiniu.dcloud.net.cn/uploads/article/20181226/10cd9e6a19769b9543e0a0eda2c66696.png)
2. 在页面引入原生插件，``uni.requireNativePlugin`` 使用后返回一个对象：
```javascript
const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert')
```
3. 使用原生插件
```javascript
dcRichAlert.show({
        position: 'bottom',
        title: "提示信息",
        titleColor: '#FF0000',
        content: "<a href='https://uniapp.dcloud.io/' value='Hello uni-app'>uni-app</a> 是一个使用 Vue.js 开发跨平台应用的前端框架!\n免费的\n免费的\n免费的\n重要的事情说三遍",
        contentAlign: 'left',
        checkBox: {
            title: '不再提示',
            isSelected: true
        },
        buttons: [{
            title: '取消'
        }, {
            title: '否'
        }, {
            title: '确认',
            titleColor: '#3F51B5'
        }]
}, result => {
        console.log(result)
});
```


**注意事项：**

1. 插件来源为 [插件市场](http://ext.dcloud.net.cn/?cat1=5)，或自己开发的插件，Android插件开发参考：[https://ask.dcloud.net.cn/article/35416](https://ask.dcloud.net.cn/article/35416)，iOS插件开发参考：[https://ask.dcloud.net.cn/article/35415](https://ask.dcloud.net.cn/article/35415)；
2. 不支持真机运行原生插件，仅支持云端打包运行或使用自定义基座运行；
3. 如果插件需要传递文件路径，则需要传手机文件的绝对路径，可使用 5+ [IO模块](http://www.html5plus.org/doc/zh_cn/io.html) 的相关 API 得到文件的绝对路径。
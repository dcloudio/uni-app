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

**注意**

- 只有免费插件可以下载到本地（不推荐），

1. 购买或下载uni-app原生插件
 
在 ``uni-app`` 项目工程中添加插件：从 [http://ext.dcloud.net.cn/plugin?id=36](http://ext.dcloud.net.cn/plugin?id=36) 购买或下载原生增强提示框插件。

- 选择购买时需选择需要使用原生插件的包名，只有免费插件支持下载到本地。如需云端打包，推荐直接购买。购买成功之后可以在项目内选择购买的插件，如下图：

![选择原生插件](https://img-cdn-qiniu.dcloud.net.cn/uploads/article/20190416/1b5297e695ad1536ddafe3c834e9c297.png)

- 如果选择下载，解压到 `uni-app` 项目根目录下的 `nativeplugins` 目录（如不存在则创建），添加后目录结构如下

![uni-app](https://img-cdn-qiniu.dcloud.net.cn/uploads/article/20181226/10cd9e6a19769b9543e0a0eda2c66696.png)

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

1. 可以在 [插件市场](https://ext.dcloud.net.cn/?cat1=5&cat2=51) 查看更多插件，如需开发uni原生插件请参考 [uni原生插件开发文档](https://nativesupport.dcloud.net.cn/NativePlugin/README)。
2. 集成原生插件后，需要提交云端打包或制作自定义基座运行才会生效，不支持直接在内置基座运行。
3. 如果插件需要传递文件路径，则需要传手机文件的绝对路径，可使用 5+ [IO模块](http://www.html5plus.org/doc/zh_cn/io.html) 的相关 API 得到文件的绝对路径。
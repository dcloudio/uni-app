#### 配置微信小程序插件

#### 注意事项

* 正式开始使用微信小程序插件之前需先在微信公众平台 -> 第三方设置 -> 插件管理处添加插件
* 要保证项目内微信小程序appid和申请插件的微信小程序appid一致插件才可使用

#### 引入插件代码包

使用插件之前开发者需要在``manifest.json``中的``mp-weixin``内声明使用的插件，具体配置参照所用插件的开发文档

**代码示例**

```
"plugins": {
    "pluginName": {
        "version": "1.0.0",
        "provider": "wxidxxxxxxxxxxxxxxxx"
    }
}
```

#### 在分包内引入插件代码包

如果插件只在（同一个插件不能被多个分包同时引用）一个分包用到，可以单独配置到分包中，这样插件不会随主包加载，开发者可以在``pages.json``的[subPackages](/collocation/pages?id=subpackages)中声明插件

**代码示例**

```
"subPackages": [{
    "root": "pagesA",
    "pages": [{
        "path": "list/list"
    }]
    "plugins": {
        "pluginName": {
            "version": "1.0.0",
            "provider": "wxidxxxxxxxxxxxxxxxx"
        }
    }
}]
```

**在分包内使用插件的限制**

* 仅能在这个分包内使用该插件；
* 同一个插件不能被多个分包同时引用；
* 不能从分包外的页面直接跳入分包内的插件页面，需要先跳入分包内的非插件页面、再跳入同一分包内的插件页面。

#### 在页面中使用

请参照[微信小程序-使用插件](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html)

#### 可能遇到的问题

* 某些插件可能会需要一些权限才能正常运行，请在``manifest.json``中的``mp-weixin``内配置``permission``[详见](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#permission)
* 微信开发工具提示 “插件版本不存在”，可能是插件开发文档示例代码中使用的版本已经不存在，请在声明插件处更改版本





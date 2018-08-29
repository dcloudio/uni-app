# UNI-APP 登录模板

![](https://img-cdn-qiniu.dcloud.net.cn/7E6B79E2-B469-4CF3-8F4D-7502E72C4CB8.png?imageView2/0/w/375)
![](https://img-cdn-qiniu.dcloud.net.cn/659AE293-95F8-46E1-AC1F-D62FE3B080DB.png?imageView2/0/w/375)

## 运行方式
将项目拖入[HbuilderX](http://www.dcloud.io/hbuilderx.html),直接运行即可

## 特点
* 兼容微信小程序和APP
* 适用于强制登录和非强制登录应用场景
* 使用vuex管理登录状态
* 包含账户密码登录和第三方登录方式（微信、微博、QQ）

## 注意事项
* 只能首页包含tab，如需强制登录，可以在首页检测登录状态并跳转登录页面
* 页面初始化完毕后马上跳转页面可能会失败，暂时可以延迟执行
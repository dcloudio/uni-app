## 创建uniCloud项目
  
  - 在`HBuilderX`创建uni-app项目时勾选`启用uniCloud`
  - 在右侧选择服务供应商（目前支持腾讯云和阿里云）
  - **服务提供商为阿里云时，暂不支持发行到H5端，后续会完善安全域名配置**

![创建uniCloud项目](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/create-project.png)

## 创建服务空间

  - 在云函数目录`cloudfunctions`右键菜单创建服务空间

![创建服务空间](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/create-space.png)

**说明**

- 如果未进行实名认证，这时会跳转至实名认证页面进行实名认证，等待实名认证审核之后可以开通服务空间
- 创建服务空间可能需要几分钟的时间，可以在控制台查看是否创建完成

## 体验uniCloud

`uniCloud`项目创建完成之后，开发者可以在`cloudfunctions`目录右键创建云函数。

**注意**

- 不同项目使用同一个服务空间时，不可使用同名云函数，可以在uniCloud控制台手动删除重名云函数释放函数名。

## FAQ

- Q:H5端出现跨域问题如何处理？ 
- A:运行到H5端时，可以参考 [Chrome 跨域插件免翻墙安装](https://ask.dcloud.net.cn/article/35267) 或 [firefox跨域插件](https://addons.mozilla.org/zh-CN/firefox/addon/access-control-allow-origin/)。发行到H5端时，可以在uniCloud控制台`用户管理-->登录设置`里配置`WEB安全域名`。


**注意**

- 服务提供商为腾讯云时，需要开发者手动去管理控制台开启匿名登录[详情](/uniCloud/authentication#匿名登录)


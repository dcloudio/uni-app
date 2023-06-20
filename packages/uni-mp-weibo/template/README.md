---
title: uniapp-to-weibo
category: runtime
subCategory: develop_framework
tag: 开发
date: 2023-05-22 10:00:00
---

```当前能力为内测 beta 版，欢迎体验提出意见，我们会积极跟进改进```

> 本指南主要是适用已有 uni-app 小程序项目的团队

- 接入前准备
- 快速开始

### 接入前准备
下载并安装[微博 IDE](https://console.lite.weibo.cn/wbox-doc/develop/guide/%E5%87%86%E5%A4%87/ide/index.html)。

### 将已有 uniapp 项目编译到微博微服务 IDE 中
- 1、 联系微博微服务开发同学获取 `uni-app-to-weibo` 项目，用来将uni-app 项目编译成微博微服务。
- 2、 进入 uni-app-to-weibo 项目根目录安装依赖：执行 `npm install`
- 3、 将 uni-app 项目编译成微博微服务：执行 `npm run build:weibo`
- 4、 编译完成后，在微博IDE中打开 `uni-app-to-weibo/dist/build/mp-weibo` 中的项目，并安装项目依赖：执行 `npm install`
- 5、 根据[微博微服务接入流程](https://console.lite.weibo.cn/wbox-doc/start/%E6%8E%A5%E5%85%A5%E5%BE%AE%E6%9C%8D%E5%8A%A1/prepare-wbox/)，获取 appid。并将 `mp-weibo/wbox.config.json` 中的 `appId` 换成自己的真实appId。后根据微博微服务文档[调试](https://console.lite.weibo.cn/wbox-doc/develop/guide/%E5%87%86%E5%A4%87/debug-wbox-new/index.html)、[发布](https://console.lite.weibo.cn/wbox-doc/develop/guide/%E5%87%86%E5%A4%87/publish-wbox-new/index.html)微服务即可。




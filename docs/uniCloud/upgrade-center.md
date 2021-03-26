# 升级中心  uni-upgrade-center

### uni-upgrade-center Admin后台管理。[插件地址](https://ext.dcloud.net.cn/plugin?id=4470)

### uni-upgrade-center-app 前台检查升级插件。[插件地址](https://ext.dcloud.net.cn/plugin?id=4542)

### 概述

> 统一管理App及App在`Android`、`iOS`平台上`App安装包`和`wgt资源包`的发布升级

### 基于uniCloud的App升级中心，本插件具有如下特征：
  - 云端基于uniCloud云函数实现

  - 数据库遵循opendb规范

  - 遵循uniCloud Admin框架规范，可直接导入Admin项目中
  
  - 支持App整包升级及wgt资源包升级

### 为什么需要升级中心？
  我们一直致力于为用户提供通用功能统一解决方案，比如unipay、uni-id等。
  
  为了解决开发者维护多个App升级繁琐，重复逻辑过多，管理不便的问题，升级中心应运而生。

  提供了简单、易用、统一的App管理、App版本管理、安装包发布管理，升级检测更新管理。
  
  功能页面致力于让开发者一看即懂，一触即会，一用即值。

### 使用
我们将升级中心分为两个部分：`uni-upgrade-center Admin管理后台`和`uni-upgrade-center-app前台检测更新`。

#### uni-upgrade-center Admin管理后台
提供了如下功能：
  - 应用管理，对App的信息记录和应用版本管理

  - 版本管理，可以发布新版，也可方便直观的对当前App历史版本以及线上发行版本进行查看、编辑和删除操作

  - 版本发布信息管理，包括 更新标题，更新内容，版本号，静默更新，强制更新，灵活上线发行 的设置和修改

  - 原生App安装包，发布Apk更新，用于App的整包更新，可设置是否强制更新

  - wgt资源包，发布wgt更新，用于App的热更新，可设置是否强制更新，静默更新

  - App管理列表及App版本记录列表搜索

在插件市场安装，根据readme部署即可。[插件地址](https://ext.dcloud.net.cn/plugin?id=4470)

#### uni-upgrade-center-app前台检测更新
提供了如下功能：
  - 基于`uni-upgrade-center`一键式检查更新，统一整包与wgt资源包更新

  - 自行根据传参完成校验，判断此次更新使用哪种方式

在插件市场安装，根据readme部署即可。[插件地址](https://ext.dcloud.net.cn/plugin?id=4542)
# uniCloud admin 基础框架

### 什么是 uniCloud Admin

uniCloud admin 基础框架，是基于 uni-app 和 uniCloud 的应用后台管理框架。HBuilder X 2.9.5+ 支持，请更新到最新版本使用。

- 它使用 uni-app 的宽屏适配，可自动适配 PC 宽屏和手机各端。了解[宽屏适配](https://uniapp.dcloud.io/adapt)
- 它基于 uniCloud，是 serverless 的云开发。了解[uniCloud](https://uniapp.dcloud.io/uniCloud/README)
- 它基于 uni-id，admin 框架使用的是 uni-id 的用户账户、权限系统。了解[uni-id](https://uniapp.dcloud.io/uniCloud/uni-id)

### 内置的功能

- 管理员账户初始化、登录、修改密码
- 顶部 topWindow 的设置：比如 logo 更换、右上角部分链接更换。详见项目根目录的`admin.config.js`文件
- 左侧 leftWindow 的菜单设置：菜单包括两类，一类是动态菜单，具备业务和权限功能；另一类是静态菜单，不会根据登录用户角色变化
- 开发模式下的 debug 功能，帮助开发者及时发现报错和搜索错误信息，可在`admin.config.js`文件中配置

> uniCloud Admin 是一个框架，具体业务需要开发者自己开发或从插件市场导入相关插件

### PC 和移动端上的 UI 表现

<div class="flex-img-group-view" style="padding-right: 30px">
    <div class="clear-style barcode-view">
        <div class="barcode-img-box">
            <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/9303c360-11f1-11eb-b680-7980c8a877b8.png" width="75%" />
        </div>
        <p style="text-algin: center; width: 75%">PC端</p>
    </div>
    <div class="clear-style barcode-view">
        <div class="barcode-img-box">
            <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/2766a010-11d7-11eb-8bd0-2998ac5bbf7e.png" width="375" />
        </div>
        <p>移动端</P>
    </div>
</div>

### 使用

#### 创建

[HBuilderX](https://www.dcloud.io/hbuilderx.html) 2.9.5+版本新建 uni-app 项目，选择 uniCloud admin 项目模板，如下图

![download-admin](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/d5fdccf0-11f2-11eb-b244-a9f5e5565f30.png)

创建完成后，可以跟随`云服务空间初始化向导`初始化项目，创建并绑定云服务空间

![download-admin](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/2baaddd0-11f5-11eb-81ea-f115fe74321c.png)

#### 运行

1. 进入 admin 项目
2. 右键 cloudfuntions 运行云服务空间初始化向导（如已创建并绑定云服务空间，则跳过此步）
3. 点击工具栏的运行 -> 运行到浏览器
4. 登录页面底部进入创建管理员页面（仅允许注册一次管理员账号）

### 目录结构

```bash
├── cloudfunctions              # 云函数
├── common
│   │── uni.css                 # 公共样式
│   └── uni-icons.css           # icon样式
├── components                  # 自定义组件
├── js_sdk                      # js sdk
├── pages                       # 页面
│   │── index                   # 首页
│   └── login                   # 登录页
├── static
├── store                       # vuex
├── windows
│   └── leftWindow.vue          # 左侧窗口（菜单栏）
│   └── topWindow.vue           # 顶部窗口（导航栏）
├── admin.config.js             # 系统配置（配置导航，菜单等）
├── App.vue
├── main.js
├── mainfest.json
├── pages.json
├── postcss.config.js           # postcss 配置（浏览器兼容性）
└── uni.scss
```

### 登录页

首次使用，可以通过登录页面底部链接创建一个超级管理员（仅允许创建一次），注册完毕后，建议从登录页面移除该链接

![login](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/69674be0-1501-11eb-81ea-f115fe74321c.png)

### admin 窗体结构介绍

登录后我们会看到如下窗体, 窗体分为三个部分，topWindow 顶部窗口（导航栏），leftwindow 左侧窗口（菜单栏），右侧的内容主窗体

![index](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/27f0ae00-1500-11eb-880a-0db19f4f74bb.image)

#### 顶部窗口（导航栏）

1. 通过 [admin.config.js](https://github.com/dcloudio/uni-template-admin/blob/master/admin.config.js) 配置导航栏内容

```js
export default {
  // 导航栏
  navBar: {
    // 如上图 topWindow 左侧 Logo
    logo:
      "https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/unicloudlogo.png",
    // 右侧链接
    links: [
      {
        text: "Admin框架文档",
        url: "https://uniapp.dcloud.net.cn/uniCloud/admin"
      },
      {
        text: "浏览更多Admin插件",
        url: "https://ext.dcloud.net.cn/?cat1=7&cat2=74"
      }
    ]
  }
};
```

2. 通过 [uni.scss](https://github.com/dcloudio/uni-template-admin/blob/master/uni.scss) 配置导航栏样式

```css
$top-window-bg-color: #fff; /* 背景色 */
$top-window-text-color: #999; /* 文字颜色 */
```

#### 左侧窗口（菜单栏）

左侧窗口内主要是菜单，菜单包含静态菜单和动态菜单，支持无限层级嵌套，但建议层级不要超过三级

- 静态菜单: 所有登录用户角色都能看到
- 动态菜单: 根据角色的权限自动生成

  > 用户登录时，会根据用户的 _角色_ 去查找其拥有的 _权限_ ，再根据 _权限_ 去查找对应的 _菜单_

##### 管理静态菜单

通过 [admin.config.js](https://github.com/dcloudio/uni-template-admin/blob/master/admin.config.js) 配置侧边栏内容，所有用户都能看到静态菜单。

```js
export default {
  // 侧边栏
  sideBar: {
    // 配置静态菜单列表（放置在用户被授权的菜单列表下边）
    staticMenu: [
      {
        _id: "demo",
        name: "静态功能演示",
        icon: "uni-icons-list",
        children: [
          {
            _id: "icons",
            name: "图标",
            url: "/pages/demo/icons/icons"
          },
          {
            _id: "table",
            name: "表格",
            url: "/pages/demo/table/table"
          }
        ]
      }
    ]
  }
};
```

##### 管理动态菜单

在云后台数据库的 `opendb-admin-menu` 表中管理菜单， 对菜单增删改查。如下图：

![add-menu](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/aa7adb00-152a-11eb-81ea-f115fe74321c.png)

例如，如需增加如下菜单：

```bash
订单管理 （_id: order）                  # 父菜单
└── 手机 （_id: phone）                  # 子菜单
```

1. 添加父菜单

菜单的 `parent_id` 字段为空, 即为一级菜单

> tips: 如无子菜单，或子菜单`url` 字段为空，则不能在页面显示

```json
{
  "_id": "order",
  "name": "订单管理",
  "icon": "uni-icons-cart-filled",
  "url": "",
  "sort": 1000,
  "parent_id": "",
  "permission": [],
  "status": 1
}
```

2. 添加子菜单

将子菜单的 `parent_id` 指向父菜单的 `_id`即可，孙菜单就是将子菜单的 `_id` 当做父菜单

> tips: 子菜单下没有子孙菜单，必须配置 `url` 字段，否则不能在页面显示

```json
{
  "_id": "phone",
  "name": "手机",
  "icon": "uni-icons-phone",
  "url": "/phone",
  "sort": 1001,
  "parent_id": "order",
  "permission": [],
  "status": 1
}
```

##### 侧边栏样式管理

通过 [uni.scss](https://github.com/dcloudio/uni-template-admin/blob/master/uni.scss) 配置侧边栏样式

> 调整菜单颜色时，只需设置菜单背景色 `$menu-bg-color`，自行搭配文字前景色即可

```css
$left-window-bg-color: #fff; /* 左侧窗口背景色 */
$menu-bg-color: #fff; /* 一级菜单背景色 */
$sub-menu-bg-color: darken($menu-bg-color, 8%); /* 二级以下菜单背景色 */
$menu-bg-color-hover: darken($menu-bg-color, 15%); /* 菜单 hover 背景颜色 */
$menu-text-color: #333; /* 菜单前景色 */
$menu-text-color-actived: #409eff; /* 菜单激活前景色 */
```

#### 右侧窗口（内容主窗体)

右侧窗口是内容主窗体，和 uni-app 保持一致，用户登录后看到的第一个页面，默认是 pages 数组中第一项表示应用启动页，可在 page.json 调整启动页。

### icon 图标的使用

admin 内置了一套图标以供使用，开发者也可以使用第三方图标

#### 使用内置 icon

前往静态功能演示-图标菜单中，点击图标即可复制图标代码

> `<view class="uni-icons-gear"></view>`

或直接在标签上使用图标的 class 名称，即：

> `class='uni-icons-gear'`

#### 使用第三方 icon

以使用 elementUI 的图标为例，在 `app.vue` 中应用图标库的样式文件：

```javascript
<style>
  /* 注意此处仅为 icon 使用示例，建议引入纯净图标库，避免增加不必要的 css */
  @import 'https://unpkg.com/element-ui/lib/theme-chalk/index.css';
</style>
```

在标签上使用图标的 class 名称，即：

> `<view class="el-icon-s-tools"></view>`

### 用户系统

> 基于 [uni-id](https://uniapp.dcloud.io/uniCloud/uni-id) 用户登录

### 权限系统

> 基于 [uni-id](https://uniapp.dcloud.io/uniCloud/uni-id?id=rbac-api) 角色权限, uni-id 是 uniCloud 之上的用户账户、权限系统

1. 角色表 `uni-id-roles`
   > [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=%e8%a7%92%e8%89%b2%e8%a1%a8)
2. 权限表 `uni-id-permissions`
   > [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=%e6%9d%83%e9%99%90%e8%a1%a8)
3. 菜单表 `opendb-admin-menu`

   | 字段         | 类型      | 必填 | 描述                                                 |
   | :----------- | :-------- | :--- | :--------------------------------------------------- |
   | \_id         | Object ID | 是   | 系统自动生成的 Id                                    |
   | name         | String    | 是   | 菜单文字                                             |
   | icon         | String    | 否   | 菜单图标                                             |
   | url          | String    | 否   | 菜单对应的页面链接（只有没有子菜单的菜单项可以配置） |
   | sort         | Integer   | 否   | 在同级菜单中的排序，数组越大越靠后                   |
   | parent_id    | String    | 否   | 父级菜单 Id                                          |
   | permission   | Array     | 否   | 菜单权限（只有没有子菜单的菜单项可以配置）           |
   | status       | Integer   | 是   | 菜单状态：0 禁用 1 启用                              |
   | created_date | Timestamp | 是   | 创建时间                                             |

4. 用户表 `uni-id-users`
   > [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=%e7%94%a8%e6%88%b7%e8%a1%a8)
5. 验证码表 `uni-verify`
   > [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=%e7%94%a8%e6%88%b7%e8%a1%a8)
6. 权限验证

admin 提供了两个内置方法，方便在页面中鉴定登录用户权限和角色:

| 方法             | 作用                       | 入参   | 返回值  |
| :--------------- | :------------------------- | :----- | :------ |
| `$hasPermission` | 鉴定登录用户是否具有某权限 | String | Boolean |
| `$hasRole`       | 鉴定登录用户是否具有某角色 | String | Boolean |

```html
<template>
  <view>
    <!-- 包含 user/add 权限的用户可以看到新增按钮 -->
    <button v-if="$hasPermission('user/add')">新增</button>
    <!-- 包含 admin 角色的用户可以看到删除按钮 -->
    <button v-if="$hasRole('admin')">删除</button>
  </view>
</template>
```

### 新增页面

新增页面可以自己开发页面，也可以从插件市场下载插件。页面如需添加菜单，参见上文的[菜单管理](#静态菜单和动态菜单)。

- 可以新增普通的页面，在前端 callfunction，后台搭配云函数操作
- 可以使用 uni-clientdb，在前端直接操作数据库，后台配置 db schema 进行权限和格式校验
- 可以使用云函数单文件路由，在项目中默认包含了一个[uni-cloud-router](https://uniapp.dcloud.io/uniCloud/uni-cloud-router) 的单文件路由，也可以使用插件市场的其他单文件路由

#### 自己开发页面

admin 中开发页面，和 uni-app 开发 vue 页面是一致的。

#### 从插件市场下载插件，怎么注册菜单进去

以[uniCloud admin 管理项目-权限管理插件](https://ext.dcloud.net.cn/plugin?id=3269)

_使用步骤:_

1. 从[插件市场](https://ext.dcloud.net.cn/)导入插件
2. 在 HBuilder X 2.9.5 中选择添加插件的项目
3. 覆盖项目的 db_init.json 文件, 点击“确定覆盖”
4. 在 db_init.json 文件上右键，点击“初始化云数据库”
5. 刷新 admin 即可在菜单栏看到新增的菜单

### 插件开发

我们不仅是插件的使用者，也可以是插件的开发者，那么如何开发一款插件呢？

#### 如何开发插件

插件就是项目中的一项功能，例如[uniCloud admin 管理项目-权限管理插件](https://ext.dcloud.net.cn/plugin?id=3269)，对于 admin 项目来说，可以项目中开发完成功能，再将这项功能剥离成一个插件。其他开发者使用插件的过程，就是将插件还原成项目中一项功能。

_插件的目录结构：_

```bash
├── cloudfunctions
│   └── db_init.json            # 云函数
├── js_sdk                      # js sdk
├── pages                       # 页面
│   └── index                   # 你的页面
└── pages.json
```



#### 如何发布插件

将插件发布到[插件市场](https://ext.dcloud.net.cn/)， 登录后看到如下界面：

![publish-plugin](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/abd19160-152a-11eb-81ea-f115fe74321c.png)

admin 相关的插件必须发到，``uniCloud`` 分类的 ``Admin 插件`` 下：

![plugin-class](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/ab2e7390-152a-11eb-880a-0db19f4f74bb.png)

### 使用三方组件库

uniCloud Admin 支持所有三方的 Vue UI 库，包括 elementUI 等非 uni-app 的 UI 库，但注意这些 for h5 的 ui 库只能在浏览器中使用，无法适配 App 和小程序，按如下操作。

以使用 element-ui 框架为例：

1. 安装 UI 框架

   > npm i element-ui -S

2. 在 main.js 中引用

   ```javascript
   import elementUI from "element-ui";
   import "element-ui/lib/theme-chalk/index.css";

   Vue.use(elementUI);
   ```

# uniCloud admin 基础框架

### 什么是 uniCloud admin

uniCloud admin 基础框架，是基于 uni-app 和 uniCloud 的应用后台管理框架。HBuilderX 2.9.5+ 支持，请更新到最新版本使用。

- 它使用 uni-app 的宽屏适配，可自动适配 PC 宽屏和手机各端。了解[宽屏适配](https://uniapp.dcloud.io/adapt)
- 它基于 uniCloud，是 serverless 的云开发。了解[uniCloud](https://uniapp.dcloud.io/uniCloud/README)
- 它基于 uni-id，admin 框架使用的是 uni-id 的用户账户、权限系统。了解[uni-id](https://uniapp.dcloud.io/uniCloud/uni-id)

### 内置的功能

- 管理员账户初始化、登录、修改密码
- 顶部 topWindow 的设置：比如 logo 更换、右上角部分链接更换。详见项目根目录的`admin.config.js`文件
- 左侧 leftWindow 的菜单设置：菜单包括两类，一类是动态菜单，具备业务和权限功能；另一类是静态菜单，不会根据登录用户角色变化
- 开发模式下的 debug 功能，帮助开发者及时发现报错和搜索错误信息，可在`admin.config.js`文件中配置

> uniCloud admin 是一个框架，具体业务需要开发者自己开发或从插件市场导入相关插件

### 支持响应式布局

uniCloud admin 同时支持 PC 端 和移动端。

PC 端如下图：

![pc](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/c2a69410-15db-11eb-880a-0db19f4f74bb.png)

移动端如下图：

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/2766a010-11d7-11eb-8bd0-2998ac5bbf7e.png" width="375"/>

### 使用

#### 创建

[HBuilderX](https://www.dcloud.io/hbuilderx.html) 2.9.5+版本新建 uni-app 项目，选择 uniCloud admin 项目模板，如下图

![download-admin](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/c2085840-15db-11eb-880a-0db19f4f74bb.png)

创建完成后，可以跟随`云服务空间初始化向导`初始化项目，创建并绑定云服务空间

![download-admin](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/2baaddd0-11f5-11eb-81ea-f115fe74321c.png)

#### 运行

1. 进入 admin 项目
2. 在/cloudfunctions-aliyun/common/uni-id/config.json 文件中填写 `passwordSecret` 字段 (用于加密密码入库的密钥) 和 `tokenSecret` 字段 (为生成token需要的密钥)
3. 右键 cloudfuntions 运行云服务空间初始化向导（如已创建并绑定云服务空间，则跳过此步）
4. 点击工具栏的运行 -> 运行到浏览器
5. 登录页面底部进入创建管理员页面（仅允许注册一次管理员账号）

__注意__：

- 在 HBuilderX 中运行需在插件市场在安装 [sass插件](https://ext.dcloud.net.cn/plugin?id=2046)
- 手机端报 ``request：fail``，需要去云服务空间的``跨域配置``配置跨域域名，需带端口

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
│   │── component               # 项目中使用的组件
│   │── leftWindow.vue          # 左侧窗口（菜单栏）
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

首次使用，可以通过登录页面底部链接创建一个超级管理员（仅允许创建一次），该接口会判断系统里如果有admin角色的用户,就不再允许添加新的超级管理员。

> 注意：注册完毕后，建议从登录页面移除该链接

![login](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/c3f33850-15db-11eb-8ff1-d5dcf8779628.png)

### 分栏窗体介绍

登录后我们会看到如下窗体, 窗体分为三个部分，topWindow 顶部窗口（导航栏），leftwindow 左侧窗口（菜单栏），右侧的内容主窗体

![index](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/c3591b30-15db-11eb-8ff1-d5dcf8779628.png)

#### 顶部窗口（导航栏）

顶部窗口默认在左侧展示系统Logo、右侧显示导航链接，效果如上图。展示内容可通过项目根目录下的`admin.config.js`文件进行配置，如下为示例：

```js
# admin.config.js
export default {
  navBar: {// 顶部导航
    logo:"https://www.example.com/logo.png",//左侧 Logo
    links: [ // 右侧链接
      {
        text: "Admin框架文档",
        url: "https://uniapp.dcloud.net.cn/uniCloud/admin",
      },
      {
        text: "浏览更多Admin插件",
        url: "https://ext.dcloud.net.cn/?cat1=7&cat2=74",
      }
    ],
  },
};
```
顶部导航栏的样式，可通过项目根目录下的`uni.scss`进行自定义，如下：

```css
# uni.scss
$top-window-bg-color: #fff; /* 背景色 */
$top-window-text-color: #999; /* 文字颜色 */
```

#### 左侧窗口（菜单栏）

左侧窗口内主要是菜单，菜单包含静态菜单和动态菜单，支持无限层级嵌套，但建议层级不要超过三级

- 静态菜单: 所有登录用户角色都能看到
- 动态菜单: 根据角色的权限自动生成

  > 用户登录时，会根据用户的 _角色_ 去查找其拥有的 _权限_ ，再根据 _权限_ 去查找对应的 _菜单_

##### 管理静态菜单

通过 [admin.config.js](https://github.com/dcloudio/uniCloud-admin/blob/master/admin.config.js) 配置侧边栏内容，所有用户都能看到静态菜单。

```js
export default {
  // 侧边栏
  sideBar: {
    // 配置静态菜单列表（放置在用户被授权的菜单列表下边）
    staticMenu: [
      {
        menu_id: "demo",
        name: "静态功能演示",
        icon: "uni-icons-list",
        children: [
          {
            menu_id: "icons",
            name: "图标",
            url: "/pages/demo/icons/icons",
          },
          {
            menu_id: "table",
            name: "表格",
            url: "/pages/demo/table/table",
          }
        ]
      },
    ],
  },
};
```

##### 管理动态菜单

在云后台数据库的 `opendb-admin-menus` 表中管理菜单， 对菜单增删改查。如下图：

![add-menu](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/aa7adb00-152a-11eb-81ea-f115fe74321c.png)

_菜单字段解释:_

| 字段        | 类型      | 必填 | 描述                                                 |
| :---------- | :-------- | :--- | :--------------------------------------------------- |
| menu_id     | Object ID | 是   | 菜单 Id                                    |
| name        | String    | 是   | 菜单文字                                             |
| icon        | String    | 否   | 菜单图标                                             |
| url         | String    | 否   | 菜单对应的页面链接（只有没有子菜单的菜单项可以配置） |
| sort        | Integer   | 否   | 在同级菜单中的排序，数组越大越靠后                   |
| parent_id   | String    | 否   | 父级菜单 Id                                          |
| permission  | Array     | 否   | 菜单权限（只有没有子菜单的菜单项可以配置）           |
| enable | Boolean | 是 | 菜单状态：false 禁用 true 启用 |
| create_date | Timestamp | 是   | 创建时间                                             |

_添加菜单记录需要注意：_

- 无子菜单，则需 `url` 字段不能为空，该菜单才能在页面显示
- 有子菜单，则需至少一个子菜单的 `url` 字段不能为空，该菜单才能在页面显示

例如，如需增加如下菜单：

```bash
订单管理                  # 父菜单
└── 手机                 # 子菜单
```

**step 1:**添加一条父菜单记录

菜单的 `parent_id` 字段为空, 即为一级菜单

```json
{
  "menu_id": "order",
  "name": "订单管理",
  "icon": "uni-icons-cart-filled",
  "url": "",
  "sort": 2,
  "parent_id": "",
  "permission": [],
  "enable": true,
  "create_date": "1602662469396"
}
```

**step 2:**添加一条子菜单记录

将子菜单的 `parent_id` 指向父菜单的 `menu_id`即可，孙菜单就是将子菜单的 `menu_id` 当做父菜单

```json
{
  "menu_id": "phone",
  "name": "手机",
  "icon": "uni-icons-phone",
  "url": "pages/phone",
  "sort": 3,
  "parent_id": "order",
  "permission": [],
  "enable": true,
  "create_date": "1602662469492"
}
```

##### 侧边栏样式管理

通过 [uni.scss](https://github.com/dcloudio/uniCloud-admin/blob/master/uni.scss) 配置侧边栏样式

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

右侧窗口是内容主窗体，和 uni-app 保持一致，用户登录后看到的第一个页面，默认是 pages 数组中第一项表示应用启动页。

如果想将自己开发的页面调到登录后首页，可在 page.json 调整。

### icon 图标

admin 框架内置了一套icon图标，在静态功能演示-图标菜单中，点击图标即可复制图标的class定义，或者直接到`common/uni-icons.css`中查看定义，然后以如下方式使用：

```
<view class="uni-icons-gear"></view>
```

当然，你也可以使用三方icon库。以使用 `elementUI` 的图标为例，在 `app.vue` 中导入图标库的样式文件：

```javascript
<style>
  /* 注意此处仅为 icon 使用示例，建议引入纯净图标库，避免增加不必要的 css */
  @import 'https://unpkg.com/element-ui/lib/theme-chalk/index.css';
</style>
```

在标签上使用图标的 class 名称，即：
```
<view class="el-icon-s-tools"></view>
```

### 用户-角色-权限

uniCloud admin 框架基于 uni-id，复用 uni-id 的用户、角色、权限系统，详见[uni-id](https://uniapp.dcloud.io/uniCloud/uni-id)。

需要注意的是，admin框架的动态菜单同样依赖uni-id的权限表（uni-id-permissions）。

菜单表(opendb-admin-menus)定义如下：

| 字段 | 类型 | 必填 | 描述 |
| :--------- | :-------- | :--- | :--------------------------------------------------- |
| menu_id | Object ID | 是 | 菜单 Id |
| name | String | 是 | 菜单文字 |
| icon | String | 否 | 菜单图标 |
| url | String | 否 | 菜单对应的页面链接（只有没有子菜单的菜单项可以配置） |
| sort | Integer | 否 | 在同级菜单中的排序，数组越大越靠后 |
| parent_id | String | 否 | 父级菜单 Id |
| permission | Array | 否 | 菜单权限（只有没有子菜单的菜单项可以配置） |
| enable | Boolean | 是 | 菜单状态：false 禁用 true 启用 |
| create_date | Timestamp | 是 | 创建时间 |

admin 提供了两个内置方法，方便在页面中鉴定登录用户权限和角色:

| 方法             | 作用                       | 入参   | 返回值  |
| :--------------- | :------------------------- | :----- | :------ |
| `$hasPermission` | 鉴定登录用户是否具有某权限 | String | Boolean |
| `$hasRole`       | 鉴定登录用户是否具有某角色 | String | Boolean |

```html
<template>
  <view>
    <!-- 包含 user/add 权限的用户可以看到新增按钮 -->
    <button v-if="$hasPermission('USER_ADD')">新增</button>
    <!-- 包含 admin 角色的用户可以看到删除按钮 -->
    <button v-if="$hasRole('admin')">删除</button>
  </view>
</template>
```

### 新增页面

新增页面可以自己开发页面，也可以从插件市场下载插件。页面如需添加菜单，参见上文的[菜单管理](#静态菜单和动态菜单)。

开发页面不局限开发方式：

- 可以新增普通的页面，在前端 callfunction，后台搭配云函数操作
- 可以使用 uni-clientdb，在前端直接操作数据库，后台配置 db schema 进行权限和格式校验
- 可以使用云函数单文件路由，在项目中默认包含了一个[uni-cloud-router](https://uniapp.dcloud.io/uniCloud/uni-cloud-router) 的单文件路由，也可以使用插件市场的其他单文件路由

> 注意：在搭配云函数操作，controller 下的文件夹和文件，不要命名相同，例如：app/room 这个写法目前分辨不了 `app` 是文件 `app.js`，还是文件夹 `app`

#### 自己开发页面

admin 中开发页面，和 uni-app 开发 vue 页面是一致的。

#### 从插件市场下载插件，并注册到 admin 菜单

以[uniCloud admin 管理项目-权限管理插件](https://ext.dcloud.net.cn/plugin?id=3269)为例

_使用步骤:_

1. 从[插件市场](https://ext.dcloud.net.cn/)导入插件
2. 在 HBuilder X 2.9.5 中选择添加插件的项目
3. 覆盖项目的 db_init.json 文件, 点击“确定覆盖”
4. 在 db_init.json 文件上右键，点击“初始化云数据库”
5. 刷新 admin 即可在菜单栏看到新增的菜单

---------------------------------- 分割线 ----------------------------------------

### 插件开发

我们不仅是插件的使用者，也可以是插件的开发者，那么如何开发一款插件呢？参考 [DCloud 插件开发指南汇总](https://ask.dcloud.net.cn/article/35408) 及其中的 `admin 插件`部分.

### 使用三方组件库

uniCloud admin 支持所有三方的 Vue UI 库，包括 elementUI 等非 uni-app 的 UI 库，但注意这些 for h5 的 ui 库只能在浏览器中使用，无法适配 App 和小程序，按如下操作。

以使用 element-ui 框架为例：

1. 安装 UI 框架

   > npm i element-ui -S

2. 在 main.js 中引用

   ```javascript
   import elementUI from "element-ui";
   import "element-ui/lib/theme-chalk/index.css";

   Vue.use(elementUI);
   ```

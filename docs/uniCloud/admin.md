# uniCloud admin 基础框架

### 什么是uniCloud Admin

uniCloud admin 基础框架，是基于uni-app和uniCloud的应用后台管理框架。HBuilder X 2.9.5+ 支持，请更新到最新版本使用。

- 它使用uni-app的宽屏适配，可自动适配PC宽屏和手机各端。了解[宽屏适配](https://uniapp.dcloud.io/adapt)
- 它基于uniCloud，是serverless的云开发。了解[uniCloud](https://uniapp.dcloud.io/uniCloud/README)
- 它基于uni-id，admin 框架使用的是 uni-id 的用户账户、权限系统。了解[uni-id](https://uniapp.dcloud.io/uniCloud/uni-id)

> 它只是一个框架，具体业务需要开发者自己开发或从插件市场导入相关插件

### uniCloud Admin内置的功能包括：

- 管理员账户初始化、登录、修改密码
- 顶部topWindow的设置：比如logo更换、右上角部分链接更换。详见项目根目录的`admin.config.js`文件
- 左侧leftWindow的菜单设置：菜单包括两类，一类是动态菜单，具备业务和权限功能，在数据库的`opendb-admin-menu`表中增加删除菜单；另一类是静态菜单，不会根据登录用户角色变化，在项目根目录的`admin.config.js`文件中配置
- 开发模式下的 debug 功能，帮助开发者及时发现报错和搜索错误信息，可在`admin.config.js`文件中配置

### PC 宽屏和移动端上的 UI 表现

<div class="flex-img-group-view" style="padding-right: 30px">
    <div class="clear-style barcode-view">
        <div class="barcode-img-box">
            <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/9303c360-11f1-11eb-b680-7980c8a877b8.png" width="75%" />
        </div>
        <p style="text-algin: center; width: 75%">PC端</p>
    </div>
    <div class="clear-style barcode-view">
        <div class="barcode-img-box">
            <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/2766a010-11d7-11eb-8bd0-2998ac5bbf7e.png" />
        </div>
        <p>移动端</P>
    </div>
</div>

### 使用

#### 创建

[HBuilderX](https://www.dcloud.io/hbuilderx.html) 2.9.5+版本新建 uni-app 项目，选择 uniCloud admin 项目模板，如下图

![download-admin](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/d5fdccf0-11f2-11eb-b244-a9f5e5565f30.png)

创建完成后，可以跟随``云服务空间初始化向导``初始化项目，创建并绑定云服务空间

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
│   └── uni.css                 # 公共样式
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

### 登录后跳转配置

1. 通过 [admin.config.js](https://github.com/dcloudio/uni-template-admin/blob/master/admin.config.js) 登录后跳转地址的配置

```js
export default {
    launch_path: '/pages/index/index', // 登录后跳转至的页面地址（若配置为空，则自动跳转至左侧菜单第一个页面）
};

### 顶部窗口（导航栏）

1. 通过 [admin.config.js](https://github.com/dcloudio/uni-template-admin/blob/master/admin.config.js) 配置导航栏内容

```js
export default {
    // 导航栏
    navBar: {
        // 左侧 Logo
        logo: "/static/logo.png",
        // 右侧链接
        links: [
            {
                text: "项目文档",
                url:
                    "https://github.com/dcloudio/uni-template-admin/blob/master/README.md",
            },
        ],
    },
};
```

2. 通过 [uni.scss](https://github.com/dcloudio/uni-template-admin/blob/master/uni.scss) 配置导航栏样式

```css
$top-window-bg-color: #fff; /* 背景色 */
$top-window-text-color: #999; /* 文字颜色 */
```

### 左侧窗口（菜单栏）

#### 静态菜单和动态菜单

- 菜单包括两类，一类是动态菜单，具备业务和权限功能
    > 动态菜单的逻辑: 用户登录时，会根据用户的*角色*去查找其拥有的*权限*，在根据*权限*去查找对应的*菜单*
- 另一类是静态菜单，不会根据登录用户角色变化

#### 管理静态菜单

通过 [admin.config.js](https://github.com/dcloudio/uni-template-admin/blob/master/admin.config.js) 配置侧边栏内容，所有用户都能看到静态菜单。


```js
export default {
    // 侧边栏
    sideBar: {
        // 配置静态菜单列表（放置在用户被授权的菜单列表下边）
        staticMenu: [{
            _id: 'demo',
            name: '系统设置',
            icon: 'el-icon-menu',
            children: [{
                _id: 'table',
                name: '用户',
                url: '/pages/demo/table/table'
            }]
        }, {
            _id: 'app',
            name: '应用管理',
            icon: 'el-icon-menu',
            children: [{
                _id: 'table',
                name: '表格',
                url: '/pages/demo/table/table'
            }]
        }],
    },
};
```

#### 管理动态菜单

在云后台数据库的 `opendb-admin-menu` 表中管理菜单， 对菜单增删改查。如下图：

![add-menu](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/85da1640-147a-11eb-899d-733ae62bed2f.png)

增加如下菜单：例如

```bash
订单管理 （_id: order）                  # 父菜单
└── 食物 （_id: food）                  # 子菜单
```

1. 添加父菜单

菜单的 `parent_id` 字段为空, 即为一级菜单

> tips: 如无子菜单，或子菜单`url` 字段为空，则不能在页面显示


```json
{
    "_id": "order",
    "name": "订单管理",
    "icon": "",
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
    "icon": "",
    "url": "/phone",
    "sort": 1001,
    "parent_id": "order",
    "permission": [],
    "status": 1
}
```

#### 侧边栏样式管理

通过 [uni.scss](https://github.com/dcloudio/uni-template-admin/blob/master/uni.scss) 配置侧边栏样式

> 调整菜单颜色时，只需设置菜单背景色 ``$menu-bg-color``，自行搭配文字前景色即可

```css
$left-window-bg-color: #fff; /* 左侧窗口背景色 */
$menu-bg-color: #fff; /* 一级菜单背景色 */
$sub-menu-bg-color: darken($menu-bg-color, 8%); /* 二级以下菜单背景色 */
$menu-bg-color-hover: darken($menu-bg-color, 15%); /* 菜单 hover 背景颜色 */
$menu-text-color: #333; /* 菜单前景色 */
$menu-text-color-actived: #409eff; /* 菜单激活前景色 */
```

### 用户系统

> 基于 [uni-id](https://uniapp.dcloud.io/uniCloud/uni-id) 用户登录

1. 用户登录

注意：首次使用，可以通过登录页面底部链接创建一个超级管理员（仅允许创建一次），注册完毕后，建议从登录页面移除该链接

### 权限系统

> 基于 [uni-id](https://uniapp.dcloud.io/uniCloud/uni-id?id=rbac-api) 角色权限, uni-id 是 uniCloud之上的用户账户、权限系统

1. 角色表 `uni-id-roles`
    > [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=%e8%a7%92%e8%89%b2%e8%a1%a8)
2. 权限表 `uni-id-permissions`
    > [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=%e6%9d%83%e9%99%90%e8%a1%a8)
3. 菜单表 `opendb-admin-menu`
   | 字段 | 类型 | 必填 | 描述 |
   |:-|:-|:-|:-|
   | \_id | Object ID | 是 | 系统自动生成的 Id |
   | name | String | 是 | 菜单文字 |
   | icon | String | 否 | 菜单图标 |
   | url | String | 否 | 菜单对应的页面链接（只有没有子菜单的菜单项可以配置） |
   | sort | Integer | 否 | 在同级菜单中的排序，数组越大越靠后 |
   | parent_id | String | 否 | 父级菜单 Id |
   | permission | Array | 否 | 菜单权限（只有没有子菜单的菜单项可以配置） |
   | status | Integer | 是 | 菜单状态：0 禁用 1 启用 |
   | created_date | Timestamp | 是 | 创建时间 |
4. 用户表 `uni-id-users`
    > [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=%e7%94%a8%e6%88%b7%e8%a1%a8)
5. 验证码表 `uni-verify`
    > [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=%e7%94%a8%e6%88%b7%e8%a1%a8)
6. 权限验证

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

新增页面可以自己开发页面，也可以从插件市场下载插件。

- 可以新增普通的页面，在前端callfunction，后台搭配云函数操作
- 可以使用uni-clientdb，在前端直接操作数据库，后台配置db schema进行权限和格式校验
- 可以使用云函数单文件路由，在项目中默认包含了一个uni-cloud-router的单文件路由，也可以使用插件市场的其他单文件路由

建议页面统一放在 ``pages`` 目录，以便管理。由于是云端一体的开发模式，简单的理解为，在前端实现页面和 *api 接口*，这里需要转换一下观念，api 也是在前端实现的。

#### 自己开发页面

以登录功能为例，这里使用的是 `可以新增普通的页面，在前端callfunction，后台搭配云函数操作` 和 `项目中默认的 uni-cloud-router 的单文件路由` 的方式新增页面，以下是代码片段，完整代码见项目源码：

1. 新增前端 vue 页面

```html
<template>
    <view class="login-box">
        <view class="flex-cc m-b-30 login-title">
            系统登录
        </view>
        <uni-forms ref="form" :form-rules="rules">
            <uni-field class="p-lr-0" left-icon="person" name="username" v-model="formData.username" labelWidth="35"
                placeholder="账户" :clearable="false" />
            <uni-field class="m-b-30 p-lr-0" left-icon="locked" v-model="formData.password" name="password" type="password"
                labelWidth="35" placeholder="密码" :clearable="false" />
            <button class="login-button flex-cc m-b-30" type="primary" :loading="loading" :disabled="loading" @click="submit">登录</button>
        </uni-forms>
    </view>
</template>
```

```javascript
<script>
submit(e) {
    // api 接口 'user/login' 在 uni-admin 目录中实现，参见步骤 2
    this.$request('user/login', this.formData).then(res => {
        this.setToken({
            token: res.token,
            tokenExpired: res.tokenExpired
        })
        this.init()
    }).catch(err => {

    }).finally(err => {

    })
}
<script />
```

2. 新增后端 api 接口

uniCloud admin 在前端实现 api 类似于后端的实现方式，在 ``uni-admin/service`` 中写 api 的执行代码，比如对数据表的增删改查、处理数据等，在 ``uni-admin/controller`` 中写控制 service 的执行。

```javascript
//uni-admin/controller/user.js

const {
    Controller
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class UserController extends Controller {
    async login() {
        const {
            username,
            password
        } = this.ctx.data
        // 调用下面的 service
        return this.service.user.login({
            username,
            password
        })
    }
}
```

```javascript
//uni-admin/service/user.js

const {
    Service
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class UserService extends Service {
    async login({
        username,
        password
    }) {
        return await uniID.login({
            username,
            password,
            needPermission: true
        })
    }
}

```

#### 从插件市场下载插件，怎么注册菜单进去

以[uniCloud admin管理项目-权限管理插件](https://ext.dcloud.net.cn/plugin?id=3269)

*使用步骤:*

1. 从插件市场导入插件
2. 在 HBuilder X 2.9.5 中选择添加插件的项目
3. 覆盖项目的 db_init.json 文件, 点击“确定覆盖”
4. 在 db_init.json 文件上右键，点击“初始化云数据库”
5. 刷新 admin 即可在菜单栏看到新增的菜单

### 关于 uni-cloud-router 的用法

> [详情](https://uniapp.dcloud.io/uniCloud/uni-cloud-router)

### 云函数

#### uni-clientDB

> [详情](https://uniapp.dcloud.io/uniCloud/uni-clientDB)

### 使用三方组件库

uniCloud Admin支持所有三方的Vue UI库，包括elementUI等非uni-app的UI库，但注意这些for h5的ui库只能在浏览器中使用，无法适配App和小程序，按如下操作。

以使用 element-ui 框架为例：

1. 安装 UI 框架

    > npm i element-ui -S

2. 在 main.js 中引用

    ```javascript
    import elementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';

    Vue.use(elementUI);
    ```

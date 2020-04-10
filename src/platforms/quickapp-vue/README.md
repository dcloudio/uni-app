uni-app对快应用的适配，现状如下：
1. 在uni-app的cli版本中，提供了快应用的条件编译，在条件编译里，使用快应用的组件和api，可以直接运行和发布快应用。
2. 如果想使用uni-app的组件和api，在快应用里运行，需要一个中间适配层。这层目前DCloud官方完成一部分组件和api的适配，其余组件和api，计划交给社区开发者解决。

欢迎各位开发者一起参与完善，如下文档为开发者参与适配更多uni组件和API的教程。

### 参考文档
- uni-app文档 [https://uniapp.dcloud.io/](https://uniapp.dcloud.io/)
-  [快应用官网](https://doc.quickapp.cn/)，[使用 Vue开发快应用](https://doc.quickapp.cn/tutorial/others/vue.html)


### 开发
uni-app 是一个使用 Vue.js 开发小程序、H5、App的统一前端框架。

1. Fork 仓库 `uni-app` [https://github.com/dcloudio/uni-app](https://github.com/dcloudio/uni-app)，切换到 dev-quickapp 分支

2. 源码中有2个例子，分别是 `Button` 组件适配示例及 `clipboard`  API适配示例
```
- button `src/platforms/quickapp-vue/view/components/button`
- clipboard `src/platforms/quickapp-vue/service/api/device/clipboard`
```

3. 编译 (输出目录`packages/uni-quickapp-vue`)
```
npm run build:quickapp-vue
```

#### `uni-app` 目录说明

```
packages
 ├─uni-quickapp-vue
 │  └─lib
 │      ├─compiler-module (编译阶段标签转换之类逻辑)
 │      ├─polyfill.css (全局样式差异代码)
 │      └─manifest (manifest.json的生成逻辑)
src
 ├─platforms
 │  └─quickapp-vue
 │      ├─...
 │      ├─service
 │      │   └─api 平台的接口实现（方案同h5，app-plus）
 │      └─view
 │          └─components 平台的组件实现（easycom格式，目录名与文件名一致）
 │              └─button
```

### 测试

#### 搭建测试环境

1. 安装 [快应用调试器](https://statres.quickapp.cn/quickapp/quickapp/201806/file/quickapp_debugger.apk)

2. 打开快应用调试器，下载平台（快应用预览版：版本号1060）

#### 搭建测试工程
用于测试 uni-app 框架及 API，包含 button 组件和剪切板示例

1. 测试工程 `hello quickapp` [https://github.com/dcloudio/hello-quickapp-vue](https://github.com/dcloudio/hello-quickapp-vue)
使用 git clone(需要配置 git 命令行支持) 或下载 zip 解压
```
git clone https://github.com/dcloudio/hello-quickapp-vue.git
cd ./hello-quickapp-vue
yarn install
```
2. 编译快应用 `rpk`
```
npm run dev:quickapp-vue
```
3. 开启debug在线更新服务
```
npm run serve:quickapp-vue
```
4. 打开快应用调试器，扫码安装或右上角设置服务器地址(注意带上`http://`，关闭USB调试可看到扫码)
5. 修改代码后，会主动通知调试器更新，或者手动点击在线更新（调试可以点击右下角开始调试）
6. 手动替换 `uni-app` 编译输出目录 `packages/uni-quickapp-vue` 到测试工程 `node_modules/@dcloudio/uni-quickapp-vue`, 可以考虑 `npm link`

### 提交代码
使用 `pull request` 提交代码

### 组件条件编译
```
<template>
  <view>
    <!-- #ifdef QUICKAPP-VUE -->
    <button>Button</button>
    <!-- #endif -->
  </view>
</template>
```

### 调用快应用平台 API
```
<script>
// 剪切板，注意权限配置
var clipboard = $app_require$("@app-module/system.clipboard");
</script>
```

### 权限配置
```
src/manifest.json

"quickapp-vue": {
    "icon": "static/logo.png",
    "package": "com.example.demo",
    "features": [{ "name": "system.clipboard" }] //剪切板权限
}
```



### 生成证书 `certificate.pem` 和 `private.pem`
安装 openssl(windows系统)
```
openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
```
- 发布快应用时需要使用自己的证书，开发期间为debug证书


注：目前华为快应用还不支持这种开发方式，华为版的适配，uni-app官方会另行提供。

QQ交流群：148203425

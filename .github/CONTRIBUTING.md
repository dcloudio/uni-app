# uni-app 贡献指南

当前贡献指南针对基于 Vue3 的 uni-app，如需阅读基于 Vue2 版本的贡献指南请移步 [dev](../../dev/.github/CONTRIBUTING.md) 分支。

## 环境搭建

* 需要安装 [Node.js](http://nodejs.org/) 16+，以及 [pnpm](https://pnpm.io/)。
* 克隆仓库到本地后，执行 ```pnpm install``` 安装开发依赖。

## 开发

* 执行命令编译指定包，如：```npm run build uni-mp-weixin```。
* 执行 ```npm run lint``` 检查代码风格。
* 执行 ```npm run test``` 运行测试。

## 测试

* 创建 uni-app 测试工程。

  ```
  npx degit dcloudio/uni-preset-vue#vite uniapp-test
  ```
* 从本地安装改动过的依赖

  ```
  pnpm add @dcloudio/%包名%@%uni-app本地仓库路径%/packages/%包名%
  ```
* 同时将本地依赖添加 [resolutions](https://pnpm.io/package_json#resolutions) 配置，强制测试工程统一使用。
* 编写测试代码。
* 编译到对应平台进行测试。

## 提交 PR

* fork 本仓库，在自己仓库基于 next 分支创建专用分支用于提交更改。
* commit 规范遵循 Vue 仓库 [Git Commit Message Convention](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md)。
* 提交之前确保进行了完善的测试。
* 确保 PR 提交到 next 分支。
* 修复 Bug 请提供详细的描述信息，或链接到对应的 issue。
* 提交新功能请阐明起用途以及提交到主仓库的必要性。除抹平不同平台 API 与组件差异的功能外，最好事先仓库主要成员商议后再进行。


## 项目结构

* packages：uni-app 编译器以及运行时依赖
  * uni-cli-shared：编译器共享包
    * ``__tests__``：单元测试
    * dist：编译后的文件
    * lib：其他依赖
    * src：源文件
      * messages：编译器国际化语言包
  * uni-app：框架接口、生命周期等
  * uni-api：运行时全局 uni 对象提供的接口，平台公用
  * uni-components：运行时全局组件，平台公用
  * uni-i18n：国际化依赖包（运行时）
  * uni-h5-vite：H5 平台 Vite 插件
  * uni-h5-vue：H5 平台使用的 Vue 框架
  * uni-h5：H5 平台运行时依赖包
    * dist：编译后的文件
    * lib：其他依赖
    * src：源文件
      * compiler：编译器（当前平台独有部分）
      * service：逻辑层
      * view：视图层
  * uni-app-vite：App 平台 Vite 插件
  * uni-app-vue：App 平台使用的 Vue 框架
  * uni-app-plus：App 平台依赖包
    * dist：编译后的文件
    * lib：其他依赖
    * src：源文件
      * compiler：编译器（当前平台独有部分）
      * service：逻辑层
      * view：视图层
  * uni-app-plus-nvue：App（nvue）平台依赖包
  * uni-mp-vite：小程序平台 Vite 插件
  * uni-mp-vue：小程序平台使用的 Vue 框架
  * uni-mp-compiler：小程序编译器（各小程序平台通用部分）
    * ``__tests__``：单元测试
    * dist：编译后的文件
    * lib：其他依赖
    * src：源文件
      * template：模版编译
      * transforms：属性转换
  * uni-mp-core：小程序平台运行时（各小程序平台通用部分）
    * ``__tests__``：单元测试
    * src：源文件
      * api：uni 对象接口适配
      * runtime：运行时框架生命周期等
  * uni-mp-weixin：微信小程序平台依赖包
    * dist：编译后的文件
    * lib：其他依赖
    * src：源文件
      * api：uni 对象接口适配，抹平 wx 对象的平台差异
      * compiler：编译器（当前平台独有部分）
      * runtime：运行时框架生命周期等
      * platform：用于为框架提供统一的接口，对应 @dcloudio/uni-platform
  * uni-mp-alipay：支付宝小程序平台依赖包
  * uni-mp-baidu：百度小程序平台依赖包
  * uni-mp-qq：QQ小程序平台依赖包
  * uni-mp-toutiao：字节小程序平台依赖包
  * uni-mp-kuaishou：快手小程序平台依赖包
  * uni-mp-lark：飞书小程序平台依赖包
  * uni-quickapp-webview：快应用平台依赖包
  * uni-stat：uni统计依赖包
* scripts：编译脚本

# uni-app 贡献指南

## 环境搭建

* 需要安装 [Node.js](http://nodejs.org/) 12+，以及 [yarn](https://yarnpkg.com/en/docs/install)。
* 克隆仓库到本地后，执行 ```yarn ``` 安装开发依赖。

## 开发

* packages 目录无需编译。
* src 目录需执行命令编译到目标平台，如：```yarn build:mp-weixin```。
* 执行 ```yarn lint```、```yarn lint:cli``` 分别检查运行时和编译器代码风格。
* 执行 ```yarn test:unit```、```yarn test:cli``` 分别运行运行时和编译器的测试。

## 测试

* 需要安装 Vue CLI 4.x。

  ```
  npm install -g @vue/cli@4
  ```
* 创建 uni-app 测试工程。

  ```
  vue create -p dcloudio/uni-preset-vue#alpha uniapp-test
  ```
* 从本地安装改动过的依赖，由于部分包对软链兼容不佳，暂不推荐使用 ```npm link``` 方式。

  ```
  yarn add @dcloudio/%包名%@%uni-app本地仓库路径%/packages/%包名%
  ```
* 编写测试代码。
* 编译到对应平台进行测试。

## 提交 PR

* fork 本仓库，在自己仓库基于 dev 分支创建专用分支用于提交更改。
* commit 规范遵循 Vue 仓库 [Git Commit Message Convention](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md)。
* 提交之前确保进行了完善的测试。
* 确保 PR 提交到 dev 分支。
* 修复 Bug 请提供详细的描述信息，或链接到对应的 issue。
* 提交新功能请阐明起用途以及提交到主仓库的必要性。除抹平不同平台 API 与组件差异的功能外，最好事先仓库主要成员商议后再进行。


## 项目结构

* build：编译脚本
* lib：其他编译依赖
  * apis.js 参与编译的接口列表
  * modules.json 摇树优化接口类别划分
* dist：其他编译后的文件
* docs：~~文档目录~~ ，现已迁移
* examples：~~示例目录~~，现已迁移
* packages：编译器以及编译后的运行时
  * uni-automator：自动化测试依赖包
  * uni-cli-i18n：国际化依赖包（编译器）
  * uni-cli-shared：编译器共享包
  * uni-i18n：国际化依赖包（运行时）
  * uni-migration：小程序组件到 Vue 组件的转换工具
  * uni-h5：H5 平台运行时依赖包
    * dist：编译后的文件
  * uni-app-plus：App 平台依赖包
    * dist：编译后的文件
    * template：预编译以及静态文件依赖
    * lib：App平台编译选项和其他编译依赖
  * uni-app-plus-nvue：App（nvue）平台依赖包
  * uni-mp-weixin：微信小程序平台依赖包
    * dist：微信小程序运行时编译后的文件
    * lib：微信小程序编译选项和其他编译依赖
  * uni-mp-alipay：支付宝小程序平台依赖包
  * uni-mp-baidu：百度小程序平台依赖包
  * uni-mp-qq：QQ小程序平台依赖包
  * uni-mp-toutiao：字节小程序平台依赖包
  * uni-mp-kuaishou：快手小程序平台依赖包
  * uni-mp-jd：京东小程序平台依赖包
  * uni-mp-lark：飞书小程序平台依赖包
  * uni-quickapp-native：快应用平台依赖包
  * uni-quickapp-webview：快应用平台依赖包
  * uni-template-compiler：模板编译器
    * __tests__：单元测试
    * lib：编译依赖
  * vue-cli-plugin-hbuilderx：[Vue CLI 插件](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html)，用于处理 HBuilderX 环境
  * vue-cli-plugin-uni：[Vue CLI 插件](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html)，用于配置 [webpack](https://webpack.js.org/concepts/) 等编译选项，部分配置在用户项目内可以被 [vue.config.js](https://cli.vuejs.org/zh/config/#vue-config-js) 覆盖
    * bin
    * commands
    * lib
    * packages：内置依赖包
      * mp-vue：小程序平台使用的 Vue 依赖，由仓库 [fxy060608/vue#dev](https://github.com/fxy060608/vue) 编译。
  * vue-cli-plugin-uni-optimize：Vue CLI 插件，主要处理 H5 平台摇树优化
  * webpack-uni-mp-loader：webpack loader，用于生成小程序平台的各种文件
  * webpack-uni-pages-loader：webpack loader，用于解析 pages.json
    * lib
      * platforms：平台差异实现
        * h5
        * app-plus
        * mp-weixin
  * uni-stat：uni统计依赖包
* src：运行时源码目录
  * assets：静态资源
  * core：运行时公共部分
    * helpers
      * i18n：国际化资源文件
      * protocol：App、H5 平台接口通用校验
    * runtime
    * service：逻辑层（App、H5）
      * api：uni 接口实现（App、H5 平台公共部分）
      * bridge：逻辑层和视图层通讯桥
      * plugins
    * view：视图层（App、H5）
      * bridge：逻辑层和视图层通讯桥
      * components：组件实现（App、H5 平台公共部分）
      * mixins
      * plugins
  * platforms：各平台运行时差异实现部分
    * h5：H5 平台运行时
      * components：H5 平台框架内部组件实现
      * helpers
      * runtime
      * service
        * api：uni 接口实现（H5 平台）
      * view
        * bridge
        * components：组件实现（H5 平台）
    * app-plus：App 平台运行时
      * helpers
      * runtime
      * service
        * api：uni 接口实现（App 平台）
      * view
        * api
        * bridge
        * components：组件实现（App 平台）
        * framework
        * mixins
    * app-plus-nvue：App（nvue）平台运行时
    * mp-weixin：微信小程序平台运行时
      * helpers
      * runtime
        * api：对 wx 对象部分方法对输入输出参数进行处理以抹平各平台差异
        * wrapper：对微信小程序的 App、Page、Component 进行包装，以将小程序原生组件实例和 Vue 组件实例进行绑定
    * mp-alipay：支付宝小程序平台运行时
    * mp-baidu：百度小程序平台运行时
    * mp-qq：QQ小程序平台运行时
    * mp-toutiao：字节小程序平台运行时
    * mp-kuaishou：快手小程序平台运行时
    * mp-jd：京东小程序平台运行时
    * mp-lark：飞书小程序平台运行时
    * quickapp-native：快应用平台运行时
    * quickapp-webview：快应用平台运行时
  * shared
* test：单元测试（运行时）

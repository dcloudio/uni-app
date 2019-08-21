# uni-app

`uni-app` 是一个使用 `Vue.js` 开发小程序、H5、App的统一前端框架。官网地址：[https://uniapp.dcloud.io](https://uniapp.dcloud.io)

开发者使用 `Vue` 语法编写代码，`uni-app` 框架将其编译到 小程序（微信/支付宝/百度/字节跳动/QQ/钉钉）、App（iOS/Android）、H5等多个平台，保证其正确运行并达到优秀体验。

# uni-app的特点

- 开发者和案例更多：20万+开发者，50+QQ、微信群，数万案例应用。[案例](https://uniapp.dcloud.io/case)
- 性能更高（见[评测](https://juejin.im/post/5ca1736af265da30ae314248)）
- 更丰富的周边生态（见[插件市场](https://ext.dcloud.net.cn/)）。
- 提供比小程序原生开发更好的开发体验和更高的工程化效率
- 跨端抹平度更完善，且各端特色发挥更灵活，可真正实现一套代码多端覆盖，无需各端多头维护升级。

## 扫码体验

一套代码编译到7个平台，开发一次、多处运行，这不是梦想，而是现实。依次扫描7个二维码，亲自体验最全面的跨平台效果！

<img src="https://img-cdn-qiniu.dcloud.net.cn/uni-app-qr-all.jpg"/>

*注： Appstore、百度、头条平台不能提交简单demo，故iOS、百度小程序、头条小程序版补充了一些其他功能。*

## 快速开始

`uni-app`支持通过`vue-cli`命令行、`HBuilderX`可视化界面两种方式快速创建项目：

- [vue-cli命令行方式](https://uniapp.dcloud.io/quickstart?id=_2-通过vue-cli命令行)：不限IDE，适合对node熟悉的开发者，扩展阅读：[在vscode中开发uni-app](https://ask.dcloud.net.cn/article/36286)
- [HBuilderX可视化界面](https://uniapp.dcloud.io/quickstart?id=_1-通过-hbuilderx-可视化界面)：专用IDE，内置相关环境，开箱即用，开发效率更高。

## 项目案例

案例：[uniapp.dcloud.io/case](https://uniapp.dcloud.io/case)

欢迎广大开发者踊跃提交自己的应用案例，[uni-app案例征集](https://github.com/dcloudio/uni-app/issues/6)

## 需求墙

`uni-app`计划支持的功能点，会在需求墙上进行展示，并允许开发者对需求进行投票，[前往投票](https://dev.dcloud.net.cn/wish/)。

## 更新日志

`uni-app`一直保持极高的开发活跃度，详见[uni-app 更新日志](docs/release.md)。

## 论坛

由于`uni-app`有几十万开发者，50多个QQ、微信群，官方已无法维护更多交流群。请开发者到官方论坛交流：[https://ask.dcloud.net.cn/explore/](https://ask.dcloud.net.cn/explore/) 。论坛提供了比issus更专业的工具服务。

## 插件市场

`uni-app`有丰富的插件生态，众多开发者提交了各种组件、sdk、项目模板，详见：[https://ext.dcloud.net.cn/](https://ext.dcloud.net.cn/)

## 现有项目如何迁移到uni-app体系

- 微信小程序转换uni-app指南及转换器：[https://ask.dcloud.net.cn/article/35786](https://ask.dcloud.net.cn/article/35786)
- vue h5项目转换uni-app指南：[https://ask.dcloud.net.cn/article/36174](https://ask.dcloud.net.cn/article/36174)
- mpvue 项目（组件）迁移指南、示例及资源汇总： [https://ask.dcloud.net.cn/article/34945](https://ask.dcloud.net.cn/article/34945)

## 常见疑问

- 问：不同端有不同的需求、不同的特色，登陆支付也不一样，如何统一？
- 答：差异部分使用条件编译。uni-app提供了灵活强大的[条件编译](https://uniapp.dcloud.io/platform)。可以完美处理复用部分和差异部分。真正一套工程源码。当业务升级时，不再需要多端维护。如果多端维护，经常会因为某些端的流量不大，就一直拖延无法让那些用户享受到最新服务。另外登陆支付在客户端部分，已经被uni-app统一成一样的api了。


- 问：多端是不是一种妥协，是否会造成性能下降？
- 答：good question。多端且不影响性能，确实很难，但uni-app做到了。在h5端，它的性能、包体积与直接使用vue.js开发一致； 在小程序端，它的性能比大多数开发框架更好，uni-app底层自动处理的setdata差量同步机制，比开发者手动写setdata更好，就像使用vue.js更新界面比手动写js修改dom更高效一样； 在App，uni-app支持webview渲染和原生渲染双引擎，启用原生渲染时，css写法受限，但性能是很接近原生开发的效果的，在当前的手机环境下，千万日活以下的应用在App使用uni-app也不会遇到任何压力。当然也可以在已经做好的原生App中将部分页面改为uni-app实现; 此外，我们会把很多跨端处理放在编译期完成的，这样会减少对运行期的效率影响。


- 问：不做多端，是不是不需要uni-app。
- 答：不是。大量开发者用uni-app只做一个端，详见[案例](https://uniapp.dcloud.io/case)。对于开发者而言，一个优秀工具在手，做什么都不愁。

## 更多资料

- 评测：[深入测试一周，主流多端框架大比武](https://mp.weixin.qq.com/s/jIDEHfuMnED6HTfNgjsW4w)
- [uni-app在App端和flutter、react native的比较](https://ask.dcloud.net.cn/article/36083)

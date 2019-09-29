建议第一步，看完[uni-app官网](https://uniapp.dcloud.io)的首页介绍。

建议第二步，通过[快速上手](https://uniapp.dcloud.io/quickstart)，亲身体验下uni-app。

建议第三步，看完[《uni-app官方教程》](https://ke.qq.com/course/343370)，出品人：DCloud，课时：共3节。

#### 如果你熟悉h5，但不熟悉vue和小程序 
1. 看完这篇[白话uni-app](http://ask.dcloud.net.cn/article/35657)
2. 看这个培训视频，从vue到uni-app全部讲了。[《uni-app 商业级应用实战》](https://ke.qq.com/course/379043?from=800006421)，出品人：腾讯课堂NEXT学院
3. 如果不愿意付费看视频，可以去vue官网自学。注意vuejs可以在html中使用，而uni-app里没有HTML，直接就是vue文件。另外vue的路由、npm可以不学
4. 不太需要专门去学习小程序开发，只看uni-app官网即可

#### 如果你使用过mpvue
几乎不用学习，看完这篇即可[mpvue转uni-app指南](http://ask.dcloud.net.cn/article/34945)

#### 三方培训机构视频
如下是三方专业培训机构的视频教程
* [《uni-app 商业级应用实战》](https://ke.qq.com/course/379043?from=800006421)，出品人：腾讯课堂NEXT学院。亮点：腾讯课堂官方出品；不懂 vue 的工程师也可快速学习；从入门到实战都包括。
* [《uni-app 跨平台应用开发教程》](http://www.hcoder.net/course/info_242.html)，出品人：hcoder 刘海君，课时：共25节。亮点：讲师经验丰富，也是graceui框架作者。
* [《uni-app 实战教程 - “悦读”项目实战》](https://ke.qq.com/course/364262?tuin=4f8da6)，出品人：hcoder 刘海君，点击[领取专享优惠劵](https://ke.qq.com/p/IYf6YNZf?tuin=4f8da6)
* [《uni-app实战社区交友类app开发》](https://study.163.com/course/introduction.htm?courseId=1209188809&_trace_c_p_k2_=4b765abfb2f946039c8ea6230737f6af)，出品人：帝莎IT学院。适用人群：具备Html+Css+Javascript基础知识。
* [《uni-app仿小米商城实战》](https://study.163.com/course/courseMain.htm?courseId=1209401825&share=2&shareId=480000001892585)，出品人：帝莎IT学院。首页使用nvue开发，目前支持app端和小程序端。
* [《uni-app多端调试环境配置》](https://study.163.com/course/courseMain.htm?courseId=1209401924&share=2&shareId=480000001892585)，出品人：帝莎IT学院。
<!-- * [《跟枫桥一起开发App》](https://www.lusita.cn)，出品人：唐枫桥，来源：源码商城（注：源码商城App、小程序本身就是基于```uni-app```开发的） -->
<!-- * [《广州番禺职业技术学院 uni-app课程》](http://doc.zengqs.com/1143144)，出品人：曾教授 -->

如果你是线下培训机构，想开课合作，联系bd@dcloud.io

#### 网友学习笔记分享

* WordPress搭配uni-app开发app和小程序的教程：[https://ask.dcloud.net.cn/article/35704](https://ask.dcloud.net.cn/article/35704)
* uni-app官方教程学习手记：[https://segmentfault.com/a/1190000017020710](https://segmentfault.com/a/1190000017020710)


欢迎更多人分享学习经验，可转载到[社区](http://ask.dcloud.net.cn/explore/)，优秀的文章我们会收录在本文中。

#### 题外话：关于各端的管理规则需要耐心学习

uni-app并不难学，但我们注意到很多新人在适应各个平台的规则限制时很焦躁。

uni-app跨了很多端，虽然代码层面可以开发一次，生成多端。但注意每个端，有每个端的管理规则，这与开发无关，但每个开发者仍然要耐心掌握这些规则限制。

- 比如H5端的浏览器有跨域限制；
- 比如微信小程序会强制要求https链接，并且所有要联网的服务器域名都要配到微信的白名单中；
- 比如App端，iOS对隐私控制和虚拟支付控制非常严格；
- 比如App端，Android、国产rom各种兼容性差异，尤其是因为谷歌服务被墙，导致的push、定位等开发混乱的坑；
- 如果你的App要使用三方sdk，比如定位、地图、支付、推送...还要遵循他们的规则和限制；

#### uni-app的底层框架实现原理及优化策略（高级）
通过[评测对比](https://juejin.im/post/5ca1736af265da30ae314248)，我们知道uni-app的性能比其他小程序开发框架好，但底层原理是什么？
这篇视频就是讲解uni-app框架底层的实现思路和优化策略：[《uni-app框架如何实现高性能》](https://v.qq.com/x/page/r0886mn8v6l.html)

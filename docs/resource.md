建议第一步，看完[uni-app官网](https://uniapp.dcloud.io)的首页介绍。

建议第二步，通过[快速上手](https://uniapp.dcloud.io/quickstart)，亲身体验下uni-app。

建议第三步，看完[《uni-app官方教程》](https://ke.qq.com/course/343370)，出品人：DCloud，课时：共3节。

#### 如果你熟悉h5，但不熟悉vue和小程序 
1. 看完这篇[白话uni-app](http://ask.dcloud.net.cn/article/35657)
2. DCloud与vue合作，在[vue.js官网](https://cn.vuejs.org/v2/guide/)提供了免费视频教程，也可以直达教程地址：[https://learning.dcloud.io](https://learning.dcloud.io)
3. 不需要专门去学习小程序的语法，uni-app使用的是vue的语法，不是小程序自定义的语法。

#### 如果你使用过mpvue
几乎不用学习，uni-app对vue语法的支持是mpvue的超集。这里有篇[mpvue转uni-app指南](http://ask.dcloud.net.cn/article/34945)

#### 如果你熟悉小程序，但不熟悉vue
参考三方总结[https://segmentfault.com/a/1190000015684864](https://segmentfault.com/a/1190000015684864)

#### 三方培训机构视频
如下是三方专业培训机构的视频教程
* [《uni-app 商业级应用实战》](https://ke.qq.com/course/379043?from=800006421)，出品人：腾讯课堂NEXT学院。亮点：腾讯课堂官方出品；不懂 vue 的工程师也可快速学习；从入门到实战都包括。
* [《uni-app 跨平台应用开发教程》](http://www.hcoder.net/course/info_242.html)，出品人：hcoder 刘海君，课时：共25节。亮点：讲师经验丰富，也是graceui框架作者。
* [《uni-app 实战教程 - “悦读”项目实战》](https://ke.qq.com/course/364262?tuin=4f8da6)，出品人：hcoder 刘海君，点击[领取专享优惠劵](https://ke.qq.com/p/IYf6YNZf?tuin=4f8da6)
* [《uni-app实战社区交友类app开发》](https://study.163.com/course/introduction.htm?courseId=1209188809&_trace_c_p_k2_=4b765abfb2f946039c8ea6230737f6af)，出品人：帝莎IT学院。适用人群：具备Html+Css+Javascript基础知识。
* [《uni-app仿小米商城实战》](https://study.163.com/course/courseMain.htm?courseId=1209401825&share=2&shareId=480000001892585)，出品人：帝莎IT学院。首页使用nvue开发，目前支持app端和小程序端。
* [《uni-app多端调试环境配置》](https://study.163.com/course/courseMain.htm?courseId=1209401924&share=2&shareId=480000001892585)，出品人：帝莎IT学院。
* [《uni-app实战仿微信app全栈开发》](https://study.163.com/course/courseMain.htm?courseId=1209487898&share=2&shareId=480000001892585)，出品人：帝莎IT学院。
* [《uni-app实战视频点播app小程序》](https://study.163.com/course/courseMain.htm?courseId=1209644880&share=2&shareId=480000001892585)，出品人：帝莎IT学院。

目前各大视频学习网站都有不少uni-app的学习资源，更多资源请点击搜索链接：
- [腾讯课堂的uni-app相关课程](https://ke.qq.com/course/list/uni-app?tuin=269fe6b)
- [网易课堂的uni-app相关课程](https://study.163.com/courses-search?keyword=uni-app)
- [bilibili的uni-app相关视频](https://search.bilibili.com/all?keyword=uni-app&from_source=nav_search_new)

<!-- * [《跟枫桥一起开发App》](https://www.lusita.cn)，出品人：唐枫桥，来源：源码商城（注：源码商城App、小程序本身就是基于```uni-app```开发的） -->
<!-- * [《广州番禺职业技术学院 uni-app课程》](http://doc.zengqs.com/1143144)，出品人：曾教授 -->

如果你是线下培训机构，想开课合作，联系bd@dcloud.io

#### 网友学习笔记分享

* WordPress搭配uni-app开发app和小程序的教程：[https://ask.dcloud.net.cn/article/35704](https://ask.dcloud.net.cn/article/35704)
* uni-app官方教程学习手记：[https://segmentfault.com/a/1190000017020710](https://segmentfault.com/a/1190000017020710)


欢迎更多人分享学习经验，可转载到[社区](http://ask.dcloud.net.cn/explore/)，优秀的文章我们会收录在本文中。

#### 关于各端的管理规则需要耐心学习

uni-app并不难学，但我们注意到很多新人在适应各个平台的规则限制时比较急躁。

每个端，有每个端的管理规则，这不是uni-app在技术层面上可以抹平的：

- 比如H5端的浏览器有跨域限制；
- 比如微信小程序会强制要求https链接，并且所有要联网的服务器域名都要配到微信的白名单中；
- 比如App端，iOS对隐私控制和虚拟支付控制非常严格；
- 比如App端，Android、国产rom各种兼容性差异，尤其是因为谷歌服务被墙，导致的push、定位等开发混乱的坑；
- 如果你的App要使用三方sdk，比如定位、地图、支付、推送...还要遵循他们的规则和限制；

#### uni-app的底层框架实现原理及优化策略（高级）
通过[评测对比](https://juejin.im/post/5ca1736af265da30ae314248)，我们知道uni-app的性能比其他小程序开发框架好，但底层原理是什么？
这篇视频就是讲解uni-app框架底层的实现思路和优化策略：[《uni-app框架如何实现高性能》](https://v.qq.com/x/page/r0886mn8v6l.html)

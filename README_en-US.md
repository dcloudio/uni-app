# uni-app

<p>
  <a href="https://github.com/dcloudio/uni-app/blob/dev/README.md">简体中文</a> | English
</p>

`uni-app` is a unified front-end framework that uses `Vue.js` to develop applet, H5, and App. Official website address: [https://uniapp.dcloud.io](https://uniapp.dcloud.io)

Developers use `Vue` syntax to write code, and `uni-app` framework compiles it into small programs (WeChat/Alipay/Baidu/ByteDance/QQ/Kuishou/Dingding/Xiaohongshu), App (iOS/Android) ), H5 and other platforms to ensure its correct operation and achieve an excellent experience.

# Features of uni-app

- More developers and cases: HBuilder has installed 8 million units, the developer community has one million monthly active users, and more than 70 QQ and WeChat groups carry 100,000 people. There are many cases, and the uni statistics exceed 1 billion monthly active users ([see details](https://uniapp.dcloud.io/case))
- Higher performance (see [Review](https://juejin.im/post/5ca1736af265da30ae314248))
- Richer surrounding ecology, [Plugin Market](https://ext.dcloud.net.cn/) thousands of plugins
- Provide a better development experience and higher engineering efficiency than the native development of small programs
- The smoothness across the ends is more complete, and the characteristics of each end are more flexible, which can truly achieve multi-end coverage of a set of codes, without the need for multi-end maintenance and upgrades at each end
- Authoritative recognition: Alipay's official tool has built-in uni-app ([see details](https://docs.alipay.com/mini/ide/0.70-stable)), Tencent Classroom's official self-made uni-app training video ([ For details, see](https://ask.dcloud.net.cn/article/35640))

## Scan code experience

Develop once, compile to 3 platforms. Scan 3 QR codes in sequence to experience the most comprehensive cross-platform effect for yourself!

<div align="center">
  <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/3cca21df-a9af-48f8-b808-0b795acb2580.jpg"/>
</div>

## quick start

`uni-app` supports two ways to quickly create projects through the `vue-cli` command line and the `HBuilderX` visual interface:

- [vue-cli command line mode](https://uniapp.dcloud.io/quickstart?id=_2-%E9%80%9A%E8%BF%87vue-cli%E5%91%BD%E4%BB%A4%E8%A1%8C): not limited to IDE, suitable for developers familiar with node, extended reading: [Developing uni-app in vscode](https://ask.dcloud.net.cn/article/36286 ), [Developing uni-app in WebStorm](https://ask.dcloud.net.cn/article/36307)
- [HBuilderX visual interface](https://uniapp.dcloud.io/quickstart?id=_1-%E9%80%9A%E8%BF%87-hbuilderx-%E5%8F%AF%E8%A7%86%E5%8C%96%E7%95%8C%E9%9D%A2): dedicated IDE, built-in related environment, out-of-the-box, and higher development efficiency.

## Project cases

Case show: [uniapp.dcloud.io/case](https://uniapp.dcloud.io/case)

Welcome to submit your application, [uni-app case collection](https://github.com/dcloudio/uni-app/issues/6)

## Demand Wall

The function points supported by the `uni-app` plan will be displayed on the demand wall, and the voting opinions of developers will be collected. [Go to Vote](https://dev.dcloud.net.cn/wish/).

## Changelog

`uni-app` has always maintained high-frequency update iterations. For details, see [Official version update log](https://uniapp.dcloud.net.cn/release), [Alpha version update log](https://uniapp. dcloud.net.cn/release-note-alpha).

## Forum

Since `DCloud` has more than 70 QQ and WeChat groups, the official has been unable to maintain more communication groups. Please go to the official forum to communicate: [https://ask.dcloud.net.cn/explore/](https://ask.dcloud.net.cn/explore/). Forums provide more professional tools and services than issues.

## Plugin Market

`uni-app` has a rich plugin ecosystem. Many developers have submitted thousands of components, sdk, and project templates. For details, see: [https://ext.dcloud.net.cn/](https://ext.dcloud.net.cn/)

In addition to many third-party ui libraries, the official also provides uni-ui, which has stronger advantages in performance and cross-end compatibility. For details, see: [https://ext.dcloud.net.cn/plugin?id=55](https://ext.dcloud.net.cn/plugin?id=55)

## How to migrate existing projects to uni-app system

- WeChat applet conversion uni-app guide and converter: [https://ask.dcloud.net.cn/article/35786](https://ask.dcloud.net.cn/article/35786)
- Vue h5 project conversion uni-app guide: [https://ask.dcloud.net.cn/article/36174](https://ask.dcloud.net.cn/article/36174)
- mpvue project (component) migration guide, example and resource summary: [https://ask.dcloud.net.cn/article/34945](https://ask.dcloud.net.cn/article/34945)
- wepy to uni-app converter: [https://github.com/zhangdaren/wepy-to-uniapp](https://github.com/zhangdaren/wepy-to-uniapp)

## Frequently Asked Questions

- Q: Different terminals have different needs and features, and login and payment are also different. How to unify?
- A: The difference part uses conditional compilation. uni-app provides flexible and powerful [conditional compilation](https://uniapp.dcloud.io/platform). Can perfectly handle the multiplexed part and the difference part. A real set of project source code. When the business is upgraded, multi-terminal maintenance is no longer required. If there is multi-end maintenance, it is often delayed because the traffic on some ends is not large, so that those users cannot enjoy the latest services. In addition, the login payment in the client part has been unified into the same api by uni-app.


- Q: Is multi-terminal a compromise and will it cause performance degradation?
- A: good question. It's really hard to be multi-terminal without compromising performance, but uni-app does it. On the h5 side, its performance and package size are consistent with those developed directly using vue.js; on the applet side, its performance is better than most development frameworks. It is better for the user to manually write setdata, just as it is more efficient to use vue.js to update the interface than to manually write js to modify the dom; in App, uni-app supports dual engines for webview rendering and native rendering. When native rendering is enabled, css writing is limited, However, the performance is very close to the effect of native development. In the current mobile phone environment, applications with less than ten million daily activities will not encounter any pressure when using uni-app in the App. Of course, it is also possible to change some pages to uni-app in the native app that has already been done; in addition, we will complete a lot of cross-end processing at the compile time, which will reduce the efficiency impact on the runtime.


- Q: Do you not need uni-app if you don't do multi-end?
- A: No. A large number of developers use uni-app as only one end, see [Case](https://uniapp.dcloud.io/case) for details. For developers, with an excellent tool in hand, there is nothing to worry about.

- Q: Will uni-app change the open source protocol and switch to charging in the future?
- A: The official promise will never change the open source agreement. Regardless of HBuilderX, uni-app, or App, it is always free for Chinese people.

## more info

- Evaluation: [Cross-end Development Framework Deep Heng Evaluation 2020 Edition](https://juejin.im/post/5e8e8d5a6fb9a03c6d3d9f42)
- Evaluation: [In-depth testing for a week, mainstream multi-terminal frameworks compete](https://mp.weixin.qq.com/s/jIDEHfuMnED6HTfNgjsW4w)
- [Comparison of uni-app on the App side with flutter and react native](https://ask.dcloud.net.cn/article/36083)

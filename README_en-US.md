<p><a href="./README.md">简体中文</a> | English</p>

`uni-app` is a framework for developing all front-end applications using [Vue.js](https://vuejs.org/). Write once, publish to iOS, Android, HarmonyOS, Web (responsive), and various mini-programs (WeChat / Alipay / Baidu / Douyin / Feishu / QQ / Kuaishou / DingTalk / Taobao / JD / Xiaohongshu), Quick Apps, HarmonyOS Atomic Services, and more.

`DCloud` serves tens of millions of developers, millions of apps, billions of monthly active end-users, and tens of thousands of uni-app plugins. You can choose with confidence.

`uni-app` comes in two editions: `uni-app` and `uni-app x`.

- **uni-app**: Based on front-end technology stack. The App engine uses the same architecture as mini-programs — logic layer runs on JS, rendering layer uses WebView.
- **uni-app x**: The next-generation uni-app, built on the UTS language and the uvue native rendering engine.

UTS is a cross-platform language similar to TypeScript.

UTS compiles to Kotlin on Android, Swift on iOS, ArkTS on HarmonyOS NEXT, and JavaScript on Web and mini-program platforms.

With `uni-app`, you can handle anything. Even for single-platform development, `uni-app` is a better mini-program framework ([learn more](https://ask.dcloud.net.cn/article/35947)), a better cross-platform App framework, and a more convenient Web development framework. No matter what project your team assigns, you can deliver quickly — without switching development mindsets or changing development habits.

## Quick Preview

<div class="quick">
    <!-- <h3 id="快速体验"><a href="/README?id=%e5%bf%ab%e9%80%9f%e4%bd%93%e9%aa%8c" data-id="快速体验" class="anchor"><span>Quick Preview</span></a></h3> -->
    <image src="https://web-ext-storage.dcloud.net.cn/doc/uni_app_qrcode.png" alt="hello uni-app x demo"/>
    <p>Note:<br/>
        <em>- Some platforms do not allow simple demos, so additional features have been included; hello uni-app (x) sample code is available on <a href="https://github.com/dcloudio/hello-uniapp">GitHub</a></em><br/>
        <em>- Quick App is only supported on vivo, OPPO, and Huawei</em><br/>
    </p>
</div>

## Repository Overview

This is the `uni-app x` branch — the open-source repository for the uni-app x edition.

The `uni-app` edition (Vue 2 and Vue 3) is maintained on the `uni-app-vue2` and `uni-app-vue3` branches respectively.

Directory structure of the `uni-app x` branch:
- `benchmark` — performance benchmark reports
- `docs` — documentation
- `examples` — example projects
- `src` — source code
- `test` — test cases
- `CHANGELOG.md` — release changelog

## Write Once, Run Everywhere

`uni-app` lets a single codebase run on multiple platforms simultaneously. As shown below, one codebase runs concurrently on an iOS simulator, Android simulator, Web, WeChat DevTools, Alipay Mini-Program Studio, Baidu DevTools, Douyin DevTools, and QQ DevTools (each tab at the bottom represents one platform simulator):

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/dev1x8.jpg)

Actual runtime result (click to enlarge):

![](https://web-ext-storage.dcloud.net.cn/doc/uni-app-multiport-202478.png)#{.zooming}

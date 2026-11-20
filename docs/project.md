# uni-app x项目

## 新建

首先需下载最新版[HBuilder](https://www.dcloud.io/hbuilderx.html)

在菜单文件>新建>项目中，选择新建项目。（或工具链左上角的新建快捷菜单，或者快捷键Ctrl+N）

- HBuilder 5.25+，新建项目默认为 uni-app x 蒸汽模式。
- 低于5.25时，新建项目默认是uni-app，需要注意区分uni-app和uni-app x项目，在新建项目界面的底部有一个checkbox：uni-app x。**勾选后**会新建为uni-app x项目。见下图：

![](./static/newproject.png)

可以选择空项目，也可以选择hello uni-app x示例项目，这个项目有几百个页面，演示了uni-app x的各种组件和API的用法。

uni-app x只支持vue3，无法勾选vue2。

uni-app x的项目，manifest.json中会多一个节点`"uni-app-x" : {}`。这是HBuilder识别项目类型的标记。如手动增删这个节点，需对项目点右键"重新识别项目类型"
```json
{
    "name" : "hello-uniapp x",
    "appid" : "__UNI__4517034",
    "description" : "",
    "versionName" : "1.0.0",
    "versionCode" : "100",
    "uni-app-x" : {
    }
}
```

uni-app x的项目，在左侧项目管理器的图标是圆形的U（之前是方型的U）。

![](./static/project-icon.png)

## 项目结构

### 概览 @overview

uni-app x的项目结构与[uni-app老版的项目结构](https://uniapp.dcloud.net.cn/tutorial/project.html)基本一致。

主要的差别是没有nativeplugins目录。原因是uni-app x不支持App原生语言插件，仅支持uts插件。

基于uts的插件，可以在uni-app x和uni-app上通用。

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─uniCloud              云空间目录，支付宝小程序云为uniCloud-alipay，阿里云为uniCloud-aliyun，腾讯云为uniCloud-tcb（详见<a href="https://doc.dcloud.net.cn/uniCloud/quickstart?structure&id=structure">uniCloud</a>）
│─components            符合vue组件规范的uni-app x组件目录
│  └─comp-a.vue         可复用的a组件
├─utssdk                存放uts文件（已废弃）
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.uvue      index页面
│  └─list
│     └─list.uvue       list页面
├─static                存放应用引用的本地静态资源（如图片、字体、音视频等）的目录，<b>注意：</b>静态资源都应存放于此目录  <a href="https://doc.dcloud.net.cn/uni-app-x/compiler/#static">详见</a>
├─uni_modules           存放uni_module <a href="https://uniapp.dcloud.net.cn/plugin/uni_modules.html">详见</a>
├─platforms             存放各平台专用页面的目录，<a href="https://uniapp.dcloud.net.cn/tutorial/platform.html#preprocessor">详见</a>
├─nativeResources       App端原生资源目录
│  ├─android            Android原生资源目录 <a href="https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android">详见</a>
|  └─ios                iOS原生资源目录 <a href="https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#%E8%B5%84%E6%BA%90%E6%96%87%E4%BB%B6-bundle-resources">详见</a>
├─harmonyConfig         HarmonyOS 端原生资源目录 <a href="https://uniapp.dcloud.net.cn/tutorial/harmony/runbuild.html#config-dir">详见</a>
├─hybrid                App端存放web-view组件使用的本地html文件的目录，<a href="./component/web-view">详见</a>
├─wxcomponents          微信小程序平台wxml组件专用目录
├─unpackage             非工程代码，一般存放运行或发行的编译结果、App自定义基座。默认应配置git忽略 <a href="#unpackage">详见</a>
├─main.uts/ts/js        Vue初始化入口文件。HBuilder 5.31+ 蒸汽模式支持ts/js后缀
├─App.uvue              应用配置，用来配置App全局样式以及监听 <a href="./collocation/App#应用生命周期">详见</a>
├─pages.json            配置页面路由、导航条、选项卡等页面类信息，<a href="./collocation/pages">详见</a>
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，<a href="./collocation/manifest">详见</a>
├─AndroidManifest.xml   Android原生应用清单文件 <a href="https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android">详见</a>
├─Info.plist            iOS原生应用配置文件 <a href="https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios">详见</a>
└─uni.scss              内置的常用样式变量
	</code>
</pre>

uni-app x 目前仅支持以项目根目录组织源码和源资源的项目结构，编译缓存及运行、发行产物存放在unpackage目录。

老uni-app同时支持node cli创建的src/dist项目结构，但双模式并存引发了很多问题：
1. 官方和三方插件作者，都要测试双模式是否正常支持，生态成本大。
2. src/dist模式，让uni-app版本和IDE版本解耦，经常会出现IDE提示报错、但实际能运行，或者反之。

目前IDE中高频更新的是uni-agent，其他常规IDE功能已经越来越少人用。所以HBuilder采取的策略是大版本和uni-app x绑定，但uni-agent插件及部分IDE插件，可以独立升级更新，与大IDE升级解耦。

uni-app x同时支持通过HBuilder cli来创建项目、发行打包，可以在Linux的ci/cd里正常使用。[详见](https://hx.dcloud.net.cn/cli/README)

### unpackage @unpackage

以下说明适用于通过 HBuilder 界面或 CLI 运行、发行 uni-app x 项目时生成的 `unpackage` 目录。

`unpackage` 位于项目根目录，保存编译输出、运行基座、本地打包资源、云打包下载产物、wgt 资源包、缓存和诊断日志。

#### 目录结构 @unpackage-tree

> 说明：以下列出主要目录及典型文件，按实际运行、发行、资源导出和调试功能生成。平台、VDOM／蒸汽模式、HBuilder 版本及配置会影响具体内容；切换配置后可能保留历史产物。`<平台>`、`<模块>`、`<AppID>`、`<HX版本>` 是占位符，`uts_*` 表示同名前缀目录，不是字面目录名。

```
<项目根目录>/unpackage/
├─ dist/                          # 各平台编译产物总目录
│  ├─ dev/                        # 运行（调试）阶段的产物
│  │  ├─ .uvue/                   # uvue 编译中间产物（uni-app x，隐藏目录）
│  │  ├─ .tsc/                    # TypeScript 编译输出（隐藏目录）
│  │  ├─ .sourcemap/              # 调试用 sourcemap（隐藏目录）
│  │  ├─ .automator/              # 自动化测试相关信息（隐藏目录）
│  │  ├─ .app-harmony/            # uni-app x 鸿蒙编译产物
│  │  ├─ app-android/             # uni-app x Android 编译产物
│  │  ├─ app-ios/                 # uni-app x iOS 真机/模拟器编译产物
│  │  ├─ app-harmony/             # 调试运行时组装的原生鸿蒙工程（DevEco 工程）
│  │  ├─ mp-weixin/               # 微信小程序编译产物
│  │  ├─ mp-alipay/               # 支付宝小程序编译产物
│  │  └─ web/                     # Web 开发模式路径，站点由开发服务器提供
│  ├─ build/                      # 发行（打包）阶段的产物
│  │  ├─ .uvue/                   # uvue 编译中间产物（按编译流程生成）
│  │  ├─ .tsc/                    # TypeScript 编译输出（按编译流程生成）
│  │  ├─ .sourcemap/              # 按 sourcemap 选项生成
│  │  ├─ .automator/              # 按自动化测试选项生成
│  │  ├─ .app-harmony/            # uni-app x 鸿蒙发行产物
│  │  │  └─ cpp/                 # 蒸汽模式发行选择机器码时的 C++ 源码，按需生成
│  │  ├─ app-android/             # uni-app x Android 发行产物
│  │  ├─ app-ios/                 # uni-app x iOS 发行产物
│  │  ├─ app-harmony/             # 本地打包发行时组装的原生鸿蒙工程（DevEco 工程）
│  │  ├─ mp-weixin/               # 微信小程序发行产物
│  │  ├─ mp-alipay/               # 支付宝小程序发行产物
│  │  └─ web/                     # H5/Web 平台发行产物
│  └─ cache/                      # Vite 缓存目录
│     └─ .vite/                   # Vite 依赖预构建等缓存
├─ resources/                     # 本地打包 App 资源目录
│  ├─ app-android/
│  │  ├─ <AppID>/www/            # Android 应用资源
│  │  ├─ uni_modules/<模块>/utssdk/app-android/ # 对应插件的原生产物，存在时导出
│  │  └─ uniappx/                # 编译输出中的 .uniappx 产物，存在时导出
│  ├─ app-ios/
│  │  ├─ <AppID>/www/            # iOS 应用资源
│  │  ├─ uni_modules/<模块>/utssdk/app-ios/ # 对应插件的原生产物，存在时导出
│  │  └─ uniappx/                # 编译输出中的 .uniappx 产物，存在时导出
│  └─ app-harmony/               # 本地打包App资源的产物
│     ├─ <AppID>/www/            # 鸿蒙应用资源
│     ├─ uni_modules/            # 鸿蒙插件资源及 index.generated.ets 等，按实际产物导出
│     └─ uniappx/                # 编译输出中的 .uniappx 产物，存在时导出
├─ release/                       # 发行产物：云打包下载文件、默认导出的 wgt 资源包
│  ├─ <云打包产物文件名>          # 满足自动下载条件时生成，文件名由云端返回
│  ├─ app-android/<AppID>.wgt     # Android 蒸汽模式字节码资源包（HBuilder 5.31+）
│  └─ app-ios/<AppID>.wgt         # iOS 蒸汽模式字节码资源包（HBuilder 5.31+）
├─ debug/                         # 运行基座文件目录
│  ├─ android_debug.apk           # Android 自定义基座
│  ├─ android_debug_vapor.apk     # Android 自定义基座（蒸汽模式）
│  ├─ iOS_debug.ipa               # iOS 自定义基座
│  ├─ iOS_debug_vapor.ipa         # iOS 自定义基座（蒸汽模式）
│  ├─ iOS_debug_<HX版本>.ipa      # iOS VDOM 模式标准基座的项目内副本（按 HBuilder 版本命名）
│  ├─ iOS_debug_vapor_<HX版本>.ipa # iOS 蒸汽模式标准基座的项目内副本（按 HBuilder 版本命名）
│  ├─ iOS_debug_sdk.ipa           # iOS 自定义离线 SDK 基座
│  ├─ Pandora_simulator_debug.app # iOS 模拟器自定义基座
│  ├─ Pandora_simulator_debug_vapor.app # iOS 模拟器自定义基座（蒸汽模式）
│  ├─ Pandora_simulator_debug_<HX版本>.app # 模拟器 VDOM 模式标准基座的项目内副本（x86_64/默认架构）
│  ├─ Pandora_simulator_debug_arm64_<HX版本>.app # 模拟器 VDOM 模式标准基座的项目内副本（arm64）
│  ├─ Pandora_simulator_debug_vapor_<HX版本>.app # 模拟器蒸汽模式标准基座的项目内副本（x86_64/默认架构）
│  ├─ Pandora_simulator_debug_vapor_arm64_<HX版本>.app # 模拟器蒸汽模式标准基座的项目内副本（arm64）
│  └─ app-harmony/                # 自动化测试时组装的原生鸿蒙工程（DevEco 工程）
├─ cache/                         # 编译与调试缓存
│  ├─ .app-android/               # Android VDOM 模式编译缓存（含 src、class、dex、sourcemap、tsc 等）
│  ├─ .app-ios/                   # iOS VDOM 模式编译缓存，真机/模拟器共用此命名（含 tsc、sourcemap、.uts2js 等）
│  ├─ .app-harmony/               # 鸿蒙 VDOM 模式编译缓存（含 .uts2js/cache 等）
│  ├─ .web/                       # H5/Web 编译缓存（含 .uts2js/cache 等）
│  ├─ .mp-weixin/                 # 微信小程序编译缓存（含 .uts2js）
│  ├─ .mp-alipay/                 # 支付宝小程序编译缓存（含 .uts2js）
│  ├─ uts_standard_android/       # UTS 插件编译产物缓存（Android 标准基座）
│  ├─ uts_custom_android/         # UTS 插件编译产物缓存（Android 自定义基座）
│  ├─ uts_custom_sdk_android/     # UTS 插件编译产物缓存（Android 自定义离线 SDK 基座）
│  ├─ uts_standard_ios/           # UTS 插件编译产物缓存（iOS 真机标准基座）
│  ├─ uts_custom_ios/             # UTS 插件编译产物缓存（iOS 真机自定义基座）
│  ├─ uts_custom_sdk_ios/         # UTS 插件编译产物缓存（iOS 真机自定义离线 SDK 基座）
│  ├─ uts_standard_simulator/     # UTS 插件编译产物缓存（iOS 模拟器标准基座，x86_64/默认架构）
│  ├─ uts_custom_simulator/       # UTS 插件编译产物缓存（iOS 模拟器自定义基座，x86_64/默认架构）
│  ├─ uts_custom_sdk_simulator/   # UTS 插件编译产物缓存（iOS 模拟器自定义离线 SDK 基座，x86_64/默认架构）
│  ├─ uts_standard_simulator_arm64/     # UTS 插件编译产物缓存（iOS arm64 模拟器标准基座）
│  ├─ uts_custom_simulator_arm64/       # UTS 插件编译产物缓存（iOS arm64 模拟器自定义基座）
│  ├─ uts_custom_sdk_simulator_arm64/   # UTS 插件编译产物缓存（iOS arm64 模拟器自定义离线 SDK 基座）
│  ├─ vapor/                      # 蒸汽模式缓存（App 字节码及 Web）
│  │  ├─ .app-android/            # Android 蒸汽模式字节码编译缓存（含 .uts2js/cache 等）
│  │  ├─ .app-ios/                # iOS 蒸汽模式编译缓存（含 .uts2js/cache 等）
│  │  ├─ .app-harmony/            # 鸿蒙蒸汽模式编译缓存（含 .uts2js/cache 等）
│  │  ├─ .web/                    # Web 蒸汽模式编译缓存（含 .uts2js/cache 等）
│  │  └─ uts_*/                   # 按平台、基座类型及模拟器架构区分的 UTS 插件编译产物缓存
│  ├─ vapornativecode/            # 鸿蒙蒸汽模式发行选择机器码时的缓存
│  │  └─ .app-harmony/            # 鸿蒙机器码编译缓存（含 .uts2js/cache 等）
│  ├─ cloudcertificate/           # 云打包证书缓存
│  ├─ apk/                       # 安装包上传等流程使用的下载缓存，按文件类型生成
│  └─ ipa/                       # 同上；其他包类型按扩展名使用同名缓存目录
└─ logs/                          # 崩溃、内存泄漏等日志
   ├─ android/                    # Android 运行/崩溃日志
   ├─ app-android/                # 部分上报流程按平台标识保存的 Android 日志
   ├─ ios/                        # iOS 真机日志，崩溃监控可按设备 UDID 分子目录
   ├─ ios-simulator/              # iOS 模拟器日志，崩溃监控可按设备 UDID 分子目录
   └─ harmony/                    # 鸿蒙崩溃日志
```

#### 目录说明 @unpackage-directories

##### dist（编译输出）

`dist/dev` 保存运行产物，`dist/build` 保存发行产物；各平台目录见目录树和下方平台说明。Web 运行时由开发服务器按需提供内容，不生成可部署站点；部署产物通过发行构建生成。

- `.uvue`、`.tsc`：编译中间输出。
- `.sourcemap/<平台>`：源码映射，按 sourcemap 选项生成。
- `.automator/<平台>/.automator.json`：自动化测试信息，按调试选项生成。
- `.app-harmony`：用于组装鸿蒙原生工程的编译产物，详见鸿蒙章节。

uni-app x 的平台编译缓存由 HBuilder 指定到 `unpackage/cache` 下，按平台和模式区分，详见下方 cache 章节。

UTS 原生插件产物也位于平台输出中，例如 `dist/dev/app-android/uni_modules/<模块>/utssdk/app-android/index.kt`、`dist/dev/app-ios/uni_modules/<模块>/utssdk/app-ios/index.swift`。

##### cache（编译与调试缓存）

- **Vite 缓存**：`dist/cache/.vite`，用于 Vite 的依赖预构建等。
- **平台编译缓存**：VDOM App 使用 `.app-android`、`.app-ios`、`.app-harmony`，Web/小程序使用 `.web`、`.mp-weixin`、`.mp-alipay` 等。常见内容有 `tsc`、`.uts2js/cache`、`sourcemap`；加密插件还可能生成 `.encrypt/<dev或build>/<平台>`。Android VDOM 另有 `src`、`class`、`dex`，如页面源码 `cache/.app-android/src/pages/index/index.kt`。
- **蒸汽模式缓存**：App 字节码使用 `vapor/.app-android`、`vapor/.app-ios`、`vapor/.app-harmony`，Web 使用 `vapor/.web`；鸿蒙机器码发行使用 `vapornativecode/.app-harmony`。
- **UTS 插件编译产物缓存**：`uts_*`，内部结构见下文。
- **安装包下载缓存**：上传安装包等流程按文件类型使用 `apk`、`ipa` 等目录，与 `release` 中的发行产物用途不同。
- **云打包证书缓存**：`cloudcertificate`。

###### UTS 插件缓存结构

`uts_*` 按平台、基座类型和模拟器架构命名；`standard`、`custom`、`custom_sdk` 分别表示标准、自定义、自定义离线 SDK 基座。蒸汽模式的同名缓存位于 `cache/vapor/`。配置、sourcemap、清单及 UASM 原生库注入记录按编译步骤生成：

```
<UTS 插件编译产物缓存目录>/
├─ app-android/uts/uni_modules/<模块>/   # Android：index.kt、classes.dex、index.jar、config.json 等
├─ app-ios/uts/uni_modules/<模块>/       # iOS 真机/模拟器：index.swift、config.json 等
├─ app-ios/uasm/uni_modules/<模块>/uasm/manifest.json # iOS UASM 插件的原生库复制记录，按需生成
├─ modules/                              # iOS 与 iOS 模拟器：需注入基座的第三方原生模块（.framework 等）
├─ Resources/                            # iOS 与 iOS 模拟器：待注入应用包的原生资源
├─ app-ios-debug.json                    # iOS 与 iOS 模拟器：iOS 编译信息
├─ uniapp-x-uts.json                     # UTS 编译信息
└─ .cache-meta.json                      # 基座依赖缓存元数据，按缓存初始化/恢复流程生成
```

Android、iOS 子目录分别位于对应平台的缓存中。`modules/`、`Resources/` 暂存 iOS 待注入的模块和资源，处理后清理：真机注入 IPA 解压后的 `Payload/<应用>.app/`，模拟器直接注入 `.app` 包。`.cache-meta.json` 位于具体基座依赖缓存内，记录基座文件指纹，用于判断是否需要刷新缓存。

###### iOS 模拟器架构

缓存和标准基座副本按模拟器报告的 CPU 类型区分，不按 Mac 芯片类型判断：

- 支持 `x86_64`（包括同时支持 arm64）或架构未知：使用不带 `_arm64` 后缀的模拟器缓存及默认架构基座。
- 仅支持 arm64：使用 `uts_standard_simulator_arm64`、`uts_custom_simulator_arm64`、`uts_custom_sdk_simulator_arm64`，标准基座副本也带 `_arm64` 标识，完整文件名见目录树。

iOS 真机和 Android 不受此架构拆分影响。

##### debug（运行基座）

自定义基座可由云打包生成，或按离线调试流程自行打包。自行打包的基座按对应平台运行文档的命名要求放入 `unpackage/debug`，然后在 HBuilder 中选择使用自定义基座运行。各基座文件名见目录树；`iOS_debug_sdk.ipa` 用于自定义离线 SDK 基座。

###### iOS 标准基座的项目内副本

- 使用标准基座运行时，HBuilder 根据 UTS／UASM 使用情况及蒸汽模式，按需在 `debug` 中创建或复用带版本号的副本：文件不存在时从内置基座复制，存在时复用；无需副本时使用内置基座。
- 副本创建与重建／重签是不同步骤。有待注入的原生模块或资源时，本次选用的标准或自定义基座会进行注入及相应的重建／重签；已有副本也可能因插件变更再次处理。
- 文件名区分 HBuilder 版本、蒸汽模式及模拟器架构。切换模式、版本或改用自定义基座后，目录中可能保留此前使用的标准基座副本；实际使用哪个以本次运行配置和控制台提示为准。

##### resources（本地打包资源）

保存本地打包／资源导出的 App 资源，供离线集成使用：

- 应用资源位于 `<平台>/<AppID>/www`，平台为 `app-android`、`app-ios` 或 `app-harmony`。
- Android/iOS 的 UTS 插件原生产物存在时，导出到 `<平台>/uni_modules/<模块>/utssdk/<平台>/`。
- 鸿蒙插件资源按实际编译产物导出到 `app-harmony/uni_modules`，其中还可能包含 `index.generated.ets`（扩展 API 和 UTS 插件初始化入口）、`oh-package.json5`、`build-profile.json5` 等文件。
- 编译输出中存在 `.uniappx` 目录时，会导出为 `<平台>/uniappx`。`uniappx`、`uni_modules` 与 `<AppID>` 同级，均位于 `www` 之外；离线集成时需一并检查这些目录。

##### release（发行产物）

- 云打包发行包满足自动下载条件时，按云端返回的包名直接保存到 `release/` 下。
- 当前插件对未指定渠道、渠道为“无”（含“无-aab”）或 iOS App Store 包提供下载地址，不自动保存到此目录；关闭产物下载时也不会生成本地文件。实际下载结果以控制台提示为准。
- 云打包自定义调试基座下载到 `debug`，不属于这里的发行包。
- HBuilder 5.31+ 支持通过发行菜单导出 uni-app x 的 wgt 资源包，适用于 Android/iOS 蒸汽模式的字节码产物；鸿蒙暂不支持 wgt 热更新。
- 默认按平台导出到 `release/app-android/<AppID>.wgt`、`release/app-ios/<AppID>.wgt`。导出时可以指定其他保存位置，实际路径以导出配置和控制台提示为准。
- wgt 是用于热更新的前端资源包，包含页面、脚本和静态资源，不包含原生插件。不同平台的 wgt 分别生成和使用。

#### 平台产物 @unpackage-platforms

产物表中的路径相对于各平台编译输出目录。“共有”表示 VDOM、蒸汽模式都可能生成，文件内容仍可不同。具体文件取决于运行／发行阶段、编译选项和项目内容。

蒸汽模式的 App 视图层：Android/iOS 运行和发行均使用字节码；鸿蒙运行使用字节码，发行可选字节码或机器码。页面和组件逻辑层仍使用 JS。

##### Android（app-android）

编译产物位于 `dist/dev/app-android`（运行）和 `dist/build/app-android`（发行）。

###### 共有产物（VDOM／蒸汽模式）

| 文件／目录                                              | 用途与生成条件                                                       |
| ------------------------------------------------------- | -------------------------------------------------------------------- |
| `manifest.json`                                         | 供运行和打包使用的应用配置，经过条件编译、平台处理或模块裁剪         |
| `uni_modules/<模块>/utssdk/app-android/`                | 使用 UTS 原生插件时生成的 Kotlin 源码、配置等产物                    |
| `static/`、`uni_modules/<模块>/static/`、`hybrid/html/` | 应用、插件的静态资源及本地 HTML；存在时按平台规则复制                |
| `androidPrivacy.json`                                   | Android 隐私政策配置；项目提供该文件且当前流程启用隐私政策配置时生成 |

###### VDOM 模式产物

| 文件／目录                                          | 用途与生成条件                                                           |
| --------------------------------------------------- | ------------------------------------------------------------------------ |
| `index/classes.dex`、其他分块路径下的 `classes.dex` | 调试时按代码分块生成，供 Android 基座加载应用及页面代码                  |
| `.uniappx/android/src/`                             | 发行时生成的 Kotlin 源码，如 `index.kt` 及页面等分块源码，供原生打包使用 |

VDOM 调试阶段的 Kotlin 源码位于 `cache/.app-android/src/`，平台输出主要提供基座加载的 DEX。

###### 蒸汽模式产物

| 文件／目录       | 用途与生成条件                                       |
| ---------------- | ---------------------------------------------------- |
| `app-service.js` | 应用及页面的 JS 逻辑入口                             |
| `app-config.js`  | 页面路由、窗口等运行配置；由 `pages.json` 等配置生成 |
| `bytes/`         | 视图层字节码，按页面、组件等生成                     |

##### iOS（app-ios，真机／模拟器）

真机与模拟器均输出到 `dist/dev/app-ios`（运行）、`dist/build/app-ios`（发行）；原生依赖缓存和基座按设备类型、架构分别处理，规则见上方 cache、debug 章节。

###### 共有产物（VDOM／蒸汽模式）

| 文件／目录                                              | 用途与生成条件                                        |
| ------------------------------------------------------- | ----------------------------------------------------- |
| `manifest.json`                                         | 编译处理后的应用配置，供运行和打包使用                |
| `app-service.js`                                        | 应用及页面的 JS 逻辑入口                              |
| `app-config.js`                                         | 页面路由、窗口等运行配置；由 `pages.json` 等配置生成  |
| `uni_modules/<模块>/utssdk/app-ios/`                    | 使用 UTS 原生插件时生成的 Swift 源码、配置等产物      |
| `static/`、`uni_modules/<模块>/static/`、`hybrid/html/` | 应用、插件的静态资源及本地 HTML；存在时按平台规则复制 |

应用及页面逻辑编译为 JS；Swift 产物属于 UTS 原生插件。

###### 蒸汽模式产物

| 文件／目录 | 用途与生成条件 |
| ---------- | -------------- |
| `bytes/`   | 视图层字节码   |

##### 鸿蒙（app-harmony）

- `app-harmony` 保存由 HBuilder 组装的鸿蒙原生工程。默认目录布局下，用于组装工程的代码、资源等编译产物保存在同级隐藏目录 `.app-harmony` 中；自定义工程目录或联编配置下，两者不一定同级。
- 默认运行工程为 `dist/dev/app-harmony`，发行工程为 `dist/build/app-harmony`。
- 原生构建产物位于工程的构建输出目录：`.hap` 是模块安装包，`.app` 是用于发布分发的 App Pack；具体路径和签名状态以构建结果为准。
- 可使用 DevEco Studio 打开该原生工程进行调试。需要长期保留的原生修改应放在项目的插件/原生资源配置中，或使用独立宿主工程进行联编调试，避免仅修改自动组装工程后被后续同步或重建覆盖。
- 工程目录可以被自定义，且不限于 `unpackage`：
  - 调试运行时开启联编调试（`debugWithNativeHarmony`）并配置 `nativeHarmonyProjectPath` 后，优先使用指定宿主工程；
  - 其他运行/发行场景可通过 `.hbuilderx/launch.json` 的 `distPathDev` / `distPathBuild` 指定工程目录；
- 崩溃日志保存在 `logs/harmony`。

鸿蒙的初始化文件由编译器生成在实际编译输出目录的 `uni_modules/index.generated.ets`。排查组装后的原生工程时，应核对工程中实际使用的插件及初始化文件，工程内的副本位置以本次组装结果为准。

指定原生工程并直接向工程输出时，插件位于 `<原生工程>/uni_modules/<模块>/`，应用脚本输出到 `<原生工程>/entry/src/main/resources/resfile/apps/HBuilder/www/`，上述初始化文件随编译输出生成在该目录的 `uni_modules/` 下。应以本次实际输出路径为准，避免误查旧的 `.app-harmony`。

以下产物表中的路径相对于 `.app-harmony`。编译流程还可能在同级生成 `.uvue`、`.tsc`、`.sourcemap` 等中间输出或调试信息；编译缓存另存于 `cache`，按模式区分。

###### 共有产物（VDOM／蒸汽模式）

| 文件／目录                                              | 用途与生成条件                                                                            |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `app-service.js`                                        | 应用及页面的 JS 逻辑入口                                                                  |
| `app-config.js`、`manifest.json`                        | 页面路由、窗口配置及编译处理后的应用配置                                                  |
| `import/`                                               | 加载应用脚本的 ArkTS 桥接入口，如 `app-service.ets`、`app-config.ets`；其他入口按配置生成 |
| `uni_modules/index.generated.ets`                       | 编译器生成的扩展 API 和 UTS 插件初始化入口，供原生工程集成                                |
| `uni_modules/<模块>/`                                   | 对应插件的鸿蒙实现、配置和资源；使用相应插件时生成                                        |
| `assets/`                                               | 拆分后的 JS 模块等资源；启用相应模块输出和代码分块时生成                                  |
| `static/`、`uni_modules/<模块>/static/`、`hybrid/html/` | 应用、插件的静态资源及本地 HTML；存在时按平台规则复制                                     |

###### 蒸汽模式产物

按所选视图层编译目标生成：

| 文件／目录 | 用途与生成条件                                                                                |
| ---------- | --------------------------------------------------------------------------------------------- |
| `bytes/`   | 选择字节码目标时生成的视图层资源                                                              |
| `cpp/`     | 发行选择机器码时生成的视图层 C++ 源码，供原生工程构建；默认位于 `dist/build/.app-harmony/cpp` |

##### 微信小程序（mp-weixin）

运行和发行的输出目录分别为 `dist/dev/mp-weixin`、`dist/build/mp-weixin`。可用微信开发者工具打开对应目录。

| 文件／目录                              | 用途与生成条件                                                                                              |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `app.js`                                | 小程序应用入口                                                                                              |
| `app.json`                              | 页面列表、窗口、分包等小程序配置；由项目页面及平台配置生成                                                  |
| `app.wxss`                              | 编译后的应用级样式                                                                                          |
| `uvue.wxss`                             | uni-app x 基础样式，独立分包可有各自副本                                                                    |
| `project.config.json`                   | 微信开发者工具配置；优先使用项目提供的配置，否则根据 `manifest.json` 等生成                                 |
| `<页面或组件路径>.*`                    | 页面／组件的 `.js` 逻辑、`.json` 配置、`.wxml` 模板、`.wxss` 样式；按项目内容生成，如 `pages/index/index.*` |
| `common/`                               | 按编译结果生成的公共依赖和视图辅助代码，如 `vendor.js`、`uniView.wxs`；独立分包可有自己的公共文件           |
| `static/`、`uni_modules/<模块>/static/` | 应用及插件静态资源，存在时按平台规则复制                                                                    |
| `sitemap.json`、`custom-tab-bar/` 等    | 微信专用配置和自定义组件，项目提供且使用时复制                                                              |

分包产物位于配置的分包根目录下。`project.private.config.json` 也可能由项目复制或由微信开发者工具生成、维护，不应当作每次编译必然生成的文件。

##### Web（web）

运行阶段由开发服务器提供 HTML、脚本和样式，不在 `dist/dev/web` 生成可部署站点。部署时使用发行构建生成的产物，默认位于 `dist/build/web`。

| 文件／目录                              | 用途与生成条件                                                         |
| --------------------------------------- | ---------------------------------------------------------------------- |
| `index.html`                            | 发行构建的 HTML 入口；运行时由开发服务器提供                           |
| `assets/`                               | 发行构建的 JS、CSS、页面分块及导入资源；文件名通常带哈希，目录名可配置 |
| `static/`、`uni_modules/<模块>/static/` | 应用及插件静态资源，存在时按平台规则筛选并保留相对路径复制             |
| `*.map`                                 | 源码映射文件，开启 sourcemap 时生成，位置随构建配置变化                |

VDOM／蒸汽模式均输出 Web 使用的 HTML、JS、CSS 和资源。部署时应使用完整发行目录，资源访问路径还受 Web 部署路径、路由模式及构建配置影响。

#### 产物排错 @unpackage-troubleshooting

不直接编辑自动生成的编译产物，修改可能在重新构建时被覆盖；应修改项目源码后重新编译验证。

使用编译产物排查问题时，先确认本次 HBuilder 运行或发行的目标平台、VDOM／蒸汽模式，并根据控制台提示定位实际输出路径。以下路径相对于 `unpackage`，`<阶段>` 为 `dev` 或 `build`；同一路径可能被不同模式的编译覆盖，也可能保留上次构建的文件。

##### UVUE 页面与应用 UTS 代码

UVUE 文件中的脚本、项目内普通 `.uts` 文件与 `utssdk` 中的原生插件应分别查找；不能仅凭 `.uts` 扩展名就认定会生成 Kotlin 或 Swift。

| 排查对象                                    | 优先查看的位置与内容                                                                                                                                                                               |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android VDOM 页面、组件及应用逻辑           | 运行时查 `cache/.app-android/src/` 下的 Kotlin，如 `pages/index/index.kt`；发行时查 `dist/build/app-android/.uniappx/android/src/`。按页面路径、函数或类名搜索，核对报错附近的类型、调用和生成代码 |
| Android 蒸汽模式、iOS、鸿蒙的页面及应用逻辑 | 查对应平台输出中的 `app-service.js` 及其引用的 JS 分块；Android/iOS 输出为 `dist/<阶段>/app-android`、`dist/<阶段>/app-ios`，鸿蒙默认编译输出为 `dist/<阶段>/.app-harmony`                         |
| UVUE 编译中间步骤                           | 按实际生成情况查 `dist/<阶段>/.uvue/<平台>/`、`dist/<阶段>/.tsc/<平台>/`，用于判断问题发生在哪一步；中间输出不等同于最终运行代码                                                                   |
| 蒸汽模式视图层                              | 查平台输出中的 `bytes/` 是否有相应页面／组件产物；字节码不能当作文本源码阅读。鸿蒙发行选择机器码时，可查 `dist/build/.app-harmony/cpp/` 中生成的 C++                                               |
| 微信小程序页面／组件                        | 查 `dist/<阶段>/mp-weixin/<页面或组件路径>.js`、`.wxml`、`.wxss`、`.json` 及引用的公共分块，分别核对逻辑、模板、样式、配置                                                                         |
| Web 页面／组件                              | 运行时通过浏览器开发者工具查看开发服务器实际加载的模块；发行时查 `dist/build/web/assets/` 中的脚本、样式和分块                                                                                     |

源码位置与生成代码行号通常不同；生成了 sourcemap 时，应结合 `dist/<阶段>/.sourcemap/`、对应平台缓存中的 `sourcemap/` 或产物旁的 `.map` 文件定位原始源码。文件位置与是否生成取决于编译链路和 sourcemap 选项，不能假定每份产物都有映射。

##### UTS 原生插件

以 `uni_modules/<模块>/utssdk` 中的插件为例，先确认本次目标平台实际选中的实现，再查看生成代码。插件中的多个 UTS 文件可能合并到一个入口产物，应按导出函数、类名或报错位置查找，不要求与源文件逐一对应。

| 目标平台         | 优先查看的生成代码                                                                                                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android          | `dist/<阶段>/app-android/uni_modules/<模块>/utssdk/app-android/index.kt`，核对 UTS 转换后的 Kotlin；同目录还可能有原生混编文件、配置和运行所需的 `classes.dex`               |
| iOS 真机／模拟器 | `dist/<阶段>/app-ios/uni_modules/<模块>/utssdk/app-ios/index.swift`，核对 UTS 转换后的 Swift；结合同目录的原生混编文件、配置和本次原生编译日志排查                           |
| 鸿蒙             | 默认查 `dist/<阶段>/.app-harmony/uni_modules/<模块>/utssdk/app-harmony/index.ets`，核对生成的 ArkTS；同时检查插件依赖配置和 `uni_modules/index.generated.ets` 中的初始化信息 |

鸿蒙指定原生工程时的输出路径及工程副本说明，见上方鸿蒙章节。

Android/iOS 运行时还需检查与本次基座匹配的 **UTS 插件编译产物缓存**：

- 先按上方 cache 章节选择平台、标准／自定义基座及 iOS 模拟器架构；蒸汽模式从 `cache/vapor/uts_*` 查起，VDOM 从 `cache/uts_*` 查起。
- 在所选缓存的 `app-android/uts/uni_modules/<模块>/` 或 `app-ios/uts/uni_modules/<模块>/` 中查生成代码、配置和 sourcemap（存在时）。Android 的 `classes.dex` 用于运行，`index.jar` 可供后续编译依赖；它们不能代替 `index.kt` 用于源码对照。
- 命中缓存时可能跳过重新编译。Android 会从缓存恢复调试用 Kotlin 和 DEX；iOS 不保证每次都重新生成或恢复输出目录中的 Swift。文件缺失时先检查本次编译日志及对应缓存，不能直接认定插件未编译。
- 生成代码正确但运行行为未更新时，还应核对本次基座、插件原生依赖的编译／注入及安装结果。`modules/`、`Resources/` 是 iOS 注入暂存目录，处理后会清理，目录为空不代表插件没有生效。

上述源码路径针对本地编译的非加密插件；加密插件或基座内已有的原生依赖不保证提供可读生成源码。插件若选用 JS 实现，应回到对应平台的 JS 输出查找。

排错时记录“源文件 → 本次生成文件 → 报错／运行结果”的对应关系。编译失败可能留下旧产物或部分输出；应修正项目源码后重新运行验证，不能以缓存文件存在、生成代码可读或某一步编译成功代替最终构建及运行验证。

##### 蒸汽模式排查

App 蒸汽模式的逻辑层、视图层和原生插件分别生成产物。下表中的平台输出目录为 `dist/<阶段>/app-android`、`dist/<阶段>/app-ios`，鸿蒙默认为 `dist/<阶段>/.app-harmony`；自定义工程路径按鸿蒙章节定位。

| 排查场景                   | 查看顺序与核对内容                                                                                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 页面逻辑、事件或数据异常   | 从平台输出目录的 `app-service.js` 及其引用的 JS 分块查找对应函数或调用，结合 sourcemap 回到原始 UVUE／UTS；原生插件内部异常继续按上方 UTS 原生插件章节排查                                                   |
| 模板、样式或视图异常       | 先查看本次编译／运行错误，再查 `dist/<阶段>/.uvue/<平台>/` 中可读的中间产物及相关映射（存在时）；字节码目标下，核对平台输出目录的 `bytes/` 中是否生成对应页面／组件产物                                      |
| UTS 原生插件编译或调用异常 | 按上方插件产物表核对 Kotlin／Swift／ArkTS 和本次原生编译日志；Android/iOS 再查 `cache/vapor/uts_*` 中与基座及模拟器架构匹配的插件缓存                                                                        |
| 修改后运行行为未更新       | 先确认本次编译完成，并核对输出目录、设备及基座；再检查 `cache/vapor/.app-android`、`cache/vapor/.app-ios`、`cache/vapor/.app-harmony` 中对应平台的缓存。涉及原生插件时，还需核对插件编译、基座集成及安装结果 |
| 鸿蒙机器码发行异常         | 查 `dist/build/.app-harmony/cpp/` 中的 C++、原生工程构建日志及 `cache/vapornativecode/.app-harmony`；与运行阶段的字节码产物分开核对                                                                          |

`bytes/` 中的字节码不能按文本源码阅读，文件存在也不代表视图行为正确。保留本次错误信息，修改项目源码后重新编译并复现；需要排除缓存影响时，按下方“清理缓存”章节操作。

#### 清理缓存 @unpackage-clean-cache

排查修改未生效、增量编译结果异常等问题时，可清理编译缓存后重新运行。先保留错误日志，并保持平台、设备、基座等运行配置一致，便于对比清理前后的结果。

在 HBuilder 中选择“清除缓存后重新运行”；使用 HBuilder CLI 时，在原有 App 启动命令上增加或修改 `--cleanCache true`。以下为设备运行示例，选择对应平台的一条执行，并保留原命令中的基座、证书、视图层编译目标等参数：

```sh
cli launch app-android --project "<项目绝对路径>" --deviceId "<设备ID>" --cleanCache true
cli launch app-ios --project "<项目绝对路径>" --deviceId "<设备ID>" --iosTarget device --cleanCache true
cli launch app-harmony --project "<项目绝对路径>" --deviceId "<设备ID>" --cleanCache true
```

`cli` 指与当前 HBuilder 实例对应的 CLI 可执行文件，使用时替换为安装目录中的实际路径。项目必须已导入 HBuilder，并使用绝对路径。iOS 模拟器将 `--iosTarget device` 改为 `--iosTarget simulator`，同时指定对应模拟器的设备 ID。

基座、发行包和诊断日志应按用途保留，不应全部当作编译缓存删除。

清理随启动流程执行：Android/iOS 的 `--cleanCache` 仅对 uni-app x 生效，鸿蒙的 `true` 对应清理缓存策略。平台编译缓存按平台和模式处理；UTS 插件依赖、基座及鸿蒙工程模板有各自的缓存或重建流程，不会统一删除所有平台的 `uts_*` 或整个 `unpackage`。部分基座依赖可从基座恢复，下载缓存可能需要重新下载。

重新编译后，对比错误日志、生成代码和运行结果，确认修改是否生效；若问题仍然存在，继续检查源码、配置或原生依赖。参数说明可通过对应平台的 `--help` 查看，例如 `cli launch app-android --help`，完整用法见 [HBuilder App 运行 CLI 文档](https://hx.dcloud.net.cn/cli/launch-app)。

## 运行时的UniApp实例

每个uni-app x应用启动，会有一个UniApp实例，通过全局API `getApp()` 获取。

UniApp上有应用级的方法和属性。[详见](./api/get-app.md)

## 运行

新建项目后，可以直接点顶部菜单或工具栏运行，选择要运行的目标平台。

在HBuilder中，有顶部菜单、toolbar运行按钮、快捷键三种运行入口。

1. 顶部运行菜单

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/menurun.png)

2. toolbar工具栏上的运行按钮

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/toolbarrun.png)

	toolbar的运行按钮点击后会展开一个菜单。这个菜单可配置，通过`自定义菜单`将不常用的运行项目折叠起来。

3. 快捷键

	运行快捷键是【Ctrl+r】

	弹出的菜单还支持键盘快捷选择：按回车可以选中菜单的第一项；windows下按数字可以快捷选中菜单项开头数字对应的菜单项。

如果不能看到相关菜单，那么HBuilder当前打开的文件可能不是uni-app x项目下的文件。

运行到不同平台，需要不同平台的运行环境，比如安装浏览器、安装小程序模拟器、安装手机模拟器或电脑端插入真机。

根据提示安装运行环境，并注意观察控制台的日志。

在控制台的右上角，点击红色虫子可以开启debug调试。详见左侧的运行和调试章节。

### 运行到App

uni-app x在运行到Android和iOS时，提供了真机运行基座（playground），该基座安装到手机后，可以把开发者编写代码同步到手机上运行在这个基座上。
并实现修改代码后热刷新，在手机上及时看到效果。

运行到鸿蒙时，没有基座概念，直接调用本地的deveco出包。当然也就不支持热刷新了。

Android和iOS上的基座有标准基座和自定义基座的概念。

和 uni-app/5+App/wap2app 的基座不同，uni-app x的标准基座是一个绿色圆形的U（之前是方型H），基座名称默认为`uni-app x`（之前叫HBuilder）。
![](./static/playground.jpg)

- uni-app x基座，只能运行uni-app x项目，包名是io.dcloud.uniappx
- HBuilder基座，可以运行uni-app/5+App/wap2app。包名是io.dcloud.HBuilder

标准基座使用的图标、包名、证书以及配置的三方sdk的appkey等各种原生信息，都是DCloud的。[详见](./tutorial/app-playground.md)

当需要使用自己的包名、证书、原生配置以及变更三方原生sdk时，需在打包界面勾选打包自定义基座，打包后的自定义基座会放置在项目的unpackage目录下，然后在运行项目时的界面中可以选择自定义基座来运行。

uni-app x运行时，默认仅显示开发者代码和uni-app x框架的输出日志，在控制台右上角还可以选择开启原生日志。

### 运行到web

uni-app x运行到浏览器时，编译基于vite，其特点是按需编译。所以项目运行后很快能看到首页，但后续仍然在编译其他页面直到项目编译完成。

如果后续页面有报错，就会在控制台看到输出。即便这个页面并未打开。

## 发行

选中要发行的项目，点顶部菜单发行（或者对项目点右键，或者快捷键Ctrl+U），选择要发行的目标平台。

所有平台的都支持本地发行，同时依赖本地安装的发布环境。在菜单或弹出界面上有相应的教程链接。

如果发布Android和iOS应用，HBuilder还额外提供了方便的云打包，免去安装和配置原生环境，直接出apk、ipa包。[详见](./tutorial/app-package.md)

除了在菜单里点击发布，也可以通过HBuilder的cli，实现持续集成和自动发布。[详见](https://hx.dcloud.net.cn/cli/README)

如果你不希望直接发布成品应用，而希望发布成其他应用的一部分，那么
- App平台：需参考[uni-app x 原生SDK文档](./native/README.md)，把uni-app x项目，集成到自己的原生项目中。
- 小程序平台：可发布为分包，成为其他小程序的一个分包。[详见](https://uniapp.dcloud.net.cn/hybrid.html)

如果你已经拥有了非uni-app x的成型应用，想要渐进式的引入uni-app x，那么上面的方案非常合适。可以用uni-app x开发部分页面，集成到原来的项目中。

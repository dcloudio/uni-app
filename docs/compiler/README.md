## 什么是 uni-app x 编译器

`uni-app x`的编译器由uts语言编译器、uvue编译器共同组成，其中uts编译器还调用了kotlin、swift编译器。

编译器把开发者书写的uvue和uts代码进行编译，配合运行时实现了跨平台。

uvue编译器是在Vite基础上进行扩展开发的。

它的大部分特性（如条件编译）和配置项（如环境变量）与`uni-app`的vue3编译器一致，[详见](https://uniapp.dcloud.net.cn/tutorial/compiler.html)

支持less、sass、scss等css预编译。

## 条件编译

多端框架，离不开条件编译。

uni-app发明了完善的条件编译，帮助开发者处理平台差异。即保证了大部分通用逻辑的开发效率和复用，又保证了平台特色的充分利用。

在uni-app x中，进一步新增了APP-ANDROID、APP-IOS的条件编译。

因与uni-app的条件编译大部分相同，请详见[uni-app的条件编译文档](https://uniapp.dcloud.net.cn/tutorial/platform.html)

## 编译缓存@cache

`uni-app x`编译器引入了编译缓存机制，以优化开发体验。

在App端，`uni-app x`首先将uts和uvue编译为平台原生语言（如Kotlin），然后经过平台配套的编译器进行打包运行。

编译过程耗时较长，因此编译器引入了缓存机制来加快开发过程。

在编译时，开发者的uts和uvue代码的编译结果会被持久化为缓存，包括所有uts、uvue文件（无论是插件还是项目内的）的编译结果缓存，存在项目的unpackage目录下。

包括uni-app-x iOS平台js引擎驱动下编译的js产物也会产生缓存。

当下次运行时，如果代码没有发生变动，编译器会优先使用缓存中的编译结果，从而加快编译速度。

但升级HBuilderX或编译器版本后，会重新编译。

缓存有可能失效，如果你修改代码后保存发现手机端没有更新，可以在HBuilderX运行窗口勾选`清理构建缓存`试下。

这个机制类似于传统强类型语言开发中的Build和clean。

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app-x/clean-up-the-build-cache.jpg)#{.zooming width="400px"}

### 注意@tips

- `uni-app x`编译器编译Android平台时会在磁盘很多产生kt、class等临时文件。安全软件（如360、微软）会对其进行木马扫描，消耗电脑性能。建议将项目的unpackage目录设置为信任，以提升编译性能。

> 360设置方式

![](https://web-assets.dcloud.net.cn/hbuilderx-doc/360/360_1.png)#{.zooming width="400px"}

![](https://web-assets.dcloud.net.cn/hbuilderx-doc/360/360_2.png)#{.zooming width="400px"}

> 微软设置方式

![](https://web-assets.dcloud.net.cn/hbuilderx-doc/360/win_1.png)#{.zooming width="400px"}

![](https://web-assets.dcloud.net.cn/hbuilderx-doc/360/win_2.png)#{.zooming width="400px"}

- HBuilderX 4.02 以下版本，运行到自定义基座时，报错：uts插件[xxx]不存在，请重新打包自定义基座。 [解决方案](https://issues.dcloud.net.cn/pages/issues/detail?id=781)

- 为优化开发体验减少运行时页面跳转等待时间，HBuilderX 4.28起，运行到web端浏览器打开后会自动触发剩余页面编译。

## 静态资源文件的处理逻辑@static

编译器首先会扫描全局文件和pages.json，根据pages.json扫描每一个页面，再分析每个页面引用的外部资源，比如uts文件、css文件、uvue组件、图片字体等本地静态资源。

**静态资源文件**，分2类：
1. 本地的图片、字体、音视频文件。存放在工程的/static目录（或uni_modules的/static目录）
2. web-view组件加载的本地html文件及配套资源，存放在工程的/hybrid目录

通常，您只需记住：
1. **所有静态资源图片字体音视频文件，都放置在项目根目录下的static目录**。如果是`uni_modules`，放置在`uni_modules`根下的static目录。
2. **所有参与编译的、不是静态资源的文件，比如css、js，都不能放在static目录**

但是你会发现，有时候不放在static下的文件也有机会被访问到。如果您好奇这块的细节，可以继续阅读本节。如果觉得繁琐，只需记住上一条。

编译器在扫描页面文件时，对于页面里import的静态资源文件、以及非变量的静态资源，识别比较容易，
这些静态资源文件会被识别然后复制到编译后的assets目录（不是Android apk的assets目录，是uni-app x编译后和static平级的一个目录），

并且为了防止不同目录的重名文件，assets目录下的文件名末尾会补充hash值。但不确定的文件名也会导致无法使用[file manager](../api/get-file-system-manager.md)的api来访问这些文件。

而对于变量路径的静态资源，因为可能涉及拼接运算等复杂情况，这样的静态资源编译器无法识别，打包后会**丢失这个静态资源文件**。

所以，强烈建议把静态资源都存放在static目录（含uni_modules下的static目录），这个目录下的文件会整体copy到编译产物目录。

当然，由于这个目录是整体copy，所以目录下若存在废弃文件，也会被打包进去。所以要记得清理static目录下的废文件，以减少包体积。

```html
<template>
	<image src="./1.png"/> <!-- 非变量的静态资源，会被编译到assets目录。不推荐 -->
	<image :src="logo"/> <!-- import的静态资源，会被编译到assets目录。不推荐 -->
	<image :src="imga"/> <!-- 变量的静态资源，不会被编译器打包，文件丢失。不推荐 -->
	<image src="/static/3.png"/> <!-- static目录会整体被copy到编译产物。推荐 -->
</template>
<script>
  import logo from './logo.png';
	export default {
		data() {
			return {
				imga: './2.png'
			}
		}
	}
</script>
```

以上代码被编译为apk后，解压apk可以看到如下目录结构：

在`assets\apps\%APPID%\www`目录下，有4个目录：

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─assets
│  ├─1.ab33ac77.png
|  └─logo.abb6eead.png
├─hybrid                App端存放web-view加载的本地html文件的目录
├─static                本地静态资源（如图片、字体、音视频等文件）的目录
|  └─3.png
└─uni_modules           
   ├─hybrid							uni_modules下的web-view加载的本地html文件的目录
	 └─static             uni_modules下的本地静态资源（如图片、字体、音视频等文件）的目录
	</code>
</pre>

**注意**
- `uni_modules`下的非static资源引用，也是编译到根目录的assets下，不会编译到`uni_modules`中
- uts、css等代码文件不是静态资源，它们会被编译为新的代码格式（如Android上会被编译为kt）。
请不要把这些文件放到static目录中，因为会导致代码里已经编进去了，又copy了一份相同文件到发行包中，重复增加了包体积，并且在开发期间会导致2次热更新。

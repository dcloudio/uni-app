### H5正常但App异常的可能性
1. css异常：
- 不支持的选择器
非H5端不支持*选择器；

body的元素选择器请改为page，同样，div和ul和li等改为view、span和font改为text、a改为navigator、img改为image...

- webview浏览器兼容性

vue页面在App端是被系统的webview渲染的（不是手机自带浏览器，是rom的webview），在较老的手机上，比如Android4.4、5.0或iOS8，很多css是不支持的，所以不要使用太新的css，会导致界面异常。

注意这不意味着不能使用flex，Android4.4也支持flex，只是不要使用太新的css。

可以找Android4.4手机或使用pc模拟器实际测试下，大多数国产Android模拟器都是4.4或5.0。

小程序不存在此情况。所以如果你的H5和小程序界面正常，而App界面异常，大多是因为css兼容性。解决这类问题，可以在caniuse查询，也可以使用一个较低版本的chrome浏览器在H5端测试。

Android4.4对应的webview是chrome37，如找不到老版chrome，也可以下载老版HBuilder（在HBuilderX下载页面底部有“上一代HBuilder下载”），在老HBuilder的右上角边改边看模式里是chrome37内核，可以把uni-app的H5版运行起来，将url粘贴到边改边看的浏览器中，点右键可以审查元素，排查不支持的css。

- 原生组件层级问题
H5没有原生组件概念问题，非H5端有原生组件并引发了原生组件层级高于前端组件的概念，要遮挡video、map等原生组件，请使用cover-view组件。

2. 使用了非H5端不支持的API，比如document、xmlhttp、cookie、window、location、navigator、localstorage、websql、indexdb、webgl等对象。如果你的代码没有直接使用这些，那很可能是引入的三方库使用了这些。如果是后者，去[插件市场](https://ext.dcloud.net.cn/)搜索替代方案。要知道非H5端的js是运行在一个独立的js core或v8下，并不是运行在浏览器里。
3. 使用了非H5端不支持的vue语法，比如v-html指令、受小程序自定义组件限制的写法，[详见](/use)
4. 不要在引用组件的地方在组件属性上直接写 style="xx"，要在组件内部写样式
5. `url(//alicdn.net)`等路径，改为`url(https://alicdn.net)`，因为在App端//是file协议
6. 很多人在H5端联网时使用本地测试服务地址(localhost或127.0.0.1)，这样的联网地址手机端必然无法访问，请使用手机可访问的IP进行联网

### H5正常但小程序异常的可能性
1. 同上
2. 小程序要求连接的网址都要配白名单

### 小程序正常但App异常的可能性
1. vue页面在App端是被系统的webview渲染的（不是手机自带浏览器，是rom的webview），在较老的手机上，比如Android4.4、5.0或iOS8，很多css是不支持的，所以不要使用太新的css，会导致界面异常。注意这不意味着不能使用flex，Android4.4也支持flex，只是不要使用太新的css。可以找Android4.4手机或使用pc模拟器实际测试下，大多数国产Android模拟器都是4.4或5.0。小程序不存在此情况。所以如果你的H5和小程序界面正常，而App界面异常，大多是因为css兼容性。解决这类问题，可以在caniuse查询，也可以使用一个较低版本的chrome浏览器在H5端测试。Android4.4对应的webview是chrome37，如找不到老版chrome，也可以下载老版HBuilder（在HBuilderX下载页面底部有“上一代HBuilder下载”），在老HBuilder的右上角边改边看模式里是chrome37内核，可以把uni-app的H5版运行起来，将url粘贴到边改边看的浏览器中，点右键可以审查元素，排查不支持的css。

### 小程序或App正常，但H5异常的可能性
1. 使用了小程序原生组件，而没有使用vue标准的跨端组件。wxcomponets只有小程序和App才支持。

### App正常，小程序、H5异常的可能性
1. 使用了App端特有的plus、Native.js、subNVue、原生插件等功能

### 使用 Vue.js 的注意

1. ```uni-app``` 基于```Vue 2.0```实现，开发者需注意Vue 1.0 -> 2.0 的使用差异，详见[从 Vue 1.x 迁移](https://cn.vuejs.org/v2/guide/migration.html)
2. data 属性必须声明为返回一个初始数据对象的函数；否则页面关闭时，数据不会自动销毁，再次打开该页面时，会显示上次数据
  	
    ```javascript
  	//正确用法，使用函数返回对象
  	data() {
  		return {
  			title: 'Hello'
  		}
  	}
  	//错误写法，会导致再次打开页面时，显示上次数据
  	data: {
  		title: 'Hello'
  	}
  	```
3. 在微信小程序端，```uni-app``` 将数据绑定功能委托给```Vue```，开发者需按```Vue 2.0```的写法实现数据绑定，不支持微信小程序的数据绑定写法，故如下写法不支持：
	
	```javascript
	  <view id="item-{{id}}"></view>	
	```
	需修改为：
	```javascript
	<view v-bind:id="'item-' + id "></view>	
	```
 
### 区别于传统 web 开发的注意
你之前可能习惯自由的web开发，但目前各家小程序都有很多限制。
当然限制是为了在框架层更好的优化用户体验，所以小程序的体验要优于web。
并且这些限制只是写法的限制，并不影响功能。
如果你做过微信小程序开发，对这些限制应该已经很了解了。如果没有做过小程序，请仔细阅读本节。
1. JS注意
	- 非H5端，不能使用浏览器自带对象，比如document、window、localstorage、cookie等，更不能使用jquery等依赖这些浏览器对象的框架。因为各家小程序快应用都不支持这些对象。
	- 没有这些浏览器自带对象并不影响业务开发，uni提供的api足够完成业务。
	- uni的api在编译到web平台运行时，其实也会转为浏览器的js api。
	- uni的api是多端可用的。在条件编译区，每个平台的专有api也可以使用，比如wx.、plus.等api可以分别在微信下和app下使用。
	- 出于降低小程序向uni-app迁移成本的考虑，wx的api在app里也可以直接运行，比如写wx.requst和uni.requst是一样的，但仍然建议仅在微信的条件编译区使用wx的api。
2. Tag注意
	- uni-app的tag同小程序的tag，和HTML的tag不一样，比如div要改成view，span要改成text、a要改成navigator。
	- 出于降低h5应用向uni-app迁移成本的考虑，写成div、span也可以运行在app和小程序上，因为uni-app编译器会把这些HTML标签编译为小程序标签。但仍然建议养成新习惯。
3. Css注意
	- 虽然大部分css样式在微信小程序和app中都可以支持，但推荐使用flex布局模型，这种布局更灵活高效且支持更多平台(比如nvue、快应用只支持flex布局)
	- 单位方面，uni-app默认为rpx。这是一种可跨端的通用单位 [详见](/frame?id=%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D)
4. 工程目录注意
	- 每个要显示的页面，都要放到pages目录下，新建一个页面所在的目录，然后放同名目录的vue文件，比如project/pages/lista/lista.vue，并且在pages.json里配置。这与小程序的策略相同。
	- 自定义组件，放到component目录
	- 静态资源如图片，固定放到static目录下。这是webpack、mpvue的规则
5. 数据绑定方式的注意
	- ```uni-app``` 基于```Vue 2.0```实现，开发者需注意Vue 1.0 -> 2.0 的使用差异，详见[从 Vue 1.x 迁移](https://cn.vuejs.org/v2/guide/migration.html)
	- 
6. 每个页面支持使用原生title，首页支持使用原生底部tab，这些是要在pages.json里配置，这些并不是vue页面的一部分。当然vue里的js api也可以动态修改原生title
6. 虽然使用vue，但在app和小程序里，不是spa而是mpa
7. 位置坐标系统一为国测局坐标系gcj02，这种坐标系可以被多端支持。老版5+的百度定位和百度地图使用的是百度私有坐标系bd09ll，这种坐标系需要转换。新版uni-app里的百度地图已经默认改为gcj02。高德地图不受影响，一直是gcj02

### H5 开发注意

* H5 发布到服务器注意：
    1. 配置发行后的路径（发行在网站根目录可不配置），比如发行网站路径是 www.xxx.com/html5，在 ``manifest.json`` 文件内编辑 h5 节点，router 下增加 base 属性为 html5
<div>
<img src="https://img-cdn-qiniu.dcloud.net.cn/uploads/article/20181116/6ab94f68e109bb07e4f422c95a2c9015.png" width="500">
</div>
    2. 点击菜单 发行-> H5
    3. 在当下项目下的 ``unpackage/dist/build/h5`` 目录找到出的资源，部署服务器（或者使用本地服务器预览）

* 引用第三方 js 的方式：
    1. 通过 npm 引入（通过条件编译，只有是 h5 平台是才 import 相应的库）
    2. 在 ``manifest.json`` 文件编辑 h5 节点的 template 属性，填写 html 模版路径，在 html 模版里面可以使用 script 的方式引入三方的 js，如下示例是加了百度统计的 html 模板部分代码，模版全部代码可参考：[自定义模板](/collocation/manifest?id=h5-template)
```
...
<body>
            <noscript>
                <strong>Please enable JavaScript to continue.</strong>
            </noscript>
            <div id="app"></div>
            <!-- built files will be auto injected -->
            <script>
                var _hmt = _hmt || [];
                (function() {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?xxxxxx";
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(hm, s);
                })();
            </script>
</body>
...
```

* 组件方面：支持 ``mpvue`` 组件、支持普通 ``vue`` 组件、不支持小程序自定义组件、不支持 ``nvue``。

* H5 版 ``uni-app`` 全支持 ``vue`` 语法，所以可能造成部分写法在 H5 端生效，在小程序或 App 端不生效。

* H5 校验了更严格的 ``vue`` 语法，有些写法不规范会报警，比如： ``data`` 后面写对象会报警，必须写 ``function``；不能修改 ``props`` 的值；组件最外层 ``template`` 节点下不允许包含多个节点等。

* 编译为 H5 版后生成的是单页应用（SPA）。

* 如果遇到了白屏或网络不给力的提示，一般是跨域问题，网络请求（request、uploadFile、downloadFile等）在浏览器存在跨域限制，需服务端配合才能跨域。解决方案有2种：
  1. 服务器打开跨域限制；
  2. 本地浏览器安装跨域插件，参考：[Chrome 跨域插件免翻墙安装](http://ask.dcloud.net.cn/article/35267) 或 [firefox跨域插件](https://addons.mozilla.org/zh-CN/firefox/addon/access-control-allow-origin/)。

* APP 和小程序的导航栏和 ``tabbar`` 均是原生控件，元素区域坐标是不包含原生导航栏和 ``tabbar`` 的；而 H5 里导航栏和 ``tabbar`` 是 div 模拟实现的，所以元素坐标会包含导航栏和tabbar的高度。为了优雅的解决多端高度定位问题，``uni-app`` 新增了2个css变量：``--window-top`` 和 ``--window-bottom``，这代表了页面的内容区域距离顶部和底部的距离。举个实例，如果你想在原生``tabbar`` 上方悬浮一个菜单，之前写 ``bottom:0``。这样的写法编译到 h5 后，这个菜单会和 ``tabbar`` 重叠，位于屏幕底部。而改为使用 ``bottom:var(--window-bottom)``，则不管在 app 下还是在h5下，这个菜单都是悬浮在 ``tabbar`` 上浮的。这就避免了写条件编译代码。当然仍然也可以使用 H5 的条件编译处理界面的不同。

* CSS 內使用 ``vh`` 单位的时候注意 ``100vh`` 包含导航栏，使用时需要减去导航栏和 ``tabBar`` 高度，部分浏览器还包含浏览器操作栏高度，使用时请注意。

* 正常支持 ``rpx``，``px`` 是真实物理像素。暂不支持通过设 ``manifest.json`` 的 ``"transformPx" : true``，把 px 当动态单位使用。

* 使用罗盘、地理位置、加速计等相关接口需要使用 https 协议，本地预览（localhost）可以使用 http 协议。

* PC 端 Chrome 浏览器模拟器设备测试的时候，获取位置 API 需要连接谷歌服务器。

* 组件内（页面除外）不支持 ``onLoad``、``onShow`` 等页面生命周期。

* 为避免和内置组件冲突，自定义组件请加上前缀（但不能是 u 和 uni）。比如可使用的自定义组件名称：``my-view``、``m-input``、``we-icon``，例如不可使用的自定义组件名称：``u-view``、``uni-input``，如果已有项目使用了可能造成冲突的名称，请修改名称，另外微信小程序下自定义组件名称不能以 wx 开头。



### 微信小程序开发注意

* [微信小程序当前bug列表](https://developers.weixin.qq.com/community/develop/issueList?type=%E4%BF%AE%E5%A4%8D%E4%B8%AD&block=bug)
* [微信小程序更新日志](https://developers.weixin.qq.com/miniprogram/dev/framework/release/)

### 支付宝小程序开发注意

* [支付宝小程序更新日志](https://docs.alipay.com/mini/ide/framework-changelog)
* 支付宝小程序开发工具：[https://docs.alipay.com/mini/ide/download](https://docs.alipay.com/mini/ide/download)
* 目前无分包的配置，并且包体积限制在 3M。
* showLoading 是不透传的，也就是说 loading 显示的时候无法点击页面内容。
* 文件名或文件夹名中不允许出现 @ 符号。
* 网络请求返回的数据会严格按照 ``dataType`` 进行处理，如果不符合规范则会抛出错误，而不是按照原格式返回。
* ``canvas`` 组件的标识是 ``id``，而不是 ``canvas-id``。目前还未进行处理，所以需要主动添加 id 属性。
* 目前测试的结果，导航栏只有设置背景颜色为 #FFF(FFF) 时才会变成黑色文字。
* 支付宝小程序的导航栏是支持透明渐变效果的，后面会提供相关的配置。
* 使用伪元素做边框时，高度值不能用 ``1rpx``，需要直接用 ``1px``。
* 不支持 ECharts。
* 支付功能模拟不了，需要真机测试。

### 百度小程序开发注意

* [百度小程序更新日志](https://smartprogram.baidu.com/docs/develop/swan/swanchangelog/)
* 百度小程序开发工具：[https://smartprogram.baidu.com/docs/introduction/tool/](https://smartprogram.baidu.com/docs/introduction/tool/)。
* 不支持属性选择器。
* 不支持 ``scoped``。
* login / getUserInfo /支付等功能在模拟器（开发工具）上不能模拟。
* ``map`` 组件在开发工具上预览效果不对，但是手机上是对的。
* ``getSystemInfo`` 获取到的 ``windowHeight`` 在模拟器中值不正确，真机预览是正确的。
* ``v-if`` 和 ``v-for`` 不可在同一标签下同时使用。
* 页面中引入自定义组件时，渲染的结果中外层会有一个 ``template`` 标签，这会导致部分选择器对应的样式匹配不上。
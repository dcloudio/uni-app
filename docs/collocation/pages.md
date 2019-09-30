`pages.json` 文件用来对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等。

它类似微信小程序中`app.json`的**页面管理**部分。注意定位权限申请等原属于`app.json`的内容，在uni-app中是在manifest中配置。

### 配置项列表

|属性|类型|必填|描述|平台兼容|
|:-|:-|:-|:-|:-|
|[globalStyle](/collocation/pages?id=globalstyle)|Object|否|设置默认页面的窗口表现||
|[pages](/collocation/pages?id=pages)|Object Array|是|设置页面路径及窗口表现||
|[tabBar](/collocation/pages?id=tabbar)|Object|否|设置底部 tab 的表现||
|[condition](/collocation/pages?id=condition)|Object|否|启动模式配置||
|[subPackages](/collocation/pages?id=subPackages)|Object Array|否|分包加载配置||
|[preloadRule](/collocation/pages?id=preloadrule)|Object|否|分包预下载规则|微信小程序|
|[workers](https://developers.weixin.qq.com/miniprogram/dev/framework/workers.html)|String|否|```Worker``` 代码放置的目录|微信小程序|

以下是一个包含了所有配置选项的 `pages.json` ：

```javascript
{
	"pages": [{
		"path": "pages/component/index",
		"style": {
			"navigationBarTitleText": "组件"
		}
	}, {
		"path": "pages/API/index",
		"style": {
			"navigationBarTitleText": "接口"
		}
	}, {
		"path": "pages/component/view/index",
		"style": {
			"navigationBarTitleText": "view"
		}
	}],
	"condition": { //模式配置，仅开发期间生效
		"current": 0, //当前激活的模式（list 的索引项）
		"list": [{
			"name": "test", //模式名称
			"path": "pages/component/view/index" //启动页面，必选
		}]
	},
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "演示",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8",
		"usingComponents":{
			"collapse-tree-item":"/components/collapse-tree-item"
		}
	},
	"tabBar": {
		"color": "#7A7E83",
		"selectedColor": "#3cc51f",
		"borderStyle": "black",
		"backgroundColor": "#ffffff",
		"height": "56px",
		"fontSize": "12px",
		"iconWidth": "24px",
		"list": [{
			"pagePath": "pages/component/index",
			"iconPath": "static/image/icon_component.png",
			"selectedIconPath": "static/image/icon_component_HL.png",
			"text": "组件"
		}, {
			"pagePath": "pages/API/index",
			"iconPath": "static/image/icon_API.png",
			"selectedIconPath": "static/image/icon_API_HL.png",
			"text": "接口"
		}],
		"midButton": {
			"width": "80px",
			"height": "56px",
			"text": "文字",
			"iconPath": "static/image/midButton_iconPath.png",
			"iconWidth": "24px",
			"backgroundImage": "static/image/midButton_backgroundImage.png"
		}
	}
}
```

# globalStyle

用于设置应用的状态栏、导航条、标题、窗口背景色等。

|属性|类型|默认值|描述|平台差异说明|
|:-|:-|:-|:-|:-|
|navigationBarBackgroundColor|HexColor|#F7F7F7|导航栏背景颜色（同状态栏背景色）|APP与H5为#F7F7F7，小程序平台请参考相应小程序文档||
|navigationBarTextStyle|String|white|导航栏标题颜色及状态栏前景颜色，仅支持 black/white||
|navigationBarTitleText|String||导航栏标题文字内容||
|navigationStyle|String|default|导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏，需看[使用注意](/collocation/pages?id=customnav)|微信小程序 7.0+、百度小程序、H5、App（2.0.3+）|
|backgroundColor|HexColor|#ffffff|窗口的背景色|微信小程序|
|backgroundTextStyle|String|dark|下拉 loading 的样式，仅支持 dark / light|微信小程序|
|enablePullDownRefresh|Boolean|false|是否开启下拉刷新，详见[页面生命周期](/use?id=页面生命周期)。||
|onReachBottomDistance|Number|50|页面上拉触底事件触发时距页面底部距离，单位只支持px，详见[页面生命周期](/use?id=页面生命周期)||
|backgroundColorTop|HexColor|#ffffff|顶部窗口的背景色（bounce回弹区域）|仅 iOS 平台|
|backgroundColorBottom|HexColor|#ffffff|底部窗口的背景色（bounce回弹区域）|仅 iOS 平台|
|titleImage|String||导航栏图片地址（替换当前文字标题），支付宝小程序内必须使用https的图片链接地址|支付宝小程序、H5、APP|
|transparentTitle|String|none|导航栏透明设置。支持 always 一直透明 / auto 滑动自适应 / none 不透明|支付宝小程序、H5、APP|
|titlePenetrate|String|NO|导航栏点击穿透|支付宝小程序、H5|
|pageOrientation|String|portrait|屏幕旋转设置，仅支持 auto / portrait 详见 [响应显示区域变化](https://developers.weixin.qq.com/miniprogram/dev/framework/view/resizable.html)|微信小程序|
|animationType|String|pop-in|窗口显示的动画效果，详见：[窗口动画](api/router?id=animation)|App|
|animationDuration|Number|300|窗口显示动画的持续时间，单位为 ms|App|
|app-plus|Object||设置编译到 App 平台的特定样式，配置项参考下方 [app-plus](/collocation/pages?id=app-plus)|App|
|h5|Object||设置编译到 H5 平台的特定样式，配置项参考下方 [H5](/collocation/pages?id=h5)|H5|
|mp-alipay|Object||设置编译到 mp-alipay 平台的特定样式，配置项参考下方 [MP-ALIPAY](/collocation/pages?id=mp-alipay)|支付宝小程序|
|mp-weixin|Object||设置编译到 mp-weixin 平台的特定样式|微信小程序|
|mp-baidu|Object||设置编译到 mp-baidu 平台的特定样式|百度小程序|
|mp-toutiao|Object||设置编译到 mp-toutiao 平台的特定样式|字节跳动小程序|
|mp-qq|Object||设置编译到 mp-qq 平台的特定样式|QQ小程序|
|usingComponents|Object| |引用小程序组件，参考 [小程序组件](/frame?id=小程序组件支持)|微信小程序、App|


**注意**

- 支付宝小程序使用`titleImage`时必须使用`https`的图片链接地址，需要真机调试才能看到效果，支付宝开发者工具内无效果
- `globalStyle`中设置的`titleImage`也会覆盖掉`pages`->`style`内的设置文字标题
- navigationBarTextStyle 在iOS13上可能会错乱，此问题后续版本会修复

# pages

`uni-app` 通过 pages 节点配置应用由哪些页面组成，pages 节点接收一个数组，数组每个项都是一个对象，其属性值如下：
 
|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|path|String||配置页面路径|
|style|Object||配置页面窗口表现，配置项参考下方 [pageStyle](/collocation/pages?id=style)||

**Tips：**

- pages节点的第一项为应用入口页（即首页）
- **应用中新增/减少页面**，都需要对 pages 数组进行修改
- 文件名**不需要写后缀**，框架会自动寻找路径下的页面资源

**代码示例：**

开发目录为：
<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─pages               
│  ├─index
│  │  └─index.vue    
│  └─login
│     └─login.vue    
├─static             
├─main.js       
├─App.vue          
├─manifest.json  
└─pages.json            
	</code>
</pre>

则需要在 pages.json 中填写

```javascript
{
    "pages": [
        {
            "path": "pages/index/index", 
            "style": { ... }
        }, {
            "path": "pages/login/login", 
            "style": { ... }
        }
    ]
}
```

## style

用于设置每个页面的状态栏、导航条、标题、窗口背景色等。

页面中配置项会覆盖 [globalStyle](/collocation/pages?id=globalstyle) 中相同的配置项

|属性|类型|默认值|描述|平台差异说明|
|:-|:-|:-|:-|:-|
|navigationBarBackgroundColor|HexColor|#000000|导航栏背景颜色（同状态栏背景色），如"#000000"||
|navigationBarTextStyle|String|white|导航栏标题颜色及状态栏前景颜色，仅支持 black/white||
|navigationBarTitleText|String||导航栏标题文字内容||
|navigationBarShadow|Object||导航栏阴影，配置参考下方 [导航栏阴影](/collocation/pages?id=navigationBarShadow)||
|navigationStyle|String|default|导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏，需看[使用注意](/collocation/pages?id=customnav)|微信小程序 7.0+、百度小程序、H5、App（2.0.3+）|
|disableScroll|Boolean|false|设置为 true 则页面整体不能上下滚动（bounce效果），只在页面配置中有效，在globalStyle中设置无效|微信小程序（iOS）、百度小程序（iOS）|
|backgroundColor|HexColor|#ffffff|窗口的背景色|微信小程序、百度小程序、头条小程序|
|backgroundTextStyle|String|dark|下拉 loading 的样式，仅支持 dark/light||
|enablePullDownRefresh|Boolean|false|是否开启下拉刷新，详见[页面生命周期](/use?id=页面生命周期)。||
|onReachBottomDistance|Number|50|页面上拉触底事件触发时距页面底部距离，单位只支持px，详见[页面生命周期](/use?id=页面生命周期)||
|backgroundColorTop|HexColor|#ffffff|顶部窗口的背景色（bounce回弹区域）|仅 iOS 平台|
|backgroundColorBottom|HexColor|#ffffff|底部窗口的背景色（bounce回弹区域）|仅 iOS 平台|
|titleImage|String||导航栏图片地址（替换当前文字标题），支付宝小程序内必须使用https的图片链接地址|支付宝小程序、H5|
|transparentTitle|String|none|导航栏透明设置。支持 always 一直透明 / auto 滑动自适应 / none 不透明|支付宝小程序、H5、APP|
|titlePenetrate|String|NO|导航栏点击穿透|支付宝小程序、H5|
|app-plus|Object||设置编译到 App 平台的特定样式，配置项参考下方 [app-plus](/collocation/pages?id=app-plus)|App|
|h5|Object||设置编译到 H5 平台的特定样式，配置项参考下方 [H5](/collocation/pages?id=h5)|H5|
|mp-alipay|Object||设置编译到 mp-alipay 平台的特定样式，配置项参考下方 [MP-ALIPAY](/collocation/pages?id=mp-alipay)|支付宝小程序|
|mp-weixin|Object||设置编译到 mp-weixin 平台的特定样式|微信小程序|
|mp-baidu|Object||设置编译到 mp-baidu 平台的特定样式|百度小程序|
|mp-toutiao|Object||设置编译到 mp-toutiao 平台的特定样式|字节跳动小程序|
|mp-qq|Object||设置编译到 mp-qq 平台的特定样式|QQ小程序|
|usingComponents|Object||引用小程序组件，参考 [小程序组件](/frame?id=小程序组件支持)|App、微信小程序、支付宝小程序、百度小程序|

**代码示例：**

```javascript
{
  "pages": [{
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页",//设置页面标题文字
        "enablePullDownRefresh":true//开启下拉刷新
      }
    },
    ...
  ]
}
```


**注意**

- 支付宝小程序使用`titleImage`时必须使用`https`的图片链接地址，需要真机调试才能看到效果，支付宝开发者工具内无效果

### 自定义导航栏使用注意@customnav
当navigationStyle设为custom或titleNView设为false时，原生导航栏不显示，此时要注意几个问题：
- 非H5端，手机顶部状态栏区域会被页面内容覆盖。这是因为窗体是沉浸式的原因，即全屏可写内容。uni-app提供了状态栏高度的css变量[--status-bar-height](/frame?id=css%e5%8f%98%e9%87%8f)，如果需要把状态栏的位置从前景部分让出来，可写一个占位div，高度设为css变量。
```html
<template>
    <view>
        <view class="status_bar">
            <!-- 这里是状态栏 -->
        </view>
        <view> 状态栏下的文字 </view>
    </view>
</template>    
<style>
    .status_bar {
        height: var(--status-bar-height);
        width: 100%;
    }
</style>
```
- 如果原生导航栏不能满足需求，推荐使用uni ui的[自定义导航栏NavBar](https://ext.dcloud.net.cn/plugin?id=52)。这个前端导航栏自动处理了状态栏高度占位问题。
- 前端导航栏搭配原生下拉刷新时，会有问题，包括
	* 微信小程序下iOS需要拉更长才能看到下拉刷新的三个点，而Android是从屏幕顶部下拉，无法从导航栏下方下拉。如果一定要从前端导航栏下拉，小程序下只能放弃原生下拉刷新，纯前端模拟，参考[mescroll插件](https://ext.dcloud.net.cn/plugin?id=343)，但这样很容易产生性能问题。目前小程序平台自身没有提供更好的方案
	* App和H5下，原生下拉刷新提供了[circle样式](/collocation/pages?id=app-pullToRefresh)，可以指定offset偏移量（pages.json的app-plus下配置），自定义下拉圈出现的位置。在hello uni-app的扩展组件中有示例。
- 非H5端，前端导航盖不住原生组件。如果页面有video、map、textarea(仅小程序)等[原生组件](/component/native-component)，滚动时会覆盖住导航栏
	* 如果是小程序下，可以使用cover-view来做导航栏，避免覆盖问题
	* 如果是App下，建议使用[titleNView](/collocation/pages?id=app-titleNView)或[subNVue](/collocation/pages?id=app-subNVues)，体验更好
- 前端组件在渲染速度上不如原生导航栏，原生导航可以在动画期间渲染，保证动画期间不白屏，但使用前端导航栏，在新窗体进入的动画期间可能会整页白屏，越低端的手机越明显。
- 以上讨论的是前端自定义导航栏，但在App侧，原生导航栏也提供了比小程序导航更丰富的自定义性
	* titleNView：给原生导航栏提供更多配置，包括自定义按钮、滚动渐变效果、搜索框等，详见[titleNView](/collocation/pages?id=app-titleNView)
	* subNView：使用nvue原生渲染，所有布局自己开发，具备一切自定义灵活度。详见[subNVue](/collocation/pages?id=app-subNVues)
- 页面禁用原生导航栏后，想要改变状态栏的前景字体样式，仍可设置页面的 navigationBarTextStyle 属性（只能设置为 black或white）。如果想单独设置状态栏颜色，App端可使用[plus.navigator.setStatusBarStyle](http://www.html5plus.org/doc/zh_cn/navigator.html#plus.navigator.setStatusBarStyle)设置。注意部分低端Android手机（4.4）自身不支持设置状态栏前景色。
 
鉴于以上问题，在原生导航能解决业务需求的情况下，尽量使用原生导航。甚至有时需要牺牲一些不是很重要的需求。在App和H5下，uni-app提供了灵活的处理方案：[titleNView](/collocation/pages?id=app-titleNView)、[subNVue](/collocation/pages?id=app-subNVues)、或整页使用nvue。但在小程序下，因为其自身的限制，没有太好的方案。有必要的话，也可以用条件编译分端处理。

### app-plus

配置编译到 App 平台时的特定样式，部分常用配置 H5 平台也支持。以下仅列出常用，更多配置项参考 [WebviewStyles](http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewStyles)。

|属性|类型|默认值|描述|平台兼容|
|:-|:-|:-|:-|:-|
|titleNView|Object||导航栏 ，详见:[导航栏](/collocation/pages?id=app-titleNView)|App、H5|
|subNVues|Object||原生子窗体，详见:[原生子窗体](/collocation/pages?id=app-subNVues)|App 1.9.10+|
|bounce|String||页面回弹效果，设置为 "none" 时关闭效果。|App（nvue Android暂无bounce效果）|
|softinputNavBar|String|auto|iOS软键盘上完成工具栏的显示模式，设置为 "none" 时关闭工具栏。|仅ios生效|
|softinputMode|String|adjustPan|软键盘弹出模式，支持 adjustResize、adjustPan 两种模式|App|
|pullToRefresh|Object||下拉刷新|App|
|scrollIndicator|String||滚动条显示策略，设置为 "none" 时不显示滚动条。|App|
|animationType|String|pop-in|窗口显示的动画效果，详见：[窗口动画](api/router?id=animation)。|App|
|animationDuration|Number|300|窗口显示动画的持续时间，单位为 ms。|App|
**Tips**
- `.nvue` 页面仅支持 `titleNView` 配置，其它配置项暂不支持

#### 导航栏@app-titleNView
|属性|类型|默认值|描述|版本兼容性|
|:-|:-|:-|:-|:-|
|backgroundColor|String|#F7F7F7|背景颜色，颜色值格式为"#RRGGBB"。在使用半透明标题栏时，也可以设置rgba格式||
|buttons|Array||自定义按钮，详见 [buttons](/collocation/pages?id=app-titlenview-buttons)|纯nvue即render:native时暂不支持|
|titleColor|String|#000000|标题文字颜色||
|titleOverflow|String|ellipsis|标题文字超出显示区域时处理方式。"clip"-超出显示区域时内容裁剪；"ellipsis"-超出显示区域时尾部显示省略标记（...）。||
|titleText|String||标题文字内容||
|titleSize|String||标题文字字体大小||
|type|String|default|导航栏样式。"default"-默认样式；"transparent"-滚动透明渐变；"float"-悬浮导航栏。||
|tags|Array||原生 View 增强，详见：[5+ View 控件](http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.ViewDrawTagStyles)||
|searchInput|Object||原生导航栏上的搜索框配置，详见：[searchInput](/collocation/pages?id=app-titlenview-searchinput)|1.6.0|

**Tips**

- 每个页面均支持通过配置 `titleNView:false` 来禁用原生导航栏。一旦禁用原生导航，请注意阅读[自定义导航注意事项](/collocation/pages?id=customnav)。
- `titleNView` 不能设置 `autoBackButton`、`homeButton`等属性
- `titleNView` 的 `type` 值为 `transparent` 时，导航栏为滚动透明渐变导航栏，默认只有button，滚动后标题栏底色和title文字会渐变出现； `type` 为 `float` 时，导航栏为悬浮标题栏，此时页面内容上顶到了屏幕顶部，包括状态栏，但导航栏悬浮盖在页面上方，一般这种场景会同时设置导航栏的背景色为rgba半透明颜色。
- 在 `titleNView` 配置 `buttons` 后，监听按钮的点击事件，vue 页面及 nvue 的uni-app编译模式参考：[onNavigationBarButtonTap](/frame?id=页面生命周期)、nvue 的weex编译模式参考：[uni.onNavigationBarButtonTap](/use-weex?id=onnavigationbarbuttontap)
- 在 `titleNView` 配置 `searchInput` 后，相关的事件监听参考：[onNavigationBarSearchInputChanged 等](/frame?id=页面生命周期)
- App下原生导航栏的按钮如果使用字体图标，注意检查字体库的名字（font-family）是否使用了默认的 iconfont，这个名字是保留字，不能作为外部引入的字体库的名字，需要调整为自定义的名称，否则无法显示。
- 想了解各种导航栏的开发方法，请详读[导航栏开发指南](https://ask.dcloud.net.cn/article/34921)

##### 自定义按钮@app-titleNView-buttons

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|type|String|none|按钮样式，可取值见：[buttons 样式](/collocation/pages?id=app-titlenview-buttons-type)|
|color|String|默认与标题文字颜色一致|按钮上文字颜色|
|background|String|默认值为灰色半透明|按钮的背景颜色，仅在标题栏type=transparent时生效|
|badgeText|String||按钮上显示的角标文本，最多显示3个字符，超过则显示为...|
|colorPressed|String|默认值为 color 属性值自动调整透明度为 0.3|按下状态按钮文字颜色|
|float|String|right|按钮在标题栏上的显示位置，可取值"left"、"right"|
|fontWeight|String|normal|按钮上文字的粗细。可取值"normal"-标准字体、"bold"-加粗字体。|
|fontSize|String||按钮上文字大小|
|fontSrc|String||按钮上文字使用的字体文件路径。不支持网络地址，请统一使用本地地址。|
|select|String|false|是否显示选择指示图标（向下箭头），常用于城市选择|
|text|String||按钮上显示的文字。使用字体图标时 unicode 字符表示必须 '\u' 开头，如 "\ue123"（注意不能写成"\e123"）。|
|width|String|44px|按钮的宽度，可取值： "*px" - 逻辑像素值，如"10px"表示10逻辑像素值，不支持rpx。按钮的内容居中显示； "auto" - 自定计算宽度，根据内容自动调整按钮宽度|


##### 按钮样式@app-titleNView-buttons-type

使用 type 值设置按钮的样式时，会忽略 fontSrc 和 text 属性。

|值|说明|
|:-|:-|
|forward|前进按钮|
|back|后退按钮|
|share|分享按钮|
|favorite|收藏按钮|
|home|主页按钮|
|menu|菜单按钮|
|close|关闭按钮|
|none|无样式，需通过 text 属性设置按钮上显示的内容、通过 fontSrc 属性设置使用的字体库。|

##### 搜索框配置@app-titleNView-searchInput

searchInput可以在titleNView的原生导航栏上放置搜索框。其宽度根据周围元素自适应。

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|autoFocus|Boolean|false|是否自动获取焦点|
|align|String|center|非输入状态下文本的对齐方式。可取值： "left" - 居左对齐； "right" - 居右对齐； "center" - 居中对齐。|
|backgroundColor|String|rgba(255,255,255,0.5)|背景颜色|
|borderRadius|String|0px|输入框的圆角半径，取值格式为"XXpx"，其中XX为像素值（逻辑像素），不支持rpx。|
|placeholder|String||提示文本。|
|placeholderColor|String|#CCCCCC|提示文本颜色|
|disabled|Boolean|false|是否可输入|

**searchInput Tips**

searchInput的点击输入框onNavigationBarSearchInputClicked、文本变化onNavigationBarSearchInputChanged、点击搜索按钮onNavigationBarSearchInputConfirmed等生命周期，见文档[页面生命周期](/frame?id=%E9%A1%B5%E9%9D%A2%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)。
- 在生命周期里通过参数e.text，可获取输入框内容。具体见hello uni-app中模板-顶部导航栏中的示例
- 如需动态修改searchInput，或者获取searchInput的placehold，参考[uni-app动态修改App端导航栏](https://ask.dcloud.net.cn/article/35374)

**常见titleNView配置代码示例**

```javascript
{
	"pages": [{
			"path": "pages/index/index", //首页
			"style": {
				"app-plus": {
					"titleNView": false //禁用原生导航栏
				}
			}
		}, {
			"path": "pages/log/log", //日志页面
			"style": {
				"app-plus": {
					"bounce": "none", //关闭窗口回弹效果
					"titleNView": {
						"buttons": [ //原生标题栏按钮配置,
							{
								"text": "分享" //原生标题栏增加分享按钮，点击事件可通过页面的 onNavigationBarButtonTap 函数进行监听
							}
						]
					}
				}
			}
		}, {
			"path": "pages/detail/detail", //详情页面
			"style": {
				"navigationBarTitleText": "详情",
				"app-plus": {
					"titleNView": {
						"type": "transparent"//透明渐变导航栏
					}
				}
			}
		}, {
			"path": "pages/search/search", //搜索页面
			"style": {
				"app-plus": {
					"titleNView": {
						"type": "transparent",//透明渐变导航栏
						"searchInput": {
							"backgroundColor": "#fff",
							"borderRadius": "6px", //输入框圆角
							"placeholder": "请输入搜索内容",
							"disabled": true //disable时点击输入框不置焦，可以跳到新页面搜索
						}
					}
				}
			}
		}
		...
	]
}
```

**Tips**

- buttons 的 text 推荐使用字体图标。如果使用了汉字或英文，推荐把字体改小一点，否则文字长度增加后，距离屏幕右边距太近。
- App平台，buttons动态修改，[详见](https://ask.dcloud.net.cn/article/35374)
- App平台，buttons角标动态修改，见 hello uni-app 中模板-顶部导航标题栏-导航栏带红点和角标
- App平台，设置searchInput的文字动态修改，API见[文档](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.setTitleNViewSearchInputText)。注意disable状态无法设置文字、placehold暂不支持动态设置
- H5平台，如需实现上述动态修改，需在条件编译通过dom操作修改


#### 原生子窗体@app-subNVues

`subNVues` 是 vue 页面的原生子窗体。用于解决App中 vue 页面中的层级覆盖和原生界面灵活自定义用的。

它不是全屏页面，也不是组件，就是一个原生子窗体。它是一个 nvue 页面，使用 weex 引擎渲染，提供了比 cover-view、plus.nativeObj.view 更强大的原生排版能力，方便自定义原生导航或覆盖原生地图、视频等。请详读[subNVues 开发指南](http://ask.dcloud.net.cn/article/35948)

`subNVue` 也可以在 nvue 页面中使用。但目前在纯nvue下（render为native）还不支持。

|属性|类型|描述|
|:- |:-  |:-|
|id|String| subNVue 原生子窗体的标识 |
|path|String|配置 nvue 文件路径，nvue 文件需放置到使用 subNvue 的页面文件目录下|
|type|String|原生子窗口内置样式，可取值：'popup',弹出层；"navigationBar",导航栏|
|style|Object|subNVue 原生子窗体的样式，配置项参考下方 [subNVuesStyle](/collocation/pages?id=app-subNVuesStyle)|

**Tips**
- `subNVues` 的 `id` 是全局唯一的，不能重复
- 可以通过 [uni.getSubNVueById('id')](/api/window/subNVues?id=app-getsubnvuebyid) 获取 `subNVues` 的实例
- `subNVues` 的 `path` 属性只能是 `nvue` 文件路径

##### 原生子窗体样式@app-subNVuesStyle
|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|position|String|absolute|原生子窗体的排版位置，排版位置决定原生子窗体在父窗口中的定位方式。 可取值："static"，原生子窗体在页面中正常定位，如果页面存在滚动条则随窗口内容滚动；"absolute"，原生子窗体在页面中绝对定位，如果页面存在滚动条不随窗口内容滚动；"dock"，原生子窗体在页面中停靠，停靠的位置由dock属性值决定。 默认值为"absolute"。|
|dock|String|bottom|原生子窗体的停靠方式,仅当原生子窗体 "position" 属性值设置为 "dock" 时才生效，可取值："top"，原生子窗体停靠则页面顶部；"bottom"，原生子窗体停靠在页面底部；"right"，原生子窗体停靠在页面右侧；"left"，原生子窗体停靠在页面左侧。 默认值为"bottom"。|
|mask|HexColor|rgba(0,0,0,0.5)|原生子窗体的遮罩层,仅当原生子窗体 "type" 属性值设置为 "popup" 时才生效，可取值： rgba格式字符串，定义纯色遮罩层样式，如"rgba(0,0,0,0.5)"，表示黑色半透明；|
|width|String|100%|原生子窗体的宽度,支持百分比、像素值，默认为100%。未设置width属性值时，可同时设置left和right属性值改变窗口的默认宽度。|
|height|String|100%|原生子窗体的高度,支持百分比、像素值，默认为100%。 当未设置height属性值时，优先通过top和bottom属性值来计算原生子窗体的高度。|
|top|String|0px|原生子窗体垂直向下的偏移量，支持百分比、像素值，默认值为0px。 未设置top属性值时，优先通过bottom和height属性值来计算原生子窗体的top位置。|
|bottom|String||原生子窗体垂直向上偏移量,支持百分比、像素值，默认值无值（根据top和height属性值来自动计算）。 当同时设置了top和height值时，忽略此属性值； 当未设置height值时，可通过top和bottom属性值来确定原生子窗体的高度。|
|left|String|0px|原生子窗体水平向左的偏移量，支持百分比、像素值，默认值为0px。 未设置left属性值时，优先通过right和width属性值来计算原生子窗体的left位置。|
|right|String||原生子窗体水平向右的偏移量，支持百分比、像素值，默认无值（根据left和width属性值来自动计算）。 当设置了left和width值时，忽略此属性值； 当未设置width值时，可通过left和bottom属性值来确定原生子窗体的宽度。|
|margin|String||原生子窗体的边距，用于定位原生子窗体的位置，支持auto，auto表示居中。若设置了left、right、top、bottom则对应的边距值失效。|
|zindex|Number||原生子窗体的窗口的堆叠顺序值，拥有更高堆叠顺序的窗口总是会处于堆叠顺序较低的窗口的前面，拥有相同堆叠顺序的窗口后调用show方法则在前面。|

**代码示例**

```javascript
{
	"pages": [{
		"path": "pages/index/index", //首页
		"style": {
			"app-plus": {
				"titleNView": false , //禁用原生导航栏
				"subNVues":[{//侧滑菜单
					"id": "drawer", //subNVue 的 id，可通过 uni.getSubNVueById('drawer') 获取
					"path": "pages/index/drawer.nvue", // nvue 路径
					"style": { //webview style 子集，文档可暂时开放出来位置，大小相关配置
						"position": "popup", //除 popup 外，其他值域参考 5+ webview position 文档
						"width": "50%"
					}

				}, {//弹出层
					"id": "popup",
					"path": "pages/index/popup",
					"style": {
						"position": "popup",
						"margin":"auto",
						"width": "150px",
						"height": "150px"
					}

				}, {//自定义头
					"id": "nav",
					"path": "pages/index/nav",
					"style": {
						"position": "dock",
						"height": "44px"
					}

				}]
			}
		}
	}]
}
```


#### 下拉刷新@app-pullToRefresh
在 App 平台下可以自定义部分下拉刷新的配置 `page->app-plus->pullToRefresh`。

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|support|Boolean|false|是否开启窗口的下拉刷新功能|
|color|String|#2BD009|颜色值格式为"#RRGGBB"，仅"circle"样式下拉刷新支持此属性。|
|style|String|Android 平台为 circle；iOS 平台为 default。|可取值："default"——经典下拉刷新样式（下拉拖动时页面内容跟随）；"circle"——圆圈样式下拉刷新控件样式（下拉拖动时仅刷新控件跟随）。|
|height|String||窗口的下拉刷新控件进入刷新状态的拉拽高度。支持百分比，如"10%"；像素值，如"50px"，不支持rpx。|
|range|String||窗口可下拉拖拽的范围。支持百分比，如"10%"；像素值，如"50px"，不支持rpx。|
|offset|String|0px|下拉刷新控件的起始位置。仅对"circle"样式下拉刷新控件有效，用于定义刷新控件下拉时的起始位置。支持百分比，如"10%"；像素值，如"50px"，不支持rpx。如使用了非原生title且需要原生下拉刷新，一般都使用circle方式并将offset调至自定义title的高度|
|contentdown|Object||目前支持一个属性：caption——在下拉可刷新状态时下拉刷新控件上显示的标题内容。仅对"default"样式下拉刷新控件有效。|
|contentover|Object||目前支持一个属性：caption——在释放可刷新状态时下拉刷新控件上显示的标题内容。仅对"default"样式下拉刷新控件有效。|
|contentrefresh|Object||目前支持一个属性：caption——在正在刷新状态时下拉刷新控件上显示的标题内容。仅对"default"样式下拉刷新控件有效。|

**下拉刷新使用注意**

- `enablePullDownRefresh` 与 `pullToRefresh->support` 同时设置时，后者优先级较高。
- 如果期望在 App 和小程序上均开启下拉刷新的话，请配置页面的 `enablePullDownRefresh` 属性为 true。
- 若仅期望在 App 上开启下拉刷新，则不要配置页面的 `enablePullDownRefresh` 属性，而是配置 `pullToRefresh->support` 为 true。
- 开启原生下拉刷新时，页面里不应该使用全屏高的scroll-view，向下拖动内容时，会优先触发下拉刷新而不是scroll-view滚动
- 原生下拉刷新的起始位置在原生导航栏的下方，如果取消原生导航栏，使用自定义导航栏，原生下拉刷新的位置会在屏幕顶部。如果希望在自定义导航栏下方拉动，只能使用circle方式的下拉刷新，并设置offset参数，将circle圈的起始位置调整到自定义导航栏下方。hello uni-app的扩展组件中有示例。
- 如果想在app端实现更多复杂的下拉刷新，比如美团、京东App那种拉下一个特殊图形，可以使用nvue的<refresh>组件。HBuilderX 2.0.3+起，新建项目选择新闻模板可以体验
- 如果想在vue页面通过web前端技术实现下拉刷新，插件市场有例子，但前端下拉刷新的性能不如原生，复杂长列表会很卡
- iOS上，default模式的下拉刷新和bounce回弹是绑定的，如果设置了bounce:none，会导致无法使用default下拉刷新

**代码示例**
```javascript
{
    "pages": [
        {
            "path": "pages/index/index", //首页
            "style": {
                "app-plus": {
                    "pullToRefresh": {
                        "support": true,
                        "color": "#ff3333",
                        "style": "default",
                        "contentdown": {
                            "caption": "下拉可刷新自定义文本"
                        },
                        "contentover": {
                            "caption": "释放可刷新自定义文本"
                        },
                        "contentrefresh": {
                            "caption": "正在刷新自定义文本"
                        }
                    }
                }
            }
        }
    ]
}
```

### h5
配置编译到 H5 平台时的特定样式

|属性|类型|描述|
|:-|:-|:-|
|titleNView|Object|导航栏|
|pullToRefresh|Object|下拉刷新|

#### 导航栏@h5-titleNView
|属性|类型|默认值|描述|最低版本|
|:-|:-|:-|:-|:-|
|backgroundColor|String|#F7F7F7|背景颜色，颜色值格式为"#RRGGBB"。||
|buttons|Array||自定义按钮，参考 [buttons](collocation/pages?id=h5-titlenview-buttons)||
|titleColor|String|#000000|标题文字颜色||
|titleText|String||标题文字内容||
|titleSize|String||标题文字字体大小||
|type|String|default|导航栏样式。"default"-默认样式；"transparent"-透明渐变。||
|searchInput|Object||导航栏上的搜索框样式，详见：[searchInput](/collocation/pages?id=h5-searchInput)|1.6.5|

##### 自定义按钮@h5-titleNView-buttons
|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|type|String|none|按钮样式，可取值见：[buttons 样式](collocation/pages?id=h5-titlenview-buttons-type)|
|color|String|默认与标题文字颜色一致|按钮上文字颜色|
|background|String|默认值为灰色半透明|按钮的背景颜色，仅在标题栏type=transparent时生效|
|badgeText|String||按钮上显示的角标文本，最多显示3个字符，超过则显示为...|
|colorPressed（暂不支持）|String|默认值为 color 属性值自动调整透明度为 0.3|按下状态按钮文字颜色|
|float|String|right|按钮在标题栏上的显示位置，可取值"left"、"right"|
|fontWeight|String|normal|按钮上文字的粗细。可取值"normal"-标准字体、"bold"-加粗字体。|
|fontSize|String||按钮上文字大小|
|fontSrc|String||按钮上文字使用的字体文件路径。|
|select|String|false|是否显示选择指示图标（向下箭头）|
|text|String||按钮上显示的文字。使用字体图标时 unicode 字符表示必须 '\u' 开头，如 "\ue123"（注意不能写成"\e123"）。|
|width|String|44px|按钮的宽度，可取值： "*px" - 逻辑像素值，如"10px"表示10逻辑像素值，不支持rpx，按钮的内容居中显示； "auto" - 自定计算宽度，根据内容自动调整按钮宽度|

##### 按钮样式@h5-titleNView-buttons-type

使用 type 值设置按钮的样式时，会忽略 fontSrc 和 text 属性。

|值|说明|
|:-|:-|
|forward|前进按钮|
|back|后退按钮|
|share|分享按钮|
|favorite|收藏按钮|
|home|主页按钮|
|menu|菜单按钮|
|close|关闭按钮|
|none|无样式，需通过 text 属性设置按钮上显示的内容、通过 fontSrc 属性设置使用的字体库。|

#### 下拉刷新@h5-pullToRefresh
h5 平台下拉刷新动画，只有 circle 类型。

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|color|String|#2BD009|颜色值格式为"#RRGGBB"|
|offset|String|0px|下拉刷新控件的起始位置。支持百分比，如"10%"；像素值，如"50px"，不支持rpx。|

##### 搜索框样式@h5-searchInput

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|autoFocus|Boolean|false|是否自动获取焦点|
|align|String|center|非输入状态下文本的对齐方式。可取值： "left" - 居左对齐； "right" - 居右对齐； "center" - 居中对齐。|
|backgroundColor|String|rgba(255,255,255,0.5)|背景颜色|
|borderRadius|String|0px|输入框的圆角半径，取值格式为"XXpx"，其中XX为像素值（逻辑像素），不支持rpx。|
|placeholder|String||提示文本|
|placeholderColor|String|#CCCCCC|提示文本颜色|
|disabled|Boolean|false|是否可输入|

**注意事项：**

- 如果 `h5` 节点没有配置，默认会使用 `app-plus` 下的配置。
- 配置了 `h5` 节点，则会覆盖 `app-plus` 下的配置。

#### navigationBarShadow

|属性|类型|描述|
|:-|:-|:-|
|colorType|String|阴影的颜色，支持：grey、blue、green、orange、red、yellow|

### mp-alipay
配置编译到 MP-ALIPAY 平台时的特定样式

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|allowsBounceVertical|String|YES|是否允许向下拉拽。支持 YES / NO|
|titleImage|String||导航栏图片地址（替换当前文字标题），内必须使用https的图片链接地址|
|transparentTitle|String|none|导航栏透明设置。支持 always 一直透明 / auto 滑动自适应 / none 不透明|
|titlePenetrate|String|NO|导航栏点击穿透|
|showTitleLoading|String|NO|是否进入时显示导航栏的 loading。支持 YES / NO|
|backgroundImageUrl|String||下拉露出显示的背景图链接|
|backgroundImageColor|HexColor||下拉露出显示的背景图底色|
|gestureBack|String|NO|iOS 用，是否支持手势返回。支持 YES / NO|
|enableScrollBar|String|YES|Android 用，是否显示 WebView 滚动条。支持 YES / NO|

**注意事项**

- ```titleImage```仅支持https地址，设置了```titleImage```会替换页面文字标题
- ```backgroundImageUrl```支持网络地址和本地地址，尽量使用绝对地址
- 部分配置可能会只在真机运行的时候生效，支付宝未来应该会改善

# FAQ
- Q：如何取消原生导航栏？或自定义导航
- A：参考[导航栏开发指南](http://ask.dcloud.net.cn/article/34921)

# tabBar
如果应用是一个多 tab 应用，可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页。

**Tips**

- 当设置 position 为 top 时，将不会显示 icon
- tabBar 中的 list 是一个数组，只能配置最少2个、最多5个 tab，tab 按数组的顺序排序。
- tabbar 切换第一次加载时可能渲染不及时，可以在每个tabbar页面的onLoad生命周期里先弹出一个等待雪花（hello uni-app使用了此方式）
- tabbar 的页面展现过一次后就保留在内存中，再次切换 tabbar 页面，只会触发每个页面的onShow，不会再触发onLoad。
- 顶部的 tabbar 目前仅微信小程序上支持。需要用到顶部选项卡的话，建议不使用 tabbar 的顶部设置，而是自己做顶部选项卡，可参考 hello uni-app->模板->顶部选项卡。

**属性说明：**

|属性|类型|必填|默认值|描述|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|color|HexColor|是||tab 上的文字默认颜色||
|selectedColor|HexColor|是||tab 上的文字选中时的颜色||
|backgroundColor|HexColor|是||tab 的背景色||
|borderStyle|String|否|black|tabbar 上边框的颜色，仅支持 black/white||
|list|Array|是||tab 的列表，详见 list 属性说明，最少2个、最多5个 tab||
|position|String|否|bottom|可选值 bottom、top|top 值仅微信小程序支持|
|fontSize|String|否|12px|文字默认大小|App（HBuilderX 2.3.4+）|
|iconWidth|String|否|24px|图标默认宽度（高度等比例缩放）|App（HBuilderX 2.3.4+）|
|height|String|否|56px|tabBar 默认高度|App（HBuilderX 2.3.4+）|
|midButton|Object|否||中间按钮 仅在 list 项为偶数时有效|App（HBuilderX 2.3.4+）|

其中 list 接收一个数组，数组中的每个项都是一个对象，其属性值如下：

|属性|类型|必填|说明|
|:-|:-|:-|:-|
|pagePath|String|是|页面路径，必须在 pages 中先定义|
|text|String|是|tab 上按钮文字，在 5+APP 和 H5 平台为非必填。例如中间可放一个没有文字的+号图标|
|iconPath|String|否|图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片，不支持字体图标|
|selectedIconPath|String|否|选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效|

**midButton 属性说明**

|属性|类型|必填|默认值|描述|
|:-|:-|:-|:-|:-|
|width|String|否|80px|中间按钮的宽度，tabBar 其它项为减去此宽度后平分，默认值为与其它项平分宽度|
|height|String|否|56px|中间按钮的高度，可以大于 tabBar 高度|
|text|String|否||中间按钮的文字|
|iconPath|String|否||中间按钮的图片路径|
|iconWidth|String|否|24px||图片宽度（高度等比例缩放）|
|backgroundImage|String|否||中间按钮的背景图片路径|

#### **tabbar常见问题** @tips-tabbar
- tabbar 的 js api 见[接口-界面-tabbar](https://uniapp.dcloud.io/api/ui/tabbar)，可实现动态显示隐藏（如弹出层无法覆盖tabbar）、内容修改（如国际化）、item加角标等功能。hello uni-app中也有示例。
- tabbar 的 item 点击事件见[页面生命周期的onTabItemTap](https://uniapp.dcloud.io/frame?id=%E9%A1%B5%E9%9D%A2%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)。
- 代码跳转到tabbar页面，api只能使用[uni.switchTab](https://uniapp.dcloud.io/api/router?id=switchtab)，不能使用uni.navigateTo、uni.redirectTo；使用navigator组件跳转时必须设置[open-type="switchTab"](https://uniapp.dcloud.io/component/navigator)
- tabbar 在H5端是div模拟的，属于前端屏幕窗口的一部分，如果要使用bottom居底定位方式，应该使用css变量`--window-bottom`，比如悬浮在tabbar上方10px的按钮，样式如下`bottom: calc(var(--window-bottom) + 10px)`
- tabbar 的默认高度，在不同平台不一样。[详见](https://uniapp.dcloud.io/frame?id=%e5%9b%ba%e5%ae%9a%e5%80%bc)
- 中间带+号的tabbar模板例子，[参考](https://ext.dcloud.net.cn/plugin?id=98)。可跨端，但+号不凸起。
- App端若使用nvue，自定义tabbar，没有性能体验问题。
- 纯nvue项目（manifest里renderer为native），目前使用pages.json里的tabbar反而影响性能，建议使用前端自己实现单页面的tabbar。后续会解决这个bug。
- Android App上弹出键盘顶起tabbar的问题。升级到HBuilderX 2.2后不再存在。
- 原生的tabbar只有一个且在首页。二级页如需的tab，前端自己实现。
- 如果是需要先登录、后进入tab页面，不需要把登陆页设为首页，首页仍然是tabbar页，可参考HBuilderX新建uni-app项目时的登陆模板
- 前端弹出遮罩层挡不住tabbar的问题，跨端处理方式时动态隐藏tabbar。App端可以使用plus.nativeObj.view或subNVue做弹出和遮罩，可参考这个[底部原生图标分享菜单例子](https://ext.dcloud.net.cn/plugin?id=69)
- 微信小程序模拟器1.02.1904090版有bug，在缩放模拟器页面百分比后，tabbar点击多次后就会卡死。真机无碍，使用时注意。[详见](https://developers.weixin.qq.com/community/develop/doc/0002e6e6bf0d602d8c783e10756400)

**代码示例**
```json
"tabBar": {
	"color": "#7A7E83",
	"selectedColor": "#3cc51f",
	"borderStyle": "black",
	"backgroundColor": "#ffffff",
	"list": [{
		"pagePath": "pages/component/index",
		"iconPath": "static/image/icon_component.png",
		"selectedIconPath": "static/image/icon_component_HL.png",
		"text": "组件"
	}, {
		"pagePath": "pages/API/index",
		"iconPath": "static/image/icon_API.png",
		"selectedIconPath": "static/image/icon_API_HL.png",
		"text": "接口"
	}]
}
```

# condition
启动模式配置，仅开发期间生效，用于模拟直达页面的场景，如：小程序转发后，用户点击所打开的页面。

**属性说明：**

|属性|类型|是否必填|描述|
|:-|:-|:-|:-|
|current|Number|是|当前激活的模式，list节点的索引值|
|list|Array|是|启动模式列表|

**list说明：**

|属性|类型|是否必填|描述|
|:-|:-|:-|:-|
|name|String|是|启动模式名称|
|path|String|是|启动页面路径|
|query|String|否|启动参数，可在页面的 [onLoad](use?id=页面生命周期) 函数里获得|

**注意：** 在 5+App 里真机运行可直接打开配置的页面，微信开发者工具里需要手动改变编译模式，如下图：

<div style="text-align:center;">
	<img src="//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/condition.png" />
</div>

**代码示例：**

```javascript
"condition": { //模式配置，仅开发期间生效
	"current": 0, //当前激活的模式（list 的索引项）
	"list": [{
			"name": "swiper", //模式名称
			"path": "pages/component/swiper/swiper", //启动页面，必选
			"query": "interval=4000&autoplay=false" //启动参数，在页面的onLoad函数里面得到。
		},
		{
			"name": "test",
			"path": "pages/component/switch/switch"
		}
	]
}
```

# subPackages

分包加载配置

**注意：**此配置为小程序的分包加载机制。在5+App里始终为整包。
- 微信、百度小程序每个分包的大小是2M，总体积一共不能超过8M。
- 支付宝小程序每个分包的大小是2M，总体积一共不能超过4M。

subPackages 节点接收一个数组，数组每一项都是应用的子包，其属性值如下：

|属性|类型|是否必填|描述|
|:-|:-|:-|:-|
|root|String|是|子包的根目录|
|pages|Array|是|子包由哪些页面组成，参数同 [pages](/collocation/pages?id=pages)|

**注意：** ```subPackages``` 里的pages的路径是 ``root`` 下的相对路径，不是全路径。

**使用方法：**

假设支持分包的 ```uni-app``` 目录结构如下：
<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─pages               
│  ├─index
│  │  └─index.vue    
│  └─login
│     └─login.vue    
├─pagesA   
│  └─list
│     └─list.vue 
├─pagesB    
│  └─detail
│     └─detail.vue  
├─static             
├─main.js       
├─App.vue          
├─manifest.json  
└─pages.json            
	</code>
</pre>

则需要在 pages.json 中填写

```javascript
{
	"pages": [{
		"path": "pages/index/index",
		"style": { ...}
	}, {
		"path": "pages/login/login",
		"style": { ...}
	}],
	"subPackages": [{
		"root": "pagesA",
		"pages": [{
			"path": "list/list",
			"style": { ...}
		}]
	}, {
		"root": "pagesB",
		"pages": [{
			"path": "detail/detail",
			"style": { ...}
		}]
	}],
	"preloadRule": {
		"pagesA/list/list": {
			"network": "all",
			"packages": ["__APP__"]
		},
		"pagesB/detail/detail": {
			"network": "all",
			"packages": ["pagesA"]
		}
	}
}
```

# preloadRule 

分包预载配置，`preloadRule` 中，`key` 是页面路径，`value` 是进入此页面的预下载配置，每个配置有以下几项：

|字段|类型|必填|默认值|说明|
|---|---|---|---|---|
|packages|StringArray	|是|无|进入页面后预下载分包的 root 或 name。__APP__ 表示主包。|
|network|String|否	|wifi|在指定网络下预下载，可选值为：all（不限网络）、wifi（仅wifi下预下载）|

# FAQ
- Q：为什么在pages.json里配置小程序定位权限描述，无法编译到小程序端，运行后一直提示getLocation需要在app.json中声明
- A：微信小程序的权限描述配置在manifest中，不在pages.json中，具体参考文档：[https://uniapp.dcloud.io/collocation/manifest?id=mp-weixin](https://uniapp.dcloud.io/collocation/manifest?id=mp-weixin)

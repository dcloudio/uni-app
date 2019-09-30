
### 使用代码块直接创建组件模板

为提升开发效率，HBuilderX将 ```uni-app``` 常用代码封装成了以 ```u``` 开头的代码块，如在 ```template``` 标签内输入 ```ulist``` 回车，会自动生成如下代码：

```
<view class="uni-list">
	<view class="uni-list-cell">
		<view class="uni-list-cell-navigate uni-navigate-right" v-for="(item,index) in list" :key="index">
			{{item.value}}
		</view>
	</view>
</view>
```

代码块分为Tag代码块、JS代码块，如在 ```script``` 标签内输入 ```uShowToast``` 回车，会自动生成如下代码：

```
uni.showToast({
	title: '',
	mask: false
	duration: 1500
});
```

```uni-app```已支持代码块见下方列表。


#### Tag代码块

- uButton
- uCheckbox
- uGrid：宫格，需引用uni ui
- uList：列表，需引用uni ui
- uListMedia
- uRadio
- uSwiper
- ......

几乎各种组件不管是内置组件还是uni ui的组件，均已封装为代码块，在HBuilderX的vue代码template区域中敲u，代码助手会提示所有可见列表。也可在HBuilderX菜单工具-代码块设置-vue代码块的左侧列表查阅所有。

除组件外，其他常用代码块包括：

- viewfor：生成一段带有v-for循环结构的视图代码块
- vbase：生成一段基本的vue代码结构

#### JS代码块

##### uni api代码块
- uRequest
- uGetLocation
- uShowToast
- uShowLoading
- uHideLoading
- uShowModal
- uShowActionSheet
- uNavigateTo
- uNavigateBack
- uRedirectTo
- uStartPullDownRefresh
- uStopPullDownRefresh
- uLogin
- uShare
- uPay
- ......

几乎各种常用js api，均已封装为代码块，在HBuilderX的js代码中敲u，代码助手会提示所有可见列表。也可在HBuilderX菜单工具-代码块设置-js代码块的左侧列表查阅所有。

##### vue js代码块
- vImport：导入文件
- ed：export default
- vData：输出 data(){return{}}
- vMethod：输出 methods:{}
- vComponents：输出 components: {}

##### 其他常用js代码块
- iff：简单if
- forr：for循环结构体
- fori：for循环结构体并包含i
- funn：函数
- funa：匿名函数
- rt：return true
- clog：输出："console.log()"
- clogvar：增强的日志输出，可同时把变量的名字打印出来
- varcw：输出："var currentWebview = this.$mp.page.$getAppWebview()"
- ifios：iOS的平台判断
- ifAndroid：Android的平台判断

预置代码块不满足需求的话，可以自定义代码块，教程参考[https://ask.dcloud.net.cn/article/35924](https://ask.dcloud.net.cn/article/35924)

### 使用 Chrome 调试 H5

进入 ``uni-app`` 项目，点击工具栏的运行 -> 运行到浏览器 -> 选择 Chrome，即可将 uni-app运行到 浏览器，可参考 [运行uni-app](/quickstart?id=运行uni-app)，运行到浏览器后，就能和普通 web 项目一样进行预览和调试了。

**注意**：Chrome调试只能保证样式一致，部分原生能力是不支持的。

点 Chrome 控制台的 Sources 栏，可以给 js 打断点调试。

在 Page 下找到 webpack 里的工程目录，可直接找到对应的vue页面进行断点调试；或按 Ctrl+P搜文件名，进入页面调试；也可点击控制台的 log 信息，进入对应的页面进行调试。

![](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/chrome-debug1.png)

![](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/chrome-debug2.png)

### 使用各家小程序开发工具调试

``uni-app`` 运行到微信web开发者工具等小程序开发工具里，可在这些工具的控制台查看 ``console`` 信息，网络请求等信息等。

页面样式调试和一般的web项目一样，通过调试的箭头选中元素即可查看相应的节点和样式，如下图：

![uni-app](//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/debug1.png)

调试 js 时需要切换到 Sources 栏，选中想要调试的那个页面的js，进行调试（如果js代码是压缩过的，点击右下角的{}可格式化代码），如下图：

![uni-app](//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/debug2.png)

### 关于 App 的调试debug

自 `HBuilderX 2.0.3+` 版本起开始支持 `App` 端的调试。

#### 打开调试窗口
在 `HBuilderX` 中，正确运行项目： `运行 --> 运行到手机或模拟器 --> 选择设备`，项目启动后，在下方的控制台选择 `debug` 图标。

![debug](//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/debug-icon.png)

正确打开调试窗口后，显示如下：
![debug](//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/csdndebug-window.png)

#### console.log打日志
console.log()是我们日常开发最常用的调试方法，HBuilderX中当然也不能少。根据上一步，启动完成debug窗口后，调用console.log()方法就可以看到打印的内容了。如下图：

![debug](//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/debug-console.jpg)

App端也提供真机运行的console.log日志输出，运行到真机或模拟器时，不用点debug按钮，操作手机，会在HBuilderX的控制台直接输出日志。

#### 调试页面
在调试窗口控制台的 Sources （图中指示1） 栏，可以给 js 打断点调试。

在 uniapp:// （图中指示2）下找到需要调试的页面，单击打开 ，在右侧可以看到我们需要调试的内容（图中指示3）。在需要调试的代码行号的位置，点击打上断点（图中指示4）。

![debug](//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/csdndebug-log.png)

之后，在设备上进行操作，进入断点位置，可以方便我们跟踪调试代码。

![debug](//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/csdndebug-breakpoint.png)

#### 断点同步
HBuilderX还有一个强大的功能，那就是可以直接在编辑器中打断点，断点会自动同步到调试工具中。
操作步骤：只需要在需要打断点打代码部分，右击，就会出来同步断点到调试器，然后点击就好了。下面就是演示图：

![debug](//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/debug-console-gif.gif)

Tip 
- debug仅支持自定义组件模式。如果是非自定义组件模式，请在manifest里配置选为自定义组件模式。非自定义组件模式即将停止支持，[详见](https://ask.dcloud.net.cn/article/36385)
- `vue` 和 `nvue` 页面都能打断点调试
- 目前仅支持 `nvue` 页面审查元素，`vue` 页面暂不支持，`Android` 暂不支持查看 `style`
- App端提供真机运行的console.log日志输出，运行到真机或模拟器时，不用点debug按钮，操作手机，会在HBuilderX的控制台直接输出日志。
- 如果是调试App的界面和常规API，推荐编译到H5端，点HBuilderX右上角的预览，在内置浏览器里调Dom，保存后立即看到结果，调试更方便。并且H5端也支持titleNView的各种复杂设置。唯一要注意的就是css兼容性，使用太新的css在pc上预览可能正常，但低端Android上异常，具体可查询caniuse等网站。
- 常用的开发模式就是pc上使用内置浏览器预览调dom，运行到真机上看console.log。如果是很复杂的问题才使用debug。
- vue页面也可以在微信开发者工具里调试，除了plus API，其他是一样的，微信开发者工具的查看Dom和网络和存储等调试工具相对而言更完善些。
注意：即使不发布微信小程序、只发布App，也需要安装微信开发者工具。
- uni-app的App端没有5+App那种webkit remote debug


### 持续集成

很多公司的开发人员提交代码后，需要自动打包或持续集成。

此时需要在服务器安装uni-app的cli版本来发布小程序和H5版。

HBuilderX版与cli版互转指南参考：[https://ask.dcloud.net.cn/article/35750](https://ask.dcloud.net.cn/article/35750)

如果是发布App，则需要使用[离线打包](https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/508)，配置原生环境，来实现持续集成。（目前HBuilderX还不支持命令行生成wgt资源和云打包，欢迎到需求墙投票：[https://dev.dcloud.net.cn/wish/](https://dev.dcloud.net.cn/wish/)）

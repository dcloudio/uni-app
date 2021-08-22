
### 使用代码块直接创建组件模板

为提升开发效率，HBuilderX将 ```uni-app``` 常用代码封装成了以 ```u``` 开头的代码块，如在 ```template``` 标签内输入 ```ulist``` 回车，会自动生成如下代码：

```html
<uni-list>
	<uni-list-item title="" note=""></uni-list-item>
	<uni-list-item title="" note=""></uni-list-item>
</uni-list>
```
注意需保障uni-list组件在项目的components目录下。比较简单的方式，是新建项目时，选 uni ui项目模板，在里面即可随便敲所有u开头的代码块。如果不是 uni ui项目模板，那么需要去插件市场手动把[uni ui组件](https://ext.dcloud.net.cn/plugin?id=55)下载到工程里。


代码块分为Tag代码块、JS代码块，如在 ```script``` 标签内输入 ```uShowToast``` 回车，会自动生成如下代码：

```js
uni.showToast({
	title: '',
	mask: false,
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

### 使用HBuilderX内置浏览器调试H5

打开 ``uni-app`` 项目的页面，点HBuilderX右上角的预览按钮，可以在内置浏览器里打开H5运行结果，也可以点右键打开控制台调试。

修改保存工程源码时，右边的浏览器内容可以自动刷新。

在HBuilderX控制台里，可以直接看到内置浏览器打印的日志。

打开内置浏览器的控制台的 `Sources` 栏，可以给 js 打断点调试。

在 `Page` 下找到 `webpack` 里的工程目录，可直接找到对应的`vue`页面进行断点调试；或按 `Ctrl+P`搜文件名，进入页面调试；也可点击控制台的 `log` 信息，进入对应的页面进行调试。

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/56abde90-4f34-11eb-8a36-ebb87efcf8c0.png)

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/5762ab70-4f34-11eb-bdc1-8bd33eb6adaa.png)


`点击工具栏的运行 -> 运行到浏览器 -> 选择 Chrome`，也可将 `uni-app`运行到 浏览器，可参考 [运行uni-app](/quickstart?id=运行uni-app)。

### 使用各家小程序开发工具调试

``uni-app`` 运行到微信web开发者工具等小程序开发工具里，可在这些工具的控制台查看 ``console`` 信息，网络请求等信息等。

页面样式调试和一般的`web`项目一样，通过调试的箭头选中元素即可查看相应的节点和样式，如下图：

![uni-app](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/51d2b830-4f34-11eb-a16f-5b3e54966275.png)

调试 `js` 时需要切换到 `Sources` 栏，根据sourcemap，找到 `webpack` 里正确的目录，选中想要调试的那个页面的`js`，进行调试（如果`js`代码是压缩过的，点击右下角的{}可格式化代码），如下图：

![uni-app](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/52889ab0-4f34-11eb-b680-7980c8a877b8.png)

### 关于 App 的调试debug

常规开发里，在HBuilderX的运行菜单里运行App，手机端的错误或console.log日志信息会直接打印到控制台。

如果需要更多功能，比如审查元素、打断点debug，则需要启动调试模式。自 `HBuilderX 2.0.3+` 版本起开始支持 `App` 端的调试。

#### 打开调试窗口
在 `HBuilderX` 中，正确运行项目： `运行 --> 运行到手机或模拟器 --> 选择设备`，项目启动后，在下方的控制台选择 `debug` 图标。

![debug](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/55245430-4f34-11eb-97b7-0dc4655d6e68.png)

正确打开调试窗口后，显示如下：
![debug](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/50f7e890-4f34-11eb-b680-7980c8a877b8.png)

#### Elements

根据上一步，启动完成`debug`窗口后，可以看到`Elements`。`Elements` 主要显示当前页面的组织结构，目前`Elements`只支持`nvue`。
![debug](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/5433b2a0-4f34-11eb-8a36-ebb87efcf8c0.png)

#### console.log打日志
`console.log`是我们日常开发最常用的调试方法，`HBuilderX`中当然也不能少。
- App端提供真机运行的`console.log`日志输出，运行到真机或模拟器时，不用点`debug`按钮，操作手机，会在`HBuilderX`的控制台直接输出日志。

- 如果是比较复杂的逻辑，那就推荐使用调试工具中的`console`了。根据上一步，启动完成`debug`窗口后，执行`console.log`方法就可以看到打印的内容了。

`debug`窗口中看`console.log`的方法如下图：

![debug](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/53673ae0-4f34-11eb-a16f-5b3e54966275.jpg)



#### 调试页面
在调试窗口控制台的 `Sources` （图中指示1） 栏，可以给 `js` 打断点调试。

在 `uniapp`（图中指示2）下找到需要调试的页面，单击打开 ，在右侧可以看到我们需要调试的内容（图中指示3）。在需要调试的代码行号的位置，点击打上断点（图中指示4）。

![debug](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/58f09e70-4f34-11eb-8a36-ebb87efcf8c0.png)

之后，在设备上进行操作，进入断点位置，可以方便我们跟踪调试代码。

![debug](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/5839d190-4f34-11eb-8a36-ebb87efcf8c0.png)

#### 同步断点到调试器
在控制台众多代码中寻找要调试的代码是比较麻烦的一件事，`HBuilderX`的调试还提供一个便利的功能，可直接在编辑器中打断点，断点会自动同步到调试工具中。

操作步骤：在HBuilderX编辑器中对目标行的行号处点右键，在右键菜单中选择“同步断点到调试器”，然后调试控制台会自动打开对应的代码并在指定行处标记断点。演示如下：

![debug](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/55de5560-4f34-11eb-8a36-ebb87efcf8c0.gif)


Tip 
- `debug`仅支持自定义组件模式。如果是非自定义组件模式，请在`manifest`里配置选为自定义组件模式。非自定义组件模式即将停止支持，[详见](https://ask.dcloud.net.cn/article/36385)
- `vue` 和 `nvue` 页面均支持断点调试
- 目前仅支持 `nvue` 页面审查元素，`vue` 页面暂不支持，以及 `Android` 平台的 `nvue` 审查元素暂不支持查看 `style`
- App端提供真机运行的`console.log`日志输出，运行到真机或模拟器时，不用点`debug`按钮，运行手机App，会在`HBuilderX`的控制台直接输出日志。
- 如果是调试`App`的界面和常规API，推荐编译到H5端，点`HBuilderX`右上角的预览，在内置浏览器里调`Dom`，保存后立即看到结果，调试更方便。并且H5端也支持`titleNView`的各种复杂设置。唯一要注意的就是`css`兼容性，使用太新的`css`在`pc`上预览可能正常，但低端`Android`上异常，具体可查询`caniuse`等网站。
- 常用的开发模式就是`pc`上使用内置浏览器预览调dom，运行到真机上看`console.log`。如果是很复杂的问题才使用`debug`。
- vue页面也可以在微信开发者工具里调试，除了plus API，其他是一样的，微信开发者工具的查看`Dom`和网络和存储等调试工具相对而言更完善些。
注意：即使不发布微信小程序、只发布`App`，也需要安装微信开发者工具。
- uni-app的App端的webkit remote debug，只能调试视图层，不能调试逻辑层。因为uni-app的js不是运行在webview里，而是独立的jscore里。
- 部分manifest配置，如三方sdk配置，需要打包后生效的，可以打包一个自定义运行基座。打包自定义基座后运行这个自定义基座，同样可以真机运行和debug。打包正式包将无法真机运行和debug。


### 持续集成

很多公司的开发人员提交代码后，需要自动打包或持续集成。

此时需要在服务器安装uni-app的cli版本来发布。

HBuilderX版与cli版互转指南参考：[https://ask.dcloud.net.cn/article/35750](https://ask.dcloud.net.cn/article/35750)

如果是发布App，还需要使用[离线打包](https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/508)，配置原生环境，来实现持续集成。

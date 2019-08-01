
> `uni-app`支持通过 可视化界面、[`vue-cli`命令行](https://uniapp.dcloud.io/quickstart?id=%e9%80%9a%e8%bf%87vue-cli%e5%91%bd%e4%bb%a4%e8%a1%8c) 两种方式快速创建项目。


## 1. 通过 HBuilderX 可视化界面

可视化的方式比较简单，HBuilderX内置相关环境，开箱即用，无需配置nodejs。

开始之前，开发者需先下载安装如下工具：

- HBuilderX：[官方IDE下载地址](http://www.dcloud.io/hbuilderx.html)

HBuilderX是通用的前端开发工具，但为`uni-app`做了特别强化。

下载App开发版，可开箱即用；如下载标准版，在运行或发行`uni-app`时，会提示安装`uni-app`插件，插件下载完成后方可使用。

如使用`cli`方式创建项目，可直接下载标准版，因为uni-app编译插件被安装到项目下了。


### 创建uni-app

在点击工具栏里的文件 -> 新建 -> 项目：
<div align=center>
  <img src="//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/create1.png"/>
</div>

选择uni-app，输入工程名，如：hello-uniapp，点击创建，即可成功创建 uni-app。点击模板里的 Hello uni-app 即可体验官方示例。

<div align=center>
  <img src="//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/create2.png"/>
</div>

### 运行uni-app
1. 浏览器运行：进入hello-uniapp项目，点击工具栏的运行 -> 运行到浏览器 -> 选择浏览器，即可在浏览器里面体验uni-app 的 H5 版。
  <div align=center>
  	<img src="//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/run-chrome.png"/>
  </div>

2. 真机运行：连接手机，开启USB调试，进入hello-uniapp项目，点击工具栏的运行 -> 真机运行 -> 选择运行的设备，即可在该设备里面体验uni-app。
	<div align=center>
		<img src="//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/run-phone.png"/>
	</div>
	
	如手机无法识别，请点击菜单运行-运行到手机或模拟器-真机运行常见故障排查指南。
	注意目前开发App也需要安装微信开发者工具。
	
3. 在微信开发者工具里运行：进入hello-uniapp项目，点击工具栏的运行 -> 运行到小程序模拟器 -> 微信开发者工具，即可在微信开发者工具里面体验uni-app。
    <br/>
    <div align=center>
    	<img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-1.png"/>
    </div>
    
    **注意：**如果是第一次使用，需要先配置小程序ide的相关路径，才能运行成功。如下图，需在输入框输入微信开发者工具的安装路径。 若HBuilderX不能正常启动微信开发者工具，需要开发者手动启动，然后将uni-app生成小程序工程的路径拷贝到微信开发者工具里面，在HBuilderX里面开发，在微信开发者工具里面就可看到实时的效果。
    
    uni-app默认把项目编译到根目录的unpackage目录。
    <br/>
    <div align=center>
      <img src="//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/weixin-setting.png"/>
    </div>
		
4. 在支付宝小程序开发者工具里运行：进入hello-uniapp项目，点击工具栏的运行 -> 运行到小程序模拟器 -> 支付宝小程序开发者工具，即可在支付宝小程序开发者工具里面体验uni-app。
    <br/>
    <div align=center>
    	<img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-3.png"/>
    </div>

5. 在百度开发者工具里运行：进入hello-uniapp项目，点击工具栏的运行 -> 运行到小程序模拟器 -> 百度开发者工具，即可在百度开发者工具里面体验uni-app。
    <br/>
    <div align=center>
    	<img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-2.png"/>
    </div>
 
6. 在字节跳动开发者工具里运行：进入hello-uniapp项目，点击工具栏的运行 -> 运行到小程序模拟器 -> 字节跳动开发者工具，即可在字节跳动开发者工具里面体验uni-app。
    <br/>
    <div align=center>
    	<img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-4.png"/>
    </div>
    
**Tips**

* 如果是第一次使用，需要配置开发工具的相关路径。点击工具栏的运行 -> 运行到小程序模拟器 -> 运行设置，配置相应小程序开发者工具的路径。
* 支付宝/百度/字节跳动小程序工具，不支持直接指定项目启动并运行。因此开发工具启动后，请将 HBuilderX 控制台中提示的项目路径，在相应小程序开发者工具中打开。
* 如果自动启动小程序开发工具失败，请手动启动小程序开发工具并将 HBuilderX 控制台提示的项目路径，打开项目。

运行的快捷键是`Ctrl+r`。
HBuilderX 还提供了快捷运行菜单，可以按数字快速选择要运行的设备：
<div align=center>
	<img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-5.png"/>
</div>

如需调试，可参考：[uni-app调试](/snippet?id=使用-chrome-调试)

### 发布uni-app

#### 打包为原生App（云端）

在HBuilderX工具栏，点击发行，选择原生app-云端打包，如下图：

<div align=center>
  <img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-11.png"/>
</div>
出现如下界面，点击打包即可。
<div align=center>
  <img src="//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/push.png"/>
</div>

#### 打包为原生App（离线）

``uni-app`` 支持离线打包，在 HBuilderX 生成离线打包资源，然后参考 [离线打包](http://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/104)（或参考其他用户写的 [离线打包日记](https://ask.dcloud.net.cn/article/35302)），即可进行离线打包。

在HBuilderX工具栏，点击发行，选择本地打包，如下图，点击即可生成离线打包资源。

<div align=center>
  <img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-12.png"/>
</div>

#### 发布为H5

1. 在 ``manifest.json`` 的可视化界面，进行如下配置（发行在网站根目录可不配置应用基本路径），此时发行网站路径是 www.xxx.com/h5，如：[https://uniapp.dcloud.io/h5](https://uniapp.dcloud.io/h5)。
<div align=center>
	<img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/build-h5-1.png" style="max-width:600px;height:auto;"/>
</div>
2. 在HBuilderX工具栏，点击发行，选择网站-H5手机版，如下图，点击即可生成 H5 的相关资源文件，保存于 unpackage 目录。

<div align=center>
	<img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-10.png" style="max-width:600px;height:auto;"/>
</div>

**注意**
- `history` 模式发行需要后台配置支持，详见：[history 模式的后端配置](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)
- 打包部署后，在服务器上开启 gzip 可以进一步压缩文件。具体的配置，可以参考网上的分享：https://juejin.im/post/5af003286fb9a07aac24611b

#### 发布为小程序

**发布为微信小程序：**
1. 申请微信小程序AppID，参考：[微信教程](https://developers.weixin.qq.com/miniprogram/dev/#申请帐号)。
2. 在HBuilderX中顶部菜单依次点击 "发行" => "小程序-微信"，输入小程序名称和appid点击发行即可在 ``unpackage/dist/build/mp-weixin`` 生成微信小程序项目代码。
<div align=center>
  <img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-6.png"/>
</div>
3. 在微信开小程序发者工具中，导入生成的微信小程序项目，测试项目代码运行正常后，点击“上传”按钮，之后按照 “提交审核” => “发布” 小程序标准流程，逐步操作即可，详细查看：[微信官方教程](https://developers.weixin.qq.com/miniprogram/dev/quickstart/basic/release.html)。

**发布为百度小程序：**
1. 入驻小程序并申请百度小程序AppID，参考：[百度小程序教程](https://smartprogram.baidu.com/docs/introduction/enter_application/)。
2. 在HBuilderX中顶部菜单依次点击 "发行" => "小程序-百度"，输入小程序名称和appid点击发行即可在 ``/unpackage/dist/build/mp-baidu`` 生成百度小程序项目代码。
<div align=center>
  <img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-7.png"/>
</div>
3. 在百度小程序开发者工具中，导入生成的百度小程序项目，测试项目代码运行正常后，点击“上传”按钮上传代码，之后在百度小程序的 [管理中心](https://smartprogram.baidu.com/developer/applist.html) 选择创建的应用点击前往发布，选择对应的版本然后提交审核。


**发布为支付宝小程序：**
1. 入驻支付宝小程序，参考：[支付宝小程序教程](https://docs.alipay.com/mini/introduce)。
2. 在HBuilderX中顶部菜单依次点击 "发行" => "小程序-支付宝"，即可在 ``/unpackage/dist/build/mp-alipay`` 生成支付宝小程序项目代码。
<div align=center>
  <img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-8.png"/>
</div>
3. 在支付宝小程序开发者工具中，导入生成的支付宝小程序项目，测试项目代码运行正常后，点击“上传”按钮上传代码，在 [支付宝小程序后台](https://open.alipay.com/platform/mini.htm#/app)，选择刚提交的版本点击提交审核，详见：[支付宝小程序文档](https://docs.alipay.com/mini/developer/publish)。


**发布为头条小程序：**
1. 入驻头条小程序，参考：[头条小程序教程](https://developer.toutiao.com/docs/intro/create.html)。
2. 在HBuilderX中顶部菜单依次点击 "发行" => "小程序-字节跳动"，即可在 ``/unpackage/dist/build/mp-alipay`` 生成头条小程序项目代码。
<div align=center>
  <img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-8.png"/>
</div>
3. 在字节跳动小程序开发者工具中，导入生成的头条小程序项目，测试项目代码运行正常后，点击“上传”按钮上传代码，在 [头条小程序后台](https://developer.toutiao.com/app/applist)，选择刚提交的版本点击提交审核，详见：[头条小程序文档](https://developer.toutiao.com/docs/intro/create.html#%E6%8F%90%E5%AE%A1%E3%80%81%E5%8F%91%E5%B8%83%E3%80%81%E6%9B%B4%E6%96%B0)。

发布的快捷键是`Ctrl+u`。同样可拉下快速发布菜单并按数字键选择。

## 2. 通过vue-cli命令行

除了可视化界面，也可以使用 `cli` 脚手架，可以通过 `vue-cli` 创建 `uni-app` 项目。

**注意：**
- vue-cli 版本必须是3.x
- `cli` 版本更新快于HBuilderX正式版。HBuilderX正式版所包含的uni-app编译器一般是在`cli`版发布一段时间并稳定后才会更新到HBuilderX正式版。`cli`版适合喜欢鼓捣的尝鲜者，其好处是可以及时获取新功能，坏处是稳定性不如HBuilderX正式版，但因为开源，所以也欢迎开发者一起完善。

### 环境安装

全局安装vue-cli

```
npm install -g @vue/cli
```

### 创建uni-app

```
vue create -p dcloudio/uni-preset-vue my-project
```
此时，会提示选择项目模板，初次体验建议选择 `hello uni-app` 项目模板，如下所示：

<div>
<img src="http://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/h5-cli-01.png" width="300">
</div>

#### 自定义模板
选择自定义模板时，需要填写 uni-app 模板地址，这个地址其实就是托管在云端的仓库地址。以 GitHub 为例，地址格式为 `userName/repositoryName`，如 `dcloudio/uni-template-picture` 就是下载图片模板。

更多支持的下载方式，请参考这个插件的说明：[download-git-repo](https://github.com/flipxfx/download-git-repo)

### 运行并发布uni-app

```
npm run dev:%PLATFORM%
npm run build:%PLATFORM%
```

``%PLATFORM%`` 可取值如下：

|值|平台|
|---|---|
|h5|H5|
|mp-alipay|支付宝小程序|
|mp-baidu|百度小程序|
|mp-weixin|微信小程序|
|mp-toutiao|头条小程序|
|mp-qq|qq 小程序|

**其他：**

* dev 模式编译出的各平台代码存放于根目录下的 ``/dist/dev/``目录，打开各平台开发工具选择对应平台目录即可进行预览（h5 平台不会在此目录，存在于缓存中）；
* build 模式编译出的各平台代码存放于根目录下的 ``/dist/build/`` 目录，发布时选择此目录进行发布；
* dev 和 build 模式的区别：
    1. dev 模式有 SourceMap 可以方便的进行断点调试；
    2. build 模式会将代码进行压缩，体积更小更适合发布为正式版应用；
    3. 进行 [环境判断](/frame?id=运行环境判断) 时，dev 模式 process.env.NODE_ENV 的值为 development，build 模式 process.env.NODE_ENV 的值为 production。

### 使用cli创建项目和使用HBuilderX可视化界面创建项目有什么区别

#### 编译器的区别

* ``cli``创建的项目，编译器安装在项目下。并且不会跟随HBuilderX升级。如需升级编译器，执行``npm update``。
* HBuilderX可视化界面创建的项目，编译器在HBuilderX的安装目录下的plugin目录，随着HBuilderX的升级会自动升级编译器。
* 已经使用``cli``创建的项目，如果想继续在HBuilderX里使用，可以把工程拖到HBuilderX中。注意如果是把整个项目拖入HBuilderX，则编译时走的是项目下的编译器。如果是把src目录拖入到HBuilderX中，则走的是HBuilderX安装目录下plugin目录下的编译器。
* ``cli``可以自定义webpack，有灵活度但增加了出错的概率。如果想安装less、scss、ts等编译器，需自己手动npm安装。在HBuilderX的插件管理界面安装无效，那个只作用于HBuilderX创建的项目。
 
#### 开发工具的区别
* ``cli``创建的项目，内置了d.ts，同其他常规npm库一样，可在vscode等支持d.ts的开发工具里正常开发并有语法提示。
* 但其他开发工具比起HBuilderX，开发效率仍有不足。详见：[https://ask.dcloud.net.cn/article/35451](https://ask.dcloud.net.cn/article/35451)
* ``cli``创建的项目，发布App时，仍然需要使用HBuilderX。其他开发工具无法发布App，但可以发布H5、各种小程序。
* 如果使用``cli``创建项目，那下载HBuilderX时只需下载10M的标准版即可。因为编译器已经安装到项目下了。
* 对 `cli` 使用有疑问，欢迎扫码加入 uni-app 微信交流群讨论：
    <br/><img src="http://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/wx-barcode.png" width="250"/>

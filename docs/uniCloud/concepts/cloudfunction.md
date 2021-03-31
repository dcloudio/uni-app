云函数即在云端（服务器端）运行的函数。

开发者无需购买、搭建服务器，只需编写函数代码并部署到云端即可在客户端（App/H5/小程序等）调用，同时云函数之间也可互相调用。

一个云函数的写法与一个在本地定义的 `JavaScript` 方法无异，代码运行在云端 `Node.js` 中。当云函数被客户端调用时，定义的代码会被放在 `Node.js` 运行环境中执行。

开发者可以如在 `Node.js` 环境中使用 `JavaScript` 一样在云函数中进行网络请求等操作，而且还可以通过云函数服务端 SDK 搭配使用多种服务，比如使用云函数 SDK 中提供的数据库和存储 API 进行数据库和存储的操作，这部分可参考数据库和存储后端 API 文档。



HBuilderX 3.0起版本，在`uniCloud/cloudfunctions`目录右键创建云函数，如下：

![新建云函数1](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/a18b3bb0-53d8-11eb-8ff1-d5dcf8779628.jpg)



HBuilderX 3.0之前版本，在项目下的`cloudfunctions`目录上右键、新建云函数，如下：
![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/unicloud-02.png)

注：从HBuilderX 3.0起，`cloudfunctions`目录位于项目下的 `uniCloud` 目录下。

云函数修改后，可以本地运行。只有上传到云端，方可在云端生效。

更多云函数介绍参考[规范](uniCloud/cf-functions)。

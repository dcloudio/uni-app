一个服务空间对应一整套独立的云开发资源，包括数据库、存储空间、云函数等资源。服务空间之间彼此隔离。

每个服务空间都有一个全局唯一的space ID。未来会支持一个应用同时连接多个服务空间，届时需要在代码中声明space ID以告诉代码要连接哪个云服务空间。

开发者可在 HBuilderX 中新建服务空间，如下：

![](http://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/unicloud-01.png)

或者在uniCloud的web控制台[https://unicloud.dcloud.net.cn](https://unicloud.dcloud.net.cn) 创建服务空间。

开发者需先为项目绑定服务空间，然后才能上传云函数、操作服务空间下的数据库、存储等资源。

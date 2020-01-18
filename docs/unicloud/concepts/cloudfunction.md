云函数是一段运行在云端的 JS 代码，如下是一个最简单的云函数示例：

```
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('Hello World')
	//返回数据给客户端
	return event
}
```

开发者无需购买服务器，在开发工具内编写、一键上传部署即可运行云函数。

开发者可在HBuiderX中，在`cloudfunctions`目录上右键、新建云函数，如下：
![](http://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/unicloud-02.png)

云函数修改后，需上传到云端，方可生效。

云函数中可访问数据库，具体接口参考[服务端SDK](http://uniapp.dcloud.io/#/uniCloud/cf-functions)
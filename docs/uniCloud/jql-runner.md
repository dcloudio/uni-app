## HBuilderX的JQL数据库管理器

为方便开发者调试查询语句，`HBuilderX 3.1.5`起内置了JQL查询调试器。用法如下

1. 在`uniCloud/database`目录右键选择`新建JQL数据库管理`（HBuilderX创建项目时勾选uniCloud会自带一个jql文件，直接使用自带的jql文件也可以）
2. 在jql文件内写上自己的语句
3. 使用工具栏上的运行按钮运行（快捷键：Ctrl+R 或 F5）即可

![jql-runner](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/030341b0-b86d-43bf-ac59-86d2483f4cda.jpg)

**注意**

- 编写clientDB的js API（也支持常规js语法，比如var），可以对云数据库进行增删改查操作。不支持uniCloud-db组件写法
- 可以全部运行，也可以选中部分代码运行。点击工具栏上的运行按钮或者按下【F5】键运行代码
- 如果文档中存在多条JQL语句，只有最后一条语句生效
- 如果混写了普通js，最后一条语句需是数据库操作语句
- 此处代码运行不受DB Schema的权限控制，移植代码到实际业务中注意在schema中配好permission
- 不支持clientDB的action
- 数据库查询有最大返回条数限制，详见：[limit](https://uniapp.dcloud.net.cn/uniCloud/cf-database?id=limit)
- 详细JQL语法，请参考：[JQL](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=jsquery)
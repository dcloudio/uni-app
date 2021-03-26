## JQL查询调试器简介

为方便开发者调试查询语句，`HBuilderX 3.1.5-alpha`起内置了JQL查询调试器。用法如下

1. 在`uniCloud/database`目录右键选择`新建JQL查询文件`（HBuilderX创建项目时勾选uniCloud会自带一个jql文件，直接使用自带的jql文件也可以）
2. 在jql文件内写上自己的查询语句
3. 使用工具栏上的运行按钮运行（快捷键：Ctrl+R）即可

![jql-runner](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/030341b0-b86d-43bf-ac59-86d2483f4cda.jpg)

**注意**

- 如果jql文件内有多条jql查询语句直接运行仅最后一条生效
- jql文件内存在多条查询语句时可以通过选中某一条对应的代码来执行
- jql文件内支持js语法，但是注意最后一条语句一定要是数据库查询语句
- 调试jql语句时不支持使用action
- 云数据库有最大返回条数限制，详见：[限制返回数量](https://uniapp.dcloud.net.cn/uniCloud/cf-database?id=limit)
- 详细JQL语法，请参考：[jql查询](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=jsquery)
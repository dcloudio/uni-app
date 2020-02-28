`uniCloud`提供了一个 JSON 格式的文档型数据库，数据库中的每条记录都是一个 JSON 格式的对象。一个数据库可以有多个集合（相当于关系型数据中的表），集合可看做一个 JSON 数组，数组中的每个对象就是一条记录，记录的格式是 JSON 对象。

关系型数据库和 JSON 文档型数据库的概念对应关系如下表：

|关系型					|JSON 文档型			|
|:-							|:-								|
|数据库 database|数据库 database	|
|表 table				|集合 collection	|
|行 row					|记录 record / doc|
|列 column			|字段 field				|

更多云数据库介绍参考[规范](uniCloud/cf-database)。
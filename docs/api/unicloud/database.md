## databaseForJQL() @databaseforjql

uniCloud.databaseForJQL()是客户端访问云数据库的API，即[clientDB](https://doc.dcloud.net.cn/uniCloud/clientdb.html)。

VDOM模式安卓平台有如下限制：

- 暂不支持泛型传递
- 暂不支持getOne
- 暂不支持调用`db.command.aggregate`
- db.command.xxx不支持链式调用，如`db.command.lte(1726934400000).and(db.command.gte(1726848000000))`需改为`db.command.and([db.command.lte(1726934400000),db.command.gte(1726848000000)])`

**和uni-app项目的差异**

- uni-app x项目内不再支持uniCloud.database()方法，仅支持uniCloud.databaseForJQL()。
- 不再支持action云函数，因为安全问题已经不再推荐使用action云函数。开发者应改用[数据库触发器](https://doc.dcloud.net.cn/uniCloud/jql-schema-ext.html)来实现相关功能。

获取数据库操作实例

### databaseForJQL 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 阿里云 3.91，腾讯云 3.91，支付宝云 3.98 | 4.11 | 4.61 |




### 返回值 

| 类型 |
| :- |
| [Database](#database-values) |

#### Database 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| command | [UniCloudDBCommand](#uniclouddbcommand-values) | 是 |
| Geo | **UniCloudDBGeo** | 是 |

##### Geo 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| Point | GeoPoint | 是 | 地理位置点 |
| LineString | GeoLineString | 是 | 地理路径，是由两个或者更多的 Point 组成的线段 |
| Polygon | GeoPolygon | 是 | 地理上的一个多边形（有洞或无洞均可），它是由一个或多个闭环 LineString 组成的几何图形 |
| MultiPoint | GeoMultiPoint | 是 | 多个地理位置点 Point 的集合 |
| MultiLineString | GeoMultiLineString | 是 | 多个地理路径 LineString 的集合 |
| MultiPolygon | GeoMultiPolygon | 是 | 多个地理多边形 Polygon 的集合 |
##### UniCloudDBCommand 的方法 @uniclouddbcommand-values 

##### and(args: Array\<UTSJSONObject>): UTSJSONObject; @and
and
查询操作符，用于表示逻辑 "与" 的关系，表示需同时满足多个查询筛选条件

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| args | Array&lt;[UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)&gt; | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### or(args: Array\<UTSJSONObject>): UTSJSONObject; @or
or
查询操作符，用于表示逻辑 "或" 的关系，表示需同时满足多个查询筛选条件

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| args | Array&lt;[UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)&gt; | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### not(arg: UTSJSONObject): UTSJSONObject; @not
not
查询操作符，用于表示逻辑 "非" 的关系，表示需不满足指定的条件

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### nor(args: Array\<UTSJSONObject>): UTSJSONObject; @nor
nor
查询操作符，用于表示逻辑 "都不" 的关系，表示需不满足指定的所有条件

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| args | Array&lt;[UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)&gt; | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### eq(arg: any): UTSJSONObject; @eq
eq
查询筛选条件，表示字段等于某个值

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | any | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### neq(arg: any): UTSJSONObject; @neq
neq
查询筛选条件，表示字段不等于某个值

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | any | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### lt(arg: any): UTSJSONObject; @lt
lt
查询筛选操作符，表示需小于指定值

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | any | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### lte(arg: any): UTSJSONObject; @lte
lte
查询筛选操作符，表示需小于或等于指定值

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | any | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### gt(arg: any): UTSJSONObject; @gt
gt
查询筛选操作符，表示需大于指定值

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | any | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### gte(arg: any): UTSJSONObject; @gte
gte
查询筛选操作符，表示需大于或等于指定值

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | any | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### in(arr: Array\<any>): UTSJSONObject; @in
in
查询筛选操作符，表示要求值在给定的数组内

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arr | Array&lt;any&gt; | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### nin(arr: Array\<any>): UTSJSONObject; @nin
nin
查询筛选操作符，表示要求值不在给定的数组内

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arr | Array&lt;any&gt; | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### exists(arg: boolean): UTSJSONObject; @exists
exists
判断字段是否存在

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | boolean | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### mod(divisor: number, remainder: number): UTSJSONObject; @mod
mod
查询筛选操作符，给定除数 divisor 和余数 remainder

##### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| divisor | number | 是 | 除数 |
| remainder | number | 是 | 余数 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### all(arr: Array\<any>): UTSJSONObject; @all
all
数组查询操作符。用于数组字段的查询筛选条件，要求数组字段中包含给定数组的所有元素

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arr | Array&lt;any&gt; | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### elemMatch(arg: UTSJSONObject): UTSJSONObject; @elemmatch
elemMatch
用于数组字段的查询筛选条件，要求数组中包含至少一个满足 elemMatch 给定的所有条件的元素

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### size(arg: number): UTSJSONObject; @size
size
更新操作符，用于数组字段的查询筛选条件，要求数组长度为给定值

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | number | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### geoNear(arg: UTSJSONObject): UTSJSONObject; @geonear
geoNear
按从近到远的顺序，找出字段值在给定点的附近的记录

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### geoWithin(arg: UTSJSONObject): UTSJSONObject; @geowithin
geoWithin
找出字段值在指定区域内的记录，无排序。指定的区域必须是多边形（Polygon）或多边形集合（MultiPolygon）

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

##### geoIntersects(arg: UTSJSONObject): UTSJSONObject; @geointersects
geoIntersects
找出给定的地理位置图形相交的记录

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

#### Database 的方法 @database-values 

#### collection(...args: Array\<any>): Collection; @collection
collection


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| args | Array&lt;any&gt; | 否 | 


##### 返回值 

| 类型 |
| :- |
| [Collection](#collection-values) |

###### Collection 的方法 @collection-values 

###### where(condition: any): UniCloudDBFilter; @where
where


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| condition | any | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |

###### UniCloudDBFilter 的方法 @uniclouddbfilter-values 

###### get(arg?: UTSJSONObject): Promise\<UniCloudDBGetResult>; @get
get


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | 


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBGetResult**> |

#### Promise\<UniCloudDBGetResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| data | Array&lt;[UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)&gt; | 是 | 添加的记录的id列表 |
| count | number | 否 | 匹配到的数据总量 |
| requestId | string | 否 | 请求id | 

###### count(): Promise\<UniCloudDBCountResult>; @count
count




###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBCountResult**> |

#### Promise\<UniCloudDBCountResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| total | number | 是 | 添加的记录的id列表 |
| requestId | string | 否 | 请求id | 

###### update(data: UTSJSONObject): Promise\<UniCloudDBUpdateResult>; @update
update


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| data | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBUpdateResult**> |

#### Promise\<UniCloudDBUpdateResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| updated | number | 是 | 更新成功的记录数 |
| requestId | string | 否 | 请求id | 

###### remove(): Promise\<UniCloudDBRemoveResult>; @remove
remove




###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBRemoveResult**> |

#### Promise\<UniCloudDBRemoveResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| deleted | number | 是 | 删除成功的记录数 |
| requestId | string | 否 | 请求id | 

###### getTemp(): UTSJSONObject; @gettemp
getTemp




###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

###### where(condition: any): UniCloudDBFilter; @where
where


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| condition | any | 是 | 


###### 返回值 

| 类型 |
| :- |
| UniCloudDBFilter |
 

###### doc(docId: string): UniCloudDBFilter; @doc
doc


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| docId | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| UniCloudDBFilter |
 

###### field(filed: string): UniCloudDBQuery; @field
field


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| filed | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |

###### UniCloudDBQuery 的方法 @uniclouddbquery-values 

###### get(arg?: UTSJSONObject): Promise\<UniCloudDBGetResult>; @get
get


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | 


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBGetResult**> |

#### Promise\<UniCloudDBGetResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| data | Array&lt;[UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)&gt; | 是 | 添加的记录的id列表 |
| count | number | 否 | 匹配到的数据总量 |
| requestId | string | 否 | 请求id | 

###### count(): Promise\<UniCloudDBCountResult>; @count
count




###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBCountResult**> |

#### Promise\<UniCloudDBCountResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| total | number | 是 | 添加的记录的id列表 |
| requestId | string | 否 | 请求id | 

###### getTemp(): UTSJSONObject; @gettemp
getTemp




###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

###### field(filed: string): UniCloudDBQuery; @field
field


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| filed | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| UniCloudDBQuery |
 

###### skip(num: number): UniCloudDBQuery; @skip
skip


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| num | number | 是 | 


###### 返回值 

| 类型 |
| :- |
| UniCloudDBQuery |
 

###### limit(num: number): UniCloudDBQuery; @limit
limit


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| num | number | 是 | 


###### 返回值 

| 类型 |
| :- |
| UniCloudDBQuery |
 

###### orderBy(order: string): UniCloudDBQuery; @orderby
orderBy


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| order | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| UniCloudDBQuery |
 

###### groupBy(field: string): UniCloudDBQuery; @groupby
groupBy


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| field | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| UniCloudDBQuery |
 

###### groupField(field: string): UniCloudDBQuery; @groupfield
groupField


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| field | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| UniCloudDBQuery |
 

###### distinct(field: string): UniCloudDBQuery; @distinct
distinct


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| field | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| UniCloudDBQuery |
 

###### geoNear(options: UTSJSONObject): UniCloudDBQuery; @geonear
geoNear


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 


###### 返回值 

| 类型 |
| :- |
| UniCloudDBQuery |
 
 

###### skip(num: number): UniCloudDBQuery; @skip
skip


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| num | number | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### limit(num: number): UniCloudDBQuery; @limit
limit


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| num | number | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### orderBy(order: string): UniCloudDBQuery; @orderby
orderBy


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| order | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### groupBy(field: string): UniCloudDBQuery; @groupby
groupBy


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| field | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### groupField(field: string): UniCloudDBQuery; @groupfield
groupField


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| field | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### distinct(field: string): UniCloudDBQuery; @distinct
distinct


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| field | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### geoNear(options: UTSJSONObject): UniCloudDBQuery; @geonear
geoNear


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 
 

###### doc(docId: string): UniCloudDBFilter; @doc
doc


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| docId | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |
 

###### aggregate(): UniCloudDBFilter; @aggregate
aggregate




###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |
 

###### foreignKey(foreignKey: string): UniCloudDBFilter; @foreignkey
foreignKey


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| foreignKey | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |
 

###### add(data: UTSJSONObject): Promise\<UniCloudDBAddResult>; @add
add


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| data | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBAddResult**> |

#### Promise\<UniCloudDBAddResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| id | string | 是 | 添加的记录的id |
| requestId | string | 否 | 请求id | 

###### get(arg?: UTSJSONObject): Promise\<UniCloudDBGetResult>; @get
get


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| arg | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | 


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBGetResult**> |

#### Promise\<UniCloudDBGetResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| data | Array&lt;[UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)&gt; | 是 | 添加的记录的id列表 |
| count | number | 否 | 匹配到的数据总量 |
| requestId | string | 否 | 请求id | 

###### count(): Promise\<UniCloudDBCountResult>; @count
count




###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBCountResult**> |

#### Promise\<UniCloudDBCountResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| total | number | 是 | 添加的记录的id列表 |
| requestId | string | 否 | 请求id | 

###### getTemp(): UTSJSONObject; @gettemp
getTemp




###### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

###### field(filed: string): UniCloudDBQuery; @field
field


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| filed | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### skip(num: number): UniCloudDBQuery; @skip
skip


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| num | number | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### limit(num: number): UniCloudDBQuery; @limit
limit


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| num | number | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### orderBy(order: string): UniCloudDBQuery; @orderby
orderBy


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| order | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 
 

#### multiSend(...args: Array\<UTSJSONObject>): Promise\<UniCloudDBMultiSendResult>; @multisend
multiSend
合并查询请求
##### multiSend 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.16 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| args | Array&lt;[UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)&gt; | 否 | 


##### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBMultiSendResult**> |

#### Promise\<UniCloudDBMultiSendResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| dataList | Array&lt;**UniCloudDBMultiSendResultItem**&gt; | 是 | 数据列表 |
| requestId | string | 否 | 请求id | 

##### dataList 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errCode | any | 是 | 错误码，可能为字符串或数字，数字0表示成功 |
| errMsg | string | 是 | 错误信息 |
| data | Array&lt;[UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)&gt; | 否 | 数据 |
 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.database.databaseForJQL)

<!-- UTSUNICLOUDAPIJSON.unicloud-database.example -->

## databaseForJQL() @databaseforjql

uniCloud.databaseForJQL()是客户端访问云数据库的API，即[clientDB](https://doc.dcloud.net.cn/uniCloud/clientdb.html)。

- 暂不支持泛型传递
- 暂不支持getOne
- 暂不支持调用`db.command.aggregate`
- db.command.xxx不支持链式调用，如`db.command.lte(1726934400000).and(db.command.gte(1726848000000))`需改为`db.command.and([db.command.lte(1726934400000),db.command.gte(1726848000000)])`

**和uni-app项目的差异**

- uni-app x项目内不再支持uniCloud.database()方法，仅支持uniCloud.databaseForJQL()。
- 不再支持action云函数，因为安全问题已经不再推荐使用action云函数。开发者应改用[数据库触发器](https://doc.dcloud.net.cn/uniCloud/jql-schema-ext.html)来实现相关功能。

获取数据库操作实例

### databaseForJQL 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 阿里云 3.91，腾讯云 3.91，支付宝云 3.98 | 4.11 | 4.61 | - |




### 返回值 

| 类型 |
| :- |
| [Database](#database-values) |

#### Database 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| command | any | 是 | - | - | - |
| Geo | any | 是 | - | - | - |
#### Database 的方法 @database-values 

#### collection(...args: Array\<any>): Collection; @collection
collection

##### collection 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| args | Array&lt;any&gt; | 否 | - | - | - | 

##### 返回值 

| 类型 |
| :- |
| [Collection](#collection-values) |

###### Collection 的方法 @collection-values 

###### where(condition: any): UniCloudDBFilter; @where
where

###### where 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| condition | any | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |

###### UniCloudDBFilter 的方法 @uniclouddbfilter-values 

###### get(arg?: UTSJSONObject \| null): Promise\<UniCloudDBGetResult>; @get
get

###### get 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arg | any | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x; HarmonyOS(Vapor): - |  | 

###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBGetResult**> |

#### Promise\<UniCloudDBGetResult> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | Array&lt;any&gt; | 是 | - | - | 添加的记录的id列表 |
| count | number | 否 | - | - | 匹配到的数据总量 |
| requestId | string | 否 | - | - | 请求id | 

###### count(): Promise\<UniCloudDBCountResult>; @count
count

###### count 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBCountResult**> |

#### Promise\<UniCloudDBCountResult> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| total | number | 是 | - | - | 添加的记录的id列表 |
| requestId | string | 否 | - | - | 请求id | 

###### update(data: UTSJSONObject): Promise\<UniCloudDBUpdateResult>; @update
update

###### update 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | any | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x; HarmonyOS(Vapor): - |  | 

###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBUpdateResult**> |

#### Promise\<UniCloudDBUpdateResult> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| updated | number | 是 | - | - | 更新成功的记录数 |
| requestId | string | 否 | - | - | 请求id | 

###### remove(): Promise\<UniCloudDBRemoveResult>; @remove
remove

###### remove 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBRemoveResult**> |

#### Promise\<UniCloudDBRemoveResult> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| deleted | number | 是 | - | - | 删除成功的记录数 |
| requestId | string | 否 | - | - | 请求id | 

###### getTemp(): UTSJSONObject; @gettemp
getTemp

###### getTemp 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |


###### 返回值 

| 类型 |
| :- |
| any |
 

###### where(condition: any): UniCloudDBFilter; @where
where

###### where 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| condition | any | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |
 

###### doc(docId: string): UniCloudDBFilter; @doc
doc

###### doc 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| docId | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |
 

###### field(filed: string): UniCloudDBQuery; @field
field

###### field 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filed | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |

###### UniCloudDBQuery 的方法 @uniclouddbquery-values 

###### get(arg?: UTSJSONObject \| null): Promise\<UniCloudDBGetResult>; @get
get

###### get 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arg | any | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x; HarmonyOS(Vapor): - |  | 

###### 返回值 

| 类型 |
| :- |
| Promise\<[UniCloudDBGetResult](#uniclouddbgetresult-values)> |
 

###### count(): Promise\<UniCloudDBCountResult>; @count
count

###### count 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |


###### 返回值 

| 类型 |
| :- |
| Promise\<[UniCloudDBCountResult](#uniclouddbcountresult-values)> |
 

###### getTemp(): UTSJSONObject; @gettemp
getTemp

###### getTemp 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |


###### 返回值 

| 类型 |
| :- |
| any |
 

###### field(filed: string): UniCloudDBQuery; @field
field

###### field 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filed | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### skip(num: number): UniCloudDBQuery; @skip
skip

###### skip 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| num | number | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### limit(num: number): UniCloudDBQuery; @limit
limit

###### limit 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| num | number | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### orderBy(order: string): UniCloudDBQuery; @orderby
orderBy

###### orderBy 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| order | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### groupBy(field: string): UniCloudDBQuery; @groupby
groupBy

###### groupBy 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| field | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### groupField(field: string): UniCloudDBQuery; @groupfield
groupField

###### groupField 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| field | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### distinct(field: string): UniCloudDBQuery; @distinct
distinct

###### distinct 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| field | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### geoNear(options: UTSJSONObject): UniCloudDBQuery; @geonear
geoNear

###### geoNear 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | any | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x; HarmonyOS(Vapor): - |  | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 
 

###### skip(num: number): UniCloudDBQuery; @skip
skip

###### skip 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| num | number | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### limit(num: number): UniCloudDBQuery; @limit
limit

###### limit 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| num | number | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### orderBy(order: string): UniCloudDBQuery; @orderby
orderBy

###### orderBy 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| order | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### groupBy(field: string): UniCloudDBQuery; @groupby
groupBy

###### groupBy 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| field | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### groupField(field: string): UniCloudDBQuery; @groupfield
groupField

###### groupField 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| field | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### distinct(field: string): UniCloudDBQuery; @distinct
distinct

###### distinct 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| field | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### geoNear(options: UTSJSONObject): UniCloudDBQuery; @geonear
geoNear

###### geoNear 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | any | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x; HarmonyOS(Vapor): - |  | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 
 

###### doc(docId: string): UniCloudDBFilter; @doc
doc

###### doc 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| docId | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |
 

###### aggregate(): UniCloudDBFilter; @aggregate
aggregate

###### aggregate 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |
 

###### foreignKey(foreignKey: string): UniCloudDBFilter; @foreignkey
foreignKey

###### foreignKey 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| foreignKey | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |
 

###### add(data: UTSJSONObject): Promise\<UniCloudDBAddResult>; @add
add

###### add 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | any | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x; HarmonyOS(Vapor): - |  | 

###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBAddResult**> |

#### Promise\<UniCloudDBAddResult> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | string | 是 | - | - | 添加的记录的id |
| requestId | string | 否 | - | - | 请求id | 

###### get(arg?: UTSJSONObject \| null): Promise\<UniCloudDBGetResult>; @get
get

###### get 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arg | any | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x; HarmonyOS(Vapor): - |  | 

###### 返回值 

| 类型 |
| :- |
| Promise\<[UniCloudDBGetResult](#uniclouddbgetresult-values)> |
 

###### count(): Promise\<UniCloudDBCountResult>; @count
count

###### count 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |


###### 返回值 

| 类型 |
| :- |
| Promise\<[UniCloudDBCountResult](#uniclouddbcountresult-values)> |
 

###### getTemp(): UTSJSONObject; @gettemp
getTemp

###### getTemp 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |


###### 返回值 

| 类型 |
| :- |
| any |
 

###### field(filed: string): UniCloudDBQuery; @field
field

###### field 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filed | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### skip(num: number): UniCloudDBQuery; @skip
skip

###### skip 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| num | number | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### limit(num: number): UniCloudDBQuery; @limit
limit

###### limit 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| num | number | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### orderBy(order: string): UniCloudDBQuery; @orderby
orderBy

###### orderBy 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| order | string | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 
 

#### multiSend(...args: Array\<UTSJSONObject>): Promise\<UniCloudDBMultiSendResult>; @multisend
multiSend
合并查询请求
##### multiSend 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.16 | 4.11 | 4.61 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| args | Array&lt;any&gt; | 否 | - | - | - | 

##### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBMultiSendResult**> |

#### Promise\<UniCloudDBMultiSendResult> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| dataList | Array&lt;**UniCloudDBMultiSendResultItem**&gt; | 是 | - | - | 数据列表 |
| requestId | string | 否 | - | - | 请求id | 

##### dataList 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | any | 是 | - | - | 错误码，可能为字符串或数字，数字0表示成功 |
| errMsg | string | 是 | - | - | 错误信息 |
| data | Array&lt;any&gt; | 否 | - | - | 数据 |
 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.database.databaseForJQL)

<!-- UTSUNICLOUDAPIJSON.unicloud-database.example -->

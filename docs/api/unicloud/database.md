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
| command | any | 是 |
| Geo | any | 是 |
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

###### get(arg?: UTSJSONObject \| null): Promise\<UniCloudDBGetResult>; @get
get


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| arg | any | 否 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x | 


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBGetResult**> |

#### Promise\<UniCloudDBGetResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| data | Array&lt;any&gt; | 是 | 添加的记录的id列表 |
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

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| data | any | 是 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x | 


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
| any |
 

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

###### get(arg?: UTSJSONObject \| null): Promise\<UniCloudDBGetResult>; @get
get


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| arg | any | 否 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x | 


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBGetResult**> |

#### Promise\<UniCloudDBGetResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| data | Array&lt;any&gt; | 是 | 添加的记录的id列表 |
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
| any |
 

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

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | any | 是 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### UniCloudDBGetResult 的属性值 @uniclouddbgetresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| data | Array&lt;any&gt; | 是 | 添加的记录的id列表 |
| count | number | 否 | 匹配到的数据总量 |
| requestId | string | 否 | 请求id |

###### UniCloudDBCountResult 的属性值 @uniclouddbcountresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| total | number | 是 | 添加的记录的id列表 |
| requestId | string | 否 | 请求id |
 

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

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | any | 是 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### UniCloudDBGetResult 的属性值 @uniclouddbgetresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| data | Array&lt;any&gt; | 是 | 添加的记录的id列表 |
| count | number | 否 | 匹配到的数据总量 |
| requestId | string | 否 | 请求id |

###### UniCloudDBCountResult 的属性值 @uniclouddbcountresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| total | number | 是 | 添加的记录的id列表 |
| requestId | string | 否 | 请求id |

###### UniCloudDBUpdateResult 的属性值 @uniclouddbupdateresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| updated | number | 是 | 更新成功的记录数 |
| requestId | string | 否 | 请求id |

###### UniCloudDBRemoveResult 的属性值 @uniclouddbremoveresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| deleted | number | 是 | 删除成功的记录数 |
| requestId | string | 否 | 请求id |
 

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

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| data | any | 是 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x | 


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBAddResult**> |

#### Promise\<UniCloudDBAddResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| id | string | 是 | 添加的记录的id |
| requestId | string | 否 | 请求id | 

###### get(arg?: UTSJSONObject \| null): Promise\<UniCloudDBGetResult>; @get
get


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| arg | any | 否 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x | 


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBGetResult**> |

#### Promise\<UniCloudDBGetResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| data | Array&lt;any&gt; | 是 | 添加的记录的id列表 |
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
| any |
 

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
 

###### UniCloudDBAddResult 的属性值 @uniclouddbaddresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| id | string | 是 | 添加的记录的id |
| requestId | string | 否 | 请求id |

###### UniCloudDBGetResult 的属性值 @uniclouddbgetresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| data | Array&lt;any&gt; | 是 | 添加的记录的id列表 |
| count | number | 否 | 匹配到的数据总量 |
| requestId | string | 否 | 请求id |

###### UniCloudDBCountResult 的属性值 @uniclouddbcountresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| total | number | 是 | 添加的记录的id列表 |
| requestId | string | 否 | 请求id |
 

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
| args | Array&lt;any&gt; | 否 | 


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
| data | Array&lt;any&gt; | 否 | 数据 |

##### Collection 的方法 @collection-values 

##### where(condition: any): UniCloudDBFilter; @where
where


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| condition | any | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |
 

##### doc(docId: string): UniCloudDBFilter; @doc
doc


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| docId | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |
 

##### aggregate(): UniCloudDBFilter; @aggregate
aggregate




###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |
 

##### foreignKey(foreignKey: string): UniCloudDBFilter; @foreignkey
foreignKey


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| foreignKey | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBFilter](#uniclouddbfilter-values) |
 

##### add(data: UTSJSONObject): Promise\<UniCloudDBAddResult>; @add
add


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| data | any | 是 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x | 


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBAddResult**> |

#### Promise\<UniCloudDBAddResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| id | string | 是 | 添加的记录的id |
| requestId | string | 否 | 请求id | 

##### get(arg?: UTSJSONObject \| null): Promise\<UniCloudDBGetResult>; @get
get


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| arg | any | 否 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x | 


###### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudDBGetResult**> |

#### Promise\<UniCloudDBGetResult> 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| data | Array&lt;any&gt; | 是 | 添加的记录的id列表 |
| count | number | 否 | 匹配到的数据总量 |
| requestId | string | 否 | 请求id | 

##### count(): Promise\<UniCloudDBCountResult>; @count
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

##### getTemp(): UTSJSONObject; @gettemp
getTemp




###### 返回值 

| 类型 |
| :- |
| any |
 

##### field(filed: string): UniCloudDBQuery; @field
field


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| filed | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

##### skip(num: number): UniCloudDBQuery; @skip
skip


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| num | number | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

##### limit(num: number): UniCloudDBQuery; @limit
limit


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| num | number | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

##### orderBy(order: string): UniCloudDBQuery; @orderby
orderBy


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| order | string | 是 | 


###### 返回值 

| 类型 |
| :- |
| [UniCloudDBQuery](#uniclouddbquery-values) |
 

###### UniCloudDBAddResult 的属性值 @uniclouddbaddresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| id | string | 是 | 添加的记录的id |
| requestId | string | 否 | 请求id |

###### UniCloudDBGetResult 的属性值 @uniclouddbgetresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| data | Array&lt;any&gt; | 是 | 添加的记录的id列表 |
| count | number | 否 | 匹配到的数据总量 |
| requestId | string | 否 | 请求id |

###### UniCloudDBCountResult 的属性值 @uniclouddbcountresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| total | number | 是 | 添加的记录的id列表 |
| requestId | string | 否 | 请求id |

##### UniCloudDBMultiSendResult 的属性值 @uniclouddbmultisendresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| dataList | Array&lt;**UniCloudDBMultiSendResultItem**&gt; | 是 | 数据列表 |
| requestId | string | 否 | 请求id |

#### dataList 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errCode | any | 是 | 错误码，可能为字符串或数字，数字0表示成功 |
| errMsg | string | 是 | 错误信息 |
| data | Array&lt;any&gt; | 否 | 数据 |
 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.database.databaseForJQL)

<!-- UTSUNICLOUDAPIJSON.unicloud-database.example -->

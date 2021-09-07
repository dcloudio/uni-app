慢查询，指云数据库查询较慢，不能及时返回结果。这样的查询会收录在 uniCloud web控制台的慢查询日志栏目中。但收录不是实时的，有一定延时。

开发者应经常查阅自己的慢查询，修复问题，保证业务系统的健康稳定。

在数据库查询超过1秒仍不能返回结果后，阿里云甚至会报错`operation exceeded time limit`。

这里介绍如何进行查询优化以避免此类问题。

## 设置合适的索引

请参阅：[数据库索引](uniCloud/db-index.md)。

## 大量数据查询优化

如果您的数据量非常大，在设置合适的索引之后仍然会查询超时，您要考虑以下优化方案。

尽量避免使用skip，至少不应该skip比较大的值，因为skip操作Mongo服务端依然会扫描被skip的数据，带skip操作的耗时和skip的数量线性相关。您可以考虑使用排序和范围查询功能来替代直接使用skip。

对于非常大的数据可以分段来查询，即通过一定的条件将一次查询拆分为多次查询操作。

### 带条件的count@count

如果满足条件的数据特别多，where+count会特别慢，很有可能超时。我们建议不要在大数据量的集合内这样使用count方法。

### 使用skip方法传入较大的值@skip

您应该避免使用where+skip+limit的查询方式来遍历整个集合，因为这种方式随着Skip数量的增长响应时间会越来越慢，还可能会造成请求超时。

下面的代码给出了一个示例。**为避免示例过于复杂，先假设没有两条记录的create_date是相等，如果create_date不能唯一标识数据，可以再额外加入其他字段，比如文章作者等**

按照create_date（创建时间）降序排序，每次查询时都指定查询条件小于上次查询结果中的最后一条记录的create_date，这样不需要使用skip即可实现分页效果，同时还能保证用户在上下翻页的时候不会因为出现新增数据而引起的前后两页数据重复的问题。

```js
const db = uniCloud.database()
const dbCmd = db.command
module.exports = async function(event,context) {
  const {
    lastCreateDate = Date.now(),
    pageSize
  } = event
  if(pageSize > 100){
    throw new Error('单页数据不可超过100条')
  }
  const res = await db.collection('book').where({
    create_date: dbCmd.lt(lastCreateDate)
  })
  .limit(pageSize)
  .get()
}
```

使用上述写法后您应该使用上一页、下一页、上n页（其中n是一个比较小的数字）、下n页的翻页功能来替换随机翻页。您可以参考百度或者谷歌的搜索结果的分页功能，当结果页数非常多时，不展示共有多少页，仅支持在前10页中支持随机翻页；再往下翻页的过程中，不再支持随机翻页，仅支持向下翻一个较小的页数，这样就可以在已经查询出结果的基础上再使用where+skip（少量）+limit+orderBy的方式来快速查询到结果。

## 慢查询日志@slow

如果遇到终端用户反馈接口响应慢/超时，请查看[uniCloud web控制台](https://unicloud.dcloud.net.cn/)上是否有慢查询日志。如果有慢查询日志请参考本文档进行优化。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/6fc59690-4cc5-4dfd-ade2-d1f83b23cad5.jpg)

一个典型的慢查询日志包含以下信息

|指标名称			|说明																																																			|
|--						|--																																																				|
|集合名称			|数据库请求操作的集合的名称																																								|
|命令					|执行的操作类型，例：find表示查询																																					|
|执行次数			|此慢查询在开始时间结束时间之间出现的次数																																	|
|检索文档总数	|该慢查询检索了数据库内多少条数据，如果索引设置的合适此数值会尽可能的小																		|
|命中文档总数	|该慢查询命中数据库内多少条数据，如果索引设置的合适此数值会尽可能的接近检索文档总数												|
|查询语句			|详细的查询指令模板，例：{"filter":{"invite_code":"?"}}，表示以 invite_code: "xxx" 作为查询条件进行的查询	|
|最大执行时间	|该慢查询最慢多久执行完毕																																									|

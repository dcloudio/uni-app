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

下面的代码给出了一个示例。每次查询时都指定查询条件大于上次查询结果中的最后一条记录的_id，

```js
const db = uniCloud.database()
const dbCmd = db.command
module.exports = async function(event,context) {
  const {
    lastId,
    pageSize
  } = event
  if(pageSize > 100){
    throw new Error('单页数据不可超过100条')
  }
  const res = await db.collection('book').where({
    _id: dbCmd.gt(lastId)
  })
  .limit(pageSize)
  .get()
}
```

使用上述写法后您应该使用上一页、下一页、上n页（其中n是一个比较小的数字）、下n页的翻页功能来替换随机翻页。您可以参考百度或者谷歌的搜索结果的分页功能，当结果页数非常多时，不展示共有多少页，仅支持在前10页中支持随机翻页；再往下翻页的过程中，不再支持随机翻页，仅支持向下翻一个较小的页数，这样就可以在已经查询出结果的基础上再使用where+skip（少量）+limit+orderBy的方式来快速查询到结果。


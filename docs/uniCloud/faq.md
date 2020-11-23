### uniCloud和微信小程序云开发、支付宝小程序云开发有何区别？

微信、支付宝、百度的小程序，均提供了云开发。但它们都仅支持自家小程序，无法在其他端使用。

`uniCloud`和微信小程序云开发、支付宝小程序云开发使用相同的基础建设平台，微信小程序云开发背后是腾讯云的TCB团队，支付宝小程序云开发背后是阿里小程序云团队。`uniCloud`是DCloud和阿里小程序云团队、腾讯云的TCB团队直接展开深层次合作，在他们底层资源的基础上进行二次封装，提供的跨端云开发方案。

简单来说，uniCloud和微信小程序云开发、支付宝小程序云开发一样稳定健壮，但有更多优势：
- 跨平台。不管你在uniCloud里选择了阿里还是腾讯的serverless，均可以跨uni-app的全端使用。从pc到h5，从Android到iOS，以及各家小程序快应用，十几个平台全端支持
- uniCloud提供了`clientDB`神器，减少90%的服务器开发工作量，且保障数据安全。[详见](https://uniapp.dcloud.io/uniCloud/database)
- uniCloud提供了[uni-id](https://uniapp.dcloud.io/uniCloud/uni-id)、[uniPay](https://uniapp.dcloud.io/uniCloud/unipay)等重要框架，大幅减少开发者的相应功能开发量。
- uniCloud提供了[uniCloud admin](https://uniapp.dcloud.io/uniCloud/admin)，管理端开发工作量大幅减少。
- 更易学。uniCloud提供了`JQL`查询语言，比SQL和MongoDB的查询语法更简单易掌握，尤其是联表查询非常简单。[详见](https://uniapp.dcloud.io/uniCloud/database?id=jsquery)
- 更完善的工具链。前端uni-app、云端uniCloud、还有ide端的HBuilderX，互相紧密搭配，打造闭环的优秀开发体验
- 更丰富的生态。插件市场有大量现成的轮子和资源 [详见](https://ext.dcloud.net.cn/?cat1=7&orderBy=TotalDownload)

### uniCloud稳定吗？DCloud服务器异常会影响我的线上业务吗？

`uniCloud`是 DCloud 和阿里云、腾讯云等成熟云厂商合作推出的云服务产品，阿里云、腾讯云等提供云端基础资源，DCloud提供API设计、前端框架、IDE工具支持、管理控制台、插件生态等服务，开发者的云函数直接托管在阿里云等服务商的serverless平台。

用户终端上的应用在运行时，直连云服务商serverless平台，不会经过DCloud服务器，开发者无需担心因DCloud服务器负载而影响自己业务的问题。

尤其是腾讯云付费版，享受腾讯云的SLA。如果真出问题，腾讯云会负责赔偿（实际上不太会出现故障）

### 云函数 和 传统 Node.js 开发有何区别？

云函数相当于 Node.js + Serverless + DCloud改进。
- 传统Node.js开发需要购买服务器，安装Node.js环境，部署 pm2 等守护进程；云函数无需考虑服务器环境，只需专心实现业务代码，然后将云函数一键上传，云服务商负责云函数运行环境的准备。
- 传统Node.js开发模式，开发者需监控服务器参数，比如硬盘使用率，避免服务器负载过高导致业务中断；云函数模式下，开发者无需关心云函数运行的宿主环境，云厂商会实现服务调配及硬件监控。
- 用户量较大时，传统Node.js开发需考虑购买更多服务器并实现负载均衡；云函数模式下，云服务商自动弹性扩容，开发者无需担心服务器扛不住压力。
- 传统Node.js开发模式，需考虑安全防护，比如DDos攻击；云函数模式，云厂商的API网关会做拦截防护，开发者无需关心，并可节省高防IP等费用

总结一下，前端同学即便可熟练编写Node.js代码，但对于DB优化、弹性扩容、攻击防护、灾备处理等方面还是有经验欠缺的，但`uniCloud`将这些都封装好了，真正做到仅专注业务实现，其它都委托云厂商服务。

另外，在 Node.js 代码实现上，云函数每次执行的宿主环境（可简单理解为虚拟机或服务器硬件）可能相同，也可能不同，因此传统`Node.js`开发中将部分信息存储本地硬盘或内存的方案就不再适合，建议通过云数据库或云存储的方案替代。

当然还有最重要的一点，在uniCloud中，推荐大量业务使用clientDB，一个应用中写不了太多云函数。

### uniCloud只支持uni-app，怎么开发web界面？

uni-app本来可以开发web界面，详见：[uni-app宽屏适配指南](https://uniapp.dcloud.io/adapt)

如果是需要pc版admin的话，uniCloud提供了[uniCloud admin](https://uniapp.dcloud.io/uniCloud/admin)

插件市场有很多uniCloud Admin系统可搜索：[https://ext.dcloud.net.cn/search?q=admin&cat1=7&orderBy=UpdatedDate](https://ext.dcloud.net.cn/search?q=admin&cat1=7&orderBy=UpdatedDate)

### 可否通过http url方式访问云函数或云数据库？

- 场景1：比如App端微信支付，需要配服务器回调地址，此时需要一个HTTP URL。
- 场景2：非uni-app开发的系统，想要连接uniCloud，读取数据，也需要通过HTTP URL方式访问。

uniCloud提供了`云函数URL化`，来满足上述需求。[详见](https://uniapp.dcloud.io/uniCloud/http)

### 微信云开发支持客户端直接操作数据库，uniCloud不支持？
uniCloud提供了比微信云开发更优秀的前端操作数据库方案，见：[clientDB](https://uniapp.dcloud.net.cn/uniCloud/database)

### 云开发是nodejs+MongoDB组合，对比php+mysql的传统组合怎么样？
nodejs的性能高于php，MongoDB的性能也优于mysql。

对于前端而言，MongoDB这种类json的文档数据库更加易用，且有更高的灵活性。
操作MongoDB仍然使用js的方法，而无需学习sql语句。

对于喜欢传统数据库的开发者而言，仍然可以按传统方式设计数据库表结构。对于希望增加数据冗余以提高性能的开发者而言，nosql数据库则是利器。

uniCloud提供了`JQL`，它更符合js开发者的习惯，并且极大的降低了联表查询的复杂度，其他方案相比`JQL`都复杂很多。[详见](https://uniapp.dcloud.net.cn/uniCloud/database?id=jsquery)

### 支持websocket吗？
websocket的实时特性导致serverless化比较复杂，目前曲线方案有：
1. 如果使用三方sdk服务，比如推送、腾讯或声网等实时音视频方案，由于是连接三方服务器，不是连接uniCloud，这些方案仍然可以继续使用。
2. 一些三方专业的websocket服务也可以使用，比如：[https://ext.dcloud.net.cn/plugin?id=1334](https://ext.dcloud.net.cn/plugin?id=1334)
3. 如果是im方面的需求，那么基于uniPush的im服务是非常推荐的选择：[https://ext.dcloud.net.cn/plugin?id=2670](https://ext.dcloud.net.cn/plugin?id=2670)
4. 前端轮询获取服务器数据：[https://ext.dcloud.net.cn/plugin?id=2740](https://ext.dcloud.net.cn/plugin?id=2740)

### 如何导入老数据库的数据？
- 方式1：可以在HBuilderX里用db_init.json来批量创建云数据库和插入表内容，[详见](https://uniapp.dcloud.io/uniCloud/cf-database?id=%e4%bd%bf%e7%94%a8db_initjson%e5%88%9d%e5%a7%8b%e5%8c%96%e9%a1%b9%e7%9b%ae%e6%95%b0%e6%8d%ae%e5%ba%93)
- 方式2：阿里云支持在uniCloud web控制台界面直接导入导出数据
- 方式3：在云函数里，使用nodejs标准写法，连接老数据库，如使用mysql的[插件](https://ext.dcloud.net.cn/plugin?id=1925)，把数据读出来，再批量写入云数据库
- 方式4：将一个云函数URL化，用其他语言读取老数据库，通过http方式提交到云函数，云函数将接收到的数据存入云数据库

### 云函数访问时快时慢怎么回事？

云函数对应的资源，如果长时间不使用，会被阿里云或腾讯云平台从内存中释放。一旦被释放，启动云函数时会有一个冷启动的过程。

表现为：隔了很久不用，第一次用就会比较慢，然后立即访问第二次，则很快，毫秒级响应。

冷启动的速度一般不会超过1.5秒，如超过1.5秒应该是云函数写的有问题或网络有问题。

资源回收策略方面，阿里云是15分钟内没有第二次访问的云函数，就会被回收。腾讯云是半小时。

两家云厂商仍然在优化这个问题。目前如果开发者在意这个问题，给开发者的建议是：
1. 使用clientDB可以减少遇到问题的概率
2. 非高频访问的云函数，合并到高频云函数中。有的开发者使用纯单页方式编写云函数，即在一个云函数中通过路由处理实现了整个应用的所有后台逻辑。参考[插件](https://ext.dcloud.net.cn/search?q=%E8%B7%AF%E7%94%B1&cat1=7&orderBy=UpdatedDate)
3. 非高频访问的云函数，可以通过定时任务持续运行它（注意腾讯云可以使用这个方式完全避开冷启动，而阿里云的定时任务最短周期大于资源回收周期）
4. 向service@dcloud.io发邮件，申请预留资源不销毁

### 发布H5时还得自己找个服务器部署前端网页，可以不用自己再找服务器吗？

uniCloud支持[前端网页托管](https://uniapp.dcloud.io/uniCloud/hosting)，并且免费！

- 如果你已经有备案过的域名，直接解析过来即可；
- 如果你要新注册域名，备案流程和固定ip不同。可以去买花生壳的备案服务；也可以临时买一个短期固定ip，走固定ip备案。

如果是因为微信js sdk等服务要求配置固定ip白名单，那么腾讯云收费空间已经支持固定ip，[详见](https://uniapp.dcloud.io/uniCloud/cf-functions?id=eip)

### uniCloud云数据库如何实现全文检索

查询数据时可以传入正则表达式进行查询，详情请参考[正则表达式查询](https://uniapp.dcloud.io/uniCloud/cf-database?id=regexp)

### uniCloud内如何使用formdata

nodejs本身不支持formdata，但是可以通过手动拼装formdata的方式来进行支持，[参考](https://www.npmjs.com/package/form-data)

结合`uniCloud.httpclient.request`使用的示例

```js
const FormData = require('form-data');
let form = new FormData();
form.append('my_field', 'my value');
form.append('my_buffer', new Buffer(10));

form.append('img', new Buffer(10), {
  filename: `${Date.now()}.png`,
  contentType: 'image/png'
})

uniCloud.httpclient.request('https://example.com',{
  content: form.getBuffer(),
  headers: form.getHeaders()
})
```

### 腾讯、阿里的serverless有什么大案例？

- 微信小程序云开发，已经有50万开发者，包括腾讯自有的很多大日活应用都构建在腾讯云serverless上，如微信生活缴费、乘车码、微信读书、腾讯新闻、腾讯相册等。
- 2019年双11，阿里部分业务已经迁移在serverless上。支付宝小程序也提供了云开发功能。


### 如何控制云函数数量？云函数是否可以按多级目录整理@merge-functions

其实不需要控制数量，实际开发中不会突破限制。

因为大多数项目，会使用clientDB和单路由云函数框架。

uniCloud的每个云函数是一个独立进程，不存在云函数级别的多级目录概念。

每个云函数下可以有子目录，但它们都属于这个云函数的一部分，而不是另一个云函数。

当然也可以在一个云函数下实现单路由云函数开发框架，插件市场有很多类似框架：[详见](https://ext.dcloud.net.cn/search?q=%E8%B7%AF%E7%94%B1&cat1=7&orderBy=TotalDownload)


### 海外用户访问比较慢怎么办

uniCloud服务商为阿里云时支持配置全球加速，步骤如下：

1. 参考[阿里云全球加速](https://help.aliyun.com/document_detail/153198.html)文档，开通服务并对`自有域名`进行加速
2. 将上述域名CNAME到`api.bspapp.com`
3. [自行初始化uniCloud](uniCloud/init.md)传入endpoint参数，其值为开通全球加速的自有域名

### 腾讯云提示当前实名主体已经有三个账号怎么办

开通腾讯云服务空间时实名认证提示实名主体已有三个账号，这往往是开发者在微信小程序开发工具里不小心开通了多个免费的小程序云，此时可以参考以下流程注销不用的账号：

1. 打开[腾讯云找回账号](https://cloud.tencent.com/services/forgotAccount)页面
2. 选择找回账号方式为实名信息
3. 操作完成之后可以看到自己实名信息对应的全部腾讯云账号
4. 选择不使用的账号登录之后注销即可，参考文档：[注销腾讯云账号](https://cloud.tencent.com/document/product/378/30253)

同时，如果付费购买腾讯云服务空间，每个账号可以最多拥有50个腾讯云服务空间（注意其中仅有一个享受免费额度）。

### 高并发下简单的防止超卖

高并发时很多用户同时对一条数据读写，很容易造成数据混乱，表现在秒杀抢购等场景就是超卖。以秒杀为例，开发者可以从扣除库存这步入手对超卖进行很大程度的限制，下面是一个简单的示例

```js
// 云函数
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async function(event){
  const transaction = await db.startTransaction()
  // 其他业务逻辑...
  // 库存减一
  const reduceRes = await db.collection('goods').where({
    _id: 'goods_id', // 商品ID
    stock: dbCmd.gt(1) // 限制库存大于1的才允许扣除库存
  }).update({
    stock: dbCmd.inc(-1)
  })
  if(reduceRes.updated === 0) { // 如果没成功更新库存就认为下单失败
    await transaction.rollback()
    return {
      code: 1001,
      message: '下单失败'
    }
  }
  // 其他业务逻辑...
}
```
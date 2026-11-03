<!-- ## store-product -->

::: sourceCode
## store-product

> issues: https://issues.dcloud.net.cn/?mid=component.wx.open-ability.store-product

:::




### 兼容性 <Help />
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/component/store-product.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=store-product&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| appid | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>小店appid。获取方式：[小店后台](https://store.weixin.qq.com/shop/setting/home) - 店铺管理 - 基础信息 - 账号信息 - 微信小店ID。 |
| product-id | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>商品id。获取小店商品id，可以通过API获取([参考链接](https://developers.weixin.qq.com/doc/store/API/product/get.html))或通过[小店后台](https://store.weixin.qq.com/shop/goods/list) - 商品管理 - 商品列表 - 规格/编码获取。 |
| product-promotion-link | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>带货商品跟佣信息。若需要商品售卖时使用小店优选联盟带货跟佣功能，可以通过API获取带货商品跟佣信息([参考链接](https://developers.weixin.qq.com/doc/channels/API/windowproduct/get.html))。 |



<!-- UTSCOMJSON.store-product.component_type -->







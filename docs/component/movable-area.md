<!-- ## movable-area -->

::: sourceCode
## movable-area

> issues: https://issues.dcloud.net.cn/?mid=component.view-container.movable.movable-area

:::

movable-view 的可移动区域


### 兼容性 <Help />
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/component/movable-area.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=movable-area&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["4.0","4.41","5.31","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


之所以有movable-area和movable-view，是因为逻辑层和视图层分离，从视图层发送数据给逻辑层，处理后再传回视图层会产生损耗，导致拖动卡顿。\
于是通过一个框架实现好的组件，在视图层内部处理拖动，避免来回通信。

但在uni-app x上，web和app上不存在通信损耗。小程序上，通过UniElement操作style并编译成了小程序的wxs和ajs，也不再存在通信损耗了。

可以在需要拖动的组件上监听touchmove，touchmove中使用UniElement.style?.setProperty('transform', 'translate(' + x + 'px,' + y + 'px)')。该写法跨平台且高性能。

在hello uni-app x里有示例，可以自由的监听view的拖动并移动其位置。[详见](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/component/general-event/touch-event.uvue)

### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| scale-area | boolean | Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: x; HarmonyOS: x | *(Boolean)*<br/>当里面的movable-view设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个movable-area |



<!-- UTSCOMJSON.movable-area.component_type -->





### 参见
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/movable-area.html)


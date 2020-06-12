#### uni.preloadPage(OBJECT)

预加载页面，是一种性能优化技术。被预载的页面，在打开时速度更快。

**平台差异说明**

|App-nvue|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√(2.7.12+)|√(2.7.12+)|x|x|x|x|x|


|属性|类型|必填|说明|
|:-:|:-:|:-:|:-:|
|url|string|是|预加载页面url|
|complete|Function|否|预加载成功完成回调|
|fail|Function|否|预加载失败回调|


#### H5 平台

预加载 /pages/test/test 对应的js文件，不执行页面预渲染逻辑
```
uni.preloadPage({url: "/pages/test/test"});
```

#### App-nvue 平台

预加载nvue页面 /pages/test/test
```
uni.preloadPage({url: "/pages/test/test"});
```

注意事项
1. App平台仅支持预加载 nvue 页面，执行页面预渲染，预载时触发生命周期 `onLoad`，`onReady`，不触发 `onShow`
2. 打开新页面时，url 完全相同（包含参数）时，优先使用预加载页面，触发生命周期 onShow
3. tabbar页面，仅支持预加载尚未显示过的页面，否者返回 fail，提示 already exists
4. 同一时间，相同 url 仅 preloadPage 一次
5. 当同一个预载页面已被打开(在路由栈)，再次打开相同url时，不再使用该预加载页面，而是打开新的非预载页面
6. `uni.reLanuch`, `uni.switchTab`, `uni.navigateBack`(含Android返回键) 切换页面时，预加载页面不会被销毁，仅触发生命周期 `onHide`
7. 在预载页面使用 `uni.redirectTo` 时，预加载页面会被销毁，触发生命周期 `onUnload`

示例
```
uni.preloadPage({url: "/pages/test/test"}); // 预加载 /pages/test/test 页面（仅触发onLoad，onReady)
uni.navigateTo({url: "/pages/test/test"}); // url匹配，跳转预加载页面（仅触发onShow)
uni.navigateTo({url: "/pages/test/test?a=b"}); // url不匹配，正常打开新页面
```

HBuilderX 2.7.12+的hello uni-app，在navigator示例和uni ui的日历示例中增加了页面预载示例。

#### uni.unPreloadPage(OBJECT)

取消预载页面。

1. 仅App-nvue支持
2. 当预载页面未被打开时，使用 `unPreloadPage`时会销毁该页面，触发生命周期 `onUnload`
3. 当预载页面已被打开时，使用 `unPreloadPage`时不销毁该页面，但该预加载页面不再继续存在，会随着路由变化而销毁

# vue 生态

- vue dev tools： 仅web平台支持。[详见](https://uniapp.dcloud.net.cn/tutorial/debug/uni-vue-devtools.html)

- pinia
	* 蒸汽模式下全平台支持
	* vdom模式下官方库仅web和小程序支持。vdom模式下app平台可使用[三方插件uts pinia](https://ext.dcloud.net.cn/plugin?name=x-pinia-s)替代官方库。
	
	简单的状态管理无需引入pinia，可参考文档：[全局变量和状态管理](../tutorial/store.md)

- i18n
	* 蒸汽模式下全平台支持
	* vdom模式下官方库仅web和小程序支持。vdom模式下app平台可使用[三方插件i18n插件](https://ext.dcloud.net.cn/search?q=i18n&orderBy=Relevance&cat1=8&cat2=81&uni-appx=1&uni-app-platforms=&uni-app-x-platforms=)替代官方库。

- vuex：已淘汰，被pinia替代。

- vue router：uni-app x的路由管理使用[pages.json](../collocation/pagesjson.md)，不是vue router

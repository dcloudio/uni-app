# tab-bar 选项卡

自定义组件组件，主要用于底部选项卡。

# 项目背景
开发一个tab-bar组件，放在 /uni_modules/uni-tab-bar/components/uni-tab-bar/ 目录下。

在页面 /pages/tab-bar/tab-bar.uvue 里面演示了tab-bar组件的各种用法。

tab-bar组件是选项卡组件。包括子组件：
* tab-list：包裹选项卡item的容器。位置在 /uni_modules/uni-tab-bar/components/uni-tab-bar/tab-list.uvue
	+ tab-list-item ：具体的选项卡item，比如 首页、我的。位置在 /uni_modules/uni-tab-bar/components/uni-tab-bar/tab-list-item.uvue
* tab-content：选项卡对应要展示的内容页。存在多个互相覆盖的tab-content，但同一时间只显示激活的那一个。其他tab-content均隐藏。。位置在 /uni_modules/uni-tab-bar/components/uni-tab-bar/tab-content.uvue

tab-bar组件有如下属性：
- active-index
	值域为大于等于0的整数

tab-bar组件有change事件，事件回调中会给出新选中的索引值。

tab-list-item组件下放子组件 badge-view。badge-view组件位置在 /uni_modules/uni-badge-view/components/uni-badge-view/uni-badge-view.uvue

tab-content组件默认只显示一个。
初始化tab-bar时，只加载第一个激活的tab-content，其他先不加载。等用户操作激活其他tab-content时，再加载。已经加载的tab-content，不再处于激活状态时，使用visible隐藏
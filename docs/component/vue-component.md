### component

渲染一个“元组件”为动态组件。依 `is` 的值，来决定哪个组件被渲染。[详见](https://cn.vuejs.org/v2/api/#component)



**平台差异说明**

|App|H5	|微信小程序	|支付宝小程序	|百度小程序	|字节跳动小程序	|QQ小程序	|快应用	|360小程序	|
|:-:|:-:|:-:		|:-:			|:-:		|:-:			|:-:		|:-:	|:-:		|
|√	|√	|x			|x				|x			|x				|x			|x		|x			|





### template

`uni-app` 支持在 `template` 模板中嵌套 `<template/>` 和 `<block/>`，用来进行 [列表渲染](https://uniapp.dcloud.io/vue-basics?id=listrendering) 和 [条件渲染](https://uniapp.dcloud.io/vue-basics?id=condition)。

`<template/>` 和 `<block/>` 并不是一个组件，它们仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。

`<block/>` 在不同的平台表现存在一定差异，推荐统一使用 `<template/>`。


**平台差异说明**

|App|H5	|微信小程序	|支付宝小程序	|百度小程序	|字节跳动小程序	|QQ小程序	|快应用	|360小程序	|
|:-:|:-:|:-:		|:-:			|:-:		|:-:			|:-:		|:-:	|:-:		|
|√	|√	|√			|√				|√			|√				|√			|√		|√			|


**代码示例**


```html
<template>
    <view>
        <template v-if="test">
            <view>test 为 true 时显示</view>
        </template>
        <template v-else>
            <view>test 为 false 时显示</view>
        </template>
    </view>
</template>
<script>
    export default {
        data() {
            return {
				test:true
            }
        }
    }
</script> 
```


```html
<template>
    <view>
        <block v-for="(item,index) in list" :key="index">
            <view>{{item}} - {{index}}</view>
        </block>
    </view>
</template>
```




### transition

`<transition>` 元素作为单个元素/组件的过渡效果。`<transition>` 只会把过渡效果应用到其包裹的内容上，而不会额外渲染 DOM 元素，也不会出现在可被检查的组件层级中。[详见](https://cn.vuejs.org/v2/api/#transition)


**平台差异说明**

|App|H5	|微信小程序	|支付宝小程序	|百度小程序	|字节跳动小程序	|QQ小程序	|快应用	|360小程序	|
|:-:|:-:|:-:		|:-:			|:-:		|:-:			|:-:		|:-:	|:-:		|
|x	|√	|x			|x				|x			|x				|x			|x		|x			|




### transition-group

`<transition-group>` 元素作为多个元素/组件的过渡效果。`<transition-group>` 渲染一个真实的 DOM 元素。默认渲染 `<span>`，可以通过 tag attribute 配置哪个元素应该被渲染。[详见](https://cn.vuejs.org/v2/api/#transition-group)



**平台差异说明**

|App|H5	|微信小程序	|支付宝小程序	|百度小程序	|字节跳动小程序	|QQ小程序	|快应用	|360小程序	|
|:-:|:-:|:-:		|:-:			|:-:		|:-:			|:-:		|:-:	|:-:		|
|x	|√	|x			|x				|x			|x				|x			|x		|x			|




### keep-alive

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。[详见](https://cn.vuejs.org/v2/api/#keep-alive)


**平台差异说明**

|App|H5	|微信小程序	|支付宝小程序	|百度小程序	|字节跳动小程序	|QQ小程序	|快应用	|360小程序	|
|:-:|:-:|:-:		|:-:			|:-:		|:-:			|:-:		|:-:	|:-:		|
|x	|√	|x			|x				|x			|x				|x			|x		|x			|



### slot

`<slot>` 元素作为组件模板之中的内容分发插槽。`<slot>` 元素自身将被替换。[插槽](https://uniapp.dcloud.io/vue-components?id=%e6%8f%92%e6%a7%bd)。

详细用法，请参考下面教程的链接。[通过插槽分发内容](https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87%E6%8F%92%E6%A7%BD%E5%88%86%E5%8F%91%E5%86%85%E5%AE%B9)


**平台差异说明**

|App|H5	|微信小程序	|支付宝小程序	|百度小程序	|字节跳动小程序	|QQ小程序	|快应用	|360小程序	|
|:-:|:-:|:-:		|:-:			|:-:		|:-:			|:-:		|:-:	|:-:		|
|√	|√	|√			|√				|√			|√				|√			|√		|√			|


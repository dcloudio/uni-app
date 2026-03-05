# class样式隔离策略
## 背景
uni-app x中，有3种class样式
- 全局样式：在app.uvue里引入的class
- 页面样式：页面中的style节点下的class
- 组件样式：组件中的style节点下的class

这3者的影响关系，引用和覆盖，就是class样式隔离策略。
- 引用
指的是是否能引用到某个class，比如组件里是否可以引用到页面中的class、全局的class。
- 覆盖
指的是同名时，谁能覆盖谁。比如全局的class中有一个classA，页面中也有一个classA、组件中也有一个classA，同名了，那么到底谁的优先级更高。

在实际开发中，有的组件是自己开发的、有的是引入三方组件，不同场景下隔离需求也不一样。

对于组件作者，大多不希望外部的class影响自身的样式，导致自己的组件不正常。

但有的组件作者，没有给组件使用者提供恰当的组件样式自定义方式，导致依赖被外部覆盖class来定制组件样式。

有些插件作者开发的不是组件，而是页面模板，尤其是基于dialogPage的页面插件，也同样存在如何让插件使用者自定义插件内样式的问题。

这是一个有点复杂的多边关系，需要一个明确的默认策略，并提供自定义方案。

在HBuilderX 5.0以前，这个关系并没有梳理清楚，web、各家小程序各有各的策略。

从HBuilderX 5.0起，全平台统一了样式隔离策略。**这可能会造成一定的向下兼容问题，开发者需要注意。**

## HBuilderX 5以前的策略
- web
	* 全局影响所有
	* 页面、组件、父子组件之间隔离，互不影响
	* 可以使用v-deep/deep向下穿透样式。
- 微信小程序和App
	* 全局影响所有
	* 页面影响组件。父组件不影响子组件。
	* 不支持v-deep
	* 同权重选择器下，优先级从低到高依次为：全局样式 < 页面样式 < 组件样式

## HBuilderX 5+ 全平台统一样式隔离策略2.0

uni-app x 5.0起，提供了 `样式隔离策略2.0`

蒸汽模式仅支持`样式隔离策略2.0`

非蒸汽模式，考虑到向下兼容问题，目前没有废弃老版样式隔离策略，暂时默认是老策略。需要显式开启2.0策略。

### 非蒸汽模式的开启方式
在manifest.json源码视图中设置：`manifest.json -> uni-app-x -> styleIsolationVersion: "2"`，可以开启`样式隔离策略2.0`
```json
{
	"name": "Hello uni-app x",
	"appid": "__UNI__HelloUniAppX",
	"versionName": "2.0.0",
	"versionCode": 20000,
	"uni-app-x": {
		"styleIsolationVersion":"2"
	}
}
```

推荐插件作者在自己的项目下打开样式隔离策略2.0，尽快完成插件适配。主流插件作者陆续改造完毕后，HBuilderX将再次升级，调整为非蒸汽模式也默认使用样式隔离策略2.0，并逐步废弃老版样式隔离策略。

样式隔离策略2.0的详细介绍如下：

### 默认策略
- 全局影响页面
	* 页面可以引用全局class，如果有同名class则合并，优先级页面>全局。
	* 组件不可以引用全局class。
- 页面、组件、父子组件之间隔离，互不影响。
- 组件根样式传递依然生效，不受样式隔离策略影响
	* 如果组件是单根节点，组件父层使用时给组件上设置class和style，会作用到组件的根节点。
	* 如果组件是多根节点，父层使用时设置的class和style如何分配，需要组件内部写代码分配这些样式传递给哪些元素。

### 自定义方式
#### isolated配置是否隔离
虽然有默认策略，但页面和组件，均支持通过配置样式隔离策略，单独声明自己是否允许被外部影响。

在`<script setup>`中使用 defineOptions 定义 styleIsolation，取值值域有 isolated | app | app-and-page。

页面的默认值是 app，组件的默认值是 isolated。（注意一个uvue页面，也可以同时被当做组件使用，此时默认值也变成了 isolated）

- isolated：表示隔离，不受外部影响
	* 配置为isolated的页面，不能引用全局class，页面中出现与全局class中同名的class，也不会和全局class合并。
	* 配置为isolated的组件，不能引用全局class、不能引用父页面或父组件的class。全局、页面或父组件的class中出现与组件同名的class，也不会合并。
- app：表示允许全局class影响
	* 配置为app的页面，可以引用全局class，页面中出现与全局class中同名的class，会和全局class合并，优先级：页面 > 全局。
	* 配置为app的组件，可以引用全局class，不受所在页面的配置影响（不管页面配置的是isolated还是app），组件中出现与全局class中同名的class，会和全局class合并，优先级：组件 > 全局。
- app-and-page：表示组件允许全局和页面的class影响。此配置对页面无效。
	* 配置为app-and-page的组件，可以引用全局和页面的class，组件中出现与全局和页面class中同名的class，会和全局、页面class合并，优先级：页面 > 组件 > 全局。
	* 配置为app-and-page的组件，不受所在页面的配置影响（不管页面配置的是isolated还是app），均会按上一条规则合并。

使用示例：
- 组合式示例
```vue
<script setup lang="uts">
	defineOptions({
		styleIsolation: 'isolated' //表示隔离，不受外部影响
	})
</script>
```

- 选项式示例

推荐开发者尽快升级选项式为组合式，但样式隔离策略2.0在非蒸汽模式下也支持选项式写法。

```vue
<script>
export default {
    styleIsolation: 'isolated' //表示隔离，不受外部影响
}
</script>
```

本文所指的页面，不区分普通页面还是dialogPage。

本策略调整，会对插件市场的组件使用造成较大影响。

如果组件作者，希望保持向下兼容，即兼容HBuilderX 5以前的样式方案。可以在组件内配置app-and-page，允许全局和页面进行同名class合并。

但注意即便配置了app-and-page，只是尽可能减少向下兼容，和原来也有少许差异，即原本web下页面不能影响组件，配置app-and-page后会被影响。

#### external-class

当组件隔离后，不受外部class影响，那么组件的样式定制，就需要一套新的完善方案。

组件的根样式，可以通过父层使用组件时传入style或class来影响。

但很多组件有嵌套子组件，这些子组件也有开放给外部使用者来自定义样式的需求。

有一种方式是把子组件的样式，封装成组件属性。但这种属性封装有较多弊端：
1. 封装很多属性，组件作者麻烦。封装少了，组件使用者不够用
2. 属性太多导致组件性能不佳，初始化速度慢
3. 属性无法使用css变量，很多主题样式依赖css变量

在其他平台，有各自的解决方案：
- 在web component中，默认也是样式隔离，但设计了一套::part伪元素方案来影响组件的子组件样式。
- 微信小程序提供的方案是external-class，通过组件属性名称修改组件内部子组件样式。

不过这2套方案无法跨到对方的平台。

uni-app x提供了一套跨平台的新方案。它的写法类似微信小程序的external-class，也是通过组件属性修改组件内部子组件样式。但为了跨平台，逻辑又与微信的实现有差异。

在过去的uni-app中，一直有一个用法，比如input组件的placeholder-class属性，传入一个class名称，可以修改input组件内部的placeholder的样式。

现在这套机制开放出来，所有组件作者都可以使用。

##### external-class：外部影响组件子元素的方案

HBuilderX 5.0+，提供了可跨全平台的external-class，即组件把必要的子组件的样式暴露出去，外部可以传入一个class进行覆盖。相比属性封装，这样更优雅且高性能。

举个例子，假使有一个组件switch开关，它内部有2层结构，根view和圆球view。

根view的样式可以被父层直接设置的class和style影响，那么圆球view可以暴露一个 thumb-class 的扩展class被外部影响。

Switch组件示例源码：
```vue
<template>
  <view class="uni-switch"> <!-- 这里是组件根view -->
    <view class="uni-switch-thumb" :class="thumbClass"></view> <!-- 这里是圆球view -->
  </view>
</template>
<script lang="uts" setup>
const props = withDefaults(defineProps<SwitchProps>(), {
  thumbClass: '' // 定义一个thumbClass属性
})

defineOptions({
  externalClasses: ['thumb-class'] // 注册扩展class，有了这个配置，uni-app x 框架就会把没有写在组件里的外部class传入进来。数组方式，支持配置多个external-class
})
</script>
```

有了这样的组件，那么使用时在组件上写一个thumb-class属性，就可以定义组件的子组件样式：
```vue
<template>
	<switch thumb-class="red-thumb-class"></switch>
</template>
<style>
.red-thumb-class{
	background-color:red
}
</style>
```

上面的代码，会让这个Switch组件的圆球变成红色。

以上只是举例，实际的switch组件要比上述例子复杂。可以参考Switch组件的[源码](https://gitcode.com/dcloud/uni-component/tree/alpha/uni_modules/uni-form)

defineOptions中配置externalClasses，从HBuilderX5.0起支持。

总结下使用external-class需要做的事情：
- 对于组件作者：
1. 给组件定义一个props属性，比如xxxClass
2. 给组件的子元素上绑定一个动态Class，值为xxxClass属性，比如 :class="xxxClass"
3. 在script中注册externalClasses，让编译器把外部使用者设置的样式编入组件内可生效，即`defineOptions({externalClasses: ['xxx-class']})`
- 对于组件使用者：
1. 在组件属性上使用 xxx-class="yyy"
2. 在style里或全局里定义名为yyy的class

在HBuilderX 5.0之前，开发者会发现不写这个配置，在非web平台，也可以生效。

这是因为非web平台在HBuilderX 5.0之前，会默认把页面样式合并到组件中，也就是组件在非web平台默认不隔离，可以引用页面class。

从HBuilderX 5.0起，组件样式默认隔离，如果组件不配置`app`或`app-and-page`，就只能通过注册externalClasses来实现外部样式的影响。

**注意事项：**

- 由于全局样式是最低优先级，如果传递给组件externalClasses的class是在全局App.uvue中定义的，且期望覆盖组件内部自身class的部分样式，需要给指定的css属性增加`!important;`。


##### 组件避免外部过度干扰样式

如果组件作者有些样式并不想被外部自定义，那么可以写在组件的内联style中。由于class的优先级低于style，所以内联style永远生效（除非class中的样式定义为important）。

还是以Switch组件举例，假使组件源码中圆球view的style写了`border-width: 2px`，那么外部使用者无法改变圆球view的边框粗细。
```vue
<template>
  <view class="uni-switch"> <!-- 这里是外层view -->
    <view style="border-width: 2px" class="uni-switch-thumb" :class="thumbClass"></view> <!-- 这里是圆球view -->
  </view>
</template>
```

- 关于external-style的说明

除了external-class，其实组件作者也可以提供external-style。

此时可作为组件属性直接使用，无需在defineOptions中注册externalClasses。

external-style是内联字符串，不受样式隔离策略影响，它永远生效。所以在HBuilderX 5.0之前也是生效的。

但external-style有个需要注意的问题，这种方式会导致子组件所有样式都能被外部影响。

组件作者难以控制哪部分样式不允许被外部修改。可能出现使用者使用不当导致组件变形。

```vue
<template>
  <view class="uni-switch"> <!-- 这里是外层view -->
    <view :style="thumbStyle" class="uni-switch-thumb" :class="thumbClass"></view> <!-- 这里是圆球view -->
  </view>
</template>
<script lang="uts" setup>
const props = withDefaults(defineProps<SwitchProps>(), {
  thumbClass: '' // 定义一个thumbClass属性
  thumbStyle: '' // 定义一个thumbStyle属性
})

defineOptions({
  externalClasses: ['thumb-class'] // 注册扩展class，无需注册扩展style
})
</script>
```

## 注意
再次提醒，以上介绍的styleIsolation、external-class等内容，均属于样式隔离策略2.0的内容。非蒸汽模式的应用未开启 `manifest.json->uni-app-x->styleIsolationVersion: "2"` 是不会生效的。
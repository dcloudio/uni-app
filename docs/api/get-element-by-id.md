<!-- ## uni.getElementById(id) @getelementbyid -->

::: sourceCode
## uni.getElementById(id) @getelementbyid

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getElementById


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getElementById

:::

返回一个匹配特定 ID 的元素， 如果不存在，返回 null。\
如果需要获取指定的节点类型，需要使用 as 进行类型转换。\
ID 区分大小写，且应该是唯一的。如果存在多个匹配的元素，则返回第一个匹配的元素。


### getElementById 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS uni-app x UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.25 | 4.61 | 4.61 |


**注意：** \
uni是全局api，本方法获取的元素，是页面栈栈顶（不包括 dialogPage）的页面的元素，而不是执行本方法代码所在的页面的元素。\
如果A页面被栈顶的B页面盖住，在A页面执行`uni.getElementById`会访问到B页面的元素。

如需寻找特定页面上的Element，应使用[UniPage对象的getElementById方法](../api/get-current-pages.md#getelementbyid)

而获取当前页面对象的方法，则是`this.$page`，这个方式可以获取到dialogPage页面，那么通用的、在当前页面获取UniElement的方式是：`this.$page.getElementById`

另一种与页面绑定的获取元素的方式是`this.$refs`获取的组件对象再进一步as为element。[详见](../tutorial/idref.md#ref方式)

### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | [string.IDString](/uts/data-type.md#ide-string) \| string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


`3.93+` 支持泛型，可通过 `uni.getElementById<ElementType>(id)` 获取指定类型的元素。对于组件有自带方法的情况，通过泛型指定具体的元素类型，就可以调用该类型组件的专用方法，比如unicloud-db组件。\
具体的组件元素类型，可查阅`组件文档/组件类型`获取。

```html
	<template>
		<view>
			<text id='text' ref='textRef'>test text</text>
		</view>
	</template>
	<script>
		export default {
      onReady(){
        uni.navigateTo({
          url: '/pages/test/test'
          success() {
            // 通过 ref 获取指定页面的元素
            const textRef = this.$refs['textRef']
            // 通过 getElementById 获取指定页面的元素，此时当前页面为 test 页面，所以获取不到 #text 元素
            const textNode = uni.getElementById('text')
          }
        })
      }
		}
	</script>
```

### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [UniElement](/api/dom/unielement.md) | 当前组件<br/> | 否 |
 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-element-by-id/get-element-by-id.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-element-by-id/get-element-by-id.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-element-by-id/get-element-by-id

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-element-by-id/get-element-by-id

>示例
```vue
<template>
  <page-head id="page-head" title="getElementById"></page-head>
  <view style="margin: 0 15px;">
    <text id="text">this is text</text>
    <view id="view" class="uni-common-mt" style="border: 1px solid red">this is view</view>
    <image id="image" class="uni-common-mt" src="/static/test-image/logo.png" style="width: 50px; height: 50px;"></image>
    <scroll-view id="scroll-view" class="uni-common-mt" style="width: 100px; height: 50px; background-color: #f0f0f0; border: 1px solid #ccc;">
      <text>this is scroll-view</text>
    </scroll-view>
    <button class="uni-btn" @click="changePageHeadBackgroundColor">
      修改 page-head 背景色
    </button>
    <button class="uni-btn" @click="changeTextColor">
      修改 text 字体颜色
    </button>
    <button class="uni-btn" @click="changeViewStyle">
      修改 view 宽高及背景色
    </button>
    <button class="uni-btn" @click="changeImageStyle">
      修改 image 宽高及边框
    </button>
    <button class="uni-btn" @click="changeScrollViewStyle">
      修改 scroll-view 宽高及背景色
    </button>
    <button class="uni-btn" @click="goMultipleRootNode">
      跳转多根节点示例
    </button>
  </view>
</template>

<script setup lang="uts">
  const getElementByNotExistId = (): Element | null => {
    return uni.getElementById('not-exist-id')
  }

  const changePageHeadBackgroundColor = () => {
    const pageHead = uni.getElementById('page-head')!
    pageHead.style.setProperty('background-color', 'red')
  }

  const changeTextColor = () => {
    const text = uni.getElementById('text')!
    text.style.setProperty('color', 'red')
  }

  const changeViewStyle = () => {
    const view = uni.getElementById<UniViewElement>('view')
    if (view !== null) {
      view.style.setProperty('width', '90%')
      view.style.setProperty('height', '50px')
      view.style.setProperty('background-color', '#007AFF')
    }
  }

  const changeImageStyle = () => {
    const image = uni.getElementById<UniImageElement>('image')
    if (image !== null) {
      image.style.setProperty('width', '100px')
      image.style.setProperty('height', '100px')
      image.style.setProperty('border', '3px solid blue')
      image.style.setProperty('border-radius', '10px')
    }
  }

  const changeScrollViewStyle = () => {
    const scrollView = uni.getElementById<UniElement>('scroll-view')
    if (scrollView !== null) {
      scrollView.style.setProperty('width', '200px')
      scrollView.style.setProperty('height', '60px')
      scrollView.style.setProperty('background-color', '#e3f2fd')
      scrollView.style.setProperty('border', '2px solid #007AFF')
    }
  }

  const goMultipleRootNode = () => {
    uni.navigateTo({ url: '/pages/API/get-element-by-id/get-element-by-id-multiple-root-node' })
  }

  //自动化测试获取text元素的offsetLeft属性值
  const getTextOffsetLeft = (): number => {
    const text = uni.getElementById('text')!
    return text.offsetLeft
  }

  defineExpose({
    getElementByNotExistId,
    changePageHeadBackgroundColor,
    changeTextColor,
    changeViewStyle,
    changeImageStyle,
    changeScrollViewStyle,
    getTextOffsetLeft
  })
</script>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.dom.getElementById)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


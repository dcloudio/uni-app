## getCurrentPages() @getcurrentpages

`getCurrentPages()` 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，数组中的元素为页面实例，第一个元素为首页，最后一个元素为当前页面。

HBuilderX 4.31+，强化了页面对象，新增了UniPage对象。getCurrentPages()返回值改为UniPage对象数组。

UniPage对象强化了开发者对页面的管理功能，并且支持在uts插件中使用。

`getCurrentPages()`获取的是主页面栈，不能直接获取[dialogPage](./dialog-page.md)页面。拿到主页面UniPage对象后，可以再通过getDialogPages()方法获取这个主页面的子弹窗页面栈。

选项式的vue中通过`this.$page`，是另一种快速获取当前页面对象的方式。它得到的不是一个页面数组，而是一个具体的当前页面。并且这种方式支持主页面，也支持dialogPage。组合式写法[见下](#tips)

### getCurrentPages 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.31 | 4.61 |




### 返回值 

| 类型 |
| :- |
| Array&lt;[UniPage](/api/unipage.md)&gt; |
 


`getCurrentPages()`返回了UniPage对象数组。

每个页面是一个UniPage对象，这个对象上有较多方法，比如获取/修改pageStyle、获取高宽和安全区等。[详见](./unipage.md)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-current-pages/get-current-pages.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-current-pages/get-current-pages.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-current-pages/get-current-pages

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-current-pages/get-current-pages

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view id="container">
      <page-head title="getCurrentPages"></page-head>
      <view class="uni-padding-wrap">
        <button @click="_getCurrentPages">getCurrentPages</button>
        <view v-if="data.pages.length" style="padding: 15px 0px">
          <text>当前页面栈中 {{ data.pages.length }} 个页面，列表如下：</text>
          <template v-for="(page, index) in data.pages" :key="page">
            <text style="margin-top: 5px">index: {{ index }}, route: {{ page }}</text>
          </template>
        </view>
        <button class="uni-common-mt" @click="check$page">page check $page</button>
        <!-- #ifndef MP -->
        <button class="uni-common-mt" @click="checkGetParentPage">
          check getParentPage
        </button>
        <button class="uni-common-mt" @click="checkGetDialogPages">
          check getDialogPages
        </button>
        <button id="check-get-element-by-id-btn" class="uni-common-mt" @click="checkGetElementById">
          check getElementById
        </button>
        <button class="uni-common-mt" @click="checkGetAndroidView">
          check getAndroidView
        </button>
        <button class="uni-common-mt" @click="checkGetIOSView">
          check getIOSView
        </button>
        <button class="uni-common-mt" @click="checkGetHTMLElement">
          check getHTMLElement
        </button>
        <button class="uni-common-mt" @click="checkQuerySelector">
          check querySelector
        </button>
        <button class="uni-common-mt" @click="checkQuerySelectorAll">
          check querySelectorAll
        </button>
        <!-- #endif -->
        <!-- #ifdef APP-ANDROID -->
        <button class="uni-common-mt" @click="checkGetAndroidActivity">
          check getAndroidActivity
        </button>
        <!-- #endif -->
      </view>
      <!-- #ifndef MP -->
      <page-head title="currentPageStyle"></page-head>
      <template v-for="(item, index) in data.PageStyleArray">
        <view class="page-style-item" v-if="data.currentPageStyle[item.key] != null" :key="index">
          <view class="item-text">
            <text class="item-text-key">{{ item.key }}:</text>
            <text class="item-text-value">{{
              data.currentPageStyle[item.key]
            }}</text>
          </view>
          <view class="set-value" v-if="item.type == 'boolean'">
            <switch :checked="data.currentPageStyle.getBoolean(item.key)"
              @change="switchChange(item.key, $event as UniSwitchChangeEvent)">
            </switch>
          </view>
          <view class="set-value" v-else-if="item.type == 'number'">
            <slider :value="data.currentPageStyle.getNumber(item.key)" :show-value="true"
              @change="sliderChange(item.key, $event as UniSliderChangeEvent)" />
          </view>
          <view class="set-value" v-else-if="item.type == 'string'">
            <radio-group class="radio-set-value" @change="radioChange(item.key, $event as RadioGroupChangeEvent)">
              <radio class="radio-value" v-for="(item2, index2) in item.value" :key="index2" :value="item2">{{ item2 }}
              </radio>
            </radio-group>
          </view>
        </view>
      </template>
      <!-- #ifndef APP-HARMONY -->
      <button style="margin: 10px" @click="goSetDisablePullDownRefresh">
        go set disable pullDownRefresh
      </button>
      <!-- #endif -->
      <!-- #endif -->
      <ComponentCheckPage ref="componentCheckPage" />
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import ComponentCheckPage from './component-check-page.uvue'
  import { PageStyleItem, PageStyleArray } from './page-style.uts';

  const currentInstance = getCurrentInstance()

  const componentCheckPage = ref<ComponentPublicInstance | null>(null)

  type DataType = {
    checked: boolean;
    pages: string[];
    PageStyleArray: PageStyleItem[];
    currentPageStyle: UTSJSONObject;
    testing: boolean;
  }

  const data = reactive({
    checked: false,
    pages: [] as string[],
    PageStyleArray: PageStyleArray,
    currentPageStyle: {},
    testing: false
  } as DataType)

  const pageStyleText = computed(() : string => {
    return JSON.stringify(data.currentPageStyle)
  })

  const getPageStyle = () : UTSJSONObject => {
    const pages: UniPage[] = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    data.currentPageStyle = currentPage.getPageStyle()
    console.log(data.currentPageStyle)
    return data.currentPageStyle;
  }

  const setPageStyle = (style : UTSJSONObject) => {
    console.log('setPageStyle:', style);
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    currentPage.setPageStyle(style);
  }

  // #ifndef MP
  onLoad(() => {
    getPageStyle();
  })
  // #endif

  onReady(() => {
    // #ifdef APP-ANDROID
    setPageStyle({
      'androidThreeButtonNavigationBackgroundColor': 'transparent',
      'androidThreeButtonNavigationStyle': 'black'
    });
    getPageStyle();
    // #endif
  })

  onPullDownRefresh(() => {
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 2000)
  })
  const startPullDownRefresh = () => {
    uni.startPullDownRefresh()
  }
  const _getCurrentPages = () => {
    data.pages.length = 0
    const pages = getCurrentPages()
    data.pages.push(pages[0].route)
    if (data.pages[0].includes('/tabBar/') || data.pages[0] == '/') {
      data.checked = true
    }
    for (let i = 1; i < pages.length; i++) {
      data.pages.push(pages[i].route)
      if (pages[i].route.includes('/tabBar/')) {
        data.checked = false
      }
    }
  }

  const setStyleValue = (key : string, value : any) => {
    const style = {}
    style[key] = value
    setPageStyle(style)
    getPageStyle()
  }

  /// get-set-page-style
  const radioChange = (key : string, e : RadioGroupChangeEvent) => {
    setStyleValue(key, e.detail.value);
  }
  const sliderChange = (key : string, e : UniSliderChangeEvent) => {
    setStyleValue(key, e.detail.value);
  }
  const switchChange = (key : string, e : UniSwitchChangeEvent) => {
    setStyleValue(key, e.detail.value);
  }

  const goSetDisablePullDownRefresh = () => {
    uni.navigateTo({
      url: '/pages/API/get-current-pages/set-page-style-disable-pull-down-refresh'
    });
  }
  const getCurrentPage = () : UniPage => {
    const pages = getCurrentPages()
    return pages[pages.length - 1]
  }
  const check$page = () : boolean => {
    const page = getCurrentPage()
    const $page = currentInstance?.proxy?.$page
    let res = $page === page
    if (data.testing && res) {
      res = page.options['test'] == '123'
      if (res) {
        res = page.route == 'pages/API/get-current-pages/get-current-pages'
      }
    }
    console.log('check $page', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }
  const componentCheck$page = () : boolean => {
    const res = componentCheckPage.value?.$callMethod('check$page') as boolean
    console.log('component check $page', res)
    return res
  }
  const checkGetParentPage = () : boolean => {
    const page = getCurrentPage()
    const parentPage = page.getParentPage()
    const res = parentPage == null
    console.log('check getParentPage', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }
  const checkGetDialogPages = () : boolean => {
    const page = getCurrentPage()
    const dialogPages = page.getDialogPages()
    const res = Array.isArray(dialogPages) && dialogPages.length == 0
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    console.log('check getDialogPages', res)
    return res
  }
  const checkGetElementById = () : boolean => {
    const page = getCurrentPage()
    const element = page.getElementById('check-get-element-by-id-btn')
    let res = element != null
    // #ifndef APP-ANDROID
    if (res) {
      const elPage = element!.getPage()
      console.log('elPage', elPage)
      res = elPage === page
    }
    // #endif
    console.log('check getElementById', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }
  const checkGetAndroidView = () : boolean => {
    const page = getCurrentPage()
    const androidView = page.getAndroidView()
    const res = androidView != null
    console.log('check getAndroidView', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }
  const checkGetIOSView = () : boolean => {
    const page = getCurrentPage()
    const IOSView = page.getIOSView()
    const res = IOSView != null
    console.log('check getIOSView', res)
    uni.showToast(res ? { title: 'check success' } : { title: '仅 IOS uts 插件环境支持', icon: 'error' })
    return res
  }
  const checkGetHTMLElement = () : boolean => {
    const page = getCurrentPage()
    const HTMLView = page.getHTMLElement()
    const res = HTMLView != null
    console.log('check getHTMLElement', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }
  const checkGetAndroidActivity = () : boolean => {
    const page = getCurrentPage()
    const activity = page.getAndroidActivity()
    const res = activity != null
    console.log('check getAndroidActivity', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }

  const checkQuerySelector = () : boolean => {
    const page = getCurrentPage()
    const container = page.querySelector('#container')
    const doesNotExist = page.querySelector('#does-not-exist')
    const res = (container != null) && (doesNotExist == null)
    console.log('check checkQuerySelector', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }
  const checkQuerySelectorAll = () : boolean => {
    const page = getCurrentPage()
    const btnList = page.querySelectorAll('.uni-common-mt')
    const doesNotExistList = page.querySelectorAll('.does-not-exist')
    const res = (btnList.length > 1) && (doesNotExistList.length == 0)
    console.log('check checkQuerySelectorAll', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }

  defineExpose({
    data,
    pageStyleText,
    _getCurrentPages,
    getPageStyle,
    setPageStyle,
    startPullDownRefresh,
    check$page,
    componentCheck$page,
    checkGetParentPage,
    checkGetDialogPages,
    checkGetElementById,
    checkGetAndroidView,
    checkGetIOSView,
    checkGetHTMLElement,
    checkQuerySelector,
    checkQuerySelectorAll,
    checkGetAndroidActivity
  })
</script>

<style>
  .page {
    flex: 1;
    padding: 10px;
  }

  .page-style {
    margin-top: 15px;
  }

  .page-style-item {
    padding: 10px;
    margin-top: 10px;
    background-color: #ffffff;
    border-radius: 5px;
  }

  .item-text {
    flex-direction: row;
  }

  .item-text-key {
    font-weight: bold;
  }

  .item-text-value {
    margin-left: 5px;
  }

  .set-value {
    margin-top: 10px;
  }

  .radio-set-value {
    flex-direction: row;
  }

  .radio-value {
    margin-left: 10px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.global.getCurrentPages)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=getCurrentPages&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getCurrentPages&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getCurrentPages&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getCurrentPages&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getCurrentPages&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getCurrentPages)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getCurrentPages&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## 直接获取当前页面的UniPage@currentpage
* `4.32` 新增选项式通过 `this.$page` 获取当前 `UniPage` 实例, 组合式通过`getCurrentInstance`，代码示例：
```js
// 选项式 API
const dialogPage = this.$page
// 组合式 API
const currentInstance = getCurrentInstance()
const dialogPage = instance?.proxy?.$page
```

<!-- ## uni.showActionSheet(options) @showactionsheet -->

::: sourceCode
## uni.showActionSheet(options) @showactionsheet

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-prompt


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-prompt

:::

从底部向上弹出操作菜单

### showActionSheet 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ShowActionSheetOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.showActionSheet函数参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 菜单标题 |
| alertText | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 警示文案（仅微信小程序真机有效） |
| itemList | Array&lt;string&gt; | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 按钮的文字数组 |
| itemColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 按钮的文字颜色，字符串格式 |
| popover | **Popover** | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 大屏设备弹出原生选择按钮框的指示区域，默认居中显示 |
| titleColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | - | Web: 4.51; 微信小程序: x; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 菜单标题文字颜色，字符串格式 |
| cancelText | string | 否 | - | Web: 4.51; 微信小程序: x; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 取消按钮的文字，默认为"取消" |
| cancelColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | - | Web: 4.51; 微信小程序: x; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 取消按钮的文字颜色，字符串格式 |
| backgroundColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | - | Web: 4.51; 微信小程序: x; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 弹框背景颜色 |
| success | (result: [ShowActionSheetSuccess](#showactionsheetsuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [ShowActionSheetFail](#showactionsheetfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### popover 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| top | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指示区域坐标，使用原生 navigationBar 时一般需要加上 navigationBar 的高度 |
| left | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指示区域坐标 |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指示区域宽度 |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指示区域高度 |

#### ShowActionSheetSuccess 的属性值 @showactionsheetsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| tapIndex | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### ShowActionSheetFail 的属性值 @showactionsheetfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | showActionSheet 错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |




<!-- UTSAPIJSON.showActionSheet.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.actionSheet.showActionSheet)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#showactionsheet)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showActionSheet.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=showActionSheet&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=showActionSheet&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=showActionSheet&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=showActionSheet&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=showActionSheet)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=showActionSheet&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

注意：
- App和Web平台，actionSheet从4.52起重构为使用dialogPage实现。重构后的版本支持暗黑主题、国际化、横屏宽屏适配。

<!-- ## uni.hideActionSheet() @hideactionsheet -->

::: sourceCode
## uni.hideActionSheet() @hideactionsheet

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-actionSheet


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-actionSheet

:::

关闭栈顶页面操作菜单

### hideActionSheet 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.51 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.51 | 4.51 | 4.51 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |






<!-- UTSAPIJSON.hideActionSheet.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.actionSheet.hideActionSheet)
- [参见uni-app相关文档](https://doc.dcloud.net.cn/uni-app-x/api/hide-action-sheet.html#hideactionsheet)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=hideActionSheet&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=hideActionSheet&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=hideActionSheet&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=hideActionSheet&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=hideActionSheet&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=hideActionSheet)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=hideActionSheet&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/action-sheet/action-sheet.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/action-sheet/action-sheet.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/action-sheet/action-sheet

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/action-sheet/action-sheet

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
  <view>
    <page-head :title="data.title"></page-head>
    <view class="uni-list">
      <radio-group @change="radioChange">
        <radio class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in data.items" :key="item.value"
          :class="index < data.items.length - 1 ? 'uni-list-cell-line': ''" :value="item.value" :checked="index === data.current">
          {{item.name}}
        </radio>
      </radio-group>
    </view>
    <view class="uni-list">
      <view class="uni-list-cell uni-list-cell-pd">
        <view class="uni-list-cell-db">自定义 titleColor</view>
        <switch :checked="data.titleColorCustom" @change="titleColorChange" />
      </view>
      <view class="uni-list-cell uni-list-cell-pd">
        <view class="uni-list-cell-db">自定义 itemColor</view>
        <switch :checked="data.itemColorCustom" @change="itemColorChange" />
      </view>
      <view class="uni-list-cell uni-list-cell-pd">
        <view class="uni-list-cell-db">超长文本和空文本 item</view>
        <switch :checked="data.itemContentLarge" @change="itemContentLargeChange" />
      </view>
      <!-- #ifndef MP -->
      <view class="uni-list-cell uni-list-cell-pd">
        <view class="uni-list-cell-db">超过6个 item</view>
        <switch :checked="data.itemNumLargeSelect" @change="itemNumLargeChange" />
      </view>
      <view class="uni-list-cell uni-list-cell-pd">
        <view class="uni-list-cell-db">自定义 cancelText</view>
        <switch :checked="data.cancelTextCustom" @change="cancelTextChange" />
      </view>
      <view class="uni-list-cell uni-list-cell-pd">
        <view class="uni-list-cell-db">自定义 cancelColor</view>
        <switch :checked="data.cancelColorCustom" @change="cancelColorChange" />
      </view>
      <view class="uni-list-cell uni-list-cell-pd">
        <view class="uni-list-cell-db">自定义 backgroundColor</view>
        <switch :checked="data.backgroundColorCustom" @change="backgroundColorChange" />
      </view>
      <!-- #endif -->
    </view>
    <view class="uni-padding-wrap">
      <view class="uni-btn-v">
        <button class="uni-btn-v" type="default" @tap="showActionSheet" id="btn-action-sheet-show">弹出actionSheet</button>
        <button class="uni-btn-v uni-btn" type="default" @tap="showActionSheetAndShowAgainInCallback" id="btn-action-sheet-show">showActionSheet 并在回调中再次 showActionSheet</button>
      </view>
    </view>
  </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>
<script setup lang="uts">
  import { state, setLifeCycleNum } from '@/store/index.uts'

  type ItemType = {
    value: string,
    name: string,
  }

  type DataType = {
    title: string;
    titleColorCustom: boolean;
    itemColorCustom: boolean;
    itemContentLarge: boolean;
    itemNumLargeSelect: boolean;
    cancelTextCustom: boolean;
    cancelColorCustom: boolean;
    backgroundColorCustom: boolean;
    showErrorToast: boolean;
    items: ItemType[];
    current: number;
    originTheme: string | null;
  }
  // 使用reactive避免ref数据在自动化测试中无法访问
  const data = reactive({
    title: 'action-sheet',
    titleColorCustom: false,
    itemColorCustom: false,
    itemContentLarge: false,
    itemNumLargeSelect: false,
    cancelTextCustom: false,
    cancelColorCustom: false,
    backgroundColorCustom: false,
    showErrorToast: true,
    items: [{
      value: '标题',
      name: '有标题'
    },
    {
      value: '',
      name: '无标题'
    },
    {
      value: '超长标题测试内容，测试超过显示最大范围之后的样式-超长标题测试内容，测试超过显示最大范围之后的样式',
      name: '超长标题'
    }
    ],
    current: 0,
    // #ifdef APP
    originTheme: null,
    // #endif
  } as DataType)

  // #ifdef APP
  const setThemeAuto = () => {
    uni.setAppTheme({
      theme: 'auto'
    })
  }

  const resetTheme = () => {
    const originTheme = data.originTheme
    if(originTheme != null){
      uni.setAppTheme({
        theme: originTheme
      })
    }
  }
  // #endif

  const radioChange = (e: UniRadioGroupChangeEvent) => {
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].value === e.detail.value) {
        data.current = i;
        break;
      }
    }
  }

  const titleColorChange = (e: UniSwitchChangeEvent) => {
    data.titleColorCustom = e.detail.value
  }

  const itemContentLargeChange = (e: UniSwitchChangeEvent) => {
    data.itemContentLarge = e.detail.value
  }

  const itemColorChange = (e: UniSwitchChangeEvent) => {
    data.itemColorCustom = e.detail.value
  }

  const itemNumLargeChange = (e: UniSwitchChangeEvent) => {
    data.itemNumLargeSelect = e.detail.value
  }

  const cancelTextChange = (e: UniSwitchChangeEvent) => {
    data.cancelTextCustom = e.detail.value
  }

  const cancelColorChange = (e: UniSwitchChangeEvent) => {
    data.cancelColorCustom = e.detail.value
  }

  const backgroundColorChange = (e: UniSwitchChangeEvent) => {
    data.backgroundColorCustom = e.detail.value
  }

  const showActionSheet = () => {
    const options: ShowActionSheetOptions = {
      title: data.items[data.current].value,
      itemList: ['item1', 'item2', 'item3', 'item4'],
      success: (res) => {
        console.log(res.tapIndex);
        uni.showToast({
          title: "点击了第" + res.tapIndex + "个选项",
          icon: "none"
        })
      },
      fail: (error) => {
        if (data.showErrorToast) {
          uni.showToast({
            title: error.errMsg,
            icon: "none"
          })
        }
        console.log(error);
      }
    }
    if (data.itemContentLarge) {
      options.itemList = ['两个黄鹂鸣翠柳，一行白鹭上青天。窗含西岭千秋雪，门泊东吴万里船', '水光潋滟晴方好,山色空蒙雨亦奇。 欲把西湖比西子,淡妆浓抹总相宜', '']
    }
    if (data.itemNumLargeSelect) {
      // 大量选项测试,不能超过6个元素 https://uniapp.dcloud.net.cn/api/ui/prompt.html#showactionsheet
      const arr: string[] = []
      for(let i = 0; i < 10; i++){
        arr.push(`两个黄鹂鸣翠柳，一行白鹭上青天 ${i+1}`)
      }
      options.itemList = arr
    }
    if(data.titleColorCustom){
      options.titleColor = '#007AFF'
    }
    if(data.itemColorCustom){
      options.itemColor = '#ff00ff'
    }
    if(data.cancelTextCustom){
      options.cancelText = 'custom cancel'
    }
    if(data.cancelColorCustom){
      options.cancelColor = '#007AFF'
    }
    if(data.backgroundColorCustom){
      options.backgroundColor = '#ccc'
    }
    uni.showActionSheet(options)
  }

  const showActionSheetAndShowAgainInCallback = () => {
    uni.showActionSheet({
      title: '第一个',
      itemList: ['1','2','3'],
      complete(){
          uni.showActionSheet({
            title: '第二个',
            itemList: ['a','b','c'],
            complete: (res) => {
              console.log('showActionSheetAndShowAgainInCallback complete', res)
            }
          })
      }
    })
  }

  const getLifeCycleNum = () => {
    return state.lifeCycleNum
  }

  const setLifeCycleNumFunc = (num: number) => {
    return setLifeCycleNum(num)
  }

  // #ifdef WEB
  const closeWebActionSheet = () => {
    document.querySelector('.uni-action-sheet_dialog__cell').click()
  }
  // #endif

  const hideActionSheet = () => {
    uni.hideActionSheet()
  }

  const showActionSheetAndNavigateBackInSuccessCallback = () => {
    uni.showActionSheet({
      title: 'showActionSheetAndNavigateBackInSuccessCallback',
      itemList: ['1','2','3'],
      success: (res) => {
        console.log('showActionSheetAndNavigateBackInSuccessCallback success', res)
        setLifeCycleNum(state.lifeCycleNum + 1)
        uni.navigateBack()
      },
      fail: (error) => {
        console.log('showActionSheetAndNavigateBackInSuccessCallback fail', error)
      }
    })
  }

  onLoad(() => {
    uni.showActionSheet({
      title: "onLoad 调用示例,请手动取消",
      itemList: ['item1', 'item2'],
      fail: (res) => {
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
        console.log('onLoad showActionSheet fail', res)
      },
      complete: (res) => {
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
        console.log('onLoad showActionSheet complete', res)
      }
    })
    // #ifdef APP
    data.originTheme = uni.getSystemInfoSync().appTheme
    // #endif
  })

  defineExpose({
    data,
    // #ifdef APP
    setThemeAuto,
    resetTheme,
    // #endif
    getLifeCycleNum,
    // #ifdef WEB
    closeWebActionSheet,
    // #endif
    hideActionSheet,
    setLifeCycleNumFunc,
    showActionSheetAndNavigateBackInSuccessCallback,
    showActionSheetAndShowAgainInCallback
  })
</script>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


<!-- ## uni.showModal(options) @showmodal -->

::: sourceCode
## uni.showModal(options) @showmodal

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-prompt


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-prompt

:::

显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮。类似于一个API整合了 html 中：alert、confirm。

### showModal 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ShowModalOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 提示的标题 |
| content | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 提示的内容 |
| showCancel | boolean | 否 | true<br/>是否显示取消按钮，默认为 true | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| cancelText | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 取消按钮的文字，默认为"取消" |
| cancelColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 取消按钮的文字颜色，默认为"#000000" |
| confirmText | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 确定按钮的文字，默认为"确定" |
| confirmColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 确定按钮的文字颜色 |
| editable | boolean | 否 | false | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 是否显示输入框 |
| placeholderText | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 显示输入框时的提示文本 |
| success | (result: [UniShowModalResult](#unishowmodalresult-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [ShowModalFail](#showmodalfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### UniShowModalResult 的属性值 @unishowmodalresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| content | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | editable 为 true 时，用户输入的文本 |
| cancel | boolean | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭） |
| confirm | boolean | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 为 true 时，表示用户点击了确定按钮 |

#### ShowModalFail 的属性值 @showmodalfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| [UniPage](/api/unipage.md) | 否 |
 


<!-- UTSAPIJSON.showModal.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.modal.showModal)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#showmodal)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=showModal&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=showModal&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=showModal&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=showModal&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=showModal)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=showModal&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

注意：
- App和Web平台，showModal从4.61起重构为使用dialogPage实现。重构后的版本支持暗黑主题、国际化、横屏宽屏适配。

<!-- ## uni.hideModal(options?) @hidemodal -->

::: sourceCode
## uni.hideModal(options?) @hidemodal

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-modal


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-modal

:::

隐藏已弹出的对话框实例，如果 `modalPage` 参数为空，则隐藏当前栈顶全部对话框

### hideModal 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.61 | - | 4.61 | 4.61 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **HideModalOptions** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| modalPage | [UniPage](/api/unipage.md) | 否 | - | Web: 4.0; 微信小程序: x; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS 系统版本: 12; HarmonyOS: x | 期望隐藏的目标modal 如果为null 会关闭当前栈顶全部modal |
| success | (result: UniHideModalResult) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (result: [HideModalFail](#hidemodalfail-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### HideModalFail 的属性值 @hidemodalfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |




<!-- UTSAPIJSON.hideModal.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.modal.hideModal)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#hidemodal)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=hideModal&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=hideModal&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=hideModal&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=hideModal&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=hideModal&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=hideModal)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=hideModal&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/modal/modal.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/modal/modal.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/modal/modal

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/modal/modal

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view>
      <page-head :title="data.title"></page-head>
      <view class="uni-list">
        <radio-group @change="radioChange">
          <radio class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in data.items" :key="item.value"
            :class="index < data.items.length - 1 ? 'uni-list-cell-line' : ''" :value="item.value"
            :checked="index === data.current">
            {{ item.name }}
          </radio>
        </radio-group>
      </view>
      <view class="uni-list">
        <view class="uni-list-cell uni-list-cell-pd">
          <view class="uni-list-cell-db">是否显示过长文字</view>
          <switch :checked="data.showLongContent" @change="showLongContentChange" />
        </view>
        <view class="uni-list-cell uni-list-cell-pd">
          <view class="uni-list-cell-db">是否显示取消按钮</view>
          <switch :checked="data.showCancelSelect" @change="showCancelChange" />
        </view>
        <view class="uni-list-cell uni-list-cell-pd">
          <view class="uni-list-cell-db">定制取消文案</view>
          <switch :checked="data.cancelTextSelect" @change="cancelTextChange" />
        </view>
        <view class="uni-list-cell uni-list-cell-pd">
          <view class="uni-list-cell-db">定制确认文案</view>
          <switch :checked="data.confirmTextSelect" @change="confirmTextChange" />
        </view>
        <view class="uni-list-cell uni-list-cell-pd">
          <view class="uni-list-cell-db">测试非法的颜色</view>
          <switch :checked="data.illegalColorSelect" @change="illegalColorChange" />
        </view>
        <view class="uni-list-cell uni-list-cell-pd">
          <view class="uni-list-cell-db">测试超长的按钮文本</view>
          <switch :checked="data.illegalButtonTextSelect" @change="illegalButtonTextChange" />
        </view>
        <view class="uni-list-cell uni-list-cell-pd">
          <view class="uni-list-cell-db">是否显示输入框</view>
          <switch :checked="data.editableSelect" @change="editableChange" />
        </view>
        <view class="uni-list-cell uni-list-cell-pd">
          <view class="uni-list-cell-db">是否定制输入提示词</view>
          <switch :checked="data.placeholderTextSelect" @change="placeholderTextChange" />
        </view>
      </view>
      <view class="uni-padding-wrap uni-common-mt">
        <text>complete 执行结果：{{ data.timesShowRet }}</text>
        <view class="uni-btn-v">
          <button type="primary" @tap="modalTap" id="btn-modal-show">
            modal单次弹出
          </button>
        </view>
        <view class="uni-btn-v">
          <button type="default" @tap="modalTapTimes" id="btn-modal-show-multitime">
            modal多次弹出
          </button>
        </view>
        <!-- #ifndef MP -->
        <view class="uni-btn-v">
          <button type="default" @tap="closeAllModal" id="btn-modal-hide-all">
            延迟3s关闭全部弹窗
          </button>
        </view>
        <view class="uni-btn-v">
          <button type="default" @tap="closeLastModal" id="btn-modal-hide-last">
            延迟3s关闭最后一个弹窗
          </button>
        </view>
        <!-- #endif -->
        <text>
          success/fail 执行结果：{{ data.exeRet }}
        </text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type ItemType = {
    value : string,
    name : string,
  }

  type DataType = {
    title : string;
    showCancelSelect : boolean;
    showLongContent : boolean;
    illegalColorSelect : boolean;
    illegalButtonTextSelect : boolean;
    cancelTextSelect : boolean;
    confirmTextSelect : boolean;
    editableSelect : boolean;
    placeholderTextSelect : boolean;
    exeRet : string;
    lastModal : UniPage | null;
    items : ItemType[];
    current : number;
    timesShowRet : Array<any>;
  }
  // 使用reactive避免ref数据在自动化测试中无法访问
  const data = reactive({
    title: 'modal',
    showCancelSelect: false,
    showLongContent: false,
    illegalColorSelect: false,
    illegalButtonTextSelect: false,
    cancelTextSelect: false,
    confirmTextSelect: false,
    editableSelect: false,
    placeholderTextSelect: false,
    exeRet: "",
    lastModal: null as UniPage | null,
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
    ] as ItemType[],
    current: 0,
    timesShowRet: [] as Array<any>,
  } as DataType)

  const showLongContentChange = (e : UniSwitchChangeEvent) => {
    data.showLongContent = e.detail.value
  }

  const illegalColorChange = (e : UniSwitchChangeEvent) => {
    data.illegalColorSelect = e.detail.value
  }

  const illegalButtonTextChange = (e : UniSwitchChangeEvent) => {
    data.illegalButtonTextSelect = e.detail.value
  }

  const showCancelChange = (e : UniSwitchChangeEvent) => {
    data.showCancelSelect = e.detail.value
  }

  const cancelTextChange = (e : UniSwitchChangeEvent) => {
    data.cancelTextSelect = e.detail.value
  }

  const confirmTextChange = (e : UniSwitchChangeEvent) => {
    data.confirmTextSelect = e.detail.value
  }

  const editableChange = (e : UniSwitchChangeEvent) => {
    data.editableSelect = e.detail.value
  }

  const placeholderTextChange = (e : UniSwitchChangeEvent) => {
    data.editableSelect = e.detail.value
    data.placeholderTextSelect = e.detail.value
  }

  const radioChange = (e : UniRadioGroupChangeEvent) => {
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].value === e.detail.value) {
        data.current = i;
        break;
      }
    }
  }

  const closeLastModal = () => {
    setTimeout(() => {
      uni.hideModal({
        modalPage: data.lastModal,
        success: (res) => {
          data.exeRet = JSON.stringify(res)
        },
        fail: (res) => {
          data.exeRet = JSON.stringify(res)
        },
        complete: (res) => {
          data.timesShowRet.push(res)
        }
      })
    }, 3000)
  }

  const closeAllModal = () => {
    setTimeout(() => {
      uni.hideModal({
        modalPage: null,
        success: (res) => {
          data.exeRet = JSON.stringify(res)
        },
        fail: (res) => {
          data.exeRet = JSON.stringify(res)
        },
        complete: (res) => {
          data.timesShowRet.push(res)
        }
      })
    }, 3000)
  }

  const modalTap = () => {
    // 单次弹出前清空多次结果集合
    data.timesShowRet = []

    let cancelTextVal : string | null = null
    let cancelColorVal = ''
    if (data.cancelTextSelect) {
      cancelTextVal = "修改后的取消文本"
      cancelColorVal = "#ff00ff"
    } else {
      //#ifdef MP
      cancelTextVal = "取消"
      //#endif
    }

    let confirmTextVal : string | null = null
    let confirmColorVal = ''
    if (data.confirmTextSelect) {
      confirmTextVal = "修改后的确定文本"
      confirmColorVal = "#0ff"
    } else {
      //#ifdef MP
      confirmTextVal = "确定"
      //#endif
    }
    let placeholderTextVal = ''
    let contentVal = "弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内"

    if (data.showLongContent) {
      contentVal = "弹窗内容，告知当前状态、信息和解决方法，描述文字原则上可以无限多！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"
    }
    if (data.placeholderTextSelect) {
      placeholderTextVal = "定制提示信息"
    }
    if (data.illegalColorSelect) {
      cancelColorVal = "#WW00ff"
      confirmColorVal = "#0ffff"
    }
    if (data.illegalButtonTextSelect) {
      confirmTextVal = "超长版文字-修改后的确定文本-超长版本文字"
      cancelTextVal = "超长版文字-修改后的取消文本-超长版本文字"
    }

    let op = {
      title: data.items[data.current].value,
      editable: data.editableSelect,
      placeholderText: placeholderTextVal,
      content: contentVal,
      showCancel: data.showCancelSelect,
      cancelText: cancelTextVal,
      cancelColor: cancelColorVal,
      confirmText: confirmTextVal,
      confirmColor: confirmColorVal,
      success: (res) => {
        data.exeRet = JSON.stringify(res)
      },
      fail: (res) => {
        data.exeRet = JSON.stringify(res)
      },
      complete: (res) => {
        data.timesShowRet.push(res)
      }
    } as ShowModalOptions
    // console.log(op)
    data.lastModal = uni.showModal(op)
  }

  const modalTapTimes = () => {
    // 多次弹出前清空结果集合
    data.timesShowRet = []
    modalTap()
    modalTap()
    setTimeout(() => {
      modalTap()
    }, 200)
  }

  onLoad((options : OnLoadOptions) => {
    if (options['onLoadShowModal'] == 'false') {
      return
    }
    uni.showModal({
      title: "onLoad 调用示例,请手动取消"
    })
  })

  defineExpose({
    data
  })
</script>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


<!-- ## editor -->

::: sourceCode
## editor
:::

富文本编辑器，可以对图片、文字进行编辑。


### 兼容性 <Help />
| Web | 微信小程序 | Android 系统版本 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 7.1.1 | 5.08 | 5.08 | 5.08 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| read-only | boolean | false | Web: 4.0; 微信小程序: 4.41; Android 系统版本: 7.1.1; Android: 5.08; iOS: 5.08; HarmonyOS: 5.08 | 设置编辑器为只读 |
| placeholder | string |   | Web: 4.0; 微信小程序: 4.41; Android 系统版本: 7.1.1; Android: 5.08; iOS: 5.08; HarmonyOS: 5.08 | 提示信息 |
| show-img-size | boolean | false | Web: 4.0; 微信小程序: 4.41; Android 系统版本: 7.1.1; Android: 5.08; iOS: 5.08; HarmonyOS: 5.08 | 点击图片时显示图片大小控件 |
| show-img-toolbar | boolean | false | Web: 4.0; 微信小程序: 4.41; Android 系统版本: 7.1.1; Android: 5.08; iOS: 5.08; HarmonyOS: 5.08 | 点击图片时显示工具栏控件 |
| show-img-resize | boolean | false | Web: 4.0; 微信小程序: 4.41; Android 系统版本: 7.1.1; Android: 5.08; iOS: 5.08; HarmonyOS: 5.08 | 点击图片时显示修改尺寸控件 |
| enable-formats | Array.&lt;string&gt; |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | *(Array.&lt;string&gt;)*<br/>编辑器允许的名单内的格式 |
| type | "none" | "null" | Web: 4.0; 微信小程序: x; Android 系统版本: 8.0.0; Android: 5.08; iOS: 5.08; HarmonyOS: 5.08 | 输入类型，暂只支持<br>  "none": 聚焦时不弹出键盘 |
| name | string |   |   | 表单的控件名称，作为键值对的一部分与表单(form组件)一同提交 |
| @ready | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: 4.0; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 5.08 | 编辑器初始化完成时触发 |
| @focus | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: 4.0; 微信小程序: 4.41; Android: 5.08; iOS: 5.08 | 编辑器聚焦时触发 |
| @blur | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: 4.0; 微信小程序: 4.41; Android: 5.08; iOS: 5.08 | 编辑器失去焦点时触发 |
| @input | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: 4.0; 微信小程序: 4.41; Android: 5.08; iOS: 5.08 | 编辑器内容改变时触发 |
| @statuschange | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: 4.0; 微信小程序: 4.41; Android: 5.08; iOS: 5.08 | 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式 |

#### type 的属性描述

| 合法值 |
| :- |
| none |



<!-- UTSCOMJSON.editor.component_type -->



### 上下文对象API

editor组件有上下文对象，api为[uni.createEditorContextAsync()](../api/create-editor-context-async.md)。

给editor组件设一个id属性，将id的值传入uni.createEditorContextAsync()，即可得到editor组件的上下文对象，进一步可使用对象上的方法。


### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/editor/editor.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/editor/editor.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/editor/editor

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/editor/editor

>示例
```vue
<template>
  <view class="page-root">
    <view class="preview-panel">
      <view class="preview-header">
        <text class="uni-title-text">editor 属性示例</text>
      </view>

      <view class="preview-state-row">
        <text class="preview-state-text">read-only: {{ data.readOnly }}</text>
        <!-- #ifndef MP -->
        <text class="preview-state-text">type: {{ getTypeLabel() }}</text>
        <!-- #endif -->
      </view>

      <view class="preview-state-row">
        <view v-if="showLogs">
          <text class="preview-state-text">X: {{ data.editorX }}</text>
          <text class="preview-state-text">Y: {{ data.editorY }}</text>
          <text class="preview-state-text">width: {{ data.editorWidth }}</text>
          <text class="preview-state-text">height: {{ data.editorHeight }}</text>
        </view>
      </view>

      <view class="preview-editor-box">
        <editor
          v-if="data.showEditor"
          id="editor-props-demo"
          class="preview-editor"
          :read-only="data.readOnly"
          :placeholder="data.appliedPlaceholder"
          :show-img-size="data.appliedShowImgSize"
          :show-img-toolbar="data.appliedShowImgToolbar"
          :show-img-resize="data.appliedShowImgResize"
          :type="data.editorType"
          @ready="onEditorReady"
          @focus="onEditorFocus"
          @blur="onEditorBlur"
          @input="onEditorInput"
          @statuschange="onStatusChange"
        />
      </view>

      <view class="preview-toolbar">
        <view class="preview-toolbar-item" @tap="insertSampleText">
          <text class="preview-toolbar-icon iconfont">A</text>
        </view>
        <view class="preview-toolbar-item" @tap="insertSampleImage">
          <text class="preview-toolbar-icon iconfont">{{"&#xe6bc;"}}</text>
        </view>
        <view :class="data.boldActive ? 'preview-toolbar-item preview-toolbar-item-active' : 'preview-toolbar-item'" @tap="toggleBold">
          <text :class="data.boldActive ? 'preview-toolbar-icon preview-toolbar-icon-active iconfont' : 'preview-toolbar-icon iconfont'">{{"&#xe6ae;"}}</text>
        </view>
        <view :class="data.alignCenterActive ? 'preview-toolbar-item preview-toolbar-item-active' : 'preview-toolbar-item'" @tap="setAlignCenter">
          <text :class="data.alignCenterActive ? 'preview-toolbar-icon preview-toolbar-icon-active iconfont' : 'preview-toolbar-icon iconfont'">{{"&#xe6b6;"}}</text>
        </view>
        <view class="preview-toolbar-item" @tap="removeFormat">
          <text class="preview-toolbar-icon iconfont">{{"&#xe6b9;"}}</text>
        </view>
        <view class="preview-toolbar-item" @tap="clearEditor">
          <text class="preview-toolbar-icon iconfont">{{"&#xe6b1;"}}</text>
        </view>
        <view class="preview-toolbar-item" @tap="blurEditor">
          <text class="preview-toolbar-icon iconfont">{{"&#xe69a;"}}</text>
        </view>
        <!-- #ifndef MP -->
        <view class="preview-toolbar-item" @tap="insertMention">
          <text class="preview-toolbar-icon iconfont">@</text>
        </view>
        <!-- #endif -->
      </view>
    </view>

    <scroll-view class="props-scroll" direction="vertical">
      <view class="uni-padding-wrap">
        <view class="uni-title uni-common-mt">
          <text class="uni-title-text">可动态修改属性</text>
        </view>
      </view>
      <boolean-data :defaultValue="data.readOnly" title="read-only：设置编辑器为只读，可动态修改" @change="onReadOnlyChange"></boolean-data>
      <!-- #ifndef MP -->
      <enum-data :items="data.typeItems" title="type：null | none，控制聚焦时是否弹出键盘" @change="onTypeChange"></enum-data>
      <!-- #endif -->

      <view class="uni-padding-wrap">
        <view class="uni-title uni-common-mt">
          <text class="uni-title-text">初始化生效属性</text>
        </view>
        <text class="uni-subtitle-text">placeholder 与 show-img-* 调整后不会直接作用到当前 editor，请点击下方按钮重建后查看。</text>
      </view>
      <input-data :defaultValue="data.draftPlaceholder" title="placeholder：提示信息，不可动态修改" type="text" @confirm="onPlaceholderChange"></input-data>
      <boolean-data :defaultValue="data.draftShowImgSize" title="show-img-size：点击图片时显示图片大小控件，不可动态修改" @change="onDraftShowImgSizeChange"></boolean-data>
      <boolean-data :defaultValue="data.draftShowImgToolbar" title="show-img-toolbar：点击图片时显示工具栏控件，不可动态修改" @change="onDraftShowImgToolbarChange"></boolean-data>
      <boolean-data :defaultValue="data.draftShowImgResize" title="show-img-resize：点击图片时显示修改尺寸控件，不可动态修改" @change="onDraftShowImgResizeChange"></boolean-data>

      <view class="uni-padding-wrap uni-common-mt">
        <view class="uni-title">
          <text class="uni-title-text">当前应用中的 editor 配置</text>
        </view>
        <text class="uni-subtitle-text">placeholder：{{ data.appliedPlaceholder }}</text>
        <text class="uni-subtitle-text">show-img-size：{{ data.appliedShowImgSize }}</text>
        <text class="uni-subtitle-text">show-img-toolbar：{{ data.appliedShowImgToolbar }}</text>
        <text class="uni-subtitle-text">show-img-resize：{{ data.appliedShowImgResize }}</text>
        <button type="primary" size="mini" class="action-button apply-button" @tap="rebuildEditor">重建 editor 并应用初始化属性</button>
      </view>

      <view v-if="showLogs" class="uni-padding-wrap uni-common-mt">
        <view class="uni-title">
          <text class="uni-title-text">事件示例</text>
        </view>
        <text class="uni-subtitle-text">@ready：{{ data.readyCount }}</text>
        <text class="uni-subtitle-text">@focus：{{ data.focusCount }}</text>
        <text class="uni-subtitle-text">@blur：{{ data.blurCount }}</text>
        <text class="uni-subtitle-text">@input：{{ data.inputCount }}</text>
        <text class="uni-subtitle-text">@statuschange：{{ data.statusChangeCount }}</text>
        <text class="uni-subtitle-text">最近状态：{{ data.statusSummary }}</text>
      </view>

      <view v-if="showLogs" class="uni-padding-wrap uni-common-mt uni-common-mb">
        <view class="uni-title event-header-row">
          <text class="uni-title-text">事件日志</text>
          <button size="mini" @tap="clearLogs">清空日志</button>
        </view>
        <view class="log-box" v-if="data.logs.length > 0">
          <text v-for="(item, index) in data.logs" :key="index" class="log-text">{{ item }}</text>
        </view>
        <text v-else class="uni-subtitle-text">等待事件触发...</text>
      </view>
    </scroll-view>

    <navigator style="margin-top: 20px;" url="./editor-edit">
      <button>富文本编辑模板</button>
    </navigator>

    <bottom-safe-area />
  </view>
</template>

<script setup lang="uts">
import { ItemType } from '@/components/enum-data/enum-data-types'

type EditorPropsPageData = {
  showEditor: boolean
  readOnly: boolean
  editorType: string | null
  draftPlaceholder: string
  appliedPlaceholder: string
  draftShowImgSize: boolean
  appliedShowImgSize: boolean
  draftShowImgToolbar: boolean
  appliedShowImgToolbar: boolean
  draftShowImgResize: boolean
  appliedShowImgResize: boolean
  editorCtx: EditorContext | null
  readyCount: number
  focusCount: number
  blurCount: number
  inputCount: number
  statusChangeCount: number
  boldActive: boolean
  alignCenterActive: boolean
  statusSummary: string
  logs: string[]
  typeItems: ItemType[]
  editorX: number
  editorY: number
  editorWidth: number
  editorHeight: number
  insertImageWidth: number
  insertImageHeight: number
}

const SAMPLE_TEXT = '这是 editor 示例文本。你可以继续输入内容，也可以滚动下方属性区实时调整 editor 状态。'
function createTypeItems(selectedValue: number): ItemType[] {
  return [
    { value: 0, name: 'null：聚焦弹出键盘', checked: selectedValue == 0 },
    { value: 1, name: 'none：聚焦不弹出键盘', checked: selectedValue == 1 }
  ]
}

const showLogs = false

const initialData: EditorPropsPageData = {
  showEditor: true,
  readOnly: false,
  editorType: null,
  draftPlaceholder: '请输入内容，placeholder 仅初始化生效',
  appliedPlaceholder: '请输入内容，placeholder 仅初始化生效',
  draftShowImgSize: true,
  appliedShowImgSize: true,
  draftShowImgToolbar: true,
  appliedShowImgToolbar: true,
  draftShowImgResize: true,
  appliedShowImgResize: true,
  editorCtx: null,
  readyCount: 0,
  focusCount: 0,
  blurCount: 0,
  inputCount: 0,
  statusChangeCount: 0,
  boldActive: false,
  alignCenterActive: false,
  statusSummary: '等待 @statuschange',
  logs: [],
  typeItems: createTypeItems(0),
  editorX: 0,
  editorY: 0,
  editorWidth: 0,
  editorHeight: 0,
  insertImageWidth: 0,
  insertImageHeight: 0
}

const data = reactive<EditorPropsPageData>(initialData)

function appendLog(tag: string, detail: string) {
  const entry = `${new Date().toLocaleTimeString()} [${tag}] ${detail}`
  data.logs.unshift(entry)
  if (data.logs.length > 12) {
    data.logs.pop()
  }
}

function getTypeLabel(): string {
  return data.editorType == 'none' ? 'none（聚焦不弹键盘）' : 'null（聚焦弹键盘）'
}

function summarizeText(text: string): string {
  if (text.length <= 24) {
    return text
  }
  return `${text.substring(0, 24)}...`
}

function syncTypeItems() {
  const selectedValue = data.editorType == 'none' ? 1 : 0
  data.typeItems = createTypeItems(selectedValue)
}

function onReadOnlyChange(checked: boolean) {
  data.readOnly = checked
  appendLog('prop', `read-only => ${checked}`)
}

function onTypeChange(value: number) {
  data.editorType = value == 1 ? 'none' : null
  syncTypeItems()
  appendLog('prop', `type => ${data.editorType == null ? 'null' : data.editorType}`)
}

function onPlaceholderChange(value: string) {
  data.draftPlaceholder = value
  appendLog('draft', `placeholder 待应用 => ${data.draftPlaceholder}`)
}

function onDraftShowImgSizeChange(checked: boolean) {
  data.draftShowImgSize = checked
  appendLog('draft', `show-img-size 待应用 => ${checked}`)
}

function onDraftShowImgToolbarChange(checked: boolean) {
  data.draftShowImgToolbar = checked
  appendLog('draft', `show-img-toolbar 待应用 => ${checked}`)
}

function onDraftShowImgResizeChange(checked: boolean) {
  data.draftShowImgResize = checked
  appendLog('draft', `show-img-resize 待应用 => ${checked}`)
}

function rebuildEditor() {
  data.appliedPlaceholder = data.draftPlaceholder
  data.appliedShowImgSize = data.draftShowImgSize
  data.appliedShowImgToolbar = data.draftShowImgToolbar
  data.appliedShowImgResize = data.draftShowImgResize
  data.editorCtx = null
  data.boldActive = false
  data.alignCenterActive = false
  data.statusSummary = '等待 @statuschange'
  data.showEditor = false
  setTimeout(() => {
    data.showEditor = true
  }, 0)
  appendLog('rebuild', '已重建 editor，初始化属性已重新应用')
}

function updateEditorRect() {
  // #ifndef MP
  const editorElement = uni.getElementById('editor-props-demo')
  const editorRect = editorElement?.getBoundingClientRect()
  if (editorRect != null) {
    data.editorX = editorRect.x
    data.editorY = editorRect.y
    data.editorWidth = editorRect.width
    data.editorHeight = editorRect.height
    // #ifdef APP-IOS || APP-HARMONY || APP-ANDROID
    const systemInfo = uni.getSystemInfoSync()
    data.editorY += systemInfo.safeAreaInsets.top + 44
    // #endif
  }
  // #endif
  // #ifdef MP
  wx.createSelectorQuery().select('#editor-props-demo').boundingClientRect(function(editorRect){
    data.editorX = editorRect.top
    data.editorY = editorRect.left
    data.editorWidth = editorRect.width
    data.editorHeight = editorRect.height

    const windowInfo = uni.getWindowInfo()
    data.editorY += windowInfo.safeAreaInsets.top + 44
  }).exec()
  // #endif
}

function onEditorReady() {
  const options: CreateEditorContextAsyncOptions = {
    id: 'editor-props-demo',
    success: (context: EditorContext) => {
      data.editorCtx = context
      data.readyCount += 1
      updateEditorRect()
      appendLog('ready', '编辑器初始化完成')
    },
    fail: (error: UniError) => {
      appendLog('error', `createEditorContextAsync fail: ${error.errMsg}`)
    }
  }
  uni.createEditorContextAsync(options)
}

function onEditorFocus(event: UniEditorFocusEvent) {
  data.focusCount += 1
  appendLog('focus', `text=${summarizeText(event.detail.text)}`)
}

function onEditorBlur(event: UniEditorBlurEvent) {
  data.blurCount += 1
  appendLog('blur', `text=${summarizeText(event.detail.text)}`)
}

function onEditorInput(event: UniEditorInputEvent) {
  data.inputCount += 1
  appendLog('input', `text=${summarizeText(event.detail.text)}`)
}

function onStatusChange(event: UniEditorStatusChangeEvent) {
  data.statusChangeCount += 1
  data.boldActive = event.detail.bold == true
  data.alignCenterActive = event.detail.align == 'center'
  const align = event.detail.align != null ? event.detail.align : 'default'
  const fontSize = event.detail.fontSize != null ? event.detail.fontSize : 'default'
  data.statusSummary = `bold=${event.detail.bold == true}, align=${align}, fontSize=${fontSize}`
  appendLog('statuschange', data.statusSummary)
}

function insertSampleText() {
  data.editorCtx?.insertText({
    text: SAMPLE_TEXT,
    success: () => {
      appendLog('action', '已插入示例文本')
    }
  })
}

const src = 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png'
function insertImage() {
  data.editorCtx?.insertImage({
    src,
    alt: '示例图片',
    success: () => {
      appendLog('action', '已插入示例图片，请点击图片验证 show-img-*')
    },
    fail: () => {
      appendLog('error', '插入示例图片失败')
    }
  })
}
function insertSampleImage() {
  uni.getImageInfo({
    src,
    success(res) {
      console.log('res: ',res);
      data.insertImageWidth = res.width
      data.insertImageHeight = res.height
      appendLog('network', `图片加载成功: ${summarizeText(src)}`)
      insertImage()
    },
    fail() {
      insertImage()
    }
  })
}

const insertMention = () => {
  data.editorCtx?.insertMention({
    id: '000',
    name: 'uni-app x',
    success: (res: any) => {
      console.log('insert mention success')
    }
  })
}

function toggleBold() {
  data.editorCtx?.format('bold', null)
  appendLog('action', `请求切换加粗 => ${!data.boldActive}`)
}

function setAlignCenter() {
  data.editorCtx?.format('align', 'center')
  appendLog('action', '请求设置居中对齐')
}

function removeFormat() {
  data.editorCtx?.removeFormat({
    success: () => {
      appendLog('action', '已清除当前样式')
    },
    fail: () => {
      appendLog('error', '清除样式失败')
    }
  })
}

function clearEditor() {
  data.editorCtx?.clear({
    success: () => {
      appendLog('action', '已清空编辑器内容')
    },
    fail: () => {
      appendLog('error', '清空编辑器失败')
    }
  })
}

function blurEditor() {
  data.editorCtx?.blur({
    success: () => {
      appendLog('action', '已主动触发失焦')
    },
    fail: () => {
      appendLog('error', '主动失焦失败')
    }
  })
}

function hideKeyboardForTest() {
  uni.hideKeyboard()
  appendLog('keyboard', '已请求隐藏键盘')
}

function clearLogs() {
  data.logs.splice(0, data.logs.length)
}

function testSetContentsHtml() {
  data.editorCtx?.setContents({
    html: '<p style="text-align:center;"><strong>Hello,uni-app x</strong></p><p>editor的setContents接口示例</p>',
    success: () => {
      appendLog('action', '成功设置富文本内容')
    },
    fail: (error: any) => {
      appendLog('error', `setContents fail: ${JSON.stringify(error)}`)
    }
  })
}

defineExpose({
  data,
  getTypeLabel,
  onReadOnlyChange,
  onTypeChange,
  onPlaceholderChange,
  onDraftShowImgSizeChange,
  onDraftShowImgToolbarChange,
  onDraftShowImgResizeChange,
  rebuildEditor,
  insertSampleText,
  insertMention,
  insertSampleImage,
  toggleBold,
  setAlignCenter,
  removeFormat,
  clearEditor,
  blurEditor,
  hideKeyboardForTest,
  updateEditorRect,
  testSetContentsHtml
})
</script>

<style>
@import './editor-icon.css';

.page-root {
  flex-direction: column;
  flex: 1;
}

.preview-panel {
  flex-direction: column;
  padding: 10px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(0, 0, 0, 0.06);
}

.preview-header {
  flex-direction: column;
}

.preview-state-row {
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 6px;
}

.preview-toolbar {
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  padding-top: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
  border-radius: 6px;
  background-color: #f5f6f8;
}

.preview-toolbar-item {
  width: 36px;
  height: 36px;
  margin-top: 8px;
  margin-left: 8px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.preview-toolbar-item-active {
  background-color: #e6f0ff;
}

.preview-toolbar-icon {
  color: #333333;
  font-size: 18px;
}

.preview-toolbar-icon-active {
  color: #007aff;
}

.preview-state-text {
  margin-right: 12px;
  color: #666666;
  font-size: 13px;
}

.preview-editor-box {
  margin-top: 10px;
  height: 150px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  background-color: #ffffff;
}

.preview-editor {
  height: 150px;
  min-height: 0px;
  padding: 10px;
}

.props-scroll {
  flex: 1;
}

.button-list {
  flex-direction: column;
  margin-top: 10px;
}

.action-button {
  margin-top: 10px;
}

.apply-button {
  margin-bottom: 10px;
}

.event-header-row {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.log-box {
  flex-direction: column;
  margin-top: 10px;
  padding: 10px;
  border-radius: 6px;
  background-color: #ffffff;
}

.log-text {
  margin-top: 6px;
  color: #333333;
  font-size: 12px;
  line-height: 18px;
}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.form-component.editor)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/editor.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/editor.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=editor&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=editor&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=editor&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=editor&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=editor)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=editor&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

# tips
- 虽然editor组件被分类到form组件，但并不能在form的submit中提交
- 如果要做 im 输入类功能，需要使用 [onKeyboardHeightChange](../api/keyboard.md#onkeyboardheightchange) 监听键盘高度变化，来定位 editor 组件的位置，避免被键盘遮挡
- editor 组件可以使用 `readOnly=false` 属性来让键盘失焦，然后通过 `readOnly=true;setTimeout(() => {editor.format(name, value)}, 0)` 来实现在 editor 组件失焦的情况下调用 format 方法来修改 editor 组件内容输入并自动聚焦。如果失焦后直接调用 format 方法，再手动聚焦设置的内容会被覆盖掉。
- editor 存在 `min-height: 200px` 的默认样式，如果需要修改高度，请注意重写 `min-height` 样式
  - **Bug：** 在 HBuilderX 5.21 之前 min-height 样式不生效，始终会有 200px 的最小高度

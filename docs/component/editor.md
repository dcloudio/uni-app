<!-- ## editor -->

::: sourceCode
## editor
:::

富文本编辑器，可以对图片、文字进行编辑。


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |


App平台推荐使用web-view来加载网页版的富文本编辑器。不限于uni-app的editor组件，使用任意网页版富文本编辑器都可以。

### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| read-only | boolean | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 设置编辑器为只读。 |
| placeholder | string | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 提示信息。 |
| show-img-size | boolean | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 点击图片时显示图片大小控件。 |
| show-img-toolbar | boolean | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 点击图片时显示工具栏控件。 |
| show-img-resize | string | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 点击图片时显示修改尺寸控件。 |
| enable-formats | Array.&lt;string&gt; | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(Array.&lt;string&gt;)*<br/>编辑器允许的名单内的格式 |
| @ready | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 编辑器初始化完成时触发 |
| @focus | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 编辑器聚焦时触发，event.detail = {html, text, delta} |
| @blur | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 编辑器失去焦点时触发，detail = {html, text, delta} |
| @input | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 编辑器内容改变时触发，detail = {html, text, delta} |
| @statuschange | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式 |



<!-- UTSCOMJSON.editor.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/editor/editor.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/editor/editor.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 
```uvue
<template>
  <view class="container">
    <view class="page-body">
      <view class='wrapper'>
        <view class='toolbar' @tap="format">
          <view :class="data.formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
          <view :class="data.formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
          <view :class="data.formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian"
            data-name="underline"></view>
          <view :class="data.formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike">
          </view>

          <view :class="data.formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align"
            data-value="left"></view>

          <view :class="data.formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi"
            data-name="align" data-value="center"></view>
          <view :class="data.formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align"
            data-value="right"></view>
          <view :class="data.formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi"
            data-name="align" data-value="justify"></view>

          <view :class="data.formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight"
            data-value="2"></view>
          <view :class="data.formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing"
            data-name="letterSpacing" data-value="2em"></view>
          <view :class="data.formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju"
            data-name="marginTop" data-value="20px"></view>
          <view :class="data.formats.marginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju"
            data-name="marginBottom" data-value="20px"></view>

          <view :class="data.formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily"
            data-value="Pacifico"></view>
          <view :class="data.formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize"
            data-name="fontSize" data-value="24px"></view>
          <view :class="data.formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color"
            data-name="color" data-value="#0000ff"></view>
          <view :class="data.formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor"
            data-name="backgroundColor" data-value="#00ff00"></view>

          <view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
          <view :class="data.formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie"
            data-name="list" data-value="ordered"></view>
          <view :class="data.formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
            data-value="bullet"></view>


          <view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
          <view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>


          <view :class="data.formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1"
            data-name="header" :data-value="1"></view>
          <view :class="data.formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao"
            data-name="script" data-value="sub"></view>
          <view :class="data.formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao"
            data-name="script" data-value="super"></view>

          <view :class="data.formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl"
            data-name="direction" data-value="rtl"></view>

          <view class="iconfont icon-date" @tap="insertDate"></view>
          <view class="iconfont icon-fengexian" @tap="insertDivider"></view>
          <view class="iconfont icon-charutupian" @tap="chooseInsertImage"></view>
          <view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
          <view class="iconfont icon-undo" @tap="undo"></view>
          <view class="iconfont icon-redo" @tap="redo"></view>
          <view class="iconfont icon-shanchu" @tap="clearShowModal"></view>
        </view>

        <view class="editor-wrapper">
          <editor id="editor" class="ql-container" placeholder="开始输入..." show-img-size show-img-toolbar show-img-resize
            @statuschange="onStatusChange" :read-only="data.readOnly" @ready="onEditorReady">
          </editor>
        </view>
        <view>
          <button @tap="getCon">控制台打印文本内容</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="uts">
  type Formats = {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strike?: boolean
    align?: string
    lineHeight?: boolean
    letterSpacing?: boolean
    marginTop?: boolean
    marginBottom?: boolean
    fontFamily?: boolean
    fontSize?: string
    color?: string
    backgroundColor?: string
    list?: string
    header?: number
    script?: string
    direction?: string
  }

  type DataType = {
    readOnly: boolean;
    formats: Formats;
    // TODO 补充editorContext类型
    editorCtx: any;
    // 自动化测试
    autoTest: boolean;
    undoTest: boolean;
    redoTest: boolean;
    removeFormatTest: boolean;
    insertImageTest: boolean;
    blurTest: boolean;
  }
  // 使用reactive避免ref数据在自动化测试中无法访问
  const data = reactive({
    readOnly: false,
    formats: {
      bold: false,
      italic: false,
      underline: false,
      strike: false,
      align: '',
      lineHeight: false,
      letterSpacing: false,
      marginTop: false,
      marginBottom: false,
      fontFamily: false,
      fontSize: '',
      color: '',
      backgroundColor: '',
      list: '',
      header: 0,
      script: '',
      direction: ''
    },
    // TODO 补充editorContext类型
    editorCtx: {},
    // 自动化测试
    autoTest: false,
    undoTest: false,
    redoTest: false,
    removeFormatTest: false,
    insertImageTest: false,
    blurTest: false
  } as DataType)

  onReady(() => {
    uni.loadFontFace({
      family: 'Pacifico',
      source: 'url("/static/font/Pacifico-Regular.ttf")',
      success() {
        console.log('success load font')
      },
      fail() {
        console.log('fail load font load')
      }
    })
  })

  const readOnlyChange = () => {
    data.readOnly = !data.readOnly
  }

  const onEditorReady = () => {
    uni.createSelectorQuery().select('#editor').context((res) => {
      data.editorCtx = res.context
    }).exec()
  }

  // 自动化测试专用
  const setContents = (options: any) => {
    data.editorCtx.setContents({
      delta: {
        ops: options
      },
      success: (res: any) => {
        console.log('setContents-success', res)
      },
      fail: (err: any) => {
        console.log(err)
      }
    })
  }

  const blur = () => {
    data.editorCtx.blur({
      success: (res: any) => {
        console.log('编辑器失焦：', res)
        data.blurTest = true
      },
      fail: (err: any) => {
        console.log(err)
      }
    })
  }

  const getCon = () => {
    data.editorCtx.getContents({
      success: (res: any) => {
        console.log('文本详情：', res)
      },
      fail: (err: any) => {
        console.log(err)
      }
    })
  }

  const undo = () => {
    data.editorCtx.undo({
      success: (res: any) => {
        data.undoTest = true
      },
      fail: (err: any) => {
        data.undoTest = false
      }
    })
  }

  const redo = () => {
    data.editorCtx.redo({
      success: (res: any) => {
        data.redoTest = true
      },
      fail: (err: any) => {
        data.redoTest = false
      }
    })
  }

  const format = (e: any) => {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    data.editorCtx.format(name, value)
  }

  const onStatusChange = (e: any) => {
    const formats = e.detail
    data.formats = formats
  }

  const insertDivider = () => {
    data.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  }

  const clear = () => {
    data.editorCtx.clear({
      success: function (res: any) {
        console.log("clear success",res)
      }
    })
  }

  const clearShowModal = () => {
    uni.showModal({
      title: '清空编辑器',
      content: '确定清空编辑器全部内容？',
      success: (res: any) => {
        if (res.confirm) {
          clear()
        }
      }
    })
  }

  const removeFormat = () => {
    data.editorCtx.removeFormat({
      success: (res: any) => {
        console.log('removeFormat-success', res)
        data.removeFormatTest = true
      },
      fail: (err: any) => {
        data.removeFormatTest = false
      }
    })
  }

  const insertDate = () => {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    data.editorCtx.insertText({
      text: formatDate
    })
  }

  const insertImage = (image: string) => {
    data.editorCtx.insertImage({
      src: image,
      alt: '图像',
      success: () => {
        console.log('insert image success')
        data.insertImageTest = true
      }
    })
  }

  const chooseInsertImage = () => {
    uni.chooseImage({
      count: 1,
      success: (res: any) => {
        insertImage(res.tempFilePaths[0])
      }
    })
  }

  defineExpose({
    data,
    setContents,
    blur,
    clear,
    insertDivider,
    undo,
    redo,
    insertImage,
    removeFormat
  })
</script>

<style>
  @import "./editor-icon.css";

  .page-body {
    height: calc(100vh - var(--window-top) - var(--status-bar-height));
  }

  .wrapper {
    height: 100%;
  }

  .editor-wrapper {
    height: calc(100vh - var(--window-top) - var(--status-bar-height) - 140px - 46px);
    background: #fff;
  }

  .iconfont {
    display: inline-block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 20px;
    margin: 0px 6px;
    align-content: center;
  }

  .toolbar {
    box-sizing: border-box;
    border-bottom: 0;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    flex-direction: row;
    flex-wrap: wrap;
    height: 140px;
    padding-left: 10px;
  }

  .ql-container {
    box-sizing: border-box;
    padding: 12px 15px;
    width: 100%;
    min-height: 30vh;
    height: 100%;
    font-size: 16px;
    line-height: 1.5;
  }

  .ql-active {
    color: #06c;
  }
</style>

```


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

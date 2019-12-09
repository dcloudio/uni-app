<template>
  <uni-web-view v-on="$listeners"/>
</template>
<script>
import {
  WEBVIEW_INSERTED,
  WEBVIEW_REMOVED
} from '../../../constants'
let webview = false
const insertHTMLWebView = ({
  htmlId
}) => {
  const parentWebview = plus.webview.currentWebview()
  // fixed by hxy web-view 组件所在的 webview 不注入 uni-app 框架
  const styles = {
    'uni-app': 'none'
  }
  const parentTitleNView = parentWebview.getTitleNView()
  if (parentTitleNView) {
    styles.top = 44 + plus.navigator.getStatusbarHeight()
    styles.bottom = 0
  }
  webview = plus.webview.create('', htmlId, styles)
  if (parentTitleNView) {
    webview.addEventListener('titleUpdate', function () {
      let title = webview.getTitle()
      parentWebview.setStyle({
        titleNView: {
          titleText: (!title || title === 'null') ? '' : title
        }
      })
    })
  }
  plus.webview.currentWebview().append(webview)
}

const updateHTMLWebView = ({
  htmlId,
  src,
  webviewStyles
}) => {
  // fixed by xxx 非空时才执行更新操作
  const realPath = src || ''
  if (!realPath) {
    return
  }
  if (/^(http|https):\/\//.test(realPath) && webviewStyles.progress) {
    webview.setStyle({
      progress: {
        color: webviewStyles.progress.color
      }
    })
  }
  webview.loadURL(realPath)
}

const removeHTMLWebView = () => {
  plus.webview.currentWebview().remove(webview)
  webview.close('none')
  webview = false
}

export default {
  name: 'WebView',
  props: {
    src: {
      type: String,
      default: ''
    },
    webviewStyles: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    src (val, oldVal) {
      webview && updateHTMLWebView({
        src: this.$getRealPath(val),
        webviewStyles: this.webviewStyles
      })
    }
  },
  mounted () {
    this.htmlId = 'webviewId' + this.$page.id
    insertHTMLWebView({
      htmlId: this.htmlId
    })
    updateHTMLWebView({
      src: this.$getRealPath(this.src),
      webviewStyles: this.webviewStyles
    })
    UniViewJSBridge.publishHandler(WEBVIEW_INSERTED, {}, this.$page.id)
  },
  beforeDestroy () {
    removeHTMLWebView()
    UniViewJSBridge.publishHandler(WEBVIEW_REMOVED, {}, this.$page.id)
  }
}
</script>
<style>
  uni-web-view {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>

import {
  listeners
} from 'uni-mixins'

export default {
  name: 'Native',
  mixins: [listeners],
  data () {
    return {
      style: {
        top: '0px',
        left: '0px',
        width: '0px',
        height: '0px',
        position: 'static'
      },
      hidden: false,
      tags: []
    }
  },
  mounted () {
    this._updateStyle()
    this.$nextTick(() => {
      if (this.tags.length) {
        const view = this.view = plus.nativeObj.View('view' + Date.now(), this.style, this.tags)
        plus.webview.currentWebview().append(view)
        if (this.hidden) {
          view.hide()
        }
      }
    })
  },
  beforeDestroy () {
    this.view && this.view.close()
    delete this.view
  },
  listeners: {
    '@view-update': '_requestUpdate'
  },
  methods: {
    insertTextView () {

    },
    updateTextView () {

    },
    removeTextView () {

    },
    insertImageView () {

    },
    updateImageView () {

    },
    removeImageView () {

    },
    _updateStyle () {
      const rect = this.$refs.container.getBoundingClientRect()
      this.hidden = false;
      ['top', 'left', 'width', 'height'].forEach(key => {
        let val = rect[key]
        val = key === 'top' ? val + (document.documentElement.scrollTop || document.body.scrollTop || 0) : val
        if (!val && (key === 'width' || key === 'height')) {
          this.hidden = true
        }
        this.style[key] = val + 'px'
      })
    },
    _requestUpdate () {
      if (this._animationFrame) {
        cancelAnimationFrame(this._animationFrame)
      }
      if (this._isMounted) {
        this._animationFrame = requestAnimationFrame(() => {
          delete this._animationFrame
          this._updateStyle()
        })
      }
    }
  }
}

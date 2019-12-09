<template>
  <uni-editor
    :id="id"
    class="ql-container" />
</template>

<script>
import {
  subscriber,
  emitter,
  keyboard
} from 'uni-mixins'
import HTMLParser from 'uni-helpers/html-parser'
import * as formats from './formats'

export default {
  name: 'Editor',
  mixins: [subscriber, emitter, keyboard],
  props: {
    id: {
      type: String,
      default: ''
    },
    readOnly: {
      type: [Boolean, String],
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    showImgSize: {
      type: [Boolean, String],
      default: false
    },
    showImgToolbar: {
      type: [Boolean, String],
      default: false
    },
    showImgResize: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      quillReady: false
    }
  },
  computed: {
  },
  watch: {
    readOnly (value) {
      if (this.quillReady) {
        const quill = this.quill
        quill.enable(!value)
        if (!value) {
          quill.blur()
        }
      }
    },
    placeholder (value) {
      if (this.quillReady) {
        this.quill.root.setAttribute('data-placeholder', value)
      }
    }
  },
  mounted () {
    const imageResizeModules = []
    if (this.showImgSize) {
      imageResizeModules.push('DisplaySize')
    }
    if (this.showImgToolbar) {
      imageResizeModules.push('Toolbar')
    }
    if (this.showImgResize) {
      imageResizeModules.push('Resize')
    }
    this.loadQuill(() => {
      if (imageResizeModules.length) {
        this.loadImageResizeModule(() => {
          this.initQuill(imageResizeModules)
        })
      } else {
        this.initQuill(imageResizeModules)
      }
    })
  },
  methods: {
    _handleSubscribe ({
      type,
      data
    }) {
      const { options, callbackId } = data
      const quill = this.quill
      const Quill = window.Quill
      let res
      let range
      let errMsg
      if (this.quillReady) {
        switch (type) {
          case 'format':
            let { name = '', value = false } = options
            range = quill.getSelection(true)
            let format = quill.getFormat(range)[name] || false
            if (['bold', 'italic', 'underline', 'strike', 'ins'].includes(name)) {
              value = !format
            } else if (name === 'direction') {
              value = value === 'rtl' && format ? false : value
              const align = quill.getFormat(range).align
              if (value === 'rtl' && !align) {
                quill.format('align', 'right', Quill.sources.USER)
              } else if (!value && align === 'right') {
                quill.format('align', false, Quill.sources.USER)
              }
            } else if (name === 'indent') {
              const rtl = quill.getFormat(range).direction === 'rtl'
              value = value === '+1'
              if (rtl) {
                value = !value
              }
              value = value ? '+1' : '-1'
            } else {
              if (name === 'list') {
                value = value === 'check' ? 'unchecked' : value
                format = format === 'checked' ? 'unchecked' : format
              }
              value = ((format && format !== (value || false)) || (!format && value)) ? value : !format
            }
            quill.format(name, value, Quill.sources.USER)
            break
          case 'insertDivider':
            range = quill.getSelection(true)
            quill.insertText(range.index, '\n', Quill.sources.USER)
            quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER)
            quill.setSelection(range.index + 2, Quill.sources.SILENT)
            break
          case 'insertImage':
            range = quill.getSelection(true)
            const { src = '', alt = '', data = {} } = options
            quill.insertEmbed(range.index, 'image', this.$getRealPath(src), Quill.sources.USER)
            quill.formatText(range.index, 1, 'alt', alt)
            quill.formatText(range.index, 1, 'data-custom', Object.keys(data).map(key => `${key}=${data[key]}`).join('&'))
            quill.setSelection(range.index + 1, Quill.sources.SILENT)
            break
          case 'insertText':
            range = quill.getSelection(true)
            const { text = '' } = options
            quill.insertText(range.index, text, Quill.sources.USER)
            quill.setSelection(range.index + text.length, 0, Quill.sources.SILENT)
            break
          case 'setContents':
            const { delta, html } = options
            if (typeof delta === 'object') {
              quill.setContents(delta, Quill.sources.SILENT)
            } else if (typeof html === 'string') {
              quill.setContents(this.html2delta(html), Quill.sources.SILENT)
            } else {
              errMsg = 'contents is missing'
            }
            break
          case 'getContents':
            res = this.getContents()
            break
          case 'clear':
            quill.setContents([])
            break
          case 'removeFormat':
            range = quill.getSelection(true)
            var parchment = Quill.import('parchment')
            if (range.length) {
              quill.removeFormat(range, Quill.sources.USER)
            } else {
              Object.keys(quill.getFormat(range)).forEach(key => {
                if (parchment.query(key, parchment.Scope.INLINE)) {
                  quill.format(key, false)
                }
              })
            }
            break
          case 'undo':
            quill.history.undo()
            break
          case 'redo':
            quill.history.redo()
            break
          default:
            break
        }
      } else {
        errMsg = 'not ready'
      }
      if (callbackId) {
        UniViewJSBridge.publishHandler('onEditorMethodCallback', {
          callbackId,
          data: Object.assign({}, res, {
            errMsg: `${type}:${errMsg ? 'fail ' + errMsg : 'ok'}`
          })
        }, this.$page.id)
      }
    },
    loadQuill (callback) {
      if (typeof window.Quill === 'function') {
        if (typeof callback === 'function') {
          callback()
        }
        return
      }
      let script = document.createElement('script')
      script.src = window.plus ? './__uniappquill.js' : 'https://unpkg.com/quill@1.3.7/dist/quill.min.js'
      document.body.appendChild(script)
      script.onload = callback
    },
    loadImageResizeModule (callback) {
      if (typeof window.ImageResize === 'function') {
        if (typeof callback === 'function') {
          callback()
        }
        return
      }
      let script = document.createElement('script')
      script.src = window.plus ? './__uniappquillimageresize.js' : 'https://unpkg.com/quill-image-resize-mp@3.0.1/image-resize.min.js'
      document.body.appendChild(script)
      script.onload = callback
    },
    initQuill (imageResizeModules) {
      const Quill = window.Quill
      Quill.register('modules/ImageResize', window.ImageResize.default)
      formats.register(Quill)

      const quill = this.quill = new Quill(this.$el, {
        toolbar: false,
        readOnly: this.readOnly,
        placeholder: this.placeholder,
        modules: {
          ImageResize: {
            modules: imageResizeModules
          }
        }
      })
      const $el = quill.root
      const events = ['focus', 'blur']
      events.forEach(name => {
        $el.addEventListener(name, ($event) => {
          this.$trigger(name, $event, this.getContents())
        })
      })
      quill.on(Quill.events.TEXT_CHANGE, () => {
        this.$trigger('input', {}, this.getContents())
      })
      quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        if (this.skipMatcher) {
          return delta
        }
        return {
          ops: delta.ops.filter(({ insert }) => typeof insert === 'string').map(({ insert }) => ({ insert }))
        }
      })
      this.initKeyboard($el)
      this.quillReady = true
      this.$trigger('ready', event, {})
    },
    getContents () {
      const quill = this.quill
      const html = quill.root.innerHTML
      const text = quill.getText()
      const delta = quill.getContents()
      return {
        html,
        text,
        delta
      }
    },
    html2delta (html) {
      const tags = ['span', 'strong', 'b', 'ins', 'em', 'i', 'u', 'a', 'del', 's', 'sub', 'sup', 'img', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'ol', 'ul', 'li']
      let content = ''
      let disable
      HTMLParser(html, {
        start: function (tag, attrs, unary) {
          if (!tags.includes(tag)) {
            disable = !unary
            return
          }
          disable = false
          const arrts = attrs.map(({ name, value }) => `${name}="${value}"`).join(' ')
          const start = `<${tag} ${arrts} ${unary ? '/' : ''}>`
          content += start
        },
        end: function (tag) {
          if (!disable) {
            content += `</${tag}>`
          }
        },
        chars: function (text) {
          if (!disable) {
            content += text
          }
        }
      })
      this.skipMatcher = true
      const delta = this.quill.clipboard.convert(content)
      this.skipMatcher = false
      return delta
    }
  }
}
</script>

<style src="./editor.css"></style>
<style>
</style>

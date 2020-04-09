<script>
const SPACE_UNICODE = {
  'ensp': '\u2002',
  'emsp': '\u2003',
  'nbsp': '\u00a0'
}

export default {
  name: 'Text',
  props: {
    selectable: {
      type: [Boolean, String],
      default: false
    },
    space: {
      type: String,
      default: ''
    },
    decode: {
      type: [Boolean, String],
      default: false
    }
  },
  methods: {
    _decodeHtml (htmlString) {
      if (this.space && SPACE_UNICODE[this.space]) {
        htmlString = htmlString.replace(/ /g, SPACE_UNICODE[this.space])
      }

      if (this.decode) {
        htmlString = htmlString.replace(/&nbsp;/g, SPACE_UNICODE.nbsp).replace(/&ensp;/g, SPACE_UNICODE.ensp).replace(
          /&emsp;/g, SPACE_UNICODE.emsp).replace(/&lt;/g,
          '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
      }

      return htmlString
    }
  },
  render (createElement) {
    const nodeList = []
    this.$slots.default && this.$slots.default.forEach(vnode => {
      if (vnode.text) {
        // 处理可能出现的多余的转义字符
        const nodeText = vnode.text.replace(/\\n/g, '\n')
        const texts = this._decodeHtml(nodeText).trim().split('\n')
        texts.forEach((text, index) => {
          nodeList.push(text)
          if (index !== (texts.length - 1)) {
            nodeList.push(createElement('br'))
          }
        })
      } else {
        if (vnode.componentOptions && vnode.componentOptions.tag !== 'v-uni-text') {
          console.warn('<text> 组件内只支持嵌套 <text>，不支持其它组件或自定义组件，否则会引发在不同平台的渲染差异。')
        }
        nodeList.push(vnode)
      }
    })
    return createElement('uni-text', {
      on: this.$listeners,
      attrs: {
        selectable: !!this.selectable
      }
    }, [
      createElement('span', {}, nodeList)
    ])
  }
}
</script>
<style>
	uni-text[selectable] {
    cursor: auto;
		user-select: text;
		-webkit-user-select: text;
	}
</style>

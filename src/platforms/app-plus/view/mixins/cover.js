const base = ['borderRadius', 'borderColor', 'borderWidth', 'backgroundColor']
const text = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'color', 'textAlign', 'lineHeight', 'fontSize', 'fontWeight', 'textOverflow', 'whiteSpace']
const image = []
const textAlign = { start: 'left', end: 'right' }
let index = 0

export default {
  name: 'Cover',
  data () {
    return {
      style: {},
      parentPosition: {}
    }
  },
  computed: {
    viewPosition () {
      const position = {}
      for (const key in this.position) {
        let val = this.position[key]
        const valNumber = parseFloat(val)
        const parentValNumber = parseFloat(this.parentPosition[key])
        if (key === 'top' || key === 'left') {
          val = Math.max(valNumber, parentValNumber) + 'px'
        } else if (key === 'width' || key === 'height') {
          const base = key === 'width' ? 'left' : 'top'
          const parentStart = parseFloat(this.parentPosition[base])
          const viewStart = parseFloat(this.position[base])
          const diff1 = Math.max(parentStart - viewStart, 0)
          const diff2 = Math.max((viewStart + valNumber) - (parentStart + parentValNumber), 0)
          val = Math.max(valNumber - diff1 - diff2, 0) + 'px'
        }
        position[key] = val
      }
      return position
    },
    tags () {
      const position = this._getTagPosition()
      const style = this.style
      const tags = [{
        tag: 'rect',
        position,
        rectStyles: {
          color: style.backgroundColor,
          radius: style.borderRadius,
          borderColor: style.borderColor,
          borderWidth: style.borderWidth
        }
      }]
      if (this.coverType === 'image') {
        tags.push({
          tag: 'img',
          position,
          src: this.coverContent
        })
      } else {
        const lineSpacing = parseFloat(style.lineHeight) - parseFloat(style.fontSize)
        let width = parseFloat(position.width) - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
        width = width < 0 ? 0 : width
        let height = parseFloat(position.height) - parseFloat(style.paddingTop) - lineSpacing / 2 - parseFloat(style.paddingBottom)
        height = height < 0 ? 0 : height
        tags.push({
          tag: 'font',
          position: {
            top: `${parseFloat(position.top) + parseFloat(style.paddingTop) + lineSpacing / 2}px`,
            left: `${parseFloat(position.left) + parseFloat(style.paddingLeft)}px`,
            width: `${width}px`,
            height: `${height}px`
          },
          textStyles: {
            align: textAlign[style.textAlign] || style.textAlign,
            color: style.color,
            decoration: 'none',
            lineSpacing: `${lineSpacing}px`,
            margin: '0px',
            overflow: style.textOverflow,
            size: style.fontSize,
            verticalAlign: 'top',
            weight: style.fontWeight,
            whiteSpace: style.whiteSpace
          },
          text: this.coverContent
        })
      }
      return tags
    }
  },
  created () {
    let $parent = this.$parent
    while (!$parent.isNative && $parent !== this.$root) {
      $parent = $parent.$parent
    }
    this._nativeParent = $parent
  },
  mounted () {
    this._onParentReady((parentPosition) => {
      this.parentPosition = this._nativeParent.position || parentPosition
      this._updateStyle()
      this._onCanInsert()
      this.$watch('hidden', (val) => {
        this.cover && this.cover[val ? 'hide' : 'show']()
      })
      this.$watch('viewPosition', (val) => {
        this.cover && this.cover.setStyle(val)
      }, { deep: true })
      this.$watch('tags', () => {
        const cover = this.cover
        if (cover) {
          cover.reset()
          cover.draw(this.tags)
        }
      }, { deep: true })
      this.$on('uni-view-update', this._requestStyleUpdate)
    })
  },
  beforeDestroy () {
    if (this._nativeParent.isNative) {
      this.cover && this.cover.close()
      delete this.cover
    }
  },
  methods: {
    _onCanInsert () {
      const cover = this.cover = new plus.nativeObj.View(`cover-${Date.now()}-${index++}`, this.viewPosition, this.tags)
      plus.webview.currentWebview().append(cover)
      if (this.hidden) {
        cover.hide()
      }
      cover.addEventListener('click', () => {
        this.$trigger('click', {}, {})
      })
    },
    _getTagPosition () {
      const position = {}
      for (const key in this.position) {
        let val = this.position[key]
        if (key === 'top' || key === 'left') {
          val = Math.min((parseFloat(val) - parseFloat(this.parentPosition[key])), 0) + 'px'
        }
        position[key] = val
      }
      return position
    },
    _updateStyle () {
      const style = getComputedStyle(this.$el)
      base.concat(text, image).forEach(key => {
        this.$set(this.style, key, style[key])
      })
    },
    _requestStyleUpdate () {
      if (this._styleUpdateRequest) {
        cancelAnimationFrame(this._styleUpdateRequest)
      }
      this._styleUpdateRequest = requestAnimationFrame(() => {
        delete this._styleUpdateRequest
        this._updateStyle()
      })
    }
  }
}

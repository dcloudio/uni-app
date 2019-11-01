const base = ['padding', 'borderRadius', 'borderColor', 'borderWidth', 'backgroundColor']
const text = ['color', 'textAlign', 'lineHeight', 'fontSize', 'fontWeight', 'textOverflow']
const image = []
let index = 0

export default {
  name: 'Cover',
  data () {
    return {
      style: {}
    }
  },
  computed: {
    viewPosition () {
      const position = {}
      for (const key in this.position) {
        let val = this.position[key]
        let valNumber = parseFloat(val)
        let parentValNumber = parseFloat(this.$parent.position[key])
        if (key === 'top' || key === 'left') {
          val = Math.max(valNumber, parentValNumber) + 'px'
        } else if (key === 'width' || key === 'height') {
          const base = key === 'width' ? 'left' : 'left'
          const parentStart = parseFloat(this.$parent.position[base])
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
      return [
        {
          tag: 'rect',
          position,
          rectStyles: {
            color: style.backgroundColor,
            radius: style.borderRadius,
            borderColor: style.borderColor,
            borderWidth: style.borderWidth
          }
        },
        this.coverType === 'image' ? {
          tag: 'img',
          position,
          src: this.coverContent
        } : {
          tag: 'font',
          position,
          textStyles: {
            align: style.textAlign,
            color: style.color,
            decoration: 'none',
            lineSpacing: (parseFloat(style.lineHeight) - parseFloat(style.fontSize)) + 'px',
            margin: style.padding,
            overflow: style.textOverflow,
            size: style.fontSize,
            weight: style.fontWeight,
            whiteSpace: style.whiteSpace
          },
          text: this.coverContent
        }
      ]
    }
  },
  mounted () {
    this._updateStyle()
    const $parent = this.$parent
    if ($parent.isNative) {
      if ($parent._isMounted) {
        this._onCanInsert()
      } else {
        $parent.onCanInsertCallbacks.push(() => {
          this._onCanInsert()
        })
      }
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
    }
  },
  beforeDestroy () {
    if (this.$parent.isNative) {
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
          val = Math.min((parseFloat(val) - parseFloat(this.$parent.position[key])), 0) + 'px'
        }
        position[key] = val
      }
      return position
    },
    _updateStyle () {
      const style = getComputedStyle(this.$el)
      base.concat(text, image).forEach(key => {
        this.style[key] = style[key]
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

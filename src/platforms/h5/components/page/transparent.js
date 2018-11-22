import {
  hexToRgba
} from 'uni-shared'

export default {
  mounted () {
    if (this.type === 'transparent') {
      const transparentElemStyle = this.$el.querySelector('.uni-page-head-transparent').style
      const titleElemStyle = this.$el.querySelector('.uni-page-head__title').style
      const iconElems = this.$el.querySelectorAll('.uni-btn-icon')
      const iconElemsStyles = []
      for (let i = 0; i < iconElems.length; i++) {
        iconElemsStyles.push(iconElems[i].style)
      }
      const borderRadiusElems = this.$el.querySelectorAll('.uni-page-head-hd>div,.uni-page-head-ft>div')
      const borderRadiusElemsStyles = []
      for (let i = 0; i < borderRadiusElems.length; i++) {
        borderRadiusElemsStyles.push(borderRadiusElems[i].style)
      }
      this._A = 0
      UniViewJSBridge.on('onPageScroll', ({
        scrollTop
      }) => {
        const alpha = Math.min(scrollTop / this.offset, 1)
        if (alpha === 1 && this._A === 1) {
          return
        }
        if (alpha > 0.5 && this._A <= 0.5) {
          iconElemsStyles.forEach(function (iconElemStyle) {
            iconElemStyle.color = '#000'
          })
        } else if (alpha <= 0.5 && this._A > 0.5) {
          iconElemsStyles.forEach(function (iconElemStyle) {
            iconElemStyle.color = '#fff'
          })
        }
        this._A = alpha
        // TODO 暂时仅处理背景色
        titleElemStyle.opacity = alpha
        transparentElemStyle.backgroundColor = `rgba(${this._R},${this._G},${this._B},${alpha})`
        borderRadiusElemsStyles.forEach(function (borderRadiusElemStyle) {
          borderRadiusElemStyle.backgroundColor = `rgba(153,153,153,${1 - alpha})`
        })
      })
    }
  },
  computed: {
    color () {
      return this.type === 'transparent' ? '#fff' : this.textColor
    },
    offset () {
      return parseInt(this.coverage)
    },
    bgColor () {
      if (this.type === 'transparent') {
        const {
          r,
          g,
          b
        } = hexToRgba(this.backgroundColor)
        this._R = r
        this._G = g
        this._B = b
        return `rgba(${r},${g},${b},0)`
      }
      return this.backgroundColor
    }
  }
}

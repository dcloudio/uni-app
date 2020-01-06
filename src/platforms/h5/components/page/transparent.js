import {
  hexToRgba
} from 'uni-shared'

export default {
  mounted () {
    if (this.type === 'transparent') {
      const transparentElemStyle = this.$el.querySelector('.uni-page-head-transparent').style
      const titleElem = this.$el.querySelector('.uni-page-head__title')
      const iconElems = this.$el.querySelectorAll('.uni-btn-icon')
      const iconElemsStyles = []
      const textColor = this.textColor
      for (let i = 0; i < iconElems.length; i++) {
        iconElemsStyles.push(iconElems[i].style)
      }
      const borderRadiusElems = this.$el.querySelectorAll('.uni-page-head-btn')
      const oldColors = []
      const borderRadiusElemsStyles = []
      for (let i = 0; i < borderRadiusElems.length; i++) {
        let borderRadiusElem = borderRadiusElems[i]
        oldColors.push(getComputedStyle(borderRadiusElem).backgroundColor)
        borderRadiusElemsStyles.push(borderRadiusElem.style)
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
            iconElemStyle.color = textColor
          })
        } else if (alpha <= 0.5 && this._A > 0.5) {
          iconElemsStyles.forEach(function (iconElemStyle) {
            iconElemStyle.color = '#fff'
          })
        }
        this._A = alpha
        // TODO 暂时仅处理背景色
        if (titleElem) {
          titleElem.style.opacity = alpha
        }
        transparentElemStyle.backgroundColor = `rgba(${this._R},${this._G},${this._B},${alpha})`
        borderRadiusElemsStyles.forEach(function (borderRadiusElemStyle, index) {
          let oldColor = oldColors[index]
          // eslint-disable-next-line
          let rgba = oldColor.match(/[\d+\.]+/g)
          rgba[3] = (1 - alpha) * (rgba.length === 4 ? rgba[3] : 1)
          borderRadiusElemStyle.backgroundColor = `rgba(${rgba})`
        })
      })
    } else if (this.type === 'float') {
      const iconElems = this.$el.querySelectorAll('.uni-btn-icon')
      const iconElemsStyles = []
      for (let i = 0; i < iconElems.length; i++) {
        iconElemsStyles.push(iconElems[i].style)
      }
      const borderRadiusElems = this.$el.querySelectorAll('.uni-page-head-btn')
      const oldColors = []
      const borderRadiusElemsStyles = []
      for (let i = 0; i < borderRadiusElems.length; i++) {
        let borderRadiusElem = borderRadiusElems[i]
        oldColors.push(getComputedStyle(borderRadiusElem).backgroundColor)
        borderRadiusElemsStyles.push(borderRadiusElem.style)
      }
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

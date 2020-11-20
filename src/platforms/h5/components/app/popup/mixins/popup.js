export default {
  data () {
    return {
      popupWidth: 0,
      popupHeight: 0
    }
  },
  computed: {
    isDesktop () {
      return this.popupWidth >= 500 && this.popupHeight >= 500
    },
    popupStyle () {
      const style = {}
      const contentStyle = style.content = {}
      const triangleStyle = style.triangle = {}
      const popover = this.popover
      function getNumber (value) {
        return Number(value) || 0
      }
      if (this.isDesktop && popover) {
        Object.assign(triangleStyle, {
          position: 'absolute',
          width: '0',
          height: '0',
          'margin-left': '-6px',
          'border-style': 'solid'
        })
        const popoverLeft = getNumber(popover.left)
        const popoverWidth = getNumber(popover.width)
        const popoverTop = getNumber(popover.top)
        const popoverHeight = getNumber(popover.height)
        const center = popoverLeft + popoverWidth / 2
        contentStyle.transform = 'none !important'
        const contentLeft = Math.max(0, center - 300 / 2)
        contentStyle.left = `${contentLeft}px`
        let triangleLeft = Math.max(12, center - contentLeft)
        triangleLeft = Math.min(300 - 12, triangleLeft)
        triangleStyle.left = `${triangleLeft}px`
        const vcl = this.popupHeight / 2
        if (popoverTop + popoverHeight - vcl > vcl - popoverTop) {
          contentStyle.top = 'auto'
          contentStyle.bottom = `${this.popupHeight - popoverTop + 6}px`
          triangleStyle.bottom = '-6px'
          triangleStyle['border-width'] = '6px 6px 0 6px'
          triangleStyle['border-color'] = '#fcfcfd transparent transparent transparent'
        } else {
          contentStyle.top = `${popoverTop + popoverHeight + 6}px`
          triangleStyle.top = '-6px'
          triangleStyle['border-width'] = '0 6px 6px 6px'
          triangleStyle['border-color'] = 'transparent transparent #fcfcfd transparent'
        }
      }
      return style
    }
  },
  mounted () {
    const fixSize = () => {
      const {
        windowWidth,
        windowHeight,
        windowTop
      } = uni.getSystemInfoSync()
      this.popupWidth = windowWidth
      this.popupHeight = windowHeight + windowTop
    }
    window.addEventListener('resize', fixSize)
    fixSize()
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', fixSize)
    })
  }
}

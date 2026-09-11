import { extend } from '@vue/shared'
import { computed, onMounted, onUnmounted, ref } from 'vue'

type Popover = {
  left: number
  width: number
  top: number
  height: number
}

const POPUP_EDGE = 6

export type popupStyleType = {
  content: {
    transform: string
    left: string
    top: string
    bottom: string
    width?: string
  }
  triangle: {
    'border-width': string
    'border-color': string
    left: string
    top: string
    bottom: string
  }
}

export function usePopupStyle(props: Data, triangleColor = '#fcfcfd') {
  const popupWidth = ref(0)
  const popupHeight = ref(0)

  const isDesktop = computed(
    () => popupWidth.value >= 500 && popupHeight.value >= 500
  )
  const popupStyle = computed(() => {
    const style: popupStyleType = {
      content: {
        transform: '',
        left: '',
        top: '',
        bottom: '',
      },
      triangle: {
        left: '',
        top: '',
        bottom: '',
        'border-width': '',
        'border-color': '',
      },
    }
    const contentStyle = style.content
    const triangleStyle = style.triangle
    const popover: Popover = props.popover as Popover
    function getNumber(value: number | string) {
      try {
        const number = Number(value)
        return Number.isFinite(number) ? number : 0
      } catch {
        return 0
      }
    }
    if (isDesktop.value && popover) {
      const popoverLeft = Math.max(0, getNumber(popover.left))
      const width = getNumber(popover.width)
      const popoverWidth = width > 0 ? width : 300
      const popoverTop = Math.max(0, getNumber(popover.top))
      const popoverHeight = Math.max(0, getNumber(popover.height))
      const center = popoverLeft + popoverWidth / 2
      const contentLeft = Math.max(
        POPUP_EDGE,
        Math.min(
          popupWidth.value - popoverWidth - POPUP_EDGE,
          center - popoverWidth / 2
        )
      )
      extend(triangleStyle, {
        position: 'absolute',
        width: '0',
        height: '0',
        'margin-left': '-6px',
        'border-style': 'solid',
      })
      contentStyle.transform = 'none !important'
      contentStyle.left = `${contentLeft}px`
      if (width > 0) {
        contentStyle.width = `${popoverWidth}px`
      }
      const triangleLeft = Math.max(
        12,
        Math.min(popoverWidth - 12, center - contentLeft)
      )
      triangleStyle.left = `${triangleLeft}px`
      const vcl = popupHeight.value / 2
      if (popoverTop + popoverHeight - vcl > vcl - popoverTop) {
        contentStyle.top = 'auto'
        contentStyle.bottom = `${Math.max(
          POPUP_EDGE,
          popupHeight.value - popoverTop + POPUP_EDGE
        )}px`
        triangleStyle.bottom = '-6px'
        triangleStyle['border-width'] = '6px 6px 0 6px'
        triangleStyle[
          'border-color'
        ] = `${triangleColor} transparent transparent transparent`
      } else {
        contentStyle.top = `${Math.max(
          POPUP_EDGE,
          popoverTop + popoverHeight + POPUP_EDGE
        )}px`
        triangleStyle.top = '-6px'
        triangleStyle['border-width'] = '0 6px 6px 6px'
        triangleStyle[
          'border-color'
        ] = `transparent transparent ${triangleColor} transparent`
      }
    }
    return style
  })

  onMounted(() => {
    const fixSize = () => {
      try {
        const { windowWidth, windowHeight, windowTop } = uni.getSystemInfoSync()
        popupWidth.value = windowWidth
        popupHeight.value = windowHeight + (windowTop || 0)
      } catch {}
    }
    window.addEventListener('resize', fixSize)
    fixSize()

    onUnmounted(() => {
      window.removeEventListener('resize', fixSize)
    })
  })

  return {
    isDesktop,
    popupStyle,
  }
}

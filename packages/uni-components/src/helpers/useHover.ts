import { ref } from 'vue'

interface UseHoverOptions {
  disabled?: string | boolean
  hoverClass: string
  hoverStopPropagation: boolean
  hoverStartTime: string | number
  hoverStayTime: string | number
}

export const hoverProps = {
  hoverClass: {
    type: String,
    default: 'none',
  },
  hoverStopPropagation: {
    type: Boolean,
    default: false,
  },
  hoverStartTime: {
    type: [Number, String],
    default: 50,
  },
  hoverStayTime: {
    type: [Number, String],
    default: 400,
  },
}

export function useHover(props: UseHoverOptions) {
  const hovering = ref(false)
  let hoverTouch: boolean = false
  let hoverStartTimer: ReturnType<typeof setTimeout>
  let hoverStayTimer: ReturnType<typeof setTimeout>
  function hoverReset() {
    requestAnimationFrame(() => {
      clearTimeout(hoverStayTimer)
      hoverStayTimer = setTimeout(() => {
        hovering.value = false
      }, parseInt(props.hoverStayTime as string))
    })
  }

  function onTouchstartPassive(evt: TouchEvent) {
    if (evt.touches.length > 1) {
      return
    }
    handleHoverStart(evt)
  }

  function onMousedown(evt: MouseEvent) {
    if (hoverTouch) {
      return
    }

    handleHoverStart(evt)
    window.addEventListener('mouseup', handlePCHoverEnd)
  }

  function handleHoverStart(evt: TouchEvent | MouseEvent) {
    // TODO detect scrolling
    if ((evt as any)._hoverPropagationStopped) {
      return
    }
    if (!props.hoverClass || props.hoverClass === 'none' || props.disabled) {
      return
    }
    if (props.hoverStopPropagation) {
      ;(evt as any)._hoverPropagationStopped = true
    }
    hoverTouch = true
    hoverStartTimer = setTimeout(() => {
      hovering.value = true
      if (!hoverTouch) {
        // 防止在hoverStartTime时间内触发了 touchend 或 touchcancel
        hoverReset()
      }
    }, parseInt(props.hoverStartTime as string))
  }

  function onTouchend() {
    handleHoverEnd()
  }

  function onMouseup() {
    if (!hoverTouch) {
      return
    }

    handlePCHoverEnd()
  }

  function handleHoverEnd() {
    hoverTouch = false
    if (hovering.value) {
      hoverReset()
    }
  }

  function handlePCHoverEnd() {
    handleHoverEnd()
    window.removeEventListener('mouseup', handlePCHoverEnd)
  }

  function onTouchcancel() {
    hoverTouch = false
    hovering.value = false
    clearTimeout(hoverStartTimer)
  }
  return {
    hovering,
    binding: {
      onTouchstartPassive,
      onMousedown,
      onTouchend,
      onMouseup,
      onTouchcancel,
    },
  }
}

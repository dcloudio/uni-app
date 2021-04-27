import { defineComponent, provide, getCurrentInstance, computed } from 'vue'
import { PolySymbol } from '@dcloudio/uni-core'
import { withWebEvent } from '@dcloudio/uni-components'

export const uniLabelKey = PolySymbol(__DEV__ ? 'uniLabel' : 'ul')
const props = {
  for: {
    type: String,
    default: '',
  },
}

export default /*#__PURE__*/ defineComponent({
  name: 'Label',
  props,
  setup(props, { emit, slots }) {
    const instance = getCurrentInstance()!
    const pageId = instance.root.proxy!.$page.id

    const handlers = useProvideLabel()

    const pointer = computed(
      () => props.for || (slots.default && slots.default.length)
    )

    const _onClick = withWebEvent(($event: Event) => {
      const EventTarget = $event.target as HTMLElement
      let stopPropagation = /^uni-(checkbox|radio|switch)-/.test(
        EventTarget.className
      )
      if (!stopPropagation) {
        stopPropagation = /^uni-(checkbox|radio|switch|button|svg)$/i.test(
          EventTarget.tagName
        )
      }
      // 现在checkbox图标已经改为svg实现，svg和path都跳过
      if (!stopPropagation) {
        stopPropagation = /^(svg|path)$/i.test(EventTarget.tagName)
      }
      if (stopPropagation) {
        return
      }

      if (props.for) {
        UniViewJSBridge.emit(
          'uni-label-click-' + pageId + '-' + props.for,
          $event,
          true
        )
      } else {
        handlers.forEach((handler) => {
          handler($event, true)
        })
      }
    })

    return () => (
      <uni-label class={{ 'uni-label-pointer': pointer }} onClick={_onClick}>
        {slots.default && slots.default()}
      </uni-label>
    )
  },
})

export interface UniLabelCtx {
  addHandler: (handler: UniLabelHandlerCtx) => void
  removeHandler: (handler: UniLabelHandlerCtx) => void
}
type UniLabelHandlerCtx = ($event: Event, b: boolean) => void

function useProvideLabel() {
  const handlers: UniLabelHandlerCtx[] = []

  provide<UniLabelCtx>(uniLabelKey, {
    addHandler(handler: UniLabelHandlerCtx) {
      handlers.push(handler)
    },
    removeHandler(handler: UniLabelHandlerCtx) {
      handlers.splice(handlers.indexOf(handler), 1)
    },
  })

  return handlers
}

import { inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { isHTMlElement } from '../list-view/index'
import type { ListItemStatus } from '../list-view/types'
import { UniElement } from '../../helpers/UniElement'
import { defineBuiltInComponent } from '@dcloudio/uni-components'

function getSize(isVertical: boolean, el: HTMLElement) {
  var style = window.getComputedStyle(el)
  if (isVertical) {
    return (
      parseFloat(style.marginTop) +
      el.getBoundingClientRect().height +
      parseFloat(style.marginBottom)
    )
  } else {
    return (
      parseFloat(style.marginLeft) +
      el.getBoundingClientRect().width +
      parseFloat(style.marginRight)
    )
  }
}

export class UniListItemElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'ListItem',
  props: {},
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-list-item',
    class: UniListItemElement,
  },
  //#endif
  setup(props, { slots, expose, attrs }) {
    if (attrs.slot === 'refresher') {
      return () => {
        return <uni-list-item>{slots.default && slots.default()}</uni-list-item>
      }
    }
    const rootRef = ref<HTMLElement | Node | null>(null)
    const isVertical = inject('__listViewIsVertical') as ComputedRef<boolean>

    const visible = ref(false)

    const status: ListItemStatus = {
      type: 'ListItem',
      visible,
      cachedSize: inject('__listViewDefaultItemSize') as number,
      cachedSizeUpdated: false,
    }

    expose({
      __listViewChildStatus: status,
    })

    const registerItem = inject('__listViewRegisterItem') as Function
    const unregisterItem = inject('__listViewUnregisterItem') as Function
    const firstItemRendered = inject('__listViewFirstItemRendered') as Function
    onMounted(() => {
      registerItem(status)
    })
    onBeforeUnmount(() => {
      unregisterItem(status)
    })
    watch(visible, (value) => {
      if (!value || status.cachedSizeUpdated) {
        return
      }
      nextTick(() => {
        const rootNode = rootRef.value! as HTMLElement | Node
        if (isHTMlElement(rootNode)) {
          status.cachedSize = getSize(isVertical.value, rootNode)
          status.cachedSizeUpdated = true
          firstItemRendered(status)
        }
      })
    })

    return () => {
      if (!visible.value) {
        return null
      }
      return (
        <uni-list-item ref={rootRef}>
          {slots.default && slots.default()}
        </uni-list-item>
      )
    }
  },
})

import {
  inject,
  ref,
  nextTick,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue'
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
  setup(props, { slots, expose }) {
    const rootRef = ref<HTMLElement | Node | null>(null)
    const isVertical = inject('__listViewIsVertical') as ComputedRef<boolean>

    const visible = ref(false)
    const seen = ref(false)

    const status: ListItemStatus = {
      type: 'ListItem',
      visible,
      cachedSize: 0,
      seen,
    }

    expose({
      __listViewChildStatus: status,
    })

    const registerItem = inject('__listViewRegisterItem') as Function
    const unregisterItem = inject('__listViewUnregisterItem') as Function
    onMounted(() => {
      registerItem(status)
    })
    onBeforeUnmount(() => {
      unregisterItem(status)
    })

    const realVisible = computed(() => {
      return visible.value || !status.seen.value
    })
    return () => {
      nextTick(() => {
        const rootNode = rootRef.value! as HTMLElement | Node
        if (realVisible.value && isHTMlElement(rootNode)) {
          status.cachedSize = getSize(isVertical.value, rootNode)
          seen.value = true
        }
      })
      if (!realVisible.value) {
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

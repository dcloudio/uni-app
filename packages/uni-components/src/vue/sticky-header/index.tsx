import { Ref, ref, onMounted, computed, nextTick, inject } from 'vue'
import type { PropType, ComputedRef } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import { StickyHeaderStatus } from '../list-view/types'

export class UniStickyHeaderElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'StickyHeader',
  props: {
    padding: {
      type: Array as PropType<number[]>,
      default: [0, 0, 0, 0],
    },
  },
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-sticky-header',
    class: UniStickyHeaderElement,
  },
  //#endif
  setup(props, { slots, expose }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)

    const isVertical = inject('__listViewIsVertical') as ComputedRef<boolean>
    const style = computed(() => {
      return {
        paddingTop: props.padding[0] + 'px',
        paddingRight: props.padding[1] + 'px',
        paddingBottom: props.padding[2] + 'px',
        paddingLeft: props.padding[3] + 'px',
        top: 0 - props.padding[0] + 'px',
      }
    })
    const status: StickyHeaderStatus = {
      type: 'StickyHeader',
      cachedSize: 0,
    }
    expose({
      __listViewChildStatus: status,
    })
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniStickyHeaderElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      nextTick(() => {
        const rootEl = rootRef.value! as HTMLElement
        const rect = rootEl.getBoundingClientRect()
        status.cachedSize = isVertical ? rect.height : rect.width
      })
      return (
        <uni-sticky-header ref={rootRef} style={style.value}>
          {slots.default?.()}
        </uni-sticky-header>
      )
    }
  },
})

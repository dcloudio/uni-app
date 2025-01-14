import { type Ref, computed, inject, onMounted, ref } from 'vue'
import type { ComputedRef, PropType } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import type { StickySectionStatus } from '../list-view/types'

export class UniStickySectionElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'StickySection',
  props: {
    padding: {
      type: Array as PropType<number[]>,
      default: [0, 0, 0, 0],
    },
  },
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-sticky-section',
    class: UniStickySectionElement,
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
      }
    })

    const headSize = computed(() => {
      return isVertical ? props.padding[0] : props.padding[3]
    })
    const tailSize = computed(() => {
      return isVertical ? props.padding[2] : props.padding[1]
    })
    const status: StickySectionStatus = {
      type: 'StickySection',
      headSize,
      tailSize,
    }
    expose({
      __listViewChildStatus: status,
    })

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniStickySectionElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      return (
        <uni-sticky-section ref={rootRef} style={style.value}>
          {slots.default?.()}
        </uni-sticky-section>
      )
    }
  },
})

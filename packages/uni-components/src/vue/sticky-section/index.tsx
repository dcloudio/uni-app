import { type Ref, computed, inject, onMounted, ref } from 'vue'
import type { ComputedRef, PropType } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import type { StickySectionStatus } from '../list-view/types'

export class UniStickySectionElement extends UniElement { }
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
    const placeholderSize = ref(0)
    const style = computed(() => {
      const padding = props.padding
      const paddingTop = padding[0]
      const paddingRight = padding[1]
      const paddingBottom = padding[2]
      const paddingLeft = padding[3]
      return {
        paddingTop: paddingTop + 'px',
        paddingRight: paddingRight + 'px',
        paddingBottom: (isVertical.value ? paddingBottom + placeholderSize.value : paddingBottom) + 'px',
        paddingLeft: (isVertical.value ? paddingLeft : paddingLeft + placeholderSize.value) + 'px',
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
      placeholderSize
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

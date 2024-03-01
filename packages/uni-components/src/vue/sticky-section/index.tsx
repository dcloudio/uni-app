import { Ref, ref, onMounted, computed } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'

class UniStickySectionElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'StickySection',
  props: {
    padding: {
      type: Array,
      default: [0, 0, 0, 0],
    },
  },
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-sticky-section',
    class: UniStickySectionElement,
  },
  //#endif
  setup(props, { slots }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const style = computed(() => {
      return {
        paddingTop: props.padding[0] + 'px',
        paddingRight: props.padding[1] + 'px',
        paddingBottom: props.padding[2] + 'px',
        paddingLeft: props.padding[3] + 'px',
      }
    })
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniStickySectionElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      return (
        <uni-sticky-section ref={rootRef} style={style}>
          {slots.default?.()}
        </uni-sticky-section>
      )
    }
  },
})

import { Ref, ref, onMounted, computed } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'

class UniStickyHeaderElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'StickyHeader',
  props: {
    padding: {
      type: Array,
      default: [0, 0, 0, 0],
    },
  },
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-sticky-header',
    class: UniStickyHeaderElement,
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
        top: 0 - (props.padding[0] as number) + 'px',
      }
    })
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniStickyHeaderElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      return (
        <uni-sticky-header ref={rootRef} style={style.value}>
          {slots.default?.()}
        </uni-sticky-header>
      )
    }
  },
})

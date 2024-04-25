import { getCurrentInstance, onMounted, ref } from 'vue'
import { extend } from '@vue/shared'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { onEventPrevent } from '@dcloudio/uni-core'

import { useHover } from '../../helpers/useHover'
import { UniElement } from '../../helpers/UniElement'
import {
  createNavigatorOnClick,
  navigatorProps,
} from '../../components/navigator'

export class UniNavigatorElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Navigator',
  inheritAttrs: false,
  compatConfig: {
    MODE: 3,
  },
  props: /*#__PURE__*/ extend({}, navigatorProps, {
    renderLink: {
      type: Boolean,
      default: true,
    },
  }),
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-navigator',
    class: UniNavigatorElement,
  },
  //#endif
  setup(props, { slots }) {
    const rootRef = ref<HTMLElement | null>(null)
    const vm = getCurrentInstance()
    const __scopeId = (vm && vm.vnode.scopeId) || ''
    const { hovering, binding } = useHover(props)

    const onClick = createNavigatorOnClick(props)

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniNavigatorElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      const { hoverClass, url } = props
      const hasHoverClass = props.hoverClass && props.hoverClass !== 'none'
      const innerNode = props.renderLink ? (
        <a
          class="navigator-wrap"
          href={url}
          onClick={onEventPrevent}
          onMousedown={onEventPrevent}
        >
          {slots.default && slots.default()}
        </a>
      ) : (
        slots.default && slots.default()
      )
      return (
        <uni-navigator
          class={hasHoverClass && hovering.value ? hoverClass : ''}
          ref={rootRef}
          {...(hasHoverClass && binding)}
          {...(vm ? vm.attrs : {})}
          {...{
            [__scopeId]: '',
          }}
          onClick={onClick}
        >
          {innerNode}
        </uni-navigator>
      )
    }
  },
})

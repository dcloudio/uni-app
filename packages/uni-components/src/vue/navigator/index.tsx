import { getCurrentInstance } from 'vue'
import { extend } from '@vue/shared'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { onEventPrevent } from '@dcloudio/uni-core'

import { useHover } from '../../helpers/useHover'
import {
  createNavigatorOnClick,
  navigatorProps,
} from '../../components/navigator'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Navigator',
  inheritAttrs: false,
  compatConfig: {
    MODE: 3,
  },
  props: extend({}, navigatorProps, {
    ssr: {
      type: Boolean,
      default: true,
    },
  }),
  setup(props, { slots }) {
    const vm = getCurrentInstance()
    const __scopeId = (vm && vm.vnode.scopeId) || ''
    const { hovering, binding } = useHover(props)

    const onClick = createNavigatorOnClick(props)

    return () => {
      const { hoverClass, url } = props
      const hasHoverClass = props.hoverClass && props.hoverClass !== 'none'

      const navigatorTsx = (
        <uni-navigator
          class={hasHoverClass && hovering.value ? hoverClass : ''}
          {...(hasHoverClass && binding)}
          {...(vm ? vm.attrs : {})}
          {...{
            [__scopeId]: '',
          }}
          onClick={onClick}
        >
          {slots.default && slots.default()}
        </uni-navigator>
      )

      return props.ssr ? (
        <a
          class="navigator-wrap"
          href={url}
          onClick={onEventPrevent}
          onMousedown={onEventPrevent}
        >
          {navigatorTsx}
        </a>
      ) : (
        navigatorTsx
      )
    }
  },
})

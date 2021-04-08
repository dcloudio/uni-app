import { extend } from '@vue/shared'
import { defineComponent } from 'vue'

import { hoverProps, useHover } from '../../helpers/useHover'

export default defineComponent({
  name: 'View',
  props: extend({}, hoverProps),
  setup(props, { slots }) {
    const { hovering, binding } = useHover(props)
    return () => {
      const hoverClass = props.hoverClass
      if (hoverClass && hoverClass !== 'none') {
        return (
          <uni-view class={hovering.value ? hoverClass : ''} {...binding}>
            {slots.default && slots.default()}
          </uni-view>
        )
      }
      return <uni-view>{slots.default && slots.default()}</uni-view>
    }
  },
})

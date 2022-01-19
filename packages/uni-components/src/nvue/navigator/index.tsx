import { defineComponent } from 'vue'
import {
  createNavigatorOnClick,
  navigatorProps,
} from '../../components/navigator'
import { useHoverClass } from '../utils'

export default defineComponent({
  name: 'Navigator',
  props: navigatorProps,
  setup(props, { slots }) {
    const onClick = createNavigatorOnClick(props)
    return () => {
      return (
        <div {...useHoverClass(props.hoverClass)} onClick={onClick}>
          {slots.default && slots.default()}
        </div>
      )
    }
  },
})

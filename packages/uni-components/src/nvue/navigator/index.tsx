import { defineComponent } from 'vue'
import {
  createNavigatorOnClick,
  navigatorProps,
} from '../../components/navigator'

export default defineComponent({
  name: 'Navigator',
  props: navigatorProps,
  setup(props, { slots }) {
    const onClick = createNavigatorOnClick(props)
    return () => <div onClick={onClick}>{slots.default && slots.default()}</div>
  },
})

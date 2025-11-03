import { defineComponent } from 'vue'
import {
  createNavigatorOnClick,
  navigatorProps,
} from '../../components/navigator'
import { type NVueComponentStyles, useHoverClass } from '../utils'

const navigatorStyles: NVueComponentStyles = [
  {
    'navigator-hover': {
      '': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        opacity: 0.7,
      },
    },
  },
]

export default defineComponent({
  name: 'Navigator',
  props: navigatorProps,
  styles: navigatorStyles,
  setup(props, { slots }) {
    const onClick = createNavigatorOnClick(props)
    return () => {
      return (
        <view {...useHoverClass(props)} onClick={onClick}>
          {slots.default && slots.default()}
        </view>
      )
    }
  },
})

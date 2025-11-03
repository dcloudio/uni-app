import { defineComponent } from 'vue'
import { iconColors, iconProps } from '../../components/icon'
import { type NVueComponentStyles, createNVueTextVNode } from '../utils'

const iconChars: Record<string, string> = {
  success: '\uEA06',
  info: '\uEA03',
  warn: '\uEA0B',
  waiting: '\uEA09',
  safe_success: '\uEA04',
  safe_warn: '\uEA05',
  success_circle: '\uEA07',
  success_no_circle: '\uEA08',
  waiting_circle: '\uEA0A',
  circle: '\uEA01',
  download: '\uEA02',
  info_circle: '\uEA0C',
  cancel: '\uEA0D',
  search: '\uEA0E',
  clear: '\uEA0F',
}

const iconStyles: NVueComponentStyles = [
  {
    'uni-icon': {
      '': {
        fontFamily: 'unincomponents',
      },
    },
  },
]

export default defineComponent({
  name: 'Icon',
  props: iconProps,
  styles: iconStyles,
  setup(props, {}) {
    return () => {
      return createNVueTextVNode(iconChars[props.type] as string, {
        class: 'uni-icon',
        style: {
          color: props.color || iconColors[props.type],
          fontSize: props.size,
        },
      })
    }
  },
})

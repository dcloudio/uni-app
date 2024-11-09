import { computed, onMounted, ref } from 'vue'

import { PRIMARY_COLOR } from '@dcloudio/uni-shared'
import {
  ICON_PATH_CANCEL,
  ICON_PATH_CLEAR,
  ICON_PATH_DOWNLOAD,
  ICON_PATH_INFO,
  ICON_PATH_SEARCH,
  ICON_PATH_SUCCESS,
  ICON_PATH_SUCCESS_NO_CIRCLE,
  ICON_PATH_WAITING,
  ICON_PATH_WARN,
  createSvgIconVNode,
  rpx2px,
} from '@dcloudio/uni-core'

import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'

const INFO_COLOR = '#10aeff'
const WARN_COLOR = '#f76260'
const GREY_COLOR = '#b2b2b2'
const CANCEL_COLOR = '#f43530'

const ICONS = {
  success: {
    d: ICON_PATH_SUCCESS,
    c: PRIMARY_COLOR,
  },
  success_no_circle: {
    d: ICON_PATH_SUCCESS_NO_CIRCLE,
    c: PRIMARY_COLOR,
  },
  info: {
    d: ICON_PATH_INFO,
    c: INFO_COLOR,
  },
  warn: {
    d: ICON_PATH_WARN,
    c: WARN_COLOR,
  },
  waiting: {
    d: ICON_PATH_WAITING,
    c: INFO_COLOR,
  },
  cancel: {
    d: ICON_PATH_CANCEL,
    c: CANCEL_COLOR,
  },
  download: {
    d: ICON_PATH_DOWNLOAD,
    c: PRIMARY_COLOR,
  },
  search: {
    d: ICON_PATH_SEARCH,
    c: GREY_COLOR,
  },
  clear: {
    d: ICON_PATH_CLEAR,
    c: GREY_COLOR,
  },
}

export class UniIconElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true,
      default: '',
    },
    size: {
      type: [String, Number],
      default: 23,
    },
    color: {
      type: String,
      default: '',
    },
  },
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-icon',
    class: UniIconElement,
  },
  //#endif
  setup(props) {
    const rootRef = ref<HTMLElement | null>(null)
    const path = computed(() => ICONS[props.type as keyof typeof ICONS])
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniIconElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      const { value } = path
      return (
        <uni-icon ref={rootRef}>
          {value &&
            value.d &&
            createSvgIconVNode(
              value.d,
              props.color || value.c,
              rpx2px(props.size)
            )}
        </uni-icon>
      )
    }
  },
})

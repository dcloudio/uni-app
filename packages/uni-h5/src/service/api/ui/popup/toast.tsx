import {
  type ExtractPropTypes,
  Transition,
  computed,
  createVNode,
  defineComponent,
} from 'vue'
import { SHOW_TOAST_ICON } from '@dcloudio/uni-api'
import type { API_TYPE_SHOW_TOAST_ICON } from '@dcloudio/uni-api'
import { usePopup } from './utils'
import {
  ICON_PATH_SUCCESS_NO_CIRCLE,
  ICON_PATH_WARN,
  createSvgIconVNode,
  onEventPrevent,
} from '@dcloudio/uni-core'
import {
  initI18nShowLoadingMsgsOnce,
  initI18nShowToastMsgsOnce,
} from '@dcloudio/uni-core'

const props = {
  title: {
    type: String,
    default: '',
  },
  icon: {
    default: 'success',
    validator(value: API_TYPE_SHOW_TOAST_ICON) {
      return SHOW_TOAST_ICON.indexOf(value) !== -1
    },
  },
  image: {
    type: String,
    default: '',
  },
  duration: {
    type: Number,
    default: 1500,
  },
  position: {
    type: String,
  },
  mask: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
  },
}
const ToastIconClassName = 'uni-toast__icon'

export type ToastProps = ExtractPropTypes<typeof props>

export default /*#__PURE__*/ defineComponent({
  name: 'Toast',
  props,
  setup(props) {
    initI18nShowToastMsgsOnce()
    initI18nShowLoadingMsgsOnce()
    const { Icon } = useToastIcon(props)
    const visible = usePopup(props, {})

    return () => {
      const { mask, duration, title, image, position } = props
      const positionClass = position ? `uni-toast--${position}` : ''
      const simpleToast = !!position || (!image && !Icon.value)
      return (
        <Transition name="uni-fade">
          <uni-toast v-show={visible.value} data-duration={duration}>
            {mask && !position ? (
              <div
                class="uni-mask"
                style="background: transparent;"
                onTouchmove={onEventPrevent}
              />
            ) : (
              ''
            )}
            {simpleToast ? (
              <div class={['uni-sample-toast', positionClass]}>
                <p class="uni-simple-toast__text">{title}</p>
              </div>
            ) : (
              <div class="uni-toast">
                {image ? (
                  <img src={image} class={ToastIconClassName} />
                ) : (
                  Icon.value
                )}
                {title ? <p class="uni-toast__content">{title}</p> : ''}
              </div>
            )}
          </uni-toast>
        </Transition>
      )
    }
  },
})

function useToastIcon(props: ToastProps) {
  const Icon = computed(() => {
    switch (props.icon) {
      case 'success':
        return createVNode(
          createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, '#fff', 36),
          {
            class: ToastIconClassName,
          }
        )
      case 'error':
        return createVNode(createSvgIconVNode(ICON_PATH_WARN, '#fff', 36), {
          class: ToastIconClassName,
        })
      case 'loading':
        return <i class={[ToastIconClassName, 'uni-loading']}></i>

      default:
        return null
    }
  })

  return {
    Icon,
  }
}

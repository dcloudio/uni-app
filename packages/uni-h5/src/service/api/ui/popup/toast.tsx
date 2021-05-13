import {
  Transition,
  defineComponent,
  ExtractPropTypes,
  computed,
  createVNode,
} from 'vue'
import { SHOW_TOAST_ICON } from '@dcloudio/uni-api'
import type { API_TYPE_SHOW_TOAST_ICON } from '@dcloudio/uni-api'
import { usePopup } from './utils'
import {
  onEventPrevent,
  createSvgIconVNode,
  ICON_PATH_SUCCESS_NO_CIRCLE,
} from '@dcloudio/uni-core'
import {
  initI18nShowToastMsgsOnce,
  initI18nShowLoadingMsgsOnce,
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
      const { mask, duration, title, image } = props
      return (
        <Transition name="uni-fade">
          <uni-toast v-show={visible.value} data-duration={duration}>
            {mask ? (
              <div
                class="uni-mask"
                style="background: transparent;"
                onTouchmove={onEventPrevent}
              />
            ) : (
              ''
            )}
            {!image && !Icon.value ? (
              <div class="uni-sample-toast">
                <p class="uni-simple-toast__text">{title}</p>
              </div>
            ) : (
              <div class="uni-toast">
                {image ? (
                  <img src={image} class={ToastIconClassName} />
                ) : (
                  Icon.value
                )}
                <p class="uni-toast__content">{title}</p>
              </div>
            )}
          </uni-toast>
        </Transition>
      )
    }
  },
})

function useToastIcon(props: ToastProps) {
  const Icon = computed(() =>
    props.icon === 'success' ? (
      createVNode(createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, '#fff', 38), {
        class: ToastIconClassName,
      })
    ) : props.icon === 'loading' ? (
      // @ts-ignore
      <i class={ToastIconClassName} class="uni-loading"></i>
    ) : null
  )

  return {
    Icon,
  }
}

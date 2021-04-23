import {
  Transition,
  defineComponent,
  ExtractPropTypes,
  withModifiers,
  computed,
} from 'vue'
import { SHOW_TOAST_ICON } from '@dcloudio/uni-api'
import type { API_TYPE_SHOW_TOAST_ICON } from '@dcloudio/uni-api'
import { usePopup } from './utils'

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

export type ToastProps = ExtractPropTypes<typeof props>

export default /*#__PURE__*/ defineComponent({
  name: 'Toast',
  props,
  setup(props) {
    const { iconClass } = useToastState(props)
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
                onTouchmove={withModifiers(() => {}, ['prevent'])}
              />
            ) : (
              ''
            )}
            {!image && !iconClass ? (
              <div class="uni-sample-toast">
                <p class="uni-simple-toast__text">{title}</p>
              </div>
            ) : (
              <div class="uni-toast">
                {image ? (
                  <img src={image} class="uni-toast__icon" />
                ) : (
                  <i class={iconClass} class="uni-icon_toast" />
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

function useToastState(props: ToastProps) {
  const iconClass = computed(() =>
    props.icon === 'success'
      ? 'uni-icon-success-no-circle'
      : props.icon === 'loading'
      ? 'uni-loading'
      : ''
  )

  return {
    iconClass,
  }
}

import {
  type ExtractPropTypes,
  Transition,
  computed,
  createVNode,
  defineComponent,
  ref,
  watchEffect,
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
import {
  getTheme,
  offThemeChange,
  onThemeChange,
} from '../../../../helpers/theme'

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

const ICONCOLOR = {
  light: '#fff',
  dark: 'rgba(255,255,255,0.9)',
}
const getIconColor = (theme: UniApp.ThemeMode) => ICONCOLOR[theme]

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
  const iconColor = ref(getIconColor(getTheme()))
  const _onThemeChange = ({ theme }: { theme: UniApp.ThemeMode }) =>
    (iconColor.value = getIconColor(theme))

  watchEffect(() => {
    if (props.visible) {
      onThemeChange(_onThemeChange)
    } else {
      offThemeChange(_onThemeChange)
    }
  })

  const Icon = computed(() => {
    switch (props.icon) {
      case 'success':
        return createVNode(
          createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, iconColor.value, 38),
          {
            class: ToastIconClassName,
          }
        )
      case 'error':
        return createVNode(
          createSvgIconVNode(ICON_PATH_WARN, iconColor.value, 38),
          {
            class: ToastIconClassName,
          }
        )
      case 'loading':
        // @ts-expect-error
        return <i class={ToastIconClassName} class="uni-loading"></i>

      default:
        return null
    }
  })

  return {
    Icon,
  }
}

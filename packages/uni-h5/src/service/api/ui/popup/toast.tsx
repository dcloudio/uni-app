import { type ExtractPropTypes, computed } from 'vue'
//#if _X_VAPOR_
import * as vapor from './toast-vapor'
//#else
import * as vdom from './toast-vdom'
//#endif
import { SHOW_TOAST_ICON } from '@dcloudio/uni-api'
import type { API_TYPE_SHOW_TOAST_ICON } from '@dcloudio/uni-api'
import { usePopup } from './utils'
import { onEventPrevent } from '@dcloudio/uni-core'
import {
  initI18nShowLoadingMsgsOnce,
  initI18nShowToastMsgsOnce,
} from '@dcloudio/uni-core'

// prettier-ignore
const ToastTransition =
//#if _X_VAPOR_
  vapor.ToastTransition
//#else
vdom.ToastTransition
//#endif

// prettier-ignore
const defineToast =
//#if _X_VAPOR_
  vapor.defineToast
//#else
vdom.defineToast
//#endif

// prettier-ignore
const createToastIcon =
//#if _X_VAPOR_
  vapor.createToastIcon
//#else
vdom.createToastIcon
//#endif

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

export default /*#__PURE__*/ defineToast({
  name: 'Toast',
  props,
  setup(props) {
    initI18nShowToastMsgsOnce()
    initI18nShowLoadingMsgsOnce()
    const Icon = computed(() => createToastIcon(props.icon))
    const visible = usePopup(props, {})

    return () => {
      return (
        <ToastTransition name="uni-fade">
          <uni-toast v-show={visible.value} data-duration={props.duration}>
            {props.mask && !props.position ? (
              <div
                class="uni-mask"
                style="background: transparent;"
                onTouchmove={onEventPrevent}
              />
            ) : (
              ''
            )}
            {!!props.position || (!props.image && !Icon.value) ? (
              <div
                class={[
                  'uni-sample-toast',
                  props.position ? `uni-toast--${props.position}` : '',
                ]}
              >
                <p class="uni-simple-toast__text">{props.title}</p>
              </div>
            ) : (
              <div class="uni-toast">
                {props.image ? (
                  <img src={props.image} class={ToastIconClassName} />
                ) : (
                  Icon.value
                )}
                {props.title ? (
                  <p class="uni-toast__content">{props.title}</p>
                ) : (
                  ''
                )}
              </div>
            )}
          </uni-toast>
        </ToastTransition>
      )
    }
  },
})

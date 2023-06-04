import { onEventPrevent, onEventStop } from '@dcloudio/uni-core'
import {
  Transition,
  defineComponent,
  ExtractPropTypes,
  ref,
  Ref,
  watchEffect,
} from 'vue'
import { usePopup, VNODE_MASK } from './utils'
import {
  onThemeChange,
  offThemeChange,
  getTheme,
} from '../../../../helpers/theme'

type ModalTheme = Record<UniApp.ThemeMode, { cancelColor: string }>
const ModalTheme: ModalTheme = {
  light: {
    cancelColor: '#000000',
  },
  dark: {
    cancelColor: 'rgb(170, 170, 170)',
  },
}
const setCancelColor = (theme: UniApp.ThemeMode, cancelColor: Ref<string>) =>
  (cancelColor.value = ModalTheme[theme].cancelColor)

const props = {
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  cancelColor: {
    type: String,
    default: '#000000',
  },
  confirmText: {
    type: String,
    default: 'OK',
  },
  confirmColor: {
    type: String,
    default: '#007aff',
  },
  visible: {
    type: Boolean,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  placeholderText: {
    type: String,
    default: '',
  },
}
export type ModalProps = ExtractPropTypes<typeof props>

export default /*#__PURE__*/ defineComponent({
  props,
  setup(props, { emit }) {
    const editContent = ref('')
    const close = () => (visible.value = false)
    const cancel = () => (close(), emit('close', 'cancel'))
    const confirm = () => (close(), emit('close', 'confirm', editContent.value))
    const visible = usePopup(props, {
      onEsc: cancel,
      onEnter: () => {
        !props.editable && confirm()
      },
    })

    const cancelColor = useOnThemeChange(props)

    return () => {
      const {
        title,
        content,
        showCancel,
        confirmText,
        confirmColor,
        editable,
        placeholderText,
      } = props
      editContent.value = content
      // TODO vue3 似乎有bug，不指定passive时，应该默认加上passive:false，否则浏览器会报警告，先看看vue3 会不会修复，若不修复，可以考虑手动addEventListener
      return (
        <Transition name="uni-fade">
          <uni-modal v-show={visible.value} onTouchmove={onEventPrevent}>
            {VNODE_MASK}
            <div class="uni-modal">
              {title && (
                <div class="uni-modal__hd">
                  <strong class="uni-modal__title" v-text={title}></strong>
                </div>
              )}
              {editable ? (
                <textarea
                  class="uni-modal__textarea"
                  rows="1"
                  placeholder={placeholderText}
                  value={content}
                  onInput={(e: Event) =>
                    (editContent.value = (e.target! as any).value)
                  }
                />
              ) : (
                <div
                  class="uni-modal__bd"
                  // @ts-ignore
                  onTouchmovePassive={onEventStop}
                  v-text={content}
                ></div>
              )}
              <div class="uni-modal__ft">
                {showCancel && (
                  <div
                    style={{ color: cancelColor.value }}
                    class="uni-modal__btn uni-modal__btn_default"
                    onClick={cancel}
                  >
                    {props.cancelText}
                  </div>
                )}
                <div
                  style={{ color: confirmColor }}
                  class="uni-modal__btn uni-modal__btn_primary"
                  onClick={confirm}
                >
                  {confirmText}
                </div>
              </div>
            </div>
          </uni-modal>
        </Transition>
      )
    }
  },
})

function useOnThemeChange(props: ModalProps) {
  const cancelColor = ref(props.cancelColor)

  const _onThemeChange = ({ theme }: { theme: UniApp.ThemeMode }) => {
    setCancelColor(theme, cancelColor)
  }

  watchEffect(() => {
    if (props.visible) {
      cancelColor.value = props.cancelColor
      // #000 by default in protocols
      if (props.cancelColor === '#000') {
        if (getTheme() === 'dark') _onThemeChange({ theme: 'dark' })
        onThemeChange(_onThemeChange)
      }
    } else {
      offThemeChange(_onThemeChange)
    }
  })

  return cancelColor
}

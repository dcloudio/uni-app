import { onEventPrevent, onEventStop } from '@dcloudio/uni-core'
import { Transition, defineComponent, ExtractPropTypes, ref } from 'vue'
import { usePopup, VNODE_MASK } from './utils'

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
                    style={{ color: props.cancelColor }}
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

import { onTouchmovePrevent, onTouchmoveStop } from '@dcloudio/uni-core'
import { Transition, defineComponent, ExtractPropTypes } from 'vue'
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
}
export type ModalProps = ExtractPropTypes<typeof props>

export default /*#__PURE__*/ defineComponent({
  props,
  setup(props, { emit }) {
    const close = () => (visible.value = false)
    const cancel = () => (close(), emit('close', 'cancel'))
    const confirm = () => (close(), emit('close', 'confirm'))
    const visible = usePopup(props, {
      onEsc: cancel,
      onEnter: confirm,
    })
    return () => {
      const { title, content, showCancel, confirmText, confirmColor } = props
      return (
        <Transition name="uni-fade">
          <uni-modal v-show={visible.value} onTouchmove={onTouchmovePrevent}>
            {VNODE_MASK}
            <div class="uni-modal">
              {title && (
                <div class="uni-modal__hd">
                  <strong class="uni-modal__title" v-text={title}></strong>
                </div>
              )}
              <div
                class="uni-modal__bd"
                onTouchmove={onTouchmoveStop}
                v-text={content}
              ></div>
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

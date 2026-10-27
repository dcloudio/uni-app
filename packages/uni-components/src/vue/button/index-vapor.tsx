import { ref } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { useVaporButton } from '../../helpers/form-vapor'
import { useHover } from '../../helpers/useHover'
import { useBooleanAttr } from '../../helpers/useBooleanAttr'
import { withWebEvent } from '../../helpers/useEvent'
import { useListeners } from '../../helpers/useListeners'
import { buttonProps } from '../../components/button'
import { UniViewElement } from '../web-vapor-elements'

// 只提供逻辑类型，根节点由模板创建，不构造或注册 Custom Element。
export class UniButtonElement extends UniViewElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniButtonElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-button')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
}

const uniTagName = { value: 'BUTTON' }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Button',
  props: buttonProps,
  rootElement: { name: 'uni-button', class: UniButtonElement },
  setup(props, { slots }) {
    const rootRef = ref<HTMLElement | null>(null)
    const uniForm = useVaporButton(props, rootRef)
    const { hovering, binding } = useHover(props)
    const onClick = withWebEvent((e: Event, isLabelClick: boolean) => {
      if (props.disabled) {
        return e.stopImmediatePropagation()
      }
      if (isLabelClick) {
        rootRef.value!.click()
      }
      if (props.formType === 'submit') {
        uniForm?.submit(e)
      } else if (props.formType === 'reset') {
        uniForm?.reset(e)
      }
    })
    useListeners(props, { 'label-click': onClick })

    const root = (
      <div
        uni-button=""
        uni-view=""
        ref={rootRef}
        onClick={onClick}
        id={props.id}
        class={
          props.hoverClass !== 'none' && hovering.value ? props.hoverClass : ''
        }
        {...(props.hoverClass && props.hoverClass !== 'none' && binding)}
        {...useBooleanAttr(props, ['disabled', 'loading', 'plain'])}
      >
        {slots.default && slots.default()}
      </div>
    )
    Object.defineProperty(root, 'uniTagName', uniTagName)
    return root
  },
})

import { Ref, ref, computed } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import {
  props as fieldProps,
  emit as fieldEmit,
  useField,
} from '../../helpers/useField'

const props = /*#__PURE__*/ Object.assign({}, fieldProps, {
  placeholderClass: {
    type: String,
    default: 'input-placeholder',
  },
})

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Input',
  props,
  emit: ['confirm', ...fieldEmit],
  setup(props, { emit }) {
    const INPUT_TYPES = ['text', 'number', 'idcard', 'digit', 'password']
    const type = computed(() => {
      let type = ''
      switch (props.type) {
        case 'text':
          if (props.confirmType === 'search') {
            type = 'search'
          }
          break
        case 'idcard':
          // TODO 可能要根据不同平台进行区分处理
          type = 'text'
          break
        case 'digit':
          type = 'number'
          break
        default:
          type = ~INPUT_TYPES.includes(props.type) ? props.type : 'text'
          break
      }
      return props.password ? 'password' : type
    })
    const valid = ref(true)
    let cachedValue = ''
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } =
      useField(props, rootRef, emit, (event, state) => {
        const input = event.target as HTMLInputElement

        if (NUMBER_TYPES.includes(props.type)) {
          // 在输入 - 负号 的情况下，event.target.value没有值，但是会触发校验 false，因此做此处理
          valid.value = input.validity && input.validity.valid
          cachedValue = state.value

          // 处理部分输入法可以输入其它字符的情况
          // 上一处理导致无法输入 - ，因此去除
          // if (input.validity && !input.validity.valid) {
          //   input.value = cachedValue
          //   state.value = input.value
          //   // 输入非法字符不触发 input 事件
          //   return false
          // } else {
          //   cachedValue = state.value
          // }
        }

        // type="number" 不支持 maxlength 属性，因此需要主动限制长度。
        if (type.value === 'number') {
          const maxlength = state.maxlength
          if (maxlength > 0 && input.value.length > maxlength) {
            input.value = input.value.slice(0, maxlength)
            state.value = input.value
            // 字符长度超出范围不触发 input 事件
            return false
          }
        }
      })
    const NUMBER_TYPES = ['number', 'digit']
    const step = computed(() =>
      NUMBER_TYPES.includes(props.type) ? '0.000000000000000001' : ''
    )

    function onKeyUpEnter(event: Event) {
      if ((event as KeyboardEvent).key !== 'Enter') {
        return
      }
      event.stopPropagation()
      trigger('confirm', event, {
        value: (event.target as HTMLInputElement).value,
      })
    }
    return () => {
      let inputNode =
        props.disabled && fixDisabledColor ? (
          <input
            ref={fieldRef}
            value={state.value}
            tabindex="-1"
            readonly={!!props.disabled}
            type={type.value}
            maxlength={state.maxlength}
            step={step.value}
            class="uni-input-input"
            // fix: 禁止 readonly 状态获取焦点
            onFocus={(event: Event) =>
              (event.target as HTMLInputElement).blur()
            }
          />
        ) : (
          <input
            ref={fieldRef}
            value={state.value}
            disabled={!!props.disabled}
            type={type.value}
            maxlength={state.maxlength}
            step={step.value}
            enterkeyhint={props.confirmType}
            class="uni-input-input"
            autocomplete="off"
            onKeyup={onKeyUpEnter}
          />
        )
      return (
        <uni-input ref={rootRef}>
          <div class="uni-input-wrapper">
            <div
              v-show={!(state.value.length || !valid.value)}
              {...scopedAttrsState.attrs}
              style={props.placeholderStyle}
              class={['uni-input-placeholder', props.placeholderClass]}
            >
              {props.placeholder}
            </div>
            {props.confirmType === 'search' ? (
              <form action="" onSubmit={() => false} class="uni-input-form">
                {inputNode}
              </form>
            ) : (
              inputNode
            )}
          </div>
        </uni-input>
      )
    }
  },
})

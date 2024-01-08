import { extend, hyphenate } from '@vue/shared'
import { Ref, ref, computed, watch, onMounted, HTMLAttributes } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import {
  props as fieldProps,
  emit as fieldEmit,
  useField,
} from '../../helpers/useField'

const props = /*#__PURE__*/ extend({}, fieldProps, {
  placeholderClass: {
    type: String,
    default: 'input-placeholder',
  },
  textContentType: {
    type: String,
    default: '',
  },
})

class UniInputElement extends UniElement {
  focus(options?: FocusOptions | undefined): void {
    this.querySelector('input')?.focus(options)
  }
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Input',
  props,
  emits: ['confirm', ...fieldEmit],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-input',
    class: UniInputElement,
  },
  //#endif
  setup(props, { emit }) {
    const INPUT_TYPES = ['text', 'number', 'idcard', 'digit', 'password', 'tel']
    const AUTOCOMPLETES = ['off', 'one-time-code']
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
    const autocomplete = computed(() => {
      const camelizeIndex = AUTOCOMPLETES.indexOf(props.textContentType)
      const kebabCaseIndex = AUTOCOMPLETES.indexOf(
        hyphenate(props.textContentType)
      )
      const index =
        camelizeIndex !== -1
          ? camelizeIndex
          : kebabCaseIndex !== -1
          ? kebabCaseIndex
          : 0
      return AUTOCOMPLETES[index]
    })

    let cache = ref('')
    let resetCache: (() => void) | null
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } =
      useField(props, rootRef, emit, (event, state) => {
        const input = event.target as HTMLInputElement

        if (type.value === 'number') {
          // 数字类型输入错误时无法获取具体的值，自定义校验和纠正。
          if (resetCache) {
            input.removeEventListener('blur', resetCache)
            resetCache = null
          }
          if (input.validity && !input.validity.valid) {
            if (
              ((!cache.value || !input.value) &&
                (event as InputEvent).data === '-') ||
              (cache.value[0] === '-' &&
                (event as InputEvent).inputType === 'deleteContentBackward')
            ) {
              cache.value = '-'
              state.value = ''
              resetCache = () => {
                cache.value = input.value = ''
              }
              input.addEventListener('blur', resetCache)
              return false
            }
            // 处理小数点
            if (cache.value) {
              if (cache.value.indexOf('.') !== -1) {
                // 删除到小数点时
                if (
                  (event as InputEvent).data !== '.' &&
                  (event as InputEvent).inputType === 'deleteContentBackward'
                ) {
                  const dotIndex = cache.value.indexOf('.')
                  cache.value =
                    input.value =
                    state.value =
                      cache.value.slice(0, dotIndex)
                  return true
                }
              } else if ((event as InputEvent).data === '.') {
                // 输入小数点时
                cache.value += '.'
                resetCache = () => {
                  cache.value = input.value = cache.value.slice(0, -1)
                }
                input.addEventListener('blur', resetCache)
                return false
              }
            }
            cache.value =
              state.value =
              input.value =
                cache.value === '-' ? '' : cache.value
            // 输入非法字符不触发 input 事件
            return false
          } else {
            cache.value = input.value
          }

          // type="number" 不支持 maxlength 属性，因此需要主动限制长度。
          const maxlength = state.maxlength
          if (maxlength > 0 && input.value.length > maxlength) {
            input.value = input.value.slice(0, maxlength)
            state.value = input.value
            // 字符长度超出范围不触发 input 事件
            return false
          }
        }
      })
    watch(
      () => state.value,
      (value) => {
        if (props.type === 'number' && !(cache.value === '-' && value === '')) {
          cache.value = value
        }
      }
    )
    const NUMBER_TYPES = ['number', 'digit']
    const step = computed(() =>
      NUMBER_TYPES.includes(props.type) ? props.step : ''
    )

    function onKeyUpEnter(event: Event) {
      if ((event as KeyboardEvent).key !== 'Enter') {
        return
      }
      const input = event.target as HTMLInputElement
      event.stopPropagation()
      trigger('confirm', event, {
        value: input.value,
      })
      !props.confirmHold && input.blur()
    }

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniInputElement
      Object.defineProperty(rootElement, 'value', {
        get() {
          return rootElement.querySelector('input')!.value
        },
        set(value: string) {
          rootElement.querySelector('input')!.value = value
        },
      })
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      let inputNode =
        props.disabled && fixDisabledColor ? (
          <input
            key="disabled-input"
            ref={fieldRef}
            value={state.value}
            tabindex="-1"
            readonly={!!props.disabled}
            type={type.value}
            maxlength={state.maxlength}
            step={step.value}
            class="uni-input-input"
            style={props.cursorColor ? { caretColor: props.cursorColor } : {}}
            // fix: 禁止 readonly 状态获取焦点
            onFocus={(event: Event) =>
              (event.target as HTMLInputElement).blur()
            }
          />
        ) : (
          <input
            key="input"
            ref={fieldRef}
            v-model={state.value}
            disabled={!!props.disabled}
            type={type.value}
            maxlength={state.maxlength}
            step={step.value}
            // @ts-ignore
            enterkeyhint={props.confirmType}
            pattern={props.type === 'number' ? '[0-9]*' : undefined}
            class="uni-input-input"
            style={props.cursorColor ? { caretColor: props.cursorColor } : {}}
            autocomplete={autocomplete.value}
            onKeyup={onKeyUpEnter}
            inputmode={props.inputmode as HTMLAttributes['inputmode']}
          />
        )
      return (
        <uni-input ref={rootRef}>
          <div class="uni-input-wrapper">
            <div
              v-show={!(state.value.length || cache.value === '-')}
              {...scopedAttrsState.attrs}
              style={props.placeholderStyle}
              class={['uni-input-placeholder', props.placeholderClass]}
            >
              {props.placeholder}
            </div>
            {props.confirmType === 'search' ? (
              <form
                action=""
                onSubmit={(event) => event.preventDefault()}
                class="uni-input-form"
              >
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

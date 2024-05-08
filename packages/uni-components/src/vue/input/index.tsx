import { extend, hyphenate } from '@vue/shared'
import { Ref, ref, computed, watch, onMounted, HTMLAttributes } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import {
  props as fieldProps,
  emit as fieldEmit,
  useField,
  type State,
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

function resolveDigitDecimalPoint(
  event: InputEvent,
  cache: Ref<string>,
  state: State,
  input: HTMLInputElement
) {
  if ((event as InputEvent).data === '.') {
    // 解决可重复输入小数点的问题
    if (__PLATFORM__ === 'app') {
      if (cache.value.slice(-1) === '.') {
        state.value = input.value = cache.value = cache.value.slice(0, -1)
        return false
      } else if (cache.value.includes('.')) {
        state.value = input.value = cache.value
        return false
      }
    }
    if (cache.value) {
      cache.value += '.'
      return false
    }
  }
}

export class UniInputElement extends UniElement {
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
  setup(props, { emit, expose }) {
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
            const res = resolveDigitDecimalPoint(
              event as InputEvent,
              cache,
              state,
              input
            )
            if (typeof res === 'boolean') return res
            cache.value =
              state.value =
              input.value =
                cache.value === '-' ? '' : cache.value
            // 输入非法字符不触发 input 事件
            return false
          } else {
            // 处理小数点
            const res = resolveDigitDecimalPoint(
              event as InputEvent,
              cache,
              state,
              input
            )
            if (typeof res === 'boolean') return res

            if (cache.value === input.value) return false

            if (__PLATFORM__ === 'app') {
              // iOS 会带着 . 传递给 input
              if (
                (event as InputEvent).inputType === 'deleteContentBackward' &&
                plus.os.name === 'iOS'
              ) {
                input.value.slice(-1) === '.' &&
                  (input.value = input.value.slice(0, -1))
              }
            }

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
          cache.value = value.toString()
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

    expose({
      $triggerInput: (detail: { value: string }) => {
        emit('update:modelValue', detail.value)
        emit('update:value', detail.value)
        state.value = detail.value
      },
    })

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
            value={state.value}
            onInput={(event: Event) => {
              state.value = (event.target as HTMLInputElement).value.toString()
            }}
            // v-model={($event) => {state.value = $event.toString()}}
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
              v-show={
                !(
                  state.value.length ||
                  cache.value === '-' ||
                  cache.value.includes('.')
                )
              }
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

import { extend, hyphenate } from '@vue/shared'
import { once } from '@dcloudio/uni-shared'
import {
  type ComputedRef,
  type ExtractPropTypes,
  type HTMLAttributes,
  type Ref,
  computed,
  onMounted,
  ref,
  watch,
} from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import {
  type State,
  emit as fieldEmit,
  props as fieldProps,
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

const resolveDigitDecimalPointDeleteContentBackward = once(() => {
  //#if !_NODE_JS_
  if (__PLATFORM__ === 'app') {
    const osVersion = plus.os.version
    return (
      plus.os.name === 'iOS' &&
      !!osVersion &&
      parseInt(osVersion) >= 16 &&
      parseFloat(osVersion) < 17.2
    )
  }

  if (__PLATFORM__ === 'h5') {
    const ua = navigator.userAgent
    let osVersion = ''
    const osVersionFind = ua.match(/OS\s([\w_]+)\slike/)
    if (osVersionFind) {
      osVersion = osVersionFind[1].replace(/_/g, '.')
    } else if (/Macintosh|Mac/i.test(ua) && navigator.maxTouchPoints > 0) {
      const versionMatched = ua.match(/Version\/(\S*)\b/)
      if (versionMatched) {
        osVersion = versionMatched[1]
      }
    }
    return (
      !!osVersion && parseInt(osVersion) >= 16 && parseFloat(osVersion) < 17.2
    )
  }
  //#endif
})

function resolveDigitDecimalPoint(
  event: InputEvent,
  cache: Ref<string>,
  state: State,
  input: HTMLInputElement,
  resetCache?: ResetCache
) {
  if (cache.value) {
    // TODO 苹果智能标点：safari（webview） 上连续输入两次 . 后，在第三次输入 . 时，会触发两次 deleteContentBackward（删除） 的输入外加一次 insertText 为 …（三个点） 的输入
    if ((event as InputEvent).data === '.') {
      // 解决可重复输入小数点的问题
      if (cache.value.slice(-1) === '.') {
        state.value = input.value = cache.value = cache.value.slice(0, -1)
        return false
      }
      if (cache.value && !cache.value.includes('.')) {
        cache.value += '.'
        if (resetCache) {
          resetCache.fn = () => {
            state.value = input.value = cache.value = cache.value.slice(0, -1)
            input.removeEventListener('blur', resetCache.fn!)
          }
          input.addEventListener('blur', resetCache.fn)
        }
        return false
      }
    } else if ((event as InputEvent).inputType === 'deleteContentBackward') {
      // ios 无法删除小数
      if (resolveDigitDecimalPointDeleteContentBackward()) {
        if (cache.value.slice(-2, -1) === '.') {
          cache.value = state.value = input.value = cache.value.slice(0, -2)
          return true
        }
      }
    }
  }
}

type Props = ExtractPropTypes<typeof props>
type ResetCache = { fn: (() => void) | null }
function useCache(props: Props, type: ComputedRef<string>) {
  if (type.value === 'number') {
    const value =
      typeof props.modelValue === 'undefined' ? props.value : props.modelValue
    const cache = ref(
      typeof value !== 'undefined' && value !== null
        ? value.toLocaleString()
        : ''
    )
    watch(
      () => props.modelValue,
      (value) => {
        cache.value =
          typeof value !== 'undefined' && value !== null
            ? value.toLocaleString()
            : ''
      }
    )
    watch(
      () => props.value,
      (value) => {
        cache.value =
          typeof value !== 'undefined' && value !== null
            ? value.toLocaleString()
            : ''
      }
    )
    return cache
  } else {
    return ref('')
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
          type = 'text'
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
          type = INPUT_TYPES.includes(props.type) ? props.type : 'text'
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
    let cache = useCache(props, type)
    let resetCache: ResetCache = { fn: null }
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } =
      useField(props, rootRef, emit, (event, state) => {
        const input = event.target as HTMLInputElement

        if (type.value === 'number') {
          // 数字类型输入错误时无法获取具体的值，自定义校验和纠正。
          if (resetCache.fn) {
            input.removeEventListener('blur', resetCache.fn)
            resetCache.fn = null
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
              resetCache.fn = () => {
                cache.value = input.value = ''
              }
              input.addEventListener('blur', resetCache.fn)
              return false
            }
            // 处理小数点
            const res = resolveDigitDecimalPoint(
              event as InputEvent,
              cache,
              state,
              input,
              resetCache
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
              input,
              resetCache
            )
            if (typeof res === 'boolean') return res

            cache.value = input.value
          }

          // type="number" 不支持 maxlength 属性，因此需要主动限制长度。
          const maxlength = state.maxlength
          if (maxlength > 0 && input.value.length > maxlength) {
            input.value = input.value.slice(0, maxlength)
            state.value = input.value
            // 字符长度超出范围不触发 input 事件
            // 当用户ctrl + v粘贴过长字符时，截断后的input.value 和原来的输入框值不相等时，需要触发input事件
            return props.modelValue?.toString() !== input.value
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
            // v-model 会导致 type 为 number 或 digit 时赋值为 number 类型
            value={state.value}
            onInput={(event: Event) => {
              state.value = (event.target as HTMLInputElement).value.toString()
            }}
            disabled={!!props.disabled}
            type={type.value}
            maxlength={state.maxlength}
            step={step.value}
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

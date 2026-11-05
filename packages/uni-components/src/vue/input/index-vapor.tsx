import { computed, watch } from 'vue'
import { INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX } from '@dcloudio/uni-shared'
import { defineBuiltInComponent } from '../../helpers/component'
import {
  normalizeInputStyleClass,
  useInputStyles,
} from '../../helpers/useInputStyles'
import { UniInputElement } from './element-vapor'
import { emits, props, useInput } from './useInput'

export { UniInputElement }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Input',
  props,
  emits: ['change', ...emits],
  externalClasses: ['placeholder-class', 'selection-class'],
  rootElement: { name: 'uni-input', class: UniInputElement },
  setup(props, context) {
    const {
      rootRef,
      fieldRef,
      state,
      scopedAttrsState,
      fixDisabledColor,
      type,
      autocomplete,
      inputmode,
      step,
      onKeyUpEnter,
      trigger,
    } = useInput(props, context, true)
    const placeholderStyle = useInputStyles(props, fieldRef)
    // 初值供首屏及 SSR 使用；后续由字段监听独立同步，不触发整组属性 diff。
    const initialPlaceholder = props.placeholder
    const readonly = computed(() => !!props.disabled && fixDisabledColor)
    if (fixDisabledColor) {
      // readonly 不会让已聚焦节点失焦；复用原生节点时需主动同步禁用行为。
      watch(
        readonly,
        (disabled) => {
          if (disabled) fieldRef.value?.blur()
        },
        { flush: 'post' }
      )
    }
    const style = computed(() =>
      props.cursorColor ? { caretColor: props.cursorColor } : {}
    )
    const setFieldRef = (el: HTMLInputElement | null) => {
      rootRef.value = fieldRef.value = el
    }
    // 保持同一个原生节点，disabled、password 和 search 切换不会使外部 ref 失效。
    return (
      <input
        uni-input=""
        ref={setFieldRef}
        {...scopedAttrsState.attrs}
        class={
          placeholderStyle.value
            ? 'uni-input-input ' +
              INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX +
              placeholderStyle.value
            : 'uni-input-input'
        }
        data-uni-placeholder-class={normalizeInputStyleClass(
          props.placeholderClass
        )}
        data-uni-selection-class={normalizeInputStyleClass(
          props.selectionClass
        )}
        data-uni-placeholder-style={placeholderStyle.value || undefined}
        name={props.name}
        value={state.value}
        placeholder={initialPlaceholder}
        disabled={!!props.disabled && !readonly.value}
        readonly={readonly.value}
        tabindex={readonly.value ? -1 : undefined}
        type={type.value}
        maxlength={
          Number.isFinite(state.maxlength) ? state.maxlength : undefined
        }
        step={step.value}
        enterkeyhint={props.confirmType}
        pattern={props.type === 'number' ? '[0-9]*' : undefined}
        autocomplete={autocomplete.value}
        inputmode={inputmode.value}
        style={style.value}
        onFocus={(event: Event) => {
          if (props.disabled) (event.target as HTMLInputElement).blur()
        }}
        onChange={(event: Event) => {
          event.stopPropagation()
          if (!props.disabled) {
            trigger('change', event, {
              value: (event.target as HTMLInputElement).value,
            })
          }
        }}
        onKeyup={(event: Event) => {
          if (
            !props.disabled &&
            !state.composing &&
            !(event as KeyboardEvent).isComposing
          )
            onKeyUpEnter(event)
        }}
      />
    )
  },
})

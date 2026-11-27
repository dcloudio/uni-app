import {
  computed,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  renderEffect,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  setValue,
  watch,
  withModifiers,
} from 'vue'
import { type NormalizedStyle, hasOwn, normalizeStyle } from '@vue/shared'
import { INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX } from '@dcloudio/uni-shared'
import { defineBuiltInComponent } from '../../helpers/component'
import { useInputLayout } from '../../helpers/useInputLayout'
import {
  normalizeInputPlaceholderClass,
  useInputStyles,
} from '../../helpers/useInputStyles'
import { UniInputElement, initInputElement } from './element-vapor'
import { emits, props, useInput } from './useInput'

export { UniInputElement }

function omitUnsupportedProps<T extends Record<string, unknown>>(
  props: T
): Omit<T, 'step' | 'ignoreCompositionEvent' | 'textContentType'> {
  const supportedProps = Object.assign({}, props)
  const unsupportedProp =
    /^[.^]?(step|ignore-?composition-?event|text-?content-?type)$/i
  for (const key of Object.keys(supportedProps)) {
    if (unsupportedProp.test(key)) {
      delete supportedProps[key]
    }
  }
  return supportedProps
}

const vaporProps = /*#__PURE__*/ omitUnsupportedProps(props)

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Input',
  props: vaporProps,
  inheritAttrs: false,
  // 旧输入框拦截内部 change，原生根节点也不向组件监听器透传此事件。
  emits: ['change', ...emits],
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
      onInput,
    } = useInput(props, context)
    if (!__NODE_JS__) useInputLayout(fieldRef)
    const placeholderStyle = useInputStyles(props, fieldRef)
    const placeholderClass = computed(() =>
      normalizeInputPlaceholderClass(props.placeholderClass)
    )
    const classes = computed(() => [
      'uni-input-input',
      placeholderClass.value,
      placeholderStyle.value
        ? INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX + placeholderStyle.value
        : '',
    ])
    const serverValue = __NODE_JS__ ? { value: state.value } : {}
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
    const onFieldInput = withModifiers(onInput, ['stop'])
    const isSearchConfirm = computed(() => props.confirmType === 'search')
    const rootAttrs = computed(() => {
      const attrs = omitUnsupportedProps(context.attrs)
      const protectedAttrs: Record<string, boolean> = {
        disabled: !!props.disabled,
        form: isSearchConfirm.value,
        readonly: readonly.value,
        tabindex: readonly.value,
      }
      // 同一个原生属性只使用一个绑定键，避免移除别名时清除仍在使用的值。
      for (const [key, value] of Object.entries(attrs)) {
        const name = key.replace(/^[.^]/, '').toLowerCase()
        if (!hasOwn(protectedAttrs, name)) continue
        delete attrs[key]
        // input.form 是只读 DOM 属性，强制 prop 绑定不参与原生表单关联。
        if (
          !protectedAttrs[name] &&
          !(name === 'form' && key.startsWith('.'))
        ) {
          attrs[name] = value
        }
      }
      if (props.cursorColor) {
        // 数组归一化返回新对象，统一覆盖业务样式中的两种 caret-color 写法。
        const style = normalizeStyle([attrs.style]) as NormalizedStyle
        delete style['caret-color']
        style.caretColor = props.cursorColor
        attrs.style = style
      }
      return attrs
    })
    const setFieldRef = (el: HTMLInputElement | null) => {
      rootRef.value = fieldRef.value = el
    }
    // 保持同一个原生节点，disabled、password 和 search 切换不会使外部 ref 失效。
    const root = (
      <input
        uni-input=""
        uni-disabled={props.disabled ? '' : undefined}
        ref={setFieldRef}
        {...scopedAttrsState.attrs}
        {...serverValue}
        class={classes.value}
        placeholder={props.placeholder}
        // 旧搜索表单拦截了提交，搜索输入框继续独立于外层原生表单。
        form={isSearchConfirm.value ? '' : undefined}
        disabled={!!props.disabled && !readonly.value}
        readonly={readonly.value}
        tabindex={readonly.value ? -1 : undefined}
        type={type.value}
        maxlength={state.maxlength}
        step={step.value}
        enterkeyhint={readonly.value ? undefined : props.confirmType}
        pattern={
          !readonly.value && props.type === 'number' ? '[0-9]*' : undefined
        }
        autocomplete={readonly.value ? undefined : autocomplete.value}
        inputmode={inputmode.value}
        onInput={readonly.value ? undefined : onFieldInput}
        onFocus={(event: Event) => {
          if (readonly.value) (event.target as HTMLInputElement).blur()
        }}
        onKeyup={(event: Event) => {
          if (!readonly.value) onKeyUpEnter(event)
        }}
        {...rootAttrs.value}
      />
    )
    if (!__NODE_JS__) {
      // 独立同步受控值，避免占位样式等属性更新覆盖直接写入的原生 value。
      renderEffect(() => {
        // type 切换可能清空 DOM 值，待模板更新类型后重新应用受控值。
        void type.value
        setValue(root, state.value)
      })
      initInputElement(root)
    }
    return root
  },
})

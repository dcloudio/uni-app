import { onMounted, withModifiers } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import { emits, props, useInput } from './useInput'

export class UniInputElement extends UniElement {
  focus(options?: FocusOptions | undefined): void {
    this.querySelector('input')?.focus(options)
  }
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Input',
  props,
  emits,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-input',
    class: UniInputElement,
  },
  //#endif
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
      cache,
      step,
      onKeyUpEnter,
      onInput,
    } = useInput(props, context)
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
            inputmode={inputmode.value}
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
            onInput={withModifiers(onInput, ['stop'])}
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
            inputmode={inputmode.value}
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
                novalidate
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

import { withModifiers } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniInputElement, initInputElement } from './element-vapor'
import { emits, props, useInput } from './useInput'

export { UniInputElement }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Input',
  props,
  emits,
  // TODO native 仅用于迁移期间跳过旧注册流程，Vapor 旧组件全部迁移后移除。
  rootElement: { name: 'uni-input', class: UniInputElement, native: true },
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
    // 分支内创建自己的输入 Block，避免搜索表单卸载后复用已经停止的响应式作用域。
    const renderInput = () => (
      <>
        {props.disabled && fixDisabledColor ? (
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
        )}
      </>
    )
    const root = (
      <div uni-input="" uni-view="" ref={rootRef}>
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
              {renderInput()}
            </form>
          ) : (
            renderInput()
          )}
        </div>
      </div>
    )

    // setup 仅执行一次，在外部 ref 可见前绑定根节点能力。
    initInputElement(root)
    return root
  },
})

import type { HTMLAttributes } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import ResizeSensor from '../resize-sensor/index-vapor'
import { UniTextareaElement, initTextareaElement } from './element-vapor'
import { emits, fixMargin, props, useTextarea } from './useTextarea'

export { UniTextareaElement }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Textarea',
  props,
  emits,
  rootElement: {
    name: 'uni-textarea',
    class: UniTextareaElement,
  },
  setup(props, context) {
    const {
      rootRef,
      wrapperRef,
      fieldRef,
      state,
      scopedAttrsState,
      fixDisabledColor,
      valueCompute,
      lineRef,
      onResize,
      onChange,
      onKeyDownEnter,
      onKeyUpEnter,
    } = useTextarea(props, context)
    // 每个活动分支创建自己的输入 Block，避免复用已卸载的响应式作用域。
    const renderTextarea = () => (
      <>
        {props.disabled && fixDisabledColor ? (
          <textarea
            key="disabled-textarea"
            ref={fieldRef}
            value={state.value}
            tabindex="-1"
            readonly={!!props.disabled}
            maxlength={state.maxlength}
            class={{
              'uni-textarea-textarea': true,
              'uni-textarea-textarea-fix-margin': fixMargin,
            }}
            style={{
              overflowY: props.autoHeight ? 'hidden' : 'auto',
              /* eslint-disable no-restricted-syntax */
              ...(props.cursorColor && { caretColor: props.cursorColor }),
            }}
            // fix: 禁止 readonly 状态获取焦点
            onFocus={(event: Event) =>
              (event.target as HTMLInputElement).blur()
            }
          />
        ) : (
          <textarea
            key="textarea"
            ref={fieldRef}
            value={state.value}
            disabled={!!props.disabled}
            maxlength={state.maxlength}
            enterkeyhint={props.confirmType}
            inputmode={props.inputmode as HTMLAttributes['inputmode']}
            class={{
              'uni-textarea-textarea': true,
              'uni-textarea-textarea-fix-margin': fixMargin,
            }}
            style={{
              overflowY: props.autoHeight ? 'hidden' : 'auto',
              /* eslint-disable no-restricted-syntax */
              ...(props.cursorColor && { caretColor: props.cursorColor }),
            }}
            onKeydown={onKeyDownEnter}
            onKeyup={onKeyUpEnter}
            onChange={onChange}
          />
        )}
      </>
    )
    const root = (
      <div
        uni-textarea=""
        uni-view=""
        ref={rootRef}
        auto-height={props.autoHeight}
      >
        <div ref={wrapperRef} class="uni-textarea-wrapper">
          <div
            v-show={!state.value.length}
            {...scopedAttrsState.attrs}
            style={props.placeholderStyle}
            class={['uni-textarea-placeholder', props.placeholderClass]}
          >
            {props.placeholder}
          </div>
          <div ref={lineRef} class="uni-textarea-line">
            {' '}
          </div>
          <div
            class={{
              'uni-textarea-compute': true,
              'uni-textarea-compute-auto-height': props.autoHeight,
            }}
          >
            {valueCompute.value.map((item) => (
              <div>{item.trim() ? item : '.'}</div>
            ))}
            {}
            <ResizeSensor initial onResize={onResize} />
          </div>
          {props.confirmType === 'search' ? (
            <form
              action=""
              onSubmit={(event) => event.preventDefault()}
              class="uni-input-form"
            >
              {renderTextarea()}
            </form>
          ) : (
            renderTextarea()
          )}
        </div>
      </div>
    )

    // 在外部 ref 可见前绑定能力；value 继续读取组件状态，写入只修改当前 textarea。
    initTextareaElement(root, state)
    return root
  },
})

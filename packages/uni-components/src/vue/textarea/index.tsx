import { fieldSelectionProbeStyle } from '../../helpers/useFieldSelection'
import { type HTMLAttributes, onMounted } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import ResizeSensor from '../resize-sensor/index'
import { emits, fixMargin, props, useTextarea } from './useTextarea'

export class UniTextareaElement extends UniElement {
  focus(options?: FocusOptions | undefined): void {
    this.querySelector('textarea')?.focus(options)
  }
}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Textarea',
  props,
  emits,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-textarea',
    class: UniTextareaElement,
  },
  //#endif
  setup(props, context) {
    const {
      rootRef,
      wrapperRef,
      fieldRef,
      state,
      scopedAttrsState,
      selectionRef,
      fixDisabledColor,
      valueCompute,
      lineRef,
      onResize,
      onChange,
      onKeyDownEnter,
      onKeyUpEnter,
    } = useTextarea(props, context)
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniTextareaElement
      Object.defineProperty(rootElement, 'value', {
        get() {
          return state.value
        },
        set(value: string) {
          rootElement.querySelector('textarea')!.value = value
        },
      })
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      let textareaNode =
        props.disabled && fixDisabledColor ? (
          <textarea
            key="disabled-textarea"
            ref={fieldRef}
            value={state.value}
            tabindex="-1"
            readonly={!!props.disabled}
            maxlength={state.maxlength}
            class={{
              'uni-textarea-textarea': true,
              'uni-field-selection':
                __PLATFORM__ === 'h5' && !!props.selectionClass,
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
              'uni-field-selection':
                __PLATFORM__ === 'h5' && !!props.selectionClass,
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
        )
      return (
        <uni-textarea ref={rootRef} auto-height={props.autoHeight}>
          <div ref={wrapperRef} class="uni-textarea-wrapper">
            {__PLATFORM__ === 'h5' && props.selectionClass && (
              <div
                ref={selectionRef}
                {...scopedAttrsState.attrs}
                class={['uni-field-selection-probe', props.selectionClass]}
                aria-hidden="true"
                style={fieldSelectionProbeStyle}
              />
            )}
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
              <form action="" onSubmit={() => false} class="uni-input-form">
                {textareaNode}
              </form>
            ) : (
              textareaNode
            )}
          </div>
        </uni-textarea>
      )
    }
  },
})

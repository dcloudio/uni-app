import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { initI18nButtonMsgsOnce, useI18n } from '@dcloudio/uni-core'
import { defineBuiltInComponent } from '../../helpers/component'
import { useHover } from '../../helpers/useHover'
import { useBooleanAttr } from '../../helpers/useBooleanAttr'
import { withWebEvent } from '../../helpers/useEvent'
//#if _X_VAPOR_
import { useVaporButton } from '../../helpers/form-vapor'
//#else
import { type UniFormCtx, uniFormKey } from '../form'
import { type UniLabelCtx, uniLabelKey } from '../label'
//#endif
import { useListeners } from '../../helpers/useListeners'
import { buttonProps } from '../../components/button'
import { UniElement } from '../../helpers/UniElement'

export class UniButtonElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Button',
  props: buttonProps,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-button',
    class: UniButtonElement,
  },
  //#endif
  setup(props, { slots }) {
    const rootRef = ref<HTMLElement | null>(null)
    if (__PLATFORM__ === 'app' && __PLUS__) {
      initI18nButtonMsgsOnce()
    }
    // prettier-ignore
    const uniForm =
    //#if _X_VAPOR_
      useVaporButton(props, rootRef)
    //#else
    inject<UniFormCtx>(uniFormKey, false as unknown as UniFormCtx)
    //#endif
    const { hovering, binding } = useHover(props)
    const { t } = /*#__PURE__*/ useI18n()
    const onClick = withWebEvent((e: Event, isLabelClick: boolean) => {
      if (props.disabled) {
        return e.stopImmediatePropagation()
      }
      if (isLabelClick) {
        rootRef.value!.click()
      }
      const formType = props.formType
      if (formType) {
        if (!uniForm) {
          return
        }
        if (formType === 'submit') {
          uniForm.submit(e)
        } else if (formType === 'reset') {
          uniForm.reset(e)
        }
        return
      }
      if (__PLATFORM__ === 'app' && __PLUS__ && props.openType === 'feedback') {
        openFeedback(
          t('uni.button.feedback.title'),
          t('uni.button.feedback.send')
        )
      }
    })

    //#if !_X_VAPOR_
    const uniLabel = inject<UniLabelCtx>(
      uniLabelKey,
      false as unknown as UniLabelCtx
    )
    if (uniLabel) {
      uniLabel.addHandler(onClick)
      onBeforeUnmount(() => {
        uniLabel.removeHandler(onClick)
      })
    }
    //#endif
    useListeners(props, { 'label-click': onClick })
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniButtonElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      const hoverClass = props.hoverClass
      const booleanAttrs = useBooleanAttr(props, 'disabled')
      const loadingAttrs = useBooleanAttr(props, 'loading')
      const plainAttrs = useBooleanAttr(props, 'plain')
      const hasHoverClass = hoverClass && hoverClass !== 'none'

      return (
        <uni-button
          ref={rootRef}
          onClick={onClick}
          id={props.id}
          class={hasHoverClass && hovering.value ? hoverClass : ''}
          {...(hasHoverClass && binding)}
          {...booleanAttrs}
          {...loadingAttrs}
          {...plainAttrs}
        >
          {slots.default && slots.default()}
        </uni-button>
      )
    }
  },
})

function openFeedback(titleText: string, sendText: string) {
  const feedback = plus.webview.create(
    'https://service.dcloud.net.cn/uniapp/feedback.html',
    'feedback',
    {
      titleNView: {
        titleText,
        autoBackButton: true,
        backgroundColor: '#F7F7F7',
        titleColor: '#007aff',
        buttons: [
          {
            text: sendText,
            color: '#007aff',
            fontSize: '16px',
            fontWeight: 'bold',
            onclick: function () {
              feedback.evalJS(
                'typeof mui !== "undefined" && mui.trigger(document.getElementById("submit"),"tap")'
              )
            },
          },
        ],
      },
    }
  )
  feedback.show('slide-in-right')
}

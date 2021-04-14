import { defineComponent, inject } from 'vue'
import { useI18n, initI18nButtonMsgs } from '@dcloudio/uni-core'
import { useHover } from '../../helpers/useHover'
import { useBooleanAttr } from '../../helpers/useBooleanAttr'
import { UniFormCtx, uniFormKey } from '../form'

if (__PLATFORM__ === 'app-plus') {
  initI18nButtonMsgs()
}

export default defineComponent({
  name: 'Button',
  props: {
    id: {
      type: String,
      default: '',
    },
    hoverClass: {
      type: String,
      default: 'button-hover',
    },
    hoverStartTime: {
      type: [Number, String],
      default: 20,
    },
    hoverStayTime: {
      type: [Number, String],
      default: 70,
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: [Boolean, String],
      default: false,
    },
    formType: {
      type: String,
      default: '',
    },
    openType: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    const uniForm = inject<UniFormCtx>(uniFormKey)
    const { hovering, binding } = useHover(props)
    const { t } = useI18n()
    function onClick() {
      if (props.disabled) {
        return
      }
      const formType = props.formType
      if (formType) {
        if (!uniForm) {
          return
        }
        if (formType === 'submit') {
          uniForm.submit()
        } else if (formType === 'reset') {
          uniForm.reset()
        }
        return
      }
      if (__PLATFORM__ === 'app-plus' && props.openType === 'feedback') {
        openFeedback(
          t('uni.button.feedback.title'),
          t('uni.button.feedback.send')
        )
      }
    }
    return () => {
      const hoverClass = props.hoverClass
      const booleanAttrs = useBooleanAttr(props, 'disabled')
      if (hoverClass && hoverClass !== 'none') {
        return (
          <uni-button
            onClick={onClick}
            class={hovering.value ? hoverClass : ''}
            {...binding}
            {...booleanAttrs}
          >
            {slots.default && slots.default()}
          </uni-button>
        )
      }
      return (
        <uni-button onClick={onClick} {...booleanAttrs}>
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
                'mui&&mui.trigger(document.getElementById("submit"),"tap")'
              )
            },
          },
        ],
      },
    }
  )
  feedback.show('slide-in-right')
}

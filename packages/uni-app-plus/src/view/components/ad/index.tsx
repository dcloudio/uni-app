import { type Ref, onBeforeUnmount, ref, watch } from 'vue'
import {
  type EmitEvent,
  defineBuiltInComponent,
  useCustomEvent,
} from '@dcloudio/uni-components'
import { useNative, useNativeAttrs } from '../../../helpers/useNative'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Ad',
  props: {
    adpid: {
      type: [Number, String],
      default: '',
    },
    data: {
      type: Object,
      default: null,
    },
    dataCount: {
      type: Number,
      default: 5,
    },
    channel: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const containerRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const attrs = useNativeAttrs(props, ['id'])
    const { position, onParentReady } = useNative(containerRef)

    let adView: ReturnType<typeof plus.ad.createAdView>

    onParentReady(() => {
      adView = plus.ad.createAdView(Object.assign({}, attrs.value, position))
      plus.webview.currentWebview().append(adView as any)

      adView.setDislikeListener((data) => {
        ;(containerRef.value as HTMLElement).style.height = '0'
        window.dispatchEvent(new CustomEvent('updateview'))
        trigger('close', {} as Event, data)
      })
      adView.setRenderingListener((data) => {
        if (data.result === 0) {
          ;(containerRef.value as HTMLElement).style.height = data.height + 'px'
          window.dispatchEvent(new CustomEvent('updateview'))
        } else {
          trigger('error', {} as Event, {
            errCode: data.result,
          })
        }
      })
      adView.setAdClickedListener(() => {
        trigger('adclicked', {} as Event, {})
      })

      watch(
        () => position,
        (position) => adView.setStyle(position),
        { deep: true }
      )
      watch(
        () => props.adpid,
        (val) => {
          if (val) {
            loadData()
          }
        }
      )
      watch(
        () => props.data,
        (val) => {
          if (val) {
            adView.renderingBind(val)
          }
        }
      )

      function loadData() {
        let args = {
          adpid: props.adpid,
          width: position.width,
          count: props.dataCount,
        }
        if (props.channel !== undefined) {
          ;(args as any).ext = {
            channel: props.channel,
          }
        }
        UniViewJSBridge.invokeServiceMethod(
          'getAdData',
          args,
          ({ code, data, message }) => {
            if (code === 0) {
              adView.renderingBind(data)
              trigger('load', {} as Event, {})
            } else {
              trigger('error', {} as Event, {
                errMsg: message,
              })
            }
          }
        )
      }

      if (props.adpid) {
        loadData()
      }
    })

    onBeforeUnmount(() => {
      if (adView) {
        adView.close()
      }
    })

    return () => {
      return (
        <uni-ad ref={rootRef}>
          <div ref={containerRef} class="uni-ad-container" />
        </uni-ad>
      )
    }
  },
})

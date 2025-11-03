import { type ExtractPropTypes, onMounted, ref, watch } from 'vue'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { UniElement } from '@dcloudio/uni-components'

const props = {
  scrollTop: {
    type: [String, Number],
    default: 0,
  },
}

type Props = ExtractPropTypes<typeof props>

export class UniCoverViewElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'CoverView',
  compatConfig: {
    MODE: 3,
  },
  props,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-cover-view',
    class: UniCoverViewElement,
  },
  //#endif
  setup(props, { slots }) {
    const root = ref<HTMLElement | null>(null)
    const content = ref<HTMLElement | null>(null)

    watch(
      () => props.scrollTop,
      (val) => {
        setScrollTop(val)
      }
    )

    function setScrollTop(val: Props['scrollTop']) {
      let _content = content.value!
      if (getComputedStyle(_content).overflowY === 'scroll') {
        _content.scrollTop = _upx2pxNum(val)
      }
    }

    function _upx2pxNum(val: Props['scrollTop']) {
      let _val = String(val)
      if (/\d+[ur]px$/i.test(_val)) {
        _val.replace(/\d+[ur]px$/i, (text) => {
          return String(uni.upx2px(parseFloat(text)))
        })
      }
      return parseFloat(_val) || 0
    }

    onMounted(() => {
      setScrollTop(props.scrollTop)
    })

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = root.value as UniCoverViewElement
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      return (
        <uni-cover-view scroll-top={props.scrollTop} ref={root}>
          <div ref={content} class="uni-cover-view">
            {slots.default && slots.default()}
          </div>
        </uni-cover-view>
      )
    }
  },
})

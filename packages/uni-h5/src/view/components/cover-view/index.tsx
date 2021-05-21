import { ref, ExtractPropTypes, watch, onMounted } from 'vue'
import { defineBuiltInComponent } from '@dcloudio/uni-components'

const props = {
  scrollTop: {
    type: [String, Number],
    default: 0,
  },
}

type Props = ExtractPropTypes<typeof props>

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'CoverView',
  compatConfig: {
    MODE: 3,
  },
  props,
  setup(props, { slots }) {
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

    return () => {
      return (
        <uni-cover-view scroll-top={props.scrollTop}>
          <div ref={content} class="uni-cover-view">
            {slots.default && slots.default()}
          </div>
        </uni-cover-view>
      )
    }
  },
})

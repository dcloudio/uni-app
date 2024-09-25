import { computed, ref, watch } from 'vue'
import { defineBuiltInComponent } from '@dcloudio/uni-components'

const props = {
  tag: {
    type: String,
    default: '',
  },
  options: {
    type: Object,
    default() {
      return {}
    },
  },
}

let index = 0

export default /*#__PURE__*/ defineBuiltInComponent({
  props,
  setup(props, { expose, attrs }) {
    const clickRef = ref(0)
    const elId = String(index++)
    const src = computed(() => {
      const on: string[] = []
      const options = Object.assign({}, props.options, {
        click: clickRef.value,
        on: on,
      })
      Object.keys(attrs).forEach((key) => {
        if (/^on[A-Z]/.test(key)) {
          on.push(key.slice(2).toLowerCase())
        }
      })
      return `${elId}#${encodeURIComponent(JSON.stringify(options))}`
    })
    const srcValue = src.value
    watch(src, (srcValue) => {
      harmonyChannel.invokeSync('onNativeEmbedLifecycleChange', [srcValue])
    })
    function click() {
      clickRef.value++
    }
    expose({
      click,
      elId,
    })
    return () => (
      <embed
        el-id={elId}
        type={`native/${props.tag}`}
        src={srcValue}
        {...attrs}
      />
    )
  },
})

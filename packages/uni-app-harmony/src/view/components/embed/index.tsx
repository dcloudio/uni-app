import { type PropType, computed, watch } from 'vue'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { invokeHarmonyChannel } from '../../plus'

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
  methods: {
    type: Array as PropType<string[]>,
    default() {
      return []
    },
  },
}

let index = 0

export default /*#__PURE__*/ defineBuiltInComponent({
  props,
  setup(props, { expose, attrs }) {
    const elId = String(index++)
    const src = computed(() => {
      const on: string[] = []
      const options = Object.assign({}, props.options, {
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
      invokeHarmonyChannel('onNativeEmbedLifecycleChange', [srcValue])
    })
    const exposed = {
      elId,
    }
    props.methods.forEach((method) => {
      exposed[method] = (...args: any[]) => {
        invokeHarmonyChannel('invokeNativeEmbed', [elId, method, args])
      }
    })
    expose(exposed)
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

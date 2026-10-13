import { onMounted, ref } from 'vue'
import {
  type EmitEvent,
  defineBuiltInComponent,
  useCustomEvent,
} from '@dcloudio/uni-components'
//#if _X_VAPOR_
import { renderRichText as renderVaporRichText } from './render-vapor'
//#else
import { renderRichText as renderVDomRichText } from './render-vdom'
//#endif
import { props } from '../../components/rich-text'
import { UniElement } from '../../helpers/UniElement'

// prettier-ignore
const renderRichText =
//#if _X_VAPOR_
  renderVaporRichText
//#else
renderVDomRichText
//#endif

export class UniRichTextElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'RichText',
  compatConfig: {
    MODE: 3,
  },
  props,
  emits: ['itemclick'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-rich-text',
    class: UniRichTextElement,
  },
  //#endif
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    function triggerItemClick(e: Event, detail = {}) {
      trigger('itemclick', e, detail)
    }

    const result = renderRichText(props, rootRef, triggerItemClick)

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniRichTextElement
      rootElement.attachVmProps(props)
    })
    //#endif

    return result
  },
})

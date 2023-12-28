import { extend } from '@vue/shared'
import { Ref, ref, onMounted } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { useCustomEvent } from '../../helpers/useEvent'
import { UniElement } from '../../helpers/UniElement'
import {
  props as keyboardProps,
  emit as keyboardEmit,
  useKeyboard,
} from '../../helpers/useKeyboard'
import { useQuill } from './quill'

const props = /*#__PURE__*/ extend({}, keyboardProps, {
  id: {
    type: String,
    default: '',
  },
  readOnly: {
    type: [Boolean, String],
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  showImgSize: {
    type: [Boolean, String],
    default: false,
  },
  showImgToolbar: {
    type: [Boolean, String],
    default: false,
  },
  showImgResize: {
    type: [Boolean, String],
    default: false,
  },
})

class UniEditorElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Editor',
  props,
  emit: ['ready', 'focus', 'blur', 'input', 'statuschange', ...keyboardEmit],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-editor',
    class: UniEditorElement,
  },
  //#endif
  setup(props, { emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent(rootRef, emit)
    useQuill(props, rootRef, trigger)
    useKeyboard(props, rootRef, trigger)
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniEditorElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      return <uni-editor ref={rootRef} id={props.id} class="ql-container" />
    }
  },
})

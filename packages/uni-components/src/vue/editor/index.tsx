import { onMounted } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import { editorEmit, editorProps, useEditor } from './useEditor'

export class UniEditorElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Editor',
  props: editorProps,
  emits: editorEmit,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-editor',
    class: UniEditorElement,
  },
  //#endif
  setup(props, { emit }) {
    const rootRef = useEditor(props, emit)
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

import { defineBuiltInComponent } from '../../helpers/component'
import { UniViewElement } from '../web-vapor-elements'
import { editorEmit, editorProps, useEditor } from './useEditor'

// 只提供逻辑类型，根节点由模板创建，不构造或注册 Custom Element。
export class UniEditorElement extends UniViewElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniEditorElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-editor')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
}

const uniTagName = { value: 'EDITOR' }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Editor',
  props: editorProps,
  emits: editorEmit,
  // TODO native 仅用于迁移期间跳过旧注册流程，Vapor 旧组件全部迁移后移除。
  rootElement: {
    name: 'uni-editor',
    class: UniEditorElement,
    native: true,
  },
  setup(props, { emit }) {
    const rootRef = useEditor(props, emit)
    const root = (
      <div
        uni-editor=""
        uni-view=""
        ref={rootRef}
        id={props.id}
        class="ql-container"
      />
    )
    // 在外部 ref 和 Quill 初始化可见前设置一次类型标识，不包装原生属性 API。
    Object.defineProperty(root, 'uniTagName', uniTagName)
    return root
  },
})

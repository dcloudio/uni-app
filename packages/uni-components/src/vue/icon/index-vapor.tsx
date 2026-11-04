import { createSvgIconVNode, rpx2px } from '@dcloudio/uni-core'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniViewElement } from '../web-vapor-elements'
import { iconProps, useIcon } from './useIcon'

// 只提供逻辑类型，根节点仍由模板创建，不构造或注册 Custom Element。
export class UniIconElement extends UniViewElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniIconElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-icon')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
}

const uniTagName = { value: 'ICON' }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Icon',
  props: iconProps,
  rootElement: { name: 'uni-icon', class: UniIconElement },
  setup(props) {
    const path = useIcon(props)
    const root = (
      <div uni-icon="" uni-view="">
        {path.value &&
          path.value.d &&
          createSvgIconVNode(
            path.value.d,
            props.color || path.value.c,
            rpx2px(props.size)
          )}
      </div>
    )
    // Icon 没有专有方法，只需在外部 ref 可见前标记一次组件类型。
    Object.defineProperty(root, 'uniTagName', uniTagName)
    return root
  },
})

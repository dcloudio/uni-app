// @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
import { initUniElement } from 'vue'
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
    // 在外部 ref 可见前初始化根节点身份和 props 读取。
    initUniElement(root, uniTagName)
    return root
  },
})

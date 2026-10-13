import {
  type ExtractPropTypes,
  type Ref,
  computed,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  createPlainElement,
  getCurrentInstance,
} from 'vue'
import { isString } from '@vue/shared'
import type { props as richTextProps } from '../../components/rich-text'
import { parseHtml } from '../../components/rich-text'
import { nodeList2Block } from './nodes-parser-vapor'

export function renderRichText(
  props: ExtractPropTypes<typeof richTextProps>,
  rootRef: Ref<HTMLElement | null>,
  triggerItemClick: Function
) {
  const vm = getCurrentInstance()
  const nodes = computed(() =>
    isString(props.nodes) ? parseHtml(props.nodes) : props.nodes
  )
  const root = createPlainElement(
    'uni-rich-text',
    {
      selectable: () => (props.userSelect || props.selectable ? true : null),
    },
    {
      default: () =>
        createPlainElement('div', null, {
          default: () =>
            // 与 VDOM vnode.scopeId 对应，保留调用方的作用域样式。
            nodeList2Block(
              () => nodes.value,
              (vm as any).scopeId || '',
              triggerItemClick
            ),
        }),
    },
    true
  )
  rootRef.value = root
  return root
}

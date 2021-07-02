import { UniNodeJSON } from '@dcloudio/uni-shared'
import { $, setElementAttr } from './utils'

export function onNodeInsert(
  nodeId: number,
  parentNodeId: number,
  refNodeId: number,
  nodeJson: Partial<UniNodeJSON>
) {
  const element = $(nodeId)
  $(parentNodeId).insertBefore(initElement(element, nodeJson), $(refNodeId))
}

function initElement(element: Element, { a, s }: Partial<UniNodeJSON>) {
  initAttribute(element, a)
  // TODO style
  return element
}

function initAttribute(element: Element, attr?: Record<string, unknown>) {
  if (!attr) {
    return
  }
  Object.keys(attr).forEach((name) => setElementAttr(element, name, attr[name]))
}

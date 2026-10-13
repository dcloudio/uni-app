import {
  type ComputedRef,
  type EffectScope,
  computed,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  createFor,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  createKeyedFragment,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  createPlainElement,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  createTextNode,
  effectScope,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  insert,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  remove,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  renderEffect,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  setDynamicProps,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  setText,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  syncSelectValue,
  toRaw,
} from 'vue'
import {
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor shared 已导出该枚举
  Namespaces,
  extend,
  hasOwn,
  isPlainObject,
  isString,
} from '@vue/shared'
import {
  type Node,
  decodeEntities,
  normalizeAttrs,
  processClickEvent,
} from './nodes-parser'

function nodeType(node: Node) {
  if (!isPlainObject(node)) return ''
  if (
    (!hasOwn(node, 'type') || node.type === 'text') &&
    isString(node.text) &&
    node.text !== ''
  ) {
    return '#text'
  }
  return (!hasOwn(node, 'type') || node.type === 'node') &&
    isString(node.name) &&
    node.name
    ? node.name
    : ''
}

function hasContent(attrs?: Data) {
  return (
    attrs &&
    (attrs.innerHTML != null ||
      attrs.textContent != null ||
      attrs['.innerHTML'] != null ||
      attrs['.textContent'] != null)
  )
}

function nodeKey(node: Node) {
  if (!isPlainObject(node?.attrs)) return
  const key = node.attrs.key
  if (key == null || node.type === 'text') return
  // 显式 node 的 key 不依赖标签；缺省类型仍保留 text 优先规则。
  if (!hasOwn(node, 'type') && isString(node.text) && node.text !== '') return
  return key
}

// 复用 Vapor 的列表/分支更新，不创建 VNode，也不在数据变化时整棵替换 DOM。
export function nodeList2Block(
  source: () => Node[] | undefined,
  scopeId: string,
  triggerItemClick: Function,
  namespace: () => number = () => Namespaces.HTML
): ReturnType<typeof createFor> {
  type Identity = { key: any; type: string; id: any }
  let previous: Identity[] = []
  let hadUnkeyed = false
  let renderedTypes: Map<any, string> | undefined
  const unkeyedTypes = new WeakMap<Node, ComputedRef<string>>()
  function unkeyedType(node: Node) {
    if (!isPlainObject(node)) return ''
    let type = unkeyedTypes.get(node)
    if (!type) unkeyedTypes.set(node, (type = computed(() => nodeType(node))))
    return type.value
  }
  const keyedSource = computed(() => {
    const nodes = source() || []
    if (!nodes.length) {
      previous = []
      hadUnkeyed = false
      renderedTypes = undefined
      return { nodes, keys: [] }
    }
    let hasUnkeyed = false
    const next: Identity[] = Array.from(nodes, (node) => {
      const key = nodeKey(node)
      if (key == null) hasUnkeyed = true
      return {
        key,
        // 显式 key 的标签更新由节点分支处理，不订阅整个列表。
        type:
          key != null
            ? hadUnkeyed
              ? nodeType(toRaw(node))
              : ''
            : unkeyedType(node),
        id: key,
      }
    })
    const same = (old: Identity, entry: Identity) =>
      old.key === entry.key &&
      (renderedTypes?.get(old.id) ?? old.type) === entry.type
    let start = 0
    let oldEnd = previous.length - 1
    let newEnd = next.length - 1
    // 与 VDOM 一致：先同步首尾，再按类型顺序匹配中间的无 key 节点。
    while (
      start <= oldEnd &&
      start <= newEnd &&
      same(previous[start], next[start])
    ) {
      next[start].id = previous[start].id
      start++
    }
    while (
      start <= oldEnd &&
      start <= newEnd &&
      same(previous[oldEnd], next[newEnd])
    ) {
      next[newEnd--].id = previous[oldEnd--].id
    }
    let unkeyed: Map<string, any[]> | undefined
    for (let i = oldEnd; i >= start; i--) {
      const entry = previous[i]
      if (entry.key != null) continue
      const pool = unkeyed || (unkeyed = new Map())
      let ids = pool.get(entry.type)
      if (!ids) pool.set(entry.type, (ids = []))
      ids.push(entry.id)
    }
    for (let i = start; i <= newEnd; i++) {
      const entry = next[i]
      if (entry.key == null)
        entry.id = unkeyed?.get(entry.type)?.pop() ?? Symbol()
    }
    const keys: any[] = []
    let nextRenderedTypes: Map<any, string> | undefined
    for (const entry of next) {
      keys.push(entry.id)
      if (entry.key != null) {
        const types = nextRenderedTypes || (nextRenderedTypes = new Map())
        types.set(entry.id, renderedTypes?.get(entry.id) ?? entry.type)
      }
    }
    renderedTypes = nextRenderedTypes
    previous = next
    hadUnkeyed = hasUnkeyed
    return { nodes, keys }
  })
  return createFor(
    () => keyedSource.value.nodes,
    (item) =>
      createKeyedFragment(
        () => {
          const type = nodeType(item.value)
          const key = nodeKey(item.value)
          if (key != null) renderedTypes!.set(key, type)
          return type + ':' + namespace()
        },
        () => {
          const name = nodeType(item.value)
          if (!name) return []
          if (name === '#text') {
            const text = createTextNode()
            renderEffect(() => setText(text, decodeEntities(item.value.text)))
            return text
          }
          const ns =
            name === 'svg'
              ? Namespaces.SVG
              : name === 'math'
              ? Namespaces.MATH_ML
              : namespace()
          const element = createPlainElement(name, null, null, false, false, ns)
          let childScope: EffectScope | undefined
          let children: ReturnType<typeof createFor>
          renderEffect(() => {
            const node = item.value
            const attrs = normalizeAttrs(name.toLowerCase(), node.attrs)
            const content = hasContent(attrs)
            // 先停止并移除子列表，再设置内容属性，避免清掉仍在使用的锚点。
            if (content && childScope) {
              childScope.stop()
              remove(children, element)
              children = undefined
              childScope = undefined
            }
            setDynamicProps(
              element,
              [
                extend(
                  scopeId ? { [scopeId]: '' } : {},
                  processClickEvent(node, triggerItemClick),
                  attrs
                ),
              ],
              undefined,
              ns === Namespaces.SVG
            )
            if (!content && !childScope && node.children?.length) {
              childScope = effectScope()
              children = childScope.run(() =>
                nodeList2Block(
                  () => item.value.children || [],
                  scopeId,
                  triggerItemClick,
                  () =>
                    (ns === Namespaces.SVG && name === 'foreignObject') ||
                    (ns === Namespaces.MATH_ML &&
                      name === 'annotation-xml' &&
                      item.value.attrs?.encoding?.includes('html'))
                      ? Namespaces.HTML
                      : ns
                )
              )
              insert(children, element)
            }
          })
          // 初次设置 value 时 option 尚未插入；后续更新复用 setValue 注册的标准同步机制。
          if (element.tagName === 'SELECT') syncSelectValue(element)
          return element
        }
      ),
    (_node, index) => keyedSource.value.keys[index]
  )
}

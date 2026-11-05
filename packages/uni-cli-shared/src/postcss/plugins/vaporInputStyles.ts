import postcss, { type ChildNode, type Container, type Root } from 'postcss'
import selectorParser from 'postcss-selector-parser'
import {
  INPUT_PLACEHOLDER_CLASS,
  INPUT_PLACEHOLDER_CLASS_LAYER,
  INPUT_PLACEHOLDER_IMPORTANT_LAYER,
  INPUT_SELECTION_CLASS,
  INPUT_SELECTION_PROBE,
  inputStyleDeclarations,
} from '@dcloudio/uni-shared'

// 将外部类直接应用到原生伪元素，由浏览器处理声明有效性、简写、变量和重置。
// 类名只放在专用属性里，不影响输入框本身的 class。
const classPseudos = new Set([':is', ':where', ':not'])

function mapTargetClasses(
  nodes: selectorParser.Node[],
  attribute: string,
  inFunction = false
): boolean | undefined {
  let found = false
  for (const node of nodes) {
    if (node.type === 'class') {
      const replacement = selectorParser.attribute({
        attribute,
        operator: '~=',
        value: node.value,
        quoteMark: '"',
        raws: {},
      })
      replacement.setValue(node.value, { quoteMark: '"' })
      node.replaceWith(replacement)
      found = true
    } else if (node.type === 'tag') {
      if (inFunction || node.value !== 'div') return
      node.value = 'input'
    } else if (
      node.type === 'id' ||
      node.type === 'nesting' ||
      (node.type === 'attribute' && node.attribute.startsWith('uni-'))
    ) {
      return
    } else if (node.type === 'pseudo') {
      if (node.value.startsWith('::')) return
      if (!classPseudos.has(node.value)) continue
      // 只转换由 class/属性组成的函数分支；不重建混合标签、ID 的旧 DOM 语义。
      for (const selector of node.nodes) {
        if (selector.nodes.some((child) => child.type === 'combinator')) return
        const mapped = mapTargetClasses(selector.nodes, attribute, true)
        if (mapped === undefined) return
        found = mapped || found
      }
    }
  }
  return found
}

// 旧 placeholder/probe 是 input 根的后代；最近的祖先条件也可能约束新宿主自身。
function collapseAncestor(item: selectorParser.Selector, start: number) {
  const nodes = item.nodes
  if (start >= 0 && !nodes[start].toString().trim()) {
    let ancestorStart = start - 1
    while (ancestorStart >= 0 && nodes[ancestorStart].type !== 'combinator')
      ancestorStart--
    const ancestor = nodes.slice(ancestorStart + 1, start)
    if (
      !ancestor.some(
        (node) =>
          (node.type === 'tag' && !['input', 'div'].includes(node.value)) ||
          (node.type === 'pseudo' &&
            (node.value.startsWith('::') ||
              /\[uni-(?!input\])/.test(node.toString())))
      )
    ) {
      const condition = selectorParser.selector({
        value: '',
        nodes: ancestor.map((node) => {
          const cloned = node.clone()
          if (cloned.type === 'tag' && cloned.value === 'div')
            cloned.value = 'input'
          return cloned
        }),
      })
      const merged = item.clone()
      merged.nodes
        .slice(ancestorStart + 1, start + 1)
        .forEach((node) => node.remove())
      merged.append(selectorParser.pseudo({ value: ':is', nodes: [condition] }))
      return merged
    }
  }
}

function targetSelector(selector: string, attribute: string) {
  const result = selectorParser().astSync(selector)
  const collapsed: selectorParser.Selector[] = []
  result.each((item) => {
    const nodes = item.nodes
    let start = nodes.length - 1
    while (start >= 0 && nodes[start].type !== 'combinator') start--
    const target = nodes.slice(start + 1)
    if (!mapTargetClasses(target, attribute)) {
      item.remove()
      return
    }
    const guard = selectorParser().astSync(':where([uni-input])').first!.first!
    item.append(guard)
    const merged = collapseAncestor(item, start)
    if (merged) collapsed.push(merged)
  })
  collapsed.forEach((selector) => result.append(selector))
  return result.toString()
}

// 原生嵌套仅支持单层 & / &.class；常规祖先关系由展开后的普通选择器处理。
function resolveSimpleNesting(selector: string, parent: string) {
  const child = selectorParser().astSync(selector)
  const inherited = selectorParser().astSync(parent)
  if (child.nodes.length !== 1 || inherited.nodes.length !== 1) return
  const nodes = child.first!.nodes
  if (nodes[0]?.type !== 'nesting') return
  let count = 0
  child.walkNesting(() => {
    count++
  })
  if (count !== 1 || nodes.some((node) => node.type === 'combinator')) return
  for (const node of nodes.slice(1)) inherited.first!.append(node.clone())
  return inherited.toString()
}

function hasSimpleNesting(source: Container): boolean {
  return (source.nodes || []).some((node) =>
    node.type === 'rule'
      ? node.selector.includes('&')
      : node.type === 'atrule' && !!node.nodes && hasSimpleNesting(node)
  )
}

// 分段输出保留声明顺序，条件规则透传上下文，不展开多层或多分支的 &。
function expandSimpleNesting(
  source: Container,
  target: Container,
  selector: string,
  nested = false
) {
  let declarations: ChildNode[] = []
  const flush = () => {
    if (declarations.length)
      target.append(
        postcss.rule({ selector, nodes: declarations, source: source.source })
      )
    declarations = []
  }
  for (const node of source.nodes || []) {
    if (node.type === 'decl' || node.type === 'comment') {
      declarations.push(node.clone())
      continue
    }
    flush()
    if (node.type === 'rule') {
      if (!node.selector.includes('&')) {
        target.append(
          postcss.rule({
            selector,
            nodes: [node.clone()],
            source: source.source,
          })
        )
      } else if (!nested) {
        const resolved = resolveSimpleNesting(node.selector, selector)
        if (resolved) expandSimpleNesting(node, target, resolved, true)
      }
    } else if (node.type === 'atrule') {
      const clone = node.clone({ nodes: node.nodes ? [] : undefined })
      if (node.nodes) expandSimpleNesting(node, clone, selector, nested)
      if (!node.nodes || clone.nodes?.length) target.append(clone)
    }
  }
  flush()
}

export function transformVaporInputStyles(root: Root) {
  // 整棵映射树放在同一层；inline 正常声明位于层外，important 位于更早的层。
  // 镜像业务 @layer 的顺序和嵌套，保留媒体查询、作用域和 revert-layer。
  root.nodes.slice().forEach((node) => {
    if (
      node.type === 'atrule' &&
      node.name === 'layer' &&
      node.params === INPUT_PLACEHOLDER_CLASS_LAYER
    ) {
      let generated = false
      node.walkRules((rule) => {
        if (
          rule.selector.includes(INPUT_PLACEHOLDER_CLASS) ||
          rule.selector.includes(INPUT_SELECTION_CLASS)
        )
          generated = true
      })
      if (generated) node.remove()
    }
  })
  const mapped = postcss.atRule({
    name: 'layer',
    params: INPUT_PLACEHOLDER_CLASS_LAYER,
    raws: { before: '\n', after: '\n' },
  })
  function mapDeclarations(source: Container, selection: boolean): ChildNode[] {
    const nodes: ChildNode[] = []
    for (const node of source.nodes || []) {
      if (node.type === 'decl') {
        const prop = node.prop.startsWith('--')
          ? node.prop
          : node.prop.toLowerCase()
        for (const [name, value] of inputStyleDeclarations(
          prop,
          node.value,
          selection
        )) {
          nodes.push(node.clone({ prop: name, value }))
        }
      } else if (node.type === 'atrule' && node.nodes) {
        // 嵌套条件中的声明仍属于当前选择器，保留位置和条件，不变成后代规则。
        const children = mapDeclarations(node, selection)
        if (children.length) nodes.push(node.clone({ nodes: children }))
      }
    }
    return nodes
  }
  function visit(source: Container, target: Container) {
    for (const node of source.nodes || []) {
      if (node.type === 'atrule') {
        if (
          node.name === 'layer' &&
          (node.params.includes(INPUT_PLACEHOLDER_CLASS_LAYER) ||
            node.params.includes(INPUT_PLACEHOLDER_IMPORTANT_LAYER))
        )
          continue
        const clone = node.clone({ nodes: node.nodes ? [] : undefined })
        clone.raws.before = '\n'
        if (node.nodes) visit(node, clone)
        if (clone.nodes?.length || (node.name === 'layer' && !node.nodes))
          target.append(clone)
      } else if (node.type === 'rule') {
        if (
          node.selector.includes(INPUT_PLACEHOLDER_CLASS) ||
          node.selector.includes(INPUT_SELECTION_CLASS)
        )
          continue
        if (hasSimpleNesting(node)) {
          const expanded = postcss.root()
          expandSimpleNesting(node, expanded, node.selector)
          visit(expanded, target)
          continue
        }
        for (const [attribute, selection, pseudo] of [
          [INPUT_PLACEHOLDER_CLASS, false, '::placeholder'],
          [INPUT_SELECTION_CLASS, true, INPUT_SELECTION_PROBE],
        ] as const) {
          const declarations = mapDeclarations(node, selection)
          if (!declarations.length) continue
          const selector = targetSelector(node.selector, attribute)
          if (!selector) continue
          const parsed = selectorParser().astSync(selector)
          parsed.each((item) => {
            // 旧选区探测节点只在设置 selection-class 时存在。
            // :not(.x) 等负向规则不能给未设置该属性的输入框开启自定义选区。
            if (selection) {
              item.append(
                selectorParser().astSync(
                  ':where([data-uni-selection-class]:not([data-uni-selection-class=""]))'
                ).first!.first!
              )
            }
            item.append(selectorParser.pseudo({ value: pseudo }))
          })
          const clone = node.clone({
            selector: parsed.toString(),
            nodes: declarations,
          })
          clone.raws.before = '\n'
          target.append(clone)
        }
        if (
          node.nodes.some(
            (child) => child.type === 'rule' || child.type === 'atrule'
          )
        ) {
          const nested = node.clone({ nodes: [] })
          nested.raws.before = '\n'
          visit(node, nested)
          if (nested.nodes.length) target.append(nested)
        }
      }
    }
  }
  visit(root, mapped)
  if (!mapped.nodes?.length) return
  const order = `${INPUT_PLACEHOLDER_IMPORTANT_LAYER}, ${INPUT_PLACEHOLDER_CLASS_LAYER}, uni-field-selection`
  if (
    !root.nodes.some(
      (node) =>
        node.type === 'atrule' &&
        node.name === 'layer' &&
        node.params === order &&
        !node.nodes
    )
  ) {
    root.prepend(postcss.atRule({ name: 'layer', params: order }))
  }
  root.append(mapped)
}

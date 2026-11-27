import path from 'node:path'
import postcss, {
  type AtRule,
  type Container,
  type Declaration,
  type Root,
  type Rule,
} from 'postcss'
import selectorParser from 'postcss-selector-parser'
import {
  INPUT_PLACEHOLDER_CLASS_LAYER,
  INPUT_PLACEHOLDER_CLASS_PREFIX,
  INPUT_PLACEHOLDER_IMPORTANT_LAYER,
  INPUT_PLACEHOLDER_LEGACY_CONDITION,
  isInputPlaceholderStyleProperty,
} from '@dcloudio/uni-shared'

const inputGuard = selectorParser().astSync(':where([uni-input])').first!.first!
const legacyInputGuard = selectorParser().astSync('[uni-input]').first!.first!
const neverMatches = selectorParser().astSync(':not(*)').first!.first!
const rootStatePseudos = new Set([':hover', ':active', ':focus-within'])
const layerOrder = `${INPUT_PLACEHOLDER_IMPORTANT_LAYER}, ${INPUT_PLACEHOLDER_CLASS_LAYER}`
const inputLayers = new Set([
  INPUT_PLACEHOLDER_CLASS_LAYER,
  INPUT_PLACEHOLDER_IMPORTANT_LAYER,
  layerOrder,
])
const generatedModernLayers = new WeakSet<AtRule['raws']>()
const legacyPlaceholderRE =
  /(?:::{0,1}-(?:moz|ms-input)|::-webkit-input)-placeholder\s*$/

function resolveNestedSelector(selector: string, parent: string) {
  const parents = selectorParser().astSync(parent).nodes
  const [first] = parents
  const compound =
    parents.length === 1 &&
    first.nodes.length > 0 &&
    first.nodes.every((node) => node.type !== 'combinator')
  const nested = selectorParser().astSync(selector)
  nested.each((item) => {
    let explicit = false
    item.walkNesting(() => {
      explicit = true
      return false
    })
    if (item.first?.type === 'combinator' || !explicit) {
      if (item.first?.type !== 'combinator') {
        item.prepend(selectorParser.combinator({ value: ' ' }))
      }
      item.prepend(selectorParser.nesting({ value: '&' }))
    }
    item.walkNesting((node) => {
      // 复杂父选择器和列表必须整体匹配，列表沿用最大选择器权重。
      if (!compound) {
        node.replaceWith(
          selectorParser.pseudo({
            value: ':is',
            nodes: parents.map((parent) => parent.clone()),
            spaces: { ...node.spaces },
          })
        )
        return
      }
      const replacements = first.nodes.map((node) => node.clone())
      replacements[0].spaces.before = node.spaces.before
      replacements[replacements.length - 1].spaces.after = node.spaces.after
      node.replaceWith(...replacements)
    })
  })
  return nested.toString()
}

function appendSelectorNode(
  selector: selectorParser.Selector,
  node: selectorParser.Selector['nodes'][number]
) {
  node.spaces.after = selector.last.spaces.after
  selector.last.spaces.after = ''
  selector.append(node)
}

function isDiv(node: selectorParser.Node) {
  return (
    node.type === 'tag' &&
    node.namespace === undefined &&
    node.value.toLowerCase() === 'div'
  )
}

function isScopedAttribute(node: selectorParser.Node) {
  return node.type === 'attribute' && node.attribute.startsWith('data-v-')
}

function lastCombinator(nodes: selectorParser.Node[]) {
  let index = nodes.length - 1
  while (index >= 0 && nodes[index].type !== 'combinator') index--
  return index
}

function mapTargetClasses(nodes: selectorParser.Node[], nested: boolean) {
  let found = false
  for (const node of nodes) {
    if (node.type === 'class') {
      node.value = INPUT_PLACEHOLDER_CLASS_PREFIX + node.value
      found = true
    } else if (node.type === 'tag' && isDiv(node)) {
      node.value = 'input'
    } else if (
      nested &&
      node.type === 'pseudo' &&
      node.value.toLowerCase() === ':is'
    ) {
      let matches = false
      for (const item of node.nodes) {
        if (!item.nodes.length) continue
        const start = lastCombinator(item.nodes)
        if (mapTargetClasses(item.nodes.slice(start + 1), nested)) {
          matches = true
        } else {
          // 未匹配的分支仍贡献父级列表的权重。
          appendSelectorNode(item, neverMatches.clone())
        }
      }
      if (!matches) return false
      found = true
    } else if (
      node.type !== 'comment' &&
      node.type !== 'universal' &&
      !isScopedAttribute(node)
    ) {
      return false
    }
  }
  return found
}

function mergeInputRootCondition(
  item: selectorParser.Selector,
  start: number,
  legacy: boolean,
  nested: boolean
) {
  if (start < 0) return
  const nodes = item.nodes
  let ancestorStart = start - 1
  while (ancestorStart >= 0 && nodes[ancestorStart].type !== 'combinator')
    ancestorStart--
  const ancestor = nodes.slice(ancestorStart + 1, start)
  // 后代条件可以匹配真实祖先，也可以匹配旧 Input 根的 ID、类或属性。
  if (
    !ancestor.every(
      (node) =>
        node.type === 'class' ||
        node.type === 'id' ||
        node.type === 'attribute' ||
        (node.type === 'tag' &&
          node.value === 'input' &&
          node.namespace === undefined) ||
        (node.type === 'pseudo' &&
          (rootStatePseudos.has(node.value.toLowerCase()) ||
            (nested && node.value.toLowerCase() === ':is') ||
            node.toString().trim() === ':where([uni-input])'))
    )
  )
    return

  const merged = item.clone()
  merged.nodes
    .slice(ancestorStart + 1, start + 1)
    .forEach((node) => node.remove())
  if (legacy) {
    // 旧浏览器也可能缺少 :is()。将匹配同一根节点的条件并入末端选择器。
    for (const node of ancestor) {
      if (node.type === 'tag') {
        const target = merged.nodes[ancestorStart + 1]
        if (target.type === 'universal') target.replaceWith(node.clone())
        else if (target.type !== 'tag')
          merged.insertBefore(target, node.clone())
      } else if (node.toString().trim() !== ':where([uni-input])') {
        const condition = node.clone()
        condition.spaces.before = ''
        appendSelectorNode(merged, condition)
      }
    }
    return merged
  }
  const condition = selectorParser.selector({
    value: '',
    nodes: ancestor.map((node) => node.clone()),
  })
  appendSelectorNode(
    merged,
    selectorParser.pseudo({ value: ':is', nodes: [condition] })
  )
  return merged
}

function expandLegacySelectorGroups(selector: selectorParser.Selector) {
  let result = [selector]
  for (let index = selector.nodes.length - 1; index >= 0; index--) {
    const group = selector.nodes[index]
    if (group.type !== 'pseudo' || group.value.toLowerCase() !== ':is') continue
    const alternatives = group.nodes.filter(
      (item) =>
        item.nodes.length &&
        !item.nodes.some((node) => node.toString().trim() === ':not(*)')
    )
    // 展开简单父级列表，同时限制组合数量，避免成倍增加规则体积。
    if (
      !alternatives.length ||
      alternatives.some((item) =>
        item.nodes.some((node) =>
          ['combinator', 'tag', 'universal'].includes(node.type)
        )
      ) ||
      result.length * alternatives.length > 32
    ) {
      continue
    }
    result = result.flatMap((item) =>
      alternatives.map((alternative) => {
        const expanded = item.clone()
        const replacements = alternative.nodes.map((node) => node.clone())
        const original = expanded.nodes[index]
        replacements[0].spaces.before = original.spaces.before
        replacements[replacements.length - 1].spaces.after =
          original.spaces.after
        original.replaceWith(...replacements)
        return expanded
      })
    )
  }
  return result
}

function placeholderSelector(
  result: selectorParser.Root,
  legacy: boolean,
  nested: boolean
) {
  const collapsed: selectorParser.Selector[] = []
  result.each((item) => {
    const nodes = item.nodes
    const start = lastCombinator(nodes)
    // 旧占位节点的直接父级和同级节点已经移除，保留原规则供其他元素使用。
    if (
      (start >= 0 && nodes[start].toString().trim()) ||
      !mapTargetClasses(nodes.slice(start + 1), nested)
    ) {
      item.remove()
      return
    }
    appendSelectorNode(item, (legacy ? legacyInputGuard : inputGuard).clone())
    const merged = mergeInputRootCondition(item, start, legacy, nested)
    if (merged) collapsed.push(merged)
  })
  collapsed.forEach((selector) => result.append(selector))
  result.each((item) => {
    appendSelectorNode(item, selectorParser.pseudo({ value: '::placeholder' }))
  })
  if (legacy && nested) {
    const selectors = result.nodes.flatMap(expandLegacySelectorGroups)
    result.removeAll()
    selectors.forEach((selector) => result.append(selector))
  }
  return result.toString()
}

function copyAtRule({ name, params, raws, source }: AtRule) {
  // clone({ nodes: [] }) 仍会先深拷贝整棵子树。
  const copiedRaws = { ...raws }
  if (raws.params) copiedRaws.params = { ...raws.params }
  return postcss.atRule({ name, params, raws: copiedRaws, source })
}

// 支持层叠层的浏览器已支持标准 ::placeholder，旧语法由独立的回退层生成。
export function removeRedundantPlaceholderPrefixes(root: Root) {
  for (const node of root.nodes) {
    if (node.type !== 'atrule' || !generatedModernLayers.has(node.raws))
      continue
    node.walkRules(legacyPlaceholderRE, (rule) => {
      if (
        rule.selectors.every((selector) => legacyPlaceholderRE.test(selector))
      ) {
        rule.remove()
      }
    })
  }
}

interface PlaceholderTargets {
  modern: Container
  legacy?: Container
}

interface PlaceholderRule {
  rule: Rule
  selector: string
  nested: boolean
  modern?: string
  legacy?: string
}

export function transformVaporInputStyles(root: Root, h5StyleDir?: string) {
  // 保留业务规则的位置和层叠顺序；再次处理时只替换本转换生成的规则。
  root.nodes.slice().forEach((node) => {
    if (
      node.type !== 'atrule' ||
      !(
        (node.name === 'layer' &&
          node.params === INPUT_PLACEHOLDER_CLASS_LAYER) ||
        (node.name === 'supports' &&
          node.params === INPUT_PLACEHOLDER_LEGACY_CONDITION)
      )
    )
      return
    node.walkRules((rule) => {
      if (rule.selector.includes(INPUT_PLACEHOLDER_CLASS_PREFIX)) {
        node.remove()
        return false
      }
    })
  })
  const mapped = postcss.atRule({
    name: 'layer',
    params: INPUT_PLACEHOLDER_CLASS_LAYER,
    raws: { before: '\n', between: ' ', after: '\n' },
  })
  const legacy = postcss.atRule({
    name: 'supports',
    params: INPUT_PLACEHOLDER_LEGACY_CONDITION,
    raws: { before: '\n', between: ' ', after: '\n' },
  })
  let hasMapping = false
  const frameworkFiles = new Map<string, boolean>()

  function isFrameworkStyle(rule: Rule) {
    // @import 展开后的规则各自保留来源，混入的业务 CSS 仍可定义动态占位类。
    const file = rule.source?.input.file
    if (!file || !h5StyleDir) return false
    const cached = frameworkFiles.get(file)
    if (cached !== undefined) return cached
    const relative = path.relative(h5StyleDir, file)
    const framework =
      !path.isAbsolute(relative) &&
      relative !== '..' &&
      !relative.startsWith(`..${path.sep}`)
    frameworkFiles.set(file, framework)
    return framework
  }

  function emitDeclarations(
    context: PlaceholderRule,
    declarations: [Declaration, string][],
    targets: PlaceholderTargets
  ) {
    if (context.modern === undefined) {
      context.modern = placeholderSelector(
        selectorParser().astSync(context.selector),
        false,
        context.nested
      )
    }
    if (!context.modern) return
    if (targets.legacy && context.legacy === undefined) {
      context.legacy = placeholderSelector(
        selectorParser().astSync(context.selector),
        true,
        context.nested
      )
    }
    const { rule, modern, legacy } = context
    const mappedRule = postcss
      .rule({
        selector: modern,
        raws: { ...rule.raws, before: '\n' },
        source: rule.source,
      })
      .append(
        declarations.map(([declaration, prop]) => declaration.clone({ prop }))
      )
    targets.modern.append(mappedRule)
    if (targets.legacy && legacy) {
      targets.legacy.append(mappedRule.clone({ selector: legacy }))
    }
    hasMapping = true
  }

  function visit(
    source: Container,
    targets: PlaceholderTargets,
    context?: PlaceholderRule
  ) {
    let declarations: [Declaration, string][] = []
    const canMatchClass = context?.selector.includes('.')
    // 声明可以与子规则交错，按出现顺序输出每批同一选择器的声明。
    function flush() {
      if (!context || !declarations.length) return
      emitDeclarations(context, declarations, targets)
      declarations = []
    }

    for (const node of source.nodes || []) {
      if (node.type === 'decl' && canMatchClass) {
        const prop = node.prop.startsWith('--')
          ? node.prop
          : node.prop.toLowerCase()
        if (isInputPlaceholderStyleProperty(prop))
          declarations.push([node, prop])
      } else if (node.type === 'rule' && !isFrameworkStyle(node)) {
        flush()
        visit(node, targets, {
          rule: node,
          nested: !!context,
          selector: context
            ? resolveNestedSelector(node.selector, context.selector)
            : node.selector,
        })
      } else if (node.type === 'atrule') {
        const layer = node.name === 'layer'
        if (
          (layer && inputLayers.has(node.params)) ||
          /(?:^|-)keyframes$/i.test(node.name)
        )
          continue
        flush()
        const modern = copyAtRule(node)
        const legacy = targets.legacy && !layer ? copyAtRule(node) : undefined
        if (node.nodes) visit(node, { modern, legacy }, context)
        if (modern.nodes?.length || (layer && !node.nodes)) {
          modern.raws.before = '\n'
          targets.modern.append(modern)
        }
        if (legacy?.nodes?.length) {
          legacy.raws.before = '\n'
          targets.legacy?.append(legacy)
        }
      }
    }
    flush()
  }
  visit(root, { modern: mapped, legacy })
  if (!hasMapping) return
  if (
    !root.nodes.some(
      (node) =>
        node.type === 'atrule' &&
        node.name === 'layer' &&
        node.params === layerOrder &&
        !node.nodes
    )
  ) {
    // 保持 @charset 和 @import 的位置，避免改变业务样式的加载规则。
    const firstStyle = root.nodes.find(
      (node) =>
        node.type !== 'comment' &&
        !(node.type === 'atrule' && ['charset', 'import'].includes(node.name))
    )!
    root.insertBefore(
      firstStyle,
      postcss.atRule({ name: 'layer', params: layerOrder })
    )
  }
  generatedModernLayers.add(mapped.raws)
  root.append(mapped)
  if (legacy.nodes?.length) root.append(legacy)
}

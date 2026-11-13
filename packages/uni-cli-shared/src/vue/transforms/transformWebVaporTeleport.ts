import { type ParserPlugin, parseExpression } from '@babel/parser'
import {
  type NodeTransform,
  NodeTypes,
  type SimpleExpressionNode,
  createSimpleExpression,
} from '@vue/compiler-core'

interface VaporTeleportTransformContext {
  root: object
  options: {
    inline?: boolean
    ssr?: boolean
    inSSR?: boolean
    expressionPlugins: ParserPlugin[]
  }
  ir: { reservedNames: { names: Set<string> } }
  imports: { exp: SimpleExpressionNode; path: string }[]
}

const runtimeImports = new WeakMap<object, string>()

// page 是页面级目标，不能通过 document.querySelector 误选到父页或其他弹页。
export const transformWebVaporTeleport: NodeTransform = (node, context) => {
  if (
    node.type !== NodeTypes.ELEMENT ||
    node.tag.toLowerCase() !== 'teleport'
  ) {
    return
  }
  const vaporContext = context as unknown as VaporTeleportTransformContext
  const { options } = vaporContext
  if (!options || options.ssr || options.inSSR) {
    return
  }
  function pageTarget() {
    let layout = '$page.vm.$pageLayoutInstance'
    if (!options.inline) {
      return target(layout)
    } else {
      let name = runtimeImports.get(vaporContext.root)
      if (!name) {
        name = '$__uniTeleportRuntime'
        const names = vaporContext.ir.reservedNames.names
        while (names.has(name)) {
          name += '_'
        }
        names.add(name)
        runtimeImports.set(vaporContext.root, name)
        vaporContext.imports.push({
          exp: createSimpleExpression(`* as ${name}`, true),
          path: 'vue',
        })
      }
      layout = `((instance) => { while (instance && instance.type?.name !== 'Page') instance = instance.parent; return instance })(${name}.getCurrentInstance())`
      return target(layout)
    }
  }
  function target(layout: string) {
    // 首次 ref 尚未回填，Teleport 会在页面插入后按唯一 ID 找到正文。
    // ref 就绪后直接使用元素，使缓存页脱离 document 时仍可切换目标。
    return `((page) => page?.__pageBodyEl || ('uni-page-body[data-page-id="' + page?.__pageBodyId + '"]'))(${layout})`
  }
  function expression(content: string, source: SimpleExpressionNode) {
    const result = createSimpleExpression(content, false, source.loc)
    // Vapor 的表达式生成使用 AST 来识别 $page、setup 绑定和箭头函数局部变量。
    result.ast = parseExpression(`(${content})`, {
      plugins: options.expressionPlugins,
    })
    return result
  }
  node.props.forEach((prop, index) => {
    if (prop.type === NodeTypes.ATTRIBUTE) {
      if (prop.name === 'to' && prop.value?.content === 'page') {
        node.props[index] = {
          type: NodeTypes.DIRECTIVE,
          name: 'bind',
          arg: createSimpleExpression('to', true, prop.loc),
          exp: expression(
            pageTarget(),
            createSimpleExpression('', false, prop.loc)
          ),
          modifiers: [],
          loc: prop.loc,
        }
      }
      return
    }
    if (prop.name !== 'bind') {
      return
    }
    if (!prop.arg) {
      if (prop.exp?.type === NodeTypes.SIMPLE_EXPRESSION) {
        prop.exp = expression(
          `((props) => { const targetProps = { ...props }; if (targetProps.to === 'page') targetProps.to = ${pageTarget()}; return targetProps })(${
            prop.exp.content
          })`,
          prop.exp
        )
      }
    } else if (
      prop.arg.type === NodeTypes.SIMPLE_EXPRESSION &&
      prop.arg.isStatic &&
      prop.arg.content === 'to'
    ) {
      const source = prop.exp || createSimpleExpression('to', false, prop.loc)
      if (source.type === NodeTypes.SIMPLE_EXPRESSION) {
        prop.exp = expression(
          `((target) => target === 'page' ? ${pageTarget()} : target)(${
            source.content
          })`,
          source
        )
      }
    }
  })
}

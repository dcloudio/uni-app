import { type NodePath, parseSync, types as t, traverse } from '@babel/core'
import type { Plugin } from 'vite'

const vueModules = new Set(['vue', '@vue/runtime-core', '@vue/runtime-dom'])
const vnodeHelpers = new Set([
  'h',
  'createVNode',
  'createElementVNode',
  'createBlock',
  'createElementBlock',
  'createTextVNode',
  'createCommentVNode',
  'createStaticVNode',
  'cloneVNode',
  'openBlock',
])

function isVueNamespace(
  path: NodePath,
  visitedBindings = new Set<NodePath>()
): boolean {
  if (path.isIdentifier()) {
    const binding = path.scope.getBinding(path.node.name)
    if (!binding) return false
    const declaration = binding.path
    if (visitedBindings.has(declaration)) return false
    visitedBindings.add(declaration)
    if (
      declaration.isImportNamespaceSpecifier() ||
      declaration.isImportDefaultSpecifier()
    ) {
      return vueModules.has(declaration.parent.source.value)
    }
    if (declaration.isVariableDeclarator()) {
      const init = declaration.get('init')
      // 函数可引用后声明的常量别名；按绑定去重防止循环，不限制源码位置。
      return binding.constant && isVueNamespace(init, visitedBindings)
    }
  } else if (path.isCallExpression()) {
    const { callee, arguments: args } = path.node
    if (t.isIdentifier(callee, { name: 'require' })) {
      return (
        !path.scope.getBinding('require') &&
        args.length === 1 &&
        t.isStringLiteral(args[0]) &&
        vueModules.has(args[0].value)
      )
    }
    // Rollup 将 CJS namespace import 包装为 _interopNamespace* 调用。
    if (t.isIdentifier(callee) && /^_interopNamespace/.test(callee.name)) {
      return (
        args.length === 1 &&
        isVueNamespace(path.get('arguments.0'), visitedBindings)
      )
    }
  }
  return false
}

export function checkWebVaporVNodes(): Plugin {
  return {
    name: 'uni:check-web-vapor-vnodes',
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        for (const chunk of Object.values(bundle)) {
          if (chunk.type !== 'chunk') continue
          const fail = (name: string, node: t.Node) => {
            if (!vnodeHelpers.has(name)) return
            this.error({
              message: `Web Vapor 框架产物禁止使用 Vue VNode API：${name}`,
              loc: {
                file: chunk.fileName,
                line: node.loc!.start.line,
                column: node.loc!.start.column,
              },
            })
          }
          // 检查最终产物，不误报被条件编译或 tree-shaking 移除的 VDOM 源码。
          const ast = parseSync(chunk.code, {
            sourceType: 'unambiguous',
            configFile: false,
            babelrc: false,
          })!
          traverse(ast, {
            ImportSpecifier(path) {
              if (vueModules.has(path.parent.source.value)) {
                const imported = path.node.imported
                fail(
                  t.isIdentifier(imported) ? imported.name : imported.value,
                  imported
                )
              }
            },
            MemberExpression(path) {
              const { property, computed } = path.node
              const name =
                !computed && t.isIdentifier(property)
                  ? property.name
                  : t.isStringLiteral(property)
                  ? property.value
                  : ''
              if (
                vnodeHelpers.has(name) &&
                isVueNamespace(path.get('object'))
              ) {
                fail(name, property)
              }
            },
            VariableDeclarator(path) {
              if (
                !t.isObjectPattern(path.node.id) ||
                !isVueNamespace(path.get('init'))
              )
                return
              for (const property of path.node.id.properties) {
                if (!t.isObjectProperty(property)) continue
                const key = property.key
                if (!property.computed && t.isIdentifier(key))
                  fail(key.name, key)
                else if (t.isStringLiteral(key)) fail(key.value, key)
              }
            },
          })
        }
      },
    },
  }
}

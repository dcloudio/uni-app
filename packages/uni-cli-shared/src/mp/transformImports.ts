import { parse, ParserPlugin } from '@babel/parser'
import {
  IfStatement,
  ImportDeclaration,
  isBlockStatement,
  isCallExpression,
  isIdentifier,
  isIfStatement,
  isImportDeclaration,
  isMemberExpression,
  isObjectExpression,
  isObjectProperty,
  isStringLiteral,
  isUnaryExpression,
  isVariableDeclaration,
  ObjectProperty,
  Program,
  Statement,
  StringLiteral,
} from '@babel/types'
import { camelize, capitalize, hyphenate } from '@vue/shared'
import { walk } from 'estree-walker'
import MagicString from 'magic-string'
import { PluginContext } from 'rollup'
import { addLeadingSlash } from '@dcloudio/uni-shared'
import { M } from '../messages'
import { BINDING_COMPONENTS } from '../constants'
import {
  normalizeMiniProgramFilename,
  normalizeParsePlugins,
  removeExt,
} from '../utils'

interface TransformVueComponentImportsOptions {
  root: string
  global?: boolean
  resolve: PluginContext['resolve']
  dynamicImport: (name: string, source: string) => string
  babelParserPlugins?: ParserPlugin[]
}
export async function transformVueComponentImports(
  code: string,
  importer: string,
  {
    root,
    resolve,
    global,
    dynamicImport,
    babelParserPlugins,
  }: TransformVueComponentImportsOptions
): Promise<{
  code: string
  usingComponents: Record<string, string>
}> {
  if (!global && !code.includes(BINDING_COMPONENTS)) {
    return { code, usingComponents: {} }
  }

  const s = new MagicString(code)
  const scriptAst = parse(code, {
    plugins: normalizeParsePlugins(importer, babelParserPlugins),
    sourceType: 'module',
  }).program

  const imports = findVueComponentImports(
    scriptAst.body,
    global
      ? parseGlobalComponents(scriptAst)
      : parseComponents(scriptAst, findBindingComponents(scriptAst.body))
  )
  const usingComponents: Record<string, string> = {}
  for (let i = 0; i < imports.length; i++) {
    const {
      tag,
      import: {
        start,
        end,
        specifiers: [specifier],
        source,
      },
    } = imports[i]
    const resolveId = await resolve(source.value, importer)
    if (resolveId) {
      s.overwrite(
        start!,
        end!,
        dynamicImport(specifier.local.name, resolveId.id) + ';'
      )
      const componentName = hyphenate(tag)
      if (!usingComponents[componentName]) {
        usingComponents[componentName] = addLeadingSlash(
          removeExt(normalizeMiniProgramFilename(resolveId.id, root))
        )
      }
    }
  }
  return { code: s.toString(), usingComponents }
}

type BindingComponents = Record<
  string,
  { tag: string; type: 'unknown' | 'setup' | 'self' }
>
/**
 * 解析编译器生成的 bindingComponents
 * @param ast
 * @returns
 */
function findBindingComponents(ast: Statement[]): BindingComponents {
  const mapping = findUnpluginComponents(ast)
  for (const node of ast) {
    if (!isVariableDeclaration(node)) {
      continue
    }
    const declarator = node.declarations[0]
    if (
      isIdentifier(declarator.id) &&
      declarator.id.name === BINDING_COMPONENTS
    ) {
      const bindingComponents = JSON.parse(
        (declarator.init as StringLiteral).value
      ) as Record<string, { name: string; type: 'unknown' | 'setup' | 'self' }>
      return Object.keys(bindingComponents).reduce<BindingComponents>(
        (bindings, tag) => {
          const { name, type } = bindingComponents[tag]
          bindings[mapping[name] || name] = {
            tag,
            type: type,
          }
          return bindings
        },
        {}
      )
    }
  }
  return {}
}

function findUnpluginComponents(ast: Statement[]): Record<string, string> {
  const res = Object.create(null)
  // if(!Array){}
  const ifStatement = ast.find(
    (statement) =>
      isIfStatement(statement) &&
      isUnaryExpression(statement.test) &&
      statement.test.operator === '!' &&
      isIdentifier(statement.test.argument) &&
      statement.test.argument.name === 'Array'
  ) as IfStatement
  if (!ifStatement) {
    return res
  }
  if (!isBlockStatement(ifStatement.consequent)) {
    return res
  }
  for (const node of ifStatement.consequent.body) {
    if (!isVariableDeclaration(node)) {
      continue
    }
    const { id, init } = node.declarations[0]
    if (
      isIdentifier(id) &&
      isIdentifier(init) &&
      init.name.includes('unplugin_components')
    ) {
      res[id.name] = init.name
    }
  }
  return res
}
/**
 * 查找全局组件定义：app.component('component-a',{})
 * @param ast
 * @returns
 */
function parseGlobalComponents(ast: Program) {
  const bindingComponents: BindingComponents = {}
  ;(walk as any)(ast, {
    enter(child: Node) {
      if (!isCallExpression(child)) {
        return
      }
      const { callee } = child
      // .component
      if (
        !isMemberExpression(callee) ||
        !isIdentifier(callee.property) ||
        callee.property.name !== 'component'
      ) {
        return
      }
      // .component('component-a',{})
      const args = child.arguments
      if (args.length !== 2) {
        return
      }
      const [name, value] = args
      if (!isStringLiteral(name)) {
        return console.warn(M['mp.component.args[0]'])
      }
      if (!isIdentifier(value)) {
        return console.warn(M['mp.component.args[1]'])
      }
      bindingComponents[value.name] = {
        tag: name.value,
        type: 'unknown',
      }
    },
  })
  return bindingComponents
}
/**
 * 从 components 中查找定义的组件，修改 bindingComponents
 * @param ast
 * @param bindingComponents
 */
function parseComponents(ast: Program, bindingComponents: BindingComponents) {
  ;(walk as any)(ast, {
    enter(child: Node) {
      if (!isObjectExpression(child)) {
        return
      }
      const componentsProp = child.properties.find(
        (prop) =>
          isObjectProperty(prop) &&
          isIdentifier(prop.key) &&
          prop.key.name === 'components'
      ) as ObjectProperty
      if (!componentsProp) {
        return
      }
      const componentsExpr = componentsProp.value
      if (!isObjectExpression(componentsExpr)) {
        return
      }
      componentsExpr.properties.forEach((prop) => {
        if (!isObjectProperty(prop)) {
          return
        }
        if (!isIdentifier(prop.key) && !isStringLiteral(prop.key)) {
          return
        }
        if (!isIdentifier(prop.value)) {
          return
        }
        const tag = isIdentifier(prop.key) ? prop.key.name : prop.key.value
        const name = findBindingComponent(tag, bindingComponents)
        if (name) {
          bindingComponents[prop.value.name] = bindingComponents[name]
        }
      })
    },
  })
  return bindingComponents
}

function findBindingComponent(
  tag: string,
  bindingComponents: BindingComponents
) {
  return Object.keys(bindingComponents).find((name) => {
    const componentTag = bindingComponents[name].tag
    const camelName = camelize(componentTag)
    const PascalName = capitalize(camelName)
    return tag === componentTag || tag === camelName || tag === PascalName
  })
}

function findVueComponentImports(
  ast: Statement[],
  bindingComponents: BindingComponents
) {
  const imports: { tag: string; import: ImportDeclaration }[] = []
  for (let i = 0; i < ast.length; i++) {
    const node = ast[i]
    if (!isImportDeclaration(node)) {
      continue
    }
    if (node.specifiers.length !== 1) {
      continue
    }
    const { name } = node.specifiers[0].local
    if (!bindingComponents[name]) {
      continue
    }
    imports.push({ tag: bindingComponents[name].tag, import: node })
  }
  return imports
}

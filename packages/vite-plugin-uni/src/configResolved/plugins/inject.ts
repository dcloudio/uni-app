import path, { sep } from 'path'
import debug from 'debug'
import { Plugin, ViteDevServer } from 'vite'

import {
  BaseNode,
  Program,
  Property,
  Identifier,
  MemberExpression,
  MethodDefinition,
  ExportSpecifier,
} from 'estree'

import {
  attachScopes,
  createFilter,
  makeLegalIdentifier,
} from '@rollup/pluginutils'
import { AcornNode } from 'rollup'

import { walk } from 'estree-walker'

import MagicString from 'magic-string'

import { UniPluginFilterOptions } from '.'

interface Scope {
  parent: Scope
  contains: (name: string) => boolean
}

type Injectment = string | [string, string]

export interface InjectOptions extends UniPluginFilterOptions {
  sourceMap?: boolean
  [str: string]: Injectment | InjectOptions['include'] | Boolean | ViteDevServer
}

const debugInject = debug('uni:inject')
const debugInjectTry = debug('uni:inject-try')

export function uniInjectPlugin(options: InjectOptions): Plugin {
  if (!options) throw new Error('Missing options')

  const filter = createFilter(options.include, options.exclude)
  const modules = Object.assign({}, options) as { [str: string]: Injectment }
  delete modules.include
  delete modules.exclude
  delete modules.sourceMap
  delete modules.devServer

  const modulesMap = new Map<string, string | [string, string]>()
  const namespaceModulesMap = new Map<string, string | [string, string]>()
  Object.keys(modules).forEach((name) => {
    if (name.endsWith('.')) {
      namespaceModulesMap.set(name, modules[name])
    }
    modulesMap.set(name, modules[name])
  })
  const hasNamespace = namespaceModulesMap.size > 0

  // Fix paths on Windows
  if (sep !== '/') {
    normalizeModulesMap(modulesMap)
    normalizeModulesMap(namespaceModulesMap)
  }

  const firstpass = new RegExp(
    `(?:${Array.from(modulesMap.keys()).map(escape).join('|')})`,
    'g'
  )
  const EXTNAMES = ['.js', '.ts', '.vue', '.nvue']
  const sourceMap = options.sourceMap !== false
  return {
    name: 'vite:uni-inject',
    transform(code, id) {
      if (!filter(id)) return null
      if (!EXTNAMES.includes(path.extname(id))) {
        return null
      }
      debugInjectTry(id)
      if (code.search(firstpass) === -1) return null
      if (sep !== '/') id = id.split(sep).join('/')
      let ast = null
      try {
        ast = this.parse(code)
      } catch (err) {
        this.warn({
          code: 'PARSE_ERROR',
          message: `plugin-inject: failed to parse ${id}. Consider restricting the plugin to particular files via options.include`,
        })
      }
      if (!ast) {
        return null
      }

      const imports = new Set()
      ;((ast as unknown) as Program).body.forEach((node) => {
        if (node.type === 'ImportDeclaration') {
          node.specifiers.forEach((specifier) => {
            imports.add(specifier.local.name)
          })
        }
      })

      // analyse scopes
      let scope = attachScopes(ast, 'scope') as Scope

      const magicString = new MagicString(code)

      const newImports = new Map()

      function handleReference(node: BaseNode, name: string, keypath: string) {
        let mod = modulesMap.get(keypath)
        if (!mod && hasNamespace) {
          const mods = keypath.split('.')
          if (mods.length === 2) {
            mod = namespaceModulesMap.get(mods[0] + '.')
            if (mod) {
              mod = [mod as string, mods[1]]
            }
          }
        }
        if (mod && !imports.has(name) && !scope.contains(name)) {
          if (typeof mod === 'string') mod = [mod, 'default']
          if (mod[0] === id) return false

          const hash = `${keypath}:${mod[0]}:${mod[1]}`

          const importLocalName =
            name === keypath ? name : makeLegalIdentifier(`$inject_${keypath}`)

          if (!newImports.has(hash)) {
            if (mod[1] === '*') {
              newImports.set(
                hash,
                `import * as ${importLocalName} from '${mod[0]}';`
              )
            } else {
              newImports.set(
                hash,
                `import { ${mod[1]} as ${importLocalName} } from '${mod[0]}';`
              )
            }
          }

          if (name !== keypath) {
            magicString.overwrite(
              (node as AcornNode).start,
              (node as AcornNode).end,
              importLocalName,
              {
                storeName: true,
              }
            )
          }
          return true
        }
        return false
      }

      walk(ast, {
        enter(node, parent) {
          if (sourceMap) {
            magicString.addSourcemapLocation((node as AcornNode).start)
            magicString.addSourcemapLocation((node as AcornNode).end)
          }

          if ((node as any).scope) {
            scope = (node as any).scope
          }

          if (isProperty(node) && node.shorthand) {
            const { name } = node.key as Identifier
            handleReference(node, name, name)
            this.skip()
            return
          }

          if (isReference(node, parent)) {
            const { name, keypath } = flatten(node)
            const handled = handleReference(node, name, keypath)
            if (handled) {
              this.skip()
            }
          }
        },
        leave(node) {
          if ((node as any).scope) {
            scope = scope.parent
          }
        },
      })
      debugInject(id, newImports.size)
      if (newImports.size === 0) {
        return {
          code,
          ast,
          map: sourceMap ? magicString.generateMap({ hires: true }) : null,
        }
      }
      const importBlock = Array.from(newImports.values()).join('\n\n')

      magicString.prepend(`${importBlock}\n\n`)

      return {
        code: magicString.toString(),
        map: sourceMap ? magicString.generateMap({ hires: true }) : null,
      }
    },
  }
}

const escape = (str: string) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')

const isProperty = (node: BaseNode): node is Property =>
  node.type === 'Property'

const isIdentifier = (node: BaseNode): node is Identifier =>
  node.type === 'Identifier'

const isMemberExpression = (node: BaseNode): node is MemberExpression =>
  node.type === 'MemberExpression'

const isMethodDefinition = (node: BaseNode): node is MethodDefinition =>
  node.type === 'MethodDefinition'

const isExportSpecifier = (node: BaseNode): node is ExportSpecifier =>
  node.type === 'ExportSpecifier'

const isReference = (node: BaseNode, parent: BaseNode): boolean => {
  if (isMemberExpression(node)) {
    return !node.computed && isReference(node.object, node)
  }
  if (isIdentifier(node)) {
    if (isMemberExpression(parent))
      return parent.computed || node === parent.object
    // `bar` in { bar: foo }
    if (isProperty(parent) && node !== parent.value) return false
    // `bar` in `class Foo { bar () {...} }`
    if (isMethodDefinition(parent)) return false
    // `bar` in `export { foo as bar }`
    if (isExportSpecifier(parent) && node !== parent.local) return false
    return true
  }
  return false
}

const flatten = (startNode: BaseNode) => {
  const parts = []
  let node = startNode
  while (isMemberExpression(node)) {
    parts.unshift((node.property as Identifier).name)
    node = node.object
  }
  const { name } = node as Identifier
  parts.unshift(name)
  return { name, keypath: parts.join('.') }
}

function normalizeModulesMap(
  modulesMap: Map<string, string | [string, string]>
) {
  modulesMap.forEach((mod, key) => {
    modulesMap.set(
      key,
      Array.isArray(mod)
        ? [mod[0].split(sep).join('/'), mod[1]]
        : mod.split(sep).join('/')
    )
  })
}

import { sep } from 'path'
import debug from 'debug'
import type { Plugin } from 'vite'

import type { BaseNode, Program, Identifier } from 'estree'

import {
  attachScopes,
  createFilter,
  FilterPattern,
  makeLegalIdentifier,
} from '@rollup/pluginutils'
import { AcornNode } from 'rollup'

import { walk } from 'estree-walker'
import { extend, isArray, isString } from '@vue/shared'
import MagicString from 'magic-string'

import {
  isProperty,
  isReference,
  isMemberExpression,
  isJsFile,
  isAssignmentExpression,
} from '../utils'

interface Scope {
  parent: Scope
  contains: (name: string) => boolean
}

type Injectment = string | [string, string]

export interface InjectOptions {
  sourceMap?: boolean
  callback?: (imports: Map<any, any>, mod: [string, string]) => void
  include?: FilterPattern
  exclude?: FilterPattern
  [str: string]: Injectment | FilterPattern | Boolean | Function | undefined
}

const debugInject = debug('uni:inject')
const debugInjectTry = debug('uni:inject-try')

export function uniViteInjectPlugin(
  name: string,
  options: InjectOptions
): Plugin {
  if (!options) throw new Error('Missing options')

  const filter = createFilter(options.include, options.exclude)
  const modules = extend({}, options) as { [str: string]: Injectment }
  delete modules.include
  delete modules.exclude
  delete modules.sourceMap
  delete modules.callback

  const reassignments = new Set<string>()
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
  const sourceMap = options.sourceMap !== false
  const callback = options.callback
  return {
    name,
    // 确保在 commonjs 之后，否则会混合 es6 module 与 cjs 的代码，导致 commonjs 失效
    enforce: 'post',
    transform(code, id) {
      if (!filter(id)) return null
      if (!isJsFile(id)) return null

      debugInjectTry(id)
      if (code.search(firstpass) === -1) return null
      if (sep !== '/') id = id.split(sep).join('/')

      const ast = this.parse(code)

      const imports = new Set()
      ;(ast as unknown as Program).body.forEach((node) => {
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

      function handleReference(
        node: BaseNode,
        name: string,
        keypath: string,
        parent?: BaseNode
      ) {
        let mod = modulesMap.get(keypath)
        if (!mod && hasNamespace) {
          const mods = keypath.split('.')
          if (mods.length === 2) {
            mod = namespaceModulesMap.get(mods[0] + '.')
            if (mod) {
              if (isArray(mod)) {
                const testFn = mod[1] as unknown as (method: string) => boolean
                if (testFn(mods[1])) {
                  mod = [mod[0], mods[1]]
                } else {
                  mod = undefined
                }
              } else {
                mod = [mod, mods[1]]
              }
            }
          }
        }
        if (mod && !imports.has(name) && !scope.contains(name)) {
          if (isString(mod)) mod = [mod, 'default']
          if (mod[0] === id) return false
          const hash = `${keypath}:${mod[0]}:${mod[1]}`
          // 当 API 被覆盖定义后，不再摇树
          if (reassignments.has(hash)) {
            return false
          }
          if (
            parent &&
            isAssignmentExpression(parent) &&
            parent.left === node
          ) {
            reassignments.add(hash)
            return false
          }

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
              callback && callback(newImports, mod)
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

          if (isReference(node, parent!)) {
            const { name, keypath } = flatten(node)
            const handled = handleReference(node, name, keypath, parent)
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
          // 不能返回 ast ，否则会导致代码不能被再次修改
          // 比如 App.vue 中，console.log('uniCloud') 触发了 inject 检测，检测完，发现不需要
          // 此时返回 ast，会导致 import { setupApp } from '@dcloudio/uni-h5' 不会被编译
          // ast
          map: null,
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
      isArray(mod)
        ? [mod[0].split(sep).join('/'), mod[1]]
        : mod.split(sep).join('/')
    )
  })
}
